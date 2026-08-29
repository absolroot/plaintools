import { describe, expect, it } from "vitest";
import { cleanHiddenUnicode } from "./index";

describe("cleanHiddenUnicode", () => {
  it("removes default hidden artifacts and reports exact code points", () => {
    const result = cleanHiddenUnicode(
      "Alpha\u200BBeta\u2060Gamma\u00ad!\u202E\nNext\uFEFF\u2063",
    );

    expect(result.cleanedText).toBe("AlphaBetaGamma!\nNext");
    expect(result.totalRemoved).toBe(6);
    expect(result.removed.map((item) => item.codePointLabel)).toEqual([
      "U+200B",
      "U+2060",
      "U+00AD",
      "U+202E",
      "U+FEFF",
      "U+2063",
    ]);
  });

  it("preserves normal whitespace and meaningful Unicode controls by default", () => {
    const source =
      "A B\nC\tD 👩\u200D💻 فارسی‌ 😀\uFE0F e\u0301\u00A0x f\u2061(x)";
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
