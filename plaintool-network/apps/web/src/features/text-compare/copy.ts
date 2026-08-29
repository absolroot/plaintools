import { locales, type Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export type TextCompareCopy = PreviewToolCopy["textCompare"];

export const textCompareCopy = Object.fromEntries(
  locales.map((locale) => [locale, previewCopy[locale].textCompare]),
) as Record<Locale, TextCompareCopy>;
