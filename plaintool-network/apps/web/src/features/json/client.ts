import { fill } from "../../lib/tool-i18n";
import type { JsonIssue } from "@plaintool/json-core";
import {
  appendBadge,
  copyText,
  createDeferredIndicator,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
  utf8ByteLength,
} from "../../scripts/shared/tool-dom";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import type {
  JsonClientCopy,
  JsonCommittedResult,
  JsonOperation,
  JsonWorkerReply,
  JsonWorkerRequest,
} from "./contract";
const MAX_BYTES = 10 * 1024 * 1024;
const AUTO_BYTES = 1024 * 1024;
const issueValues = (
  issue: JsonIssue,
  message?: string,
): Record<string, string | number> => ({
  message: message ?? issue.code,
  line: issue.line,
  column: issue.column,
});

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const badges = root.querySelector<HTMLElement>("[data-badges]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const indentControl = root.querySelector<HTMLSelectElement>("[data-indent]")!;
  const copy = readClientCopy<JsonClientCopy>(root);
  let timer = 0;
  let revision = 0;
  let lastOperation: JsonOperation = "validate";
  let committedResult: JsonCommittedResult = { kind: "none" };
  const bytes = () =>
    exceedsUtf8ByteLimit(input.value, MAX_BYTES)
      ? MAX_BYTES + 1
      : utf8ByteLength(input.value);
  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const invalidateResult = () => {
    committedResult = { kind: "none" };
    output.value = "";
    badges.replaceChildren();
    copyButton.disabled = downloadButton.disabled = true;
  };
  const markResultPending = () => {
    copyButton.disabled = downloadButton.disabled = true;
  };
  const restoreSettledStatus = () =>
    setStatus(
      committedResult.kind === "none" ? copy.ready : copy.valid,
      committedResult.kind === "none" ? "idle" : "success",
    );
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );
  const badge = (message: string, warning = false) =>
    appendBadge(badges, message, warning);
  const runner = createLatestWorkerRunner<
    JsonWorkerRequest,
    JsonWorkerReply,
    { operation: JsonOperation; focusError: boolean }
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => {
      const raw = indentControl.value;
      const indent = raw === "tab" ? "tab" : (Number(raw) as 2 | 4);
      return {
        payload: {
          id,
          input: input.value,
          operation: context.operation,
          indent,
        },
      };
    },
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      badges.replaceChildren();
      const inspection = reply.inspection;
      if (!inspection.valid) {
        const issue = inspection.errors[0]!;
        invalidateResult();
        setStatus(
          fill(
            copy.invalidAt,
            issueValues(
              issue,
              copy.errorMessages[issue.code] ?? copy.errorMessages.Unknown,
            ),
          ),
          "error",
        );
        if (context.focusError) {
          input.focus();
          input.setSelectionRange(issue.offset, issue.offset + 1);
        }
      } else {
        output.value = reply.output;
        committedResult =
          context.operation === "validate"
            ? { kind: "validated", inspection }
            : {
                kind: "transformed",
                operation: context.operation,
                inspection,
                output: reply.output,
              };
        setStatus(copy.valid, "success");
        if (inspection.bomRemoved) badge(copy.bom, true);
        inspection.duplicateKeys.forEach((issue) =>
          badge(fill(copy.duplicate, issueValues(issue)), true),
        );
      }
      copyButton.disabled = downloadButton.disabled = !output.value;
    },
    onFailure: () => {
      workingIndicator.end();
      invalidateResult();
      setStatus(copy.processingFailed, "error");
    },
  });
  const cancelPendingWork = () => {
    revision += 1;
    const wasWorking = workingIndicator.cancel();
    runner.cancel();
    if (wasWorking) restoreSettledStatus();
  };
  const run = (operation: JsonOperation, focusError = false) => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    if (bytes() > MAX_BYTES) {
      invalidateResult();
      return setStatus(copy.tooLarge, "error");
    }
    markResultPending();
    workingIndicator.begin();
    lastOperation = operation;
    revision += 1;
    runner.submit({ operation, focusError });
  };
  root
    .querySelectorAll<HTMLButtonElement>("[data-action]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        run(button.dataset.action as JsonOperation, true),
      ),
    );
  root
    .querySelector<HTMLButtonElement>("[data-open-file]")!
    .addEventListener("click", () => fileInput.click());
  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    cancelPendingWork();
    if (!input.value) {
      invalidateResult();
      return setStatus(copy.ready);
    }
    if (bytes() > MAX_BYTES) {
      invalidateResult();
      return setStatus(copy.tooLarge, "error");
    }
    if (bytes() > AUTO_BYTES) {
      invalidateResult();
      return setStatus(copy.manualRequired);
    }
    if (root.classList.contains("has-error")) restoreSettledStatus();
    const nextOperation =
      committedResult.kind === "transformed"
        ? committedResult.operation
        : "validate";
    markResultPending();
    timer = window.setTimeout(() => run(nextOperation), 120);
  });
  input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run("format", true);
    }
  });
  indentControl.addEventListener("change", () => {
    if (lastOperation === "format" && input.value && output.value)
      run("format");
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    window.clearTimeout(timer);
    cancelPendingWork();
    input.value = fileInput.value = "";
    invalidateResult();
    setStatus(copy.ready);
    input.focus();
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    window.clearTimeout(timer);
    cancelPendingWork();
    invalidateResult();
    if (file.size > MAX_BYTES) {
      fileInput.value = "";
      return setStatus(copy.tooLarge, "error");
    }
    const loadRevision = revision;
    try {
      const contents = await file.text();
      if (loadRevision !== revision) return;
      input.value = contents;
      run("validate");
    } catch {
      if (loadRevision === revision) setStatus(copy.processingFailed, "error");
    } finally {
      fileInput.value = "";
    }
  });
  copyButton.addEventListener("click", async () => {
    const copyRevision = revision;
    const copied = await copyText(output.value);
    if (copyRevision !== revision) return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () =>
    downloadBlob(
      new Blob([output.value], { type: "application/json;charset=utf-8" }),
      "formatted.json",
    ),
  );
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}
document.querySelectorAll<HTMLElement>("[data-json-tool]").forEach(init);
