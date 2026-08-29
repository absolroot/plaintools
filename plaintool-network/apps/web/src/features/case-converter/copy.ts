import { locales, type Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const caseConverterCopy = Object.fromEntries(
  locales.map((locale) => [locale, previewCopy[locale].caseConverter]),
) as Record<Locale, PreviewToolCopy["caseConverter"]>;
