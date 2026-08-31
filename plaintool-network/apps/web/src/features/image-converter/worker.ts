/// <reference lib="webworker" />

import { decodeImage, encodeImage } from "./codec-runtime";
import { detectImageFormat } from "./codec-core";
import type {
  ImageConverterWorkerReply,
  ImageConverterWorkerRequest,
} from "./contract";
import { IMAGE_CODEC_RUNTIME_REVISION } from "./contract";

declare const self: DedicatedWorkerGlobalScope;

const qualityProfiles = {
  compact: { jpg: 82, webp: 80, avif: 60, gifColors: 128 },
  balanced: { jpg: 90, webp: 88, avif: 75, gifColors: 256 },
  maximum: { jpg: 96, webp: 96, avif: 90, gifColors: 256 },
} as const;

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
        runtimeRevision: IMAGE_CODEC_RUNTIME_REVISION,
      } satisfies ImageConverterWorkerReply);
      return;
    }
    if (detected !== request.source) {
      self.postMessage({
        id: request.id,
        ok: false,
        error: "wrong-format",
        detected,
        runtimeRevision: IMAGE_CODEC_RUNTIME_REVISION,
      } satisfies ImageConverterWorkerReply);
      return;
    }

    try {
      const image = await decodeImage(request.input, request.source);
      const result = await encodeImage(
        image,
        request.target,
        qualityProfiles[request.quality],
      );
      const output = new Uint8Array(result.output).buffer;
      const reply: ImageConverterWorkerReply = {
        id: request.id,
        ok: true,
        output,
        width: image.width,
        height: image.height,
        transparencyFlattened: result.transparencyFlattened,
        firstFrameOnly: request.source === "gif",
        runtimeRevision: IMAGE_CODEC_RUNTIME_REVISION,
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
        runtimeRevision: IMAGE_CODEC_RUNTIME_REVISION,
      };
      self.postMessage(reply);
    }
  },
);
