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

const criticalBmiPaths = [
  "ariaLabel",
  "unitSystemLabel",
  "metricUnit",
  "usUnit",
  "weightKilograms",
  "heightCentimeters",
  "weightPounds",
  "heightFeet",
  "heightInches",
  "calculate",
  "resultTitle",
  "categoryLabel",
  "categories.underweight",
  "categories.healthy",
  "categories.overweight",
  "categories.obesity",
  "healthyWeightRange",
  "calculated",
  "limitationTitle",
  "limitationBody",
  "errors.non-finite-input",
  "errors.weight-not-positive",
  "errors.height-not-positive",
  "errors.weight-out-of-range",
  "errors.height-out-of-range",
  "errors.feet-not-integer",
  "errors.inches-out-of-range",
] as const;

const criticalPercentagePaths = [
  "ariaLabel",
  "modeSelectorLabel",
  "modes.percent-of",
  "modes.what-percent",
  "modes.whole-from-percent",
  "modes.percentage-change",
  "phrases.percent-of.start",
  "phrases.percent-of.between",
  "fields.percent",
  "fields.base",
  "fields.part",
  "fields.oldValue",
  "fields.newValue",
  "calculate",
  "resultTitle",
  "resultLabels.percentage-change",
  "formulaLabel",
  "calculated",
  "directions.increase",
  "directions.decrease",
  "errors.missing-input",
  "errors.invalid-number",
  "errors.zero-denominator",
  "errors.non-finite-result",
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

  it("localizes BMI page copy instead of retaining the English fallback", () => {
    const english = calculatorSuiteFor("en").pages["bmi-calculator"];
    for (const locale of locales.filter((item) => item !== "en")) {
      const page = calculatorSuiteFor(locale).pages["bmi-calculator"];
      expect(page.title, `${locale}:title`).not.toBe(english.title);
      expect(page.description, `${locale}:description`).not.toBe(
        english.description,
      );
      expect(page.mobileDescription, `${locale}:mobileDescription`).not.toBe(
        english.mobileDescription,
      );
      expect(page.guide, `${locale}:guide`).not.toBe(english.guide);
      expect(page.terms[0], `${locale}:terms`).not.toBe(english.terms[0]);
    }
  });

  it("localizes percentage page copy instead of retaining the English fallback", () => {
    const english = calculatorSuiteFor("en").pages["percentage-calculator"];
    for (const locale of locales.filter((item) => item !== "en")) {
      const page = calculatorSuiteFor(locale).pages["percentage-calculator"];
      expect(page.title, `${locale}:title`).not.toBe(english.title);
      expect(page.description, `${locale}:description`).not.toBe(
        english.description,
      );
      expect(page.mobileDescription, `${locale}:mobileDescription`).not.toBe(
        english.mobileDescription,
      );
      expect(page.guide, `${locale}:guide`).not.toBe(english.guide);
      expect(page.terms, `${locale}:terms`).not.toEqual(english.terms);
    }
  });

  it("does not reuse English percentage UI or error copy", () => {
    const english = new Map(flattenCopy(calculatorSuiteFor("en").percentage));
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = new Map(
        flattenCopy(calculatorSuiteFor(locale).percentage),
      );
      for (const path of criticalPercentagePaths) {
        expect(localized.get(path), `${locale}:${path}`).not.toBe(
          english.get(path),
        );
      }
    }
  });

  it("does not reuse English BMI result, limitation, or error copy", () => {
    const english = new Map(flattenCopy(calculatorSuiteFor("en").bmi));
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = new Map(flattenCopy(calculatorSuiteFor(locale).bmi));
      for (const path of criticalBmiPaths) {
        expect(localized.get(path), `${locale}:${path}`).not.toBe(
          english.get(path),
        );
      }
    }
  });

  it("preserves BMI interpolation tokens across all locales", () => {
    const english = new Map(flattenCopy(calculatorSuiteFor("en").bmi));
    for (const locale of locales) {
      const localized = new Map(flattenCopy(calculatorSuiteFor(locale).bmi));
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
