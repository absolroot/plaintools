import { describe, expect, it } from "vitest";
import {
  createQrMatrix,
  decodeQrPixels,
  renderQrRgba,
  renderQrSvg,
} from "./index";

describe("QR core", () => {
  it("generates and scans a standards-compatible QR code", () => {
    const source =
      "https://example.com/path?q=PlainTool#round-trip 안녕하세요 مرحبا 😀";
    const matrix = createQrMatrix(source, {
      errorCorrectionLevel: "Q",
      quietZone: 4,
    });
    const image = renderQrRgba(matrix, 8);

    expect(decodeQrPixels(image.data, image.width, image.height)?.text).toBe(
      source,
    );
  });

  it("renders a standalone SVG with the requested quiet zone", () => {
    const matrix = createQrMatrix("PlainTool", { quietZone: 8 });
    const svg = renderQrSvg(matrix);
    const fullSize = matrix.size + 16;

    expect(svg).toContain(`viewBox="0 0 ${fullSize} ${fullSize}"`);
    expect(svg).toContain('shape-rendering="crispEdges"');
  });

  it("rejects invalid inputs", () => {
    expect(() => createQrMatrix("")).toThrow("empty-input");
    expect(() => createQrMatrix("x", { quietZone: -1 })).toThrow(
      "quiet-zone-out-of-range",
    );
    expect(() => decodeQrPixels(new Uint8ClampedArray(4), 2, 2)).toThrow(
      "invalid-image-data",
    );
  });
});
