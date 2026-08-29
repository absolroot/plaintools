export type HiddenCharacterKind =
  | "zero-width-space"
  | "word-joiner"
  | "byte-order-mark"
  | "soft-hyphen"
  | "bidi-control"
  | "invisible-separator"
  | "join-control"
  | "variation-selector"
  | "combining-mark";

export type NormalizedSpaceKind =
  | "no-break-space"
  | "narrow-no-break-space"
  | "figure-space";

export interface TextCleanerOptions {
  removeJoinControls?: boolean;
  removeVariationSelectors?: boolean;
  removeCombiningMarks?: boolean;
  normalizeNoBreakSpaces?: boolean;
}

export interface CharacterChange {
  codePoint: number;
  codePointLabel: string;
  kind: HiddenCharacterKind | NormalizedSpaceKind;
  count: number;
}

export interface TextCleanerResult {
  cleanedText: string;
  removed: CharacterChange[];
  normalized: CharacterChange[];
  totalRemoved: number;
  totalNormalized: number;
  changed: boolean;
}

const DEFAULT_REMOVALS = new Map<number, HiddenCharacterKind>([
  [0x00ad, "soft-hyphen"],
  [0x061c, "bidi-control"],
  [0x200b, "zero-width-space"],
  [0x200e, "bidi-control"],
  [0x200f, "bidi-control"],
  [0x202a, "bidi-control"],
  [0x202b, "bidi-control"],
  [0x202c, "bidi-control"],
  [0x202d, "bidi-control"],
  [0x202e, "bidi-control"],
  [0x2060, "word-joiner"],
  [0x2063, "invisible-separator"],
  [0x2066, "bidi-control"],
  [0x2067, "bidi-control"],
  [0x2068, "bidi-control"],
  [0x2069, "bidi-control"],
  [0xfeff, "byte-order-mark"],
]);

const NORMALIZED_SPACES = new Map<number, NormalizedSpaceKind>([
  [0x00a0, "no-break-space"],
  [0x2007, "figure-space"],
  [0x202f, "narrow-no-break-space"],
]);

function isVariationSelector(codePoint: number): boolean {
  return (
    (codePoint >= 0xfe00 && codePoint <= 0xfe0f) ||
    (codePoint >= 0xe0100 && codePoint <= 0xe01ef)
  );
}

function isCombiningMark(character: string): boolean {
  return /^\p{Mark}$/u.test(character);
}

function codePointLabel(codePoint: number): string {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
}

function record(
  changes: Map<number, CharacterChange>,
  codePoint: number,
  kind: HiddenCharacterKind | NormalizedSpaceKind,
): void {
  const current = changes.get(codePoint);
  if (current) {
    current.count += 1;
    return;
  }
  changes.set(codePoint, {
    codePoint,
    codePointLabel: codePointLabel(codePoint),
    kind,
    count: 1,
  });
}

export function cleanHiddenUnicode(
  text: string,
  options: TextCleanerOptions = {},
): TextCleanerResult {
  const removed = new Map<number, CharacterChange>();
  const normalized = new Map<number, CharacterChange>();
  const output: string[] = [];

  for (const character of text) {
    const codePoint = character.codePointAt(0)!;
    const defaultKind = DEFAULT_REMOVALS.get(codePoint);
    let removalKind = defaultKind;

    if (!removalKind && options.removeJoinControls) {
      if (codePoint === 0x200c || codePoint === 0x200d) {
        removalKind = "join-control";
      }
    }
    if (!removalKind && options.removeVariationSelectors) {
      if (isVariationSelector(codePoint)) removalKind = "variation-selector";
    }
    if (!removalKind && options.removeCombiningMarks) {
      if (isCombiningMark(character)) removalKind = "combining-mark";
    }

    if (removalKind) {
      record(removed, codePoint, removalKind);
      continue;
    }

    const spaceKind = NORMALIZED_SPACES.get(codePoint);
    if (options.normalizeNoBreakSpaces && spaceKind) {
      record(normalized, codePoint, spaceKind);
      output.push(" ");
      continue;
    }
    output.push(character);
  }

  const removedList = [...removed.values()];
  const normalizedList = [...normalized.values()];
  const totalRemoved = removedList.reduce((sum, item) => sum + item.count, 0);
  const totalNormalized = normalizedList.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return {
    cleanedText: output.join(""),
    removed: removedList,
    normalized: normalizedList,
    totalRemoved,
    totalNormalized,
    changed: totalRemoved + totalNormalized > 0,
  };
}
