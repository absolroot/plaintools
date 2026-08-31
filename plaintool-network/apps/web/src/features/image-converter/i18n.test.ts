import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { imageConversionModes } from "./formats";
import { imageConverterLocales, type ImageConverterLocale } from "./i18n";

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

  it("explains the format-specific engines without a superiority claim", () => {
    const page = imageConverterLocales.en.tools["png-to-webp"];
    expect(page.safetyBody).toContain("MozJPEG");
    expect(page.safetyBody).toContain("libwebp");
    expect(page.safetyBody).toContain("libavif");
    expect(page.safetyBody).toContain("Kvazaar/libheif");
    expect(page.safetyBody.toLowerCase()).not.toContain("best");
  });
});
