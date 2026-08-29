import type { Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const jsonCopy: Record<Locale, PreviewToolCopy["json"]> = {
  en: previewCopy.en.json,
  ko: previewCopy.ko.json,
  es: previewCopy.es.json,
};
