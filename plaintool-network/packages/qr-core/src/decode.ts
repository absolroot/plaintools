import jsQR from "jsqr";
import type { QrScanResult } from "./types";

export function decodeQrPixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): QrScanResult | null {
  if (data.length !== width * height * 4 || width < 1 || height < 1) {
    throw new RangeError("invalid-image-data");
  }
  const result = jsQR(data, width, height, {
    inversionAttempts: "attemptBoth",
  });
  if (!result) return null;
  return { text: result.data, bytes: Array.from(result.binaryData) };
}
