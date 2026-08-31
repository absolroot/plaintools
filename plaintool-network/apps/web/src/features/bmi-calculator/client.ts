import {
  BmiInputError,
  calculateAdultBmi,
  type AdultBmiInput,
  type BmiInputErrorCode,
  type BmiUnitSystem,
} from "@plaintool/bmi-calculator-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { BmiCalculatorClientCopy } from "./contract";

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) => values[key] ?? "");
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<BmiCalculatorClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const bmiNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const weightNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const fields = Object.fromEntries(
    [...root.querySelectorAll<HTMLInputElement>("[data-field]")].map(
      (field) => [field.dataset.field!, field],
    ),
  ) as Record<string, HTMLInputElement>;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setResult = (key: string, value: string) => {
    const target = results.querySelector<HTMLElement>(`[data-result="${key}"]`);
    if (target) target.textContent = value;
  };
  const clearInvalid = () =>
    Object.values(fields).forEach((field) =>
      field.removeAttribute("aria-invalid"),
    );
  const invalidate = () => {
    results.hidden = true;
    results
      .querySelectorAll<HTMLElement>("[data-result]")
      .forEach((target) => (target.textContent = ""));
  };
  const currentUnitSystem = (): BmiUnitSystem =>
    root.dataset.unitSystem === "us" ? "us" : "metric";
  const value = (key: string) => Number(fields[key].value);
  const createInput = (): AdultBmiInput =>
    currentUnitSystem() === "metric"
      ? {
          unitSystem: "metric",
          weightKilograms: value("weightKilograms"),
          heightCentimeters: value("heightCentimeters"),
        }
      : {
          unitSystem: "us",
          weightPounds: value("weightPounds"),
          heightFeet: value("heightFeet"),
          heightInches: value("heightInches"),
        };
  const fieldForError = (code: BmiInputErrorCode): HTMLInputElement => {
    const unitSystem = currentUnitSystem();
    if (code.startsWith("weight")) {
      return fields[
        unitSystem === "metric" ? "weightKilograms" : "weightPounds"
      ];
    }
    if (code === "feet-not-integer") return fields.heightFeet;
    if (code === "inches-out-of-range") return fields.heightInches;
    if (code === "non-finite-input") {
      const visibleFields = [
        ...root.querySelectorAll<HTMLInputElement>(
          `[data-unit-panel="${unitSystem}"] [data-field]`,
        ),
      ];
      return (
        visibleFields.find((field) => !Number.isFinite(Number(field.value))) ??
        visibleFields[0]
      );
    }
    return fields[unitSystem === "metric" ? "heightCentimeters" : "heightFeet"];
  };
  const run = () => {
    clearInvalid();
    invalidate();
    try {
      const result = calculateAdultBmi(createInput());
      const unitSystem = currentUnitSystem();
      const weightUnit =
        unitSystem === "metric"
          ? copy.feature.kilogramUnit
          : copy.feature.poundUnit;
      setResult("bmi", bmiNumber.format(result.bmi));
      setResult("category", copy.feature.categories[result.category]);
      setResult(
        "healthyWeightRange",
        fill(copy.feature.healthyWeightRangeTemplate, {
          minimum: weightNumber.format(result.healthyWeightRange.minimum),
          maximum: weightNumber.format(
            result.healthyWeightRange.maximumExclusive,
          ),
          unit: weightUnit,
        }),
      );
      results.hidden = false;
      setStatus(copy.feature.calculated, "success");
    } catch (error) {
      const code: BmiInputErrorCode =
        error instanceof BmiInputError ? error.code : "non-finite-input";
      const target = fieldForError(code);
      target.setAttribute("aria-invalid", "true");
      target.focus();
      setStatus(
        error instanceof BmiInputError
          ? copy.feature.errors[error.code]
          : copy.common.processingFailed,
        "error",
      );
    }
  };
  const resetAuthority = () => {
    clearInvalid();
    invalidate();
    setStatus(copy.common.ready);
  };

  root
    .querySelectorAll<HTMLButtonElement>("[data-unit-button]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        const unitSystem = button.dataset.unitButton as BmiUnitSystem;
        if (unitSystem === currentUnitSystem()) return;
        root.dataset.unitSystem = unitSystem;
        root
          .querySelectorAll<HTMLButtonElement>("[data-unit-button]")
          .forEach((candidate) => {
            const active = candidate === button;
            candidate.classList.toggle("is-active", active);
            candidate.setAttribute("aria-pressed", String(active));
          });
        root
          .querySelectorAll<HTMLElement>("[data-unit-panel]")
          .forEach(
            (panel) => (panel.hidden = panel.dataset.unitPanel !== unitSystem),
          );
        resetAuthority();
      }),
    );
  Object.values(fields).forEach((field) => {
    field.addEventListener("input", resetAuthority);
    field.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      run();
    });
  });
  root.querySelector("[data-calculate]")?.addEventListener("click", run);
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    Object.values(fields).forEach((field) => (field.value = ""));
    resetAuthority();
    const unitSystem = currentUnitSystem();
    fields[
      unitSystem === "metric" ? "weightKilograms" : "weightPounds"
    ].focus();
  });
}

document.querySelectorAll<HTMLElement>("[data-bmi-calculator]").forEach(init);
