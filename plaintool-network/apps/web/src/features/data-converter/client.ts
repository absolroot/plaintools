import type {
  DataConversionMode,
  DataConversionOptions,
} from "@plaintool/data-conversion-core";
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
  DataConverterCopy,
  DataConverterRunContext,
  DataConverterWorkerReply,
  DataConverterWorkerRequest,
  DelimiterOption,
} from "./contract";

const MAX_BYTES = 10 * 1024 * 1024;
const AUTO_DELAY = 180;

const outputDefinitions: Record<
  DataConversionMode,
  { filename: string; mime: string }
> = {
  "csv-to-markdown": {
    filename: "converted.md",
    mime: "text/markdown;charset=utf-8",
  },
  "markdown-to-csv": {
    filename: "converted.csv",
    mime: "text/csv;charset=utf-8",
  },
  "json-to-csv": {
    filename: "converted.csv",
    mime: "text/csv;charset=utf-8",
  },
  "csv-to-json": {
    filename: "converted.json",
    mime: "application/json;charset=utf-8",
  },
  "html-to-markdown": {
    filename: "converted.md",
    mime: "text/markdown;charset=utf-8",
  },
  "markdown-to-html": {
    filename: "converted.html",
    mime: "text/html;charset=utf-8",
  },
};

function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function initDataConverter(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const mode = root.dataset.mode as DataConversionMode;
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const delimiterControl =
    root.querySelector<HTMLSelectElement>("[data-delimiter]");
  const headerControl = root.querySelector<HTMLInputElement>(
    "[data-first-row-header]",
  );
  const prettyControl =
    root.querySelector<HTMLInputElement>("[data-pretty-json]");
  const copy = readClientCopy<DataConverterCopy>(root);
  let revision = 0;
  let timer = 0;
  let committedOutput = "";

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const invalidateResult = () => {
    committedOutput = "";
    output.value = "";
    copyButton.disabled = downloadButton.disabled = true;
  };
  const markResultPending = () => {
    copyButton.disabled = downloadButton.disabled = true;
  };
  const restoreSettledStatus = () =>
    setStatus(
      committedOutput ? copy.complete : copy.ready,
      committedOutput ? "success" : "idle",
    );
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );
  const options = (): DataConversionOptions => ({
    delimiter: ((delimiterControl?.value ?? "auto") === "tab"
      ? "\t"
      : (delimiterControl?.value ?? "auto")) as DelimiterOption,
    firstRowHeader: headerControl?.checked ?? true,
    prettyJson: prettyControl?.checked ?? true,
  });
  const runner = createLatestWorkerRunner<
    DataConverterWorkerRequest,
    DataConverterWorkerReply,
    DataConverterRunContext & { options: DataConversionOptions }
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: {
        id,
        mode: context.mode,
        input: context.source,
        options: context.options,
      },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      workingIndicator.end();
      if (context.revision !== revision || context.source !== input.value)
        return;
      if (!reply.ok) {
        invalidateResult();
        const message =
          copy.errorMessages[reply.error] ?? copy.processingFailed;
        const located =
          reply.line === undefined
            ? message
            : interpolate(copy.errorAt, {
                message,
                line: reply.line,
                column: reply.column ?? 1,
              });
        setStatus(located, "error");
        return;
      }
      output.value = reply.output;
      committedOutput = reply.output;
      copyButton.disabled = downloadButton.disabled = reply.output.length === 0;
      setStatus(copy.complete, "success");
    },
    onFailure: () => {
      workingIndicator.end();
      invalidateResult();
      setStatus(copy.processingFailed, "error");
    },
  });

  const cancelPendingWork = () => {
    window.clearTimeout(timer);
    revision += 1;
    const wasWorking = workingIndicator.cancel();
    runner.cancel();
    if (wasWorking) restoreSettledStatus();
  };
  const run = () => {
    window.clearTimeout(timer);
    workingIndicator.cancel();
    runner.cancel();
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    if (exceedsUtf8ByteLimit(input.value, MAX_BYTES)) {
      invalidateResult();
      setStatus(copy.tooLarge, "error");
      return;
    }
    revision += 1;
    markResultPending();
    workingIndicator.begin();
    runner.submit({
      mode,
      source: input.value,
      revision,
      options: options(),
    });
  };
  const readFile = async (file: File) => {
    cancelPendingWork();
    invalidateResult();
    if (file.size > MAX_BYTES) {
      setStatus(copy.tooLarge, "error");
      return;
    }
    const loadRevision = revision;
    try {
      const contents = await file.text();
      if (loadRevision !== revision) return;
      input.value = contents;
      run();
    } catch {
      if (loadRevision === revision) setStatus(copy.readFailed, "error");
    }
  };

  input.addEventListener("input", () => {
    cancelPendingWork();
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    if (exceedsUtf8ByteLimit(input.value, MAX_BYTES)) {
      invalidateResult();
      setStatus(copy.tooLarge, "error");
      return;
    }
    if (root.classList.contains("has-error")) restoreSettledStatus();
    markResultPending();
    timer = window.setTimeout(run, AUTO_DELAY);
  });
  input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run();
    }
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    cancelPendingWork();
    input.value = fileInput.value = "";
    invalidateResult();
    setStatus(copy.ready);
    input.focus();
  });
  root
    .querySelector<HTMLButtonElement>("[data-open-file]")!
    .addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void readFile(file);
  });
  [delimiterControl, headerControl, prettyControl].forEach((control) =>
    control?.addEventListener("change", () => {
      cancelPendingWork();
      if (input.value) run();
    }),
  );
  copyButton.addEventListener("click", async () => {
    const copyRevision = revision;
    const value = output.value;
    const copied = await copyText(value);
    if (copyRevision !== revision || value !== output.value) return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () => {
    if (!committedOutput) return;
    const definition = outputDefinitions[mode];
    downloadBlob(
      new Blob([committedOutput], { type: definition.mime }),
      definition.filename,
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
  root.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (file) void readFile(file);
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document
  .querySelectorAll<HTMLElement>("[data-data-converter]")
  .forEach(initDataConverter);
