import ar from "./ar";
import cs from "./cs";
import da from "./da";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import it from "./it";
import ja from "./ja";
import ko from "./ko";
import nl from "./nl";
import no from "./no";
import pl from "./pl";
import ptBR from "./pt-BR";
import sv from "./sv";
import tr from "./tr";
import zhTW from "./zh-TW";
import { toolHelpCopy, type ToolHelpCopy } from "./tool-help";
import {
  imageConverterLocales,
  type ImageConverterLocale,
} from "../../features/image-converter/i18n";
import {
  generatorToolLocales,
  type GeneratorToolLocale,
} from "./generator-tools";
import {
  pdfToolkitLocales,
  type PdfToolkitLocale,
} from "../../features/pdf-toolkit/i18n";
import {
  unitConverterLocales,
  type UnitConverterLocale,
} from "../../features/unit-converter/i18n";

const baseLocaleBundles = {
  en,
  ko,
  es,
  de,
  ja,
  fr,
  "pt-BR": ptBR,
  it,
  nl,
  sv,
  cs,
  pl,
  da,
  no,
  ar,
  "zh-TW": zhTW,
  tr,
} as const;

export type LocaleBundleId = keyof typeof baseLocaleBundles;

export const localeBundles = Object.fromEntries(
  Object.entries(baseLocaleBundles).map(([locale, bundle]) => [
    locale,
    {
      ...bundle,
      catalog: {
        ...bundle.catalog,
        ...pdfToolkitLocales[locale as PdfToolkitLocale].catalog,
        ...imageConverterLocales[locale as ImageConverterLocale].catalog,
        ...generatorToolLocales[locale as LocaleBundleId].catalog,
        ...unitConverterLocales[locale as UnitConverterLocale].catalog,
      },
      tools: {
        ...bundle.tools,
        ...pdfToolkitLocales[locale as PdfToolkitLocale].tools,
        ...imageConverterLocales[locale as ImageConverterLocale].tools,
        ...generatorToolLocales[locale as LocaleBundleId].tools,
        ...unitConverterLocales[locale as UnitConverterLocale].tools,
      },
      help: toolHelpCopy[locale as LocaleBundleId],
    },
  ]),
) as {
  [Key in LocaleBundleId]: (typeof baseLocaleBundles)[Key] & {
    catalog: (typeof baseLocaleBundles)[Key]["catalog"] &
      (typeof imageConverterLocales)[Key]["catalog"] &
      GeneratorToolLocale["catalog"] &
      (typeof unitConverterLocales)[Key]["catalog"] &
      (typeof pdfToolkitLocales)[Key]["catalog"];
    tools: (typeof baseLocaleBundles)[Key]["tools"] &
      (typeof imageConverterLocales)[Key]["tools"] &
      GeneratorToolLocale["tools"] &
      (typeof unitConverterLocales)[Key]["tools"] &
      (typeof pdfToolkitLocales)[Key]["tools"];
    help: ToolHelpCopy;
  };
};

export const localeMetadata = {
  en: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "en_US",
    flagCountry: "us",
  },
  ko: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "ko_KR",
    flagCountry: "kr",
  },
  es: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "es_ES",
    flagCountry: "es",
  },
  de: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "de_DE",
    flagCountry: "de",
  },
  ja: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "ja_JP",
    flagCountry: "jp",
  },
  fr: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "fr_FR",
    flagCountry: "fr",
  },
  "pt-BR": {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "pt_BR",
    flagCountry: "br",
  },
  it: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "it_IT",
    flagCountry: "it",
  },
  nl: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "nl_NL",
    flagCountry: "nl",
  },
  sv: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "sv_SE",
    flagCountry: "se",
  },
  cs: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "cs_CZ",
    flagCountry: "cz",
  },
  pl: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "pl_PL",
    flagCountry: "pl",
  },
  da: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "da_DK",
    flagCountry: "dk",
  },
  no: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "no_NO",
    flagCountry: "no",
  },
  ar: {
    direction: "rtl",
    technicalDirection: "ltr",
    ogLocale: "ar_SA",
    flagCountry: "sa",
  },
  "zh-TW": {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "zh_TW",
    flagCountry: "tw",
  },
  tr: {
    direction: "ltr",
    technicalDirection: "ltr",
    ogLocale: "tr_TR",
    flagCountry: "tr",
  },
} as const satisfies Record<
  LocaleBundleId,
  {
    direction: "ltr" | "rtl";
    technicalDirection: "ltr";
    ogLocale: string;
    flagCountry: string;
  }
>;
