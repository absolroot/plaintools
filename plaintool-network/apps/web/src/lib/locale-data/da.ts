import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/da";

const daBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Dansk",
    metaTitle: "Base64-dekoder & -encoder — Hurtig, privat, online",
    metaDescription:
      "Dekod Base64 til tekst eller filer og kod tekst eller filer online. Understøtter Base64URL, manglende udfyldning, Data URIs og ældre tegnkodninger.",
    decodeMetaTitle: "Base64 Dekoder til tekst og filer | AbsolTools",
    encodeMetaTitle: "Base64 Koder til tekst og filer | AbsolTools",
    skipToContent: "Spring til indhold",
    languageNavLabel: "Sprog",
    legalNavLabel: "Juridisk og kontakt",
    modeLabel: "Konverteringstilstand",
    heading: "Dekod Base64 online.",
    subheading:
      "Indsæt Base64-tekst eller åbn en fil. Standard Base64, Base64URL, manglende fyldning og Data URI-input håndteres lokalt.",
    encodeHeading: "Kod tekst eller filer som Base64 online.",
    encodeSubheading:
      "Indtast tekst eller åbn en fil. Konverter UTF-8-tekst og binære filer til standard Base64 eller Base64URL uden at uploade dem.",
    decode: "Dekod",
    encode: "Kod",
    inputLabel: "Base64 input",
    outputLabel: "Dekodet output",
    encodeInputLabel: "Tekst eller filinput",
    encodeOutputLabel: "Base64 output",
    decodePlaceholder: "Eksempel: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Eksempel: Hej, AbsolTools!",
    outputPlaceholder: "Resultatet vises her.",
    openFile: "Åbn fil",
    runDecode: "Dekod nu",
    runEncode: "Kod nu",
    options: "Muligheder",
    detected: "Opdaget",
    decodeComplete: "Dekodning fuldført",
    encodeComplete: "Kodning færdig",
    charset: "Tegnkodning",
    variant: "Base64 format",
    auto: "Registrer automatisk",
    standard: "Standard",
    urlSafe: "URL-sikker",
    strict: "Valider strengt",
    lineByLine: "Dekod hver linje separat",
    autoRepair: "Reparer mellemrum og polstring",
    lenientRepair: "Fjern resterende ugyldige tegn",
    outputView: "Outputformat",
    text: "Tekst",
    hex: "Heks",
    includePadding: "Include = polstring",
    mimeWrap: "Bryd ved 76 tegn",
    dataUri: "Tilføj Data URI-præfiks",
    dropHint: "Slip en tekst- eller binærfil hvor som helst i konverteren.",
    fileTooLarge: "Den maksimale inputstørrelse er 100 MiB.",
    binaryOutput:
      "Binære data opdaget. Gennemgå filtypen, og download den derefter i stedet for at køre den direkte.",
    executableWarning:
      "Eksekverbar fil registreret. Kør ikke filer, der er dekodet fra en upålidelig kilde.",
    imagePreview: "Billedforhåndsvisning",
    errors: {
      "empty-input": "Indtast noget tekst eller åbn først en fil.",
      "invalid-character":
        "Denne værdi indeholder et tegn, der ikke er gyldigt Base64.",
      "invalid-length":
        "Base64-værdien er afkortet eller har en umulig længde.",
      "decode-failed": "Værdien kunne ikke dekodes.",
      "encode-failed": "Filen kunne ikke kodes.",
      "unsupported-charset":
        "Denne tegnkodning understøttes ikke af din browser.",
      "file-too-large":
        "Denne input er større end sikkerhedsgrænsen på 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Data URI præfiks fjernet",
      "whitespace-removed": "Mellemrum fjernet",
      "url-alphabet-normalized": "Base64URL alfabet registreret",
      "padding-added": "Manglende udfyldning tilføjet",
      "invalid-characters-removed": "Ugyldige tegn fjernet",
    },
    guideTitle: "Hvordan man dekoder Base64",
    guideIntro:
      "Base64 er et kodningsformat, ikke kryptering. Enhver, der har værdien, kan afkode den.",
    guideSteps: [
      "Indsæt en Base64-værdi, eller åbn en fil, der indeholder en.",
      "Værktøjet registrerer formatet og anvender almindelige rettelser såsom at fjerne mellemrum eller gendanne manglende udfyldning.",
      "Kopier læsbar tekst, eller download binært output som en fil.",
    ],
    encodeGuideTitle: "Hvordan man koder Base64",
    encodeGuideIntro:
      "Base64 omsætter tekst eller binære byte til printbare tegn. Det krypterer eller beskytter ikke kildedataene.",
    encodeGuideSteps: [
      "Skriv tekst eller åbn filen, du vil kode.",
      "Vælg standard Base64 eller det URL-sikre alfabet, og juster derefter kun udfyldning eller linjebrud, når destinationen kræver det.",
      "Kopiér Base64-resultatet eller download det som en tekstfil.",
    ],
    safetyTitle: "Din indtastning gemmes ikke.",
    safetyBody:
      "Siden gemmer ikke dine indtastninger eller konverteringsresultater, og den sender dem ikke til en server. Alt behandles i din nuværende browsersession og forsvinder, når du genindlæser eller lukker siden.",
    detailsTitle: "Standarder og inputhåndtering",
    detailsBody:
      "Som standard følger værktøjet RFC 4648 og håndterer standard- og URL-sikre alfabeter, valgfri udfyldning, MIME-mellemrum og Data URI-præfikser. Slå streng validering til, når det nøjagtige format er vigtigt.",
    faqTitle: "Ofte stillede spørgsmål",
    faqs: [
      {
        q: "Er Base64 kryptering?",
        a: "Nej. Base64 ændrer binære data til læsbar tekst. Det giver ingen hemmeligholdelse eller autentificering.",
      },
      {
        q: "Hvorfor kan jeg ikke læse den dekodede output?",
        a: "Outputtet kan være en fil, komprimerede eller krypterede data, eller tekst i en anden tegnkodning. Prøv at downloade filen eller vælge en anden tegnkodning.",
      },
      {
        q: "Uploader dette site mine input?",
        a: "Nej. Konvertering sker i din browser. Dine indtastninger, filer og resultater uploades ikke til en server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Er Base64 kryptering?",
        a: "Nej. Base64 ændrer binære data til læsbar tekst. Det giver ingen hemmeligholdelse eller autentificering.",
      },
      {
        q: "Skal jeg bruge standard Base64 eller Base64URL?",
        a: "Brug standard Base64 til almindelige filer og data. Brug Base64URL når værdien skal vises sikkert i en URL eller et filnavn.",
      },
      {
        q: "Uploader dette site mine input?",
        a: "Nej. Konvertering sker i din browser. Dine indtastninger, filer og resultater uploades ikke til en server.",
      },
    ],
    advertisement: "Reklame",
    integrationState: {
      enabled: "aktiveret med samtykkekontroller",
      disabled: "deaktiveret",
    },
    legalNav: {
      about: "Om",
      privacy: "Privatliv",
      cookies: "Småkager",
      terms: "Vilkår",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "Om",
        intro:
          "AbsolTools tilbyder online værktøjer til tekst-, data-, tids- og kodningsopgaver.",
        sections: [
          {
            title: "Hvad vi bygger",
            body: [
              "Hvert værktøj håndterer en enkelt fokuseret opgave uden at kræve en konto. Værktøjets input og resultater behandles i din browser.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Send spørgsmål, fejlrapporter og anmodninger om privatliv til {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Privatlivspolitik",
        intro:
          "Denne politik adskiller værktøjsinput og resultater fra websteds-, analyse- og reklamedata.",
        sections: [
          {
            title: "Værktøjsinput og resultater",
            body: [
              "Tekst, filer, JSON, dato- og tidsværdier, dekodede bytes og genererede resultater behandles i browseren. Værktøjets input og resultater uploades ikke til eller gemmes på en server.",
            ],
          },
          {
            title: "Websted levering",
            body: [
              "{{host_provider}} fungerer og beskytter dette statiske websted og kan behandle forbindelsesdata såsom din IP-adresse, anmodningstid, browserinformation og den anmodede URL. Dets angivne logopbevaringsindstilling er {{host_log_retention}}. Udbyderpolitik: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analyse og reklame",
            body: [
              "Google Analytics og Google AdSense er i øjeblikket {{integration_state}}. Når de er aktiveret, vil deres oplysninger om enhed, brug, cookies, samtykke, opbevaring og international overførsel blive offentliggjort her og styres gennem privatlivsvalg. Værktøjsinput og resultater er som standard udelukket fra analyse- og reklamebegivenheder.",
            ],
          },
          {
            title: "Cookies og automatisk indsamling",
            body: [
              "Værktøjerne gemmer ikke værktøjsinput eller resultater i cookies eller browserlager. Hvis du vælger et tema, gemmer siden kun lys eller mørk i lokalt lager og sender det ikke videre. Hosting-sikkerhedsteknologi kan kun bruge strengt nødvendigt lager, når det er dokumenteret af den valgte udbyder. Valgfri analyse- og reklamelagring forbliver blokeret, mens disse integrationer er deaktiveret.",
            ],
          },
          {
            title: "Bevarelse og sletning",
            body: [
              "Operatøren gemmer ikke værktøjsinput eller resultater. Data om hostingforespørgsler følger den ovenfor nævnte udbyderopbevaring. Korrespondance vedrørende kontakt opbevares kun så længe, det er nødvendigt for at besvare forespørgslen, overholde lovmæssige forpligtelser eller håndtere misbrug, hvorefter den slettes eller anonymiseres.",
            ],
          },
          {
            title: "Modtagere og internationale overførsler",
            body: [
              "Den valgte vært kan behandle anmodningsdata uden for dit land på de steder og under de sikkerhedsforanstaltninger, der er beskrevet i dens politik. Før analytics, reklame, en samtykkeadministrator eller en anden modtager aktiveres, skal denne sektion identificere modtageren, lande, formål, data, tidspunkter, metode, opbevaringsperiode og overførselsgrundlag, som kræves af gældende lovgivning.",
            ],
          },
          {
            title: "Dine valg og kontakt",
            body: [
              "Hvor det er relevant, kan du anmode om adgang, rettelse, sletning, begrænsning, indsigelse, bærbarhed eller tilbagetrækning af samtykke ved at kontakte {{email}}. Vi kan have brug for rimelig verifikation, før vi opfylder en anmodning.",
            ],
          },
          {
            title: "Børn, sikkerhed og ændringer",
            body: [
              "Dette generelle udviklerværktøj er ikke rettet mod børn. Vi bruger en statisk, browser-lokal arkitektur og restriktive browserpolitikker for at reducere risikoen, men ingen tjeneste er fuldstændig sikker. Væsentlige politikændringer vil blive dateret på denne side; ikrafttrædelsesdato: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookiepolitik",
        intro: "Værktøjerne behøver ikke cookies for at behandle input.",
        sections: [
          {
            title: "Nuværende brug",
            body: [
              "Analyse og reklame er i øjeblikket {{integration_state}}. Siden gemmer ikke værktøjsinput eller resultater i cookies eller lokal lagring. Den gemmer kun din valgte temaindstilling (lys eller mørk) i lokal lagring; denne værdi overføres ikke.",
            ],
          },
          {
            title: "Hvis integrationer er aktiveret",
            body: [
              "En samtykkeplatform vil kontrollere påkrævet præferenceopbevaring, analyseopbevaring og reklameopbevaring. En permanent privatlivskontrol vil lade besøgende gennemgå eller trække samtykke tilbage.",
            ],
          },
        ],
      },
      terms: {
        title: "Vilkår for brug",
        intro: "Brug af dette gratis værktøj er underlagt disse vilkår.",
        sections: [
          {
            title: "Service",
            body: [
              "Tjenesten leveres som den er, uden garantier for nøjagtighed, tilgængelighed, egnethed til et bestemt formål eller uafbrudt drift. Bekræft vigtige resultater uafhængigt.",
            ],
          },
          {
            title: "Sikker og lovlig brug",
            body: [
              "Brug ikke tjenesten til at angribe systemer, overtræde loven eller tredjeparts rettigheder, eller distribuere skadeligt indhold. Udfør aldrig en dekodet fil fra en ubetroet kilde.",
            ],
          },
          {
            title: "Ansvar og tredjeparter",
            body: [
              "I det omfang det er tilladt af ufravigelig lovgivning, er operatøren ikke ansvarlig for indirekte eller konsekvent tab. Annoncer og links fra tredjepart er ikke anbefalinger.",
            ],
          },
          {
            title: "Intellektuel ejendom og ændringer",
            body: [
              "Website-designet og det oprindelige forklarende indhold er beskyttet af gældende lov. Du beholder ansvaret for det indhold, du behandler. Vi kan ændre eller ophøre med funktioner og vil datere ændringer i materialebetingelser.",
            ],
          },
          {
            title: "Gældende lov og kontakt",
            body: [
              "Denne service drives fra {{region}}. Gældende lov: {{governing_law}}. Jurisdiktion: {{jurisdiction}}. Obligatoriske forbrugerbeskyttelser fortsætter med at gælde. Kontakt {{email}}. Ikrafttrædelsesdato: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Vi byder velkommen til spørgsmål, fejlrapporter, privatlivsanmodninger og misbrugsrapporter.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Kontakt {{email}}. Inkluder ikke værktøjsinput såsom følsom tekst, JSON, Base64 værdier, adgangskoder, private nøgler eller personlige filer i din besked.",
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
    clear: "Ryd",
    copy: "Kopi",
    copied: "Kopieret",
    copyFailed: "Kunne ikke kopiere resultatet.",
    processingFailed: "Behandlingen mislykkedes. Prøv igen.",
    download: "Download",
    faqTitle: "Ofte stillede spørgsmål",
    localTitle: "AbsolTools virker i din browser.",
    localBody:
      "Din input og resultater behandles kun i denne browser. De bliver ikke uploadet til eller gemt på en server.",
  },
  preview: {
    word: {
      title: "Ord- og tegnoptæller",
      description:
        "Tæl ord, tegn, tegn uden mellemrum, linjer og afsnit uden at uploade din tekst.",
      inputLabel: "Tekst",
      words: "Ord",
      characters: "Tegn",
      noWhitespace: "Tegn uden mellemrum",
      lines: "Linjer",
      paragraphs: "Afsnit",
      completed: "Tæl færdig",
      approximate:
        "Denne browser mangler Intl.Segmenter, så tællinger af tegn og ord er omtrentlige.",
      tooLarge:
        "Indtastningen overskrider 1 MB-grænsen. Forkort eller ryd teksten for at fortsætte.",
      guideTitle: "Hvad tælles",
      guideBody:
        "I understøttede browsere tælles tegn som brugeropfattede graphemklynger, så en emoji eller et bogstav med kombinerende mærker tæller normalt som én. Tællingen uden mellemrum springer mellemrumsgraphemer i den originale tekst over uden at slå graphemerne på hver side sammen. Linjer følger linjeskift. Visuelt tomme linjer, inklusive linjer der kun indeholder mellemrum, adskiller afsnit.",
      faqs: [
        {
          q: "Hvordan tælles ord?",
          a: "Browsere med Intl.Segmenter bruger den aktuelle sidens sprog til ordgrænser og tæller ordlignende segmenter. Andre browsere viser et omtrentligt antal.",
        },
        {
          q: "Tæller emoji som tegn?",
          a: "I understøttede browsere tælles en emoji eller en kombineret karakter, der fremstår som ét tegn, kun én gang.",
        },
      ],
    },
    json: {
      title: "JSON-formatter",
      description:
        "Formatér JSON for at gøre det lettere at læse, tjek det for fejl, eller komprimer det til én linje.",
      inputLabel: "JSON input",
      outputLabel: "Resultat",
      placeholder: "Indsæt JSON her…",
      outputPlaceholder: "Formateret eller minificeret JSON vises her.",
      openFile: "Åbn .json",
      tooLarge: "Input overstiger 10 MiB-grænsen.",
      manualRequired:
        "Automatisk validering er sat på pause for denne store input. Vælg Format, Valider eller Minimer.",
      format: "Format",
      validate: "Valider",
      validateHelpLabel: "Om Valider",
      validateHelp:
        "Kontrollerer, om inputtet følger RFC 8259 JSON-syntaks og rapporterer placeringen og årsagen til eventuelle syntaksfejl. Den omformaterer eller ændrer ikke teksten på nogen måde.",
      minify: "Formindsk",
      minifyHelpLabel: "Om Minify",
      minifyHelp:
        "Fjerner valgfrie mellemrum og linjeskift fra gyldig JSON for at gøre den kompakt. Strengindhold, det oprindelige format af tal og duplikerede objektnøgler bevares.",
      indent: "Indrykning",
      twoSpaces: "2 mellemrum",
      fourSpaces: "4 mellemrum",
      tabs: "Faner",
      valid: "Gyldig JSON",
      invalidAt: "{message} Linje {line}, kolonne {column}.",
      duplicate: "Duplikeret nøgle på linje {line}, kolonne {column}",
      bom: "UTF-8 BOM fjernet før behandling.",
      errorMessages: {
        InvalidSymbol: "Ugyldigt symbol.",
        InvalidNumberFormat: "Ugyldigt nummerformat.",
        PropertyNameExpected: "Et ejendomsnavn er påkrævet.",
        ValueExpected: "En værdi er påkrævet.",
        ColonExpected: "Et kolon er påkrævet efter ejendomsnavnet.",
        CommaExpected: "Et komma er påkrævet mellem elementer.",
        CloseBraceExpected: "En afsluttende krølleparentes er påkrævet.",
        CloseBracketExpected: "En afsluttende parentes er påkrævet.",
        EndOfFileExpected: "Uventet indhold vises efter JSON-værdien.",
        InvalidCommentToken: "Kommentarer er ikke gyldige JSON.",
        UnexpectedEndOfComment: "Kommentaren er ufuldstændig.",
        UnexpectedEndOfString: "Strengen er ufuldstændig.",
        UnexpectedEndOfNumber: "Nummeret er ufuldstændigt.",
        InvalidUnicode: "Unicode-flugten er ugyldig.",
        InvalidEscapeCharacter: "Escape-sekvensen er ugyldig.",
        InvalidCharacter: "Dette tegn er ikke gyldigt her.",
        Unknown: "JSON er ikke gyldig.",
      },
      guideTitle: "JSON regler og bevaring af tal",
      guideBody:
        "Validering følger RFC 8259: kommentarer, afsluttende kommaer og enkeltcitationstegn rapporteres som fejl. Duplikerede nøgler bevares med en advarsel, og store tal beholder den præcise notation, du indtastede.",
      faqs: [
        {
          q: "Vil store tal ændre sig?",
          a: "Nej. Formatering og minificering genberegner ikke tal; de beholder den notation, du indtastede, så store tal ikke afrundes.",
        },
        {
          q: "Hvorfor rapporteres dublerede nøgler?",
          a: "Software kan håndtere dublerede objektnøgler forskelligt. AbsolTools bevarer dem og viser en advarsel i stedet for stille at slette data.",
        },
        {
          q: "Reparerer formatteren ugyldig JSON?",
          a: "Ingen kommentarer, afsluttende kommaer, enkelte anførselstegn og anden ugyldig syntaks rapporteres, så du kan rette kilden bevidst.",
        },
      ],
    },
    time: {
      title: "Unix-tidsstempelkonverter",
      description:
        "Konverter Unix-tidsstempler i sekunder eller millisekunder til datoer og tidspunkter i en valgt tidszone, og tilbage igen.",
      timestampMode: "Tidsstempel til dato og tid",
      dateMode: "Dato og tid til tidsstempel",
      timestampLabel: "Unix tidsstempel",
      dateLabel: "Dato og tid",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Vælg dato og tidspunkt",
      unit: "Enhed",
      auto: "Automatisk registrering",
      seconds: "Sekunder",
      milliseconds: "Millisekunder",
      zoneMode: "Tidszone",
      utc: "UTC forskydning",
      local: "Browsers tidszone",
      selected: "IANA tidszone",
      zoneLabel: "By, region eller IANA tidszone",
      zonePlaceholder: "Søg New York, Asien eller Amerika/New_York",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seoul, Sydkorea — Asien/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "New York, USA — Amerika/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, USA — Amerika/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "London, Storbritannien — Europa/London",
        },
        { value: "Europe/Paris", label: "Paris, Frankrig — Europa/Paris" },
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
          label: "Auckland, New Zealand — Pacific/Auckland",
        },
      ],
      offsetLabel: "Forskydning fra UTC",
      disambiguation: "Sprunget over eller gentaget lokal tid",
      reject: "Vis en fejl",
      earlier: "Brug tidligere resultat",
      later: "Brug senere resultat",
      now: "Nu",
      convert: "Konverter",
      instant: "UTC dato og klokkeslæt",
      zoned: "Dato og tid i den valgte zone",
      unixSeconds: "Unix tidsstempel (sekunder)",
      unixMilliseconds: "Unix tidsstempel (millisekunder)",
      converted: "Konvertering fuldført",
      invalid:
        "Indtast et gyldigt Unix-tidsstempel eller en ISO-dato og -tid, og kontroller tidszonen.",
      ambiguousUnit:
        "11- eller 12-cifrede værdier er tvetydige. Vælg sekunder eller millisekunder.",
      nonexistentTime:
        "Denne dato og tid springes over i den valgte tidszone, fordi uret stilles frem. Vælg det tidligere eller senere resultat.",
      repeatedTime:
        "Denne dato og tid forekommer to gange i den valgte tidszone, fordi uret går tilbage. Vælg det tidligere eller senere resultat.",
      y2038:
        "Denne værdi ligger uden for det tegnede 32-bit Unix-tidsinterval.",
      guideTitle: "Hvordan enheder og tidszoner håndteres",
      guideBody:
        "Automatisk detektion betragter decimaltal og 1–10-cifrede heltal som sekunder, 13-cifrede heltal som millisekunder, og beder dig vælge en enhed for 11- eller 12-cifrede heltal. Indtast en lokal dato og tid direkte eller brug vælgeren; sekunder og brøkdele af sekunder er valgfrie. Browserens tidszone bruges som standard. Når man konverterer et tidsstempel, ændrer tidszonen kun den viste lokale dato og tid. Når man konverterer en lokal dato og tid, bestemmer tidszonen Unix-værdien.",
      faqs: [
        {
          q: "Hvordan fungerer automatisk enhedsdetektion?",
          a: "Decimaler og heltal med 1–10 cifre behandles som sekunder. Heltal med tretten cifre behandles som millisekunder. Vælg en enhed for værdier med 11–12 cifre.",
        },
        {
          q: "Hvilket datoformat kan jeg indtaste?",
          a: "Indtast en lokal dato og tid uden et UTC-offset, såsom 2026-08-29T14:30. Sekunder og op til ni brøkdele af sekunder er valgfri, eller brug vælgeren.",
        },
        {
          q: "Hvordan adskiller tidszoneindstillingerne sig?",
          a: "Browserens tidszone er standarden og følger de klokkeslætsregler, der er konfigureret på din enhed. Vælg UTC-forskydning for at bruge en fast værdi såsom +00:00 eller +09:00. En IANA-zone såsom America/New_York følger de klokkeslætsændringsregler, der gælder for den region.",
        },
        {
          q: "Kan sommertid gøre et Unix-tidsstempel tvetydigt?",
          a: "Nej. Et Unix-tidsstempel identificerer et enkelt øjeblik. Tvetydighed opstår kun, når du konverterer en lokal dato og tid i en zone, hvor urene ændres: nogle lokale tidspunkter springes over, mens andre forekommer to gange. Værktøjet viser som standard en fejl; vælg kun det tidligere eller senere resultat, hvis du ønsker det løst.",
        },
      ],
    },
    textCompare: {
      title: "Tekstsammenligning",
      description:
        "Sammenlign to tekster linje for linje og fremhæv tilføjelser, fjernelser og ændringer uden at uploade nogen af versionerne.",
      originalLabel: "Original tekst",
      changedLabel: "Ændret tekst",
      originalPlaceholder: "Indsæt den oprindelige tekst her…",
      changedPlaceholder: "Indsæt den ændrede tekst her…",
      compare: "Sammenlign",
      swap: "Byt",
      results: "Sammenligningsresultater",
      empty: "Indtast tekst på mindst én side for at sammenligne.",
      tooLarge: "Hver tekst skal være på 1 MiB eller mindre.",
      tooManyLines:
        "De to tekster kan til sammen indeholde op til 20.000 linjer.",
      tooComplex:
        "Denne sammenligning er for kompleks til at behandle sikkert. Prøv kortere tekster.",
      stale:
        "Resultatet nedenfor er fra den tidligere sammenligning. Sammenlign igen for at opdatere det.",
      complete: "Sammenligning fuldført",
      identical: "De to tekster er identiske.",
      approximate:
        "Denne browser mangler Intl.Segmenter, så indlejrede tegnfremhævninger er omtrentlige.",
      inlineLimited:
        "Nogle lange redigerede linjer vises som hel-linje-ændringer for at holde sammenligningen responsiv.",
      additions: "Tilføjede linjer: {count}",
      deletions: "Fjernede linjer: {count}",
      changes: "Ændrede rækker: {count}",
      previousChange: "Tidligere ændring",
      nextChange: "Næste ændring",
      expandUnchanged: "Vis {count} uændrede linjer",
      whitespaceChange: "Whitespace ændret",
      lineEndingChange: "Linjeslutning ændret",
      unchangedRow: "Uændret linje",
      addedRow: "Tilføjet linje",
      removedRow: "Fjernet linje",
      changedRow: "Ændret linje",
      originalLine: "Original linje {line}",
      changedLine: "Ændret linje {line}",
      guideTitle: "Hvordan sammenligningen fungerer",
      guideBody:
        "Sammenligningen justerer først linjer og fremhæver derefter redigeringer på tegnniveau inden for parrede ændrede linjer. Mellemrum og ændringer kun i linjeslut mærkes tydeligt. Lange uændrede sektioner forbliver sammenklappede, indtil du udvider dem.",
      faqs: [
        {
          q: "Uploader AbsolTools teksterne?",
          a: "Nej. Begge tekster sammenlignes lokalt i din browser og sendes ikke til en server.",
        },
        {
          q: "Bliver forskellige linjeafslutninger registreret?",
          a: "Ja. Forskelle mellem CRLF, LF og CR linjeskift markeres, selv når den synlige linjetekst er den samme.",
        },
      ],
    },
    caseConverter: {
      title: "Konverter store og små bogstaver",
      description:
        "Konverter tekst til store bogstaver, små bogstaver, sætningstilstand eller ord med stort begyndelsesbogstav uden at uploade den.",
      inputLabel: "Tekst",
      outputLabel: "Konverteret tekst",
      placeholder: "Skriv eller indsæt tekst her…",
      outputPlaceholder: "Konverteret tekst vises her.",
      modeLabel: "Konvertering",
      upper: "STORE BOGSTAVER",
      lower: "små bogstaver",
      sentence: "Sætningstype",
      capitalizeWords: "Stort begyndelsesbogstav i hvert ord",
      converted: "Konvertering fuldført",
      noChange: "Teksten matcher allerede denne konvertering.",
      outdated: "Den synlige output er fra den tidligere input.",
      tooLarge: "Indtastning overskrider 1 MB-grænsen.",
      guideTitle: "Hvordan hver konvertering fungerer",
      guideBody:
        "Store og små bogstaver bruger Unicode's standard bogstavkortlægninger. Sætningstilstand gør teksten små bogstaver og gør det første bogstav med stort i starten, efter et linjeskift eller efter . ! ? 。 ！ ？. Kapitaliser ord gør det første bogstav i hver ord stort, samtidig med at mellemrum, tegnsætning, linjeskift, apostroffer, bindestreger og understregninger bevares.",
      faqs: [
        {
          q: "Er 'Capitalize words' det samme som 'title case'?",
          a: "Nej. Den gør hvert ord stort på en mekanisk måde og anvender ikke sprog-specifikke titelregler for artikler, præpositioner, navne eller forkortelser.",
        },
        {
          q: "Bevarer konvertering mellemrum og linjeskift?",
          a: "Ja. Værktøjet ændrer kun bogstavernes store og små bogstaver og beholder den originale mellemrum, tegnsætning og linjeskift.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Eksempel: AbsolTools tæller ord og tegn online.",
    jsonInput: 'Eksempel: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Eksempel: 1704067200 (sekunder) eller 1704067200000 (millisekunder).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Eksempelformat: 2024-01-01T00:00. Sekunder er valgfrie, og du kan også bruge datovælgeren.",
    timeResult: "Konverteret værdi",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 dekoder",
      summary: "Dekod Base64 tekst eller filer online.",
      searchTerms: [
        "afkode",
        "dekoder",
        "Base64URL",
        "Data URI",
        "tekst",
        "fil",
        "binær",
      ],
    },
    "base64-encode": {
      name: "Base64 encoder",
      summary: "Kod tekst eller filer til Base64 online.",
      searchTerms: [
        "kodes",
        "encoder",
        "Base64URL",
        "Data URI",
        "tekst",
        "fil",
        "binær",
      ],
    },
    "word-counter": {
      name: "Ord- og tegnoptæller",
      summary: "Tæl ord, tegn, linjer og afsnit online.",
      searchTerms: [
        "ordtælling",
        "tegnoptælling",
        "bogstaver",
        "linjer",
        "afsnit",
        "tekst",
      ],
    },
    "json-formatter": {
      name: "JSON-formatter",
      summary:
        "Gør JSON nemmere at læse, tjek det for fejl, eller minificer det til en linje.",
      searchTerms: [
        "format JSON",
        "valider JSON",
        "minify JSON",
        "pæn udskrift",
        "data",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix-tidsstempelkonverter",
      summary:
        "Konverter Unix-tidsstempler i sekunder eller millisekunder til datoer og tidspunkter, og tilbage.",
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
        "Sammenlign to tekster linje for linje og fremhæv deres forskelle.",
      searchTerms: [
        "tekstforskel",
        "sammenlign tekst",
        "forskelle",
        "linjesammenligning",
      ],
    },
    "case-converter": {
      name: "Konverter store og små bogstaver",
      summary:
        "Konverter tekst til store bogstaver, små bogstaver, sætningsform eller ord med store begyndelsesbogstaver.",
      searchTerms: [
        "store bogstaver",
        "små bogstaver",
        "sætningstype",
        "kapitalisere",
        "tekst",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Alle værktøjer",
    directoryMetaTitle: "AbsolTools | Nyttige værktøjer, lige ved hånden",
    directoryMetaDescription:
      "Formatér, konvertér, kod, afkod, sammenlign og kontrollér tekst, data og kode direkte i browseren. Input og resultater uploades ikke.",
    directoryTitle:
      "Vi gør ofte brugte værktøjer mere overskuelige og nemmere at bruge",
    directoryIntro:
      "Føj siden til dine bogmærker, så du kan gå direkte hertil næste gang.",
    toolPromise:
      "AbsolTools gør ofte brugte onlineværktøjer mere præcise og nemmere at bruge. Hver opgave behandles kun i din browser uden at blive gemt separat eller sendt til en server. Føj siden til dine bogmærker.",
    directorySearchLabel: "Søg efter værktøjer",
    directorySearchPlaceholder: "Søg efter navn, beskrivelse eller nøgleord",
    directorySearchClear: "Ryd søgning",
    directorySearchNoResults: "Ingen værktøjer matcher din søgning.",
    directorySearchCount: "Matchende værktøjer: {count}",
    available: "Tilgængelig",
    research: "Forhåndsvisning",
    reserve: "Planlagt",
    breadcrumbLabel: "Brødkrummenavigation",
    encodingCategory: "Kodning og afkodning",
    categories: {
      encoding: "Kodning",
      generator: "Generatorer",
      text: "Tekst",
      converter: "Konvertering",
      image: "Billeder",
      data: "Data",
      time: "Tid",
    },
    footerNote: "Populære funktioner, nemmere at bruge.",
    catalogAria: "Værktøjsmappe",
    useLightTheme: "Brug lyst tema",
    useDarkTheme: "Brug mørkt tema",
    relatedTools: "Relaterede værktøjer",
  },
} satisfies LocaleBundle;

export default daBundle;
