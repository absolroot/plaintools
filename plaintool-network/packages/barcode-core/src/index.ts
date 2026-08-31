export const barcodeFormats = [
  "code128",
  "ean13",
  "upca",
  "code39",
  "ean8",
  "itf14",
] as const;

export type BarcodeFormat = (typeof barcodeFormats)[number];

export type BarcodeInputErrorCode =
  | "empty-input"
  | "digits-only"
  | "invalid-character"
  | "wrong-length"
  | "invalid-check-digit"
  | "input-too-long";

export type BarcodeOptionErrorCode =
  | "invalid-color"
  | "low-contrast"
  | "option-out-of-range";

export interface BarcodeValue {
  format: BarcodeFormat;
  sourceValue: string;
  encodedValue: string;
  checkDigitAdded: boolean;
}

export interface BarcodeOptions {
  moduleWidth: number;
  height: number;
  margin: number;
  displayValue: boolean;
  lineColor: string;
  background: string;
}

export interface BarcodeFormatSpec {
  payloadLength?: number;
  fullLength?: number;
  maxLength: number;
  numeric: boolean;
}

export const barcodeFormatSpecs = {
  code128: { maxLength: 80, numeric: false },
  ean13: { payloadLength: 12, fullLength: 13, maxLength: 13, numeric: true },
  upca: { payloadLength: 11, fullLength: 12, maxLength: 12, numeric: true },
  code39: { maxLength: 48, numeric: false },
  ean8: { payloadLength: 7, fullLength: 8, maxLength: 8, numeric: true },
  itf14: { payloadLength: 13, fullLength: 14, maxLength: 14, numeric: true },
} as const satisfies Record<BarcodeFormat, BarcodeFormatSpec>;

export const defaultBarcodeOptions: Readonly<BarcodeOptions> = {
  moduleWidth: 2,
  height: 80,
  margin: 10,
  displayValue: true,
  lineColor: "#000000",
  background: "#ffffff",
};

export class BarcodeInputError extends Error {
  constructor(
    public readonly code: BarcodeInputErrorCode,
    public readonly format: BarcodeFormat,
  ) {
    super(code);
  }
}

export class BarcodeOptionError extends Error {
  constructor(
    public readonly code: BarcodeOptionErrorCode,
    public readonly field:
      | "moduleWidth"
      | "height"
      | "margin"
      | "lineColor"
      | "background",
  ) {
    super(code);
  }
}

export function calculateGs1CheckDigit(payload: string): string {
  if (!/^\d+$/u.test(payload)) {
    throw new TypeError("digits-only");
  }
  let sum = 0;
  for (let index = payload.length - 1, position = 0; index >= 0; index -= 1) {
    const digit = Number(payload[index]);
    sum += digit * (position % 2 === 0 ? 3 : 1);
    position += 1;
  }
  return String((10 - (sum % 10)) % 10);
}

function validateNumericValue(
  format: BarcodeFormat,
  value: string,
): BarcodeValue {
  const spec = barcodeFormatSpecs[format];
  if (
    !spec.numeric ||
    spec.payloadLength === undefined ||
    spec.fullLength === undefined
  ) {
    throw new TypeError("numeric-format-required");
  }
  if (!/^\d+$/u.test(value)) {
    throw new BarcodeInputError("digits-only", format);
  }
  if (value.length !== spec.payloadLength && value.length !== spec.fullLength) {
    throw new BarcodeInputError("wrong-length", format);
  }
  if (value.length === spec.payloadLength) {
    return {
      format,
      sourceValue: value,
      encodedValue: value + calculateGs1CheckDigit(value),
      checkDigitAdded: true,
    };
  }
  const payload = value.slice(0, -1);
  if (value.at(-1) !== calculateGs1CheckDigit(payload)) {
    throw new BarcodeInputError("invalid-check-digit", format);
  }
  return {
    format,
    sourceValue: value,
    encodedValue: value,
    checkDigitAdded: false,
  };
}

export function validateBarcodeValue(
  format: BarcodeFormat,
  input: string,
): BarcodeValue {
  const value = input;
  if (!value) throw new BarcodeInputError("empty-input", format);
  const spec = barcodeFormatSpecs[format];
  if (value.length > spec.maxLength) {
    throw new BarcodeInputError("input-too-long", format);
  }
  if (spec.numeric) return validateNumericValue(format, value);

  if (format === "code128") {
    if (!/^[\x20-\x7e]+$/u.test(value)) {
      throw new BarcodeInputError("invalid-character", format);
    }
  } else if (!/^[0-9A-Z .$/+%-]+$/u.test(value)) {
    throw new BarcodeInputError("invalid-character", format);
  }

  return {
    format,
    sourceValue: value,
    encodedValue: value,
    checkDigitAdded: false,
  };
}

function normalizeHexColor(
  value: string,
  field: "lineColor" | "background",
): string {
  if (!/^#[\da-f]{6}$/iu.test(value)) {
    throw new BarcodeOptionError("invalid-color", field);
  }
  return value.toLowerCase();
}

function relativeLuminance(color: string): number {
  const channels = [1, 3, 5].map(
    (start) => Number.parseInt(color.slice(start, start + 2), 16) / 255,
  );
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

export function barcodeColorContrast(
  lineColor: string,
  background: string,
): number {
  const line = relativeLuminance(normalizeHexColor(lineColor, "lineColor"));
  const surface = relativeLuminance(
    normalizeHexColor(background, "background"),
  );
  return (Math.max(line, surface) + 0.05) / (Math.min(line, surface) + 0.05);
}

function validateIntegerOption(
  value: number,
  field: "moduleWidth" | "height" | "margin",
  minimum: number,
  maximum: number,
): number {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new BarcodeOptionError("option-out-of-range", field);
  }
  return value;
}

export function validateBarcodeOptions(
  input: Partial<BarcodeOptions> = {},
): BarcodeOptions {
  const options = { ...defaultBarcodeOptions, ...input };
  const lineColor = normalizeHexColor(options.lineColor, "lineColor");
  const background = normalizeHexColor(options.background, "background");
  if (barcodeColorContrast(lineColor, background) < 4.5) {
    throw new BarcodeOptionError("low-contrast", "lineColor");
  }
  return {
    moduleWidth: validateIntegerOption(
      options.moduleWidth,
      "moduleWidth",
      1,
      4,
    ),
    height: validateIntegerOption(options.height, "height", 40, 160),
    margin: validateIntegerOption(options.margin, "margin", 0, 40),
    displayValue: Boolean(options.displayValue),
    lineColor,
    background,
  };
}
