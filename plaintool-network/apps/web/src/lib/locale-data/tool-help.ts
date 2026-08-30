import type { Locale } from "../site";

export type ToolHelpCopy = {
  triggerLabel: string;
  base64: {
    charset: string;
    variant: string;
    outputView: string;
    strict: string;
    lineByLine: string;
    autoRepair: string;
    recursive: string;
    lenientRepair: string;
    includePadding: string;
    mimeWrap: string;
    dataUri: string;
  };
  caseConverter: {
    sentence: string;
    capitalizeWords: string;
  };
  time: {
    unit: string;
    zoneMode: string;
    disambiguation: string;
  };
  url: {
    scope: string;
    formSpace: string;
    recursive: string;
  };
  qr: {
    errorCorrection: string;
    quietZone: string;
  };
  data: {
    delimiter: string;
    firstRowHeader: string;
  };
  formatter: {
    printWidth: string;
    semicolons: string;
    singleQuotes: string;
    preserveComments: string;
  };
  sql: {
    dialect: string;
    keywordCase: string;
  };
};

const define = (copy: ToolHelpCopy): ToolHelpCopy => copy;

export const toolHelpCopy = {
  en: define({
    triggerLabel: "More information",
    base64: {
      charset:
        "Interprets decoded bytes as text using this character encoding. It does not change the Base64 data itself.",
      variant:
        "Standard uses + and /. URL-safe uses - and _. Automatic accepts either alphabet.",
      outputView:
        "Text uses the selected character encoding. Hex shows every decoded byte as a hexadecimal value.",
      strict:
        "Rejects non-canonical input instead of repairing whitespace, padding, or alphabet differences.",
      lineByLine:
        "Treats each non-empty line as a separate Base64 value and keeps line breaks between the decoded results.",
      autoRepair:
        "Removes whitespace, normalizes the URL-safe alphabet, and restores missing = padding when safe.",
      recursive:
        "Keeps decoding when the readable result itself looks like Base64, up to the built-in safety limit.",
      lenientRepair:
        "Discards remaining non-Base64 characters after common repairs. Use only for damaged input.",
      includePadding:
        "Adds trailing = characters so the encoded length is a multiple of four.",
      mimeWrap:
        "Inserts a line break every 76 characters for MIME-style transfer formats.",
      dataUri:
        "Adds a data:...;base64, prefix for embedding the result in a URL, HTML, or CSS.",
    },
    caseConverter: {
      sentence:
        "Lowercases the text, then capitalizes the first cased letter after the start, a line break, or sentence-ending punctuation.",
      capitalizeWords:
        "Capitalizes the first cased letter of each mechanically detected word. It does not apply language-specific title rules.",
    },
    time: {
      unit: "Automatic treats 1–10 digit integers as seconds and 13 digit integers as milliseconds. Choose a unit for 11–12 digit values.",
      zoneMode:
        "Browser local uses this device’s time-zone rules. UTC offset stays fixed; an IANA zone follows regional daylight-saving changes.",
      disambiguation:
        "Chooses what to do when a local clock time is skipped or occurs twice during a daylight-saving transition.",
    },
    url: {
      scope:
        "URL component encodes separators in one value. Full URI preserves address separators such as :, /, ?, #, and &.",
      formSpace:
        "Uses + for spaces in form-style query data. In ordinary URLs, a literal + and a space are different characters.",
      recursive:
        "Decodes again while the result still contains valid percent-encoded sequences, stopping at the selected safety limit.",
    },
    qr: {
      errorCorrection:
        "Higher levels can recover more damaged code area, but produce a denser QR code for the same content.",
      quietZone:
        "Sets the blank margin around the QR code in module units. Four modules is the usual standard minimum.",
    },
    data: {
      delimiter:
        "Sets the character that separates CSV fields. Automatic detects a likely delimiter from the input.",
      firstRowHeader:
        "Uses the first CSV row as Markdown column headings instead of treating it as data.",
    },
    formatter: {
      printWidth:
        "Preferred line length before the formatter wraps suitable code. It is a formatting target, not a hard character limit.",
      semicolons:
        "Adds semicolons where the formatter’s JavaScript rules allow them. It does not change every statement ending.",
      singleQuotes:
        "Prefers single-quoted strings when they require no extra escaping; otherwise keeps the safer quote style.",
      preserveComments:
        "Keeps comments during minification. Turning this off removes comments but does not perform compression or identifier mangling.",
    },
    sql: {
      dialect:
        "Selects the database grammar used for formatting. Standard SQL is a common subset, not automatic dialect detection.",
      keywordCase:
        "Changes recognized SQL keywords only. Identifiers, quoted names, and string values keep their original case.",
    },
  }),
  ko: define({
    triggerLabel: "자세한 설명",
    base64: {
      charset:
        "디코드한 바이트를 텍스트로 읽을 때 사용할 문자 인코딩입니다. Base64 데이터 자체는 바꾸지 않습니다.",
      variant:
        "표준 형식은 +와 /를, URL 안전 형식은 -와 _를 사용합니다. 자동은 두 형식을 모두 허용합니다.",
      outputView:
        "텍스트는 선택한 문자 인코딩으로 바이트를 읽고, 16진수는 각 바이트 값을 그대로 표시합니다.",
      strict:
        "공백, 패딩 누락, 알파벳 차이를 자동으로 고치지 않고 표준 형식이 아닌 입력을 오류로 처리합니다.",
      lineByLine:
        "비어 있지 않은 각 줄을 별도의 Base64 값으로 디코드하고 결과 사이의 줄바꿈을 유지합니다.",
      autoRepair:
        "공백을 제거하고 URL 안전 알파벳을 정규화하며, 안전한 경우 누락된 = 패딩을 복원합니다.",
      recursive:
        "디코드 결과가 다시 Base64처럼 보이면 안전 한도 안에서 계속 디코드합니다.",
      lenientRepair:
        "일반 복구 뒤에도 남은 Base64 외 문자를 버립니다. 손상된 입력을 복구할 때만 사용하세요.",
      includePadding:
        "인코딩 결과 길이가 4의 배수가 되도록 끝에 = 문자를 붙입니다.",
      mimeWrap: "MIME 전송 형식에 맞게 76자마다 줄바꿈을 넣습니다.",
      dataUri:
        "URL, HTML 또는 CSS에 바로 넣을 수 있도록 data:...;base64, 접두사를 붙입니다.",
    },
    caseConverter: {
      sentence:
        "전체를 소문자로 바꾼 뒤 글의 시작, 줄바꿈 또는 문장 부호 다음의 첫 대소문자 글자를 대문자로 바꿉니다.",
      capitalizeWords:
        "기계적으로 구분한 각 단어의 첫 글자를 대문자로 바꿉니다. 언어별 제목 표기 규칙은 적용하지 않습니다.",
    },
    time: {
      unit: "자동은 1~10자리 정수를 초, 13자리 정수를 밀리초로 봅니다. 11~12자리 값은 단위를 직접 선택하세요.",
      zoneMode:
        "브라우저 현지는 이 기기의 시간대 규칙을, UTC 시차는 고정값을, IANA 시간대는 지역별 서머타임 규칙을 사용합니다.",
      disambiguation:
        "서머타임 전환으로 현지 시각이 건너뛰거나 두 번 나타날 때 어떤 결과를 사용할지 정합니다.",
    },
    url: {
      scope:
        "URL 구성 요소는 한 값 안의 구분자까지 인코딩합니다. 전체 URI는 :, /, ?, #, & 같은 주소 구분자를 보존합니다.",
      formSpace:
        "폼 형식의 쿼리 데이터에서 공백을 +로 표시합니다. 일반 URL에서는 +와 공백이 서로 다른 문자입니다.",
      recursive:
        "결과에 올바른 퍼센트 인코딩이 남아 있으면 선택한 안전 한도까지 다시 디코드합니다.",
    },
    qr: {
      errorCorrection:
        "단계가 높을수록 손상된 영역을 더 많이 복원할 수 있지만 같은 내용의 QR 코드가 더 촘촘해집니다.",
      quietZone:
        "QR 코드 둘레의 빈 여백을 모듈 단위로 정합니다. 일반적인 표준 최소값은 4모듈입니다.",
    },
    data: {
      delimiter:
        "CSV 필드를 나누는 문자를 정합니다. 자동은 입력에서 가능성이 높은 구분자를 감지합니다.",
      firstRowHeader:
        "첫 번째 CSV 행을 데이터가 아니라 Markdown 표의 열 제목으로 사용합니다.",
    },
    formatter: {
      printWidth:
        "포매터가 적절한 위치에서 줄을 나눌 때 기준으로 삼는 선호 길이입니다. 엄격한 글자 수 제한은 아닙니다.",
      semicolons:
        "JavaScript 포맷 규칙상 가능한 위치에 세미콜론을 붙입니다. 모든 문장 끝을 단순히 바꾸는 옵션은 아닙니다.",
      singleQuotes:
        "추가 이스케이프가 필요하지 않을 때 작은따옴표 문자열을 우선합니다. 그렇지 않으면 더 안전한 따옴표를 유지합니다.",
      preserveComments:
        "코드 경량화 중 주석을 남깁니다. 끄면 주석만 제거하며 압축 최적화나 식별자 축약은 하지 않습니다.",
    },
    sql: {
      dialect:
        "포맷에 사용할 데이터베이스 문법을 정합니다. 표준 SQL은 공통 부분집합이며 방언을 자동 감지하지 않습니다.",
      keywordCase:
        "인식된 SQL 키워드만 바꿉니다. 식별자, 따옴표로 감싼 이름, 문자열 값의 대소문자는 유지합니다.",
    },
  }),
  es: define({
    triggerLabel: "Más información",
    base64: {
      charset:
        "Interpreta los bytes decodificados como texto con esta codificación. No modifica los datos Base64.",
      variant:
        "El formato estándar usa + y /; el seguro para URL usa - y _. Automático admite ambos alfabetos.",
      outputView:
        "Texto usa la codificación elegida. Hexadecimal muestra el valor de cada byte decodificado.",
      strict:
        "Rechaza entradas no canónicas en vez de corregir espacios, relleno o diferencias de alfabeto.",
      lineByLine:
        "Trata cada línea no vacía como un valor Base64 independiente y conserva los saltos entre resultados.",
      autoRepair:
        "Elimina espacios, normaliza el alfabeto seguro para URL y repone el relleno = cuando es seguro.",
      recursive:
        "Sigue decodificando si el resultado legible también parece Base64, hasta el límite de seguridad.",
      lenientRepair:
        "Descarta caracteres que no son Base64 tras las correcciones comunes. Úsalo solo con entradas dañadas.",
      includePadding:
        "Añade signos = al final para que la longitud codificada sea múltiplo de cuatro.",
      mimeWrap:
        "Inserta un salto de línea cada 76 caracteres para formatos de transferencia MIME.",
      dataUri:
        "Añade el prefijo data:...;base64, para incrustar el resultado en URL, HTML o CSS.",
    },
    caseConverter: {
      sentence:
        "Pasa el texto a minúsculas y pone en mayúscula la primera letra tras el inicio, un salto o un signo de fin de frase.",
      capitalizeWords:
        "Pone en mayúscula la primera letra de cada palabra detectada mecánicamente; no aplica reglas editoriales del idioma.",
    },
    time: {
      unit: "Automático interpreta 1–10 dígitos como segundos y 13 como milisegundos. Elige la unidad para 11–12 dígitos.",
      zoneMode:
        "Hora local usa las reglas del dispositivo; el desfase UTC es fijo y una zona IANA sigue los cambios horarios regionales.",
      disambiguation:
        "Decide qué hacer cuando una hora local no existe o aparece dos veces durante un cambio de horario.",
    },
    url: {
      scope:
        "Componente URL codifica los separadores de un valor. URI completa conserva :, /, ?, # y & de la dirección.",
      formSpace:
        "Usa + para espacios en datos de formulario. En una URL normal, + y espacio son caracteres distintos.",
      recursive:
        "Vuelve a decodificar mientras queden secuencias porcentuales válidas, hasta el límite de seguridad elegido.",
    },
    qr: {
      errorCorrection:
        "Los niveles altos recuperan más área dañada, pero generan un QR más denso para el mismo contenido.",
      quietZone:
        "Define el margen en blanco alrededor del QR en módulos. Cuatro módulos es el mínimo estándar habitual.",
    },
    data: {
      delimiter:
        "Define el carácter que separa los campos CSV. Automático detecta el delimitador más probable.",
      firstRowHeader:
        "Usa la primera fila CSV como títulos de columna de Markdown, no como datos.",
    },
    formatter: {
      printWidth:
        "Longitud preferida antes de ajustar líneas adecuadas. Es un objetivo de formato, no un límite estricto.",
      semicolons:
        "Añade punto y coma donde lo permiten las reglas del formateador; no altera mecánicamente cada final de sentencia.",
      singleQuotes:
        "Prefiere comillas simples si no exigen escapes extra; de lo contrario conserva la opción más segura.",
      preserveComments:
        "Conserva comentarios al minificar. Si se desactiva, no aplica compresión ni acorta identificadores.",
    },
    sql: {
      dialect:
        "Elige la gramática de base de datos. SQL estándar es un subconjunto común, no detección automática.",
      keywordCase:
        "Cambia solo palabras clave SQL reconocidas; conserva identificadores, nombres entre comillas y cadenas.",
    },
  }),
  de: define({
    triggerLabel: "Weitere Informationen",
    base64: {
      charset:
        "Interpretiert die dekodierten Bytes mit dieser Zeichenkodierung als Text. Die Base64-Daten bleiben unverändert.",
      variant:
        "Standard verwendet + und /, URL-sicher verwendet - und _. Automatisch akzeptiert beide Alphabete.",
      outputView:
        "Text verwendet die gewählte Zeichenkodierung. Hex zeigt jedes dekodierte Byte als Hexadezimalwert.",
      strict:
        "Lehnt nicht kanonische Eingaben ab, statt Leerraum, Padding oder Alphabetunterschiede zu reparieren.",
      lineByLine:
        "Behandelt jede nicht leere Zeile als eigenen Base64-Wert und behält Zeilenumbrüche zwischen Ergebnissen bei.",
      autoRepair:
        "Entfernt Leerraum, normalisiert das URL-sichere Alphabet und ergänzt fehlendes =-Padding, wenn möglich.",
      recursive:
        "Dekodiert weiter, wenn das lesbare Ergebnis erneut wie Base64 aussieht, bis zur Sicherheitsgrenze.",
      lenientRepair:
        "Verwirft nach üblichen Reparaturen übrige Nicht-Base64-Zeichen. Nur für beschädigte Eingaben verwenden.",
      includePadding:
        "Ergänzt am Ende =, damit die kodierte Länge durch vier teilbar ist.",
      mimeWrap:
        "Fügt für MIME-Übertragungsformate alle 76 Zeichen einen Zeilenumbruch ein.",
      dataUri:
        "Fügt zum Einbetten in URL, HTML oder CSS das Präfix data:...;base64, hinzu.",
    },
    caseConverter: {
      sentence:
        "Schreibt den Text klein und den ersten Buchstaben nach Anfang, Zeilenumbruch oder Satzende groß.",
      capitalizeWords:
        "Schreibt den ersten Buchstaben jedes mechanisch erkannten Wortes groß; sprachspezifische Titelregeln gelten nicht.",
    },
    time: {
      unit: "Automatisch deutet 1–10 Stellen als Sekunden und 13 als Millisekunden. Bei 11–12 Stellen die Einheit wählen.",
      zoneMode:
        "Lokal nutzt die Regeln des Geräts, ein UTC-Versatz bleibt fest und eine IANA-Zone folgt regionaler Sommerzeit.",
      disambiguation:
        "Legt fest, was bei einer übersprungenen oder doppelt auftretenden Ortszeit während der Zeitumstellung geschieht.",
    },
    url: {
      scope:
        "URL-Komponente kodiert Trennzeichen in einem Wert. Vollständige URI erhält :, /, ?, # und & der Adresse.",
      formSpace:
        "Verwendet + für Leerzeichen in Formulardaten. In normalen URLs sind + und Leerzeichen verschieden.",
      recursive:
        "Dekodiert erneut, solange gültige Prozentsequenzen verbleiben, höchstens bis zur gewählten Sicherheitsgrenze.",
    },
    qr: {
      errorCorrection:
        "Höhere Stufen können mehr beschädigte Fläche wiederherstellen, erzeugen aber dichtere QR-Codes.",
      quietZone:
        "Bestimmt den freien Rand in Modulen. Vier Module sind das übliche standardkonforme Minimum.",
    },
    data: {
      delimiter:
        "Legt das Trennzeichen zwischen CSV-Feldern fest. Automatisch erkennt das wahrscheinlichste Zeichen.",
      firstRowHeader:
        "Verwendet die erste CSV-Zeile als Markdown-Spaltenüberschriften statt als Daten.",
    },
    formatter: {
      printWidth:
        "Bevorzugte Zeilenlänge für geeignete Umbrüche. Sie ist ein Formatierungsziel, keine harte Grenze.",
      semicolons:
        "Setzt Semikolons nach den JavaScript-Regeln des Formatierers, nicht mechanisch an jedes Anweisungsende.",
      singleQuotes:
        "Bevorzugt einfache Anführungszeichen ohne zusätzliche Escapes; sonst bleibt die sicherere Form erhalten.",
      preserveComments:
        "Behält Kommentare beim Minifizieren. Ausgeschaltet werden nur Kommentare entfernt, ohne Kompression oder Umbenennung.",
    },
    sql: {
      dialect:
        "Wählt die Datenbankgrammatik. Standard-SQL ist eine gemeinsame Teilmenge, keine automatische Erkennung.",
      keywordCase:
        "Ändert nur erkannte SQL-Schlüsselwörter; Bezeichner, zitierte Namen und Zeichenketten bleiben erhalten.",
    },
  }),
  ja: define({
    triggerLabel: "詳しい説明",
    base64: {
      charset:
        "デコードしたバイト列を文字列として読む際の文字エンコーディングです。Base64データ自体は変更しません。",
      variant:
        "標準形式は+と/、URLセーフ形式は-と_を使います。自動は両方の文字体系を受け付けます。",
      outputView:
        "テキストは選択した文字エンコーディングで表示し、16進数は各バイトの値をそのまま示します。",
      strict:
        "空白、パディング不足、文字体系の違いを補正せず、正規形式でない入力をエラーにします。",
      lineByLine:
        "空でない各行を別々のBase64値としてデコードし、結果間の改行を保ちます。",
      autoRepair:
        "空白を除去し、URLセーフ文字を正規化して、安全な場合は不足した=パディングを補います。",
      recursive:
        "読めるデコード結果が再びBase64に見える場合、安全上限まで続けてデコードします。",
      lenientRepair:
        "一般的な補正後に残るBase64以外の文字を破棄します。破損入力にだけ使用してください。",
      includePadding:
        "エンコード結果の長さが4の倍数になるよう末尾に=を付けます。",
      mimeWrap: "MIME転送形式向けに76文字ごとに改行を挿入します。",
      dataUri:
        "URL、HTML、CSSへ埋め込めるようdata:...;base64,接頭辞を付けます。",
    },
    caseConverter: {
      sentence:
        "全体を小文字にした後、先頭・改行・文末記号の次にある最初の大文字小文字を持つ文字を大文字にします。",
      capitalizeWords:
        "機械的に判定した各単語の先頭を大文字にします。言語ごとのタイトル表記規則は適用しません。",
    },
    time: {
      unit: "自動では1～10桁を秒、13桁をミリ秒として扱います。11～12桁の値は単位を指定してください。",
      zoneMode:
        "ブラウザーの現地時刻は端末の規則、UTCオフセットは固定値、IANA地域は夏時間を含む地域規則を使います。",
      disambiguation:
        "夏時間の切り替えで現地時刻が存在しない、または2回現れる場合の扱いを選びます。",
    },
    url: {
      scope:
        "URLコンポーネントは1つの値内の区切り文字も符号化します。完全なURIは:、/、?、#、&を保持します。",
      formSpace:
        "フォーム形式のクエリで空白を+にします。通常のURLでは+と空白は別の文字です。",
      recursive:
        "結果に有効なパーセントエンコードが残る間、選択した安全上限まで再度デコードします。",
    },
    qr: {
      errorCorrection:
        "レベルが高いほど広い破損を復元できますが、同じ内容でもQRコードが密になります。",
      quietZone:
        "QRコード周囲の空白をモジュール単位で指定します。通常の規格上の最小値は4モジュールです。",
    },
    data: {
      delimiter:
        "CSVフィールドを区切る文字です。自動は入力から可能性の高い区切り文字を判定します。",
      firstRowHeader:
        "CSVの1行目をデータではなくMarkdown表の列見出しとして使います。",
    },
    formatter: {
      printWidth:
        "適切な位置で改行する際の目安となる行の長さです。厳密な文字数制限ではありません。",
      semicolons:
        "フォーマッターのJavaScript規則で可能な位置にセミコロンを付けます。すべての文末を機械的に変えません。",
      singleQuotes:
        "余分なエスケープが不要な場合は一重引用符を優先し、それ以外は安全な引用符を保ちます。",
      preserveComments:
        "軽量化時にコメントを残します。オフでも圧縮最適化や識別子の短縮は行いません。",
    },
    sql: {
      dialect:
        "整形に使うデータベース文法を選びます。標準SQLは共通部分であり、自動判定ではありません。",
      keywordCase:
        "認識したSQLキーワードだけを変更し、識別子・引用名・文字列の大文字小文字は保ちます。",
    },
  }),
  fr: define({
    triggerLabel: "Plus d’informations",
    base64: {
      charset:
        "Interprète les octets décodés comme du texte avec cet encodage, sans modifier les données Base64.",
      variant:
        "Le format standard utilise + et /, le format sûr pour URL - et _. Automatique accepte les deux alphabets.",
      outputView:
        "Texte applique l’encodage choisi. Hexadécimal affiche la valeur de chaque octet décodé.",
      strict:
        "Refuse une entrée non canonique au lieu de corriger espaces, remplissage ou différences d’alphabet.",
      lineByLine:
        "Traite chaque ligne non vide comme une valeur Base64 distincte et conserve les retours entre résultats.",
      autoRepair:
        "Supprime les espaces, normalise l’alphabet sûr pour URL et rétablit le remplissage = si possible.",
      recursive:
        "Continue si le résultat lisible ressemble encore à du Base64, jusqu’à la limite de sécurité.",
      lenientRepair:
        "Écarte les caractères hors Base64 restants après les corrections courantes. À réserver aux entrées endommagées.",
      includePadding:
        "Ajoute des = à la fin afin que la longueur encodée soit un multiple de quatre.",
      mimeWrap:
        "Insère un retour à la ligne tous les 76 caractères pour les formats de transfert MIME.",
      dataUri:
        "Ajoute le préfixe data:...;base64, pour intégrer le résultat dans une URL, du HTML ou du CSS.",
    },
    caseConverter: {
      sentence:
        "Passe le texte en minuscules puis met en majuscule la première lettre après le début, un retour ou une fin de phrase.",
      capitalizeWords:
        "Met en majuscule la première lettre de chaque mot détecté mécaniquement, sans règles éditoriales propres à la langue.",
    },
    time: {
      unit: "Automatique lit 1 à 10 chiffres en secondes et 13 en millisecondes. Choisissez l’unité pour 11 à 12 chiffres.",
      zoneMode:
        "Heure locale suit l’appareil, le décalage UTC reste fixe et une zone IANA suit les changements d’heure régionaux.",
      disambiguation:
        "Détermine le résultat lorsqu’une heure locale est sautée ou se produit deux fois pendant un changement d’heure.",
    },
    url: {
      scope:
        "Composant d’URL encode les séparateurs d’une valeur. URI complète conserve :, /, ?, # et & de l’adresse.",
      formSpace:
        "Utilise + pour les espaces des données de formulaire. Dans une URL ordinaire, + et espace sont distincts.",
      recursive:
        "Décode de nouveau tant qu’il reste des séquences pour cent valides, jusqu’à la limite choisie.",
    },
    qr: {
      errorCorrection:
        "Un niveau élevé restaure une zone plus endommagée, mais densifie le QR pour un même contenu.",
      quietZone:
        "Définit la marge vide autour du QR en modules. Quatre modules constituent le minimum standard habituel.",
    },
    data: {
      delimiter:
        "Définit le caractère séparant les champs CSV. Automatique détecte le séparateur le plus probable.",
      firstRowHeader:
        "Utilise la première ligne CSV comme en-têtes du tableau Markdown plutôt que comme données.",
    },
    formatter: {
      printWidth:
        "Longueur de ligne préférée avant un retour approprié. C’est une cible de mise en forme, pas une limite stricte.",
      semicolons:
        "Ajoute des points-virgules selon les règles JavaScript du formateur, pas mécaniquement à chaque instruction.",
      singleQuotes:
        "Préfère les apostrophes sans échappement supplémentaire ; sinon conserve les guillemets les plus sûrs.",
      preserveComments:
        "Conserve les commentaires pendant la minification. Désactivé, n’effectue ni compression ni renommage d’identifiants.",
    },
    sql: {
      dialect:
        "Choisit la grammaire de base de données. SQL standard est un sous-ensemble commun, pas une détection automatique.",
      keywordCase:
        "Modifie uniquement les mots-clés SQL reconnus ; identifiants, noms cités et chaînes restent inchangés.",
    },
  }),
  "pt-BR": define({
    triggerLabel: "Mais informações",
    base64: {
      charset:
        "Interpreta os bytes decodificados como texto com esta codificação, sem alterar os dados Base64.",
      variant:
        "O padrão usa + e /; o formato seguro para URL usa - e _. Automático aceita os dois alfabetos.",
      outputView:
        "Texto usa a codificação escolhida. Hexadecimal mostra o valor de cada byte decodificado.",
      strict:
        "Rejeita entradas não canônicas em vez de corrigir espaços, preenchimento ou diferenças de alfabeto.",
      lineByLine:
        "Trata cada linha não vazia como um valor Base64 separado e mantém as quebras entre os resultados.",
      autoRepair:
        "Remove espaços, normaliza o alfabeto seguro para URL e repõe o preenchimento = quando possível.",
      recursive:
        "Continua decodificando se o resultado legível também parecer Base64, até o limite de segurança.",
      lenientRepair:
        "Descarta caracteres restantes que não sejam Base64 após os reparos comuns. Use só em entradas danificadas.",
      includePadding:
        "Adiciona = ao final para que o comprimento codificado seja múltiplo de quatro.",
      mimeWrap:
        "Insere uma quebra de linha a cada 76 caracteres para formatos de transferência MIME.",
      dataUri:
        "Adiciona o prefixo data:...;base64, para incorporar o resultado em URL, HTML ou CSS.",
    },
    caseConverter: {
      sentence:
        "Converte para minúsculas e põe em maiúscula a primeira letra após o início, uma quebra ou pontuação final.",
      capitalizeWords:
        "Põe em maiúscula a primeira letra de cada palavra detectada mecanicamente, sem regras editoriais do idioma.",
    },
    time: {
      unit: "Automático trata 1–10 dígitos como segundos e 13 como milissegundos. Escolha a unidade para 11–12 dígitos.",
      zoneMode:
        "Hora local segue o dispositivo, o deslocamento UTC é fixo e uma zona IANA acompanha o horário de verão regional.",
      disambiguation:
        "Define o resultado quando um horário local não existe ou ocorre duas vezes numa mudança de horário.",
    },
    url: {
      scope:
        "Componente de URL codifica os separadores de um valor. URI completa preserva :, /, ?, # e & do endereço.",
      formSpace:
        "Usa + para espaços em dados de formulário. Em uma URL comum, + e espaço são caracteres diferentes.",
      recursive:
        "Decodifica novamente enquanto houver sequências percentuais válidas, até o limite de segurança escolhido.",
    },
    qr: {
      errorCorrection:
        "Níveis maiores recuperam mais área danificada, mas deixam o QR mais denso para o mesmo conteúdo.",
      quietZone:
        "Define a margem vazia ao redor do QR em módulos. Quatro módulos é o mínimo padrão habitual.",
    },
    data: {
      delimiter:
        "Define o caractere que separa campos CSV. Automático detecta o delimitador mais provável.",
      firstRowHeader:
        "Usa a primeira linha do CSV como títulos das colunas Markdown, não como dados.",
    },
    formatter: {
      printWidth:
        "Comprimento preferido antes de quebrar linhas adequadas. É uma meta de formatação, não um limite rígido.",
      semicolons:
        "Adiciona ponto e vírgula conforme as regras JavaScript do formatador, não mecanicamente em toda instrução.",
      singleQuotes:
        "Prefere aspas simples quando não exigem escapes extras; caso contrário mantém a opção mais segura.",
      preserveComments:
        "Mantém comentários ao minificar. Desativar não aplica compressão nem encurta identificadores.",
    },
    sql: {
      dialect:
        "Escolhe a gramática do banco de dados. SQL padrão é um subconjunto comum, não detecção automática.",
      keywordCase:
        "Altera apenas palavras-chave SQL reconhecidas; identificadores, nomes entre aspas e strings permanecem.",
    },
  }),
  it: define({
    triggerLabel: "Maggiori informazioni",
    base64: {
      charset:
        "Interpreta i byte decodificati come testo con questa codifica, senza modificare i dati Base64.",
      variant:
        "Il formato standard usa + e /, quello sicuro per URL - e _. Automatico accetta entrambi gli alfabeti.",
      outputView:
        "Testo usa la codifica scelta. Esadecimale mostra il valore di ogni byte decodificato.",
      strict:
        "Rifiuta input non canonici invece di correggere spazi, padding o differenze di alfabeto.",
      lineByLine:
        "Tratta ogni riga non vuota come un valore Base64 separato e conserva gli a capo tra i risultati.",
      autoRepair:
        "Rimuove gli spazi, normalizza l’alfabeto sicuro per URL e ripristina il padding = quando possibile.",
      recursive:
        "Continua a decodificare se il risultato leggibile sembra ancora Base64, fino al limite di sicurezza.",
      lenientRepair:
        "Scarta i caratteri non Base64 rimasti dopo le correzioni comuni. Usalo solo con input danneggiati.",
      includePadding:
        "Aggiunge = alla fine affinché la lunghezza codificata sia un multiplo di quattro.",
      mimeWrap:
        "Inserisce un a capo ogni 76 caratteri per i formati di trasferimento MIME.",
      dataUri:
        "Aggiunge il prefisso data:...;base64, per incorporare il risultato in URL, HTML o CSS.",
    },
    caseConverter: {
      sentence:
        "Converte in minuscolo e rende maiuscola la prima lettera dopo l’inizio, un a capo o la fine di una frase.",
      capitalizeWords:
        "Rende maiuscola la prima lettera di ogni parola rilevata meccanicamente, senza regole editoriali della lingua.",
    },
    time: {
      unit: "Automatico tratta 1–10 cifre come secondi e 13 come millisecondi. Scegli l’unità per 11–12 cifre.",
      zoneMode:
        "Ora locale segue il dispositivo, l’offset UTC resta fisso e una zona IANA segue l’ora legale regionale.",
      disambiguation:
        "Stabilisce il risultato quando un’ora locale non esiste o ricorre due volte durante il cambio d’ora.",
    },
    url: {
      scope:
        "Componente URL codifica i separatori di un valore. URI completo conserva :, /, ?, # e & dell’indirizzo.",
      formSpace:
        "Usa + per gli spazi nei dati dei moduli. In un URL normale, + e spazio sono caratteri diversi.",
      recursive:
        "Decodifica di nuovo finché restano sequenze percentuali valide, fino al limite di sicurezza scelto.",
    },
    qr: {
      errorCorrection:
        "Livelli più alti recuperano più area danneggiata, ma rendono il QR più denso a parità di contenuto.",
      quietZone:
        "Imposta il margine vuoto intorno al QR in moduli. Quattro moduli sono il minimo standard abituale.",
    },
    data: {
      delimiter:
        "Imposta il carattere che separa i campi CSV. Automatico rileva il delimitatore più probabile.",
      firstRowHeader:
        "Usa la prima riga CSV come intestazioni delle colonne Markdown anziché come dati.",
    },
    formatter: {
      printWidth:
        "Lunghezza preferita prima di spezzare le righe adatte. È un obiettivo di formato, non un limite rigido.",
      semicolons:
        "Aggiunge punti e virgola secondo le regole JavaScript del formattatore, non a ogni istruzione in modo meccanico.",
      singleQuotes:
        "Preferisce apici singoli senza escape aggiuntivi; altrimenti mantiene la forma più sicura.",
      preserveComments:
        "Mantiene i commenti durante la minificazione. Disattivarlo non comprime né rinomina gli identificatori.",
    },
    sql: {
      dialect:
        "Seleziona la grammatica del database. SQL standard è un sottoinsieme comune, non un rilevamento automatico.",
      keywordCase:
        "Modifica solo le parole chiave SQL riconosciute; identificatori, nomi quotati e stringhe restano invariati.",
    },
  }),
  nl: define({
    triggerLabel: "Meer informatie",
    base64: {
      charset:
        "Leest gedecodeerde bytes met deze tekencodering als tekst, zonder de Base64-gegevens zelf te wijzigen.",
      variant:
        "Standaard gebruikt + en /, URL-veilig gebruikt - en _. Automatisch accepteert beide alfabetten.",
      outputView:
        "Tekst gebruikt de gekozen tekencodering. Hex toont elke gedecodeerde byte als hexadecimale waarde.",
      strict:
        "Weigert niet-canonieke invoer in plaats van witruimte, opvulling of alfabetverschillen te herstellen.",
      lineByLine:
        "Behandelt elke niet-lege regel als een aparte Base64-waarde en behoudt regeleinden tussen resultaten.",
      autoRepair:
        "Verwijdert witruimte, normaliseert het URL-veilige alfabet en herstelt ontbrekende =-opvulling indien veilig.",
      recursive:
        "Decodeert verder als het leesbare resultaat opnieuw op Base64 lijkt, tot de veiligheidslimiet.",
      lenientRepair:
        "Verwijdert resterende niet-Base64-tekens na gewone reparaties. Alleen gebruiken voor beschadigde invoer.",
      includePadding:
        "Voegt achteraan = toe zodat de gecodeerde lengte een veelvoud van vier is.",
      mimeWrap:
        "Voegt voor MIME-overdracht na elke 76 tekens een regeleinde in.",
      dataUri:
        "Voegt het voorvoegsel data:...;base64, toe voor gebruik in URL, HTML of CSS.",
    },
    caseConverter: {
      sentence:
        "Maakt de tekst klein en de eerste letter na begin, regeleinde of zinsafsluiting groot.",
      capitalizeWords:
        "Maakt de eerste letter van elk mechanisch herkend woord groot; taalspecifieke titelregels gelden niet.",
    },
    time: {
      unit: "Automatisch ziet 1–10 cijfers als seconden en 13 als milliseconden. Kies bij 11–12 cijfers zelf de eenheid.",
      zoneMode:
        "Browser lokaal volgt dit apparaat, UTC-offset blijft vast en een IANA-zone volgt regionale zomertijdregels.",
      disambiguation:
        "Bepaalt wat gebeurt als een lokale tijd tijdens een tijdwissel wordt overgeslagen of tweemaal voorkomt.",
    },
    url: {
      scope:
        "URL-component codeert scheidingstekens in één waarde. Volledige URI behoudt :, /, ?, # en & van het adres.",
      formSpace:
        "Gebruikt + voor spaties in formuliergegevens. In een gewone URL zijn + en spatie verschillend.",
      recursive:
        "Decodeert opnieuw zolang geldige procentcoderingen overblijven, tot de gekozen veiligheidslimiet.",
    },
    qr: {
      errorCorrection:
        "Hogere niveaus herstellen meer beschadigd oppervlak, maar maken dezelfde QR-code dichter.",
      quietZone:
        "Stelt de lege rand rond de QR-code in modules in. Vier modules is het gebruikelijke standaardminimum.",
    },
    data: {
      delimiter:
        "Stelt het teken tussen CSV-velden in. Automatisch detecteert het waarschijnlijkste scheidingsteken.",
      firstRowHeader:
        "Gebruikt de eerste CSV-regel als Markdown-kolomkoppen in plaats van als gegevens.",
    },
    formatter: {
      printWidth:
        "Voorkeurslengte voordat geschikte code wordt afgebroken. Dit is een opmaakdoel, geen harde limiet.",
      semicolons:
        "Voegt puntkomma’s toe volgens de JavaScript-regels van de formatter, niet mechanisch na elke instructie.",
      singleQuotes:
        "Geeft de voorkeur aan enkele aanhalingstekens zonder extra escapes; anders blijft de veiligere vorm staan.",
      preserveComments:
        "Behoudt opmerkingen bij minimaliseren. Uitschakelen voert geen compressie of verkorting van namen uit.",
    },
    sql: {
      dialect:
        "Kiest de databasegrammatica. Standaard-SQL is een gemeenschappelijke subset, geen automatische detectie.",
      keywordCase:
        "Wijzigt alleen herkende SQL-trefwoorden; identifiers, aangehaalde namen en tekenreeksen blijven gelijk.",
    },
  }),
  sv: define({
    triggerLabel: "Mer information",
    base64: {
      charset:
        "Tolkar avkodade byte som text med denna teckenkodning utan att ändra Base64-data.",
      variant:
        "Standard använder + och /, URL-säker använder - och _. Automatiskt accepterar båda alfabeten.",
      outputView:
        "Text använder vald teckenkodning. Hex visar varje avkodad byte som ett hexadecimalt värde.",
      strict:
        "Avvisar icke-kanonisk indata i stället för att reparera blanksteg, utfyllnad eller alfabetsskillnader.",
      lineByLine:
        "Behandlar varje icke-tom rad som ett eget Base64-värde och behåller radbrytningar mellan resultaten.",
      autoRepair:
        "Tar bort blanksteg, normaliserar URL-säkert alfabet och återställer saknad =-utfyllnad när det är säkert.",
      recursive:
        "Fortsätter avkoda om det läsbara resultatet åter ser ut som Base64, upp till säkerhetsgränsen.",
      lenientRepair:
        "Kastar återstående tecken som inte är Base64 efter vanliga reparationer. Använd bara för skadad indata.",
      includePadding:
        "Lägger till = på slutet så att den kodade längden blir delbar med fyra.",
      mimeWrap:
        "Infogar en radbrytning var 76:e tecken för MIME-överföringsformat.",
      dataUri:
        "Lägger till prefixet data:...;base64, för inbäddning i URL, HTML eller CSS.",
    },
    caseConverter: {
      sentence:
        "Gör texten gemen och första bokstaven efter start, radbrytning eller meningsslut versal.",
      capitalizeWords:
        "Gör första bokstaven i varje mekaniskt upptäckt ord versal utan språkspecifika titelregler.",
    },
    time: {
      unit: "Automatiskt tolkar 1–10 siffror som sekunder och 13 som millisekunder. Välj enhet för 11–12 siffror.",
      zoneMode:
        "Lokal tid följer enheten, UTC-förskjutning är fast och en IANA-zon följer regional sommartid.",
      disambiguation:
        "Bestämmer vad som sker när en lokal tid hoppas över eller inträffar två gånger vid tidsomställning.",
    },
    url: {
      scope:
        "URL-komponent kodar avgränsare i ett värde. Fullständig URI bevarar :, /, ?, # och & i adressen.",
      formSpace:
        "Använder + för blanksteg i formulärdata. I en vanlig URL är + och blanksteg olika tecken.",
      recursive:
        "Avkodar igen medan giltiga procentsekvenser återstår, upp till vald säkerhetsgräns.",
    },
    qr: {
      errorCorrection:
        "Högre nivåer återställer mer skadad yta men ger en tätare QR-kod för samma innehåll.",
      quietZone:
        "Anger den tomma marginalen runt QR-koden i moduler. Fyra moduler är vanligt standardminimum.",
    },
    data: {
      delimiter:
        "Anger tecknet som skiljer CSV-fält. Automatiskt hittar den troligaste avgränsaren.",
      firstRowHeader:
        "Använder första CSV-raden som Markdown-kolumnrubriker i stället för data.",
    },
    formatter: {
      printWidth:
        "Föredragen radlängd innan lämplig kod bryts. Det är ett formateringsmål, inte en hård gräns.",
      semicolons:
        "Lägger till semikolon enligt formaterarens JavaScript-regler, inte mekaniskt efter varje sats.",
      singleQuotes:
        "Föredrar enkla citattecken utan extra escape-tecken, annars behålls det säkrare valet.",
      preserveComments:
        "Behåller kommentarer vid minifiering. Avstängt utför ingen komprimering eller namnförkortning.",
    },
    sql: {
      dialect:
        "Väljer databasens grammatik. Standard-SQL är en gemensam delmängd, inte automatisk identifiering.",
      keywordCase:
        "Ändrar bara kända SQL-nyckelord; identifierare, citerade namn och strängar behåller skiftläge.",
    },
  }),
  cs: define({
    triggerLabel: "Další informace",
    base64: {
      charset:
        "Interpretuje dekódované bajty jako text v tomto kódování, aniž by měnil samotná data Base64.",
      variant:
        "Standard používá + a /, varianta pro URL - a _. Automatická volba přijímá obě abecedy.",
      outputView:
        "Text použije zvolené kódování. Hex zobrazí každý dekódovaný bajt jako šestnáctkovou hodnotu.",
      strict:
        "Odmítne nekanonický vstup místo oprav mezer, výplně nebo rozdílů abecedy.",
      lineByLine:
        "Každý neprázdný řádek zpracuje jako samostatnou hodnotu Base64 a zachová mezi výsledky zalomení.",
      autoRepair:
        "Odstraní mezery, sjednotí abecedu pro URL a bezpečně doplní chybějící výplň =.",
      recursive:
        "Pokračuje v dekódování, pokud čitelný výsledek znovu vypadá jako Base64, až po bezpečnostní limit.",
      lenientRepair:
        "Po běžných opravách zahodí zbývající znaky mimo Base64. Používejte jen pro poškozený vstup.",
      includePadding:
        "Přidá na konec =, aby délka kódovaného textu byla násobkem čtyř.",
      mimeWrap: "Pro přenosové formáty MIME vloží zalomení každých 76 znaků.",
      dataUri:
        "Přidá předponu data:...;base64, pro vložení do URL, HTML nebo CSS.",
    },
    caseConverter: {
      sentence:
        "Převede text na malá písmena a zvětší první písmeno po začátku, zalomení nebo konci věty.",
      capitalizeWords:
        "Zvětší první písmeno každého mechanicky rozpoznaného slova; nepoužívá jazyková pravidla titulků.",
    },
    time: {
      unit: "Automaticky chápe 1–10 číslic jako sekundy a 13 jako milisekundy. Pro 11–12 číslic vyberte jednotku.",
      zoneMode:
        "Místní čas používá pravidla zařízení, posun UTC je pevný a zóna IANA sleduje regionální letní čas.",
      disambiguation:
        "Určuje výsledek, když místní čas při změně času neexistuje nebo nastane dvakrát.",
    },
    url: {
      scope:
        "Součást URL kóduje oddělovače jedné hodnoty. Celé URI zachová :, /, ?, # a & adresy.",
      formSpace:
        "V datech formuláře používá + pro mezery. V běžné URL jsou + a mezera různé znaky.",
      recursive:
        "Dekóduje znovu, dokud zůstávají platné procentní sekvence, nejvýše po zvolený bezpečnostní limit.",
    },
    qr: {
      errorCorrection:
        "Vyšší úroveň obnoví větší poškozenou plochu, ale stejný obsah vytvoří hustší QR kód.",
      quietZone:
        "Nastaví prázdný okraj kolem QR kódu v modulech. Obvyklé standardní minimum jsou čtyři moduly.",
    },
    data: {
      delimiter:
        "Nastaví znak oddělující pole CSV. Automatická volba zjistí nejpravděpodobnější oddělovač.",
      firstRowHeader:
        "Použije první řádek CSV jako záhlaví sloupců Markdown, nikoli jako data.",
    },
    formatter: {
      printWidth:
        "Upřednostněná délka řádku pro vhodné zalomení. Je to cíl formátování, ne pevný limit.",
      semicolons:
        "Přidá středníky podle pravidel JavaScriptového formátovače, nikoli mechanicky za každý příkaz.",
      singleQuotes:
        "Upřednostní jednoduché uvozovky bez dalších escape znaků; jinak zachová bezpečnější variantu.",
      preserveComments:
        "Při minifikaci zachová komentáře. Vypnutí neprovádí kompresi ani zkracování identifikátorů.",
    },
    sql: {
      dialect:
        "Vybere gramatiku databáze. Standardní SQL je společná podmnožina, ne automatická detekce.",
      keywordCase:
        "Mění jen rozpoznaná klíčová slova SQL; identifikátory, citované názvy a řetězce zachová.",
    },
  }),
  pl: define({
    triggerLabel: "Więcej informacji",
    base64: {
      charset:
        "Interpretuje zdekodowane bajty jako tekst w tym kodowaniu, bez zmiany samych danych Base64.",
      variant:
        "Standard używa + i /, wariant URL - i _. Tryb automatyczny przyjmuje oba alfabety.",
      outputView:
        "Tekst używa wybranego kodowania. Hex pokazuje każdy zdekodowany bajt jako wartość szesnastkową.",
      strict:
        "Odrzuca niekanoniczne dane zamiast naprawiać odstępy, dopełnienie lub różnice alfabetu.",
      lineByLine:
        "Traktuje każdy niepusty wiersz jako osobną wartość Base64 i zachowuje podziały między wynikami.",
      autoRepair:
        "Usuwa odstępy, normalizuje alfabet URL i bezpiecznie uzupełnia brakujące znaki =.",
      recursive:
        "Dekoduje dalej, jeśli czytelny wynik znów wygląda jak Base64, aż do limitu bezpieczeństwa.",
      lenientRepair:
        "Po typowych naprawach odrzuca pozostałe znaki spoza Base64. Używaj tylko dla uszkodzonych danych.",
      includePadding:
        "Dodaje na końcu =, aby długość zakodowanej wartości była wielokrotnością czterech.",
      mimeWrap:
        "Wstawia podział wiersza co 76 znaków dla formatów przesyłania MIME.",
      dataUri:
        "Dodaje prefiks data:...;base64, do osadzania wyniku w URL, HTML lub CSS.",
    },
    caseConverter: {
      sentence:
        "Zmienia tekst na małe litery, a pierwszą literę po początku, nowym wierszu lub końcu zdania na wielką.",
      capitalizeWords:
        "Zmienia pierwszą literę każdego mechanicznie wykrytego słowa na wielką; nie stosuje reguł tytułów danego języka.",
    },
    time: {
      unit: "Automatycznie uznaje 1–10 cyfr za sekundy, a 13 za milisekundy. Dla 11–12 cyfr wybierz jednostkę.",
      zoneMode:
        "Czas lokalny stosuje reguły urządzenia, przesunięcie UTC jest stałe, a strefa IANA uwzględnia czas letni.",
      disambiguation:
        "Określa wynik, gdy czas lokalny podczas zmiany czasu nie istnieje albo występuje dwa razy.",
    },
    url: {
      scope:
        "Składnik URL koduje separatory jednej wartości. Pełny URI zachowuje :, /, ?, # i & adresu.",
      formSpace:
        "Używa + dla spacji w danych formularza. W zwykłym URL znak + i spacja są różne.",
      recursive:
        "Dekoduje ponownie, dopóki pozostają poprawne sekwencje procentowe, do wybranego limitu bezpieczeństwa.",
    },
    qr: {
      errorCorrection:
        "Wyższy poziom odtwarza większy uszkodzony obszar, ale zagęszcza kod QR dla tej samej treści.",
      quietZone:
        "Ustawia pusty margines wokół QR w modułach. Cztery moduły to typowe minimum standardu.",
    },
    data: {
      delimiter:
        "Ustawia znak oddzielający pola CSV. Tryb automatyczny wykrywa najbardziej prawdopodobny separator.",
      firstRowHeader:
        "Używa pierwszego wiersza CSV jako nagłówków kolumn Markdown zamiast danych.",
    },
    formatter: {
      printWidth:
        "Preferowana długość przed odpowiednim łamaniem wierszy. To cel formatowania, a nie sztywny limit.",
      semicolons:
        "Dodaje średniki zgodnie z regułami JavaScript formatera, nie mechanicznie po każdej instrukcji.",
      singleQuotes:
        "Preferuje apostrofy bez dodatkowego escaping; w przeciwnym razie zachowuje bezpieczniejszy zapis.",
      preserveComments:
        "Zachowuje komentarze przy minifikacji. Wyłączenie nie kompresuje ani nie skraca identyfikatorów.",
    },
    sql: {
      dialect:
        "Wybiera gramatykę bazy danych. Standard SQL to wspólny podzbiór, a nie automatyczne wykrywanie.",
      keywordCase:
        "Zmienia tylko rozpoznane słowa kluczowe SQL; identyfikatory, nazwy cytowane i ciągi pozostają bez zmian.",
    },
  }),
  da: define({
    triggerLabel: "Flere oplysninger",
    base64: {
      charset:
        "Fortolker afkodede byte som tekst med denne tegnkodning uden at ændre selve Base64-dataene.",
      variant:
        "Standard bruger + og /, URL-sikker bruger - og _. Automatisk accepterer begge alfabeter.",
      outputView:
        "Tekst bruger den valgte tegnkodning. Hex viser hver afkodet byte som en hexadecimal værdi.",
      strict:
        "Afviser ikke-kanonisk input i stedet for at reparere mellemrum, udfyldning eller alfabetforskelle.",
      lineByLine:
        "Behandler hver ikke-tom linje som en separat Base64-værdi og bevarer linjeskift mellem resultaterne.",
      autoRepair:
        "Fjerner mellemrum, normaliserer det URL-sikre alfabet og gendanner manglende =-udfyldning, når det er sikkert.",
      recursive:
        "Fortsætter afkodning, hvis det læsbare resultat igen ligner Base64, op til sikkerhedsgrænsen.",
      lenientRepair:
        "Kasserer resterende tegn uden for Base64 efter almindelige reparationer. Brug kun til beskadiget input.",
      includePadding:
        "Tilføjer = til sidst, så den kodede længde er delelig med fire.",
      mimeWrap:
        "Indsætter linjeskift for hver 76 tegn til MIME-overførselsformater.",
      dataUri:
        "Tilføjer præfikset data:...;base64, til indlejring i URL, HTML eller CSS.",
    },
    caseConverter: {
      sentence:
        "Gør teksten lille og det første bogstav efter start, linjeskift eller sætningsslutning stort.",
      capitalizeWords:
        "Gør første bogstav i hvert mekanisk fundet ord stort uden sprogspecifikke titelregler.",
    },
    time: {
      unit: "Automatisk tolker 1–10 cifre som sekunder og 13 som millisekunder. Vælg enhed for 11–12 cifre.",
      zoneMode:
        "Lokal tid følger enheden, UTC-forskydning er fast, og en IANA-zone følger regional sommertid.",
      disambiguation:
        "Bestemmer resultatet, når en lokal tid springes over eller forekommer to gange ved tidsskifte.",
    },
    url: {
      scope:
        "URL-komponent koder skilletegn i én værdi. Fuld URI bevarer :, /, ?, # og & i adressen.",
      formSpace:
        "Bruger + for mellemrum i formulardata. I en almindelig URL er + og mellemrum forskellige tegn.",
      recursive:
        "Afkoder igen, mens gyldige procentsekvenser er tilbage, op til den valgte sikkerhedsgrænse.",
    },
    qr: {
      errorCorrection:
        "Højere niveauer gendanner mere beskadiget areal, men gør QR-koden tættere for samme indhold.",
      quietZone:
        "Angiver den tomme margen omkring QR-koden i moduler. Fire moduler er det normale standardminimum.",
    },
    data: {
      delimiter:
        "Angiver tegnet mellem CSV-felter. Automatisk registrerer det mest sandsynlige skilletegn.",
      firstRowHeader:
        "Bruger første CSV-række som Markdown-kolonneoverskrifter i stedet for data.",
    },
    formatter: {
      printWidth:
        "Foretrukken linjelængde før passende ombrydning. Det er et formateringsmål, ikke en fast grænse.",
      semicolons:
        "Tilføjer semikoloner efter formatterens JavaScript-regler, ikke mekanisk efter hver sætning.",
      singleQuotes:
        "Foretrækker enkelte anførselstegn uden ekstra escape-tegn; ellers bevares den sikrere form.",
      preserveComments:
        "Bevarer kommentarer ved minificering. Deaktivering udfører ikke komprimering eller forkortelse af navne.",
    },
    sql: {
      dialect:
        "Vælger databasegrammatikken. Standard-SQL er en fælles delmængde, ikke automatisk registrering.",
      keywordCase:
        "Ændrer kun genkendte SQL-nøgleord; identifikatorer, citerede navne og strenge bevares.",
    },
  }),
  no: define({
    triggerLabel: "Mer informasjon",
    base64: {
      charset:
        "Tolker dekodede byte som tekst med denne tegnkodingen uten å endre selve Base64-dataene.",
      variant:
        "Standard bruker + og /, URL-sikker bruker - og _. Automatisk godtar begge alfabetene.",
      outputView:
        "Tekst bruker valgt tegnkoding. Hex viser hver dekodet byte som en heksadesimal verdi.",
      strict:
        "Avviser ikke-kanonisk inndata i stedet for å reparere mellomrom, utfylling eller alfabetforskjeller.",
      lineByLine:
        "Behandler hver ikke-tomme linje som en egen Base64-verdi og beholder linjeskift mellom resultatene.",
      autoRepair:
        "Fjerner mellomrom, normaliserer URL-sikkert alfabet og gjenoppretter manglende =-utfylling når det er trygt.",
      recursive:
        "Fortsetter dekoding hvis det lesbare resultatet igjen ser ut som Base64, opp til sikkerhetsgrensen.",
      lenientRepair:
        "Forkaster gjenværende tegn utenfor Base64 etter vanlige reparasjoner. Bruk bare for skadet inndata.",
      includePadding:
        "Legger til = på slutten slik at den kodede lengden blir delelig med fire.",
      mimeWrap:
        "Setter inn et linjeskift for hver 76 tegn for MIME-overføringsformater.",
      dataUri:
        "Legger til prefikset data:...;base64, for innbygging i URL, HTML eller CSS.",
    },
    caseConverter: {
      sentence:
        "Gjør teksten liten og første bokstav etter start, linjeskift eller setningsslutt stor.",
      capitalizeWords:
        "Gjør første bokstav i hvert mekanisk oppdaget ord stor uten språkspesifikke tittelregler.",
    },
    time: {
      unit: "Automatisk tolker 1–10 sifre som sekunder og 13 som millisekunder. Velg enhet for 11–12 sifre.",
      zoneMode:
        "Lokal tid følger enheten, UTC-forskyvning er fast, og en IANA-sone følger regional sommertid.",
      disambiguation:
        "Bestemmer resultatet når en lokal tid hoppes over eller forekommer to ganger ved tidsomstilling.",
    },
    url: {
      scope:
        "URL-komponent koder skilletegn i én verdi. Full URI beholder :, /, ?, # og & i adressen.",
      formSpace:
        "Bruker + for mellomrom i skjemadata. I en vanlig URL er + og mellomrom forskjellige tegn.",
      recursive:
        "Dekoder på nytt mens gyldige prosentsekvenser gjenstår, opp til valgt sikkerhetsgrense.",
    },
    qr: {
      errorCorrection:
        "Høyere nivåer gjenoppretter mer skadet areal, men gir en tettere QR-kode for samme innhold.",
      quietZone:
        "Angir den tomme margen rundt QR-koden i moduler. Fire moduler er vanlig standardminimum.",
    },
    data: {
      delimiter:
        "Angir tegnet som skiller CSV-felt. Automatisk finner det mest sannsynlige skilletegnet.",
      firstRowHeader:
        "Bruker første CSV-rad som Markdown-kolonneoverskrifter i stedet for data.",
    },
    formatter: {
      printWidth:
        "Foretrukket linjelengde før passende bryting. Det er et formateringsmål, ikke en fast grense.",
      semicolons:
        "Legger til semikolon etter formattererens JavaScript-regler, ikke mekanisk etter hver setning.",
      singleQuotes:
        "Foretrekker enkle anførselstegn uten ekstra escape-tegn; ellers beholdes den tryggere formen.",
      preserveComments:
        "Beholder kommentarer ved minifisering. Deaktivering utfører ikke komprimering eller navneforkorting.",
    },
    sql: {
      dialect:
        "Velger databasegrammatikken. Standard SQL er et felles delsett, ikke automatisk gjenkjenning.",
      keywordCase:
        "Endrer bare gjenkjente SQL-nøkkelord; identifikatorer, siterte navn og strenger beholdes.",
    },
  }),
  ar: define({
    triggerLabel: "مزيد من المعلومات",
    base64: {
      charset:
        "يفسّر البايتات بعد فك الترميز كنص وفق ترميز المحارف هذا، من دون تغيير بيانات Base64 نفسها.",
      variant:
        "يستخدم التنسيق القياسي + و/، ويستخدم الآمن للرابط - و_. يقبل الوضع التلقائي الأبجديتين.",
      outputView:
        "يعرض النص وفق ترميز المحارف المختار، بينما يعرض السداسي العشري قيمة كل بايت.",
      strict:
        "يرفض الإدخال غير القياسي بدل إصلاح المسافات أو الحشو أو اختلاف الأبجدية.",
      lineByLine:
        "يعامل كل سطر غير فارغ كقيمة Base64 مستقلة ويحافظ على فواصل الأسطر بين النتائج.",
      autoRepair:
        "يزيل المسافات ويوحّد أبجدية الروابط ويعيد حشو = المفقود عندما يكون ذلك آمناً.",
      recursive:
        "يواصل فك الترميز إذا بدت النتيجة المقروءة كـBase64 مرة أخرى، حتى حد الأمان.",
      lenientRepair:
        "يحذف المحارف المتبقية خارج Base64 بعد الإصلاحات المعتادة. استخدمه فقط للإدخال التالف.",
      includePadding:
        "يضيف = في النهاية ليصبح طول النص المرمّز من مضاعفات أربعة.",
      mimeWrap: "يضيف سطراً جديداً كل 76 محرفاً لتنسيقات نقل MIME.",
      dataUri:
        "يضيف البادئة data:...;base64, لتضمين النتيجة في رابط أو HTML أو CSS.",
    },
    caseConverter: {
      sentence:
        "يحوّل النص إلى أحرف صغيرة ثم يكبّر أول حرف بعد البداية أو سطر جديد أو علامة نهاية جملة.",
      capitalizeWords:
        "يكبّر أول حرف في كل كلمة مكتشفة آلياً، ولا يطبّق قواعد العناوين الخاصة باللغة.",
    },
    time: {
      unit: "يعد الوضع التلقائي 1–10 أرقام ثواني و13 رقماً ميلي ثانية. اختر الوحدة لقيم 11–12 رقماً.",
      zoneMode:
        "يتبع المحلي قواعد الجهاز، ويبقى فرق UTC ثابتاً، وتتبع منطقة IANA تغييرات التوقيت الصيفي الإقليمية.",
      disambiguation:
        "يحدد النتيجة عندما يُتخطى وقت محلي أو يتكرر مرتين أثناء انتقال التوقيت الصيفي.",
    },
    url: {
      scope:
        "يرمّز مكوّن الرابط الفواصل داخل قيمة واحدة. يحافظ URI الكامل على :, /, ?, # و& في العنوان.",
      formSpace:
        "يستخدم + للمسافات في بيانات النماذج. في الرابط العادي يختلف + عن المسافة.",
      recursive:
        "يعيد فك الترميز ما دامت تسلسلات النسبة المئوية الصالحة موجودة، حتى حد الأمان المختار.",
    },
    qr: {
      errorCorrection:
        "تستعيد المستويات الأعلى مساحة تالفة أكبر، لكنها تجعل رمز QR أكثر كثافة للمحتوى نفسه.",
      quietZone:
        "يضبط الهامش الفارغ حول رمز QR بوحدات المربعات. أربع وحدات هي الحد القياسي المعتاد.",
    },
    data: {
      delimiter:
        "يحدد المحرف الفاصل بين حقول CSV. يكتشف الوضع التلقائي الفاصل الأكثر احتمالاً.",
      firstRowHeader:
        "يستخدم أول صف CSV عناوين لأعمدة Markdown بدلاً من اعتباره بيانات.",
    },
    formatter: {
      printWidth:
        "طول السطر المفضل قبل الالتفاف المناسب. هو هدف للتنسيق وليس حداً صارماً للمحارف.",
      semicolons:
        "يضيف الفواصل المنقوطة وفق قواعد JavaScript للمنسّق، لا آلياً بعد كل عبارة.",
      singleQuotes:
        "يفضل علامات الاقتباس المفردة إذا لم تحتج إلى تهريب إضافي، وإلا يحافظ على الشكل الأكثر أماناً.",
      preserveComments:
        "يحافظ على التعليقات أثناء التصغير. إيقافه لا يضغط الشفرة ولا يختصر أسماء المعرّفات.",
    },
    sql: {
      dialect:
        "يختار قواعد بيانات اللهجة المطلوبة. SQL القياسي مجموعة مشتركة وليس كشفاً تلقائياً للهجة.",
      keywordCase:
        "يغيّر حالة كلمات SQL المعروفة فقط، ويحافظ على المعرّفات والأسماء المقتبسة والنصوص.",
    },
  }),
  "zh-TW": define({
    triggerLabel: "更多說明",
    base64: {
      charset:
        "以這個字元編碼將解碼後的位元組解讀為文字，不會改變Base64資料本身。",
      variant:
        "標準格式使用+與/，URL安全格式使用-與_；自動模式接受兩種字母表。",
      outputView:
        "文字會套用所選字元編碼；十六進位則顯示每個解碼位元組的數值。",
      strict: "不修復空白、填充或字母表差異，直接拒絕不符合標準形式的輸入。",
      lineByLine:
        "將每個非空白行視為獨立Base64值，並保留各解碼結果之間的換行。",
      autoRepair: "移除空白、正規化URL安全字母表，並在安全時補回遺漏的=填充。",
      recursive: "若可讀的解碼結果看起來仍是Base64，會在安全上限內繼續解碼。",
      lenientRepair:
        "一般修復後再捨棄剩餘的非Base64字元。僅建議用於已損壞的輸入。",
      includePadding: "在結尾加入=，使編碼結果長度成為4的倍數。",
      mimeWrap: "依MIME傳輸格式，每76個字元插入一次換行。",
      dataUri: "加入data:...;base64,前綴，方便嵌入URL、HTML或CSS。",
    },
    caseConverter: {
      sentence:
        "先轉為小寫，再將開頭、換行或句末標點後第一個有大小寫的字母轉為大寫。",
      capitalizeWords:
        "將機械判定的每個單字首字母轉為大寫，不套用各語言的標題書寫規則。",
    },
    time: {
      unit: "自動模式將1至10位整數視為秒、13位視為毫秒；11至12位數值請手動選擇單位。",
      zoneMode:
        "瀏覽器本地時間採用裝置規則，UTC偏移為固定值，IANA時區則依地區日光節約時間變化。",
      disambiguation:
        "決定日光節約時間切換時，本地時間被略過或重複出現兩次的處理方式。",
    },
    url: {
      scope:
        "URL元件會編碼單一值內的分隔符；完整URI會保留地址中的:、/、?、#與&。",
      formSpace:
        "在表單格式查詢資料中以+表示空格。一般URL裡的+與空格是不同字元。",
      recursive: "只要結果仍含有效百分比編碼，就在所選安全上限內再次解碼。",
    },
    qr: {
      errorCorrection:
        "等級越高，可復原的受損面積越大，但相同內容產生的QR Code也會更密集。",
      quietZone: "以模組為單位設定QR Code外圍留白。一般標準最低值為4個模組。",
    },
    data: {
      delimiter:
        "設定分隔CSV欄位的字元。自動模式會從輸入中判斷最可能的分隔符。",
      firstRowHeader: "將CSV第一列作為Markdown表格欄名，而不是一般資料。",
    },
    formatter: {
      printWidth:
        "格式化工具在適當位置換行時參考的偏好長度，不是硬性的字元上限。",
      semicolons:
        "依格式化工具的JavaScript規則加入分號，不會機械式修改每個陳述式結尾。",
      singleQuotes: "不需額外跳脫時優先使用單引號，否則保留較安全的引號形式。",
      preserveComments:
        "精簡時保留註解。關閉後只移除註解，不會壓縮最佳化或縮短識別字。",
    },
    sql: {
      dialect:
        "選擇格式化時使用的資料庫語法。標準SQL是共通子集，不是自動偵測方言。",
      keywordCase:
        "只變更已辨識SQL關鍵字的大小寫；識別字、引號名稱與字串值保持原樣。",
    },
  }),
  tr: define({
    triggerLabel: "Daha fazla bilgi",
    base64: {
      charset:
        "Çözülen baytları bu karakter kodlamasıyla metin olarak yorumlar; Base64 verisini değiştirmez.",
      variant:
        "Standart + ve /, URL güvenli - ve _ kullanır. Otomatik iki alfabeyi de kabul eder.",
      outputView:
        "Metin seçilen karakter kodlamasını kullanır. Onaltılık görünüm her baytın değerini gösterir.",
      strict:
        "Boşluk, dolgu veya alfabe farklarını onarmak yerine standart dışı girdiyi reddeder.",
      lineByLine:
        "Boş olmayan her satırı ayrı bir Base64 değeri sayar ve sonuçlar arasındaki satır sonlarını korur.",
      autoRepair:
        "Boşlukları kaldırır, URL güvenli alfabeyi normalleştirir ve güvenliyse eksik = dolgusunu tamamlar.",
      recursive:
        "Okunabilir sonuç yeniden Base64 gibi görünüyorsa güvenlik sınırına kadar çözmeye devam eder.",
      lenientRepair:
        "Yaygın onarımlardan sonra kalan Base64 dışı karakterleri atar. Yalnızca bozuk girdilerde kullanın.",
      includePadding:
        "Kodlanmış uzunluğu dördün katı yapmak için sona = karakterleri ekler.",
      mimeWrap:
        "MIME aktarım biçimleri için her 76 karakterde bir satır sonu ekler.",
      dataUri:
        "Sonucu URL, HTML veya CSS içine gömmek için data:...;base64, önekini ekler.",
    },
    caseConverter: {
      sentence:
        "Metni küçültür; başlangıç, satır sonu veya cümle bitişinden sonraki ilk harfi büyütür.",
      capitalizeWords:
        "Mekanik olarak algılanan her sözcüğün ilk harfini büyütür; dile özgü başlık kurallarını uygulamaz.",
    },
    time: {
      unit: "Otomatik, 1–10 basamağı saniye ve 13 basamağı milisaniye sayar. 11–12 basamak için birim seçin.",
      zoneMode:
        "Yerel saat cihaz kurallarını, UTC farkı sabit değeri, IANA bölgesi ise bölgesel yaz saatini kullanır.",
      disambiguation:
        "Yaz saati geçişinde yerel saat atlandığında veya iki kez oluştuğunda sonucu belirler.",
    },
    url: {
      scope:
        "URL bileşeni tek değerdeki ayırıcıları kodlar. Tam URI adresteki :, /, ?, # ve & işaretlerini korur.",
      formSpace:
        "Form verilerinde boşluk için + kullanır. Normal URL’de + ile boşluk farklı karakterlerdir.",
      recursive:
        "Geçerli yüzde dizileri kaldığı sürece seçilen güvenlik sınırına kadar yeniden çözer.",
    },
    qr: {
      errorCorrection:
        "Yüksek düzeyler daha fazla hasarlı alanı kurtarır, ancak aynı içerik için QR kodunu yoğunlaştırır.",
      quietZone:
        "QR kodu çevresindeki boş kenarı modül cinsinden ayarlar. Dört modül yaygın standart alt sınırdır.",
    },
    data: {
      delimiter:
        "CSV alanlarını ayıran karakteri belirler. Otomatik en olası ayırıcıyı algılar.",
      firstRowHeader:
        "İlk CSV satırını veri yerine Markdown sütun başlıkları olarak kullanır.",
    },
    formatter: {
      printWidth:
        "Uygun kodun kaydırılmasından önce tercih edilen satır uzunluğudur; kesin bir sınır değildir.",
      semicolons:
        "Her ifadenin sonunu mekanik olarak değil, biçimlendiricinin JavaScript kurallarına göre noktalı virgül ekler.",
      singleQuotes:
        "Ek kaçış gerekmiyorsa tek tırnağı tercih eder; aksi halde daha güvenli biçimi korur.",
      preserveComments:
        "Küçültme sırasında yorumları korur. Kapatmak sıkıştırma veya tanımlayıcı kısaltma yapmaz.",
    },
    sql: {
      dialect:
        "Biçimlendirme için veritabanı dil bilgisini seçer. Standart SQL ortak alt kümedir, otomatik algılama değildir.",
      keywordCase:
        "Yalnızca tanınan SQL anahtar sözcüklerini değiştirir; tanımlayıcıları, alıntılı adları ve dizeleri korur.",
    },
  }),
} satisfies Record<Locale, ToolHelpCopy>;
