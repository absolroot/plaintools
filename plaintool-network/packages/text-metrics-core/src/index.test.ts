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

  it("counts extended emoji and combining sequences as graphemes", () => {
    expect(countText("e\u0301 👩🏽‍💻")).toMatchObject({
      characters: 3,
      charactersWithoutWhitespace: 2,
    });
  });

  it("does not join regional indicators after excluding whitespace", () => {
    expect(countText("🇺 🇸")).toMatchObject({
      characters: 3,
      charactersWithoutWhitespace: 2,
    });
    expect(countText("🇺🇸")).toMatchObject({
      characters: 1,
      charactersWithoutWhitespace: 1,
    });
  });

  it("excludes Unicode whitespace without changing original grapheme boundaries", () => {
    expect(countText("🇺\u2003🇸")).toMatchObject({
      characters: 3,
      charactersWithoutWhitespace: 2,
    });
  });

  it.each([
    ["LF", "first\n \t\nsecond"],
    ["CRLF", "first\r\n \t\r\nsecond"],
    ["CR", "first\r \t\rsecond"],
    ["mixed line endings", "first\r\n\u00a0\nsecond"],
  ])("treats a whitespace-only %s line as a paragraph separator", (_, text) => {
    expect(countText(text)).toMatchObject({ lines: 3, paragraphs: 2 });
  });

  it("keeps adjacent nonblank lines in one paragraph", () => {
    expect(countText("first\nsecond\r\nthird")).toMatchObject({
      lines: 3,
      paragraphs: 1,
    });
  });

  it("does not create paragraphs from leading, trailing, or whitespace-only lines", () => {
    expect(countText("\n \t\r\nfirst\n\n")).toMatchObject({
      lines: 5,
      paragraphs: 1,
    });
    expect(countText("\t\r\n\u00a0")).toMatchObject({
      lines: 2,
      paragraphs: 0,
    });
  });

  it("counts mixed CR, LF, and CRLF line endings consistently", () => {
    expect(countText("one\r\ntwo\rthree\nfour").lines).toBe(4);
  });

  it("accepts a locale while preserving the existing boolean argument", () => {
    expect(countText("hola mundo", "es")).toMatchObject({
      words: 2,
      approximate: false,
    });
    expect(countText("hello", false).approximate).toBe(true);
  });

  it("reports code-point metrics as an explicit approximation without Segmenter", () => {
    expect(countText("e\u0301 👩‍💻", false)).toMatchObject({
      words: 1,
      characters: 6,
      charactersWithoutWhitespace: 5,
      approximate: true,
    });
  });

  it("supports locale-aware calls when Segmenter availability is overridden", () => {
    expect(countText("🇺 🇸", "en", false)).toMatchObject({
      characters: 3,
      charactersWithoutWhitespace: 2,
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
