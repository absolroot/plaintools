import { getCopy } from "../../lib/i18n";
import { localeBundles } from "../../lib/locale-data";
import type { Locale } from "../../lib/site";

const recursiveCopy: Record<
  Locale,
  { recursive: string; recursiveApplied: string }
> = {
  en: {
    recursive: "Decode nested Base64 automatically",
    recursiveApplied: "Decoded {count} Base64 layers",
  },
  ko: {
    recursive: "중첩 Base64 자동 디코드",
    recursiveApplied: "Base64 {count}단계를 자동 디코드함",
  },
  es: {
    recursive: "Decodificar Base64 anidado automáticamente",
    recursiveApplied: "Se decodificaron {count} capas de Base64",
  },
  de: {
    recursive: "Verschachteltes Base64 automatisch dekodieren",
    recursiveApplied: "{count} Base64-Ebenen dekodiert",
  },
  ja: {
    recursive: "入れ子のBase64を自動デコード",
    recursiveApplied: "Base64を{count}段階デコードしました",
  },
  fr: {
    recursive: "Décoder automatiquement le Base64 imbriqué",
    recursiveApplied: "{count} couches Base64 décodées",
  },
  "pt-BR": {
    recursive: "Decodificar Base64 aninhado automaticamente",
    recursiveApplied: "{count} camadas de Base64 decodificadas",
  },
  it: {
    recursive: "Decodifica automaticamente il Base64 annidato",
    recursiveApplied: "Decodificati {count} livelli Base64",
  },
  nl: {
    recursive: "Geneste Base64 automatisch decoderen",
    recursiveApplied: "{count} Base64-lagen gedecodeerd",
  },
  sv: {
    recursive: "Avkoda kapslad Base64 automatiskt",
    recursiveApplied: "{count} Base64-lager avkodades",
  },
  cs: {
    recursive: "Automaticky dekódovat vnořený Base64",
    recursiveApplied: "Dekódováno {count} vrstev Base64",
  },
  pl: {
    recursive: "Automatycznie dekoduj zagnieżdżony Base64",
    recursiveApplied: "Zdekodowano {count} warstw Base64",
  },
  da: {
    recursive: "Afkod indlejret Base64 automatisk",
    recursiveApplied: "{count} Base64-lag blev afkodet",
  },
  no: {
    recursive: "Dekod nestet Base64 automatisk",
    recursiveApplied: "{count} Base64-lag ble dekodet",
  },
  ar: {
    recursive: "فك ترميز Base64 المتداخل تلقائيًا",
    recursiveApplied: "تم فك {count} طبقات Base64",
  },
  "zh-TW": {
    recursive: "自動解碼巢狀 Base64",
    recursiveApplied: "已解碼 {count} 層 Base64",
  },
  tr: {
    recursive: "İç içe Base64 kodunu otomatik çöz",
    recursiveApplied: "{count} Base64 katmanı çözüldü",
  },
};

export function getBase64Copy(locale: Locale) {
  return {
    ...getCopy(locale),
    ...recursiveCopy[locale],
    decodeHeaderLabel: localeBundles[locale].catalog["base64-decode"].name,
    encodeHeaderLabel: localeBundles[locale].catalog["base64-encode"].name,
  };
}
