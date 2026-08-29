export interface TextMetrics {
  words: number;
  characters: number;
  charactersWithoutWhitespace: number;
  lines: number;
  paragraphs: number;
  approximate: boolean;
}

export type TextSegmenterLocale = string | readonly string[];

const whitespaceOnlyPattern = /^\s+$/u;

function countWords(text: string, locale?: TextSegmenterLocale): number {
  const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
  let count = 0;
  for (const part of segmenter.segment(text)) if (part.isWordLike) count += 1;
  return count;
}

function countGraphemes(
  text: string,
  locale?: TextSegmenterLocale,
): Pick<TextMetrics, "characters" | "charactersWithoutWhitespace"> {
  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  let characters = 0;
  let charactersWithoutWhitespace = 0;

  for (const part of segmenter.segment(text)) {
    characters += 1;
    if (!whitespaceOnlyPattern.test(part.segment)) {
      charactersWithoutWhitespace += 1;
    }
  }

  return { characters, charactersWithoutWhitespace };
}

function countCodePoints(
  text: string,
): Pick<TextMetrics, "characters" | "charactersWithoutWhitespace"> {
  let characters = 0;
  let charactersWithoutWhitespace = 0;

  for (const codePoint of text) {
    characters += 1;
    if (!whitespaceOnlyPattern.test(codePoint)) {
      charactersWithoutWhitespace += 1;
    }
  }

  return { characters, charactersWithoutWhitespace };
}

function countLinesAndParagraphs(
  text: string,
): Pick<TextMetrics, "lines" | "paragraphs"> {
  const lineBreakPattern = /\r\n|\r|\n/gu;
  let lines = 1;
  let paragraphs = 0;
  let inParagraph = false;
  let lineStart = 0;

  const countLine = (lineEnd: number) => {
    const isBlank = text.slice(lineStart, lineEnd).trim().length === 0;
    if (isBlank) {
      inParagraph = false;
    } else if (!inParagraph) {
      paragraphs += 1;
      inParagraph = true;
    }
  };

  for (
    let match = lineBreakPattern.exec(text);
    match;
    match = lineBreakPattern.exec(text)
  ) {
    countLine(match.index);
    lines += 1;
    lineStart = match.index + match[0].length;
  }
  countLine(text.length);

  return { lines, paragraphs };
}

export function countText(
  text: string,
  segmenterAvailable?: boolean,
): TextMetrics;
export function countText(
  text: string,
  locale?: TextSegmenterLocale,
  segmenterAvailable?: boolean,
): TextMetrics;
export function countText(
  text: string,
  localeOrSegmenterAvailable?: TextSegmenterLocale | boolean,
  segmenterAvailabilityOverride?: boolean,
): TextMetrics {
  const locale =
    typeof localeOrSegmenterAvailable === "boolean"
      ? undefined
      : localeOrSegmenterAvailable;
  const segmenterAvailable =
    typeof localeOrSegmenterAvailable === "boolean"
      ? localeOrSegmenterAvailable
      : (segmenterAvailabilityOverride ?? typeof Intl.Segmenter === "function");

  if (!text) {
    return {
      words: 0,
      characters: 0,
      charactersWithoutWhitespace: 0,
      lines: 0,
      paragraphs: 0,
      approximate: !segmenterAvailable,
    };
  }

  const characterMetrics = segmenterAvailable
    ? countGraphemes(text, locale)
    : countCodePoints(text);
  const structureMetrics = countLinesAndParagraphs(text);

  return {
    words: segmenterAvailable
      ? countWords(text, locale)
      : (text.match(/[\p{L}\p{N}\p{M}]+(?:['’_-][\p{L}\p{N}\p{M}]+)*/gu)
          ?.length ?? 0),
    ...characterMetrics,
    ...structureMetrics,
    approximate: !segmenterAvailable,
  };
}
