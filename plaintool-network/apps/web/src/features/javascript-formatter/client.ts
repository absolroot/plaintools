import { fill } from "../../lib/template";
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
  JavaScriptFormatterClientCopy,
  JavaScriptRunContext,
  JavaScriptWorkerReply,
  JavaScriptWorkerRequest,
  JavaScriptWorkerSettings,
} from "./contract";
import {
  JAVASCRIPT_MAX_BYTES,
  javascriptDownloadFilename,
  javascriptModeUsesFormatOptions,
  javascriptRunPolicy,
} from "./policy";
import { JavaScriptFormatterAuthority } from "./state";

const AUTO_DELAY = 140;

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const staleNotice = root.querySelector<HTMLElement>("[data-stale-notice]")!;
  const runButton = root.querySelector<HTMLButtonElement>("[data-run]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const formatOptions = root.querySelector<HTMLElement>(
    "[data-format-options]",
  )!;
  const minifyOptions = root.querySelector<HTMLElement>(
    "[data-minify-options]",
  )!;
  const indentControl = root.querySelector<HTMLSelectElement>("[data-indent]")!;
  const printWidthControl =
    root.querySelector<HTMLInputElement>("[data-print-width]")!;
  const semiControl = root.querySelector<HTMLInputElement>("[data-semi]")!;
  const singleQuoteControl = root.querySelector<HTMLInputElement>(
    "[data-single-quote]",
  )!;
  const preserveCommentsControl = root.querySelector<HTMLInputElement>(
    "[data-preserve-comments]",
  )!;
  const copy = readClientCopy<JavaScriptFormatterClientCopy>(root);
  const authority = new JavaScriptFormatterAuthority(
    root.dataset.mode === "minify" ? "minify" : "format",
  );
  let timer = 0;
  let fileRevision = 0;
  let filePending = false;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.common.working, "working"),
  );
  const bytes = () =>
    exceedsUtf8ByteLimit(input.value, JAVASCRIPT_MAX_BYTES)
      ? JAVASCRIPT_MAX_BYTES + 1
      : utf8ByteLength(input.value);
  const settings = (): JavaScriptWorkerSettings => {
    const rawIndent = indentControl.value;
    return {
      format: {
        indent: rawIndent === "tab" ? "tab" : rawIndent === "4" ? 4 : 2,
        printWidth: Math.min(
          240,
          Math.max(40, Number(printWidthControl.value) || 80),
        ),
        semi: semiControl.checked,
        singleQuote: singleQuoteControl.checked,
      },
      preserveComments: preserveCommentsControl.checked,
    };
  };
  const renderAuthority = () => {
    const snapshot = authority.snapshot;
    output.value = snapshot.output;
    root.classList.toggle("has-stale-result", snapshot.stale);
    staleNotice.hidden = !snapshot.stale;
    copyButton.disabled = downloadButton.disabled = !snapshot.actionsEnabled;
  };
  const syncModeUi = () => {
    const mode = authority.snapshot.mode;
    const usesFormatOptions = javascriptModeUsesFormatOptions(mode);
    root.dataset.mode = mode;
    root
      .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
      .forEach((button) => {
        const selected = button.dataset.modeButton === mode;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    runButton.textContent =
      mode === "format" ? copy.feature.runFormat : copy.feature.runMinify;
    formatOptions.hidden = !usesFormatOptions;
    minifyOptions.hidden = usesFormatOptions;
    [indentControl, printWidthControl, semiControl, singleQuoteControl].forEach(
      (control) => (control.disabled = !usesFormatOptions),
    );
    preserveCommentsControl.disabled = usesFormatOptions;
  };

  const runner = createLatestWorkerRunner<
    JavaScriptWorkerRequest,
    JavaScriptWorkerReply,
    JavaScriptRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: {
        id,
        input: context.input,
        mode: context.mode,
        settings: context.settings,
      },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      if (reply.ok) {
        if (!authority.commit(context.revision, reply.output)) return;
        renderAuthority();
        setStatus(
          context.mode === "format"
            ? copy.feature.formatted
            : copy.feature.minified,
          "success",
        );
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
  });

  const invalidatePending = () => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    runner.cancel();
  };
  const failCurrent = (message: string) => {
    const revision = authority.beginRequest();
    authority.fail(revision);
    renderAuthority();
    setStatus(message, "error");
  };
  const run = (focusError = false) => {
    if (filePending) {
      filePending = false;
      fileRevision += 1;
    }
    window.clearTimeout(timer);
    workingIndicator.cancel();
    runner.cancel();
    if (!input.value) {
      authority.clear();
      renderAuthority();
      return setStatus(copy.common.ready);
    }
    if (javascriptRunPolicy(bytes()) === "too-large") {
      failCurrent(copy.feature.tooLarge);
      return;
    }
    const revision = authority.beginRequest();
    renderAuthority();
    workingIndicator.begin();
    runner.submit({
      revision,
      input: input.value,
      mode: authority.snapshot.mode,
      settings: settings(),
      focusError,
    });
  };
  const scheduleCurrent = () => {
    renderAuthority();
    if (filePending) {
      setStatus(
        authority.snapshot.stale ? copy.feature.outdated : copy.common.ready,
      );
      return;
    }
    if (!input.value) return setStatus(copy.common.ready);
    const policy = javascriptRunPolicy(bytes());
    if (policy === "too-large") {
      failCurrent(copy.feature.tooLarge);
      return;
    }
    if (policy === "manual") {
      setStatus(copy.feature.manualRequired);
      return;
    }
    setStatus(
      authority.snapshot.stale ? copy.feature.outdated : copy.common.ready,
    );
    timer = window.setTimeout(() => run(), AUTO_DELAY);
  };
  const inputChanged = () => {
    filePending = false;
    fileRevision += 1;
    invalidatePending();
    authority.changeInput(input.value);
    scheduleCurrent();
  };
  const settingsChanged = () => {
    invalidatePending();
    authority.changeInput(input.value);
    scheduleCurrent();
  };

  input.addEventListener("input", inputChanged);
  input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run(true);
    }
  });
  root
    .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        const mode = button.dataset.modeButton;
        if (mode !== "format" && mode !== "minify") return;
        if (mode === authority.snapshot.mode) return;
        invalidatePending();
        authority.changeMode(mode);
        syncModeUi();
        scheduleCurrent();
      }),
    );
  runButton.addEventListener("click", () => run(true));
  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      if (authority.snapshot.input) return;
      filePending = false;
      fileRevision += 1;
      invalidatePending();
      if (!authority.loadSample(copy.feature.sampleInput)) return;
      input.value = authority.snapshot.input;
      input.focus();
      scheduleCurrent();
    });
  root
    .querySelector<HTMLButtonElement>("[data-open-file]")!
    .addEventListener("click", () => fileInput.click());
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    filePending = false;
    fileRevision += 1;
    invalidatePending();
    input.value = fileInput.value = "";
    authority.clear();
    renderAuthority();
    setStatus(copy.common.ready);
    input.focus();
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    fileRevision += 1;
    const revision = fileRevision;
    filePending = true;
    invalidatePending();
    authority.beginRequest();
    renderAuthority();
    if (file.size > JAVASCRIPT_MAX_BYTES) {
      filePending = false;
      failCurrent(copy.feature.tooLarge);
      fileInput.value = "";
      return;
    }
    try {
      const contents = await file.text();
      if (revision !== fileRevision) return;
      filePending = false;
      input.value = contents;
      authority.changeInput(contents);
      scheduleCurrent();
    } catch {
      if (revision === fileRevision) {
        filePending = false;
        failCurrent(copy.common.processingFailed);
      }
    } finally {
      if (revision === fileRevision) fileInput.value = "";
    }
  });
  [
    indentControl,
    printWidthControl,
    semiControl,
    singleQuoteControl,
    preserveCommentsControl,
  ].forEach((control) => control.addEventListener("change", settingsChanged));
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
      new Blob([snapshot.output], {
        type: "text/javascript;charset=utf-8",
      }),
      javascriptDownloadFilename(snapshot.mode, {
        format: copy.feature.formatDownloadFilename,
        minify: copy.feature.minifyDownloadFilename,
      }),
    );
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
  syncModeUi();
  renderAuthority();
}

document
  .querySelectorAll<HTMLElement>("[data-javascript-formatter]")
  .forEach(init);
