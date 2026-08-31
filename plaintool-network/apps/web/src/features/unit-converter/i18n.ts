import type { LocaleCatalogToolCopy } from "../../lib/tool-catalog";
import type { ToolPageCopy } from "../../lib/locale-data/bundle";
import type { UnitConverterCopy } from "./contract";
import { unitNamesFor } from "./unit-names";

export type UnitConverterLocale =
  | "en"
  | "ko"
  | "es"
  | "de"
  | "ja"
  | "fr"
  | "pt-BR"
  | "it"
  | "nl"
  | "sv"
  | "cs"
  | "pl"
  | "da"
  | "no"
  | "ar"
  | "zh-TW"
  | "tr";
type Text = Pick<
  UnitConverterCopy,
  | "ariaLabel"
  | "category"
  | "from"
  | "to"
  | "swap"
  | "result"
  | "ready"
  | "invalid"
  | "categories"
> & {
  title: string;
  description: string;
  guide: string;
  privacy: string;
  faq: string;
  faqUse: string;
  faqPrivacy: string;
  faqUnits: string;
  terms: readonly string[];
};

const categories = (
  length: string,
  mass: string,
  temperature: string,
  area: string,
  volume: string,
  speed: string,
  data: string,
  time: string,
) => ({ length, mass, temperature, area, volume, speed, data, time });
const texts: Record<UnitConverterLocale, Text> = {
  en: {
    ariaLabel: "Unit converter",
    category: "Category",
    from: "From",
    to: "To",
    swap: "Swap units",
    result: "Result",
    ready: "Conversion updated",
    invalid: "Enter a valid finite number.",
    categories: categories(
      "Length",
      "Mass",
      "Temperature",
      "Area",
      "Volume",
      "Speed",
      "Data",
      "Time",
    ),
    title: "Unit Converter",
    description:
      "Convert common length, mass, temperature, area, volume, speed, data, and time units instantly.",
    guide:
      "Choose a category, enter a value, then select the units to convert. Use swap to reverse the direction without losing your value.",
    privacy:
      "Conversions run only in your browser. Values are not uploaded or stored.",
    faq: "Temperature uses its real offset formula. Data units use decimal SI prefixes: 1 MB is 8 Mbit.",
    faqUse: "How do I use the unit converter?",
    faqPrivacy: "Are entered values stored?",
    faqUnits: "Which units are supported?",
    terms: ["unit converter", "convert units", "metric imperial"],
  },
  ko: {
    ariaLabel: "단위 변환기",
    category: "범주",
    from: "변환 전",
    to: "변환 후",
    swap: "단위 바꾸기",
    result: "결과",
    ready: "변환됨",
    invalid: "유효한 유한 숫자를 입력하세요.",
    categories: categories(
      "길이",
      "무게",
      "온도",
      "면적",
      "부피",
      "속도",
      "데이터",
      "시간",
    ),
    title: "단위 변환기",
    description:
      "길이, 무게, 온도, 면적, 부피, 속도, 데이터, 시간 단위를 바로 변환합니다.",
    guide:
      "범주를 고르고 값을 입력한 뒤 변환 전·후 단위를 선택하세요. 바꾸기를 누르면 값은 유지한 채 방향만 뒤집습니다.",
    privacy:
      "변환은 브라우저 안에서만 이루어집니다. 값은 업로드하거나 저장하지 않습니다.",
    faq: "온도는 실제 오프셋 공식을 사용합니다. 데이터 단위는 십진 SI 접두어를 사용해 1 MB는 8 Mbit입니다.",
    faqUse: "단위 변환기는 어떻게 사용하나요?",
    faqPrivacy: "입력한 값은 저장되나요?",
    faqUnits: "어떤 단위를 지원하나요?",
    terms: ["단위 변환", "길이 변환", "온도 변환"],
  },
  es: {
    ariaLabel: "Conversor de unidades",
    category: "Categoría",
    from: "De",
    to: "A",
    swap: "Intercambiar unidades",
    result: "Resultado",
    ready: "Conversión actualizada",
    invalid: "Introduce un número finito válido.",
    categories: categories(
      "Longitud",
      "Masa",
      "Temperatura",
      "Área",
      "Volumen",
      "Velocidad",
      "Datos",
      "Tiempo",
    ),
    title: "Conversor de unidades",
    description:
      "Convierte al instante unidades habituales de longitud, masa, temperatura, área, volumen, velocidad, datos y tiempo.",
    guide:
      "Elige una categoría, escribe un valor y selecciona las unidades. Usa intercambiar para invertir la dirección.",
    privacy:
      "La conversión se realiza solo en tu navegador. Los valores no se suben ni se guardan.",
    faq: "La temperatura usa su fórmula real con desplazamiento. Las unidades de datos usan prefijos SI decimales.",
    faqUse: "¿Cómo se usa el conversor de unidades?",
    faqPrivacy: "¿Se guardan los valores introducidos?",
    faqUnits: "¿Qué unidades admite?",
    terms: ["conversor de unidades", "convertir unidades", "métrico imperial"],
  },
  de: {
    ariaLabel: "Einheitenumrechner",
    category: "Kategorie",
    from: "Von",
    to: "Nach",
    swap: "Einheiten tauschen",
    result: "Ergebnis",
    ready: "Umrechnung aktualisiert",
    invalid: "Geben Sie eine gültige endliche Zahl ein.",
    categories: categories(
      "Länge",
      "Masse",
      "Temperatur",
      "Fläche",
      "Volumen",
      "Geschwindigkeit",
      "Daten",
      "Zeit",
    ),
    title: "Einheitenumrechner",
    description:
      "Rechnen Sie gängige Einheiten für Länge, Masse, Temperatur, Fläche, Volumen, Geschwindigkeit, Daten und Zeit sofort um.",
    guide:
      "Kategorie wählen, Wert eingeben und Einheiten auswählen. Tauschen kehrt die Richtung um.",
    privacy:
      "Die Umrechnung läuft nur im Browser. Werte werden nicht hochgeladen oder gespeichert.",
    faq: "Temperaturen werden mit der tatsächlichen Offset-Formel berechnet. Datenpräfixe sind dezimal.",
    faqUse: "Wie benutze ich den Einheitenumrechner?",
    faqPrivacy: "Werden eingegebene Werte gespeichert?",
    faqUnits: "Welche Einheiten werden unterstützt?",
    terms: ["Einheitenumrechner", "Einheiten umrechnen", "metrisch imperial"],
  },
  ja: {
    ariaLabel: "単位変換",
    category: "カテゴリ",
    from: "変換元",
    to: "変換先",
    swap: "単位を入れ替え",
    result: "結果",
    ready: "変換しました",
    invalid: "有効な有限数を入力してください。",
    categories: categories(
      "長さ",
      "質量",
      "温度",
      "面積",
      "体積",
      "速度",
      "データ",
      "時間",
    ),
    title: "単位変換",
    description:
      "長さ、質量、温度、面積、体積、速度、データ、時間の単位をすぐに変換します。",
    guide:
      "カテゴリを選び、値と変換元・変換先の単位を選択します。入れ替えで値を残したまま方向を反転できます。",
    privacy:
      "変換はブラウザ内だけで行われ、値はアップロードも保存もされません。",
    faq: "温度にはオフセットを含む正しい式を使用します。データ単位は十進SI接頭辞です。",
    faqUse: "単位変換はどう使いますか？",
    faqPrivacy: "入力した値は保存されますか？",
    faqUnits: "どの単位に対応していますか？",
    terms: ["単位変換", "長さ変換", "温度変換"],
  },
  fr: {
    ariaLabel: "Convertisseur d’unités",
    category: "Catégorie",
    from: "De",
    to: "Vers",
    swap: "Inverser les unités",
    result: "Résultat",
    ready: "Conversion mise à jour",
    invalid: "Saisissez un nombre fini valide.",
    categories: categories(
      "Longueur",
      "Masse",
      "Température",
      "Surface",
      "Volume",
      "Vitesse",
      "Données",
      "Temps",
    ),
    title: "Convertisseur d’unités",
    description:
      "Convertissez instantanément les unités courantes de longueur, masse, température, surface, volume, vitesse, données et temps.",
    guide:
      "Choisissez une catégorie, saisissez une valeur puis les unités. Inverser change le sens sans perdre la valeur.",
    privacy:
      "La conversion reste dans votre navigateur. Les valeurs ne sont ni envoyées ni enregistrées.",
    faq: "La température utilise sa formule avec décalage réel. Les préfixes de données sont décimaux.",
    faqUse: "Comment utiliser le convertisseur d’unités ?",
    faqPrivacy: "Les valeurs saisies sont-elles enregistrées ?",
    faqUnits: "Quelles unités sont prises en charge ?",
    terms: ["convertisseur d’unités", "conversion unités", "métrique impérial"],
  },
  "pt-BR": {
    ariaLabel: "Conversor de unidades",
    category: "Categoria",
    from: "De",
    to: "Para",
    swap: "Trocar unidades",
    result: "Resultado",
    ready: "Conversão atualizada",
    invalid: "Informe um número finito válido.",
    categories: categories(
      "Comprimento",
      "Massa",
      "Temperatura",
      "Área",
      "Volume",
      "Velocidade",
      "Dados",
      "Tempo",
    ),
    title: "Conversor de unidades",
    description:
      "Converta instantaneamente unidades comuns de comprimento, massa, temperatura, área, volume, velocidade, dados e tempo.",
    guide:
      "Escolha uma categoria, informe um valor e selecione as unidades. Trocar inverte a direção.",
    privacy:
      "A conversão ocorre apenas no navegador. Os valores não são enviados nem armazenados.",
    faq: "Temperatura usa a fórmula real com deslocamento. Dados usam prefixos SI decimais.",
    faqUse: "Como usar o conversor de unidades?",
    faqPrivacy: "Os valores inseridos são armazenados?",
    faqUnits: "Quais unidades são compatíveis?",
    terms: ["conversor de unidades", "converter unidades", "métrico imperial"],
  },
  it: {
    ariaLabel: "Convertitore di unità",
    category: "Categoria",
    from: "Da",
    to: "A",
    swap: "Scambia unità",
    result: "Risultato",
    ready: "Conversione aggiornata",
    invalid: "Inserisci un numero finito valido.",
    categories: categories(
      "Lunghezza",
      "Massa",
      "Temperatura",
      "Area",
      "Volume",
      "Velocità",
      "Dati",
      "Tempo",
    ),
    title: "Convertitore di unità",
    description:
      "Converti subito le unità comuni di lunghezza, massa, temperatura, area, volume, velocità, dati e tempo.",
    guide:
      "Scegli una categoria, inserisci un valore e seleziona le unità. Scambia inverte la direzione.",
    privacy:
      "La conversione avviene solo nel browser. I valori non vengono caricati né salvati.",
    faq: "La temperatura usa la formula corretta con offset. Le unità dati usano prefissi SI decimali.",
    faqUse: "Come si usa il convertitore di unità?",
    faqPrivacy: "I valori inseriti vengono salvati?",
    faqUnits: "Quali unità sono supportate?",
    terms: ["convertitore unità", "conversione unità", "metrico imperiale"],
  },
  nl: {
    ariaLabel: "Eenhedenconverter",
    category: "Categorie",
    from: "Van",
    to: "Naar",
    swap: "Eenheden wisselen",
    result: "Resultaat",
    ready: "Conversie bijgewerkt",
    invalid: "Voer een geldig eindig getal in.",
    categories: categories(
      "Lengte",
      "Massa",
      "Temperatuur",
      "Oppervlakte",
      "Inhoud",
      "Snelheid",
      "Data",
      "Tijd",
    ),
    title: "Eenhedenconverter",
    description:
      "Converteer veelgebruikte eenheden voor lengte, massa, temperatuur, oppervlakte, inhoud, snelheid, data en tijd.",
    guide:
      "Kies een categorie, voer een waarde in en kies de eenheden. Wisselen draait de richting om.",
    privacy:
      "De conversie gebeurt alleen in uw browser. Waarden worden niet geüpload of opgeslagen.",
    faq: "Temperatuur gebruikt de werkelijke offsetformule. Data-eenheden gebruiken decimale SI-voorvoegsels.",
    faqUse: "Hoe gebruik ik de eenhedenconverter?",
    faqPrivacy: "Worden ingevoerde waarden opgeslagen?",
    faqUnits: "Welke eenheden worden ondersteund?",
    terms: ["eenhedenconverter", "eenheden omrekenen", "metrisch imperiaal"],
  },
  sv: {
    ariaLabel: "Enhetsomvandlare",
    category: "Kategori",
    from: "Från",
    to: "Till",
    swap: "Byt enheter",
    result: "Resultat",
    ready: "Omvandlingen uppdaterad",
    invalid: "Ange ett giltigt ändligt tal.",
    categories: categories(
      "Längd",
      "Massa",
      "Temperatur",
      "Area",
      "Volym",
      "Hastighet",
      "Data",
      "Tid",
    ),
    title: "Enhetsomvandlare",
    description:
      "Omvandla vanliga enheter för längd, massa, temperatur, area, volym, hastighet, data och tid direkt.",
    guide:
      "Välj kategori, ange ett värde och välj enheter. Byt vänder riktningen.",
    privacy:
      "Omvandlingen körs bara i webbläsaren. Värden laddas inte upp eller sparas.",
    faq: "Temperatur använder den riktiga offsetformeln. Dataenheter använder decimala SI-prefix.",
    faqUse: "Hur använder jag enhetsomvandlaren?",
    faqPrivacy: "Sparas de angivna värdena?",
    faqUnits: "Vilka enheter stöds?",
    terms: ["enhetsomvandlare", "omvandla enheter", "metrisk imperial"],
  },
  cs: {
    ariaLabel: "Převodník jednotek",
    category: "Kategorie",
    from: "Z",
    to: "Na",
    swap: "Prohodit jednotky",
    result: "Výsledek",
    ready: "Převod aktualizován",
    invalid: "Zadejte platné konečné číslo.",
    categories: categories(
      "Délka",
      "Hmotnost",
      "Teplota",
      "Plocha",
      "Objem",
      "Rychlost",
      "Data",
      "Čas",
    ),
    title: "Převodník jednotek",
    description:
      "Okamžitě převádějte běžné jednotky délky, hmotnosti, teploty, plochy, objemu, rychlosti, dat a času.",
    guide:
      "Vyberte kategorii, zadejte hodnotu a jednotky. Prohodit obrátí směr.",
    privacy:
      "Převod probíhá jen v prohlížeči. Hodnoty se neodesílají ani neukládají.",
    faq: "Teplota používá skutečný vzorec s posunem. Datové jednotky používají desetinné předpony SI.",
    faqUse: "Jak se převodník jednotek používá?",
    faqPrivacy: "Ukládají se zadané hodnoty?",
    faqUnits: "Které jednotky jsou podporovány?",
    terms: ["převodník jednotek", "převod jednotek", "metrické imperiální"],
  },
  pl: {
    ariaLabel: "Konwerter jednostek",
    category: "Kategoria",
    from: "Z",
    to: "Na",
    swap: "Zamień jednostki",
    result: "Wynik",
    ready: "Przeliczenie zaktualizowane",
    invalid: "Wpisz prawidłową liczbę skończoną.",
    categories: categories(
      "Długość",
      "Masa",
      "Temperatura",
      "Pole",
      "Objętość",
      "Prędkość",
      "Dane",
      "Czas",
    ),
    title: "Konwerter jednostek",
    description:
      "Natychmiast przeliczaj popularne jednostki długości, masy, temperatury, pola, objętości, prędkości, danych i czasu.",
    guide:
      "Wybierz kategorię, wpisz wartość i jednostki. Zamień odwraca kierunek.",
    privacy:
      "Przeliczenie działa tylko w przeglądarce. Wartości nie są wysyłane ani zapisywane.",
    faq: "Temperatura korzysta z rzeczywistego wzoru z przesunięciem. Jednostki danych używają dziesiętnych przedrostków SI.",
    faqUse: "Jak używać konwertera jednostek?",
    faqPrivacy: "Czy wprowadzone wartości są zapisywane?",
    faqUnits: "Jakie jednostki są obsługiwane?",
    terms: [
      "konwerter jednostek",
      "przelicznik jednostek",
      "metryczne imperialne",
    ],
  },
  da: {
    ariaLabel: "Enhedsomregner",
    category: "Kategori",
    from: "Fra",
    to: "Til",
    swap: "Byt enheder",
    result: "Resultat",
    ready: "Omregning opdateret",
    invalid: "Indtast et gyldigt endeligt tal.",
    categories: categories(
      "Længde",
      "Masse",
      "Temperatur",
      "Areal",
      "Rumfang",
      "Hastighed",
      "Data",
      "Tid",
    ),
    title: "Enhedsomregner",
    description:
      "Omregn almindelige enheder for længde, masse, temperatur, areal, rumfang, hastighed, data og tid med det samme.",
    guide:
      "Vælg kategori, indtast en værdi og vælg enheder. Byt vender retningen.",
    privacy:
      "Omregningen sker kun i browseren. Værdier uploades eller gemmes ikke.",
    faq: "Temperatur bruger den korrekte offsetformel. Data bruger decimale SI-præfikser.",
    faqUse: "Hvordan bruger jeg enhedsomregneren?",
    faqPrivacy: "Bliver de indtastede værdier gemt?",
    faqUnits: "Hvilke enheder understøttes?",
    terms: ["enhedsomregner", "omregn enheder", "metrisk imperial"],
  },
  no: {
    ariaLabel: "Enhetskalkulator",
    category: "Kategori",
    from: "Fra",
    to: "Til",
    swap: "Bytt enheter",
    result: "Resultat",
    ready: "Konvertering oppdatert",
    invalid: "Skriv inn et gyldig endelig tall.",
    categories: categories(
      "Lengde",
      "Masse",
      "Temperatur",
      "Areal",
      "Volum",
      "Hastighet",
      "Data",
      "Tid",
    ),
    title: "Enhetskalkulator",
    description:
      "Konverter vanlige enheter for lengde, masse, temperatur, areal, volum, hastighet, data og tid umiddelbart.",
    guide:
      "Velg kategori, skriv inn en verdi og velg enheter. Bytt snur retningen.",
    privacy:
      "Konverteringen skjer bare i nettleseren. Verdier lastes ikke opp eller lagres.",
    faq: "Temperatur bruker den reelle offsetformelen. Dataenheter bruker desimale SI-prefikser.",
    faqUse: "Hvordan bruker jeg enhetskalkulatoren?",
    faqPrivacy: "Blir de oppgitte verdiene lagret?",
    faqUnits: "Hvilke enheter støttes?",
    terms: ["enhetskalkulator", "konverter enheter", "metrisk imperial"],
  },
  ar: {
    ariaLabel: "محول الوحدات",
    category: "الفئة",
    from: "من",
    to: "إلى",
    swap: "تبديل الوحدات",
    result: "النتيجة",
    ready: "تم التحديث",
    invalid: "أدخل رقماً محدوداً صالحاً.",
    categories: categories(
      "الطول",
      "الكتلة",
      "الحرارة",
      "المساحة",
      "الحجم",
      "السرعة",
      "البيانات",
      "الوقت",
    ),
    title: "محول الوحدات",
    description:
      "حوّل فوراً وحدات الطول والكتلة والحرارة والمساحة والحجم والسرعة والبيانات والوقت الشائعة.",
    guide: "اختر الفئة وأدخل قيمة ثم اختر الوحدات. التبديل يعكس الاتجاه.",
    privacy: "تتم التحويلات داخل متصفحك فقط. لا تُرفع القيم ولا تُخزن.",
    faq: "تستخدم الحرارة معادلة الإزاحة الصحيحة. تستخدم وحدات البيانات بادئات SI العشرية.",
    faqUse: "كيف أستخدم محول الوحدات؟",
    faqPrivacy: "هل تُحفظ القيم المدخلة؟",
    faqUnits: "ما الوحدات المدعومة؟",
    terms: ["محول الوحدات", "تحويل الوحدات", "متر قدم"],
  },
  "zh-TW": {
    ariaLabel: "單位換算",
    category: "類別",
    from: "從",
    to: "到",
    swap: "交換單位",
    result: "結果",
    ready: "已更新換算",
    invalid: "請輸入有效的有限數字。",
    categories: categories(
      "長度",
      "質量",
      "溫度",
      "面積",
      "體積",
      "速度",
      "資料",
      "時間",
    ),
    title: "單位換算",
    description:
      "立即換算常用的長度、質量、溫度、面積、體積、速度、資料和時間單位。",
    guide: "選擇類別、輸入數值，再選擇單位。交換可反轉方向而保留數值。",
    privacy: "換算只在瀏覽器中進行，數值不會上傳或儲存。",
    faq: "溫度使用正確的偏移公式。資料單位使用十進位 SI 前綴。",
    faqUse: "如何使用單位換算？",
    faqPrivacy: "輸入的數值會儲存嗎？",
    faqUnits: "支援哪些單位？",
    terms: ["單位換算", "長度換算", "溫度換算"],
  },
  tr: {
    ariaLabel: "Birim dönüştürücü",
    category: "Kategori",
    from: "Şundan",
    to: "Şuna",
    swap: "Birimleri değiştir",
    result: "Sonuç",
    ready: "Dönüşüm güncellendi",
    invalid: "Geçerli sonlu bir sayı girin.",
    categories: categories(
      "Uzunluk",
      "Kütle",
      "Sıcaklık",
      "Alan",
      "Hacim",
      "Hız",
      "Veri",
      "Zaman",
    ),
    title: "Birim dönüştürücü",
    description:
      "Yaygın uzunluk, kütle, sıcaklık, alan, hacim, hız, veri ve zaman birimlerini anında dönüştürün.",
    guide:
      "Kategori seçin, değer girin ve birimleri seçin. Değiştir yönü tersine çevirir.",
    privacy:
      "Dönüşüm yalnızca tarayıcınızda çalışır. Değerler yüklenmez veya saklanmaz.",
    faq: "Sıcaklık gerçek ofset formülünü kullanır. Veri birimleri ondalık SI önekleri kullanır.",
    faqUse: "Birim dönüştürücü nasıl kullanılır?",
    faqPrivacy: "Girilen değerler saklanır mı?",
    faqUnits: "Hangi birimler desteklenir?",
    terms: ["birim dönüştürücü", "birim çevirme", "metrik imperial"],
  },
};

export const unitConverterLocales = Object.fromEntries(
  Object.entries(texts).map(([locale, text]) => [
    locale,
    {
      tools: {
        "unit-converter": {
          title: text.title,
          description: text.description,
          mobileDescription: text.description,
          guideTitle: text.title,
          guideBody: text.guide,
          safetyTitle: text.privacy,
          safetyBody: text.privacy,
          faqs: [
            { q: text.faqUse, a: text.guide },
            { q: text.faqPrivacy, a: text.privacy },
            { q: text.faqUnits, a: text.faq },
          ],
          feature: {
            ...text,
            numberLocale: locale,
            unitNames: unitNamesFor(locale as UnitConverterLocale),
          },
        },
      },
      catalog: {
        "unit-converter": {
          name: text.title,
          summary: text.description,
          searchTerms: text.terms,
        },
      },
    },
  ]),
) as unknown as Record<
  UnitConverterLocale,
  {
    tools: Record<"unit-converter", ToolPageCopy<UnitConverterCopy>>;
    catalog: Record<"unit-converter", LocaleCatalogToolCopy>;
  }
>;
