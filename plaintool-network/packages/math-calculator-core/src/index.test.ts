import { describe, expect, it } from "vitest";
import {
  calculateFactors,
  calculateFraction,
  calculateLcm,
  FACTOR_INTEGER_MAX_DIGITS,
  LCM_INPUT_MAX_VALUES,
  MathCalculatorError,
} from "./index";

describe("fraction calculation", () => {
  it("reduces addition and reports mixed and terminating decimal forms", () => {
    expect(
      calculateFraction(
        { numerator: "3", denominator: "4" },
        { numerator: "5", denominator: "8" },
        "add",
      ),
    ).toMatchObject({
      fraction: "11/8",
      mixedNumber: "1 3/8",
      decimal: "1.375",
      decimalIsExact: true,
      working: {
        expression: "3/4 + 5/8",
        unreduced: "44/32",
        commonDivisor: "4",
      },
    });
  });

  it("normalizes signs and subtracts exactly", () => {
    expect(
      calculateFraction(
        { numerator: "-1", denominator: "-2" },
        { numerator: "5", denominator: "-6" },
        "subtract",
      ).fraction,
    ).toBe("4/3");
  });

  it("multiplies and cross-reduces large intermediate values", () => {
    expect(
      calculateFraction(
        { numerator: "999999999999", denominator: "3" },
        { numerator: "9", denominator: "999999999999" },
        "multiply",
      ).fraction,
    ).toBe("3");
  });

  it("divides and keeps a negative proper mixed-number display", () => {
    const result = calculateFraction(
      { numerator: "1", denominator: "3" },
      { numerator: "-2", denominator: "1" },
      "divide",
    );
    expect(result).toMatchObject({
      fraction: "-1/6",
      mixedNumber: "-1/6",
      working: { unreduced: "-1/6" },
    });
  });

  it("marks a bounded non-terminating decimal as approximate", () => {
    const result = calculateFraction(
      { numerator: "1", denominator: "3" },
      { numerator: "0", denominator: "1" },
      "add",
    );
    expect(result.decimal).toBe("0.333333333333");
    expect(result.decimalIsExact).toBe(false);
  });

  it("rejects zero denominators and division by a zero fraction", () => {
    expect(() =>
      calculateFraction(
        { numerator: "1", denominator: "0" },
        { numerator: "1", denominator: "2" },
        "add",
      ),
    ).toThrowError(expect.objectContaining({ code: "zero-denominator" }));
    expect(() =>
      calculateFraction(
        { numerator: "1", denominator: "2" },
        { numerator: "0", denominator: "9" },
        "divide",
      ),
    ).toThrowError(expect.objectContaining({ code: "division-by-zero" }));
  });
});

describe("factor calculation", () => {
  it("returns ordered factors, pairs, and prime powers", () => {
    expect(calculateFactors("360")).toEqual({
      value: "360",
      factors: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "8",
        "9",
        "10",
        "12",
        "15",
        "18",
        "20",
        "24",
        "30",
        "36",
        "40",
        "45",
        "60",
        "72",
        "90",
        "120",
        "180",
        "360",
      ],
      pairs: [
        { left: "1", right: "360" },
        { left: "2", right: "180" },
        { left: "3", right: "120" },
        { left: "4", right: "90" },
        { left: "5", right: "72" },
        { left: "6", right: "60" },
        { left: "8", right: "45" },
        { left: "9", right: "40" },
        { left: "10", right: "36" },
        { left: "12", right: "30" },
        { left: "15", right: "24" },
        { left: "18", right: "20" },
      ],
      primePowers: [
        { prime: "2", exponent: 3 },
        { prime: "3", exponent: 2 },
        { prime: "5", exponent: 1 },
      ],
      classification: "composite",
    });
  });

  it("handles square roots without duplicating a factor", () => {
    expect(calculateFactors("49").factors).toEqual(["1", "7", "49"]);
    expect(calculateFactors("49").pairs).toEqual([
      { left: "1", right: "49" },
      { left: "7", right: "7" },
    ]);
  });

  it("distinguishes units, primes, and composites", () => {
    expect(calculateFactors("1").classification).toBe("unit");
    expect(calculateFactors("999983").classification).toBe("prime");
    expect(calculateFactors("100000000000").classification).toBe("composite");
  });

  it.each(["0", "-12"])("rejects non-positive input %s", (input) => {
    expect(() => calculateFactors(input)).toThrowError(
      expect.objectContaining({ code: "positive-required" }),
    );
  });
});

describe("LCM and GCF calculation", () => {
  it("accepts signed comma or space separated integers", () => {
    expect(calculateLcm("-12, 18 30")).toMatchObject({
      values: ["-12", "18", "30"],
      lcm: "180",
      gcf: "6",
    });
  });

  it("returns nonnegative values and prime-factor working", () => {
    expect(calculateLcm("8, -9").primeFactorizations).toEqual([
      {
        value: "8",
        absoluteValue: "8",
        kind: "factors",
        primePowers: [{ prime: "2", exponent: 3 }],
      },
      {
        value: "-9",
        absoluteValue: "9",
        kind: "factors",
        primePowers: [{ prime: "3", exponent: 2 }],
      },
    ]);
  });

  it("handles zero and units explicitly", () => {
    const result = calculateLcm("0, -1, 6");
    expect(result).toMatchObject({ lcm: "0", gcf: "1" });
    expect(result.primeFactorizations.map(({ kind }) => kind)).toEqual([
      "zero",
      "unit",
      "factors",
    ]);
  });

  it("defines the all-zero GCF and LCM as zero", () => {
    expect(calculateLcm("0,0")).toMatchObject({ lcm: "0", gcf: "0" });
  });

  it("uses BigInt for an LCM beyond Number.MAX_SAFE_INTEGER", () => {
    expect(calculateLcm("9999999967,9999999973").lcm).toBe(
      "99999999400000000891",
    );
  });

  it("requires at least two integers and enforces the count bound", () => {
    expect(() => calculateLcm("12")).toThrowError(
      expect.objectContaining({ code: "too-few-values" }),
    );
    expect(() =>
      calculateLcm(
        Array(LCM_INPUT_MAX_VALUES + 1)
          .fill("2")
          .join(","),
      ),
    ).toThrowError(expect.objectContaining({ code: "too-many-values" }));
  });
});

describe("bounded integer parsing", () => {
  it.each(["1.5", "1e3", "0x10", "1/2", "--2"])(
    "rejects non-integer syntax %s",
    (input) => {
      expect(() => calculateFactors(input)).toThrowError(MathCalculatorError);
    },
  );

  it("rejects integers over the documented digit bound", () => {
    expect(() =>
      calculateFactors("1".repeat(FACTOR_INTEGER_MAX_DIGITS + 1)),
    ).toThrowError(expect.objectContaining({ code: "integer-too-large" }));
  });
});
