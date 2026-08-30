import type { CodecErrorCode, RepairCode } from "@plaintool/codec-core";
import { localeBundles } from "./locale-data";
import { locales, type LegalPage, type Locale } from "./site";

type Base64ClientErrorCode =
  | CodecErrorCode
  | "encode-failed"
  | "file-too-large";

export type Copy = {
  brandName: string;
  languageName: string;
  metaTitle: string;
  metaDescription: string;
  decodeMetaTitle: string;
  encodeMetaTitle: string;
  skipToContent: string;
  languageNavLabel: string;
  legalNavLabel: string;
  modeLabel: string;
  heading: string;
  subheading: string;
  encodeHeading: string;
  encodeSubheading: string;
  decode: string;
  encode: string;
  inputLabel: string;
  outputLabel: string;
  encodeInputLabel: string;
  encodeOutputLabel: string;
  decodePlaceholder: string;
  encodePlaceholder: string;
  outputPlaceholder: string;
  openFile: string;
  runDecode: string;
  runEncode: string;
  options: string;
  detected: string;
  decodeComplete: string;
  encodeComplete: string;
  charset: string;
  variant: string;
  auto: string;
  standard: string;
  urlSafe: string;
  strict: string;
  lineByLine: string;
  autoRepair: string;
  lenientRepair: string;
  outputView: string;
  text: string;
  hex: string;
  includePadding: string;
  mimeWrap: string;
  dataUri: string;
  dropHint: string;
  fileTooLarge: string;
  binaryOutput: string;
  executableWarning: string;
  imagePreview: string;
  errors: Record<Base64ClientErrorCode, string>;
  repairs: Record<RepairCode, string>;
  guideTitle: string;
  guideIntro: string;
  guideSteps: string[];
  encodeGuideTitle: string;
  encodeGuideIntro: string;
  encodeGuideSteps: string[];
  safetyTitle: string;
  safetyBody: string;
  detailsTitle: string;
  detailsBody: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  encodeFaqs: Array<{ q: string; a: string }>;
  advertisement: string;
  integrationState: { enabled: string; disabled: string };
  legalNav: Record<LegalPage, string>;
  legal: Record<
    LegalPage,
    {
      title: string;
      intro: string;
      sections: Array<{ title: string; body: string[] }>;
    }
  >;
};

export const copy = Object.fromEntries(
  locales.map((locale) => [locale, localeBundles[locale].site]),
) as Record<Locale, Copy>;

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}

export function interpolate(
  value: string,
  variables: Record<string, string>,
): string {
  return value.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => variables[key] ?? `{{${key}}}`,
  );
}
