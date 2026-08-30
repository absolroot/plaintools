import { describe, expect, it } from "vitest";
import {
  FORMATTER_INPUT_LIMITS,
  FORMATTER_MAX_OUTPUT_BYTES,
  formatterOutputWithinLimit,
} from "./formatter-resource-policy";

describe("formatter resource policy", () => {
  it("keeps measured engine-specific automatic and hard input limits", () => {
    expect(FORMATTER_INPUT_LIMITS).toEqual({
      html: { auto: 64 * 1024, max: 1024 * 1024 },
      css: { auto: 256 * 1024, max: 2 * 1024 * 1024 },
      javascript: { auto: 256 * 1024, max: 2 * 1024 * 1024 },
      sql: { auto: 8 * 1024, max: 32 * 1024 },
    });
  });

  it("accepts output at the UTF-8 byte boundary", () => {
    expect(
      formatterOutputWithinLimit("a".repeat(FORMATTER_MAX_OUTPUT_BYTES)),
    ).toBe(true);
  });

  it("rejects ASCII and multibyte output beyond the byte boundary", () => {
    expect(
      formatterOutputWithinLimit("a".repeat(FORMATTER_MAX_OUTPUT_BYTES + 1)),
    ).toBe(false);
    expect(
      formatterOutputWithinLimit(
        "한".repeat(Math.floor(FORMATTER_MAX_OUTPUT_BYTES / 3) + 1),
      ),
    ).toBe(false);
  });
});
