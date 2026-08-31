export const PDF_LIMITS = {
  totalInputBytes: 200 * 1024 * 1024,
  copyPages: 500,
  rasterPages: 120,
  rasterPixels: 240_000_000,
} as const;

export type PdfRangeErrorCode =
  | "empty-selection"
  | "invalid-token"
  | "out-of-bounds"
  | "reversed-range"
  | "invalid-page-count"
  | "invalid-chunk-size";

export class PdfRangeError extends Error {
  readonly code: PdfRangeErrorCode;
  readonly token?: string;

  constructor(code: PdfRangeErrorCode, token?: string) {
    super(code);
    this.name = "PdfRangeError";
    this.code = code;
    this.token = token;
  }
}

function assertPageCount(pageCount: number): void {
  if (!Number.isSafeInteger(pageCount) || pageCount < 1) {
    throw new PdfRangeError("invalid-page-count");
  }
}

function parsePageNumber(
  value: string,
  token: string,
  pageCount: number,
): number {
  if (!/^\d+$/u.test(value)) throw new PdfRangeError("invalid-token", token);
  const page = Number(value);
  if (!Number.isSafeInteger(page) || page < 1 || page > pageCount) {
    throw new PdfRangeError("out-of-bounds", token);
  }
  return page - 1;
}

export function parsePageGroups(input: string, pageCount: number): number[][] {
  assertPageCount(pageCount);
  const source = input.trim();
  if (!source) throw new PdfRangeError("empty-selection");

  return source.split(",").map((rawToken) => {
    const token = rawToken.trim();
    if (!token) throw new PdfRangeError("invalid-token", rawToken);
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/u.exec(token);
    if (!match) throw new PdfRangeError("invalid-token", token);
    const start = parsePageNumber(match[1]!, token, pageCount);
    const end = match[2] ? parsePageNumber(match[2], token, pageCount) : start;
    if (start > end) throw new PdfRangeError("reversed-range", token);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });
}

export function parsePageSelection(input: string, pageCount: number): number[] {
  const selected = new Set(parsePageGroups(input, pageCount).flat());
  return [...selected].sort((left, right) => left - right);
}

export function createFixedPageGroups(
  pageCount: number,
  pagesPerFile: number,
): number[][] {
  assertPageCount(pageCount);
  if (!Number.isSafeInteger(pagesPerFile) || pagesPerFile < 1) {
    throw new PdfRangeError("invalid-chunk-size");
  }
  const groups: number[][] = [];
  for (let start = 0; start < pageCount; start += pagesPerFile) {
    groups.push(
      Array.from(
        { length: Math.min(pagesPerFile, pageCount - start) },
        (_, index) => start + index,
      ),
    );
  }
  return groups;
}

export type PdfPageSize = "fit" | "a4" | "letter";
export type PdfOrientation = "auto" | "portrait" | "landscape";
export type PdfMargin = "none" | "small" | "large";

export type ImagePlacement = {
  pageWidth: number;
  pageHeight: number;
  drawWidth: number;
  drawHeight: number;
  x: number;
  y: number;
};

const fixedPageSizes = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
} as const;

const marginPoints: Record<PdfMargin, number> = {
  none: 0,
  small: 18,
  large: 36,
};

export function calculateImagePlacement(options: {
  imageWidth: number;
  imageHeight: number;
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  margin: PdfMargin;
}): ImagePlacement {
  const { imageWidth, imageHeight, pageSize, orientation, margin } = options;
  if (
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    throw new RangeError("invalid-image-dimensions");
  }

  if (pageSize === "fit") {
    const width = imageWidth * 0.75;
    const height = imageHeight * 0.75;
    return {
      pageWidth: width,
      pageHeight: height,
      drawWidth: width,
      drawHeight: height,
      x: 0,
      y: 0,
    };
  }

  const base = fixedPageSizes[pageSize];
  const resolvedOrientation =
    orientation === "auto"
      ? imageWidth >= imageHeight
        ? "landscape"
        : "portrait"
      : orientation;
  const pageWidth =
    resolvedOrientation === "landscape" ? base.height : base.width;
  const pageHeight =
    resolvedOrientation === "landscape" ? base.width : base.height;
  const inset = marginPoints[margin];
  const availableWidth = Math.max(1, pageWidth - inset * 2);
  const availableHeight = Math.max(1, pageHeight - inset * 2);
  const scale = Math.min(
    1,
    availableWidth / imageWidth,
    availableHeight / imageHeight,
  );
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  return {
    pageWidth,
    pageHeight,
    drawWidth,
    drawHeight,
    x: (pageWidth - drawWidth) / 2,
    y: (pageHeight - drawHeight) / 2,
  };
}

export function pdfFileStem(filename: string): string {
  const withoutExtension = filename
    .trim()
    .replace(/\.pdf$/iu, "")
    .trim();
  const invalidCharacters = new Set('<>:"/\\|?*');
  const normalized = [...withoutExtension]
    .map((character) =>
      character.codePointAt(0)! < 32 || invalidCharacters.has(character)
        ? "-"
        : character,
    )
    .join("")
    .replace(/\s+/gu, " ")
    .replace(/[. ]+$/gu, "")
    .slice(0, 120);
  return normalized || "document";
}
