import { describe, expect, it } from "vitest";
import { calculatePercentage } from "@plaintool/percentage-calculator-core";
import { createPercentageResultPresentation } from "./presentation";

describe("percentage result presentation", () => {
  it("formats a value result and its arithmetic working", () => {
    const result = calculatePercentage({
      mode: "percent-of",
      percent: "12.5",
      base: "80",
    });
    expect(createPercentageResultPresentation(result, "en")).toEqual({
      value: "10",
      working: "(12.5% ÷ 100) × 80 = 10",
      direction: null,
    });
  });

  it("marks percentage outputs with the percentage symbol", () => {
    const result = calculatePercentage({
      mode: "what-percent",
      part: "1",
      base: "4",
    });
    expect(createPercentageResultPresentation(result, "en").value).toBe("25%");
  });

  it("uses localized number formatting", () => {
    const result = calculatePercentage({
      mode: "whole-from-percent",
      part: "2500",
      percent: "25",
    });
    expect(createPercentageResultPresentation(result, "de").value).toBe(
      "10.000",
    );
  });

  it("keeps the signed change and direction together", () => {
    const result = calculatePercentage({
      mode: "percentage-change",
      oldValue: "40",
      newValue: "50",
    });
    expect(createPercentageResultPresentation(result, "en")).toMatchObject({
      value: "+25%",
      direction: "increase",
    });
  });

  it("does not add a sign to an unchanged result", () => {
    const result = calculatePercentage({
      mode: "percentage-change",
      oldValue: "40",
      newValue: "40",
    });
    expect(createPercentageResultPresentation(result, "en")).toMatchObject({
      value: "0%",
      direction: "no-change",
    });
  });
});
