import { describe, expect, it } from "vitest";
import { previewCopy } from "./tool-i18n";
import {
  copyPlaceholders,
  copyShape,
  flattenCopy,
} from "./locale-test-helpers";
import { locales } from "./site";

describe("preview tool locale copy", () => {
  it("keeps complete independent locale trees", () => {
    for (const locale of locales.filter((item) => item !== "en")) {
      expect(copyShape(previewCopy[locale]), locale).toEqual(
        copyShape(previewCopy.en),
      );
      expect(previewCopy[locale]).not.toBe(previewCopy.en);
    }
  });

  it("keeps every field non-empty and preserves placeholders", () => {
    const english = new Map(flattenCopy(previewCopy.en));
    for (const locale of locales.filter((item) => item !== "en")) {
      const localized = new Map(flattenCopy(previewCopy[locale]));
      expect([...localized.keys()].sort()).toEqual([...english.keys()].sort());
      for (const [path, value] of english) {
        const translated = localized.get(path) ?? "";
        expect(translated.trim(), `${locale}:${path}`).not.toBe("");
        expect(copyPlaceholders(translated), `${locale}:${path}`).toEqual(
          copyPlaceholders(value),
        );
      }
    }
  });
});
