import type { HtmlIndent, HtmlIssueCode } from "@plaintool/html-formatter-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface HtmlFormatterCopy {
  ariaLabel: string;
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
  errors: Record<HtmlIssueCode | "Unknown", string>;
}

export interface HtmlFormatterClientCopy {
  feature: HtmlFormatterCopy;
  common: ToolCommonCopy;
}

export type HtmlFormatSettings = {
  indent: HtmlIndent;
  printWidth: number;
};

export type HtmlWorkerRequest = {
  id: number;
  input: string;
  settings: HtmlFormatSettings;
};

export type HtmlWorkerReply =
  | { id: number; ok: true; output: string }
  | {
      id: number;
      ok: false;
      issue: {
        code: HtmlIssueCode | "Unknown";
        line?: number;
        column?: number;
      };
    };

export type HtmlRunContext = {
  revision: number;
  input: string;
  settings: HtmlFormatSettings;
  focusError: boolean;
};
