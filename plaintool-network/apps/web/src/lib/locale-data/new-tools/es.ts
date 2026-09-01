import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("es");

const seed = {
  locale: "es",
  formatterSubnet: formatterSubnetFor("es"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("es"),
  dateCalculator: dateCalculatorFor("es"),
  timeZoneConverter: timeZoneConverterFor("es"),
  calculatorSuite: calculatorSuiteFor("es"),
  uuidGenerator: uuidGeneratorFor("es"),
  ui: {
    clear: "Borrar",
    copy: "Copiar",
    download: "Descargar",
    openFile: "Abrir archivo",
    chooseImage: "Elegir imagen",
    dropFile: "Suelta una imagen aquí.",
    ready: "Listo",
    working: "Procesando…",
    complete: "Completado",
    unchanged: "No se necesitan cambios",
    outdated: "El resultado no está actualizado",
    copied: "Copiado",
    copyFailed: "No se pudo copiar",
    tooLarge: "La entrada es demasiado grande para procesarla de forma segura.",
    failed: "No se pudo procesar. Revisa la entrada e inténtalo de nuevo.",
    resultHere: "El resultado aparecerá aquí.",
    localTitle: "Procesamiento solo en este navegador",
    localBody:
      "La entrada y los resultados no se suben ni se guardan. Permanecen en esta pestaña del navegador.",
    guideTitle: "Cómo usar {name}",
    safetyTitle: "Procesamiento privado y local",
    faqWhat: "¿Qué hace la herramienta «{name}»?",
    faqPrivacy: "¿Se suben mis datos?",
    faqCheck: "¿Qué debo comprobar al usar la herramienta «{name}»?",
  },
  ai: {
    input: "Texto original",
    output: "Texto depurado",
    placeholder:
      "Pega texto copiado que pueda contener caracteres invisibles no deseados.",
    run: "Eliminar caracteres ocultos",
    report: "Informe de eliminación",
    removed: "Caracteres eliminados",
    normalized: "Espacios normalizados",
    noChanges: "No se encontraron los caracteres ocultos seleccionados.",
    count: "{count} eliminados",
    advanced: "Opciones Unicode avanzadas",
    advancedWarning:
      "Estas opciones pueden cambiar la ortografía, los emojis o la forma de las escrituras. Actívalas solo si conoces la estructura del texto original.",
    joinControls: "Eliminar ZWJ y ZWNJ",
    joinWarning:
      "Puede romper secuencias de emojis y la unión de caracteres en árabe, persa o escrituras índicas.",
    variationSelectors: "Eliminar selectores de variación",
    variationWarning: "Puede cambiar la apariencia de emojis o glifos CJK.",
    combiningMarks: "Eliminar marcas combinantes",
    combiningWarning:
      "Puede quitar tildes, signos vocálicos y otras marcas con significado.",
    noBreakSpaces: "Normalizar espacios de no separación",
    noBreakNote: "Convierte los espacios de tipo NBSP en espacios normales.",
    kinds: [
      "Espacio de ancho cero",
      "Unión de palabras",
      "Marca de orden de bytes",
      "Guion discrecional",
      "Control bidireccional",
      "Separador invisible",
      "Control de unión",
      "Selector de variación",
      "Marca combinante",
      "Espacio de no separación o de cifra",
      "Espacio estrecho de no separación",
    ],
  },
  url: {
    mode: "Modo de conversión de URL",
    encode: "Codificar",
    decode: "Decodificar",
    encodeInput: "Texto o URL que se va a codificar",
    decodeInput: "Valor de URL codificado",
    encodeOutput: "Resultado codificado",
    decodeOutput: "Resultado decodificado",
    encodePlaceholder: "Ejemplo: https://example.com/search?q=hola mundo",
    decodePlaceholder: "Ejemplo: hola%20mundo%3Fpagina%3D1",
    scope: "Ámbito de codificación",
    component: "Componente de URL",
    uri: "URI completa",
    formSpace: "Usar + para los espacios de datos de formulario",
    recursive: "Decodificar repetidamente",
    passLimit: "Número máximo de pasadas",
    encoded: "Codificación de URL completada",
    decoded: "Decodificación de URL completada",
    passCount: "Decodificado en {count} pasada(s)",
    limitReached: "Quedan capas codificadas después del límite de pasadas.",
    errors: [
      "Introduce primero un valor.",
      "Una secuencia de escape porcentual está incompleta o no es válida.",
      "Los bytes decodificados no forman un UTF-8 válido.",
      "Elige un límite de entre 1 y 10 pasadas.",
    ],
  },
  hash: {
    input: "Texto o archivo",
    placeholder:
      "Introduce texto para calcular los hashes SHA-256, SHA-512, SHA-1 y MD5.",
    results: "Valores hash",
    resultLabel: "Valor hash {algorithm}",
    copyLabel: "Copiar hash {algorithm}",
    fileSelected: "Seleccionado: {name} ({size})",
    drop: "Suelta aquí un archivo para calcular su hash localmente.",
    textTooLarge:
      "El texto es demasiado grande para esta sesión del navegador.",
    fileTooLarge:
      "El archivo supera el límite de seguridad del procesamiento local.",
    legacyWarning:
      "MD5 y SHA-1 se incluyen para comprobaciones de compatibilidad, no para guardar contraseñas ni diseñar sistemas de seguridad nuevos.",
    expectedChecksum: "Suma de comprobación esperada",
    checksumMatch: "Coincide",
    checksumMismatch: "No coincide",
    checksumInvalid: "Introduce una suma hexadecimal compatible.",
    empty: "Introduce texto o elige primero un archivo.",
    unavailable:
      "Este navegador no puede calcular alguno de los hashes solicitados.",
  },
  jwt: {
    input: "Token JWT",
    placeholder: "Pega un JWT de tres partes: header.payload.signature",
    header: "Cabecera",
    payload: "Carga útil",
    signature: "Firma",
    copyHeader: "Copiar cabecera JWT decodificada",
    copyPayload: "Copiar carga útil JWT decodificada",
    copySignature: "Copiar bytes de la firma JWT",
    signatureBytes: "{count} bytes",
    timestamps: "Reclamaciones temporales",
    expires: "Caduca (exp)",
    notBefore: "Válido desde (nbf)",
    issuedAt: "Emitido el (iat)",
    invalidTimestamp:
      "Esta reclamación no contiene una marca de tiempo numérica válida.",
    noTimestamps: "No se encontraron las reclamaciones exp, nbf ni iat.",
    noVerifyTitle: "Firma sin verificar",
    noVerifyBody:
      "La decodificación solo muestra el contenido del token. No demuestra quién lo emitió ni que la firma sea válida.",
    errors: [
      "Pega primero un JWT.",
      "Un JWT debe contener exactamente tres partes separadas por puntos.",
      "La cabecera del JWT está vacía.",
      "La carga útil del JWT está vacía.",
      "Uno de los segmentos no es Base64URL válido.",
      "Uno de los segmentos no es UTF-8 válido.",
      "La cabecera no es un JSON válido.",
      "La carga útil no es un JSON válido.",
      "La cabecera debe ser un objeto JSON.",
      "La carga útil debe ser un objeto JSON.",
    ],
  },
  qr: {
    input: "Texto o URL",
    placeholder: "Introduce el texto o la URL que contendrá el código QR.",
    preview: "Vista previa del código QR",
    previewEmpty: "Introduce contenido para generar un código QR.",
    options: "Opciones del código QR",
    correction: "Corrección de errores",
    correctionLevels: ["Baja (L)", "Media (M)", "Cuartil (Q)", "Alta (H)"],
    quietZone: "Margen de seguridad",
    quietZones: [
      "Ninguno",
      "2 módulos",
      "4 módulos (recomendado)",
      "8 módulos",
    ],
    generate: "Generar código QR",
    png: "Descargar PNG",
    svg: "Descargar SVG",
    empty: "Introduce primero un texto o una URL.",
    tooLong:
      "El contenido es demasiado largo para este nivel de corrección de errores.",
    generationFailed: "No se pudo generar el código QR.",
    downloadFailed: "No se pudo preparar la imagen para descargarla.",
    upload: "Imagen del código QR",
    formats: "PNG, JPEG, WebP, GIF o BMP de hasta 10 MB",
    camera: "Escáner con cámara",
    cameraHint:
      "Permite el acceso a la cámara para escanear de forma continua. Las URL decodificadas nunca se abren automáticamente.",
    startCamera: "Iniciar cámara",
    stopCamera: "Detener cámara",
    scanResult: "Contenido decodificado",
    scanPlaceholder: "El texto escaneado aparecerá aquí.",
    urlDetected: "URL detectada",
    openUrl: "Abrir URL",
    urlDialogTitle: "¿Abrir esta URL?",
    urlDialogBody:
      "Esta URL se encontró en el código QR. Comprueba que sea segura y que pertenezca al sitio que esperas.",
    urlDialogDestination: "Dirección de destino",
    cancel: "Cancelar",
    reading: "Leyendo imagen…",
    starting: "Iniciando cámara…",
    scanning: "Buscando un código QR…",
    invalidImage: "Elige una imagen válida en un formato compatible.",
    noCode: "No se encontró ningún código QR legible en esta imagen.",
    unsupported: "Este navegador no admite el escaneo con cámara.",
    denied: "Se ha denegado el permiso de la cámara.",
    unavailable: "No hay ninguna cámara adecuada disponible.",
    scanFailed: "No se pudo escanear el código QR.",
  },
  data: {
    convert: "Convertir",
    inputPlaceholder: "Pega aquí los datos de origen.",
    outputPlaceholder: "El resultado convertido aparecerá aquí.",
    drop: "Suelta aquí un archivo de texto compatible.",
    readFailed: "No se pudo leer el archivo.",
    errorAt: "{message} Línea {line}, columna {column}.",
    delimiter: "Delimitador CSV",
    auto: "Detectar automáticamente",
    comma: "Coma (,)",
    semicolon: "Punto y coma (;)",
    tab: "Tabulador",
    pipe: "Barra vertical (|)",
    firstHeader: "Usar la primera fila como cabecera",
    pretty: "Aplicar sangría al JSON",
    errors: [
      "El CSV contiene una comilla sin cerrar o un campo mal formado.",
      "No se encontró una tabla Markdown con una fila separadora.",
      "La tabla Markdown está mal formada.",
      "La entrada no es un JSON válido.",
      "El JSON debe ser una matriz de objetos.",
      "Hay una cabecera CSV vacía.",
      "Las cabeceras CSV deben ser únicas.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Limpiador de texto de IA",
      description:
        "Limpia los caracteres invisibles no deseados compatibles que pueden llegar en texto copiado de ChatGPT, Claude, Gemini y otras fuentes. No demuestra autoría, no identifica texto generado por IA ni garantiza eludir detectores de IA.",
      guide:
        "Pega el texto y revisa primero el resultado depurado; después comprueba los nombres exactos, las cantidades y los puntos de código U+ eliminados. Las opciones que pueden alterar la escritura están desactivadas de forma predeterminada.",
      terms: [
        "limpiar texto de IA",
        "limpiar texto copiado de IA",
        "eliminar caracteres invisibles",
        "caracteres ocultos ChatGPT",
        "caracteres ocultos Claude",
        "caracteres ocultos Gemini",
        "eliminar marca de agua IA de texto",
      ],
    },
    "url-encode": {
      title: "Codificador de URL",
      description:
        "Aplica la codificación porcentual estándar a texto, valores de consulta o URI completas.",
      guide:
        "Elige componente de URL para un único valor de consulta o URI completa para conservar los separadores de la dirección. Usa el signo más para los espacios solo en datos de formulario.",
      terms: [
        "codificar URL",
        "codificación porcentual",
        "encodeURIComponent",
        "cadena de consulta",
      ],
    },
    "url-decode": {
      title: "Decodificador de URL",
      description:
        "Decodifica URL y valores de consulta codificados por porcentaje; también admite codificación anidada con un límite de pasadas.",
      guide:
        "Pega el valor codificado, elige su ámbito y usa la decodificación repetida solo si sabes que el origen contiene codificación anidada.",
      terms: [
        "decodificar URL",
        "decodificación porcentual",
        "decodeURIComponent",
        "cadena de consulta",
      ],
    },
    "hash-generator": {
      title: "Generador de hashes",
      description:
        "Calcula localmente las sumas de comprobación SHA-256, SHA-512, SHA-1 y MD5 de textos o archivos.",
      guide:
        "Introduce texto o elige un archivo y compara exactamente el algoritmo necesario. Los hashes sirven para comprobar la igualdad; por sí solos no cifran datos ni almacenan contraseñas de forma segura.",
      terms: [
        "generador de hash",
        "hash SHA-256",
        "hash de archivo",
        "SHA-256",
        "SHA-512",
        "MD5",
        "suma de comprobación",
        "hash de archivo",
      ],
    },
    "jwt-decoder": {
      title: "Decodificador de JWT",
      description:
        "Decodifica la cabecera, la carga útil, los bytes de firma y las reclamaciones temporales de un JWT sin subir el token.",
      guide:
        "Revisa el JSON y las marcas de tiempo decodificados, pero verifica la firma y las reclamaciones en el sistema que controla la clave de firma. Decodificar no basta para establecer la confianza.",
      terms: [
        "decodificador JWT",
        "JSON Web Token",
        "carga útil JWT",
        "cabecera JWT",
      ],
    },
    "qr-code-generator": {
      title: "Generador de códigos QR",
      description:
        "Crea un código QR estático y compatible con el estándar para un texto o una URL, y descárgalo en PNG o SVG.",
      guide:
        "Introduce el contenido exacto, mantén un margen de cuatro módulos para facilitar la lectura y aumenta la corrección de errores si el código puede quedar parcialmente tapado.",
      terms: ["generador de códigos QR", "QR PNG", "QR SVG", "QR estático"],
    },
    "qr-code-scanner": {
      title: "Escáner de códigos QR",
      description:
        "Lee localmente un código QR desde una imagen o la cámara sin abrir automáticamente los enlaces decodificados.",
      guide:
        "Usa una imagen nítida y bien iluminada en la que se vea todo el margen. Revisa y copia el valor decodificado antes de decidir si una URL es segura.",
      terms: [
        "escanear código QR",
        "leer QR de imagen",
        "lector QR con cámara",
        "decodificar QR",
      ],
    },
    "csv-to-markdown": {
      title: "Conversor de CSV a Markdown",
      description:
        "Convierte filas CSV en una tabla Markdown limpia, con detección del delimitador y escape de celdas.",
      guide:
        "Comprueba el delimitador y si la primera fila es una cabecera. Las celdas multilínea se convierten en saltos compatibles con tablas y las barras verticales se escapan.",
      inputLabel: "Entrada CSV",
      outputLabel: "Tabla Markdown",
      inputPlaceholder: "nombre,puntuación\nAna,92",
      terms: ["CSV a Markdown", "tabla Markdown", "conversor CSV"],
    },
    "markdown-to-csv": {
      title: "Conversor de Markdown a CSV",
      description:
        "Convierte una tabla Markdown en un CSV compatible con hojas de cálculo y herramientas de datos.",
      guide:
        "Incluye una cabecera y una fila separadora en la tabla Markdown y elige el delimitador que requiera la aplicación de destino.",
      inputLabel: "Tabla Markdown",
      outputLabel: "Salida CSV",
      inputPlaceholder: "| nombre | puntuación |\n| --- | --- |\n| Ana | 92 |",
      terms: ["Markdown a CSV", "tabla a CSV", "conversor Markdown"],
    },
    "json-to-csv": {
      title: "Conversor de JSON a CSV",
      description:
        "Convierte un array de objetos JSON en CSV y usa todas las claves como columnas.",
      guide:
        "Usa un array de objetos como valor de nivel superior. Los valores anidados se conservan como cadenas JSON compactas; comprueba cómo debe tratarlos la hoja de cálculo de destino.",
      inputLabel: "Matriz JSON",
      outputLabel: "Salida CSV",
      inputPlaceholder: '[{"nombre":"Ana","puntuación":92}]',
      terms: ["JSON a CSV", "array JSON a CSV", "conversor de datos"],
    },
    "csv-to-json": {
      title: "Conversor de CSV a JSON",
      description:
        "Convierte un CSV en un array de objetos JSON usando la primera fila como nombres de campo.",
      guide:
        "Asegúrate de que todas las cabeceras tengan contenido y sean únicas. Revisa la detección del delimitador antes de convertir datos con comas, comillas o celdas multilínea.",
      inputLabel: "Entrada CSV",
      outputLabel: "Array JSON",
      inputPlaceholder: "nombre,puntuación\nAna,92",
      terms: ["CSV a JSON", "analizador CSV", "array JSON"],
    },
    "html-to-markdown": {
      title: "Conversor de HTML a Markdown",
      description:
        "Convierte la estructura HTML en Markdown legible, incluidos títulos, enlaces, listas, código y tablas.",
      guide:
        "Pega el fragmento HTML que quieras convertir. Revisa los diseños complejos y el contenido incrustado, ya que Markdown no puede representar todos los comportamientos de HTML.",
      inputLabel: "Entrada HTML",
      outputLabel: "Salida Markdown",
      inputPlaceholder: "<h1>Título</h1><p>Hola <strong>mundo</strong>.</p>",
      terms: ["HTML a Markdown", "convertir HTML a Markdown", "HTML a MD"],
    },
    "markdown-to-html": {
      title: "Conversor de Markdown a HTML",
      description:
        "Convierte Markdown en HTML con tablas GFM, listas, enlaces y bloques de código.",
      guide:
        "Convierte solo el Markdown que pretendas usar y vuelve a sanear el HTML antes de insertar resultados no fiables en una página web.",
      inputLabel: "Entrada Markdown",
      outputLabel: "Salida HTML",
      inputPlaceholder: "# Título\n\nHola, **mundo**.",
      terms: ["Markdown a HTML", "renderizador Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
