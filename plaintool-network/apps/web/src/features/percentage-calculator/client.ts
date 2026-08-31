import {
  PercentageCalculationError,
  calculatePercentage,
  type PercentageCalculationInput,
  type PercentageField,
  type PercentageMode,
} from "@plaintool/percentage-calculator-core";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { PercentageCalculatorClientCopy } from "./contract";
import { createPercentageResultPresentation } from "./presentation";

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<PercentageCalculatorClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const resultLabel = root.querySelector<HTMLElement>("[data-result-label]")!;
  const resultValue = root.querySelector<HTMLOutputElement>(
    "[data-result-value]",
  )!;
  const direction = root.querySelector<HTMLElement>("[data-direction]")!;
  const working = root.querySelector<HTMLElement>("[data-working]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const modeButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-mode-button]"),
  ];
  const modePanels = [
    ...root.querySelectorAll<HTMLElement>("[data-mode-panel]"),
  ];
  let mode = (root.dataset.mode as PercentageMode | undefined) ?? "percent-of";
  let revision = 0;
  let committedText = "";

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const currentPanel = () =>
    root.querySelector<HTMLElement>(`[data-mode-panel="${mode}"]`)!;
  const field = (name: PercentageField) =>
    currentPanel().querySelector<HTMLInputElement>(`[data-field="${name}"]`)!;
  const clearInvalid = () =>
    root
      .querySelectorAll<HTMLInputElement>("[aria-invalid]")
      .forEach((input) => input.removeAttribute("aria-invalid"));
  const invalidate = () => {
    revision += 1;
    committedText = "";
    copyButton.disabled = true;
    results.hidden = true;
    resultLabel.textContent = "";
    resultValue.textContent = "";
    direction.textContent = "";
    direction.hidden = true;
    working.textContent = "";
  };
  const createInput = (): PercentageCalculationInput => {
    switch (mode) {
      case "percent-of":
        return {
          mode,
          percent: field("percent").value,
          base: field("base").value,
        };
      case "what-percent":
        return {
          mode,
          part: field("part").value,
          base: field("base").value,
        };
      case "whole-from-percent":
        return {
          mode,
          part: field("part").value,
          percent: field("percent").value,
        };
      case "percentage-change":
        return {
          mode,
          oldValue: field("oldValue").value,
          newValue: field("newValue").value,
        };
    }
  };
  const run = () => {
    clearInvalid();
    invalidate();
    try {
      const result = calculatePercentage(createInput());
      const presentation = createPercentageResultPresentation(result, locale);
      const label = copy.feature.resultLabels[result.mode];
      resultLabel.textContent = label;
      resultValue.textContent = presentation.value;
      working.textContent = presentation.working;
      if (presentation.direction) {
        direction.textContent = copy.feature.directions[presentation.direction];
        direction.hidden = false;
      }
      committedText = `${label}: ${presentation.value}\n${copy.feature.formulaLabel}: ${presentation.working}`;
      results.hidden = false;
      copyButton.disabled = false;
      setStatus(copy.feature.calculated, "success");
    } catch (error) {
      const domainError =
        error instanceof PercentageCalculationError ? error : null;
      const invalidField = domainError?.field;
      const target = invalidField ? field(invalidField) : null;
      target?.setAttribute("aria-invalid", "true");
      target?.focus();
      setStatus(
        domainError
          ? copy.feature.errors[domainError.code]
          : copy.common.processingFailed,
        "error",
      );
    }
  };
  const selectMode = (nextMode: PercentageMode) => {
    mode = nextMode;
    root.dataset.mode = mode;
    modeButtons.forEach((button) => {
      const active = button.dataset.modeButton === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    modePanels.forEach((panel) => {
      panel.hidden = panel.dataset.modePanel !== mode;
    });
    clearInvalid();
    invalidate();
    setStatus(copy.common.ready);
    currentPanel().querySelector<HTMLInputElement>("input")?.focus();
  };

  modeButtons.forEach((button) =>
    button.addEventListener("click", () =>
      selectMode(button.dataset.modeButton as PercentageMode),
    ),
  );
  root.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      invalidate();
      setStatus(copy.common.ready);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      run();
    });
  });
  root.querySelector("[data-calculate]")?.addEventListener("click", run);
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    root.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.value = "";
      input.removeAttribute("aria-invalid");
    });
    invalidate();
    setStatus(copy.common.ready);
    currentPanel().querySelector<HTMLInputElement>("input")?.focus();
  });
  copyButton.addEventListener("click", async () => {
    if (!committedText || copyButton.disabled) return;
    const text = committedText;
    const copyRevision = revision;
    const succeeded = await copyText(text);
    if (
      copyRevision !== revision ||
      committedText !== text ||
      copyButton.disabled
    )
      return;
    setStatus(
      succeeded ? copy.common.copied : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });
}

document
  .querySelectorAll<HTMLElement>("[data-percentage-calculator]")
  .forEach(init);
