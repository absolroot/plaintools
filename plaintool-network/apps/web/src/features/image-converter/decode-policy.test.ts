import { describe, expect, it } from "vitest";
import { classifyNativeDecodeFailure } from "./decode-policy";

describe("image converter native decode fallback policy", () => {
  it.each(["png", "jpg", "webp", "avif"] as const)(
    "uses the fallback decoder for a native %s decode failure",
    (source) => {
      expect(
        classifyNativeDecodeFailure(source, new Error("decode-failed")),
      ).toBe("fallback");
    },
  );

  it.each(["bmp", "gif"] as const)(
    "does not claim a fallback decoder for %s",
    (source) => {
      expect(
        classifyNativeDecodeFailure(source, new Error("decode-failed")),
      ).toBe("decode-failed");
    },
  );

  it.each(["bmp", "png", "jpg", "gif", "webp", "avif"] as const)(
    "preserves the pixel-budget failure for %s without falling back",
    (source) => {
      expect(
        classifyNativeDecodeFailure(
          source,
          new Error("image-dimensions-too-large"),
        ),
      ).toBe("pixel-budget");
    },
  );
});
