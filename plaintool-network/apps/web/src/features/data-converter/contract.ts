import type {
  CsvDelimiter,
  DataConversionErrorCode,
  DataConversionMode,
  DataConversionOptions,
} from "@plaintool/data-conversion-core";

export type DataConverterCopy = {
  ariaLabel: string;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  openFile: string;
  dropHint: string;
  clear: string;
  copy: string;
  download: string;
  convert: string;
  ready: string;
  working: string;
  complete: string;
  copied: string;
  copyFailed: string;
  tooLarge: string;
  readFailed: string;
  processingFailed: string;
  errorAt: string;
  delimiterLabel: string;
  autoDelimiter: string;
  commaDelimiter: string;
  semicolonDelimiter: string;
  tabDelimiter: string;
  pipeDelimiter: string;
  firstRowHeader: string;
  prettyJson: string;
  localTitle: string;
  localBody: string;
  errorMessages: Record<DataConversionErrorCode, string>;
};

export type DataConverterWorkerRequest = {
  id: number;
  mode: DataConversionMode;
  input: string;
  options: DataConversionOptions;
};

export type DataConverterWorkerReply =
  | { id: number; ok: true; output: string }
  | {
      id: number;
      ok: false;
      error: DataConversionErrorCode;
      line?: number;
      column?: number;
    };

export type DataConverterRunContext = {
  mode: DataConversionMode;
  source: string;
  revision: number;
};

export type DelimiterOption = CsvDelimiter | "auto";
