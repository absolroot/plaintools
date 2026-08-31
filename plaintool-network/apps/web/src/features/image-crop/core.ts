import type { CropRect } from "./contract";

export const MAX_CROP_EDGE = 16_384;
export const MAX_CROP_PIXELS = 40_000_000;

export function clampCrop(
  rect: CropRect,
  width: number,
  height: number,
): CropRect {
  const x = Math.max(0, Math.min(width - 1, Math.round(rect.x)));
  const y = Math.max(0, Math.min(height - 1, Math.round(rect.y)));
  return {
    x,
    y,
    width: Math.max(1, Math.min(width - x, Math.round(rect.width))),
    height: Math.max(1, Math.min(height - y, Math.round(rect.height))),
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
