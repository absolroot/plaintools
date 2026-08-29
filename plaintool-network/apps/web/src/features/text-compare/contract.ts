import type { TextDiffResult } from "@plaintool/text-diff-core";

export type TextCompareClientCopy = {
  ready: string;
  working: string;
  processingFailed: string;
  empty: string;
  tooLarge: string;
  tooManyLines: string;
  tooComplex: string;
  stale: string;
  complete: string;
  identical: string;
  approximate: string;
  inlineLimited: string;
  additions: string;
  deletions: string;
  changes: string;
  previousChange: string;
  nextChange: string;
  expandUnchanged: string;
  whitespaceChange: string;
  lineEndingChange: string;
  unchangedRow: string;
  addedRow: string;
  removedRow: string;
  changedRow: string;
  originalLine: string;
  changedLine: string;
};

export type TextCompareWorkerRequest = {
  id: number;
  original: string;
  changed: string;
};

export type TextCompareWorkerReply = {
  id: number;
  result: TextDiffResult;
};
