export type UpscalerMode = "fast" | "quality";
export type UpscaleScale = 2 | 4;
export type UpscaleFormat = "png" | "jpeg";
export type UpscaleBackend = "wasm" | "webgpu";

export type ImageUpscalerCopy = {
  accessibleLabel: string;
  originalLabel: string;
  resultLabel: string;
  chooseImage: string;
  dropHint: string;
  supportedImageTypes: string;
  newImage: string;
  optionsLabel: string;
  modeLabel: string;
  modeOptions: Record<UpscalerMode, string>;
  modeHints: Record<UpscalerMode, string>;
  qualityUnavailable: string;
  scaleLabel: string;
  scaleOptions: Record<UpscaleScale, string>;
  formatLabel: string;
  formatOptions: Record<UpscaleFormat, string>;
  jpegQualityLabel: string;
  upscale: string;
  cancel: string;
  download: string;
  ready: string;
  readingImage: string;
  consentTitle: string;
  consentBody: string;
  consentNotice: string;
  consentConfirm: string;
  downloadingModel: string;
  loadingModel: string;
  processingImage: string;
  composingImage: string;
  completed: string;
  cancelled: string;
  retryingSmallerTiles: string;
  inputDetails: string;
  outputDetails: string;
  comparisonLabel: string;
  comparisonHelp: string;
  fileTooLarge: string;
  imageTooLarge: string;
  outputTooLarge: string;
  invalidImage: string;
  modelFailed: string;
  processingFailed: string;
  downloadFailed: string;
  resultPlaceholder: string;
};

export type UpscaleRequest = {
  kind: "upscale";
  requestId: number;
  mode: UpscalerMode;
  scale: UpscaleScale;
  rgba: Uint8ClampedArray<ArrayBuffer>;
  width: number;
  height: number;
  tileSize: number;
};

export type UpscaleWorkerProgress = {
  kind: "progress";
  requestId: number;
  phase: "cache" | "download" | "model" | "inference" | "composition";
  loaded?: number;
  total?: number;
  completedTiles?: number;
  totalTiles?: number;
  retried?: boolean;
};

export type UpscaleWorkerResult = {
  kind: "result";
  requestId: number;
  rgba: Uint8ClampedArray<ArrayBuffer>;
  width: number;
  height: number;
  tileSize: number;
  retried: boolean;
};

export type UpscaleWorkerFailure = {
  kind: "error";
  requestId: number;
  code: "model" | "inference";
};

export type UpscaleWorkerResponse =
  | UpscaleWorkerProgress
  | UpscaleWorkerResult
  | UpscaleWorkerFailure;
