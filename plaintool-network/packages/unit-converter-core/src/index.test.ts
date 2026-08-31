import { describe, expect, it } from "vitest";
import { convertUnit, unitsFor } from "./index";

describe("unit converter", () => {
  it("converts exact defined length and mass units", () => {
    expect(convertUnit(1, "mile", "kilometer")).toBeCloseTo(1.609344, 10);
    expect(convertUnit(10, "pound", "kilogram")).toBeCloseTo(4.5359237, 10);
  });
  it("handles temperature offsets in both directions", () => {
    expect(convertUnit(0, "celsius", "fahrenheit")).toBe(32);
    expect(convertUnit(32, "fahrenheit", "kelvin")).toBeCloseTo(273.15, 10);
  });
  it("keeps US and UK liquid units distinct", () => {
    expect(convertUnit(1, "us-gallon", "liter")).toBeCloseTo(3.785411784, 10);
    expect(convertUnit(1, "uk-gallon", "liter")).toBeCloseTo(4.54609, 10);
  });
  it("uses decimal data prefixes and exposes only its category units", () => {
    expect(convertUnit(1, "megabyte", "megabit")).toBe(8);
    expect(unitsFor("speed").map((unit) => unit.id)).not.toContain("meter");
  });
  it("rejects incompatible units and invalid numbers", () => {
    expect(() => convertUnit(Number.NaN, "meter", "foot")).toThrow(
      "invalid-number",
    );
    expect(() => convertUnit(1, "meter", "kilogram")).toThrow(
      "incompatible-unit",
    );
  });
});
