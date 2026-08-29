export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface QrEncodeOptions {
  errorCorrectionLevel?: QrErrorCorrectionLevel;
  quietZone?: number;
}

export interface QrMatrix {
  size: number;
  quietZone: number;
  modules: boolean[];
}

export interface QrScanResult {
  text: string;
  bytes: number[];
}

export interface QrRgbaImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}
