import { MAX_IMAGE_PIXELS } from "../image-converter/codec-core";

export const MAX_RESIZE_EDGE = 16_384;
export const MIN_RESIZE_PERCENT = 1;
export const MAX_RESIZE_PERCENT = 500;

export type Dimensions = { width: number; height: number };

function positiveInteger(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.round(value)) : 1;
}

export function linkedDimension(
  source: Dimensions,
  axis: "width" | "height",
  value: number,
): Dimensions {
  const next = positiveInteger(value);
  return axis === "width"
    ? {
        width: next,
        height: positiveInteger((next * source.height) / source.width),
      }
    : {
        width: positiveInteger((next * source.width) / source.height),
        height: next,
      };
}

export function dimensionsFromPercent(
  source: Dimensions,
  percentage: number,
): Dimensions {
  const bounded = Math.min(
    MAX_RESIZE_PERCENT,
    Math.max(MIN_RESIZE_PERCENT, percentage),
  );
  return {
    width: positiveInteger((source.width * bounded) / 100),
    height: positiveInteger((source.height * bounded) / 100),
  };
}

export function fitWithin(
  source: Dimensions,
  bounds: Dimensions,
  preventEnlarge = true,
): Dimensions {
  const scale = Math.min(
    bounds.width / source.width,
    bounds.height / source.height,
    preventEnlarge ? 1 : Number.POSITIVE_INFINITY,
  );
  return {
    width: positiveInteger(source.width * scale),
    height: positiveInteger(source.height * scale),
  };
}

export function applyEnlargeLimit(
  source: Dimensions,
  target: Dimensions,
  keepRatio: boolean,
): { dimensions: Dimensions; limited: boolean } {
  if (target.width <= source.width && target.height <= source.height) {
    return { dimensions: target, limited: false };
  }
  if (keepRatio) {
    return { dimensions: fitWithin(target, source), limited: true };
  }
  return {
    dimensions: {
      width: Math.min(source.width, target.width),
      height: Math.min(source.height, target.height),
    },
    limited: true,
  };
}

export function validateResizeDimensions({
  width,
  height,
}: Dimensions): boolean {
  return (
    Number.isInteger(width) &&
    Number.isInteger(height) &&
    width > 0 &&
    height > 0 &&
    width <= MAX_RESIZE_EDGE &&
    height <= MAX_RESIZE_EDGE &&
    width * height <= MAX_IMAGE_PIXELS
  );
}
