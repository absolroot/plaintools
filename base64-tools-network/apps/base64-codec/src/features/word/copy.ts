import type { Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const wordCopy: Record<Locale, PreviewToolCopy["word"]> = {
  en: previewCopy.en.word,
  ko: previewCopy.ko.word,
  es: previewCopy.es.word,
};
