import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/nl";

export const nlBundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Nederlands",
    metaTitle: "Base64-decoder en -encoder — snel, privé en online",
    metaDescription:
      "Decodeer Base64 naar tekst of bestanden en encodeer tekst of bestanden online. Ondersteunt Base64URL, ontbrekende opvulling, data-URI’s en oudere tekencoderingen.",
    decodeMetaTitle: "Base64-decoder voor tekst en bestanden | AbsolTools",
    encodeMetaTitle: "Base64-encoder voor tekst en bestanden | AbsolTools",
    skipToContent: "Naar de inhoud",
    languageNavLabel: "Taal",
    legalNavLabel: "Juridische informatie en contact",
    modeLabel: "Conversiemodus",
    heading: "Decodeer Base64 online.",
    subheading:
      "Plak Base64-tekst of open een bestand. Standaard-Base64, Base64URL, ontbrekende opvulling en data-URI’s worden lokaal verwerkt.",
    encodeHeading: "Encodeer tekst of bestanden online naar Base64.",
    encodeSubheading:
      "Voer tekst in of open een bestand. Zet UTF-8-tekst en binaire bestanden zonder upload om naar standaard-Base64 of Base64URL.",
    decode: "Decoderen",
    encode: "Encoderen",
    inputLabel: "Base64-invoer",
    outputLabel: "Gedecodeerd resultaat",
    encodeInputLabel: "Tekst- of bestandsinvoer",
    encodeOutputLabel: "Base64-resultaat",
    decodePlaceholder: "Voorbeeld: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Voorbeeld: Hallo, AbsolTools!",
    outputPlaceholder: "Het resultaat verschijnt hier.",
    openFile: "Bestand openen",
    runDecode: "Nu decoderen",
    runEncode: "Nu encoderen",
    options: "Opties",
    detected: "Gedetecteerd",
    decodeComplete: "Decoderen voltooid",
    encodeComplete: "Encoderen voltooid",
    charset: "Tekencodering",
    variant: "Base64-formaat",
    auto: "Automatisch detecteren",
    standard: "Standaard",
    urlSafe: "URL-veilig",
    strict: "Strikt valideren",
    lineByLine: "Elke regel afzonderlijk decoderen",
    autoRepair: "Witruimte en opvulling herstellen",
    lenientRepair: "Andere ongeldige tekens verwijderen",
    outputView: "Resultaatweergave",
    text: "Tekst",
    hex: "Hexadecimaal",
    includePadding: "Opvulteken = opnemen",
    mimeWrap: "Na 76 tekens afbreken",
    dataUri: "Data-URI-voorvoegsel toevoegen",
    dropHint:
      "Sleep een tekst- of binair bestand naar een willekeurige plek in de converter.",
    fileTooLarge: "De invoer mag maximaal 100 MiB groot zijn.",
    binaryOutput:
      "Binaire gegevens gedetecteerd. Controleer het bestandstype en download het bestand in plaats van het direct uit te voeren.",
    executableWarning:
      "Uitvoerbaar bestand gedetecteerd. Voer nooit een gedecodeerd bestand uit een onbetrouwbare bron uit.",
    imagePreview: "Afbeeldingsvoorbeeld",
    errors: {
      "empty-input": "Voer eerst tekst in of open een bestand.",
      "invalid-character":
        "Deze waarde bevat een teken dat niet geldig is in Base64.",
      "invalid-length":
        "De Base64-waarde is afgebroken of heeft een onmogelijke lengte.",
      "decode-failed": "De waarde kon niet worden gedecodeerd.",
      "encode-failed": "Het bestand kon niet worden geëncodeerd.",
      "unsupported-charset":
        "Deze browser ondersteunt de gekozen tekencodering niet.",
      "file-too-large":
        "Deze invoer overschrijdt de veiligheidslimiet van 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Data-URI-voorvoegsel verwijderd",
      "whitespace-removed": "Witruimte verwijderd",
      "url-alphabet-normalized": "Base64URL-alfabet gedetecteerd",
      "padding-added": "Ontbrekende opvulling toegevoegd",
      "invalid-characters-removed": "Ongeldige tekens verwijderd",
    },
    guideTitle: "Base64 decoderen",
    guideIntro:
      "Base64 is een codering, geen versleuteling. Iedereen die de waarde heeft, kan die decoderen.",
    guideSteps: [
      "Plak een Base64-waarde of open een bestand dat de waarde bevat.",
      "De tool detecteert het formaat en kan veelvoorkomende problemen zoals witruimte of ontbrekende opvulling herstellen.",
      "Kopieer leesbare tekst of download het binaire resultaat als bestand.",
    ],
    encodeGuideTitle: "Naar Base64 encoderen",
    encodeGuideIntro:
      "Base64 geeft tekst of binaire bytes weer met afdrukbare tekens. De brongegevens worden er niet door versleuteld of beschermd.",
    encodeGuideSteps: [
      "Voer de tekst in of open het bestand dat je wilt encoderen.",
      "Kies standaard-Base64 of het URL-veilige alfabet en pas opvulling of regelafbreking alleen aan als de bestemming dat vereist.",
      "Kopieer het Base64-resultaat of download het als tekstbestand.",
    ],
    safetyTitle: "Je invoer wordt niet opgeslagen.",
    safetyBody:
      "De website slaat invoer en resultaten niet op en stuurt ze niet naar een server. Alles wordt in de huidige browsersessie verwerkt en verdwijnt wanneer je de pagina herlaadt of sluit.",
    detailsTitle: "Standaarden en invoerverwerking",
    detailsBody:
      "Standaard volgt de tool RFC 4648 en accepteert hij het standaard- en URL-veilige alfabet, optionele opvulling, MIME-witruimte en data-URI-voorvoegsels. Schakel strikte validatie in wanneer het precieze formaat belangrijk is.",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        q: "Is Base64 versleuteling?",
        a: "Nee. Base64 zet binaire gegevens om in afdrukbare tekst, maar biedt geen vertrouwelijkheid of authenticatie.",
      },
      {
        q: "Waarom is het gedecodeerde resultaat niet leesbaar?",
        a: "Het resultaat kan een bestand, gecomprimeerde of versleutelde gegevens of tekst in een andere tekencodering zijn. Download het bestand of kies een andere codering.",
      },
      {
        q: "Uploadt deze website mijn invoer?",
        a: "Nee. De conversie gebeurt in de browser. Invoer, bestanden en resultaten worden niet naar een server gestuurd.",
      },
    ],
    encodeFaqs: [
      {
        q: "Is Base64 versleuteling?",
        a: "Nee. Base64 zet binaire gegevens om in afdrukbare tekst, maar biedt geen vertrouwelijkheid of authenticatie.",
      },
      {
        q: "Moet ik standaard-Base64 of Base64URL gebruiken?",
        a: "Gebruik standaard-Base64 voor bestanden en algemene gegevens. Gebruik Base64URL wanneer de waarde veilig in een URL of bestandsnaam moet staan.",
      },
      {
        q: "Uploadt deze website mijn invoer?",
        a: "Nee. De conversie gebeurt in de browser. Invoer, bestanden en resultaten worden niet naar een server gestuurd.",
      },
    ],
    advertisement: "Advertentie",
    integrationState: {
      enabled: "ingeschakeld met toestemmingsbeheer",
      disabled: "uitgeschakeld",
    },
    legalNav: {
      about: "Over ons",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Voorwaarden",
      contact: "Contact",
    },
    legal: {
      about: {
        title: "Over AbsolTools",
        intro:
          "AbsolTools biedt online tools voor taken met tekst, gegevens, tijd en codering.",
        sections: [
          {
            title: "Wat we maken",
            body: [
              "Elke tool voert één duidelijke taak uit zonder account. Invoer en resultaten worden in je browser verwerkt.",
            ],
          },
          {
            title: "Contact",
            body: [
              "Stuur vragen, foutmeldingen en privacyverzoeken naar {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Privacyverklaring",
        intro:
          "Deze verklaring maakt onderscheid tussen invoer en resultaten van tools en website-, analyse- en advertentiegegevens.",
        sections: [
          {
            title: "Invoer en resultaten van tools",
            body: [
              "Tekst, bestanden, JSON, datum- en tijdwaarden, gedecodeerde bytes en gemaakte resultaten worden in de browser verwerkt. Ze worden niet naar een server gestuurd of daar opgeslagen.",
            ],
          },
          {
            title: "Aanbieden van de website",
            body: [
              "{{host_provider}} biedt en beschermt deze statische website en kan verbindingsgegevens verwerken, zoals IP-adres, tijdstip van de aanvraag, browserinformatie en opgevraagde URL. De opgegeven bewaartermijn voor logbestanden is {{host_log_retention}}. Privacybeleid van de provider: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analyse en advertenties",
            body: [
              "Google Analytics en Google AdSense zijn momenteel {{integration_state}}. Als ze worden ingeschakeld, worden gegevens over apparaat, gebruik, cookies, toestemming, bewaring en internationale overdrachten hier beschreven en via de privacyinstellingen beheerd. Invoer en resultaten van tools zijn standaard uitgesloten van analyse- en advertentiegebeurtenissen.",
            ],
          },
          {
            title: "Cookies en automatische verzameling",
            body: [
              "De tools bewaren geen invoer of resultaten in cookies of browseropslag. Als je een thema kiest, slaat de website lokaal alleen light of dark op en wordt die waarde niet verzonden. Beveiligingstechniek van de host mag alleen strikt noodzakelijke opslag gebruiken als de gekozen provider dit documenteert. Optionele opslag voor analyse en advertenties blijft geblokkeerd zolang die integraties zijn uitgeschakeld.",
            ],
          },
          {
            title: "Bewaring en verwijdering",
            body: [
              "De beheerder bewaart geen invoer of resultaten van tools. Aanvraaggegevens bij de host vallen onder de hierboven vermelde bewaartermijn. Contactberichten worden alleen bewaard zolang dat nodig is om te antwoorden, aan wettelijke verplichtingen te voldoen of misbruik te behandelen; daarna worden ze verwijderd of geanonimiseerd.",
            ],
          },
          {
            title: "Ontvangers en internationale overdrachten",
            body: [
              "De gekozen host kan aanvraaggegevens buiten je land verwerken op de locaties en met de waarborgen die in het privacybeleid worden beschreven. Voordat analyse, advertenties, een toestemmingsplatform of een andere ontvanger wordt ingeschakeld, vermeldt dit onderdeel de ontvangers, landen, doeleinden, gegevens, momenten, methoden, bewaartermijnen en overdrachtsgrondslagen die het toepasselijke recht vereist.",
            ],
          },
          {
            title: "Je rechten en contact",
            body: [
              "Waar van toepassing kun je via {{email}} verzoeken om inzage, correctie, verwijdering, beperking, bezwaar, overdraagbaarheid of intrekking van toestemming. We kunnen een redelijke verificatie vragen voordat we het verzoek behandelen.",
            ],
          },
          {
            title: "Kinderen, beveiliging en wijzigingen",
            body: [
              "Deze algemene tool voor ontwikkelaars is niet op kinderen gericht. We gebruiken een statische architectuur, lokale verwerking in de browser en beperkende browserregels om risico’s te verminderen, maar geen enkele dienst is volledig veilig. Belangrijke wijzigingen worden op deze pagina gedateerd. Ingangsdatum: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookiebeleid",
        intro: "De tools hebben geen cookies nodig om invoer te verwerken.",
        sections: [
          {
            title: "Huidig gebruik",
            body: [
              "Analyse en advertenties zijn momenteel {{integration_state}}. De website bewaart invoer en resultaten van tools niet in cookies of lokale opslag. Alleen de gekozen themavoorkeur light of dark wordt lokaal opgeslagen; die waarde wordt niet verzonden.",
            ],
          },
          {
            title: "Als integraties worden ingeschakeld",
            body: [
              "Een toestemmingsplatform beheert dan de noodzakelijke opslag voor voorkeuren, analyse en advertenties. Met een permanente privacyoptie kun je toestemming bekijken of intrekken.",
            ],
          },
        ],
      },
      terms: {
        title: "Gebruiksvoorwaarden",
        intro:
          "Op het gebruik van deze gratis tool zijn deze voorwaarden van toepassing.",
        sections: [
          {
            title: "Dienst",
            body: [
              "De dienst wordt aangeboden zoals deze beschikbaar is, zonder garanties voor nauwkeurigheid, beschikbaarheid, geschiktheid voor een bepaald doel of ononderbroken werking. Controleer belangrijke resultaten onafhankelijk.",
            ],
          },
          {
            title: "Veilig en rechtmatig gebruik",
            body: [
              "Gebruik de dienst niet om systemen aan te vallen, wetten of rechten van derden te schenden of schadelijke inhoud te verspreiden. Voer nooit een gedecodeerd bestand uit een onbetrouwbare bron uit.",
            ],
          },
          {
            title: "Aansprakelijkheid en derden",
            body: [
              "Voor zover dwingend recht dat toestaat, is de beheerder niet aansprakelijk voor indirecte schade of gevolgschade. Advertenties en links van derden zijn geen aanbeveling.",
            ],
          },
          {
            title: "Intellectueel eigendom en wijzigingen",
            body: [
              "Het websiteontwerp en de oorspronkelijke uitleg zijn beschermd door toepasselijk recht. Je blijft verantwoordelijk voor de inhoud die je verwerkt. We kunnen functies wijzigen of beëindigen en dateren belangrijke wijzigingen van de voorwaarden.",
            ],
          },
          {
            title: "Toepasselijk recht en contact",
            body: [
              "Deze dienst wordt beheerd vanuit {{region}}. Toepasselijk recht: {{governing_law}}. Bevoegde rechter: {{jurisdiction}}. Dwingende regels voor consumentenbescherming blijven gelden. Contact: {{email}}. Ingangsdatum: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contact",
        intro:
          "We ontvangen vragen, foutmeldingen, privacyverzoeken en meldingen van misbruik.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Neem contact op via {{email}}. Voeg geen invoer van tools toe, zoals vertrouwelijke tekst, JSON, Base64-waarden, wachtwoorden, privésleutels of persoonlijke bestanden.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Voorbeeld",
    ready: "Gereed",
    working: "Bezig met verwerken…",
    clear: "Wissen",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    copyFailed: "Het resultaat kon niet worden gekopieerd.",
    processingFailed: "Verwerken mislukt. Probeer het opnieuw.",
    download: "Downloaden",
    faqTitle: "Veelgestelde vragen",
    localTitle: "AbsolTools werkt in je browser.",
    localBody:
      "Invoer en resultaten worden alleen in deze browser verwerkt. Ze worden niet naar een server gestuurd of daar opgeslagen.",
  },
  preview: {
    word: {
      title: "Woorden- en tekenteller",
      description:
        "Tel woorden, tekens, tekens zonder spaties, regels en alinea’s zonder de tekst te uploaden.",
      inputLabel: "Tekst",
      words: "Woorden",
      characters: "Tekens",
      noWhitespace: "Tekens zonder spaties",
      lines: "Regels",
      paragraphs: "Alinea’s",
      completed: "Telling voltooid",
      approximate:
        "Deze browser biedt geen Intl.Segmenter; de woord- en tekentelling is daarom bij benadering.",
      tooLarge:
        "De invoer is groter dan 1 MB. Kort de tekst in of wis deze om door te gaan.",
      guideTitle: "Wat wordt geteld",
      guideBody:
        "In ondersteunde browsers worden tekens geteld als waargenomen grafeemclusters. Een emoji of letter met combinerende tekens telt daarom meestal als één teken. De telling zonder spaties negeert witruimtegrafemen in de oorspronkelijke tekst zonder naburige grafemen samen te voegen. Regels volgen de regeleinden. Visueel lege regels, ook met alleen witruimte, scheiden alinea’s.",
      faqs: [
        {
          q: "Hoe worden woorden geteld?",
          a: "Browsers met Intl.Segmenter bepalen woordgrenzen aan de hand van de taal van deze pagina en tellen woordachtige segmenten. Andere browsers tonen een schatting.",
        },
        {
          q: "Telt een emoji als één teken?",
          a: "In ondersteunde browsers wordt een emoji of gecombineerd teken dat als één teken verschijnt eenmaal geteld.",
        },
      ],
    },
    json: {
      title: "JSON-formatter en -validator",
      description:
        "Maak JSON leesbaar, controleer op fouten of minificeer alles tot één regel.",
      inputLabel: "JSON-invoer",
      outputLabel: "Resultaat",
      placeholder: "Plak JSON hier…",
      outputPlaceholder:
        "De opgemaakte of geminificeerde JSON verschijnt hier.",
      openFile: ".json-bestand openen",
      tooLarge: "De invoer is groter dan 10 MiB.",
      manualRequired:
        "Automatische validatie is voor deze grote invoer gepauzeerd. Kies Opmaken, Valideren of Minificeren.",
      format: "Opmaken",
      validate: "Valideren",
      validateHelpLabel: "Over valideren",
      validateHelp:
        "Controleert of de invoer voldoet aan de JSON-syntaxis van RFC 8259 en geeft positie en oorzaak van syntaxisfouten. De tekst wordt niet opnieuw opgemaakt of gewijzigd.",
      minify: "Minificeren",
      minifyHelpLabel: "Over minificeren",
      minifyHelp:
        "Verwijdert optionele witruimte en regeleinden uit geldige JSON. De inhoud van tekenreeksen, oorspronkelijke getalnotatie en dubbele objectsleutels blijven behouden.",
      indent: "Inspringing",
      twoSpaces: "2 spaties",
      fourSpaces: "4 spaties",
      tabs: "Tabs",
      valid: "Geldige JSON",
      invalidAt: "{message} Regel {line}, kolom {column}.",
      duplicate: "Dubbele sleutel op regel {line}, kolom {column}",
      bom: "De UTF-8-BOM is vóór verwerking verwijderd.",
      errorMessages: {
        InvalidSymbol: "Ongeldig symbool.",
        InvalidNumberFormat: "Ongeldige getalnotatie.",
        PropertyNameExpected: "Er wordt een eigenschapsnaam verwacht.",
        ValueExpected: "Er wordt een waarde verwacht.",
        ColonExpected:
          "Er wordt een dubbele punt na de eigenschapsnaam verwacht.",
        CommaExpected: "Er wordt een komma tussen de items verwacht.",
        CloseBraceExpected: "Er wordt een sluitende accolade verwacht.",
        CloseBracketExpected: "Er wordt een sluitende blokhaak verwacht.",
        EndOfFileExpected: "Er staat onverwachte inhoud na de JSON-waarde.",
        InvalidCommentToken: "Opmerkingen zijn niet geldig in JSON.",
        UnexpectedEndOfComment: "De opmerking is onvolledig.",
        UnexpectedEndOfString: "De tekenreeks is onvolledig.",
        UnexpectedEndOfNumber: "Het getal is onvolledig.",
        InvalidUnicode: "De Unicode-escapereeks is ongeldig.",
        InvalidEscapeCharacter: "De escapereeks is ongeldig.",
        InvalidCharacter: "Dit teken is op deze positie niet geldig.",
        Unknown: "De JSON is ongeldig.",
      },
      guideTitle: "JSON-regels en behoud van getallen",
      guideBody:
        "De validatie volgt RFC 8259: opmerkingen, afsluitende komma’s en enkele aanhalingstekens worden als fouten gemeld. Dubbele sleutels blijven met een waarschuwing behouden en grote getallen houden exact de ingevoerde notatie.",
      faqs: [
        {
          q: "Worden grote getallen gewijzigd?",
          a: "Nee. Opmaken en minificeren berekenen getallen niet opnieuw, maar behouden de ingevoerde notatie zonder grote waarden af te ronden.",
        },
        {
          q: "Waarom worden dubbele sleutels gemeld?",
          a: "Software kan dubbele sleutels verschillend behandelen. AbsolTools bewaart ze en geeft een waarschuwing in plaats van stilzwijgend gegevens te verwijderen.",
        },
        {
          q: "Herstelt de formatter ongeldige JSON?",
          a: "Nee. Opmerkingen, afsluitende komma’s, enkele aanhalingstekens en andere ongeldige syntaxis worden gemeld, zodat je de bron bewust kunt corrigeren.",
        },
      ],
    },
    time: {
      title: "Unix-timestampconverter",
      description:
        "Zet Unix-timestamps in seconden of milliseconden om naar datum en tijd in een gekozen tijdzone, en omgekeerd.",
      timestampMode: "Timestamp naar datum en tijd",
      dateMode: "Datum en tijd naar timestamp",
      timestampLabel: "Unix-timestamp",
      dateLabel: "Datum en tijd",
      datePlaceholder: "JJJJ-MM-DDTuu:mm",
      pickDate: "Datum en tijd kiezen",
      unit: "Eenheid",
      auto: "Automatisch detecteren",
      seconds: "Seconden",
      milliseconds: "Milliseconden",
      zoneMode: "Tijdzone",
      utc: "UTC-afwijking",
      local: "Tijdzone van browser",
      selected: "IANA-tijdzone",
      zoneLabel: "Stad, regio of IANA-tijdzone",
      zonePlaceholder: "Zoek Amsterdam, Europa of Europe/Amsterdam",
      popularZones: [
        {
          value: "Europe/Amsterdam",
          label: "Amsterdam, Nederland · Europe/Amsterdam",
        },
        {
          value: "Europe/Brussels",
          label: "Brussel, België · Europe/Brussels",
        },
        { value: "Europe/Berlin", label: "Berlijn, Duitsland · Europe/Berlin" },
        {
          value: "Europe/London",
          label: "Londen, Verenigd Koninkrijk · Europe/London",
        },
        { value: "Europe/Paris", label: "Parijs, Frankrijk · Europe/Paris" },
        { value: "Europe/Madrid", label: "Madrid, Spanje · Europe/Madrid" },
        {
          value: "America/New_York",
          label: "New York, Verenigde Staten · America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Verenigde Staten · America/Los_Angeles",
        },
        { value: "Asia/Tokyo", label: "Tokio, Japan · Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, China · Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapore · Asia/Singapore" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australië · Australia/Sydney",
        },
      ],
      offsetLabel: "Afwijking van UTC",
      disambiguation: "Niet-bestaande of herhaalde lokale tijd",
      reject: "Fout weergeven",
      earlier: "Het eerdere resultaat gebruiken",
      later: "Het latere resultaat gebruiken",
      now: "Nu",
      convert: "Omzetten",
      instant: "Datum en tijd in UTC",
      zoned: "Datum en tijd in de gekozen tijdzone",
      unixSeconds: "Unix-timestamp (seconden)",
      unixMilliseconds: "Unix-timestamp (milliseconden)",
      invalid:
        "Voer een geldige Unix-timestamp of ISO-datum en -tijd in en controleer de tijdzone.",
      ambiguousUnit:
        "Waarden met 11 of 12 cijfers zijn dubbelzinnig. Kies seconden of milliseconden.",
      converted: "Conversie voltooid",
      nonexistentTime:
        "Deze datum en tijd bestaan niet in de gekozen tijdzone door de klokverzetting. Kies het eerdere of latere resultaat.",
      repeatedTime:
        "Deze datum en tijd komen tweemaal voor in de gekozen tijdzone door de klokverzetting. Kies het eerdere of latere resultaat.",
      y2038:
        "Deze waarde valt buiten het bereik van een 32-bits Unix-tijd met teken.",
      guideTitle: "Eenheden en tijdzones",
      guideBody:
        "Automatische detectie behandelt decimalen en gehele getallen met 1 tot 10 cijfers als seconden, gehele getallen met 13 cijfers als milliseconden en vraagt bij 11 of 12 cijfers om een keuze. Voer lokale datum en tijd in of gebruik de kiezer; seconden en fracties zijn optioneel. De browsertijdzone is standaard. Bij omzetting van een timestamp beïnvloedt de tijdzone alleen de getoonde lokale tijd. Bij omzetting van lokale tijd bepaalt ze de Unix-waarde.",
      faqs: [
        {
          q: "Hoe werkt de automatische eenheidsdetectie?",
          a: "Decimalen en gehele getallen met 1 tot 10 cijfers gelden als seconden, 13-cijferige gehele getallen als milliseconden. Bij 11 of 12 cijfers kies je zelf de eenheid.",
        },
        {
          q: "Welke datum- en tijdnotatie kan ik invoeren?",
          a: "Voer een lokale datum en tijd zonder UTC-afwijking in, bijvoorbeeld 2026-08-29T14:30. Seconden en maximaal negen decimalen zijn optioneel; je kunt ook de kiezer gebruiken.",
        },
        {
          q: "Wat is het verschil tussen de tijdzoneopties?",
          a: "De browsertijdzone volgt de apparaatinstellingen. Een UTC-afwijking is vast, zoals +01:00. Een IANA-tijdzone zoals Europe/Amsterdam volgt de regionale regels voor klokverzetting.",
        },
        {
          q: "Kan zomertijd een Unix-timestamp dubbelzinnig maken?",
          a: "Nee. Een Unix-timestamp wijst één moment aan. Dubbelzinnigheid ontstaat alleen wanneer lokale tijd wordt omgezet in een zone die de klok verzet: sommige tijden bestaan niet en andere komen tweemaal voor. Standaard toont de tool een fout; kies alleen bewust het eerdere of latere resultaat.",
        },
      ],
    },
    textCompare: {
      title: "Teksten vergelijken",
      description:
        "Vergelijk twee teksten regel voor regel en markeer toevoegingen, verwijderingen en wijzigingen zonder versies te uploaden.",
      originalLabel: "Oorspronkelijke tekst",
      changedLabel: "Gewijzigde tekst",
      originalPlaceholder: "Plak hier de oorspronkelijke tekst…",
      changedPlaceholder: "Plak hier de gewijzigde tekst…",
      compare: "Vergelijken",
      swap: "Omwisselen",
      results: "Vergelijkingsresultaat",
      empty: "Voer aan ten minste één kant tekst in om te vergelijken.",
      tooLarge: "Elke tekst mag maximaal 1 MiB groot zijn.",
      tooManyLines:
        "De twee teksten mogen samen maximaal 20.000 regels bevatten.",
      tooComplex:
        "Deze vergelijking is te complex om veilig te verwerken. Probeer kortere teksten.",
      stale:
        "Het onderstaande resultaat hoort bij de vorige vergelijking. Vergelijk opnieuw om het bij te werken.",
      complete: "Vergelijking voltooid",
      identical: "De twee teksten zijn identiek.",
      approximate:
        "Deze browser biedt geen Intl.Segmenter; tekenmarkering is daarom bij benadering.",
      inlineLimited:
        "Sommige lange bewerkte regels worden volledig als gewijzigd getoond om de vergelijking responsief te houden.",
      additions: "Toegevoegde regels: {count}",
      deletions: "Verwijderde regels: {count}",
      changes: "Gewijzigde regels: {count}",
      previousChange: "Vorige wijziging",
      nextChange: "Volgende wijziging",
      expandUnchanged: "{count} ongewijzigde regels tonen",
      whitespaceChange: "Witruimte gewijzigd",
      lineEndingChange: "Regeleinde gewijzigd",
      unchangedRow: "Ongewijzigde regel",
      addedRow: "Toegevoegde regel",
      removedRow: "Verwijderde regel",
      changedRow: "Gewijzigde regel",
      originalLine: "Oorspronkelijke regel {line}",
      changedLine: "Gewijzigde regel {line}",
      guideTitle: "Hoe de vergelijking werkt",
      guideBody:
        "De vergelijking lijnt eerst regels uit en markeert daarna tekenwijzigingen binnen bij elkaar horende bewerkte regels. Wijzigingen in alleen witruimte of regeleinden worden aangegeven. Lange ongewijzigde delen blijven ingeklapt tot je ze opent.",
      faqs: [
        {
          q: "Uploadt AbsolTools de teksten?",
          a: "Nee. Beide teksten worden lokaal in de browser vergeleken en niet naar een server gestuurd.",
        },
        {
          q: "Detecteert de tool verschillende regeleinden?",
          a: "Ja. Verschillen tussen CRLF, LF en CR worden ook gemarkeerd als de zichtbare regeltekst gelijk is.",
        },
      ],
    },
    caseConverter: {
      title: "Hoofdletters en kleine letters omzetten",
      description:
        "Zet tekst zonder upload om naar hoofdletters, kleine letters, zinsopmaak of beginhoofdletters.",
      inputLabel: "Tekst",
      outputLabel: "Omgezette tekst",
      placeholder: "Typ of plak hier tekst…",
      outputPlaceholder: "De omgezette tekst verschijnt hier.",
      modeLabel: "Conversie",
      upper: "HOOFDLETTERS",
      lower: "kleine letters",
      sentence: "Zinsopmaak",
      capitalizeWords: "Elk woord met hoofdletter",
      converted: "Conversie voltooid",
      noChange: "De tekst voldoet al aan deze conversie.",
      outdated: "Het getoonde resultaat hoort bij de vorige invoer.",
      tooLarge: "De invoer is groter dan 1 MB.",
      guideTitle: "Hoe elke conversie werkt",
      guideBody:
        "Hoofdletters en kleine letters gebruiken de standaard Unicode-koppelingen. Zinsopmaak zet tekst klein en maakt de eerste letter aan het begin, na een regeleinde of na . ! ? 。 ！ ？ groot. Elk woord met hoofdletter maakt mechanisch de eerste letter van elk woord groot en behoudt witruimte, leestekens, regeleinden, apostroffen, koppeltekens en underscores. De modus past geen Nederlandse redactionele titelregels of regels voor eigennamen toe.",
      faqs: [
        {
          q: "Is Elk woord met hoofdletter hetzelfde als Nederlandse titelopmaak?",
          a: "Nee. De conversie maakt mechanisch elke woordbeginletter groot en past geen taalregels toe op lidwoorden, voorzetsels, eigennamen of afkortingen.",
        },
        {
          q: "Blijven spaties en regeleinden behouden?",
          a: "Ja. De tool verandert alleen hoofdletters en kleine letters en behoudt de oorspronkelijke witruimte, leestekens en regeleinden.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Voorbeeld: AbsolTools telt woorden en tekens online.",
    jsonInput: 'Voorbeeld: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Voorbeeld: 1704067200 (seconden) of 1704067200000 (milliseconden).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Voorbeeldnotatie: 2024-01-01T00:00. Seconden zijn optioneel; je kunt ook de datumkiezer gebruiken.",
    timeResult: "Omgezette waarde",
  },
  catalog: {
    "base64-decode": {
      name: "Base64-decoder",
      summary: "Decodeer Base64-tekst of -bestanden online.",
      searchTerms: [
        "decoderen",
        "Base64 decoderen",
        "Base64URL",
        "data-URI",
        "tekst",
        "bestand",
        "binair",
      ],
    },
    "base64-encode": {
      name: "Base64-encoder",
      summary: "Encodeer tekst of bestanden online naar Base64.",
      searchTerms: [
        "encoderen",
        "Base64 coderen",
        "Base64URL",
        "data-URI",
        "tekst",
        "bestand",
        "binair",
      ],
    },
    "word-counter": {
      name: "Woorden- en tekenteller",
      summary: "Tel woorden, tekens, regels en alinea’s online.",
      searchTerms: [
        "woorden tellen",
        "tekens tellen",
        "karakterteller",
        "regels",
        "alinea’s",
        "tekst",
      ],
    },
    "json-formatter": {
      name: "JSON-formatter",
      summary: "Maak JSON leesbaar, valideer of minificeer het.",
      searchTerms: [
        "JSON formatteren",
        "JSON validator",
        "JSON minificeren",
        "JSON controleren",
        "inspringing",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix-timestampconverter",
      summary:
        "Zet Unix-timestamps in seconden of milliseconden om naar datum en tijd, en omgekeerd.",
      searchTerms: [
        "Unix-tijd",
        "timestamp",
        "epoch",
        "seconden",
        "milliseconden",
        "datum",
        "tijd",
      ],
    },
    "text-compare": {
      name: "Teksten vergelijken",
      summary: "Vergelijk twee teksten regel voor regel en toon verschillen.",
      searchTerms: [
        "teksten vergelijken",
        "tekstvergelijker",
        "verschillen",
        "regels vergelijken",
        "diff",
      ],
    },
    "case-converter": {
      name: "Hoofdletters en kleine letters omzetten",
      summary:
        "Zet tekst om naar hoofdletters, kleine letters, zinsopmaak of beginhoofdletters.",
      searchTerms: [
        "hoofdletters kleine letters",
        "tekst naar hoofdletters",
        "tekst naar kleine letters",
        "zinsopmaak",
        "hoofdlettergebruik",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Alle tools",
    directoryMetaTitle: "AbsolTools | Handige tools, meteen bij de hand",
    directoryMetaDescription:
      "Formatteer, converteer, codeer, decodeer, vergelijk en inspecteer tekst, gegevens en code rechtstreeks in je browser. Invoer en resultaten worden niet geüpload.",
    directoryTitle:
      "We maken de tools die je vaak gebruikt overzichtelijker en gebruiksvriendelijker",
    directoryIntro:
      "Voeg deze site toe aan je bladwijzers, zodat je er de volgende keer direct naartoe kunt.",
    toolPromise:
      "AbsolTools maakt veelgebruikte online tools nauwkeuriger en gebruiksvriendelijker. Elke taak wordt uitsluitend in je browser verwerkt, zonder apart te worden opgeslagen of naar een server te worden verzonden. Voeg deze site toe aan je bladwijzers.",
    directorySearchLabel: "Tools zoeken",
    directorySearchPlaceholder: "Zoek op naam, beschrijving of trefwoord",
    directorySearchClear: "Zoekopdracht wissen",
    directorySearchNoResults: "Geen tool komt overeen met je zoekopdracht.",
    directorySearchCount: "Gevonden tools: {count}",
    available: "Beschikbaar",
    research: "Voorbeeld",
    reserve: "In onderzoek",
    breadcrumbLabel: "Kruimelpad",
    encodingCategory: "Encoderen en decoderen",
    categories: {
      encoding: "Encoderen en decoderen",
      generator: "Generatoren",
      text: "Tekst",
      converter: "Converters",
      image: "Afbeeldingen",
      pdf: "PDF",
      data: "Gegevens",
      calculator: "Rekenmachines",
      time: "Tijd",
    },
    footerNote: "Veelgebruikte functies, makkelijker in gebruik.",
    catalogAria: "Tooloverzicht",
    useLightTheme: "Licht thema gebruiken",
    useDarkTheme: "Donker thema gebruiken",
    relatedTools: "Gerelateerde tools",
  },
};

export default nlBundle;
