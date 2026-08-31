import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";

const backgroundRemover = backgroundRemoverFor("sv");

const seed = {
  formatterSubnet: formatterSubnetFor("sv"),
  background: backgroundRemover.copy,
  dateCalculator: dateCalculatorFor("sv"),
  ui: {
    clear: "Rensa",
    copy: "Kopiera",
    download: "Ladda ner",
    openFile: "Öppna fil",
    chooseImage: "Välj bild",
    dropFile: "Släpp en bild här.",
    ready: "Klar",
    working: "Arbetar…",
    complete: "Klart",
    unchanged: "Ingen ändring behövs",
    outdated: "Resultatet är inaktuellt",
    copied: "Kopierat",
    copyFailed: "Det gick inte att kopiera",
    tooLarge: "Indata är för stor för att behandlas säkert.",
    failed: "Bearbetningen misslyckades. Kontrollera indata och försök igen.",
    resultHere: "Resultatet visas här.",
    localTitle: "Behandlas endast i den här webbläsaren",
    localBody:
      "Dina indata och resultat laddas inte upp eller sparas. De stannar på den här webbläsarfliken.",
    guideTitle: "Så använder du {name}",
    safetyTitle: "Privat, lokal behandling",
    faqWhat: "Vad gör {name}?",
    faqPrivacy: "Laddas mina data upp?",
    faqCheck: "Vad bör jag kontrollera när jag använder {name}?",
  },
  ai: {
    input: "Originaltext",
    output: "Rensad text",
    placeholder: "Klistra in text som kan innehålla dolda Unicode-tecken.",
    run: "Rensa dolda tecken",
    report: "Borttagningsrapport",
    removed: "Borttagna tecken",
    normalized: "Normaliserade blanksteg",
    noChanges: "Inga dolda tecken av de angivna typerna hittades.",
    count: "{count} borttagna",
    advanced: "Avancerade Unicode-alternativ",
    advancedWarning:
      "Dessa alternativ kan ändra stavning, emojier eller skriftens formning. Aktivera dem endast om du förstår källtextens uppbyggnad.",
    joinControls: "Ta bort ZWJ och ZWNJ",
    joinWarning:
      "Kan förstöra emojisekvenser och formning av arabisk, persisk eller indisk skrift.",
    variationSelectors: "Ta bort variantväljare",
    variationWarning: "Kan ändra utseendet på emojier eller CJK-tecken.",
    combiningMarks: "Ta bort kombinerande tecken",
    combiningWarning:
      "Kan ta bort accenter, vokaltecken och andra betydelsebärande markeringar.",
    noBreakSpaces: "Normalisera fasta blanksteg",
    noBreakNote: "Omvandlar NBSP-liknande blanktecken till vanliga blanksteg.",
    kinds: [
      "Blanksteg med nollbredd",
      "Ordskarv",
      "Byteordningsmärke",
      "Mjukt bindestreck",
      "Dubbelriktat styrtecken",
      "Osynlig avgränsare",
      "Skarvstyrtecken",
      "Variantväljare",
      "Kombinerande tecken",
      "Fast eller sifferbrett blanksteg",
      "Smalt fast blanksteg",
    ],
  },
  url: {
    mode: "URL-konverteringsläge",
    encode: "Koda",
    decode: "Avkoda",
    encodeInput: "Text eller URL att koda",
    decodeInput: "Kodat URL-värde",
    encodeOutput: "Kodat resultat",
    decodeOutput: "Avkodat resultat",
    encodePlaceholder: "Exempel: https://example.com/search?q=hello world",
    decodePlaceholder: "Exempel: hello%20world%3Fpage%3D1",
    scope: "Kodningens omfattning",
    component: "URL-komponent",
    uri: "Fullständig URI",
    formSpace: "Använd + för blanksteg i formulärdata",
    recursive: "Avkoda upprepade gånger",
    passLimit: "Högsta antal omgångar",
    encoded: "URL-kodningen är klar",
    decoded: "URL-avkodningen är klar",
    passCount: "Avkodades på {count} omgång(ar)",
    limitReached: "Det finns fler kodade lager kvar efter gränsen.",
    errors: [
      "Ange ett värde först.",
      "En procentkod är ofullständig eller ogiltig.",
      "De avkodade bytevärdena är inte giltig UTF-8.",
      "Välj en gräns mellan 1 och 10.",
    ],
  },
  hash: {
    input: "Text eller fil",
    placeholder:
      "Ange text för att beräkna SHA-256-, SHA-512-, SHA-1- och MD5-hashar.",
    results: "Hashvärden",
    resultLabel: "Hashvärde för {algorithm}",
    copyLabel: "Kopiera {algorithm}-hash",
    fileSelected: "Vald: {name} ({size})",
    drop: "Släpp en fil här för att beräkna dess hash lokalt.",
    textTooLarge: "Texten är för stor för den här webbläsarsessionen.",
    fileTooLarge: "Filen överskrider säkerhetsgränsen för lokal behandling.",
    legacyWarning:
      "MD5 och SHA-1 finns med för kompatibilitetskontroller, inte för lösenordslagring eller nya säkerhetslösningar.",
    expectedChecksum: "Förväntad kontrollsumma",
    checksumMatch: "Matchar",
    checksumMismatch: "Matchar inte",
    checksumInvalid: "Ange en hexadecimal kontrollsumma som stöds.",
    empty: "Ange text eller välj en fil först.",
    unavailable:
      "Den här webbläsaren kan inte beräkna någon av de begärda hasharna.",
  },
  jwt: {
    input: "JWT-token",
    placeholder: "Klistra in en JWT med tre delar: header.payload.signature",
    header: "Huvud",
    payload: "Nyttolast",
    signature: "Signatur",
    copyHeader: "Kopiera avkodat JWT-huvud",
    copyPayload: "Kopiera avkodad JWT-nyttolast",
    copySignature: "Kopiera JWT-signaturens bytevärden",
    signatureBytes: "{count} byte",
    timestamps: "Tidsstämpelanspråk",
    expires: "Upphör (exp)",
    notBefore: "Gäller tidigast (nbf)",
    issuedAt: "Utfärdad (iat)",
    invalidTimestamp:
      "Det här anspråket är inte en giltig numerisk tidsstämpel.",
    noTimestamps: "Inga exp-, nbf- eller iat-anspråk hittades.",
    noVerifyTitle: "Signaturen har inte verifierats",
    noVerifyBody:
      "Avkodning visar endast tokeninnehållet. Den bevisar inte vem som utfärdade token eller att signaturen är giltig.",
    errors: [
      "Klistra in en JWT först.",
      "En JWT måste innehålla exakt tre punktavgränsade delar.",
      "JWT-huvudet är tomt.",
      "JWT-nyttolasten är tom.",
      "Ett segment är inte giltig Base64URL.",
      "Ett segment är inte giltig UTF-8.",
      "Huvudet är inte giltig JSON.",
      "Nyttolasten är inte giltig JSON.",
      "Huvudet måste vara ett JSON-objekt.",
      "Nyttolasten måste vara ett JSON-objekt.",
    ],
  },
  qr: {
    input: "Text eller URL",
    placeholder: "Ange texten eller URL:en som ska placeras i QR-koden.",
    preview: "Förhandsvisning av QR-kod",
    previewEmpty: "Ange innehåll för att skapa en QR-kod.",
    options: "QR-kodsalternativ",
    correction: "Felkorrigering",
    correctionLevels: ["Låg (L)", "Medel (M)", "Kvartil (Q)", "Hög (H)"],
    quietZone: "Friyta",
    quietZones: [
      "Ingen",
      "2 moduler",
      "4 moduler (rekommenderas)",
      "8 moduler",
    ],
    generate: "Skapa QR-kod",
    png: "Ladda ner PNG",
    svg: "Ladda ner SVG",
    empty: "Ange text eller en URL först.",
    tooLong: "Innehållet är för långt för den här felkorrigeringsnivån.",
    generationFailed: "Det gick inte att skapa QR-koden.",
    downloadFailed: "Det gick inte att förbereda bilden för nedladdning.",
    upload: "QR-kodsbild",
    formats: "PNG, JPEG, WebP, GIF eller BMP upp till 10 MB",
    camera: "Kameraskanner",
    cameraHint:
      "Tillåt kameraåtkomst för kontinuerlig skanning. Avkodade URL:er öppnas aldrig automatiskt.",
    startCamera: "Starta kamera",
    stopCamera: "Stoppa kamera",
    scanResult: "Avkodat innehåll",
    scanPlaceholder: "Den skannade texten visas här.",
    urlDetected: "URL hittad",
    openUrl: "Öppna URL",
    urlDialogTitle: "Öppna den här webbadressen?",
    urlDialogBody:
      "Webbadressen hittades i QR-koden. Kontrollera att den är säker och tillhör webbplatsen du förväntar dig.",
    urlDialogDestination: "Måladress",
    cancel: "Avbryt",
    reading: "Läser bild…",
    starting: "Startar kamera…",
    scanning: "Söker efter en QR-kod…",
    invalidImage: "Välj en giltig bild i ett format som stöds.",
    noCode: "Ingen läsbar QR-kod hittades i bilden.",
    unsupported: "Kameraskanning stöds inte i den här webbläsaren.",
    denied: "Kamerabehörighet nekades.",
    unavailable: "Ingen lämplig kamera är tillgänglig.",
    scanFailed: "Det gick inte att skanna QR-koden.",
  },
  data: {
    convert: "Konvertera",
    inputPlaceholder: "Klistra in källdata här.",
    outputPlaceholder: "Det konverterade resultatet visas här.",
    drop: "Släpp en textfil i ett format som stöds här.",
    readFailed: "Det gick inte att läsa filen.",
    errorAt: "{message} Rad {line}, kolumn {column}.",
    delimiter: "CSV-avgränsare",
    auto: "Identifiera automatiskt",
    comma: "Komma (,)",
    semicolon: "Semikolon (;)",
    tab: "Tabb",
    pipe: "Lodstreck (|)",
    firstHeader: "Använd första raden som rubrik",
    pretty: "Formatera JSON med indrag",
    errors: [
      "CSV-filen innehåller ett oavslutat citattecken eller ett felaktigt fält.",
      "Ingen Markdown-tabell med avgränsningsrad hittades.",
      "Markdown-tabellen är felaktig.",
      "Indata är inte giltig JSON.",
      "JSON måste vara en array med objekt.",
      "En CSV-rubrik är tom.",
      "CSV-rubriker måste vara unika.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Borttagare för AI-vattenstämplar och dolda tecken",
      description:
        "Hittar och tar bort faktiska dolda Unicode-rester som kan följa med från GPT, Claude, PDF-filer eller webbsidor. Verktyget avgör inte om en AI har skrivit texten.",
      guide:
        "Klistra in texten och granska först det rensade resultatet. Kontrollera sedan exakta teckennamn, antal och U+-kodpunkter. Riskfyllda alternativ som kan påverka skriftens formning är avstängda som standard.",
      terms: [
        "ta bort AI-vattenstämpel",
        "dolda GPT-tecken",
        "dolda Claude-tecken",
        "blanksteg med nollbredd",
        "Unicode-rensare",
      ],
    },
    "url-encode": {
      title: "URL-kodare",
      description:
        "Procentkodar text, frågevärden eller fullständiga URI:er enligt webbens standardregler.",
      guide:
        "Välj URL-komponent för ett enskilt frågevärde eller fullständig URI för att bevara URL-avgränsare. Aktivera plustecken endast för data i formulärformat.",
      terms: [
        "URL-kodning",
        "procentkodning",
        "encodeURIComponent",
        "frågesträng",
      ],
    },
    "url-decode": {
      title: "URL-avkodare",
      description:
        "Avkodar procentkodade URL:er och frågevärden, med ett valfritt begränsat flergångsläge.",
      guide:
        "Klistra in det kodade värdet och välj omfattning. Använd upprepad avkodning endast när du vet att källan innehåller nästlad kodning.",
      terms: [
        "URL-avkodning",
        "procentavkodning",
        "decodeURIComponent",
        "frågesträng",
      ],
    },
    "hash-generator": {
      title: "Hashgenerator",
      description:
        "Beräknar kontrollsummor med SHA-256, SHA-512, SHA-1 och MD5 för text eller filer lokalt.",
      guide:
        "Ange text eller välj en fil och jämför sedan exakt med rätt algoritm. Hashar kontrollerar om data är lika; de krypterar inte data och lagrar inte lösenord säkert på egen hand.",
      terms: ["SHA-256", "SHA-512", "MD5", "kontrollsumma", "filhash"],
    },
    "jwt-decoder": {
      title: "JWT-avkodare",
      description:
        "Avkodar JWT-huvud, nyttolast, signaturens byte och tidsstämpelanspråk utan att ladda upp token.",
      guide:
        "Granska avkodad JSON och tidsstämplar, men verifiera signaturer och anspråk i systemet som äger signeringsnyckeln. Avkodning i sig skapar inget förtroende.",
      terms: ["JWT-avkodare", "JSON Web Token", "JWT-nyttolast", "JWT-huvud"],
    },
    "qr-code-generator": {
      title: "QR-kodsgenerator",
      description:
        "Skapar en standardkompatibel statisk QR-kod för text eller en URL som kan laddas ner som PNG eller SVG.",
      guide:
        "Ange exakt innehåll, behåll en friyta på fyra moduler för tillförlitlig skanning och höj felkorrigeringen om koden kan bli delvis skymd.",
      terms: ["QR-kodsgenerator", "QR PNG", "QR SVG", "statisk QR"],
    },
    "qr-code-scanner": {
      title: "QR-kodsskanner",
      description:
        "Läser en QR-kod lokalt från en bild eller kamera utan att automatiskt öppna avkodade länkar.",
      guide:
        "Använd en skarp, välbelyst bild där hela friytan syns. Granska och kopiera det avkodade värdet innan du avgör om en URL är säker.",
      terms: [
        "QR-kodsskanner",
        "skanna QR-bild",
        "QR-läsare med kamera",
        "avkoda QR",
      ],
    },
    "csv-to-markdown": {
      title: "CSV till Markdown",
      description:
        "Omvandlar CSV-rader till en ren Markdown-tabell med avgränsaridentifiering och säkrade celler.",
      guide:
        "Kontrollera avgränsaren och om första raden är en rubrik. Flerradiga celler blir tabellsäkra radbrytningar och lodstreck skyddas.",
      inputLabel: "CSV-indata",
      outputLabel: "Markdown-tabell",
      inputPlaceholder: "namn,poäng\nAri,92",
      terms: ["CSV till Markdown", "Markdown-tabell", "CSV-konverterare"],
    },
    "markdown-to-csv": {
      title: "Markdown till CSV",
      description:
        "Omvandlar en Markdown-tabell till standardanpassad CSV för kalkylblad och dataverktyg.",
      guide:
        "Ta med en rubrik- och avgränsningsrad i Markdown-tabellen och välj sedan den avgränsare som målprogrammet kräver.",
      inputLabel: "Markdown-tabell",
      outputLabel: "CSV-resultat",
      inputPlaceholder: "| namn | poäng |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown till CSV", "tabell till CSV", "Markdown-konverterare"],
    },
    "json-to-csv": {
      title: "JSON till CSV",
      description:
        "Omvandlar en array med JSON-objekt till CSV med en stabil förening av objektens nycklar.",
      guide:
        "Använd en array med objekt på högsta nivån. Nästlade värden bevaras som kompakta JSON-strängar, så kontrollera hur målkalkylbladet hanterar dem.",
      inputLabel: "JSON-array",
      outputLabel: "CSV-resultat",
      inputPlaceholder: '[{"namn":"Ari","poäng":92}]',
      terms: ["JSON till CSV", "JSON-array till CSV", "datakonverterare"],
    },
    "csv-to-json": {
      title: "CSV till JSON",
      description:
        "Omvandlar CSV till en array med JSON-objekt och använder den första raden som fältnamn.",
      guide:
        "Se till att varje rubrik är ifylld och unik. Granska avgränsaridentifieringen innan du konverterar data med kommatecken, citattecken eller flerradiga celler.",
      inputLabel: "CSV-indata",
      outputLabel: "JSON-array",
      inputPlaceholder: "namn,poäng\nAri,92",
      terms: ["CSV till JSON", "CSV-tolk", "JSON-array"],
    },
    "html-to-markdown": {
      title: "HTML till Markdown",
      description:
        "Omvandlar HTML-struktur till läsbar Markdown, inklusive rubriker, länkar, listor, kod och tabeller.",
      guide:
        "Klistra in det HTML-fragment du vill konvertera. Granska komplexa layouter och inbäddat innehåll eftersom Markdown inte kan återge allt HTML-beteende.",
      inputLabel: "HTML-indata",
      outputLabel: "Markdown-resultat",
      inputPlaceholder: "<h1>Rubrik</h1><p>Hej <strong>världen</strong>.</p>",
      terms: ["HTML till Markdown", "HTML-konverterare", "Turndown"],
    },
    "markdown-to-html": {
      title: "Markdown till HTML",
      description:
        "Renderar Markdown som HTML med vanliga GFM-tabeller, listor, länkar och inhägnade kodblock.",
      guide:
        "Konvertera endast den Markdown du tänker använda och sanera HTML-koden igen innan du infogar obetrott resultat på en webbsida.",
      inputLabel: "Markdown-indata",
      outputLabel: "HTML-resultat",
      inputPlaceholder: "# Rubrik\n\nHej **världen**.",
      terms: ["Markdown till HTML", "Markdown-renderare", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
