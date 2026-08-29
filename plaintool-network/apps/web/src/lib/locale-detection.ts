import { locales, type Locale } from "./site";

const localeByTag = new Map(
  locales.map((locale) => [locale.toLowerCase(), locale]),
);

const localeByLanguage: Partial<Record<string, Locale>> = {
  en: "en",
  ko: "ko",
  es: "es",
  de: "de",
  ja: "ja",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
  cs: "cs",
  pl: "pl",
  da: "da",
  no: "no",
  nb: "no",
  ar: "ar",
  tr: "tr",
};

function matchLocale(languageTag: string): Locale | undefined {
  const normalized = languageTag.trim().replaceAll("_", "-").toLowerCase();
  if (!normalized) return undefined;

  const exact = localeByTag.get(normalized);
  if (exact) return exact;

  const [language] = normalized.split("-");
  if (language === "pt") {
    return normalized === "pt" || normalized.startsWith("pt-br-")
      ? "pt-BR"
      : undefined;
  }
  if (language === "zh") {
    const traditional =
      normalized.includes("-hant") || /-(?:tw|hk|mo)(?:-|$)/u.test(normalized);
    return traditional ? "zh-TW" : undefined;
  }
  return localeByLanguage[language];
}

export function detectPreferredLocale(
  languageTags: readonly string[] | undefined,
): Locale {
  for (const languageTag of languageTags ?? []) {
    const locale = matchLocale(languageTag);
    if (locale) return locale;
  }
  return "en";
}
