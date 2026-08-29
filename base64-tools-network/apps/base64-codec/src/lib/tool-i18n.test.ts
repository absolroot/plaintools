import { describe, expect, it } from "vitest";
import { previewCopy } from "./tool-i18n";
import {
  copyPlaceholders,
  copyShape,
  flattenCopy,
} from "./locale-test-helpers";

describe("preview tool locale copy", () => {
  it("keeps complete independent locale trees", () => {
    expect(copyShape(previewCopy.ko)).toEqual(copyShape(previewCopy.en));
    expect(copyShape(previewCopy.es)).toEqual(copyShape(previewCopy.en));
    expect(previewCopy.ko).not.toBe(previewCopy.en);
  });

  it("keeps every field non-empty and preserves placeholders", () => {
    const english = new Map(flattenCopy(previewCopy.en));
    for (const locale of ["ko", "es"] as const) {
      const localized = new Map(flattenCopy(previewCopy[locale]));
      expect([...localized.keys()]).toEqual([...english.keys()]);
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
