import { describe, expect, it } from "vitest";
import {
  applyEnlargeLimit,
  dimensionsFromPercent,
  fitWithin,
  linkedDimension,
  validateResizeDimensions,
} from "./core";

describe("image resizer dimensions", () => {
  const landscape = { width: 4000, height: 3000 };

  it("links width and height without losing the source ratio", () => {
    expect(linkedDimension(landscape, "width", 1920)).toEqual({
      width: 1920,
      height: 1440,
    });
    expect(linkedDimension(landscape, "height", 720)).toEqual({
      width: 960,
      height: 720,
    });
  });

  it("converts a percentage to whole pixel dimensions", () => {
    expect(dimensionsFromPercent(landscape, 25)).toEqual({
      width: 1000,
      height: 750,
    });
    expect(dimensionsFromPercent({ width: 1, height: 1 }, 1)).toEqual({
      width: 1,
      height: 1,
    });
  });

  it("fits into common bounds and does not enlarge by default", () => {
    expect(fitWithin(landscape, { width: 1920, height: 1080 })).toEqual({
      width: 1440,
      height: 1080,
    });
    expect(
      fitWithin({ width: 640, height: 480 }, { width: 1920, height: 1080 }),
    ).toEqual({ width: 640, height: 480 });
  });

  it("limits linked and unlinked enlargement predictably", () => {
    expect(
      applyEnlargeLimit(landscape, { width: 8000, height: 6000 }, true),
    ).toEqual({ dimensions: landscape, limited: true });
    expect(
      applyEnlargeLimit(landscape, { width: 5000, height: 1000 }, false),
    ).toEqual({
      dimensions: { width: 4000, height: 1000 },
      limited: true,
    });
  });

  it("rejects unsafe edge and pixel counts", () => {
    expect(validateResizeDimensions({ width: 8000, height: 5000 })).toBe(true);
    expect(validateResizeDimensions({ width: 8000, height: 5001 })).toBe(false);
    expect(validateResizeDimensions({ width: 16385, height: 1 })).toBe(false);
    expect(validateResizeDimensions({ width: 0, height: 100 })).toBe(false);
  });
});
