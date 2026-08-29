import { hashAlgorithms, type HashResults } from "@plaintool/hash-core";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import {
  copyText,
  createDeferredIndicator,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  HashClientCopy,
  HashRunContext,
  HashWorkerReply,
  HashWorkerRequest,
} from "./contract";

const MAX_TEXT_BYTES = 8_000_000;
const MAX_FILE_BYTES = 64 * 1024 * 1024;
const DEBOUNCE_MS = 120;

function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<HashClientCopy>(root);
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file-input]")!;
  const fileMeta = root.querySelector<HTMLElement>("[data-file-meta]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const copyButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-copy-hash]"),
  ];
  const outputs = new Map(
    [...root.querySelectorAll<HTMLInputElement>("[data-hash-output]")].map(
      (element) => [element.dataset.hashOutput!, element],
    ),
  );
  let pendingFile: File | null = null;
  let committed: HashResults | undefined;
  let timer = 0;
  let revision = 0;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setActions = (enabled: boolean) => {
    downloadButton.disabled = !enabled;
    copyButtons.forEach((button) => (button.disabled = !enabled));
  };
  const markStale = (stale: boolean) =>
    root.classList.toggle("has-stale-result", stale);
  const renderFile = () => {
    fileMeta.hidden = !pendingFile;
    fileMeta.textContent = pendingFile
      ? format(copy.feature.fileSelected, {
          name: pendingFile.name,
          size: formatBytes(pendingFile.size),
        })
      : "";
  };
  const renderResults = (results?: HashResults) => {
    hashAlgorithms.forEach((algorithm) => {
      const target = outputs.get(algorithm);
      if (target) target.value = results?.[algorithm] ?? "";
    });
  };
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.common.working, "working"),
  );
  const runner = createLatestWorkerRunner<
    HashWorkerRequest,
    HashWorkerReply,
    HashRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: async (id, context) => {
      const bytes =
        typeof context.source === "string"
          ? new TextEncoder().encode(context.source)
          : new Uint8Array(await context.source.arrayBuffer());
      return {
        payload: { id, input: bytes.buffer },
        transfer: [bytes.buffer],
      };
    },
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      if (context.revision !== revision) return;
      if (!reply.ok) {
        setActions(false);
        setStatus(
          reply.error === "processing-failed"
            ? copy.common.processingFailed
            : copy.feature.errors[reply.error],
          "error",
        );
        return;
      }
      committed = reply.results;
      renderResults(reply.results);
      markStale(false);
      setActions(true);
      setStatus(copy.feature.completed, "success");
    },
    onFailure: (context) => {
      workingIndicator.end();
      if (context && context.revision !== revision) return;
      setActions(false);
      setStatus(copy.common.processingFailed, "error");
    },
  });

  const cancelPending = () => {
    window.clearTimeout(timer);
    revision += 1;
    workingIndicator.cancel();
    runner.cancel();
  };
  const schedule = () => {
    cancelPending();
    setActions(false);
    const source = pendingFile ?? input.value;
    if (typeof source === "string" && !source) {
      committed = undefined;
      renderResults();
      markStale(false);
      setStatus(copy.common.ready);
      return;
    }
    if (committed) {
      markStale(true);
      setStatus(copy.feature.outdated);
    }
    if (source instanceof File && !source.size) {
      setStatus(copy.feature.errors["empty-input"], "error");
      return;
    }
    if (
      (typeof source === "string" &&
        exceedsUtf8ByteLimit(source, MAX_TEXT_BYTES)) ||
      (source instanceof File && source.size > MAX_FILE_BYTES)
    ) {
      setStatus(
        typeof source === "string"
          ? copy.feature.textTooLarge
          : copy.feature.fileTooLarge,
        "error",
      );
      return;
    }
    const runRevision = revision;
    timer = window.setTimeout(() => {
      workingIndicator.begin();
      runner.submit({ revision: runRevision, source });
    }, DEBOUNCE_MS);
  };
  const selectFile = (file: File | null) => {
    cancelPending();
    pendingFile = file;
    if (!file) return;
    input.value = "";
    renderFile();
    schedule();
  };

  input.addEventListener("input", () => {
    pendingFile = null;
    renderFile();
    schedule();
  });
  root
    .querySelector("[data-open-file]")
    ?.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    selectFile(fileInput.files?.[0] ?? null);
    fileInput.value = "";
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    cancelPending();
    pendingFile = null;
    committed = undefined;
    input.value = "";
    renderFile();
    renderResults();
    markStale(false);
    setActions(false);
    setStatus(copy.common.ready);
    input.focus();
  });
  copyButtons.forEach((button) =>
    button.addEventListener("click", async () => {
      const algorithm = button.dataset.copyHash as keyof HashResults;
      if (!committed || button.disabled) return;
      const copyRevision = revision;
      const value = committed[algorithm];
      const succeeded = await copyText(value);
      if (
        copyRevision !== revision ||
        committed?.[algorithm] !== value ||
        button.disabled
      )
        return;
      setStatus(
        succeeded ? copy.common.copied : copy.common.copyFailed,
        succeeded ? "success" : "error",
      );
    }),
  );
  downloadButton.addEventListener("click", () => {
    if (!committed || downloadButton.disabled) return;
    const text = hashAlgorithms
      .map((algorithm) => `${algorithm}: ${committed![algorithm]}`)
      .join("\n");
    downloadBlob(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
      "hashes.txt",
    );
  });
  ["dragenter", "dragover"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.add("is-dragging");
    }),
  );
  ["dragleave", "drop"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.remove("is-dragging");
    }),
  );
  root.addEventListener("drop", (event) =>
    selectFile(event.dataTransfer?.files?.[0] ?? null),
  );
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-hash-generator]").forEach(init);
