import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("fr");

const seed = {
  locale: "fr",
  formatterSubnet: formatterSubnetFor("fr"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("fr"),
  dateCalculator: dateCalculatorFor("fr"),
  timeZoneConverter: timeZoneConverterFor("fr"),
  calculatorSuite: calculatorSuiteFor("fr"),
  uuidGenerator: uuidGeneratorFor("fr"),
  ui: {
    clear: "Effacer",
    copy: "Copier",
    download: "Télécharger",
    openFile: "Ouvrir un fichier",
    chooseImage: "Choisir une image",
    dropFile: "Déposez une image ici.",
    ready: "Prêt",
    working: "Traitement en cours…",
    complete: "Terminé",
    unchanged: "Aucune modification nécessaire",
    outdated: "Le résultat n’est plus à jour",
    copied: "Copié",
    copyFailed: "Échec de la copie",
    tooLarge:
      "L’entrée est trop volumineuse pour être traitée en toute sécurité.",
    failed: "Le traitement a échoué. Vérifiez l’entrée et réessayez.",
    resultHere: "Le résultat s’affichera ici.",
    localTitle: "Traitement uniquement dans ce navigateur",
    localBody:
      "Vos données et les résultats ne sont ni envoyés ni enregistrés. Ils restent dans cet onglet du navigateur.",
    guideTitle: "Comment utiliser {name}",
    safetyTitle: "Traitement privé et local",
    faqWhat: "À quoi sert l’outil « {name} » ?",
    faqPrivacy: "Mes données sont-elles envoyées ?",
    faqCheck: "Que faut-il vérifier avec l’outil « {name} » ?",
  },
  ai: {
    input: "Texte d’origine",
    output: "Texte nettoyé",
    placeholder:
      "Collez un texte susceptible de contenir des caractères Unicode invisibles.",
    run: "Supprimer les caractères invisibles",
    report: "Rapport de suppression",
    removed: "Caractères supprimés",
    normalized: "Espaces normalisés",
    noChanges: "Aucun des caractères invisibles ciblés n’a été trouvé.",
    count: "{count} supprimé(s)",
    advanced: "Options Unicode avancées",
    advancedWarning:
      "Ces options peuvent modifier l’orthographe, les emoji ou la forme des écritures. Activez-les uniquement si vous connaissez la structure du texte source.",
    joinControls: "Supprimer les ZWJ et ZWNJ",
    joinWarning:
      "Peut rompre les séquences d’emoji et la liaison des caractères arabes, persans ou indiens.",
    variationSelectors: "Supprimer les sélecteurs de variante",
    variationWarning: "Peut modifier l’apparence des emoji ou des glyphes CJK.",
    combiningMarks: "Supprimer les signes combinatoires",
    combiningWarning:
      "Peut supprimer des accents, des signes vocaliques et d’autres marques porteuses de sens.",
    noBreakSpaces: "Normaliser les espaces insécables",
    noBreakNote: "Convertit les espaces de type NBSP en espaces ordinaires.",
    kinds: [
      "Espace sans chasse",
      "Espace-mot insécable",
      "Indicateur d’ordre des octets",
      "Trait d’union conditionnel",
      "Commande bidirectionnelle",
      "Séparateur invisible",
      "Commande de liaison",
      "Sélecteur de variante",
      "Signe combinatoire",
      "Espace insécable ou espace tabulaire",
      "Espace fine insécable",
    ],
  },
  url: {
    mode: "Mode de conversion d’URL",
    encode: "Encoder",
    decode: "Décoder",
    encodeInput: "Texte ou URL à encoder",
    decodeInput: "Valeur d’URL encodée",
    encodeOutput: "Résultat encodé",
    decodeOutput: "Résultat décodé",
    encodePlaceholder: "Exemple : https://example.com/search?q=bonjour monde",
    decodePlaceholder: "Exemple : bonjour%20monde%3Fpage%3D1",
    scope: "Portée de l’encodage",
    component: "Composant d’URL",
    uri: "URI complète",
    formSpace: "Remplacer les espaces par + dans les données de formulaire",
    recursive: "Décoder plusieurs fois",
    passLimit: "Nombre maximal de passes",
    encoded: "Encodage de l’URL terminé",
    decoded: "Décodage de l’URL terminé",
    passCount: "Décodé en {count} passe(s)",
    limitReached: "Il reste des couches encodées après la limite de passes.",
    errors: [
      "Saisissez d’abord une valeur.",
      "Une séquence d’échappement avec pourcentage est incomplète ou incorrecte.",
      "Les octets décodés ne forment pas une chaîne UTF-8 valide.",
      "Choisissez une limite comprise entre 1 et 10 passes.",
    ],
  },
  hash: {
    input: "Texte ou fichier",
    placeholder:
      "Saisissez un texte pour calculer ses condensats SHA-256, SHA-512, SHA-1 et MD5.",
    results: "Valeurs de hachage",
    resultLabel: "Condensat {algorithm}",
    copyLabel: "Copier le condensat {algorithm}",
    fileSelected: "Sélectionné : {name} ({size})",
    drop: "Déposez un fichier ici pour calculer son condensat localement.",
    textTooLarge:
      "Le texte est trop volumineux pour cette session du navigateur.",
    fileTooLarge:
      "Le fichier dépasse la limite de sécurité du traitement local.",
    legacyWarning:
      "MD5 et SHA-1 sont proposés pour les contrôles de compatibilité, pas pour stocker des mots de passe ni concevoir de nouveaux systèmes de sécurité.",
    expectedChecksum: "Somme de contrôle attendue",
    checksumMatch: "Correspond",
    checksumMismatch: "Ne correspond pas",
    checksumInvalid: "Saisissez une somme hexadécimale prise en charge.",
    empty: "Saisissez du texte ou choisissez d’abord un fichier.",
    unavailable:
      "Ce navigateur ne peut pas calculer l’un des condensats demandés.",
  },
  jwt: {
    input: "Jeton JWT",
    placeholder: "Collez un JWT en trois parties : header.payload.signature",
    header: "En-tête",
    payload: "Charge utile",
    signature: "Signature",
    copyHeader: "Copier l’en-tête JWT décodé",
    copyPayload: "Copier la charge utile JWT décodée",
    copySignature: "Copier les octets de la signature JWT",
    signatureBytes: "{count} octets",
    timestamps: "Revendications temporelles",
    expires: "Expiration (exp)",
    notBefore: "Valide à partir de (nbf)",
    issuedAt: "Émis à (iat)",
    invalidTimestamp:
      "Cette revendication ne contient pas un horodatage numérique valide.",
    noTimestamps: "Aucune revendication exp, nbf ou iat n’a été trouvée.",
    noVerifyTitle: "Signature non vérifiée",
    noVerifyBody:
      "Le décodage révèle uniquement le contenu du jeton. Il ne prouve ni l’identité de l’émetteur ni la validité de la signature.",
    errors: [
      "Collez d’abord un JWT.",
      "Un JWT doit contenir exactement trois parties séparées par des points.",
      "L’en-tête du JWT est vide.",
      "La charge utile du JWT est vide.",
      "Un segment n’est pas un Base64URL valide.",
      "Un segment n’est pas une chaîne UTF-8 valide.",
      "L’en-tête n’est pas un JSON valide.",
      "La charge utile n’est pas un JSON valide.",
      "L’en-tête doit être un objet JSON.",
      "La charge utile doit être un objet JSON.",
    ],
  },
  qr: {
    input: "Texte ou URL",
    placeholder: "Saisissez le texte ou l’URL à placer dans le code QR.",
    preview: "Aperçu du code QR",
    previewEmpty: "Saisissez du contenu pour générer un code QR.",
    options: "Options du code QR",
    correction: "Correction d’erreurs",
    correctionLevels: [
      "Faible (L)",
      "Moyenne (M)",
      "Quartile (Q)",
      "Élevée (H)",
    ],
    quietZone: "Zone de silence",
    quietZones: ["Aucune", "2 modules", "4 modules (recommandé)", "8 modules"],
    generate: "Générer le code QR",
    png: "Télécharger en PNG",
    svg: "Télécharger en SVG",
    empty: "Saisissez d’abord du texte ou une URL.",
    tooLong: "Le contenu est trop long pour ce niveau de correction d’erreurs.",
    generationFailed: "Le code QR n’a pas pu être généré.",
    downloadFailed: "L’image n’a pas pu être préparée pour le téléchargement.",
    upload: "Image du code QR",
    formats: "PNG, JPEG, WebP, GIF ou BMP jusqu’à 10 Mo",
    camera: "Scanner par caméra",
    cameraHint:
      "Autorisez l’accès à la caméra pour scanner en continu. Les URL décodées ne sont jamais ouvertes automatiquement.",
    startCamera: "Démarrer la caméra",
    stopCamera: "Arrêter la caméra",
    scanResult: "Contenu décodé",
    scanPlaceholder: "Le texte scanné s’affichera ici.",
    urlDetected: "URL détectée",
    openUrl: "Ouvrir l’URL",
    urlDialogTitle: "Ouvrir cette URL ?",
    urlDialogBody:
      "Cette URL a été trouvée dans le code QR. Vérifiez qu’elle est sûre et qu’elle correspond au site attendu.",
    urlDialogDestination: "Adresse de destination",
    cancel: "Annuler",
    reading: "Lecture de l’image…",
    starting: "Démarrage de la caméra…",
    scanning: "Recherche d’un code QR…",
    invalidImage: "Choisissez une image valide dans un format pris en charge.",
    noCode: "Aucun code QR lisible n’a été trouvé dans cette image.",
    unsupported: "Ce navigateur ne permet pas de scanner avec la caméra.",
    denied: "L’accès à la caméra a été refusé.",
    unavailable: "Aucune caméra adaptée n’est disponible.",
    scanFailed: "Le code QR n’a pas pu être scanné.",
  },
  data: {
    convert: "Convertir",
    inputPlaceholder: "Collez les données sources ici.",
    outputPlaceholder: "Le résultat converti s’affichera ici.",
    drop: "Déposez ici un fichier texte pris en charge.",
    readFailed: "Le fichier n’a pas pu être lu.",
    errorAt: "{message} Ligne {line}, colonne {column}.",
    delimiter: "Séparateur CSV",
    auto: "Détecter automatiquement",
    comma: "Virgule (,)",
    semicolon: "Point-virgule (;)",
    tab: "Tabulation",
    pipe: "Barre verticale (|)",
    firstHeader: "Utiliser la première ligne comme en-tête",
    pretty: "Indenter le JSON",
    errors: [
      "Le CSV contient un guillemet non fermé ou un champ incorrect.",
      "Aucun tableau Markdown avec une ligne de séparation n’a été trouvé.",
      "Le tableau Markdown est incorrect.",
      "L’entrée n’est pas un JSON valide.",
      "Le JSON doit être un tableau d’objets.",
      "Un en-tête CSV est vide.",
      "Les en-têtes CSV doivent être uniques.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Suppresseur de filigranes IA et de caractères invisibles",
      description:
        "Nettoie le texte copié depuis ChatGPT, Claude, Gemini et d’autres sources en supprimant les caractères invisibles pris en charge, souvent appelés filigranes IA ; il ne prouve pas l’auteur du texte et ne garantit pas de contourner les détecteurs d’IA.",
      guide:
        "Collez le texte et examinez d’abord le résultat nettoyé, puis vérifiez le nom exact, le nombre et le point de code U+ de chaque caractère retiré. Les options susceptibles de modifier l’écriture sont désactivées par défaut.",
      terms: [
        "supprimer filigrane IA texte",
        "suppresseur de filigrane IA",
        "caractères invisibles ChatGPT",
        "caractères invisibles Claude",
        "caractères invisibles Gemini",
        "caractères cachés",
        "supprimer espace insécable",
        "nettoyer texte Unicode",
      ],
    },
    "url-encode": {
      title: "Encodeur d’URL",
      description:
        "Applique l’encodage en pourcentage standard à du texte, des valeurs de requête ou des URI complètes.",
      guide:
        "Choisissez composant d’URL pour une seule valeur de requête, ou URI complète pour conserver les séparateurs de l’adresse. N’utilisez le signe plus pour les espaces que dans les données de formulaire.",
      terms: [
        "encoder URL",
        "encodage pourcentage",
        "encodeURIComponent",
        "chaîne de requête",
      ],
    },
    "url-decode": {
      title: "Décodeur d’URL",
      description:
        "Décode les URL et les valeurs de requête encodées en pourcentage, y compris les encodages imbriqués avec un nombre de passages limité.",
      guide:
        "Collez la valeur encodée, choisissez sa portée et n’utilisez le décodage répété que si vous savez que la source contient plusieurs niveaux d’encodage.",
      terms: [
        "décoder URL",
        "décodage pourcentage",
        "decodeURIComponent",
        "chaîne de requête",
      ],
    },
    "hash-generator": {
      title: "Générateur de hash",
      description:
        "Calcule localement les empreintes SHA-256, SHA-512, SHA-1 et MD5 de textes ou de fichiers.",
      guide:
        "Saisissez du texte ou choisissez un fichier, puis comparez exactement l’algorithme requis. Les condensats servent à vérifier l’identité des données ; ils ne les chiffrent pas et ne sécurisent pas à eux seuls les mots de passe.",
      terms: [
        "SHA-256",
        "SHA-512",
        "MD5",
        "somme de contrôle",
        "empreinte fichier",
      ],
    },
    "jwt-decoder": {
      title: "Décodeur JWT",
      description:
        "Décode l’en-tête, la charge utile, les octets de signature et les revendications temporelles d’un JWT sans envoyer le jeton.",
      guide:
        "Examinez le JSON et les horodatages décodés, mais vérifiez la signature et les revendications dans le système qui détient la clé de signature. Le décodage seul n’établit aucune confiance.",
      terms: [
        "décodeur JWT",
        "JSON Web Token",
        "charge utile JWT",
        "en-tête JWT",
      ],
    },
    "qr-code-generator": {
      title: "Générateur de codes QR",
      description:
        "Crée un code QR statique conforme aux normes pour un texte ou une URL, à télécharger en PNG ou SVG.",
      guide:
        "Saisissez le contenu exact, conservez une zone de silence de quatre modules pour une lecture fiable et augmentez la correction d’erreurs si le code risque d’être partiellement masqué.",
      terms: ["générateur code QR", "QR PNG", "QR SVG", "QR statique"],
    },
    "qr-code-scanner": {
      title: "Scanner de codes QR",
      description:
        "Lit localement un code QR depuis une image ou la caméra, sans ouvrir automatiquement les liens décodés.",
      guide:
        "Utilisez une image nette et bien éclairée où toute la zone de silence est visible. Examinez et copiez la valeur décodée avant de décider si une URL est sûre.",
      terms: [
        "scanner code QR",
        "lire QR image",
        "lecteur QR caméra",
        "décoder QR",
      ],
    },
    "csv-to-markdown": {
      title: "Convertisseur CSV vers Markdown",
      description:
        "Transforme des lignes CSV en tableau Markdown propre avec détection du séparateur et échappement des cellules.",
      guide:
        "Vérifiez le séparateur et si la première ligne sert d’en-tête. Les cellules multilignes deviennent des sauts compatibles avec les tableaux et les barres verticales sont échappées.",
      inputLabel: "Entrée CSV",
      outputLabel: "Tableau Markdown",
      inputPlaceholder: "nom,score\nAlice,92",
      terms: ["CSV vers Markdown", "tableau Markdown", "convertisseur CSV"],
    },
    "markdown-to-csv": {
      title: "Convertisseur Markdown vers CSV",
      description:
        "Convertit un tableau Markdown en CSV conforme aux normes pour les tableurs et outils de données.",
      guide:
        "Ajoutez une ligne d’en-tête et une ligne de séparation au tableau Markdown, puis choisissez le séparateur demandé par l’application cible.",
      inputLabel: "Tableau Markdown",
      outputLabel: "Sortie CSV",
      inputPlaceholder: "| nom | score |\n| --- | --- |\n| Alice | 92 |",
      terms: [
        "Markdown vers CSV",
        "tableau vers CSV",
        "convertisseur Markdown",
      ],
    },
    "json-to-csv": {
      title: "Convertisseur JSON vers CSV",
      description:
        "Convertit un tableau d’objets JSON en CSV avec une union stable des clés de tous les objets.",
      guide:
        "Utilisez un tableau d’objets au niveau racine. Les valeurs imbriquées sont conservées sous forme de chaînes JSON compactes ; vérifiez comment le tableur cible doit les traiter.",
      inputLabel: "Tableau JSON",
      outputLabel: "Sortie CSV",
      inputPlaceholder: '[{"nom":"Alice","score":92}]',
      terms: [
        "JSON vers CSV",
        "tableau JSON vers CSV",
        "convertisseur de données",
      ],
    },
    "csv-to-json": {
      title: "Convertisseur CSV vers JSON",
      description:
        "Convertit un CSV en tableau d’objets JSON en utilisant la première ligne comme noms de champs.",
      guide:
        "Chaque en-tête doit être renseigné et unique. Vérifiez la détection du séparateur avant de convertir des données contenant des virgules, des guillemets ou des cellules multilignes.",
      inputLabel: "Entrée CSV",
      outputLabel: "Tableau JSON",
      inputPlaceholder: "nom,score\nAlice,92",
      terms: ["CSV vers JSON", "analyseur CSV", "tableau JSON"],
    },
    "html-to-markdown": {
      title: "Convertisseur HTML vers Markdown",
      description:
        "Convertit une structure HTML en Markdown lisible, notamment les titres, liens, listes, blocs de code et tableaux.",
      guide:
        "Collez le fragment HTML à convertir. Vérifiez les mises en page complexes et les contenus intégrés, car Markdown ne peut pas reproduire tous les comportements HTML.",
      inputLabel: "Entrée HTML",
      outputLabel: "Sortie Markdown",
      inputPlaceholder:
        "<h1>Titre</h1><p>Bonjour <strong>tout le monde</strong>.</p>",
      terms: [
        "HTML vers Markdown",
        "convertir HTML en Markdown",
        "convertisseur HTML Markdown",
      ],
    },
    "markdown-to-html": {
      title: "Convertisseur Markdown vers HTML",
      description:
        "Convertit du Markdown en HTML avec les tableaux GFM, les listes, les liens et les blocs de code.",
      guide:
        "Ne convertissez que le Markdown que vous comptez utiliser, puis assainissez de nouveau le HTML avant d’insérer une sortie non fiable dans une page web.",
      inputLabel: "Entrée Markdown",
      outputLabel: "Sortie HTML",
      inputPlaceholder: "# Titre\n\nBonjour **tout le monde**.",
      terms: ["Markdown vers HTML", "moteur de rendu Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
