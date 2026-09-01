import { describe, expect, it } from "vitest";
import {
  MAX_FILE_BYTES,
  containsTransparency,
  inputPixelLimit,
  outputFilename,
  resampleHalfLanczos3,
  resampleHalfLanczos3Channels,
  validateOutputDimensions,
} from "./image";

describe("image upscaler policies", () => {
  it("accepts uploads up to the 20 MB file limit", () => {
    expect(MAX_FILE_BYTES).toBe(20_000_000);
  });

  it("allows full-HD and four-megapixel inputs for 2x output", () => {
    expect(inputPixelLimit("fast", "webgpu", 2)).toBe(4_194_304);
    expect(inputPixelLimit("fast", "wasm", 2)).toBe(4_194_304);
    expect(inputPixelLimit("quality", "webgpu", 2)).toBe(4_194_304);
    expect(1920 * 1080).toBeLessThan(inputPixelLimit("quality", "webgpu", 2));
  });

  it("keeps 4x input bounded by the 16-megapixel output surface", () => {
    expect(inputPixelLimit("fast", "webgpu", 4)).toBe(1_048_576);
    expect(inputPixelLimit("fast", "wasm", 4)).toBe(1_048_576);
    expect(inputPixelLimit("quality", "webgpu", 4)).toBe(1_048_576);
    expect(592 * 574).toBeLessThan(inputPixelLimit("fast", "wasm", 4));
  });

  it("enforces output edge and pixel limits", () => {
    expect(validateOutputDimensions(1024, 1024, 4)).toBe(true);
    expect(validateOutputDimensions(1025, 1024, 4)).toBe(false);
    expect(validateOutputDimensions(2048, 1024, 2)).toBe(true);
  });

  it("detects alpha and creates a stable filename", () => {
    expect(containsTransparency(new Uint8ClampedArray([0, 0, 0, 255]))).toBe(
      false,
    );
    expect(containsTransparency(new Uint8ClampedArray([0, 0, 0, 254]))).toBe(
      true,
    );
    expect(outputFilename(" 여름 사진.PNG", 2, "jpeg")).toBe(
      "여름-사진-2x-upscaled.jpg",
    );
  });

  it("keeps a constant RGBA field constant when halving", () => {
    const source = new Uint8ClampedArray(8 * 6 * 4);
    for (let index = 0; index < source.length; index += 4) {
      source.set([31, 127, 221, 199], index);
    }
    const result = resampleHalfLanczos3(source, 8, 6);
    expect(result).toHaveLength(4 * 3 * 4);
    for (let index = 0; index < result.length; index += 4) {
      expect(Array.from(result.subarray(index, index + 4))).toEqual([
        31, 127, 221, 199,
      ]);
    }
  });

  it("keeps a constant RGB model tile constant when halving", () => {
    const source = new Uint8ClampedArray(8 * 6 * 3);
    for (let index = 0; index < source.length; index += 3) {
      source.set([31, 127, 221], index);
    }
    const result = resampleHalfLanczos3Channels(source, 8, 6, 3);
    expect(result).toHaveLength(4 * 3 * 3);
    for (let index = 0; index < result.length; index += 3) {
      expect(Array.from(result.subarray(index, index + 3))).toEqual([
        31, 127, 221,
      ]);
    }
  });
});
