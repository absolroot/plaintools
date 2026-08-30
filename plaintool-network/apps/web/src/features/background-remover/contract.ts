export type BackgroundModelId = "fast" | "portrait" | "quality" | "precision";
export type BackgroundModelNormalization = "u2net" | "modnet" | "imagenet";
export type BackgroundModelOutput = "minmax" | "direct" | "sigmoid-minmax";
export type BackgroundMode = "transparent" | "white" | "color";

export type BackgroundRemoverCopy = {
  accessibleLabel: string;
  originalLabel: string;
  resultLabel: string;
  chooseImage: string;
  dropHint: string;
  supportedImageTypes: string;
  optionsLabel: string;
  modelLabel: string;
  modelOptions: Record<BackgroundModelId, string>;
  modelHints: Record<BackgroundModelId, string>;
  precisionUnavailable: string;
  precisionConsentTitle: string;
  precisionConsentBody: string;
  precisionConsentNotice: string;
  precisionConsentConfirm: string;
  cancel: string;
  backgroundLabel: string;
  backgroundOptions: Record<BackgroundMode, string>;
  colorLabel: string;
  removeBackground: string;
  newImage: string;
  downloadPng: string;
  ready: string;
  readingImage: string;
  downloadingModel: string;
  loadingModel: string;
  processingImage: string;
  completed: string;
  scaledImage: string;
  fileTooLarge: string;
  imageTooLarge: string;
  invalidImage: string;
  modelFailed: string;
  processingFailed: string;
  downloadFailed: string;
  resultPlaceholder: string;
};

export type RemoveRequest = {
  kind: "remove";
  requestId: number;
  model: BackgroundModelId;
  tensor: Float32Array;
};

export type WorkerProgress = {
  kind: "progress";
  requestId: number;
  phase: "download" | "model" | "inference";
  loaded?: number;
  total?: number;
};

export type WorkerResult = {
  kind: "result";
  requestId: number;
  alpha: Uint8ClampedArray;
  width: number;
  height: number;
};

export type WorkerFailure = {
  kind: "error";
  requestId: number;
  code: "model" | "inference";
};

export type BackgroundWorkerResponse =
  | WorkerProgress
  | WorkerResult
  | WorkerFailure;
