import {
  createDeferredIndicator,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import {
  metricKeys,
  type WordClientCopy,
  type WordWorkerReply,
  type WordWorkerRequest,
} from "./contract";
const MAX_BYTES = 1_000_000;

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const locale = root.dataset.locale || "en";
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const approximate = root.querySelector<HTMLElement>("[data-approximate]")!;
  const copy = readClientCopy<WordClientCopy>(root);
  let timer = 0;
  let hasMetrics = false;
  const exceedsLimit = () => exceedsUtf8ByteLimit(input.value, MAX_BYTES);
  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
    accessibleMessage?: string,
  ) => {
    setToolStatus(root, status, message, state);
    if (accessibleMessage) status.setAttribute("aria-label", accessibleMessage);
    else status.removeAttribute("aria-label");
  };
  const clearMetrics = () => {
    root.querySelectorAll<HTMLElement>("[data-metric]").forEach((node) => {
      node.textContent = "0";
    });
    approximate.hidden = true;
    hasMetrics = false;
  };
  const restoreSettledStatus = () =>
    setStatus(
      hasMetrics ? copy.completed : copy.ready,
      hasMetrics ? "success" : "idle",
    );
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );
  const runner = createLatestWorkerRunner<
    WordWorkerRequest,
    WordWorkerReply,
    undefined
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id) => ({ payload: { id, text: input.value, locale } }),
    replyId: (reply) => reply.id,
    onReply: (reply) => {
      workingIndicator.end();
      metricKeys.forEach((key, index) => {
        const node = root.querySelector<HTMLElement>(
          `[data-metric="${index}"]`,
        );
        if (node) node.textContent = reply.metrics[key].toLocaleString(locale);
      });
      approximate.hidden = !reply.metrics.approximate;
      hasMetrics = true;
      setStatus(
        copy.completed,
        "success",
        reply.metrics.approximate
          ? `${copy.completed} ${copy.approximate}`
          : undefined,
      );
    },
    onFailure: () => {
      workingIndicator.end();
      clearMetrics();
      setStatus(copy.processingFailed, "error");
    },
  });
  const cancelPendingWork = () => {
    const wasWorking = workingIndicator.cancel();
    runner.cancel();
    if (wasWorking) restoreSettledStatus();
  };
  const run = () => {
    window.clearTimeout(timer);
    if (exceedsLimit()) {
      clearMetrics();
      setStatus(copy.tooLarge, "error");
      return;
    }
    workingIndicator.begin();
    runner.submit(undefined);
  };
  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    cancelPendingWork();
    if (exceedsLimit()) {
      clearMetrics();
      return setStatus(copy.tooLarge, "error");
    }
    if (!input.value) {
      clearMetrics();
      return setStatus(copy.ready);
    }
    if (!hasMetrics && root.classList.contains("has-error"))
      setStatus(copy.ready);
    timer = window.setTimeout(run, 90);
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    window.clearTimeout(timer);
    cancelPendingWork();
    input.value = "";
    clearMetrics();
    setStatus(copy.ready);
    input.focus();
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}
document.querySelectorAll<HTMLElement>("[data-word-counter]").forEach(init);
