export type CropRect = { x: number; y: number; width: number; height: number };

export type ImageCropCopy = {
  ariaLabel: string;
  chooseImage: string;
  replaceImage: string;
  dropImage: string;
  pasteHint: string;
  formats: string;
  crop: string;
  transform: string;
  cropArea: string;
  ratio: string;
  free: string;
  square: string;
  landscape: string;
  portrait: string;
  rotateLeft: string;
  rotateRight: string;
  flipHorizontal: string;
  flipVertical: string;
  straighten: string;
  reset: string;
  output: string;
  quality: string;
  smallerFile: string;
  betterQuality: string;
  save: string;
  reading: string;
  working: string;
  complete: string;
  resultEmpty: string;
  invalidImage: string;
  fileTooLarge: string;
  dimensionsTooLarge: string;
  decodeFailed: string;
  encodeFailed: string;
};

export type ImageCropClientCopy = ImageCropCopy & {
  clear: string;
  ready: string;
  download: string;
};
