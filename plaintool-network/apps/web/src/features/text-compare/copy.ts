import type { Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export type TextCompareCopy = PreviewToolCopy["textCompare"];

export const textCompareCopy: Record<Locale, TextCompareCopy> = {
  en: previewCopy.en.textCompare,
  ko: previewCopy.ko.textCompare,
  es: previewCopy.es.textCompare,
};
