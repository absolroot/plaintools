import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("pl");

const seed = {
  locale: "pl",
  formatterSubnet: formatterSubnetFor("pl"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("pl"),
  dateCalculator: dateCalculatorFor("pl"),
  timeZoneConverter: timeZoneConverterFor("pl"),
  calculatorSuite: calculatorSuiteFor("pl"),
  uuidGenerator: uuidGeneratorFor("pl"),
  ui: {
    clear: "Wyczyść",
    copy: "Kopiuj",
    download: "Pobierz",
    openFile: "Otwórz plik",
    chooseImage: "Wybierz obraz",
    dropFile: "Upuść obraz tutaj.",
    ready: "Gotowe",
    working: "Przetwarzanie…",
    complete: "Ukończono",
    unchanged: "Zmiany nie są potrzebne",
    outdated: "Wynik jest nieaktualny",
    copied: "Skopiowano",
    copyFailed: "Nie udało się skopiować",
    tooLarge: "Dane wejściowe są zbyt duże, aby bezpiecznie je przetworzyć.",
    failed:
      "Przetwarzanie nie powiodło się. Sprawdź dane wejściowe i spróbuj ponownie.",
    resultHere: "Tutaj pojawi się wynik.",
    localTitle: "Przetwarzanie tylko w tej przeglądarce",
    localBody:
      "Dane wejściowe ani wyniki nie są przesyłane ani zapisywane. Pozostają na tej karcie przeglądarki.",
    guideTitle: "Jak korzystać z narzędzia {name}",
    safetyTitle: "Prywatne przetwarzanie lokalne",
    faqWhat: "Do czego służy {name}?",
    faqPrivacy: "Czy moje dane są przesyłane?",
    faqCheck: "Co należy sprawdzić podczas korzystania z narzędzia {name}?",
  },
  ai: {
    input: "Tekst oryginalny",
    output: "Tekst oczyszczony",
    placeholder:
      "Wklej skopiowany tekst, który może zawierać niechciane niewidoczne znaki.",
    run: "Usuń ukryte znaki",
    report: "Raport usuwania",
    removed: "Usunięte znaki",
    normalized: "Znormalizowane spacje",
    noChanges: "Nie znaleziono żadnych wybranych ukrytych znaków.",
    count: "Usunięto: {count}",
    advanced: "Zaawansowane opcje Unicode",
    advancedWarning:
      "Te opcje mogą zmienić pisownię, emoji lub sposób łączenia znaków. Włączaj je tylko wtedy, gdy rozumiesz tekst źródłowy.",
    joinControls: "Usuń ZWJ i ZWNJ",
    joinWarning:
      "Może uszkodzić sekwencje emoji oraz łączenie znaków w piśmie arabskim, perskim lub indyjskim.",
    variationSelectors: "Usuń selektory wariantów",
    variationWarning: "Może zmienić wygląd emoji lub glifów CJK.",
    combiningMarks: "Usuń znaki łączące",
    combiningWarning:
      "Może usunąć akcenty, znaki samogłoskowe i inne znaki mające znaczenie.",
    noBreakSpaces: "Normalizuj spacje nierozdzielające",
    noBreakNote: "Zamienia odstępy podobne do NBSP na zwykłe spacje.",
    kinds: [
      "Spacja o zerowej szerokości",
      "Łącznik wyrazów",
      "Znacznik kolejności bajtów",
      "Miękki łącznik",
      "Znak sterujący tekstem dwukierunkowym",
      "Niewidoczny separator",
      "Sterowanie łączeniem",
      "Selektor wariantu",
      "Znak łączący",
      "Spacja nierozdzielająca lub cyfrowa",
      "Wąska spacja nierozdzielająca",
    ],
  },
  url: {
    mode: "Tryb konwersji URL",
    encode: "Zakoduj",
    decode: "Dekoduj",
    encodeInput: "Tekst lub URL do zakodowania",
    decodeInput: "Zakodowana wartość URL",
    encodeOutput: "Wynik kodowania",
    decodeOutput: "Wynik dekodowania",
    encodePlaceholder: "Przykład: https://example.com/search?q=witaj świecie",
    decodePlaceholder: "Przykład: witaj%20świecie%3Fstrona%3D1",
    scope: "Zakres kodowania",
    component: "Składnik URL",
    uri: "Pełny URI",
    formSpace: "Używaj + jako spacji w danych formularza",
    recursive: "Dekoduj wielokrotnie",
    passLimit: "Maksymalna liczba przebiegów",
    encoded: "Kodowanie URL ukończone",
    decoded: "Dekodowanie URL ukończone",
    passCount: "Zdekodowano w {count} przebiegu/przebiegach",
    limitReached:
      "Po osiągnięciu limitu przebiegów pozostały kolejne warstwy kodowania.",
    errors: [
      "Najpierw wprowadź wartość.",
      "Sekwencja procentowa jest niepełna lub nieprawidłowa.",
      "Zdekodowane bajty nie są prawidłowym UTF-8.",
      "Wybierz limit przebiegów od 1 do 10.",
    ],
  },
  hash: {
    input: "Tekst lub plik",
    placeholder:
      "Wprowadź tekst, aby obliczyć skróty SHA-256, SHA-512, SHA-1 i MD5.",
    results: "Wartości skrótów",
    resultLabel: "Skrót {algorithm}",
    copyLabel: "Kopiuj skrót {algorithm}",
    fileSelected: "Wybrano: {name} ({size})",
    drop: "Upuść plik tutaj, aby lokalnie obliczyć jego skrót.",
    textTooLarge: "Tekst jest zbyt duży dla tej sesji przeglądarki.",
    fileTooLarge: "Plik przekracza lokalny limit bezpieczeństwa.",
    legacyWarning:
      "Algorytmy MD5 i SHA-1 są dostępne do sprawdzania zgodności, a nie do przechowywania haseł ani projektowania nowych zabezpieczeń.",
    expectedChecksum: "Oczekiwana suma kontrolna",
    checksumMatch: "Zgodna",
    checksumMismatch: "Niezgodna",
    checksumInvalid: "Wprowadź obsługiwaną szesnastkową sumę kontrolną.",
    empty: "Najpierw wprowadź tekst lub wybierz plik.",
    unavailable:
      "Ta przeglądarka nie może obliczyć jednego z żądanych skrótów.",
  },
  jwt: {
    input: "Token JWT",
    placeholder: "Wklej trzyczęściowy JWT: header.payload.signature",
    header: "Nagłówek",
    payload: "Ładunek",
    signature: "Podpis",
    copyHeader: "Kopiuj zdekodowany nagłówek JWT",
    copyPayload: "Kopiuj zdekodowany ładunek JWT",
    copySignature: "Kopiuj bajty podpisu JWT",
    signatureBytes: "Liczba bajtów: {count}",
    timestamps: "Deklaracje czasu",
    expires: "Wygasa (exp)",
    notBefore: "Ważny od (nbf)",
    issuedAt: "Wydano (iat)",
    invalidTimestamp:
      "Ta deklaracja nie jest prawidłowym liczbowym znacznikiem czasu.",
    noTimestamps: "Nie znaleziono deklaracji exp, nbf ani iat.",
    noVerifyTitle: "Podpis niezweryfikowany",
    noVerifyBody:
      "Dekodowanie ujawnia tylko zawartość tokenu. Nie potwierdza wystawcy tokenu ani prawidłowości podpisu.",
    errors: [
      "Najpierw wklej JWT.",
      "JWT musi zawierać dokładnie trzy części rozdzielone kropkami.",
      "Nagłówek JWT jest pusty.",
      "Ładunek JWT jest pusty.",
      "Segment nie jest prawidłowym Base64URL.",
      "Segment nie jest prawidłowym UTF-8.",
      "Nagłówek nie jest prawidłowym JSON-em.",
      "Ładunek nie jest prawidłowym JSON-em.",
      "Nagłówek musi być obiektem JSON.",
      "Ładunek musi być obiektem JSON.",
    ],
  },
  qr: {
    input: "Tekst lub URL",
    placeholder: "Wprowadź tekst lub URL, który ma znaleźć się w kodzie QR.",
    preview: "Podgląd kodu QR",
    previewEmpty: "Wprowadź treść, aby utworzyć kod QR.",
    options: "Opcje kodu QR",
    correction: "Korekcja błędów",
    correctionLevels: [
      "Niska (L)",
      "Średnia (M)",
      "Kwartylowa (Q)",
      "Wysoka (H)",
    ],
    quietZone: "Strefa ciszy",
    quietZones: ["Brak", "2 moduły", "4 moduły (zalecane)", "8 modułów"],
    generate: "Utwórz kod QR",
    png: "Pobierz PNG",
    svg: "Pobierz SVG",
    empty: "Najpierw wprowadź tekst lub URL.",
    tooLong: "Treść jest zbyt długa dla tego poziomu korekcji błędów.",
    generationFailed: "Nie udało się utworzyć kodu QR.",
    downloadFailed: "Nie udało się przygotować obrazu do pobrania.",
    upload: "Obraz kodu QR",
    formats: "PNG, JPEG, WebP, GIF lub BMP do 10 MB",
    camera: "Skaner aparatu",
    cameraHint:
      "Zezwól na dostęp do aparatu, aby skanować bez przerwy. Zdekodowane adresy URL nigdy nie są otwierane automatycznie.",
    startCamera: "Uruchom aparat",
    stopCamera: "Zatrzymaj aparat",
    scanResult: "Zdekodowana treść",
    scanPlaceholder: "Tutaj pojawi się zeskanowany tekst.",
    urlDetected: "Wykryto URL",
    openUrl: "Otwórz URL",
    urlDialogTitle: "Otworzyć ten adres URL?",
    urlDialogBody:
      "Ten adres URL znaleziono w kodzie QR. Sprawdź, czy jest bezpieczny i należy do oczekiwanej witryny.",
    urlDialogDestination: "Adres docelowy",
    cancel: "Anuluj",
    reading: "Odczytywanie obrazu…",
    starting: "Uruchamianie aparatu…",
    scanning: "Wyszukiwanie kodu QR…",
    invalidImage: "Wybierz prawidłowy obraz w obsługiwanym formacie.",
    noCode: "Nie znaleziono czytelnego kodu QR na tym obrazie.",
    unsupported: "Ta przeglądarka nie obsługuje skanowania aparatem.",
    denied: "Odmówiono dostępu do aparatu.",
    unavailable: "Brak odpowiedniego aparatu.",
    scanFailed: "Nie udało się zeskanować kodu QR.",
  },
  data: {
    convert: "Konwertuj",
    inputPlaceholder: "Wklej tutaj dane źródłowe.",
    outputPlaceholder: "Tutaj pojawi się wynik konwersji.",
    drop: "Upuść tutaj obsługiwany plik tekstowy.",
    readFailed: "Nie udało się odczytać pliku.",
    errorAt: "{message} Wiersz {line}, kolumna {column}.",
    delimiter: "Separator CSV",
    auto: "Wykryj automatycznie",
    comma: "Przecinek (,)",
    semicolon: "Średnik (;)",
    tab: "Tabulator",
    pipe: "Kreska pionowa (|)",
    firstHeader: "Użyj pierwszego wiersza jako nagłówka",
    pretty: "Formatuj JSON z wcięciami",
    errors: [
      "Plik CSV zawiera niezamknięty cudzysłów lub nieprawidłowe pole.",
      "Nie znaleziono tabeli Markdown z wierszem separatora.",
      "Tabela Markdown jest nieprawidłowa.",
      "Dane wejściowe nie są prawidłowym JSON-em.",
      "JSON musi być tablicą obiektów.",
      "Nagłówek CSV jest pusty.",
      "Nagłówki CSV muszą być unikatowe.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Wyczyść tekst AI",
      description:
        "Czyści obsługiwane niechciane niewidoczne znaki, które mogą znaleźć się w tekście skopiowanym z ChatGPT, Claude, Gemini i innych źródeł. Nie potwierdza autorstwa, nie rozpoznaje tekstu AI ani nie gwarantuje obejścia detektorów AI.",
      guide:
        "Wklej tekst i najpierw sprawdź oczyszczony wynik, a następnie dokładne nazwy znaków, ich liczbę oraz punkty kodowe U+. Ryzykowne opcje wpływające na łączenie znaków są domyślnie wyłączone.",
      terms: [
        "wyczyść tekst AI",
        "wyczyść skopiowany tekst AI",
        "usuń niewidoczne znaki",
        "ukryte znaki ChatGPT",
        "ukryte znaki Claude",
        "ukryte znaki Gemini",
        "usuń znak wodny AI z tekstu",
      ],
    },
    "url-encode": {
      title: "Koder URL",
      description:
        "Koduje procentowo tekst, wartości zapytania lub pełne URI zgodnie ze standardowymi regułami sieci Web.",
      guide:
        "Wybierz składnik URL dla pojedynczej wartości zapytania albo pełny URI, aby zachować separatory URL. Znaku plus jako spacji używaj tylko w danych formularza.",
      terms: [
        "kodowanie URL",
        "kodowanie procentowe",
        "encodeURIComponent",
        "ciąg zapytania",
      ],
    },
    "url-decode": {
      title: "Dekoder URL",
      description:
        "Dekoduje adresy URL i wartości zapytania zakodowane procentowo, opcjonalnie w ograniczonej liczbie przebiegów.",
      guide:
        "Wklej zakodowaną wartość, wybierz jej zakres i używaj wielokrotnego dekodowania tylko wtedy, gdy źródło na pewno zawiera zagnieżdżone kodowanie.",
      terms: [
        "dekodowanie URL",
        "dekodowanie procentowe",
        "decodeURIComponent",
        "ciąg zapytania",
      ],
    },
    "hash-generator": {
      title: "Generator skrótów",
      description:
        "Lokalnie oblicza sumy kontrolne SHA-256, SHA-512, SHA-1 i MD5 dla tekstu lub plików.",
      guide:
        "Wprowadź tekst lub wybierz plik, a następnie dokładnie porównaj wymagany algorytm. Skróty sprawdzają zgodność; same nie szyfrują danych ani bezpiecznie nie przechowują haseł.",
      terms: [
        "generator hashy",
        "hash pliku",
        "suma kontrolna",
        "SHA-256",
        "SHA-512",
        "MD5",
      ],
    },
    "jwt-decoder": {
      title: "Dekoder JWT",
      description:
        "Dekoduje nagłówek, ładunek, bajty podpisu i deklaracje czasu JWT bez przesyłania tokenu.",
      guide:
        "Sprawdź zdekodowany JSON i znaczniki czasu, ale podpisy i deklaracje zweryfikuj w systemie posiadającym klucz podpisujący. Samo dekodowanie nie potwierdza wiarygodności.",
      terms: ["dekoder JWT", "JSON Web Token", "ładunek JWT", "nagłówek JWT"],
    },
    "qr-code-generator": {
      title: "Generator kodów QR",
      description:
        "Tworzy zgodny ze standardem statyczny kod QR dla tekstu lub URL i pozwala pobrać go jako PNG albo SVG.",
      guide:
        "Wprowadź dokładną treść, zachowaj strefę ciszy o szerokości czterech modułów i zwiększ korekcję błędów, jeśli kod może być częściowo zasłonięty.",
      terms: ["generator kodów QR", "QR PNG", "QR SVG", "statyczny kod QR"],
    },
    "qr-code-scanner": {
      title: "Skaner kodów QR",
      description:
        "Lokalnie odczytuje kod QR z obrazu lub aparatu bez automatycznego otwierania zdekodowanych linków.",
      guide:
        "Użyj ostrego, dobrze oświetlonego obrazu z widoczną całą strefą ciszy. Sprawdź i skopiuj zdekodowaną wartość, zanim uznasz adres URL za bezpieczny.",
      terms: [
        "skaner QR",
        "skanowanie obrazu QR",
        "czytnik QR z aparatu",
        "dekodowanie QR",
      ],
    },
    "csv-to-markdown": {
      title: "Konwerter CSV na Markdown",
      description:
        "Zmienia wiersze CSV w czytelną tabelę Markdown, wykrywając separator i zabezpieczając zawartość komórek.",
      guide:
        "Sprawdź separator oraz to, czy pierwszy wiersz jest nagłówkiem. Komórki wielowierszowe otrzymają bezpieczne podziały wierszy, a kreski pionowe zostaną poprzedzone znakiem ucieczki.",
      inputLabel: "Dane CSV",
      outputLabel: "Tabela Markdown",
      inputPlaceholder: "nazwa,wynik\nAri,92",
      terms: ["CSV na Markdown", "tabela Markdown", "konwerter CSV"],
    },
    "markdown-to-csv": {
      title: "Konwerter Markdown na CSV",
      description:
        "Konwertuje tabelę Markdown na zgodny ze standardami CSV dla arkuszy kalkulacyjnych i narzędzi danych.",
      guide:
        "Umieść w tabeli Markdown wiersz nagłówka i separatora, a następnie wybierz separator wymagany przez aplikację docelową.",
      inputLabel: "Tabela Markdown",
      outputLabel: "Wynik CSV",
      inputPlaceholder: "| nazwa | wynik |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown na CSV", "tabela na CSV", "konwerter Markdown"],
    },
    "json-to-csv": {
      title: "Konwerter JSON na CSV",
      description:
        "Konwertuje tablicę obiektów JSON na CSV, używając wszystkich kluczy jako kolumn.",
      guide:
        "Użyj tablicy obiektów na najwyższym poziomie. Zagnieżdżone wartości pozostają zwartymi ciągami JSON, więc sprawdź, jak obsłuży je docelowy arkusz.",
      inputLabel: "Tablica JSON",
      outputLabel: "Wynik CSV",
      inputPlaceholder: '[{"nazwa":"Ari","wynik":92}]',
      terms: ["JSON na CSV", "tablica JSON na CSV", "konwerter danych"],
    },
    "csv-to-json": {
      title: "Konwerter CSV na JSON",
      description:
        "Konwertuje CSV na tablicę obiektów JSON, używając pierwszego wiersza jako nazw pól.",
      guide:
        "Każdy nagłówek musi być niepusty i unikatowy. Przed konwersją danych zawierających przecinki, cudzysłowy lub komórki wielowierszowe sprawdź wykryty separator.",
      inputLabel: "Dane CSV",
      outputLabel: "Tablica JSON",
      inputPlaceholder: "nazwa,wynik\nAri,92",
      terms: ["CSV na JSON", "parser CSV", "tablica JSON"],
    },
    "html-to-markdown": {
      title: "Konwerter HTML na Markdown",
      description:
        "Konwertuje strukturę HTML na czytelny Markdown, w tym nagłówki, linki, listy, kod i tabele.",
      guide:
        "Wklej fragment HTML do konwersji. Sprawdź złożone układy i osadzoną zawartość, ponieważ Markdown nie odwzorowuje każdego zachowania HTML.",
      inputLabel: "Dane HTML",
      outputLabel: "Wynik Markdown",
      inputPlaceholder: "<h1>Tytuł</h1><p>Witaj <strong>świecie</strong>.</p>",
      terms: [
        "HTML do Markdown",
        "konwertuj HTML do Markdown",
        "konwerter HTML Markdown",
      ],
    },
    "markdown-to-html": {
      title: "Konwerter Markdown na HTML",
      description:
        "Renderuje Markdown jako HTML z popularnymi tabelami GFM, listami, linkami i blokami kodu otoczonymi znacznikami.",
      guide:
        "Konwertuj tylko Markdown, którego zamierzasz użyć, a przed wstawieniem niezaufanego wyniku na stronę ponownie oczyść kod HTML.",
      inputLabel: "Dane Markdown",
      outputLabel: "Wynik HTML",
      inputPlaceholder: "# Tytuł\n\nWitaj **świecie**.",
      terms: ["Markdown na HTML", "renderowanie Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
