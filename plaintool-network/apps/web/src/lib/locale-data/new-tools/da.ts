import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";

const seed = {
  formatterSubnet: formatterSubnetFor("da"),
  ui: {
    clear: "Ryd",
    copy: "Kopiér",
    download: "Download",
    openFile: "Åbn fil",
    chooseImage: "Vælg billede",
    dropFile: "Slip et billede her.",
    ready: "Klar",
    working: "Arbejder…",
    complete: "Færdig",
    unchanged: "Ingen ændring nødvendig",
    outdated: "Resultatet er forældet",
    copied: "Kopieret",
    copyFailed: "Kunne ikke kopiere",
    tooLarge: "Inputtet er for stort til at blive behandlet sikkert.",
    failed: "Behandlingen mislykkedes. Kontrollér inputtet, og prøv igen.",
    resultHere: "Resultatet vises her.",
    localTitle: "Behandles kun i denne browser",
    localBody:
      "Dit input og dine resultater bliver hverken uploadet eller gemt. De forbliver i denne browserfane.",
    guideTitle: "Sådan bruger du {name}",
    safetyTitle: "Privat, lokal behandling",
    faqWhat: "Hvad gør {name}?",
    faqPrivacy: "Bliver mine data uploadet?",
    faqCheck: "Hvad skal jeg kontrollere, når jeg bruger {name}?",
  },
  ai: {
    input: "Oprindelig tekst",
    output: "Renset tekst",
    placeholder: "Indsæt tekst, der kan indeholde skjulte Unicode-tegn.",
    run: "Rens skjulte tegn",
    report: "Rapport over fjernelse",
    removed: "Fjernede tegn",
    normalized: "Normaliserede mellemrum",
    noChanges: "Ingen af de valgte skjulte tegn blev fundet.",
    count: "{count} fjernet",
    advanced: "Avancerede Unicode-indstillinger",
    advancedWarning:
      "Disse indstillinger kan ændre stavning, emoji eller skriftens formning. Aktivér dem kun, hvis du forstår kildetekstens opbygning.",
    joinControls: "Fjern ZWJ og ZWNJ",
    joinWarning:
      "Kan ødelægge emoji-sekvenser og formning af arabisk, persisk eller indisk skrift.",
    variationSelectors: "Fjern variationsvælgere",
    variationWarning: "Kan ændre udseendet på emoji eller CJK-tegn.",
    combiningMarks: "Fjern kombinerende tegn",
    combiningWarning:
      "Kan fjerne accenter, vokaltegn og andre betydningsbærende mærker.",
    noBreakSpaces: "Normalisér faste mellemrum",
    noBreakNote:
      "Konverterer NBSP-lignende blanktegn til almindelige mellemrum.",
    kinds: [
      "Mellemrum uden bredde",
      "Ordsamler",
      "Byteordensmærke",
      "Blød bindestreg",
      "Tovejs-kontroltegn",
      "Usynlig separator",
      "Samlingskontrol",
      "Variationsvælger",
      "Kombinerende tegn",
      "Fast mellemrum eller ciffermellemrum",
      "Smalt fast mellemrum",
    ],
  },
  url: {
    mode: "URL-konverteringstilstand",
    encode: "Kod",
    decode: "Afkod",
    encodeInput: "Tekst eller URL, der skal kodes",
    decodeInput: "Kodet URL-værdi",
    encodeOutput: "Kodet resultat",
    decodeOutput: "Afkodet resultat",
    encodePlaceholder: "Eksempel: https://example.com/search?q=hello world",
    decodePlaceholder: "Eksempel: hello%20world%3Fpage%3D1",
    scope: "Kodningsomfang",
    component: "URL-komponent",
    uri: "Komplet URI",
    formSpace: "Brug + til mellemrum i formulardata",
    recursive: "Afkod gentagne gange",
    passLimit: "Maksimalt antal gennemløb",
    encoded: "URL-kodning fuldført",
    decoded: "URL-afkodning fuldført",
    passCount: "Afkodet på {count} gennemløb",
    limitReached: "Der er flere kodede lag tilbage efter grænsen.",
    errors: [
      "Indtast først en værdi.",
      "En procentkode er ufuldstændig eller ugyldig.",
      "De afkodede bytes er ikke gyldig UTF-8.",
      "Vælg en grænse fra 1 til 10.",
    ],
  },
  hash: {
    input: "Tekst eller fil",
    placeholder:
      "Indtast tekst for at beregne SHA-256-, SHA-512-, SHA-1- og MD5-hashværdier.",
    results: "Hashværdier",
    resultLabel: "{algorithm}-hashværdi",
    copyLabel: "Kopiér {algorithm}-hash",
    fileSelected: "Valgt: {name} ({size})",
    drop: "Slip en fil her for at beregne dens hash lokalt.",
    textTooLarge: "Teksten er for stor til denne browsersession.",
    fileTooLarge: "Filen overskrider sikkerhedsgrænsen for lokal behandling.",
    legacyWarning:
      "MD5 og SHA-1 er medtaget til kompatibilitetskontrol, ikke til opbevaring af adgangskoder eller nye sikkerhedsdesign.",
    expectedChecksum: "Forventet kontrolsum",
    checksumMatch: "Matcher",
    checksumMismatch: "Matcher ikke",
    checksumInvalid: "Indtast en understøttet hexadecimal kontrolsum.",
    empty: "Indtast tekst, eller vælg først en fil.",
    unavailable: "Denne browser kan ikke beregne en af de ønskede hashværdier.",
  },
  jwt: {
    input: "JWT-token",
    placeholder: "Indsæt en JWT med tre dele: header.payload.signature",
    header: "Header",
    payload: "Nyttelast",
    signature: "Signatur",
    copyHeader: "Kopiér afkodet JWT-header",
    copyPayload: "Kopiér afkodet JWT-nyttelast",
    copySignature: "Kopiér JWT-signaturens bytes",
    signatureBytes: "{count} bytes",
    timestamps: "Tidsstempel-claims",
    expires: "Udløber (exp)",
    notBefore: "Gyldig fra (nbf)",
    issuedAt: "Udstedt (iat)",
    invalidTimestamp: "Dette claim er ikke et gyldigt numerisk tidsstempel.",
    noTimestamps: "Ingen exp-, nbf- eller iat-claims blev fundet.",
    noVerifyTitle: "Signaturen er ikke verificeret",
    noVerifyBody:
      "Afkodning viser kun tokenets indhold. Den beviser ikke, hvem der udstedte tokenet, eller om signaturen er gyldig.",
    errors: [
      "Indsæt først en JWT.",
      "En JWT skal indeholde præcis tre punktumadskilte dele.",
      "JWT-headeren er tom.",
      "JWT-nyttelasten er tom.",
      "Et segment er ikke gyldig Base64URL.",
      "Et segment er ikke gyldig UTF-8.",
      "Headeren er ikke gyldig JSON.",
      "Nyttelasten er ikke gyldig JSON.",
      "Headeren skal være et JSON-objekt.",
      "Nyttelasten skal være et JSON-objekt.",
    ],
  },
  qr: {
    input: "Tekst eller URL",
    placeholder: "Indtast teksten eller URL'en, der skal placeres i QR-koden.",
    preview: "Forhåndsvisning af QR-kode",
    previewEmpty: "Indtast indhold for at oprette en QR-kode.",
    options: "Indstillinger for QR-kode",
    correction: "Fejlkorrektion",
    correctionLevels: ["Lav (L)", "Mellem (M)", "Kvartil (Q)", "Høj (H)"],
    quietZone: "Frizone",
    quietZones: ["Ingen", "2 moduler", "4 moduler (anbefalet)", "8 moduler"],
    generate: "Opret QR-kode",
    png: "Download PNG",
    svg: "Download SVG",
    empty: "Indtast først tekst eller en URL.",
    tooLong: "Indholdet er for langt til dette fejlkorrektionsniveau.",
    generationFailed: "QR-koden kunne ikke oprettes.",
    downloadFailed: "Billedet kunne ikke klargøres til download.",
    upload: "QR-kodebillede",
    formats: "PNG, JPEG, WebP, GIF eller BMP op til 10 MB",
    camera: "Kamerascanner",
    cameraHint:
      "Tillad kameraadgang for at scanne løbende. Afkodede URL'er åbnes aldrig automatisk.",
    startCamera: "Start kamera",
    stopCamera: "Stop kamera",
    scanResult: "Afkodet indhold",
    scanPlaceholder: "Den scannede tekst vises her.",
    urlDetected: "URL fundet",
    openUrl: "Åbn URL",
    urlDialogTitle: "Vil du åbne denne URL?",
    urlDialogBody:
      "Denne URL blev fundet i QR-koden. Kontrollér, at den er sikker og tilhører det websted, du forventer.",
    urlDialogDestination: "Destination",
    cancel: "Annuller",
    reading: "Læser billede…",
    starting: "Starter kamera…",
    scanning: "Leder efter en QR-kode…",
    invalidImage: "Vælg et gyldigt billede i et understøttet format.",
    noCode: "Der blev ikke fundet en læsbar QR-kode i billedet.",
    unsupported: "Kamerascanning understøttes ikke i denne browser.",
    denied: "Kameratilladelse blev afvist.",
    unavailable: "Der er ikke noget egnet kamera tilgængeligt.",
    scanFailed: "QR-koden kunne ikke scannes.",
  },
  data: {
    convert: "Konvertér",
    inputPlaceholder: "Indsæt kildedata her.",
    outputPlaceholder: "Det konverterede output vises her.",
    drop: "Slip en understøttet tekstfil her.",
    readFailed: "Filen kunne ikke læses.",
    errorAt: "{message} Linje {line}, kolonne {column}.",
    delimiter: "CSV-separator",
    auto: "Registrér automatisk",
    comma: "Komma (,)",
    semicolon: "Semikolon (;)",
    tab: "Tabulator",
    pipe: "Lodret streg (|)",
    firstHeader: "Brug første række som header",
    pretty: "Formatér JSON med indrykning",
    errors: [
      "CSV-filen indeholder et uafsluttet anførselstegn eller et ugyldigt felt.",
      "Der blev ikke fundet en Markdown-tabel med en separatorrække.",
      "Markdown-tabellen er ugyldig.",
      "Inputtet er ikke gyldig JSON.",
      "JSON skal være et array af objekter.",
      "En CSV-header er tom.",
      "CSV-headere skal være entydige.",
    ],
  },
  pages: {
    "ai-watermark-remover": {
      title: "Fjerner til AI-vandmærker og skjulte tegn",
      description:
        "Finder og fjerner faktiske skjulte Unicode-rester, som kan følge med fra GPT, Claude, PDF-filer eller websider. Værktøjet afgør ikke, om en AI har skrevet teksten.",
      guide:
        "Indsæt teksten, og gennemgå først det rensede resultat. Kontrollér derefter de nøjagtige tegnnavne, antal og U+-kodepunkter. Risikable indstillinger, der kan påvirke skriftens formning, er slået fra som standard.",
      terms: [
        "fjern AI-vandmærke",
        "skjulte GPT-tegn",
        "skjulte Claude-tegn",
        "mellemrum uden bredde",
        "Unicode-renser",
      ],
    },
    "url-encode": {
      title: "URL-koder",
      description:
        "Procentkoder tekst, forespørgselsværdier eller komplette URI'er efter webstandardens regler.",
      guide:
        "Vælg URL-komponent til en enkelt forespørgselsværdi eller komplet URI for at bevare URL-separatorer. Aktivér kun plustegn til mellemrum i formulardata.",
      terms: [
        "URL-kodning",
        "procentkodning",
        "encodeURIComponent",
        "forespørgselsstreng",
      ],
    },
    "url-decode": {
      title: "URL-afkoder",
      description:
        "Afkoder procentkodede URL'er og forespørgselsværdier med en valgfri begrænset flergangstilstand.",
      guide:
        "Indsæt den kodede værdi, og vælg omfanget. Brug kun gentagen afkodning, når du ved, at kilden indeholder indlejret kodning.",
      terms: [
        "URL-afkodning",
        "procentafkodning",
        "decodeURIComponent",
        "forespørgselsstreng",
      ],
    },
    "hash-generator": {
      title: "Hashgenerator",
      description:
        "Beregner SHA-256-, SHA-512-, SHA-1- og MD5-kontrolsummer for tekst eller filer lokalt.",
      guide:
        "Indtast tekst, eller vælg en fil, og sammenlign derefter den ønskede algoritme nøjagtigt. Hashværdier kontrollerer lighed; de krypterer ikke data og opbevarer ikke adgangskoder sikkert alene.",
      terms: ["SHA-256", "SHA-512", "MD5", "kontrolsum", "filhash"],
    },
    "jwt-decoder": {
      title: "JWT-afkoder",
      description:
        "Afkoder JWT-header, nyttelast, signaturbytes og tidsstempel-claims uden at uploade tokenet.",
      guide:
        "Gennemgå den afkodede JSON og tidsstemplerne, men verificér signaturer og claims i det system, der ejer signeringsnøglen. Afkodning alene skaber ikke tillid.",
      terms: ["JWT-afkoder", "JSON Web Token", "JWT-nyttelast", "JWT-header"],
    },
    "qr-code-generator": {
      title: "QR-kodegenerator",
      description:
        "Opretter en standardkompatibel statisk QR-kode til tekst eller en URL, som kan downloades som PNG eller SVG.",
      guide:
        "Indtast det præcise indhold, bevar en frizone på fire moduler for pålidelig scanning, og øg fejlkorrektionen, hvis koden kan blive delvist dækket.",
      terms: ["QR-kodegenerator", "QR PNG", "QR SVG", "statisk QR"],
    },
    "qr-code-scanner": {
      title: "QR-kodescanner",
      description:
        "Læser en QR-kode lokalt fra et billede eller kamera uden automatisk at åbne afkodede links.",
      guide:
        "Brug et skarpt og velbelyst billede, hvor hele frizonen er synlig. Gennemgå og kopiér den afkodede værdi, før du beslutter, om en URL er sikker.",
      terms: [
        "QR-kodescanner",
        "scan QR-billede",
        "QR-læser med kamera",
        "afkod QR",
      ],
    },
    "csv-to-markdown": {
      title: "CSV til Markdown",
      description:
        "Omdanner CSV-rækker til en ren Markdown-tabel med registrering af separator og sikrede celler.",
      guide:
        "Kontrollér separatoren, og om første række er en header. Celler med flere linjer bliver til tabelsikre linjeskift, og lodrette streger beskyttes.",
      inputLabel: "CSV-input",
      outputLabel: "Markdown-tabel",
      inputPlaceholder: "navn,point\nAri,92",
      terms: ["CSV til Markdown", "Markdown-tabel", "CSV-konverter"],
    },
    "markdown-to-csv": {
      title: "Markdown til CSV",
      description:
        "Omdanner en Markdown-tabel til standardvenlig CSV til regneark og dataværktøjer.",
      guide:
        "Medtag en header- og separatorrække i Markdown-tabellen, og vælg derefter den separator, som målprogrammet kræver.",
      inputLabel: "Markdown-tabel",
      outputLabel: "CSV-output",
      inputPlaceholder: "| navn | point |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown til CSV", "tabel til CSV", "Markdown-konverter"],
    },
    "json-to-csv": {
      title: "JSON til CSV",
      description:
        "Omdanner et array af JSON-objekter til CSV med en stabil samling af objektnøgler.",
      guide:
        "Brug et array af objekter på øverste niveau. Indlejrede værdier bevares som kompakte JSON-strenge, så kontrollér, hvordan målregnearket håndterer dem.",
      inputLabel: "JSON-array",
      outputLabel: "CSV-output",
      inputPlaceholder: '[{"navn":"Ari","point":92}]',
      terms: ["JSON til CSV", "JSON-array til CSV", "datakonverter"],
    },
    "csv-to-json": {
      title: "CSV til JSON",
      description:
        "Omdanner CSV til et array af JSON-objekter og bruger den første række som feltnavne.",
      guide:
        "Sørg for, at hver header er udfyldt og entydig. Gennemgå registreringen af separatoren, før du konverterer data med kommaer, anførselstegn eller celler med flere linjer.",
      inputLabel: "CSV-input",
      outputLabel: "JSON-array",
      inputPlaceholder: "navn,point\nAri,92",
      terms: ["CSV til JSON", "CSV-parser", "JSON-array"],
    },
    "html-to-markdown": {
      title: "HTML til Markdown",
      description:
        "Omdanner HTML-struktur til læsbar Markdown, herunder overskrifter, links, lister, kode og tabeller.",
      guide:
        "Indsæt det HTML-fragment, du vil konvertere. Gennemgå komplekse layout og indlejret indhold, da Markdown ikke kan gengive al HTML-adfærd.",
      inputLabel: "HTML-input",
      outputLabel: "Markdown-output",
      inputPlaceholder:
        "<h1>Overskrift</h1><p>Hej <strong>verden</strong>.</p>",
      terms: ["HTML til Markdown", "HTML-konverter", "Turndown"],
    },
    "markdown-to-html": {
      title: "Markdown til HTML",
      description:
        "Renderer Markdown som HTML med almindelige GFM-tabeller, lister, links og indhegnede kodeblokke.",
      guide:
        "Konvertér kun den Markdown, du vil bruge, og rens HTML'en igen, før du indsætter output fra en kilde, du ikke har tillid til, på en webside.",
      inputLabel: "Markdown-input",
      outputLabel: "HTML-output",
      inputPlaceholder: "# Overskrift\n\nHej **verden**.",
      terms: ["Markdown til HTML", "Markdown-renderer", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
