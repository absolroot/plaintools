import { locales, type Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const jsonCopy = Object.fromEntries(
  locales.map((locale) => [locale, previewCopy[locale].json]),
) as Record<Locale, PreviewToolCopy["json"]>;
