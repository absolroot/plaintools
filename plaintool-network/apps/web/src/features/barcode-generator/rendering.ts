import type { BarcodeFormat } from "@plaintool/barcode-core";

export const barcodeLibraryFormats = {
  code128: "CODE128",
  ean13: "EAN13",
  upca: "UPC",
  code39: "CODE39",
  ean8: "EAN8",
  itf14: "ITF14",
} as const satisfies Record<BarcodeFormat, string>;

export function parseSvgLength(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
