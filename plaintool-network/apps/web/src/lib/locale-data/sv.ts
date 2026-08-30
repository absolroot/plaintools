import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/sv";

const svBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Svenska",
    metaTitle: "Base64-dekoder & kodare — Snabb, privat, online",
    metaDescription:
      "Avkoda Base64 till text eller filer och koda text eller filer online. Stöder Base64URL, saknad paddning, Data URIs och äldre teckenkodningar.",
    decodeMetaTitle: "Base64-avkodare för text och filer | AbsolTools",
    encodeMetaTitle: "Base64-kodare för text och filer | AbsolTools",
    skipToContent: "Hoppa till innehållet",
    languageNavLabel: "Språk",
    legalNavLabel: "Juridiskt och kontakt",
    modeLabel: "Konverteringsläge",
    heading: "Avkoda Base64 online.",
    subheading:
      "Klistra in Base64-text eller öppna en fil. Standard Base64, Base64URL, saknad paddning och Data URI-inmatning hanteras lokalt.",
    encodeHeading: "Koda text eller filer som Base64 online.",
    encodeSubheading:
      "Ange text eller öppna en fil. Konvertera UTF-8-text och binära filer till standard Base64 eller Base64URL utan att ladda upp dem.",
    decode: "Avkoda",
    encode: "Koda",
    inputLabel: "Base64 inmatning",
    outputLabel: "Avkodat resultat",
    encodeInputLabel: "Text- eller filinmatning",
    encodeOutputLabel: "Base64-utgång",
    decodePlaceholder: "Exempel: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Exempel: Hej, AbsolTools!",
    outputPlaceholder: "Resultatet visas här.",
    openFile: "Öppna fil",
    runDecode: "Avkoda nu",
    runEncode: "Koda nu",
    options: "Alternativ",
    detected: "Upptäckt",
    decodeComplete: "Avkodning slutförd",
    encodeComplete: "Kodning klar",
    charset: "Teckenkodning",
    variant: "Base64-format",
    auto: "Upptäck automatiskt",
    standard: "Standard",
    urlSafe: "URL-säker",
    strict: "Validera strikt",
    lineByLine: "Avkoda varje rad separat",
    autoRepair: "Åtgärda vita tecken och utfyllnad",
    lenientRepair: "Ta bort återstående ogiltiga tecken",
    outputView: "Utdataformat",
    text: "Text",
    hex: "Hex",
    includePadding: "Inkludera = stoppning",
    mimeWrap: "Bryt vid 76 tecken",
    dataUri: "Lägg till Data URI-prefix",
    dropHint: "Släpp en text- eller binär fil var som helst i konverteraren.",
    fileTooLarge: "Maximal inmatningsstorlek är 100 MiB.",
    binaryOutput:
      "Binär data upptäckt. Granska filtypen och ladda sedan ner den istället för att köra den direkt.",
    executableWarning:
      "Körbar fil upptäckt. Kör inte filer som avkodats från en opålitlig källa.",
    imagePreview: "Bildförhandsvisning",
    errors: {
      "empty-input": "Ange lite text eller öppna en fil först.",
      "invalid-character":
        "Detta värde innehåller ett tecken som inte är giltigt Base64.",
      "invalid-length":
        "Värdet Base64 är trunkerat eller har en omöjlig längd.",
      "decode-failed": "Värdet kunde inte avkodas.",
      "encode-failed": "Filen kunde inte kodas.",
      "unsupported-charset":
        "Denna teckenkodning stöds inte av din webbläsare.",
      "file-too-large":
        "Denna inmatning är större än säkerhetsgränsen på 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Data URI-prefix borttagen",
      "whitespace-removed": "Mellanslag borttaget",
      "url-alphabet-normalized": "Base64URL-alfabet upptäckt",
      "padding-added": "Saknad padding tillagd",
      "invalid-characters-removed": "Ogiltiga tecken borttagna",
    },
    guideTitle: "Hur man avkodar Base64",
    guideIntro:
      "Base64 är ett kodningsformat, inte kryptering. Vem som helst som har värdet kan avkoda det.",
    guideSteps: [
      "Klistra in ett Base64-värde eller öppna en fil som innehåller ett.",
      "Verktyget upptäcker formatet och tillämpar vanliga korrigeringar såsom att ta bort mellanslag eller återställa saknad utfyllnad.",
      "Kopiera läsbar text, eller ladda ner binärt resultat som en fil.",
    ],
    encodeGuideTitle: "Hur man kodar Base64",
    encodeGuideIntro:
      "Base64 omvandlar text eller binära byte till utskrivbara tecken. Det krypterar inte eller skyddar källdata.",
    encodeGuideSteps: [
      "Skriv text eller öppna filen du vill koda.",
      "Välj standard Base64 eller alfabetet som är säkert för URL:er, och justera sedan fyllning eller radbrytning endast när destinationen kräver det.",
      "Kopiera Base64-resultatet eller ladda ner det som en textfil.",
    ],
    safetyTitle: "Din inmatning sparas inte.",
    safetyBody:
      "Webbplatsen lagrar inte din inmatning eller konverteringsresultat, och den skickar dem inte till en server. Allt bearbetas i din nuvarande webbläsarsession och försvinner när du laddar om eller stänger sidan.",
    detailsTitle: "Standarder och inmatningshantering",
    detailsBody:
      "Som standard följer verktyget RFC 4648 och hanterar standard- och URL-säkra alfabet, valbar fyllning, MIME-mellanslag och Data URI-prefix. Slå på strikt validering när exakt format är viktigt.",
    faqTitle: "Vanliga frågor",
    faqs: [
      {
        q: "Är Base64 kryptering?",
        a: "Nej. Base64 omvandlar binär data till utskrivbar text. Det ger ingen sekretess eller autentisering.",
      },
      {
        q: "Varför kan jag inte läsa den avkodade utdata?",
        a: "Utdata kan vara en fil, komprimerad eller krypterad data, eller text i en annan teckenkodning. Försök att ladda ner filen eller välja en annan teckenkodning.",
      },
      {
        q: "Laddar den här webbplatsen upp min inmatning?",
        a: "Nej. Konverteringen sker i din webbläsare. Din inmatning, dina filer och dina resultat laddas inte upp till en server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Är Base64 kryptering?",
        a: "Nej. Base64 omvandlar binär data till utskrivbar text. Det ger ingen sekretess eller autentisering.",
      },
      {
        q: "Ska jag använda standard Base64 eller Base64URL?",
        a: "Använd standard Base64 för allmänna filer och data. Använd Base64URL när värdet måste visas säkert i en URL eller filnamn.",
      },
      {
        q: "Laddar den här webbplatsen upp min inmatning?",
        a: "Nej. Konverteringen sker i din webbläsare. Din inmatning, dina filer och dina resultat laddas inte upp till en server.",
      },
    ],
    advertisement: "Annons",
    integrationState: {
      enabled: "aktiverad med samtyckeskontroller",
      disabled: "inaktiverad",
    },
    legalNav: {
      about: "Om",
      privacy: "Integritet",
      cookies: "Kakor",
      terms: "Villkor",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "Om",
        intro:
          "AbsolTools tillhandahåller onlineverktyg för text-, data-, tids- och kodningsuppgifter.",
        sections: [
          {
            title: "Vad vi bygger",
            body: [
              "Varje verktyg hanterar en specifik uppgift utan att kräva ett konto. Verktygsinmatning och resultat behandlas i din webbläsare.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Skicka frågor, felrapporter och integritetsförfrågningar till {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Integritetspolicy",
        intro:
          "Denna policy separerar verktygsinmatning och resultat från webbplats-, analys- och reklamdata.",
        sections: [
          {
            title: "Verktygsinmatning och resultat",
            body: [
              "Text, filer, JSON, datum- och tidsvärden, avkodade byte och genererade resultat bearbetas i webbläsaren. Verktygets indata och resultat laddas inte upp till eller lagras på en server.",
            ],
          },
          {
            title: "Webbplatsleverans",
            body: [
              "{{host_provider}} tjänar och skyddar denna statiska webbplats och kan behandla anslutningsdata såsom din IP-adress, förfrågningstid, webbläsarinformation och begärd URL. Dess angivna inställning för logg-bevarande är {{host_log_retention}}. Leverantörspolicy: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analys och reklam",
            body: [
              "Google Analytics och Google AdSense är för närvarande {{integration_state}}. När de är aktiverade kommer deras enhets-, användnings-, cookie-, samtycke-, lagrings- och internationella överföringsuppgifter att redovisas här och hanteras genom sekretessinställningar. Verktygets inmatning och resultat är uteslutna från analys- och annonseringsevenemang enligt design.",
            ],
          },
          {
            title: "Cookies och automatisk insamling",
            body: [
              "Verktygen lagrar inte verktygsinmatning eller resultat i cookies eller webbläsarlagring. Om du väljer ett tema lagrar webbplatsen endast ljus eller mörk i lokal lagring och överför det inte. Säkerhetsteknik för hosting kan använda strikt nödvändig lagring endast när det dokumenteras av den valda leverantören. Valfri analys- och annonseringslagring förblir blockerad medan dessa integrationer är inaktiverade.",
            ],
          },
          {
            title: "Behållning och radering",
            body: [
              "Operatören behåller inte verktygsinmatning eller resultat. Data för värdbegäran följer den leverantörsbehållning som anges ovan. Kontaktkorrespondens behålls endast så länge det behövs för att besvara begäran, uppfylla rättsliga skyldigheter eller hantera missbruk, och raderas sedan eller anonymiseras.",
            ],
          },
          {
            title: "Mottagare och internationella överföringar",
            body: [
              "Den valda värden kan bearbeta förfrågningsdata utanför ditt land på de platser och under de skydd som beskrivs i dess policy. Innan analys, annonsering, en samtyckeshanterare eller en annan mottagare aktiveras måste denna sektion identifiera mottagaren, länderna, syftet, data, tidpunkt, metod, lagringsperiod och överföringsgrund som krävs enligt tillämplig lag.",
            ],
          },
          {
            title: "Dina val och kontakt",
            body: [
              "Där det är tillämpligt kan du begära tillgång, rättelse, radering, begränsning, invändning, bärbarhet eller återkallande av samtycke genom att kontakta {{email}}. Vi kan behöva rimlig verifiering innan vi uppfyller en begäran.",
            ],
          },
          {
            title: "Barn, säkerhet och förändringar",
            body: [
              "Detta allmänna utvecklarverktyg är inte riktat till barn. Vi använder en statisk, webbläsarlokal arkitektur och restriktiva webbläsarpolicyer för att minska risker, men ingen tjänst är helt säker. Betydande policyförändringar kommer att dateras på denna sida; ikraftträdandedatum: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie-policy",
        intro: "Verktygen behöver inte cookies för att bearbeta indata.",
        sections: [
          {
            title: "Nuvarande användning",
            body: [
              "Analys och reklam är för närvarande {{integration_state}}. Webbplatsen lagrar inte verktygsinmatning eller resultat i cookies eller lokal lagring. Den lagrar endast ditt valda tema (ljust eller mörkt) i lokal lagring; detta värde överförs inte.",
            ],
          },
          {
            title: "Om integrationer är aktiverade",
            body: [
              "En samtyckesplattform kommer att kontrollera nödvändig lagring av preferenser, lagring av analysdata och lagring för annonsering. En permanent integritetskontroll kommer att låta besökare granska eller återkalla samtycke.",
            ],
          },
        ],
      },
      terms: {
        title: "Användarvillkor",
        intro:
          "Användning av detta gratisverktyg är föremål för dessa villkor.",
        sections: [
          {
            title: "Service",
            body: [
              "Tjänsten tillhandahålls i befintligt skick, utan garantier för noggrannhet, tillgänglighet, lämplighet för ett särskilt ändamål eller oavbruten drift. Kontrollera viktiga resultat självständigt.",
            ],
          },
          {
            title: "Säker och laglig användning",
            body: [
              "Använd inte tjänsten för att attackera system, bryta mot lagen eller tredje parts rättigheter, eller sprida skadligt innehåll. Kör aldrig en avkodad fil från en opålitlig källa.",
            ],
          },
          {
            title: "Ansvar och tredje parter",
            body: [
              "I den mån det är tillåtet enligt tvingande lag är operatören inte ansvarig för indirekt eller följdskada. Tredjepartsannonser och länkar är inte godkännanden.",
            ],
          },
          {
            title: "Intellektuell egendom och förändringar",
            body: [
              "Webbplatsens design och ursprungliga förklarande innehåll är skyddade av gällande lag. Du behåller ansvaret för innehåll som du hanterar. Vi kan ändra eller avbryta funktioner och kommer att datumstämpla materialändringar i villkoren.",
            ],
          },
          {
            title: "Tillämplig lag och kontakt",
            body: [
              "Denna tjänst drivs från {{region}}. Tillämplig lag: {{governing_law}}. Jurisdiktion: {{jurisdiction}}. Obligatoriska konsumentskydd fortsätter att gälla. Kontakta {{email}}. Ikraftträdandedatum: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Vi välkomnar frågor, buggrapporter, integritetsförfrågningar och missbrukrapporter.",
        sections: [
          {
            title: "E-post",
            body: [
              "Kontakta {{email}}. Inkludera inte verktygsinmatning såsom känslig text, JSON, Base64-värden, lösenord, privata nycklar eller personliga filer i ditt meddelande.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Förhandsvisning",
    ready: "Klart",
    working: "Bearbetar…",
    clear: "Rensa",
    copy: "Kopiera",
    copied: "Kopierat",
    copyFailed: "Kunde inte kopiera resultatet.",
    processingFailed: "Bearbetningen misslyckades. Försök igen.",
    download: "Ladda ner",
    faqTitle: "Vanliga frågor",
    localTitle: "AbsolTools fungerar i din webbläsare.",
    localBody:
      "Din inmatning och dina resultat behandlas endast i denna webbläsare. De laddas inte upp till eller lagras på en server.",
  },
  preview: {
    word: {
      title: "Ord- och teckenräknare",
      description:
        "Räkna ord, tecken, tecken utan mellanslag, rader och stycken utan att ladda upp din text.",
      inputLabel: "Text",
      words: "Ord",
      characters: "Tecken",
      noWhitespace: "Tecken utan blanksteg",
      lines: "Linjer",
      paragraphs: "Paragrafer",
      completed: "Räkning klar",
      approximate:
        "Den här webbläsaren saknar Intl.Segmenter, så tecken- och ordantal är ungefärliga.",
      tooLarge:
        "Indata överstiger gränsen på 1 MB. Korta ner eller rensa texten för att fortsätta.",
      guideTitle: "Vad räknas",
      guideBody:
        "I stödda webbläsare räknas tecken som användaruppfattade graphemkluster, så en emoji eller en bokstav med kombinerande tecken räknas vanligtvis som ett. Räkningen utan mellanslag hoppar över mellanslagsgraphemer i originaltexten utan att slå ihop graphemen på vardera sidan. Rader följer radbrytningar. Visuellt tomma rader, inklusive rader som endast innehåller mellanslag, separerar stycken.",
      faqs: [
        {
          q: "Hur räknas ord?",
          a: "Webbläsare med Intl.Segmenter använder den aktuella sidans språk för ordgränser och räknar ordliknande segment. Andra webbläsare visar en ungefärlig räkning.",
        },
        {
          q: "Räknas emojis som tecken?",
          a: "I webbläsare som stöds räknas en emoji eller en kombinerad tecken som visas som ett tecken endast en gång.",
        },
      ],
    },
    json: {
      title: "JSON-formaterare",
      description:
        "Formatera JSON för att göra det lättare att läsa, kontrollera det för fel, eller minimera det till en rad.",
      inputLabel: "JSON inmatning",
      outputLabel: "Resultat",
      placeholder: "Klistra in JSON här…",
      outputPlaceholder: "Formaterad eller minifierad JSON visas här.",
      openFile: "Öppna .json",
      tooLarge: "Inmatningen överskrider gränsen på 10 MiB.",
      manualRequired:
        "Automatisk validering pausad för denna stora inmatning. Välj Format, Validera eller Minimera.",
      format: "Format",
      validate: "Validera",
      validateHelpLabel: "Om Validera",
      validateHelp:
        "Kontrollerar om indata följer RFC 8259 JSON-syntax och anger platsen och orsaken till eventuella syntaxfel. Den omformaterar eller ändrar inte texten på annat sätt.",
      minify: "Minifiera",
      minifyHelpLabel: "Om Minify",
      minifyHelp:
        "Tar bort valfria mellanslag och radbrytningar från giltig JSON för att göra den kompakt. Stränginnehåll, det ursprungliga formatet för siffror och dubblettnycklar för objekt bevaras.",
      indent: "Indrag",
      twoSpaces: "2 mellanslag",
      fourSpaces: "4 mellanslag",
      tabs: "Flikar",
      valid: "Giltig JSON",
      invalidAt: "{message} Rad {line}, kolumn {column}.",
      duplicate: "Duplicerat nyckel vid rad {line}, kolumn {column}",
      bom: "UTF-8 BOM togs bort innan bearbetning.",
      errorMessages: {
        InvalidSymbol: "Ogiltig symbol.",
        InvalidNumberFormat: "Ogiltigt nummerformat.",
        PropertyNameExpected: "Ett egenskapsnamn krävs.",
        ValueExpected: "Ett värde krävs.",
        ColonExpected: "Ett kolon krävs efter egenskapsnamnet.",
        CommaExpected: "Ett komma krävs mellan objekten.",
        CloseBraceExpected: "En avslutande klammerparentes krävs.",
        CloseBracketExpected: "En avslutande parentes krävs.",
        EndOfFileExpected: "Oväntat innehåll visas efter värdet JSON.",
        InvalidCommentToken: "Kommentarer är inte giltiga JSON.",
        UnexpectedEndOfComment: "Kommentaren är ofullständig.",
        UnexpectedEndOfString: "Strängen är ofullständig.",
        UnexpectedEndOfNumber: "Numret är ofullständigt.",
        InvalidUnicode: "Unicode-escapen är ogiltig.",
        InvalidEscapeCharacter: "Flyktsekvensen är ogiltig.",
        InvalidCharacter: "Den här tecknet är inte giltigt här.",
        Unknown: "JSON är inte giltig.",
      },
      guideTitle: "JSON regler och bevarande av nummer",
      guideBody:
        "Validering följer RFC 8259: kommentarer, avslutande kommatecken och enkla citattecken rapporteras som fel. Dubblettnycklar bevaras med en varning, och stora siffror behåller den exakta notation du skrev in.",
      faqs: [
        {
          q: "Kommer stora siffror att förändras?",
          a: "Nej. Formatering och minifiering räknar inte om siffror; de behåller den notation du angav, så stora siffror avrundas inte.",
        },
        {
          q: "Varför rapporteras dubblettnycklar?",
          a: "Mjukvara kan hantera dubblettobjektnycklar på olika sätt. AbsolTools bevarar dem och visar en varning istället för att tyst ta bort data.",
        },
        {
          q: "Reparerar formateraren ogiltig JSON?",
          a: "Nej. Kommentarer, avslutande kommatecken, enkla citattecken och annan ogiltig syntax rapporteras så att du kan rätta källan medvetet.",
        },
      ],
    },
    time: {
      title: "Unix-tidsstämpelomvandlare",
      description:
        "Konvertera Unix-tidsstämplar i sekunder eller millisekunder till datum och tider i en vald tidszon, och tillbaka igen.",
      timestampMode: "Tidsstämpel till datum och tid",
      dateMode: "Datum och tid till tidsstämpel",
      timestampLabel: "Unix-tidsstämpel",
      dateLabel: "Datum och tid",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Välj datum och tid",
      unit: "Enhet",
      auto: "Automatisk upptäckt",
      seconds: "Sekunder",
      milliseconds: "Millisekunder",
      zoneMode: "Tidszon",
      utc: "UTC förskjutning",
      local: "Webbläsarens tidszon",
      selected: "IANA tidszon",
      zoneLabel: "Stad, region eller IANA tidszon",
      zonePlaceholder: "Sök New York, Asien eller Amerika/New_York",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seoul, Sydkorea — Asien/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "New York, Förenta staterna — Amerika/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Förenta staterna — Amerika/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "London, Storbritannien — Europa/London",
        },
        { value: "Europe/Paris", label: "Paris, Frankrike — Europa/Paris" },
        { value: "Europe/Madrid", label: "Madrid, Spanien — Europa/Madrid" },
        { value: "Asia/Tokyo", label: "Tokyo, Japan — Asien/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, Kina — Asien/Shanghai" },
        { value: "Asia/Singapore", label: "Singapore — Asien/Singapore" },
        { value: "Asia/Kolkata", label: "Kolkata, Indien — Asien/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australien — Australien/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, Nya Zeeland — Stillahavsområdet/Auckland",
        },
      ],
      offsetLabel: "Förskjutning från UTC",
      disambiguation: "Hoppa över eller upprepad lokal tid",
      reject: "Visa ett fel",
      earlier: "Använd tidigare resultat",
      later: "Använd senare resultat",
      now: "Nu",
      convert: "Konvertera",
      instant: "UTC datum och tid",
      zoned: "Datum och tid i vald zon",
      unixSeconds: "Unix-tidsstämpel (sekunder)",
      unixMilliseconds: "Unix-tidsstämpel (millisekunder)",
      converted: "Konvertering klar",
      invalid:
        "Ange en giltig Unix-tidsstämpel eller ett ISO-datum och tid, och kontrollera tidszonen.",
      ambiguousUnit:
        "11- eller 12-siffriga värden är tvetydiga. Välj sekunder eller millisekunder.",
      nonexistentTime:
        "Detta datum och denna tid hoppas över i den valda tidszonen eftersom klockan ställs framåt. Välj det tidigare eller senare resultatet.",
      repeatedTime:
        "Detta datum och denna tid inträffar två gånger i den valda tidszonen eftersom klockan ställs tillbaka. Välj det tidigare eller senare resultatet.",
      y2038:
        "Detta värde ligger utanför den signerade 32-bitars Unix-tidsintervallet.",
      guideTitle: "Hur enheter och tidszoner hanteras",
      guideBody:
        "Autodetektering behandlar decimaltal och heltal med 1–10 siffror som sekunder, heltal med 13 siffror som millisekunder och ber dig välja en enhet för heltal med 11 eller 12 siffror. Ange ett lokalt datum och en tid direkt eller använd väljaren; sekunder och bråkdelssekunder är valfria. Webbläsarens tidszon används som standard. När du konverterar ett tidsstämpel ändrar tidszonen endast det visade lokala datumet och tiden. När du konverterar ett lokalt datum och tid bestämmer tidszonen Unix-värdet.",
      faqs: [
        {
          q: "Hur fungerar automatisk enhetsdetektion?",
          a: "Decimaler och siffror med 1–10 siffror behandlas som sekunder. Trettonsiffriga tal behandlas som millisekunder. Välj en enhet för värden med 11–12 siffror.",
        },
        {
          q: "Vilket datumformat kan jag ange?",
          a: "Ange ett lokalt datum och klockslag utan en UTC-förskjutning, till exempel 2026-08-29T14:30. Sekunder och upp till nio bråktalsdifferenser är valfria, eller använd väljaren.",
        },
        {
          q: "Hur skiljer sig tidszonsalternativen åt?",
          a: "Webbläsarens tidszon är standard och följer de klockregler som är konfigurerade på din enhet. Välj UTC-förskjutning för att använda ett fast värde såsom +00:00 eller +09:00. En IANA-zon såsom America/New_York följer den regionens klockändringsregler.",
        },
        {
          q: "Kan sommartid göra en Unix-tidsstämpel tvetydig?",
          a: "Nej. En Unix-tidsstämpel identifierar ett ögonblick. Tvetydighet uppstår bara när du konverterar ett lokalt datum och en tid i en zon där klockor ändras: vissa lokala tider hoppas över, medan andra inträffar två gånger. Verktyget visar ett fel som standard; välj det tidigare eller senare resultatet bara om du vill att det ska lösas.",
        },
      ],
    },
    textCompare: {
      title: "Textjämförelse",
      description:
        "Jämför två texter rad för rad och markera tillägg, borttagningar och redigeringar utan att ladda upp någon av versionerna.",
      originalLabel: "Originaltext",
      changedLabel: "Ändrad text",
      originalPlaceholder: "Klistra in den ursprungliga texten här…",
      changedPlaceholder: "Klistra in den ändrade texten här…",
      compare: "Jämför",
      swap: "Byta",
      results: "Jämförelseresultat",
      empty: "Ange text på minst en sida för att jämföra.",
      tooLarge: "Varje text måste vara 1 MiB eller mindre.",
      tooManyLines:
        "De två texterna kan innehålla upp till 20 000 rader totalt.",
      tooComplex:
        "Denna jämförelse är för komplex för att bearbetas på ett säkert sätt. Försök med kortare texter.",
      stale:
        "Resultatet nedan är från den föregående jämförelsen. Jämför igen för att uppdatera det.",
      complete: "Jämförelse klar",
      identical: "De två texterna är identiska.",
      approximate:
        "Denna webbläsare saknar Intl.Segmenter, så inbäddade teckenmarkeringar är ungefärliga.",
      inlineLimited:
        "Vissa långa redigerade rader visas som hela radändringar för att hålla jämförelsen responsiv.",
      additions: "Tillagda rader: {count}",
      deletions: "Borttagna rader: {count}",
      changes: "Ändrade rader: {count}",
      previousChange: "Tidigare ändring",
      nextChange: "Nästa ändring",
      expandUnchanged: "Visa {count} oförändrade rader",
      whitespaceChange: "Mellanslag ändrat",
      lineEndingChange: "Radslutet ändrat",
      unchangedRow: "Oförändrad rad",
      addedRow: "Tillagd rad",
      removedRow: "Borttagen rad",
      changedRow: "Ändrad rad",
      originalLine: "Originalrad {line}",
      changedLine: "Ändrad rad {line}",
      guideTitle: "Hur jämförelsen fungerar",
      guideBody:
        "Jämförelsen justerar först rader och markerar sedan teckenförändringar inuti parvis ändrade rader. Mellanslag och ändringar endast i radslut märks uttryckligen. Långa oförändrade sektioner förblir ihopfällda tills du expanderar dem.",
      faqs: [
        {
          q: "Laddar AbsolTools upp texterna?",
          a: "Nej. Båda texterna jämförs lokalt i din webbläsare och skickas inte till en server.",
        },
        {
          q: "Upptäcks olika radslut?",
          a: "Ja. Skillnader mellan CRLF-, LF- och CR-radslut markeras även när den synliga radtexten är densamma.",
        },
      ],
    },
    caseConverter: {
      title: "Skiftlägesomvandlare",
      description:
        "Konvertera text till versaler, gemener, meningstil eller ord med inledande versal utan att ladda upp den.",
      inputLabel: "Text",
      outputLabel: "Konverterad text",
      placeholder: "Skriv eller klistra in text här…",
      outputPlaceholder: "Konverterad text visas här.",
      modeLabel: "Konvertering",
      upper: "VERSALER",
      lower: "gemener",
      sentence: "Meningsstil",
      capitalizeWords: "Inledande versal i ord",
      converted: "Konvertering klar",
      noChange: "Texten matchar redan denna konvertering.",
      outdated: "Den synliga utgången är från den tidigare ingången.",
      tooLarge: "Inmatningen överstiger 1 MB-gränsen.",
      guideTitle: "Hur varje omvandling fungerar",
      guideBody:
        "Versaler och gemener använder Unicode:s standardmappningar av versaler och gemener. Meningsläge gör texten gemen och gör den första bokstaven i början, efter radbrytning eller efter . ! ? 。 ！ ？ versal. Börja med versal på ord gör den första bokstaven i varje ord versal samtidigt som mellanslag, skiljetecken, radbrytningar, apostrofer, bindestreck och understreck bevaras.",
      faqs: [
        {
          q: "Är att kapitalisera ord samma sak som att använda versal på titlar?",
          a: "Nej. Den skriver varje ord med stor bokstav mekaniskt och tillämpar inte språkspecifika titelföreskrifter för artiklar, prepositioner, namn eller förkortningar.",
        },
        {
          q: "Behåller konverteringen mellanrum och radbrytningar?",
          a: "Ja. Verktyget ändrar endast bokstavsstorlek och behåller ursprunglig mellanrum, interpunktion och radbrytningar.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Exempel: AbsolTools räknar ord och tecken online.",
    jsonInput: 'Exempel: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Exempel: 1704067200 (sekunder) eller 1704067200000 (millisekunder).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Exempelformat: 2024-01-01T00:00. Sekunder är valfria, och du kan också använda datumväljaren.",
    timeResult: "Konverterat värde",
  },
  catalog: {
    "base64-decode": {
      name: "Base64-avkodare",
      summary: "Avkoda Base64-text eller filer online.",
      searchTerms: [
        "avkoda",
        "dekoder",
        "Base64URL",
        "Data URI",
        "text",
        "fil",
        "binär",
      ],
    },
    "base64-encode": {
      name: "Base64-kodare",
      summary: "Koda text eller filer till Base64 online.",
      searchTerms: [
        "koda",
        "kodare",
        "Base64URL",
        "Data URI",
        "text",
        "fil",
        "binär",
      ],
    },
    "word-counter": {
      name: "Ord- och teckenräknare",
      summary: "Räkna ord, tecken, rader och stycken online.",
      searchTerms: [
        "ordantal",
        "teckenräkning",
        "brev",
        "linjer",
        "stycken",
        "text",
      ],
    },
    "json-formatter": {
      name: "JSON-formaterare",
      summary:
        "Gör JSON lättare att läsa, kontrollera det för fel, eller minimera det till en rad.",
      searchTerms: [
        "formatera JSON",
        "validera JSON",
        "minifiera JSON",
        "prydlig utskrift",
        "data",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix-tidsstämpelomvandlare",
      summary:
        "Konvertera Unix-tidsstämplar i sekunder eller millisekunder till datum och tider, och tillbaka.",
      searchTerms: [
        "Unix tid",
        "epok",
        "epoktid",
        "sekunder",
        "millisekunder",
        "datum",
        "tid",
      ],
    },
    "text-compare": {
      name: "Textjämförelse",
      summary: "Jämför två texter rad för rad och markera deras skillnader.",
      searchTerms: [
        "text skillnad",
        "jämför text",
        "skillnader",
        "linjajämförelse",
      ],
    },
    "case-converter": {
      name: "Skiftlägesomvandlare",
      summary:
        "Konvertera text till versaler, gemener, meningstil eller versala ord.",
      searchTerms: [
        "versaler",
        "gemener",
        "meningsstil",
        "skriv med stor bokstav",
        "text",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Alla verktyg",
    directoryMetaTitle:
      "Gratis onlineverktyg för text, data och kodning | AbsolTools",
    directoryMetaDescription:
      "Hantera text, data, tid och kodningsuppgifter online.",
    directoryTitle:
      "Vi gör verktygen du använder ofta enklare och smidigare att använda",
    directoryIntro:
      "Lägg till webbplatsen som bokmärke så kan du gå direkt hit nästa gång.",
    toolPromise:
      "AbsolTools gör vanliga onlineverktyg mer exakta och enklare att använda. Lägg till webbplatsen i dina bokmärken.",
    directorySearchLabel: "Sökverktyg",
    directorySearchPlaceholder: "Sök efter namn, beskrivning eller nyckelord",
    directorySearchClear: "Rensa sökning",
    directorySearchNoResults: "Inga verktyg matchar din sökning.",
    directorySearchCount: "Matchande verktyg: {count}",
    available: "Tillgänglig",
    research: "Förhandsvisning",
    reserve: "Under övervägande",
    breadcrumbLabel: "Navigeringssökväg",
    encodingCategory: "Kodning och avkodning",
    categories: {
      encoding: "Kodning",
      text: "Text",
      data: "Data",
      time: "Tid",
    },
    footerNote: "Vanliga funktioner, enklare att använda.",
    catalogAria: "Verktygskatalog",
    useLightTheme: "Använd ljust tema",
    useDarkTheme: "Använd mörkt tema",
  },
} satisfies LocaleBundle;

export default svBundle;
