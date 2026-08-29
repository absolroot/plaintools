import type { JsonInspection } from "@plaintool/json-core";

export type JsonOperation = "format" | "validate" | "minify";

export type JsonClientCopy = {
  ready: string;
  working: string;
  copied: string;
  copyFailed: string;
  processingFailed: string;
  tooLarge: string;
  manualRequired: string;
  valid: string;
  invalidAt: string;
  duplicate: string;
  bom: string;
  errorMessages: Record<string, string>;
};

export type JsonWorkerRequest = {
  id: number;
  input: string;
  operation: JsonOperation;
  indent: 2 | 4 | "tab";
};

export type JsonWorkerReply = {
  id: number;
  inspection: JsonInspection;
  output: string;
};

export type JsonCommittedResult =
  | { kind: "none" }
  | { kind: "validated"; inspection: JsonInspection }
  | {
      kind: "transformed";
      operation: "format" | "minify";
      inspection: JsonInspection;
      output: string;
    };
