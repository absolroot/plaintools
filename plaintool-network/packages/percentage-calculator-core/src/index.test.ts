import { describe, expect, it } from "vitest";
import { PercentageCalculationError, calculatePercentage } from "./index";

describe("percentage calculations", () => {
  it("calculates a percentage of a value", () => {
    expect(
      calculatePercentage({ mode: "percent-of", percent: "12.5", base: "80" }),
    ).toEqual({
      mode: "percent-of",
      value: 10,
      percent: 12.5,
      base: 80,
    });
  });

  it("calculates what percentage one value is of another", () => {
    expect(
      calculatePercentage({ mode: "what-percent", part: "45", base: "60" }),
    ).toMatchObject({ value: 75 });
  });

  it("calculates the whole from a part and percentage", () => {
    expect(
      calculatePercentage({
        mode: "whole-from-percent",
        part: "18",
        percent: "30",
      }),
    ).toMatchObject({ value: 60 });
  });

  it("returns a signed percentage increase", () => {
    expect(
      calculatePercentage({
        mode: "percentage-change",
        oldValue: "80",
        newValue: "100",
      }),
    ).toMatchObject({ value: 25, direction: "increase" });
  });

  it("returns a signed percentage decrease", () => {
    expect(
      calculatePercentage({
        mode: "percentage-change",
        oldValue: "100",
        newValue: "80",
      }),
    ).toMatchObject({ value: -20, direction: "decrease" });
  });

  it("reports no change without preserving negative zero", () => {
    expect(
      calculatePercentage({
        mode: "percentage-change",
        oldValue: "-50",
        newValue: "-50",
      }),
    ).toMatchObject({ value: 0, direction: "no-change" });
  });

  it("keeps change direction intuitive when the old value is negative", () => {
    expect(
      calculatePercentage({
        mode: "percentage-change",
        oldValue: "-50",
        newValue: "-40",
      }),
    ).toMatchObject({ value: 20, direction: "increase" });
    expect(
      calculatePercentage({
        mode: "percentage-change",
        oldValue: "-50",
        newValue: "-60",
      }),
    ).toMatchObject({ value: -20, direction: "decrease" });
  });

  it("retains useful precision without floating-point residue", () => {
    expect(
      calculatePercentage({ mode: "percent-of", percent: "10", base: "0.2" }),
    ).toMatchObject({ value: 0.02 });
    expect(
      calculatePercentage({ mode: "what-percent", part: "1", base: "3" }),
    ).toMatchObject({ value: 33.3333333333333 });
  });

  it("accepts signs, leading decimals, and scientific notation", () => {
    expect(
      calculatePercentage({ mode: "percent-of", percent: ".5", base: "2e3" }),
    ).toMatchObject({ value: 10 });
    expect(
      calculatePercentage({ mode: "percent-of", percent: "-5", base: "200" }),
    ).toMatchObject({ value: -10 });
  });
});

describe("percentage input errors", () => {
  it.each([
    ["", "percent"],
    ["   ", "percent"],
  ])("rejects missing input %j", (percent, field) => {
    expect(() =>
      calculatePercentage({ mode: "percent-of", percent, base: "100" }),
    ).toThrowError(expect.objectContaining({ code: "missing-input", field }));
  });

  it.each(["Infinity", "NaN", "0x10", "1,000", "12%", "1 2", "--2"])(
    "rejects non-decimal or non-finite input %j",
    (percent) => {
      expect(() =>
        calculatePercentage({ mode: "percent-of", percent, base: "100" }),
      ).toThrowError(
        expect.objectContaining({ code: "invalid-number", field: "percent" }),
      );
    },
  );

  it("rejects numeric non-finite values", () => {
    expect(() =>
      calculatePercentage({ mode: "percent-of", percent: Infinity, base: 10 }),
    ).toThrowError(
      expect.objectContaining({ code: "invalid-number", field: "percent" }),
    );
  });

  it.each([
    [{ mode: "what-percent", part: "10", base: "0" }, "base"],
    [{ mode: "whole-from-percent", part: "10", percent: "-0" }, "percent"],
    [{ mode: "percentage-change", oldValue: "0", newValue: "10" }, "oldValue"],
  ] as const)("rejects a zero denominator", (input, field) => {
    expect(() => calculatePercentage(input)).toThrowError(
      expect.objectContaining({ code: "zero-denominator", field }),
    );
  });

  it("rejects a calculation that overflows", () => {
    expect(() =>
      calculatePercentage({
        mode: "percent-of",
        percent: "1e308",
        base: "1e308",
      }),
    ).toThrowError(expect.objectContaining({ code: "non-finite-result" }));
  });

  it("uses a typed domain error", () => {
    expect(() =>
      calculatePercentage({ mode: "what-percent", part: "1", base: "" }),
    ).toThrowError(PercentageCalculationError);
  });
});
