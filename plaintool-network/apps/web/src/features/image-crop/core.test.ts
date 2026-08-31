import { describe, expect, it } from "vitest";
import { clampCrop, cropDimensionsValid, cropForRatio } from "./core";

describe("image crop geometry", () => {
  it("centers a constrained ratio", () =>
    expect(cropForRatio(1600, 900, 1)).toEqual({
      x: 350,
      y: 0,
      width: 900,
      height: 900,
    }));
  it("keeps crop coordinates within the source", () =>
    expect(
      clampCrop({ x: -10, y: 900, width: 400, height: 400 }, 1000, 1000),
    ).toEqual({ x: 0, y: 900, width: 400, height: 100 }));
  it("rejects an unsafe export size", () =>
    expect(
      cropDimensionsValid({ x: 0, y: 0, width: 16_384, height: 16_384 }),
    ).toBe(false));
});
