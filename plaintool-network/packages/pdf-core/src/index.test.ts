import { describe, expect, it } from "vitest";
import {
  PdfRangeError,
  calculateImagePlacement,
  createFixedPageGroups,
  parsePageGroups,
  parsePageSelection,
  pdfFileStem,
} from "./index";

describe("PDF page expressions", () => {
  it("parses individual pages and inclusive ranges", () => {
    expect(parsePageGroups("1, 3-5, 8", 8)).toEqual([[0], [2, 3, 4], [7]]);
  });

  it("deduplicates and returns extract selections in document order", () => {
    expect(parsePageSelection("5, 2-4, 3", 6)).toEqual([1, 2, 3, 4]);
  });

  it.each([
    ["", "empty-selection"],
    ["1,,2", "invalid-token"],
    ["3-2", "reversed-range"],
    ["0", "out-of-bounds"],
    ["7", "out-of-bounds"],
  ])("rejects %j with %s", (value, code) => {
    expect(() => parsePageGroups(value, 6)).toThrowError(
      expect.objectContaining({ code }) as PdfRangeError,
    );
  });

  it("creates fixed-size output groups", () => {
    expect(createFixedPageGroups(7, 3)).toEqual([[0, 1, 2], [3, 4, 5], [6]]);
  });
});

describe("image page placement", () => {
  it("uses image dimensions at 96 DPI for fit pages", () => {
    expect(
      calculateImagePlacement({
        imageWidth: 800,
        imageHeight: 600,
        pageSize: "fit",
        orientation: "auto",
        margin: "large",
      }),
    ).toEqual({
      pageWidth: 600,
      pageHeight: 450,
      drawWidth: 600,
      drawHeight: 450,
      x: 0,
      y: 0,
    });
  });

  it("fits without upscaling and centers on an automatic landscape page", () => {
    const placement = calculateImagePlacement({
      imageWidth: 1000,
      imageHeight: 500,
      pageSize: "a4",
      orientation: "auto",
      margin: "small",
    });
    expect(placement.pageWidth).toBeCloseTo(841.89);
    expect(placement.pageHeight).toBeCloseTo(595.28);
    expect(placement.drawWidth).toBeCloseTo(805.89);
    expect(placement.drawHeight).toBeCloseTo(402.945);
    expect(placement.x).toBeCloseTo(18);
    expect(placement.y).toBeCloseTo(96.1675);
  });
});

describe("PDF filenames", () => {
  it("keeps a useful sanitized stem", () => {
    expect(pdfFileStem("  report: Q3?.PDF ")).toBe("report- Q3-");
    expect(pdfFileStem(".pdf")).toBe("document");
  });
});
