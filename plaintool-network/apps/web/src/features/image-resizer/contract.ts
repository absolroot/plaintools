import type { ImageFormat } from "../image-converter/formats";

export type ResizeMode = "pixels" | "percentage";

export type ImageResizerCopy = {
  ariaLabel: string;
  chooseImage: string;
  replaceImage: string;
  dropImage: string;
  pasteHint: string;
  formats: string;
  original: string;
  result: string;
  resizeBy: string;
  pixels: string;
  percentage: string;
  width: string;
  height: string;
  scale: string;
  keepRatio: string;
  preventEnlarge: string;
  quickSizes: string;
  fitHd: string;
  fitFullHd: string;
  fitSquare: string;
  originalSize: string;
  output: string;
  sameFormat: string;
  quality: string;
  smallerFile: string;
  betterQuality: string;
  resize: string;
  reading: string;
  working: string;
  complete: string;
  dimensions: string;
  fileSize: string;
  saved: string;
  larger: string;
  resultEmpty: string;
  invalidImage: string;
  fileTooLarge: string;
  dimensionsTooLarge: string;
  decodeFailed: string;
  encodeFailed: string;
  transparencyFlattened: string;
  animationFirstFrame: string;
  preventedEnlarge: string;
};

export type ImageResizerClientCopy = ImageResizerCopy & {
  clear: string;
  ready: string;
};

export type ImageResizeInspectRequest = {
  id: number;
  action: "inspect";
  input: ArrayBuffer;
  source: ImageFormat;
};

export type ImageResizeRunRequest = {
  id: number;
  action: "resize";
  input: ArrayBuffer;
  source: ImageFormat;
  target: ImageFormat;
  width: number;
  height: number;
  quality: number;
};

export type ImageResizerWorkerRequest =
  | ImageResizeInspectRequest
  | ImageResizeRunRequest;

export type ImageResizerWorkerReply =
  | {
      id: number;
      ok: true;
      action: "inspect";
      width: number;
      height: number;
    }
  | {
      id: number;
      ok: true;
      action: "resize";
      output: ArrayBuffer;
      width: number;
      height: number;
      transparencyFlattened: boolean;
      firstFrameOnly: boolean;
    }
  | {
      id: number;
      ok: false;
      error:
        | "invalid-image"
        | "wrong-format"
        | "dimensions-too-large"
        | "decode-failed"
        | "encode-failed";
    };
