import { describe, expect, it } from "vitest";
import { formatLocalizedNumber, parseLocalizedNumber } from "./number-format";

describe("unit converter localized numbers", () => {
  it("accepts the route decimal separator and a period fallback", () => {
    expect(parseLocalizedNumber("1,5", "de")).toBe(1.5);
    expect(parseLocalizedNumber("1.5", "de")).toBe(1.5);
    expect(parseLocalizedNumber("١٫٥", "ar")).toBe(1.5);
    expect(parseLocalizedNumber("1.5e2", "ko")).toBe(150);
  });

  it("rejects grouped or mixed-separator input instead of guessing", () => {
    expect(parseLocalizedNumber("1,234", "en")).toBeNull();
    expect(parseLocalizedNumber("1.234,5", "de")).toBeNull();
    expect(parseLocalizedNumber("1,234.5", "de")).toBeNull();
    expect(parseLocalizedNumber("Infinity", "en")).toBeNull();
  });

  it("formats without grouping using the route locale", () => {
    expect(formatLocalizedNumber(1234.5, "en")).toBe("1234.5");
    expect(formatLocalizedNumber(1234.5, "de")).toBe("1234,5");
    expect(formatLocalizedNumber(1234.5, "ar")).toContain("٫");
  });
});
