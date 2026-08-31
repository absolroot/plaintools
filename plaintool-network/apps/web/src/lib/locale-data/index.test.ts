import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { copyPlaceholders, flattenCopy } from "../locale-test-helpers";
import { locales } from "../site";
import { toolRegistry } from "../tool-registry.js";
import { localeBundles, localeMetadata } from ".";
import type { NewToolId } from "./bundle";
import { imageConversionModes } from "../../features/image-converter/formats";
import { pdfToolIds } from "../../features/pdf-toolkit/modes";
import type { RegisteredToolId } from "../tool-catalog";
import type { GeneratorToolId } from "./generator-tools";

const newToolIds: NewToolId[] = [
  "ai-watermark-remover",
  "url-encode",
  "url-decode",
  "hash-generator",
  "uuid-generator",
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
  "background-remover",
  "date-calculator",
  "dday-calculator",
  "age-calculator",
  "time-zone-converter",
  "fraction-calculator",
  "factor-calculator",
  "lcm-calculator",
  "percentage-calculator",
  "bmi-calculator",
];
const generatorToolIds: GeneratorToolId[] = [
  "barcode-generator",
  "password-generator",
];

describe("locale bundles", () => {
  it("keeps the public locale, bundle, and metadata registries symmetric", () => {
    expect(Object.keys(localeBundles)).toEqual([...locales]);
    expect(Object.keys(localeMetadata)).toEqual([...locales]);
  });

  it("uses the reviewed locale-specific header wordmark", () => {
    expect(
      Object.fromEntries(
        locales.map((locale) => [locale, localeBundles[locale].site.brandName]),
      ),
    ).toEqual({
      en: "AbsolTools",
      ko: "앱솔툴즈",
      es: "AbsolTools",
      de: "AbsolTools",
      ja: "アブソルツールズ",
      fr: "AbsolTools",
      "pt-BR": "AbsolTools",
      it: "AbsolTools",
      nl: "AbsolTools",
      sv: "AbsolTools",
      cs: "AbsolTools",
      pl: "AbsolTools",
      da: "AbsolTools",
      no: "AbsolTools",
      ar: "أبسول تولز",
      "zh-TW": "AbsolTools",
      tr: "AbsolTools",
    });
  });

  it("owns an independent complete surface for every locale", () => {
    const bundles = locales.map((locale) => localeBundles[locale]);
    const english = new Map(flattenCopy(localeBundles.en));
    const toolIds = toolRegistry.map((tool) => tool.id) as RegisteredToolId[];

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
      const completeToolIds = [
        ...newToolIds,
        ...pdfToolIds,
        ...imageConversionModes.map(({ id }) => id),
        ...generatorToolIds,
      ];
      expect(Object.keys(bundle.tools), locale).toEqual(completeToolIds);
      for (const toolId of completeToolIds) {
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
      "AI 워터마크 제거기 - GPT·Claude·Gemini 숨은 문자 정리",
    );
    expect(
      localeBundles.ko.tools["ai-watermark-remover"].description,
    ).not.toMatch(/PDF|웹페이지/u);
    expect(
      localeBundles.en.tools["ai-watermark-remover"].description,
    ).toContain("does not detect AI authorship");
  });

  it("separates Korean date, D-Day, and full-age search intents", () => {
    const tools = localeBundles.ko.tools;
    expect(tools["date-calculator"].title).toBe("날짜 계산기");
    expect(tools["dday-calculator"].title).toBe("디데이 계산기");
    expect(tools["age-calculator"].title).toBe("만 나이 계산기");
    expect(localeBundles.ko.catalog["age-calculator"].searchTerms).toContain(
      "만나이 계산기",
    );
    expect(
      new Set([
        tools["date-calculator"].mobileDescription,
        tools["dday-calculator"].mobileDescription,
        tools["age-calculator"].mobileDescription,
      ]).size,
    ).toBe(3);
  });

  it("publishes a localized general age-calculator title outside Korea", () => {
    const expectedTitles = {
      en: "Age Calculator",
      es: "Calculadora de edad",
      de: "Altersrechner",
      ja: "年齢計算機",
      fr: "Calculateur d’âge",
      "pt-BR": "Calculadora de idade",
      it: "Calcolatore dell’età",
      nl: "Leeftijdscalculator",
      sv: "Ålderskalkylator",
      cs: "Kalkulačka věku",
      pl: "Kalkulator wieku",
      da: "Aldersberegner",
      no: "Alderskalkulator",
      ar: "حاسبة العمر",
      "zh-TW": "年齡計算機",
      tr: "Yaş hesaplama",
    } as const;

    for (const locale of locales.filter((item) => item !== "ko")) {
      const title = expectedTitles[locale];
      expect(localeBundles[locale].tools["age-calculator"].title).toBe(title);
      expect(localeBundles[locale].catalog["age-calculator"].name).toBe(title);
    }
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
