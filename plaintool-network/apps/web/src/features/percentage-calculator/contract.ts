import type {
  PercentageChangeDirection,
  PercentageErrorCode,
  PercentageField,
  PercentageMode,
} from "@plaintool/percentage-calculator-core";
import type { Locale } from "../../lib/site";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface PercentagePhraseCopy {
  start: string;
  between: string;
  end: string;
}

export interface PercentageCalculatorCopy {
  ariaLabel: string;
  modeSelectorLabel: string;
  modes: Record<PercentageMode, string>;
  phrases: Record<PercentageMode, PercentagePhraseCopy>;
  fields: Record<PercentageField, string>;
  calculate: string;
  resultTitle: string;
  resultLabels: Record<PercentageMode, string>;
  formulaLabel: string;
  calculated: string;
  directions: Record<PercentageChangeDirection, string>;
  errors: Record<PercentageErrorCode, string>;
}

export interface PercentageCalculatorClientCopy {
  feature: PercentageCalculatorCopy;
  common: ToolCommonCopy;
}

export interface PercentageCalculatorProps {
  locale: Locale;
  copy: PercentageCalculatorCopy;
  commonCopy: ToolCommonCopy;
  initialMode?: PercentageMode;
}
