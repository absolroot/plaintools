import { fill } from "../../lib/template";
import { FORMATTER_WORKER_TIMEOUT_MS } from "../../scripts/shared/formatter-resource-policy";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import {
  copyText,
  createDeferredIndicator,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
  utf8ByteLength,
} from "../../scripts/shared/tool-dom";
import type {
  CssFormatSettings,
  CssFormatterClientCopy,
  CssOperation,
  CssRunContext,
  CssWorkerReply,
  CssWorkerRequest,
} from "./contract";
import { CssFormatterAuthority } from "./state";
import { classifyCssInputBytes, CSS_AUTO_BYTES, CSS_MAX_BYTES } from "./policy";

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const staleNotice = root.querySelector<HTMLElement>("[data-stale-notice]")!;
  const manualRunButton =
    root.querySelector<HTMLButtonElement>("[data-manual-run]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const indentControl = root.querySelector<HTMLSelectElement>("[data-indent]")!;
  const printWidthControl =
    root.querySelector<HTMLInputElement>("[data-print-width]")!;
  const copy = readClientCopy<CssFormatterClientCopy>(root);
  const authority = new CssFormatterAuthority();
  const selectedOperation: CssOperation = "format";
  let timer = 0;
  let fileRevision = 0;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setManualRunVisible = (visible: boolean) => {
    manualRunButton.hidden = !visible;
  };
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.common.working, "working"),
  );
  const bytes = () =>
    exceedsUtf8ByteLimit(input.value, CSS_MAX_BYTES)
      ? CSS_MAX_BYTES + 1
      : utf8ByteLength(input.value);
  const settings = (): CssFormatSettings => {
    const rawIndent = indentControl.value;
    return {
      indent: rawIndent === "tab" ? "tab" : rawIndent === "4" ? 4 : 2,
      printWidth: Math.min(
        240,
        Math.max(40, Number(printWidthControl.value) || 80),
      ),
    };
  };
  const renderAuthority = () => {
    const snapshot = authority.snapshot;
    output.value = snapshot.output;
    root.classList.toggle("has-stale-result", snapshot.stale);
    staleNotice.hidden = !snapshot.stale;
    copyButton.disabled = downloadButton.disabled = !snapshot.actionsEnabled;
  };

  const runner = createLatestWorkerRunner<
    CssWorkerRequest,
    CssWorkerReply,
    CssRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: {
        id,
        operation: context.operation,
        input: context.input,
        settings: context.settings,
      },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      if (reply.operation !== context.operation) {
        authority.fail(context.revision);
        renderAuthority();
        setStatus(copy.common.processingFailed, "error");
        return;
      }
      if (reply.ok) {
        if (!authority.commit(context.revision, reply.output)) return;
        renderAuthority();
        setStatus(copy.feature.formatted, "success");
        return;
      }
      if (!authority.fail(context.revision)) return;
      renderAuthority();
      const message =
        copy.feature.errors[reply.issue.code] ?? copy.feature.errors.Unknown;
      setStatus(
        reply.issue.line && reply.issue.column
          ? fill(copy.feature.invalidAt, {
              message,
              line: reply.issue.line,
              column: reply.issue.column,
            })
          : message,
        "error",
      );
      if (context.focusError && reply.issue.line && reply.issue.column) {
        const lines = input.value.split(/\r\n|\r|\n/u);
        const offset =
          lines
            .slice(0, Math.max(0, reply.issue.line - 1))
            .reduce((total, line) => total + line.length + 1, 0) +
          Math.max(0, reply.issue.column - 1);
        input.focus();
        input.setSelectionRange(offset, offset + 1);
      }
    },
    onFailure: (context) => {
      workingIndicator.end();
      if (context) {
        if (!authority.fail(context.revision)) return;
      } else {
        const revision = authority.beginRequest();
        authority.fail(revision);
      }
      renderAuthority();
      setStatus(copy.common.processingFailed, "error");
    },
    lazy: true,
    timeoutMs: FORMATTER_WORKER_TIMEOUT_MS,
  });

  const invalidatePending = () => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    runner.cancel();
  };
  const run = (
    operation: CssOperation = selectedOperation,
    focusError = false,
  ) => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    setManualRunVisible(false);
    if (!input.value) {
      authority.clear();
      renderAuthority();
      return setStatus(copy.common.ready);
    }
    if (classifyCssInputBytes(bytes()) === "too-large") {
      const revision = authority.beginRequest();
      authority.fail(revision);
      renderAuthority();
      return setStatus(copy.feature.tooLarge, "error");
    }
    const revision = authority.beginRequest();
    renderAuthority();
    workingIndicator.begin();
    runner.submit({
      revision,
      operation,
      input: input.value,
      settings: settings(),
      focusError,
    });
  };

  const inputChanged = () => {
    fileRevision += 1;
    invalidatePending();
    authority.changeInput(input.value);
    renderAuthority();
    if (!input.value) {
      setManualRunVisible(false);
      return setStatus(copy.common.ready);
    }
    const inputPolicy = classifyCssInputBytes(bytes());
    if (inputPolicy === "too-large") {
      setManualRunVisible(false);
      const revision = authority.beginRequest();
      authority.fail(revision);
      renderAuthority();
      return setStatus(copy.feature.tooLarge, "error");
    }
    if (inputPolicy === "manual") {
      setManualRunVisible(true);
      return setStatus(copy.feature.manualRequired);
    }
    setManualRunVisible(false);
    setStatus(
      authority.snapshot.stale ? copy.feature.outdated : copy.common.ready,
    );
    timer = window.setTimeout(() => run(selectedOperation), 140);
  };

  input.addEventListener("input", inputChanged);
  input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run(selectedOperation, true);
    }
  });
  manualRunButton.addEventListener("click", () => run(selectedOperation, true));
  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      if (!authority.loadSample(copy.feature.sampleInput)) return;
      fileRevision += 1;
      invalidatePending();
      input.value = authority.snapshot.input;
      renderAuthority();
      setStatus(copy.common.ready);
      timer = window.setTimeout(() => run(selectedOperation), 140);
      input.focus();
    });
  root
    .querySelector<HTMLButtonElement>("[data-open-file]")!
    .addEventListener("click", () => fileInput.click());
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    fileRevision += 1;
    invalidatePending();
    input.value = fileInput.value = "";
    authority.clear();
    renderAuthority();
    setManualRunVisible(false);
    setStatus(copy.common.ready);
    input.focus();
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    fileRevision += 1;
    const revision = fileRevision;
    invalidatePending();
    const authorityRevision = authority.beginRequest();
    renderAuthority();
    if (file.size > CSS_MAX_BYTES) {
      setManualRunVisible(false);
      authority.fail(authorityRevision);
      renderAuthority();
      fileInput.value = "";
      return setStatus(copy.feature.tooLarge, "error");
    }
    try {
      const contents = await file.text();
      if (revision !== fileRevision) return;
      input.value = contents;
      authority.changeInput(contents);
      renderAuthority();
      if (bytes() > CSS_AUTO_BYTES) {
        setManualRunVisible(true);
        setStatus(copy.feature.manualRequired);
        return;
      }
      setManualRunVisible(false);
      run(selectedOperation);
    } catch {
      if (revision === fileRevision) {
        authority.fail(authorityRevision);
        renderAuthority();
        setStatus(copy.common.processingFailed, "error");
      }
    } finally {
      if (revision === fileRevision) fileInput.value = "";
    }
  });
  [indentControl, printWidthControl].forEach((control) =>
    control.addEventListener("change", inputChanged),
  );
  copyButton.addEventListener("click", async () => {
    const snapshot = authority.snapshot;
    if (!snapshot.actionsEnabled) return;
    const copied = await copyText(snapshot.output);
    if (
      snapshot.revision !== authority.snapshot.revision ||
      !authority.snapshot.actionsEnabled
    )
      return;
    setStatus(
      copied ? copy.common.copied : copy.common.copyFailed,
      copied ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () => {
    const snapshot = authority.snapshot;
    if (!snapshot.actionsEnabled) return;
    downloadBlob(
      new Blob([snapshot.output], { type: "text/css;charset=utf-8" }),
      copy.feature.downloadFilename,
    );
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-css-formatter]").forEach(init);
