import type { LocaleBundle } from "./bundle";

const bundle: LocaleBundle = {
  site: {
    languageName: "Español",
    metaTitle: "Decodificador y codificador Base64 — Rápido y privado",
    metaDescription:
      "Decodifica Base64 en texto o archivos y codifica texto o archivos en línea. Admite Base64URL, relleno ausente, URI de datos y varias codificaciones de caracteres.",
    decodeMetaTitle: "Decodificador Base64 de texto y archivos | AbsolTools",
    encodeMetaTitle: "Codificador Base64 de texto y archivos | AbsolTools",
    skipToContent: "Saltar al contenido",
    languageNavLabel: "Idioma",
    legalNavLabel: "Información legal y contacto",
    modeLabel: "Modo de conversión",
    heading: "Decodifica Base64 en línea.",
    subheading:
      "Pega texto Base64 o abre un archivo. Detectamos Base64 estándar, Base64URL, relleno ausente y URI de datos.",
    encodeHeading: "Codifica texto o archivos en Base64 en línea.",
    encodeSubheading:
      "Escribe un texto o abre un archivo. Convierte texto UTF-8 y archivos binarios a Base64 estándar o Base64URL sin subirlos a un servidor.",
    decode: "Decodificar",
    encode: "Codificar",
    inputLabel: "Entrada en Base64",
    outputLabel: "Resultado de la decodificación",
    encodeInputLabel: "Texto o archivo para codificar",
    encodeOutputLabel: "Resultado Base64",
    decodePlaceholder: "Ejemplo: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Ejemplo: Hello, AbsolTools!",
    outputPlaceholder: "El resultado aparecerá aquí.",
    openFile: "Abrir archivo",
    runDecode: "Decodificar ahora",
    runEncode: "Codificar ahora",
    options: "Opciones",
    detected: "Detectado",
    decodeComplete: "Decodificación completada",
    encodeComplete: "Codificación completada",
    charset: "Codificación de caracteres",
    variant: "Formato Base64",
    auto: "Detectar automáticamente",
    standard: "Estándar",
    urlSafe: "Compatible con URL",
    strict: "Validación estricta",
    lineByLine: "Decodificar cada línea por separado",
    autoRepair: "Corregir espacios y relleno",
    lenientRepair: "Eliminar otros caracteres no válidos",
    outputView: "Formato del resultado",
    text: "Texto",
    hex: "Hexadecimal",
    includePadding: "Incluir relleno (=)",
    mimeWrap: "Insertar un salto cada 76 caracteres",
    dataUri: "Añadir prefijo de URI de datos",
    dropHint: "Arrastra un archivo de texto o binario al conversor.",
    fileTooLarge: "El tamaño máximo de entrada es de 100 MiB.",
    binaryOutput:
      "Se han detectado datos binarios. Comprueba el tipo de archivo y descárgalo; no lo ejecutes directamente.",
    executableWarning:
      "Se ha detectado un archivo ejecutable. No ejecutes archivos decodificados que procedan de fuentes no fiables.",
    imagePreview: "Vista previa de imagen",
    errors: {
      "empty-input": "Introduce un texto o abre un archivo.",
      "invalid-character":
        "El valor contiene un carácter que no es válido en Base64.",
      "invalid-length":
        "El valor Base64 está incompleto o tiene una longitud no válida.",
      "decode-failed": "No se ha podido decodificar el valor.",
      "encode-failed": "No se ha podido codificar el archivo.",
      "unsupported-charset":
        "Este navegador no admite la codificación de caracteres seleccionada.",
      "file-too-large": "La entrada supera el límite de 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Se ha eliminado el prefijo de URI de datos",
      "whitespace-removed": "Se han eliminado los espacios",
      "url-alphabet-normalized": "Se ha detectado el formato Base64URL",
      "padding-added": "Se ha añadido el relleno ausente",
      "invalid-characters-removed":
        "Se han eliminado los caracteres no válidos",
    },
    guideTitle: "Cómo decodificar Base64",
    guideIntro:
      "Base64 es un sistema de codificación, no de cifrado. Cualquiera que tenga el valor puede decodificarlo.",
    guideSteps: [
      "Pega un valor Base64 o abre el archivo que lo contiene.",
      "La herramienta detecta el formato y aplica correcciones habituales, como eliminar espacios o restaurar el relleno ausente.",
      "Copia el texto legible o descarga el resultado binario como archivo.",
    ],
    encodeGuideTitle: "Cómo codificar Base64",
    encodeGuideIntro:
      "Base64 convierte texto o bytes binarios en caracteres imprimibles. No cifra ni protege los datos de origen.",
    encodeGuideSteps: [
      "Escribe el texto o abre el archivo que quieras codificar.",
      "Elige Base64 estándar o el alfabeto seguro para URL y ajusta el relleno o los saltos de línea solo cuando el destino lo requiera.",
      "Copia el resultado Base64 o descárgalo como archivo de texto.",
    ],
    safetyTitle: "Tus datos no se guardan.",
    safetyBody:
      "No guardamos los datos que introduces ni el resultado, y tampoco los enviamos a ningún servidor. Todo se procesa en la sesión actual del navegador y desaparece al recargar o cerrar la página.",
    detailsTitle: "Estándares y tratamiento de la entrada",
    detailsBody:
      "De forma predeterminada, la herramienta sigue RFC 4648 y admite alfabetos estándar y compatibles con URL, relleno opcional, espacios MIME y prefijos de URI de datos. Activa la validación estricta cuando necesites comprobar el formato exacto.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Base64 es un sistema de cifrado?",
        a: "No. Base64 representa datos binarios mediante texto imprimible, pero no proporciona confidencialidad ni autenticación.",
      },
      {
        q: "¿Por qué no puedo leer el resultado decodificado?",
        a: "El resultado puede ser un archivo, datos comprimidos o cifrados, o texto con otra codificación de caracteres. Prueba a descargar el archivo o a elegir otra codificación.",
      },
      {
        q: "¿Se envía mi entrada al servidor?",
        a: "No. La conversión se realiza en el navegador. La entrada, los archivos y los resultados no se suben a ningún servidor.",
      },
    ],
    encodeFaqs: [
      {
        q: "¿Base64 es un sistema de cifrado?",
        a: "No. Base64 representa datos binarios mediante texto imprimible, pero no proporciona confidencialidad ni autenticación.",
      },
      {
        q: "¿Debo usar Base64 estándar o Base64URL?",
        a: "Usa Base64 estándar para archivos y datos generales. Usa Base64URL cuando el valor deba incluirse de forma segura en una URL o un nombre de archivo.",
      },
      {
        q: "¿Se envía mi entrada al servidor?",
        a: "No. La conversión se realiza en el navegador. La entrada, los archivos y los resultados no se suben a ningún servidor.",
      },
    ],
    advertisement: "Publicidad",
    integrationState: {
      enabled: "activados con controles de consentimiento",
      disabled: "desactivados",
    },
    legalNav: {
      about: "Acerca de",
      privacy: "Privacidad",
      cookies: "Cookies",
      terms: "Términos",
      contact: "Contacto",
    },
    legal: {
      about: {
        title: "Acerca de este sitio",
        intro:
          "AbsolTools ofrece herramientas en línea para tareas de texto, datos, tiempo y codificación.",
        sections: [
          {
            title: "Qué ofrece",
            body: [
              "Cada herramienta se centra en una tarea sin exigir una cuenta. La entrada y los resultados se procesan en el navegador.",
            ],
          },
          {
            title: "Contacto",
            body: [
              "Envía preguntas, informes de errores y solicitudes de privacidad a {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Política de privacidad",
        intro:
          "Esta política distingue el contenido introducido y los resultados de los datos relacionados con el funcionamiento del sitio, la analítica y la publicidad.",
        sections: [
          {
            title: "Contenido introducido y resultados",
            body: [
              "El texto, los archivos, el JSON, las fechas y horas, los bytes decodificados y los resultados generados se procesan en el navegador. El contenido introducido y los resultados no se envían ni se guardan en ningún servidor.",
            ],
          },
          {
            title: "Prestación del sitio",
            body: [
              "{{host_provider}} sirve y protege este sitio estático y puede tratar datos de conexión, como la dirección IP, la hora de la solicitud, la información del navegador y la URL solicitada. El periodo de conservación de registros configurado es {{host_log_retention}}. Política del proveedor: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analítica y publicidad",
            body: [
              "Google Analytics y Google AdSense están actualmente {{integration_state}}. Si se activan, esta política explicará el tratamiento de datos del dispositivo y de uso, cookies, consentimiento, conservación y transferencias internacionales, y ofrecerá controles de privacidad. El contenido introducido y los resultados quedan excluidos de los eventos de analítica y publicidad por diseño.",
            ],
          },
          {
            title: "Cookies y recogida automática",
            body: [
              "Las herramientas no guardan el contenido introducido ni los resultados en cookies o almacenamiento del navegador. Si eliges un tema, el sitio guarda únicamente el valor claro u oscuro en el almacenamiento local y no lo transmite. Si las funciones de seguridad del alojamiento emplean almacenamiento estrictamente necesario, publicaremos la configuración y el inventario reales. El almacenamiento opcional de analítica y publicidad permanece bloqueado mientras esas integraciones estén desactivadas.",
            ],
          },
          {
            title: "Conservación y eliminación",
            body: [
              "El operador no conserva el contenido introducido ni los resultados. Los datos de las solicitudes al alojamiento se conservan durante el periodo indicado anteriormente. La correspondencia se guarda solo el tiempo necesario para responder, cumplir obligaciones legales o gestionar usos indebidos; después se elimina o anonimiza.",
            ],
          },
          {
            title: "Destinatarios y transferencias internacionales",
            body: [
              "El proveedor de alojamiento seleccionado puede tratar datos de las solicitudes fuera de tu país, en las ubicaciones y con las garantías descritas en su política. Antes de activar analítica, publicidad, un gestor de consentimiento u otro destinatario, esta sección identificará al destinatario, los países, la finalidad, los datos, el momento y método de la transferencia, el plazo de conservación y la base jurídica aplicable.",
            ],
          },
          {
            title: "Tus derechos y contacto",
            body: [
              "Cuando corresponda, puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad, así como retirar tu consentimiento, escribiendo a {{email}}. Podemos solicitar una verificación razonable antes de tramitar la petición.",
            ],
          },
          {
            title: "Menores, seguridad y cambios",
            body: [
              "Esta herramienta general para desarrolladores no está dirigida a menores. La arquitectura estática, el procesamiento en el navegador y las políticas restrictivas reducen el riesgo, pero ningún servicio es completamente seguro. Los cambios importantes se publicarán aquí con su fecha. Fecha de entrada en vigor: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Política de cookies",
        intro:
          "Las herramientas no necesitan cookies para procesar la entrada.",
        sections: [
          {
            title: "Uso actual",
            body: [
              "La analítica y la publicidad están actualmente {{integration_state}}. El contenido introducido y los resultados no se guardan en cookies ni almacenamiento local. Solo se guarda la preferencia de tema elegida (claro u oscuro) en el almacenamiento local; este valor no se transmite.",
            ],
          },
          {
            title: "Si se activan integraciones",
            body: [
              "Una plataforma de consentimiento controlará el almacenamiento necesario para las preferencias, la analítica y la publicidad. Un control de privacidad permanente permitirá revisar o retirar el consentimiento.",
            ],
          },
        ],
      },
      terms: {
        title: "Términos de uso",
        intro:
          "El uso de esta herramienta gratuita está sujeto a las siguientes condiciones.",
        sections: [
          {
            title: "Servicio",
            body: [
              "El servicio se proporciona tal cual, sin garantías de exactitud, disponibilidad, idoneidad para un fin concreto o funcionamiento ininterrumpido. Verifica de forma independiente cualquier resultado importante.",
            ],
          },
          {
            title: "Uso lícito y seguro",
            body: [
              "No utilices el servicio para atacar sistemas, infringir la ley o los derechos de terceros, ni distribuir contenido dañino. No ejecutes archivos recuperados de fuentes no fiables.",
            ],
          },
          {
            title: "Responsabilidad y terceros",
            body: [
              "En la medida permitida por la legislación aplicable, el operador no será responsable de daños indirectos o consecuentes. Los anuncios y enlaces de terceros no implican respaldo ni recomendación.",
            ],
          },
          {
            title: "Propiedad intelectual y cambios",
            body: [
              "El diseño del sitio y el contenido explicativo original están protegidos por la legislación aplicable. Eres responsable del contenido que procesas. Podemos modificar o retirar funciones y publicaremos la fecha de cualquier cambio importante en estos términos.",
            ],
          },
          {
            title: "Ley aplicable y contacto",
            body: [
              "Este servicio se gestiona desde {{region}}. Ley aplicable: {{governing_law}}. Jurisdicción: {{jurisdiction}}. Se mantienen las protecciones obligatorias del consumidor. Contacto {{email}}. Vigente desde: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contacto",
        intro:
          "Puedes enviarnos preguntas, informes de errores, solicitudes de privacidad y avisos de uso indebido.",
        sections: [
          {
            title: "Correo electrónico",
            body: [
              "Escribe a {{email}}. No incluyas contenido de las herramientas, como texto, JSON o valores Base64 sensibles, contraseñas, claves privadas o archivos personales.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Versión preliminar",
    ready: "Listo",
    working: "Procesando…",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "No se pudo copiar el resultado.",
    processingFailed: "No se pudo procesar. Inténtalo de nuevo.",
    download: "Descargar",
    faqTitle: "Preguntas frecuentes",
    localTitle: "AbsolTools funciona en tu navegador.",
    localBody:
      "La entrada y los resultados se procesan únicamente en este navegador. No se envían ni se guardan en ningún servidor.",
  },
  preview: {
    word: {
      title: "Contador de palabras y caracteres",
      description:
        "Cuenta palabras, caracteres, caracteres sin espacios en blanco, líneas y párrafos sin subir el texto a un servidor.",
      inputLabel: "Texto",
      words: "Palabras",
      characters: "Caracteres",
      noWhitespace: "Caracteres sin espacios en blanco",
      lines: "Líneas",
      paragraphs: "Párrafos",
      completed: "Recuento completado",
      approximate:
        "Este navegador no admite Intl.Segmenter; los recuentos son aproximados.",
      tooLarge:
        "La entrada supera el límite de 1 MB. Acorta o borra el texto para continuar.",
      guideTitle: "Qué se cuenta",
      guideBody:
        "En navegadores compatibles, los caracteres se cuentan como unidades percibidas completas, por lo que un emoji o una letra con marcas combinadas suele contar como uno. El recuento sin espacios omite del texto original las unidades que son espacios en blanco, sin unir los caracteres de ambos lados. Las líneas se cuentan según los saltos de línea. Los párrafos se separan por líneas visualmente vacías, incluidas las que solo contienen espacios en blanco.",
      faqs: [
        {
          q: "¿Cómo se cuentan las palabras?",
          a: "Los navegadores con Intl.Segmenter usan el idioma de la página actual para establecer los límites de palabra y cuentan los segmentos que forman palabras. En otros navegadores se muestra una aproximación.",
        },
        {
          q: "¿Los emoji cuentan como caracteres?",
          a: "En navegadores compatibles, un emoji o carácter combinado que se ve como una sola unidad cuenta una vez.",
        },
      ],
    },
    json: {
      title: "Formateador JSON",
      description:
        "Formatea JSON para que sea fácil de leer, comprueba si tiene errores o minifícalo en una sola línea.",
      inputLabel: "Entrada JSON",
      outputLabel: "Resultado",
      placeholder: "Pega JSON aquí…",
      outputPlaceholder: "El JSON formateado o minificado aparecerá aquí.",
      openFile: "Abrir .json",
      tooLarge: "La entrada supera el límite de 10 MiB.",
      manualRequired:
        "La validación automática se ha pausado por el tamaño. Elige Formatear, Validar o Minificar.",
      format: "Formatear",
      validate: "Validar",
      validateHelpLabel: "Ayuda sobre Validar",
      validateHelp:
        "Comprueba si la entrada se ajusta a la sintaxis JSON definida en RFC 8259 e indica la ubicación y la causa de cualquier error. No formatea ni modifica el texto.",
      minify: "Minificar",
      minifyHelpLabel: "Ayuda sobre Minificar",
      minifyHelp:
        "Quita de un JSON válido los espacios y saltos de línea que no afectan a los datos para dejarlo en una sola línea. Conserva el contenido de las cadenas, la forma exacta de los números y las claves duplicadas.",
      indent: "Sangría",
      twoSpaces: "2 espacios",
      fourSpaces: "4 espacios",
      tabs: "Tabuladores",
      valid: "JSON válido",
      invalidAt: "{message} Línea {line}, columna {column}.",
      duplicate: "Clave duplicada en línea {line}, columna {column}",
      bom: "Se eliminó la marca BOM UTF-8 antes de procesar.",
      errorMessages: {
        InvalidSymbol: "El símbolo no es válido.",
        InvalidNumberFormat: "El formato del número no es válido.",
        PropertyNameExpected: "Falta el nombre de una propiedad.",
        ValueExpected: "Falta un valor.",
        ColonExpected: "Falta un signo de dos puntos tras la propiedad.",
        CommaExpected: "Falta una coma entre elementos.",
        CloseBraceExpected: "Falta una llave de cierre.",
        CloseBracketExpected: "Falta un corchete de cierre.",
        EndOfFileExpected: "Hay contenido inesperado después del valor JSON.",
        InvalidCommentToken: "JSON no admite comentarios.",
        UnexpectedEndOfComment: "El comentario está incompleto.",
        UnexpectedEndOfString: "La cadena está incompleta.",
        UnexpectedEndOfNumber: "El número está incompleto.",
        InvalidUnicode: "La secuencia Unicode no es válida.",
        InvalidEscapeCharacter: "La secuencia de escape no es válida.",
        InvalidCharacter: "Este carácter no es válido aquí.",
        Unknown: "El JSON no es válido.",
      },
      guideTitle: "Reglas de JSON y conservación de números",
      guideBody:
        "La validación sigue RFC 8259: los comentarios, las comas finales y las comillas simples se señalan como errores. Las claves duplicadas se conservan con un aviso y los números grandes mantienen exactamente la forma en que se escribieron.",
      faqs: [
        {
          q: "¿Cambian los números grandes?",
          a: "No. El formateo y la minificación no recalculan los números; conservan la forma en que los escribiste, por lo que los números grandes no se redondean.",
        },
        {
          q: "¿Por qué se avisa de las claves duplicadas?",
          a: "Cada programa puede tratar las claves duplicadas de forma distinta. AbsolTools las conserva y muestra un aviso en lugar de borrar datos sin indicarlo.",
        },
        {
          q: "¿Se repara automáticamente el JSON no válido?",
          a: "No. Se indican los comentarios, comas finales, comillas simples y otros errores para que puedas corregir el origen de forma deliberada.",
        },
      ],
    },
    time: {
      title: "Conversor de timestamp Unix",
      description:
        "Convierte timestamps Unix en segundos o milisegundos a fechas y horas de una zona elegida, y viceversa.",
      timestampMode: "De timestamp a fecha y hora",
      dateMode: "De fecha y hora a timestamp",
      timestampLabel: "Timestamp Unix",
      dateLabel: "Fecha y hora",
      datePlaceholder: "AAAA-MM-DDTHH:mm",
      pickDate: "Elegir fecha y hora",
      unit: "Unidad",
      auto: "Detección automática",
      seconds: "Segundos",
      milliseconds: "Milisegundos",
      zoneMode: "Zona horaria",
      utc: "Desfase UTC",
      local: "Zona horaria del navegador",
      selected: "Zona horaria IANA",
      zoneLabel: "Ciudad, región o zona horaria IANA",
      zonePlaceholder: "Busca Madrid, Europe o Europe/Madrid",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seúl, Corea del Sur — Asia/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "Nueva York, Estados Unidos — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Ángeles, Estados Unidos — America/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "Londres, Reino Unido — Europe/London",
        },
        {
          value: "Europe/Paris",
          label: "París, Francia — Europe/Paris",
        },
        {
          value: "Europe/Madrid",
          label: "Madrid, España — Europe/Madrid",
        },
        {
          value: "Asia/Tokyo",
          label: "Tokio, Japón — Asia/Tokyo",
        },
        {
          value: "Asia/Shanghai",
          label: "Shanghái, China — Asia/Shanghai",
        },
        {
          value: "Asia/Singapore",
          label: "Singapur — Asia/Singapore",
        },
        {
          value: "Asia/Kolkata",
          label: "Calcuta, India — Asia/Kolkata",
        },
        {
          value: "Australia/Sydney",
          label: "Sídney, Australia — Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, Nueva Zelanda — Pacific/Auckland",
        },
      ],
      offsetLabel: "Desfase respecto de UTC",
      disambiguation: "Cómo resolver cambios de hora",
      reject: "Mostrar un error",
      earlier: "Elegir el instante anterior",
      later: "Elegir el instante posterior",
      now: "Hora actual",
      convert: "Convertir",
      instant: "Fecha y hora ISO (UTC)",
      zoned: "Fecha y hora en la zona elegida",
      unixSeconds: "Timestamp Unix (segundos)",
      unixMilliseconds: "Timestamp Unix (milisegundos)",
      converted: "Conversión completada",
      invalid:
        "Introduce un timestamp Unix válido o una fecha y hora válidas en formato ISO, y comprueba la zona horaria.",
      ambiguousUnit:
        "Los valores de 11–12 dígitos son ambiguos. Elige segundos o milisegundos.",
      nonexistentTime:
        "Esta fecha y hora no es válida en la zona elegida porque el reloj se adelanta. Elige el instante anterior o posterior.",
      repeatedTime:
        "Esta fecha y hora es ambigua en la zona elegida porque el reloj se atrasa. Elige el instante anterior o posterior.",
      y2038:
        "Este valor está fuera del intervalo representable por un tiempo Unix de 32 bits con signo.",
      guideTitle: "Cómo se tratan las unidades y las zonas horarias",
      guideBody:
        "La detección automática interpreta los decimales y los enteros de 1–10 dígitos como segundos, los enteros de 13 dígitos como milisegundos y pide elegir la unidad para valores de 11–12 dígitos. Puedes escribir una fecha y hora local o usar el selector; los segundos y sus fracciones son opcionales. De forma predeterminada se usa la zona horaria del navegador. Al convertir un timestamp, la zona horaria solo cambia la fecha y hora local que se muestra. Al convertir una fecha y hora local, la zona determina el valor Unix.",
      faqs: [
        {
          q: "¿Cómo se detecta la unidad automáticamente?",
          a: "Los decimales y los enteros de 1–10 dígitos se tratan como segundos. Los enteros de 13 dígitos se tratan como milisegundos. Para 11–12 dígitos debes elegir la unidad.",
        },
        {
          q: "¿Qué formato de fecha y hora puedo escribir?",
          a: "Introduce una fecha y hora local sin desfase UTC, como 2026-08-29T14:30. Los segundos y hasta nueve cifras decimales son opcionales; también puedes usar el selector.",
        },
        {
          q: "¿En qué se diferencian las opciones de zona horaria?",
          a: "La zona horaria del navegador es la opción predeterminada y sigue las reglas configuradas en el dispositivo. Elige Desfase UTC para usar un valor fijo, como +00:00 o +05:30. Una zona IANA como Europe/Madrid aplica las reglas de cambio de hora de esa región.",
        },
        {
          q: "¿El horario de verano puede hacer ambiguo un timestamp Unix?",
          a: "No. Un timestamp Unix identifica un instante único. La ambigüedad solo aparece al convertir una fecha y hora local en una zona que cambia el reloj: algunas horas se omiten y otras aparecen dos veces. La herramienta muestra un error de forma predeterminada; elige el instante anterior o posterior solo si quieres resolverlo.",
        },
      ],
    },
    textCompare: {
      title: "Comparador de textos",
      description:
        "Compara dos textos línea por línea y señala adiciones, eliminaciones y cambios sin subirlos a un servidor.",
      originalLabel: "Texto original",
      changedLabel: "Texto modificado",
      originalPlaceholder: "Pega aquí el texto original…",
      changedPlaceholder: "Pega aquí el texto modificado…",
      compare: "Comparar",
      swap: "Intercambiar",
      results: "Resultados de la comparación",
      empty: "Introduce texto en al menos uno de los lados para comparar.",
      tooLarge: "Cada texto debe ocupar 1 MiB o menos.",
      tooManyLines:
        "Los dos textos pueden contener hasta 20.000 líneas en total.",
      tooComplex:
        "La comparación es demasiado compleja para procesarla de forma segura. Prueba con textos más cortos.",
      stale:
        "El resultado inferior corresponde a la comparación anterior. Vuelve a comparar para actualizarlo.",
      complete: "Comparación completada",
      identical: "Los dos textos son idénticos.",
      approximate:
        "Este navegador no admite Intl.Segmenter; el resaltado de caracteres es aproximado.",
      inlineLimited:
        "Algunas líneas largas se muestran como cambios de línea completa para mantener una respuesta fluida.",
      additions: "Líneas añadidas: {count}",
      deletions: "Líneas eliminadas: {count}",
      changes: "Filas modificadas: {count}",
      previousChange: "Cambio anterior",
      nextChange: "Cambio siguiente",
      expandUnchanged: "Mostrar {count} líneas sin cambios",
      whitespaceChange: "Espacios modificados",
      lineEndingChange: "Fin de línea modificado",
      unchangedRow: "Línea sin cambios",
      addedRow: "Línea añadida",
      removedRow: "Línea eliminada",
      changedRow: "Línea modificada",
      originalLine: "Línea original {line}",
      changedLine: "Línea modificada {line}",
      guideTitle: "Cómo funciona la comparación",
      guideBody:
        "La herramienta alinea primero las líneas y después resalta los cambios de caracteres dentro de las líneas emparejadas. También identifica cambios solo de espacios o de fin de línea. Los tramos largos sin cambios permanecen plegados hasta que los abras.",
      faqs: [
        {
          q: "¿AbsolTools sube los textos a un servidor?",
          a: "No. Los dos textos se comparan localmente en el navegador y no se envían a un servidor.",
        },
        {
          q: "¿Detecta distintos fines de línea?",
          a: "Sí. Las diferencias entre CRLF, LF y CR se marcan aunque el texto visible de la línea sea el mismo.",
        },
      ],
    },
    caseConverter: {
      title: "Conversor de mayúsculas y minúsculas",
      description:
        "Convierte texto a mayúsculas, minúsculas, formato oración o iniciales de palabra sin subirlo a un servidor.",
      inputLabel: "Texto",
      outputLabel: "Texto convertido",
      placeholder: "Escribe o pega el texto aquí…",
      outputPlaceholder: "El texto convertido aparece aquí.",
      modeLabel: "Conversión",
      upper: "MAYÚSCULAS",
      lower: "minúsculas",
      sentence: "Formato oración",
      capitalizeWords: "Iniciales de palabra",
      converted: "Conversión completada",
      noChange: "El texto ya coincide con esta conversión.",
      outdated: "El resultado visible corresponde a la entrada anterior.",
      tooLarge: "La entrada supera el límite de 1 MB.",
      guideTitle: "Cómo funciona cada conversión",
      guideBody:
        "Mayúsculas y minúsculas usan las asignaciones predeterminadas de Unicode. Formato oración pasa el texto a minúsculas y pone en mayúscula la primera letra con caja al inicio, después de un salto de línea o después de . ! ? 。 ！ ？. Iniciales de palabra pone en mayúscula la primera letra con caja de cada palabra y conserva espacios, signos, saltos de línea, apóstrofos, guiones y guiones bajos.",
      faqs: [
        {
          q: "¿Iniciales de palabra aplica las reglas de los títulos?",
          a: "No. Convierte cada palabra de forma mecánica y no aplica reglas lingüísticas para artículos, preposiciones, nombres o abreviaturas.",
        },
        {
          q: "¿Se conservan los espacios y saltos de línea?",
          a: "Sí. La herramienta solo cambia las mayúsculas y minúsculas; conserva los espacios, signos y saltos de línea originales.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Ejemplo: AbsolTools cuenta palabras y caracteres en línea.",
    jsonInput: 'Ejemplo: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "Ej.: 1704067200 (segundos) o 1704067200000 (milisegundos).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Formato de ejemplo: 2024-01-01T00:00. Los segundos son opcionales y también puedes usar el selector.",
    timeResult: "Valor convertido",
  },
  catalog: {
    "base64-decode": {
      name: "Decodificador Base64",
      summary: "Decodifica texto o archivos Base64 en línea.",
      searchTerms: [
        "decodificar",
        "decodificador",
        "Base64URL",
        "URI de datos",
        "texto",
        "archivo",
        "binario",
      ],
    },
    "base64-encode": {
      name: "Codificador Base64",
      summary: "Codifica texto o archivos en Base64 en línea.",
      searchTerms: [
        "codificar",
        "codificador",
        "Base64URL",
        "URI de datos",
        "texto",
        "archivo",
        "binario",
      ],
    },
    "word-counter": {
      name: "Contador de palabras y caracteres",
      summary: "Cuenta palabras, caracteres, líneas y párrafos en línea.",
      searchTerms: [
        "contar palabras",
        "contar caracteres",
        "letras",
        "líneas",
        "párrafos",
        "texto",
      ],
    },
    "json-formatter": {
      name: "Formateador JSON",
      summary:
        "Haz que el JSON sea fácil de leer, comprueba si tiene errores o minifícalo en una sola línea.",
      searchTerms: [
        "formatear JSON",
        "validar JSON",
        "minificar JSON",
        "JSON legible",
        "datos",
      ],
    },
    "unix-timestamp-converter": {
      name: "Conversor de timestamp Unix",
      summary:
        "Convierte timestamps Unix en segundos o milisegundos a fechas y horas, y viceversa.",
      searchTerms: [
        "tiempo Unix",
        "epoch",
        "época Unix",
        "segundos",
        "milisegundos",
        "fecha",
        "hora",
      ],
    },
    "text-compare": {
      name: "Comparador de textos",
      summary: "Compara dos textos línea por línea y resalta sus diferencias.",
      searchTerms: [
        "comparar textos",
        "diferencias",
        "comparar líneas",
        "diff",
      ],
    },
    "case-converter": {
      name: "Conversor de mayúsculas y minúsculas",
      summary:
        "Convierte texto a mayúsculas, minúsculas, formato oración o iniciales de palabra.",
      searchTerms: [
        "mayúsculas",
        "minúsculas",
        "formato oración",
        "capitalizar",
        "texto",
      ],
    },
  },
  network: {
    allTools: "Todas las herramientas",
    directoryMetaTitle: "Herramientas en línea para texto y datos | AbsolTools",
    directoryMetaDescription:
      "Resuelve tareas de texto, datos, tiempo y codificación en línea.",
    directoryTitle: "Encuentra la herramienta que necesitas.",
    directoryIntro:
      "Hacemos que las herramientas en línea más utilizadas sean más sencillas y cómodas de usar. Añade este sitio a tus favoritos.",
    toolPromise:
      "AbsolTools hace que las herramientas en línea más utilizadas sean más precisas y fáciles de usar. Añade este sitio a tus favoritos.",
    directorySearchLabel: "Buscar herramientas",
    directorySearchPlaceholder: "Busca por nombre, descripción o palabra clave",
    directorySearchClear: "Borrar búsqueda",
    directorySearchNoResults:
      "No hay herramientas que coincidan con la búsqueda.",
    directorySearchCount: "Herramientas coincidentes: {count}",
    available: "Disponible",
    research: "Versión preliminar",
    reserve: "En evaluación",
    breadcrumbLabel: "Ruta de navegación",
    encodingCategory: "Codificación y decodificación",
    categories: {
      encoding: "Codificación y decodificación",
      text: "Texto",
      data: "Datos",
      time: "Tiempo",
    },
    footerNote: "Funciones populares, más fáciles de usar.",
    catalogAria: "Directorio de herramientas",
    useLightTheme: "Usar tema claro",
    useDarkTheme: "Usar tema oscuro",
  },
};

export default bundle;
