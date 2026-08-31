import { describe, expect, it } from "vitest";
import {
  BmiInputError,
  calculateAdultBmi,
  classifyAdultBmi,
  type AdultBmiInput,
} from "./index";

describe("adult BMI calculation", () => {
  it("calculates metric BMI and the healthy weight interval", () => {
    const result = calculateAdultBmi({
      unitSystem: "metric",
      weightKilograms: 70,
      heightCentimeters: 175,
    });

    expect(result.bmi).toBeCloseTo(22.8571, 4);
    expect(result.category).toBe("healthy");
    expect(result.healthyWeightRange).toMatchObject({
      unit: "kilograms",
      minimum: expect.closeTo(56.65625, 5),
      maximumExclusive: expect.closeTo(76.5625, 5),
    });
  });

  it("calculates US customary input using exact unit conversions", () => {
    const result = calculateAdultBmi({
      unitSystem: "us",
      weightPounds: 154.324,
      heightFeet: 5,
      heightInches: 8.8976,
    });

    expect(result.bmi).toBeCloseTo(22.8571, 3);
    expect(result.category).toBe("healthy");
    expect(result.healthyWeightRange.unit).toBe("pounds");
  });

  it.each([
    [18.4999, "underweight"],
    [18.5, "healthy"],
    [24.9999, "healthy"],
    [25, "overweight"],
    [29.9999, "overweight"],
    [30, "obesity"],
  ] as const)("classifies BMI %s as %s", (bmi, category) => {
    expect(classifyAdultBmi(bmi)).toBe(category);
  });
});

describe("adult BMI input validation", () => {
  it.each([
    [
      {
        unitSystem: "metric",
        weightKilograms: Number.NaN,
        heightCentimeters: 170,
      },
      "non-finite-input",
    ],
    [
      {
        unitSystem: "metric",
        weightKilograms: 70,
        heightCentimeters: Infinity,
      },
      "non-finite-input",
    ],
    [
      { unitSystem: "metric", weightKilograms: 0, heightCentimeters: 170 },
      "weight-not-positive",
    ],
    [
      { unitSystem: "metric", weightKilograms: 70, heightCentimeters: 0 },
      "height-not-positive",
    ],
    [
      { unitSystem: "metric", weightKilograms: 9, heightCentimeters: 170 },
      "weight-out-of-range",
    ],
    [
      { unitSystem: "metric", weightKilograms: 501, heightCentimeters: 170 },
      "weight-out-of-range",
    ],
    [
      { unitSystem: "metric", weightKilograms: 70, heightCentimeters: 99 },
      "height-out-of-range",
    ],
    [
      { unitSystem: "metric", weightKilograms: 70, heightCentimeters: 251 },
      "height-out-of-range",
    ],
    [
      { unitSystem: "us", weightPounds: 154, heightFeet: 5.5, heightInches: 0 },
      "feet-not-integer",
    ],
    [
      { unitSystem: "us", weightPounds: 154, heightFeet: 5, heightInches: 12 },
      "inches-out-of-range",
    ],
    [
      { unitSystem: "us", weightPounds: 154, heightFeet: 0, heightInches: 0 },
      "height-not-positive",
    ],
  ] satisfies readonly (readonly [AdultBmiInput, string])[])(
    "rejects invalid input with %s",
    (input, code) => {
      expect(() => calculateAdultBmi(input)).toThrowError(
        expect.objectContaining({ code }),
      );
    },
  );

  it("uses a typed domain error", () => {
    expect(() =>
      calculateAdultBmi({
        unitSystem: "metric",
        weightKilograms: 70,
        heightCentimeters: 0,
      }),
    ).toThrowError(BmiInputError);
  });
});
