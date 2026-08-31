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
export const imageInputFormats = [...imageFormats, "svg"] as const;
export type ImageInputFormat = (typeof imageInputFormats)[number];

export type ImageConverterToolId = {
  [From in ImageInputFormat]: {
    [To in Exclude<ImageFormat, From>]: `${From}-to-${To}`;
  }[Exclude<ImageFormat, From>];
}[ImageInputFormat];

export type ImageConversionMode = {
  id: ImageConverterToolId;
  source: ImageInputFormat;
  target: ImageFormat;
};

export const imageConversionModes = imageInputFormats.flatMap((source) =>
  imageFormats
    .filter((target) => target !== source)
    .map((target) => ({
      id: `${source}-to-${target}` as ImageConverterToolId,
      source,
      target,
    })),
);

export const imageFormatMime: Record<ImageInputFormat, string> = {
  bmp: "image/bmp",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  avif: "image/avif",
  svg: "image/svg+xml",
};

export function isImageFormat(value: string): value is ImageFormat {
  return (imageFormats as readonly string[]).includes(value);
}
export function isImageInputFormat(value: string): value is ImageInputFormat {
  return (imageInputFormats as readonly string[]).includes(value);
}

export function parseImageConversionMode(
  value: string,
): ImageConversionMode | undefined {
  const match = /^([a-z0-9]+)-to-([a-z0-9]+)$/u.exec(value);
  if (!match || !isImageInputFormat(match[1]!) || !isImageFormat(match[2]!)) {
    return undefined;
  }
  const source = match[1] as ImageInputFormat;
  const target = match[2] as ImageFormat;
  if (source === target) return undefined;
  return { id: value as ImageConverterToolId, source, target };
}
