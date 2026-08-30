import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/cs";

const csBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Čeština",
    metaTitle: "Base64 Dekodér & Encoder — Rychlý, Soukromý, Online",
    metaDescription:
      "Dekódujte Base64 na text nebo soubory a kódujte text nebo soubory online. Podporuje Base64URL, chybějící výplň, Data URI a starší znakové kódování.",
    decodeMetaTitle: "Base64 Dekodér pro text a soubory | AbsolTools",
    encodeMetaTitle: "Base64 Kódovač pro text a soubory | AbsolTools",
    skipToContent: "Přejít na obsah",
    languageNavLabel: "Jazyk",
    legalNavLabel: "Právní a kontakt",
    modeLabel: "Režim konverze",
    heading: "Dekódujte Base64 online.",
    subheading:
      "Vložte text Base64 nebo otevřete soubor. Standardní vstupy Base64, Base64URL, chybějící vycpávka a Data URI jsou zpracovávány lokálně.",
    encodeHeading: "Kódujte text nebo soubory online jako Base64.",
    encodeSubheading:
      "Zadejte text nebo otevřete soubor. Převádějte textové a binární soubory UTF-8 na standardní Base64 nebo Base64URL, aniž byste je nahrávali.",
    decode: "Dekódovat",
    encode: "Kódovat",
    inputLabel: "Base64 vstup",
    outputLabel: "Dekódovaný výstup",
    encodeInputLabel: "Text nebo vstup souboru",
    encodeOutputLabel: "výstup Base64",
    decodePlaceholder: "Příklad: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Příklad: Ahoj, AbsolTools!",
    outputPlaceholder: "Výsledek se zde zobrazuje.",
    openFile: "Otevřít soubor",
    runDecode: "Dekódovat nyní",
    runEncode: "Zakódujte nyní",
    options: "Možnosti",
    detected: "Detekováno",
    decodeComplete: "Dekódování dokončeno",
    encodeComplete: "Kódování dokončeno",
    charset: "Znakové kódování",
    variant: "formát Base64",
    auto: "Detekovat automaticky",
    standard: "Standard",
    urlSafe: "bezpečný pro URL",
    strict: "Přísně ověřit",
    lineByLine: "Dekódujte každý řádek zvlášť",
    autoRepair: "Opravit mezery a odsazení",
    lenientRepair: "Odstraňte zbývající neplatné znaky",
    outputView: "Formát výstupu",
    text: "Text",
    hex: "Hex",
    includePadding: "Include = odsazení",
    mimeWrap: "Zalomit na 76 znacích",
    dataUri: "Přidejte předponu Data URI",
    dropHint: "Přetáhněte textový nebo binární soubor kamkoli do převodníku.",
    fileTooLarge: "Maximální velikost vstupu je 100 MiB.",
    binaryOutput:
      "Byla detekována binární data. Zkontrolujte typ souboru a poté si jej stáhněte místo toho, abyste jej spouštěli přímo.",
    executableWarning:
      "Byl detekován spustitelný soubor. Nespouštějte soubory dekódované z nedůvěryhodného zdroje.",
    imagePreview: "Náhled obrázku",
    errors: {
      "empty-input": "Nejprve zadejte nějaký text nebo otevřete soubor.",
      "invalid-character":
        "Tato hodnota obsahuje znak, který není platný Base64.",
      "invalid-length": "Hodnota Base64 je zkrácena nebo má nemožnou délku.",
      "decode-failed": "Hodnota nemohla být dekódována.",
      "encode-failed": "Soubor nelze zakódovat.",
      "unsupported-charset":
        "Toto kódování znaků není vaším prohlížečem podporováno.",
      "file-too-large": "Tento vstup je větší než bezpečnostní limit 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "prefix Data URI odstraněn",
      "whitespace-removed": "Odstraněny mezery",
      "url-alphabet-normalized": "Detekováno písmeno Base64URL",
      "padding-added": "Chybějící vyplnění bylo přidáno",
      "invalid-characters-removed": "Neplatné znaky byly odstraněny",
    },
    guideTitle: "Jak dekódovat Base64",
    guideIntro:
      "Base64 je formát kódování, ne šifrování. Každý, kdo má tuto hodnotu, ji může dekódovat.",
    guideSteps: [
      "Vložte hodnotu Base64 nebo otevřete soubor, který ji obsahuje.",
      "Nástroj detekuje formát a aplikuje běžné opravy, jako je odstranění mezer nebo obnovení chybějícího doplňujícího znaku.",
      "Kopírujte čitelný text nebo stáhněte binární výstup jako soubor.",
    ],
    encodeGuideTitle: "Jak zakódovat Base64",
    encodeGuideIntro:
      "Base64 převádí text nebo binární bajty na tisknutelné znaky. Nešifruje ani nechrání zdrojová data.",
    encodeGuideSteps: [
      "Napište text nebo otevřete soubor, který chcete zakódovat.",
      "Zvolte standardní Base64 nebo URL-bezpečnou abecedu, poté upravte vyrovnání nebo zalamování řádků pouze tehdy, když to cílové místo vyžaduje.",
      "Zkopírujte výsledek Base64 nebo jej stáhněte jako textový soubor.",
    ],
    safetyTitle: "Vaše vstupy nejsou ukládány.",
    safetyBody:
      "Stránka neukládá váš vstup ani výsledky převodu a neposílá je na server. Vše se zpracovává ve vaší aktuální relaci prohlížeče a zmizí po obnovení nebo zavření stránky.",
    detailsTitle: "Standardy a zpracování vstupu",
    detailsBody:
      "Ve výchozím nastavení nástroj sleduje RFC 4648 a zpracovává standardní a URL-bezpečné abecedy, volitelné doplňování, MIME mezery a prefixy Data URI. Zapněte přísnou validaci, pokud záleží na přesném formátu.",
    faqTitle: "Nejčastěji kladené otázky",
    faqs: [
      {
        q: "Je Base64 šifrování?",
        a: "Ne. Base64 převádí binární data na tisknutelný text. Neposkytuje žádné zabezpečení ani ověřování.",
      },
      {
        q: "Proč nemohu číst dekódovaný výstup?",
        a: "Výstup může být soubor, komprimovaná nebo šifrovaná data, nebo text v jiném kódování znaků. Zkuste stáhnout soubor nebo zvolit jiné kódování znaků.",
      },
      {
        q: "Nahrává tento web můj vstup?",
        a: "Ne. Převod probíhá ve vašem prohlížeči. Vaše vstupy, soubory a výsledky nejsou nahrávány na server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Je Base64 šifrování?",
        a: "Ne. Base64 převádí binární data na tisknutelný text. Neposkytuje žádné zabezpečení ani ověřování.",
      },
      {
        q: "Měl bych použít standardní Base64 nebo Base64URL?",
        a: "Pro obecné soubory a data používejte standardní Base64. Používejte Base64URL, když musí hodnota bezpečně vystupovat v URL nebo názvu souboru.",
      },
      {
        q: "Nahrává tento web můj vstup?",
        a: "Ne. Převod probíhá ve vašem prohlížeči. Vaše vstupy, soubory a výsledky nejsou nahrávány na server.",
      },
    ],
    advertisement: "Reklama",
    integrationState: {
      enabled: "povoleno s ovládáním souhlasu",
      disabled: "zakázáno",
    },
    legalNav: {
      about: "O webu",
      privacy: "Ochrana soukromí",
      cookies: "Sušenky",
      terms: "Podmínky",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "O webu",
        intro:
          "AbsolTools poskytuje online nástroje pro práci s textem, daty, časem a kódováním.",
        sections: [
          {
            title: "Co stavíme",
            body: [
              "Každý nástroj se zabývá jedním konkrétním úkolem, aniž by vyžadoval účet. Vstupy a výsledky nástroje jsou zpracovávány ve vašem prohlížeči.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Posílejte otázky, hlášení chyb a žádosti o soukromí na {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Zásady ochrany osobních údajů",
        intro:
          "Tato politika odděluje vstup a výsledky nástroje od údajů z webových stránek, analytiky a reklamy.",
        sections: [
          {
            title: "Vstup nástroje a výsledky",
            body: [
              "Text, soubory, JSON, hodnoty data a času, dekódované bajty a generované výsledky jsou zpracovávány v prohlížeči. Vstupy a výsledky nástroje nejsou nahrávány na server ani na něm ukládány.",
            ],
          },
          {
            title: "Provoz webu",
            body: [
              "{{host_provider}} slouží k ochraně a správě tohoto statického webu a může zpracovávat údaje o připojení, jako je vaše IP adresa, čas požadavku, informace o prohlížeči a požadovaná URL. Jeho uvedené nastavení uchovávání záznamů je {{host_log_retention}}. Politika poskytovatele: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analytika a reklama",
            body: [
              "Google Analytics a Google AdSense jsou aktuálně {{integration_state}}. Po povolení budou zde zveřejněny a spravovány prostřednictvím voleb ochrany soukromí jejich údaje o zařízení, využívání, souborech cookie, souhlasu, uchovávání a mezinárodních přenosech. Vstupy a výsledky nástroje jsou z analytických a reklamních událostí záměrně vyloučeny.",
            ],
          },
          {
            title: "Cookies a automatické shromažďování",
            body: [
              "Nástroje neukládají vstupy ani výsledky nástroje do cookies nebo úložiště prohlížeče. Pokud si vyberete téma, web ukládá do místního úložiště pouze světlé nebo tmavé a nepřenáší je. Bezpečnostní technologie hostingu může používat pouze nezbytné úložiště, pokud je to zdokumentováno vybraným poskytovatelem. Volitelné úložiště pro analytiku a reklamu zůstává zablokováno, dokud jsou tyto integrace deaktivovány.",
            ],
          },
          {
            title: "Uchovávání a mazání",
            body: [
              "Operátor si neuchovává vstupy do nástroje ani výsledky. Data požadavku na hostování se řídí uchováváním poskytovatele uvedeným výše. Korespondence ohledně kontaktu je uchovávána pouze po dobu nezbytnou k vyřízení požadavku, splnění právních povinností nebo řešení zneužití, poté je vymazána nebo anonymizována.",
            ],
          },
          {
            title: "Příjemci a mezinárodní převody",
            body: [
              "Vybraný hostitel může zpracovávat údaje o požadavcích mimo vaši zemi na místech a za podmínek uvedených ve své zásadě. Před tím, než je povolena analytika, reklama, správce souhlasu nebo jiný příjemce, musí tato sekce identifikovat příjemce, země, účel, údaje, časování, metodu, dobu uchovávání a základ přenosu vyžadovaný platným právem.",
            ],
          },
          {
            title: "Vaše volby a kontakt",
            body: [
              "Kde je to možné, můžete požádat o přístup, opravu, vymazání, omezení, námitku, přenositelnost nebo odvolání souhlasu kontaktováním {{email}}. Před vyřízením žádosti můžeme potřebovat přiměřené ověření.",
            ],
          },
          {
            title: "Děti, bezpečnost a změny",
            body: [
              "Tento obecný nástroj pro vývojáře není určen pro děti. Používáme statickou architekturu lokální v prohlížeči a omezující zásady prohlížeče, abychom snížili riziko, ale žádná služba není zcela bezpečná. Materiální změny zásad budou datovány na této stránce; účinné datum: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Zásady používání cookies",
        intro: "Nástroje nepotřebují cookies k zpracování vstupu.",
        sections: [
          {
            title: "Současné použití",
            body: [
              "Analytika a reklama jsou v současné době {{integration_state}}. Stránka neukládá vstupy ani výsledky nástroje do cookies nebo místního úložiště. Ukládá pouze vaši vybranou preferenci tématu (světlé nebo tmavé) do místního úložiště; tato hodnota není přenášena.",
            ],
          },
          {
            title: "Pokud jsou integrace povoleny",
            body: [
              "Platforma pro souhlas bude řídit nezbytné uchovávání preferencí, uchovávání analytických údajů a uchovávání reklamních údajů. Trvalá kontrola soukromí umožní návštěvníkům přezkoumat nebo odvolat souhlas.",
            ],
          },
        ],
      },
      terms: {
        title: "Podmínky použití",
        intro: "Používání tohoto bezplatného nástroje podléhá těmto podmínkám.",
        sections: [
          {
            title: "Služba",
            body: [
              "Služba je poskytována tak, jak je, bez záruk přesnosti, dostupnosti, vhodnosti pro konkrétní účel nebo nepřetržitého provozu. Důležité výsledky ověřujte samostatně.",
            ],
          },
          {
            title: "Bezpečné a zákonné používání",
            body: [
              "Nepoužívejte službu k útokům na systémy, porušování zákona nebo práv třetích stran, ani k šíření škodlivého obsahu. Nikdy nespouštějte dekódovaný soubor z nedůvěryhodného zdroje.",
            ],
          },
          {
            title: "Odpovědnost a třetí strany",
            body: [
              "V rozsahu, v jakém to povinný zákon dovoluje, provozovatel nenese odpovědnost za nepřímou ani následnou škodu. Reklamy a odkazy třetích stran nejsou doporučeními.",
            ],
          },
          {
            title: "Duševní vlastnictví a změny",
            body: [
              "Design webu a původní vysvětlující obsah jsou chráněny příslušnými zákony. Za obsah, který zpracováváte, nesete odpovědnost vy. Můžeme měnit nebo ukončit funkce a budeme uvádět datum změn hlavních podmínek.",
            ],
          },
          {
            title: "Rozhodné právo a kontakt",
            body: [
              "Tato služba je provozována z {{region}}. Rozhodné právo: {{governing_law}}. Jurisdikce: {{jurisdiction}}. Povinná ochrana spotřebitele nadále platí. Kontaktujte {{email}}. Datum účinnosti: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Vítáme otázky, hlášení chyb, žádosti o ochranu soukromí a hlášení zneužití.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Kontaktujte {{email}}. Do své zprávy nezahrnujte vstupy z nástrojů, jako jsou citlivé texty, hodnoty JSON, Base64, hesla, soukromé klíče nebo osobní soubory.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Náhled",
    ready: "Připraveno",
    working: "Zpracovávám…",
    clear: "Vymazat",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    copyFailed: "Nelze zkopírovat výsledek.",
    processingFailed: "Zpracování selhalo. Zkuste to znovu.",
    download: "Stáhnout",
    faqTitle: "Nejčastěji kladené otázky",
    localTitle: "AbsolTools funguje ve vašem prohlížeči.",
    localBody:
      "Váš vstup a výsledky jsou zpracovávány pouze v tomto prohlížeči. Nejsou nahrávány na server ani na něm ukládány.",
  },
  preview: {
    word: {
      title: "Počítadlo slov a znaků",
      description:
        "Počítejte slova, znaky, znaky bez mezer, řádky a odstavce, aniž byste nahrávali svůj text.",
      inputLabel: "Text",
      words: "Slova",
      characters: "Postavy",
      noWhitespace: "Znaky bez mezer",
      lines: "Řádky",
      paragraphs: "Odstavce",
      completed: "Počet dokončen",
      approximate:
        "Tento prohlížeč nemá Intl.Segmenter, takže počty znaků a slov jsou přibližné.",
      tooLarge:
        "Vstup překračuje limit 1 MB. Zkraťte nebo vymažte text pro pokračování.",
      guideTitle: "Co se počítá",
      guideBody:
        "V podporovaných prohlížečích jsou znaky počítány jako grafémové shluky vnímané uživatelem, takže emoji nebo písmeno s kombinujícími znaky se obvykle počítá jako jedno. Počet bez mezer přeskočí mezerové grafémy v původním textu, aniž by spojoval grafémy na obou stranách. Řádky odpovídají zalomením řádků. Vizualně prázdné řádky, včetně řádků obsahujících pouze mezery, oddělují odstavce.",
      faqs: [
        {
          q: "Jak se počítají slova?",
          a: "Prohlížeče s Intl.Segmenter používají jazyk aktuální stránky pro určení hranic slov a počítají segmenty podobné slovům. Ostatní prohlížeče zobrazují přibližný počet.",
        },
        {
          q: "Počítají se emoji jako znaky?",
          a: "V podporovaných prohlížečích se emoji nebo kombinovaný znak, který se zobrazí jako jeden znak, počítá pouze jednou.",
        },
      ],
    },
    json: {
      title: "Formátovač JSON",
      description:
        "Naformátujte JSON, aby se snáze četl, zkontrolujte jej na chyby nebo jej zkraťte na jeden řádek.",
      inputLabel: "JSON vstup",
      outputLabel: "Výsledek",
      placeholder: "Vložte sem JSON…",
      outputPlaceholder:
        "Zde se zobrazuje formátovaný nebo minimalizovaný JSON.",
      openFile: "Otevřete .json",
      tooLarge: "Vstup přesahuje limit 10 MiB.",
      manualRequired:
        "Automatické ověřování bylo pozastaveno pro tento velký vstup. Zvolte Formát, Ověřit nebo Zmenšit.",
      format: "Formát",
      validate: "Ověřit",
      validateHelpLabel: "O ověření",
      validateHelp:
        "Kontroluje, zda vstup odpovídá syntaxi RFC 8259 JSON, a hlásí umístění a příčinu případné chyby syntaxe. Text nezmění ani jinak nepřeformátuje.",
      minify: "Minimalizovat",
      minifyHelpLabel: "O Minify",
      minifyHelp:
        "Odstraňuje volitelné mezery a zalomení řádků z platného JSON, aby byl kompaktní. Obsah řetězců, původní podoba čísel a duplicitní klíče objektů jsou zachovány.",
      indent: "Odsazení",
      twoSpaces: "2 mezery",
      fourSpaces: "4 mezery",
      tabs: "Karty",
      valid: "Platný JSON",
      invalidAt: "{message} Řádek {line}, sloupec {column}.",
      duplicate: "Duplicitní klíč na řádku {line}, sloupci {column}",
      bom: "UTF-8 BOM odstraněn před zpracováním.",
      errorMessages: {
        InvalidSymbol: "Neplatný symbol.",
        InvalidNumberFormat: "Neplatný formát čísla.",
        PropertyNameExpected: "Název vlastnosti je povinný.",
        ValueExpected: "Hodnota je vyžadována.",
        ColonExpected: "Po názvu vlastnosti je vyžadován dvojtečka.",
        CommaExpected: "Mezera je požadována mezi položkami.",
        CloseBraceExpected: "Je vyžadována závorka na konci.",
        CloseBracketExpected: "Je vyžadována závorka na konci.",
        EndOfFileExpected: "Neočekávaný obsah se objevuje po hodnotě JSON.",
        InvalidCommentToken: "Komentáře nejsou platné JSON.",
        UnexpectedEndOfComment: "Komentář je neúplný.",
        UnexpectedEndOfString: "Řetězec je neúplný.",
        UnexpectedEndOfNumber: "Číslo je neúplné.",
        InvalidUnicode: "Únik Unicode je neplatný.",
        InvalidEscapeCharacter: "Úniková sekvence je neplatná.",
        InvalidCharacter: "Tento znak zde není platný.",
        Unknown: "JSON není platný.",
      },
      guideTitle: "Pravidla JSON a zachování čísel",
      guideBody:
        "Validace následuje RFC 8259: komentáře, závěrečné čárky a jednoduché uvozovky jsou hlášeny jako chyby. Duplicitní klíče jsou zachovány s varováním a velká čísla si zachovávají přesnou notaci, kterou jste zadali.",
      faqs: [
        {
          q: "Změní se velká čísla?",
          a: "Ne. Formátování a minifikace nepřepočítávají čísla; zachovávají zápis, který jste zadali, takže velká čísla nejsou zaokrouhlována.",
        },
        {
          q: "Proč jsou hlášeny duplicitní klíče?",
          a: "Software může s duplicitními klíči objektů zacházet odlišně. AbsolTools je zachovává a místo tichého mazání dat zobrazuje upozornění.",
        },
        {
          q: "Opravuje formátovač neplatný JSON?",
          a: "Ne. Komentáře, závěrečné čárky, jednoduché uvozovky a další neplatná syntaxe jsou hlášeny, abyste mohli zdroj úmyslně opravit.",
        },
      ],
    },
    time: {
      title: "Převodník unixových časových razítek",
      description:
        "Převeďte časová razítka Unix v sekundách nebo milisekundách na data a časy v zvoleném časovém pásmu a zpět.",
      timestampMode: "Časové razítko na datum a čas",
      dateMode: "Datum a čas na časovou značku",
      timestampLabel: "Unix časové razítko",
      dateLabel: "Datum a čas",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Vyberte datum a čas",
      unit: "Jednotka",
      auto: "Automatické rozpoznávání",
      seconds: "Sekundy",
      milliseconds: "Milisekundy",
      zoneMode: "Časové pásmo",
      utc: "Offset UTC",
      local: "Časové pásmo prohlížeče",
      selected: "časové pásmo IANA",
      zoneLabel: "Město, region nebo časové pásmo IANA",
      zonePlaceholder: "Hledat New York, Asii nebo America/New_York",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Soul, Jižní Korea — Asie/Soul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "New York, Spojené státy — Amerika/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Spojené státy — Amerika/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "Londýn, Spojené království — Evropa/Londýn",
        },
        { value: "Europe/Paris", label: "Paříž, Francie — Evropa/Paříž" },
        { value: "Europe/Madrid", label: "Madrid, Španělsko — Evropa/Madrid" },
        { value: "Asia/Tokyo", label: "Tokio, Japonsko — Asie/Tokio" },
        { value: "Asia/Shanghai", label: "Šanghaj, Čína — Asie/Šanghaj" },
        { value: "Asia/Singapore", label: "Singapur — Asie/Singapur" },
        { value: "Asia/Kolkata", label: "Kalkata, Indie — Asie/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Austrálie — Austrálie/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, Nový Zéland — Pacifik/Auckland",
        },
      ],
      offsetLabel: "Posun od UTC",
      disambiguation: "Přeskočený nebo opakovaný místní čas",
      reject: "Zobrazit chybu",
      earlier: "Použijte dřívější výsledek",
      later: "Použijte pozdější výsledek",
      now: "Teď",
      convert: "Převést",
      instant: "UTC datum a čas",
      zoned: "Datum a čas ve vybrané zóně",
      unixSeconds: "Unix časová známka (sekundy)",
      unixMilliseconds: "Unix časové razítko (milisekundy)",
      converted: "Konverze dokončena",
      invalid:
        "Zadejte platný časový údaj Unix nebo datum a čas ve formátu ISO a zkontrolujte časové pásmo.",
      ambiguousUnit:
        "11- nebo 12-místné hodnoty jsou nejednoznačné. Zvolte sekundy nebo milisekundy.",
      nonexistentTime:
        "Tento datum a čas je v vybrané časové zóně přeskočen, protože hodiny se posouvají dopředu. Zvolte dřívější nebo pozdější výsledek.",
      repeatedTime:
        "Tento datum a čas se v vybrané časové zóně vyskytuje dvakrát, protože se hodiny posunou zpět. Vyberte dřívější nebo pozdější výsledek.",
      y2038:
        "Tato hodnota je mimo rozsah časového období podepsaného 32bitového Unix.",
      guideTitle: "Jak jsou jednotky a časová pásma zpracovávána",
      guideBody:
        "Automatické rozpoznávání považuje desetinná čísla a celá čísla o délce 1–10 číslic za sekundy, celá čísla o délce 13 číslic za milisekundy a u celých čísel o délce 11 nebo 12 číslic vás požádá, abyste vybrali jednotku. Zadejte přímo místní datum a čas nebo použijte výběr; sekundy a zlomky sekund jsou volitelné. Výchozí je časové pásmo prohlížeče. Při převodu časového razítka časové pásmo mění pouze zobrazovaný místní datum a čas. Při převodu místního data a času časové pásmo určuje hodnotu Unix.",
      faqs: [
        {
          q: "Jak funguje automatické rozpoznávání jednotek?",
          a: "Desetinná čísla a celá čísla s 1–10 číslicemi se považují za sekundy. Celá čísla s třinácti číslicemi se považují za milisekundy. Pro hodnoty s 11–12 číslicemi zvolte jednotku.",
        },
        {
          q: "Jaký formát data mohu zadat?",
          a: "Zadejte místní datum a čas bez posunu UTC, například 2026-08-29T14:30. Sekundy a až devět desetinných míst jsou volitelné, nebo použijte výběr.",
        },
        {
          q: "Jak se liší možnosti časového pásma?",
          a: "Časové pásmo prohlížeče je výchozí a řídí se pravidly hodin nastavenými na vašem zařízení. Zvolte posun UTC, chcete-li použít pevnou hodnotu, například +00:00 nebo +09:00. Pásmo IANA, například America/New_York, se řídí pravidly změny času daného regionu.",
        },
        {
          q: "Může letní čas způsobit, že bude časový údaj Unix nejednoznačný?",
          a: "Ne. Časová značka Unix identifikuje jediný okamžik. Nejasnosti vznikají pouze tehdy, když převedete místní datum a čas ve zóně, kde se mění hodiny: některé místní časy jsou přeskočeny, zatímco jiné se vyskytují dvakrát. Nástroj ve výchozím nastavení zobrazí chybu; vyberte dřívější nebo pozdější výsledek pouze tehdy, pokud chcete, aby byla nejednoznačnost vyřešena.",
        },
      ],
    },
    textCompare: {
      title: "Porovnání textu",
      description:
        "Porovnejte dva texty řádek po řádku a zvýrazněte přidané, odstraněné a upravené části, aniž byste nahrávali některou verzi.",
      originalLabel: "Originální text",
      changedLabel: "Změněný text",
      originalPlaceholder: "Vložte původní text sem…",
      changedPlaceholder: "Vložte sem upravený text…",
      compare: "Porovnat",
      swap: "Vyměnit",
      results: "Výsledky srovnání",
      empty: "Zadejte text alespoň na jednu stranu k porovnání.",
      tooLarge: "Každý text musí mít velikost 1 MiB nebo méně.",
      tooManyLines: "Oba texty mohou obsahovat celkem až 20 000 řádků.",
      tooComplex:
        "Toto porovnání je příliš složité na bezpečné zpracování. Zkuste kratší texty.",
      stale:
        "Níže uvedený výsledek pochází z předchozího porovnání. Porovnejte znovu, abyste ho aktualizovali.",
      complete: "Porovnání dokončeno",
      identical: "Tyto dva texty jsou identické.",
      approximate:
        "Tento prohlížeč postrádá Intl.Segmenter, takže zvýraznění jednotlivých znaků je přibližné.",
      inlineLimited:
        "Některé dlouhé upravené řádky jsou zobrazeny jako změny celého řádku, aby byla srovnání rychlejší.",
      additions: "Přidané řádky: {count}",
      deletions: "Odstraněné řádky: {count}",
      changes: "Změněné řádky: {count}",
      previousChange: "Předchozí změna",
      nextChange: "Další změna",
      expandUnchanged: "Zobrazit nezměněné řádky {count}",
      whitespaceChange: "Mezery byly změněny",
      lineEndingChange: "Konec řádku změněn",
      unchangedRow: "Nezměněný řádek",
      addedRow: "Přidaný řádek",
      removedRow: "Odstraněný řádek",
      changedRow: "Změněný řádek",
      originalLine: "Originální řádek {line}",
      changedLine: "Změněný řádek {line}",
      guideTitle: "Jak funguje porovnání",
      guideBody:
        "Porovnání nejprve zarovná řádky a poté zvýrazní úpravy na úrovni znaků uvnitř dvojic změněných řádků. Mezery a změny pouze na konci řádku jsou explicitně označeny. Dlouhé nezměněné části zůstávají sbalené, dokud je nerozbalíte.",
      faqs: [
        {
          q: "Nahraje AbsolTools texty?",
          a: "Ne. Oba texty jsou porovnávány lokálně ve vašem prohlížeči a nejsou odesílány na server.",
        },
        {
          q: "Jsou detekovány různé konce řádků?",
          a: "Ano. Rozdíly mezi konci řádků CRLF, LF a CR jsou zaznamenány, i když je viditelný text řádku stejný.",
        },
      ],
    },
    caseConverter: {
      title: "Převod velikosti písmen",
      description:
        "Převeďte text na velká písmena, malá písmena, první písmeno věty nebo na slova s velkým počátečním písmenem, aniž byste jej nahrávali.",
      inputLabel: "Text",
      outputLabel: "Převedený text",
      placeholder: "Sem napište nebo vložte text…",
      outputPlaceholder: "Převedený text se objeví zde.",
      modeLabel: "Konverze",
      upper: "VELKÁ PÍSMENA",
      lower: "malá písmena",
      sentence: "Velká písmena na začátku věty",
      capitalizeWords: "Velké počáteční písmeno u každého slova",
      converted: "Konverze dokončena",
      noChange: "Text již odpovídá této konverzi.",
      outdated: "Viditelný výstup pochází z předchozího vstupu.",
      tooLarge: "Vstup přesahuje limit 1 MB.",
      guideTitle: "Jak každá konverze funguje",
      guideBody:
        "Velká a malá písmena používají výchozí mapování případů Unicode. Většinové písmo převádí text na malá písmena a při začátku, po zlomu řádku nebo po znacích . ! ? 。 ！ ？ velká písmena změní první písmeno s přípustným zápisem. Kapitalizace slov převádí první písmeno každého slova na velké písmeno a zachovává mezery, interpunkci, zlomy řádků, apostrofy, spojovníky a podtržítka.",
      faqs: [
        {
          q: "Je kapitalizace slov to samé co titulní písmo?",
          a: "Ne. Každé slovo velká písmena použije mechanicky a neuplatňuje jazykově specifická pravidla pro články, předložky, vlastní jména nebo zkratky.",
        },
        {
          q: "Zachovává převod mezery a zalomení řádků?",
          a: "Ano. Nástroj mění pouze velikost písmen a zachovává původní mezery, interpunkci a zalomení řádků.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Příklad: AbsolTools počítá slova a znaky online.",
    jsonInput: 'Příklad: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Příklad: 1704067200 (sekundy) nebo 1704067200000 (milisekundy).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Příklad formátu: 2024-01-01T00:00. Sekundy jsou volitelné a můžete také použít výběr data.",
    timeResult: "Převedená hodnota",
  },
  catalog: {
    "base64-decode": {
      name: "Dekodér Base64",
      summary: "Dekódujte text nebo soubory Base64 online.",
      searchTerms: [
        "dekódovat",
        "dekodér",
        "Base64URL",
        "Data URI",
        "text",
        "soubor",
        "binární",
      ],
    },
    "base64-encode": {
      name: "Kodér Base64",
      summary: "Kódujte text nebo soubory do Base64 online.",
      searchTerms: [
        "zakódovat",
        "kodér",
        "Base64URL",
        "Data URI",
        "text",
        "soubor",
        "binární",
      ],
    },
    "word-counter": {
      name: "Počítadlo slov a znaků",
      summary: "Počítat slova, znaky, řádky a odstavce online.",
      searchTerms: [
        "počet slov",
        "počet znaků",
        "dopisy",
        "linky",
        "odstavce",
        "text",
      ],
    },
    "json-formatter": {
      name: "Formátovač JSON",
      summary:
        "Udělejte JSON snazší k přečtení, zkontrolujte ho na chyby nebo ho zkomprimujte na jeden řádek.",
      searchTerms: [
        "formát JSON",
        "ověřit JSON",
        "zmenšit JSON",
        "hezké formátování",
        "data",
      ],
    },
    "unix-timestamp-converter": {
      name: "Převodník unixových časových razítek",
      summary:
        "Převeďte časová razítka Unix v sekundách nebo milisekundách na datum a čas a zpět.",
      searchTerms: [
        "Unix čas",
        "éra",
        "epocha času",
        "sekundy",
        "milisekundy",
        "datum",
        "čas",
      ],
    },
    "text-compare": {
      name: "Porovnání textu",
      summary:
        "Porovnejte dva texty řádek po řádku a zvýrazněte jejich rozdíly.",
      searchTerms: [
        "rozdíl textu",
        "porovnat text",
        "rozdíly",
        "porovnání čar",
      ],
    },
    "case-converter": {
      name: "Převod velikosti písmen",
      summary:
        "Převést text na velká písmena, malá písmena, větný zápis nebo slova s velkým počátečním písmenem.",
      searchTerms: [
        "velká písmena",
        "malá písmena",
        "větný tvar",
        "psát velkým písmenem",
        "text",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Všechny nástroje",
    directoryMetaTitle:
      "Zdarma online nástroje pro text, data a kódování | AbsolTools",
    directoryMetaDescription:
      "Zpracovávejte text, data, čas a úkoly kódování online.",
    directoryTitle:
      "Často používané nástroje děláme přehlednějšími a praktičtějšími",
    directoryIntro:
      "Přidejte si tento web do záložek, abyste se sem příště dostali rovnou.",
    toolPromise:
      "AbsolTools dělá běžně používané online nástroje přesnější a snadněji použitelné. Přidejte si web do záložek.",
    directorySearchLabel: "Hledat nástroje",
    directorySearchPlaceholder:
      "Hledat podle jména, popisu nebo klíčového slova",
    directorySearchClear: "Vymazat hledání",
    directorySearchNoResults: "Žádné nástroje neodpovídají vašemu hledání.",
    directorySearchCount: "Nástroje pro párování: {count}",
    available: "K dispozici",
    research: "Náhled",
    reserve: "Ve fázi posuzování",
    breadcrumbLabel: "Drobečková navigace",
    encodingCategory: "Kódování a dekódování",
    categories: {
      encoding: "Kódování",
      text: "Text",
      data: "Data",
      time: "Čas",
    },
    footerNote: "Oblíbené funkce, jednodušší na používání.",
    catalogAria: "Adresář nástrojů",
    useLightTheme: "Použít světlé téma",
    useDarkTheme: "Použít tmavé téma",
  },
} satisfies LocaleBundle;

export default csBundle;
