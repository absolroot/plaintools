import {
  IpSubnetError,
  calculateIpv4Subnet,
  type IpSubnetResult,
} from "@plaintool/ip-subnet-core";
import {
  copyText,
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { IpSubnetClientCopy } from "./contract";
import {
  createIpSubnetResultRows,
  createIpSubnetTextResult,
} from "./result-presentation";

const DEBOUNCE_MS = 90;

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<IpSubnetClientCopy>(root);
  const input = root.querySelector<HTMLInputElement>("[data-input]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const resultSurface = root.querySelector<HTMLElement>("[data-results]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const rowCopyButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-copy-result]"),
  ];
  let timer = 0;
  let revision = 0;
  let committed: { text: string; values: Record<string, string> } | undefined;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setActions = (enabled: boolean) => {
    copyButton.disabled = downloadButton.disabled = !enabled;
    rowCopyButtons.forEach((button) => (button.disabled = !enabled));
  };
  const clearRenderedResult = () => {
    committed = undefined;
    setActions(false);
    resultSurface.hidden = true;
    resultSurface
      .querySelectorAll<HTMLElement>(
        "[data-result], [data-semantics], [data-classification], [data-classification-block], [data-binary]",
      )
      .forEach((element) => (element.textContent = ""));
    root.classList.remove("has-stale-result");
  };
  const invalidatePending = () => {
    window.clearTimeout(timer);
    revision += 1;
    setActions(false);
  };
  const render = (result: IpSubnetResult) => {
    const rows = createIpSubnetResultRows(result, copy.feature);
    rows.forEach(({ key, value }) => {
      const field = resultSurface.querySelector<HTMLElement>(
        `[data-result="${key}"]`,
      );
      if (field) field.textContent = value;
    });
    resultSurface.querySelector<HTMLElement>("[data-semantics]")!.textContent =
      copy.feature.semantics[result.semantics];
    resultSurface.querySelector<HTMLElement>(
      "[data-classification]",
    )!.textContent = copy.feature.classifications[result.classification.code];
    const blockRow = resultSurface.querySelector<HTMLElement>(
      "[data-classification-block-row]",
    )!;
    const block = resultSurface.querySelector<HTMLElement>(
      "[data-classification-block]",
    )!;
    blockRow.hidden = !result.classification.cidr;
    block.textContent = result.classification.cidr ?? "";
    Object.entries(result.binary ?? {}).forEach(([key, value]) => {
      const field = resultSurface.querySelector<HTMLElement>(
        `[data-binary="${key}"]`,
      );
      if (field) field.textContent = value;
    });
    const text = createIpSubnetTextResult(result, copy.feature);
    committed = {
      text,
      values: Object.fromEntries(rows.map(({ key, value }) => [key, value])),
    };
    resultSurface.hidden = false;
    root.classList.remove("has-stale-result");
    input.removeAttribute("aria-invalid");
    setActions(true);
    setStatus(copy.feature.calculated, "success");
  };
  const run = (runRevision: number, source: string) => {
    if (runRevision !== revision || source !== input.value) return;
    try {
      const result = calculateIpv4Subnet(source, { includeBinary: true });
      if (runRevision !== revision || source !== input.value) return;
      render(result);
    } catch (error) {
      if (runRevision !== revision || source !== input.value) return;
      clearRenderedResult();
      input.setAttribute("aria-invalid", "true");
      setStatus(
        error instanceof IpSubnetError
          ? copy.feature.errors[error.code]
          : copy.common.processingFailed,
        "error",
      );
    }
  };
  const schedule = () => {
    invalidatePending();
    input.removeAttribute("aria-invalid");
    if (!input.value.trim()) {
      clearRenderedResult();
      setStatus(copy.common.ready);
      return;
    }
    if (committed) {
      root.classList.add("has-stale-result");
      setStatus(copy.feature.outdated);
    } else {
      setStatus(copy.common.ready);
    }
    const runRevision = revision;
    const source = input.value;
    timer = window.setTimeout(() => run(runRevision, source), DEBOUNCE_MS);
  };

  input.addEventListener("input", schedule);
  root.querySelector("[data-sample]")?.addEventListener("click", () => {
    if (input.value.length > 0) {
      input.focus();
      return;
    }
    input.value = root.dataset.sampleInput ?? "";
    input.focus();
    schedule();
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    invalidatePending();
    input.value = "";
    input.removeAttribute("aria-invalid");
    clearRenderedResult();
    setStatus(copy.common.ready);
    input.focus();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    invalidatePending();
    const runRevision = revision;
    run(runRevision, input.value);
  });
  copyButton.addEventListener("click", async () => {
    if (!committed || copyButton.disabled) return;
    const authority = committed;
    const copyRevision = revision;
    const succeeded = await copyText(authority.text);
    if (
      copyRevision !== revision ||
      committed !== authority ||
      copyButton.disabled
    )
      return;
    setStatus(
      succeeded ? copy.common.copied : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });
  rowCopyButtons.forEach((button) =>
    button.addEventListener("click", async () => {
      const key = button.dataset.copyResult!;
      if (!committed || button.disabled || !(key in committed.values)) return;
      const authority = committed;
      const copyRevision = revision;
      const succeeded = await copyText(authority.values[key]);
      if (
        copyRevision !== revision ||
        committed !== authority ||
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
    downloadBlob(
      new Blob([committed.text], { type: "text/plain;charset=utf-8" }),
      copy.feature.downloadFilename,
    );
  });
}

document.querySelectorAll<HTMLElement>("[data-ip-subnet]").forEach(init);
