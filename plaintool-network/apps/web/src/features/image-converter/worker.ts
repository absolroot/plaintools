/// <reference lib="webworker" />

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
  detectImageFormat,
  encodeBmp,
  flattenTransparency,
  hasTransparency,
  validatePixelBudget,
  type PixelImage,
} from "./codec-core";
import { imageFormatMime, type ImageFormat } from "./formats";
import type {
  ImageConverterWorkerReply,
  ImageConverterWorkerRequest,
  ImageQualityProfile,
} from "./contract";

declare const self: DedicatedWorkerGlobalScope;

const qualityProfiles = {
  compact: { jpg: 82, webp: 80, avif: 60, gifColors: 128 },
  balanced: { jpg: 90, webp: 88, avif: 75, gifColors: 256 },
  maximum: { jpg: 96, webp: 96, avif: 90, gifColors: 256 },
} as const;

async function nativeDecode(
  input: ArrayBuffer,
  source: ImageFormat,
): Promise<ImageData> {
  const bitmap = await createImageBitmap(
    new Blob([input], { type: imageFormatMime[source] }),
    { imageOrientation: "from-image" },
  );
  validatePixelBudget(bitmap.width, bitmap.height);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const context = canvas.getContext("2d", {
    alpha: true,
    willReadFrequently: true,
  });
  if (!context) throw new Error("decode-failed");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

async function decode(
  input: ArrayBuffer,
  source: ImageFormat,
): Promise<ImageData> {
  if (source === "heic") {
    const decoded = await decodeHeic(input);
    validatePixelBudget(decoded.width, decoded.height);
    return decoded;
  }

  try {
    return await nativeDecode(input, source);
  } catch {
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

async function encode(
  image: ImageData,
  target: ImageFormat,
  quality: ImageQualityProfile,
): Promise<{ output: Uint8Array; transparencyFlattened: boolean }> {
  const profile = qualityProfiles[quality];
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
      const encoded = await encodeJpeg(prepared, {
        quality: profile.jpg,
        chroma_quality: profile.jpg,
        auto_subsample: quality !== "maximum",
        chroma_subsample: quality === "maximum" ? 1 : 2,
        progressive: true,
        optimize_coding: true,
        trellis_multipass: quality === "maximum",
        trellis_opt_zero: true,
        trellis_opt_table: true,
        trellis_loops: quality === "maximum" ? 2 : 1,
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
        pass: quality === "compact" ? 2 : 6,
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
      const encoded = await encodeAvif(prepared, {
        quality: profile.avif,
        qualityAlpha: alpha ? 100 : -1,
        speed: quality === "maximum" ? 4 : 6,
        subsample: quality === "maximum" ? 3 : 1,
        enableSharpYUV: true,
        tune: 2,
      });
      return { output: new Uint8Array(encoded), transparencyFlattened };
    }
  }
}

self.addEventListener(
  "message",
  async (event: MessageEvent<ImageConverterWorkerRequest>) => {
    const request = event.data;
    const detected = detectImageFormat(new Uint8Array(request.input));
    if (!detected) {
      self.postMessage({
        id: request.id,
        ok: false,
        error: "invalid-image",
      } satisfies ImageConverterWorkerReply);
      return;
    }
    if (detected !== request.source) {
      self.postMessage({
        id: request.id,
        ok: false,
        error: "wrong-format",
        detected,
      } satisfies ImageConverterWorkerReply);
      return;
    }

    try {
      const image = await decode(request.input, request.source);
      const result = await encode(image, request.target, request.quality);
      const output = new Uint8Array(result.output).buffer;
      const reply: ImageConverterWorkerReply = {
        id: request.id,
        ok: true,
        output,
        width: image.width,
        height: image.height,
        transparencyFlattened: result.transparencyFlattened,
        firstFrameOnly: request.source === "gif",
      };
      self.postMessage(reply, [output]);
    } catch (error) {
      const code = error instanceof Error ? error.message : "encode-failed";
      const reply: ImageConverterWorkerReply = {
        id: request.id,
        ok: false,
        error:
          code === "image-dimensions-too-large"
            ? "dimensions-too-large"
            : code === "decode-failed"
              ? "decode-failed"
              : "encode-failed",
      };
      self.postMessage(reply);
    }
  },
);
