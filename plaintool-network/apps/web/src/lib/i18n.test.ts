import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { copy } from "./i18n";
import { copyPlaceholders, flattenCopy } from "./locale-test-helpers";
import { locales } from "./site";

describe("localized copy", () => {
  it("defines a complete, non-empty copy tree for every public locale", () => {
    expect(Object.keys(copy)).toEqual([...locales]);
    const english = new Map(flattenCopy(copy.en));

    for (const locale of locales) {
      const localized = new Map(flattenCopy(copy[locale]));
      expect([...localized.keys()]).toEqual([...english.keys()]);
      for (const value of localized.values()) expect(value.trim()).not.toBe("");
    }
  });

  it("preserves interpolation placeholders in every locale", () => {
    const english = new Map(flattenCopy(copy.en));
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = new Map(flattenCopy(copy[locale]));
      for (const [path, value] of english) {
        expect(
          copyPlaceholders(localized.get(path) ?? ""),
          `${locale}:${path}`,
        ).toEqual(copyPlaceholders(value));
      }
    }
  });

  it("does not hide missing translations behind an English object spread", () => {
    const source = readFileSync(new URL("./i18n.ts", import.meta.url), "utf8");
    expect(source).not.toContain("...copy.en");
  });
});
