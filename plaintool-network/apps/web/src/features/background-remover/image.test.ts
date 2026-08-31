import { describe, expect, it } from "vitest";
import {
  createInputTensor,
  joinByteParts,
  normalizeMask,
  outputDimensions,
  resultFileName,
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
  });
});
