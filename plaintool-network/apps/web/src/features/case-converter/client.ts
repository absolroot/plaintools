import type { CaseMode } from "@plaintool/text-case-core";
import {
  copyText,
  createDeferredIndicator,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import type {
  CaseClientCopy,
  CaseRunContext,
  CaseWorkerReply,
  CaseWorkerRequest,
} from "./contract";

const MAX_BYTES = 1_000_000;
const DEBOUNCE_MS = 90;

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const modeInputs = [
    ...root.querySelectorAll<HTMLInputElement>("[data-mode]"),
  ];
  const copy = readClientCopy<CaseClientCopy>(root);
  let timer = 0;
  let revision = 0;
  let committedOutput: string | undefined;

  const mode = (): CaseMode =>
    (modeInputs.find((item) => item.checked)?.value ?? "upper") as CaseMode;
  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setActionsEnabled = (enabled: boolean) => {
    copyButton.disabled = downloadButton.disabled = !enabled;
  };
  const setStale = (stale: boolean) =>
    root.classList.toggle("has-stale-result", stale);
  const clearCommittedResult = () => {
    committedOutput = undefined;
    output.value = "";
    setActionsEnabled(false);
    setStale(false);
  };
  const restoreSettledStatus = () =>
    setStatus(
      committedOutput === undefined
        ? copy.ready
        : root.classList.contains("has-stale-result")
          ? copy.outdated
          : copy.converted,
      committedOutput === undefined
        ? "idle"
        : root.classList.contains("has-stale-result")
          ? "idle"
          : "success",
    );
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );
  const runner = createLatestWorkerRunner<
    CaseWorkerRequest,
    CaseWorkerReply,
    CaseRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: { id, input: context.source, mode: context.mode },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      if (context.revision !== revision) return;
      output.value = reply.output;
      committedOutput = reply.output;
      setStale(false);
      setActionsEnabled(true);
      setStatus(
        reply.output === context.source ? copy.noChange : copy.converted,
        "success",
      );
    },
    onFailure: (context) => {
      workingIndicator.end();
      if (context && context.revision !== revision) return;
      setActionsEnabled(false);
      setStatus(copy.processingFailed, "error");
    },
  });

  const cancelPending = () => {
    window.clearTimeout(timer);
    revision += 1;
    const wasWorking = workingIndicator.cancel();
    runner.cancel();
    if (wasWorking) restoreSettledStatus();
  };
  const schedule = () => {
    cancelPending();
    setActionsEnabled(false);
    if (!input.value) {
      clearCommittedResult();
      return setStatus(copy.ready);
    }
    if (committedOutput !== undefined) {
      setStale(true);
      setStatus(copy.outdated);
    }
    if (exceedsUtf8ByteLimit(input.value, MAX_BYTES))
      return setStatus(copy.tooLarge, "error");
    const runRevision = revision;
    timer = window.setTimeout(() => {
      workingIndicator.begin();
      runner.submit({
        source: input.value,
        mode: mode(),
        revision: runRevision,
      });
    }, DEBOUNCE_MS);
  };

  input.addEventListener("input", schedule);
  modeInputs.forEach((item) => item.addEventListener("change", schedule));
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    cancelPending();
    input.value = "";
    clearCommittedResult();
    setStatus(copy.ready);
    input.focus();
  });
  copyButton.addEventListener("click", async () => {
    if (committedOutput === undefined || copyButton.disabled) return;
    const copyRevision = revision;
    const value = committedOutput;
    const copied = await copyText(value);
    if (
      copyRevision !== revision ||
      committedOutput !== value ||
      copyButton.disabled
    )
      return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () => {
    if (committedOutput === undefined || downloadButton.disabled) return;
    downloadBlob(
      new Blob([committedOutput], { type: "text/plain;charset=utf-8" }),
      "converted-text.txt",
    );
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-case-converter]").forEach(init);
