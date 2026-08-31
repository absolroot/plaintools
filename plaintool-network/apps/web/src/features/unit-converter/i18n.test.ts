import { describe, expect, it } from "vitest";
import { units } from "@plaintool/unit-converter-core";
import { unitConverterLocales } from "./i18n";

describe("unit converter locale copy", () => {
  it("provides localized FAQ questions and complete unit labels", () => {
    for (const [locale, bundle] of Object.entries(unitConverterLocales)) {
      const tool = bundle.tools["unit-converter"];
      expect(tool.feature.numberLocale).toBe(locale);
      expect(Object.keys(tool.feature.unitNames)).toHaveLength(units.length);
      expect(tool.faqs).toHaveLength(3);
      expect(
        tool.faqs.every(({ q }) =>
          ["?", "？", "؟"].some((mark) => q.trim().endsWith(mark)),
        ),
      ).toBe(true);
      if (locale !== "en") {
        expect(tool.faqs.map(({ q }) => q)).not.toContain("Privacy");
        expect(tool.faqs.map(({ q }) => q)).not.toContain("Units");
      }
    }
  });

  it("does not reuse one shared unit-name object across locales", () => {
    const english =
      unitConverterLocales.en.tools["unit-converter"].feature.unitNames;
    const korean =
      unitConverterLocales.ko.tools["unit-converter"].feature.unitNames;
    expect(korean).not.toBe(english);
    expect(korean.meter).not.toBe(english.meter);
  });
});
