export type RegexMatch = {
  index: number;
  value: string;
  groups: Array<string | undefined>;
};

export type RegexEvaluation =
  | { valid: true; matches: RegexMatch[]; truncated: boolean }
  | { valid: false; reason: "invalid-pattern" };

export type RegexReplacement =
  | { ok: true; output: string }
  | { ok: false; reason: "invalid-pattern" | "too-many-matches" };

export type RegexWorkerRequest = {
  id: number;
  operation: "evaluate" | "replace";
  expression: string;
  flags: string;
  text: string;
  replacement: string;
};

export type RegexWorkerReply = {
  id: number;
  evaluation: RegexEvaluation;
  replacement?: RegexReplacement;
};

export type RegexTesterCopy = {
  expressionLabel: string;
  expressionPlaceholder: string;
  flagsLabel: string;
  testTextLabel: string;
  testTextPlaceholder: string;
  replacementLabel: string;
  replacementPlaceholder: string;
  replacementOutputLabel: string;
  replacementOutputPlaceholder: string;
  replaceAction: string;
  resultsLabel: string;
  ready: string;
  enterExpression: string;
  evaluating: string;
  noMatches: string;
  matchSummary: string;
  matchAt: string;
  group: string;
  invalid: string;
  tooManyMatches: string;
  inputTooLarge: string;
  replacementTooLarge: string;
  processingFailed: string;
  replacementResult: string;
  clear: string;
  loadSample: string;
  copied: string;
  copyFailed: string;
  copy: string;
  localNote: string;
};
