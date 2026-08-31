import type { ImageUpscalerCopy } from "../../../features/image-upscaler/contract";
import type { Locale } from "../../site";

type PageSeed = {
  title: string;
  heading?: string;
  description: string;
  mobileDescription?: string;
  guide: string;
  terms: readonly string[];
};

type LocalCopy = Omit<
  ImageUpscalerCopy,
  | "accessibleLabel"
  | "supportedImageTypes"
  | "scaleOptions"
  | "inputDetails"
  | "outputDetails"
>;

type LocalPack = { copy: LocalCopy; page: PageSeed };

const supportedTypes: Record<Locale, string> = {
  en: "JPG/JPEG, PNG, WebP · max 10 MB",
  ko: "JPG/JPEG, PNG, WebP · 최대 10MB",
  es: "JPG/JPEG, PNG, WebP · máx. 10 MB",
  de: "JPG/JPEG, PNG, WebP · max. 10 MB",
  ja: "JPG/JPEG、PNG、WebP・最大10 MB",
  fr: "JPG/JPEG, PNG, WebP · 10 Mo max.",
  "pt-BR": "JPG/JPEG, PNG, WebP · máx. 10 MB",
  it: "JPG/JPEG, PNG, WebP · max 10 MB",
  nl: "JPG/JPEG, PNG, WebP · max. 10 MB",
  sv: "JPG/JPEG, PNG, WebP · max 10 MB",
  cs: "JPG/JPEG, PNG, WebP · max. 10 MB",
  pl: "JPG/JPEG, PNG, WebP · maks. 10 MB",
  da: "JPG/JPEG, PNG, WebP · maks. 10 MB",
  no: "JPG/JPEG, PNG, WebP · maks. 10 MB",
  ar: "JPG/JPEG وPNG وWebP · الحد الأقصى 10 MB",
  "zh-TW": "JPG/JPEG、PNG、WebP · 上限 10 MB",
  tr: "JPG/JPEG, PNG, WebP · en fazla 10 MB",
};

function pack(
  source: LocalPack,
  locale: Locale,
): { copy: ImageUpscalerCopy; page: PageSeed } {
  return {
    page: { ...source.page, heading: source.page.heading ?? source.page.title },
    copy: {
      accessibleLabel: source.page.title,
      supportedImageTypes: supportedTypes[locale],
      scaleOptions: { 2: "2×", 4: "4×" },
      inputDetails: "{width} × {height} px",
      outputDetails: "{width} × {height} px · {scale}×",
      ...source.copy,
    },
  };
}

const packs: Record<Locale, LocalPack> = {
  en: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Upscaled result",
      chooseImage: "Choose image",
      dropHint: "Drop one image here or choose it from your device.",
      newImage: "Open another image",
      optionsLabel: "Upscale options",
      modeLabel: "AI model",
      modeOptions: { fast: "Compact", quality: "Quality" },
      modeHints: {
        fast: "21.4 MB · compact model for broad browser support",
        quality: "52.8 MB · more detail, WebGPU only",
      },
      qualityUnavailable:
        "Quality mode requires WebGPU and is unavailable in this browser.",
      scaleLabel: "Output scale",
      formatLabel: "Download format",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG quality",
      upscale: "Upscale image",
      cancel: "Cancel",
      download: "Download result",
      ready: "Choose the model and scale, then upscale the image.",
      readingImage: "Reading the image…",
      consentTitle: "Download this AI model?",
      consentBody:
        "The first {mode} run downloads exactly {size} of model weights. The file is verified and cached in this browser; your image stays on this device.",
      consentNotice:
        "AI upscaling estimates detail. It cannot recover the exact pixels that were missing from the source.",
      consentConfirm: "Download model and continue",
      downloadingModel: "Downloading model…",
      loadingModel: "Loading the AI model…",
      processingImage: "Upscaling the image…",
      composingImage: "Preparing the 2× result…",
      completed: "The upscaled result is ready to compare and download.",
      cancelled:
        "Upscaling was cancelled. The original image is still available.",
      retryingSmallerTiles: "Retrying with smaller tiles…",
      comparisonLabel: "Before and after comparison",
      comparisonHelp: "Move to compare the original and upscaled result",
      fileTooLarge: "Choose an image no larger than 10 MB.",
      imageTooLarge:
        "This image is too large for the selected model on this browser.",
      outputTooLarge:
        "The selected scale would exceed the 4096 px or 16 megapixel output limit.",
      invalidImage: "Choose a valid JPG/JPEG, PNG, or WebP image.",
      modelFailed:
        "The verified AI model could not be loaded. Check the connection and try again.",
      processingFailed:
        "This image could not be upscaled. Try Compact mode or a smaller image.",
      downloadFailed: "The result could not be prepared for download.",
      resultPlaceholder:
        "Your upscaled result and comparison control will appear here.",
    },
    page: {
      title: "Image Upscaler (Resolution)",
      description:
        "Increase image resolution 2× or 4× with an AI model, then compare and download the result.",
      mobileDescription:
        "Use an AI model to upscale an image 2× or 4× in your browser.",
      guide:
        "Choose one image, select Compact or WebGPU Quality mode and a 2× or 4× scale, then approve the one-time model download. Compare the result before saving it as PNG or JPEG.",
      terms: [
        "AI image upscaler",
        "increase image resolution",
        "upscale image",
        "2x image",
        "4x image",
      ],
    },
  },
  ko: {
    copy: {
      originalLabel: "원본",
      resultLabel: "해상도를 높인 결과",
      chooseImage: "이미지 선택",
      dropHint: "이미지 한 장을 여기에 놓거나 기기에서 선택하세요.",
      newImage: "다른 이미지 열기",
      optionsLabel: "해상도 높이기 설정",
      modeLabel: "AI 모델",
      modeOptions: { fast: "경량", quality: "고화질" },
      modeHints: {
        fast: "21.4MB · 폭넓은 브라우저 호환용 경량 모델",
        quality: "52.8MB · 더 세밀한 결과, WebGPU 전용",
      },
      qualityUnavailable:
        "고화질 모드는 WebGPU가 필요해 이 브라우저에서는 사용할 수 없습니다.",
      scaleLabel: "확대 배율",
      formatLabel: "저장 형식",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG 품질",
      upscale: "이미지 해상도 높이기",
      cancel: "취소",
      download: "결과 다운로드",
      ready: "AI 모델과 배율을 고른 뒤 이미지 해상도를 높이세요.",
      readingImage: "이미지를 읽는 중…",
      consentTitle: "이 AI 모델을 다운로드할까요?",
      consentBody:
        "{mode} 모델을 처음 사용할 때 정확히 {size}의 모델 파일을 받습니다. 파일은 검증 후 이 브라우저에 캐시되며 이미지는 기기 밖으로 전송되지 않습니다.",
      consentNotice:
        "AI 업스케일링은 세부 묘사를 추정합니다. 원본에서 사라진 픽셀을 정확히 복원할 수는 없습니다.",
      consentConfirm: "모델을 받고 계속하기",
      downloadingModel: "모델을 다운로드하는 중…",
      loadingModel: "AI 모델을 불러오는 중…",
      processingImage: "이미지 해상도를 높이는 중…",
      composingImage: "2배 결과를 만드는 중…",
      completed: "결과가 준비됐습니다. 원본과 비교한 뒤 다운로드하세요.",
      cancelled: "작업을 취소했습니다. 원본 이미지는 그대로 남아 있습니다.",
      retryingSmallerTiles: "더 작은 타일로 다시 처리하는 중…",
      comparisonLabel: "원본과 결과 비교",
      comparisonHelp: "원본과 해상도를 높인 결과를 비교하려면 움직이세요",
      fileTooLarge: "10MB 이하 이미지를 선택하세요.",
      imageTooLarge:
        "이 브라우저에서 선택한 모델로 처리하기에는 이미지가 너무 큽니다.",
      outputTooLarge:
        "선택한 배율은 결과 제한인 4096px 또는 1,600만 화소를 넘습니다.",
      invalidImage: "올바른 JPG/JPEG, PNG 또는 WebP 이미지를 선택하세요.",
      modelFailed:
        "검증된 AI 모델을 불러오지 못했습니다. 연결을 확인하고 다시 시도하세요.",
      processingFailed:
        "이 이미지를 처리하지 못했습니다. 경량 모드나 더 작은 이미지를 사용해 보세요.",
      downloadFailed: "다운로드할 결과 파일을 만들지 못했습니다.",
      resultPlaceholder:
        "해상도를 높인 이미지와 비교 조절기가 여기에 표시됩니다.",
    },
    page: {
      title: "이미지 업스케일러 (해상도)",
      heading: "이미지 업스케일러 (해상도)",
      description:
        "AI 모델로 이미지 해상도를 2배 또는 4배 높이고, 비교한 뒤 결과를 내려받으세요.",
      mobileDescription: "AI 모델로 이미지를 2배 또는 4배 업스케일하세요.",
      guide:
        "이미지 한 장을 선택하고 경량 또는 WebGPU 고화질 모델과 2배·4배 배율을 고르세요. 최초 모델 다운로드를 확인한 뒤 결과를 원본과 비교하고 PNG 또는 JPEG로 저장할 수 있습니다.",
      terms: [
        "이미지 해상도 높이기",
        "사진 해상도 높이기",
        "이미지 업스케일링",
        "AI 이미지 업스케일러",
        "사진 화질 개선",
      ],
    },
  },
  es: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Resultado ampliado",
      chooseImage: "Elegir imagen",
      dropHint: "Suelta una imagen aquí o elígela en tu dispositivo.",
      newImage: "Abrir otra imagen",
      optionsLabel: "Opciones de ampliación",
      modeLabel: "Modelo de IA",
      modeOptions: { fast: "Ligero", quality: "Calidad" },
      modeHints: {
        fast: "21,4 MB · modelo ligero y compatible",
        quality: "52,8 MB · más detalle, solo WebGPU",
      },
      qualityUnavailable:
        "El modo Calidad requiere WebGPU y no está disponible en este navegador.",
      scaleLabel: "Escala de salida",
      formatLabel: "Formato de descarga",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Calidad JPEG",
      upscale: "Aumentar resolución",
      cancel: "Cancelar",
      download: "Descargar resultado",
      ready: "Elige el modelo y la escala para aumentar la imagen.",
      readingImage: "Leyendo la imagen…",
      consentTitle: "¿Descargar este modelo de IA?",
      consentBody:
        "La primera ejecución de {mode} descarga exactamente {size} de pesos. El archivo se verifica y guarda en este navegador; la imagen permanece en el dispositivo.",
      consentNotice:
        "La ampliación con IA estima detalles; no puede recuperar exactamente los píxeles ausentes.",
      consentConfirm: "Descargar y continuar",
      downloadingModel: "Descargando el modelo…",
      loadingModel: "Cargando el modelo de IA…",
      processingImage: "Aumentando la imagen…",
      composingImage: "Preparando el resultado 2×…",
      completed: "El resultado está listo para comparar y descargar.",
      cancelled:
        "Se canceló la ampliación. La imagen original sigue disponible.",
      retryingSmallerTiles: "Reintentando con bloques más pequeños…",
      comparisonLabel: "Comparación antes y después",
      comparisonHelp: "Mueve para comparar la imagen original y el resultado",
      fileTooLarge: "Elige una imagen de hasta 10 MB.",
      imageTooLarge:
        "La imagen es demasiado grande para el modelo elegido en este navegador.",
      outputTooLarge: "La escala supera el límite de 4096 px o 16 megapíxeles.",
      invalidImage: "Elige una imagen JPG/JPEG, PNG o WebP válida.",
      modelFailed:
        "No se pudo cargar el modelo verificado. Comprueba la conexión e inténtalo de nuevo.",
      processingFailed:
        "No se pudo ampliar esta imagen. Prueba el modo Ligero o una imagen menor.",
      downloadFailed: "No se pudo preparar el resultado para descargar.",
      resultPlaceholder:
        "El resultado ampliado y el comparador aparecerán aquí.",
    },
    page: {
      title: "Ampliador de imágenes (resolución)",
      description:
        "Aumenta la resolución de una imagen 2× o 4× con un modelo de IA, compara el resultado y descárgalo.",
      mobileDescription:
        "Amplía una imagen 2× o 4× con un modelo de IA en el navegador.",
      guide:
        "Elige una imagen, el modo Ligero o Calidad con WebGPU y una escala 2× o 4×. Confirma la descarga única del modelo, compara y guarda en PNG o JPEG.",
      terms: [
        "aumentar resolución imagen",
        "ampliar imagen con IA",
        "mejorar calidad foto",
        "imagen 2x",
        "imagen 4x",
      ],
    },
  },
  de: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Hochskaliertes Ergebnis",
      chooseImage: "Bild auswählen",
      dropHint: "Ein Bild hier ablegen oder vom Gerät auswählen.",
      newImage: "Anderes Bild öffnen",
      optionsLabel: "Skalierungsoptionen",
      modeLabel: "KI-Modell",
      modeOptions: { fast: "Kompakt", quality: "Qualität" },
      modeHints: {
        fast: "21,4 MB · kompaktes, breit kompatibles Modell",
        quality: "52,8 MB · mehr Details, nur WebGPU",
      },
      qualityUnavailable:
        "Der Qualitätsmodus benötigt WebGPU und ist in diesem Browser nicht verfügbar.",
      scaleLabel: "Ausgabeskalierung",
      formatLabel: "Downloadformat",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG-Qualität",
      upscale: "Bild hochskalieren",
      cancel: "Abbrechen",
      download: "Ergebnis herunterladen",
      ready: "Modell und Skalierung wählen und das Bild hochskalieren.",
      readingImage: "Bild wird gelesen…",
      consentTitle: "Dieses KI-Modell herunterladen?",
      consentBody:
        "Beim ersten Lauf mit {mode} werden exakt {size} Modellgewichte geladen. Die Datei wird geprüft und im Browser gespeichert; das Bild bleibt auf diesem Gerät.",
      consentNotice:
        "KI-Hochskalierung schätzt Details und kann fehlende Originalpixel nicht exakt wiederherstellen.",
      consentConfirm: "Modell laden und fortfahren",
      downloadingModel: "Modell wird heruntergeladen…",
      loadingModel: "KI-Modell wird geladen…",
      processingImage: "Bild wird hochskaliert…",
      composingImage: "2×-Ergebnis wird vorbereitet…",
      completed:
        "Das Ergebnis kann jetzt verglichen und heruntergeladen werden.",
      cancelled:
        "Die Skalierung wurde abgebrochen. Das Original bleibt verfügbar.",
      retryingSmallerTiles: "Neuer Versuch mit kleineren Kacheln…",
      comparisonLabel: "Vorher-Nachher-Vergleich",
      comparisonHelp: "Bewegen, um Original und Ergebnis zu vergleichen",
      fileTooLarge: "Ein Bild mit höchstens 10 MB auswählen.",
      imageTooLarge:
        "Das Bild ist für das gewählte Modell in diesem Browser zu groß.",
      outputTooLarge: "Die Skalierung überschreitet 4096 px oder 16 Megapixel.",
      invalidImage: "Ein gültiges JPG-/JPEG-, PNG- oder WebP-Bild auswählen.",
      modelFailed:
        "Das geprüfte Modell konnte nicht geladen werden. Verbindung prüfen und erneut versuchen.",
      processingFailed:
        "Dieses Bild konnte nicht skaliert werden. Kompaktmodus oder kleineres Bild versuchen.",
      downloadFailed: "Der Download konnte nicht vorbereitet werden.",
      resultPlaceholder:
        "Das hochskalierte Ergebnis und der Vergleich erscheinen hier.",
    },
    page: {
      title: "Bild-Upscaler (Auflösung)",
      description:
        "Bildauflösung mit einem KI-Modell 2× oder 4× erhöhen, Ergebnis vergleichen und herunterladen.",
      mobileDescription:
        "Ein Bild mit einem KI-Modell im Browser 2× oder 4× hochskalieren.",
      guide:
        "Bild auswählen, Kompakt- oder WebGPU-Qualitätsmodus und 2× oder 4× wählen. Einmaligen Modelldownload bestätigen, Ergebnis vergleichen und als PNG oder JPEG speichern.",
      terms: [
        "Bild hochskalieren",
        "Bildauflösung erhöhen",
        "KI Upscaler",
        "Foto vergrößern",
        "Bild 4x",
      ],
    },
  },
  ja: {
    copy: {
      originalLabel: "元画像",
      resultLabel: "高解像度の結果",
      chooseImage: "画像を選択",
      dropHint: "画像を1枚ここにドロップするか、端末から選択してください。",
      newImage: "別の画像を開く",
      optionsLabel: "高解像度化の設定",
      modeLabel: "AIモデル",
      modeOptions: { fast: "軽量", quality: "高画質" },
      modeHints: {
        fast: "21.4 MB・幅広いブラウザに対応する軽量モデル",
        quality: "52.8 MB・より細かい結果、WebGPU専用",
      },
      qualityUnavailable:
        "高画質モードにはWebGPUが必要なため、このブラウザーでは利用できません。",
      scaleLabel: "拡大率",
      formatLabel: "保存形式",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG品質",
      upscale: "画像を高解像度化",
      cancel: "キャンセル",
      download: "結果をダウンロード",
      ready: "AIモデルと拡大率を選んで高解像度化してください。",
      readingImage: "画像を読み込み中…",
      consentTitle: "このAIモデルをダウンロードしますか？",
      consentBody:
        "{mode}の初回実行時に正確に{size}のモデルをダウンロードします。検証後にブラウザーへ保存され、画像は端末内に残ります。",
      consentNotice:
        "AIは細部を推定します。元画像で失われた画素を正確に復元することはできません。",
      consentConfirm: "モデルを取得して続行",
      downloadingModel: "モデルをダウンロード中…",
      loadingModel: "AIモデルを読み込み中…",
      processingImage: "画像を高解像度化しています…",
      composingImage: "2倍の結果を準備中…",
      completed: "結果を比較してダウンロードできます。",
      cancelled: "処理をキャンセルしました。元画像はそのまま利用できます。",
      retryingSmallerTiles: "小さいタイルで再試行中…",
      comparisonLabel: "元画像と結果の比較",
      comparisonHelp: "動かして元画像と高解像度の結果を比較",
      fileTooLarge: "10 MB以下の画像を選択してください。",
      imageTooLarge: "このブラウザーの選択モデルでは画像が大きすぎます。",
      outputTooLarge: "選択した倍率は4096 pxまたは1600万画素の上限を超えます。",
      invalidImage: "有効なJPG/JPEG、PNG、WebP画像を選択してください。",
      modelFailed:
        "検証済みモデルを読み込めませんでした。接続を確認して再試行してください。",
      processingFailed:
        "この画像を処理できませんでした。軽量モードか小さい画像をお試しください。",
      downloadFailed: "ダウンロード用ファイルを準備できませんでした。",
      resultPlaceholder: "高解像度の結果と比較スライダーがここに表示されます。",
    },
    page: {
      title: "画像アップスケーラー（解像度）",
      description:
        "AIモデルで画像の解像度を2倍または4倍に上げ、比較して結果をダウンロードできます。",
      mobileDescription: "AIモデルで画像を2倍または4倍にアップスケールします。",
      guide:
        "画像を1枚選び、軽量またはWebGPU高画質モデルと2倍・4倍を指定します。初回モデル取得を確認し、比較後にPNGかJPEGで保存してください。",
      terms: [
        "画像 高解像度化",
        "画像 アップスケール",
        "AI アップスケーラー",
        "写真 画質 良くする",
        "画像 4倍",
      ],
    },
  },
  fr: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Résultat agrandi",
      chooseImage: "Choisir une image",
      dropHint: "Déposez une image ici ou choisissez-la sur l’appareil.",
      newImage: "Ouvrir une autre image",
      optionsLabel: "Options d’agrandissement",
      modeLabel: "Modèle d’IA",
      modeOptions: { fast: "Léger", quality: "Qualité" },
      modeHints: {
        fast: "21,4 Mo · modèle léger et largement compatible",
        quality: "52,8 Mo · plus de détails, WebGPU uniquement",
      },
      qualityUnavailable:
        "Le mode Qualité nécessite WebGPU et n’est pas disponible dans ce navigateur.",
      scaleLabel: "Facteur de sortie",
      formatLabel: "Format de téléchargement",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Qualité JPEG",
      upscale: "Agrandir l’image",
      cancel: "Annuler",
      download: "Télécharger le résultat",
      ready: "Choisissez le modèle et le facteur, puis agrandissez l’image.",
      readingImage: "Lecture de l’image…",
      consentTitle: "Télécharger ce modèle d’IA ?",
      consentBody:
        "La première exécution de {mode} télécharge exactement {size} de poids. Le fichier est vérifié et mis en cache; l’image reste sur cet appareil.",
      consentNotice:
        "L’IA estime les détails et ne peut pas retrouver exactement les pixels absents de la source.",
      consentConfirm: "Télécharger et continuer",
      downloadingModel: "Téléchargement du modèle…",
      loadingModel: "Chargement du modèle d’IA…",
      processingImage: "Agrandissement de l’image…",
      composingImage: "Préparation du résultat 2×…",
      completed: "Le résultat est prêt à être comparé et téléchargé.",
      cancelled: "L’agrandissement a été annulé. L’original reste disponible.",
      retryingSmallerTiles: "Nouvel essai avec des tuiles plus petites…",
      comparisonLabel: "Comparaison avant-après",
      comparisonHelp: "Déplacer pour comparer l’original et le résultat",
      fileTooLarge: "Choisissez une image de 10 Mo maximum.",
      imageTooLarge:
        "L’image est trop grande pour le modèle choisi dans ce navigateur.",
      outputTooLarge:
        "Le facteur dépasse la limite de 4096 px ou 16 mégapixels.",
      invalidImage: "Choisissez une image JPG/JPEG, PNG ou WebP valide.",
      modelFailed:
        "Le modèle vérifié n’a pas pu être chargé. Vérifiez la connexion et réessayez.",
      processingFailed:
        "Cette image n’a pas pu être agrandie. Essayez le mode Léger ou une image plus petite.",
      downloadFailed:
        "Le résultat n’a pas pu être préparé pour le téléchargement.",
      resultPlaceholder:
        "Le résultat agrandi et le comparateur apparaîtront ici.",
    },
    page: {
      title: "Agrandisseur d’image (résolution)",
      description:
        "Augmentez la résolution d’une image 2× ou 4× avec un modèle d’IA, comparez puis téléchargez le résultat.",
      mobileDescription:
        "Agrandissez une image 2× ou 4× avec un modèle d’IA dans le navigateur.",
      guide:
        "Choisissez une image, le mode Léger ou Qualité WebGPU et un facteur 2× ou 4×. Confirmez le téléchargement unique, comparez et enregistrez en PNG ou JPEG.",
      terms: [
        "augmenter résolution image",
        "agrandir image IA",
        "améliorer qualité photo",
        "upscaler image",
        "image 4x",
      ],
    },
  },
  "pt-BR": {
    copy: {
      originalLabel: "Original",
      resultLabel: "Resultado ampliado",
      chooseImage: "Escolher imagem",
      dropHint: "Solte uma imagem aqui ou escolha no seu dispositivo.",
      newImage: "Abrir outra imagem",
      optionsLabel: "Opções de ampliação",
      modeLabel: "Modelo de IA",
      modeOptions: { fast: "Leve", quality: "Qualidade" },
      modeHints: {
        fast: "21,4 MB · modelo leve e amplamente compatível",
        quality: "52,8 MB · mais detalhes, somente WebGPU",
      },
      qualityUnavailable:
        "O modo Qualidade exige WebGPU e não está disponível neste navegador.",
      scaleLabel: "Escala de saída",
      formatLabel: "Formato para baixar",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Qualidade JPEG",
      upscale: "Aumentar resolução",
      cancel: "Cancelar",
      download: "Baixar resultado",
      ready: "Escolha o modelo e a escala para ampliar a imagem.",
      readingImage: "Lendo a imagem…",
      consentTitle: "Baixar este modelo de IA?",
      consentBody:
        "A primeira execução de {mode} baixa exatamente {size} de pesos. O arquivo é verificado e fica no cache; a imagem permanece neste dispositivo.",
      consentNotice:
        "A ampliação por IA estima detalhes e não recupera exatamente os pixels ausentes.",
      consentConfirm: "Baixar modelo e continuar",
      downloadingModel: "Baixando o modelo…",
      loadingModel: "Carregando o modelo de IA…",
      processingImage: "Aumentando a imagem…",
      composingImage: "Preparando o resultado 2×…",
      completed: "O resultado está pronto para comparar e baixar.",
      cancelled:
        "A ampliação foi cancelada. A imagem original continua disponível.",
      retryingSmallerTiles: "Tentando novamente com blocos menores…",
      comparisonLabel: "Comparação antes e depois",
      comparisonHelp: "Mova para comparar o original e o resultado",
      fileTooLarge: "Escolha uma imagem de até 10 MB.",
      imageTooLarge:
        "A imagem é grande demais para o modelo escolhido neste navegador.",
      outputTooLarge:
        "A escala ultrapassa o limite de 4096 px ou 16 megapixels.",
      invalidImage: "Escolha uma imagem JPG/JPEG, PNG ou WebP válida.",
      modelFailed:
        "Não foi possível carregar o modelo verificado. Confira a conexão e tente de novo.",
      processingFailed:
        "Não foi possível ampliar esta imagem. Tente o modo Leve ou uma imagem menor.",
      downloadFailed: "Não foi possível preparar o resultado para baixar.",
      resultPlaceholder: "O resultado ampliado e o comparador aparecerão aqui.",
    },
    page: {
      title: "Ampliador de imagem (resolução)",
      description:
        "Aumente a resolução de uma imagem em 2× ou 4× com um modelo de IA, compare e baixe o resultado.",
      mobileDescription:
        "Amplie uma imagem em 2× ou 4× com um modelo de IA no navegador.",
      guide:
        "Escolha uma imagem, o modo Leve ou Qualidade com WebGPU e 2× ou 4×. Confirme o download único, compare e salve em PNG ou JPEG.",
      terms: [
        "aumentar resolução imagem",
        "ampliar imagem IA",
        "melhorar qualidade foto",
        "upscale imagem",
        "imagem 4x",
      ],
    },
  },
  it: {
    copy: {
      originalLabel: "Originale",
      resultLabel: "Risultato ingrandito",
      chooseImage: "Scegli immagine",
      dropHint: "Trascina qui un’immagine o sceglila dal dispositivo.",
      newImage: "Apri un’altra immagine",
      optionsLabel: "Opzioni di ingrandimento",
      modeLabel: "Modello IA",
      modeOptions: { fast: "Leggero", quality: "Qualità" },
      modeHints: {
        fast: "21,4 MB · modello leggero e ampiamente compatibile",
        quality: "52,8 MB · più dettagli, solo WebGPU",
      },
      qualityUnavailable:
        "La modalità Qualità richiede WebGPU e non è disponibile in questo browser.",
      scaleLabel: "Scala di uscita",
      formatLabel: "Formato di download",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Qualità JPEG",
      upscale: "Aumenta risoluzione",
      cancel: "Annulla",
      download: "Scarica risultato",
      ready: "Scegli modello e scala, quindi ingrandisci l’immagine.",
      readingImage: "Lettura dell’immagine…",
      consentTitle: "Scaricare questo modello IA?",
      consentBody:
        "Il primo uso di {mode} scarica esattamente {size} di pesi. Il file viene verificato e salvato nel browser; l’immagine resta sul dispositivo.",
      consentNotice:
        "L’IA stima i dettagli e non può recuperare esattamente i pixel mancanti.",
      consentConfirm: "Scarica e continua",
      downloadingModel: "Download del modello…",
      loadingModel: "Caricamento del modello IA…",
      processingImage: "Ingrandimento dell’immagine…",
      composingImage: "Preparazione del risultato 2×…",
      completed: "Il risultato è pronto da confrontare e scaricare.",
      cancelled: "Ingrandimento annullato. L’originale è ancora disponibile.",
      retryingSmallerTiles: "Nuovo tentativo con riquadri più piccoli…",
      comparisonLabel: "Confronto prima e dopo",
      comparisonHelp: "Sposta per confrontare originale e risultato",
      fileTooLarge: "Scegli un’immagine non superiore a 10 MB.",
      imageTooLarge:
        "L’immagine è troppo grande per il modello scelto in questo browser.",
      outputTooLarge: "La scala supera il limite di 4096 px o 16 megapixel.",
      invalidImage: "Scegli un’immagine JPG/JPEG, PNG o WebP valida.",
      modelFailed:
        "Impossibile caricare il modello verificato. Controlla la connessione e riprova.",
      processingFailed:
        "Impossibile ingrandire l’immagine. Prova Leggero o un’immagine più piccola.",
      downloadFailed: "Impossibile preparare il risultato per il download.",
      resultPlaceholder:
        "Il risultato ingrandito e il confronto appariranno qui.",
    },
    page: {
      title: "Upscaler di immagini (risoluzione)",
      description:
        "Aumenta la risoluzione di un’immagine di 2× o 4× con un modello di IA, confronta e scarica il risultato.",
      mobileDescription:
        "Ingrandisci un’immagine 2× o 4× con un modello di IA nel browser.",
      guide:
        "Scegli un’immagine, Leggero o Qualità WebGPU e 2× o 4×. Conferma il download una tantum, confronta e salva come PNG o JPEG.",
      terms: [
        "aumentare risoluzione immagine",
        "ingrandire immagine IA",
        "migliorare qualità foto",
        "upscaler immagini",
        "immagine 4x",
      ],
    },
  },
  nl: {
    copy: {
      originalLabel: "Origineel",
      resultLabel: "Vergroot resultaat",
      chooseImage: "Afbeelding kiezen",
      dropHint: "Zet hier één afbeelding neer of kies deze op je apparaat.",
      newImage: "Andere afbeelding openen",
      optionsLabel: "Vergrotingsopties",
      modeLabel: "AI-model",
      modeOptions: { fast: "Compact", quality: "Kwaliteit" },
      modeHints: {
        fast: "21,4 MB · compact en breed compatibel model",
        quality: "52,8 MB · meer detail, alleen WebGPU",
      },
      qualityUnavailable:
        "Kwaliteitsmodus vereist WebGPU en is niet beschikbaar in deze browser.",
      scaleLabel: "Uitvoerschaal",
      formatLabel: "Downloadindeling",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG-kwaliteit",
      upscale: "Afbeelding vergroten",
      cancel: "Annuleren",
      download: "Resultaat downloaden",
      ready: "Kies model en schaal en vergroot daarna de afbeelding.",
      readingImage: "Afbeelding wordt gelezen…",
      consentTitle: "Dit AI-model downloaden?",
      consentBody:
        "De eerste uitvoering van {mode} downloadt exact {size} aan modelgewichten. Het bestand wordt gecontroleerd en lokaal gecachet; de afbeelding blijft op dit apparaat.",
      consentNotice:
        "AI-vergroting schat details en kan ontbrekende bronpixels niet exact herstellen.",
      consentConfirm: "Model downloaden en doorgaan",
      downloadingModel: "Model wordt gedownload…",
      loadingModel: "AI-model wordt geladen…",
      processingImage: "Afbeelding wordt vergroot…",
      composingImage: "2×-resultaat wordt voorbereid…",
      completed: "Het resultaat is klaar om te vergelijken en downloaden.",
      cancelled: "Vergroten is geannuleerd. Het origineel blijft beschikbaar.",
      retryingSmallerTiles: "Opnieuw proberen met kleinere tegels…",
      comparisonLabel: "Vergelijking voor en na",
      comparisonHelp: "Beweeg om origineel en resultaat te vergelijken",
      fileTooLarge: "Kies een afbeelding van maximaal 10 MB.",
      imageTooLarge:
        "De afbeelding is te groot voor het gekozen model in deze browser.",
      outputTooLarge: "De schaal overschrijdt 4096 px of 16 megapixels.",
      invalidImage: "Kies een geldige JPG-/JPEG-, PNG- of WebP-afbeelding.",
      modelFailed:
        "Het gecontroleerde model kon niet worden geladen. Controleer de verbinding en probeer opnieuw.",
      processingFailed:
        "Deze afbeelding kon niet worden vergroot. Probeer Compact of een kleinere afbeelding.",
      downloadFailed: "Het resultaat kon niet voor download worden voorbereid.",
      resultPlaceholder:
        "Het vergrote resultaat en de vergelijking verschijnen hier.",
    },
    page: {
      title: "Afbeeldingsvergroter (resolutie)",
      description:
        "Verhoog de resolutie van een afbeelding 2× of 4× met een AI-model, vergelijk en download het resultaat.",
      mobileDescription:
        "Schaal een afbeelding 2× of 4× op met een AI-model in de browser.",
      guide:
        "Kies een afbeelding, Compact of WebGPU Kwaliteit en 2× of 4×. Bevestig de eenmalige download, vergelijk en sla op als PNG of JPEG.",
      terms: [
        "afbeelding vergroten",
        "resolutie verhogen",
        "AI upscaler",
        "foto kwaliteit verbeteren",
        "afbeelding 4x",
      ],
    },
  },
  sv: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Uppskalad bild",
      chooseImage: "Välj bild",
      dropHint: "Släpp en bild här eller välj den på enheten.",
      newImage: "Öppna en annan bild",
      optionsLabel: "Uppskalningsalternativ",
      modeLabel: "AI-modell",
      modeOptions: { fast: "Kompakt", quality: "Kvalitet" },
      modeHints: {
        fast: "21,4 MB · kompakt modell med bred kompatibilitet",
        quality: "52,8 MB · mer detalj, endast WebGPU",
      },
      qualityUnavailable:
        "Kvalitetsläget kräver WebGPU och är inte tillgängligt i denna webbläsare.",
      scaleLabel: "Utdataskala",
      formatLabel: "Nedladdningsformat",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG-kvalitet",
      upscale: "Skala upp bilden",
      cancel: "Avbryt",
      download: "Hämta resultat",
      ready: "Välj modell och skala och skala sedan upp bilden.",
      readingImage: "Läser bilden…",
      consentTitle: "Hämta denna AI-modell?",
      consentBody:
        "Första körningen med {mode} hämtar exakt {size} modellvikter. Filen verifieras och cachelagras; bilden stannar på enheten.",
      consentNotice:
        "AI uppskattar detaljer och kan inte återskapa saknade originalpixlar exakt.",
      consentConfirm: "Hämta modell och fortsätt",
      downloadingModel: "Hämtar modellen…",
      loadingModel: "Läser in AI-modellen…",
      processingImage: "Skalar upp bilden…",
      composingImage: "Förbereder 2×-resultatet…",
      completed: "Resultatet är klart att jämföra och hämta.",
      cancelled: "Uppskalningen avbröts. Originalet finns kvar.",
      retryingSmallerTiles: "Försöker igen med mindre rutor…",
      comparisonLabel: "Jämförelse före och efter",
      comparisonHelp: "Flytta för att jämföra original och resultat",
      fileTooLarge: "Välj en bild på högst 10 MB.",
      imageTooLarge: "Bilden är för stor för vald modell i denna webbläsare.",
      outputTooLarge: "Skalan överskrider 4096 px eller 16 megapixlar.",
      invalidImage: "Välj en giltig JPG-/JPEG-, PNG- eller WebP-bild.",
      modelFailed:
        "Den verifierade modellen kunde inte läsas in. Kontrollera anslutningen och försök igen.",
      processingFailed:
        "Bilden kunde inte skalas upp. Prova Kompakt eller en mindre bild.",
      downloadFailed: "Resultatet kunde inte förberedas för hämtning.",
      resultPlaceholder: "Den uppskalade bilden och jämförelsen visas här.",
    },
    page: {
      title: "Bilduppskalare (upplösning)",
      description:
        "Höj bildupplösningen 2× eller 4× med en AI-modell, jämför och hämta resultatet.",
      mobileDescription:
        "Skala upp en bild 2× eller 4× med en AI-modell i webbläsaren.",
      guide:
        "Välj en bild, Kompakt eller WebGPU Kvalitet och 2× eller 4×. Bekräfta engångshämtningen, jämför och spara som PNG eller JPEG.",
      terms: [
        "skala upp bild",
        "höja bildupplösning",
        "AI uppskalare",
        "förbättra bildkvalitet",
        "bild 4x",
      ],
    },
  },
  cs: {
    copy: {
      originalLabel: "Originál",
      resultLabel: "Zvětšený výsledek",
      chooseImage: "Vybrat obrázek",
      dropHint: "Přetáhněte sem jeden obrázek nebo jej vyberte ze zařízení.",
      newImage: "Otevřít jiný obrázek",
      optionsLabel: "Možnosti zvětšení",
      modeLabel: "Model AI",
      modeOptions: { fast: "Kompaktní", quality: "Kvalitní" },
      modeHints: {
        fast: "21,4 MB · lehký a široce kompatibilní model",
        quality: "52,8 MB · více detailů, jen WebGPU",
      },
      qualityUnavailable:
        "Kvalitní režim vyžaduje WebGPU a v tomto prohlížeči není dostupný.",
      scaleLabel: "Měřítko výstupu",
      formatLabel: "Formát stažení",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Kvalita JPEG",
      upscale: "Zvětšit obrázek",
      cancel: "Zrušit",
      download: "Stáhnout výsledek",
      ready: "Vyberte model a měřítko a potom obrázek zvětšete.",
      readingImage: "Načítání obrázku…",
      consentTitle: "Stáhnout tento model AI?",
      consentBody:
        "Při prvním spuštění {mode} se stáhne přesně {size} vah. Soubor se ověří a uloží do mezipaměti; obrázek zůstane v zařízení.",
      consentNotice:
        "AI detaily odhaduje a nedokáže přesně obnovit chybějící původní pixely.",
      consentConfirm: "Stáhnout model a pokračovat",
      downloadingModel: "Stahování modelu…",
      loadingModel: "Načítání modelu AI…",
      processingImage: "Zvětšování obrázku…",
      composingImage: "Příprava výsledku 2×…",
      completed: "Výsledek je připraven k porovnání a stažení.",
      cancelled: "Zvětšování bylo zrušeno. Originál zůstal dostupný.",
      retryingSmallerTiles: "Nový pokus s menšími dlaždicemi…",
      comparisonLabel: "Porovnání před a po",
      comparisonHelp: "Posunutím porovnáte originál a výsledek",
      fileTooLarge: "Vyberte obrázek do 10 MB.",
      imageTooLarge:
        "Obrázek je pro zvolený model v tomto prohlížeči příliš velký.",
      outputTooLarge: "Měřítko překračuje limit 4096 px nebo 16 megapixelů.",
      invalidImage: "Vyberte platný obrázek JPG/JPEG, PNG nebo WebP.",
      modelFailed:
        "Ověřený model se nepodařilo načíst. Zkontrolujte připojení a zkuste to znovu.",
      processingFailed:
        "Obrázek se nepodařilo zvětšit. Zkuste Kompaktní režim nebo menší obrázek.",
      downloadFailed: "Výsledek se nepodařilo připravit ke stažení.",
      resultPlaceholder: "Zvětšený výsledek a porovnání se zobrazí zde.",
    },
    page: {
      title: "Zvětšení obrázku (rozlišení)",
      description:
        "Zvyšte rozlišení obrázku 2× nebo 4× pomocí modelu AI, porovnejte a stáhněte výsledek.",
      mobileDescription:
        "Zvětšete obrázek 2× nebo 4× pomocí modelu AI v prohlížeči.",
      guide:
        "Vyberte obrázek, Kompaktní nebo WebGPU Kvalitní režim a 2× či 4×. Potvrďte jednorázové stažení, porovnejte a uložte PNG nebo JPEG.",
      terms: [
        "zvětšit obrázek",
        "zvýšit rozlišení",
        "AI upscaler",
        "zlepšit kvalitu fotky",
        "obrázek 4x",
      ],
    },
  },
  pl: {
    copy: {
      originalLabel: "Oryginał",
      resultLabel: "Powiększony wynik",
      chooseImage: "Wybierz obraz",
      dropHint: "Upuść tutaj jeden obraz lub wybierz go z urządzenia.",
      newImage: "Otwórz inny obraz",
      optionsLabel: "Opcje powiększania",
      modeLabel: "Model AI",
      modeOptions: { fast: "Lekki", quality: "Jakość" },
      modeHints: {
        fast: "21,4 MB · lekki i szeroko zgodny model",
        quality: "52,8 MB · więcej szczegółów, tylko WebGPU",
      },
      qualityUnavailable:
        "Tryb Jakość wymaga WebGPU i nie jest dostępny w tej przeglądarce.",
      scaleLabel: "Skala wyjściowa",
      formatLabel: "Format pobierania",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "Jakość JPEG",
      upscale: "Powiększ obraz",
      cancel: "Anuluj",
      download: "Pobierz wynik",
      ready: "Wybierz model i skalę, a następnie powiększ obraz.",
      readingImage: "Odczytywanie obrazu…",
      consentTitle: "Pobrać ten model AI?",
      consentBody:
        "Pierwsze uruchomienie {mode} pobiera dokładnie {size} wag. Plik jest weryfikowany i zapisywany w pamięci przeglądarki; obraz pozostaje na urządzeniu.",
      consentNotice:
        "AI szacuje szczegóły i nie może dokładnie odzyskać brakujących pikseli źródła.",
      consentConfirm: "Pobierz model i kontynuuj",
      downloadingModel: "Pobieranie modelu…",
      loadingModel: "Wczytywanie modelu AI…",
      processingImage: "Powiększanie obrazu…",
      composingImage: "Przygotowywanie wyniku 2×…",
      completed: "Wynik jest gotowy do porównania i pobrania.",
      cancelled: "Powiększanie anulowano. Oryginał jest nadal dostępny.",
      retryingSmallerTiles: "Ponowna próba z mniejszymi kafelkami…",
      comparisonLabel: "Porównanie przed i po",
      comparisonHelp: "Przesuń, aby porównać oryginał i wynik",
      fileTooLarge: "Wybierz obraz o rozmiarze do 10 MB.",
      imageTooLarge:
        "Obraz jest za duży dla wybranego modelu w tej przeglądarce.",
      outputTooLarge: "Skala przekracza limit 4096 px lub 16 megapikseli.",
      invalidImage: "Wybierz prawidłowy obraz JPG/JPEG, PNG lub WebP.",
      modelFailed:
        "Nie udało się wczytać zweryfikowanego modelu. Sprawdź połączenie i spróbuj ponownie.",
      processingFailed:
        "Nie udało się powiększyć obrazu. Wybierz tryb Lekki lub mniejszy obraz.",
      downloadFailed: "Nie udało się przygotować wyniku do pobrania.",
      resultPlaceholder: "Powiększony wynik i porównanie pojawią się tutaj.",
    },
    page: {
      title: "Powiększanie obrazów (rozdzielczość)",
      description:
        "Zwiększ rozdzielczość obrazu 2× lub 4× za pomocą modelu AI, porównaj i pobierz wynik.",
      mobileDescription:
        "Powiększ obraz 2× lub 4× za pomocą modelu AI w przeglądarce.",
      guide:
        "Wybierz obraz, tryb Lekki lub Jakość WebGPU i 2× albo 4×. Potwierdź jednorazowe pobranie, porównaj i zapisz jako PNG lub JPEG.",
      terms: [
        "powiększanie obrazu",
        "zwiększ rozdzielczość",
        "AI upscaler",
        "popraw jakość zdjęcia",
        "obraz 4x",
      ],
    },
  },
  da: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Opskaleret resultat",
      chooseImage: "Vælg billede",
      dropHint: "Slip ét billede her, eller vælg det på din enhed.",
      newImage: "Åbn et andet billede",
      optionsLabel: "Opskaleringsvalg",
      modeLabel: "AI-model",
      modeOptions: { fast: "Let", quality: "Kvalitet" },
      modeHints: {
        fast: "21,4 MB · let model med bred kompatibilitet",
        quality: "52,8 MB · flere detaljer, kun WebGPU",
      },
      qualityUnavailable:
        "Kvalitet kræver WebGPU og er ikke tilgængelig i denne browser.",
      scaleLabel: "Outputskalering",
      formatLabel: "Downloadformat",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG-kvalitet",
      upscale: "Opskaler billede",
      cancel: "Annuller",
      download: "Hent resultat",
      ready: "Vælg model og skalering, og opskaler derefter billedet.",
      readingImage: "Læser billedet…",
      consentTitle: "Hent denne AI-model?",
      consentBody:
        "Første kørsel med {mode} henter præcis {size} modelvægte. Filen verificeres og caches; billedet bliver på enheden.",
      consentNotice:
        "AI anslår detaljer og kan ikke genskabe manglende originalpixels præcist.",
      consentConfirm: "Hent model og fortsæt",
      downloadingModel: "Henter modellen…",
      loadingModel: "Indlæser AI-modellen…",
      processingImage: "Opskalerer billedet…",
      composingImage: "Forbereder 2×-resultatet…",
      completed: "Resultatet er klar til sammenligning og download.",
      cancelled:
        "Opskalering blev annulleret. Originalen er stadig tilgængelig.",
      retryingSmallerTiles: "Prøver igen med mindre felter…",
      comparisonLabel: "Sammenligning før og efter",
      comparisonHelp: "Flyt for at sammenligne original og resultat",
      fileTooLarge: "Vælg et billede på højst 10 MB.",
      imageTooLarge:
        "Billedet er for stort til den valgte model i denne browser.",
      outputTooLarge: "Skaleringen overskrider 4096 px eller 16 megapixel.",
      invalidImage: "Vælg et gyldigt JPG-/JPEG-, PNG- eller WebP-billede.",
      modelFailed:
        "Den verificerede model kunne ikke indlæses. Tjek forbindelsen, og prøv igen.",
      processingFailed:
        "Billedet kunne ikke opskaleres. Prøv Let eller et mindre billede.",
      downloadFailed: "Resultatet kunne ikke gøres klar til download.",
      resultPlaceholder:
        "Det opskalerede resultat og sammenligningen vises her.",
    },
    page: {
      title: "Billedopskalerer (opløsning)",
      description:
        "Øg billedopløsningen 2× eller 4× med en AI-model, sammenlign og hent resultatet.",
      mobileDescription:
        "Opskaler et billede 2× eller 4× med en AI-model i browseren.",
      guide:
        "Vælg et billede, Let eller WebGPU Kvalitet og 2× eller 4×. Bekræft engangsdownload, sammenlign og gem som PNG eller JPEG.",
      terms: [
        "opskaler billede",
        "øg billedopløsning",
        "AI upscaler",
        "forbedr billedkvalitet",
        "billede 4x",
      ],
    },
  },
  no: {
    copy: {
      originalLabel: "Original",
      resultLabel: "Oppskalert resultat",
      chooseImage: "Velg bilde",
      dropHint: "Slipp ett bilde her, eller velg det på enheten.",
      newImage: "Åpne et annet bilde",
      optionsLabel: "Oppskaleringsvalg",
      modeLabel: "AI-modell",
      modeOptions: { fast: "Lett", quality: "Kvalitet" },
      modeHints: {
        fast: "21,4 MB · lett modell med bred kompatibilitet",
        quality: "52,8 MB · flere detaljer, bare WebGPU",
      },
      qualityUnavailable:
        "Kvalitetsmodus krever WebGPU og er ikke tilgjengelig i denne nettleseren.",
      scaleLabel: "Utdataskala",
      formatLabel: "Nedlastingsformat",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG-kvalitet",
      upscale: "Oppskaler bildet",
      cancel: "Avbryt",
      download: "Last ned resultat",
      ready: "Velg modell og skala, og oppskaler deretter bildet.",
      readingImage: "Leser bildet…",
      consentTitle: "Laste ned denne AI-modellen?",
      consentBody:
        "Første kjøring med {mode} laster ned nøyaktig {size} modellvekter. Filen verifiseres og bufres; bildet blir på enheten.",
      consentNotice:
        "AI anslår detaljer og kan ikke gjenopprette manglende originalpiksler nøyaktig.",
      consentConfirm: "Last ned modell og fortsett",
      downloadingModel: "Laster ned modellen…",
      loadingModel: "Laster AI-modellen…",
      processingImage: "Oppskalerer bildet…",
      composingImage: "Forbereder 2×-resultatet…",
      completed: "Resultatet er klart for sammenligning og nedlasting.",
      cancelled:
        "Oppskaleringen ble avbrutt. Originalen er fortsatt tilgjengelig.",
      retryingSmallerTiles: "Prøver igjen med mindre ruter…",
      comparisonLabel: "Sammenligning før og etter",
      comparisonHelp: "Flytt for å sammenligne original og resultat",
      fileTooLarge: "Velg et bilde på maksimalt 10 MB.",
      imageTooLarge:
        "Bildet er for stort for valgt modell i denne nettleseren.",
      outputTooLarge: "Skalaen overskrider 4096 px eller 16 megapiksler.",
      invalidImage: "Velg et gyldig JPG-/JPEG-, PNG- eller WebP-bilde.",
      modelFailed:
        "Den verifiserte modellen kunne ikke lastes. Sjekk tilkoblingen og prøv igjen.",
      processingFailed:
        "Bildet kunne ikke oppskaleres. Prøv Lett eller et mindre bilde.",
      downloadFailed: "Resultatet kunne ikke klargjøres for nedlasting.",
      resultPlaceholder:
        "Det oppskalerte resultatet og sammenligningen vises her.",
    },
    page: {
      title: "Bildeoppskalering (oppløsning)",
      description:
        "Øk bildeoppløsningen 2× eller 4× med en KI-modell, sammenlign og last ned resultatet.",
      mobileDescription:
        "Oppskaler et bilde 2× eller 4× med en KI-modell i nettleseren.",
      guide:
        "Velg et bilde, Lett eller WebGPU Kvalitet og 2× eller 4×. Bekreft engangsnedlastingen, sammenlign og lagre som PNG eller JPEG.",
      terms: [
        "oppskaler bilde",
        "øk bildeoppløsning",
        "AI upscaler",
        "forbedre bildekvalitet",
        "bilde 4x",
      ],
    },
  },
  ar: {
    copy: {
      originalLabel: "الأصل",
      resultLabel: "النتيجة المكبّرة",
      chooseImage: "اختيار صورة",
      dropHint: "أفلت صورة واحدة هنا أو اخترها من جهازك.",
      newImage: "فتح صورة أخرى",
      optionsLabel: "خيارات التكبير",
      modeLabel: "نموذج الذكاء الاصطناعي",
      modeOptions: { fast: "خفيف", quality: "جودة" },
      modeHints: {
        fast: "21.4 MB · نموذج خفيف ومتوافق على نطاق واسع",
        quality: "52.8 MB · تفاصيل أكثر، WebGPU فقط",
      },
      qualityUnavailable:
        "يتطلب وضع الجودة WebGPU وهو غير متاح في هذا المتصفح.",
      scaleLabel: "مقياس الناتج",
      formatLabel: "صيغة التنزيل",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "جودة JPEG",
      upscale: "رفع دقة الصورة",
      cancel: "إلغاء",
      download: "تنزيل النتيجة",
      ready: "اختر النموذج والمقياس ثم ارفع دقة الصورة.",
      readingImage: "جارٍ قراءة الصورة…",
      consentTitle: "تنزيل نموذج الذكاء الاصطناعي هذا؟",
      consentBody:
        "يُنزل التشغيل الأول لوضع {mode} مقدارًا دقيقًا قدره {size} من أوزان النموذج. يُتحقق من الملف ويُخزن في المتصفح، وتبقى الصورة على هذا الجهاز.",
      consentNotice:
        "يقدّر الذكاء الاصطناعي التفاصيل ولا يمكنه استعادة وحدات البكسل المفقودة بدقة.",
      consentConfirm: "تنزيل النموذج والمتابعة",
      downloadingModel: "جارٍ تنزيل النموذج…",
      loadingModel: "جارٍ تحميل نموذج الذكاء الاصطناعي…",
      processingImage: "جارٍ رفع دقة الصورة…",
      composingImage: "جارٍ إعداد نتيجة 2×…",
      completed: "النتيجة جاهزة للمقارنة والتنزيل.",
      cancelled: "أُلغي رفع الدقة. ما زالت الصورة الأصلية متاحة.",
      retryingSmallerTiles: "إعادة المحاولة بمربعات أصغر…",
      comparisonLabel: "مقارنة قبل وبعد",
      comparisonHelp: "حرّك للمقارنة بين الأصل والنتيجة",
      fileTooLarge: "اختر صورة لا تتجاوز 10 MB.",
      imageTooLarge: "الصورة كبيرة جدًا للنموذج المختار في هذا المتصفح.",
      outputTooLarge: "يتجاوز المقياس حد 4096 px أو 16 ميغابكسل.",
      invalidImage: "اختر صورة JPG/JPEG أو PNG أو WebP صالحة.",
      modelFailed:
        "تعذر تحميل النموذج المتحقق منه. تحقق من الاتصال وحاول مجددًا.",
      processingFailed: "تعذر رفع دقة الصورة. جرّب الوضع الخفيف أو صورة أصغر.",
      downloadFailed: "تعذر إعداد النتيجة للتنزيل.",
      resultPlaceholder: "ستظهر النتيجة المكبّرة وأداة المقارنة هنا.",
    },
    page: {
      title: "مكبر الصور (الدقة)",
      description:
        "ارفع دقة الصورة 2× أو 4× باستخدام نموذج ذكاء اصطناعي، ثم قارن النتيجة ونزّلها.",
      mobileDescription: "كبّر صورة 2× أو 4× بنموذج ذكاء اصطناعي داخل المتصفح.",
      guide:
        "اختر صورة والوضع الخفيف أو جودة WebGPU ومقياس 2× أو 4×. وافق على التنزيل لمرة واحدة، ثم قارن واحفظ بصيغة PNG أو JPEG.",
      terms: [
        "تكبير الصور",
        "رفع دقة الصورة",
        "مكبر صور بالذكاء الاصطناعي",
        "تحسين جودة الصورة",
        "تكبير 4x",
      ],
    },
  },
  "zh-TW": {
    copy: {
      originalLabel: "原圖",
      resultLabel: "放大結果",
      chooseImage: "選擇圖片",
      dropHint: "將一張圖片拖到這裡，或從裝置選取。",
      newImage: "開啟其他圖片",
      optionsLabel: "放大設定",
      modeLabel: "AI 模型",
      modeOptions: { fast: "輕量", quality: "高品質" },
      modeHints: {
        fast: "21.4 MB · 廣泛相容的輕量模型",
        quality: "52.8 MB · 更多細節，僅支援 WebGPU",
      },
      qualityUnavailable: "高品質模式需要 WebGPU，此瀏覽器無法使用。",
      scaleLabel: "輸出倍率",
      formatLabel: "下載格式",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG 品質",
      upscale: "提高圖片解析度",
      cancel: "取消",
      download: "下載結果",
      ready: "選擇模型與倍率，然後提高圖片解析度。",
      readingImage: "正在讀取圖片…",
      consentTitle: "下載這個 AI 模型？",
      consentBody:
        "首次執行{mode}會下載正好 {size} 的模型權重。檔案會先驗證再快取於瀏覽器，圖片仍留在此裝置。",
      consentNotice: "AI 放大會推測細節，無法精確還原原圖中已遺失的像素。",
      consentConfirm: "下載模型並繼續",
      downloadingModel: "正在下載模型…",
      loadingModel: "正在載入 AI 模型…",
      processingImage: "正在提高圖片解析度…",
      composingImage: "正在準備 2× 結果…",
      completed: "結果已可比較與下載。",
      cancelled: "已取消處理，原圖仍可使用。",
      retryingSmallerTiles: "正在以較小區塊重試…",
      comparisonLabel: "原圖與結果比較",
      comparisonHelp: "移動以比較原圖與放大結果",
      fileTooLarge: "請選擇不超過 10 MB 的圖片。",
      imageTooLarge: "這張圖片對目前瀏覽器與所選模型而言太大。",
      outputTooLarge: "所選倍率會超過 4096 px 或 1600 萬像素限制。",
      invalidImage: "請選擇有效的 JPG/JPEG、PNG 或 WebP 圖片。",
      modelFailed: "無法載入已驗證的模型，請檢查連線後再試一次。",
      processingFailed: "無法放大這張圖片，請改用輕量模式或較小圖片。",
      downloadFailed: "無法準備下載檔案。",
      resultPlaceholder: "放大結果與比較控制項會顯示在這裡。",
    },
    page: {
      title: "圖片放大工具（解析度）",
      description: "使用 AI 模型將圖片解析度提高 2× 或 4×，比較後下載結果。",
      mobileDescription: "在瀏覽器中使用 AI 模型將圖片放大 2× 或 4×。",
      guide:
        "選擇一張圖片、輕量或 WebGPU 高品質模式，以及 2× 或 4×。確認一次性模型下載後，比較並儲存為 PNG 或 JPEG。",
      terms: [
        "圖片放大",
        "提高圖片解析度",
        "AI 圖片放大",
        "提升照片畫質",
        "圖片 4x",
      ],
    },
  },
  tr: {
    copy: {
      originalLabel: "Orijinal",
      resultLabel: "Büyütülmüş sonuç",
      chooseImage: "Resim seç",
      dropHint: "Bir resmi buraya bırakın veya cihazınızdan seçin.",
      newImage: "Başka resim aç",
      optionsLabel: "Büyütme seçenekleri",
      modeLabel: "Yapay zekâ modeli",
      modeOptions: { fast: "Hafif", quality: "Kaliteli" },
      modeHints: {
        fast: "21,4 MB · geniş uyumlu hafif model",
        quality: "52,8 MB · daha fazla ayrıntı, yalnızca WebGPU",
      },
      qualityUnavailable:
        "Kaliteli mod WebGPU gerektirir ve bu tarayıcıda kullanılamaz.",
      scaleLabel: "Çıkış ölçeği",
      formatLabel: "İndirme biçimi",
      formatOptions: { png: "PNG", jpeg: "JPEG" },
      jpegQualityLabel: "JPEG kalitesi",
      upscale: "Resmi büyüt",
      cancel: "İptal",
      download: "Sonucu indir",
      ready: "Modeli ve ölçeği seçip resmi büyütün.",
      readingImage: "Resim okunuyor…",
      consentTitle: "Bu yapay zekâ modeli indirilsin mi?",
      consentBody:
        "{mode} ilk çalıştırıldığında tam {size} model ağırlığı indirilir. Dosya doğrulanıp tarayıcıda önbelleğe alınır; resim bu cihazda kalır.",
      consentNotice:
        "Yapay zekâ ayrıntıları tahmin eder; eksik kaynak piksellerini tam olarak geri getiremez.",
      consentConfirm: "Modeli indir ve devam et",
      downloadingModel: "Model indiriliyor…",
      loadingModel: "Yapay zekâ modeli yükleniyor…",
      processingImage: "Resim büyütülüyor…",
      composingImage: "2× sonuç hazırlanıyor…",
      completed: "Sonuç karşılaştırmaya ve indirmeye hazır.",
      cancelled: "Büyütme iptal edildi. Orijinal resim kullanılabilir.",
      retryingSmallerTiles: "Daha küçük parçalarla yeniden deneniyor…",
      comparisonLabel: "Önce ve sonra karşılaştırması",
      comparisonHelp: "Orijinal ile sonucu karşılaştırmak için hareket ettirin",
      fileTooLarge: "En fazla 10 MB bir resim seçin.",
      imageTooLarge: "Resim, bu tarayıcıdaki seçili model için çok büyük.",
      outputTooLarge: "Ölçek 4096 px veya 16 megapiksel sınırını aşıyor.",
      invalidImage: "Geçerli bir JPG/JPEG, PNG veya WebP resmi seçin.",
      modelFailed:
        "Doğrulanmış model yüklenemedi. Bağlantıyı kontrol edip yeniden deneyin.",
      processingFailed:
        "Bu resim büyütülemedi. Hafif modu veya daha küçük bir resmi deneyin.",
      downloadFailed: "Sonuç indirme için hazırlanamadı.",
      resultPlaceholder: "Büyütülmüş sonuç ve karşılaştırma burada görünür.",
    },
    page: {
      title: "Resim büyütücü (çözünürlük)",
      description:
        "Resim çözünürlüğünü bir yapay zekâ modeliyle 2× veya 4× artırın, karşılaştırın ve indirin.",
      mobileDescription:
        "Bir resmi yapay zekâ modeliyle tarayıcıda 2× veya 4× büyütün.",
      guide:
        "Bir resim, Hafif veya WebGPU Kaliteli mod ve 2× ya da 4× seçin. Tek seferlik indirmeyi onaylayın, karşılaştırın ve PNG veya JPEG kaydedin.",
      terms: [
        "resim büyütme",
        "resim çözünürlüğü artırma",
        "yapay zekâ upscaler",
        "fotoğraf kalitesi artırma",
        "resim 4x",
      ],
    },
  },
};

export function imageUpscalerFor(locale: Locale): {
  copy: ImageUpscalerCopy;
  page: PageSeed;
} {
  return pack(packs[locale], locale);
}
