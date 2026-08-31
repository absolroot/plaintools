import {
  calculateFactors,
  calculateFraction,
  calculateLcm,
  MathCalculatorError,
  type FractionOperation,
  type PrimePower,
} from "@plaintool/math-calculator-core";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { MathCalculatorClientCopy, MathCalculatorMode } from "./contract";

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) => values[key] ?? "");
}

function formatPrimePowers(powers: PrimePower[]): string {
  return powers
    .map(({ prime, exponent }) =>
      exponent === 1 ? prime : `${prime}^${exponent}`,
    )
    .join(" × ");
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<MathCalculatorClientCopy>(root);
  const mode =
    (root.dataset.mode as MathCalculatorMode | undefined) ?? "fraction";
  const locale = root.dataset.locale ?? document.documentElement.lang;
  const list = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  });
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const resultPanel = results.querySelector<HTMLElement>(
    `[data-result-panel="${mode}"]`,
  )!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const fields = Object.fromEntries(
    [
      ...root.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "[data-field]",
      ),
    ].map((field) => [field.dataset.field!, field]),
  ) as Record<string, HTMLInputElement | HTMLSelectElement>;
  let revision = 0;
  let committedText = "";

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const setResult = (key: string, value: string) => {
    const target = resultPanel.querySelector<HTMLElement>(
      `[data-result="${key}"]`,
    );
    if (target) target.textContent = value;
  };
  const clearInvalid = () =>
    root
      .querySelectorAll<HTMLElement>("[aria-invalid]")
      .forEach((field) => field.removeAttribute("aria-invalid"));
  const invalidate = () => {
    revision += 1;
    committedText = "";
    copyButton.disabled = true;
    results.hidden = true;
    results.classList.remove("is-revealed");
    results
      .querySelectorAll<HTMLElement>("[data-result]")
      .forEach((target) => (target.textContent = ""));
  };
  const showResult = (
    textRows: { label: string; value: string }[],
    message: string,
  ) => {
    committedText = textRows
      .map(({ label, value }) => `${label}: ${value}`)
      .join("\n");
    results.hidden = false;
    results.classList.add("is-revealed");
    copyButton.disabled = false;
    setStatus(message, "success");
  };
  const markInvalid = (error: unknown) => {
    const code =
      error instanceof MathCalculatorError ? error.code : "invalid-integer";
    let target: HTMLInputElement | HTMLSelectElement | undefined;
    if (mode === "factor") target = fields.factor;
    else if (mode === "lcm") target = fields.lcm;
    else if (code === "zero-denominator") {
      target =
        fields.firstDenominator.value.trim() === "0"
          ? fields.firstDenominator
          : fields.secondDenominator;
    } else if (code === "division-by-zero") target = fields.secondNumerator;
    else {
      target = [
        fields.firstNumerator,
        fields.firstDenominator,
        fields.secondNumerator,
        fields.secondDenominator,
      ].find((field) => !/^[+-]?\d+$/u.test(field.value.trim()));
    }
    target ??= mode === "fraction" ? fields.firstNumerator : fields[mode];
    target?.setAttribute("aria-invalid", "true");
    target?.focus();
    setStatus(copy.feature.errors[code], "error");
  };

  const runFraction = () => {
    const result = calculateFraction(
      {
        numerator: fields.firstNumerator.value,
        denominator: fields.firstDenominator.value,
      },
      {
        numerator: fields.secondNumerator.value,
        denominator: fields.secondDenominator.value,
      },
      fields.operation.value as FractionOperation,
    );
    const decimal = fill(
      result.decimalIsExact
        ? copy.feature.fraction.exactDecimal
        : copy.feature.fraction.approximateDecimal,
      { value: result.decimal },
    );
    const reduction = fill(copy.feature.fraction.reductionTemplate, {
      unreduced: result.working.unreduced,
      divisor: result.working.commonDivisor,
      result: result.fraction,
    });
    setResult("fraction", result.fraction);
    setResult("mixedNumber", result.mixedNumber);
    setResult("decimal", decimal);
    setResult(
      "expression",
      `${result.working.expression} = ${result.working.unreduced}`,
    );
    setResult("reduction", reduction);
    showResult(
      [
        {
          label: copy.feature.fraction.reducedFraction,
          value: result.fraction,
        },
        { label: copy.feature.fraction.mixedNumber, value: result.mixedNumber },
        { label: copy.feature.fraction.decimal, value: decimal },
        {
          label: copy.feature.fraction.expression,
          value: `${result.working.expression} = ${result.working.unreduced}`,
        },
        { label: copy.feature.fraction.reduction, value: reduction },
      ],
      copy.feature.fraction.calculated,
    );
  };

  const runFactor = () => {
    const result = calculateFactors(fields.factor.value);
    const primeFactorization =
      result.classification === "unit"
        ? copy.feature.factor.unitFactorization
        : formatPrimePowers(result.primePowers);
    const factors = list.format(result.factors);
    const pairs = list.format(
      result.pairs.map(({ left, right }) =>
        fill(copy.feature.factor.pairTemplate, { left, right }),
      ),
    );
    const classification =
      copy.feature.factor.classifications[result.classification];
    setResult("primeFactorization", primeFactorization);
    setResult("classification", classification);
    setResult("factors", factors);
    setResult("factorPairs", pairs);
    showResult(
      [
        {
          label: copy.feature.factor.primeFactorization,
          value: primeFactorization,
        },
        { label: copy.feature.factor.classification, value: classification },
        { label: copy.feature.factor.factors, value: factors },
        { label: copy.feature.factor.factorPairs, value: pairs },
      ],
      copy.feature.factor.calculated,
    );
  };

  const runLcm = () => {
    const result = calculateLcm(fields.lcm.value);
    const working = result.primeFactorizations.map((entry) => {
      const factorization =
        entry.kind === "zero"
          ? copy.feature.lcm.zeroFactorization
          : entry.kind === "unit"
            ? copy.feature.lcm.unitFactorization
            : formatPrimePowers(entry.primePowers);
      return fill(copy.feature.lcm.factorizationTemplate, {
        value: entry.value,
        absoluteValue: entry.absoluteValue,
        factorization,
      });
    });
    setResult("lcm", result.lcm);
    setResult("gcf", result.gcf);
    const workingTarget = resultPanel.querySelector<HTMLElement>(
      '[data-result="lcmWorking"]',
    )!;
    working.forEach((line) => {
      const row = document.createElement("div");
      row.textContent = line;
      workingTarget.append(row);
    });
    showResult(
      [
        { label: copy.feature.lcm.leastCommonMultiple, value: result.lcm },
        { label: copy.feature.lcm.greatestCommonFactor, value: result.gcf },
        { label: copy.feature.lcm.workingTitle, value: working.join("\n") },
      ],
      copy.feature.lcm.calculated,
    );
  };

  const run = () => {
    clearInvalid();
    invalidate();
    try {
      if (mode === "fraction") runFraction();
      else if (mode === "factor") runFactor();
      else runLcm();
    } catch (error) {
      markInvalid(error);
    }
  };

  root
    .querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")
    .forEach((field) =>
      field.addEventListener("input", () => {
        clearInvalid();
        invalidate();
        setStatus(copy.common.ready);
      }),
    );
  root.querySelector("[data-calculate]")?.addEventListener("click", run);
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    root.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.value = "";
    });
    if (fields.operation) fields.operation.value = "add";
    clearInvalid();
    invalidate();
    setStatus(copy.common.ready);
    (mode === "fraction" ? fields.firstNumerator : fields[mode])?.focus();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement))
      return;
    event.preventDefault();
    run();
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

document.querySelectorAll<HTMLElement>("[data-math-calculator]").forEach(init);
