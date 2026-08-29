import type { Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const timeCopy: Record<Locale, PreviewToolCopy["time"]> = {
  en: previewCopy.en.time,
  ko: previewCopy.ko.time,
  es: previewCopy.es.time,
};
