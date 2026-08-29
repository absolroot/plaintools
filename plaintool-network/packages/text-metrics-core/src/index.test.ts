import { describe, expect, it } from "vitest";
import { countText } from "./index";

describe("countText", () => {
  it("counts words, lines, paragraphs and whitespace", () => {
    expect(countText("Hello world\n\n두 번째 문단")).toMatchObject({
      words: 5,
      lines: 3,
      paragraphs: 2,
    });
  });

  it("counts a composed emoji as one grapheme", () => {
    expect(countText("👨‍👩‍👧‍👦").characters).toBe(1);
  });

  it("reports an explicit approximation when Segmenter is unavailable", () => {
    expect(countText("hello 👨‍👩‍👧‍👦", false)).toMatchObject({
      words: 1,
      approximate: true,
    });
  });

  it("returns zero lines for empty input", () => {
    expect(countText("")).toEqual({
      words: 0,
      characters: 0,
      charactersWithoutWhitespace: 0,
      lines: 0,
      paragraphs: 0,
      approximate: false,
    });
  });
});
