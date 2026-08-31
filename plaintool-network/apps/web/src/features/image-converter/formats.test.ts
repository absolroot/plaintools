import { describe, expect, it } from "vitest";
import { resolveImageConversionNavigation } from "./formats";

describe("resolveImageConversionNavigation", () => {
  it("keeps the selected target when source and target differ", () => {
    expect(resolveImageConversionNavigation("svg", "png", "jpg")).toEqual({
      id: "svg-to-png",
      source: "svg",
      target: "png",
    });
  });

  it("never creates an unsupported raster-to-SVG route", () => {
    expect(resolveImageConversionNavigation("png", "png", "svg")).toEqual({
      id: "png-to-bmp",
      source: "png",
      target: "bmp",
    });
  });

  it("uses the previous raster source as the reverse target when possible", () => {
    expect(resolveImageConversionNavigation("png", "png", "jpg")).toEqual({
      id: "png-to-jpg",
      source: "png",
      target: "jpg",
    });
  });
});
