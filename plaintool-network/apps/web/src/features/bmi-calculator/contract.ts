import type {
  AdultBmiCategory,
  BmiInputErrorCode,
  BmiUnitSystem,
} from "@plaintool/bmi-calculator-core";
import type { Locale } from "../../lib/site";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface BmiCalculatorCopy {
  ariaLabel: string;
  unitSystemLabel: string;
  metricUnit: string;
  usUnit: string;
  weightKilograms: string;
  heightCentimeters: string;
  weightPounds: string;
  heightFeet: string;
  heightInches: string;
  calculate: string;
  resultTitle: string;
  bmiLabel: string;
  categoryLabel: string;
  categories: Record<AdultBmiCategory, string>;
  healthyWeightRange: string;
  healthyWeightRangeTemplate: string;
  kilogramUnit: string;
  poundUnit: string;
  calculated: string;
  /** Must state that adult BMI is a screening estimate, not a diagnosis. */
  limitationTitle: string;
  /** Must explain that BMI does not directly measure body composition or health. */
  limitationBody: string;
  errors: Record<BmiInputErrorCode, string>;
}

export interface BmiCalculatorClientCopy {
  feature: BmiCalculatorCopy;
  common: ToolCommonCopy;
}

export interface BmiCalculatorProps {
  locale: Locale;
  copy: BmiCalculatorCopy;
  commonCopy: ToolCommonCopy;
  initialUnitSystem?: BmiUnitSystem;
}
