import type { ImageInputFormat } from "./formats";

export type PixelImage = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

export const MAX_IMAGE_BYTES = 50 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 40_000_000;

export function detectImageFormat(bytes: Uint8Array): ImageInputFormat | undefined {
  if (bytes.length < 12) return undefined;
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) return "bmp";
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) &&
    bytes[5] === 0x61
  ) {
    return "gif";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  if (
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    const brand = String.fromCharCode(...bytes.subarray(8, 12));
    if (["avif", "avis"].includes(brand)) return "avif";
    if (["heic", "heix", "hevc", "hevx", "mif1", "msf1"].includes(brand)) {
      return "heic";
    }
  }
  const prefix = new TextDecoder("utf-8", { fatal: false }).decode(bytes.subarray(0, 4096)).replace(/^\uFEFF/u, "").trimStart();
  if (/^<(?:\?xml[\s\S]*?\?>\s*)?<svg(?:\s|>)/iu.test(prefix)) return "svg";
  return undefined;
}

export function assertSafeSvg(input: ArrayBuffer): void {
  let svg: string;
  try { svg = new TextDecoder("utf-8", { fatal: true }).decode(input); } catch { throw new Error("decode-failed"); }
  if (/<(?:script|foreignObject|iframe|object|embed|audio|video)\b|\bon[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*(?!#|data:)|\burl\(\s*["']?\s*(?!#|data:)|@import\b/iu.test(svg)) throw new Error("decode-failed");
}

export function hasTransparency(image: PixelImage): boolean {
  for (let index = 3; index < image.data.length; index += 4) {
    if (image.data[index] !== 255) return true;
  }
  return false;
}

export function flattenTransparency(
  image: PixelImage,
  background: readonly [number, number, number],
): ImageData {
  const data = new Uint8ClampedArray(image.data.length);
  for (let index = 0; index < image.data.length; index += 4) {
    const alpha = image.data[index + 3]! / 255;
    const inverse = 1 - alpha;
    data[index] = Math.round(
      image.data[index]! * alpha + background[0] * inverse,
    );
    data[index + 1] = Math.round(
      image.data[index + 1]! * alpha + background[1] * inverse,
    );
    data[index + 2] = Math.round(
      image.data[index + 2]! * alpha + background[2] * inverse,
    );
    data[index + 3] = 255;
  }
  return new ImageData(data, image.width, image.height);
}

export function encodeBmp(image: PixelImage): Uint8Array {
  const headerSize = 14 + 124;
  const pixelBytes = image.width * image.height * 4;
  const output = new Uint8Array(headerSize + pixelBytes);
  const view = new DataView(output.buffer);

  output[0] = 0x42;
  output[1] = 0x4d;
  view.setUint32(2, output.length, true);
  view.setUint32(10, headerSize, true);
  view.setUint32(14, 124, true);
  view.setInt32(18, image.width, true);
  view.setInt32(22, -image.height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 32, true);
  view.setUint32(30, 3, true);
  view.setUint32(34, pixelBytes, true);
  view.setInt32(38, 3780, true);
  view.setInt32(42, 3780, true);
  view.setUint32(54, 0x00ff0000, true);
  view.setUint32(58, 0x0000ff00, true);
  view.setUint32(62, 0x000000ff, true);
  view.setUint32(66, 0xff000000, true);
  output.set([0x42, 0x47, 0x52, 0x73], 70);

  let destination = headerSize;
  for (let source = 0; source < image.data.length; source += 4) {
    output[destination++] = image.data[source + 2]!;
    output[destination++] = image.data[source + 1]!;
    output[destination++] = image.data[source]!;
    output[destination++] = image.data[source + 3]!;
  }
  return output;
}

export function validatePixelBudget(width: number, height: number): void {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width <= 0 ||
    height <= 0 ||
    width * height > MAX_IMAGE_PIXELS
  ) {
    throw new Error("image-dimensions-too-large");
  }
}
