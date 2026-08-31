export type RegexMatch = {
  index: number;
  value: string;
  groups: Array<string | undefined>;
};

export type RegexEvaluation =
  | { valid: true; matches: RegexMatch[]; truncated: boolean }
  | { valid: false; message: string };

export type RegexTesterCopy = {
  expressionLabel: string;
  expressionPlaceholder: string;
  flagsLabel: string;
  testTextLabel: string;
  testTextPlaceholder: string;
  replaceLabel: string;
  replacePlaceholder: string;
  replaceAction: string;
  resultsLabel: string;
  ready: string;
  noMatches: string;
  matchCount: string;
  matchAt: string;
  group: string;
  wholeMatch: string;
  invalid: string;
  tooManyMatches: string;
  replacementResult: string;
  clear: string;
  loadSample: string;
  copied: string;
  copy: string;
  localNote: string;
};
