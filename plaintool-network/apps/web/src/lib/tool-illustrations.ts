const featuredIllustrations = new Set([
  "background-remover",
  "compress-pdf",
  "image-upscaler",
  "ai-watermark-remover",
  "merge-pdf",
  "word-counter",
  "qr-code-generator",
  "json-formatter",
]);

const imageFormats = new Set([
  "bmp",
  "png",
  "jpg",
  "gif",
  "webp",
  "heic",
  "avif",
  "svg",
]);

export function toolIllustrationSrc(toolId: string): string {
  if (featuredIllustrations.has(toolId)) {
    return `/illustrations/featured/${toolId}.svg`;
  }
  const [source, target, extra] = toolId.split("-to-");
  if (
    toolId === "image-converter" ||
    (!extra &&
      source !== undefined &&
      target !== undefined &&
      imageFormats.has(source) &&
      imageFormats.has(target))
  ) {
    return "/illustrations/tools/image-format-converter.svg";
  }
  return `/illustrations/tools/${toolId}.svg`;
}
