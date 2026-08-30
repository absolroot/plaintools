import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { copyPlaceholders, flattenCopy } from "../locale-test-helpers";
import { locales } from "../site";
import { toolRegistry } from "../tool-registry.js";
import { localeBundles, localeMetadata } from ".";
import type { NewToolId } from "./bundle";

const newToolIds: NewToolId[] = [
  "ai-watermark-remover",
  "url-encode",
  "url-decode",
  "hash-generator",
  "jwt-decoder",
  "qr-code-generator",
  "qr-code-scanner",
  "csv-to-markdown",
  "markdown-to-csv",
  "json-to-csv",
  "csv-to-json",
  "html-to-markdown",
  "markdown-to-html",
  "html-formatter",
  "css-formatter",
  "javascript-formatter",
  "sql-formatter",
  "ip-subnet-calculator",
];

describe("locale bundles", () => {
  it("keeps the public locale, bundle, and metadata registries symmetric", () => {
    expect(Object.keys(localeBundles)).toEqual([...locales]);
    expect(Object.keys(localeMetadata)).toEqual([...locales]);
  });

  it("owns an independent complete surface for every locale", () => {
    const bundles = locales.map((locale) => localeBundles[locale]);
    const english = new Map(flattenCopy(localeBundles.en));
    const toolIds = toolRegistry.map((tool) => tool.id);

    expect(new Set(bundles).size).toBe(locales.length);
    for (const locale of locales) {
      const bundle = localeBundles[locale];
      const localized = new Map(flattenCopy(bundle));
      const stablePaths = [...localized.keys()]
        .filter((path) => !/^catalog\..+\.searchTerms\[\d+\]$/u.test(path))
        .sort();
      const englishStablePaths = [...english.keys()]
        .filter((path) => !/^catalog\..+\.searchTerms\[\d+\]$/u.test(path))
        .sort();

      expect(bundle.site.languageName.trim(), locale).not.toBe("");
      expect(Object.keys(bundle.catalog), locale).toEqual(toolIds);
      for (const toolId of toolIds) {
        expect(
          bundle.catalog[toolId].searchTerms.length,
          `${locale}:${toolId}`,
        ).toBeGreaterThan(0);
      }
      expect(Object.hasOwn(bundle.preview, "common"), locale).toBe(false);
      expect(stablePaths, locale).toEqual(englishStablePaths);
      for (const [path, value] of localized) {
        expect(value.trim(), `${locale}:${path}`).not.toBe("");
        expect(copyPlaceholders(value), `${locale}:${path}`).toEqual(
          copyPlaceholders(english.get(path) ?? ""),
        );
      }
    }
  });

  it("does not import or spread the English bundle into another locale", () => {
    for (const locale of locales.filter((item) => item !== "en")) {
      const source = readFileSync(
        new URL(`./${locale}.ts`, import.meta.url),
        "utf8",
      );
      expect(source, locale).not.toMatch(/from\s+["']\.\/en["']/u);
      expect(source, locale).not.toMatch(
        /\.\.\.\s*(?:en|localeBundles\.en)\b/u,
      );
    }
  });

  it("keeps machine-readable time tokens untranslated", () => {
    for (const locale of locales) {
      const zoneIds = localeBundles[locale].preview.time.popularZones.map(
        ({ value }) => value,
      );
      expect(new Set(zoneIds).size, locale).toBe(zoneIds.length);
      for (const zoneId of zoneIds) {
        expect(
          () => new Intl.DateTimeFormat("en", { timeZone: zoneId }),
          `${locale}:${zoneId}`,
        ).not.toThrow();
      }
    }
  });

  it("provides complete page, FAQ, feature, and catalog copy for new tools", () => {
    for (const locale of locales) {
      const bundle = localeBundles[locale];
      expect(Object.keys(bundle.tools), locale).toEqual(newToolIds);
      for (const toolId of newToolIds) {
        const tool = bundle.tools[toolId];
        expect(tool.title.trim(), `${locale}:${toolId}:title`).not.toBe("");
        expect(
          tool.description.trim(),
          `${locale}:${toolId}:description`,
        ).not.toBe("");
        expect(tool.guideBody.trim(), `${locale}:${toolId}:guide`).not.toBe("");
        expect(tool.safetyBody.trim(), `${locale}:${toolId}:safety`).not.toBe(
          "",
        );
        expect(
          tool.faqs.length,
          `${locale}:${toolId}:faqs`,
        ).toBeGreaterThanOrEqual(3);
        expect(
          bundle.catalog[toolId].searchTerms.length,
          `${locale}:${toolId}:terms`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the AI cleaner claim literal and non-attributional", () => {
    expect(localeBundles.ko.tools["ai-watermark-remover"].title).toBe(
      "AI 워터마크 제거기 - GPT·Claude 숨은 문자 정리",
    );
    expect(
      localeBundles.en.tools["ai-watermark-remover"].description,
    ).toContain("does not detect AI authorship");
  });

  it("declares Arabic as RTL and every other locale as LTR", () => {
    const flagCountries = locales.map(
      (locale) => localeMetadata[locale].flagCountry,
    );
    expect(new Set(flagCountries).size).toBe(locales.length);
    for (const country of flagCountries) expect(country).toMatch(/^[a-z]{2}$/u);

    for (const locale of locales) {
      expect(localeMetadata[locale].direction).toBe(
        locale === "ar" ? "rtl" : "ltr",
      );
      expect(localeMetadata[locale].technicalDirection).toBe("ltr");
    }
  });
});
