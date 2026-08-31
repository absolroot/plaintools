import type { ImageInputFormat } from "./formats";

export type PixelImage = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

export const MAX_IMAGE_BYTES = 50 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 40_000_000;
export const MAX_IMAGE_SNIFF_BYTES = 64 * 1024;

function declarationEnd(source: string, start: number): number {
  let quote = "";
  let subsetDepth = 0;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index]!;
    if (quote) {
      if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "[") subsetDepth += 1;
    else if (character === "]" && subsetDepth > 0) subsetDepth -= 1;
    else if (character === ">" && subsetDepth === 0) return index + 1;
  }
  return -1;
}

function svgRootStart(source: string): number {
  let index = 0;
  while (index < source.length) {
    const whitespace = /^\s+/u.exec(source.slice(index));
    if (whitespace) {
      index += whitespace[0].length;
      continue;
    }
    if (source.startsWith("<!--", index)) {
      const end = source.indexOf("-->", index + 4);
      if (end < 0) return -1;
      index = end + 3;
      continue;
    }
    if (/^<\?xml(?:\s|\?>)/iu.test(source.slice(index))) {
      const end = source.indexOf("?>", index + 5);
      if (end < 0) return -1;
      index = end + 2;
      continue;
    }
    if (/^<!doctype\s/iu.test(source.slice(index))) {
      const end = declarationEnd(source, index + 2);
      if (end < 0) return -1;
      index = end;
      continue;
    }
    return index;
  }
  return -1;
}

function decodedSvg(bytes: Uint8Array, fatal: boolean): string {
  return new TextDecoder("utf-8", { fatal })
    .decode(bytes)
    .replace(/^\uFEFF/u, "");
}

function looksLikeSvg(bytes: Uint8Array): boolean {
  const source = decodedSvg(bytes, false);
  const start = svgRootStart(source);
  return start >= 0 && /^<svg(?:\s|\/?>)/iu.test(source.slice(start));
}

export function detectImageFormat(
  bytes: Uint8Array,
): ImageInputFormat | undefined {
  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) return "bmp";
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
  if (looksLikeSvg(bytes.subarray(0, MAX_IMAGE_SNIFF_BYTES))) return "svg";
  return undefined;
}

function attributeValues(source: string, name: string): string[] {
  const pattern = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "giu",
  );
  return Array.from(source.matchAll(pattern), (match) =>
    (match[1] ?? match[2] ?? match[3] ?? "").trim(),
  );
}

export function sanitizeSvgForRasterization(input: ArrayBuffer): ArrayBuffer {
  let source: string;
  try {
    source = decodedSvg(new Uint8Array(input), true);
  } catch {
    throw new Error("decode-failed");
  }
  const start = svgRootStart(source);
  if (start < 0 || !/^<svg(?:\s|\/?>)/iu.test(source.slice(start)))
    throw new Error("decode-failed");

  const svg = source.slice(start).replace(/<!--[\s\S]*?-->/gu, "");
  if (
    /<\?(?!xml\b)|<!doctype\b|<!entity\b|<(?:script|foreignObject|iframe|object|embed|audio|video|link|base|style)\b|\bon[a-z][a-z0-9:_-]*\s*=/iu.test(
      svg,
    )
  ) {
    throw new Error("decode-failed");
  }

  for (const value of [
    ...attributeValues(svg, "href"),
    ...attributeValues(svg, "src"),
  ]) {
    if (!/^#[A-Za-z_][\w:.-]*$/u.test(value)) throw new Error("decode-failed");
  }
  for (const value of attributeValues(svg, "style")) {
    if (/[\\@]|\b(?:url|expression)\s*\(/iu.test(value))
      throw new Error("decode-failed");
  }
  for (const match of svg.matchAll(
    /\burl\s*\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/giu,
  )) {
    const value = (match[1] ?? match[2] ?? match[3] ?? "").trim();
    if (!/^#[A-Za-z_][\w:.-]*$/u.test(value)) throw new Error("decode-failed");
  }
  return new TextEncoder().encode(svg).buffer;
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
