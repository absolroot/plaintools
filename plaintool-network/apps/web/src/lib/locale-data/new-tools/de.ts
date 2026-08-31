import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";

const backgroundRemover = backgroundRemoverFor("de");

const seed = {
  formatterSubnet: formatterSubnetFor("de"),
  background: backgroundRemover.copy,
  dateCalculator: dateCalculatorFor("de"),
  ui: {
    clear: "Leeren",
    copy: "Kopieren",
    download: "Herunterladen",
    openFile: "Datei öffnen",
    chooseImage: "Bild auswählen",
    dropFile: "Bild hier ablegen.",
    ready: "Bereit",
    working: "Wird verarbeitet…",
    complete: "Abgeschlossen",
    unchanged: "Keine Änderung erforderlich",
    outdated: "Das Ergebnis ist nicht mehr aktuell",
    copied: "Kopiert",
    copyFailed: "Kopieren fehlgeschlagen",
    tooLarge: "Die Eingabe ist für eine sichere Verarbeitung zu groß.",
    failed:
      "Die Verarbeitung ist fehlgeschlagen. Prüfen Sie die Eingabe und versuchen Sie es erneut.",
    resultHere: "Das Ergebnis erscheint hier.",
    localTitle: "Verarbeitung nur in diesem Browser",
    localBody:
      "Ihre Eingabe und die Ergebnisse werden weder hochgeladen noch gespeichert. Sie verbleiben in diesem Browser-Tab.",
    guideTitle: "So verwenden Sie {name}",
    safetyTitle: "Private, lokale Verarbeitung",
    faqWhat: "Was macht {name}?",
    faqPrivacy: "Werden meine Daten hochgeladen?",
    faqCheck: "Was sollte ich bei der Verwendung von {name} beachten?",
  },
  ai: {
    input: "Originaltext",
    output: "Bereinigter Text",
    placeholder:
      "Fügen Sie Text ein, der unsichtbare Unicode-Zeichen enthalten könnte.",
    run: "Unsichtbare Zeichen entfernen",
    report: "Entfernungsbericht",
    removed: "Entfernte Zeichen",
    normalized: "Normalisierte Leerzeichen",
    noChanges:
      "Es wurden keine der ausgewählten unsichtbaren Zeichen gefunden.",
    count: "{count} entfernt",
    advanced: "Erweiterte Unicode-Optionen",
    advancedWarning:
      "Diese Optionen können Schreibweise, Emojis oder die Darstellung von Schriften verändern. Aktivieren Sie sie nur, wenn Sie den Ausgangstext verstehen.",
    joinControls: "ZWJ und ZWNJ entfernen",
    joinWarning:
      "Kann Emoji-Sequenzen und die Zeichenverbindung in arabischen, persischen oder indischen Schriften beschädigen.",
    variationSelectors: "Variationsselektoren entfernen",
    variationWarning:
      "Kann die Darstellung von Emojis oder CJK-Glyphen verändern.",
    combiningMarks: "Kombinierende Zeichen entfernen",
    combiningWarning:
      "Kann Akzente, Vokalzeichen und andere bedeutungstragende Zeichen entfernen.",
    noBreakSpaces: "Geschützte Leerzeichen normalisieren",
    noBreakNote: "Wandelt NBSP-ähnliche Abstände in normale Leerzeichen um.",
    kinds: [
      "Leerzeichen ohne Breite",
      "Wortverbinder",
      "Byte-Reihenfolge-Markierung",
      "Bedingter Trennstrich",
      "Steuerzeichen für bidirektionalen Text",
      "Unsichtbares Trennzeichen",
      "Verbindungssteuerzeichen",
      "Variationsselektor",
      "Kombinierendes Zeichen",
      "Geschütztes Leerzeichen oder Ziffernleerzeichen",
      "Schmales geschütztes Leerzeichen",
    ],
  },
  url: {
    mode: "URL-Umwandlungsmodus",
    encode: "Kodieren",
    decode: "Dekodieren",
    encodeInput: "Zu kodierender Text oder URL",
    decodeInput: "Kodierter URL-Wert",
    encodeOutput: "Kodiertes Ergebnis",
    decodeOutput: "Dekodiertes Ergebnis",
    encodePlaceholder: "Beispiel: https://example.com/search?q=hallo welt",
    decodePlaceholder: "Beispiel: hallo%20welt%3Fseite%3D1",
    scope: "Kodierungsumfang",
    component: "URL-Komponente",
    uri: "Vollständige URI",
    formSpace: "+ für Leerzeichen in Formulardaten verwenden",
    recursive: "Wiederholt dekodieren",
    passLimit: "Maximale Durchläufe",
    encoded: "URL-Kodierung abgeschlossen",
    decoded: "URL-Dekodierung abgeschlossen",
    passCount: "In {count} Durchlauf/Durchläufen dekodiert",
    limitReached:
      "Nach Erreichen des Limits sind weitere kodierte Ebenen vorhanden.",
    errors: [
      "Geben Sie zuerst einen Wert ein.",
      "Eine Prozent-Escapesequenz ist unvollständig oder ungültig.",
      "Die dekodierten Bytes sind kein gültiges UTF-8.",
      "Wählen Sie ein Durchlauflimit zwischen 1 und 10.",
    ],
  },
  hash: {
    input: "Text oder Datei",
    placeholder:
      "Geben Sie Text ein, um SHA-256-, SHA-512-, SHA-1- und MD5-Hashes zu berechnen.",
    results: "Hashwerte",
    resultLabel: "{algorithm}-Hashwert",
    copyLabel: "{algorithm}-Hash kopieren",
    fileSelected: "Ausgewählt: {name} ({size})",
    drop: "Datei hier ablegen, um ihren Hash lokal zu berechnen.",
    textTooLarge: "Der Text ist für diese Browsersitzung zu groß.",
    fileTooLarge: "Die Datei überschreitet das lokale Sicherheitslimit.",
    legacyWarning:
      "MD5 und SHA-1 sind für Kompatibilitätsprüfungen enthalten, nicht zum Speichern von Passwörtern oder für neue Sicherheitskonzepte.",
    expectedChecksum: "Erwartete Prüfsumme",
    checksumMatch: "Stimmt überein",
    checksumMismatch: "Stimmt nicht überein",
    checksumInvalid: "Geben Sie eine unterstützte hexadezimale Prüfsumme ein.",
    empty: "Geben Sie zuerst Text ein oder wählen Sie eine Datei aus.",
    unavailable:
      "Dieser Browser kann einen der angeforderten Hashes nicht berechnen.",
  },
  jwt: {
    input: "JWT-Token",
    placeholder: "Fügen Sie ein dreiteiliges JWT ein: header.payload.signature",
    header: "Header",
    payload: "Payload",
    signature: "Signatur",
    copyHeader: "Dekodierten JWT-Header kopieren",
    copyPayload: "Dekodierte JWT-Payload kopieren",
    copySignature: "Bytes der JWT-Signatur kopieren",
    signatureBytes: "{count} Byte",
    timestamps: "Zeitangaben",
    expires: "Läuft ab (exp)",
    notBefore: "Gültig ab (nbf)",
    issuedAt: "Ausgestellt am (iat)",
    invalidTimestamp:
      "Dieser Claim enthält keinen gültigen numerischen Zeitstempel.",
    noTimestamps: "Es wurden keine Claims für exp, nbf oder iat gefunden.",
    noVerifyTitle: "Signatur nicht verifiziert",
    noVerifyBody:
      "Das Dekodieren zeigt nur den Inhalt des Tokens. Es beweist weder, wer das Token ausgestellt hat, noch ob die Signatur gültig ist.",
    errors: [
      "Fügen Sie zuerst ein JWT ein.",
      "Ein JWT muss aus genau drei durch Punkte getrennten Teilen bestehen.",
      "Der JWT-Header ist leer.",
      "Die JWT-Payload ist leer.",
      "Ein Segment ist kein gültiges Base64URL.",
      "Ein Segment ist kein gültiges UTF-8.",
      "Der Header ist kein gültiges JSON.",
      "Die Payload ist kein gültiges JSON.",
      "Der Header muss ein JSON-Objekt sein.",
      "Die Payload muss ein JSON-Objekt sein.",
    ],
  },
  qr: {
    input: "Text oder URL",
    placeholder: "Geben Sie den Text oder die URL für den QR-Code ein.",
    preview: "QR-Code-Vorschau",
    previewEmpty: "Geben Sie Inhalt ein, um einen QR-Code zu erzeugen.",
    options: "QR-Code-Optionen",
    correction: "Fehlerkorrektur",
    correctionLevels: ["Niedrig (L)", "Mittel (M)", "Quartil (Q)", "Hoch (H)"],
    quietZone: "Ruhezone",
    quietZones: ["Keine", "2 Module", "4 Module (empfohlen)", "8 Module"],
    generate: "QR-Code erzeugen",
    png: "PNG herunterladen",
    svg: "SVG herunterladen",
    empty: "Geben Sie zuerst Text oder eine URL ein.",
    tooLong: "Der Inhalt ist für diese Fehlerkorrekturstufe zu lang.",
    generationFailed: "Der QR-Code konnte nicht erzeugt werden.",
    downloadFailed:
      "Das Bild konnte nicht für den Download vorbereitet werden.",
    upload: "QR-Code-Bild",
    formats: "PNG, JPEG, WebP, GIF oder BMP bis 10 MB",
    camera: "Kamera-Scanner",
    cameraHint:
      "Erlauben Sie den Kamerazugriff für fortlaufendes Scannen. Dekodierte URLs werden nie automatisch geöffnet.",
    startCamera: "Kamera starten",
    stopCamera: "Kamera stoppen",
    scanResult: "Dekodierter Inhalt",
    scanPlaceholder: "Der gescannte Text erscheint hier.",
    urlDetected: "URL erkannt",
    openUrl: "URL öffnen",
    urlDialogTitle: "Diese URL öffnen?",
    urlDialogBody:
      "Diese URL wurde im QR-Code gefunden. Prüfen Sie, ob sie sicher ist und zu der erwarteten Website gehört.",
    urlDialogDestination: "Zieladresse",
    cancel: "Abbrechen",
    reading: "Bild wird gelesen…",
    starting: "Kamera wird gestartet…",
    scanning: "QR-Code wird gesucht…",
    invalidImage: "Wählen Sie ein gültiges Bild in einem unterstützten Format.",
    noCode: "In diesem Bild wurde kein lesbarer QR-Code gefunden.",
    unsupported: "Dieser Browser unterstützt das Scannen mit der Kamera nicht.",
    denied: "Der Kamerazugriff wurde verweigert.",
    unavailable: "Es ist keine geeignete Kamera verfügbar.",
    scanFailed: "Der QR-Code konnte nicht gescannt werden.",
  },
  data: {
    convert: "Umwandeln",
    inputPlaceholder: "Quelldaten hier einfügen.",
    outputPlaceholder: "Das umgewandelte Ergebnis erscheint hier.",
    drop: "Unterstützte Textdatei hier ablegen.",
    readFailed: "Die Datei konnte nicht gelesen werden.",
    errorAt: "{message} Zeile {line}, Spalte {column}.",
    delimiter: "CSV-Trennzeichen",
    auto: "Automatisch erkennen",
    comma: "Komma (,)",
    semicolon: "Semikolon (;)",
    tab: "Tabulator",
    pipe: "Senkrechter Strich (|)",
    firstHeader: "Erste Zeile als Kopfzeile verwenden",
    pretty: "JSON eingerückt formatieren",
    errors: [
      "Die CSV-Datei enthält ein nicht geschlossenes Anführungszeichen oder ein fehlerhaftes Feld.",
      "Es wurde keine Markdown-Tabelle mit Trennzeile gefunden.",
      "Die Markdown-Tabelle ist fehlerhaft.",
      "Die Eingabe ist kein gültiges JSON.",
      "JSON muss ein Array von Objekten sein.",
      "Eine CSV-Kopfzeile ist leer.",
      "CSV-Kopfzeilen müssen eindeutig sein.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Entferner für KI-Wasserzeichen und unsichtbare Zeichen",
      description:
        "Findet und entfernt unsichtbare Unicode-Zeichen, die beim Kopieren aus GPT, Claude, PDF-Dateien oder Webseiten übernommen werden können. Dieses Tool erkennt nicht, ob ein Text von einer KI stammt.",
      guide:
        "Fügen Sie den Text ein und prüfen Sie zuerst das bereinigte Ergebnis. Kontrollieren Sie danach die genauen Zeichennamen, Anzahlen und U+-Codepunkte. Optionen, die die Schriftdarstellung verändern können, sind standardmäßig deaktiviert.",
      terms: [
        "KI-Wasserzeichen entfernen",
        "GPT unsichtbare Zeichen",
        "Claude unsichtbare Zeichen",
        "Zero Width Space entfernen",
        "Unicode Text bereinigen",
      ],
    },
    "url-encode": {
      title: "URL-Encoder",
      description:
        "Kodiert Text, Abfragewerte oder vollständige URIs nach den üblichen Webregeln prozentual.",
      guide:
        "Wählen Sie für einen einzelnen Abfragewert die URL-Komponente oder für den Erhalt der URL-Trennzeichen die vollständige URI. Verwenden Sie Pluszeichen für Leerzeichen nur bei Formulardaten.",
      terms: [
        "URL kodieren",
        "Prozentkodierung",
        "encodeURIComponent",
        "Abfragezeichenfolge",
      ],
    },
    "url-decode": {
      title: "URL-Decoder",
      description:
        "Dekodiert prozentkodierte URLs und Abfragewerte; verschachtelte Kodierungen lassen sich mit begrenzter Durchlaufzahl verarbeiten.",
      guide:
        "Fügen Sie den kodierten Wert ein, wählen Sie seinen Umfang und verwenden Sie wiederholtes Dekodieren nur, wenn die Quelle bekanntermaßen verschachtelt kodiert ist.",
      terms: [
        "URL dekodieren",
        "Prozentkodierung auflösen",
        "decodeURIComponent",
        "Abfragezeichenfolge",
      ],
    },
    "hash-generator": {
      title: "Hash-Generator",
      description:
        "Berechnet SHA-256-, SHA-512-, SHA-1- und MD5-Prüfsummen für Text oder Dateien lokal im Browser.",
      guide:
        "Geben Sie Text ein oder wählen Sie eine Datei und vergleichen Sie den benötigten Algorithmus exakt. Hashes prüfen Gleichheit; sie verschlüsseln keine Daten und speichern Passwörter nicht eigenständig sicher.",
      terms: ["SHA-256", "SHA-512", "MD5", "Prüfsumme", "Datei-Hash"],
    },
    "jwt-decoder": {
      title: "JWT-Decoder",
      description:
        "Dekodiert Header, Payload, Signaturbytes und Zeitangaben eines JWT, ohne das Token hochzuladen.",
      guide:
        "Prüfen Sie das dekodierte JSON und die Zeitstempel, verifizieren Sie Signaturen und Claims aber in dem System, das den Signaturschlüssel verwaltet. Dekodieren allein schafft kein Vertrauen.",
      terms: ["JWT Decoder", "JSON Web Token", "JWT Payload", "JWT Header"],
    },
    "qr-code-generator": {
      title: "QR-Code-Generator",
      description:
        "Erstellt einen standardkonformen statischen QR-Code für Text oder eine URL, der als PNG oder SVG heruntergeladen werden kann.",
      guide:
        "Geben Sie den exakten Inhalt ein, behalten Sie für zuverlässiges Scannen eine Ruhezone von vier Modulen bei und erhöhen Sie die Fehlerkorrektur, wenn der Code teilweise verdeckt werden könnte.",
      terms: ["QR Code erstellen", "QR PNG", "QR SVG", "statischer QR Code"],
    },
    "qr-code-scanner": {
      title: "QR-Code-Scanner",
      description:
        "Liest einen QR-Code lokal aus einem Bild oder mit der Kamera, ohne dekodierte Links automatisch zu öffnen.",
      guide:
        "Verwenden Sie ein scharfes, gut beleuchtetes Bild mit vollständig sichtbarer Ruhezone. Prüfen und kopieren Sie den dekodierten Wert, bevor Sie entscheiden, ob eine URL sicher ist.",
      terms: [
        "QR Code scannen",
        "QR aus Bild lesen",
        "QR Kamera Scanner",
        "QR dekodieren",
      ],
    },
    "csv-to-markdown": {
      title: "CSV-zu-Markdown-Konverter",
      description:
        "Wandelt CSV-Zeilen mit Trennzeichenerkennung und maskierten Zellen in eine übersichtliche Markdown-Tabelle um.",
      guide:
        "Prüfen Sie das Trennzeichen und ob die erste Zeile eine Kopfzeile ist. Mehrzeilige Zellen werden in tabellensichere Umbrüche umgewandelt und senkrechte Striche maskiert.",
      inputLabel: "CSV-Eingabe",
      outputLabel: "Markdown-Tabelle",
      inputPlaceholder: "name,punktzahl\nAnna,92",
      terms: ["CSV in Markdown", "Markdown Tabelle", "CSV Konverter"],
    },
    "markdown-to-csv": {
      title: "Markdown-zu-CSV-Konverter",
      description:
        "Wandelt eine Markdown-Tabelle in eine standardgerechte CSV-Datei für Tabellenkalkulationen und Datenwerkzeuge um.",
      guide:
        "Fügen Sie in der Markdown-Tabelle eine Kopf- und eine Trennzeile ein und wählen Sie das von der Zielanwendung benötigte Trennzeichen.",
      inputLabel: "Markdown-Tabelle",
      outputLabel: "CSV-Ausgabe",
      inputPlaceholder: "| name | punktzahl |\n| --- | --- |\n| Anna | 92 |",
      terms: ["Markdown in CSV", "Tabelle in CSV", "Markdown Konverter"],
    },
    "json-to-csv": {
      title: "JSON-zu-CSV-Konverter",
      description:
        "Wandelt ein Array von JSON-Objekten mit einer stabilen Vereinigung aller Objektschlüssel in CSV um.",
      guide:
        "Verwenden Sie als obersten Wert ein Array von Objekten. Verschachtelte Werte bleiben als kompakte JSON-Zeichenfolgen erhalten; prüfen Sie, wie die Zielanwendung damit umgehen soll.",
      inputLabel: "JSON-Array",
      outputLabel: "CSV-Ausgabe",
      inputPlaceholder: '[{"name":"Anna","punktzahl":92}]',
      terms: ["JSON in CSV", "JSON Array in CSV", "Datenkonverter"],
    },
    "csv-to-json": {
      title: "CSV-zu-JSON-Konverter",
      description:
        "Wandelt CSV mithilfe der ersten Zeile als Feldnamen in ein Array von JSON-Objekten um.",
      guide:
        "Alle Kopfzeilen müssen ausgefüllt und eindeutig sein. Prüfen Sie die Trennzeichenerkennung, bevor Sie Daten mit Kommas, Anführungszeichen oder mehrzeiligen Zellen umwandeln.",
      inputLabel: "CSV-Eingabe",
      outputLabel: "JSON-Array",
      inputPlaceholder: "name,punktzahl\nAnna,92",
      terms: ["CSV in JSON", "CSV Parser", "JSON Array"],
    },
    "html-to-markdown": {
      title: "HTML-zu-Markdown-Konverter",
      description:
        "Wandelt HTML-Strukturen einschließlich Überschriften, Links, Listen, Code und Tabellen in lesbares Markdown um.",
      guide:
        "Fügen Sie das gewünschte HTML-Fragment ein. Prüfen Sie komplexe Layouts und eingebettete Inhalte, da Markdown nicht jedes HTML-Verhalten abbilden kann.",
      inputLabel: "HTML-Eingabe",
      outputLabel: "Markdown-Ausgabe",
      inputPlaceholder: "<h1>Titel</h1><p>Hallo <strong>Welt</strong>.</p>",
      terms: ["HTML in Markdown", "HTML Konverter", "Turndown"],
    },
    "markdown-to-html": {
      title: "Markdown-zu-HTML-Konverter",
      description:
        "Rendert Markdown als HTML mit gängigen GFM-Tabellen, Listen, Links und abgegrenzten Codeblöcken.",
      guide:
        "Konvertieren Sie nur das Markdown, das Sie verwenden möchten, und bereinigen Sie das HTML erneut, bevor Sie nicht vertrauenswürdige Ausgaben in eine Webseite einfügen.",
      inputLabel: "Markdown-Eingabe",
      outputLabel: "HTML-Ausgabe",
      inputPlaceholder: "# Titel\n\nHallo **Welt**.",
      terms: ["Markdown in HTML", "Markdown Renderer", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
