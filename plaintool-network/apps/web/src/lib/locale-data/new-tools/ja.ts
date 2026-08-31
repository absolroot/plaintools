import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";

const backgroundRemover = backgroundRemoverFor("ja");

const seed = {
  locale: "ja",
  formatterSubnet: formatterSubnetFor("ja"),
  background: backgroundRemover.copy,
  dateCalculator: dateCalculatorFor("ja"),
  timeZoneConverter: timeZoneConverterFor("ja"),
  calculatorSuite: calculatorSuiteFor("ja"),
  uuidGenerator: uuidGeneratorFor("ja"),
  ui: {
    clear: "クリア",
    copy: "コピー",
    download: "ダウンロード",
    openFile: "ファイルを開く",
    chooseImage: "画像を選択",
    dropFile: "画像をここにドロップしてください。",
    ready: "準備完了",
    working: "処理中…",
    complete: "完了",
    unchanged: "変更は不要です",
    outdated: "結果は現在の入力と一致していません",
    copied: "コピーしました",
    copyFailed: "コピーできませんでした",
    tooLarge: "入力が大きすぎるため、安全に処理できません。",
    failed: "処理に失敗しました。入力を確認してもう一度お試しください。",
    resultHere: "結果がここに表示されます。",
    localTitle: "このブラウザー内だけで処理",
    localBody:
      "入力内容と結果はアップロードも保存もされません。このブラウザータブ内にのみ保持されます。",
    guideTitle: "{name}の使い方",
    safetyTitle: "ブラウザー内でのローカル処理",
    faqWhat: "{name}では何ができますか？",
    faqPrivacy: "データはアップロードされますか？",
    faqCheck: "{name}を使う際は、どの点を確認すればよいですか？",
  },
  ai: {
    input: "元のテキスト",
    output: "クリーニング後のテキスト",
    placeholder:
      "非表示のUnicode文字が含まれている可能性のあるテキストを貼り付けてください。",
    run: "非表示文字を除去",
    report: "除去レポート",
    removed: "除去した文字",
    normalized: "正規化した空白",
    noChanges: "対象となる非表示文字は見つかりませんでした。",
    count: "{count}文字を除去",
    advanced: "高度なUnicodeオプション",
    advancedWarning:
      "これらのオプションは、つづり、絵文字、文字の字形を変える場合があります。元テキストの仕組みを理解している場合にのみ有効にしてください。",
    joinControls: "ZWJとZWNJを除去",
    joinWarning:
      "絵文字の連結や、アラビア語、ペルシャ語、インド系文字の字形が崩れる場合があります。",
    variationSelectors: "異体字セレクターを除去",
    variationWarning: "絵文字やCJK文字の表示が変わる場合があります。",
    combiningMarks: "結合文字を除去",
    combiningWarning:
      "アクセント、母音記号など、意味のある記号が失われる場合があります。",
    noBreakSpaces: "改行しない空白を正規化",
    noBreakNote: "NBSP系の空白文字を通常の空白に変換します。",
    kinds: [
      "ゼロ幅スペース",
      "単語結合子",
      "バイト順マーク",
      "ソフトハイフン",
      "双方向制御文字",
      "不可視区切り文字",
      "結合制御文字",
      "異体字セレクター",
      "結合文字",
      "改行しない空白または数字幅空白",
      "狭い改行しない空白",
    ],
  },
  url: {
    mode: "URL変換モード",
    encode: "エンコード",
    decode: "デコード",
    encodeInput: "エンコードするテキストまたはURL",
    decodeInput: "エンコード済みURL値",
    encodeOutput: "エンコード結果",
    decodeOutput: "デコード結果",
    encodePlaceholder: "例: https://example.com/search?q=hello world",
    decodePlaceholder: "例: hello%20world%3Fpage%3D1",
    scope: "エンコード範囲",
    component: "URLコンポーネント",
    uri: "完全なURI",
    formSpace: "フォームデータの空白を+にする",
    recursive: "繰り返しデコード",
    passLimit: "最大回数",
    encoded: "URLのエンコードが完了しました",
    decoded: "URLのデコードが完了しました",
    passCount: "{count}回でデコードしました",
    limitReached: "上限回数に達した後も、エンコードされた階層が残っています。",
    errors: [
      "先に値を入力してください。",
      "パーセントエスケープが不完全または不正です。",
      "デコード後のバイト列が有効なUTF-8ではありません。",
      "回数は1～10から選んでください。",
    ],
  },
  hash: {
    input: "テキストまたはファイル",
    placeholder:
      "SHA-256、SHA-512、SHA-1、MD5ハッシュを計算するテキストを入力してください。",
    results: "ハッシュ値",
    resultLabel: "{algorithm}ハッシュ値",
    copyLabel: "{algorithm}ハッシュをコピー",
    fileSelected: "選択中: {name}（{size}）",
    drop: "ハッシュをローカルで計算するファイルをここにドロップしてください。",
    textTooLarge:
      "このブラウザーセッションで処理するにはテキストが大きすぎます。",
    fileTooLarge: "ファイルがローカル処理の安全上限を超えています。",
    legacyWarning:
      "MD5とSHA-1は互換性の確認用です。パスワード保存や新しいセキュリティ設計には使用しないでください。",
    expectedChecksum: "期待するチェックサム",
    checksumMatch: "一致",
    checksumMismatch: "不一致",
    checksumInvalid: "対応する16進チェックサムを入力してください。",
    empty: "先にテキストを入力するか、ファイルを選択してください。",
    unavailable:
      "このブラウザーでは、要求されたハッシュの一部を計算できません。",
  },
  jwt: {
    input: "JWTトークン",
    placeholder:
      "3つの部分からなるJWTを貼り付けてください: header.payload.signature",
    header: "ヘッダー",
    payload: "ペイロード",
    signature: "署名",
    copyHeader: "デコードしたJWTヘッダーをコピー",
    copyPayload: "デコードしたJWTペイロードをコピー",
    copySignature: "JWT署名バイト列をコピー",
    signatureBytes: "{count}バイト",
    timestamps: "タイムスタンプクレーム",
    expires: "有効期限（exp）",
    notBefore: "有効開始（nbf）",
    issuedAt: "発行日時（iat）",
    invalidTimestamp: "このクレームは有効な数値タイムスタンプではありません。",
    noTimestamps: "exp、nbf、iatクレームは見つかりませんでした。",
    noVerifyTitle: "署名は検証されません",
    noVerifyBody:
      "デコードで確認できるのはトークンの内容だけです。発行者や署名の正当性を証明するものではありません。",
    errors: [
      "先にJWTを貼り付けてください。",
      "JWTはドットで区切られた3つの部分で構成されている必要があります。",
      "JWTヘッダーが空です。",
      "JWTペイロードが空です。",
      "有効なBase64URLではない部分があります。",
      "有効なUTF-8ではない部分があります。",
      "ヘッダーが有効なJSONではありません。",
      "ペイロードが有効なJSONではありません。",
      "ヘッダーはJSONオブジェクトである必要があります。",
      "ペイロードはJSONオブジェクトである必要があります。",
    ],
  },
  qr: {
    input: "テキストまたはURL",
    placeholder: "QRコードに入れるテキストまたはURLを入力してください。",
    preview: "QRコードのプレビュー",
    previewEmpty: "内容を入力するとQRコードを生成できます。",
    options: "QRコード設定",
    correction: "誤り訂正",
    correctionLevels: ["低（L）", "中（M）", "高め（Q）", "高（H）"],
    quietZone: "クワイエットゾーン",
    quietZones: ["なし", "2モジュール", "4モジュール（推奨）", "8モジュール"],
    generate: "QRコードを生成",
    png: "PNGをダウンロード",
    svg: "SVGをダウンロード",
    empty: "先にテキストまたはURLを入力してください。",
    tooLong: "この誤り訂正レベルには内容が長すぎます。",
    generationFailed: "QRコードを生成できませんでした。",
    downloadFailed: "ダウンロード用の画像を準備できませんでした。",
    upload: "QRコード画像",
    formats: "PNG、JPEG、WebP、GIF、BMP（最大10 MB）",
    camera: "カメラスキャナー",
    cameraHint:
      "カメラへのアクセスを許可すると連続スキャンできます。読み取ったURLが自動で開くことはありません。",
    startCamera: "カメラを開始",
    stopCamera: "カメラを停止",
    scanResult: "読み取り結果",
    scanPlaceholder: "読み取ったテキストがここに表示されます。",
    urlDetected: "URLを検出",
    openUrl: "URLを開く",
    urlDialogTitle: "このURLを開きますか？",
    urlDialogBody:
      "QRコードからURLが見つかりました。安全なURLか、想定したサイトのアドレスかを確認してください。",
    urlDialogDestination: "移動先",
    cancel: "キャンセル",
    reading: "画像を読み取り中…",
    starting: "カメラを起動中…",
    scanning: "QRコードを検索中…",
    invalidImage: "対応している有効な画像を選択してください。",
    noCode: "この画像から読み取り可能なQRコードが見つかりませんでした。",
    unsupported: "このブラウザーはカメラスキャンに対応していません。",
    denied: "カメラへのアクセスが拒否されました。",
    unavailable: "使用できるカメラがありません。",
    scanFailed: "QRコードを読み取れませんでした。",
  },
  data: {
    convert: "変換",
    inputPlaceholder: "変換元データをここに貼り付けてください。",
    outputPlaceholder: "変換結果がここに表示されます。",
    drop: "対応するテキストファイルをここにドロップしてください。",
    readFailed: "ファイルを読み取れませんでした。",
    errorAt: "{message} {line}行、{column}列。",
    delimiter: "CSV区切り文字",
    auto: "自動検出",
    comma: "カンマ（,）",
    semicolon: "セミコロン（;）",
    tab: "タブ",
    pipe: "パイプ（|）",
    firstHeader: "先頭行をヘッダーとして使用",
    pretty: "JSONをインデントして整形",
    errors: [
      "CSVに閉じられていない引用符または不正なフィールドがあります。",
      "区切り行を持つMarkdown表が見つかりませんでした。",
      "Markdown表の形式が不正です。",
      "入力が有効なJSONではありません。",
      "JSONはオブジェクトの配列である必要があります。",
      "空のCSVヘッダーがあります。",
      "CSVヘッダーは重複できません。",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "AIウォーターマーク・非表示文字除去",
      description:
        "GPTやClaude、PDF、ウェブページからテキストをコピーした際に混入する不可視のUnicode文字を検出して除去します。AIによる文章かどうかを判定するツールではありません。",
      guide:
        "テキストを貼り付け、まずクリーニング結果を確認してから、除去した文字名、件数、U+コードポイントを確認してください。文字の字形に影響する危険性のあるオプションは初期状態では無効です。",
      terms: [
        "AIウォーターマーク除去",
        "GPT 非表示文字",
        "Claude 非表示文字",
        "ゼロ幅スペース",
        "Unicodeクリーナー",
      ],
    },
    "url-encode": {
      title: "URLエンコーダー",
      description:
        "テキスト、クエリ値、URI全体をWeb標準に沿ってパーセントエンコードします。",
      guide:
        "単一のクエリ値にはURLコンポーネントを選び、URLの区切り文字を残す場合は完全なURIを選んでください。プラス記号はフォーム形式のデータにだけ使用します。",
      terms: [
        "URLエンコード",
        "パーセントエンコード",
        "encodeURIComponent",
        "クエリ文字列",
      ],
    },
    "url-decode": {
      title: "URLデコーダー",
      description:
        "パーセントエンコードされたURLやクエリ値をデコードします。入れ子のエンコードも回数を制限して処理できます。",
      guide:
        "エンコードされた値を貼り付けて範囲を選びます。繰り返しデコードは、入れ子にエンコードされていると分かっているデータにだけ使用してください。",
      terms: [
        "URLデコード",
        "パーセントデコード",
        "decodeURIComponent",
        "クエリ文字列",
      ],
    },
    "hash-generator": {
      title: "ハッシュ生成ツール",
      description:
        "テキストやファイルのSHA-256、SHA-512、SHA-1、MD5チェックサムをローカルで計算します。",
      guide:
        "テキストを入力するかファイルを選択し、必要なアルゴリズムの値と正確に比較してください。ハッシュは同一性の確認に使うもので、それ自体が暗号化や安全なパスワード保存になるわけではありません。",
      terms: ["SHA-256", "SHA-512", "MD5", "チェックサム", "ファイルハッシュ"],
    },
    "jwt-decoder": {
      title: "JWTデコーダー",
      description:
        "JWTのヘッダー、ペイロード、署名バイト列、タイムスタンプクレームをアップロードせずにデコードします。",
      guide:
        "デコードしたJSONと日時を確認できますが、署名とクレームは署名鍵を管理するシステムで検証してください。デコードだけでは信頼性を証明できません。",
      terms: [
        "JWTデコーダー",
        "JSON Web Token",
        "JWTペイロード",
        "JWTヘッダー",
      ],
    },
    "qr-code-generator": {
      title: "QRコード生成ツール",
      description:
        "テキストやURLから規格に準拠した静的QRコードを作り、PNGまたはSVGでダウンロードできます。",
      guide:
        "正確な内容を入力し、読み取りやすさのため4モジュールのクワイエットゾーンを保ってください。一部が隠れる可能性がある場合は誤り訂正レベルを上げます。",
      terms: ["QRコード生成", "QR PNG", "QR SVG", "静的QR"],
    },
    "qr-code-scanner": {
      title: "QRコードスキャナー",
      description:
        "画像またはカメラからQRコードをローカルで読み取り、検出したリンクを自動では開きません。",
      guide:
        "クワイエットゾーン全体が写った、鮮明で明るい画像を使ってください。URLの安全性を判断する前に、読み取った値を確認してコピーできます。",
      terms: [
        "QRコードスキャン",
        "QR画像読み取り",
        "カメラQRリーダー",
        "QRデコード",
      ],
    },
    "csv-to-markdown": {
      title: "CSVからMarkdownへの変換",
      description:
        "区切り文字を検出し、セルを適切にエスケープして、CSVの行を整ったMarkdown表に変換します。",
      guide:
        "区切り文字と先頭行をヘッダーにするかを確認してください。複数行セルは表で使える改行になり、パイプ文字はエスケープされます。",
      inputLabel: "CSV入力",
      outputLabel: "Markdown表",
      inputPlaceholder: "名前,点数\nAri,92",
      terms: ["CSVからMarkdown", "Markdown表", "CSV変換"],
    },
    "markdown-to-csv": {
      title: "MarkdownからCSVへの変換",
      description:
        "Markdown表を、表計算ソフトやデータツールで扱いやすい標準的なCSVに変換します。",
      guide:
        "Markdown表にヘッダー行と区切り行を含め、使用先のアプリケーションが必要とする区切り文字を選んでください。",
      inputLabel: "Markdown表",
      outputLabel: "CSV出力",
      inputPlaceholder: "| 名前 | 点数 |\n| --- | --- |\n| Ari | 92 |",
      terms: ["MarkdownからCSV", "表をCSVに変換", "Markdown変換"],
    },
    "json-to-csv": {
      title: "JSONからCSVへの変換",
      description:
        "JSONオブジェクトの配列を、全オブジェクトのキーを一定の順序でまとめたCSVに変換します。",
      guide:
        "最上位にはオブジェクトの配列を使用してください。入れ子の値は短いJSON文字列として保持されるため、使用先の表計算ソフトでの扱いを確認してください。",
      inputLabel: "JSON配列",
      outputLabel: "CSV出力",
      inputPlaceholder: '[{"名前":"Ari","点数":92}]',
      terms: ["JSONからCSV", "JSON配列をCSVに変換", "データ変換"],
    },
    "csv-to-json": {
      title: "CSVからJSONへの変換",
      description:
        "CSVの先頭行をフィールド名として、JSONオブジェクトの配列に変換します。",
      guide:
        "すべてのヘッダーを空でない一意の名前にしてください。カンマ、引用符、複数行セルを含むデータでは、変換前に区切り文字の検出結果を確認します。",
      inputLabel: "CSV入力",
      outputLabel: "JSON配列",
      inputPlaceholder: "名前,点数\nAri,92",
      terms: ["CSVからJSON", "CSVパーサー", "JSON配列"],
    },
    "html-to-markdown": {
      title: "HTMLからMarkdownへの変換",
      description:
        "見出し、リンク、リスト、コード、表などのHTML構造を読みやすいMarkdownに変換します。",
      guide:
        "変換するHTML断片を貼り付けてください。MarkdownではすべてのHTML動作を表現できないため、複雑なレイアウトや埋め込みコンテンツは結果を確認してください。",
      inputLabel: "HTML入力",
      outputLabel: "Markdown出力",
      inputPlaceholder: "<h1>タイトル</h1><p><strong>本文</strong>です。</p>",
      terms: ["HTMLからMarkdown", "HTML変換", "Turndown"],
    },
    "markdown-to-html": {
      title: "MarkdownからHTMLへの変換",
      description:
        "GFMの表、リスト、リンク、フェンス付きコードブロックなどを含むMarkdownをHTMLとしてレンダリングします。",
      guide:
        "使用するMarkdownだけを変換し、信頼できない出力をウェブページへ挿入する前にはHTMLをもう一度サニタイズしてください。",
      inputLabel: "Markdown入力",
      outputLabel: "HTML出力",
      inputPlaceholder: "# タイトル\n\n**本文**です。",
      terms: ["MarkdownからHTML", "Markdownレンダラー", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
