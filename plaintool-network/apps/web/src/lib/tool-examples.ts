import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";

export type ToolExamples = {
  wordInput: string;
  jsonInput: string;
  timestampInput: string;
  timestampHint: string;
  dateInput: string;
  dateHint: string;
  timeResult: string;
};

export const toolExamples = Object.fromEntries(
  locales.map((locale) => [locale, localeBundles[locale].examples]),
) as Record<Locale, ToolExamples>;
