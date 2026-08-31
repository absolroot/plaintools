import decodeAvif from "@jsquash/avif/decode.js";
import decodeHeic from "@discourse/heic/decode.js";
import encodeAvif from "@jsquash/avif/encode.js";
import decodeJpeg from "@jsquash/jpeg/decode.js";
import encodeJpeg from "@jsquash/jpeg/encode.js";
import { optimise as optimisePng } from "@jsquash/oxipng";
import decodePng from "@jsquash/png/decode.js";
import encodePng from "@jsquash/png/encode.js";
import decodeWebp from "@jsquash/webp/decode.js";
import encodeWebp from "@jsquash/webp/encode.js";
import { GIFEncoder, applyPalette, quantize } from "gifenc";
import {
  ensureInitialized as initializeHeic,
  jsEncodeImage as encodeHeic,
} from "elheif";
import {
  encodeBmp,
  flattenTransparency,
  hasTransparency,
  validatePixelBudget,
  type PixelImage,
} from "./codec-core";
import { classifyNativeDecodeFailure } from "./decode-policy";
import {
  imageFormatMime,
  type ImageFormat,
  type ImageInputFormat,
} from "./formats";

export type ImageEncodeProfile = {
  jpg: number;
  webp: number;
  avif: number;
  gifColors: number;
};

async function nativeDecode(
  input: ArrayBuffer,
  source: Exclude<ImageInputFormat, "svg">,
): Promise<ImageData> {
  const bitmap = await createImageBitmap(
    new Blob([input], { type: imageFormatMime[source] }),
    { imageOrientation: "from-image" },
  );
  try {
    validatePixelBudget(bitmap.width, bitmap.height);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!context) throw new Error("decode-failed");
    context.drawImage(bitmap, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  } finally {
    bitmap.close();
  }
}

export async function decodeImage(
  input: ArrayBuffer,
  source: Exclude<ImageInputFormat, "svg">,
): Promise<ImageData> {
  if (source === "heic") {
    const decoded = await decodeHeic(input);
    validatePixelBudget(decoded.width, decoded.height);
    return decoded;
  }

  try {
    return await nativeDecode(input, source);
  } catch (error) {
    const policy = classifyNativeDecodeFailure(source, error);
    if (policy === "pixel-budget") throw error;
    if (policy === "decode-failed") throw new Error("decode-failed");

    let decoded: ImageData | null;
    switch (source) {
      case "png":
        decoded = await decodePng(input);
        break;
      case "jpg":
        decoded = await decodeJpeg(input, { preserveOrientation: true });
        break;
      case "webp":
        decoded = await decodeWebp(input);
        break;
      case "avif":
        decoded = await decodeAvif(input);
        break;
      default:
        throw new Error("decode-failed");
    }
    if (!decoded) throw new Error("decode-failed");
    validatePixelBudget(decoded.width, decoded.height);
    return decoded;
  }
}

function encodeGif(image: PixelImage, colors: number): Uint8Array {
  const binaryAlpha = new Uint8ClampedArray(image.data);
  let transparent = false;
  for (let index = 3; index < binaryAlpha.length; index += 4) {
    if (binaryAlpha[index]! < 128) {
      binaryAlpha[index - 3] = 0;
      binaryAlpha[index - 2] = 0;
      binaryAlpha[index - 1] = 0;
      binaryAlpha[index] = 0;
      transparent = true;
    } else {
      binaryAlpha[index] = 255;
    }
  }
  const format = transparent ? "rgba4444" : "rgb565";
  const palette = quantize(binaryAlpha, colors, { format });
  const indexed = applyPalette(binaryAlpha, palette, format);
  const transparentIndex = transparent
    ? palette.findIndex((entry) => entry.length === 4 && entry[3] === 0)
    : 0;
  const encoder = GIFEncoder();
  encoder.writeFrame(indexed, image.width, image.height, {
    palette,
    transparent: transparentIndex >= 0,
    transparentIndex: Math.max(0, transparentIndex),
    repeat: -1,
  });
  encoder.finish();
  return encoder.bytes();
}

export async function encodeImage(
  image: ImageData,
  target: ImageFormat,
  profile: ImageEncodeProfile,
): Promise<{ output: Uint8Array; transparencyFlattened: boolean }> {
  const alpha = hasTransparency(image);
  let prepared = image;
  let transparencyFlattened = false;
  if (target === "jpg" && alpha) {
    prepared = flattenTransparency(image, [255, 255, 255]);
    transparencyFlattened = true;
  }

  switch (target) {
    case "bmp":
      return { output: encodeBmp(prepared), transparencyFlattened };
    case "png": {
      const encoded = await encodePng(prepared, { bitDepth: 8 });
      const optimized = await optimisePng(encoded, {
        level: 3,
        interlace: false,
        optimiseAlpha: true,
      });
      return { output: new Uint8Array(optimized), transparencyFlattened };
    }
    case "jpg": {
      const maximum = profile.jpg >= 95;
      const encoded = await encodeJpeg(prepared, {
        quality: profile.jpg,
        chroma_quality: profile.jpg,
        auto_subsample: !maximum,
        chroma_subsample: maximum ? 1 : 2,
        progressive: true,
        optimize_coding: true,
        trellis_multipass: maximum,
        trellis_opt_zero: true,
        trellis_opt_table: true,
        trellis_loops: maximum ? 2 : 1,
      });
      return { output: new Uint8Array(encoded), transparencyFlattened };
    }
    case "gif":
      return {
        output: encodeGif(prepared, profile.gifColors),
        transparencyFlattened,
      };
    case "webp": {
      const encoded = await encodeWebp(prepared, {
        quality: profile.webp,
        method: 6,
        pass: profile.webp < 85 ? 2 : 6,
        alpha_quality: 100,
        exact: alpha ? 1 : 0,
        use_sharp_yuv: 1,
      });
      return { output: new Uint8Array(encoded), transparencyFlattened };
    }
    case "heic": {
      await initializeHeic();
      const result = encodeHeic(
        new Uint8Array(prepared.data),
        prepared.width,
        prepared.height,
      );
      if (result.err || !result.data.length) throw new Error("encode-failed");
      return { output: result.data, transparencyFlattened };
    }
    case "avif": {
      const maximum = profile.avif >= 85;
      const encoded = await encodeAvif(prepared, {
        quality: profile.avif,
        qualityAlpha: alpha ? 100 : -1,
        speed: maximum ? 4 : 6,
        subsample: maximum ? 3 : 1,
        enableSharpYUV: true,
        tune: 2,
      });
      return { output: new Uint8Array(encoded), transparencyFlattened };
    }
  }
}
