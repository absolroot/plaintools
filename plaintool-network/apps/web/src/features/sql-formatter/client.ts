import type {
  SqlDialect,
  SqlIndent,
  SqlKeywordCase,
} from "@plaintool/sql-formatter-core";
import { fill } from "../../lib/template";
import {
  FORMATTER_INPUT_LIMITS,
  FORMATTER_WORKER_TIMEOUT_MS,
} from "../../scripts/shared/formatter-resource-policy";
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
  SqlFormatSettings,
  SqlFormatterClientCopy,
  SqlRunContext,
  SqlWorkerReply,
  SqlWorkerRequest,
} from "./contract";
import { SqlFormatterAuthority } from "./state";

const { max: MAX_BYTES, auto: AUTO_BYTES } = FORMATTER_INPUT_LIMITS.sql;

function readDialect(value: string): SqlDialect {
  switch (value) {
    case "postgresql":
    case "mysql":
    case "mariadb":
    case "sqlite":
    case "transactsql":
      return value;
    default:
      return "sql";
  }
}

function readIndent(value: string): SqlIndent {
  return value === "tab" ? "tab" : value === "4" ? 4 : 2;
}

function readKeywordCase(value: string): SqlKeywordCase {
  return value === "upper" ? "upper" : value === "lower" ? "lower" : "preserve";
}

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
  const dialectControl =
    root.querySelector<HTMLSelectElement>("[data-dialect]")!;
  const indentControl = root.querySelector<HTMLSelectElement>("[data-indent]")!;
  const keywordCaseControl = root.querySelector<HTMLSelectElement>(
    "[data-keyword-case]",
  )!;
  const copy = readClientCopy<SqlFormatterClientCopy>(root);
  const authority = new SqlFormatterAuthority();
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
    exceedsUtf8ByteLimit(input.value, MAX_BYTES)
      ? MAX_BYTES + 1
      : utf8ByteLength(input.value);
  const settings = (): SqlFormatSettings => ({
    dialect: readDialect(dialectControl.value),
    indent: readIndent(indentControl.value),
    keywordCase: readKeywordCase(keywordCaseControl.value),
  });
  const renderAuthority = () => {
    const snapshot = authority.snapshot;
    output.value = snapshot.output;
    root.classList.toggle("has-stale-result", snapshot.stale);
    staleNotice.hidden = !snapshot.stale;
    copyButton.disabled = downloadButton.disabled = !snapshot.actionsEnabled;
  };
  const invalidatePending = () => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    runner.cancel();
  };

  const runner = createLatestWorkerRunner<
    SqlWorkerRequest,
    SqlWorkerReply,
    SqlRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: {
        id,
        input: context.input,
        settings: context.settings,
      },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
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
      const hasLocation =
        reply.issue.line !== undefined && reply.issue.column !== undefined;
      setStatus(
        hasLocation
          ? fill(copy.feature.invalidAt, {
              message,
              line: reply.issue.line!,
              column: reply.issue.column!,
            })
          : message,
        "error",
      );
      if (context.focusError && hasLocation) {
        const lines = input.value.split(/\r\n|\r|\n/u);
        const offset =
          lines
            .slice(0, Math.max(0, reply.issue.line! - 1))
            .reduce((total, line) => total + line.length + 1, 0) +
          Math.max(0, reply.issue.column! - 1);
        input.focus();
        input.setSelectionRange(offset, offset + 1);
      }
    },
    onFailure: (context) => {
      workingIndicator.end();
      if (context && !authority.fail(context.revision)) return;
      renderAuthority();
      setStatus(copy.common.processingFailed, "error");
    },
    lazy: true,
    timeoutMs: FORMATTER_WORKER_TIMEOUT_MS,
  });

  const run = (focusError = false) => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    setManualRunVisible(false);
    if (!input.value) {
      authority.clear();
      renderAuthority();
      return setStatus(copy.common.ready);
    }
    if (bytes() > MAX_BYTES) {
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
    const inputBytes = bytes();
    if (inputBytes > MAX_BYTES) {
      setManualRunVisible(false);
      const revision = authority.beginRequest();
      authority.fail(revision);
      renderAuthority();
      return setStatus(copy.feature.tooLarge, "error");
    }
    if (inputBytes > AUTO_BYTES) {
      setManualRunVisible(true);
      return setStatus(copy.feature.manualRequired);
    }
    setManualRunVisible(false);
    setStatus(
      authority.snapshot.stale ? copy.feature.outdated : copy.common.ready,
    );
    timer = window.setTimeout(() => run(), 140);
  };

  input.addEventListener("input", inputChanged);
  input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run(true);
    }
  });
  manualRunButton.addEventListener("click", () => run(true));
  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      if (!authority.loadSample(copy.feature.sampleInput)) return;
      fileRevision += 1;
      invalidatePending();
      input.value = authority.snapshot.input;
      renderAuthority();
      setStatus(copy.common.ready);
      timer = window.setTimeout(() => run(), 140);
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
    if (file.size > MAX_BYTES) {
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
      const inputBytes = bytes();
      if (inputBytes > MAX_BYTES) {
        setManualRunVisible(false);
        const latest = authority.beginRequest();
        authority.fail(latest);
        renderAuthority();
        setStatus(copy.feature.tooLarge, "error");
      } else if (inputBytes > AUTO_BYTES) {
        setManualRunVisible(true);
        setStatus(copy.feature.manualRequired);
      } else {
        setManualRunVisible(false);
        setStatus(copy.common.ready);
        timer = window.setTimeout(() => run(), 140);
      }
    } catch {
      if (revision === fileRevision) {
        authority.fail(authority.snapshot.revision);
        renderAuthority();
        setStatus(copy.common.processingFailed, "error");
      }
    } finally {
      if (revision === fileRevision) fileInput.value = "";
    }
  });
  [dialectControl, indentControl, keywordCaseControl].forEach((control) =>
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
      new Blob([snapshot.output], { type: "text/sql;charset=utf-8" }),
      copy.feature.downloadFilename,
    );
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-sql-formatter]").forEach(init);
