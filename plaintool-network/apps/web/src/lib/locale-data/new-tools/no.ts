import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";

const backgroundRemover = backgroundRemoverFor("no");

const seed = {
  formatterSubnet: formatterSubnetFor("no"),
  background: backgroundRemover.copy,
  dateCalculator: dateCalculatorFor("no"),
  timeZoneConverter: timeZoneConverterFor("no"),
  calculatorSuite: calculatorSuiteFor("no"),
  ui: {
    clear: "Tøm",
    copy: "Kopier",
    download: "Last ned",
    openFile: "Åpne fil",
    chooseImage: "Velg bilde",
    dropFile: "Slipp et bilde her.",
    ready: "Klar",
    working: "Arbeider…",
    complete: "Fullført",
    unchanged: "Ingen endring nødvendig",
    outdated: "Resultatet er utdatert",
    copied: "Kopiert",
    copyFailed: "Kunne ikke kopiere",
    tooLarge: "Inndataene er for store til å behandles på en sikker måte.",
    failed: "Behandlingen mislyktes. Kontroller inndataene og prøv igjen.",
    resultHere: "Resultatet vises her.",
    localTitle: "Behandles bare i denne nettleseren",
    localBody:
      "Inndataene og resultatene dine lastes ikke opp eller lagres. De blir værende i denne nettleserfanen.",
    guideTitle: "Slik bruker du {name}",
    safetyTitle: "Privat, lokal behandling",
    faqWhat: "Hva gjør {name}?",
    faqPrivacy: "Lastes dataene mine opp?",
    faqCheck: "Hva bør jeg kontrollere når jeg bruker {name}?",
  },
  ai: {
    input: "Originaltekst",
    output: "Renset tekst",
    placeholder: "Lim inn tekst som kan inneholde skjulte Unicode-tegn.",
    run: "Fjern skjulte tegn",
    report: "Fjerningsrapport",
    removed: "Fjernede tegn",
    normalized: "Normaliserte mellomrom",
    noChanges: "Ingen av de valgte skjulte tegnene ble funnet.",
    count: "{count} fjernet",
    advanced: "Avanserte Unicode-alternativer",
    advancedWarning:
      "Disse alternativene kan endre stavemåte, emojier eller skriftforming. Aktiver dem bare når du forstår kildeteksten.",
    joinControls: "Fjern ZWJ og ZWNJ",
    joinWarning:
      "Kan ødelegge emojisekvenser og formingen av arabisk, persisk eller indisk skrift.",
    variationSelectors: "Fjern variasjonsvelgere",
    variationWarning: "Kan endre utseendet til emojier eller CJK-tegn.",
    combiningMarks: "Fjern kombinerende tegn",
    combiningWarning:
      "Kan fjerne aksenter, vokaltegn og andre tegn som har betydning.",
    noBreakSpaces: "Normaliser harde mellomrom",
    noBreakNote: "Gjør NBSP-lignende mellomrom om til vanlige mellomrom.",
    kinds: [
      "Mellomrom uten bredde",
      "Ordbinder",
      "Byterekkefølgemerke",
      "Myk bindestrek",
      "Kontrolltegn for toveis tekst",
      "Usynlig skilletegn",
      "Bindekontroll",
      "Variasjonsvelger",
      "Kombinerende tegn",
      "Hardt mellomrom eller siffermellomrom",
      "Smalt hardt mellomrom",
    ],
  },
  url: {
    mode: "Modus for URL-konvertering",
    encode: "Kod",
    decode: "Dekod",
    encodeInput: "Tekst eller URL som skal kodes",
    decodeInput: "Kodet URL-verdi",
    encodeOutput: "Kodet resultat",
    decodeOutput: "Dekodet resultat",
    encodePlaceholder: "Eksempel: https://example.com/search?q=hei verden",
    decodePlaceholder: "Eksempel: hei%20verden%3Fside%3D1",
    scope: "Kodingsområde",
    component: "URL-komponent",
    uri: "Fullstendig URI",
    formSpace: "Bruk + for mellomrom i skjemadata",
    recursive: "Dekod gjentatte ganger",
    passLimit: "Maksimalt antall gjennomganger",
    encoded: "URL-koding fullført",
    decoded: "URL-dekoding fullført",
    passCount: "Dekodet i {count} gjennomgang(er)",
    limitReached: "Flere kodede lag gjenstår etter gjennomgangsgrensen.",
    errors: [
      "Skriv inn en verdi først.",
      "En prosentsekvens er ufullstendig eller ugyldig.",
      "De dekodede bytene er ikke gyldig UTF-8.",
      "Velg en gjennomgangsgrense fra 1 til 10.",
    ],
  },
  hash: {
    input: "Tekst eller fil",
    placeholder:
      "Skriv inn tekst for å beregne SHA-256-, SHA-512-, SHA-1- og MD5-hashverdier.",
    results: "Hashverdier",
    resultLabel: "{algorithm}-hashverdi",
    copyLabel: "Kopier {algorithm}-hash",
    fileSelected: "Valgt: {name} ({size})",
    drop: "Slipp en fil her for å beregne hashverdien lokalt.",
    textTooLarge: "Teksten er for stor for denne nettleserøkten.",
    fileTooLarge: "Filen overskrider den lokale sikkerhetsgrensen.",
    legacyWarning:
      "MD5 og SHA-1 er med for kompatibilitetskontroller, ikke for passordlagring eller nye sikkerhetsløsninger.",
    expectedChecksum: "Forventet kontrollsum",
    checksumMatch: "Samsvarer",
    checksumMismatch: "Samsvarer ikke",
    checksumInvalid: "Skriv inn en støttet heksadesimal kontrollsum.",
    empty: "Skriv inn tekst eller velg en fil først.",
    unavailable: "Nettleseren kan ikke beregne én av de valgte hashverdiene.",
  },
  jwt: {
    input: "JWT-token",
    placeholder: "Lim inn en tredelt JWT: header.payload.signature",
    header: "Header",
    payload: "Nyttelast",
    signature: "Signatur",
    copyHeader: "Kopier dekodet JWT-header",
    copyPayload: "Kopier dekodet JWT-nyttelast",
    copySignature: "Kopier bytes fra JWT-signaturen",
    signatureBytes: "{count} byte",
    timestamps: "Tidsstempel-claims",
    expires: "Utløper (exp)",
    notBefore: "Ikke før (nbf)",
    issuedAt: "Utstedt (iat)",
    invalidTimestamp: "Denne claimen er ikke et gyldig numerisk tidsstempel.",
    noTimestamps: "Ingen claims for exp, nbf eller iat ble funnet.",
    noVerifyTitle: "Signaturen er ikke verifisert",
    noVerifyBody:
      "Dekoding viser bare innholdet i tokenet. Det beviser ikke hvem som utstedte tokenet, eller om signaturen er gyldig.",
    errors: [
      "Lim inn en JWT først.",
      "En JWT må inneholde nøyaktig tre deler atskilt med punktum.",
      "JWT-headeren er tom.",
      "JWT-nyttelasten er tom.",
      "Et segment er ikke gyldig Base64URL.",
      "Et segment er ikke gyldig UTF-8.",
      "Headeren er ikke gyldig JSON.",
      "Nyttelasten er ikke gyldig JSON.",
      "Headeren må være et JSON-objekt.",
      "Nyttelasten må være et JSON-objekt.",
    ],
  },
  qr: {
    input: "Tekst eller URL",
    placeholder: "Skriv inn teksten eller URL-en som skal legges i QR-koden.",
    preview: "Forhåndsvisning av QR-kode",
    previewEmpty: "Skriv inn innhold for å lage en QR-kode.",
    options: "Alternativer for QR-kode",
    correction: "Feilretting",
    correctionLevels: ["Lav (L)", "Middels (M)", "Kvartil (Q)", "Høy (H)"],
    quietZone: "Stillesone",
    quietZones: ["Ingen", "2 moduler", "4 moduler (anbefalt)", "8 moduler"],
    generate: "Lag QR-kode",
    png: "Last ned PNG",
    svg: "Last ned SVG",
    empty: "Skriv inn tekst eller en URL først.",
    tooLong: "Innholdet er for langt for dette feilrettingsnivået.",
    generationFailed: "QR-koden kunne ikke genereres.",
    downloadFailed: "Bildet kunne ikke klargjøres for nedlasting.",
    upload: "Bilde av QR-kode",
    formats: "PNG, JPEG, WebP, GIF eller BMP på opptil 10 MB",
    camera: "Kameraskanner",
    cameraHint:
      "Tillat kameratilgang for kontinuerlig skanning. Dekodede URL-er åpnes aldri automatisk.",
    startCamera: "Start kamera",
    stopCamera: "Stopp kamera",
    scanResult: "Dekodet innhold",
    scanPlaceholder: "Den skannede teksten vises her.",
    urlDetected: "URL oppdaget",
    openUrl: "Åpne URL",
    urlDialogTitle: "Vil du åpne denne URL-en?",
    urlDialogBody:
      "Denne URL-en ble funnet i QR-koden. Kontroller at den er trygg og tilhører nettstedet du forventer.",
    urlDialogDestination: "Måladresse",
    cancel: "Avbryt",
    reading: "Leser bilde…",
    starting: "Starter kamera…",
    scanning: "Leter etter en QR-kode…",
    invalidImage: "Velg et gyldig bildeformat som støttes.",
    noCode: "Fant ingen lesbar QR-kode i bildet.",
    unsupported: "Denne nettleseren støtter ikke skanning med kamera.",
    denied: "Kameratilgang ble avslått.",
    unavailable: "Ingen egnet kamera er tilgjengelig.",
    scanFailed: "QR-koden kunne ikke skannes.",
  },
  data: {
    convert: "Konverter",
    inputPlaceholder: "Lim inn kildedata her.",
    outputPlaceholder: "Det konverterte resultatet vises her.",
    drop: "Slipp en støttet tekstfil her.",
    readFailed: "Filen kunne ikke leses.",
    errorAt: "{message} Linje {line}, kolonne {column}.",
    delimiter: "CSV-skilletegn",
    auto: "Finn automatisk",
    comma: "Komma (,)",
    semicolon: "Semikolon (;)",
    tab: "Tabulator",
    pipe: "Loddrett strek (|)",
    firstHeader: "Bruk første rad som overskrift",
    pretty: "Formater JSON med innrykk",
    errors: [
      "CSV-en inneholder et uavsluttet anførselstegn eller et ugyldig felt.",
      "Fant ingen Markdown-tabell med en skilletegnrad.",
      "Markdown-tabellen er ugyldig.",
      "Inndataene er ikke gyldig JSON.",
      "JSON må være en liste med objekter.",
      "En CSV-overskrift er tom.",
      "CSV-overskrifter må være unike.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Fjerner for AI-vannmerker og skjulte tegn",
      description:
        "Finn og fjern konkrete, skjulte Unicode-tegn som ofte følger med tekst kopiert fra GPT, Claude, PDF-er eller nettsider. Verktøyet avgjør ikke om en tekst er skrevet av KI.",
      guide:
        "Lim inn tekst og kontroller først det rensede resultatet. Se deretter de nøyaktige tegnnavnene, antallene og U+-kodepunktene. Risikable alternativer som kan endre skriftforming, er slått av som standard.",
      terms: [
        "fjerne AI-vannmerke",
        "GPT skjulte tegn",
        "Claude skjulte tegn",
        "mellomrom uten bredde",
        "Unicode-renser",
      ],
    },
    "url-encode": {
      title: "URL-koder",
      description:
        "Prosentkoder tekst, spørringsverdier eller fullstendige URI-er etter standardreglene for nettet.",
      guide:
        "Velg URL-komponent for én enkelt spørringsverdi eller fullstendig URI for å bevare URL-skilletegn. Bruk plusstegn bare for skjemadata.",
      terms: [
        "kode URL",
        "prosentkoding",
        "encodeURIComponent",
        "spørringsstreng",
      ],
    },
    "url-decode": {
      title: "URL-dekoder",
      description:
        "Dekod prosentkodede URL-er og spørringsverdier, eventuelt med et begrenset antall gjennomganger.",
      guide:
        "Lim inn den kodede verdien, velg område og bruk gjentatt dekoding bare når du vet at kilden inneholder flere kodingslag.",
      terms: [
        "dekode URL",
        "prosentdekoding",
        "decodeURIComponent",
        "spørringsstreng",
      ],
    },
    "hash-generator": {
      title: "Hashgenerator",
      description:
        "Beregn SHA-256-, SHA-512-, SHA-1- og MD5-kontrollsummer lokalt for tekst eller filer.",
      guide:
        "Skriv inn tekst eller velg en fil, og sammenlign nøyaktig den nødvendige algoritmen. Hashverdier kontrollerer likhet; de krypterer ikke data og lagrer ikke passord sikkert alene.",
      terms: ["SHA-256", "SHA-512", "MD5", "kontrollsum", "filhash"],
    },
    "jwt-decoder": {
      title: "JWT-dekoder",
      description:
        "Dekod header, nyttelast, signaturbytes og tidsstempel-claims i en JWT uten å laste opp tokenet.",
      guide:
        "Kontroller dekodet JSON og tidsstemplene, men verifiser signaturer og claims i systemet som har signeringsnøkkelen. Dekoding alene etablerer ikke tillit.",
      terms: ["JWT-dekoder", "JSON Web Token", "JWT-nyttelast", "JWT-header"],
    },
    "qr-code-generator": {
      title: "QR-kodegenerator",
      description:
        "Lag en statisk QR-kode som følger standarden, for tekst eller en URL, og last den ned som PNG eller SVG.",
      guide:
        "Skriv inn det nøyaktige innholdet, behold en stillesone på fire moduler for pålitelig skanning, og øk feilrettingen hvis koden kan bli delvis tildekket.",
      terms: ["QR-kodegenerator", "QR PNG", "QR SVG", "statisk QR-kode"],
    },
    "qr-code-scanner": {
      title: "QR-kodeskanner",
      description:
        "Les en QR-kode lokalt fra et bilde eller kamera uten å åpne dekodede lenker automatisk.",
      guide:
        "Bruk et skarpt, godt belyst bilde der hele stillesonen er synlig. Kontroller og kopier den dekodede verdien før du avgjør om en URL er trygg.",
      terms: [
        "QR-skanner",
        "skann QR-bilde",
        "QR-leser med kamera",
        "dekode QR",
      ],
    },
    "csv-to-markdown": {
      title: "CSV til Markdown-konverterer",
      description:
        "Gjør CSV-rader om til en ryddig Markdown-tabell med automatisk skilletegngjenkjenning og beskyttede celler.",
      guide:
        "Kontroller skilletegnet og om første rad er en overskrift. Flerlinjede celler får tabellsikre linjeskift, og loddrette streker beskyttes.",
      inputLabel: "CSV-inndata",
      outputLabel: "Markdown-tabell",
      inputPlaceholder: "navn,poeng\nAri,92",
      terms: ["CSV til Markdown", "Markdown-tabell", "CSV-konverterer"],
    },
    "markdown-to-csv": {
      title: "Markdown til CSV-konverterer",
      description:
        "Konverter en Markdown-tabell til standardvennlig CSV for regneark og dataverktøy.",
      guide:
        "Ta med en overskriftsrad og skilletegnrad i Markdown-tabellen, og velg deretter skilletegnet som målprogrammet krever.",
      inputLabel: "Markdown-tabell",
      outputLabel: "CSV-resultat",
      inputPlaceholder: "| navn | poeng |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown til CSV", "tabell til CSV", "Markdown-konverterer"],
    },
    "json-to-csv": {
      title: "JSON til CSV-konverterer",
      description:
        "Konverterer en liste med JSON-objekter til CSV og bruker alle objektnøkler som kolonner.",
      guide:
        "Bruk en liste med objekter på øverste nivå. Nøstede verdier bevares som kompakte JSON-strenger, så kontroller hvordan målregnearket håndterer dem.",
      inputLabel: "JSON-liste",
      outputLabel: "CSV-resultat",
      inputPlaceholder: '[{"navn":"Ari","poeng":92}]',
      terms: ["JSON til CSV", "JSON-liste til CSV", "datakonverterer"],
    },
    "csv-to-json": {
      title: "CSV til JSON-konverterer",
      description:
        "Konverter CSV til en liste med JSON-objekter ved å bruke første rad som feltnavn.",
      guide:
        "Sørg for at hver overskrift er utfylt og unik. Kontroller skilletegngjenkjenningen før du konverterer data med komma, anførselstegn eller flerlinjede celler.",
      inputLabel: "CSV-inndata",
      outputLabel: "JSON-liste",
      inputPlaceholder: "navn,poeng\nAri,92",
      terms: ["CSV til JSON", "CSV-parser", "JSON-liste"],
    },
    "html-to-markdown": {
      title: "HTML til Markdown-konverterer",
      description:
        "Konverter HTML-struktur til lesbar Markdown, inkludert overskrifter, lenker, lister, kode og tabeller.",
      guide:
        "Lim inn HTML-fragmentet du vil konvertere. Kontroller komplekse oppsett og innebygd innhold, siden Markdown ikke kan gjengi all HTML-oppførsel.",
      inputLabel: "HTML-inndata",
      outputLabel: "Markdown-resultat",
      inputPlaceholder: "<h1>Tittel</h1><p>Hei <strong>verden</strong>.</p>",
      terms: ["HTML til Markdown", "HTML-konverterer", "Turndown"],
    },
    "markdown-to-html": {
      title: "Markdown til HTML-konverterer",
      description:
        "Gjengi Markdown som HTML med vanlige GFM-tabeller, lister, lenker og inngjerdede kodeblokker.",
      guide:
        "Konverter bare Markdown du har tenkt å bruke, og rens HTML-en på nytt før du setter inn utdata fra en uklarert kilde på en nettside.",
      inputLabel: "Markdown-inndata",
      outputLabel: "HTML-resultat",
      inputPlaceholder: "# Tittel\n\nHei **verden**.",
      terms: ["Markdown til HTML", "Markdown-gjengivelse", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
