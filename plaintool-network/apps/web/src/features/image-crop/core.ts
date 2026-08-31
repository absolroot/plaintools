import type { CropRect } from "./contract";

export const MAX_CROP_EDGE = 16_384;
export const MAX_CROP_PIXELS = 40_000_000;
export const MAX_PREVIEW_EDGE = 2_048;
export const MAX_PREVIEW_PIXELS = 4_000_000;

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

export function clampCrop(
  rect: CropRect,
  width: number,
  height: number,
): CropRect {
  const safeWidth = Math.max(1, Math.round(finiteOr(width, 1)));
  const safeHeight = Math.max(1, Math.round(finiteOr(height, 1)));
  const x = Math.max(
    0,
    Math.min(safeWidth - 1, Math.round(finiteOr(rect.x, 0))),
  );
  const y = Math.max(
    0,
    Math.min(safeHeight - 1, Math.round(finiteOr(rect.y, 0))),
  );
  return {
    x,
    y,
    width: Math.max(
      1,
      Math.min(safeWidth - x, Math.round(finiteOr(rect.width, 1))),
    ),
    height: Math.max(
      1,
      Math.min(safeHeight - y, Math.round(finiteOr(rect.height, 1))),
    ),
  };
}

export function cropForRatio(
  width: number,
  height: number,
  ratio?: number,
): CropRect {
  if (!ratio) return { x: 0, y: 0, width, height };
  const sourceRatio = width / height;
  if (sourceRatio > ratio) {
    const cropWidth = Math.round(height * ratio);
    return {
      x: Math.round((width - cropWidth) / 2),
      y: 0,
      width: cropWidth,
      height,
    };
  }
  const cropHeight = Math.round(width / ratio);
  return {
    x: 0,
    y: Math.round((height - cropHeight) / 2),
    width,
    height: cropHeight,
  };
}

export function cropDimensionsValid(rect: CropRect): boolean {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.width <= MAX_CROP_EDGE &&
    rect.height <= MAX_CROP_EDGE &&
    rect.width * rect.height <= MAX_CROP_PIXELS
  );
}

function stableCeil(value: number): number {
  return Math.max(1, Math.ceil(value - 1e-9));
}

export function transformedDimensions(
  width: number,
  height: number,
  angleDegrees: number,
): { width: number; height: number } {
  const radians = (finiteOr(angleDegrees, 0) * Math.PI) / 180;
  const cosine = Math.abs(Math.cos(radians));
  const sine = Math.abs(Math.sin(radians));
  return {
    width: stableCeil(width * cosine + height * sine),
    height: stableCeil(width * sine + height * cosine),
  };
}

export function previewDimensions(
  width: number,
  height: number,
): { width: number; height: number; scale: number } {
  const safeWidth = Math.max(1, finiteOr(width, 1));
  const safeHeight = Math.max(1, finiteOr(height, 1));
  const scale = Math.min(
    1,
    MAX_PREVIEW_EDGE / safeWidth,
    MAX_PREVIEW_EDGE / safeHeight,
    Math.sqrt(MAX_PREVIEW_PIXELS / (safeWidth * safeHeight)),
  );
  return {
    width: Math.max(1, Math.round(safeWidth * scale)),
    height: Math.max(1, Math.round(safeHeight * scale)),
    scale,
  };
}
