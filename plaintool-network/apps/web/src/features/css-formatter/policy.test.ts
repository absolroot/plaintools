import { describe, expect, it } from "vitest";
import { classifyCssInputBytes, CSS_AUTO_BYTES, CSS_MAX_BYTES } from "./policy";

describe("CSS browser input policy", () => {
  it.each([
    [0, "empty"],
    [1, "auto"],
    [CSS_AUTO_BYTES, "auto"],
    [CSS_AUTO_BYTES + 1, "manual"],
    [CSS_MAX_BYTES, "manual"],
    [CSS_MAX_BYTES + 1, "too-large"],
  ] as const)("classifies %s bytes as %s", (bytes, expected) => {
    expect(classifyCssInputBytes(bytes)).toBe(expected);
  });
});
