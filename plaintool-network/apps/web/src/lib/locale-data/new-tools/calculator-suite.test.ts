import { describe, expect, it } from "vitest";
import { copyPlaceholders, flattenCopy } from "../../locale-test-helpers";
import { locales } from "../../site";
import { calculatorSuiteFor, type CalculatorPageId } from "./calculator-suite";

const mathPageIds = [
  "fraction-calculator",
  "factor-calculator",
  "lcm-calculator",
] as const satisfies readonly CalculatorPageId[];

const criticalMathPaths = [
  "ariaLabel",
  "calculate",
  "fraction.firstFraction",
  "fraction.secondFraction",
  "fraction.numerator",
  "fraction.denominator",
  "fraction.operation",
  "fraction.operations.add",
  "fraction.operations.subtract",
  "fraction.operations.multiply",
  "fraction.operations.divide",
  "fraction.inputHint",
  "fraction.resultTitle",
  "fraction.reducedFraction",
  "fraction.mixedNumber",
  "fraction.workingTitle",
  "fraction.reduction",
  "fraction.calculated",
  "factor.inputLabel",
  "factor.inputHint",
  "factor.resultTitle",
  "factor.primeFactorization",
  "factor.factors",
  "factor.factorPairs",
  "factor.classification",
  "factor.classifications.unit",
  "factor.classifications.prime",
  "factor.classifications.composite",
  "factor.calculated",
  "lcm.inputLabel",
  "lcm.inputHint",
  "lcm.resultTitle",
  "lcm.leastCommonMultiple",
  "lcm.greatestCommonFactor",
  "lcm.workingTitle",
  "lcm.zeroFactorization",
  "lcm.calculated",
  "errors.empty-input",
  "errors.invalid-integer",
  "errors.integer-too-large",
  "errors.zero-denominator",
  "errors.division-by-zero",
  "errors.positive-required",
  "errors.too-few-values",
  "errors.too-many-values",
] as const;

describe("calculator suite locale copy", () => {
  it("localizes the page copy for all three math calculators", () => {
    const english = calculatorSuiteFor("en");
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = calculatorSuiteFor(locale);
      for (const id of mathPageIds) {
        const page = localized.pages[id];
        const englishPage = english.pages[id];
        expect(page.title, `${locale}:${id}:title`).not.toBe(englishPage.title);
        expect(page.description, `${locale}:${id}:description`).not.toBe(
          englishPage.description,
        );
        expect(
          page.mobileDescription,
          `${locale}:${id}:mobileDescription`,
        ).not.toBe(englishPage.mobileDescription);
        expect(page.guide, `${locale}:${id}:guide`).not.toBe(englishPage.guide);
        expect(page.terms[0], `${locale}:${id}:terms`).not.toBe(
          englishPage.terms[0],
        );
      }
    }
  });

  it("does not reuse the English baseline for critical UI and error copy", () => {
    const english = new Map(flattenCopy(calculatorSuiteFor("en").math));
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = new Map(flattenCopy(calculatorSuiteFor(locale).math));
      for (const path of criticalMathPaths) {
        expect(localized.get(path), `${locale}:${path}`).not.toBe(
          english.get(path),
        );
      }
    }
  });

  it("preserves every interpolation token across all locales", () => {
    const english = new Map(flattenCopy(calculatorSuiteFor("en").math));
    for (const locale of locales) {
      const localized = new Map(flattenCopy(calculatorSuiteFor(locale).math));
      expect([...localized.keys()].sort(), locale).toEqual(
        [...english.keys()].sort(),
      );
      for (const [path, value] of localized) {
        expect(copyPlaceholders(value), `${locale}:${path}`).toEqual(
          copyPlaceholders(english.get(path) ?? ""),
        );
      }
    }
  });
});
