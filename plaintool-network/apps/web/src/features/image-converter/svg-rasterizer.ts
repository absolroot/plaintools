import { sanitizeSvgForRasterization, validatePixelBudget } from "./codec-core";

export type RasterizedSvg = {
  pixels: ArrayBuffer;
  width: number;
  height: number;
};

function loadSvgImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => reject(new Error("decode-failed")), {
      once: true,
    });
    image.src = url;
  });
}

export async function rasterizeSvg(input: ArrayBuffer): Promise<RasterizedSvg> {
  const sanitized = sanitizeSvgForRasterization(input);
  const url = URL.createObjectURL(
    new Blob([sanitized], { type: "image/svg+xml" }),
  );
  try {
    const image = await loadSvgImage(url);
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    validatePixelBudget(width, height);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!context) throw new Error("decode-failed");
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);
    return {
      pixels: imageData.data.buffer.slice(
        imageData.data.byteOffset,
        imageData.data.byteOffset + imageData.data.byteLength,
      ) as ArrayBuffer,
      width,
      height,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}
