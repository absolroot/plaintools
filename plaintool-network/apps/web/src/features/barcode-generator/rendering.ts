import type { BarcodeFormat } from "@plaintool/barcode-core";

export const barcodeLibraryFormats = {
  code128: "CODE128",
  ean13: "EAN13",
  upca: "UPC",
  code39: "CODE39",
  ean8: "EAN8",
  itf14: "ITF14",
} as const satisfies Record<BarcodeFormat, string>;
