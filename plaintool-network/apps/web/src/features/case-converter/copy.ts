import type { Locale } from "../../lib/site";
import { previewCopy, type PreviewToolCopy } from "../../lib/tool-i18n";

export const caseConverterCopy: Record<
  Locale,
  PreviewToolCopy["caseConverter"]
> = {
  en: previewCopy.en.caseConverter,
  ko: previewCopy.ko.caseConverter,
  es: previewCopy.es.caseConverter,
};
