import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("nl");

const seed = {
  locale: "nl",
  formatterSubnet: formatterSubnetFor("nl"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("nl"),
  dateCalculator: dateCalculatorFor("nl"),
  timeZoneConverter: timeZoneConverterFor("nl"),
  calculatorSuite: calculatorSuiteFor("nl"),
  uuidGenerator: uuidGeneratorFor("nl"),
  ui: {
    clear: "Wissen",
    copy: "Kopiëren",
    download: "Downloaden",
    openFile: "Bestand openen",
    chooseImage: "Afbeelding kiezen",
    dropFile: "Sleep hier een afbeelding naartoe.",
    ready: "Gereed",
    working: "Bezig…",
    complete: "Voltooid",
    unchanged: "Geen wijziging nodig",
    outdated: "Het resultaat is niet meer actueel",
    copied: "Gekopieerd",
    copyFailed: "Kopiëren mislukt",
    tooLarge: "De invoer is te groot om veilig te verwerken.",
    failed:
      "De verwerking is mislukt. Controleer de invoer en probeer het opnieuw.",
    resultHere: "Het resultaat verschijnt hier.",
    localTitle: "Alleen in deze browser verwerkt",
    localBody:
      "Uw invoer en resultaten worden niet geüpload of opgeslagen. Ze blijven in dit browsertabblad.",
    guideTitle: "Zo gebruikt u {name}",
    safetyTitle: "Privé en lokale verwerking",
    faqWhat: "Wat doet {name}?",
    faqPrivacy: "Worden mijn gegevens geüpload?",
    faqCheck: "Waar moet ik op letten bij het gebruik van {name}?",
  },
  ai: {
    input: "Oorspronkelijke tekst",
    output: "Opgeschoonde tekst",
    placeholder: "Plak gekopieerde tekst die ongewenste onzichtbare tekens kan bevatten.",
    run: "Verborgen tekens verwijderen",
    report: "Verwijderingsrapport",
    removed: "Verwijderde tekens",
    normalized: "Genormaliseerde spaties",
    noChanges: "Geen van de geselecteerde verborgen tekens is gevonden.",
    count: "{count} verwijderd",
    advanced: "Geavanceerde Unicode-opties",
    advancedWarning:
      "Deze opties kunnen spelling, emoji of schriftvormen wijzigen. Schakel ze alleen in als u de structuur van de brontekst begrijpt.",
    joinControls: "ZWJ en ZWNJ verwijderen",
    joinWarning:
      "Kan emoji-reeksen en tekenverbindingen in Arabisch, Perzisch of Indische schriften verbreken.",
    variationSelectors: "Variatieselectoren verwijderen",
    variationWarning: "Kan het uiterlijk van emoji of CJK-tekens veranderen.",
    combiningMarks: "Combinerende tekens verwijderen",
    combiningWarning:
      "Kan accenten, klinkertekens en andere betekenisvolle tekens verwijderen.",
    noBreakSpaces: "Vaste spaties normaliseren",
    noBreakNote: "Zet NBSP-achtige witruimte om in gewone spaties.",
    kinds: [
      "Spatie zonder breedte",
      "Woordverbinder",
      "Bytevolgordemarkering",
      "Zacht afbreekstreepje",
      "Besturingsteken voor bidirectionele tekst",
      "Onzichtbaar scheidingsteken",
      "Verbindingsbesturingsteken",
      "Variatieselector",
      "Combinerend teken",
      "Vaste spatie of cijferspatie",
      "Smalle vaste spatie",
    ],
  },
  url: {
    mode: "URL-conversiemodus",
    encode: "Coderen",
    decode: "Decoderen",
    encodeInput: "Te coderen tekst of URL",
    decodeInput: "Gecodeerde URL-waarde",
    encodeOutput: "Gecodeerd resultaat",
    decodeOutput: "Gedecodeerd resultaat",
    encodePlaceholder: "Voorbeeld: https://example.com/search?q=hallo wereld",
    decodePlaceholder: "Voorbeeld: hallo%20wereld%3Fpagina%3D1",
    scope: "Coderingsbereik",
    component: "URL-component",
    uri: "Volledige URI",
    formSpace: "+ gebruiken voor spaties in formuliergegevens",
    recursive: "Herhaaldelijk decoderen",
    passLimit: "Maximaal aantal doorgangen",
    encoded: "URL-codering voltooid",
    decoded: "URL-decodering voltooid",
    passCount: "In {count} doorgang(en) gedecodeerd",
    limitReached: "Na de ingestelde limiet zijn er nog gecodeerde lagen over.",
    errors: [
      "Voer eerst een waarde in.",
      "Een percent-escape is onvolledig of ongeldig.",
      "De gedecodeerde bytes vormen geen geldige UTF-8.",
      "Kies een limiet van 1 tot en met 10 doorgangen.",
    ],
  },
  hash: {
    input: "Tekst of bestand",
    placeholder:
      "Voer tekst in om SHA-256-, SHA-512-, SHA-1- en MD5-hashes te berekenen.",
    results: "Hashwaarden",
    resultLabel: "{algorithm}-hashwaarde",
    copyLabel: "{algorithm}-hash kopiëren",
    fileSelected: "Geselecteerd: {name} ({size})",
    drop: "Sleep hier een bestand naartoe om de hash lokaal te berekenen.",
    textTooLarge: "De tekst is te groot voor deze browsersessie.",
    fileTooLarge: "Het bestand overschrijdt de lokale veiligheidslimiet.",
    legacyWarning:
      "MD5 en SHA-1 zijn opgenomen voor compatibiliteitscontroles, niet voor wachtwoordopslag of nieuwe beveiligingsontwerpen.",
    expectedChecksum: "Verwachte controlesom",
    checksumMatch: "Komt overeen",
    checksumMismatch: "Komt niet overeen",
    checksumInvalid: "Voer een ondersteunde hexadecimale controlesom in.",
    empty: "Voer eerst tekst in of kies een bestand.",
    unavailable: "Deze browser kan een van de gevraagde hashes niet berekenen.",
  },
  jwt: {
    input: "JWT-token",
    placeholder: "Plak een driedelige JWT: header.payload.signature",
    header: "Header",
    payload: "Payload",
    signature: "Handtekening",
    copyHeader: "Gedecodeerde JWT-header kopiëren",
    copyPayload: "Gedecodeerde JWT-payload kopiëren",
    copySignature: "Bytes van JWT-handtekening kopiëren",
    signatureBytes: "{count} bytes",
    timestamps: "Tijdclaims",
    expires: "Verloopt op (exp)",
    notBefore: "Geldig vanaf (nbf)",
    issuedAt: "Uitgegeven op (iat)",
    invalidTimestamp: "Deze claim bevat geen geldige numerieke tijdstempel.",
    noTimestamps: "Er zijn geen exp-, nbf- of iat-claims gevonden.",
    noVerifyTitle: "Handtekening niet geverifieerd",
    noVerifyBody:
      "Decoderen toont alleen de inhoud van het token. Het bewijst niet wie het token heeft uitgegeven of dat de handtekening geldig is.",
    errors: [
      "Plak eerst een JWT.",
      "Een JWT moet uit precies drie door punten gescheiden delen bestaan.",
      "De JWT-header is leeg.",
      "De JWT-payload is leeg.",
      "Een segment is geen geldige Base64URL.",
      "Een segment is geen geldige UTF-8.",
      "De header is geen geldige JSON.",
      "De payload is geen geldige JSON.",
      "De header moet een JSON-object zijn.",
      "De payload moet een JSON-object zijn.",
    ],
  },
  qr: {
    input: "Tekst of URL",
    placeholder: "Voer de tekst of URL voor de QR-code in.",
    preview: "Voorbeeld van QR-code",
    previewEmpty: "Voer inhoud in om een QR-code te maken.",
    options: "QR-codeopties",
    correction: "Foutcorrectie",
    correctionLevels: ["Laag (L)", "Gemiddeld (M)", "Kwartiel (Q)", "Hoog (H)"],
    quietZone: "Vrije zone",
    quietZones: ["Geen", "2 modules", "4 modules (aanbevolen)", "8 modules"],
    generate: "QR-code maken",
    png: "PNG downloaden",
    svg: "SVG downloaden",
    empty: "Voer eerst tekst of een URL in.",
    tooLong: "De inhoud is te lang voor dit foutcorrectieniveau.",
    generationFailed: "De QR-code kon niet worden gemaakt.",
    downloadFailed: "De afbeelding kon niet voor downloaden worden voorbereid.",
    upload: "QR-codeafbeelding",
    formats: "PNG, JPEG, WebP, GIF of BMP tot 10 MB",
    camera: "Camerascanner",
    cameraHint:
      "Sta cameratoegang toe om continu te scannen. Gedecodeerde URL’s worden nooit automatisch geopend.",
    startCamera: "Camera starten",
    stopCamera: "Camera stoppen",
    scanResult: "Gedecodeerde inhoud",
    scanPlaceholder: "De gescande tekst verschijnt hier.",
    urlDetected: "URL gedetecteerd",
    openUrl: "URL openen",
    urlDialogTitle: "Deze URL openen?",
    urlDialogBody:
      "Deze URL is gevonden in de QR-code. Controleer of deze veilig is en bij de verwachte website hoort.",
    urlDialogDestination: "Bestemmingsadres",
    cancel: "Annuleren",
    reading: "Afbeelding wordt gelezen…",
    starting: "Camera wordt gestart…",
    scanning: "QR-code zoeken…",
    invalidImage: "Kies een geldige afbeelding in een ondersteund formaat.",
    noCode: "In deze afbeelding is geen leesbare QR-code gevonden.",
    unsupported: "Deze browser ondersteunt scannen met de camera niet.",
    denied: "Cameratoegang is geweigerd.",
    unavailable: "Er is geen geschikte camera beschikbaar.",
    scanFailed: "De QR-code kon niet worden gescand.",
  },
  data: {
    convert: "Converteren",
    inputPlaceholder: "Plak hier de brongegevens.",
    outputPlaceholder: "Het geconverteerde resultaat verschijnt hier.",
    drop: "Sleep hier een ondersteund tekstbestand naartoe.",
    readFailed: "Het bestand kon niet worden gelezen.",
    errorAt: "{message} Regel {line}, kolom {column}.",
    delimiter: "CSV-scheidingsteken",
    auto: "Automatisch detecteren",
    comma: "Komma (,)",
    semicolon: "Puntkomma (;)",
    tab: "Tab",
    pipe: "Sluisteken (|)",
    firstHeader: "Eerste rij als koptekst gebruiken",
    pretty: "JSON met inspringing opmaken",
    errors: [
      "De CSV bevat een niet-gesloten aanhalingsteken of een ongeldig veld.",
      "Er is geen Markdown-tabel met een scheidingsrij gevonden.",
      "De Markdown-tabel is ongeldig.",
      "De invoer is geen geldige JSON.",
      "JSON moet een array van objecten zijn.",
      "Een CSV-koptekst is leeg.",
      "CSV-kopteksten moeten uniek zijn.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "AI-tekst opschonen",
      description:
        "Schoont ondersteunde ongewenste onzichtbare tekens op die kunnen meekomen in gekopieerde tekst van ChatGPT, Claude, Gemini en andere bronnen. Het bewijst geen auteurschap, herkent geen AI-tekst en garandeert niet dat AI-detectoren worden omzeild.",
      guide:
        "Plak de tekst en bekijk eerst het opgeschoonde resultaat. Controleer daarna de exacte namen, aantallen en U+-codepunten van de verwijderde tekens. Opties die de schriftweergave kunnen wijzigen, staan standaard uit.",
      terms: [
        "AI-tekst opschonen",
        "gekopieerde AI-tekst opschonen",
        "onzichtbare tekens verwijderen",
        "verborgen tekens ChatGPT",
        "verborgen tekens Claude",
        "verborgen tekens Gemini",
        "AI-watermerk uit tekst verwijderen",
      ],
    },
    "url-encode": {
      title: "URL-encoder",
      description:
        "Codeert tekst, querywaarden of volledige URI’s volgens de standaardregels voor percentcodering op het web.",
      guide:
        "Kies URL-component voor één querywaarde of volledige URI om de scheidingstekens van de URL te behouden. Gebruik plustekens voor spaties alleen bij formuliergegevens.",
      terms: [
        "URL coderen",
        "percent codering",
        "encodeURIComponent",
        "querystring",
      ],
    },
    "url-decode": {
      title: "URL-decoder",
      description:
        "Decodeert percent-gecodeerde URL’s en querywaarden, eventueel in een begrensd aantal doorgangen.",
      guide:
        "Plak de gecodeerde waarde, kies het bereik en gebruik herhaald decoderen alleen als u weet dat de bron geneste codering bevat.",
      terms: [
        "URL decoderen",
        "percent codering opheffen",
        "decodeURIComponent",
        "querystring",
      ],
    },
    "hash-generator": {
      title: "Hashgenerator",
      description:
        "Berekent lokaal SHA-256-, SHA-512-, SHA-1- en MD5-controlesommen voor tekst of bestanden.",
      guide:
        "Voer tekst in of kies een bestand en vergelijk exact het vereiste algoritme. Hashes controleren gelijkheid; ze versleutelen zelf geen gegevens en slaan wachtwoorden niet veilig op.",
      terms: [
        "hashgenerator",
        "SHA-256-hash",
        "bestandshash",
        "SHA-256",
        "SHA-512",
        "MD5",
        "controlesom",
      ],
    },
    "jwt-decoder": {
      title: "JWT-decoder",
      description:
        "Decodeert de header, payload, handtekeningbytes en tijdclaims van een JWT zonder het token te uploaden.",
      guide:
        "Bekijk de gedecodeerde JSON en tijdstempels, maar verifieer handtekeningen en claims in het systeem dat de ondertekeningssleutel beheert. Alleen decoderen stelt geen vertrouwen vast.",
      terms: ["JWT decoder", "JSON Web Token", "JWT payload", "JWT header"],
    },
    "qr-code-generator": {
      title: "QR-codegenerator",
      description:
        "Maakt een statische QR-code volgens de standaard voor tekst of een URL, die als PNG of SVG kan worden gedownload.",
      guide:
        "Voer de exacte inhoud in, behoud een vrije zone van vier modules voor betrouwbaar scannen en verhoog de foutcorrectie als de code deels bedekt kan raken.",
      terms: ["QR code maken", "QR PNG", "QR SVG", "statische QR code"],
    },
    "qr-code-scanner": {
      title: "QR-codescanner",
      description:
        "Leest lokaal een QR-code uit een afbeelding of via de camera zonder gedecodeerde koppelingen automatisch te openen.",
      guide:
        "Gebruik een scherpe, goed belichte afbeelding waarop de volledige vrije zone zichtbaar is. Bekijk en kopieer de gedecodeerde waarde voordat u beslist of een URL veilig is.",
      terms: [
        "QR code scannen",
        "QR uit afbeelding lezen",
        "QR camera scanner",
        "QR decoderen",
      ],
    },
    "csv-to-markdown": {
      title: "CSV-naar-Markdown-converter",
      description:
        "Zet CSV-rijen om in een overzichtelijke Markdown-tabel met detectie van het scheidingsteken en veilige cellen.",
      guide:
        "Controleer het scheidingsteken en of de eerste rij een koptekst is. Meerregelige cellen worden tabelveilige regeleinden en sluistekens worden voorafgegaan door een escape.",
      inputLabel: "CSV-invoer",
      outputLabel: "Markdown-tabel",
      inputPlaceholder: "naam,score\nAnna,92",
      terms: ["CSV naar Markdown", "Markdown tabel", "CSV converter"],
    },
    "markdown-to-csv": {
      title: "Markdown-naar-CSV-converter",
      description:
        "Zet een Markdown-tabel om in standaardvriendelijke CSV voor spreadsheets en gegevenshulpmiddelen.",
      guide:
        "Neem een kop- en scheidingsrij op in de Markdown-tabel en kies het scheidingsteken dat de doeltoepassing vereist.",
      inputLabel: "Markdown-tabel",
      outputLabel: "CSV-uitvoer",
      inputPlaceholder: "| naam | score |\n| --- | --- |\n| Anna | 92 |",
      terms: ["Markdown naar CSV", "tabel naar CSV", "Markdown converter"],
    },
    "json-to-csv": {
      title: "JSON-naar-CSV-converter",
      description:
        "Zet een array van JSON-objecten om in CSV met een stabiele samenvoeging van de objectsleutels.",
      guide:
        "Gebruik op het hoogste niveau een array van objecten. Geneste waarden blijven behouden als compacte JSON-tekenreeksen; controleer hoe de doelspreadsheet deze moet verwerken.",
      inputLabel: "JSON-array",
      outputLabel: "CSV-uitvoer",
      inputPlaceholder: '[{"naam":"Anna","score":92}]',
      terms: ["JSON naar CSV", "JSON array naar CSV", "gegevensconverter"],
    },
    "csv-to-json": {
      title: "CSV-naar-JSON-converter",
      description:
        "Zet CSV om in een array van JSON-objecten met de eerste rij als veldnamen.",
      guide:
        "Zorg dat elke koptekst is ingevuld en uniek is. Controleer de detectie van het scheidingsteken voordat u gegevens met komma’s, aanhalingstekens of meerregelige cellen omzet.",
      inputLabel: "CSV-invoer",
      outputLabel: "JSON-array",
      inputPlaceholder: "naam,score\nAnna,92",
      terms: ["CSV naar JSON", "CSV parser", "JSON array"],
    },
    "html-to-markdown": {
      title: "HTML-naar-Markdown-converter",
      description:
        "Zet HTML-structuur om in leesbare Markdown, waaronder koppen, koppelingen, lijsten, code en tabellen.",
      guide:
        "Plak het HTML-fragment dat u wilt omzetten. Controleer complexe indelingen en ingesloten inhoud, want Markdown kan niet elk HTML-gedrag weergeven.",
      inputLabel: "HTML-invoer",
      outputLabel: "Markdown-uitvoer",
      inputPlaceholder: "<h1>Titel</h1><p>Hallo <strong>wereld</strong>.</p>",
      terms: [
        "HTML naar Markdown",
        "HTML omzetten naar Markdown",
        "HTML-naar-Markdown-converter",
      ],
    },
    "markdown-to-html": {
      title: "Markdown-naar-HTML-converter",
      description:
        "Rendert Markdown als HTML met gangbare GFM-tabellen, lijsten, koppelingen en omheinde codeblokken.",
      guide:
        "Converteer alleen de Markdown die u wilt gebruiken en ontsmet de HTML opnieuw voordat u niet-vertrouwde uitvoer in een webpagina invoegt.",
      inputLabel: "Markdown-invoer",
      outputLabel: "HTML-uitvoer",
      inputPlaceholder: "# Titel\n\nHallo **wereld**.",
      terms: ["Markdown naar HTML", "Markdown renderer", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
