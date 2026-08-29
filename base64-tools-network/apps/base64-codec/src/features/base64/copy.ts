import { getCopy } from "../../lib/i18n";
import type { Locale } from "../../lib/site";

export function getBase64Copy(locale: Locale) {
  return getCopy(locale);
}
