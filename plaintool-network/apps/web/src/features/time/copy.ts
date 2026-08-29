import { locales, type Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const timeCopy = Object.fromEntries(
  locales.map((locale) => [locale, previewCopy[locale].time]),
) as Record<Locale, PreviewToolCopy["time"]>;
