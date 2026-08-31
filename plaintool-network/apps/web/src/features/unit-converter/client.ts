import {
  convertUnit,
  unitsFor,
  type UnitCategory,
} from "@plaintool/unit-converter-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { UnitConverterCopy } from "./contract";

const numberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/iu;

function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 12,
  }).format(value);
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<UnitConverterCopy>(root);
  const category = root.querySelector<HTMLSelectElement>("[data-category]")!;
  const value = root.querySelector<HTMLInputElement>("[data-value]")!;
  const from = root.querySelector<HTMLSelectElement>("[data-from]")!;
  const to = root.querySelector<HTMLSelectElement>("[data-to]")!;
  const result = root.querySelector<HTMLOutputElement>("[data-result]")!;
  const resultUnit = root.querySelector<HTMLElement>("[data-result-unit]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const populate = (select: HTMLSelectElement, selected: string) => {
    select.replaceChildren(
      ...unitsFor(category.value as UnitCategory).map((unit) => {
        const option = document.createElement("option");
        option.value = unit.id;
        option.textContent = `${copy.unitNames[unit.id] ?? unit.name} (${unit.symbol})`;
        option.selected = unit.id === selected;
        return option;
      }),
    );
  };
  const run = () => {
    const raw = value.value.trim();
    if (!raw || !numberPattern.test(raw)) {
      result.value = "";
      resultUnit.textContent = "";
      value.toggleAttribute("aria-invalid", Boolean(raw));
      setToolStatus(
        root,
        status,
        raw ? copy.invalid : copy.ready,
        raw ? "error" : "idle",
      );
      return;
    }
    try {
      const converted = convertUnit(Number(raw), from.value, to.value);
      const unit = unitsFor(category.value as UnitCategory).find(
        (item) => item.id === to.value,
      )!;
      result.value = formatNumber(converted);
      resultUnit.textContent = unit.symbol;
      value.removeAttribute("aria-invalid");
      setToolStatus(root, status, copy.ready, "success");
    } catch {
      result.value = "";
      resultUnit.textContent = "";
      value.setAttribute("aria-invalid", "true");
      setToolStatus(root, status, copy.invalid, "error");
    }
  };
  category.addEventListener("change", () => {
    const defaults: Record<UnitCategory, [string, string]> = {
      length: ["meter", "foot"],
      mass: ["kilogram", "pound"],
      temperature: ["celsius", "fahrenheit"],
      area: ["square-meter", "square-foot"],
      volume: ["liter", "us-gallon"],
      speed: ["kilometer-per-hour", "mile-per-hour"],
      data: ["megabyte", "megabit"],
      time: ["hour", "minute"],
    };
    const [fromDefault, toDefault] = defaults[category.value as UnitCategory];
    populate(from, fromDefault);
    populate(to, toDefault);
    run();
  });
  [value, from, to].forEach((control) =>
    control.addEventListener("input", run),
  );
  root
    .querySelector<HTMLButtonElement>("[data-swap]")!
    .addEventListener("click", () => {
      const oldFrom = from.value;
      from.value = to.value;
      to.value = oldFrom;
      run();
    });
  root.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target === value) {
      event.preventDefault();
      run();
    }
  });
  run();
}
document.querySelectorAll<HTMLElement>("[data-unit-converter]").forEach(init);
