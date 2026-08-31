import type { ImageFormat } from "./formats";

export type NativeDecodeFailurePolicy =
  | "pixel-budget"
  | "fallback"
  | "decode-failed";

const fallbackDecoderFormats = new Set<ImageFormat>([
  "png",
  "jpg",
  "webp",
  "avif",
]);

export function classifyNativeDecodeFailure(
  source: ImageFormat,
  error: unknown,
): NativeDecodeFailurePolicy {
  if (
    error instanceof Error &&
    error.message === "image-dimensions-too-large"
  ) {
    return "pixel-budget";
  }
  return fallbackDecoderFormats.has(source) ? "fallback" : "decode-failed";
}
