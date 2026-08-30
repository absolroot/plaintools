import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/no";

const noBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Norsk (bokmål)",
    metaTitle: "Base64-dekoder og -koder — rask, privat, online",
    metaDescription:
      "Dekod Base64 til tekst eller filer og kod tekst eller filer online. Støtter Base64URL, manglende padding, Data URI og eldre tegnkodinger.",
    decodeMetaTitle: "Base64 Dekoder for tekst og filer | AbsolTools",
    encodeMetaTitle: "Base64 Koder for tekst og filer | AbsolTools",
    skipToContent: "Hopp til innhold",
    languageNavLabel: "Språk",
    legalNavLabel: "Juridisk og kontakt",
    modeLabel: "Konverteringsmodus",
    heading: "Dekode Base64 på nettet.",
    subheading:
      "Lim inn Base64-tekst eller åpne en fil. Standard Base64, Base64URL, manglende utfylling og Data URI-inndata håndteres lokalt.",
    encodeHeading: "Krypter tekst eller filer som Base64 på nettet.",
    encodeSubheading:
      "Skriv inn tekst eller åpne en fil. Konverter UTF-8-tekst- og binærfiler til standard Base64 eller Base64URL uten å laste dem opp.",
    decode: "Dekode",
    encode: "Koding",
    inputLabel: "Base64 input",
    outputLabel: "Dekodet utdata",
    encodeInputLabel: "Tekst- eller filinndata",
    encodeOutputLabel: "Base64-utgang",
    decodePlaceholder: "Eksempel: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Eksempel: Hei, AbsolTools!",
    outputPlaceholder: "Resultatet vises her.",
    openFile: "Åpne fil",
    runDecode: "Dekod nå",
    runEncode: "Kodings nå",
    options: "Alternativer",
    detected: "Oppdaget",
    decodeComplete: "Dekoding fullført",
    encodeComplete: "Koding fullført",
    charset: "Tegnkoding",
    variant: "Base64-format",
    auto: "Oppdag automatisk",
    standard: "Standard",
    urlSafe: "URL-sikker",
    strict: "Valider strengt",
    lineByLine: "Dekod hver linje separat",
    autoRepair: "Reparer mellomrom og utfylling",
    lenientRepair: "Fjern gjenværende ugyldige tegn",
    outputView: "Utdataformat",
    text: "Tekst",
    hex: "Heks",
    includePadding: "Inkluder = polstring",
    mimeWrap: "Bryt ved 76 tegn",
    dataUri: "Legg til Data URI-prefiks",
    dropHint: "Slipp en tekst- eller binærfil hvor som helst i konverteren.",
    fileTooLarge: "Maksimal inndata størrelse er 100 MiB.",
    binaryOutput:
      "Binære data oppdaget. Gjennomgå filtypen, og last den ned i stedet for å kjøre den direkte.",
    executableWarning:
      "Kjørbar fil oppdaget. Ikke kjør filer som er dekodet fra en upålitelig kilde.",
    imagePreview: "Forhåndsvisning av bilde",
    errors: {
      "empty-input": "Skriv inn tekst eller åpne en fil først.",
      "invalid-character":
        "Denne verdien inneholder et tegn som ikke er gyldig Base64.",
      "invalid-length":
        "Verdien Base64 er avkortet eller har en umulig lengde.",
      "decode-failed": "Verdien kunne ikke dekodes.",
      "encode-failed": "Filen kunne ikke kodes.",
      "unsupported-charset":
        "Denne tegnkoding støttes ikke av nettleseren din.",
      "file-too-large":
        "Denne inndataen er større enn sikkerhetsgrensen på 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Data URI-prefiks fjernet",
      "whitespace-removed": "Mellomrom fjernet",
      "url-alphabet-normalized": "Base64URL-alfabet oppdaget",
      "padding-added": "Manglende utfylling lagt til",
      "invalid-characters-removed": "Ugyldige tegn fjernet",
    },
    guideTitle: "Hvordan dekode Base64",
    guideIntro:
      "Base64 er et kodeformat, ikke kryptering. Alle som har verdien kan dekode den.",
    guideSteps: [
      "Lim inn en Base64-verdi eller åpne en fil som inneholder en.",
      "Verktøyet oppdager formatet og påfører vanlige korrigeringer som å fjerne mellomrom eller gjenopprette manglende utfylling.",
      "Kopier lesbar tekst, eller last ned binært output som en fil.",
    ],
    encodeGuideTitle: "Hvordan kode Base64",
    encodeGuideIntro:
      "Base64 gjør tekst eller binære byte om til utskrivbare tegn. Det krypterer ikke eller beskytter kildedataene.",
    encodeGuideSteps: [
      "Skriv tekst eller åpne filen du vil kode.",
      "Velg standard Base64 eller URL-sikker alfabet, og juster deretter utfylling eller linjebryting bare når målet krever det.",
      "Kopier Base64-resultatet eller last det ned som en tekstfil.",
    ],
    safetyTitle: "Ditt innspill blir ikke lagret.",
    safetyBody:
      "Nettstedet lagrer ikke innspillingen din eller konverteringsresultater, og det sender dem ikke til en server. Alt behandles i din nåværende nettlesersesjon og forsvinner når du laster siden på nytt eller lukker den.",
    detailsTitle: "Standarder og inputhåndtering",
    detailsBody:
      "Som standard følger verktøyet RFC 4648 og håndterer standard- og URL-sikre alfabeter, valgfri utfylling, MIME-mellomrom og Data URI-prefikser. Slå på streng validering når nøyaktig format er viktig.",
    faqTitle: "Ofte stilte spørsmål",
    faqs: [
      {
        q: "Er Base64 kryptering?",
        a: "Nei. Base64 endrer binære data til utskrivbar tekst. Det gir ingen hemmeligholdelse eller autentisering.",
      },
      {
        q: "Hvorfor kan jeg ikke lese den dekodede utdataen?",
        a: "Utdataene kan være en fil, komprimerte eller krypterte data, eller tekst i en annen tegnkoding. Prøv å laste ned filen eller velg en annen tegnkoding.",
      },
      {
        q: "Laster dette nettstedet opp innholdet mitt?",
        a: "Nei. Konvertering skjer i nettleseren din. Dine inndata, filer og resultater lastes ikke opp til en server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Er Base64 kryptering?",
        a: "Nei. Base64 endrer binære data til utskrivbar tekst. Det gir ingen hemmeligholdelse eller autentisering.",
      },
      {
        q: "Bør jeg bruke standard Base64 eller Base64URL?",
        a: "Bruk standard Base64 for generelle filer og data. Bruk Base64URL når verdien må vises trygt i en URL eller filnavn.",
      },
      {
        q: "Laster dette nettstedet opp innholdet mitt?",
        a: "Nei. Konvertering skjer i nettleseren din. Dine inndata, filer og resultater lastes ikke opp til en server.",
      },
    ],
    advertisement: "Reklame",
    integrationState: {
      enabled: "aktivert med samtykkekontroller",
      disabled: "deaktivert",
    },
    legalNav: {
      about: "Om",
      privacy: "Personvern",
      cookies: "Småkaker",
      terms: "Vilkår",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "Om",
        intro:
          "AbsolTools tilbyr nettbaserte verktøy for tekst-, data-, tids- og kodingoppgaver.",
        sections: [
          {
            title: "Det vi bygger",
            body: [
              "Hvert verktøy håndterer en enkelt fokusert oppgave uten å kreve en konto. Verktøyets inndata og resultater behandles i nettleseren din.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Send spørsmål, feilrapporter og forespørsler om personvern til {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Personvernregler",
        intro:
          "Denne policyen skiller verktøyinnspill og resultater fra nettside-, analyse- og reklamedata.",
        sections: [
          {
            title: "Verktøyinnndata og resultater",
            body: [
              "Tekst, filer, JSON, dato- og tidsverdier, dekodede bytes og genererte resultater behandles i nettleseren. Verktøyets inndata og resultater lastes ikke opp til eller lagres på en server.",
            ],
          },
          {
            title: "Nettsidelevering",
            body: [
              "{{host_provider}} betjener og beskytter dette statiske nettstedet og kan behandle tilkoblingsdata som din IP-adresse, tidspunkt for forespørsel, nettleserinformasjon og forespurt URL. Den angitte innstillingen for loggoppbevaring er {{host_log_retention}}. Leverandørpolicy: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analyse og annonsering",
            body: [
              "Google Analytics og Google AdSense er for øyeblikket {{integration_state}}. Når de er aktivert, vil deres enhets-, bruk-, cookie-, samtykke-, lagrings- og internasjonale overføringsdetaljer bli oppgitt her og administrert gjennom personvernvalg. Verktøyinnspill og resultater er utelukket fra analyse- og reklamehendelser etter design.",
            ],
          },
          {
            title: "Informasjonskapsler og automatisk innsamling",
            body: [
              "Verktøyene lagrer ikke verktøyinnsats eller resultater i informasjonskapsler eller nettleserlagring. Hvis du velger et tema, lagrer nettstedet bare lys eller mørk i lokal lagring og overfører det ikke. Vertssikkerhetsteknologi kan bruke strengt nødvendig lagring kun når det er dokumentert av den valgte leverandøren. Valgfri analyse- og annonseringslagring forblir blokkert mens disse integrasjonene er deaktivert.",
            ],
          },
          {
            title: "Bevaring og sletting",
            body: [
              "Operatøren beholder ikke verktøyinnspill eller resultater. Data om vertstjenesteforespørsel følger leverandørens oppbevaringsregler som nevnt ovenfor. Korrespondanse vedrørende kontakt beholdes bare så lenge det er nødvendig for å svare på forespørselen, oppfylle juridiske forpliktelser eller håndtere misbruk, deretter slettes eller anonymiseres den.",
            ],
          },
          {
            title: "Mottakere og internasjonale overføringer",
            body: [
              "Den valgte verten kan behandle forespørselsdata utenfor ditt land på de stedene og under de sikkerhetstiltakene som er beskrevet i dens policy. Før analyse, annonsering, en samtykkebehandler eller en annen mottaker aktiveres, må denne delen identifisere mottakeren, landene, formålet, dataene, tidspunktet, metoden, lagringsperioden og overføringsgrunnlaget som kreves av gjeldende lov.",
            ],
          },
          {
            title: "Dine valg og kontakt",
            body: [
              "Der det er aktuelt, kan du be om tilgang, retting, sletting, begrensning, motsetning, overførbarhet eller tilbaketrekking av samtykke ved å kontakte {{email}}. Vi kan trenge rimelig verifisering før vi oppfyller en forespørsel.",
            ],
          },
          {
            title: "Barn, sikkerhet og endringer",
            body: [
              "Dette generelle utviklerverktøyet er ikke ment for barn. Vi bruker en statisk, nettleserbasert arkitektur og restriktive nettleserpolitikker for å redusere risiko, men ingen tjeneste er helt sikker. Vesentlige policyendringer vil bli datert på denne siden; ikrafttredelsesdato: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Informasjonskapselpolicy",
        intro:
          "Verktøyene trenger ikke informasjonskapsler for å behandle input.",
        sections: [
          {
            title: "Nåværende bruk",
            body: [
              "Analyse og annonsering er for øyeblikket {{integration_state}}. Nettstedet lagrer ikke verktøyinnsats eller resultater i informasjonskapsler eller lokal lagring. Det lagrer kun ditt valgte temapreferanse (lys eller mørk) i lokal lagring; denne verdien sendes ikke.",
            ],
          },
          {
            title: "Hvis integrasjoner er aktivert",
            body: [
              "En samtykkeplattform vil kontrollere pålagt lagring av preferanser, lagring av analyser og lagring av annonsering. En permanent personvernkontroll vil la besøkende gjennomgå eller trekke tilbake samtykke.",
            ],
          },
        ],
      },
      terms: {
        title: "Vilkår for bruk",
        intro: "Bruk av dette gratisverktøyet er underlagt disse vilkårene.",
        sections: [
          {
            title: "Tjeneste",
            body: [
              "Tjenesten tilbys som den er, uten garantier for nøyaktighet, tilgjengelighet, egnethet for et bestemt formål eller uavbrutt drift. Verifiser viktige resultater uavhengig.",
            ],
          },
          {
            title: "Sikker og lovlig bruk",
            body: [
              "Ikke bruk tjenesten til å angripe systemer, bryte loven eller tredjeparts rettigheter, eller distribuere skadelig innhold. Kjør aldri en dekodet fil fra en ukjent kilde.",
            ],
          },
          {
            title: "Ansvar og tredjeparter",
            body: [
              "I den grad det er tillatt etter obligatorisk lov, er ikke operatøren ansvarlig for indirekte eller følgeskader. Tredjepartsannonser og lenker er ikke godkjennelser.",
            ],
          },
          {
            title: "Intellektuell eiendom og endringer",
            body: [
              "Nettsidens design og opprinnelige forklarende innhold er beskyttet av gjeldende lov. Du beholder ansvaret for innholdet du behandler. Vi kan endre eller avvikle funksjoner og vil datere endringer i vilkår.",
            ],
          },
          {
            title: "Gjeldende lov og kontakt",
            body: [
              "Denne tjenesten drives fra {{region}}. Gjeldende lov: {{governing_law}}. Jurisdiksjon: {{jurisdiction}}. Obligatoriske forbrukerbeskyttelser gjelder fortsatt. Kontakt {{email}}. Ikrafttredelsesdato: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Vi ønsker spørsmål, feilrapporter, personvernforespørsler og misbruksrapporter velkommen.",
        sections: [
          {
            title: "E-post",
            body: [
              "Kontakt {{email}}. Ikke inkludér verktøyinput som sensitiv tekst, JSON, Base64-verdier, passord, private nøkler eller personlige filer i meldingen din.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Forhåndsvisning",
    ready: "Klar",
    working: "Behandler…",
    clear: "Tøm",
    copy: "Kopier",
    copied: "Kopiert",
    copyFailed: "Kunne ikke kopiere resultatet.",
    processingFailed: "Behandlingen mislyktes. Prøv igjen.",
    download: "Last ned",
    faqTitle: "Ofte stilte spørsmål",
    localTitle: "AbsolTools fungerer i nettleseren din.",
    localBody:
      "Dine innspill og resultater behandles bare i denne nettleseren. De lastes ikke opp til eller lagres på en server.",
  },
  preview: {
    word: {
      title: "Ord- og tegnteller",
      description:
        "Tell antall ord, tegn, tegn uten mellomrom, linjer og avsnitt uten å laste opp teksten din.",
      inputLabel: "Tekst",
      words: "Ord",
      characters: "Tegn",
      noWhitespace: "Tegn uten mellomrom",
      lines: "Linjer",
      paragraphs: "Avsnitt",
      completed: "Telling fullført",
      approximate:
        "Denne nettleseren mangler Intl.Segmenter, så tegn- og ordtellinger er omtrentlige.",
      tooLarge:
        "Inndata overskrider 1 MB-grensen. Forkort eller fjern teksten for å fortsette.",
      guideTitle: "Hva telles",
      guideBody:
        "I støttede nettlesere telles tegn som brukeropplevde graphemklynger, så en emoji eller en bokstav med kombinerende tegn teller vanligvis som én. Antallet uten mellomrom hopper over mellomromsgrapemer i den opprinnelige teksten uten å slå sammen graphemene på hver side. Linjer følger linjeskift. Visuelt tomme linjer, inkludert linjer som bare inneholder mellomrom, skiller avsnitt.",
      faqs: [
        {
          q: "Hvordan telles ord?",
          a: "Nettlesere med Intl.Segmenter bruker gjeldende sidens språk for ordgrenser og teller ordlignende segmenter. Andre nettlesere viser et omtrentlig antall.",
        },
        {
          q: "Teller emoji som tegn?",
          a: "I støttede nettlesere telles en emoji eller kombinert tegn som vises som ett tegn, kun én gang.",
        },
      ],
    },
    json: {
      title: "JSON-formaterer",
      description:
        "Formater JSON for å gjøre det lettere å lese, sjekk det for feil, eller minifiser det til én linje.",
      inputLabel: "JSON input",
      outputLabel: "Resultat",
      placeholder: "Lim inn JSON her…",
      outputPlaceholder: "Formatert eller minifisert JSON vises her.",
      openFile: "Åpne .json",
      tooLarge: "Inndata overskrider 10 MiB-grensen.",
      manualRequired:
        "Automatisk validering satt på pause for denne store inputen. Velg Format, Valider eller Minimer.",
      format: "Format",
      validate: "Valider",
      validateHelpLabel: "Om Valider",
      validateHelp:
        "Sjekker om inndata følger RFC 8259 JSON-syntaksen og rapporterer plasseringen og årsaken til eventuelle syntaksfeil. Den omformaterer eller endrer ikke teksten på noen annen måte.",
      minify: "Minifisere",
      minifyHelpLabel: "Om Minify",
      minifyHelp:
        "Fjerner valgfrie mellomrom og linjeskift fra gyldig JSON for å gjøre det kompakt. Strenginnhold, det opprinnelige talletes form og dupliserte objektnøkler bevares.",
      indent: "Innrykk",
      twoSpaces: "2 mellomrom",
      fourSpaces: "4 mellomrom",
      tabs: "Faner",
      valid: "Gyldig JSON",
      invalidAt: "{message} Linje {line}, kolonne {column}.",
      duplicate: "Duplisert nøkkel på linje {line}, kolonne {column}",
      bom: "UTF-8 BOM fjernet før behandling.",
      errorMessages: {
        InvalidSymbol: "Ugyldig symbol.",
        InvalidNumberFormat: "Ugyldig tallformat.",
        PropertyNameExpected: "Et egenskapsnavn er påkrevd.",
        ValueExpected: "En verdi er påkrevd.",
        ColonExpected: "Et kolon er påkrevd etter navnet på egenskapen.",
        CommaExpected: "Et komma er nødvendig mellom elementene.",
        CloseBraceExpected: "En avsluttende krøllparentes er påkrevd.",
        CloseBracketExpected: "En avsluttende parentes er påkrevd.",
        EndOfFileExpected: "Uventet innhold vises etter JSON-verdien.",
        InvalidCommentToken: "Kommentarer er ikke gyldige JSON.",
        UnexpectedEndOfComment: "Kommentaren er ufullstendig.",
        UnexpectedEndOfString: "Strengen er ufullstendig.",
        UnexpectedEndOfNumber: "Nummeret er ufullstendig.",
        InvalidUnicode: "Unicode-flukten er ugyldig.",
        InvalidEscapeCharacter: "Fluktsekvensen er ugyldig.",
        InvalidCharacter: "Dette tegnet er ikke gyldig her.",
        Unknown: "JSON er ikke gyldig.",
      },
      guideTitle: "JSON regler og bevaring av tall",
      guideBody:
        "Validering følger RFC 8259: kommentarer, avsluttende komma og enkle anførselstegn rapporteres som feil. Dupliserte nøkler beholdes med en advarsel, og store tall beholder den nøyaktige notasjonen du skrev inn.",
      faqs: [
        {
          q: "Vil store tall endre seg?",
          a: "Nei. Formatering og minifisering beregner ikke tall på nytt; de beholder notasjonen du skrev inn, så store tall blir ikke avrundet.",
        },
        {
          q: "Hvorfor rapporteres dupliserte nøkler?",
          a: "Programvare kan håndtere dupliserte objektnøkler forskjellig. AbsolTools beholder dem og viser en advarsel i stedet for å slette data stille.",
        },
        {
          q: "Reparerer formatteren ugyldig JSON?",
          a: "Nei. Kommentarer, avsluttende komma, enkeltanførselstegn og annen ugyldig syntaks blir rapportert slik at du kan korrigere kilden bevisst.",
        },
      ],
    },
    time: {
      title: "Unix-tidsstempelkonverter",
      description:
        "Konverter Unix-tidsstempel i sekunder eller millisekunder til datoer og klokkeslett i en valgt tidssone, og tilbake igjen.",
      timestampMode: "Tidsstempel til dato og tid",
      dateMode: "Dato og tid til tidsstempel",
      timestampLabel: "Unix tidsstempel",
      dateLabel: "Dato og tid",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Velg dato og tid",
      unit: "Enhet",
      auto: "Automatisk gjenkjenning",
      seconds: "Sekunder",
      milliseconds: "Millisekunder",
      zoneMode: "Tidssone",
      utc: "UTC forskyvning",
      local: "Nettleserens tidssone",
      selected: "IANA tidssone",
      zoneLabel: "By, region eller IANA tidssone",
      zonePlaceholder: "Søk i New York, Asia, eller America/New_York",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seoul, Sør-Korea — Asia/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "New York, USA — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, USA — America/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "London, Storbritannia — Europa/London",
        },
        { value: "Europe/Paris", label: "Paris, Frankrike — Europa/Paris" },
        { value: "Europe/Madrid", label: "Madrid, Spania — Europa/Madrid" },
        { value: "Asia/Tokyo", label: "Tokyo, Japan — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, Kina — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapore — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "Kolkata, India — Asia/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australia — Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, New Zealand — Pacific/Auckland",
        },
      ],
      offsetLabel: "Forskjøvet fra UTC",
      disambiguation: "Hoppet over eller gjentatt lokal tid",
      reject: "Vis en feil",
      earlier: "Bruk tidligere resultat",
      later: "Bruk senere resultat",
      now: "Nå",
      convert: "Konverter",
      instant: "UTC dato og klokkeslett",
      zoned: "Dato og tid i valgt sone",
      unixSeconds: "Unix tidsstempel (sekunder)",
      unixMilliseconds: "Unix tidsstempel (millisekunder)",
      converted: "Konvertering fullført",
      invalid:
        "Skriv inn en gyldig Unix-tidsstempel eller en ISO-dato og klokkeslett, og sjekk tidssonen.",
      ambiguousUnit:
        "11- eller 12-sifrede verdier er tvetydige. Velg sekunder eller millisekunder.",
      nonexistentTime:
        "Denne datoen og tiden hoppes over i den valgte tidssonen fordi klokken stilles frem. Velg det tidligere eller senere resultatet.",
      repeatedTime:
        "Denne datoen og tiden forekommer to ganger i den valgte tidssonen fordi klokken stilles tilbake. Velg det tidligere eller senere resultatet.",
      y2038:
        "Denne verdien er utenfor det signerte 32-biters Unix-tidsområdet.",
      guideTitle: "Hvordan enheter og tidssoner håndteres",
      guideBody:
        "Autodeteksjon behandler desimaler og heltall med 1–10 sifre som sekunder, heltall med 13 sifre som millisekunder, og ber deg velge en enhet for heltall med 11 eller 12 sifre. Skriv inn en lokal dato og klokkeslett direkte eller bruk valgverktøyet; sekunder og brøksekunder er valgfrie. Nettleserens tidssone brukes som standard. Når du konverterer et tidsstempel, endrer tidssonen bare den viste lokale datoen og klokkeslettet. Når du konverterer en lokal dato og klokkeslett, bestemmer tidssonen Unix-verdien.",
      faqs: [
        {
          q: "Hvordan fungerer automatisk enhetsdeteksjon?",
          a: "Desimaler og heltall med 1–10 sifre behandles som sekunder. Tretten-sifrede heltall behandles som millisekunder. Velg en enhet for verdier med 11–12 sifre.",
        },
        {
          q: "Hvilket datoformat kan jeg skrive inn?",
          a: "Skriv inn en lokal dato og tid uten et UTC-offset, for eksempel 2026-08-29T14:30. Sekunder og opptil ni desimaler er valgfrie, eller bruk velgeren.",
        },
        {
          q: "Hvordan skiller tidssonealternativene seg?",
          a: "Nettleserens tidssone er standard og følger klokkeinnstillingene konfigurert på enheten din. Velg UTC-forskyvning for å bruke en fast verdi som +00:00 eller +09:00. En IANA-sone som America/New_York følger klokkeendringsreglene for den regionen.",
        },
        {
          q: "Kan sommertid gjøre et Unix-tidsstempel tvetydig?",
          a: "Nei. Et Unix-tidsstempel identifiserer ett øyeblikk. Tvetydighet oppstår bare når du konverterer en lokal dato og tid i en tidssone hvor klokkene endres: noen lokale tider hoppes over, mens andre forekommer to ganger. Verktøyet viser en feil som standard; velg det tidligere eller senere resultatet bare hvis du ønsker at det skal løses.",
        },
      ],
    },
    textCompare: {
      title: "Tekstsammenligning",
      description:
        "Sammenlign to tekster linje for linje og fremhev tillegg, fjerninger og redigeringer uten å laste opp noen av versjonene.",
      originalLabel: "Original tekst",
      changedLabel: "Endret tekst",
      originalPlaceholder: "Lim inn originalteksten her…",
      changedPlaceholder: "Lim inn den endrede teksten her…",
      compare: "Sammenligne",
      swap: "Bytt",
      results: "Sammenligningsresultater",
      empty: "Skriv inn tekst på minst én side for å sammenligne.",
      tooLarge: "Hver tekst må være 1 MiB eller mindre.",
      tooManyLines:
        "De to tekstene kan til sammen inneholde opptil 20 000 linjer.",
      tooComplex:
        "Denne sammenligningen er for kompleks til å behandle trygt. Prøv kortere tekster.",
      stale:
        "Resultatet nedenfor er fra den forrige sammenligningen. Sammenlign igjen for å oppdatere det.",
      complete: "Sammenligning fullført",
      identical: "De to tekstene er identiske.",
      approximate:
        "Denne nettleseren mangler Intl.Segmenter, så innlinje tegnfremhevinger er omtrentlige.",
      inlineLimited:
        "Noen lange redigerte linjer vises som hel-linjeendringer for å holde sammenligningen responsiv.",
      additions: "La til linjer: {count}",
      deletions: "Fjernet linjer: {count}",
      changes: "Endrede rader: {count}",
      previousChange: "Forrige endring",
      nextChange: "Neste endring",
      expandUnchanged: "Vis {count} uendrede linjer",
      whitespaceChange: "Mellomrom endret",
      lineEndingChange: "Linjeslutt endret",
      unchangedRow: "Uendret linje",
      addedRow: "Lagt til linje",
      removedRow: "Fjernet linje",
      changedRow: "Endret linje",
      originalLine: "Original linje {line}",
      changedLine: "Endret linje {line}",
      guideTitle: "Hvordan sammenligningen fungerer",
      guideBody:
        "Sammenligningen justerer først linjene, og fremhever deretter tegnnivåendringer inne i parrede endrede linjer. Mellomrom og endringer kun på linjeslutt merkes eksplisitt. Lange uendrede seksjoner forblir sammenklappet til du utvider dem.",
      faqs: [
        {
          q: "Laster AbsolTools opp tekstene?",
          a: "Nei. Begge tekstene sammenlignes lokalt i nettleseren din og blir ikke sendt til en server.",
        },
        {
          q: "Blir forskjellige linjeskift oppdaget?",
          a: "Ja. Forskjeller mellom CRLF, LF og CR linjeskift markeres selv når den synlige linjeteksten er den samme.",
        },
      ],
    },
    caseConverter: {
      title: "Konverter store og små bokstaver",
      description:
        "Konverter tekst til store bokstaver, små bokstaver, setningsform eller kapitaliserte ord uten å laste den opp.",
      inputLabel: "Tekst",
      outputLabel: "Konvertert tekst",
      placeholder: "Skriv eller lim inn tekst her…",
      outputPlaceholder: "Konvertert tekst vises her.",
      modeLabel: "Konvertering",
      upper: "STORE BOKSTAVER",
      lower: "små bokstaver",
      sentence: "Setningsform",
      capitalizeWords: "Stor forbokstav i hvert ord",
      converted: "Konvertering fullført",
      noChange: "Teksten samsvarer allerede med denne konverteringen.",
      outdated: "Den synlige utgangen er fra den forrige inngangen.",
      tooLarge: "Inndata overskrider 1 MB-grensen.",
      guideTitle: "Hvordan hver konvertering fungerer",
      guideBody:
        "Store og små bokstaver bruker Unicodes standard bokstavkartlegginger. Setningsbokstav gjør teksten liten og kapitaliserer den første bokstaverte bokstaven i starten, etter et linjeskift, eller etter . ! ? 。 ！ ？. Kapitaliser ord gjør den første bokstaverte bokstaven i hvert ord stor mens mellomrom, tegnsetting, linjeskift, apostrofer, bindestreker og understreker bevares.",
      faqs: [
        {
          q: "Er å kapitalisere ord det samme som tittelstil?",
          a: "Nei. Den gjør alle ord store på en mekanisk måte og anvender ikke språkspesifikke tittelforskrifter for artikler, preposisjoner, navn eller forkortelser.",
        },
        {
          q: "Bevarer konvertering mellomrom og linjeskift?",
          a: "Ja. Verktøyet endrer bare bokstavskift og beholder den opprinnelige mellomrom, tegnsetting og linjeskift.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Eksempel: AbsolTools teller ord og tegn på nettet.",
    jsonInput: 'Eksempel: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Eksempel: 1704067200 (sekunder) eller 1704067200000 (millisekunder).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Eksempelformat: 2024-01-01T00:00. Sekunder er valgfrie, og du kan også bruke datovelgeren.",
    timeResult: "Konvertert verdi",
  },
  catalog: {
    "base64-decode": {
      name: "Base64-dekoder",
      summary: "Dekode Base64 tekst eller filer på nettet.",
      searchTerms: [
        "dekode",
        "dekoder",
        "Base64URL",
        "Data URI",
        "tekst",
        "fil",
        "binær",
      ],
    },
    "base64-encode": {
      name: "Base64-koder",
      summary: "Krypter tekst eller filer til Base64 på nettet.",
      searchTerms: [
        "kodes",
        "koder",
        "Base64URL",
        "Data URI",
        "tekst",
        "fil",
        "binær",
      ],
    },
    "word-counter": {
      name: "Ord- og tegnteller",
      summary: "Tell ord, tegn, linjer og avsnitt på nettet.",
      searchTerms: [
        "ordtelling",
        "tegnantall",
        "bokstaver",
        "linjer",
        "avsnitt",
        "tekst",
      ],
    },
    "json-formatter": {
      name: "JSON-formaterer",
      summary:
        "Gjør JSON lettere å lese, sjekk det for feil, eller minimer det til én linje.",
      searchTerms: [
        "formater JSON",
        "valider JSON",
        "minifisere JSON",
        "pen utskrift",
        "data",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix-tidsstempelkonverter",
      summary:
        "Konverter Unix-tidsstempler i sekunder eller millisekunder til datoer og klokkeslett, og tilbake.",
      searchTerms: [
        "Unix tid",
        "epoke",
        "epoketid",
        "sekunder",
        "millisekunder",
        "dato",
        "time",
      ],
    },
    "text-compare": {
      name: "Tekstsammenligning",
      summary:
        "Sammenlign to tekster linje for linje og fremhev deres forskjeller.",
      searchTerms: [
        "tekstforskjell",
        "sammenligne tekst",
        "forskjeller",
        "linjesammenligning",
      ],
    },
    "case-converter": {
      name: "Konverter store og små bokstaver",
      summary:
        "Konverter tekst til store bokstaver, små bokstaver, setningsform eller ord med store forbokstaver.",
      searchTerms: [
        "stor bokstav",
        "små bokstaver",
        "setningsskrift",
        "bruk stor forbokstav",
        "tekst",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Alle verktøy",
    directoryMetaTitle:
      "AbsolTools | Verktøy for tekst, data og kode i nettleseren",
    directoryMetaDescription:
      "Formater, konverter, kod, dekod, sammenlign og kontroller tekst, data og kode direkte i nettleseren. Inndata og resultater lastes ikke opp.",
    directoryTitle:
      "Vi gjør verktøyene du bruker ofte ryddigere og enklere å bruke",
    directoryIntro:
      "Legg nettstedet til i bokmerkene, så kan du gå rett hit neste gang.",
    toolPromise:
      "AbsolTools gjør ofte brukte nettverktøy mer presise og enklere å bruke. Legg nettstedet til i bokmerkene.",
    directorySearchLabel: "Søk etter verktøy",
    directorySearchPlaceholder: "Søk etter navn, beskrivelse eller nøkkelord",
    directorySearchClear: "Tøm søk",
    directorySearchNoResults: "Ingen verktøy samsvarer med søket ditt.",
    directorySearchCount: "Matchende verktøy: {count}",
    available: "Tilgjengelig",
    research: "Forhåndsversjon",
    reserve: "Planlagt",
    breadcrumbLabel: "Brødsmulenavigasjon",
    encodingCategory: "Koding og dekoding",
    categories: {
      encoding: "Koding",
      text: "Tekst",
      converter: "Konvertering",
      image: "Bilder",
      data: "Data",
      time: "Tid",
    },
    footerNote: "Mye brukte funksjoner, enklere å bruke.",
    catalogAria: "Verktøykatalog",
    useLightTheme: "Bruk lyst tema",
    useDarkTheme: "Bruk mørkt tema",
    relatedTools: "Relaterte verktøy",
  },
} satisfies LocaleBundle;

export default noBundle;
