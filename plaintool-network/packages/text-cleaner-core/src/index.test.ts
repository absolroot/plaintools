import { describe, expect, it } from "vitest";
import { cleanHiddenUnicode } from "./index";

describe("cleanHiddenUnicode", () => {
  it("removes default hidden artifacts and reports exact code points", () => {
    const result = cleanHiddenUnicode(
      "Alpha\u200BBeta\u2060Gamma\u00ad!\nNext\uFEFF\u2063",
    );

    expect(result.cleanedText).toBe("AlphaBetaGamma!\nNext");
    expect(result.totalRemoved).toBe(5);
    expect(result.removed.map((item) => item.codePointLabel)).toEqual([
      "U+200B",
      "U+2060",
      "U+00AD",
      "U+FEFF",
      "U+2063",
    ]);
  });

  it("preserves bidi controls by default and removes them only on request", () => {
    const source = "A\u061C\u200EB\u202EC\u2067D\u2069";

    expect(cleanHiddenUnicode(source).cleanedText).toBe(source);
    const reviewed = cleanHiddenUnicode(source, { removeBidiControls: true });
    expect(reviewed.cleanedText).toBe("ABCD");
    expect(reviewed.removed.map((item) => item.kind)).toEqual([
      "bidi-control",
      "bidi-control",
      "bidi-control",
      "bidi-control",
      "bidi-control",
    ]);
  });

  it("preserves normal whitespace and meaningful Unicode controls by default", () => {
    const source =
      "A B\nC\tD 👩\u200D💻 فارسی‌ 😀\uFE0F e\u0301\u00A0x f\u2061(x) \u061C\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u2066\u2067\u2068\u2069";
    const result = cleanHiddenUnicode(source);

    expect(result.cleanedText).toBe(source);
    expect(result.changed).toBe(false);
  });

  it("preserves the legacy Mongolian vowel separator by default", () => {
    const source = `ᠮ\u180Eᠣ`;
    const result = cleanHiddenUnicode(source);

    expect(result.cleanedText).toBe(source);
    expect(result.changed).toBe(false);
  });

  it("applies risky and space normalization options only when requested", () => {
    const result = cleanHiddenUnicode(
      "a\u200Db\uFE0Fc\u0301d\u00A0e\u202Ff\u2007g",
      {
        removeJoinControls: true,
        removeVariationSelectors: true,
        removeCombiningMarks: true,
        normalizeNoBreakSpaces: true,
      },
    );

    expect(result.cleanedText).toBe("abcd e f g");
    expect(result.totalRemoved).toBe(3);
    expect(result.totalNormalized).toBe(3);
  });

  it("counts repeated characters without collapsing the report", () => {
    const result = cleanHiddenUnicode("a\u200B\u200Bb");
    expect(result.removed).toEqual([
      {
        codePoint: 0x200b,
        codePointLabel: "U+200B",
        kind: "zero-width-space",
        count: 2,
      },
    ]);
  });
});
