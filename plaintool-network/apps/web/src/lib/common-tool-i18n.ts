import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";

export type CommonToolCopy = {
  preview: string;
  ready: string;
  working: string;
  clear: string;
  copy: string;
  copied: string;
  copyFailed: string;
  processingFailed: string;
  download: string;
  faqTitle: string;
  localTitle: string;
  localBody: string;
};

export const commonToolCopy = Object.fromEntries(
  locales.map((locale) => [locale, localeBundles[locale].common]),
) as Record<Locale, CommonToolCopy>;
