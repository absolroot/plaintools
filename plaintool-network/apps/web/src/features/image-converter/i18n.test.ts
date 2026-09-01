import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { imageConversionModes } from "./formats";
import { imageConverterLocales, type ImageConverterLocale } from "./i18n";
import { imageConversionRouteFacts, routeFactKinds } from "./route-facts";

const locales = Object.keys(imageConverterLocales) as ImageConverterLocale[];
const supportKeys = [
  "ariaLabel",
  "previewEmpty",
  "lossless",
  "fixedProfile",
  "fileTooLarge",
  "invalidImage",
  "wrongFormat",
  "dimensionsTooLarge",
  "decodeFailed",
  "encodeFailed",
  "transparencyFlattened",
  "animationFirstFrame",
  "sizeIncreaseExpected",
] as const;

describe("image converter localization", () => {
  it("publishes all 49 conversion intents in every locale", () => {
    expect(imageConversionModes).toHaveLength(49);
    for (const locale of locales) {
      expect(Object.keys(imageConverterLocales[locale].tools), locale).toEqual(
        imageConversionModes.map((mode) => mode.id),
      );
    }
  });

  it("does not silently reuse English fallback copy", () => {
    const english = imageConverterLocales.en.tools["png-to-webp"].feature;
    for (const locale of locales.filter((item) => item !== "en")) {
      const feature =
        imageConverterLocales[locale].tools["png-to-webp"].feature;
      for (const key of supportKeys) {
        expect(feature[key], `${locale}:${key}`).not.toBe(english[key]);
      }
    }
    const source = readFileSync(new URL("./i18n.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.\.\.\s*en(?:\.|\b)/u);
  });

  it("adds a locale-owned, route-direction fact to every conversion guide", () => {
    expect(Object.keys(imageConversionRouteFacts)).toEqual(locales);
    for (const locale of locales) {
      const facts = imageConversionRouteFacts[locale];
      expect(Object.keys(facts)).toEqual(routeFactKinds);
      for (const [kind, fact] of Object.entries(facts)) {
        expect(fact, `${locale}:${kind}`).toContain("{to}");
      }

      const guides = imageConversionModes.map(
        ({ id }) => imageConverterLocales[locale].tools[id].guideBody,
      );
      expect(new Set(guides).size, locale).toBe(imageConversionModes.length);
    }
  });

  it("keeps each locale's conversion title ahead of English supporting queries", () => {
    for (const locale of locales) {
      const localeCopy = imageConverterLocales[locale];
      for (const { id, source, target } of imageConversionModes) {
        const catalog = localeCopy.catalog[id];
        const from = localeCopy.formatNames[source];
        const to = localeCopy.formatNames[target];

        expect(catalog.searchTerms[0]).toBe(catalog.name);
        if (locale !== "en") {
          expect(catalog.searchTerms).toContain(`${from} to ${to}`);
          expect(catalog.searchTerms).toContain(`${from} ${to} converter`);
        }
      }
    }
  });

  it("explains the format-specific engines without a superiority claim", () => {
    const page = imageConverterLocales.en.tools["png-to-webp"];
    expect(page.safetyBody).toContain("MozJPEG");
    expect(page.safetyBody).toContain("libwebp");
    expect(page.safetyBody).toContain("libavif");
    expect(page.safetyBody).toContain("Kvazaar/libheif");
    expect(page.safetyBody.toLowerCase()).not.toContain("best");
  });
});
