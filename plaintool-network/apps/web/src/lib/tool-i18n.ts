import { commonToolCopy, type CommonToolCopy } from "./common-tool-i18n";
import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";

type Faq = { q: string; a: string };

export interface PreviewToolCopy {
  common: CommonToolCopy;
  word: {
    title: string;
    description: string;
    inputLabel: string;
    words: string;
    characters: string;
    noWhitespace: string;
    lines: string;
    paragraphs: string;
    completed: string;
    approximate: string;
    tooLarge: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  json: {
    title: string;
    description: string;
    inputLabel: string;
    outputLabel: string;
    placeholder: string;
    outputPlaceholder: string;
    openFile: string;
    tooLarge: string;
    manualRequired: string;
    format: string;
    validate: string;
    validateHelpLabel: string;
    validateHelp: string;
    minify: string;
    minifyHelpLabel: string;
    minifyHelp: string;
    indent: string;
    twoSpaces: string;
    fourSpaces: string;
    tabs: string;
    valid: string;
    invalidAt: string;
    duplicate: string;
    bom: string;
    errorMessages: Record<string, string>;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  time: {
    title: string;
    description: string;
    timestampMode: string;
    dateMode: string;
    timestampLabel: string;
    dateLabel: string;
    datePlaceholder: string;
    pickDate: string;
    unit: string;
    auto: string;
    seconds: string;
    milliseconds: string;
    zoneMode: string;
    utc: string;
    local: string;
    selected: string;
    zoneLabel: string;
    zonePlaceholder: string;
    popularZones: Array<{ value: string; label: string }>;
    offsetLabel: string;
    disambiguation: string;
    reject: string;
    earlier: string;
    later: string;
    now: string;
    convert: string;
    instant: string;
    zoned: string;
    unixSeconds: string;
    unixMilliseconds: string;
    invalid: string;
    ambiguousUnit: string;
    converted: string;
    nonexistentTime: string;
    repeatedTime: string;
    y2038: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  textCompare: {
    title: string;
    description: string;
    originalLabel: string;
    changedLabel: string;
    originalPlaceholder: string;
    changedPlaceholder: string;
    compare: string;
    swap: string;
    results: string;
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
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  caseConverter: {
    title: string;
    description: string;
    inputLabel: string;
    outputLabel: string;
    placeholder: string;
    outputPlaceholder: string;
    modeLabel: string;
    upper: string;
    lower: string;
    sentence: string;
    capitalizeWords: string;
    converted: string;
    noChange: string;
    outdated: string;
    tooLarge: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
}

export const previewCopy = Object.fromEntries(
  locales.map((locale) => [
    locale,
    { common: commonToolCopy[locale], ...localeBundles[locale].preview },
  ]),
) as Record<Locale, PreviewToolCopy>;

export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}
