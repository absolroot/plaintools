import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pdfToolkitLocales, type PdfToolkitLocale } from "./i18n";
import { pdfToolIds } from "./modes";

const locales = Object.keys(pdfToolkitLocales) as PdfToolkitLocale[];

describe("PDF toolkit localization", () => {
  it("publishes all five tools in all 17 locales", () => {
    expect(locales).toHaveLength(17);
    for (const locale of locales) {
      expect(Object.keys(pdfToolkitLocales[locale].tools), locale).toEqual(
        pdfToolIds,
      );
      expect(Object.keys(pdfToolkitLocales[locale].catalog), locale).toEqual(
        pdfToolIds,
      );
    }
  });

  it("keeps every translated locale as a complete static object", () => {
    const source = readFileSync(
      new URL("./i18n.generated.ts", import.meta.url),
      "utf8",
    );
    expect(source).not.toContain("__PT_");
    expect(source).not.toMatch(/\.\.\.\s*(?:en|english)(?:\.|\b)/iu);
    for (const locale of locales) {
      const page = pdfToolkitLocales[locale].tools["compress-pdf"];
      expect(page.title.trim(), locale).not.toBe("");
      expect(page.feature.rasterWarningBody.trim(), locale).not.toBe("");
      expect(page.safetyBody.trim(), locale).not.toBe("");
    }
  });

  it("states raster compression losses and browser-local handling", () => {
    const english = pdfToolkitLocales.en.tools["compress-pdf"];
    expect(english.feature.rasterWarningBody).toContain("text selection");
    expect(english.feature.rasterWarningBody).toContain("accessibility");
    expect(english.safetyBody).toContain("browser tab");
    expect(english.safetyBody).toContain("not uploaded");
  });
});
