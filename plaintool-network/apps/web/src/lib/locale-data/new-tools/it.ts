import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("it");

const seed = {
  locale: "it",
  formatterSubnet: formatterSubnetFor("it"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("it"),
  dateCalculator: dateCalculatorFor("it"),
  timeZoneConverter: timeZoneConverterFor("it"),
  calculatorSuite: calculatorSuiteFor("it"),
  uuidGenerator: uuidGeneratorFor("it"),
  ui: {
    clear: "Cancella",
    copy: "Copia",
    download: "Scarica",
    openFile: "Apri file",
    chooseImage: "Scegli immagine",
    dropFile: "Trascina qui un’immagine.",
    ready: "Pronto",
    working: "Elaborazione…",
    complete: "Completato",
    unchanged: "Nessuna modifica necessaria",
    outdated: "Il risultato non è aggiornato",
    copied: "Copiato",
    copyFailed: "Impossibile copiare",
    tooLarge: "L’input è troppo grande per essere elaborato in sicurezza.",
    failed: "Elaborazione non riuscita. Controlla l’input e riprova.",
    resultHere: "Il risultato apparirà qui.",
    localTitle: "Elaborazione solo in questo browser",
    localBody:
      "L’input e i risultati non vengono caricati né salvati. Rimangono in questa scheda del browser.",
    guideTitle: "Come usare {name}",
    safetyTitle: "Elaborazione privata e locale",
    faqWhat: "A cosa serve lo strumento «{name}»?",
    faqPrivacy: "I miei dati vengono caricati?",
    faqCheck: "Che cosa devo controllare quando uso lo strumento «{name}»?",
  },
  ai: {
    input: "Testo originale",
    output: "Testo ripulito",
    placeholder:
      "Incolla testo copiato che potrebbe contenere caratteri invisibili indesiderati.",
    run: "Rimuovi caratteri nascosti",
    report: "Resoconto delle rimozioni",
    removed: "Caratteri rimossi",
    normalized: "Spazi normalizzati",
    noChanges:
      "Non è stato trovato alcun carattere nascosto tra quelli selezionati.",
    count: "{count} rimossi",
    advanced: "Opzioni Unicode avanzate",
    advancedWarning:
      "Queste opzioni possono modificare ortografia, emoji o forma delle scritture. Attivale solo se conosci la struttura del testo originale.",
    joinControls: "Rimuovi ZWJ e ZWNJ",
    joinWarning:
      "Può interrompere le sequenze di emoji e la legatura dei caratteri in arabo, persiano o nelle scritture indiane.",
    variationSelectors: "Rimuovi selettori di variazione",
    variationWarning: "Può cambiare l’aspetto di emoji o glifi CJK.",
    combiningMarks: "Rimuovi segni combinanti",
    combiningWarning:
      "Può eliminare accenti, segni vocalici e altri segni significativi.",
    noBreakSpaces: "Normalizza gli spazi unificatori",
    noBreakNote: "Converte gli spazi simili a NBSP in spazi normali.",
    kinds: [
      "Spazio a larghezza zero",
      "Connettore di parole",
      "Indicatore dell’ordine dei byte",
      "Trattino facoltativo",
      "Controllo bidirezionale",
      "Separatore invisibile",
      "Controllo di giunzione",
      "Selettore di variazione",
      "Segno combinante",
      "Spazio unificatore o spazio per cifre",
      "Spazio unificatore stretto",
    ],
  },
  url: {
    mode: "Modalità di conversione URL",
    encode: "Codifica",
    decode: "Decodifica",
    encodeInput: "Testo o URL da codificare",
    decodeInput: "Valore URL codificato",
    encodeOutput: "Risultato codificato",
    decodeOutput: "Risultato decodificato",
    encodePlaceholder: "Esempio: https://example.com/search?q=ciao mondo",
    decodePlaceholder: "Esempio: ciao%20mondo%3Fpagina%3D1",
    scope: "Ambito della codifica",
    component: "Componente URL",
    uri: "URI completo",
    formSpace: "Usa + per gli spazi nei dati dei moduli",
    recursive: "Decodifica più volte",
    passLimit: "Numero massimo di passaggi",
    encoded: "Codifica URL completata",
    decoded: "Decodifica URL completata",
    passCount: "Decodificato in {count} passaggio/i",
    limitReached:
      "Dopo il limite di passaggi rimangono altri livelli codificati.",
    errors: [
      "Inserisci prima un valore.",
      "Una sequenza di escape percentuale è incompleta o non valida.",
      "I byte decodificati non sono UTF-8 valido.",
      "Scegli un limite compreso tra 1 e 10 passaggi.",
    ],
  },
  hash: {
    input: "Testo o file",
    placeholder:
      "Inserisci il testo per calcolare gli hash SHA-256, SHA-512, SHA-1 e MD5.",
    results: "Valori hash",
    resultLabel: "Valore hash {algorithm}",
    copyLabel: "Copia hash {algorithm}",
    fileSelected: "Selezionato: {name} ({size})",
    drop: "Trascina qui un file per calcolarne l’hash localmente.",
    textTooLarge: "Il testo è troppo grande per questa sessione del browser.",
    fileTooLarge:
      "Il file supera il limite di sicurezza per l’elaborazione locale.",
    legacyWarning:
      "MD5 e SHA-1 sono inclusi per i controlli di compatibilità, non per memorizzare password o progettare nuovi sistemi di sicurezza.",
    expectedChecksum: "Checksum previsto",
    checksumMatch: "Corrisponde",
    checksumMismatch: "Non corrisponde",
    checksumInvalid: "Inserisci un checksum esadecimale supportato.",
    empty: "Inserisci del testo o scegli prima un file.",
    unavailable: "Questo browser non può calcolare uno degli hash richiesti.",
  },
  jwt: {
    input: "Token JWT",
    placeholder: "Incolla un JWT in tre parti: header.payload.signature",
    header: "Header",
    payload: "Payload",
    signature: "Firma",
    copyHeader: "Copia l’header JWT decodificato",
    copyPayload: "Copia il payload JWT decodificato",
    copySignature: "Copia i byte della firma JWT",
    signatureBytes: "{count} byte",
    timestamps: "Claim temporali",
    expires: "Scadenza (exp)",
    notBefore: "Valido da (nbf)",
    issuedAt: "Emesso il (iat)",
    invalidTimestamp: "Questo claim non contiene un timestamp numerico valido.",
    noTimestamps: "Non è stato trovato alcun claim exp, nbf o iat.",
    noVerifyTitle: "Firma non verificata",
    noVerifyBody:
      "La decodifica mostra solo il contenuto del token. Non dimostra chi lo ha emesso né se la firma è valida.",
    errors: [
      "Incolla prima un JWT.",
      "Un JWT deve contenere esattamente tre parti separate da punti.",
      "L’header JWT è vuoto.",
      "Il payload JWT è vuoto.",
      "Un segmento non è un Base64URL valido.",
      "Un segmento non è un UTF-8 valido.",
      "L’header non è un JSON valido.",
      "Il payload non è un JSON valido.",
      "L’header deve essere un oggetto JSON.",
      "Il payload deve essere un oggetto JSON.",
    ],
  },
  qr: {
    input: "Testo o URL",
    placeholder: "Inserisci il testo o l’URL da includere nel codice QR.",
    preview: "Anteprima del codice QR",
    previewEmpty: "Inserisci un contenuto per generare un codice QR.",
    options: "Opzioni del codice QR",
    correction: "Correzione degli errori",
    correctionLevels: ["Bassa (L)", "Media (M)", "Quartile (Q)", "Alta (H)"],
    quietZone: "Zona libera",
    quietZones: ["Nessuna", "2 moduli", "4 moduli (consigliato)", "8 moduli"],
    generate: "Genera codice QR",
    png: "Scarica PNG",
    svg: "Scarica SVG",
    empty: "Inserisci prima un testo o un URL.",
    tooLong:
      "Il contenuto è troppo lungo per questo livello di correzione degli errori.",
    generationFailed: "Impossibile generare il codice QR.",
    downloadFailed: "Impossibile preparare l’immagine per il download.",
    upload: "Immagine del codice QR",
    formats: "PNG, JPEG, WebP, GIF o BMP fino a 10 MB",
    camera: "Scanner con fotocamera",
    cameraHint:
      "Consenti l’accesso alla fotocamera per eseguire la scansione continua. Gli URL decodificati non vengono mai aperti automaticamente.",
    startCamera: "Avvia fotocamera",
    stopCamera: "Ferma fotocamera",
    scanResult: "Contenuto decodificato",
    scanPlaceholder: "Il testo scansionato apparirà qui.",
    urlDetected: "URL rilevato",
    openUrl: "Apri URL",
    urlDialogTitle: "Aprire questo URL?",
    urlDialogBody:
      "Questo URL è stato trovato nel codice QR. Verifica che sia sicuro e appartenga al sito previsto.",
    urlDialogDestination: "Indirizzo di destinazione",
    cancel: "Annulla",
    reading: "Lettura dell’immagine…",
    starting: "Avvio della fotocamera…",
    scanning: "Ricerca di un codice QR…",
    invalidImage: "Scegli un’immagine valida in un formato supportato.",
    noCode: "In questa immagine non è stato trovato alcun codice QR leggibile.",
    unsupported: "Questo browser non supporta la scansione con fotocamera.",
    denied: "L’autorizzazione per la fotocamera è stata negata.",
    unavailable: "Non è disponibile una fotocamera adatta.",
    scanFailed: "Impossibile scansionare il codice QR.",
  },
  data: {
    convert: "Converti",
    inputPlaceholder: "Incolla qui i dati di origine.",
    outputPlaceholder: "Il risultato convertito apparirà qui.",
    drop: "Trascina qui un file di testo supportato.",
    readFailed: "Impossibile leggere il file.",
    errorAt: "{message} Riga {line}, colonna {column}.",
    delimiter: "Delimitatore CSV",
    auto: "Rileva automaticamente",
    comma: "Virgola (,)",
    semicolon: "Punto e virgola (;)",
    tab: "Tabulazione",
    pipe: "Barra verticale (|)",
    firstHeader: "Usa la prima riga come intestazione",
    pretty: "Formatta il JSON con rientri",
    errors: [
      "Il CSV contiene una virgoletta non chiusa o un campo non valido.",
      "Non è stata trovata una tabella Markdown con una riga separatrice.",
      "La tabella Markdown non è valida.",
      "L’input non è un JSON valido.",
      "Il JSON deve essere un array di oggetti.",
      "Un’intestazione CSV è vuota.",
      "Le intestazioni CSV devono essere univoche.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Pulire testo IA",
      description:
        "Pulisce i caratteri invisibili indesiderati supportati che possono comparire nel testo copiato da ChatGPT, Claude, Gemini e altre fonti. Non dimostra l’autore, non identifica testo generato dall’IA e non garantisce di aggirare i rilevatori di IA.",
      guide:
        "Incolla il testo e controlla prima il risultato ripulito, quindi verifica nomi esatti, quantità e code point U+ dei caratteri rimossi. Le opzioni che possono alterare la scrittura sono disattivate per impostazione predefinita.",
      terms: [
        "pulire testo IA",
        "pulire testo IA copiato",
        "rimuovere caratteri invisibili",
        "caratteri invisibili ChatGPT",
        "caratteri invisibili Claude",
        "caratteri invisibili Gemini",
        "rimuovere filigrana IA dal testo",
      ],
    },
    "url-encode": {
      title: "Codificatore URL",
      description:
        "Applica la codifica percentuale standard del Web a testo, valori di query o URI completi.",
      guide:
        "Scegli componente URL per un singolo valore di query oppure URI completo per conservare i separatori dell’indirizzo. Usa il segno più per gli spazi solo nei dati dei moduli.",
      terms: [
        "codificare URL",
        "codifica percentuale",
        "encodeURIComponent",
        "stringa di query",
      ],
    },
    "url-decode": {
      title: "Decodificatore URL",
      description:
        "Decodifica URL e valori di query con codifica percentuale, con una modalità multipasso limitata facoltativa.",
      guide:
        "Incolla il valore codificato, scegli il relativo ambito e usa la decodifica ripetuta solo se sai che l’origine contiene una codifica annidata.",
      terms: [
        "decodificare URL",
        "decodifica percentuale",
        "decodeURIComponent",
        "stringa di query",
      ],
    },
    "hash-generator": {
      title: "Generatore di hash",
      description:
        "Calcola localmente i checksum SHA-256, SHA-512, SHA-1 e MD5 per testi o file.",
      guide:
        "Inserisci un testo o scegli un file, quindi confronta esattamente l’algoritmo richiesto. Gli hash verificano l’uguaglianza: da soli non cifrano i dati né memorizzano le password in modo sicuro.",
      terms: [
        "generatore di hash",
        "impronta SHA-256",
        "hash file",
        "SHA-256",
        "SHA-512",
        "MD5",
        "checksum",
      ],
    },
    "jwt-decoder": {
      title: "Decodificatore JWT",
      description:
        "Decodifica header, payload, byte della firma e claim temporali di un JWT senza caricare il token.",
      guide:
        "Controlla il JSON e i timestamp decodificati, ma verifica firma e claim nel sistema che gestisce la chiave di firma. La sola decodifica non garantisce l’affidabilità.",
      terms: [
        "decodificatore JWT",
        "JSON Web Token",
        "payload JWT",
        "header JWT",
      ],
    },
    "qr-code-generator": {
      title: "Generatore di codici QR",
      description:
        "Crea un codice QR statico conforme agli standard per un testo o un URL, scaricabile in formato PNG o SVG.",
      guide:
        "Inserisci il contenuto esatto, mantieni una zona libera di quattro moduli per una lettura affidabile e aumenta la correzione degli errori se il codice potrebbe essere parzialmente coperto.",
      terms: ["generatore codice QR", "QR PNG", "QR SVG", "QR statico"],
    },
    "qr-code-scanner": {
      title: "Scanner di codici QR",
      description:
        "Legge localmente un codice QR da un’immagine o dalla fotocamera senza aprire automaticamente i link decodificati.",
      guide:
        "Usa un’immagine nitida e ben illuminata con l’intera zona libera visibile. Controlla e copia il valore decodificato prima di decidere se un URL è sicuro.",
      terms: [
        "scansionare codice QR",
        "leggere QR da immagine",
        "lettore QR fotocamera",
        "decodificare QR",
      ],
    },
    "csv-to-markdown": {
      title: "Convertitore da CSV a Markdown",
      description:
        "Trasforma le righe CSV in una tabella Markdown pulita con rilevamento del delimitatore ed escape delle celle.",
      guide:
        "Controlla il delimitatore e se la prima riga è un’intestazione. Le celle su più righe diventano interruzioni sicure per le tabelle e le barre verticali vengono precedute da escape.",
      inputLabel: "Input CSV",
      outputLabel: "Tabella Markdown",
      inputPlaceholder: "nome,punteggio\nAnna,92",
      terms: ["CSV in Markdown", "tabella Markdown", "convertitore CSV"],
    },
    "markdown-to-csv": {
      title: "Convertitore da Markdown a CSV",
      description:
        "Converte una tabella Markdown in un CSV conforme agli standard per fogli di calcolo e strumenti dati.",
      guide:
        "Includi nella tabella Markdown una riga di intestazione e una separatrice, quindi scegli il delimitatore richiesto dall’applicazione di destinazione.",
      inputLabel: "Tabella Markdown",
      outputLabel: "Output CSV",
      inputPlaceholder: "| nome | punteggio |\n| --- | --- |\n| Anna | 92 |",
      terms: ["Markdown in CSV", "tabella in CSV", "convertitore Markdown"],
    },
    "json-to-csv": {
      title: "Convertitore da JSON a CSV",
      description:
        "Converte un array di oggetti JSON in CSV usando un’unione stabile delle chiavi degli oggetti.",
      guide:
        "Usa un array di oggetti come valore principale. I valori annidati vengono mantenuti come stringhe JSON compatte: controlla come devono essere gestiti dal foglio di calcolo di destinazione.",
      inputLabel: "Array JSON",
      outputLabel: "Output CSV",
      inputPlaceholder: '[{"nome":"Anna","punteggio":92}]',
      terms: ["JSON in CSV", "array JSON in CSV", "convertitore dati"],
    },
    "csv-to-json": {
      title: "Convertitore da CSV a JSON",
      description:
        "Converte un CSV in un array di oggetti JSON usando la prima riga come nomi dei campi.",
      guide:
        "Ogni intestazione deve essere compilata e univoca. Controlla il rilevamento del delimitatore prima di convertire dati con virgole, virgolette o celle su più righe.",
      inputLabel: "Input CSV",
      outputLabel: "Array JSON",
      inputPlaceholder: "nome,punteggio\nAnna,92",
      terms: ["CSV in JSON", "parser CSV", "array JSON"],
    },
    "html-to-markdown": {
      title: "Convertitore da HTML a Markdown",
      description:
        "Converte la struttura HTML in Markdown leggibile, inclusi titoli, link, elenchi, codice e tabelle.",
      guide:
        "Incolla il frammento HTML da convertire. Controlla layout complessi e contenuti incorporati, perché Markdown non può rappresentare ogni comportamento HTML.",
      inputLabel: "Input HTML",
      outputLabel: "Output Markdown",
      inputPlaceholder: "<h1>Titolo</h1><p>Ciao <strong>mondo</strong>.</p>",
      terms: [
        "HTML in Markdown",
        "convertire HTML in Markdown",
        "convertitore HTML Markdown",
      ],
    },
    "markdown-to-html": {
      title: "Convertitore da Markdown a HTML",
      description:
        "Visualizza Markdown come HTML con le comuni tabelle GFM, elenchi, link e blocchi di codice delimitati.",
      guide:
        "Converti solo il Markdown che intendi usare, quindi sanifica nuovamente l’HTML prima di inserire output non attendibile in una pagina web.",
      inputLabel: "Input Markdown",
      outputLabel: "Output HTML",
      inputPlaceholder: "# Titolo\n\nCiao **mondo**.",
      terms: ["Markdown in HTML", "renderer Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
