/// <reference lib="webworker" />

import {
  decodeImage,
  encodeImage,
  type ImageEncodeProfile,
} from "../image-converter/codec-runtime";
import {
  detectImageFormat,
  validatePixelBudget,
} from "../image-converter/codec-core";
import type {
  ImageResizerWorkerReply,
  ImageResizerWorkerRequest,
} from "./contract";

declare const self: DedicatedWorkerGlobalScope;

function qualityProfile(quality: number): ImageEncodeProfile {
  const bounded = Math.min(100, Math.max(40, Math.round(quality)));
  return {
    jpg: bounded,
    webp: bounded,
    avif: Math.max(35, Math.round(bounded * 0.86)),
    gifColors: bounded >= 88 ? 256 : bounded >= 68 ? 128 : 64,
  };
}

function drawScaled(
  source: OffscreenCanvas,
  width: number,
  height: number,
): OffscreenCanvas {
  const output = new OffscreenCanvas(width, height);
  const context = output.getContext("2d", {
    alpha: true,
    willReadFrequently: true,
  });
  if (!context) throw new Error("encode-failed");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, width, height);
  return output;
}

function resizeImage(
  image: ImageData,
  targetWidth: number,
  targetHeight: number,
): ImageData {
  validatePixelBudget(targetWidth, targetHeight);
  let canvas = new OffscreenCanvas(image.width, image.height);
  const sourceContext = canvas.getContext("2d", {
    alpha: true,
    willReadFrequently: true,
  });
  if (!sourceContext) throw new Error("encode-failed");
  sourceContext.putImageData(image, 0, 0);

  let width = image.width;
  let height = image.height;
  while (width / targetWidth > 2 || height / targetHeight > 2) {
    width = Math.max(targetWidth, Math.floor(width / 2));
    height = Math.max(targetHeight, Math.floor(height / 2));
    canvas = drawScaled(canvas, width, height);
  }
  if (width !== targetWidth || height !== targetHeight) {
    canvas = drawScaled(canvas, targetWidth, targetHeight);
  }
  const outputContext = canvas.getContext("2d", {
    alpha: true,
    willReadFrequently: true,
  });
  if (!outputContext) throw new Error("encode-failed");
  return outputContext.getImageData(0, 0, targetWidth, targetHeight);
}

self.addEventListener(
  "message",
  async (event: MessageEvent<ImageResizerWorkerRequest>) => {
    const request = event.data;
    const detected = detectImageFormat(new Uint8Array(request.input));
    if (!detected) {
      self.postMessage({
        id: request.id,
        ok: false,
        error: "invalid-image",
      } satisfies ImageResizerWorkerReply);
      return;
    }
    if (detected !== request.source) {
      self.postMessage({
        id: request.id,
        ok: false,
        error: "wrong-format",
      } satisfies ImageResizerWorkerReply);
      return;
    }

    try {
      const image = await decodeImage(request.input, request.source);
      if (request.action === "inspect") {
        self.postMessage({
          id: request.id,
          ok: true,
          action: "inspect",
          width: image.width,
          height: image.height,
        } satisfies ImageResizerWorkerReply);
        return;
      }

      const resized = resizeImage(image, request.width, request.height);
      const encoded = await encodeImage(
        resized,
        request.target,
        qualityProfile(request.quality),
      );
      const output = new Uint8Array(encoded.output).buffer;
      self.postMessage(
        {
          id: request.id,
          ok: true,
          action: "resize",
          output,
          width: resized.width,
          height: resized.height,
          transparencyFlattened: encoded.transparencyFlattened,
          firstFrameOnly: request.source === "gif",
        } satisfies ImageResizerWorkerReply,
        [output],
      );
    } catch (error) {
      const code = error instanceof Error ? error.message : "encode-failed";
      self.postMessage({
        id: request.id,
        ok: false,
        error:
          code === "image-dimensions-too-large"
            ? "dimensions-too-large"
            : code === "decode-failed"
              ? "decode-failed"
              : "encode-failed",
      } satisfies ImageResizerWorkerReply);
    }
  },
);
