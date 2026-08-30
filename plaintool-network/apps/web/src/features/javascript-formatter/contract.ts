import type {
  JavaScriptFormatterMode,
  JavaScriptIndent,
  JavaScriptIssueCode,
} from "@plaintool/javascript-formatter-core";
import type { ToolCommonCopy } from "../common-copy-contract";
import type { ToolHelpCopy } from "../../lib/locale-data/tool-help";

export interface JavaScriptFormatterCopy {
  ariaLabel: string;
  modeLabel: string;
  formatMode: string;
  minifyMode: string;
  runFormat: string;
  runMinify: string;
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
  semicolonsLabel: string;
  singleQuoteLabel: string;
  preserveCommentsLabel: string;
  formatted: string;
  minified: string;
  formatDownloadFilename: string;
  minifyDownloadFilename: string;
  outdated: string;
  tooLarge: string;
  manualRequired: string;
  /** Includes `{message}`, `{line}`, and `{column}` placeholders. */
  invalidAt: string;
  /** Must disclose source-only processing and avoid semantic-equivalence claims. */
  scopeNotice: string;
  sampleInput: string;
  errors: Record<JavaScriptIssueCode | "Unknown", string>;
}

export interface JavaScriptFormatterClientCopy {
  feature: JavaScriptFormatterCopy;
  common: ToolCommonCopy;
}

export interface JavaScriptFormatterComponentProps {
  copy: JavaScriptFormatterCopy;
  commonCopy: ToolCommonCopy;
  help: ToolHelpCopy;
  initialMode?: JavaScriptFormatterMode;
}

export interface JavaScriptFormatSettings {
  indent: JavaScriptIndent;
  printWidth: number;
  semi: boolean;
  singleQuote: boolean;
}

export interface JavaScriptWorkerSettings {
  format: JavaScriptFormatSettings;
  preserveComments: boolean;
}

export interface JavaScriptWorkerRequest {
  id: number;
  input: string;
  mode: JavaScriptFormatterMode;
  settings: JavaScriptWorkerSettings;
}

export type JavaScriptWorkerReply =
  | { id: number; ok: true; output: string }
  | {
      id: number;
      ok: false;
      issue: {
        code: JavaScriptIssueCode | "Unknown";
        line?: number;
        column?: number;
      };
    };

export interface JavaScriptRunContext {
  revision: number;
  input: string;
  mode: JavaScriptFormatterMode;
  settings: JavaScriptWorkerSettings;
  focusError: boolean;
}
