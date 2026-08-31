import type {
  PdfMargin,
  PdfOrientation,
  PdfPageSize,
} from "@plaintool/pdf-core";
import type { CommonToolCopy } from "../../lib/common-tool-i18n";

export type CompressionPreset = "preserve" | "balanced" | "small";
export type SplitMode = "extract" | "split";
export type SplitRule = "fixed" | "custom";
export type RasterFormat = "jpg" | "png";

export type PdfToolkitCopy = {
  ariaLabel: string;
  choosePdf: string;
  choosePdfs: string;
  chooseImages: string;
  addFiles: string;
  replaceFile: string;
  dropPdf: string;
  dropPdfs: string;
  dropImages: string;
  pdfTypes: string;
  imageTypes: string;
  selectedFiles: string;
  options: string;
  result: string;
  remove: string;
  moveUp: string;
  moveDown: string;
  pages: string;
  page: string;
  size: string;
  dimensions: string;
  progress: string;
  cancel: string;
  complete: string;
  compress: string;
  merge: string;
  split: string;
  convertToImages: string;
  createPdf: string;
  downloadPdf: string;
  downloadZip: string;
  downloadImage: string;
  originalSize: string;
  resultSize: string;
  smallerBy: string;
  largerBy: string;
  compressionLevel: string;
  preserveDocument: string;
  preserveDocumentHint: string;
  balanced: string;
  balancedHint: string;
  smallerFile: string;
  smallerFileHint: string;
  rasterWarningTitle: string;
  rasterWarningBody: string;
  extractPages: string;
  splitDocument: string;
  pageSelection: string;
  pageSelectionHint: string;
  everyPages: string;
  customRanges: string;
  pagesPerFile: string;
  customRangesHint: string;
  selectAll: string;
  clearSelection: string;
  outputFormat: string;
  jpg: string;
  png: string;
  resolution: string;
  dpi96: string;
  dpi144: string;
  dpi200: string;
  quality: string;
  pageSize: string;
  fitImage: string;
  a4: string;
  letter: string;
  orientation: string;
  automatic: string;
  portrait: string;
  landscape: string;
  margin: string;
  noMargin: string;
  smallMargin: string;
  largeMargin: string;
  resultFiles: string;
  noReduction: string;
  fileTooLarge: string;
  tooManyPages: string;
  tooManyRasterPages: string;
  invalidPdf: string;
  encryptedPdf: string;
  invalidImage: string;
  unsupportedImage: string;
  minimumMergeFiles: string;
  emptySelection: string;
  invalidRange: string;
  rangeOutOfBounds: string;
  reversedRange: string;
  renderFailed: string;
  workerFailed: string;
};

export type PdfToolkitClientCopy = PdfToolkitCopy & CommonToolCopy;

export type PdfWorkerImage = {
  bytes: ArrayBuffer;
  mime: "image/jpeg" | "image/png";
  width: number;
  height: number;
};

export type PdfWorkerRequest =
  | { id: number; operation: "preserve"; input: ArrayBuffer }
  | { id: number; operation: "merge"; inputs: ArrayBuffer[] }
  | {
      id: number;
      operation: "split";
      input: ArrayBuffer;
      groups: number[][];
    }
  | {
      id: number;
      operation: "images-to-pdf";
      images: PdfWorkerImage[];
      pageSize: PdfPageSize;
      orientation: PdfOrientation;
      margin: PdfMargin;
    }
  | {
      id: number;
      operation: "raster-pages-to-pdf";
      pages: Array<{
        bytes: ArrayBuffer;
        width: number;
        height: number;
      }>;
    }
  | {
      id: number;
      operation: "zip";
      files: Array<{ name: string; bytes: ArrayBuffer }>;
    };

export type PdfWorkerError =
  | "invalid-pdf"
  | "encrypted-pdf"
  | "invalid-image"
  | "processing-failed";

export type PdfWorkerReply =
  | { id: number; kind: "progress"; completed: number; total: number }
  | { id: number; kind: "result"; outputs: ArrayBuffer[] }
  | { id: number; kind: "error"; error: PdfWorkerError };
