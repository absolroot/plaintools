import type {
  SqlDialect,
  SqlIndent,
  SqlIssueCode,
  SqlKeywordCase,
} from "@plaintool/sql-formatter-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface SqlFormatterCopy {
  ariaLabel: string;
  format: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  outputPlaceholder: string;
  openFile: string;
  loadSample: string;
  dialectLabel: string;
  dialects: Record<SqlDialect, string>;
  optionsLabel: string;
  indentationLabel: string;
  twoSpaces: string;
  fourSpaces: string;
  tabs: string;
  keywordCaseLabel: string;
  preserveCase: string;
  uppercase: string;
  lowercase: string;
  formatted: string;
  downloadFilename: string;
  outdated: string;
  tooLarge: string;
  manualRequired: string;
  invalidAt: string;
  scopeNotice: string;
  sampleInput: string;
  errors: Record<SqlIssueCode | "Unknown", string>;
}

export interface SqlFormatterClientCopy {
  feature: SqlFormatterCopy;
  common: ToolCommonCopy;
}

export type SqlFormatSettings = {
  dialect: SqlDialect;
  indent: SqlIndent;
  keywordCase: SqlKeywordCase;
};

export type SqlWorkerRequest = {
  id: number;
  input: string;
  settings: SqlFormatSettings;
};

export type SqlWorkerReply =
  | { id: number; ok: true; output: string }
  | {
      id: number;
      ok: false;
      issue: {
        code: SqlIssueCode | "Unknown";
        line?: number;
        column?: number;
      };
    };

export type SqlRunContext = {
  revision: number;
  input: string;
  settings: SqlFormatSettings;
  focusError: boolean;
};
