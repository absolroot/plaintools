export interface TextMetrics {
  words: number;
  characters: number;
  charactersWithoutWhitespace: number;
  lines: number;
  paragraphs: number;
  approximate: boolean;
}

function countWithSegmenter(
  text: string,
  granularity: "word" | "grapheme",
): number {
  const segmenter = new Intl.Segmenter(undefined, { granularity });
  if (granularity === "grapheme")
    return Array.from(segmenter.segment(text)).length;
  let count = 0;
  for (const part of segmenter.segment(text)) if (part.isWordLike) count += 1;
  return count;
}

export function countText(
  text: string,
  segmenterAvailable = typeof Intl.Segmenter === "function",
): TextMetrics {
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

  const withoutWhitespace = text.replace(/\s/gu, "");
  const paragraphs = text
    .split(/(?:\r?\n){2,}/u)
    .filter((part) => part.trim().length > 0).length;
  return {
    words: segmenterAvailable
      ? countWithSegmenter(text, "word")
      : (text.match(/[\p{L}\p{N}\p{M}]+(?:['’_-][\p{L}\p{N}\p{M}]+)*/gu)
          ?.length ?? 0),
    characters: segmenterAvailable
      ? countWithSegmenter(text, "grapheme")
      : Array.from(text).length,
    charactersWithoutWhitespace: segmenterAvailable
      ? countWithSegmenter(withoutWhitespace, "grapheme")
      : Array.from(withoutWhitespace).length,
    lines: text.split(/\r\n|\r|\n/u).length,
    paragraphs,
    approximate: !segmenterAvailable,
  };
}
