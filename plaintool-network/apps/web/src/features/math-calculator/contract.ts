import type {
  FractionOperation,
  IntegerClassification,
  MathCalculatorErrorCode,
} from "@plaintool/math-calculator-core";
import type { Locale } from "../../lib/site";
import type { ToolCommonCopy } from "../common-copy-contract";

export type MathCalculatorMode = "fraction" | "factor" | "lcm";

export interface MathCalculatorModeLink {
  href: string;
  label: string;
}

export interface MathCalculatorCopy {
  ariaLabel: string;
  calculate: string;
  fraction: {
    firstFraction: string;
    secondFraction: string;
    numerator: string;
    denominator: string;
    operation: string;
    operations: Record<FractionOperation, string>;
    inputHint: string;
    resultTitle: string;
    reducedFraction: string;
    mixedNumber: string;
    decimal: string;
    workingTitle: string;
    expression: string;
    reduction: string;
    reductionTemplate: string;
    exactDecimal: string;
    approximateDecimal: string;
    calculated: string;
  };
  factor: {
    inputLabel: string;
    inputPlaceholder: string;
    inputHint: string;
    resultTitle: string;
    primeFactorization: string;
    factors: string;
    factorPairs: string;
    classification: string;
    classifications: Record<IntegerClassification, string>;
    unitFactorization: string;
    pairTemplate: string;
    calculated: string;
  };
  lcm: {
    inputLabel: string;
    inputPlaceholder: string;
    inputHint: string;
    resultTitle: string;
    leastCommonMultiple: string;
    greatestCommonFactor: string;
    workingTitle: string;
    zeroFactorization: string;
    unitFactorization: string;
    factorizationTemplate: string;
    calculated: string;
  };
  errors: Record<MathCalculatorErrorCode, string>;
}

export interface MathCalculatorClientCopy {
  feature: MathCalculatorCopy;
  common: ToolCommonCopy;
}

export interface MathCalculatorProps {
  locale: Locale;
  copy: MathCalculatorCopy;
  commonCopy: ToolCommonCopy;
  initialMode: MathCalculatorMode;
  modeLinks: Record<MathCalculatorMode, MathCalculatorModeLink>;
}
