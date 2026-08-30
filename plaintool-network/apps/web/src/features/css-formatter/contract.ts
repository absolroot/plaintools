import type { CssIndent, CssIssueCode } from "@plaintool/css-formatter-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export type CssOperation = "format";

export interface CssFormatterCopy {
  ariaLabel: string;
  modeLabel: string;
  format: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  outputPlaceholder: string;
  openFile: string;
  loadSample: string;
  optionsLabel: string;
  indentationLabel: string;
  twoSpaces: string;
  fourSpaces: string;
  tabs: string;
  printWidthLabel: string;
  formatted: string;
  downloadFilename: string;
  outdated: string;
  tooLarge: string;
  manualRequired: string;
  invalidAt: string;
  scopeNotice: string;
  sampleInput: string;
  errors: Record<CssIssueCode | "Unknown", string>;
}

export interface CssFormatterClientCopy {
  feature: CssFormatterCopy;
  common: ToolCommonCopy;
}

export type CssFormatSettings = {
  indent: CssIndent;
  printWidth: number;
};

export type CssWorkerRequest = {
  id: number;
  operation: CssOperation;
  input: string;
  settings: CssFormatSettings;
};

export type CssWorkerReply =
  | { id: number; ok: true; operation: CssOperation; output: string }
  | {
      id: number;
      ok: false;
      operation: CssOperation;
      issue: {
        code: CssIssueCode | "Unknown";
        line?: number;
        column?: number;
      };
    };

export type CssRunContext = {
  revision: number;
  operation: CssOperation;
  input: string;
  settings: CssFormatSettings;
  focusError: boolean;
};
