import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/de";

export const deBundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Deutsch",
    metaTitle: "Base64-Decoder und -Encoder – schnell, privat, online",
    metaDescription:
      "Base64 online in Text oder Dateien decodieren und Text oder Dateien codieren. Unterstützt Base64URL, fehlende Auffüllzeichen, Data-URIs und ältere Zeichencodierungen.",
    decodeMetaTitle: "Base64-Decoder für Text und Dateien | AbsolTools",
    encodeMetaTitle: "Base64-Encoder für Text und Dateien | AbsolTools",
    skipToContent: "Zum Inhalt springen",
    languageNavLabel: "Sprache",
    legalNavLabel: "Rechtliches und Kontakt",
    modeLabel: "Umwandlungsart",
    heading: "Base64 online decodieren.",
    subheading:
      "Base64-Text einfügen oder eine Datei öffnen. Standard-Base64, Base64URL, fehlende Auffüllzeichen und Data-URIs werden lokal verarbeitet.",
    encodeHeading: "Text oder Dateien online in Base64 codieren.",
    encodeSubheading:
      "Text eingeben oder eine Datei öffnen. UTF-8-Text und Binärdateien ohne Upload in Standard-Base64 oder Base64URL umwandeln.",
    decode: "Decodieren",
    encode: "Codieren",
    inputLabel: "Base64-Eingabe",
    outputLabel: "Decodiertes Ergebnis",
    encodeInputLabel: "Text- oder Dateieingabe",
    encodeOutputLabel: "Base64-Ergebnis",
    decodePlaceholder: "Beispiel: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Beispiel: Hallo, AbsolTools!",
    outputPlaceholder: "Das Ergebnis erscheint hier.",
    openFile: "Datei öffnen",
    runDecode: "Jetzt decodieren",
    runEncode: "Jetzt codieren",
    options: "Optionen",
    detected: "Erkannt",
    decodeComplete: "Decodierung abgeschlossen",
    encodeComplete: "Codierung abgeschlossen",
    charset: "Zeichencodierung",
    variant: "Base64-Format",
    auto: "Automatisch erkennen",
    standard: "Standard",
    urlSafe: "URL-sicher",
    strict: "Streng validieren",
    lineByLine: "Jede Zeile getrennt decodieren",
    autoRepair: "Leerraum und Auffüllzeichen korrigieren",
    lenientRepair: "Weitere ungültige Zeichen entfernen",
    outputView: "Ergebnisformat",
    text: "Text",
    hex: "Hexadezimal",
    includePadding: "Auffüllzeichen = einfügen",
    mimeWrap: "Nach 76 Zeichen umbrechen",
    dataUri: "Data-URI-Präfix hinzufügen",
    dropHint:
      "Eine Text- oder Binärdatei an einer beliebigen Stelle im Konverter ablegen.",
    fileTooLarge: "Die Eingabe darf höchstens 100 MiB groß sein.",
    binaryOutput:
      "Binärdaten erkannt. Dateityp prüfen und die Datei herunterladen, statt sie direkt auszuführen.",
    executableWarning:
      "Ausführbare Datei erkannt. Decodierte Dateien aus nicht vertrauenswürdigen Quellen niemals ausführen.",
    imagePreview: "Bildvorschau",
    errors: {
      "empty-input": "Zuerst Text eingeben oder eine Datei öffnen.",
      "invalid-character":
        "Dieser Wert enthält ein Zeichen, das in Base64 nicht zulässig ist.",
      "invalid-length":
        "Der Base64-Wert ist abgeschnitten oder hat eine unmögliche Länge.",
      "decode-failed": "Der Wert konnte nicht decodiert werden.",
      "encode-failed": "Die Datei konnte nicht codiert werden.",
      "unsupported-charset":
        "Dieser Browser unterstützt die gewählte Zeichencodierung nicht.",
      "file-too-large":
        "Diese Eingabe überschreitet die Sicherheitsgrenze von 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Data-URI-Präfix entfernt",
      "whitespace-removed": "Leerraum entfernt",
      "url-alphabet-normalized": "Base64URL-Alphabet erkannt",
      "padding-added": "Fehlende Auffüllzeichen ergänzt",
      "invalid-characters-removed": "Ungültige Zeichen entfernt",
    },
    guideTitle: "Base64 decodieren",
    guideIntro:
      "Base64 ist eine Codierung und keine Verschlüsselung. Wer den Wert kennt, kann ihn decodieren.",
    guideSteps: [
      "Einen Base64-Wert einfügen oder eine Datei mit diesem Wert öffnen.",
      "Das Werkzeug erkennt das Format und kann typische Probleme wie Leerraum oder fehlende Auffüllzeichen beheben.",
      "Lesbaren Text kopieren oder das binäre Ergebnis als Datei herunterladen.",
    ],
    encodeGuideTitle: "In Base64 codieren",
    encodeGuideIntro:
      "Base64 stellt Text oder Binärbytes mit druckbaren Zeichen dar. Die Ausgangsdaten werden dadurch weder verschlüsselt noch geschützt.",
    encodeGuideSteps: [
      "Den zu codierenden Text eingeben oder eine Datei öffnen.",
      "Standard-Base64 oder das URL-sichere Alphabet wählen; Auffüllzeichen und Zeilenumbruch nur bei Bedarf anpassen.",
      "Das Base64-Ergebnis kopieren oder als Textdatei herunterladen.",
    ],
    safetyTitle: "Die Eingabe wird nicht gespeichert.",
    safetyBody:
      "Die Website speichert Eingaben und Ergebnisse nicht und sendet sie nicht an einen Server. Alles wird in der aktuellen Browsersitzung verarbeitet und verschwindet beim Neuladen oder Schließen der Seite.",
    detailsTitle: "Standards und Eingabeverarbeitung",
    detailsBody:
      "Standardmäßig folgt das Werkzeug RFC 4648 und akzeptiert das Standard- und URL-sichere Alphabet, optionale Auffüllzeichen, MIME-Leerraum sowie Data-URI-Präfixe. Wenn das genaue Format wichtig ist, die strenge Validierung aktivieren.",
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Ist Base64 eine Verschlüsselung?",
        a: "Nein. Base64 bildet Binärdaten als druckbaren Text ab, bietet aber weder Vertraulichkeit noch Echtheitsprüfung.",
      },
      {
        q: "Warum ist das decodierte Ergebnis nicht lesbar?",
        a: "Das Ergebnis kann eine Datei, komprimierte oder verschlüsselte Daten oder Text in einer anderen Zeichencodierung sein. Die Datei herunterladen oder eine andere Codierung wählen.",
      },
      {
        q: "Lädt diese Website meine Eingabe hoch?",
        a: "Nein. Die Umwandlung erfolgt im Browser. Eingaben, Dateien und Ergebnisse werden nicht an einen Server gesendet.",
      },
    ],
    encodeFaqs: [
      {
        q: "Ist Base64 eine Verschlüsselung?",
        a: "Nein. Base64 bildet Binärdaten als druckbaren Text ab, bietet aber weder Vertraulichkeit noch Echtheitsprüfung.",
      },
      {
        q: "Soll ich Standard-Base64 oder Base64URL verwenden?",
        a: "Standard-Base64 eignet sich für Dateien und allgemeine Daten. Base64URL ist für Werte gedacht, die sicher in einer URL oder einem Dateinamen stehen müssen.",
      },
      {
        q: "Lädt diese Website meine Eingabe hoch?",
        a: "Nein. Die Umwandlung erfolgt im Browser. Eingaben, Dateien und Ergebnisse werden nicht an einen Server gesendet.",
      },
    ],
    advertisement: "Werbung",
    integrationState: {
      enabled: "mit Einwilligungssteuerung aktiviert",
      disabled: "deaktiviert",
    },
    legalNav: {
      about: "Über uns",
      privacy: "Datenschutz",
      cookies: "Cookies",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt",
    },
    legal: {
      about: {
        title: "Über AbsolTools",
        intro:
          "AbsolTools bietet Online-Werkzeuge für Aufgaben rund um Text, Daten, Zeit und Codierung.",
        sections: [
          {
            title: "Was wir entwickeln",
            body: [
              "Jedes Werkzeug löst eine klar abgegrenzte Aufgabe ohne Benutzerkonto. Eingaben und Ergebnisse werden im Browser verarbeitet.",
            ],
          },
          {
            title: "Kontakt",
            body: [
              "Fragen, Fehlermeldungen und Datenschutzanfragen bitte an {{email}} senden.",
            ],
          },
        ],
      },
      privacy: {
        title: "Datenschutzerklärung",
        intro:
          "Diese Erklärung unterscheidet zwischen Werkzeug-Eingaben und -Ergebnissen sowie Website-, Analyse- und Werbedaten.",
        sections: [
          {
            title: "Werkzeug-Eingaben und -Ergebnisse",
            body: [
              "Texte, Dateien, JSON, Datums- und Zeitwerte, decodierte Bytes und erzeugte Ergebnisse werden im Browser verarbeitet. Sie werden nicht an einen Server gesendet oder dort gespeichert.",
            ],
          },
          {
            title: "Bereitstellung der Website",
            body: [
              "{{host_provider}} stellt diese statische Website bereit und schützt sie. Dabei können Verbindungsdaten wie IP-Adresse, Zeitpunkt der Anfrage, Browserinformationen und angeforderte URL verarbeitet werden. Die angegebene Aufbewahrungsfrist für Protokolle beträgt {{host_log_retention}}. Datenschutzerklärung des Anbieters: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analyse und Werbung",
            body: [
              "Google Analytics und Google AdSense sind derzeit {{integration_state}}. Bei einer Aktivierung werden Angaben zu Gerät, Nutzung, Cookies, Einwilligung, Aufbewahrung und internationalen Übermittlungen hier erläutert und über die Datenschutzeinstellungen gesteuert. Werkzeug-Eingaben und -Ergebnisse sind standardmäßig von Analyse- und Werbeereignissen ausgeschlossen.",
            ],
          },
          {
            title: "Cookies und automatische Erhebung",
            body: [
              "Die Werkzeuge speichern weder Eingaben noch Ergebnisse in Cookies oder im Browserspeicher. Wird ein Design gewählt, speichert die Website lokal ausschließlich light oder dark und übermittelt diesen Wert nicht. Sicherheitstechnik des Hosters darf nur unbedingt erforderlichen Speicher nutzen, sofern der gewählte Anbieter dies dokumentiert. Optionaler Analyse- und Werbespeicher bleibt blockiert, solange diese Integrationen deaktiviert sind.",
            ],
          },
          {
            title: "Aufbewahrung und Löschung",
            body: [
              "Der Betreiber bewahrt Werkzeug-Eingaben und -Ergebnisse nicht auf. Anfragedaten beim Hoster unterliegen dessen oben genannter Aufbewahrungsfrist. Kontaktmitteilungen werden nur so lange gespeichert, wie es für die Antwort, gesetzliche Pflichten oder Missbrauchsbekämpfung erforderlich ist; anschließend werden sie gelöscht oder anonymisiert.",
            ],
          },
          {
            title: "Empfänger und internationale Übermittlungen",
            body: [
              "Der gewählte Hoster kann Anfragedaten außerhalb des eigenen Landes an den Orten und mit den Garantien verarbeiten, die in seiner Datenschutzerklärung beschrieben sind. Vor der Aktivierung von Analyse, Werbung, einer Einwilligungsplattform oder anderen Empfängern nennt dieser Abschnitt die nach anwendbarem Recht erforderlichen Empfänger, Länder, Zwecke, Daten, Zeitpunkte, Verfahren, Aufbewahrungsfristen und Übermittlungsgrundlagen.",
            ],
          },
          {
            title: "Ihre Rechte und Kontakt",
            body: [
              "Soweit anwendbar, können Sie über {{email}} Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit oder den Widerruf einer Einwilligung verlangen. Vor der Bearbeitung kann eine angemessene Identitätsprüfung erforderlich sein.",
            ],
          },
          {
            title: "Kinder, Sicherheit und Änderungen",
            body: [
              "Dieses allgemeine Entwicklerwerkzeug richtet sich nicht an Kinder. Eine statische Architektur, lokale Verarbeitung im Browser und restriktive Browserrichtlinien verringern Risiken, doch kein Dienst ist vollständig sicher. Wesentliche Änderungen dieser Erklärung werden auf dieser Seite datiert. Gültig ab: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie-Richtlinie",
        intro:
          "Die Werkzeuge benötigen keine Cookies zur Verarbeitung von Eingaben.",
        sections: [
          {
            title: "Aktuelle Verwendung",
            body: [
              "Analyse und Werbung sind derzeit {{integration_state}}. Die Website speichert Werkzeug-Eingaben und -Ergebnisse weder in Cookies noch im lokalen Speicher. Dort wird nur die gewählte Design-Einstellung light oder dark gespeichert; dieser Wert wird nicht übermittelt.",
            ],
          },
          {
            title: "Bei Aktivierung von Integrationen",
            body: [
              "Eine Einwilligungsplattform steuert dann erforderlichen Präferenz-, Analyse- und Werbespeicher. Über eine dauerhafte Datenschutzoption lässt sich die Einwilligung prüfen oder widerrufen.",
            ],
          },
        ],
      },
      terms: {
        title: "Nutzungsbedingungen",
        intro:
          "Für die Nutzung dieses kostenlosen Werkzeugs gelten diese Bedingungen.",
        sections: [
          {
            title: "Leistung",
            body: [
              "Der Dienst wird wie verfügbar bereitgestellt, ohne Gewähr für Richtigkeit, Verfügbarkeit, Eignung für einen bestimmten Zweck oder unterbrechungsfreien Betrieb. Wichtige Ergebnisse sind unabhängig zu prüfen.",
            ],
          },
          {
            title: "Sichere und rechtmäßige Nutzung",
            body: [
              "Der Dienst darf nicht für Angriffe auf Systeme, Rechtsverletzungen, Eingriffe in Rechte Dritter oder die Verbreitung schädlicher Inhalte genutzt werden. Decodierte Dateien aus nicht vertrauenswürdigen Quellen niemals ausführen.",
            ],
          },
          {
            title: "Haftung und Dritte",
            body: [
              "Soweit zwingendes Recht dies zulässt, haftet der Betreiber nicht für mittelbare Schäden oder Folgeschäden. Werbung und Links Dritter stellen keine Empfehlung dar.",
            ],
          },
          {
            title: "Geistiges Eigentum und Änderungen",
            body: [
              "Das Webdesign und eigene Erläuterungen sind nach anwendbarem Recht geschützt. Für verarbeitete Inhalte bleiben Sie verantwortlich. Funktionen können geändert oder eingestellt werden; wesentliche Änderungen der Bedingungen werden datiert.",
            ],
          },
          {
            title: "Anwendbares Recht und Kontakt",
            body: [
              "Dieser Dienst wird aus {{region}} betrieben. Anwendbares Recht: {{governing_law}}. Gerichtsstand: {{jurisdiction}}. Zwingende Verbraucherschutzvorschriften bleiben unberührt. Kontakt: {{email}}. Gültig ab: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Kontakt",
        intro:
          "Wir nehmen Fragen, Fehlermeldungen, Datenschutzanfragen und Hinweise auf Missbrauch entgegen.",
        sections: [
          {
            title: "E-Mail",
            body: [
              "Kontakt über {{email}}. Bitte keine Werkzeug-Eingaben wie vertrauliche Texte, JSON, Base64-Werte, Passwörter, private Schlüssel oder persönliche Dateien mitsenden.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Vorschau",
    ready: "Bereit",
    working: "Wird verarbeitet …",
    clear: "Leeren",
    copy: "Kopieren",
    copied: "Kopiert",
    copyFailed: "Das Ergebnis konnte nicht kopiert werden.",
    processingFailed: "Die Verarbeitung ist fehlgeschlagen. Erneut versuchen.",
    download: "Herunterladen",
    faqTitle: "Häufige Fragen",
    localTitle: "AbsolTools arbeitet im Browser.",
    localBody:
      "Eingaben und Ergebnisse werden nur in diesem Browser verarbeitet. Sie werden nicht an einen Server gesendet oder dort gespeichert.",
  },
  preview: {
    word: {
      title: "Wort- und Zeichenzähler",
      description:
        "Wörter, Zeichen, Zeichen ohne Leerzeichen, Zeilen und Absätze zählen, ohne den Text hochzuladen.",
      inputLabel: "Text",
      words: "Wörter",
      characters: "Zeichen",
      noWhitespace: "Zeichen ohne Leerzeichen",
      lines: "Zeilen",
      paragraphs: "Absätze",
      completed: "Zählung abgeschlossen",
      approximate:
        "Dieser Browser unterstützt Intl.Segmenter nicht; die Wort- und Zeichenzählung ist daher nur näherungsweise.",
      tooLarge:
        "Die Eingabe überschreitet 1 MB. Text kürzen oder leeren, um fortzufahren.",
      guideTitle: "Was gezählt wird",
      guideBody:
        "In unterstützten Browsern werden Zeichen als wahrgenommene Graphemgruppen gezählt. Ein Emoji oder ein Buchstabe mit kombinierenden Zeichen zählt daher meist als ein Zeichen. Die Zählung ohne Leerzeichen überspringt Leerraum-Grapheme im Original, ohne benachbarte Grapheme zu verbinden. Zeilen richten sich nach Zeilenumbrüchen. Optisch leere Zeilen, auch solche nur mit Leerraum, trennen Absätze.",
      faqs: [
        {
          q: "Wie werden Wörter gezählt?",
          a: "Browser mit Intl.Segmenter bestimmen Wortgrenzen anhand der Sprache dieser Seite und zählen wortähnliche Segmente. Andere Browser zeigen einen Näherungswert.",
        },
        {
          q: "Zählt ein Emoji als ein Zeichen?",
          a: "In unterstützten Browsern wird ein Emoji oder kombiniertes Zeichen, das wie ein einzelnes Zeichen aussieht, einmal gezählt.",
        },
      ],
    },
    json: {
      title: "JSON-Formatter und -Validator",
      description:
        "JSON lesbar formatieren, auf Fehler prüfen oder in eine einzige Zeile minifizieren.",
      inputLabel: "JSON-Eingabe",
      outputLabel: "Ergebnis",
      placeholder: "JSON hier einfügen …",
      outputPlaceholder:
        "Das formatierte oder minifizierte JSON erscheint hier.",
      openFile: ".json-Datei öffnen",
      tooLarge: "Die Eingabe überschreitet 10 MiB.",
      manualRequired:
        "Die automatische Prüfung wurde für diese große Eingabe angehalten. Formatieren, Validieren oder Minifizieren wählen.",
      format: "Formatieren",
      validate: "Validieren",
      validateHelpLabel: "Über die Validierung",
      validateHelp:
        "Prüft, ob die Eingabe der JSON-Syntax aus RFC 8259 entspricht, und nennt Position und Ursache von Syntaxfehlern. Der Text wird weder umformatiert noch verändert.",
      minify: "Minifizieren",
      minifyHelpLabel: "Über das Minifizieren",
      minifyHelp:
        "Entfernt optionalen Leerraum und Zeilenumbrüche aus gültigem JSON. Zeichenketten, die ursprüngliche Zahlenschreibweise und doppelte Objektschlüssel bleiben erhalten.",
      indent: "Einrückung",
      twoSpaces: "2 Leerzeichen",
      fourSpaces: "4 Leerzeichen",
      tabs: "Tabulatoren",
      valid: "Gültiges JSON",
      invalidAt: "{message} Zeile {line}, Spalte {column}.",
      duplicate: "Doppelter Schlüssel in Zeile {line}, Spalte {column}",
      bom: "Die UTF-8-BOM wurde vor der Verarbeitung entfernt.",
      errorMessages: {
        InvalidSymbol: "Ungültiges Symbol.",
        InvalidNumberFormat: "Ungültiges Zahlenformat.",
        PropertyNameExpected: "Ein Eigenschaftsname wird erwartet.",
        ValueExpected: "Ein Wert wird erwartet.",
        ColonExpected:
          "Nach dem Eigenschaftsnamen wird ein Doppelpunkt erwartet.",
        CommaExpected: "Zwischen den Elementen wird ein Komma erwartet.",
        CloseBraceExpected:
          "Eine schließende geschweifte Klammer wird erwartet.",
        CloseBracketExpected: "Eine schließende eckige Klammer wird erwartet.",
        EndOfFileExpected: "Nach dem JSON-Wert folgt unerwarteter Inhalt.",
        InvalidCommentToken: "Kommentare sind in JSON nicht zulässig.",
        UnexpectedEndOfComment: "Der Kommentar ist unvollständig.",
        UnexpectedEndOfString: "Die Zeichenkette ist unvollständig.",
        UnexpectedEndOfNumber: "Die Zahl ist unvollständig.",
        InvalidUnicode: "Die Unicode-Escapesequenz ist ungültig.",
        InvalidEscapeCharacter: "Die Escapesequenz ist ungültig.",
        InvalidCharacter: "Dieses Zeichen ist an dieser Stelle nicht zulässig.",
        Unknown: "Das JSON ist ungültig.",
      },
      guideTitle: "JSON-Regeln und unveränderte Zahlen",
      guideBody:
        "Die Validierung folgt RFC 8259: Kommentare, nachgestellte Kommas und einfache Anführungszeichen werden als Fehler gemeldet. Doppelte Schlüssel bleiben mit einer Warnung erhalten, und große Zahlen behalten genau die eingegebene Schreibweise.",
      faqs: [
        {
          q: "Werden große Zahlen verändert?",
          a: "Nein. Formatierung und Minifizierung berechnen Zahlen nicht neu, sondern erhalten die eingegebene Schreibweise ohne Rundung.",
        },
        {
          q: "Warum werden doppelte Schlüssel gemeldet?",
          a: "Software kann doppelte Schlüssel unterschiedlich behandeln. AbsolTools erhält sie und warnt, statt Daten stillschweigend zu entfernen.",
        },
        {
          q: "Repariert der Formatter ungültiges JSON?",
          a: "Nein. Kommentare, nachgestellte Kommas, einfache Anführungszeichen und andere ungültige Syntax werden gemeldet, damit die Quelle bewusst korrigiert werden kann.",
        },
      ],
    },
    time: {
      title: "Unix-Timestamp-Konverter",
      description:
        "Unix-Zeitstempel in Sekunden oder Millisekunden in Datum und Uhrzeit einer Zeitzone umwandeln – und umgekehrt.",
      timestampMode: "Zeitstempel in Datum und Uhrzeit",
      dateMode: "Datum und Uhrzeit in Zeitstempel",
      timestampLabel: "Unix-Zeitstempel",
      dateLabel: "Datum und Uhrzeit",
      datePlaceholder: "JJJJ-MM-TTThh:mm",
      pickDate: "Datum und Uhrzeit auswählen",
      unit: "Einheit",
      auto: "Automatisch erkennen",
      seconds: "Sekunden",
      milliseconds: "Millisekunden",
      zoneMode: "Zeitzone",
      utc: "UTC-Abweichung",
      local: "Browser-Zeitzone",
      selected: "IANA-Zeitzone",
      zoneLabel: "Stadt, Region oder IANA-Zeitzone",
      zonePlaceholder: "Berlin, Europa oder Europe/Berlin suchen",
      popularZones: [
        {
          value: "Europe/Berlin",
          label: "Berlin, Deutschland · Europe/Berlin",
        },
        { value: "Europe/Vienna", label: "Wien, Österreich · Europe/Vienna" },
        { value: "Europe/Zurich", label: "Zürich, Schweiz · Europe/Zurich" },
        {
          value: "Europe/London",
          label: "London, Vereinigtes Königreich · Europe/London",
        },
        { value: "Europe/Paris", label: "Paris, Frankreich · Europe/Paris" },
        { value: "Europe/Madrid", label: "Madrid, Spanien · Europe/Madrid" },
        {
          value: "America/New_York",
          label: "New York, USA · America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, USA · America/Los_Angeles",
        },
        { value: "Asia/Tokyo", label: "Tokio, Japan · Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, China · Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapur · Asia/Singapore" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australien · Australia/Sydney",
        },
      ],
      offsetLabel: "Abweichung von UTC",
      disambiguation: "Nicht vorhandene oder doppelte Ortszeit",
      reject: "Fehler anzeigen",
      earlier: "Früheres Ergebnis verwenden",
      later: "Späteres Ergebnis verwenden",
      now: "Jetzt",
      convert: "Umwandeln",
      instant: "Datum und Uhrzeit in UTC",
      zoned: "Datum und Uhrzeit in der gewählten Zeitzone",
      unixSeconds: "Unix-Zeitstempel (Sekunden)",
      unixMilliseconds: "Unix-Zeitstempel (Millisekunden)",
      invalid:
        "Einen gültigen Unix-Zeitstempel oder ein gültiges ISO-Datum mit Uhrzeit eingeben und die Zeitzone prüfen.",
      ambiguousUnit:
        "Werte mit 11 oder 12 Ziffern sind mehrdeutig. Sekunden oder Millisekunden auswählen.",
      converted: "Umwandlung abgeschlossen",
      nonexistentTime:
        "Diese Ortszeit existiert in der gewählten Zeitzone wegen der Zeitumstellung nicht. Das frühere oder spätere Ergebnis wählen.",
      repeatedTime:
        "Diese Ortszeit kommt in der gewählten Zeitzone wegen der Zeitumstellung zweimal vor. Das frühere oder spätere Ergebnis wählen.",
      y2038:
        "Dieser Wert liegt außerhalb des Bereichs einer vorzeichenbehafteten 32-Bit-Unixzeit.",
      guideTitle: "Einheiten und Zeitzonen",
      guideBody:
        "Die automatische Erkennung behandelt Dezimalwerte und ganze Zahlen mit 1 bis 10 Ziffern als Sekunden, 13-stellige ganze Zahlen als Millisekunden und verlangt bei 11 oder 12 Ziffern eine Auswahl. Eine lokale Zeit kann eingegeben oder ausgewählt werden; Sekunden und Sekundenbruchteile sind optional. Standardmäßig gilt die Browser-Zeitzone. Beim Umwandeln eines Zeitstempels beeinflusst die Zeitzone nur die angezeigte Ortszeit. Beim Umwandeln einer Ortszeit bestimmt sie den Unix-Wert.",
      faqs: [
        {
          q: "Wie funktioniert die automatische Einheitenerkennung?",
          a: "Dezimalwerte und ganze Zahlen mit 1 bis 10 Ziffern gelten als Sekunden, 13-stellige ganze Zahlen als Millisekunden. Bei 11 oder 12 Ziffern muss eine Einheit gewählt werden.",
        },
        {
          q: "Welches Datums- und Zeitformat kann ich eingeben?",
          a: "Eine lokale Zeit ohne UTC-Abweichung eingeben, zum Beispiel 2026-08-29T14:30. Sekunden und bis zu neun Nachkommastellen sind optional; alternativ steht die Datumsauswahl bereit.",
        },
        {
          q: "Worin unterscheiden sich die Zeitzonenoptionen?",
          a: "Die Browser-Zeitzone folgt den Geräteeinstellungen. Eine UTC-Abweichung ist ein fester Wert wie +01:00. Eine IANA-Zeitzone wie Europe/Berlin berücksichtigt die regionalen Regeln zur Zeitumstellung.",
        },
        {
          q: "Kann die Sommerzeit einen Unix-Zeitstempel mehrdeutig machen?",
          a: "Nein. Ein Unix-Zeitstempel bezeichnet genau einen Zeitpunkt. Mehrdeutigkeit entsteht nur beim Umwandeln einer Ortszeit in einer Zone mit Zeitumstellung: Manche Uhrzeiten fehlen, andere treten zweimal auf. Standardmäßig wird ein Fehler angezeigt; das frühere oder spätere Ergebnis nur zur bewussten Auflösung wählen.",
        },
      ],
    },
    textCompare: {
      title: "Texte vergleichen",
      description:
        "Zwei Texte Zeile für Zeile vergleichen und Ergänzungen, Löschungen und Änderungen hervorheben – ohne Upload.",
      originalLabel: "Originaltext",
      changedLabel: "Geänderter Text",
      originalPlaceholder: "Originaltext hier einfügen …",
      changedPlaceholder: "Geänderten Text hier einfügen …",
      compare: "Vergleichen",
      swap: "Vertauschen",
      results: "Vergleichsergebnis",
      empty: "Zum Vergleichen auf mindestens einer Seite Text eingeben.",
      tooLarge: "Jeder Text darf höchstens 1 MiB groß sein.",
      tooManyLines:
        "Beide Texte dürfen zusammen höchstens 20.000 Zeilen haben.",
      tooComplex:
        "Dieser Vergleich ist für eine sichere Verarbeitung zu komplex. Kürzere Texte verwenden.",
      stale:
        "Das Ergebnis unten gehört zum vorherigen Vergleich. Erneut vergleichen, um es zu aktualisieren.",
      complete: "Vergleich abgeschlossen",
      identical: "Die beiden Texte sind identisch.",
      approximate:
        "Dieser Browser unterstützt Intl.Segmenter nicht; Zeichenänderungen werden nur näherungsweise markiert.",
      inlineLimited:
        "Einige lange bearbeitete Zeilen werden vollständig als geändert angezeigt, damit der Vergleich reaktionsschnell bleibt.",
      additions: "Hinzugefügte Zeilen: {count}",
      deletions: "Entfernte Zeilen: {count}",
      changes: "Geänderte Zeilen: {count}",
      previousChange: "Vorherige Änderung",
      nextChange: "Nächste Änderung",
      expandUnchanged: "{count} unveränderte Zeilen anzeigen",
      whitespaceChange: "Leerraum geändert",
      lineEndingChange: "Zeilenende geändert",
      unchangedRow: "Unveränderte Zeile",
      addedRow: "Hinzugefügte Zeile",
      removedRow: "Entfernte Zeile",
      changedRow: "Geänderte Zeile",
      originalLine: "Originalzeile {line}",
      changedLine: "Geänderte Zeile {line}",
      guideTitle: "So funktioniert der Textvergleich",
      guideBody:
        "Der Vergleich richtet zuerst die Zeilen aus und markiert anschließend Zeichenänderungen innerhalb zusammengehöriger bearbeiteter Zeilen. Änderungen nur an Leerraum oder Zeilenenden werden gekennzeichnet. Lange unveränderte Abschnitte bleiben eingeklappt, bis sie geöffnet werden.",
      faqs: [
        {
          q: "Lädt AbsolTools die Texte hoch?",
          a: "Nein. Beide Texte werden lokal im Browser verglichen und nicht an einen Server gesendet.",
        },
        {
          q: "Erkennt das Werkzeug unterschiedliche Zeilenenden?",
          a: "Ja. Unterschiede zwischen CRLF, LF und CR werden auch dann markiert, wenn der sichtbare Zeilentext gleich ist.",
        },
      ],
    },
    caseConverter: {
      title: "Groß-/Kleinschreibung ändern",
      description:
        "Text ohne Upload in Großbuchstaben, Kleinbuchstaben, Satzschreibweise oder Wörter mit Großbuchstaben umwandeln.",
      inputLabel: "Text",
      outputLabel: "Umgewandelter Text",
      placeholder: "Text eingeben oder einfügen …",
      outputPlaceholder: "Der umgewandelte Text erscheint hier.",
      modeLabel: "Umwandlung",
      upper: "GROSSBUCHSTABEN",
      lower: "kleinbuchstaben",
      sentence: "Satzanfang groß",
      capitalizeWords: "Jedes Wort groß",
      converted: "Umwandlung abgeschlossen",
      noChange: "Der Text entspricht bereits dieser Umwandlung.",
      outdated: "Das angezeigte Ergebnis gehört zur vorherigen Eingabe.",
      tooLarge: "Die Eingabe überschreitet 1 MB.",
      guideTitle: "So arbeiten die Umwandlungen",
      guideBody:
        "Groß- und Kleinschreibung verwenden die üblichen Unicode-Zuordnungen. Satzanfang groß setzt den Text klein und macht den ersten Buchstaben am Anfang, nach einem Zeilenumbruch oder nach . ! ? 。 ！ ？ groß. Jedes Wort groß setzt den ersten Buchstaben jedes Wortes mechanisch groß und erhält Leerraum, Satzzeichen, Zeilenumbrüche, Apostrophe, Bindestriche und Unterstriche. Die Funktionen erkennen keine deutschen Substantive und wenden keine redaktionellen Titelregeln an.",
      faqs: [
        {
          q: "Ist Jedes Wort groß eine grammatische Korrektur?",
          a: "Nein. Die Umwandlung ändert Wortanfänge mechanisch. Sie erkennt weder deutsche Substantive noch Eigennamen, Abkürzungen oder sprachliche Titelregeln.",
        },
        {
          q: "Bleiben Leerzeichen und Zeilenumbrüche erhalten?",
          a: "Ja. Das Werkzeug ändert nur die Groß-/Kleinschreibung und erhält ursprünglichen Leerraum, Satzzeichen und Zeilenumbrüche.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Beispiel: AbsolTools zählt Wörter und Zeichen online.",
    jsonInput: 'Beispiel: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Beispiel: 1704067200 (Sekunden) oder 1704067200000 (Millisekunden).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Beispielformat: 2024-01-01T00:00. Sekunden sind optional; alternativ kann die Datumsauswahl verwendet werden.",
    timeResult: "Umgewandelter Wert",
  },
  catalog: {
    "base64-decode": {
      name: "Base64-Decoder",
      summary: "Base64-Text oder -Dateien online decodieren.",
      searchTerms: [
        "decodieren",
        "Base64 entschlüsseln",
        "Base64URL",
        "Data-URI",
        "Text",
        "Datei",
        "Binärdaten",
      ],
    },
    "base64-encode": {
      name: "Base64-Encoder",
      summary: "Text oder Dateien online in Base64 codieren.",
      searchTerms: [
        "codieren",
        "Base64 erstellen",
        "Base64URL",
        "Data-URI",
        "Text",
        "Datei",
        "Binärdaten",
      ],
    },
    "word-counter": {
      name: "Wort- und Zeichenzähler",
      summary: "Wörter, Zeichen, Zeilen und Absätze online zählen.",
      searchTerms: [
        "Wörter zählen",
        "Zeichen zählen",
        "Buchstaben zählen",
        "Zeilen",
        "Absätze",
        "Text",
      ],
    },
    "json-formatter": {
      name: "JSON-Formatter",
      summary: "JSON lesbar formatieren, validieren oder minifizieren.",
      searchTerms: [
        "JSON formatieren",
        "JSON validieren",
        "JSON minifizieren",
        "JSON prüfen",
        "Einrückung",
        "Daten",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix-Timestamp-Konverter",
      summary:
        "Unix-Zeitstempel in Sekunden oder Millisekunden in Datum und Uhrzeit umwandeln und zurück.",
      searchTerms: [
        "Unixzeit",
        "Unix Zeitstempel",
        "Timestamp",
        "Epoch",
        "Sekunden",
        "Millisekunden",
        "Datum",
        "Uhrzeit",
      ],
    },
    "text-compare": {
      name: "Texte vergleichen",
      summary:
        "Zwei Texte Zeile für Zeile vergleichen und Unterschiede markieren.",
      searchTerms: [
        "Texte vergleichen",
        "Textvergleich",
        "Unterschiede",
        "Zeilen vergleichen",
        "Diff",
      ],
    },
    "case-converter": {
      name: "Groß-/Kleinschreibung ändern",
      summary:
        "Text in Großbuchstaben, Kleinbuchstaben oder andere Schreibweisen umwandeln.",
      searchTerms: [
        "Groß Kleinschreibung",
        "Großbuchstaben",
        "Kleinbuchstaben",
        "Text umwandeln",
        "Satzanfang groß",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Alle Werkzeuge",
    directoryMetaTitle:
      "AbsolTools | Text-, Daten- und Codewerkzeuge im Browser",
    directoryMetaDescription:
      "Formatiere, konvertiere, kodiere, dekodiere, vergleiche und prüfe Text, Daten und Code direkt im Browser. Eingaben und Ergebnisse werden nicht hochgeladen.",
    directoryTitle:
      "Wir machen häufig genutzte Tools übersichtlicher und praktischer",
    directoryIntro:
      "Speichern Sie diese Website als Lesezeichen, damit Sie beim nächsten Mal direkt darauf zugreifen können.",
    toolPromise:
      "AbsolTools macht häufig genutzte Online-Werkzeuge präziser und einfacher zu bedienen. Speichern Sie diese Website als Lesezeichen.",
    directorySearchLabel: "Werkzeuge durchsuchen",
    directorySearchPlaceholder: "Nach Name, Beschreibung oder Stichwort suchen",
    directorySearchClear: "Suche löschen",
    directorySearchNoResults: "Kein Werkzeug entspricht dieser Suche.",
    directorySearchCount: "Gefundene Werkzeuge: {count}",
    available: "Verfügbar",
    research: "Vorschau",
    reserve: "In Prüfung",
    breadcrumbLabel: "Brotkrümelnavigation",
    encodingCategory: "Codieren und Decodieren",
    categories: {
      encoding: "Codieren und Decodieren",
      text: "Text",
      converter: "Konverter",
      data: "Daten",
      time: "Zeit",
    },
    footerNote: "Beliebte Funktionen, einfacher zu nutzen.",
    catalogAria: "Werkzeugverzeichnis",
    useLightTheme: "Helles Design verwenden",
    useDarkTheme: "Dunkles Design verwenden",
    relatedTools: "Ähnliche Tools",
  },
};

export default deBundle;
