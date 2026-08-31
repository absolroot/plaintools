import type { CommonToolCopy } from "../../lib/common-tool-i18n";
import type { ImageFormat } from "./formats";

export const IMAGE_CODEC_RUNTIME_REVISION = "csp-worker-v2";

export type ImageQualityProfile = "compact" | "balanced" | "maximum";

export type ImageConverterCopy = {
  ariaLabel: string;
  sourceFormat: string;
  targetFormat: string;
  swapFormats: string;
  inputImage: string;
  outputImage: string;
  chooseImage: string;
  replaceImage: string;
  dropImage: string;
  previewEmpty: string;
  resultEmpty: string;
  convert: string;
  quality: string;
  compact: string;
  balanced: string;
  maximum: string;
  lossless: string;
  fixedProfile: string;
  selected: string;
  dimensions: string;
  inputSize: string;
  outputSize: string;
  saved: string;
  larger: string;
  complete: string;
  fileTooLarge: string;
  invalidImage: string;
  wrongFormat: string;
  dimensionsTooLarge: string;
  decodeFailed: string;
  encodeFailed: string;
  transparencyFlattened: string;
  animationFirstFrame: string;
  sizeIncreaseExpected: string;
};

export type ImageConverterClientCopy = ImageConverterCopy & CommonToolCopy;

export type ImageConverterWorkerRequest = {
  id: number;
  input: ArrayBuffer;
  source: ImageFormat;
  target: ImageFormat;
  quality: ImageQualityProfile;
};

export type ImageConverterWorkerError =
  | "invalid-image"
  | "wrong-format"
  | "dimensions-too-large"
  | "decode-failed"
  | "encode-failed";

export type ImageConverterWorkerReply =
  | {
      id: number;
      ok: true;
      output: ArrayBuffer;
      width: number;
      height: number;
      transparencyFlattened: boolean;
      firstFrameOnly: boolean;
      runtimeRevision: typeof IMAGE_CODEC_RUNTIME_REVISION;
    }
  | {
      id: number;
      ok: false;
      error: ImageConverterWorkerError;
      detected?: ImageFormat;
      runtimeRevision: typeof IMAGE_CODEC_RUNTIME_REVISION;
    };
