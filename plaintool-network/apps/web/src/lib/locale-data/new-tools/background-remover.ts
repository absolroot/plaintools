import type { Locale } from "../../site";
import type { NewToolLocaleSeed } from "./factory";

type BackgroundCopy = NewToolLocaleSeed["background"];
type BackgroundSourceCopy = Omit<BackgroundCopy, "fileTooLarge">;
type BackgroundPage = {
  title: string;
  description: string;
  guide: string;
  terms: readonly string[];
};

type BackgroundLocalePack = { copy: BackgroundCopy; page: BackgroundPage };
type BackgroundSourceLocalePack = {
  copy: BackgroundSourceCopy;
  page: BackgroundPage;
};

const fileTooLarge: Record<Locale, string> = {
  en: "Choose an image no larger than 20 MB.",
  ko: "20MB 이하 이미지를 선택하세요.",
  es: "Elige una imagen de hasta 20 MB.",
  de: "Wähle ein Bild mit höchstens 20 MB aus.",
  ja: "20 MB以下の画像を選択してください。",
  fr: "Choisissez une image de 20 Mo maximum.",
  "pt-BR": "Escolha uma imagem de até 20 MB.",
  it: "Scegli un’immagine non superiore a 20 MB.",
  nl: "Kies een afbeelding van maximaal 20 MB.",
  sv: "Välj en bild på högst 20 MB.",
  cs: "Vyberte obrázek do 20 MB.",
  pl: "Wybierz obraz o rozmiarze do 20 MB.",
  da: "Vælg et billede på højst 20 MB.",
  no: "Velg et bilde på maksimalt 20 MB.",
  ar: "اختر صورة لا تتجاوز 20 MB.",
  "zh-TW": "請選擇不超過 20 MB 的圖片。",
  tr: "En fazla 20 MB bir resim seçin.",
};

type ResultFeatureCopy = Pick<
  BackgroundCopy,
  | "compare"
  | "comparison"
  | "selected"
  | "compareConsentTitle"
  | "compareConsentBody"
  | "compareConsentConfirm"
  | "compareWithoutPrecision"
  | "trim"
  | "restore"
  | "comparing"
  | "compareCompleted"
  | "comparePartial"
  | "trimmed"
  | "trimUnavailable"
  | "completed"
>;

const resultFeatureCopy: Record<Locale, ResultFeatureCopy> = {
  en: {
    compare: "Compare models",
    comparison: "Model comparison",
    selected: "Select a result to download",
    compareConsentTitle: "Include all four models?",
    compareConsentBody:
      "The first comparison may download up to about 180 MB for four models and their runtimes. Files stay in the browser cache, and your image remains on this device.",
    compareConsentConfirm: "Compare all 4",
    compareWithoutPrecision: "Compare the other 3",
    trim: "Fit to subject",
    restore: "Restore original size",
    comparing: "Comparing models…",
    compareCompleted:
      "The comparison results are ready. Select one to download.",
    comparePartial: "Some models failed, but the available results are ready.",
    trimmed: "The canvas now fits the subject with a small margin.",
    trimUnavailable: "No subject area was found to fit.",
    completed:
      "Download it now with no added watermark or paid high-resolution lock.",
  },
  ko: {
    compare: "모델 비교",
    comparison: "모델 비교 결과",
    selected: "결과를 선택해 다운로드하세요",
    compareConsentTitle: "4개 모델을 모두 비교할까요?",
    compareConsentBody:
      "처음 비교할 때 4개 모델과 실행 파일을 합쳐 최대 약 180MB를 받을 수 있습니다. 받은 파일은 브라우저 캐시에 저장되며 이미지는 이 기기를 벗어나지 않습니다.",
    compareConsentConfirm: "4개 모두 비교",
    compareWithoutPrecision: "나머지 3개 비교",
    trim: "여백 맞춤",
    restore: "원래 크기",
    comparing: "모델별 결과를 비교하는 중…",
    compareCompleted:
      "비교 결과가 준비되었습니다. 원하는 결과를 선택해 다운로드하세요.",
    comparePartial:
      "일부 모델은 실패했지만 완성된 결과는 선택해 다운로드할 수 있습니다.",
    trimmed: "피사체에 작은 여백을 더해 이미지 크기를 맞췄습니다.",
    trimUnavailable: "크기를 맞출 피사체 영역을 찾지 못했습니다.",
    completed:
      "별도의 워터마크나 유료 고화질 잠금 없이 바로 다운로드할 수 있습니다.",
  },
  es: {
    compare: "Comparar modelos",
    comparison: "Comparación de modelos",
    selected: "Elige un resultado para descargar",
    compareConsentTitle: "¿Incluir los cuatro modelos?",
    compareConsentBody:
      "La primera comparación puede descargar hasta unos 180 MB entre modelos y entornos. Los archivos quedan en la caché y la imagen permanece en este dispositivo.",
    compareConsentConfirm: "Comparar los 4",
    compareWithoutPrecision: "Comparar los otros 3",
    trim: "Ajustar al sujeto",
    restore: "Restaurar tamaño original",
    comparing: "Comparando modelos…",
    compareCompleted: "Los resultados están listos. Elige uno para descargar.",
    comparePartial:
      "Algunos modelos fallaron, pero los resultados disponibles están listos.",
    trimmed: "El lienzo se ajustó al sujeto con un pequeño margen.",
    trimUnavailable: "No se encontró un área de sujeto para ajustar.",
    completed:
      "Descárgalo sin marca de agua añadida ni bloqueo de alta resolución de pago.",
  },
  de: {
    compare: "Modelle vergleichen",
    comparison: "Modellvergleich",
    selected: "Ergebnis zum Herunterladen auswählen",
    compareConsentTitle: "Alle vier Modelle einbeziehen?",
    compareConsentBody:
      "Beim ersten Vergleich können Modelle und Laufzeiten zusammen bis zu etwa 180 MB laden. Die Dateien bleiben im Browser-Cache und das Bild auf diesem Gerät.",
    compareConsentConfirm: "Alle 4 vergleichen",
    compareWithoutPrecision: "Die anderen 3 vergleichen",
    trim: "An Motiv anpassen",
    restore: "Originalgröße wiederherstellen",
    comparing: "Modelle werden verglichen…",
    compareCompleted:
      "Die Vergleichsergebnisse sind bereit. Wähle eines zum Herunterladen.",
    comparePartial:
      "Einige Modelle sind fehlgeschlagen, die verfügbaren Ergebnisse sind jedoch bereit.",
    trimmed: "Die Arbeitsfläche wurde mit kleinem Rand an das Motiv angepasst.",
    trimUnavailable: "Es wurde kein Motivbereich zum Anpassen gefunden.",
    completed:
      "Jetzt ohne zusätzliches Wasserzeichen oder kostenpflichtige Auflösungssperre herunterladen.",
  },
  ja: {
    compare: "モデルを比較",
    comparison: "モデル比較",
    selected: "ダウンロードする結果を選択",
    compareConsentTitle: "4つのモデルをすべて比較しますか？",
    compareConsentBody:
      "初回比較では、4つのモデルと実行ファイルで最大約180MBをダウンロードする場合があります。ファイルはブラウザのキャッシュに保存され、画像は端末内で処理されます。",
    compareConsentConfirm: "4つすべて比較",
    compareWithoutPrecision: "残りの3つを比較",
    trim: "被写体に合わせる",
    restore: "元のサイズに戻す",
    comparing: "モデルを比較中…",
    compareCompleted:
      "比較結果ができました。ダウンロードする結果を選んでください。",
    comparePartial:
      "一部のモデルは失敗しましたが、完成した結果は選択できます。",
    trimmed: "少し余白を残して被写体にサイズを合わせました。",
    trimUnavailable: "サイズを合わせる被写体領域が見つかりませんでした。",
    completed:
      "追加の透かしや有料の高解像度制限なしで、そのままダウンロードできます。",
  },
  fr: {
    compare: "Comparer les modèles",
    comparison: "Comparaison des modèles",
    selected: "Choisissez un résultat à télécharger",
    compareConsentTitle: "Inclure les quatre modèles ?",
    compareConsentBody:
      "La première comparaison peut télécharger jusqu’à environ 180 Mo pour les modèles et leurs moteurs. Les fichiers restent en cache et l’image reste sur cet appareil.",
    compareConsentConfirm: "Comparer les 4",
    compareWithoutPrecision: "Comparer les 3 autres",
    trim: "Ajuster au sujet",
    restore: "Rétablir la taille d’origine",
    comparing: "Comparaison des modèles…",
    compareCompleted:
      "Les résultats sont prêts. Choisissez-en un à télécharger.",
    comparePartial:
      "Certains modèles ont échoué, mais les résultats disponibles sont prêts.",
    trimmed: "La zone a été ajustée au sujet avec une petite marge.",
    trimUnavailable: "Aucune zone de sujet n’a été trouvée pour l’ajustement.",
    completed:
      "Téléchargez directement, sans filigrane ajouté ni verrou payant sur la haute résolution.",
  },
  "pt-BR": {
    compare: "Comparar modelos",
    comparison: "Comparação de modelos",
    selected: "Escolha um resultado para baixar",
    compareConsentTitle: "Incluir os quatro modelos?",
    compareConsentBody:
      "A primeira comparação pode baixar até cerca de 180 MB entre modelos e mecanismos. Os arquivos ficam no cache e a imagem permanece neste dispositivo.",
    compareConsentConfirm: "Comparar os 4",
    compareWithoutPrecision: "Comparar os outros 3",
    trim: "Ajustar ao objeto",
    restore: "Restaurar tamanho original",
    comparing: "Comparando modelos…",
    compareCompleted: "Os resultados estão prontos. Escolha um para baixar.",
    comparePartial:
      "Alguns modelos falharam, mas os resultados disponíveis estão prontos.",
    trimmed: "A tela foi ajustada ao objeto com uma pequena margem.",
    trimUnavailable: "Nenhuma área de objeto foi encontrada para ajustar.",
    completed:
      "Baixe agora sem marca-d’água adicionada nem bloqueio pago de alta resolução.",
  },
  it: {
    compare: "Confronta modelli",
    comparison: "Confronto modelli",
    selected: "Scegli un risultato da scaricare",
    compareConsentTitle: "Includere tutti e quattro i modelli?",
    compareConsentBody:
      "Il primo confronto può scaricare fino a circa 180 MB tra modelli e runtime. I file restano nella cache e l’immagine rimane su questo dispositivo.",
    compareConsentConfirm: "Confronta tutti e 4",
    compareWithoutPrecision: "Confronta gli altri 3",
    trim: "Adatta al soggetto",
    restore: "Ripristina dimensioni originali",
    comparing: "Confronto dei modelli…",
    compareCompleted: "I risultati sono pronti. Scegline uno da scaricare.",
    comparePartial:
      "Alcuni modelli non sono riusciti, ma i risultati disponibili sono pronti.",
    trimmed: "L’area è stata adattata al soggetto con un piccolo margine.",
    trimUnavailable: "Non è stata trovata un’area del soggetto da adattare.",
    completed:
      "Scarica subito senza filigrana aggiunta o blocco a pagamento dell’alta risoluzione.",
  },
  nl: {
    compare: "Modellen vergelijken",
    comparison: "Modelvergelijking",
    selected: "Kies een resultaat om te downloaden",
    compareConsentTitle: "Alle vier modellen meenemen?",
    compareConsentBody:
      "De eerste vergelijking kan tot ongeveer 180 MB aan modellen en runtimes downloaden. De bestanden blijven in de browsercache en de afbeelding op dit apparaat.",
    compareConsentConfirm: "Alle 4 vergelijken",
    compareWithoutPrecision: "De andere 3 vergelijken",
    trim: "Aan onderwerp aanpassen",
    restore: "Oorspronkelijk formaat",
    comparing: "Modellen vergelijken…",
    compareCompleted: "De resultaten zijn klaar. Kies er een om te downloaden.",
    comparePartial:
      "Enkele modellen mislukten, maar de beschikbare resultaten zijn klaar.",
    trimmed: "Het canvas is met een kleine marge aan het onderwerp aangepast.",
    trimUnavailable: "Er is geen onderwerpgebied gevonden om aan te passen.",
    completed:
      "Download direct zonder toegevoegd watermerk of betaalde vergrendeling van hoge resolutie.",
  },
  sv: {
    compare: "Jämför modeller",
    comparison: "Modelljämförelse",
    selected: "Välj ett resultat att hämta",
    compareConsentTitle: "Ta med alla fyra modeller?",
    compareConsentBody:
      "Den första jämförelsen kan hämta upp till cirka 180 MB för modeller och körmiljöer. Filerna ligger kvar i webbläsarens cache och bilden stannar på enheten.",
    compareConsentConfirm: "Jämför alla 4",
    compareWithoutPrecision: "Jämför de andra 3",
    trim: "Anpassa till motiv",
    restore: "Återställ originalstorlek",
    comparing: "Jämför modeller…",
    compareCompleted: "Resultaten är klara. Välj ett att hämta.",
    comparePartial:
      "Några modeller misslyckades, men tillgängliga resultat är klara.",
    trimmed: "Arbetsytan har anpassats till motivet med en liten marginal.",
    trimUnavailable: "Inget motivområde hittades att anpassa till.",
    completed:
      "Hämta direkt utan tillagd vattenstämpel eller betalspärr för hög upplösning.",
  },
  cs: {
    compare: "Porovnat modely",
    comparison: "Porovnání modelů",
    selected: "Vyberte výsledek ke stažení",
    compareConsentTitle: "Zahrnout všechny čtyři modely?",
    compareConsentBody:
      "První porovnání může stáhnout až přibližně 180 MB modelů a běhových souborů. Soubory zůstanou v mezipaměti a obrázek v tomto zařízení.",
    compareConsentConfirm: "Porovnat všechny 4",
    compareWithoutPrecision: "Porovnat ostatní 3",
    trim: "Přizpůsobit objektu",
    restore: "Obnovit původní velikost",
    comparing: "Porovnávání modelů…",
    compareCompleted: "Výsledky jsou připravené. Vyberte jeden ke stažení.",
    comparePartial:
      "Některé modely selhaly, ale dostupné výsledky jsou připravené.",
    trimmed: "Plátno bylo přizpůsobeno objektu s malým okrajem.",
    trimUnavailable: "Nebyla nalezena oblast objektu k přizpůsobení.",
    completed:
      "Stáhněte ihned bez přidaného vodoznaku nebo placeného zámku vysokého rozlišení.",
  },
  pl: {
    compare: "Porównaj modele",
    comparison: "Porównanie modeli",
    selected: "Wybierz wynik do pobrania",
    compareConsentTitle: "Uwzględnić wszystkie cztery modele?",
    compareConsentBody:
      "Pierwsze porównanie może pobrać do około 180 MB modeli i środowisk. Pliki pozostaną w pamięci podręcznej, a obraz na tym urządzeniu.",
    compareConsentConfirm: "Porównaj wszystkie 4",
    compareWithoutPrecision: "Porównaj pozostałe 3",
    trim: "Dopasuj do obiektu",
    restore: "Przywróć oryginalny rozmiar",
    comparing: "Porównywanie modeli…",
    compareCompleted: "Wyniki są gotowe. Wybierz jeden do pobrania.",
    comparePartial: "Niektóre modele zawiodły, ale dostępne wyniki są gotowe.",
    trimmed: "Obszar dopasowano do obiektu z niewielkim marginesem.",
    trimUnavailable: "Nie znaleziono obszaru obiektu do dopasowania.",
    completed:
      "Pobierz od razu bez dodanego znaku wodnego ani płatnej blokady wysokiej rozdzielczości.",
  },
  da: {
    compare: "Sammenlign modeller",
    comparison: "Modelsammenligning",
    selected: "Vælg et resultat at hente",
    compareConsentTitle: "Medtag alle fire modeller?",
    compareConsentBody:
      "Den første sammenligning kan hente op til cirka 180 MB modeller og runtimefiler. Filerne bliver i browserens cache, og billedet bliver på enheden.",
    compareConsentConfirm: "Sammenlign alle 4",
    compareWithoutPrecision: "Sammenlign de andre 3",
    trim: "Tilpas til motiv",
    restore: "Gendan original størrelse",
    comparing: "Sammenligner modeller…",
    compareCompleted: "Resultaterne er klar. Vælg et at hente.",
    comparePartial:
      "Nogle modeller mislykkedes, men de tilgængelige resultater er klar.",
    trimmed: "Lærredet er tilpasset motivet med en lille margen.",
    trimUnavailable: "Der blev ikke fundet et motivområde at tilpasse.",
    completed:
      "Hent direkte uden tilføjet vandmærke eller betalingslås på høj opløsning.",
  },
  no: {
    compare: "Sammenlign modeller",
    comparison: "Modellsammenligning",
    selected: "Velg et resultat å laste ned",
    compareConsentTitle: "Ta med alle fire modellene?",
    compareConsentBody:
      "Den første sammenligningen kan laste ned opptil rundt 180 MB med modeller og kjørefiler. Filene blir i nettleserbufferen, og bildet blir på enheten.",
    compareConsentConfirm: "Sammenlign alle 4",
    compareWithoutPrecision: "Sammenlign de andre 3",
    trim: "Tilpass til motiv",
    restore: "Gjenopprett original størrelse",
    comparing: "Sammenligner modeller…",
    compareCompleted: "Resultatene er klare. Velg ett å laste ned.",
    comparePartial:
      "Noen modeller mislyktes, men de tilgjengelige resultatene er klare.",
    trimmed: "Lerretet er tilpasset motivet med en liten marg.",
    trimUnavailable: "Fant ikke noe motivområde å tilpasse.",
    completed:
      "Last ned direkte uten ekstra vannmerke eller betalingslås for høy oppløsning.",
  },
  ar: {
    compare: "مقارنة النماذج",
    comparison: "نتائج مقارنة النماذج",
    selected: "اختر نتيجة لتنزيلها",
    compareConsentTitle: "هل تريد تضمين النماذج الأربعة؟",
    compareConsentBody:
      "قد ينزّل أول تشغيل للمقارنة ما يصل إلى نحو 180 م.ب للنماذج وملفات التشغيل. تبقى الملفات في ذاكرة المتصفح وتبقى الصورة على هذا الجهاز.",
    compareConsentConfirm: "مقارنة النماذج الأربعة",
    compareWithoutPrecision: "مقارنة النماذج الثلاثة الأخرى",
    trim: "ملاءمة مع العنصر",
    restore: "استعادة الحجم الأصلي",
    comparing: "جارٍ مقارنة النماذج…",
    compareCompleted: "نتائج المقارنة جاهزة. اختر نتيجة لتنزيلها.",
    comparePartial: "فشلت بعض النماذج، لكن النتائج المتاحة جاهزة.",
    trimmed: "تمت ملاءمة اللوحة مع العنصر مع هامش صغير.",
    trimUnavailable: "لم يتم العثور على منطقة عنصر للملاءمة.",
    completed:
      "يمكنك التنزيل مباشرة بلا علامة مائية مضافة أو قفل مدفوع للدقة العالية.",
  },
  "zh-TW": {
    compare: "比較模型",
    comparison: "模型比較結果",
    selected: "選擇要下載的結果",
    compareConsentTitle: "要包含全部四個模型嗎？",
    compareConsentBody:
      "首次比較可能會下載最多約 180 MB 的模型與執行檔。檔案會保留在瀏覽器快取中，圖片只在此裝置處理。",
    compareConsentConfirm: "比較全部 4 個",
    compareWithoutPrecision: "比較其餘 3 個",
    trim: "貼合主體",
    restore: "恢復原始尺寸",
    comparing: "正在比較模型…",
    compareCompleted: "比較結果已就緒，請選擇一個下載。",
    comparePartial: "部分模型處理失敗，但已完成的結果仍可選擇。",
    trimmed: "已保留少量邊距並將畫布貼合主體。",
    trimUnavailable: "找不到可貼合的主體區域。",
    completed: "無需額外浮水印或付費解鎖高畫質，即可直接下載。",
  },
  tr: {
    compare: "Modelleri karşılaştır",
    comparison: "Model karşılaştırması",
    selected: "İndirmek için bir sonuç seçin",
    compareConsentTitle: "Dört modelin tümü dahil edilsin mi?",
    compareConsentBody:
      "İlk karşılaştırmada modeller ve çalışma dosyaları için yaklaşık 180 MB’a kadar indirme yapılabilir. Dosyalar tarayıcı önbelleğinde, görsel ise bu cihazda kalır.",
    compareConsentConfirm: "4 modeli karşılaştır",
    compareWithoutPrecision: "Diğer 3 modeli karşılaştır",
    trim: "Nesneye sığdır",
    restore: "Özgün boyutu geri yükle",
    comparing: "Modeller karşılaştırılıyor…",
    compareCompleted:
      "Karşılaştırma sonuçları hazır. İndirmek için birini seçin.",
    comparePartial:
      "Bazı modeller başarısız oldu, ancak kullanılabilir sonuçlar hazır.",
    trimmed: "Tuval küçük bir payla nesneye sığdırıldı.",
    trimUnavailable: "Sığdırılacak bir nesne alanı bulunamadı.",
    completed:
      "Ek filigran veya ücretli yüksek çözünürlük kilidi olmadan hemen indirin.",
  },
};

const packs = {
  en: {
    copy: {
      ...resultFeatureCopy.en,
      original: "Original",
      result: "Result",
      uploadHint: "Drop an image here, or choose one from your device.",
      formats: "JPG/JPEG, PNG, or WebP up to 20 MB and 20 megapixels",
      options: "Options",
      model: "AI model",
      fast: "Fast",
      fastHint: "4.6 MB · quicker for clear subjects",
      portrait: "Portrait",
      portraitHint: "6.6 MB · best for people and hair",
      quality: "Quality",
      qualityHint: "44.2 MB · more detail, slower processing",
      precision: "Precision",
      precisionHint: "98.5 MB · WebGPU, strongest general detail",
      precisionUnavailable:
        "Precision requires WebGPU and is unavailable in this browser.",
      precisionConsentTitle: "Use the Precision model?",
      precisionConsentBody:
        "The 98.5 MB model and a roughly 26 MB WebGPU runtime download when you next remove a background, for about 125 MB on first use. They stay in the browser cache, and your image remains on this device.",
      precisionConsentNotice:
        "Precision uses WebGPU and substantially more memory. It may be slower or fail on lower-memory devices; the other models remain available.",
      precisionConsentConfirm: "Use Precision",
      cancel: "Cancel",
      background: "Result background",
      transparent: "Transparent",
      white: "White",
      custom: "Custom color",
      color: "Background color",
      remove: "Remove background",
      newImage: "New image",
      png: "Download PNG",
      reading: "Reading image…",
      downloading: "Downloading AI model…",
      loading: "Loading AI model…",
      processing: "Removing background…",
      scaled: "The image was resized to 4096 px on its longest edge.",
      imageTooLarge: "The decoded image exceeds the 20 megapixel limit.",
      invalid: "Choose a valid JPG/JPEG, PNG, or WebP image.",
      modelFailed:
        "The AI model could not be loaded. Check your connection and try again.",
      processingFailed: "The background could not be removed from this image.",
      downloadFailed: "The PNG could not be prepared for download.",
      resultEmpty: "The cutout appears here after processing.",
    },
    page: {
      title: "Image background remover",
      description:
        "AI detects the subject and removes the background automatically, ready to download as a transparent or solid-color PNG.",
      guide:
        "Choose a PNG, JPEG, or WebP image, select the model that fits your subject, then remove the background. Clear subject boundaries and contrasting backgrounds usually produce the cleanest cutout.",
      terms: [
        "background remover",
        "remove image background",
        "transparent PNG",
        "photo cutout",
      ],
    },
  },
  ko: {
    copy: {
      ...resultFeatureCopy.ko,
      original: "원본",
      result: "결과",
      uploadHint: "이미지를 여기에 놓거나 기기에서 선택하세요.",
      formats: "JPG/JPEG, PNG, WebP · 최대 20MB, 2천만 화소",
      options: "옵션",
      model: "AI 모델",
      fast: "빠른 처리",
      fastHint: "4.6MB · 윤곽이 뚜렷한 피사체에 빠름",
      portrait: "인물",
      portraitHint: "6.6MB · 사람과 머리카락에 적합",
      quality: "고품질",
      qualityHint: "44.2MB · 세부 표현 향상, 처리 시간 증가",
      precision: "정밀",
      precisionHint: "98.5MB · WebGPU, 범용 세부 표현 강화",
      precisionUnavailable:
        "정밀 모델은 WebGPU가 필요해 이 브라우저에서 사용할 수 없습니다.",
      precisionConsentTitle: "정밀 모델을 사용할까요?",
      precisionConsentBody:
        "다음 배경 제거 때 98.5MB 모델과 약 26MB WebGPU 실행 파일을 받아 최초 사용 시 약 125MB가 전송됩니다. 받은 파일은 브라우저 캐시에 저장되며 이미지는 이 기기를 벗어나지 않습니다.",
      precisionConsentNotice:
        "WebGPU와 더 많은 메모리를 사용합니다. 메모리가 적은 기기에서는 느리거나 실패할 수 있으며 다른 모델은 계속 사용할 수 있습니다.",
      precisionConsentConfirm: "정밀 모델 사용",
      cancel: "취소",
      background: "결과 배경",
      transparent: "투명",
      white: "흰색",
      custom: "사용자 색상",
      color: "배경색",
      remove: "배경 제거",
      newImage: "새 이미지",
      png: "PNG 다운로드",
      reading: "이미지를 읽는 중…",
      downloading: "AI 모델을 받는 중…",
      loading: "AI 모델을 불러오는 중…",
      processing: "배경을 제거하는 중…",
      scaled: "긴 변이 4096px가 되도록 이미지를 축소했습니다.",
      imageTooLarge: "압축을 푼 이미지가 2천만 화소 제한을 초과합니다.",
      invalid: "올바른 JPG/JPEG, PNG 또는 WebP 이미지를 선택하세요.",
      modelFailed:
        "AI 모델을 불러오지 못했습니다. 연결을 확인하고 다시 시도하세요.",
      processingFailed: "이 이미지의 배경을 제거하지 못했습니다.",
      downloadFailed: "다운로드할 PNG를 만들지 못했습니다.",
      resultEmpty: "처리가 끝나면 결과가 여기에 표시됩니다.",
    },
    page: {
      title: "이미지 배경 제거",
      description:
        "AI가 피사체를 자동으로 인식해 배경을 제거하고 투명 또는 단색 PNG로 저장합니다.",
      guide:
        "PNG, JPEG 또는 WebP 이미지를 선택하고 피사체에 맞는 모델을 고른 뒤 배경 제거를 실행하세요. 피사체 윤곽과 배경의 대비가 뚜렷할수록 결과가 깔끔합니다.",
      terms: ["배경 제거", "누끼 따기", "투명 PNG", "사진 배경 지우기"],
    },
  },
  es: {
    copy: {
      ...resultFeatureCopy.es,
      original: "Original",
      result: "Resultado",
      uploadHint: "Suelta una imagen aquí o elígela en tu dispositivo.",
      formats: "JPG/JPEG, PNG o WebP de hasta 20 MB y 20 megapíxeles",
      options: "Opciones",
      model: "Modelo de IA",
      fast: "Rápido",
      fastHint: "4,6 MB · más rápido con sujetos definidos",
      portrait: "Retrato",
      portraitHint: "6,6 MB · ideal para personas y cabello",
      quality: "Calidad",
      qualityHint: "44,2 MB · más detalle y más tiempo",
      precision: "Precisión",
      precisionHint: "98,5 MB · WebGPU y máximo detalle general",
      precisionUnavailable:
        "Precisión requiere WebGPU y no está disponible en este navegador.",
      precisionConsentTitle: "¿Usar el modelo Precisión?",
      precisionConsentBody:
        "El modelo de 98,5 MB y un entorno WebGPU de unos 26 MB se descargarán al quitar el próximo fondo: unos 125 MB en el primer uso. Quedarán en la caché y la imagen no saldrá del dispositivo.",
      precisionConsentNotice:
        "Usa WebGPU y bastante más memoria. Puede ser lento o fallar en dispositivos con poca memoria; los demás modelos seguirán disponibles.",
      precisionConsentConfirm: "Usar Precisión",
      cancel: "Cancelar",
      background: "Fondo del resultado",
      transparent: "Transparente",
      white: "Blanco",
      custom: "Color personalizado",
      color: "Color de fondo",
      remove: "Quitar fondo",
      newImage: "Nueva imagen",
      png: "Descargar PNG",
      reading: "Leyendo imagen…",
      downloading: "Descargando el modelo…",
      loading: "Cargando el modelo…",
      processing: "Quitando el fondo…",
      scaled: "La imagen se redujo a 4096 px en su lado más largo.",
      imageTooLarge:
        "La imagen decodificada supera el límite de 20 megapíxeles.",
      invalid: "Elige una imagen JPG/JPEG, PNG o WebP válida.",
      modelFailed:
        "No se pudo cargar el modelo. Comprueba la conexión e inténtalo de nuevo.",
      processingFailed: "No se pudo quitar el fondo de esta imagen.",
      downloadFailed: "No se pudo preparar el PNG para descargar.",
      resultEmpty: "El recorte aparecerá aquí después del procesamiento.",
    },
    page: {
      title: "Eliminador de fondo de imágenes",
      description:
        "La IA detecta el sujeto y elimina el fondo automáticamente para descargarlo como PNG transparente o de color sólido.",
      guide:
        "Elige una imagen PNG, JPEG o WebP, selecciona el modelo adecuado para el sujeto y quita el fondo. Los sujetos bien definidos y con buen contraste suelen dar mejores resultados.",
      terms: [
        "quitar fondo",
        "fondo transparente",
        "PNG transparente",
        "recortar foto",
      ],
    },
  },
  de: {
    copy: {
      ...resultFeatureCopy.de,
      original: "Original",
      result: "Ergebnis",
      uploadHint: "Bild hier ablegen oder vom Gerät auswählen.",
      formats: "JPG/JPEG, PNG oder WebP bis 20 MB und 20 Megapixel",
      options: "Optionen",
      model: "KI-Modell",
      fast: "Schnell",
      fastHint: "4,6 MB · schneller bei klaren Motiven",
      portrait: "Porträt",
      portraitHint: "6,6 MB · für Personen und Haare",
      quality: "Qualität",
      qualityHint: "44,2 MB · mehr Details, langsamere Verarbeitung",
      precision: "Präzision",
      precisionHint: "98,5 MB · WebGPU, höchste allgemeine Details",
      precisionUnavailable:
        "Präzision benötigt WebGPU und ist in diesem Browser nicht verfügbar.",
      precisionConsentTitle: "Präzisionsmodell verwenden?",
      precisionConsentBody:
        "Beim nächsten Freistellen werden das 98,5-MB-Modell und eine etwa 26 MB große WebGPU-Laufzeit geladen, beim ersten Mal also rund 125 MB. Beides bleibt im Browser-Cache; das Bild bleibt auf diesem Gerät.",
      precisionConsentNotice:
        "Es nutzt WebGPU und deutlich mehr Speicher. Auf Geräten mit wenig Speicher kann es langsam sein oder scheitern; die anderen Modelle bleiben verfügbar.",
      precisionConsentConfirm: "Präzision verwenden",
      cancel: "Abbrechen",
      background: "Ergebnishintergrund",
      transparent: "Transparent",
      white: "Weiß",
      custom: "Eigene Farbe",
      color: "Hintergrundfarbe",
      remove: "Hintergrund entfernen",
      newImage: "Neues Bild",
      png: "PNG herunterladen",
      reading: "Bild wird gelesen…",
      downloading: "Modell wird heruntergeladen…",
      loading: "Modell wird geladen…",
      processing: "Hintergrund wird entfernt…",
      scaled: "Die längste Bildkante wurde auf 4096 px verkleinert.",
      imageTooLarge: "Das decodierte Bild überschreitet 20 Megapixel.",
      invalid: "Wähle ein gültiges JPG-/JPEG-, PNG- oder WebP-Bild.",
      modelFailed:
        "Das Modell konnte nicht geladen werden. Verbindung prüfen und erneut versuchen.",
      processingFailed:
        "Der Hintergrund dieses Bildes konnte nicht entfernt werden.",
      downloadFailed: "Das PNG konnte nicht zum Download vorbereitet werden.",
      resultEmpty:
        "Das freigestellte Bild erscheint nach der Verarbeitung hier.",
    },
    page: {
      title: "Bildhintergrund entfernen",
      description:
        "KI erkennt das Motiv und entfernt den Hintergrund automatisch – zum Download als transparentes oder einfarbiges PNG.",
      guide:
        "Wähle ein PNG-, JPEG- oder WebP-Bild, danach ein passendes Modell für dein Motiv, und starte die Freistellung. Klare Motivkanten und deutlicher Kontrast liefern meist das sauberste Ergebnis.",
      terms: [
        "Hintergrund entfernen",
        "Bild freistellen",
        "transparentes PNG",
        "Foto freistellen",
      ],
    },
  },
  ja: {
    copy: {
      ...resultFeatureCopy.ja,
      original: "元画像",
      result: "結果",
      uploadHint: "画像をここにドロップするか、端末から選択してください。",
      formats: "JPG/JPEG・PNG・WebP、最大20 MB・2,000万画素",
      options: "オプション",
      model: "AIモデル",
      fast: "高速",
      fastHint: "4.6 MB・輪郭が明確な被写体向け",
      portrait: "人物",
      portraitHint: "6.6 MB・人物や髪の毛に最適",
      quality: "高品質",
      qualityHint: "44.2 MB・細部を重視、処理は長め",
      precision: "高精度",
      precisionHint: "98.5 MB・WebGPU、汎用の細部を強化",
      precisionUnavailable:
        "高精度モデルにはWebGPUが必要なため、このブラウザーでは利用できません。",
      precisionConsentTitle: "高精度モデルを使用しますか？",
      precisionConsentBody:
        "次回の背景削除時に98.5 MBのモデルと約26 MBのWebGPU実行ファイルをダウンロードするため、初回は合計約125 MBです。ファイルはブラウザーにキャッシュされ、画像は端末外へ送信されません。",
      precisionConsentNotice:
        "WebGPUと多くのメモリを使用します。メモリの少ない端末では遅延または失敗する可能性がありますが、他のモデルは引き続き利用できます。",
      precisionConsentConfirm: "高精度を使用",
      cancel: "キャンセル",
      background: "結果の背景",
      transparent: "透明",
      white: "白",
      custom: "カスタム色",
      color: "背景色",
      remove: "背景を削除",
      newImage: "別の画像",
      png: "PNGをダウンロード",
      reading: "画像を読み込み中…",
      downloading: "モデルをダウンロード中…",
      loading: "モデルを読み込み中…",
      processing: "背景を削除中…",
      scaled: "長辺が4096 pxになるよう縮小しました。",
      imageTooLarge: "展開後の画像が2,000万画素の上限を超えています。",
      invalid: "有効なJPG/JPEG、PNG、WebP画像を選択してください。",
      modelFailed:
        "モデルを読み込めませんでした。接続を確認して再試行してください。",
      processingFailed: "この画像の背景を削除できませんでした。",
      downloadFailed: "ダウンロード用PNGを作成できませんでした。",
      resultEmpty: "処理後の切り抜き結果がここに表示されます。",
    },
    page: {
      title: "画像背景リムーバー",
      description:
        "AIが被写体を自動検出して背景を削除し、透明または単色のPNGで保存します。",
      guide:
        "PNG、JPEG、WebP画像を選び、被写体に合うモデルを指定して背景を削除します。被写体の輪郭と背景のコントラストが明確なほどきれいに切り抜けます。",
      terms: ["背景削除", "画像切り抜き", "透過PNG", "写真背景"],
    },
  },
  fr: {
    copy: {
      ...resultFeatureCopy.fr,
      original: "Original",
      result: "Résultat",
      uploadHint: "Déposez une image ici ou choisissez-la sur votre appareil.",
      formats: "JPG/JPEG, PNG ou WebP, 20 Mo et 20 mégapixels maximum",
      options: "Options",
      model: "Modèle d’IA",
      fast: "Rapide",
      fastHint: "4,6 Mo · rapide pour les sujets nets",
      portrait: "Portrait",
      portraitHint: "6,6 Mo · adapté aux personnes et aux cheveux",
      quality: "Qualité",
      qualityHint: "44,2 Mo · plus de détails, traitement plus lent",
      precision: "Précision",
      precisionHint: "98,5 Mo · WebGPU, détails généraux renforcés",
      precisionUnavailable:
        "Précision nécessite WebGPU et n’est pas disponible dans ce navigateur.",
      precisionConsentTitle: "Utiliser le modèle Précision ?",
      precisionConsentBody:
        "Le modèle de 98,5 Mo et un moteur WebGPU d’environ 26 Mo seront téléchargés au prochain détourage, soit environ 125 Mo au premier usage. Ils resteront en cache et l’image restera sur cet appareil.",
      precisionConsentNotice:
        "Il utilise WebGPU et beaucoup plus de mémoire. Il peut ralentir ou échouer sur un appareil peu doté ; les autres modèles restent disponibles.",
      precisionConsentConfirm: "Utiliser Précision",
      cancel: "Annuler",
      background: "Arrière-plan du résultat",
      transparent: "Transparent",
      white: "Blanc",
      custom: "Couleur personnalisée",
      color: "Couleur d’arrière-plan",
      remove: "Supprimer l’arrière-plan",
      newImage: "Nouvelle image",
      png: "Télécharger le PNG",
      reading: "Lecture de l’image…",
      downloading: "Téléchargement du modèle…",
      loading: "Chargement du modèle…",
      processing: "Suppression de l’arrière-plan…",
      scaled: "Le côté le plus long a été réduit à 4096 px.",
      imageTooLarge: "L’image décodée dépasse la limite de 20 mégapixels.",
      invalid: "Choisissez une image JPG/JPEG, PNG ou WebP valide.",
      modelFailed:
        "Impossible de charger le modèle. Vérifiez la connexion et réessayez.",
      processingFailed:
        "Impossible de supprimer l’arrière-plan de cette image.",
      downloadFailed: "Impossible de préparer le PNG à télécharger.",
      resultEmpty: "L’image détourée apparaîtra ici après le traitement.",
    },
    page: {
      title: "Suppresseur d’arrière-plan d’image",
      description:
        "L’IA détecte le sujet et supprime automatiquement l’arrière-plan pour produire un PNG transparent ou uni.",
      guide:
        "Choisissez une image PNG, JPEG ou WebP, sélectionnez le modèle adapté au sujet, puis supprimez l’arrière-plan. Des contours nets et un bon contraste donnent généralement le meilleur détourage.",
      terms: [
        "supprimer arrière-plan",
        "détourage image",
        "PNG transparent",
        "détourer photo",
      ],
    },
  },
  "pt-BR": {
    copy: {
      ...resultFeatureCopy["pt-BR"],
      original: "Original",
      result: "Resultado",
      uploadHint: "Solte uma imagem aqui ou escolha uma no dispositivo.",
      formats: "JPG/JPEG, PNG ou WebP de até 20 MB e 20 megapixels",
      options: "Opções",
      model: "Modelo de IA",
      fast: "Rápido",
      fastHint: "4,6 MB · mais rápido para objetos nítidos",
      portrait: "Retrato",
      portraitHint: "6,6 MB · ideal para pessoas e cabelos",
      quality: "Qualidade",
      qualityHint: "44,2 MB · mais detalhes e processamento mais lento",
      precision: "Precisão",
      precisionHint: "98,5 MB · WebGPU e maior detalhe geral",
      precisionUnavailable:
        "Precisão exige WebGPU e não está disponível neste navegador.",
      precisionConsentTitle: "Usar o modelo Precisão?",
      precisionConsentBody:
        "O modelo de 98,5 MB e um runtime WebGPU de cerca de 26 MB serão baixados na próxima remoção, totalizando cerca de 125 MB no primeiro uso. Eles ficarão no cache e a imagem permanecerá neste dispositivo.",
      precisionConsentNotice:
        "Ele usa WebGPU e bem mais memória. Pode ficar lento ou falhar em dispositivos com pouca memória; os outros modelos continuam disponíveis.",
      precisionConsentConfirm: "Usar Precisão",
      cancel: "Cancelar",
      background: "Fundo do resultado",
      transparent: "Transparente",
      white: "Branco",
      custom: "Cor personalizada",
      color: "Cor de fundo",
      remove: "Remover fundo",
      newImage: "Nova imagem",
      png: "Baixar PNG",
      reading: "Lendo imagem…",
      downloading: "Baixando o modelo…",
      loading: "Carregando o modelo…",
      processing: "Removendo o fundo…",
      scaled: "A imagem foi reduzida para 4096 px no lado maior.",
      imageTooLarge: "A imagem decodificada excede 20 megapixels.",
      invalid: "Escolha uma imagem JPG/JPEG, PNG ou WebP válida.",
      modelFailed:
        "Não foi possível carregar o modelo. Verifique a conexão e tente novamente.",
      processingFailed: "Não foi possível remover o fundo desta imagem.",
      downloadFailed: "Não foi possível preparar o PNG para download.",
      resultEmpty: "O recorte aparecerá aqui após o processamento.",
    },
    page: {
      title: "Removedor de fundo de imagem",
      description:
        "A IA identifica o elemento principal e remove o fundo automaticamente para gerar um PNG transparente ou com cor sólida.",
      guide:
        "Escolha uma imagem PNG, JPEG ou WebP, selecione o modelo adequado ao objeto e remova o fundo. Objetos bem definidos e com bom contraste costumam produzir o melhor recorte.",
      terms: [
        "remover fundo",
        "fundo transparente",
        "PNG transparente",
        "recortar foto",
      ],
    },
  },
  it: {
    copy: {
      ...resultFeatureCopy.it,
      original: "Originale",
      result: "Risultato",
      uploadHint: "Trascina qui un’immagine o sceglila dal dispositivo.",
      formats: "JPG/JPEG, PNG o WebP fino a 20 MB e 20 megapixel",
      options: "Opzioni",
      model: "Modello IA",
      fast: "Veloce",
      fastHint: "4,6 MB · rapido con soggetti ben definiti",
      portrait: "Ritratto",
      portraitHint: "6,6 MB · ideale per persone e capelli",
      quality: "Qualità",
      qualityHint: "44,2 MB · più dettagli, elaborazione più lenta",
      precision: "Precisione",
      precisionHint: "98,5 MB · WebGPU, massimo dettaglio generale",
      precisionUnavailable:
        "Precisione richiede WebGPU e non è disponibile in questo browser.",
      precisionConsentTitle: "Usare il modello Precisione?",
      precisionConsentBody:
        "Il modello da 98,5 MB e un runtime WebGPU di circa 26 MB verranno scaricati alla prossima rimozione, per circa 125 MB al primo utilizzo. Resteranno nella cache e l’immagine rimarrà sul dispositivo.",
      precisionConsentNotice:
        "Usa WebGPU e molta più memoria. Può rallentare o non riuscire sui dispositivi con poca memoria; gli altri modelli restano disponibili.",
      precisionConsentConfirm: "Usa Precisione",
      cancel: "Annulla",
      background: "Sfondo del risultato",
      transparent: "Trasparente",
      white: "Bianco",
      custom: "Colore personalizzato",
      color: "Colore di sfondo",
      remove: "Rimuovi sfondo",
      newImage: "Nuova immagine",
      png: "Scarica PNG",
      reading: "Lettura dell’immagine…",
      downloading: "Download del modello…",
      loading: "Caricamento del modello…",
      processing: "Rimozione dello sfondo…",
      scaled: "Il lato più lungo è stato ridotto a 4096 px.",
      imageTooLarge: "L’immagine decodificata supera 20 megapixel.",
      invalid: "Scegli un’immagine JPG/JPEG, PNG o WebP valida.",
      modelFailed:
        "Impossibile caricare il modello. Controlla la connessione e riprova.",
      processingFailed: "Impossibile rimuovere lo sfondo da questa immagine.",
      downloadFailed: "Impossibile preparare il PNG per il download.",
      resultEmpty: "Il ritaglio apparirà qui dopo l’elaborazione.",
    },
    page: {
      title: "Rimozione sfondo immagine",
      description:
        "L’IA rileva il soggetto e rimuove automaticamente lo sfondo per creare un PNG trasparente o a tinta unita.",
      guide:
        "Scegli un’immagine PNG, JPEG o WebP, seleziona il modello adatto al soggetto e rimuovi lo sfondo. Contorni netti e buon contrasto producono in genere il ritaglio migliore.",
      terms: [
        "rimuovi sfondo",
        "scontorno immagine",
        "PNG trasparente",
        "ritaglia foto",
      ],
    },
  },
  nl: {
    copy: {
      ...resultFeatureCopy.nl,
      original: "Origineel",
      result: "Resultaat",
      uploadHint:
        "Sleep een afbeelding hierheen of kies er een op je apparaat.",
      formats: "JPG/JPEG, PNG of WebP tot 20 MB en 20 megapixel",
      options: "Opties",
      model: "AI-model",
      fast: "Snel",
      fastHint: "4,6 MB · sneller bij duidelijke onderwerpen",
      portrait: "Portret",
      portraitHint: "6,6 MB · geschikt voor mensen en haar",
      quality: "Kwaliteit",
      qualityHint: "44,2 MB · meer detail, langzamere verwerking",
      precision: "Precisie",
      precisionHint: "98,5 MB · WebGPU, meeste algemene details",
      precisionUnavailable:
        "Precisie vereist WebGPU en is niet beschikbaar in deze browser.",
      precisionConsentTitle: "Het Precisiemodel gebruiken?",
      precisionConsentBody:
        "Het model van 98,5 MB en een WebGPU-runtime van ongeveer 26 MB worden bij de volgende verwijdering gedownload: circa 125 MB bij het eerste gebruik. Ze blijven in de cache en de afbeelding blijft op dit apparaat.",
      precisionConsentNotice:
        "Het gebruikt WebGPU en veel meer geheugen. Op apparaten met weinig geheugen kan het traag zijn of mislukken; de andere modellen blijven beschikbaar.",
      precisionConsentConfirm: "Precisie gebruiken",
      cancel: "Annuleren",
      background: "Achtergrond resultaat",
      transparent: "Transparant",
      white: "Wit",
      custom: "Eigen kleur",
      color: "Achtergrondkleur",
      remove: "Achtergrond verwijderen",
      newImage: "Nieuwe afbeelding",
      png: "PNG downloaden",
      reading: "Afbeelding lezen…",
      downloading: "Model downloaden…",
      loading: "Model laden…",
      processing: "Achtergrond verwijderen…",
      scaled: "De langste zijde is verkleind tot 4096 px.",
      imageTooLarge: "De gedecodeerde afbeelding is groter dan 20 megapixel.",
      invalid: "Kies een geldige JPG-/JPEG-, PNG- of WebP-afbeelding.",
      modelFailed:
        "Het model kon niet worden geladen. Controleer de verbinding en probeer opnieuw.",
      processingFailed:
        "De achtergrond van deze afbeelding kon niet worden verwijderd.",
      downloadFailed: "De PNG kon niet worden voorbereid voor downloaden.",
      resultEmpty: "De vrijstaande afbeelding verschijnt hier na verwerking.",
    },
    page: {
      title: "Afbeeldingsachtergrond verwijderen",
      description:
        "AI herkent het onderwerp en verwijdert de achtergrond automatisch voor een transparante of effen PNG.",
      guide:
        "Kies een PNG-, JPEG- of WebP-afbeelding, selecteer het model dat bij het onderwerp past en verwijder de achtergrond. Duidelijke randen en goed contrast geven meestal het beste resultaat.",
      terms: [
        "achtergrond verwijderen",
        "afbeelding vrijstaand",
        "transparante PNG",
        "foto uitsnijden",
      ],
    },
  },
  sv: {
    copy: {
      ...resultFeatureCopy.sv,
      original: "Original",
      result: "Resultat",
      uploadHint: "Släpp en bild här eller välj en från enheten.",
      formats: "JPG/JPEG, PNG eller WebP upp till 20 MB och 20 megapixel",
      options: "Alternativ",
      model: "AI-modell",
      fast: "Snabb",
      fastHint: "4,6 MB · snabbare för tydliga motiv",
      portrait: "Porträtt",
      portraitHint: "6,6 MB · bäst för personer och hår",
      quality: "Kvalitet",
      qualityHint: "44,2 MB · fler detaljer, långsammare",
      precision: "Precision",
      precisionHint: "98,5 MB · WebGPU, mest allmän detalj",
      precisionUnavailable:
        "Precision kräver WebGPU och är inte tillgänglig i den här webbläsaren.",
      precisionConsentTitle: "Använda modellen Precision?",
      precisionConsentBody:
        "Modellen på 98,5 MB och en WebGPU-körmiljö på cirka 26 MB hämtas vid nästa borttagning, totalt cirka 125 MB första gången. De sparas i cache och bilden stannar på enheten.",
      precisionConsentNotice:
        "Den använder WebGPU och betydligt mer minne. Den kan vara långsam eller misslyckas på enheter med lite minne; övriga modeller finns kvar.",
      precisionConsentConfirm: "Använd Precision",
      cancel: "Avbryt",
      background: "Resultatbakgrund",
      transparent: "Transparent",
      white: "Vit",
      custom: "Egen färg",
      color: "Bakgrundsfärg",
      remove: "Ta bort bakgrund",
      newImage: "Ny bild",
      png: "Hämta PNG",
      reading: "Läser bilden…",
      downloading: "Hämtar modellen…",
      loading: "Läser in modellen…",
      processing: "Tar bort bakgrunden…",
      scaled: "Bildens längsta sida minskades till 4096 px.",
      imageTooLarge: "Den avkodade bilden överstiger 20 megapixel.",
      invalid: "Välj en giltig JPG-/JPEG-, PNG- eller WebP-bild.",
      modelFailed:
        "Modellen kunde inte läsas in. Kontrollera anslutningen och försök igen.",
      processingFailed: "Bakgrunden kunde inte tas bort från bilden.",
      downloadFailed: "PNG-filen kunde inte förberedas för hämtning.",
      resultEmpty: "Den frilagda bilden visas här efter bearbetning.",
    },
    page: {
      title: "Ta bort bildbakgrund",
      description:
        "AI känner igen motivet och tar bort bakgrunden automatiskt för en transparent eller enfärgad PNG.",
      guide:
        "Välj en PNG-, JPEG- eller WebP-bild, välj modellen som passar motivet och ta bort bakgrunden. Tydliga motivkanter och god kontrast ger oftast bäst resultat.",
      terms: [
        "ta bort bakgrund",
        "frilägg bild",
        "transparent PNG",
        "klipp ut foto",
      ],
    },
  },
  cs: {
    copy: {
      ...resultFeatureCopy.cs,
      original: "Originál",
      result: "Výsledek",
      uploadHint: "Přetáhněte obrázek sem nebo jej vyberte ze zařízení.",
      formats: "JPG/JPEG, PNG nebo WebP do 20 MB a 20 megapixelů",
      options: "Možnosti",
      model: "Model AI",
      fast: "Rychlý",
      fastHint: "4,6 MB · rychlejší pro výrazné objekty",
      portrait: "Portrét",
      portraitHint: "6,6 MB · vhodný pro osoby a vlasy",
      quality: "Kvalitní",
      qualityHint: "44,2 MB · více detailů, pomalejší zpracování",
      precision: "Přesný",
      precisionHint: "98,5 MB · WebGPU, nejvíce obecných detailů",
      precisionUnavailable:
        "Přesný model vyžaduje WebGPU a v tomto prohlížeči není dostupný.",
      precisionConsentTitle: "Použít Přesný model?",
      precisionConsentBody:
        "Při příštím odstranění se stáhne model o velikosti 98,5 MB a prostředí WebGPU o velikosti přibližně 26 MB, tedy při prvním použití asi 125 MB. Soubory zůstanou v mezipaměti a obrázek v zařízení.",
      precisionConsentNotice:
        "Používá WebGPU a výrazně více paměti. Na slabších zařízeních může být pomalý nebo selhat; ostatní modely zůstanou dostupné.",
      precisionConsentConfirm: "Použít Přesný",
      cancel: "Zrušit",
      background: "Pozadí výsledku",
      transparent: "Průhledné",
      white: "Bílé",
      custom: "Vlastní barva",
      color: "Barva pozadí",
      remove: "Odstranit pozadí",
      newImage: "Nový obrázek",
      png: "Stáhnout PNG",
      reading: "Načítání obrázku…",
      downloading: "Stahování modelu…",
      loading: "Načítání modelu…",
      processing: "Odstraňování pozadí…",
      scaled: "Delší strana obrázku byla zmenšena na 4096 px.",
      imageTooLarge: "Dekódovaný obrázek překračuje 20 megapixelů.",
      invalid: "Vyberte platný obrázek JPG/JPEG, PNG nebo WebP.",
      modelFailed:
        "Model se nepodařilo načíst. Zkontrolujte připojení a zkuste to znovu.",
      processingFailed: "Pozadí tohoto obrázku se nepodařilo odstranit.",
      downloadFailed: "PNG se nepodařilo připravit ke stažení.",
      resultEmpty: "Výřez se po zpracování zobrazí zde.",
    },
    page: {
      title: "Odstranění pozadí obrázku",
      description:
        "AI rozpozná hlavní objekt a automaticky odstraní pozadí. Výsledek stáhnete jako průhledné nebo jednobarevné PNG.",
      guide:
        "Vyberte obrázek PNG, JPEG nebo WebP, zvolte model vhodný pro daný objekt a odstraňte pozadí. Nejlépe fungují jasné obrysy a kontrastní pozadí.",
      terms: [
        "odstranit pozadí",
        "výřez obrázku",
        "průhledné PNG",
        "ořez fotografie",
      ],
    },
  },
  pl: {
    copy: {
      ...resultFeatureCopy.pl,
      original: "Oryginał",
      result: "Wynik",
      uploadHint: "Upuść obraz tutaj lub wybierz go z urządzenia.",
      formats: "JPG/JPEG, PNG lub WebP do 20 MB i 20 megapikseli",
      options: "Opcje",
      model: "Model AI",
      fast: "Szybki",
      fastHint: "4,6 MB · szybciej dla wyraźnych obiektów",
      portrait: "Portret",
      portraitHint: "6,6 MB · najlepszy dla osób i włosów",
      quality: "Jakość",
      qualityHint: "44,2 MB · więcej szczegółów, wolniej",
      precision: "Precyzyjny",
      precisionHint: "98,5 MB · WebGPU, najwięcej ogólnych detali",
      precisionUnavailable:
        "Model Precyzyjny wymaga WebGPU i nie jest dostępny w tej przeglądarce.",
      precisionConsentTitle: "Użyć modelu Precyzyjnego?",
      precisionConsentBody:
        "Przy następnym usuwaniu zostaną pobrane model 98,5 MB i środowisko WebGPU około 26 MB, czyli około 125 MB przy pierwszym użyciu. Pliki pozostaną w pamięci podręcznej, a obraz na urządzeniu.",
      precisionConsentNotice:
        "Używa WebGPU i znacznie więcej pamięci. Na słabszych urządzeniach może działać wolno lub zawieść; pozostałe modele nadal będą dostępne.",
      precisionConsentConfirm: "Użyj Precyzyjnego",
      cancel: "Anuluj",
      background: "Tło wyniku",
      transparent: "Przezroczyste",
      white: "Białe",
      custom: "Własny kolor",
      color: "Kolor tła",
      remove: "Usuń tło",
      newImage: "Nowy obraz",
      png: "Pobierz PNG",
      reading: "Odczytywanie obrazu…",
      downloading: "Pobieranie modelu…",
      loading: "Wczytywanie modelu…",
      processing: "Usuwanie tła…",
      scaled: "Dłuższy bok obrazu zmniejszono do 4096 px.",
      imageTooLarge: "Zdekodowany obraz przekracza 20 megapikseli.",
      invalid: "Wybierz prawidłowy obraz JPG/JPEG, PNG lub WebP.",
      modelFailed:
        "Nie udało się wczytać modelu. Sprawdź połączenie i spróbuj ponownie.",
      processingFailed: "Nie udało się usunąć tła z tego obrazu.",
      downloadFailed: "Nie udało się przygotować pliku PNG do pobrania.",
      resultEmpty: "Wycięty obraz pojawi się tutaj po przetworzeniu.",
    },
    page: {
      title: "Usuwanie tła obrazu",
      description:
        "AI rozpoznaje główny obiekt i automatycznie usuwa tło. Wynik pobierzesz jako przezroczysty lub jednokolorowy plik PNG.",
      guide:
        "Wybierz obraz PNG, JPEG lub WebP, ustaw model odpowiedni do obiektu i usuń tło. Wyraźne krawędzie oraz kontrastowe tło zwykle dają najlepszy wynik.",
      terms: [
        "usuń tło",
        "wycinanie obrazu",
        "przezroczysty PNG",
        "wytnij zdjęcie",
      ],
    },
  },
  da: {
    copy: {
      ...resultFeatureCopy.da,
      original: "Original",
      result: "Resultat",
      uploadHint: "Slip et billede her, eller vælg et fra enheden.",
      formats: "JPG/JPEG, PNG eller WebP op til 20 MB og 20 megapixel",
      options: "Indstillinger",
      model: "AI-model",
      fast: "Hurtig",
      fastHint: "4,6 MB · hurtigere til tydelige motiver",
      portrait: "Portræt",
      portraitHint: "6,6 MB · bedst til personer og hår",
      quality: "Kvalitet",
      qualityHint: "44,2 MB · flere detaljer, langsommere",
      precision: "Præcision",
      precisionHint: "98,5 MB · WebGPU, flest generelle detaljer",
      precisionUnavailable:
        "Præcision kræver WebGPU og er ikke tilgængelig i denne browser.",
      precisionConsentTitle: "Brug modellen Præcision?",
      precisionConsentBody:
        "Modellen på 98,5 MB og en WebGPU-kørselspakke på cirka 26 MB hentes ved næste fjernelse, i alt cirka 125 MB første gang. De gemmes i cachen, og billedet bliver på enheden.",
      precisionConsentNotice:
        "Den bruger WebGPU og væsentligt mere hukommelse. Den kan være langsom eller fejle på enheder med lidt hukommelse; de andre modeller er fortsat tilgængelige.",
      precisionConsentConfirm: "Brug Præcision",
      cancel: "Annuller",
      background: "Resultatets baggrund",
      transparent: "Gennemsigtig",
      white: "Hvid",
      custom: "Egen farve",
      color: "Baggrundsfarve",
      remove: "Fjern baggrund",
      newImage: "Nyt billede",
      png: "Hent PNG",
      reading: "Læser billedet…",
      downloading: "Henter modellen…",
      loading: "Indlæser modellen…",
      processing: "Fjerner baggrunden…",
      scaled: "Billedets længste side blev reduceret til 4096 px.",
      imageTooLarge: "Det afkodede billede overstiger 20 megapixel.",
      invalid: "Vælg et gyldigt JPG-/JPEG-, PNG- eller WebP-billede.",
      modelFailed:
        "Modellen kunne ikke indlæses. Kontrollér forbindelsen, og prøv igen.",
      processingFailed: "Baggrunden kunne ikke fjernes fra dette billede.",
      downloadFailed: "PNG-filen kunne ikke gøres klar til hentning.",
      resultEmpty: "Det fritlagte billede vises her efter behandlingen.",
    },
    page: {
      title: "Fjern billedbaggrund",
      description:
        "AI genkender motivet og fjerner automatisk baggrunden, så du kan hente en gennemsigtig eller ensfarvet PNG.",
      guide:
        "Vælg et PNG-, JPEG- eller WebP-billede, vælg modellen der passer til motivet, og fjern baggrunden. Tydelige kanter og god kontrast giver normalt det bedste resultat.",
      terms: [
        "fjern baggrund",
        "fritlæg billede",
        "gennemsigtig PNG",
        "klip foto ud",
      ],
    },
  },
  no: {
    copy: {
      ...resultFeatureCopy.no,
      original: "Original",
      result: "Resultat",
      uploadHint: "Slipp et bilde her, eller velg et fra enheten.",
      formats: "JPG/JPEG, PNG eller WebP opptil 20 MB og 20 megapiksler",
      options: "Alternativer",
      model: "AI-modell",
      fast: "Rask",
      fastHint: "4,6 MB · raskere for tydelige motiver",
      portrait: "Portrett",
      portraitHint: "6,6 MB · best for personer og hår",
      quality: "Kvalitet",
      qualityHint: "44,2 MB · flere detaljer, tregere behandling",
      precision: "Presisjon",
      precisionHint: "98,5 MB · WebGPU, mest generell detalj",
      precisionUnavailable:
        "Presisjon krever WebGPU og er ikke tilgjengelig i denne nettleseren.",
      precisionConsentTitle: "Bruke modellen Presisjon?",
      precisionConsentBody:
        "Modellen på 98,5 MB og en WebGPU-kjørepakke på omtrent 26 MB lastes ned ved neste fjerning, totalt omtrent 125 MB første gang. De lagres i hurtigbufferen, og bildet forblir på enheten.",
      precisionConsentNotice:
        "Den bruker WebGPU og betydelig mer minne. Den kan være treg eller mislykkes på enheter med lite minne; de andre modellene er fortsatt tilgjengelige.",
      precisionConsentConfirm: "Bruk Presisjon",
      cancel: "Avbryt",
      background: "Resultatbakgrunn",
      transparent: "Gjennomsiktig",
      white: "Hvit",
      custom: "Egendefinert farge",
      color: "Bakgrunnsfarge",
      remove: "Fjern bakgrunn",
      newImage: "Nytt bilde",
      png: "Last ned PNG",
      reading: "Leser bildet…",
      downloading: "Laster ned modellen…",
      loading: "Laster inn modellen…",
      processing: "Fjerner bakgrunnen…",
      scaled: "Bildets lengste side ble redusert til 4096 px.",
      imageTooLarge: "Det dekodede bildet overstiger 20 megapiksler.",
      invalid: "Velg et gyldig JPG-/JPEG-, PNG- eller WebP-bilde.",
      modelFailed:
        "Modellen kunne ikke lastes. Kontroller forbindelsen og prøv igjen.",
      processingFailed: "Bakgrunnen kunne ikke fjernes fra dette bildet.",
      downloadFailed: "PNG-filen kunne ikke klargjøres for nedlasting.",
      resultEmpty: "Det frilagte bildet vises her etter behandlingen.",
    },
    page: {
      title: "Fjern bildebakgrunn",
      description:
        "KI gjenkjenner motivet og fjerner bakgrunnen automatisk, slik at du kan laste ned en gjennomsiktig eller ensfarget PNG.",
      guide:
        "Velg et PNG-, JPEG- eller WebP-bilde, velg modellen som passer motivet, og fjern bakgrunnen. Tydelige kanter og god kontrast gir vanligvis best resultat.",
      terms: [
        "fjern bakgrunn",
        "frilegg bilde",
        "gjennomsiktig PNG",
        "klipp ut foto",
      ],
    },
  },
  ar: {
    copy: {
      ...resultFeatureCopy.ar,
      original: "الصورة الأصلية",
      result: "النتيجة",
      uploadHint: "أسقط صورة هنا أو اخترها من جهازك.",
      formats: "JPG/JPEG أو PNG أو WebP حتى 20 ميجابايت و20 ميجابكسل",
      options: "الخيارات",
      model: "نموذج الذكاء الاصطناعي",
      fast: "سريع",
      fastHint: "4.6 ميجابايت · أسرع للعناصر الواضحة",
      portrait: "صور شخصية",
      portraitHint: "6.6 ميجابايت · مناسب للأشخاص والشعر",
      quality: "جودة عالية",
      qualityHint: "44.2 ميجابايت · تفاصيل أكثر ومعالجة أبطأ",
      precision: "دقة فائقة",
      precisionHint: "98.5 ميجابايت · WebGPU وتفاصيل عامة أفضل",
      precisionUnavailable:
        "يتطلب نموذج الدقة الفائقة WebGPU وهو غير متاح في هذا المتصفح.",
      precisionConsentTitle: "هل تريد استخدام نموذج الدقة الفائقة؟",
      precisionConsentBody:
        "سيُنزل النموذج بحجم 98.5 ميجابايت وبيئة WebGPU بحجم يقارب 26 ميجابايت عند الإزالة التالية، أي نحو 125 ميجابايت في أول استخدام. تُحفظ الملفات مؤقتًا وتبقى الصورة على هذا الجهاز.",
      precisionConsentNotice:
        "يستخدم WebGPU وذاكرة أكبر بكثير. قد يكون بطيئًا أو يفشل على الأجهزة محدودة الذاكرة؛ وتظل النماذج الأخرى متاحة.",
      precisionConsentConfirm: "استخدام الدقة الفائقة",
      cancel: "إلغاء",
      background: "خلفية النتيجة",
      transparent: "شفافة",
      white: "بيضاء",
      custom: "لون مخصص",
      color: "لون الخلفية",
      remove: "إزالة الخلفية",
      newImage: "صورة جديدة",
      png: "تنزيل PNG",
      reading: "جارٍ قراءة الصورة…",
      downloading: "جارٍ تنزيل النموذج…",
      loading: "جارٍ تحميل النموذج…",
      processing: "جارٍ إزالة الخلفية…",
      scaled: "تم تصغير أطول ضلع إلى 4096 بكسل.",
      imageTooLarge: "تتجاوز الصورة بعد فكها حد 20 ميجابكسل.",
      invalid: "اختر صورة JPG/JPEG أو PNG أو WebP صالحة.",
      modelFailed: "تعذر تحميل النموذج. تحقق من الاتصال وحاول مجددًا.",
      processingFailed: "تعذرت إزالة خلفية هذه الصورة.",
      downloadFailed: "تعذر إعداد ملف PNG للتنزيل.",
      resultEmpty: "ستظهر الصورة المقصوصة هنا بعد المعالجة.",
    },
    page: {
      title: "مزيل خلفية الصور",
      description:
        "يتعرّف الذكاء الاصطناعي على العنصر ويزيل الخلفية تلقائيًا، ثم يتيح تنزيلها بصيغة PNG شفافة أو بخلفية بلون ثابت.",
      guide:
        "اختر صورة PNG أو JPEG أو WebP، ثم اختر النموذج المناسب للعنصر وأزل الخلفية. تعطي الحواف الواضحة والتباين الجيد أفضل نتيجة عادةً.",
      terms: ["إزالة الخلفية", "قص الصورة", "PNG شفاف", "تفريغ الصورة"],
    },
  },
  "zh-TW": {
    copy: {
      ...resultFeatureCopy["zh-TW"],
      original: "原始圖片",
      result: "結果",
      uploadHint: "將圖片拖放到這裡，或從裝置選取。",
      formats: "JPG/JPEG、PNG 或 WebP，最多 20 MB、2,000 萬畫素",
      options: "選項",
      model: "AI 模型",
      fast: "快速",
      fastHint: "4.6 MB · 適合輪廓清楚的主體",
      portrait: "人像",
      portraitHint: "6.6 MB · 適合人物與髮絲",
      quality: "高品質",
      qualityHint: "44.2 MB · 細節較多、處理較慢",
      precision: "精細",
      precisionHint: "98.5 MB · WebGPU，強化通用細節",
      precisionUnavailable: "精細模型需要 WebGPU，此瀏覽器無法使用。",
      precisionConsentTitle: "要使用精細模型嗎？",
      precisionConsentBody:
        "下次移除背景時會下載 98.5 MB 模型與約 26 MB 的 WebGPU 執行檔，首次使用合計約 125 MB。檔案會存入瀏覽器快取，圖片仍留在此裝置。",
      precisionConsentNotice:
        "此模型會使用 WebGPU 與更多記憶體。在記憶體較少的裝置上可能較慢或失敗；其他模型仍可使用。",
      precisionConsentConfirm: "使用精細模型",
      cancel: "取消",
      background: "結果背景",
      transparent: "透明",
      white: "白色",
      custom: "自訂顏色",
      color: "背景顏色",
      remove: "移除背景",
      newImage: "新圖片",
      png: "下載 PNG",
      reading: "正在讀取圖片…",
      downloading: "正在下載 AI 模型…",
      loading: "正在載入 AI 模型…",
      processing: "正在移除背景…",
      scaled: "圖片最長邊已縮小為 4096 px。",
      imageTooLarge: "解碼後的圖片超過 2,000 萬畫素限制。",
      invalid: "請選擇有效的 JPG/JPEG、PNG 或 WebP 圖片。",
      modelFailed: "無法載入模型。請檢查連線後再試一次。",
      processingFailed: "無法移除此圖片的背景。",
      downloadFailed: "無法準備要下載的 PNG。",
      resultEmpty: "處理完成後，去背結果會顯示在這裡。",
    },
    page: {
      title: "圖片背景移除工具",
      description:
        "AI 會自動辨識主體並移除背景，產生透明或純色背景的 PNG 供你下載。",
      guide:
        "選擇 PNG、JPEG 或 WebP 圖片，指定適合主體的模型後移除背景。主體輪廓清楚且與背景對比明顯時，通常能得到較乾淨的結果。",
      terms: ["圖片去背", "移除背景", "透明 PNG", "照片去背"],
    },
  },
  tr: {
    copy: {
      ...resultFeatureCopy.tr,
      original: "Orijinal",
      result: "Sonuç",
      uploadHint: "Bir resmi buraya bırakın veya cihazınızdan seçin.",
      formats: "En fazla 20 MB ve 20 megapiksel JPG/JPEG, PNG veya WebP",
      options: "Seçenekler",
      model: "Yapay zekâ modeli",
      fast: "Hızlı",
      fastHint: "4,6 MB · belirgin nesnelerde daha hızlı",
      portrait: "Portre",
      portraitHint: "6,6 MB · insanlar ve saçlar için uygun",
      quality: "Kaliteli",
      qualityHint: "44,2 MB · daha fazla ayrıntı, daha yavaş",
      precision: "Hassas",
      precisionHint: "98,5 MB · WebGPU, en yüksek genel ayrıntı",
      precisionUnavailable:
        "Hassas model WebGPU gerektirir ve bu tarayıcıda kullanılamaz.",
      precisionConsentTitle: "Hassas model kullanılsın mı?",
      precisionConsentBody:
        "Bir sonraki kaldırmada 98,5 MB model ile yaklaşık 26 MB WebGPU çalışma dosyası indirilir; ilk kullanımda toplam yaklaşık 125 MB aktarılır. Dosyalar önbellekte, resim ise bu cihazda kalır.",
      precisionConsentNotice:
        "WebGPU ve çok daha fazla bellek kullanır. Düşük bellekli cihazlarda yavaşlayabilir veya başarısız olabilir; diğer modeller kullanılabilir kalır.",
      precisionConsentConfirm: "Hassas modeli kullan",
      cancel: "İptal",
      background: "Sonuç arka planı",
      transparent: "Şeffaf",
      white: "Beyaz",
      custom: "Özel renk",
      color: "Arka plan rengi",
      remove: "Arka planı kaldır",
      newImage: "Yeni resim",
      png: "PNG indir",
      reading: "Resim okunuyor…",
      downloading: "Model indiriliyor…",
      loading: "Model yükleniyor…",
      processing: "Arka plan kaldırılıyor…",
      scaled: "Resmin uzun kenarı 4096 px olarak küçültüldü.",
      imageTooLarge: "Çözülen resim 20 megapiksel sınırını aşıyor.",
      invalid: "Geçerli bir JPG/JPEG, PNG veya WebP resmi seçin.",
      modelFailed:
        "Model yüklenemedi. Bağlantınızı kontrol edip yeniden deneyin.",
      processingFailed: "Bu resmin arka planı kaldırılamadı.",
      downloadFailed: "PNG indirme için hazırlanamadı.",
      resultEmpty: "Kesilmiş sonuç işlemden sonra burada görünür.",
    },
    page: {
      title: "Resim arka planı kaldırma",
      description:
        "Yapay zekâ nesneyi algılar ve arka planı otomatik olarak kaldırır; sonucu şeffaf veya düz renkli PNG olarak indirebilirsiniz.",
      guide:
        "PNG, JPEG veya WebP resmi seçin, nesneye uygun modeli belirleyin ve arka planı kaldırın. Net nesne kenarları ve güçlü kontrast genellikle en iyi sonucu verir.",
      terms: [
        "arka plan kaldır",
        "resim kesme",
        "şeffaf PNG",
        "fotoğraf arka planı",
      ],
    },
  },
} as const satisfies Record<Locale, BackgroundSourceLocalePack>;

export function backgroundRemoverFor(locale: Locale): BackgroundLocalePack {
  const source = packs[locale];
  return {
    page: source.page,
    copy: { ...source.copy, fileTooLarge: fileTooLarge[locale] },
  };
}
