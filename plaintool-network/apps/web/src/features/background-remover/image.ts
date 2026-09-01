import type {
  BackgroundModelId,
  BackgroundModelNormalization,
  BackgroundModelOutput,
} from "./contract";

export const MAX_FILE_BYTES = 20_000_000;
export const MAX_IMAGE_PIXELS = 20_000_000;
export const MAX_OUTPUT_EDGE = 4096;
export const MASK_ALPHA_THRESHOLD = 8;
export const TRIM_PADDING_RATIO = 0.02;
export const MIN_TRIM_PADDING = 8;
export const MAX_TRIM_PADDING = 64;

export type CropBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const IMAGENET_MEAN = [0.485, 0.456, 0.406] as const;
const IMAGENET_STANDARD_DEVIATION = [0.229, 0.224, 0.225] as const;
const MODNET_MEAN = [0.5, 0.5, 0.5] as const;
const MODNET_STANDARD_DEVIATION = [0.5, 0.5, 0.5] as const;

export function createInputTensor(
  pixels: Uint8ClampedArray,
  normalization: BackgroundModelNormalization = "u2net",
): Float32Array {
  const pixelCount = pixels.length / 4;
  const output = new Float32Array(pixelCount * 3);
  let maximum = 0;
  for (let index = 0; index < pixels.length; index += 4) {
    maximum = Math.max(
      maximum,
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
    );
  }
  const divisor = normalization === "u2net" ? maximum || 1 : 255;
  const mean = normalization === "modnet" ? MODNET_MEAN : IMAGENET_MEAN;
  const standardDeviation =
    normalization === "modnet"
      ? MODNET_STANDARD_DEVIATION
      : IMAGENET_STANDARD_DEVIATION;
  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const source = pixel * 4;
    for (let channel = 0; channel < 3; channel += 1) {
      output[channel * pixelCount + pixel] =
        (pixels[source + channel] / divisor - mean[channel]) /
        standardDeviation[channel];
    }
  }
  return output;
}

export function normalizeMask(
  values: ArrayLike<number>,
  transform: BackgroundModelOutput = "minmax",
): Uint8ClampedArray {
  if (transform === "direct") {
    return Uint8ClampedArray.from(values, (value) =>
      Number.isFinite(Number(value))
        ? Math.round(Math.min(1, Math.max(0, Number(value))) * 255)
        : 0,
    );
  }
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < values.length; index += 1) {
    const rawValue = Number(values[index]);
    const value =
      transform === "sigmoid-minmax" ? 1 / (1 + Math.exp(-rawValue)) : rawValue;
    if (!Number.isFinite(value)) continue;
    minimum = Math.min(minimum, value);
    maximum = Math.max(maximum, value);
  }
  const output = new Uint8ClampedArray(values.length);
  const range = maximum - minimum;
  if (!Number.isFinite(range) || range <= 0) return output;
  for (let index = 0; index < values.length; index += 1) {
    const rawValue = Number(values[index]);
    const value =
      transform === "sigmoid-minmax" ? 1 / (1 + Math.exp(-rawValue)) : rawValue;
    output[index] = Number.isFinite(value)
      ? Math.round(Math.min(1, Math.max(0, (value - minimum) / range)) * 255)
      : 0;
  }
  return output;
}

export function joinByteParts(parts: readonly Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.byteLength, 0);
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.byteLength;
  }
  return joined;
}

export function outputDimensions(
  width: number,
  height: number,
): {
  width: number;
  height: number;
  scaled: boolean;
} {
  const scale = Math.min(1, MAX_OUTPUT_EDGE / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    scaled: scale < 1,
  };
}

export function maskCropBounds(
  alpha: ArrayLike<number>,
  width: number,
  height: number,
  threshold = MASK_ALPHA_THRESHOLD,
): CropBounds | undefined {
  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (Number(alpha[y * width + x]) < threshold) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }
  if (right < left || bottom < top) return undefined;
  const subjectWidth = right - left + 1;
  const subjectHeight = bottom - top + 1;
  const padding = Math.min(
    MAX_TRIM_PADDING,
    Math.max(
      MIN_TRIM_PADDING,
      Math.round(Math.max(subjectWidth, subjectHeight) * TRIM_PADDING_RATIO),
    ),
  );
  const x = Math.max(0, left - padding);
  const y = Math.max(0, top - padding);
  const cropRight = Math.min(width, right + 1 + padding);
  const cropBottom = Math.min(height, bottom + 1 + padding);
  return { x, y, width: cropRight - x, height: cropBottom - y };
}

export function scaleCropBounds(
  bounds: CropBounds,
  fromWidth: number,
  fromHeight: number,
  toWidth: number,
  toHeight: number,
): CropBounds {
  const x = Math.floor((bounds.x / fromWidth) * toWidth);
  const y = Math.floor((bounds.y / fromHeight) * toHeight);
  const right = Math.ceil(((bounds.x + bounds.width) / fromWidth) * toWidth);
  const bottom = Math.ceil(
    ((bounds.y + bounds.height) / fromHeight) * toHeight,
  );
  return {
    x,
    y,
    width: Math.max(1, Math.min(toWidth, right) - x),
    height: Math.max(1, Math.min(toHeight, bottom) - y),
  };
}

export function resultFileName(
  name: string,
  model?: BackgroundModelId,
  trimmed = false,
): string {
  const base = name
    .replace(/\.[^.]+$/u, "")
    .replace(/[^\p{L}\p{N}._-]+/gu, "-");
  const modelSuffix = model ? `-${model}` : "";
  const trimSuffix = trimmed ? "-trimmed" : "";
  return `${base.replace(/^-+|-+$/gu, "") || "image"}-background-removed${modelSuffix}${trimSuffix}.png`;
}
