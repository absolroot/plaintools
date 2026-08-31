import type { LocaleCatalogToolCopy } from "../../lib/tool-catalog";
import type { ToolPageCopy } from "../../lib/locale-data/bundle";
import type { ImageConverterCopy } from "./contract";
import {
  imageConversionModes,
  type ImageConverterToolId,
  type ImageInputFormat,
} from "./formats";

export type ImageConverterLocale =
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

type ImageLocaleText = {
  formats: Record<ImageInputFormat, string>;
  ui: ImageConverterCopy;
  title: string;
  description: string;
  guideTitle: string;
  guide: string;
  technologyTitle: string;
  technology: string;
  faqQualityQ: string;
  faqQualityA: string;
  faqSizeQ: string;
  faqSizeA: string;
  faqLimitsQ: string;
  faqLimitsA: string;
  catalog: string;
};

const formatNames = {
  bmp: "BMP",
  png: "PNG",
  jpg: "JPG",
  gif: "GIF",
  webp: "WebP",
  heic: "HEIC",
  avif: "AVIF",
  svg: "SVG",
} as const;

const en: ImageLocaleText = {
  formats: formatNames,
  ui: {
    ariaLabel: "Image format converter",
    sourceFormat: "From",
    targetFormat: "To",
    swapFormats: "Swap formats",
    inputImage: "Original image",
    outputImage: "Converted image",
    chooseImage: "Choose image",
    replaceImage: "Replace",
    dropImage: "Drop an image here or choose a file",
    previewEmpty: "Image preview",
    resultEmpty: "The converted image appears here",
    convert: "Convert image",
    quality: "Quality and file size",
    compact: "Smaller file",
    balanced: "Balanced — recommended",
    maximum: "Maximum quality",
    lossless:
      "This output is saved losslessly. Pixel values are kept, but the file can be larger.",
    fixedProfile: "This format uses its encoder's tested high-quality profile.",
    selected: "File",
    dimensions: "Dimensions",
    inputSize: "Original size",
    outputSize: "Converted size",
    saved: "Smaller by",
    larger: "Larger by",
    complete: "Image conversion complete",
    fileTooLarge: "The image is larger than the 50 MiB local-processing limit.",
    invalidImage:
      "Choose a valid BMP, PNG, JPG, GIF, WebP, HEIC, or AVIF image.",
    wrongFormat:
      "This file is {format}, not the source format selected on this page.",
    dimensionsTooLarge:
      "The decoded image exceeds the 40-megapixel safety limit.",
    decodeFailed:
      "The image could not be decoded. It may be damaged or use an unsupported variant.",
    encodeFailed: "The image could not be encoded in this browser.",
    transparencyFlattened: "Transparency changed to white for JPG",
    animationFirstFrame: "First GIF frame converted",
    sizeIncreaseExpected: "The target format can be larger",
  },
  title: "{from} to {to} Converter",
  description:
    "Convert {from} images to {to} in your browser. A format-aware quality profile keeps visible detail while avoiding unnecessary file growth.",
  guideTitle: "How to convert {from} to {to}",
  guide:
    "Choose a {from} image, review the quality setting when available, and convert it. Dimensions and transparency are retained when {to} supports them; JPG replaces transparent pixels with white. Nothing is uploaded.",
  technologyTitle: "Quality without mystery",
  technology:
    "The converter uses proven open-source image engines: MozJPEG for JPG, libwebp for WebP, libavif for AVIF, an optimized Rust PNG pipeline, Kvazaar/libheif for HEIC, and palette quantization for GIF. In ordinary terms, each output uses the compression method designed for that format instead of one browser shortcut for everything.",
  faqQualityQ: "Will the converted image keep its quality?",
  faqQualityA:
    "Lossless outputs keep pixel data. Lossy outputs start with a high-quality balanced profile, and you can choose a smaller file or maximum quality. Converting an already compressed image cannot restore detail that was previously removed.",
  faqSizeQ: "Why can the converted file be larger?",
  faqSizeA:
    "File size depends on the target format and image content. PNG and BMP can be much larger than JPG, WebP, HEIC, or AVIF because they preserve more data. The result shows the exact size difference before download.",
  faqLimitsQ: "What happens to animation and transparency?",
  faqLimitsA:
    "This is a still-image converter. For animated GIF input it converts the first frame. Transparency is kept by PNG, WebP, AVIF, HEIC, BMP, and GIF where the format permits it; JPG uses a white background.",
  catalog:
    "Convert {from} images to {to} locally with format-aware quality settings.",
};

type SupportUiCopy = Pick<
  ImageConverterCopy,
  | "ariaLabel"
  | "previewEmpty"
  | "lossless"
  | "fixedProfile"
  | "fileTooLarge"
  | "invalidImage"
  | "wrongFormat"
  | "dimensionsTooLarge"
  | "decodeFailed"
  | "encodeFailed"
  | "transparencyFlattened"
  | "animationFirstFrame"
  | "sizeIncreaseExpected"
>;

const supportUi: Record<Exclude<ImageConverterLocale, "en">, SupportUiCopy> = {
  ko: {
    ariaLabel: "이미지 형식 변환기",
    previewEmpty: "이미지 미리보기",
    lossless:
      "픽셀 값을 바꾸지 않는 무손실 저장입니다. 파일은 더 커질 수 있습니다.",
    fixedProfile: "검증된 고품질 인코더 설정을 사용합니다.",
    fileTooLarge: "로컬 처리 한도인 50MiB를 넘는 이미지입니다.",
    invalidImage:
      "올바른 BMP, PNG, JPG, GIF, WebP, HEIC 또는 AVIF 이미지를 선택하세요.",
    wrongFormat:
      "이 파일은 {format}입니다. 이 페이지에서 선택한 원본 형식과 다릅니다.",
    dimensionsTooLarge: "압축을 푼 이미지가 안전 한도인 4천만 픽셀을 넘습니다.",
    decodeFailed:
      "이미지를 읽지 못했습니다. 파일이 손상됐거나 지원하지 않는 변형일 수 있습니다.",
    encodeFailed: "이 브라우저에서 이미지를 인코딩하지 못했습니다.",
    transparencyFlattened: "JPG에 흰색 배경 적용",
    animationFirstFrame: "GIF 첫 프레임 변환",
    sizeIncreaseExpected: "대상 형식 특성상 용량이 커질 수 있음",
  },
  es: {
    ariaLabel: "Conversor de formato de imagen",
    previewEmpty: "Vista previa de la imagen",
    lossless:
      "La salida se guarda sin pérdida. Conserva los píxeles, aunque el archivo puede ser mayor.",
    fixedProfile: "Este formato usa un perfil de alta calidad probado.",
    fileTooLarge:
      "La imagen supera el límite de procesamiento local de 50 MiB.",
    invalidImage:
      "Selecciona una imagen BMP, PNG, JPG, GIF, WebP, HEIC o AVIF válida.",
    wrongFormat:
      "Este archivo es {format}, no el formato de origen elegido en esta página.",
    dimensionsTooLarge:
      "La imagen descomprimida supera el límite de seguridad de 40 megapíxeles.",
    decodeFailed:
      "No se pudo leer la imagen. Puede estar dañada o usar una variante no compatible.",
    encodeFailed: "No se pudo codificar la imagen en este navegador.",
    transparencyFlattened: "Transparencia sustituida por blanco en JPG",
    animationFirstFrame: "Primer fotograma del GIF convertido",
    sizeIncreaseExpected: "El formato de destino puede ocupar más",
  },
  de: {
    ariaLabel: "Bildformat-Konverter",
    previewEmpty: "Bildvorschau",
    lossless:
      "Die Ausgabe wird verlustfrei gespeichert. Pixel bleiben erhalten, die Datei kann aber größer sein.",
    fixedProfile: "Dieses Format verwendet ein geprüftes Qualitätsprofil.",
    fileTooLarge:
      "Das Bild überschreitet das lokale Verarbeitungslimit von 50 MiB.",
    invalidImage:
      "Wählen Sie ein gültiges BMP-, PNG-, JPG-, GIF-, WebP-, HEIC- oder AVIF-Bild.",
    wrongFormat:
      "Diese Datei ist {format} und nicht das auf dieser Seite gewählte Quellformat.",
    dimensionsTooLarge:
      "Das entpackte Bild überschreitet die Sicherheitsgrenze von 40 Megapixeln.",
    decodeFailed:
      "Das Bild konnte nicht gelesen werden. Es ist möglicherweise beschädigt oder verwendet eine nicht unterstützte Variante.",
    encodeFailed: "Das Bild konnte in diesem Browser nicht codiert werden.",
    transparencyFlattened: "Transparenz für JPG durch Weiß ersetzt",
    animationFirstFrame: "Erstes GIF-Bild konvertiert",
    sizeIncreaseExpected: "Das Zielformat kann größer ausfallen",
  },
  ja: {
    ariaLabel: "画像形式変換ツール",
    previewEmpty: "画像プレビュー",
    lossless:
      "ピクセル値を保つ可逆形式で保存します。ファイルが大きくなる場合があります。",
    fixedProfile: "検証済みの高画質エンコード設定を使用します。",
    fileTooLarge: "画像がローカル処理の上限 50 MiB を超えています。",
    invalidImage:
      "有効な BMP、PNG、JPG、GIF、WebP、HEIC、AVIF 画像を選択してください。",
    wrongFormat:
      "このファイルは {format} で、このページの入力形式とは異なります。",
    dimensionsTooLarge: "展開後の画像が安全上限の 4,000 万画素を超えています。",
    decodeFailed:
      "画像を読み込めません。破損しているか、未対応の形式である可能性があります。",
    encodeFailed: "このブラウザーでは画像をエンコードできませんでした。",
    transparencyFlattened: "JPG の透明部分を白に変更",
    animationFirstFrame: "GIF の先頭フレームを変換",
    sizeIncreaseExpected: "変換先の形式では容量が増える場合があります",
  },
  fr: {
    ariaLabel: "Convertisseur de format d’image",
    previewEmpty: "Aperçu de l’image",
    lossless:
      "La sortie est enregistrée sans perte. Les pixels sont conservés, mais le fichier peut être plus volumineux.",
    fixedProfile: "Ce format utilise un profil haute qualité éprouvé.",
    fileTooLarge: "L’image dépasse la limite de traitement local de 50 Mio.",
    invalidImage:
      "Choisissez une image BMP, PNG, JPG, GIF, WebP, HEIC ou AVIF valide.",
    wrongFormat:
      "Ce fichier est au format {format}, pas au format source choisi sur cette page.",
    dimensionsTooLarge:
      "L’image décompressée dépasse la limite de sécurité de 40 mégapixels.",
    decodeFailed:
      "Impossible de lire l’image. Elle est peut-être endommagée ou utilise une variante non prise en charge.",
    encodeFailed: "Impossible d’encoder l’image dans ce navigateur.",
    transparencyFlattened: "Transparence remplacée par du blanc en JPG",
    animationFirstFrame: "Première image du GIF convertie",
    sizeIncreaseExpected: "Le format cible peut être plus volumineux",
  },
  "pt-BR": {
    ariaLabel: "Conversor de formato de imagem",
    previewEmpty: "Prévia da imagem",
    lossless:
      "A saída é salva sem perdas. Os pixels são mantidos, mas o arquivo pode ficar maior.",
    fixedProfile: "Este formato usa um perfil de alta qualidade testado.",
    fileTooLarge:
      "A imagem ultrapassa o limite de processamento local de 50 MiB.",
    invalidImage:
      "Escolha uma imagem BMP, PNG, JPG, GIF, WebP, HEIC ou AVIF válida.",
    wrongFormat:
      "Este arquivo é {format}, não o formato de origem escolhido nesta página.",
    dimensionsTooLarge:
      "A imagem descompactada ultrapassa o limite de segurança de 40 megapixels.",
    decodeFailed:
      "Não foi possível ler a imagem. Ela pode estar danificada ou usar uma variante incompatível.",
    encodeFailed: "Não foi possível codificar a imagem neste navegador.",
    transparencyFlattened: "Transparência substituída por branco no JPG",
    animationFirstFrame: "Primeiro quadro do GIF convertido",
    sizeIncreaseExpected: "O formato de destino pode ficar maior",
  },
  it: {
    ariaLabel: "Convertitore di formato immagine",
    previewEmpty: "Anteprima immagine",
    lossless:
      "L’output viene salvato senza perdita. I pixel restano invariati, ma il file può essere più grande.",
    fixedProfile: "Questo formato usa un profilo di alta qualità collaudato.",
    fileTooLarge:
      "L’immagine supera il limite di elaborazione locale di 50 MiB.",
    invalidImage:
      "Scegli un’immagine BMP, PNG, JPG, GIF, WebP, HEIC o AVIF valida.",
    wrongFormat:
      "Questo file è {format}, non il formato sorgente scelto in questa pagina.",
    dimensionsTooLarge:
      "L’immagine decompressa supera il limite di sicurezza di 40 megapixel.",
    decodeFailed:
      "Impossibile leggere l’immagine. Potrebbe essere danneggiata o usare una variante non supportata.",
    encodeFailed: "Impossibile codificare l’immagine in questo browser.",
    transparencyFlattened: "Trasparenza sostituita con bianco nel JPG",
    animationFirstFrame: "Primo fotogramma GIF convertito",
    sizeIncreaseExpected: "Il formato di destinazione può essere più grande",
  },
  nl: {
    ariaLabel: "Afbeeldingsformaat omzetten",
    previewEmpty: "Afbeeldingsvoorbeeld",
    lossless:
      "De uitvoer wordt zonder kwaliteitsverlies opgeslagen. Pixels blijven gelijk, maar het bestand kan groter zijn.",
    fixedProfile:
      "Dit formaat gebruikt een geteste instelling van hoge kwaliteit.",
    fileTooLarge:
      "De afbeelding overschrijdt de lokale verwerkingslimiet van 50 MiB.",
    invalidImage:
      "Kies een geldige BMP-, PNG-, JPG-, GIF-, WebP-, HEIC- of AVIF-afbeelding.",
    wrongFormat:
      "Dit bestand is {format}, niet het bronformaat dat op deze pagina is gekozen.",
    dimensionsTooLarge:
      "De uitgepakte afbeelding overschrijdt de veiligheidslimiet van 40 megapixel.",
    decodeFailed:
      "De afbeelding kon niet worden gelezen. Ze kan beschadigd zijn of een niet-ondersteunde variant gebruiken.",
    encodeFailed: "De afbeelding kon in deze browser niet worden gecodeerd.",
    transparencyFlattened: "Transparantie voor JPG vervangen door wit",
    animationFirstFrame: "Eerste GIF-frame omgezet",
    sizeIncreaseExpected: "Het doelformaat kan groter zijn",
  },
  sv: {
    ariaLabel: "Bildformatskonverterare",
    previewEmpty: "Bildförhandsvisning",
    lossless:
      "Utdata sparas förlustfritt. Pixlarna behålls, men filen kan bli större.",
    fixedProfile: "Formatet använder en testad profil med hög kvalitet.",
    fileTooLarge: "Bilden överskrider gränsen på 50 MiB för lokal bearbetning.",
    invalidImage:
      "Välj en giltig BMP-, PNG-, JPG-, GIF-, WebP-, HEIC- eller AVIF-bild.",
    wrongFormat: "Filen är {format}, inte källformatet som valts på sidan.",
    dimensionsTooLarge:
      "Den uppackade bilden överskrider säkerhetsgränsen på 40 megapixel.",
    decodeFailed:
      "Bilden kunde inte läsas. Den kan vara skadad eller använda en variant som inte stöds.",
    encodeFailed: "Bilden kunde inte kodas i den här webbläsaren.",
    transparencyFlattened: "Genomskinlighet ersatt med vitt i JPG",
    animationFirstFrame: "Första GIF-bildrutan konverterad",
    sizeIncreaseExpected: "Målformatet kan bli större",
  },
  cs: {
    ariaLabel: "Převodník formátu obrázků",
    previewEmpty: "Náhled obrázku",
    lossless:
      "Výstup se uloží bezeztrátově. Pixely zůstanou zachované, ale soubor může být větší.",
    fixedProfile: "Formát používá ověřený profil vysoké kvality.",
    fileTooLarge: "Obrázek překračuje limit 50 MiB pro místní zpracování.",
    invalidImage:
      "Vyberte platný obrázek BMP, PNG, JPG, GIF, WebP, HEIC nebo AVIF.",
    wrongFormat:
      "Tento soubor je {format}, nikoli zdrojový formát vybraný na této stránce.",
    dimensionsTooLarge:
      "Rozbalený obrázek překračuje bezpečnostní limit 40 megapixelů.",
    decodeFailed:
      "Obrázek nelze přečíst. Může být poškozený nebo používá nepodporovanou variantu.",
    encodeFailed: "Obrázek nelze v tomto prohlížeči zakódovat.",
    transparencyFlattened: "Průhlednost v JPG nahrazena bílou",
    animationFirstFrame: "Převeden první snímek GIF",
    sizeIncreaseExpected: "Cílový formát může být větší",
  },
  pl: {
    ariaLabel: "Konwerter formatu obrazu",
    previewEmpty: "Podgląd obrazu",
    lossless:
      "Wynik jest zapisywany bezstratnie. Piksele pozostają bez zmian, ale plik może być większy.",
    fixedProfile:
      "Ten format korzysta ze sprawdzonego profilu wysokiej jakości.",
    fileTooLarge: "Obraz przekracza limit 50 MiB dla przetwarzania lokalnego.",
    invalidImage:
      "Wybierz prawidłowy obraz BMP, PNG, JPG, GIF, WebP, HEIC lub AVIF.",
    wrongFormat:
      "Ten plik to {format}, a nie format źródłowy wybrany na tej stronie.",
    dimensionsTooLarge:
      "Rozpakowany obraz przekracza bezpieczny limit 40 megapikseli.",
    decodeFailed:
      "Nie można odczytać obrazu. Może być uszkodzony albo używać nieobsługiwanej odmiany.",
    encodeFailed: "Nie można zakodować obrazu w tej przeglądarce.",
    transparencyFlattened: "Przezroczystość w JPG zastąpiona bielą",
    animationFirstFrame: "Przekonwertowano pierwszą klatkę GIF",
    sizeIncreaseExpected: "Format docelowy może być większy",
  },
  da: {
    ariaLabel: "Billedformatkonverter",
    previewEmpty: "Billedvisning",
    lossless:
      "Output gemmes tabsfrit. Pixelværdierne bevares, men filen kan blive større.",
    fixedProfile: "Formatet bruger en afprøvet profil i høj kvalitet.",
    fileTooLarge:
      "Billedet overskrider grænsen på 50 MiB for lokal behandling.",
    invalidImage:
      "Vælg et gyldigt BMP-, PNG-, JPG-, GIF-, WebP-, HEIC- eller AVIF-billede.",
    wrongFormat: "Filen er {format}, ikke kildeformatet valgt på denne side.",
    dimensionsTooLarge:
      "Det udpakkede billede overskrider sikkerhedsgrænsen på 40 megapixel.",
    decodeFailed:
      "Billedet kunne ikke læses. Det kan være beskadiget eller bruge en variant, der ikke understøttes.",
    encodeFailed: "Billedet kunne ikke kodes i denne browser.",
    transparencyFlattened: "Gennemsigtighed erstattet med hvid i JPG",
    animationFirstFrame: "Første GIF-billede konverteret",
    sizeIncreaseExpected: "Målformatet kan blive større",
  },
  no: {
    ariaLabel: "Bildeformatkonverterer",
    previewEmpty: "Bildeforhåndsvisning",
    lossless:
      "Resultatet lagres tapsfritt. Pikslene beholdes, men filen kan bli større.",
    fixedProfile: "Formatet bruker en testet profil med høy kvalitet.",
    fileTooLarge: "Bildet overskrider grensen på 50 MiB for lokal behandling.",
    invalidImage:
      "Velg et gyldig BMP-, PNG-, JPG-, GIF-, WebP-, HEIC- eller AVIF-bilde.",
    wrongFormat:
      "Filen er {format}, ikke kildeformatet som er valgt på denne siden.",
    dimensionsTooLarge:
      "Det utpakkede bildet overskrider sikkerhetsgrensen på 40 megapiksler.",
    decodeFailed:
      "Bildet kunne ikke leses. Det kan være skadet eller bruke en variant som ikke støttes.",
    encodeFailed: "Bildet kunne ikke kodes i denne nettleseren.",
    transparencyFlattened: "Gjennomsiktighet erstattet med hvitt i JPG",
    animationFirstFrame: "Første GIF-bilde konvertert",
    sizeIncreaseExpected: "Målformatet kan bli større",
  },
  ar: {
    ariaLabel: "محوّل تنسيق الصور",
    previewEmpty: "معاينة الصورة",
    lossless:
      "يُحفظ الناتج بلا فقدان. تبقى قيم البكسل كما هي، لكن الملف قد يكون أكبر.",
    fixedProfile: "يستخدم هذا التنسيق إعداد جودة عالية مجرّبًا.",
    fileTooLarge: "تتجاوز الصورة حد المعالجة المحلية البالغ 50 MiB.",
    invalidImage:
      "اختر صورة BMP أو PNG أو JPG أو GIF أو WebP أو HEIC أو AVIF صالحة.",
    wrongFormat:
      "هذا الملف بتنسيق {format} وليس تنسيق المصدر المحدد في هذه الصفحة.",
    dimensionsTooLarge:
      "تتجاوز الصورة بعد فك الضغط حد الأمان البالغ 40 ميغابكسل.",
    decodeFailed:
      "تعذرت قراءة الصورة. قد تكون تالفة أو تستخدم نوعًا غير مدعوم.",
    encodeFailed: "تعذر ترميز الصورة في هذا المتصفح.",
    transparencyFlattened: "استُبدلت الشفافية بخلفية بيضاء في JPG",
    animationFirstFrame: "حُوّل الإطار الأول من GIF",
    sizeIncreaseExpected: "قد يكون تنسيق الهدف أكبر حجمًا",
  },
  "zh-TW": {
    ariaLabel: "圖片格式轉換器",
    previewEmpty: "圖片預覽",
    lossless: "輸出採無損儲存，像素值會保留，但檔案可能變大。",
    fixedProfile: "此格式使用經過測試的高品質編碼設定。",
    fileTooLarge: "圖片超過 50 MiB 的本機處理上限。",
    invalidImage: "請選擇有效的 BMP、PNG、JPG、GIF、WebP、HEIC 或 AVIF 圖片。",
    wrongFormat: "此檔案是 {format}，不是本頁選定的來源格式。",
    dimensionsTooLarge: "解壓縮後的圖片超過 4,000 萬像素安全上限。",
    decodeFailed: "無法讀取圖片。檔案可能損毀或使用不支援的變體。",
    encodeFailed: "此瀏覽器無法完成圖片編碼。",
    transparencyFlattened: "JPG 透明區域改為白色",
    animationFirstFrame: "已轉換 GIF 第一格",
    sizeIncreaseExpected: "目標格式可能使檔案變大",
  },
  tr: {
    ariaLabel: "Görsel biçimi dönüştürücü",
    previewEmpty: "Görsel önizleme",
    lossless:
      "Çıktı kayıpsız kaydedilir. Piksel değerleri korunur ancak dosya büyüyebilir.",
    fixedProfile: "Bu biçim test edilmiş yüksek kalite ayarını kullanır.",
    fileTooLarge: "Görsel, 50 MiB yerel işleme sınırını aşıyor.",
    invalidImage:
      "Geçerli bir BMP, PNG, JPG, GIF, WebP, HEIC veya AVIF görseli seçin.",
    wrongFormat: "Bu dosya {format}; bu sayfada seçilen kaynak biçim değil.",
    dimensionsTooLarge: "Açılan görsel 40 megapiksel güvenlik sınırını aşıyor.",
    decodeFailed:
      "Görsel okunamadı. Dosya bozuk veya desteklenmeyen bir tür olabilir.",
    encodeFailed: "Görsel bu tarayıcıda kodlanamadı.",
    transparencyFlattened: "JPG için şeffaflık beyazla değiştirildi",
    animationFirstFrame: "GIF’in ilk karesi dönüştürüldü",
    sizeIncreaseExpected: "Hedef biçim daha büyük olabilir",
  },
};

function translated(
  locale: Exclude<ImageConverterLocale, "en">,
  title: string,
  description: string,
  labels: Partial<ImageConverterCopy>,
  page: Pick<
    ImageLocaleText,
    | "guideTitle"
    | "guide"
    | "technologyTitle"
    | "technology"
    | "faqQualityQ"
    | "faqQualityA"
    | "faqSizeQ"
    | "faqSizeA"
    | "faqLimitsQ"
    | "faqLimitsA"
    | "catalog"
  >,
): ImageLocaleText {
  return {
    formats: formatNames,
    title,
    description,
    ui: { ...supportUi[locale], ...labels } as ImageConverterCopy,
    ...page,
  };
}

const texts: Record<ImageConverterLocale, ImageLocaleText> = {
  en,
  ko: translated(
    "ko",
    "{from}에서 {to}로 변환",
    "{from} 이미지를 {to}로 브라우저에서 변환합니다. 포맷에 맞는 고품질 설정으로 눈에 보이는 품질을 지키면서 불필요한 용량 증가를 줄입니다.",
    {
      ariaLabel: "이미지 포맷 변환",
      sourceFormat: "원본",
      targetFormat: "변환 형식",
      swapFormats: "포맷 서로 바꾸기",
      inputImage: "원본 이미지",
      outputImage: "변환 이미지",
      chooseImage: "이미지 선택",
      replaceImage: "교체",
      dropImage: "이미지를 놓거나 파일을 선택하세요",
      resultEmpty: "변환한 이미지가 여기에 표시됩니다",
      convert: "이미지 변환",
      quality: "품질과 파일 크기",
      compact: "더 작은 파일",
      balanced: "균형 — 권장",
      maximum: "최대 품질",
      lossless:
        "픽셀 값을 바꾸지 않는 무손실 저장입니다. 파일은 더 커질 수 있습니다.",
      fixedProfile: "검증된 고품질 인코더 설정을 사용합니다.",
      selected: "파일",
      dimensions: "크기",
      inputSize: "원본 용량",
      outputSize: "변환 용량",
      saved: "감소",
      larger: "증가",
      complete: "이미지 변환 완료",
      fileTooLarge: "로컬 처리 한도인 50MiB를 넘는 이미지입니다.",
      invalidImage:
        "올바른 BMP, PNG, JPG, GIF, WebP, HEIC 또는 AVIF 이미지를 선택하세요.",
      wrongFormat:
        "이 파일은 {format}입니다. 이 페이지에서 선택한 원본 포맷과 다릅니다.",
      dimensionsTooLarge:
        "압축을 푼 이미지가 안전 한도인 4천만 픽셀을 넘습니다.",
      decodeFailed:
        "이미지를 읽지 못했습니다. 파일이 손상됐거나 지원하지 않는 변형일 수 있습니다.",
      encodeFailed: "이 브라우저에서 이미지 인코딩을 완료하지 못했습니다.",
      transparencyFlattened: "JPG용 흰색 배경 적용",
      animationFirstFrame: "GIF 첫 프레임 변환",
      sizeIncreaseExpected: "대상 포맷 특성상 용량이 커질 수 있음",
    },
    {
      guideTitle: "{from}을 {to}로 변환하는 방법",
      guide:
        "{from} 이미지를 선택하고 필요한 경우 품질을 고른 뒤 변환하세요. {to}가 지원하는 범위에서 해상도와 투명도를 유지하며, JPG는 투명 영역을 흰색으로 바꿉니다. 파일은 업로드되지 않습니다.",
      technologyTitle: "어려운 설정 없이 포맷별 최적 처리",
      technology:
        "JPG에는 MozJPEG, WebP에는 libwebp, AVIF에는 libavif, PNG에는 Rust 기반 최적화, HEIC에는 Kvazaar/libheif, GIF에는 전용 색상 압축기를 사용합니다. 쉽게 말해 모든 이미지를 한 방식으로 처리하지 않고 각 포맷에 가장 잘 맞는 공개 기술로 저장합니다.",
      faqQualityQ: "변환해도 이미지 품질이 유지되나요?",
      faqQualityA:
        "무손실 출력은 픽셀 정보를 유지합니다. 손실 압축은 고품질 균형 설정이 기본이며 더 작은 파일 또는 최대 품질을 선택할 수 있습니다. 이미 사라진 디테일을 다시 복원하지는 못합니다.",
      faqSizeQ: "변환 후 파일이 더 커지는 이유는 무엇인가요?",
      faqSizeA:
        "용량은 대상 포맷과 이미지 내용에 따라 달라집니다. PNG와 BMP는 정보를 더 많이 보존하므로 JPG, WebP, HEIC, AVIF보다 커질 수 있습니다. 다운로드 전에 실제 차이를 표시합니다.",
      faqLimitsQ: "애니메이션과 투명도는 어떻게 되나요?",
      faqLimitsA:
        "정지 이미지 변환기이므로 애니메이션 GIF는 첫 프레임을 변환합니다. 투명도는 지원하는 포맷에서 유지하고 JPG는 흰색 배경을 사용합니다.",
      catalog:
        "{from} 이미지를 {to}로 포맷별 품질 설정을 적용해 로컬에서 변환합니다.",
    },
  ),
  es: translated(
    "es",
    "Convertidor de {from} a {to}",
    "Convierte imágenes {from} a {to} en el navegador con un ajuste de calidad específico para cada formato.",
    {
      sourceFormat: "Origen",
      targetFormat: "Destino",
      swapFormats: "Intercambiar formatos",
      inputImage: "Imagen original",
      outputImage: "Imagen convertida",
      chooseImage: "Elegir imagen",
      replaceImage: "Cambiar",
      dropImage: "Suelta una imagen o elige un archivo",
      resultEmpty: "La imagen convertida aparecerá aquí",
      convert: "Convertir imagen",
      quality: "Calidad y tamaño",
      compact: "Archivo más pequeño",
      balanced: "Equilibrado — recomendado",
      maximum: "Calidad máxima",
      selected: "Archivo",
      dimensions: "Dimensiones",
      inputSize: "Tamaño original",
      outputSize: "Tamaño convertido",
      saved: "Reducción",
      larger: "Aumento",
      complete: "Conversión completada",
      animationFirstFrame: "Se convirtió el primer fotograma del GIF",
    },
    {
      guideTitle: "Cómo convertir {from} a {to}",
      guide:
        "Elige una imagen {from}, selecciona la calidad si está disponible y conviértela. Se conservan dimensiones y transparencia cuando {to} lo permite; JPG usa fondo blanco. No se sube ningún archivo.",
      technologyTitle: "Calidad adaptada a cada formato",
      technology:
        "Se usan motores abiertos especializados: MozJPEG, libwebp, libavif, PNG optimizado en Rust, Kvazaar/libheif y cuantización GIF. Cada formato recibe su propio método de compresión.",
      faqQualityQ: "¿Se mantiene la calidad?",
      faqQualityA:
        "Los formatos sin pérdida conservan los píxeles. Los demás usan un perfil equilibrado de alta calidad y permiten priorizar tamaño o calidad máxima.",
      faqSizeQ: "¿Por qué puede aumentar el tamaño?",
      faqSizeA:
        "PNG y BMP conservan más datos y pueden pesar mucho más. El resultado muestra la diferencia exacta antes de descargar.",
      faqLimitsQ: "¿Qué pasa con animación y transparencia?",
      faqLimitsA:
        "Se convierte el primer fotograma de un GIF animado. La transparencia se conserva cuando el destino lo permite; JPG usa blanco.",
      catalog:
        "Convierte {from} a {to} localmente con calidad adaptada al formato.",
    },
  ),
  de: translated(
    "de",
    "{from}-zu-{to}-Konverter",
    "Konvertiert {from}-Bilder im Browser mit formatgerechter Qualität in {to}.",
    {
      sourceFormat: "Von",
      targetFormat: "Nach",
      swapFormats: "Formate tauschen",
      inputImage: "Originalbild",
      outputImage: "Konvertiertes Bild",
      chooseImage: "Bild wählen",
      replaceImage: "Ersetzen",
      dropImage: "Bild ablegen oder Datei wählen",
      resultEmpty: "Das konvertierte Bild erscheint hier",
      convert: "Bild konvertieren",
      quality: "Qualität und Dateigröße",
      compact: "Kleinere Datei",
      balanced: "Ausgewogen — empfohlen",
      maximum: "Maximale Qualität",
      selected: "Datei",
      dimensions: "Abmessungen",
      inputSize: "Originalgröße",
      outputSize: "Neue Größe",
      saved: "Kleiner",
      larger: "Größer",
      complete: "Bildkonvertierung abgeschlossen",
    },
    {
      guideTitle: "{from} in {to} umwandeln",
      guide:
        "Wähle ein {from}-Bild, bei Bedarf die Qualität und starte die Konvertierung. Abmessungen und Transparenz bleiben erhalten, soweit {to} sie unterstützt; JPG verwendet Weiß. Es wird nichts hochgeladen.",
      technologyTitle: "Passende Technik für jedes Format",
      technology:
        "Zum Einsatz kommen spezialisierte Open-Source-Engines: MozJPEG, libwebp, libavif, eine optimierte Rust-PNG-Pipeline, Kvazaar/libheif und GIF-Farbquantisierung.",
      faqQualityQ: "Bleibt die Bildqualität erhalten?",
      faqQualityA:
        "Verlustfreie Ziele behalten die Pixel. Verlustbehaftete Ziele starten mit einem hochwertigen ausgewogenen Profil; kleinere Datei und maximale Qualität sind wählbar.",
      faqSizeQ: "Warum kann die Datei größer werden?",
      faqSizeA:
        "PNG und BMP bewahren mehr Daten und können deutlich größer werden. Die genaue Differenz wird vor dem Download angezeigt.",
      faqLimitsQ: "Was geschieht mit Animation und Transparenz?",
      faqLimitsA:
        "Bei animierten GIFs wird das erste Bild konvertiert. Transparenz bleibt erhalten, wenn das Ziel sie unterstützt; JPG verwendet Weiß.",
      catalog: "{from} lokal und formatgerecht in {to} konvertieren.",
    },
  ),
  ja: translated(
    "ja",
    "{from}から{to}への変換",
    "{from}画像をブラウザー内で{to}へ変換します。形式ごとの高品質設定で、不要な容量増加を抑えます。",
    {
      sourceFormat: "変換元",
      targetFormat: "変換先",
      swapFormats: "形式を入れ替え",
      inputImage: "元の画像",
      outputImage: "変換後の画像",
      chooseImage: "画像を選択",
      replaceImage: "変更",
      dropImage: "画像をドロップするか選択してください",
      resultEmpty: "変換後の画像がここに表示されます",
      convert: "画像を変換",
      quality: "画質とファイルサイズ",
      compact: "小さいファイル",
      balanced: "バランス — 推奨",
      maximum: "最高画質",
      selected: "ファイル",
      dimensions: "寸法",
      inputSize: "元のサイズ",
      outputSize: "変換後",
      saved: "削減",
      larger: "増加",
      complete: "画像の変換が完了しました",
      animationFirstFrame: "GIFの先頭フレームを変換",
    },
    {
      guideTitle: "{from}を{to}に変換する方法",
      guide:
        "{from}画像を選び、必要なら画質を指定して変換します。{to}が対応する範囲で寸法と透明度を維持し、JPGでは透明部分を白にします。アップロードは行いません。",
      technologyTitle: "形式ごとに適した高品質処理",
      technology:
        "JPGはMozJPEG、WebPはlibwebp、AVIFはlibavif、PNGはRust最適化、HEICはKvazaar/libheif、GIFは専用の減色処理を使います。",
      faqQualityQ: "変換後も画質は保たれますか？",
      faqQualityA:
        "可逆形式は画素を保持します。非可逆形式は高品質のバランス設定が標準で、容量優先または最高画質も選べます。",
      faqSizeQ: "ファイルが大きくなることがあるのはなぜですか？",
      faqSizeA:
        "PNGやBMPは多くの情報を保存するため大きくなる場合があります。ダウンロード前に実際の差を表示します。",
      faqLimitsQ: "アニメーションと透明度はどうなりますか？",
      faqLimitsA:
        "アニメーションGIFは先頭フレームを変換します。透明度は対応形式で維持し、JPGは白背景になります。",
      catalog: "{from}画像を形式別の高品質設定で{to}へローカル変換します。",
    },
  ),
  fr: translated(
    "fr",
    "Convertisseur {from} vers {to}",
    "Convertissez les images {from} en {to} dans le navigateur avec un réglage adapté au format.",
    {
      sourceFormat: "Source",
      targetFormat: "Cible",
      swapFormats: "Inverser les formats",
      inputImage: "Image d’origine",
      outputImage: "Image convertie",
      chooseImage: "Choisir une image",
      replaceImage: "Remplacer",
      dropImage: "Déposez une image ou choisissez un fichier",
      resultEmpty: "L’image convertie apparaîtra ici",
      convert: "Convertir l’image",
      quality: "Qualité et taille",
      compact: "Fichier plus petit",
      balanced: "Équilibré — recommandé",
      maximum: "Qualité maximale",
      selected: "Fichier",
      dimensions: "Dimensions",
      inputSize: "Taille d’origine",
      outputSize: "Taille convertie",
      saved: "Réduction",
      larger: "Augmentation",
      complete: "Conversion terminée",
    },
    {
      guideTitle: "Convertir {from} en {to}",
      guide:
        "Choisissez une image {from}, réglez la qualité si disponible puis convertissez-la. Les dimensions et la transparence sont conservées si {to} le permet ; JPG utilise un fond blanc. Aucun envoi.",
      technologyTitle: "Une technologie adaptée à chaque format",
      technology:
        "Le convertisseur utilise MozJPEG, libwebp, libavif, une chaîne PNG optimisée en Rust, Kvazaar/libheif et une quantification dédiée au GIF.",
      faqQualityQ: "La qualité est-elle conservée ?",
      faqQualityA:
        "Les sorties sans perte conservent les pixels. Les autres utilisent par défaut un profil équilibré de haute qualité, avec choix de taille réduite ou qualité maximale.",
      faqSizeQ: "Pourquoi le fichier peut-il grossir ?",
      faqSizeA:
        "PNG et BMP conservent davantage de données et peuvent être bien plus volumineux. La différence exacte est indiquée avant téléchargement.",
      faqLimitsQ: "Qu’en est-il de l’animation et de la transparence ?",
      faqLimitsA:
        "Pour un GIF animé, la première image est convertie. La transparence est conservée si le format cible le permet ; JPG utilise du blanc.",
      catalog:
        "Convertissez {from} en {to} localement avec une qualité adaptée au format.",
    },
  ),
  "pt-BR": translated(
    "pt-BR",
    "Conversor de {from} para {to}",
    "Converta imagens {from} em {to} no navegador com qualidade ajustada ao formato.",
    {
      sourceFormat: "Origem",
      targetFormat: "Destino",
      swapFormats: "Trocar formatos",
      inputImage: "Imagem original",
      outputImage: "Imagem convertida",
      chooseImage: "Escolher imagem",
      replaceImage: "Trocar",
      dropImage: "Solte uma imagem ou escolha um arquivo",
      resultEmpty: "A imagem convertida aparecerá aqui",
      convert: "Converter imagem",
      quality: "Qualidade e tamanho",
      compact: "Arquivo menor",
      balanced: "Equilibrado — recomendado",
      maximum: "Qualidade máxima",
      selected: "Arquivo",
      dimensions: "Dimensões",
      inputSize: "Tamanho original",
      outputSize: "Tamanho convertido",
      saved: "Redução",
      larger: "Aumento",
      complete: "Conversão concluída",
    },
    {
      guideTitle: "Como converter {from} para {to}",
      guide:
        "Escolha uma imagem {from}, ajuste a qualidade quando disponível e converta. Dimensões e transparência são mantidas se {to} aceitar; JPG usa fundo branco. Nada é enviado.",
      technologyTitle: "Tecnologia certa para cada formato",
      technology:
        "O conversor usa MozJPEG, libwebp, libavif, PNG otimizado em Rust, Kvazaar/libheif e quantização própria para GIF.",
      faqQualityQ: "A qualidade da imagem é mantida?",
      faqQualityA:
        "Saídas sem perdas preservam os pixels. As demais usam um perfil equilibrado de alta qualidade, com opções de arquivo menor ou qualidade máxima.",
      faqSizeQ: "Por que o arquivo pode ficar maior?",
      faqSizeA:
        "PNG e BMP guardam mais dados e podem crescer bastante. A diferença exata aparece antes do download.",
      faqLimitsQ: "E animação e transparência?",
      faqLimitsA:
        "GIF animado converte o primeiro quadro. A transparência é mantida quando o destino permite; JPG usa branco.",
      catalog:
        "Converta {from} em {to} localmente com qualidade própria do formato.",
    },
  ),
  it: translated(
    "it",
    "Convertitore da {from} a {to}",
    "Converte immagini {from} in {to} nel browser con qualità adatta al formato.",
    {
      sourceFormat: "Origine",
      targetFormat: "Destinazione",
      swapFormats: "Scambia formati",
      inputImage: "Immagine originale",
      outputImage: "Immagine convertita",
      chooseImage: "Scegli immagine",
      replaceImage: "Sostituisci",
      dropImage: "Trascina un’immagine o scegli un file",
      resultEmpty: "L’immagine convertita apparirà qui",
      convert: "Converti immagine",
      quality: "Qualità e dimensione",
      compact: "File più piccolo",
      balanced: "Bilanciato — consigliato",
      maximum: "Qualità massima",
      selected: "File",
      dimensions: "Dimensioni",
      inputSize: "Dimensione originale",
      outputSize: "Dimensione convertita",
      saved: "Riduzione",
      larger: "Aumento",
      complete: "Conversione completata",
    },
    {
      guideTitle: "Come convertire {from} in {to}",
      guide:
        "Scegli un’immagine {from}, imposta la qualità se disponibile e converti. Dimensioni e trasparenza restano quando {to} le supporta; JPG usa sfondo bianco. Nessun caricamento.",
      technologyTitle: "Tecnologia adatta a ogni formato",
      technology:
        "Sono usati MozJPEG, libwebp, libavif, PNG ottimizzato in Rust, Kvazaar/libheif e quantizzazione GIF dedicata.",
      faqQualityQ: "La qualità viene mantenuta?",
      faqQualityA:
        "I formati senza perdita mantengono i pixel. Gli altri partono da un profilo bilanciato di alta qualità, con opzioni per file più piccoli o qualità massima.",
      faqSizeQ: "Perché il file può diventare più grande?",
      faqSizeA:
        "PNG e BMP conservano più dati e possono crescere molto. La differenza esatta è mostrata prima del download.",
      faqLimitsQ: "Cosa accade ad animazione e trasparenza?",
      faqLimitsA:
        "Per i GIF animati viene convertito il primo fotogramma. La trasparenza resta se supportata; JPG usa il bianco.",
      catalog:
        "Converti {from} in {to} localmente con qualità specifica per formato.",
    },
  ),
  nl: translated(
    "nl",
    "{from} naar {to} converter",
    "Zet {from}-afbeeldingen in de browser om naar {to} met kwaliteitsinstellingen per formaat.",
    {
      sourceFormat: "Van",
      targetFormat: "Naar",
      swapFormats: "Formaten wisselen",
      inputImage: "Originele afbeelding",
      outputImage: "Omgezette afbeelding",
      chooseImage: "Afbeelding kiezen",
      replaceImage: "Vervangen",
      dropImage: "Sleep een afbeelding of kies een bestand",
      resultEmpty: "De omgezette afbeelding verschijnt hier",
      convert: "Afbeelding omzetten",
      quality: "Kwaliteit en bestandsgrootte",
      compact: "Kleiner bestand",
      balanced: "Gebalanceerd — aanbevolen",
      maximum: "Maximale kwaliteit",
      selected: "Bestand",
      dimensions: "Afmetingen",
      inputSize: "Originele grootte",
      outputSize: "Nieuwe grootte",
      saved: "Kleiner",
      larger: "Groter",
      complete: "Omzetten voltooid",
    },
    {
      guideTitle: "{from} naar {to} omzetten",
      guide:
        "Kies een {from}-afbeelding, stel zo nodig de kwaliteit in en zet om. Afmetingen en transparantie blijven behouden als {to} dit ondersteunt; JPG gebruikt wit. Er wordt niets geüpload.",
      technologyTitle: "De juiste techniek per formaat",
      technology:
        "De converter gebruikt MozJPEG, libwebp, libavif, geoptimaliseerde Rust-PNG, Kvazaar/libheif en speciale GIF-kleurreductie.",
      faqQualityQ: "Blijft de kwaliteit behouden?",
      faqQualityA:
        "Verliesvrije doelen behouden pixels. Andere doelen gebruiken standaard een hoogwaardig gebalanceerd profiel, met keuze voor kleiner of maximaal.",
      faqSizeQ: "Waarom kan het bestand groter worden?",
      faqSizeA:
        "PNG en BMP bewaren meer gegevens en kunnen veel groter zijn. Het exacte verschil staat vóór downloaden.",
      faqLimitsQ: "Wat gebeurt er met animatie en transparantie?",
      faqLimitsA:
        "Van geanimeerde GIF wordt het eerste frame omgezet. Transparantie blijft waar mogelijk; JPG gebruikt wit.",
      catalog: "Zet {from} lokaal en formaatspecifiek om naar {to}.",
    },
  ),
  sv: translated(
    "sv",
    "{from} till {to}-konverterare",
    "Konvertera {from}-bilder till {to} i webbläsaren med formatspecifik kvalitet.",
    {
      sourceFormat: "Från",
      targetFormat: "Till",
      swapFormats: "Byt format",
      inputImage: "Originalbild",
      outputImage: "Konverterad bild",
      chooseImage: "Välj bild",
      replaceImage: "Byt",
      dropImage: "Släpp en bild eller välj en fil",
      resultEmpty: "Den konverterade bilden visas här",
      convert: "Konvertera bild",
      quality: "Kvalitet och filstorlek",
      compact: "Mindre fil",
      balanced: "Balanserad — rekommenderas",
      maximum: "Maximal kvalitet",
      selected: "Fil",
      dimensions: "Mått",
      inputSize: "Originalstorlek",
      outputSize: "Ny storlek",
      saved: "Minskning",
      larger: "Ökning",
      complete: "Konverteringen är klar",
    },
    {
      guideTitle: "Så konverterar du {from} till {to}",
      guide:
        "Välj en {from}-bild, justera kvaliteten vid behov och konvertera. Mått och transparens behålls när {to} stöder det; JPG använder vitt. Inget laddas upp.",
      technologyTitle: "Rätt teknik för varje format",
      technology:
        "MozJPEG, libwebp, libavif, Rust-optimerad PNG, Kvazaar/libheif och särskild GIF-kvantisering används.",
      faqQualityQ: "Behålls bildkvaliteten?",
      faqQualityA:
        "Förlustfria mål behåller pixlarna. Övriga använder en balanserad högkvalitetsprofil med val för mindre fil eller maximal kvalitet.",
      faqSizeQ: "Varför kan filen bli större?",
      faqSizeA:
        "PNG och BMP sparar mer data och kan bli betydligt större. Exakt skillnad visas före hämtning.",
      faqLimitsQ: "Vad händer med animation och transparens?",
      faqLimitsA:
        "För animerad GIF konverteras första bildrutan. Transparens behålls där det stöds; JPG använder vitt.",
      catalog:
        "Konvertera {from} lokalt till {to} med formatanpassad kvalitet.",
    },
  ),
  cs: translated(
    "cs",
    "Převodník {from} na {to}",
    "Převeďte obrázky {from} na {to} v prohlížeči s kvalitou podle formátu.",
    {
      sourceFormat: "Z",
      targetFormat: "Na",
      swapFormats: "Prohodit formáty",
      inputImage: "Původní obrázek",
      outputImage: "Převedený obrázek",
      chooseImage: "Vybrat obrázek",
      replaceImage: "Nahradit",
      dropImage: "Přetáhněte obrázek nebo vyberte soubor",
      resultEmpty: "Převedený obrázek se zobrazí zde",
      convert: "Převést obrázek",
      quality: "Kvalita a velikost",
      compact: "Menší soubor",
      balanced: "Vyvážené — doporučeno",
      maximum: "Maximální kvalita",
      selected: "Soubor",
      dimensions: "Rozměry",
      inputSize: "Původní velikost",
      outputSize: "Nová velikost",
      saved: "Zmenšení",
      larger: "Zvětšení",
      complete: "Převod dokončen",
    },
    {
      guideTitle: "Jak převést {from} na {to}",
      guide:
        "Vyberte obrázek {from}, případně kvalitu a spusťte převod. Rozměry a průhlednost zůstanou, pokud je {to} podporuje; JPG používá bílou. Nic se neodesílá.",
      technologyTitle: "Správná technologie pro každý formát",
      technology:
        "Používáme MozJPEG, libwebp, libavif, optimalizaci PNG v Rustu, Kvazaar/libheif a vyhrazenou kvantizaci GIF.",
      faqQualityQ: "Zůstane zachována kvalita?",
      faqQualityA:
        "Bezeztrátové cíle zachovají pixely. Ostatní používají kvalitní vyvážený profil s volbou menšího souboru či maxima.",
      faqSizeQ: "Proč může být soubor větší?",
      faqSizeA:
        "PNG a BMP zachovávají více dat a mohou být výrazně větší. Přesný rozdíl uvidíte před stažením.",
      faqLimitsQ: "Co animace a průhlednost?",
      faqLimitsA:
        "U animovaného GIF se převede první snímek. Průhlednost se zachová, kde je podporována; JPG používá bílou.",
      catalog: "Převeďte {from} lokálně na {to} s kvalitou podle formátu.",
    },
  ),
  pl: translated(
    "pl",
    "Konwerter {from} na {to}",
    "Konwertuj obrazy {from} na {to} w przeglądarce z jakością dobraną do formatu.",
    {
      sourceFormat: "Z",
      targetFormat: "Na",
      swapFormats: "Zamień formaty",
      inputImage: "Obraz źródłowy",
      outputImage: "Obraz wynikowy",
      chooseImage: "Wybierz obraz",
      replaceImage: "Zmień",
      dropImage: "Upuść obraz lub wybierz plik",
      resultEmpty: "Przekonwertowany obraz pojawi się tutaj",
      convert: "Konwertuj obraz",
      quality: "Jakość i rozmiar",
      compact: "Mniejszy plik",
      balanced: "Zrównoważona — zalecana",
      maximum: "Maksymalna jakość",
      selected: "Plik",
      dimensions: "Wymiary",
      inputSize: "Rozmiar źródła",
      outputSize: "Rozmiar wyniku",
      saved: "Zmniejszenie",
      larger: "Zwiększenie",
      complete: "Konwersja zakończona",
    },
    {
      guideTitle: "Jak przekonwertować {from} na {to}",
      guide:
        "Wybierz obraz {from}, ustaw jakość, jeśli jest dostępna, i konwertuj. Wymiary i przezroczystość zostają, jeśli {to} je obsługuje; JPG używa bieli. Bez wysyłania pliku.",
      technologyTitle: "Właściwa technologia dla każdego formatu",
      technology:
        "Używane są MozJPEG, libwebp, libavif, optymalizacja PNG w Rust, Kvazaar/libheif i dedykowana kwantyzacja GIF.",
      faqQualityQ: "Czy jakość zostanie zachowana?",
      faqQualityA:
        "Formaty bezstratne zachowują piksele. Pozostałe używają profilu wysokiej jakości i pozwalają wybrać mniejszy plik lub maksimum.",
      faqSizeQ: "Dlaczego plik może być większy?",
      faqSizeA:
        "PNG i BMP zachowują więcej danych i mogą znacznie urosnąć. Dokładna różnica jest pokazana przed pobraniem.",
      faqLimitsQ: "Co z animacją i przezroczystością?",
      faqLimitsA:
        "Z animowanego GIF konwertowana jest pierwsza klatka. Przezroczystość pozostaje, gdy cel ją obsługuje; JPG używa bieli.",
      catalog:
        "Konwertuj {from} lokalnie na {to} z jakością dobraną do formatu.",
    },
  ),
  da: translated(
    "da",
    "{from} til {to}-konverter",
    "Konvertér {from}-billeder til {to} i browseren med formatspecifik kvalitet.",
    {
      sourceFormat: "Fra",
      targetFormat: "Til",
      swapFormats: "Byt formater",
      inputImage: "Originalbillede",
      outputImage: "Konverteret billede",
      chooseImage: "Vælg billede",
      replaceImage: "Udskift",
      dropImage: "Slip et billede eller vælg en fil",
      resultEmpty: "Det konverterede billede vises her",
      convert: "Konvertér billede",
      quality: "Kvalitet og filstørrelse",
      compact: "Mindre fil",
      balanced: "Balanceret — anbefalet",
      maximum: "Maksimal kvalitet",
      selected: "Fil",
      dimensions: "Mål",
      inputSize: "Original størrelse",
      outputSize: "Ny størrelse",
      saved: "Mindre",
      larger: "Større",
      complete: "Konvertering færdig",
    },
    {
      guideTitle: "Sådan konverteres {from} til {to}",
      guide:
        "Vælg et {from}-billede, justér kvaliteten om nødvendigt, og konvertér. Mål og gennemsigtighed bevares, når {to} understøtter det; JPG bruger hvid. Intet uploades.",
      technologyTitle: "Den rette teknologi til hvert format",
      technology:
        "Konverteren bruger MozJPEG, libwebp, libavif, Rust-optimeret PNG, Kvazaar/libheif og særlig GIF-kvantisering.",
      faqQualityQ: "Bevares billedkvaliteten?",
      faqQualityA:
        "Tabsfri mål bevarer pixels. Andre bruger en balanceret højkvalitetsprofil med valg for mindre fil eller maksimal kvalitet.",
      faqSizeQ: "Hvorfor kan filen blive større?",
      faqSizeA:
        "PNG og BMP gemmer flere data og kan blive meget større. Den nøjagtige forskel vises før download.",
      faqLimitsQ: "Hvad sker der med animation og gennemsigtighed?",
      faqLimitsA:
        "Første billede i en animeret GIF konverteres. Gennemsigtighed bevares hvor muligt; JPG bruger hvid.",
      catalog: "Konvertér {from} lokalt til {to} med formattilpasset kvalitet.",
    },
  ),
  no: translated(
    "no",
    "{from} til {to}-konverterer",
    "Konverter {from}-bilder til {to} i nettleseren med formattilpasset kvalitet.",
    {
      sourceFormat: "Fra",
      targetFormat: "Til",
      swapFormats: "Bytt formater",
      inputImage: "Originalbilde",
      outputImage: "Konvertert bilde",
      chooseImage: "Velg bilde",
      replaceImage: "Bytt",
      dropImage: "Slipp et bilde eller velg en fil",
      resultEmpty: "Det konverterte bildet vises her",
      convert: "Konverter bilde",
      quality: "Kvalitet og filstørrelse",
      compact: "Mindre fil",
      balanced: "Balansert — anbefalt",
      maximum: "Maksimal kvalitet",
      selected: "Fil",
      dimensions: "Mål",
      inputSize: "Original størrelse",
      outputSize: "Ny størrelse",
      saved: "Mindre",
      larger: "Større",
      complete: "Konvertering fullført",
    },
    {
      guideTitle: "Slik konverterer du {from} til {to}",
      guide:
        "Velg et {from}-bilde, juster kvaliteten ved behov og konverter. Mål og gjennomsiktighet beholdes når {to} støtter det; JPG bruker hvitt. Ingenting lastes opp.",
      technologyTitle: "Riktig teknologi for hvert format",
      technology:
        "Konvertereren bruker MozJPEG, libwebp, libavif, Rust-optimalisert PNG, Kvazaar/libheif og egen GIF-kvantisering.",
      faqQualityQ: "Beholdes bildekvaliteten?",
      faqQualityA:
        "Tapsfrie mål beholder pikslene. Andre bruker en balansert høykvalitetsprofil med valg for mindre fil eller maksimal kvalitet.",
      faqSizeQ: "Hvorfor kan filen bli større?",
      faqSizeA:
        "PNG og BMP lagrer mer data og kan bli mye større. Nøyaktig forskjell vises før nedlasting.",
      faqLimitsQ: "Hva skjer med animasjon og gjennomsiktighet?",
      faqLimitsA:
        "Første ramme i animert GIF konverteres. Gjennomsiktighet beholdes der det støttes; JPG bruker hvitt.",
      catalog: "Konverter {from} lokalt til {to} med formattilpasset kvalitet.",
    },
  ),
  ar: translated(
    "ar",
    "محول {from} إلى {to}",
    "حوّل صور {from} إلى {to} داخل المتصفح بجودة مناسبة لكل صيغة.",
    {
      sourceFormat: "من",
      targetFormat: "إلى",
      swapFormats: "تبديل الصيغ",
      inputImage: "الصورة الأصلية",
      outputImage: "الصورة المحولة",
      chooseImage: "اختيار صورة",
      replaceImage: "استبدال",
      dropImage: "أفلت صورة أو اختر ملفًا",
      resultEmpty: "تظهر الصورة المحولة هنا",
      convert: "تحويل الصورة",
      quality: "الجودة وحجم الملف",
      compact: "ملف أصغر",
      balanced: "متوازن — موصى به",
      maximum: "أقصى جودة",
      selected: "الملف",
      dimensions: "الأبعاد",
      inputSize: "الحجم الأصلي",
      outputSize: "الحجم الجديد",
      saved: "أصغر",
      larger: "أكبر",
      complete: "اكتمل التحويل",
    },
    {
      guideTitle: "كيفية تحويل {from} إلى {to}",
      guide:
        "اختر صورة {from} وحدد الجودة عند توفرها ثم حوّلها. تبقى الأبعاد والشفافية إذا كانت {to} تدعمها؛ يستخدم JPG خلفية بيضاء. لا يتم رفع الملف.",
      technologyTitle: "تقنية مناسبة لكل صيغة",
      technology:
        "يستخدم المحول MozJPEG وlibwebp وlibavif وتحسين PNG بلغة Rust وKvazaar/libheif وتقليل ألوان GIF المخصص.",
      faqQualityQ: "هل تبقى جودة الصورة؟",
      faqQualityA:
        "تحافظ الصيغ غير الفاقدة على البكسلات. تستخدم الصيغ الأخرى إعدادًا متوازنًا عالي الجودة مع خيار ملف أصغر أو جودة قصوى.",
      faqSizeQ: "لماذا قد يكبر الملف؟",
      faqSizeA:
        "يحفظ PNG وBMP بيانات أكثر وقد يكونان أكبر بكثير. يظهر الفرق الدقيق قبل التنزيل.",
      faqLimitsQ: "ماذا عن الحركة والشفافية؟",
      faqLimitsA:
        "يتم تحويل الإطار الأول من GIF المتحرك. تبقى الشفافية حيث تدعمها الصيغة؛ يستخدم JPG اللون الأبيض.",
      catalog: "حوّل {from} إلى {to} محليًا بجودة مناسبة للصيغة.",
    },
  ),
  "zh-TW": translated(
    "zh-TW",
    "{from} 轉 {to} 轉換器",
    "在瀏覽器中將 {from} 圖片轉為 {to}，並依格式採用合適的高品質設定。",
    {
      sourceFormat: "來源",
      targetFormat: "目標",
      swapFormats: "交換格式",
      inputImage: "原始圖片",
      outputImage: "轉換後圖片",
      chooseImage: "選擇圖片",
      replaceImage: "更換",
      dropImage: "拖放圖片或選擇檔案",
      resultEmpty: "轉換後圖片會顯示在這裡",
      convert: "轉換圖片",
      quality: "品質與檔案大小",
      compact: "較小檔案",
      balanced: "平衡 — 建議",
      maximum: "最高品質",
      selected: "檔案",
      dimensions: "尺寸",
      inputSize: "原始大小",
      outputSize: "轉換後大小",
      saved: "減少",
      larger: "增加",
      complete: "圖片轉換完成",
      animationFirstFrame: "已轉換 GIF 第一幀",
    },
    {
      guideTitle: "如何將 {from} 轉為 {to}",
      guide:
        "選擇 {from} 圖片，視需要設定品質後開始轉換。若 {to} 支援，會保留尺寸與透明度；JPG 會使用白色背景。檔案不會上傳。",
      technologyTitle: "每種格式使用合適技術",
      technology:
        "JPG 使用 MozJPEG、WebP 使用 libwebp、AVIF 使用 libavif、PNG 使用 Rust 最佳化、HEIC 使用 Kvazaar/libheif，GIF 則使用專用色彩量化。",
      faqQualityQ: "轉換後會保留畫質嗎？",
      faqQualityA:
        "無損格式保留像素。其他格式預設採高品質平衡設定，也可選擇較小檔案或最高品質。",
      faqSizeQ: "為什麼檔案可能變大？",
      faqSizeA:
        "PNG 與 BMP 保留更多資料，因此可能大幅增加。下載前會顯示實際差異。",
      faqLimitsQ: "動畫與透明度會如何處理？",
      faqLimitsA:
        "動畫 GIF 只轉換第一幀。目標格式支援時會保留透明度；JPG 使用白色背景。",
      catalog: "在本機以格式專用品質設定將 {from} 轉為 {to}。",
    },
  ),
  tr: translated(
    "tr",
    "{from} - {to} Dönüştürücü",
    "{from} görsellerini tarayıcıda biçime uygun kaliteyle {to} formatına dönüştürün.",
    {
      sourceFormat: "Kaynak",
      targetFormat: "Hedef",
      swapFormats: "Biçimleri değiştir",
      inputImage: "Orijinal görsel",
      outputImage: "Dönüştürülen görsel",
      chooseImage: "Görsel seç",
      replaceImage: "Değiştir",
      dropImage: "Görsel bırakın veya dosya seçin",
      resultEmpty: "Dönüştürülen görsel burada görünür",
      convert: "Görseli dönüştür",
      quality: "Kalite ve dosya boyutu",
      compact: "Daha küçük dosya",
      balanced: "Dengeli — önerilen",
      maximum: "En yüksek kalite",
      selected: "Dosya",
      dimensions: "Boyutlar",
      inputSize: "Orijinal boyut",
      outputSize: "Yeni boyut",
      saved: "Küçülme",
      larger: "Büyüme",
      complete: "Dönüştürme tamamlandı",
    },
    {
      guideTitle: "{from} nasıl {to} yapılır",
      guide:
        "Bir {from} görseli seçin, varsa kaliteyi ayarlayın ve dönüştürün. {to} destekliyorsa boyut ve şeffaflık korunur; JPG beyaz zemin kullanır. Dosya yüklenmez.",
      technologyTitle: "Her biçim için doğru teknoloji",
      technology:
        "Dönüştürücü MozJPEG, libwebp, libavif, Rust ile optimize PNG, Kvazaar/libheif ve özel GIF renk azaltma kullanır.",
      faqQualityQ: "Görüntü kalitesi korunur mu?",
      faqQualityA:
        "Kayıpsız hedefler pikselleri korur. Diğerleri yüksek kaliteli dengeli profille başlar; küçük dosya veya en yüksek kalite seçilebilir.",
      faqSizeQ: "Dosya neden büyüyebilir?",
      faqSizeA:
        "PNG ve BMP daha çok veri saklar ve çok daha büyük olabilir. Tam fark indirmeden önce gösterilir.",
      faqLimitsQ: "Animasyon ve şeffaflık ne olur?",
      faqLimitsA:
        "Hareketli GIF'in ilk karesi dönüştürülür. Hedef destekliyorsa şeffaflık korunur; JPG beyaz kullanır.",
      catalog:
        "{from} görsellerini yerel olarak biçime uygun kaliteyle {to} yapın.",
    },
  ),
};

function fill(template: string, from: string, to: string): string {
  return template.replaceAll("{from}", from).replaceAll("{to}", to);
}

export function createImageConverterLocale(locale: ImageConverterLocale): {
  tools: Record<ImageConverterToolId, ToolPageCopy<ImageConverterCopy>>;
  catalog: Record<ImageConverterToolId, LocaleCatalogToolCopy>;
  formatNames: Record<ImageInputFormat, string>;
} {
  const text = texts[locale];
  const tools = Object.fromEntries(
    imageConversionModes.map(({ id, source, target }) => {
      const from = text.formats[source];
      const to = text.formats[target];
      const description = fill(text.description, from, to);
      return [
        id,
        {
          title: fill(text.title, from, to),
          description,
          mobileDescription: description,
          guideTitle: fill(text.guideTitle, from, to),
          guideBody: fill(text.guide, from, to),
          safetyTitle: text.technologyTitle,
          safetyBody: text.technology,
          faqs: [
            { q: text.faqQualityQ, a: text.faqQualityA },
            { q: text.faqSizeQ, a: text.faqSizeA },
            { q: text.faqLimitsQ, a: text.faqLimitsA },
          ],
          feature: text.ui,
        },
      ];
    }),
  ) as Record<ImageConverterToolId, ToolPageCopy<ImageConverterCopy>>;

  const catalog = Object.fromEntries(
    imageConversionModes.map(({ id, source, target }) => {
      const from = text.formats[source];
      const to = text.formats[target];
      return [
        id,
        {
          name: fill(text.title, from, to),
          summary: fill(text.catalog, from, to),
          searchTerms: [
            `${from} to ${to}`,
            `${from} ${to} converter`,
            fill(text.title, from, to),
          ],
        },
      ];
    }),
  ) as unknown as Record<ImageConverterToolId, LocaleCatalogToolCopy>;

  return { tools, catalog, formatNames: text.formats };
}

export const imageConverterLocales = Object.fromEntries(
  Object.keys(texts).map((locale) => [
    locale,
    createImageConverterLocale(locale as ImageConverterLocale),
  ]),
) as Record<
  ImageConverterLocale,
  ReturnType<typeof createImageConverterLocale>
>;
