export const FRACTION_INTEGER_MAX_DIGITS = 50;
export const FACTOR_INTEGER_MAX_DIGITS = 12;
export const LCM_INTEGER_MAX_DIGITS = 10;
export const LCM_INPUT_MAX_VALUES = 12;

export type MathCalculatorErrorCode =
  | "empty-input"
  | "invalid-integer"
  | "integer-too-large"
  | "zero-denominator"
  | "division-by-zero"
  | "positive-required"
  | "too-few-values"
  | "too-many-values";

export class MathCalculatorError extends Error {
  constructor(public readonly code: MathCalculatorErrorCode) {
    super(code);
    this.name = "MathCalculatorError";
  }
}

export type FractionOperation = "add" | "subtract" | "multiply" | "divide";

export interface FractionInput {
  numerator: string;
  denominator: string;
}

export interface FractionResult {
  numerator: string;
  denominator: string;
  fraction: string;
  mixedNumber: string;
  decimal: string;
  decimalIsExact: boolean;
  working: {
    expression: string;
    unreduced: string;
    commonDivisor: string;
  };
}

export interface PrimePower {
  prime: string;
  exponent: number;
}

export type IntegerClassification = "unit" | "prime" | "composite";

export interface FactorResult {
  value: string;
  factors: string[];
  pairs: { left: string; right: string }[];
  primePowers: PrimePower[];
  classification: IntegerClassification;
}

export type PrimeFactorizationKind = "zero" | "unit" | "factors";

export interface LcmPrimeFactorization {
  value: string;
  absoluteValue: string;
  kind: PrimeFactorizationKind;
  primePowers: PrimePower[];
}

export interface LcmResult {
  values: string[];
  lcm: string;
  gcf: string;
  primeFactorizations: LcmPrimeFactorization[];
}

function abs(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function gcd(first: bigint, second: bigint): bigint {
  let left = abs(first);
  let right = abs(second);
  while (right !== 0n) {
    [left, right] = [right, left % right];
  }
  return left;
}

function parseInteger(value: string, maximumDigits: number): bigint {
  const trimmed = value.trim();
  if (!trimmed) throw new MathCalculatorError("empty-input");
  if (!/^[+-]?\d+$/u.test(trimmed)) {
    throw new MathCalculatorError("invalid-integer");
  }
  const digits = trimmed.replace(/^[+-]/u, "").replace(/^0+(?=\d)/u, "");
  if (digits.length > maximumDigits) {
    throw new MathCalculatorError("integer-too-large");
  }
  return BigInt(trimmed);
}

function normalizedFraction(
  numerator: bigint,
  denominator: bigint,
): {
  numerator: bigint;
  denominator: bigint;
  divisor: bigint;
} {
  if (denominator === 0n) {
    throw new MathCalculatorError("zero-denominator");
  }
  const sign = denominator < 0n ? -1n : 1n;
  const signedNumerator = numerator * sign;
  const positiveDenominator = denominator * sign;
  const divisor = gcd(signedNumerator, positiveDenominator);
  return {
    numerator: signedNumerator / divisor,
    denominator: positiveDenominator / divisor,
    divisor,
  };
}

function fractionText(numerator: bigint, denominator: bigint): string {
  return denominator === 1n
    ? numerator.toString()
    : `${numerator}/${denominator}`;
}

function mixedNumberText(numerator: bigint, denominator: bigint): string {
  if (denominator === 1n || abs(numerator) < denominator) {
    return fractionText(numerator, denominator);
  }
  const whole = numerator / denominator;
  const remainder = abs(numerator % denominator);
  return remainder === 0n
    ? whole.toString()
    : `${whole} ${remainder}/${denominator}`;
}

function decimalText(
  numerator: bigint,
  denominator: bigint,
  maximumPlaces = 12,
): { value: string; exact: boolean } {
  const negative = numerator < 0n;
  let remainder = abs(numerator) % denominator;
  const integer = abs(numerator) / denominator;
  if (remainder === 0n) {
    return { value: `${negative ? "-" : ""}${integer}`, exact: true };
  }
  let digits = "";
  while (remainder !== 0n && digits.length < maximumPlaces) {
    remainder *= 10n;
    digits += (remainder / denominator).toString();
    remainder %= denominator;
  }
  return {
    value: `${negative ? "-" : ""}${integer}.${digits}`,
    exact: remainder === 0n,
  };
}

export function calculateFraction(
  firstInput: FractionInput,
  secondInput: FractionInput,
  operation: FractionOperation,
): FractionResult {
  const first = normalizedFraction(
    parseInteger(firstInput.numerator, FRACTION_INTEGER_MAX_DIGITS),
    parseInteger(firstInput.denominator, FRACTION_INTEGER_MAX_DIGITS),
  );
  const second = normalizedFraction(
    parseInteger(secondInput.numerator, FRACTION_INTEGER_MAX_DIGITS),
    parseInteger(secondInput.denominator, FRACTION_INTEGER_MAX_DIGITS),
  );
  if (operation === "divide" && second.numerator === 0n) {
    throw new MathCalculatorError("division-by-zero");
  }

  let numerator: bigint;
  let denominator: bigint;
  if (operation === "add" || operation === "subtract") {
    const direction = operation === "add" ? 1n : -1n;
    numerator =
      first.numerator * second.denominator +
      direction * second.numerator * first.denominator;
    denominator = first.denominator * second.denominator;
  } else if (operation === "multiply") {
    numerator = first.numerator * second.numerator;
    denominator = first.denominator * second.denominator;
  } else {
    numerator = first.numerator * second.denominator;
    denominator = first.denominator * second.numerator;
  }

  const workingNumerator = denominator < 0n ? -numerator : numerator;
  const workingDenominator = abs(denominator);
  const reduced = normalizedFraction(numerator, denominator);
  const decimal = decimalText(reduced.numerator, reduced.denominator);
  const symbols: Record<FractionOperation, string> = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
  };
  return {
    numerator: reduced.numerator.toString(),
    denominator: reduced.denominator.toString(),
    fraction: fractionText(reduced.numerator, reduced.denominator),
    mixedNumber: mixedNumberText(reduced.numerator, reduced.denominator),
    decimal: decimal.value,
    decimalIsExact: decimal.exact,
    working: {
      expression: `${fractionText(first.numerator, first.denominator)} ${symbols[operation]} ${fractionText(second.numerator, second.denominator)}`,
      unreduced: fractionText(workingNumerator, workingDenominator),
      commonDivisor: reduced.divisor.toString(),
    },
  };
}

function primeFactorize(value: bigint): PrimePower[] {
  const powers: PrimePower[] = [];
  let remainder = abs(value);
  let divisor = 2n;
  while (divisor * divisor <= remainder) {
    let exponent = 0;
    while (remainder % divisor === 0n) {
      remainder /= divisor;
      exponent += 1;
    }
    if (exponent > 0) {
      powers.push({ prime: divisor.toString(), exponent });
    }
    divisor = divisor === 2n ? 3n : divisor + 2n;
  }
  if (remainder > 1n) {
    powers.push({ prime: remainder.toString(), exponent: 1 });
  }
  return powers;
}

export function calculateFactors(input: string): FactorResult {
  const value = parseInteger(input, FACTOR_INTEGER_MAX_DIGITS);
  if (value <= 0n) throw new MathCalculatorError("positive-required");

  const lower: bigint[] = [];
  const upper: bigint[] = [];
  const pairs: { left: string; right: string }[] = [];
  for (let candidate = 1n; candidate * candidate <= value; candidate += 1n) {
    if (value % candidate !== 0n) continue;
    const counterpart = value / candidate;
    lower.push(candidate);
    if (counterpart !== candidate) upper.push(counterpart);
    pairs.push({ left: candidate.toString(), right: counterpart.toString() });
  }
  const factors = [...lower, ...upper.reverse()].map(String);
  const primePowers = primeFactorize(value);
  return {
    value: value.toString(),
    factors,
    pairs,
    primePowers,
    classification:
      value === 1n
        ? "unit"
        : primePowers.length === 1 && primePowers[0].exponent === 1
          ? "prime"
          : "composite",
  };
}

export function calculateLcm(input: string): LcmResult {
  const trimmed = input.trim();
  if (!trimmed) throw new MathCalculatorError("empty-input");
  if (!/^[+\-\d,\t ]+$/u.test(trimmed)) {
    throw new MathCalculatorError("invalid-integer");
  }
  const parts = trimmed.split(/[\s,]+/u).filter(Boolean);
  if (parts.length < 2) throw new MathCalculatorError("too-few-values");
  if (parts.length > LCM_INPUT_MAX_VALUES) {
    throw new MathCalculatorError("too-many-values");
  }
  const parsed = parts.map((part) =>
    parseInteger(part, LCM_INTEGER_MAX_DIGITS),
  );
  const common = parsed.reduce((current, value) => gcd(current, value), 0n);
  const multiple = parsed.reduce((current, value) => {
    const positive = abs(value);
    if (current === 0n || positive === 0n) return 0n;
    return (current / gcd(current, positive)) * positive;
  }, 1n);

  return {
    values: parsed.map(String),
    lcm: multiple.toString(),
    gcf: common.toString(),
    primeFactorizations: parsed.map((value) => {
      const positive = abs(value);
      return {
        value: value.toString(),
        absoluteValue: positive.toString(),
        kind: positive === 0n ? "zero" : positive === 1n ? "unit" : "factors",
        primePowers: primeFactorize(positive),
      };
    }),
  };
}
