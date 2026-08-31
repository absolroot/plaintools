import { describe, expect, it } from "vitest";
import {
  createInputTensor,
  joinByteParts,
  maskCropBounds,
  normalizeMask,
  outputDimensions,
  resultFileName,
  scaleCropBounds,
} from "./image";

describe("background remover image operations", () => {
  it("creates planar normalized RGB input", () => {
    const tensor = createInputTensor(
      new Uint8ClampedArray([255, 0, 127, 255, 0, 255, 255, 255]),
    );
    expect(tensor).toHaveLength(6);
    expect(tensor[0]).toBeCloseTo((1 - 0.485) / 0.229);
    expect(tensor[2]).toBeCloseTo((0 - 0.456) / 0.224);
    expect(tensor[5]).toBeCloseTo((1 - 0.406) / 0.225);

    const modnet = createInputTensor(
      new Uint8ClampedArray([255, 0, 127, 255]),
      "modnet",
    );
    expect(modnet[0]).toBeCloseTo(1);
    expect(modnet[1]).toBeCloseTo(-1);
    expect(modnet[2]).toBeCloseTo((127 / 255 - 0.5) / 0.5);
  });

  it("normalizes masks and safely handles invalid or flat output", () => {
    expect([...normalizeMask([2, 3, 4])]).toEqual([0, 128, 255]);
    expect([...normalizeMask([5, 5, Number.NaN])]).toEqual([0, 0, 0]);
    expect([...normalizeMask([-1, 0.5, 2], "direct")]).toEqual([0, 128, 255]);
    expect([...normalizeMask([-2, 0, 2], "sigmoid-minmax")]).toEqual([
      0, 128, 255,
    ]);
  });

  it("joins model parts without changing byte order", () => {
    expect([
      ...joinByteParts([new Uint8Array([1, 2]), new Uint8Array([3])]),
    ]).toEqual([1, 2, 3]);
  });

  it("caps the long output edge while preserving aspect ratio", () => {
    expect(outputDimensions(6000, 3000)).toEqual({
      width: 4096,
      height: 2048,
      scaled: true,
    });
    expect(outputDimensions(1200, 800)).toEqual({
      width: 1200,
      height: 800,
      scaled: false,
    });
  });

  it("creates a safe PNG result name", () => {
    expect(resultFileName("portrait final.jpg")).toBe(
      "portrait-final-background-removed.png",
    );
    expect(resultFileName(".png")).toBe("image-background-removed.png");
    expect(resultFileName("portrait final.jpg", "quality")).toBe(
      "portrait-final-background-removed-quality.png",
    );
    expect(resultFileName("portrait final.jpg", "quality", true)).toBe(
      "portrait-final-background-removed-quality-trimmed.png",
    );
    expect(resultFileName("portrait final.jpg", undefined, true)).toBe(
      "portrait-final-background-removed-trimmed.png",
    );
  });

  it("finds subject bounds with safe padding and clamps to image edges", () => {
    const alpha = new Uint8ClampedArray(100 * 80);
    for (let y = 20; y < 40; y += 1) {
      for (let x = 30; x < 50; x += 1) alpha[y * 100 + x] = 255;
    }
    expect(maskCropBounds(alpha, 100, 80)).toEqual({
      x: 22,
      y: 12,
      width: 36,
      height: 36,
    });

    alpha.fill(0);
    alpha[0] = 255;
    expect(maskCropBounds(alpha, 100, 80)).toEqual({
      x: 0,
      y: 0,
      width: 9,
      height: 9,
    });
  });

  it("uses the alpha threshold and returns no crop for an empty mask", () => {
    expect(maskCropBounds(new Uint8ClampedArray([0, 7, 0, 0]), 2, 2)).toBe(
      undefined,
    );
    expect(maskCropBounds(new Uint8ClampedArray([0, 8, 0, 0]), 2, 2)).toEqual({
      x: 0,
      y: 0,
      width: 2,
      height: 2,
    });
  });

  it("scales mask-space crop bounds outward into source pixels", () => {
    expect(
      scaleCropBounds({ x: 1, y: 2, width: 3, height: 4 }, 10, 10, 101, 51),
    ).toEqual({ x: 10, y: 10, width: 31, height: 21 });
  });
});
