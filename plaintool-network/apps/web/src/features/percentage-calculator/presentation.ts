import type {
  PercentageCalculationResult,
  PercentageChangeDirection,
} from "@plaintool/percentage-calculator-core";

export interface PercentageResultPresentation {
  value: string;
  working: string;
  direction: PercentageChangeDirection | null;
}

export function createPercentageResultPresentation(
  result: PercentageCalculationResult,
  locale: string,
): PercentageResultPresentation {
  const number = new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 15,
    useGrouping: true,
  });
  const signedNumber = new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 15,
    signDisplay: "exceptZero",
    useGrouping: true,
  });
  const format = (value: number) => number.format(value);
  const formatResult = (value: number, signed = false) =>
    `${signed ? signedNumber.format(value) : format(value)}%`;

  switch (result.mode) {
    case "percent-of": {
      const value = format(result.value);
      return {
        value,
        working: `(${format(result.percent)}% ÷ 100) × ${format(result.base)} = ${value}`,
        direction: null,
      };
    }
    case "what-percent": {
      const value = formatResult(result.value);
      return {
        value,
        working: `(${format(result.part)} ÷ ${format(result.base)}) × 100 = ${value}`,
        direction: null,
      };
    }
    case "whole-from-percent": {
      const value = format(result.value);
      return {
        value,
        working: `${format(result.part)} ÷ (${format(result.percent)}% ÷ 100) = ${value}`,
        direction: null,
      };
    }
    case "percentage-change": {
      const value = formatResult(result.value, true);
      return {
        value,
        working: `(${format(result.newValue)} − ${format(result.oldValue)}) ÷ |${format(result.oldValue)}| × 100 = ${value}`,
        direction: result.direction,
      };
    }
  }
}
