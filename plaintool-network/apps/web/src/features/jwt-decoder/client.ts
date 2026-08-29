import type { DecodedJwt } from "@plaintool/jwt-core";
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
  JwtClientCopy,
  JwtRunContext,
  JwtWorkerReply,
  JwtWorkerRequest,
} from "./contract";

const MAX_BYTES = 1_000_000;
const DEBOUNCE_MS = 100;

function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<JwtClientCopy>(root);
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const outputs = {
    header: root.querySelector<HTMLTextAreaElement>('[data-output="header"]')!,
    payload: root.querySelector<HTMLTextAreaElement>(
      '[data-output="payload"]',
    )!,
    signature: root.querySelector<HTMLOutputElement>(
      '[data-output="signature"]',
    )!,
  };
  const signatureSize = root.querySelector<HTMLElement>(
    "[data-signature-size]",
  )!;
  const timestamps = root.querySelector<HTMLUListElement>("[data-timestamps]")!;
  const copyButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-copy-target]"),
  ];
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  let timer = 0;
  let revision = 0;
  let committed: DecodedJwt | undefined;

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
  const render = (result?: DecodedJwt) => {
    outputs.header.value = result?.headerText ?? "";
    outputs.payload.value = result?.payloadText ?? "";
    outputs.signature.textContent = result?.signature.hex ?? "";
    signatureSize.textContent = result
      ? format(copy.feature.signatureBytes, {
          count: result.signature.byteLength,
        })
      : "";
    timestamps.replaceChildren();
    if (!result?.timestamps.length) {
      const empty = document.createElement("li");
      empty.textContent = copy.feature.noTimestamps;
      timestamps.append(empty);
      return;
    }
    result.timestamps.forEach((timestamp) => {
      const item = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = copy.feature.timestampClaims[timestamp.claim];
      const value = document.createElement(timestamp.valid ? "time" : "span");
      value.textContent = timestamp.valid
        ? timestamp.iso
        : copy.feature.invalidTimestamp;
      if (timestamp.valid) value.setAttribute("datetime", timestamp.iso);
      item.append(label, value);
      timestamps.append(item);
    });
  };
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.common.working, "working"),
  );
  const runner = createLatestWorkerRunner<
    JwtWorkerRequest,
    JwtWorkerReply,
    JwtRunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({ payload: { id, input: context.source } }),
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
      committed = reply.result;
      render(reply.result);
      markStale(false);
      setActions(true);
      setStatus(copy.feature.decoded, "success");
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
    if (!input.value.trim()) {
      committed = undefined;
      render();
      markStale(false);
      setStatus(copy.common.ready);
      return;
    }
    if (committed) {
      markStale(true);
      setStatus(copy.feature.outdated);
    }
    if (exceedsUtf8ByteLimit(input.value, MAX_BYTES)) {
      setStatus(copy.feature.tooLarge, "error");
      return;
    }
    const runRevision = revision;
    timer = window.setTimeout(() => {
      workingIndicator.begin();
      runner.submit({ revision: runRevision, source: input.value });
    }, DEBOUNCE_MS);
  };

  input.addEventListener("input", schedule);
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    cancelPending();
    input.value = "";
    committed = undefined;
    render();
    markStale(false);
    setActions(false);
    setStatus(copy.common.ready);
    input.focus();
  });
  copyButtons.forEach((button) =>
    button.addEventListener("click", async () => {
      if (!committed || button.disabled) return;
      const target = button.dataset.copyTarget as
        | "header"
        | "payload"
        | "signature";
      const value =
        target === "header"
          ? committed.headerText
          : target === "payload"
            ? committed.payloadText
            : committed.signature.hex;
      const copyRevision = revision;
      const succeeded = await copyText(value);
      if (copyRevision !== revision || button.disabled) return;
      setStatus(
        succeeded ? copy.common.copied : copy.common.copyFailed,
        succeeded ? "success" : "error",
      );
    }),
  );
  downloadButton.addEventListener("click", () => {
    if (!committed || downloadButton.disabled) return;
    const text = [
      copy.feature.headerLabel,
      committed.headerText,
      "",
      copy.feature.payloadLabel,
      committed.payloadText,
      "",
      copy.feature.signatureLabel,
      committed.signature.hex,
    ].join("\n");
    downloadBlob(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
      "jwt-decoded.txt",
    );
  });
  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-jwt-decoder]").forEach(init);
