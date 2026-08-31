import type { ToolCommonCopy } from "../common-copy-contract";

export type PasswordStrengthBand =
  | "limited"
  | "moderate"
  | "strong"
  | "veryStrong";

export interface PasswordGeneratorCopy {
  ariaLabel: string;
  resultLabel: string;
  resultPlaceholder: string;
  copyPasswordLabel: string;
  regenerate: string;
  optionsLabel: string;
  lengthLabel: string;
  lengthSliderLabel: string;
  characterTypesLabel: string;
  lowercase: string;
  uppercase: string;
  digits: string;
  symbols: string;
  excludeAmbiguous: string;
  excludeAmbiguousHint: string;
  strengthLabel: string;
  strengthLevels: Record<PasswordStrengthBand, string>;
  strengthHints: Record<PasswordStrengthBand, string>;
  /** Includes the `{bits}` placeholder. */
  entropyEstimate: string;
  entropyHint: string;
  generated: string;
  errors: {
    /** Includes the `{min}` and `{max}` placeholders. */
    lengthRange: string;
    noCharacterTypes: string;
    randomUnavailable: string;
    generationFailed: string;
  };
}

export interface PasswordGeneratorClientCopy {
  feature: PasswordGeneratorCopy;
  common: ToolCommonCopy;
}

export interface PasswordGeneratorProps {
  copy: PasswordGeneratorCopy;
  commonCopy: ToolCommonCopy;
}
