import {
  UrlCodecError,
  decodeUrl,
  encodeUrl,
  type UrlCodecMode,
  type UrlCodecScope,
} from "@plaintool/url-core";
import {
  appendBadge,
  copyText,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { UrlCodecClientCopy } from "./contract";

const MAX_BYTES = 2_000_000;
const DEBOUNCE_MS = 90;

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
  const copy = readClientCopy<UrlCodecClientCopy>(root);
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const badges = root.querySelector<HTMLElement>("[data-badges]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const scope = root.querySelector<HTMLSelectElement>("[data-scope]")!;
  const formSpace = root.querySelector<HTMLInputElement>("[data-form-space]")!;
  const recursive = root.querySelector<HTMLInputElement>("[data-recursive]")!;
  const passLimit = root.querySelector<HTMLSelectElement>("[data-pass-limit]")!;
  const decodeOptions = root.querySelector<HTMLElement>(
    "[data-decode-options]",
  )!;
  const inputLabel = root.querySelector<HTMLElement>("[data-input-label]")!;
  const outputLabel = root.querySelector<HTMLElement>("[data-output-label]")!;
  let mode = (root.dataset.mode ?? "encode") as UrlCodecMode;
  let timer = 0;
  let revision = 0;
  let committed: string | undefined;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setActions = (enabled: boolean) => {
    copyButton.disabled = downloadButton.disabled = !enabled;
  };
  const markStale = (stale: boolean) =>
    root.classList.toggle("has-stale-result", stale);
  const invalidatePending = () => {
    window.clearTimeout(timer);
    revision += 1;
  };

  const updateModeUi = () => {
    root.dataset.mode = mode;
    decodeOptions.hidden = mode !== "decode";
    inputLabel.textContent =
      mode === "encode"
        ? copy.feature.encodeInputLabel
        : copy.feature.decodeInputLabel;
    outputLabel.textContent =
      mode === "encode"
        ? copy.feature.encodeOutputLabel
        : copy.feature.decodeOutputLabel;
    input.placeholder =
      mode === "encode"
        ? copy.feature.encodePlaceholder
        : copy.feature.decodePlaceholder;
    root
      .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
      .forEach((button) => {
        const active = button.dataset.modeButton === mode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
  };

  const run = (runRevision: number) => {
    if (runRevision !== revision) return;
    badges.replaceChildren();
    try {
      if (exceedsUtf8ByteLimit(input.value, MAX_BYTES)) {
        throw new Error("too-large");
      }
      let next: string;
      if (mode === "encode") {
        next = encodeUrl(input.value, {
          scope: scope.value as UrlCodecScope,
          formSpace: formSpace.checked,
        });
      } else {
        const result = decodeUrl(input.value, {
          scope: scope.value as UrlCodecScope,
          formSpace: formSpace.checked,
          recursive: recursive.checked,
          maxPasses: Number(passLimit.value),
        });
        next = result.text;
        if (recursive.checked) {
          appendBadge(
            badges,
            format(copy.feature.passCount, { count: result.passes }),
            result.limitReached,
          );
        }
        if (result.limitReached)
          appendBadge(badges, copy.feature.limitReached, true);
      }
      if (runRevision !== revision) return;
      output.value = next;
      committed = next;
      markStale(false);
      setActions(true);
      setStatus(
        next === input.value
          ? copy.feature.unchanged
          : mode === "encode"
            ? copy.feature.encoded
            : copy.feature.decoded,
        "success",
      );
    } catch (error) {
      if (runRevision !== revision) return;
      setActions(false);
      const message =
        error instanceof UrlCodecError
          ? copy.feature.errors[error.code]
          : error instanceof Error && error.message === "too-large"
            ? copy.feature.tooLarge
            : copy.common.processingFailed;
      setStatus(message, "error");
    }
  };

  const schedule = () => {
    invalidatePending();
    badges.replaceChildren();
    setActions(false);
    if (!input.value) {
      output.value = "";
      committed = undefined;
      markStale(false);
      setStatus(copy.common.ready);
      return;
    }
    if (committed !== undefined) {
      markStale(true);
      setStatus(copy.feature.outdated);
    }
    const runRevision = revision;
    timer = window.setTimeout(() => run(runRevision), DEBOUNCE_MS);
  };

  root
    .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        const next = button.dataset.modeButton as UrlCodecMode;
        if (next === mode) return;
        mode = next;
        updateModeUi();
        schedule();
      }),
    );
  input.addEventListener("input", schedule);
  [scope, formSpace, recursive, passLimit].forEach((control) =>
    control.addEventListener("change", () => {
      passLimit.disabled = !recursive.checked;
      schedule();
    }),
  );
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    invalidatePending();
    input.value = output.value = "";
    committed = undefined;
    badges.replaceChildren();
    setActions(false);
    markStale(false);
    setStatus(copy.common.ready);
    input.focus();
  });
  copyButton.addEventListener("click", async () => {
    if (committed === undefined || copyButton.disabled) return;
    const copyRevision = revision;
    const value = committed;
    const succeeded = await copyText(value);
    if (copyRevision !== revision || committed !== value || copyButton.disabled)
      return;
    setStatus(
      succeeded ? copy.common.copied : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () => {
    if (committed === undefined || downloadButton.disabled) return;
    downloadBlob(
      new Blob([committed], { type: "text/plain;charset=utf-8" }),
      mode === "encode" ? "url-encoded.txt" : "url-decoded.txt",
    );
  });
  updateModeUi();
}

document.querySelectorAll<HTMLElement>("[data-url-codec]").forEach(init);
