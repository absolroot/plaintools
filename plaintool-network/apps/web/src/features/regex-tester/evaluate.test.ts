import { describe, expect, it } from "vitest";
import { evaluateRegex, MAX_REGEX_MATCHES, replaceAllRegex } from "./evaluate";

describe("evaluateRegex", () => {
  it("returns every JavaScript match and capture group when global is selected", () => {
    expect(evaluateRegex("(ab)(c)?", "g", "abc ab")).toEqual({
      valid: true,
      truncated: false,
      matches: [
        { index: 0, value: "abc", groups: ["ab", "c"] },
        { index: 4, value: "ab", groups: ["ab", undefined] },
      ],
    });
  });

  it("honors an unchecked global flag", () => {
    expect(evaluateRegex("a", "i", "Aa")).toEqual({
      valid: true,
      truncated: false,
      matches: [{ index: 0, value: "A", groups: [] }],
    });
  });

  it("reports invalid expressions without returning raw exceptions", () => {
    expect(evaluateRegex("[", "", "text")).toEqual({
      valid: false,
      reason: "invalid-pattern",
    });
  });

  it("stops after the bounded result limit, including empty matches", () => {
    const result = evaluateRegex("(?=a)", "g", "a".repeat(800));
    expect(result).toMatchObject({
      valid: true,
      truncated: true,
      matches: { length: MAX_REGEX_MATCHES },
    });
  });

  it("advances empty Unicode matches by one code point", () => {
    const result = evaluateRegex("(?=.)", "gu", "😀a");
    expect(result).toMatchObject({
      valid: true,
      matches: [{ index: 0 }, { index: 2 }],
    });
  });
});

describe("replaceAllRegex", () => {
  it("replaces all matches without changing match-list flag semantics", () => {
    expect(replaceAllRegex("(hello)", "i", "Hello hello", "[$1]")).toEqual({
      ok: true,
      output: "[Hello] [hello]",
    });
  });

  it("rejects replacement work beyond the bounded match limit", () => {
    expect(
      replaceAllRegex("(?=a)", "", "a".repeat(MAX_REGEX_MATCHES + 1), "x"),
    ).toEqual({ ok: false, reason: "too-many-matches" });
  });
});
