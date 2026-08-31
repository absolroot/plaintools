import type {
  UpscaleBackend,
  UpscaleFormat,
  UpscalerMode,
  UpscaleScale,
} from "./contract";

export const MAX_FILE_BYTES = 10_000_000;
export const MAX_OUTPUT_PIXELS = 16_777_216;
export const MAX_OUTPUT_EDGE = 4096;
export const CONSERVATIVE_MAX_INPUT_PIXELS = 262_144;

export function inputPixelLimit(
  _mode: UpscalerMode,
  _backend: UpscaleBackend,
): number {
  return CONSERVATIVE_MAX_INPUT_PIXELS;
}

export function validateOutputDimensions(
  width: number,
  height: number,
  scale: UpscaleScale,
): boolean {
  const outputWidth = width * scale;
  const outputHeight = height * scale;
  return (
    outputWidth <= MAX_OUTPUT_EDGE &&
    outputHeight <= MAX_OUTPUT_EDGE &&
    outputWidth * outputHeight <= MAX_OUTPUT_PIXELS
  );
}

export function containsTransparency(
  rgba: Uint8ClampedArray<ArrayBufferLike>,
): boolean {
  for (let index = 3; index < rgba.length; index += 4) {
    if (rgba[index] !== 255) return true;
  }
  return false;
}

function lanczos(value: number, radius = 3): number {
  const absolute = Math.abs(value);
  if (absolute < 1e-8) return 1;
  if (absolute >= radius) return 0;
  const piValue = Math.PI * value;
  return (
    (Math.sin(piValue) / piValue) *
    (Math.sin(piValue / radius) / (piValue / radius))
  );
}

type SampleTable = { indices: Int32Array; weights: Float32Array };

function halfScaleSamples(
  outputSize: number,
  inputSize: number,
): SampleTable[] {
  const tables: SampleTable[] = [];
  for (let output = 0; output < outputSize; output += 1) {
    const center = (output + 0.5) * 2 - 0.5;
    const start = Math.floor(center - 6 + 1);
    const indices = new Int32Array(12);
    const weights = new Float32Array(12);
    let total = 0;
    for (let tap = 0; tap < 12; tap += 1) {
      const source = start + tap;
      const weight = lanczos((center - source) / 2) / 2;
      indices[tap] = Math.min(inputSize - 1, Math.max(0, source));
      weights[tap] = weight;
      total += weight;
    }
    for (let tap = 0; tap < 12; tap += 1) weights[tap] /= total;
    tables.push({ indices, weights });
  }
  return tables;
}

export function resampleHalfLanczos3(
  source: Uint8ClampedArray<ArrayBuffer>,
  width: number,
  height: number,
): Uint8ClampedArray<ArrayBuffer> {
  if (width % 2 !== 0 || height % 2 !== 0) {
    throw new RangeError("Lanczos half-scale input must have even dimensions");
  }
  const outputWidth = width / 2;
  const outputHeight = height / 2;
  const horizontal = halfScaleSamples(outputWidth, width);
  const vertical = halfScaleSamples(outputHeight, height);
  const rowCache = new Map<number, Float32Array>();
  const result = new Uint8ClampedArray(outputWidth * outputHeight * 4);

  const horizontalRow = (sourceY: number): Float32Array => {
    const cached = rowCache.get(sourceY);
    if (cached) return cached;
    const row = new Float32Array(outputWidth * 4);
    for (let x = 0; x < outputWidth; x += 1) {
      const table = horizontal[x];
      for (let channel = 0; channel < 4; channel += 1) {
        let value = 0;
        for (let tap = 0; tap < table.indices.length; tap += 1) {
          value +=
            source[(sourceY * width + table.indices[tap]) * 4 + channel] *
            table.weights[tap];
        }
        row[x * 4 + channel] = value;
      }
    }
    rowCache.set(sourceY, row);
    return row;
  };

  for (let y = 0; y < outputHeight; y += 1) {
    const table = vertical[y];
    const needed = new Set(table.indices);
    for (const cachedY of rowCache.keys()) {
      if (!needed.has(cachedY)) rowCache.delete(cachedY);
    }
    for (let x = 0; x < outputWidth; x += 1) {
      for (let channel = 0; channel < 4; channel += 1) {
        let value = 0;
        for (let tap = 0; tap < table.indices.length; tap += 1) {
          value +=
            horizontalRow(table.indices[tap])[x * 4 + channel] *
            table.weights[tap];
        }
        result[(y * outputWidth + x) * 4 + channel] = Math.round(value);
      }
    }
  }
  return result;
}

export function outputFilename(
  sourceName: string,
  scale: UpscaleScale,
  format: UpscaleFormat,
): string {
  const base = sourceName
    .replace(/\.[^.]+$/u, "")
    .replace(/[^\p{L}\p{N}._-]+/gu, "-");
  return `${base.replace(/^-+|-+$/gu, "") || "image"}-${scale}x-upscaled.${format === "jpeg" ? "jpg" : "png"}`;
}
