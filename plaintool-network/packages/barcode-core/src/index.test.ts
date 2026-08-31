import { describe, expect, it } from "vitest";
import {
  barcodeColorContrast,
  BarcodeInputError,
  BarcodeOptionError,
  calculateGs1CheckDigit,
  validateBarcodeOptions,
  validateBarcodeValue,
} from "./index";

describe("GS1 check digit", () => {
  it("calculates published GTIN examples", () => {
    expect(calculateGs1CheckDigit("400638133393")).toBe("1");
    expect(calculateGs1CheckDigit("03600029145")).toBe("2");
    expect(calculateGs1CheckDigit("1234567")).toBe("0");
  });

  it("rejects a non-numeric payload", () => {
    expect(() => calculateGs1CheckDigit("123A")).toThrow("digits-only");
  });
});

describe("barcode value validation", () => {
  it("accepts printable ASCII for Code 128", () => {
    expect(validateBarcodeValue("code128", "Order-123 / A")).toEqual({
      format: "code128",
      sourceValue: "Order-123 / A",
      encodedValue: "Order-123 / A",
      checkDigitAdded: false,
    });
  });

  it("preserves meaningful leading and trailing spaces", () => {
    expect(validateBarcodeValue("code128", " A ").encodedValue).toBe(" A ");
    expect(validateBarcodeValue("code39", " A ").encodedValue).toBe(" A ");
  });

  it("restricts Code 39 to its uppercase character set", () => {
    expect(validateBarcodeValue("code39", "PART 123-A.$/+%").encodedValue).toBe(
      "PART 123-A.$/+%",
    );
    expect(() => validateBarcodeValue("code39", "Part-123")).toThrowError(
      expect.objectContaining({ code: "invalid-character" }),
    );
  });

  it.each([
    ["ean13", "400638133393", "4006381333931"],
    ["upca", "03600029145", "036000291452"],
    ["ean8", "1234567", "12345670"],
    ["itf14", "1001234500001", "10012345000017"],
  ] as const)(
    "adds a check digit to a %s payload",
    (format, input, expected) => {
      expect(validateBarcodeValue(format, input)).toMatchObject({
        encodedValue: expected,
        checkDigitAdded: true,
      });
    },
  );

  it("accepts a valid full code and rejects a wrong check digit", () => {
    expect(validateBarcodeValue("ean13", "4006381333931")).toMatchObject({
      checkDigitAdded: false,
    });
    expect(() => validateBarcodeValue("ean13", "4006381333932")).toThrowError(
      expect.objectContaining({ code: "invalid-check-digit" }),
    );
  });

  it("distinguishes digit, length, empty, and size errors", () => {
    expect(() => validateBarcodeValue("upca", "03600A29145")).toThrowError(
      expect.objectContaining({ code: "digits-only" }),
    );
    expect(() => validateBarcodeValue("ean8", "123456")).toThrowError(
      expect.objectContaining({ code: "wrong-length" }),
    );
    expect(() => validateBarcodeValue("code128", "")).toThrowError(
      expect.objectContaining({ code: "empty-input" }),
    );
    expect(() => validateBarcodeValue("code128", "x".repeat(81))).toThrowError(
      expect.objectContaining({ code: "input-too-long" }),
    );
  });

  it("exposes typed input errors", () => {
    expect(() => validateBarcodeValue("ean13", "123")).toThrowError(
      BarcodeInputError,
    );
  });
});

describe("barcode appearance options", () => {
  it("normalizes safe defaults and custom values", () => {
    expect(
      validateBarcodeOptions({
        moduleWidth: 3,
        height: 120,
        margin: 20,
        displayValue: false,
        lineColor: "#112233",
        background: "#FFFFFF",
      }),
    ).toEqual({
      moduleWidth: 3,
      height: 120,
      margin: 20,
      displayValue: false,
      lineColor: "#112233",
      background: "#ffffff",
    });
  });

  it("requires integer options within bounded rendering ranges", () => {
    expect(() => validateBarcodeOptions({ moduleWidth: 0 })).toThrowError(
      expect.objectContaining({
        code: "option-out-of-range",
        field: "moduleWidth",
      }),
    );
    expect(() => validateBarcodeOptions({ height: 80.5 })).toThrowError(
      BarcodeOptionError,
    );
  });

  it("rejects invalid or low-contrast color pairs", () => {
    expect(() => validateBarcodeOptions({ lineColor: "black" })).toThrowError(
      expect.objectContaining({ code: "invalid-color" }),
    );
    expect(() =>
      validateBarcodeOptions({
        lineColor: "#777777",
        background: "#888888",
      }),
    ).toThrowError(expect.objectContaining({ code: "low-contrast" }));
    expect(barcodeColorContrast("#000000", "#ffffff")).toBeCloseTo(21);
  });
});
