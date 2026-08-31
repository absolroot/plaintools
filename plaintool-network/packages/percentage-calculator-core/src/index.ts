export type PercentageMode =
  | "percent-of"
  | "what-percent"
  | "whole-from-percent"
  | "percentage-change";

export type PercentageField =
  | "percent"
  | "base"
  | "part"
  | "oldValue"
  | "newValue";

export type PercentageErrorCode =
  | "missing-input"
  | "invalid-number"
  | "zero-denominator"
  | "non-finite-result";

export class PercentageCalculationError extends Error {
  constructor(
    public readonly code: PercentageErrorCode,
    public readonly field: PercentageField | null,
  ) {
    super(code);
    this.name = "PercentageCalculationError";
  }
}

export type PercentageInputValue = string | number;

export type PercentageCalculationInput =
  | {
      mode: "percent-of";
      percent: PercentageInputValue;
      base: PercentageInputValue;
    }
  | {
      mode: "what-percent";
      part: PercentageInputValue;
      base: PercentageInputValue;
    }
  | {
      mode: "whole-from-percent";
      part: PercentageInputValue;
      percent: PercentageInputValue;
    }
  | {
      mode: "percentage-change";
      oldValue: PercentageInputValue;
      newValue: PercentageInputValue;
    };

export type PercentageChangeDirection = "increase" | "decrease" | "no-change";

export type PercentageCalculationResult =
  | {
      mode: "percent-of";
      value: number;
      percent: number;
      base: number;
    }
  | {
      mode: "what-percent";
      value: number;
      part: number;
      base: number;
    }
  | {
      mode: "whole-from-percent";
      value: number;
      part: number;
      percent: number;
    }
  | {
      mode: "percentage-change";
      value: number;
      oldValue: number;
      newValue: number;
      direction: PercentageChangeDirection;
    };

const DECIMAL_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/iu;
const SIGNIFICANT_DIGITS = 15;

function parseInput(
  input: PercentageInputValue,
  field: PercentageField,
): number {
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) {
      throw new PercentageCalculationError("missing-input", field);
    }
    if (!DECIMAL_PATTERN.test(trimmed)) {
      throw new PercentageCalculationError("invalid-number", field);
    }
    const value = Number(trimmed);
    if (!Number.isFinite(value)) {
      throw new PercentageCalculationError("invalid-number", field);
    }
    return Object.is(value, -0) ? 0 : value;
  }

  if (!Number.isFinite(input)) {
    throw new PercentageCalculationError("invalid-number", field);
  }
  return Object.is(input, -0) ? 0 : input;
}

function denominator(value: number, field: PercentageField): number {
  if (value === 0) {
    throw new PercentageCalculationError("zero-denominator", field);
  }
  return value;
}

function stabilize(value: number): number {
  if (!Number.isFinite(value)) {
    throw new PercentageCalculationError("non-finite-result", null);
  }
  if (Object.is(value, -0) || value === 0) return 0;
  return Number(value.toPrecision(SIGNIFICANT_DIGITS));
}

export function calculatePercentage(
  input: PercentageCalculationInput,
): PercentageCalculationResult {
  switch (input.mode) {
    case "percent-of": {
      const percent = parseInput(input.percent, "percent");
      const base = parseInput(input.base, "base");
      return {
        mode: input.mode,
        value: stabilize((percent / 100) * base),
        percent,
        base,
      };
    }
    case "what-percent": {
      const part = parseInput(input.part, "part");
      const base = denominator(parseInput(input.base, "base"), "base");
      return {
        mode: input.mode,
        value: stabilize((part / base) * 100),
        part,
        base,
      };
    }
    case "whole-from-percent": {
      const part = parseInput(input.part, "part");
      const percent = denominator(
        parseInput(input.percent, "percent"),
        "percent",
      );
      return {
        mode: input.mode,
        value: stabilize(part / (percent / 100)),
        part,
        percent,
      };
    }
    case "percentage-change": {
      const oldValue = denominator(
        parseInput(input.oldValue, "oldValue"),
        "oldValue",
      );
      const newValue = parseInput(input.newValue, "newValue");
      const value = stabilize(
        ((newValue - oldValue) / Math.abs(oldValue)) * 100,
      );
      return {
        mode: input.mode,
        value,
        oldValue,
        newValue,
        direction:
          value > 0 ? "increase" : value < 0 ? "decrease" : "no-change",
      };
    }
  }
}
