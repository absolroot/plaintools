import type { LocaleBundle } from "./bundle";

export const itBundle: LocaleBundle = {
  site: {
    languageName: "Italiano",
    metaTitle: "Decoder e encoder Base64 — rapido, privato e online",
    metaDescription:
      "Decodifica Base64 in testo o file e codifica testo o file online. Supporta Base64URL, padding mancante, URI dati e codifiche di caratteri meno recenti.",
    decodeMetaTitle: "Decoder Base64 per testo e file | AbsolTools",
    encodeMetaTitle: "Encoder Base64 per testo e file | AbsolTools",
    skipToContent: "Vai al contenuto",
    languageNavLabel: "Lingua",
    legalNavLabel: "Informazioni legali e contatti",
    modeLabel: "Modalità di conversione",
    heading: "Decodifica Base64 online.",
    subheading:
      "Incolla il testo Base64 o apri un file. Base64 standard, Base64URL, padding mancante e URI dati vengono elaborati localmente.",
    encodeHeading: "Codifica testo o file in Base64 online.",
    encodeSubheading:
      "Inserisci testo o apri un file. Converti testo UTF-8 e file binari in Base64 standard o Base64URL senza caricamenti.",
    decode: "Decodifica",
    encode: "Codifica",
    inputLabel: "Input Base64",
    outputLabel: "Risultato decodificato",
    encodeInputLabel: "Testo o file di input",
    encodeOutputLabel: "Risultato Base64",
    decodePlaceholder: "Esempio: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Esempio: Ciao, AbsolTools!",
    outputPlaceholder: "Il risultato apparirà qui.",
    openFile: "Apri file",
    runDecode: "Decodifica ora",
    runEncode: "Codifica ora",
    options: "Opzioni",
    detected: "Rilevato",
    decodeComplete: "Decodifica completata",
    encodeComplete: "Codifica completata",
    charset: "Codifica dei caratteri",
    variant: "Formato Base64",
    auto: "Rileva automaticamente",
    standard: "Standard",
    urlSafe: "Sicuro per URL",
    strict: "Convalida rigorosa",
    lineByLine: "Decodifica ogni riga separatamente",
    autoRepair: "Correggi spazi e padding",
    lenientRepair: "Rimuovi altri caratteri non validi",
    outputView: "Formato del risultato",
    text: "Testo",
    hex: "Esadecimale",
    includePadding: "Includi il padding =",
    mimeWrap: "Vai a capo ogni 76 caratteri",
    dataUri: "Aggiungi prefisso URI dati",
    dropHint:
      "Trascina un file di testo o binario in un punto qualsiasi del convertitore.",
    fileTooLarge: "La dimensione massima dell’input è 100 MiB.",
    binaryOutput:
      "Rilevati dati binari. Controlla il tipo di file e scaricalo invece di eseguirlo direttamente.",
    executableWarning:
      "Rilevato un file eseguibile. Non eseguire file decodificati provenienti da fonti non attendibili.",
    imagePreview: "Anteprima immagine",
    errors: {
      "empty-input": "Inserisci prima del testo o apri un file.",
      "invalid-character":
        "Questo valore contiene un carattere non valido in Base64.",
      "invalid-length":
        "Il valore Base64 è troncato o ha una lunghezza impossibile.",
      "decode-failed": "Non è stato possibile decodificare il valore.",
      "encode-failed": "Non è stato possibile codificare il file.",
      "unsupported-charset":
        "Il browser non supporta questa codifica dei caratteri.",
      "file-too-large":
        "Questo input supera il limite di sicurezza di 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Prefisso URI dati rimosso",
      "whitespace-removed": "Spazi rimossi",
      "url-alphabet-normalized": "Rilevato alfabeto Base64URL",
      "padding-added": "Aggiunto il padding mancante",
      "invalid-characters-removed": "Caratteri non validi rimossi",
    },
    guideTitle: "Come decodificare Base64",
    guideIntro:
      "Base64 è una codifica, non una cifratura. Chiunque disponga del valore può decodificarlo.",
    guideSteps: [
      "Incolla un valore Base64 o apri un file che lo contiene.",
      "Lo strumento rileva il formato e può correggere problemi comuni, come spazi o padding mancante.",
      "Copia il testo leggibile o scarica il risultato binario come file.",
    ],
    encodeGuideTitle: "Come codificare in Base64",
    encodeGuideIntro:
      "Base64 rappresenta testo o byte binari con caratteri stampabili. Non cifra né protegge i dati originali.",
    encodeGuideSteps: [
      "Inserisci il testo o apri il file da codificare.",
      "Scegli Base64 standard o l’alfabeto sicuro per URL e modifica padding o ritorni a capo solo se richiesto dalla destinazione.",
      "Copia il risultato Base64 o scaricalo come file di testo.",
    ],
    safetyTitle: "Il tuo input non viene memorizzato.",
    safetyBody:
      "Il sito non memorizza né invia a un server input e risultati. Tutto viene elaborato nella sessione corrente del browser e scompare quando ricarichi o chiudi la pagina.",
    detailsTitle: "Standard e gestione dell’input",
    detailsBody:
      "Per impostazione predefinita, lo strumento segue RFC 4648 e accetta gli alfabeti standard e sicuro per URL, padding facoltativo, spazi MIME e prefissi URI dati. Attiva la convalida rigorosa quando il formato esatto è importante.",
    faqTitle: "Domande frequenti",
    faqs: [
      {
        q: "Base64 è una cifratura?",
        a: "No. Base64 rappresenta dati binari come testo stampabile, senza fornire riservatezza o autenticazione.",
      },
      {
        q: "Perché il risultato decodificato non è leggibile?",
        a: "Il risultato potrebbe essere un file, dati compressi o cifrati oppure testo in un’altra codifica. Prova a scaricare il file o a scegliere una codifica diversa.",
      },
      {
        q: "Questo sito carica il mio input?",
        a: "No. La conversione avviene nel browser. Input, file e risultati non vengono inviati a un server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 è una cifratura?",
        a: "No. Base64 rappresenta dati binari come testo stampabile, senza fornire riservatezza o autenticazione.",
      },
      {
        q: "Devo usare Base64 standard o Base64URL?",
        a: "Usa Base64 standard per file e dati generici. Usa Base64URL quando il valore deve comparire in modo sicuro in un URL o nel nome di un file.",
      },
      {
        q: "Questo sito carica il mio input?",
        a: "No. La conversione avviene nel browser. Input, file e risultati non vengono inviati a un server.",
      },
    ],
    advertisement: "Pubblicità",
    integrationState: {
      enabled: "attivi con controlli del consenso",
      disabled: "disattivati",
    },
    legalNav: {
      about: "Chi siamo",
      privacy: "Privacy",
      cookies: "Cookie",
      terms: "Termini",
      contact: "Contatti",
    },
    legal: {
      about: {
        title: "Chi siamo",
        intro:
          "AbsolTools offre strumenti online per attività relative a testo, dati, tempo e codifica.",
        sections: [
          {
            title: "Cosa realizziamo",
            body: [
              "Ogni strumento svolge un’attività specifica senza richiedere un account. Input e risultati vengono elaborati nel browser.",
            ],
          },
          {
            title: "Contatti",
            body: [
              "Invia domande, segnalazioni di errori e richieste sulla privacy a {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Informativa sulla privacy",
        intro:
          "Questa informativa distingue input e risultati degli strumenti dai dati del sito, di analisi e pubblicitari.",
        sections: [
          {
            title: "Input e risultati degli strumenti",
            body: [
              "Testi, file, JSON, valori di data e ora, byte decodificati e risultati generati vengono elaborati nel browser. Non vengono inviati né memorizzati su un server.",
            ],
          },
          {
            title: "Fornitura del sito",
            body: [
              "{{host_provider}} fornisce e protegge questo sito statico e può trattare dati di connessione come indirizzo IP, ora della richiesta, informazioni sul browser e URL richiesto. Il periodo di conservazione dei log dichiarato è {{host_log_retention}}. Informativa del fornitore: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analisi e pubblicità",
            body: [
              "Google Analytics e Google AdSense sono attualmente {{integration_state}}. Se attivati, i dettagli su dispositivo, utilizzo, cookie, consenso, conservazione e trasferimenti internazionali saranno descritti qui e gestiti nelle impostazioni sulla privacy. Per impostazione predefinita, input e risultati degli strumenti sono esclusi dagli eventi di analisi e pubblicità.",
            ],
          },
          {
            title: "Cookie e raccolta automatica",
            body: [
              "Gli strumenti non memorizzano input o risultati nei cookie o nello spazio di archiviazione del browser. Se scegli un tema, il sito salva localmente solo light o dark e non trasmette il valore. La tecnologia di sicurezza dell’hosting può usare solo lo spazio strettamente necessario quando ciò è documentato dal fornitore scelto. Lo spazio facoltativo per analisi e pubblicità resta bloccato finché le integrazioni sono disattivate.",
            ],
          },
          {
            title: "Conservazione e cancellazione",
            body: [
              "Il gestore non conserva input o risultati degli strumenti. I dati delle richieste elaborati dall’hosting seguono il periodo di conservazione indicato sopra. I messaggi di contatto vengono conservati solo quanto necessario per rispondere, adempiere obblighi legali o gestire abusi, quindi cancellati o anonimizzati.",
            ],
          },
          {
            title: "Destinatari e trasferimenti internazionali",
            body: [
              "Il fornitore di hosting scelto può trattare dati delle richieste fuori dal tuo paese, nei luoghi e con le garanzie descritti nella propria informativa. Prima di attivare analisi, pubblicità, una piattaforma di consenso o altri destinatari, questa sezione indicherà destinatari, paesi, finalità, dati, tempi, metodi, conservazione e basi del trasferimento richiesti dalla legge applicabile.",
            ],
          },
          {
            title: "I tuoi diritti e contatti",
            body: [
              "Quando applicabile, puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione, portabilità o revoca del consenso scrivendo a {{email}}. Potremmo richiedere una verifica ragionevole prima di gestire la richiesta.",
            ],
          },
          {
            title: "Minori, sicurezza e modifiche",
            body: [
              "Questo strumento generico per sviluppatori non è rivolto ai minori. Usiamo un’architettura statica, elaborazione locale nel browser e criteri restrittivi del browser per ridurre i rischi, ma nessun servizio è completamente sicuro. Le modifiche rilevanti saranno datate su questa pagina. Data di efficacia: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Informativa sui cookie",
        intro: "Gli strumenti non richiedono cookie per elaborare gli input.",
        sections: [
          {
            title: "Uso attuale",
            body: [
              "Analisi e pubblicità sono attualmente {{integration_state}}. Il sito non memorizza input o risultati degli strumenti nei cookie o nello spazio locale. Viene salvata localmente solo la preferenza del tema scelta, light o dark, e tale valore non viene trasmesso.",
            ],
          },
          {
            title: "Se le integrazioni vengono attivate",
            body: [
              "Una piattaforma di consenso controllerà lo spazio necessario per preferenze, analisi e pubblicità. Un controllo permanente della privacy consentirà di rivedere o revocare il consenso.",
            ],
          },
        ],
      },
      terms: {
        title: "Termini di utilizzo",
        intro:
          "L’uso di questo strumento gratuito è soggetto ai presenti termini.",
        sections: [
          {
            title: "Servizio",
            body: [
              "Il servizio è fornito così com’è, senza garanzie di precisione, disponibilità, idoneità a uno scopo specifico o funzionamento ininterrotto. Verifica in modo indipendente i risultati importanti.",
            ],
          },
          {
            title: "Uso sicuro e legale",
            body: [
              "Non usare il servizio per attaccare sistemi, violare la legge o diritti di terzi o distribuire contenuti dannosi. Non eseguire mai un file decodificato proveniente da una fonte non attendibile.",
            ],
          },
          {
            title: "Responsabilità e terze parti",
            body: [
              "Nella misura consentita dalle norme imperative, il gestore non risponde di perdite indirette o consequenziali. Annunci e link di terzi non costituiscono approvazione.",
            ],
          },
          {
            title: "Proprietà intellettuale e modifiche",
            body: [
              "Il design del sito e i contenuti esplicativi originali sono protetti dalla legge applicabile. Resti responsabile dei contenuti elaborati. Possiamo modificare o interrompere funzionalità e dateremo le modifiche rilevanti ai termini.",
            ],
          },
          {
            title: "Legge applicabile e contatti",
            body: [
              "Questo servizio è gestito da {{region}}. Legge applicabile: {{governing_law}}. Foro competente: {{jurisdiction}}. Restano valide le norme imperative a tutela dei consumatori. Contatto: {{email}}. Data di efficacia: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contatti",
        intro:
          "Accogliamo domande, segnalazioni di errori, richieste sulla privacy e segnalazioni di abusi.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Scrivi a {{email}}. Non includere nel messaggio input degli strumenti come testo riservato, JSON, valori Base64, password, chiavi private o file personali.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Anteprima",
    ready: "Pronto",
    working: "Elaborazione…",
    clear: "Cancella",
    copy: "Copia",
    copied: "Copiato",
    copyFailed: "Non è stato possibile copiare il risultato.",
    processingFailed: "Elaborazione non riuscita. Riprova.",
    download: "Scarica",
    faqTitle: "Domande frequenti",
    localTitle: "AbsolTools funziona nel tuo browser.",
    localBody:
      "Input e risultati vengono elaborati solo in questo browser. Non vengono inviati né memorizzati su un server.",
  },
  preview: {
    word: {
      title: "Contatore di parole e caratteri",
      description:
        "Conta parole, caratteri, caratteri senza spazi, righe e paragrafi senza caricare il testo.",
      inputLabel: "Testo",
      words: "Parole",
      characters: "Caratteri",
      noWhitespace: "Caratteri senza spazi",
      lines: "Righe",
      paragraphs: "Paragrafi",
      completed: "Conteggio completato",
      approximate:
        "Questo browser non supporta Intl.Segmenter; il conteggio di parole e caratteri è approssimativo.",
      tooLarge:
        "L’input supera 1 MB. Riduci o cancella il testo per continuare.",
      guideTitle: "Cosa viene contato",
      guideBody:
        "Nei browser compatibili, i caratteri sono contati come gruppi di grafemi percepiti: un’emoji o una lettera con segni combinati conta quindi di solito come un carattere. Il conteggio senza spazi ignora i grafemi di spaziatura del testo originale senza unire quelli vicini. Le righe seguono le interruzioni di riga. Le righe visivamente vuote, comprese quelle con soli spazi, separano i paragrafi.",
      faqs: [
        {
          q: "Come vengono contate le parole?",
          a: "I browser con Intl.Segmenter usano la lingua di questa pagina per determinare i confini delle parole e contano i segmenti simili a parole. Gli altri mostrano una stima.",
        },
        {
          q: "Un’emoji conta come un carattere?",
          a: "Nei browser compatibili, un’emoji o un carattere combinato che appare come un unico segno viene contato una volta.",
        },
      ],
    },
    json: {
      title: "Formattatore e validatore JSON",
      description:
        "Formatta JSON per renderlo leggibile, controlla gli errori o minificalo su una sola riga.",
      inputLabel: "JSON di input",
      outputLabel: "Risultato",
      placeholder: "Incolla qui il JSON…",
      outputPlaceholder: "Il JSON formattato o minificato apparirà qui.",
      openFile: "Apri file .json",
      tooLarge: "L’input supera 10 MiB.",
      manualRequired:
        "La convalida automatica è sospesa per questo input di grandi dimensioni. Scegli Formatta, Convalida o Minifica.",
      format: "Formatta",
      validate: "Convalida",
      validateHelpLabel: "Informazioni sulla convalida",
      validateHelp:
        "Controlla che l’input rispetti la sintassi JSON di RFC 8259 e indica posizione e causa degli errori. Il testo non viene riformattato né modificato.",
      minify: "Minifica",
      minifyHelpLabel: "Informazioni sulla minificazione",
      minifyHelp:
        "Rimuove spazi e interruzioni di riga facoltativi da JSON valido. Il contenuto delle stringhe, la notazione originale dei numeri e le chiavi duplicate restano invariati.",
      indent: "Rientro",
      twoSpaces: "2 spazi",
      fourSpaces: "4 spazi",
      tabs: "Tabulazioni",
      valid: "JSON valido",
      invalidAt: "{message} Riga {line}, colonna {column}.",
      duplicate: "Chiave duplicata alla riga {line}, colonna {column}",
      bom: "Il BOM UTF-8 è stato rimosso prima dell’elaborazione.",
      errorMessages: {
        InvalidSymbol: "Simbolo non valido.",
        InvalidNumberFormat: "Formato numerico non valido.",
        PropertyNameExpected: "È richiesto un nome di proprietà.",
        ValueExpected: "È richiesto un valore.",
        ColonExpected:
          "Sono richiesti i due punti dopo il nome della proprietà.",
        CommaExpected: "È richiesta una virgola tra gli elementi.",
        CloseBraceExpected: "È richiesta una parentesi graffa di chiusura.",
        CloseBracketExpected: "È richiesta una parentesi quadra di chiusura.",
        EndOfFileExpected: "Contenuto inatteso dopo il valore JSON.",
        InvalidCommentToken: "I commenti non sono validi in JSON.",
        UnexpectedEndOfComment: "Il commento è incompleto.",
        UnexpectedEndOfString: "La stringa è incompleta.",
        UnexpectedEndOfNumber: "Il numero è incompleto.",
        InvalidUnicode: "La sequenza di escape Unicode non è valida.",
        InvalidEscapeCharacter: "La sequenza di escape non è valida.",
        InvalidCharacter: "Questo carattere non è valido in questa posizione.",
        Unknown: "Il JSON non è valido.",
      },
      guideTitle: "Regole JSON e conservazione dei numeri",
      guideBody:
        "La convalida segue RFC 8259: commenti, virgole finali e apici singoli sono segnalati come errori. Le chiavi duplicate vengono conservate con un avviso e i numeri grandi mantengono esattamente la notazione inserita.",
      faqs: [
        {
          q: "I numeri grandi vengono modificati?",
          a: "No. Formattazione e minificazione non ricalcolano i numeri: mantengono la notazione inserita senza arrotondare i valori grandi.",
        },
        {
          q: "Perché vengono segnalate le chiavi duplicate?",
          a: "I software possono gestire le chiavi duplicate in modi diversi. AbsolTools le conserva e mostra un avviso invece di eliminare dati senza segnalarlo.",
        },
        {
          q: "Il formattatore corregge il JSON non valido?",
          a: "No. Commenti, virgole finali, apici singoli e altre sintassi non valide vengono segnalati per consentire una correzione consapevole della fonte.",
        },
      ],
    },
    time: {
      title: "Convertitore di timestamp Unix",
      description:
        "Converti timestamp Unix in secondi o millisecondi in data e ora nel fuso scelto, e viceversa.",
      timestampMode: "Da timestamp a data e ora",
      dateMode: "Da data e ora a timestamp",
      timestampLabel: "Timestamp Unix",
      dateLabel: "Data e ora",
      datePlaceholder: "AAAA-MM-GGThh:mm",
      pickDate: "Scegli data e ora",
      unit: "Unità",
      auto: "Rileva automaticamente",
      seconds: "Secondi",
      milliseconds: "Millisecondi",
      zoneMode: "Fuso orario",
      utc: "Scostamento UTC",
      local: "Fuso del browser",
      selected: "Fuso orario IANA",
      zoneLabel: "Città, regione o fuso orario IANA",
      zonePlaceholder: "Cerca Roma, Europa o Europe/Rome",
      popularZones: [
        { value: "Europe/Rome", label: "Roma, Italia · Europe/Rome" },
        { value: "Europe/Paris", label: "Parigi, Francia · Europe/Paris" },
        { value: "Europe/Berlin", label: "Berlino, Germania · Europe/Berlin" },
        {
          value: "Europe/London",
          label: "Londra, Regno Unito · Europe/London",
        },
        { value: "Europe/Madrid", label: "Madrid, Spagna · Europe/Madrid" },
        { value: "Europe/Zurich", label: "Zurigo, Svizzera · Europe/Zurich" },
        {
          value: "America/New_York",
          label: "New York, Stati Uniti · America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Stati Uniti · America/Los_Angeles",
        },
        { value: "Asia/Tokyo", label: "Tokyo, Giappone · Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, Cina · Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapore · Asia/Singapore" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australia · Australia/Sydney",
        },
      ],
      offsetLabel: "Scostamento da UTC",
      disambiguation: "Ora locale inesistente o ripetuta",
      reject: "Mostra un errore",
      earlier: "Usa il risultato precedente",
      later: "Usa il risultato successivo",
      now: "Adesso",
      convert: "Converti",
      instant: "Data e ora in UTC",
      zoned: "Data e ora nel fuso scelto",
      unixSeconds: "Timestamp Unix (secondi)",
      unixMilliseconds: "Timestamp Unix (millisecondi)",
      invalid:
        "Inserisci un timestamp Unix o una data e ora ISO validi e controlla il fuso orario.",
      ambiguousUnit:
        "I valori di 11 o 12 cifre sono ambigui. Scegli secondi o millisecondi.",
      converted: "Conversione completata",
      nonexistentTime:
        "Questa data e ora non esistono nel fuso scelto a causa del cambio dell’ora. Scegli il risultato precedente o successivo.",
      repeatedTime:
        "Questa data e ora si verificano due volte nel fuso scelto a causa del cambio dell’ora. Scegli il risultato precedente o successivo.",
      y2038:
        "Questo valore è fuori dall’intervallo del tempo Unix intero con segno a 32 bit.",
      guideTitle: "Gestione di unità e fusi orari",
      guideBody:
        "Il rilevamento automatico tratta decimali e interi da 1 a 10 cifre come secondi, gli interi di 13 cifre come millisecondi e richiede una scelta per 11 o 12 cifre. Inserisci una data e ora locale o usa il selettore; secondi e frazioni sono facoltativi. Il fuso del browser è quello predefinito. Convertendo un timestamp, il fuso cambia solo l’ora locale mostrata. Convertendo un’ora locale, determina il valore Unix.",
      faqs: [
        {
          q: "Come funziona il rilevamento automatico dell’unità?",
          a: "Decimali e interi da 1 a 10 cifre sono trattati come secondi, quelli di 13 cifre come millisecondi. Per 11 o 12 cifre devi scegliere l’unità.",
        },
        {
          q: "Quale formato di data e ora posso inserire?",
          a: "Inserisci una data e ora locale senza scostamento UTC, ad esempio 2026-08-29T14:30. I secondi e fino a nove decimali sono facoltativi; puoi anche usare il selettore.",
        },
        {
          q: "Qual è la differenza tra le opzioni del fuso orario?",
          a: "Il fuso del browser segue le impostazioni del dispositivo. Uno scostamento UTC è fisso, come +01:00. Un fuso IANA come Europe/Rome segue le regole regionali del cambio dell’ora.",
        },
        {
          q: "L’ora legale può rendere ambiguo un timestamp Unix?",
          a: "No. Un timestamp Unix identifica un solo istante. L’ambiguità nasce solo convertendo un’ora locale in un fuso che cambia l’orologio: alcuni orari non esistono e altri ricorrono due volte. Per impostazione predefinita compare un errore; scegli il risultato precedente o successivo solo per risolvere consapevolmente il caso.",
        },
      ],
    },
    textCompare: {
      title: "Confronto testi",
      description:
        "Confronta due testi riga per riga ed evidenzia aggiunte, eliminazioni e modifiche senza caricare le versioni.",
      originalLabel: "Testo originale",
      changedLabel: "Testo modificato",
      originalPlaceholder: "Incolla qui il testo originale…",
      changedPlaceholder: "Incolla qui il testo modificato…",
      compare: "Confronta",
      swap: "Inverti",
      results: "Risultato del confronto",
      empty: "Inserisci testo in almeno uno dei due riquadri per confrontare.",
      tooLarge: "Ogni testo può avere una dimensione massima di 1 MiB.",
      tooManyLines:
        "I due testi possono contenere al massimo 20.000 righe in totale.",
      tooComplex:
        "Questo confronto è troppo complesso per essere elaborato in sicurezza. Prova con testi più brevi.",
      stale:
        "Il risultato seguente appartiene al confronto precedente. Esegui di nuovo il confronto per aggiornarlo.",
      complete: "Confronto completato",
      identical: "I due testi sono identici.",
      approximate:
        "Questo browser non supporta Intl.Segmenter; l’evidenziazione dei caratteri è approssimativa.",
      inlineLimited:
        "Alcune righe lunghe vengono indicate interamente come modificate per mantenere reattivo il confronto.",
      additions: "Righe aggiunte: {count}",
      deletions: "Righe eliminate: {count}",
      changes: "Righe modificate: {count}",
      previousChange: "Modifica precedente",
      nextChange: "Modifica successiva",
      expandUnchanged: "Mostra {count} righe invariate",
      whitespaceChange: "Spazi modificati",
      lineEndingChange: "Fine riga modificato",
      unchangedRow: "Riga invariata",
      addedRow: "Riga aggiunta",
      removedRow: "Riga eliminata",
      changedRow: "Riga modificata",
      originalLine: "Riga originale {line}",
      changedLine: "Riga modificata {line}",
      guideTitle: "Come funziona il confronto",
      guideBody:
        "Il confronto allinea prima le righe e poi evidenzia le modifiche dei caratteri nelle righe corrispondenti. Sono segnalate anche le variazioni dei soli spazi o dei fine riga. Le sezioni lunghe e invariate restano compresse finché non vengono aperte.",
      faqs: [
        {
          q: "AbsolTools carica i testi?",
          a: "No. I due testi vengono confrontati localmente nel browser e non sono inviati a un server.",
        },
        {
          q: "Lo strumento rileva fine riga diversi?",
          a: "Sì. Le differenze tra CRLF, LF e CR vengono segnalate anche quando il testo visibile della riga è uguale.",
        },
      ],
    },
    caseConverter: {
      title: "Convertitore maiuscole/minuscole",
      description:
        "Converti testo in MAIUSCOLO, minuscolo, stile frase o iniziali maiuscole senza caricamenti.",
      inputLabel: "Testo",
      outputLabel: "Testo convertito",
      placeholder: "Scrivi o incolla qui il testo…",
      outputPlaceholder: "Il testo convertito apparirà qui.",
      modeLabel: "Conversione",
      upper: "MAIUSCOLO",
      lower: "minuscolo",
      sentence: "Stile frase",
      capitalizeWords: "Iniziali maiuscole",
      converted: "Conversione completata",
      noChange: "Il testo corrisponde già a questa conversione.",
      outdated: "Il risultato visualizzato appartiene all’input precedente.",
      tooLarge: "L’input supera 1 MB.",
      guideTitle: "Come funziona ogni conversione",
      guideBody:
        "Maiuscolo e minuscolo usano le normali corrispondenze Unicode. Stile frase porta il testo in minuscolo e rende maiuscola la prima lettera all’inizio, dopo un’interruzione di riga o dopo . ! ? 。 ！ ？. Iniziali maiuscole trasforma meccanicamente la prima lettera di ogni parola e conserva spazi, punteggiatura, interruzioni di riga, apostrofi, trattini e underscore. Non applica le regole editoriali italiane per titoli o nomi propri.",
      faqs: [
        {
          q: "Iniziali maiuscole equivale allo stile titolo italiano?",
          a: "No. La conversione rende maiuscola meccanicamente l’iniziale di ogni parola senza applicare regole editoriali ad articoli, preposizioni, nomi o abbreviazioni.",
        },
        {
          q: "Spazi e interruzioni di riga vengono conservati?",
          a: "Sì. Lo strumento modifica solo maiuscole e minuscole e conserva spazi, punteggiatura e interruzioni di riga originali.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Esempio: AbsolTools conta parole e caratteri online.",
    jsonInput: 'Esempio: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Esempio: 1704067200 (secondi) o 1704067200000 (millisecondi).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Formato di esempio: 2024-01-01T00:00. I secondi sono facoltativi; puoi anche usare il selettore della data.",
    timeResult: "Valore convertito",
  },
  catalog: {
    "base64-decode": {
      name: "Decoder Base64",
      summary: "Decodifica testo o file Base64 online.",
      searchTerms: [
        "decodificare",
        "decoder Base64",
        "Base64URL",
        "URI dati",
        "testo",
        "file",
        "binario",
      ],
    },
    "base64-encode": {
      name: "Encoder Base64",
      summary: "Codifica testo o file in Base64 online.",
      searchTerms: [
        "codificare",
        "encoder Base64",
        "Base64URL",
        "URI dati",
        "testo",
        "file",
        "binario",
      ],
    },
    "word-counter": {
      name: "Contatore di parole e caratteri",
      summary: "Conta parole, caratteri, righe e paragrafi online.",
      searchTerms: [
        "contare parole",
        "contatore caratteri",
        "conta caratteri",
        "righe",
        "paragrafi",
        "testo",
      ],
    },
    "json-formatter": {
      name: "Formattatore JSON",
      summary: "Formatta, convalida o minifica JSON.",
      searchTerms: [
        "formattare JSON",
        "validatore JSON",
        "minificare JSON",
        "JSON leggibile",
        "rientro",
      ],
    },
    "unix-timestamp-converter": {
      name: "Convertitore di timestamp Unix",
      summary:
        "Converti timestamp Unix in data e ora, in secondi o millisecondi, e viceversa.",
      searchTerms: [
        "tempo Unix",
        "timestamp",
        "epoch",
        "secondi",
        "millisecondi",
        "data",
        "ora",
      ],
    },
    "text-compare": {
      name: "Confronto testi",
      summary: "Confronta due testi riga per riga e mostra le differenze.",
      searchTerms: [
        "confrontare testi",
        "comparatore testo",
        "differenze",
        "confronto righe",
        "diff",
      ],
    },
    "case-converter": {
      name: "Convertitore maiuscole/minuscole",
      summary:
        "Converti testo in maiuscolo, minuscolo, stile frase o iniziali maiuscole.",
      searchTerms: [
        "maiuscolo minuscolo",
        "convertire in maiuscolo",
        "convertire in minuscolo",
        "stile frase",
        "capitalizzare testo",
      ],
    },
  },
  network: {
    allTools: "Tutti gli strumenti",
    directoryMetaTitle:
      "Strumenti online gratuiti per testo e dati | AbsolTools",
    directoryMetaDescription:
      "Svolgi online attività relative a testo, dati, tempo e codifica.",
    directoryTitle:
      "Rendiamo più semplici e pratici gli strumenti che usi più spesso",
    directoryIntro:
      "Aggiungi questo sito ai preferiti per tornarci subito la prossima volta.",
    toolPromise:
      "AbsolTools rende gli strumenti online più usati più precisi e facili da usare. Aggiungi questo sito ai preferiti.",
    directorySearchLabel: "Cerca strumenti",
    directorySearchPlaceholder: "Cerca per nome, descrizione o parola chiave",
    directorySearchClear: "Cancella ricerca",
    directorySearchNoResults: "Nessuno strumento corrisponde alla ricerca.",
    directorySearchCount: "Strumenti trovati: {count}",
    available: "Disponibile",
    research: "Anteprima",
    reserve: "In valutazione",
    breadcrumbLabel: "Percorso di navigazione",
    encodingCategory: "Codifica e decodifica",
    categories: {
      encoding: "Codifica e decodifica",
      text: "Testo",
      data: "Dati",
      time: "Tempo",
    },
    footerNote: "Le funzioni più usate, più facili da usare.",
    catalogAria: "Elenco degli strumenti",
    useLightTheme: "Usa il tema chiaro",
    useDarkTheme: "Usa il tema scuro",
  },
};

export default itBundle;
