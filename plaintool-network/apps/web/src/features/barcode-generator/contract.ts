import type { BarcodeFormat } from "@plaintool/barcode-core";

export interface BarcodeFormatCopy {
  label: string;
  hint: string;
  example: string;
}

export interface BarcodeGeneratorCopy {
  ariaLabel: string;
  formatLabel: string;
  valueLabel: string;
  formatOptions: Record<BarcodeFormat, BarcodeFormatCopy>;
  clear: string;
  previewLabel: string;
  previewPlaceholder: string;
  appearanceTitle: string;
  moduleWidthLabel: string;
  moduleWidthOptions: Record<"1" | "2" | "3" | "4", string>;
  heightLabel: string;
  heightOptions: Record<"40" | "80" | "120" | "160", string>;
  marginLabel: string;
  marginOptions: Record<"0" | "10" | "20" | "30", string>;
  showText: string;
  foreground: string;
  background: string;
  downloadPng: string;
  downloadSvg: string;
  ready: string;
  generated: string;
  checkDigitAdded: string;
  previewAriaTemplate: string;
  errors: {
    digitsOnly: string;
    invalidCharacter: string;
    wrongLength: string;
    invalidCheckDigit: string;
    tooLong: string;
    invalidOption: string;
    invalidColor: string;
    lowContrast: string;
    generationFailed: string;
    downloadFailed: string;
  };
}
