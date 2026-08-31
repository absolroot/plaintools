import type { ImageInputFormat } from "./formats";

export type NativeDecodeFailurePolicy =
  | "pixel-budget"
  | "fallback"
  | "decode-failed";

const fallbackDecoderFormats = new Set<ImageInputFormat>([
  "png",
  "jpg",
  "webp",
  "avif",
]);

export function classifyNativeDecodeFailure(
  source: ImageInputFormat,
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
