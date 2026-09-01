import { describe, expect, it } from "vitest";
import {
  clampCrop,
  cropDimensionsValid,
  cropForRatio,
  perspectiveDimensions,
  previewDimensions,
  transformedDimensions,
} from "./core";

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
  it("keeps right-angle transformed dimensions exact", () => {
    expect(transformedDimensions(1600, 900, 90)).toEqual({
      width: 900,
      height: 1600,
    });
    expect(transformedDimensions(1600, 900, -180)).toEqual({
      width: 1600,
      height: 900,
    });
  });
  it("expands arbitrary rotations without clipping", () =>
    expect(transformedDimensions(100, 100, 45)).toEqual({
      width: 142,
      height: 142,
    }));
  it("allocates room for horizontal and vertical perspective", () =>
    expect(perspectiveDimensions(1_000, 500, 20, -30)).toEqual({
      width: 1_300,
      height: 600,
    }));
  it("bounds preview canvas allocation independently of source size", () => {
    const preview = previewDimensions(16_384, 2_440);
    expect(preview.width).toBeLessThanOrEqual(2_048);
    expect(preview.width * preview.height).toBeLessThanOrEqual(4_000_000);
    expect(preview.scale).toBeLessThan(1);
  });
  it("sanitizes incomplete numeric crop input", () =>
    expect(
      clampCrop(
        { x: Number.NaN, y: Number.NaN, width: Number.NaN, height: 20 },
        100,
        100,
      ),
    ).toEqual({ x: 0, y: 0, width: 1, height: 20 }));
});
