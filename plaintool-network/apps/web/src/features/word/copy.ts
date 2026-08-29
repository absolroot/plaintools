import { locales, type Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const wordCopy = Object.fromEntries(
  locales.map((locale) => [locale, previewCopy[locale].word]),
) as Record<Locale, PreviewToolCopy["word"]>;
