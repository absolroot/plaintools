import type { CaseMode } from "@plaintool/text-case-core";

export type CaseClientCopy = {
  ready: string;
  working: string;
  converted: string;
  noChange: string;
  outdated: string;
  copied: string;
  copyFailed: string;
  processingFailed: string;
  tooLarge: string;
};

export type CaseWorkerRequest = {
  id: number;
  input: string;
  mode: CaseMode;
};

export type CaseWorkerReply = {
  id: number;
  output: string;
};

export type CaseRunContext = {
  source: string;
  mode: CaseMode;
  revision: number;
};
