import { describe, expect, it } from "vitest";
import { units } from "@plaintool/unit-converter-core";
import { unitNamesFor } from "./unit-names";
import type { UnitConverterLocale } from "./i18n";

const locales: UnitConverterLocale[] = [
  "en",
  "ko",
  "es",
  "de",
  "ja",
  "fr",
  "pt-BR",
  "it",
  "nl",
  "sv",
  "cs",
  "pl",
  "da",
  "no",
  "ar",
  "zh-TW",
  "tr",
];

describe("unit converter localized unit names", () => {
  it("provides every unit label independently for all public locales", () => {
    for (const locale of locales) {
      const names = unitNamesFor(locale);
      expect(Object.keys(names)).toHaveLength(units.length);
      for (const unit of units) expect(names[unit.id]?.trim()).toBeTruthy();
    }
  });

  it("uses localized labels for representative units", () => {
    expect(unitNamesFor("ko")["square-meter"]).toBe("제곱미터");
    expect(unitNamesFor("ja")["nautical-mile"]).toBe("海里");
    expect(unitNamesFor("ar")["kilometer"]).not.toBe("kilometer");
    expect(unitNamesFor("zh-TW")["uk-gallon"]).toBe("英制加侖");
  });
});
