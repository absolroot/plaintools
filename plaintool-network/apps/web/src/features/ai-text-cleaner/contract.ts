import type {
  HiddenCharacterKind,
  NormalizedSpaceKind,
  TextCleanerOptions,
  TextCleanerResult,
} from "@plaintool/text-cleaner-core";

export type AiTextCleanerCopy = {
  accessibleLabel: string;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  clear: string;
  copy: string;
  run: string;
  ready: string;
  completed: string;
  unchanged: string;
  copied: string;
  copyFailed: string;
  tooLarge: string;
  processingFailed: string;
  reportTitle: string;
  removedHeading: string;
  normalizedHeading: string;
  noChanges: string;
  changeCountTemplate: string;
  advancedTitle: string;
  advancedWarning: string;
  removeJoinControls: string;
  removeJoinControlsWarning: string;
  removeVariationSelectors: string;
  removeVariationSelectorsWarning: string;
  removeCombiningMarks: string;
  removeCombiningMarksWarning: string;
  normalizeNoBreakSpaces: string;
  normalizeNoBreakSpacesNote: string;
  kindLabels: Record<HiddenCharacterKind | NormalizedSpaceKind, string>;
};

export type AiTextCleanerResult = TextCleanerResult;
export type AiTextCleanerOptions = TextCleanerOptions;
