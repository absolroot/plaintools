export const imageFormats = [
  "bmp",
  "png",
  "jpg",
  "gif",
  "webp",
  "heic",
  "avif",
] as const;

export type ImageFormat = (typeof imageFormats)[number];

export type ImageConverterToolId = {
  [From in ImageFormat]: {
    [To in Exclude<ImageFormat, From>]: `${From}-to-${To}`;
  }[Exclude<ImageFormat, From>];
}[ImageFormat];

export type ImageConversionMode = {
  id: ImageConverterToolId;
  source: ImageFormat;
  target: ImageFormat;
};

export const imageConversionModes = imageFormats.flatMap((source) =>
  imageFormats
    .filter((target) => target !== source)
    .map((target) => ({
      id: `${source}-to-${target}` as ImageConverterToolId,
      source,
      target,
    })),
);

export const imageFormatMime: Record<ImageFormat, string> = {
  bmp: "image/bmp",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  avif: "image/avif",
};

export function isImageFormat(value: string): value is ImageFormat {
  return (imageFormats as readonly string[]).includes(value);
}

export function parseImageConversionMode(
  value: string,
): ImageConversionMode | undefined {
  const match = /^([a-z0-9]+)-to-([a-z0-9]+)$/u.exec(value);
  if (!match || !isImageFormat(match[1]!) || !isImageFormat(match[2]!)) {
    return undefined;
  }
  const source = match[1];
  const target = match[2];
  if (source === target) return undefined;
  return { id: value as ImageConverterToolId, source, target };
}
