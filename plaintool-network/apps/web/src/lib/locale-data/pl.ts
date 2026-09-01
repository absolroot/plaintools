import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/pl";

const plBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Polski",
    metaTitle: "Dekoder i koder Base64 — szybki, prywatny, online",
    metaDescription:
      "Odkoduj Base64 na tekst lub pliki oraz koduj tekst lub pliki online. Obsługuje Base64URL, brakujące wypełnienie, Data URI oraz starsze kodowania znaków.",
    decodeMetaTitle: "Dekoder Base64 dla tekstu i plików | AbsolTools",
    encodeMetaTitle: "Koder Base64 dla tekstu i plików | AbsolTools",
    skipToContent: "Przejdź do treści",
    languageNavLabel: "Język",
    legalNavLabel: "Prawny i kontakt",
    modeLabel: "Tryb konwersji",
    heading: "Dekoduj Base64 online.",
    subheading:
      "Wklej tekst Base64 lub otwórz plik. Standardowe wejścia Base64, Base64URL, brakujące dopełnienie i wejścia Data URI są obsługiwane lokalnie.",
    encodeHeading: "Koduj tekst lub pliki jako Base64 online.",
    encodeSubheading:
      "Wprowadź tekst lub otwórz plik. Konwertuj tekst UTF-8 i pliki binarne na standardowe Base64 lub Base64URL bez ich przesyłania.",
    decode: "Odszyfrować",
    encode: "Koduj",
    inputLabel: "Base64 wejście",
    outputLabel: "Odszyfrowane wyjście",
    encodeInputLabel: "Wprowadzenie tekstu lub pliku",
    encodeOutputLabel: "Wyjście Base64",
    decodePlaceholder: "Przykład: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Przykład: Cześć, AbsolTools!",
    outputPlaceholder: "Wynik pojawia się tutaj.",
    openFile: "Otwórz plik",
    runDecode: "Odszyfruj teraz",
    runEncode: "Zakoduj teraz",
    options: "Opcje",
    detected: "Wykryto",
    decodeComplete: "Dekodowanie zakończone",
    encodeComplete: "Kodowanie zakończone",
    charset: "Kodowanie znaków",
    variant: "format Base64",
    auto: "Wykryj automatycznie",
    standard: "Standard",
    urlSafe: "Bezpieczny dla URL",
    strict: "Weryfikuj ściśle",
    lineByLine: "Odszyfruj każdą linię osobno",
    autoRepair: "Napraw odstępy i wypełnienie",
    lenientRepair: "Usuń pozostałe nieprawidłowe znaki",
    outputView: "Format wyjściowy",
    text: "Tekst",
    hex: "Sześciokąt",
    includePadding: "Include = wypełnienie",
    mimeWrap: "Zawijaj co 76 znaków",
    dataUri: "Dodaj prefiks Data URI",
    dropHint:
      "Upuść plik tekstowy lub binarny w dowolnym miejscu w konwerterze.",
    fileTooLarge: "Maksymalny rozmiar wejściowy to 100 MiB.",
    binaryOutput:
      "Wykryto dane binarne. Sprawdź typ pliku, a następnie pobierz go zamiast uruchamiać bezpośrednio.",
    executableWarning:
      "Wykryto plik wykonywalny. Nie uruchamiaj plików odszyfrowanych z niezaufanego źródła.",
    imagePreview: "Podgląd obrazu",
    errors: {
      "empty-input": "Wpisz jakiś tekst lub najpierw otwórz plik.",
      "invalid-character":
        "Ta wartość zawiera znak, który nie jest prawidłowy Base64.",
      "invalid-length":
        "Wartość Base64 jest przycięta lub ma niemożliwą długość.",
      "decode-failed": "Nie można było odszyfrować wartości.",
      "encode-failed": "Nie można zakodować pliku.",
      "unsupported-charset":
        "To kodowanie znaków nie jest obsługiwane przez Twoją przeglądarkę.",
      "file-too-large": "To wejście jest większe niż bezpieczny limit 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Prefiks Data URI usunięty",
      "whitespace-removed": "Usunięto białe znaki",
      "url-alphabet-normalized": "Wykryto alfabet Base64URL",
      "padding-added": "Dodano brakujące wypełnienie",
      "invalid-characters-removed": "Usunięto nieprawidłowe znaki",
    },
    guideTitle: "Jak odszyfrować Base64",
    guideIntro:
      "Base64 to format kodowania, a nie szyfrowania. Każdy, kto posiada tę wartość, może ją odszyfrować.",
    guideSteps: [
      "Wklej wartość Base64 lub otwórz plik, który ją zawiera.",
      "Narzędzie wykrywa format i stosuje typowe poprawki, takie jak usuwanie spacji lub przywracanie brakującego wypełnienia.",
      "Kopiuj czytelny tekst lub pobierz wyjście binarne jako plik.",
    ],
    encodeGuideTitle: "Jak zakodować Base64",
    encodeGuideIntro:
      "Base64 zamienia tekst lub bajty binarne na znaki nadające się do wydruku. Nie szyfruje ani nie chroni danych źródłowych.",
    encodeGuideSteps: [
      "Wpisz tekst lub otwórz plik, który chcesz zakodować.",
      "Wybierz standardowy Base64 lub alfabet bezpieczny dla URL, a następnie dostosuj wypełnienie lub zawijanie linii tylko wtedy, gdy tego wymaga miejsce docelowe.",
      "Skopiuj wynik Base64 lub pobierz go jako plik tekstowy.",
    ],
    safetyTitle: "Twoje dane wejściowe nie są przechowywane.",
    safetyBody:
      "Strona nie przechowuje wprowadzonych danych ani wyników konwersji i nie wysyła ich na serwer. Wszystko jest przetwarzane w bieżącej sesji przeglądarki i znika po odświeżeniu lub zamknięciu strony.",
    detailsTitle: "Standardy i obsługa danych wejściowych",
    detailsBody:
      "Domyślnie narzędzie obsługuje RFC 4648 i standardowe oraz bezpieczne w URL alfabety, opcjonalne wypełnienie, białe znaki MIME oraz prefiksy Data URI. Włącz rygorystyczną walidację, gdy dokładny format ma znaczenie.",
    faqTitle: "Często zadawane pytania",
    faqs: [
      {
        q: "Czy Base64 to szyfrowanie?",
        a: "Nie. Base64 zamienia dane binarne na tekst możliwy do wydrukowania. Nie zapewnia żadnej poufności ani uwierzytelniania.",
      },
      {
        q: "Dlaczego nie mogę odczytać zdekodowanego wyniku?",
        a: "Wynik może być plikiem, danymi skompresowanymi lub zaszyfrowanymi albo tekstem w innym kodowaniu znaków. Spróbuj pobrać plik lub wybrać inne kodowanie znaków.",
      },
      {
        q: "Czy ta strona przesyła moje dane?",
        a: "Nie. Konwersja odbywa się w Twojej przeglądarce. Twoje dane wejściowe, pliki i wyniki nie są przesyłane na serwer.",
      },
    ],
    encodeFaqs: [
      {
        q: "Czy Base64 to szyfrowanie?",
        a: "Nie. Base64 zamienia dane binarne na tekst możliwy do wydrukowania. Nie zapewnia żadnej poufności ani uwierzytelniania.",
      },
      {
        q: "Czy powinienem użyć standardowego Base64 czy Base64URL?",
        a: "Używaj standardowego Base64 dla ogólnych plików i danych. Używaj Base64URL, gdy wartość musi pojawić się bezpiecznie w adresie URL lub nazwie pliku.",
      },
      {
        q: "Czy ta strona przesyła moje dane?",
        a: "Nie. Konwersja odbywa się w Twojej przeglądarce. Twoje dane wejściowe, pliki i wyniki nie są przesyłane na serwer.",
      },
    ],
    advertisement: "Reklama",
    integrationState: {
      enabled: "włączone z kontrolą zgody",
      disabled: "wyłączone",
    },
    legalNav: {
      about: "O",
      privacy: "Prywatność",
      cookies: "Ciasteczka",
      terms: "Warunki",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "O",
        intro:
          "AbsolTools zapewnia narzędzia online do zadań związanych z tekstem, danymi, czasem i kodowaniem.",
        sections: [
          {
            title: "To, co budujemy",
            body: [
              "Każde narzędzie wykonuje jedno skoncentrowane zadanie bez konieczności posiadania konta. Dane wejściowe narzędzia i wyniki są przetwarzane w Twojej przeglądarce.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Wyślij pytania, raporty o błędach i prośby dotyczące prywatności do {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Polityka prywatności",
        intro:
          "Ta polityka oddziela dane wejściowe narzędzia i wyniki od danych z witryny, analiz i reklam.",
        sections: [
          {
            title: "Wejście narzędzia i wyniki",
            body: [
              "Tekst, pliki, JSON, wartości daty i czasu, zdekodowane bajty oraz wygenerowane wyniki są przetwarzane w przeglądarce. Dane wejściowe narzędzia i wyniki nie są przesyłane ani przechowywane na serwerze.",
            ],
          },
          {
            title: "Dostawa strony internetowej",
            body: [
              "{{host_provider}} obsługuje i chroni tę statyczną witrynę i może przetwarzać dane połączenia, takie jak Twój adres IP, czas żądania, informacje o przeglądarce oraz żądany URL. Określony czas przechowywania logów to {{host_log_retention}}. Polityka dostawcy: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analiza i reklama",
            body: [
              "Google Analytics i Google AdSense są obecnie {{integration_state}}. Po włączeniu ich szczegóły dotyczące urządzenia, użytkowania, plików cookie, zgody, przechowywania i transferu międzynarodowego będą tutaj ujawniane i zarządzane za pomocą ustawień prywatności. Dane wejściowe narzędzia i wyniki są domyślnie wyłączone z wydarzeń analitycznych i reklamowych.",
            ],
          },
          {
            title: "Ciasteczka i automatyczne zbieranie danych",
            body: [
              "Narzędzia nie zapisują danych wejściowych ani wyników w plikach cookie ani w pamięci przeglądarki. Jeśli wybierzesz motyw, witryna zapisuje jedynie jasny lub ciemny w pamięci lokalnej i nie przesyła tych informacji. Technologia bezpieczeństwa hostingu może używać wyłącznie niezbędnej pamięci zgodnie z dokumentacją wybranego dostawcy. Opcjonalne przechowywanie danych analitycznych i reklamowych pozostaje zablokowane, gdy te integracje są wyłączone.",
            ],
          },
          {
            title: "Przechowywanie i usuwanie",
            body: [
              "Operator nie przechowuje danych wprowadzonych do narzędzia ani wyników jego działania. Dane żądań dotyczących hostingu są przechowywane zgodnie z podanymi powyżej zasadami dostawcy. Korespondencja kontaktowa jest przechowywana tylko przez czas potrzebny do udzielenia odpowiedzi na żądanie, spełnienia obowiązków prawnych lub obsługi nadużyć, a następnie jest usuwana lub anonimizowana.",
            ],
          },
          {
            title: "Odbiorcy i transfery międzynarodowe",
            body: [
              "Wybrany host może przetwarzać dane żądań poza Twoim krajem w lokalizacjach i zgodnie z zabezpieczeniami opisanymi w jego polityce. Zanim włączone zostaną analityka, reklama, menedżer zgód lub inny odbiorca, ta sekcja musi określać odbiorcę, kraje, cel, dane, czas, metodę, okres przechowywania oraz podstawę przekazu wymaganą przez obowiązujące prawo.",
            ],
          },
          {
            title: "Twoje wybory i kontakt",
            body: [
              "W razie potrzeby możesz zażądać dostępu, sprostowania, usunięcia, ograniczenia, sprzeciwu, przenoszenia lub wycofania zgody, kontaktując się z {{email}}. Przed spełnieniem żądania możemy potrzebować rozsądnej weryfikacji.",
            ],
          },
          {
            title: "Dzieci, bezpieczeństwo i zmiany",
            body: [
              "To ogólne narzędzie dla programistów nie jest przeznaczone dla dzieci. Używamy statycznej, lokalnej w przeglądarce architektury oraz restrykcyjnych zasad przeglądarki, aby zmniejszyć ryzyko, ale żadna usługa nie jest w pełni bezpieczna. Istotne zmiany w polityce będą datowane na tej stronie; data wejścia w życie: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Polityka plików cookie",
        intro:
          "Narzędzia nie potrzebują plików cookie do przetwarzania danych wejściowych.",
        sections: [
          {
            title: "Obecne użytkowanie",
            body: [
              "Analiza i reklama są obecnie {{integration_state}}. Strona nie przechowuje danych wprowadzanych do narzędzi ani wyników w plikach cookie ani w pamięci lokalnej. Przechowuje tylko wybraną przez Ciebie preferencję motywu (jasny lub ciemny) w pamięci lokalnej; ta wartość nie jest przesyłana.",
            ],
          },
          {
            title: "Jeśli integracje są włączone",
            body: [
              "Platforma zgody będzie kontrolować wymaganą pamięć preferencji, pamięć analityczną i pamięć reklamową. Stała kontrola prywatności pozwoli odwiedzającym przeglądać lub wycofywać zgodę.",
            ],
          },
        ],
      },
      terms: {
        title: "Warunki użytkowania",
        intro: "Korzystanie z tego bezpłatnego narzędzia podlega tym warunkom.",
        sections: [
          {
            title: "Usługa",
            body: [
              "Usługa jest świadczona w stanie, w jakim się znajduje, bez gwarancji dokładności, dostępności, przydatności do określonego celu ani nieprzerwanej pracy. Ważne wyniki należy weryfikować niezależnie.",
            ],
          },
          {
            title: "Bezpieczne i zgodne z prawem użytkowanie",
            body: [
              "Nie używaj usługi do atakowania systemów, naruszania prawa lub praw osób trzecich ani do rozpowszechniania szkodliwych treści. Nigdy nie uruchamiaj zdekodowanego pliku pochodzącego z nieznanego źródła.",
            ],
          },
          {
            title: "Odpowiedzialność i osoby trzecie",
            body: [
              "W zakresie dozwolonym przez obowiązujące prawo, operator nie ponosi odpowiedzialności za straty pośrednie ani wynikowe. Reklamy i linki stron trzecich nie stanowią rekomendacji.",
            ],
          },
          {
            title: "Własność intelektualna i zmiany",
            body: [
              "Projekt strony i oryginalne treści wyjaśniające są chronione przez obowiązujące prawo. Odpowiadasz za treści, które przetwarzasz. Możemy zmieniać lub przerywać funkcje i będziemy datować zmiany warunków materiałów.",
            ],
          },
          {
            title: "Prawo właściwe i kontakt",
            body: [
              "Usługa ta jest obsługiwana z {{region}}. Prawo właściwe: {{governing_law}}. Jurysdykcja: {{jurisdiction}}. Obowiązkowe ochrony konsumenta nadal mają zastosowanie. Kontakt: {{email}}. Data wejścia w życie: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Witamy pytania, zgłoszenia błędów, prośby dotyczące prywatności oraz zgłoszenia nadużyć.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Skontaktuj się z {{email}}. Nie dołączaj do swojej wiadomości danych wejściowych narzędzi, takich jak wrażliwe teksty, wartości JSON, Base64, hasła, klucze prywatne ani pliki osobiste.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Podgląd",
    ready: "Gotowe",
    working: "Przetwarzanie…",
    clear: "Wyczyść",
    copy: "Kopiuj",
    copied: "Skopiowano",
    copyFailed: "Nie można skopiować wyniku.",
    processingFailed: "Przetwarzanie nie powiodło się. Spróbuj ponownie.",
    download: "Pobierz",
    faqTitle: "Często zadawane pytania",
    localTitle: "AbsolTools działa w twojej przeglądarce.",
    localBody:
      "Twoje dane wejściowe i wyniki są przetwarzane tylko w tej przeglądarce. Nie są przesyłane ani przechowywane na serwerze.",
  },
  preview: {
    word: {
      title: "Licznik słów i znaków",
      description:
        "Licznij słowa, znaki, znaki bez spacji, linie i akapity bez przesyłania swojego tekstu.",
      inputLabel: "Tekst",
      words: "Słowa",
      characters: "Postacie",
      noWhitespace: "Znaki bez spacji",
      lines: "Linie",
      paragraphs: "Akapity",
      completed: "Policz zakończone",
      approximate:
        "Ta przeglądarka nie obsługuje Intl.Segmenter, więc liczba znaków i słów jest przybliżona.",
      tooLarge:
        "Wprowadzony tekst przekracza limit 1 MB. Skróć lub wyczyść tekst, aby kontynuować.",
      guideTitle: "Co jest liczone",
      guideBody:
        "W obsługiwanych przeglądarkach znaki są liczone jako spostrzegane przez użytkownika klastry grafemowe, więc emoji lub litera z znakami łączącymi zazwyczaj liczy się jako jeden. Liczba bez spacji pomija klastry spacji w oryginalnym tekście bez łączenia klastrów po obu stronach. Wiersze podążają za znakami końca linii. Wizualnie puste linie, w tym linie zawierające tylko spacje, oddzielają akapity.",
      faqs: [
        {
          q: "Jak liczy się słowa?",
          a: "Przeglądarki z Intl.Segmenter używają języka obecnej strony do określania granic słów i liczenia segmentów przypominających słowa. Inne przeglądarki pokazują przybliżoną liczbę.",
        },
        {
          q: "Czy emoji liczą się jako znaki?",
          a: "W obsługiwanych przeglądarkach emoji lub znak łączony, który pojawia się jako pojedynczy znak, jest liczony tylko raz.",
        },
      ],
    },
    json: {
      title: "Formater JSON",
      description:
        "Sformatuj JSON, aby ułatwić jego czytanie, sprawdź go pod kątem błędów lub zmniejsz do jednej linii.",
      inputLabel: "JSON wejście",
      outputLabel: "Wynik",
      placeholder: "Wklej JSON tutaj…",
      outputPlaceholder:
        "Sformatowany lub zminimalizowany JSON pojawia się tutaj.",
      openFile: "Otwórz .json",
      tooLarge: "Wprowadzony plik przekracza limit 10 MiB.",
      manualRequired:
        "Automatyczna walidacja została wstrzymana dla tego dużego wejścia. Wybierz Format, Waliduj lub Minimalizuj.",
      format: "Format",
      validate: "Walidować",
      validateHelpLabel: "O weryfikacji",
      validateHelp:
        "Sprawdza, czy dane wejściowe są zgodne ze składnią RFC 8259 JSON i zgłasza lokalizację oraz przyczynę wszelkich błędów składniowych. Nie zmienia ani nie formatuje w żaden inny sposób tekstu.",
      minify: "Minimalizować",
      minifyHelpLabel: "O Minify",
      minifyHelp:
        "Usuwa opcjonalne spacje i podziały wierszy z prawidłowego JSON, aby uczynić go zwarty. Zawartość ciągów, pierwotna forma liczb oraz zduplikowane klucze obiektów są zachowane.",
      indent: "Wcięcie",
      twoSpaces: "2 spacje",
      fourSpaces: "4 spacje",
      tabs: "Karty",
      valid: "Prawidłowy JSON",
      invalidAt: "{message} Linia {line}, kolumna {column}.",
      duplicate: "Duplikat klucza w linii {line}, kolumna {column}",
      bom: "UTF-8 BOM usunięto przed przetwarzaniem.",
      errorMessages: {
        InvalidSymbol: "Nieprawidłowy symbol.",
        InvalidNumberFormat: "Nieprawidłowy format liczby.",
        PropertyNameExpected: "Nazwa właściwości jest wymagana.",
        ValueExpected: "Wartość jest wymagana.",
        ColonExpected: "Dwukropek jest wymagany po nazwie właściwości.",
        CommaExpected: "Wymagana jest przecinek między elementami.",
        CloseBraceExpected: "Wymagany jest zamykający nawias klamrowy.",
        CloseBracketExpected: "Wymagany jest nawias zamykający.",
        EndOfFileExpected:
          "Nieoczekiwana zawartość pojawia się po wartości JSON.",
        InvalidCommentToken: "Komentarze nie są prawidłowe JSON.",
        UnexpectedEndOfComment: "Komentarz jest niekompletny.",
        UnexpectedEndOfString: "Łańcuch jest niekompletny.",
        UnexpectedEndOfNumber: "Numer jest niekompletny.",
        InvalidUnicode: "Ucieczka Unicode jest nieprawidłowa.",
        InvalidEscapeCharacter: "Sekwencja ucieczki jest nieprawidłowa.",
        InvalidCharacter: "Ten znak jest tutaj nieprawidłowy.",
        Unknown: "JSON jest nieważny.",
      },
      guideTitle: "Zasady JSON i zachowanie liczby",
      guideBody:
        "Weryfikacja przebiega zgodnie z RFC 8259: komentarze, przecinki końcowe i pojedyncze cudzysłowy są zgłaszane jako błędy. Zduplikowane klucze są zachowywane z ostrzeżeniem, a duże liczby zachowują dokładną notację, którą wpisałeś.",
      faqs: [
        {
          q: "Czy duże liczby się zmienią?",
          a: "Nie. Formatowanie i minimalizacja nie przeliczają liczb; zachowują zapis, który wprowadziłeś, więc duże liczby nie są zaokrąglane.",
        },
        {
          q: "Dlaczego zgłaszane są zduplikowane klucze?",
          a: "Oprogramowanie może obsługiwać zduplikowane klucze obiektów w różny sposób. AbsolTools zachowuje je i wyświetla ostrzeżenie zamiast cicho usuwać dane.",
        },
        {
          q: "Czy formatownik naprawia nieprawidłowy JSON?",
          a: "Nie. Komentarze, końcowe przecinki, pojedyncze cudzysłowy i inne nieprawidłowe składnie są zgłaszane, aby można było celowo poprawić źródło.",
        },
        {
          q: "Czy to działa podobnie do formatowania JSON za pomocą Prettiera?",
          a: "Oba sposoby ułatwiają czytanie prawidłowego JSON dzięki wcięciom i podziałom wierszy. To narzędzie przetwarza ścisły JSON w przeglądarce; nie twierdzi, że uruchamia Prettiera, zachowuje komentarze ani sortuje klucze obiektów.",
        },
      ],
    },
    time: {
      title: "Konwerter czasu Unix",
      description:
        "Konwertuj znaczniki czasowe Unix w sekundach lub milisekundach na daty i godziny w wybranej strefie czasowej, i odwrotnie.",
      timestampMode: "Znacznik czasu na datę i godzinę",
      dateMode: "Data i godzina na znacznik czasu",
      timestampLabel: "znacznik czasu Unix",
      dateLabel: "Data i czas",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Wybierz datę i godzinę",
      unit: "Jednostka",
      auto: "Automatyczne wykrywanie",
      seconds: "Sekundy",
      milliseconds: "Milisekundy",
      zoneMode: "Strefa czasowa",
      utc: "offset UTC",
      local: "Strefa czasowa przeglądarki",
      selected: "Strefa czasowa IANA",
      zoneLabel: "Miasto, region lub strefa czasowa IANA",
      zonePlaceholder: "Szukaj Nowy Jork, Azja lub Ameryka/Nowy Jork",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seul, Korea Południowa — Azja/Seul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "Nowy Jork, Stany Zjednoczone — Ameryka/Nowy_Jork",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Stany Zjednoczone — Ameryka/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "Londyn, Zjednoczone Królestwo — Europa/Londyn",
        },
        { value: "Europe/Paris", label: "Paryż, Francja — Europa/Paryż" },
        { value: "Europe/Madrid", label: "Madryt, Hiszpania — Europa/Madryt" },
        { value: "Asia/Tokyo", label: "Tokio, Japonia — Azja/Tokio" },
        { value: "Asia/Shanghai", label: "Szanghaj, Chiny — Azja/Szanghaj" },
        { value: "Asia/Singapore", label: "Singapur — Azja/Singapur" },
        { value: "Asia/Kolkata", label: "Kalkuta, Indie — Azja/Kalkuta" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australia — Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, Nowa Zelandia — Pacyfik/Auckland",
        },
      ],
      offsetLabel: "Przesunięcie od UTC",
      disambiguation: "Pominięty lub powtórzony czas lokalny",
      reject: "Pokaż błąd",
      earlier: "Użyj wcześniejszego wyniku",
      later: "Użyj późniejszego wyniku",
      now: "Teraz",
      convert: "Konwertuj",
      instant: "UTC data i czas",
      zoned: "Data i godzina w wybranej strefie",
      unixSeconds: "Unix znacznik czasu (sekundy)",
      unixMilliseconds: "Znacznik czasu Unix (milisekundy)",
      converted: "Konwersja zakończona",
      invalid:
        "Wprowadź prawidłowy znacznik czasu Unix lub datę i godzinę w formacie ISO oraz sprawdź strefę czasową.",
      ambiguousUnit:
        "Wartości 11- lub 12-cyfrowe są niejednoznaczne. Wybierz sekundy lub milisekundy.",
      nonexistentTime:
        "Ta data i godzina jest pomijana w wybranej strefie czasowej, ponieważ zegar przestawia się do przodu. Wybierz wcześniejszy lub późniejszy wynik.",
      repeatedTime:
        "Ta data i godzina występuje dwukrotnie w wybranej strefie czasowej, ponieważ zegar cofnie się. Wybierz wcześniejszy lub późniejszy wynik.",
      y2038:
        "Ta wartość jest poza zakresem czasu Unix dla 32-bitowych liczb całkowitych ze znakiem.",
      guideTitle: "Jak obsługiwane są jednostki i strefy czasowe",
      guideBody:
        "Automatyczne wykrywanie traktuje liczby dziesiętne i liczby całkowite od 1 do 10 cyfr jako sekundy, liczby całkowite o 13 cyfrach jako milisekundy i prosi o wybór jednostki dla liczb o 11 lub 12 cyfrach. Wprowadź bezpośrednio lokalną datę i godzinę lub użyj selektora; sekundy i części sekundy są opcjonalne. Domyślnie używana jest strefa czasowa przeglądarki. Podczas konwersji znacznika czasu strefa czasowa zmienia tylko wyświetlaną lokalną datę i godzinę. Podczas konwersji lokalnej daty i godziny strefa czasowa określa wartość Unix.",
      faqs: [
        {
          q: "Jak działa automatyczne wykrywanie jednostek?",
          a: "Liczby dziesiętne i liczby całkowite od 1 do 10 cyfr są traktowane jako sekundy. Liczby całkowite trzynastocyfrowe są traktowane jako milisekundy. Wybierz jednostkę dla wartości o 11–12 cyfrach.",
        },
        {
          q: "Jaki format daty mogę wpisać?",
          a: "Wprowadź lokalną datę i godzinę bez przesunięcia UTC, na przykład 2026-08-29T14:30. Sekundy oraz do dziewięciu cyfr ułamkowych są opcjonalne, lub użyj selektora.",
        },
        {
          q: "Czym różnią się opcje stref czasowych?",
          a: "Strefa czasowa przeglądarki jest domyślna i podąża za zasadami zegara skonfigurowanymi na Twoim urządzeniu. Wybierz przesunięcie UTC, aby używać stałej wartości, takiej jak +00:00 lub +09:00. Strefa IANA, taka jak America/New_York, podąża za zasadami zmiany czasu w tym regionie.",
        },
        {
          q: "Czy zmiana czasu na letni może sprawić, że znacznik czasu Unix będzie dwuznaczny?",
          a: "Nie. Znacznik czasu Unix identyfikuje jeden moment. Dwuznaczność pojawia się tylko wtedy, gdy konwertujesz lokalną datę i godzinę w strefie, w której czas się zmienia: niektóre lokalne godziny są pomijane, podczas gdy inne występują dwukrotnie. Narzędzie domyślnie pokazuje błąd; wybierz wcześniejszy lub późniejszy wynik tylko wtedy, gdy chcesz go rozwiązać.",
        },
      ],
    },
    textCompare: {
      title: "Porównywarka tekstu",
      description:
        "Porównaj dwa teksty linia po linii i zaznacz dodatki, usunięcia i zmiany bez przesyłania żadnej wersji.",
      originalLabel: "Oryginalny tekst",
      changedLabel: "Zmieniony tekst",
      originalPlaceholder: "Wklej tutaj oryginalny tekst…",
      changedPlaceholder: "Wklej tutaj zmieniony tekst…",
      compare: "Porównaj",
      swap: "Zamień",
      results: "Wyniki porównania",
      empty: "Wprowadź tekst przynajmniej po jednej stronie, aby porównać.",
      tooLarge: "Każdy tekst musi mieć 1 MiB lub mniej.",
      tooManyLines: "Dwa teksty mogą łącznie zawierać do 20 000 linii.",
      tooComplex:
        "To porównanie jest zbyt skomplikowane, aby je przetworzyć bezpiecznie. Spróbuj krótszych tekstów.",
      stale:
        "Poniższy wynik pochodzi z poprzedniego porównania. Porównaj ponownie, aby go zaktualizować.",
      complete: "Porównanie zakończone",
      identical: "Te dwa teksty są identyczne.",
      approximate:
        "Ta przeglądarka nie obsługuje Intl.Segmenter, więc podkreślenia znaków w linii są przybliżone.",
      inlineLimited:
        "Niektóre długie edytowane linie są wyświetlane jako zmiany całych linii, aby utrzymać responsywność porównania.",
      additions: "Dodane linie: {count}",
      deletions: "Usunięte linie: {count}",
      changes: "Zmienione wiersze: {count}",
      previousChange: "Poprzednia zmiana",
      nextChange: "Następna zmiana",
      expandUnchanged: "Pokaż niezmienione linie {count}",
      whitespaceChange: "Zmiana białych znaków",
      lineEndingChange: "Zmieniono zakończenie linii",
      unchangedRow: "Niezmieniona linia",
      addedRow: "Dodano linię",
      removedRow: "Usunięty wiersz",
      changedRow: "Zmieniona linia",
      originalLine: "Oryginalna linia {line}",
      changedLine: "Zmieniono linię {line}",
      guideTitle: "Jak działa porównanie",
      guideBody:
        "Porównanie najpierw wyrównuje linie, a następnie podkreśla edycje na poziomie znaków wewnątrz sparowanych zmienionych linii. Zmiany polegające wyłącznie na spacjach i końcach linii są oznaczone wyraźnie. Długie niezmienione sekcje pozostają zwinięte, dopóki ich nie rozwiniesz.",
      faqs: [
        {
          q: "Czy AbsolTools przesyła teksty?",
          a: "Nie. Oba teksty są porównywane lokalnie w Twojej przeglądarce i nie są wysyłane na serwer.",
        },
        {
          q: "Czy wykryto różne zakończenia linii?",
          a: "Tak. Różnice między zakończeniami wierszy CRLF, LF i CR są zaznaczone, nawet gdy widoczny tekst wiersza jest taki sam.",
        },
      ],
    },
    caseConverter: {
      title: "Konwerter wielkości liter",
      description:
        "Konwertuj tekst na wielkie litery, małe litery, zdania lub kapitalizowane wyrazy bez jego przesyłania.",
      inputLabel: "Tekst",
      outputLabel: "Przekonwertowany tekst",
      placeholder: "Wpisz lub wklej tekst tutaj…",
      outputPlaceholder: "Przekonwertowany tekst pojawia się tutaj.",
      modeLabel: "Konwersja",
      upper: "WIELKIE LITERY",
      lower: "małe litery",
      sentence: "Jak w zdaniu",
      capitalizeWords: "Każde słowo wielką literą",
      converted: "Konwersja zakończona",
      noChange: "Tekst już odpowiada tej konwersji.",
      outdated: "Widoczny wynik pochodzi z poprzedniego wejścia.",
      tooLarge: "Wprowadzony tekst przekracza limit 1 MB.",
      guideTitle: "Jak działa każda konwersja",
      guideBody:
        "Wielkie i małe litery używają domyślnych mapowań wielkości liter Unicode. Pisownia zdaniowa zamienia tekst na małe litery i kapitalizuje pierwszą literę z wielkiej na początku, po przerwie w linii lub po . ! ? 。 ！ ？. Kapitalizacja słów zamienia na wielkie litery pierwszą literę każdego słowa, zachowując spacje, interpunkcję, przerwy w linii, apostrofy, myślniki i podkreślenia.",
      faqs: [
        {
          q: "Czy kapitalizacja słów jest tym samym co zapis w formacie tytułowym?",
          a: "Nie. Każde słowo jest kapitalizowane mechanicznie i nie stosuje się specyficznych dla języka zasad dotyczących tytułów dla artykułów, przyimków, nazw ani skrótów.",
        },
        {
          q: "Czy konwersja zachowuje odstępy i podziały linii?",
          a: "Tak. Narzędzie zmienia tylko wielkość liter i zachowuje oryginalne odstępy, interpunkcję oraz podziały wierszy.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Przykład: AbsolTools zlicza słowa i znaki online.",
    jsonInput: 'Przykład: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Przykład: 1704067200 (sekundy) lub 1704067200000 (milisekundy).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Przykładowy format: 2024-01-01T00:00. Sekundy są opcjonalne, a możesz również użyć selektora daty.",
    timeResult: "Przekształcona wartość",
  },
  catalog: {
    "base64-decode": {
      name: "Dekoder Base64",
      summary: "Odszyfruj tekst lub pliki Base64 online.",
      searchTerms: [
        "dekodować",
        "dekoder",
        "Base64URL",
        "Data URI",
        "tekst",
        "plik",
        "binarny",
      ],
    },
    "base64-encode": {
      name: "Kodownik Base64",
      summary: "Koduj tekst lub pliki do Base64 online.",
      searchTerms: [
        "kodować",
        "enkoder",
        "Base64URL",
        "Data URI",
        "tekst",
        "plik",
        "binarny",
      ],
    },
    "word-counter": {
      name: "Licznik słów i znaków",
      summary: "Liczenie słów, znaków, linii i akapitów online.",
      searchTerms: [
        "liczba słów",
        "liczba znaków",
        "litery",
        "linie",
        "akapity",
        "tekst",
      ],
    },
    "json-formatter": {
      name: "Formater JSON",
      summary:
        "Ułatw odczytanie JSON, sprawdź go pod kątem błędów lub zmniejsz do jednej linii.",
      searchTerms: [
        "format JSON",
        "zweryfikuj JSON",
        "zmniejsz JSON",
        "ładne drukowanie",
        "dane",
      ],
    },
    "unix-timestamp-converter": {
      name: "Konwerter czasu Unix",
      summary:
        "Konwertuj znaczniki czasu Unix w sekundach lub milisekundach na daty i godziny, i odwrotnie.",
      searchTerms: [
        "czas Unix",
        "epoka",
        "czas epoki",
        "sekundy",
        "milisekundy",
        "data",
        "czas",
      ],
    },
    "text-compare": {
      name: "Porównywarka tekstu",
      summary: "Porównaj dwa teksty linia po linii i podkreśl ich różnice.",
      searchTerms: [
        "różnica tekstu",
        "porównaj tekst",
        "różnice",
        "porównanie linii",
      ],
    },
    "case-converter": {
      name: "Konwerter wielkości liter",
      summary:
        "Konwertuj tekst na wielkie litery, małe litery, pierwszą literę zdania wielką lub każde słowo z wielkiej litery.",
      searchTerms: [
        "wielka litera",
        "małe litery",
        "wielkość liter w zdaniu",
        "zapitolić",
        "tekst",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Wszystkie narzędzia",
    directoryMetaTitle: "AbsolTools | Przydatne narzędzia, zawsze pod ręką",
    directoryMetaDescription:
      "Formatuj, konwertuj, koduj, dekoduj, porównuj i sprawdzaj tekst, dane oraz kod bezpośrednio w przeglądarce. Dane wejściowe i wyniki nie są przesyłane.",
    directoryTitle:
      "Sprawiamy, że narzędzia, z których często korzystasz, są prostsze i wygodniejsze",
    directoryIntro:
      "Bez rejestracji i bez zapisywania na serwerze: wszystkie narzędzia są bezpłatne. Dodaj tę stronę do zakładek na następny raz.",
    toolPromise: {
      improvement:
        "AbsolTools sprawia, że często używane narzędzia są dokładniejsze i wygodniejsze.",
      privacy:
        "Wszystkie narzędzia są bezpłatne i nie wymagają rejestracji. Przetwarzanie odbywa się w przeglądarce; dane wejściowe ani wyniki nie są zapisywane na serwerze ani na niego wysyłane.",
      bookmark:
        "Dodaj tę stronę do zakładek, aby następnym razem od razu do niej wrócić.",
    },
    directorySearchLabel: "Szukaj narzędzi",
    directorySearchPlaceholder:
      "Wyszukaj według nazwy, opisu lub słowa kluczowego",
    directorySearchClear: "Wyczyść wyszukiwanie",
    directorySearchNoResults:
      "Żadne narzędzia nie pasują do Twojego wyszukiwania.",
    directorySearchCount: "Narzędzia dopasowujące: {count}",
    available: "Dostępne",
    research: "Wersja testowa",
    reserve: "Planowane",
    breadcrumbLabel: "Nawigacja okruszkowa",
    encodingCategory: "Kodowanie i dekodowanie",
    categories: {
      encoding: "Kodowanie",
      generator: "Generatory",
      text: "Tekst",
      converter: "Konwertery",
      image: "Obrazy",
      pdf: "PDF",
      data: "Dane",
      calculator: "Kalkulatory",
      time: "Czas",
    },
    footerNote: "Popularne funkcje, wygodniejsze w użyciu.",
    catalogAria: "Katalog narzędzi",
    useLightTheme: "Użyj jasnego motywu",
    useDarkTheme: "Użyj ciemnego motywu",
    relatedTools: "Powiązane narzędzia",
  },
} satisfies LocaleBundle;

export default plBundle;
