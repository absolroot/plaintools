import { describe, expect, it } from "vitest";
import { imageConversionModes } from "../features/image-converter/formats";
import {
  imageConversionSources,
  invisibleCharacterRemoverSources,
  sourceReferenceCopy,
} from "./source-references";
import { locales } from "./site";

describe("source reference registry", () => {
  it("uses a localized source heading for every public locale", () => {
    expect(Object.keys(sourceReferenceCopy)).toEqual(locales);
    for (const locale of locales)
      expect(sourceReferenceCopy[locale].heading).not.toHaveLength(0);
  });

  it("uses HTTPS primary-source links for the cleaner and every image route", () => {
    const groups = [
      invisibleCharacterRemoverSources,
      ...imageConversionModes.map(imageConversionSources),
    ];
    for (const sources of groups) {
      expect(sources.length).toBeGreaterThan(0);
      expect(new Set(sources.map((source) => source.id)).size).toBe(
        sources.length,
      );
      for (const source of sources) {
        expect(new URL(source.href).protocol).toBe("https:");
        expect(source.title).not.toHaveLength(0);
        expect(source.publisher).not.toHaveLength(0);
      }
    }
  });
});
