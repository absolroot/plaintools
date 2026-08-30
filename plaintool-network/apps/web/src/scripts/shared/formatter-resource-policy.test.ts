import { describe, expect, it } from "vitest";
import {
  FORMATTER_MAX_OUTPUT_BYTES,
  formatterOutputWithinLimit,
} from "./formatter-resource-policy";

describe("formatter resource policy", () => {
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
