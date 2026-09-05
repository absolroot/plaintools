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

const urlSafetyBody: Record<Locale, string> = {
  en: "This URL was found in the decoded result. Check that it is safe and belongs to the site you expect.",
  ko: "디코딩한 결과에서 URL을 찾았습니다. 안전한 URL인지, 예상한 사이트 주소가 맞는지 확인하세요.",
  es: "Esta URL se encontró en el resultado decodificado. Comprueba que sea segura y que pertenezca al sitio que esperas.",
  de: "Diese URL wurde im dekodierten Ergebnis gefunden. Prüfen Sie, ob sie sicher ist und zu der erwarteten Website gehört.",
  ja: "デコードした結果からURLが見つかりました。安全なURLか、想定したサイトのアドレスかを確認してください。",
  fr: "Cette URL a été trouvée dans le résultat décodé. Vérifiez qu’elle est sûre et qu’elle correspond au site attendu.",
  "pt-BR":
    "Esta URL foi encontrada no resultado decodificado. Confira se ela é segura e pertence ao site esperado.",
  it: "Questo URL è stato trovato nel risultato decodificato. Verifica che sia sicuro e appartenga al sito previsto.",
  nl: "Deze URL is gevonden in het gedecodeerde resultaat. Controleer of deze veilig is en bij de verwachte website hoort.",
  sv: "Webbadressen hittades i det avkodade resultatet. Kontrollera att den är säker och tillhör webbplatsen du förväntar dig.",
  cs: "Tato adresa URL byla nalezena v dekódovaném výsledku. Ověřte, že je bezpečná a patří webu, který očekáváte.",
  pl: "Ten adres URL znaleziono w zdekodowanym wyniku. Sprawdź, czy jest bezpieczny i należy do oczekiwanej witryny.",
  da: "Denne URL blev fundet i det afkodede resultat. Kontrollér, at den er sikker og tilhører det websted, du forventer.",
  no: "Denne URL-en ble funnet i det dekodede resultatet. Kontroller at den er trygg og tilhører nettstedet du forventer.",
  ar: "تم العثور على عنوان URL في النتيجة التي تم فك ترميزها. تحقق من أنه آمن وينتمي إلى الموقع الذي تتوقعه.",
  "zh-TW": "在解碼結果中找到這個網址。請確認它安全，且屬於您預期的網站。",
  tr: "Bu URL, kodu çözülmüş sonuçta bulundu. Güvenli olduğunu ve beklediğiniz siteye ait olduğunu kontrol edin.",
};

export function getBase64Copy(locale: Locale) {
  const qr = localeBundles[locale].tools["qr-code-scanner"].feature;
  return {
    ...getCopy(locale),
    ...recursiveCopy[locale],
    urlDetected: qr.urlDetected,
    openUrl: qr.openUrl,
    urlDialogTitle: qr.urlDialogTitle,
    urlDialogBody: urlSafetyBody[locale],
    urlDialogDestination: qr.urlDialogDestination,
    cancel: qr.cancel,
    decodeHeaderLabel: localeBundles[locale].catalog["base64-decode"].name,
    encodeHeaderLabel: localeBundles[locale].catalog["base64-encode"].name,
  };
}
