import JsBarcode from "jsbarcode";
import { describe, expect, it } from "vitest";
import { barcodeLibraryFormats, parseSvgLength } from "./rendering";

const examples = {
  code128: "Order-123 / A",
  ean13: "4006381333931",
  upca: "036000291452",
  code39: "PART 123-A",
  ean8: "12345670",
  itf14: "10012345000017",
} as const;

describe("JsBarcode rendering contract", () => {
  it("normalizes CSS-sized SVG dimensions for a numeric viewBox", () => {
    expect(parseSvgLength("234px")).toBe(234);
    expect(parseSvgLength("122")).toBe(122);
    expect(parseSvgLength("0px")).toBeNull();
    expect(parseSvgLength("not-a-size")).toBeNull();
  });

  it.each(Object.entries(examples))(
    "encodes the curated %s format with the pinned library",
    (format, value) => {
      const target: { encodings?: { data: string }[] } = {};
      let valid = true;
      JsBarcode(target, value, {
        format:
          barcodeLibraryFormats[format as keyof typeof barcodeLibraryFormats],
        valid: (nextValid) => {
          valid = nextValid;
        },
      });

      expect(valid).toBe(true);
      expect(target.encodings?.length).toBeGreaterThan(0);
      expect(
        target.encodings?.every((encoding) => /^[01]+$/u.test(encoding.data)),
      ).toBe(true);
    },
  );
});
