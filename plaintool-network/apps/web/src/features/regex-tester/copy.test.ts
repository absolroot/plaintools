import { describe, expect, it } from "vitest";
import { locales } from "../../lib/site";
import { regexSearchTermsFor, regexTesterFor } from "./copy";

const actions = {
  clear: "clear",
  copy: "copy",
  copied: "copied",
  copyFailed: "copy failed",
};

describe("regex tester localization", () => {
  it("supplies complete feature, safety, and FAQ copy for all public locales", () => {
    for (const locale of locales) {
      const page = regexTesterFor(locale, actions);
      expect(page.title.trim(), locale).not.toBe("");
      expect(page.description.trim(), locale).not.toBe("");
      expect(page.guideBody.trim(), locale).not.toBe("");
      expect(page.safetyBody.trim(), locale).not.toBe("");
      expect(page.faqs, locale).toHaveLength(3);
      for (const [key, value] of Object.entries(page.feature)) {
        expect(value.trim(), `${locale}.${key}`).not.toBe("");
      }
      expect(regexSearchTermsFor(locale), locale).toContain(page.title);
    }
  });

  it("does not reuse the English product copy for non-English locales", () => {
    const english = regexTesterFor("en", actions);
    for (const locale of locales.filter((value) => value !== "en")) {
      const page = regexTesterFor(locale, actions);
      expect(page.title, `${locale}.title`).not.toBe(english.title);
      expect(page.description, `${locale}.description`).not.toBe(
        english.description,
      );
      expect(page.guideBody, `${locale}.guideBody`).not.toBe(english.guideBody);
      expect(page.safetyBody, `${locale}.safetyBody`).not.toBe(
        english.safetyBody,
      );
      expect(
        page.feature.expressionLabel,
        `${locale}.expressionLabel`,
      ).not.toBe(english.feature.expressionLabel);
      expect(page.feature.invalid, `${locale}.invalid`).not.toBe(
        english.feature.invalid,
      );
      expect(page.feature.engineLabel, `${locale}.engineLabel`).not.toBe(
        english.feature.engineLabel,
      );
    }
  });
});
