import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/fr";

export const frBundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Français",
    metaTitle: "Décodeur et encodeur Base64 — rapide, privé, en ligne",
    metaDescription:
      "Décodez du Base64 en texte ou en fichier et encodez du texte ou des fichiers en ligne. Compatible Base64URL, remplissage manquant, URI de données et anciens jeux de caractères.",
    decodeMetaTitle: "Décodeur Base64 pour texte et fichiers | AbsolTools",
    encodeMetaTitle: "Encodeur Base64 pour texte et fichiers | AbsolTools",
    skipToContent: "Aller au contenu",
    languageNavLabel: "Langue",
    legalNavLabel: "Informations légales et contact",
    modeLabel: "Mode de conversion",
    heading: "Décodez du Base64 en ligne.",
    subheading:
      "Collez du Base64 ou ouvrez un fichier. Base64 standard, Base64URL, remplissage manquant et URI de données sont traités localement.",
    encodeHeading: "Encodez du texte ou des fichiers en Base64.",
    encodeSubheading:
      "Saisissez du texte ou ouvrez un fichier. Convertissez du texte UTF-8 et des fichiers binaires en Base64 standard ou Base64URL, sans téléversement.",
    decode: "Décoder",
    encode: "Encoder",
    inputLabel: "Entrée Base64",
    outputLabel: "Résultat décodé",
    encodeInputLabel: "Texte ou fichier à encoder",
    encodeOutputLabel: "Résultat Base64",
    decodePlaceholder: "Exemple : SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Exemple : Bonjour, AbsolTools !",
    outputPlaceholder: "Le résultat apparaîtra ici.",
    openFile: "Ouvrir un fichier",
    runDecode: "Décoder maintenant",
    runEncode: "Encoder maintenant",
    options: "Options",
    detected: "Détecté",
    decodeComplete: "Décodage terminé",
    encodeComplete: "Encodage terminé",
    charset: "Encodage des caractères",
    variant: "Format Base64",
    auto: "Détection automatique",
    standard: "Standard",
    urlSafe: "Compatible URL",
    strict: "Validation stricte",
    lineByLine: "Décoder chaque ligne séparément",
    autoRepair: "Corriger les espaces et le remplissage",
    lenientRepair: "Supprimer les autres caractères non valides",
    outputView: "Format du résultat",
    text: "Texte",
    hex: "Hexadécimal",
    includePadding: "Inclure le remplissage =",
    mimeWrap: "Retour à la ligne tous les 76 caractères",
    dataUri: "Ajouter un préfixe d’URI de données",
    dropHint:
      "Déposez un fichier texte ou binaire n’importe où dans le convertisseur.",
    fileTooLarge: "L’entrée ne peut pas dépasser 100 Mio.",
    binaryOutput:
      "Données binaires détectées. Vérifiez le type du fichier et téléchargez-le plutôt que de l’exécuter directement.",
    executableWarning:
      "Fichier exécutable détecté. N’exécutez jamais un fichier décodé provenant d’une source non fiable.",
    imagePreview: "Aperçu de l’image",
    errors: {
      "empty-input": "Saisissez d’abord du texte ou ouvrez un fichier.",
      "invalid-character":
        "Cette valeur contient un caractère non valide en Base64.",
      "invalid-length":
        "La valeur Base64 est tronquée ou présente une longueur impossible.",
      "decode-failed": "Impossible de décoder la valeur.",
      "encode-failed": "Impossible d’encoder le fichier.",
      "unsupported-charset":
        "Votre navigateur ne prend pas en charge cet encodage de caractères.",
      "file-too-large":
        "Cette entrée dépasse la limite de sécurité de 100 Mio.",
    },
    repairs: {
      "data-uri-removed": "Préfixe d’URI de données supprimé",
      "whitespace-removed": "Espaces supprimés",
      "url-alphabet-normalized": "Alphabet Base64URL détecté",
      "padding-added": "Remplissage manquant ajouté",
      "invalid-characters-removed": "Caractères non valides supprimés",
    },
    guideTitle: "Comment décoder du Base64",
    guideIntro:
      "Base64 est un encodage, pas un chiffrement. Toute personne qui possède la valeur peut la décoder.",
    guideSteps: [
      "Collez une valeur Base64 ou ouvrez un fichier qui la contient.",
      "L’outil détecte le format et peut corriger des problèmes courants, comme les espaces ou le remplissage manquant.",
      "Copiez le texte lisible ou téléchargez le résultat binaire sous forme de fichier.",
    ],
    encodeGuideTitle: "Comment encoder en Base64",
    encodeGuideIntro:
      "Base64 représente du texte ou des octets binaires avec des caractères imprimables. Il ne chiffre ni ne protège les données d’origine.",
    encodeGuideSteps: [
      "Saisissez le texte ou ouvrez le fichier à encoder.",
      "Choisissez Base64 standard ou l’alphabet compatible URL, puis modifiez le remplissage ou les retours à la ligne uniquement si la destination l’exige.",
      "Copiez le résultat Base64 ou téléchargez-le comme fichier texte.",
    ],
    safetyTitle: "Votre saisie n’est pas enregistrée.",
    safetyBody:
      "Le site n’enregistre ni votre saisie ni les résultats et ne les envoie pas à un serveur. Tout est traité dans la session actuelle du navigateur et disparaît lorsque vous rechargez ou fermez la page.",
    detailsTitle: "Normes et traitement de l’entrée",
    detailsBody:
      "Par défaut, l’outil suit la RFC 4648 et accepte les alphabets standard et compatible URL, le remplissage facultatif, les espaces MIME et les préfixes d’URI de données. Activez la validation stricte lorsque le format exact est important.",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Base64 est-il un chiffrement ?",
        a: "Non. Base64 représente des données binaires sous forme de texte imprimable, sans assurer leur confidentialité ni leur authenticité.",
      },
      {
        q: "Pourquoi le résultat décodé est-il illisible ?",
        a: "Le résultat peut être un fichier, des données compressées ou chiffrées, ou du texte dans un autre encodage de caractères. Essayez de télécharger le fichier ou de choisir un autre encodage.",
      },
      {
        q: "Ce site téléverse-t-il ma saisie ?",
        a: "Non. La conversion s’effectue dans le navigateur. Vos saisies, fichiers et résultats ne sont pas envoyés à un serveur.",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 est-il un chiffrement ?",
        a: "Non. Base64 représente des données binaires sous forme de texte imprimable, sans assurer leur confidentialité ni leur authenticité.",
      },
      {
        q: "Faut-il utiliser Base64 standard ou Base64URL ?",
        a: "Utilisez Base64 standard pour les fichiers et les données générales. Utilisez Base64URL lorsque la valeur doit figurer sans risque dans une URL ou un nom de fichier.",
      },
      {
        q: "Ce site téléverse-t-il ma saisie ?",
        a: "Non. La conversion s’effectue dans le navigateur. Vos saisies, fichiers et résultats ne sont pas envoyés à un serveur.",
      },
    ],
    advertisement: "Publicité",
    integrationState: {
      enabled: "activés avec des contrôles de consentement",
      disabled: "désactivés",
    },
    legalNav: {
      about: "À propos",
      privacy: "Confidentialité",
      cookies: "Cookies",
      terms: "Conditions",
      contact: "Contact",
    },
    legal: {
      about: {
        title: "À propos",
        intro:
          "AbsolTools propose des outils en ligne pour les tâches liées au texte, aux données, au temps et à l’encodage.",
        sections: [
          {
            title: "Ce que nous créons",
            body: [
              "Chaque outil accomplit une tâche précise sans nécessiter de compte. Les saisies et les résultats sont traités dans votre navigateur.",
            ],
          },
          {
            title: "Contact",
            body: [
              "Envoyez vos questions, signalements d’erreurs et demandes relatives à la confidentialité à {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Politique de confidentialité",
        intro:
          "Cette politique distingue les saisies et résultats des outils des données du site, d’analyse et de publicité.",
        sections: [
          {
            title: "Saisies et résultats des outils",
            body: [
              "Les textes, fichiers, données JSON, dates et heures, octets décodés et résultats produits sont traités dans le navigateur. Ils ne sont ni envoyés ni enregistrés sur un serveur.",
            ],
          },
          {
            title: "Hébergement du site",
            body: [
              "{{host_provider}} héberge et protège ce site statique et peut traiter des données de connexion telles que l’adresse IP, l’heure de la requête, les informations du navigateur et l’URL demandée. La durée de conservation déclarée des journaux est {{host_log_retention}}. Politique du prestataire : {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analyse et publicité",
            body: [
              "Google Analytics et Google AdSense sont actuellement {{integration_state}}. S’ils sont activés, les informations relatives à l’appareil, à l’utilisation, aux cookies, au consentement, à la conservation et aux transferts internationaux seront décrites ici et gérées dans les paramètres de confidentialité. Par défaut, les saisies et résultats des outils sont exclus des événements d’analyse et de publicité.",
            ],
          },
          {
            title: "Cookies et collecte automatique",
            body: [
              "Les outils n’enregistrent ni saisies ni résultats dans des cookies ou dans le stockage du navigateur. Si vous choisissez un thème, le site conserve uniquement light ou dark dans le stockage local et ne transmet pas cette valeur. La technologie de sécurité de l’hébergeur peut utiliser uniquement le stockage strictement nécessaire lorsque le prestataire choisi le documente. Le stockage facultatif d’analyse et de publicité reste bloqué tant que ces intégrations sont désactivées.",
            ],
          },
          {
            title: "Conservation et suppression",
            body: [
              "L’exploitant ne conserve ni saisies ni résultats des outils. Les données de requête traitées par l’hébergeur suivent la durée de conservation indiquée ci-dessus. Les messages de contact sont conservés seulement le temps nécessaire pour répondre, respecter une obligation légale ou traiter un abus, puis ils sont supprimés ou anonymisés.",
            ],
          },
          {
            title: "Destinataires et transferts internationaux",
            body: [
              "L’hébergeur choisi peut traiter des données de requête hors de votre pays, dans les lieux et avec les garanties décrits dans sa politique. Avant d’activer l’analyse, la publicité, une plateforme de consentement ou tout autre destinataire, cette section indiquera les destinataires, pays, finalités, données, moments, méthodes, durées de conservation et fondements de transfert exigés par le droit applicable.",
            ],
          },
          {
            title: "Vos droits et nous contacter",
            body: [
              "Lorsque le droit applicable le prévoit, vous pouvez demander l’accès, la rectification, l’effacement, la limitation, l’opposition, la portabilité ou le retrait du consentement à {{email}}. Une vérification raisonnable peut être demandée avant de traiter votre demande.",
            ],
          },
          {
            title: "Mineurs, sécurité et modifications",
            body: [
              "Cet outil général destiné aux développeurs ne s’adresse pas aux enfants. Nous utilisons une architecture statique, un traitement local dans le navigateur et des politiques de navigateur restrictives pour réduire les risques, mais aucun service n’est entièrement sûr. Les modifications importantes de cette politique seront datées sur cette page. Date d’effet : {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Politique relative aux cookies",
        intro:
          "Les outils n’ont pas besoin de cookies pour traiter les saisies.",
        sections: [
          {
            title: "Utilisation actuelle",
            body: [
              "L’analyse et la publicité sont actuellement {{integration_state}}. Le site n’enregistre ni saisies ni résultats dans des cookies ou dans le stockage local. Seule la préférence de thème choisie, light ou dark, y est conservée et cette valeur n’est pas transmise.",
            ],
          },
          {
            title: "Si des intégrations sont activées",
            body: [
              "Une plateforme de consentement contrôlera le stockage nécessaire aux préférences, à l’analyse et à la publicité. Un réglage de confidentialité permanent permettra de revoir ou de retirer le consentement.",
            ],
          },
        ],
      },
      terms: {
        title: "Conditions d’utilisation",
        intro:
          "L’utilisation de cet outil gratuit est soumise aux présentes conditions.",
        sections: [
          {
            title: "Service",
            body: [
              "Le service est fourni en l’état, sans garantie d’exactitude, de disponibilité, d’adaptation à un usage particulier ou de fonctionnement ininterrompu. Vérifiez indépendamment tout résultat important.",
            ],
          },
          {
            title: "Utilisation sûre et licite",
            body: [
              "N’utilisez pas le service pour attaquer des systèmes, enfreindre la loi ou les droits de tiers, ni diffuser du contenu nuisible. N’exécutez jamais un fichier décodé provenant d’une source non fiable.",
            ],
          },
          {
            title: "Responsabilité et tiers",
            body: [
              "Dans la mesure permise par les règles impératives, l’exploitant n’est pas responsable des pertes indirectes ou consécutives. Les publicités et liens de tiers ne constituent pas une recommandation.",
            ],
          },
          {
            title: "Propriété intellectuelle et modifications",
            body: [
              "La conception du site et ses contenus explicatifs originaux sont protégés par le droit applicable. Vous restez responsable du contenu que vous traitez. Nous pouvons modifier ou interrompre des fonctionnalités et daterons les changements importants apportés aux conditions.",
            ],
          },
          {
            title: "Droit applicable et contact",
            body: [
              "Ce service est exploité depuis {{region}}. Droit applicable : {{governing_law}}. Juridiction compétente : {{jurisdiction}}. Les règles impératives de protection des consommateurs demeurent applicables. Contact : {{email}}. Date d’effet : {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contact",
        intro:
          "Nous recevons les questions, signalements d’erreurs, demandes relatives à la confidentialité et signalements d’abus.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Écrivez à {{email}}. N’incluez pas dans le message de saisies issues des outils, comme du texte confidentiel, du JSON, des valeurs Base64, des mots de passe, des clés privées ou des fichiers personnels.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Aperçu",
    ready: "Prêt",
    working: "Traitement en cours…",
    clear: "Effacer",
    copy: "Copier",
    copied: "Copié",
    copyFailed: "Impossible de copier le résultat.",
    processingFailed: "Le traitement a échoué. Réessayez.",
    download: "Télécharger",
    faqTitle: "Questions fréquentes",
    localTitle: "AbsolTools fonctionne dans votre navigateur.",
    localBody:
      "Vos saisies et résultats sont traités uniquement dans ce navigateur. Ils ne sont ni envoyés ni enregistrés sur un serveur.",
  },
  preview: {
    word: {
      title: "Compteur de mots et de caractères",
      description:
        "Comptez les mots, les caractères, les caractères sans espaces, les lignes et les paragraphes sans téléverser le texte.",
      inputLabel: "Texte",
      words: "Mots",
      characters: "Caractères",
      noWhitespace: "Caractères sans espaces",
      lines: "Lignes",
      paragraphs: "Paragraphes",
      completed: "Comptage terminé",
      approximate:
        "Ce navigateur ne propose pas Intl.Segmenter ; le nombre de mots et de caractères est donc approximatif.",
      tooLarge:
        "L’entrée dépasse 1 Mo. Raccourcissez ou effacez le texte pour continuer.",
      guideTitle: "Ce qui est compté",
      guideBody:
        "Dans les navigateurs compatibles, les caractères sont comptés comme des groupes de graphèmes perçus : un emoji ou une lettre avec des signes combinés compte donc généralement pour un caractère. Le total sans espaces ignore les graphèmes d’espacement du texte d’origine sans réunir leurs voisins. Les lignes suivent les sauts de ligne. Les lignes visuellement vides, y compris celles qui ne contiennent que des espaces, séparent les paragraphes.",
      faqs: [
        {
          q: "Comment les mots sont-ils comptés ?",
          a: "Les navigateurs dotés d’Intl.Segmenter utilisent la langue de cette page pour déterminer les limites de mots et comptent les segments assimilables à des mots. Les autres navigateurs affichent une estimation.",
        },
        {
          q: "Un emoji compte-t-il comme un caractère ?",
          a: "Dans les navigateurs compatibles, un emoji ou un caractère combiné qui paraît unique est compté une seule fois.",
        },
      ],
    },
    json: {
      title: "Formateur et validateur JSON",
      description:
        "Mettez en forme du JSON pour le rendre lisible, vérifiez les erreurs ou minifiez-le sur une seule ligne.",
      inputLabel: "JSON à traiter",
      outputLabel: "Résultat",
      placeholder: "Collez le JSON ici…",
      outputPlaceholder: "Le JSON formaté ou minifié apparaîtra ici.",
      openFile: "Ouvrir un fichier .json",
      tooLarge: "L’entrée dépasse 10 Mio.",
      manualRequired:
        "La validation automatique est suspendue pour cette entrée volumineuse. Choisissez Formater, Valider ou Minifier.",
      format: "Formater",
      validate: "Valider",
      validateHelpLabel: "À propos de la validation",
      validateHelp:
        "Vérifie que l’entrée respecte la syntaxe JSON de la RFC 8259 et indique la position et la cause de chaque erreur. Le texte n’est ni reformaté ni modifié.",
      minify: "Minifier",
      minifyHelpLabel: "À propos de la minification",
      minifyHelp:
        "Supprime les espaces et sauts de ligne facultatifs d’un JSON valide pour le rendre compact. Le contenu des chaînes, l’écriture originale des nombres et les clés d’objet en double sont conservés.",
      indent: "Indentation",
      twoSpaces: "2 espaces",
      fourSpaces: "4 espaces",
      tabs: "Tabulations",
      valid: "JSON valide",
      invalidAt: "{message} Ligne {line}, colonne {column}.",
      duplicate: "Clé en double à la ligne {line}, colonne {column}",
      bom: "La marque BOM UTF-8 a été supprimée avant le traitement.",
      errorMessages: {
        InvalidSymbol: "Symbole non valide.",
        InvalidNumberFormat: "Format de nombre non valide.",
        PropertyNameExpected: "Un nom de propriété est attendu.",
        ValueExpected: "Une valeur est attendue.",
        ColonExpected: "Un deux-points est attendu après le nom de propriété.",
        CommaExpected: "Une virgule est attendue entre les éléments.",
        CloseBraceExpected: "Une accolade fermante est attendue.",
        CloseBracketExpected: "Un crochet fermant est attendu.",
        EndOfFileExpected: "Du contenu inattendu suit la valeur JSON.",
        InvalidCommentToken: "Les commentaires ne sont pas admis en JSON.",
        UnexpectedEndOfComment: "Le commentaire est incomplet.",
        UnexpectedEndOfString: "La chaîne est incomplète.",
        UnexpectedEndOfNumber: "Le nombre est incomplet.",
        InvalidUnicode: "La séquence d’échappement Unicode n’est pas valide.",
        InvalidEscapeCharacter: "La séquence d’échappement n’est pas valide.",
        InvalidCharacter: "Ce caractère n’est pas valide à cet emplacement.",
        Unknown: "Le JSON n’est pas valide.",
      },
      guideTitle: "Règles JSON et conservation des nombres",
      guideBody:
        "La validation suit la RFC 8259 : commentaires, virgules finales et apostrophes sont signalés comme des erreurs. Les clés en double sont conservées avec un avertissement, et les grands nombres gardent exactement la notation saisie.",
      faqs: [
        {
          q: "Les grands nombres sont-ils modifiés ?",
          a: "Non. Le formatage et la minification ne recalculent pas les nombres : ils conservent la notation saisie sans arrondir les grandes valeurs.",
        },
        {
          q: "Pourquoi les clés en double sont-elles signalées ?",
          a: "Les logiciels peuvent traiter les clés en double de façons différentes. AbsolTools les conserve et affiche un avertissement au lieu de supprimer silencieusement des données.",
        },
        {
          q: "Le formateur corrige-t-il le JSON non valide ?",
          a: "Non. Les commentaires, virgules finales, apostrophes et autres syntaxes non valides sont signalés afin que vous corrigiez la source en connaissance de cause.",
        },
      ],
    },
    time: {
      title: "Convertisseur de timestamp Unix",
      description:
        "Convertissez un timestamp Unix en secondes ou millisecondes en date et heure dans le fuseau choisi, et inversement.",
      timestampMode: "Timestamp vers date et heure",
      dateMode: "Date et heure vers timestamp",
      timestampLabel: "Timestamp Unix",
      dateLabel: "Date et heure",
      datePlaceholder: "AAAA-MM-JJThh:mm",
      pickDate: "Choisir la date et l’heure",
      unit: "Unité",
      auto: "Détection automatique",
      seconds: "Secondes",
      milliseconds: "Millisecondes",
      zoneMode: "Fuseau horaire",
      utc: "Décalage UTC",
      local: "Fuseau du navigateur",
      selected: "Fuseau horaire IANA",
      zoneLabel: "Ville, région ou fuseau horaire IANA",
      zonePlaceholder: "Recherchez Paris, Europe ou Europe/Paris",
      popularZones: [
        { value: "Europe/Paris", label: "Paris, France · Europe/Paris" },
        {
          value: "Europe/Brussels",
          label: "Bruxelles, Belgique · Europe/Brussels",
        },
        { value: "Europe/Zurich", label: "Zurich, Suisse · Europe/Zurich" },
        {
          value: "Europe/London",
          label: "Londres, Royaume-Uni · Europe/London",
        },
        { value: "Europe/Madrid", label: "Madrid, Espagne · Europe/Madrid" },
        {
          value: "America/Montreal",
          label: "Montréal, Canada · America/Montreal",
        },
        {
          value: "America/New_York",
          label: "New York, États-Unis · America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, États-Unis · America/Los_Angeles",
        },
        { value: "Asia/Tokyo", label: "Tokyo, Japon · Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, Chine · Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapour · Asia/Singapore" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australie · Australia/Sydney",
        },
      ],
      offsetLabel: "Décalage par rapport à UTC",
      disambiguation: "Heure locale inexistante ou répétée",
      reject: "Afficher une erreur",
      earlier: "Utiliser le résultat antérieur",
      later: "Utiliser le résultat postérieur",
      now: "Maintenant",
      convert: "Convertir",
      instant: "Date et heure en UTC",
      zoned: "Date et heure dans le fuseau choisi",
      unixSeconds: "Timestamp Unix (secondes)",
      unixMilliseconds: "Timestamp Unix (millisecondes)",
      invalid:
        "Saisissez un timestamp Unix ou une date et heure ISO valide, puis vérifiez le fuseau horaire.",
      ambiguousUnit:
        "Les valeurs de 11 ou 12 chiffres sont ambiguës. Choisissez secondes ou millisecondes.",
      converted: "Conversion terminée",
      nonexistentTime:
        "Cette date et cette heure n’existent pas dans le fuseau choisi en raison du changement d’heure. Choisissez le résultat antérieur ou postérieur.",
      repeatedTime:
        "Cette date et cette heure se produisent deux fois dans le fuseau choisi en raison du changement d’heure. Choisissez le résultat antérieur ou postérieur.",
      y2038:
        "Cette valeur est hors de la plage d’un temps Unix entier signé sur 32 bits.",
      guideTitle: "Gestion des unités et des fuseaux horaires",
      guideBody:
        "La détection automatique interprète les décimaux et les entiers de 1 à 10 chiffres comme des secondes, les entiers de 13 chiffres comme des millisecondes et demande une unité pour 11 ou 12 chiffres. Saisissez une date et une heure locales ou utilisez le sélecteur ; secondes et fractions de seconde sont facultatives. Le fuseau du navigateur est utilisé par défaut. Pour un timestamp, le fuseau ne change que l’heure locale affichée. Pour une date et une heure locales, il détermine la valeur Unix.",
      faqs: [
        {
          q: "Comment fonctionne la détection automatique de l’unité ?",
          a: "Les décimaux et entiers de 1 à 10 chiffres sont traités comme des secondes, les entiers de 13 chiffres comme des millisecondes. Pour 11 ou 12 chiffres, choisissez une unité.",
        },
        {
          q: "Quel format de date et d’heure puis-je saisir ?",
          a: "Saisissez une date et une heure locales sans décalage UTC, par exemple 2026-08-29T14:30. Les secondes et jusqu’à neuf décimales sont facultatives ; vous pouvez aussi utiliser le sélecteur.",
        },
        {
          q: "Quelle est la différence entre les options de fuseau horaire ?",
          a: "Le fuseau du navigateur suit les réglages de l’appareil. Le décalage UTC est fixe, comme +01:00. Un fuseau IANA tel que Europe/Paris suit les règles régionales de changement d’heure.",
        },
        {
          q: "L’heure d’été peut-elle rendre un timestamp Unix ambigu ?",
          a: "Non. Un timestamp Unix désigne un instant unique. L’ambiguïté apparaît seulement lors de la conversion d’une heure locale dans un fuseau qui change d’heure : certaines heures n’existent pas et d’autres surviennent deux fois. Par défaut, l’outil affiche une erreur ; choisissez le résultat antérieur ou postérieur uniquement pour résoudre volontairement ce cas.",
        },
      ],
    },
    textCompare: {
      title: "Comparateur de textes",
      description:
        "Comparez deux textes ligne par ligne et repérez les ajouts, suppressions et modifications sans téléverser les versions.",
      originalLabel: "Texte original",
      changedLabel: "Texte modifié",
      originalPlaceholder: "Collez le texte original ici…",
      changedPlaceholder: "Collez le texte modifié ici…",
      compare: "Comparer",
      swap: "Inverser",
      results: "Résultat de la comparaison",
      empty:
        "Saisissez du texte d’au moins un côté pour lancer la comparaison.",
      tooLarge: "Chaque texte doit faire au maximum 1 Mio.",
      tooManyLines:
        "Les deux textes peuvent contenir au maximum 20 000 lignes au total.",
      tooComplex:
        "Cette comparaison est trop complexe pour être traitée en toute sécurité. Essayez avec des textes plus courts.",
      stale:
        "Le résultat ci-dessous correspond à la comparaison précédente. Relancez-la pour le mettre à jour.",
      complete: "Comparaison terminée",
      identical: "Les deux textes sont identiques.",
      approximate:
        "Ce navigateur ne propose pas Intl.Segmenter ; le surlignage des caractères est donc approximatif.",
      inlineLimited:
        "Certaines longues lignes modifiées sont signalées entièrement afin de préserver la réactivité de la comparaison.",
      additions: "Lignes ajoutées : {count}",
      deletions: "Lignes supprimées : {count}",
      changes: "Lignes modifiées : {count}",
      previousChange: "Modification précédente",
      nextChange: "Modification suivante",
      expandUnchanged: "Afficher {count} lignes inchangées",
      whitespaceChange: "Espaces modifiés",
      lineEndingChange: "Fin de ligne modifiée",
      unchangedRow: "Ligne inchangée",
      addedRow: "Ligne ajoutée",
      removedRow: "Ligne supprimée",
      changedRow: "Ligne modifiée",
      originalLine: "Ligne d’origine {line}",
      changedLine: "Ligne modifiée {line}",
      guideTitle: "Fonctionnement de la comparaison",
      guideBody:
        "La comparaison aligne d’abord les lignes, puis met en évidence les caractères modifiés dans les lignes correspondantes. Les changements portant uniquement sur les espaces ou les fins de ligne sont signalés. Les longues sections inchangées restent repliées jusqu’à leur ouverture.",
      faqs: [
        {
          q: "AbsolTools téléverse-t-il les textes ?",
          a: "Non. Les deux textes sont comparés localement dans le navigateur et ne sont pas envoyés à un serveur.",
        },
        {
          q: "L’outil détecte-t-il les différentes fins de ligne ?",
          a: "Oui. Les différences entre CRLF, LF et CR sont signalées même lorsque le texte visible de la ligne est identique.",
        },
      ],
    },
    caseConverter: {
      title: "Convertisseur de casse",
      description:
        "Convertissez du texte en majuscules, minuscules, casse de phrase ou avec une majuscule initiale à chaque mot, sans téléversement.",
      inputLabel: "Texte",
      outputLabel: "Texte converti",
      placeholder: "Saisissez ou collez du texte ici…",
      outputPlaceholder: "Le texte converti apparaîtra ici.",
      modeLabel: "Conversion",
      upper: "MAJUSCULES",
      lower: "minuscules",
      sentence: "Casse de phrase",
      capitalizeWords: "Initiales en majuscule",
      converted: "Conversion terminée",
      noChange: "Le texte correspond déjà à cette conversion.",
      outdated: "Le résultat affiché correspond à la saisie précédente.",
      tooLarge: "L’entrée dépasse 1 Mo.",
      guideTitle: "Fonctionnement de chaque conversion",
      guideBody:
        "Majuscules et minuscules utilisent les correspondances de casse Unicode habituelles. La casse de phrase met le texte en minuscules puis passe en majuscule la première lettre au début, après un saut de ligne ou après . ! ? 。 ！ ？. Initiales en majuscule transforme mécaniquement la première lettre de chaque mot tout en conservant espaces, ponctuation, sauts de ligne, apostrophes, traits d’union et tirets bas. Ces modes n’appliquent pas les règles typographiques françaises des titres ou des noms propres.",
      faqs: [
        {
          q: "Initiales en majuscule correspond-il à une casse de titre française ?",
          a: "Non. La conversion met mécaniquement l’initiale de chaque mot en majuscule sans appliquer de règles éditoriales aux articles, prépositions, noms propres ou abréviations.",
        },
        {
          q: "Les espaces et les sauts de ligne sont-ils conservés ?",
          a: "Oui. L’outil modifie uniquement la casse et conserve les espaces, la ponctuation et les sauts de ligne d’origine.",
        },
      ],
    },
  },
  examples: {
    wordInput:
      "Exemple : AbsolTools compte les mots et les caractères en ligne.",
    jsonInput: 'Exemple : {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Exemple : 1704067200 (secondes) ou 1704067200000 (millisecondes).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Format d’exemple : 2024-01-01T00:00. Les secondes sont facultatives ; vous pouvez aussi utiliser le sélecteur de date.",
    timeResult: "Valeur convertie",
  },
  catalog: {
    "base64-decode": {
      name: "Décodeur Base64",
      summary: "Décodez du texte ou des fichiers Base64 en ligne.",
      searchTerms: [
        "décoder",
        "décodage Base64",
        "Base64URL",
        "URI de données",
        "texte",
        "fichier",
        "binaire",
      ],
    },
    "base64-encode": {
      name: "Encodeur Base64",
      summary: "Encodez du texte ou des fichiers en Base64 en ligne.",
      searchTerms: [
        "encoder",
        "encodage Base64",
        "Base64URL",
        "URI de données",
        "texte",
        "fichier",
        "binaire",
      ],
    },
    "word-counter": {
      name: "Compteur de mots et de caractères",
      summary: "Comptez les mots, caractères, lignes et paragraphes en ligne.",
      searchTerms: [
        "compter les mots",
        "compteur de caractères",
        "nombre de signes",
        "lettres",
        "lignes",
        "paragraphes",
        "texte",
      ],
    },
    "json-formatter": {
      name: "Formateur JSON",
      summary: "Formatez, validez ou minifiez du JSON.",
      searchTerms: [
        "formater JSON",
        "validateur JSON",
        "embellir JSON",
        "minifier JSON",
        "vérifier JSON",
        "indentation",
      ],
    },
    "unix-timestamp-converter": {
      name: "Convertisseur de timestamp Unix",
      summary:
        "Convertissez un timestamp Unix en date et heure, en secondes ou millisecondes, et inversement.",
      searchTerms: [
        "temps Unix",
        "timestamp",
        "horodatage",
        "epoch",
        "secondes",
        "millisecondes",
        "date",
        "heure",
      ],
    },
    "text-compare": {
      name: "Comparateur de textes",
      summary:
        "Comparez deux textes ligne par ligne et repérez les différences.",
      searchTerms: [
        "comparer deux textes",
        "comparaison de texte",
        "différences",
        "comparer des lignes",
        "diff",
      ],
    },
    "case-converter": {
      name: "Convertisseur de casse",
      summary:
        "Transformez du texte en majuscules, minuscules ou autres casses.",
      searchTerms: [
        "convertisseur de casse",
        "majuscules",
        "minuscules",
        "changer la casse",
        "casse de phrase",
        "capitaliser",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Tous les outils",
    directoryMetaTitle:
      "AbsolTools | Des outils utiles, toujours à portée de main",
    directoryMetaDescription:
      "Formatez, convertissez, encodez, décodez, comparez et inspectez du texte, des données et du code directement dans votre navigateur. Les entrées et résultats ne sont pas téléversés.",
    directoryTitle:
      "Nous rendons les outils que vous utilisez souvent plus clairs et plus pratiques",
    directoryIntro:
      "Ajoutez ce site à vos favoris pour y accéder directement la prochaine fois.",
    toolPromise:
      "AbsolTools rend les outils en ligne courants plus précis et plus faciles à utiliser. Chaque tâche est traitée uniquement dans votre navigateur, sans être enregistrée séparément ni envoyée à un serveur. Ajoutez ce site à vos favoris.",
    directorySearchLabel: "Rechercher un outil",
    directorySearchPlaceholder: "Rechercher par nom, description ou mot-clé",
    directorySearchClear: "Effacer la recherche",
    directorySearchNoResults: "Aucun outil ne correspond à cette recherche.",
    directorySearchCount: "Outils trouvés : {count}",
    available: "Disponible",
    research: "Aperçu",
    reserve: "À l’étude",
    breadcrumbLabel: "Fil d’Ariane",
    encodingCategory: "Encodage et décodage",
    categories: {
      encoding: "Encodage et décodage",
      generator: "Générateurs",
      text: "Texte",
      converter: "Convertisseurs",
      image: "Images",
      data: "Données",
      calculator: "Calculatrices",
      time: "Temps",
    },
    footerNote: "Les fonctions les plus utilisées, plus faciles à utiliser.",
    catalogAria: "Répertoire des outils",
    useLightTheme: "Utiliser le thème clair",
    useDarkTheme: "Utiliser le thème sombre",
    relatedTools: "Outils associés",
  },
};

export default frBundle;
