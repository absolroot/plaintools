import {
  convertUnit,
  unitsFor,
  type UnitCategory,
} from "@plaintool/unit-converter-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { UnitConverterCopy } from "./contract";
import { formatLocalizedNumber, parseLocalizedNumber } from "./number-format";

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<UnitConverterCopy>(root);
  const category = root.querySelector<HTMLSelectElement>("[data-category]")!;
  const value = root.querySelector<HTMLInputElement>("[data-value]")!;
  const from = root.querySelector<HTMLSelectElement>("[data-from]")!;
  const to = root.querySelector<HTMLSelectElement>("[data-to]")!;
  const result = root.querySelector<HTMLInputElement>("[data-result]")!;
  const formula = root.querySelector<HTMLOutputElement>("[data-formula]")!;
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
  let activeInput: HTMLInputElement = value;
  const clearInvalid = () => {
    value.removeAttribute("aria-invalid");
    result.removeAttribute("aria-invalid");
  };
  const run = () => {
    const raw = activeInput.value.trim();
    const parsed = parseLocalizedNumber(raw, copy.numberLocale);
    const otherInput = activeInput === value ? result : value;
    if (parsed === null) {
      otherInput.value = "";
      formula.value = "";
      activeInput.toggleAttribute("aria-invalid", Boolean(raw));
      otherInput.removeAttribute("aria-invalid");
      setToolStatus(
        root,
        status,
        raw ? copy.invalid : copy.ready,
        raw ? "error" : "idle",
      );
      return;
    }
    try {
      const sourceUnit = activeInput === value ? from.value : to.value;
      const targetUnit = activeInput === value ? to.value : from.value;
      const converted = convertUnit(parsed, sourceUnit, targetUnit);
      const source = unitsFor(category.value as UnitCategory).find(
        (item) => item.id === sourceUnit,
      )!;
      const target = unitsFor(category.value as UnitCategory).find(
        (item) => item.id === targetUnit,
      )!;
      const formattedSource = formatLocalizedNumber(parsed, copy.numberLocale);
      const formattedTarget = formatLocalizedNumber(
        converted,
        copy.numberLocale,
      );
      otherInput.value = formattedTarget;
      formula.value = `${formattedSource} ${source.symbol} = ${formattedTarget} ${target.symbol}`;
      clearInvalid();
      setToolStatus(root, status, copy.ready, "idle");
    } catch {
      otherInput.value = "";
      formula.value = "";
      activeInput.setAttribute("aria-invalid", "true");
      otherInput.removeAttribute("aria-invalid");
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
    activeInput = value;
    run();
  });
  value.addEventListener("input", () => {
    activeInput = value;
    run();
  });
  result.addEventListener("input", () => {
    activeInput = result;
    run();
  });
  [from, to].forEach((control) => control.addEventListener("change", run));
  root
    .querySelector<HTMLButtonElement>("[data-swap]")!
    .addEventListener("click", () => {
      const oldFrom = from.value;
      from.value = to.value;
      to.value = oldFrom;
      activeInput = value;
      run();
    });
  root.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      (event.target === value || event.target === result)
    ) {
      event.preventDefault();
      run();
    }
  });
  run();
}
document.querySelectorAll<HTMLElement>("[data-unit-converter]").forEach(init);
