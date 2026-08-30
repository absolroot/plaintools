import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/ja";

const bundle: LocaleBundle = {
  site: {
    brandName: "アブソルツールズ",
    languageName: "日本語",
    metaTitle: "Base64 エンコード・デコード — 高速・安全なオンラインツール",
    metaDescription:
      "Base64 の文字列やファイルをデコードし、文字列やファイルを Base64 にエンコードできます。Base64URL、パディング不足、Data URI、各種文字コードに対応しています。",
    decodeMetaTitle: "Base64 デコーダー（文字列・ファイル対応）| AbsolTools",
    encodeMetaTitle: "Base64 エンコーダー（文字列・ファイル対応）| AbsolTools",
    skipToContent: "本文へ移動",
    languageNavLabel: "言語",
    legalNavLabel: "法的情報・お問い合わせ",
    modeLabel: "変換モード",
    heading: "Base64 をオンラインでデコード",
    subheading:
      "Base64 の文字列を貼り付けるか、ファイルを開いてください。標準 Base64、Base64URL、パディング不足、Data URI をブラウザー内で処理します。",
    encodeHeading: "文字列やファイルを Base64 にエンコード",
    encodeSubheading:
      "文字列を入力するか、ファイルを開いてください。UTF-8 の文字列やバイナリファイルを、アップロードせずに標準 Base64 または Base64URL に変換します。",
    decode: "デコード",
    encode: "エンコード",
    inputLabel: "Base64 入力",
    outputLabel: "デコード結果",
    encodeInputLabel: "文字列またはファイル",
    encodeOutputLabel: "Base64 出力",
    decodePlaceholder: "例：SGVsbG8sIEFic29sVG9vbHMh",
    encodePlaceholder: "例：こんにちは、AbsolTools！",
    outputPlaceholder: "結果がここに表示されます。",
    openFile: "ファイルを開く",
    runDecode: "デコードする",
    runEncode: "エンコードする",
    options: "オプション",
    detected: "検出結果",
    decodeComplete: "デコードが完了しました",
    encodeComplete: "エンコードが完了しました",
    charset: "文字コード",
    variant: "Base64 形式",
    auto: "自動判定",
    standard: "標準",
    urlSafe: "URL セーフ",
    strict: "厳密に検証",
    lineByLine: "行ごとにデコード",
    autoRepair: "空白とパディングを補正",
    lenientRepair: "残りの無効な文字を削除",
    outputView: "出力形式",
    text: "文字列",
    hex: "16進数",
    includePadding: "末尾の = を付ける",
    mimeWrap: "76文字ごとに改行",
    dataUri: "Data URI プレフィックスを付ける",
    dropHint: "文字列またはバイナリファイルを変換欄にドロップできます。",
    fileTooLarge: "入力できるサイズは最大 100 MiB です。",
    binaryOutput:
      "バイナリデータを検出しました。ファイル形式を確認し、直接実行せずにダウンロードしてください。",
    executableWarning:
      "実行可能ファイルを検出しました。信頼できない提供元からデコードしたファイルは実行しないでください。",
    imagePreview: "画像プレビュー",
    errors: {
      "empty-input": "文字列を入力するか、ファイルを開いてください。",
      "invalid-character": "Base64 として使用できない文字が含まれています。",
      "invalid-length":
        "Base64 の値が途中で切れているか、長さが正しくありません。",
      "decode-failed": "値をデコードできませんでした。",
      "encode-failed": "ファイルをエンコードできませんでした。",
      "unsupported-charset":
        "この文字コードは、お使いのブラウザーではサポートされていません。",
      "file-too-large": "入力が 100 MiB の安全上限を超えています。",
    },
    repairs: {
      "data-uri-removed": "Data URI プレフィックスを削除しました",
      "whitespace-removed": "空白文字を削除しました",
      "url-alphabet-normalized": "Base64URL の文字セットを検出しました",
      "padding-added": "不足しているパディングを補いました",
      "invalid-characters-removed": "無効な文字を削除しました",
    },
    guideTitle: "Base64 をデコードする方法",
    guideIntro:
      "Base64 は暗号ではなく、データの表現方式です。値を入手した人は誰でもデコードできます。",
    guideSteps: [
      "Base64 の値を貼り付けるか、その値を含むファイルを開きます。",
      "形式を自動判定し、空白の削除や不足したパディングの補完など、一般的な補正を行います。",
      "読める文字列はコピーし、バイナリデータはファイルとしてダウンロードします。",
    ],
    encodeGuideTitle: "Base64 にエンコードする方法",
    encodeGuideIntro:
      "Base64 は文字列やバイナリのバイト列を印字可能な文字で表します。元のデータを暗号化したり保護したりするものではありません。",
    encodeGuideSteps: [
      "エンコードする文字列を入力するか、ファイルを開きます。",
      "標準 Base64 または URL セーフ形式を選び、出力先で必要な場合だけパディングや改行を調整します。",
      "Base64 の結果をコピーするか、テキストファイルとしてダウンロードします。",
    ],
    safetyTitle: "入力内容は保存されません。",
    safetyBody:
      "入力内容と変換結果は保存もサーバー送信もされません。現在のブラウザーセッション内だけで処理され、ページを再読み込みするか閉じると消去されます。",
    detailsTitle: "仕様と入力の処理",
    detailsBody:
      "初期設定では RFC 4648 に従い、標準形式と URL セーフ形式、任意のパディング、MIME の空白、Data URI プレフィックスを処理します。形式を厳密に確認したい場合は、厳密な検証を有効にしてください。",
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "Base64 は暗号ですか？",
        a: "いいえ。Base64 はバイナリデータを印字可能な文字列に変えるだけで、機密性や改ざん検知を提供しません。",
      },
      {
        q: "デコード結果を読めないのはなぜですか？",
        a: "結果がファイル、圧縮済みまたは暗号化済みのデータ、別の文字コードのテキストである可能性があります。ファイルとして保存するか、別の文字コードを試してください。",
      },
      {
        q: "入力内容はサーバーへ送信されますか？",
        a: "いいえ。変換はブラウザー内で行われ、入力、ファイル、結果はサーバーへ送信されません。",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 は暗号ですか？",
        a: "いいえ。Base64 はバイナリデータを印字可能な文字列に変えるだけで、機密性や改ざん検知を提供しません。",
      },
      {
        q: "標準 Base64 と Base64URL のどちらを選べばよいですか？",
        a: "一般的なファイルやデータには標準 Base64 を使います。URL やファイル名に安全に含める必要がある場合は Base64URL を使います。",
      },
      {
        q: "入力内容はサーバーへ送信されますか？",
        a: "いいえ。変換はブラウザー内で行われ、入力、ファイル、結果はサーバーへ送信されません。",
      },
    ],
    advertisement: "広告",
    integrationState: { enabled: "同意管理付きで有効", disabled: "無効" },
    legalNav: {
      about: "このサイトについて",
      privacy: "プライバシー",
      cookies: "Cookie",
      terms: "利用規約",
      contact: "お問い合わせ",
    },
    legal: {
      about: {
        title: "このサイトについて",
        intro:
          "AbsolTools は、文字列、データ、日時、エンコードの作業に使えるオンラインツールを提供します。",
        sections: [
          {
            title: "提供するツール",
            body: [
              "各ツールは、アカウント登録なしで1つの作業に集中して使えます。入力内容と結果はブラウザー内で処理されます。",
            ],
          },
          {
            title: "お問い合わせ",
            body: [
              "ご質問、不具合報告、プライバシーに関するご依頼は {{email}} までお送りください。",
            ],
          },
        ],
      },
      privacy: {
        title: "プライバシーポリシー",
        intro:
          "本ポリシーでは、ツールの入力・結果と、サイト配信、アクセス解析、広告のデータを区別して説明します。",
        sections: [
          {
            title: "ツールの入力と結果",
            body: [
              "文字列、ファイル、JSON、日時の値、デコードしたバイト列、生成結果はブラウザー内で処理されます。入力と結果がサーバーへ送信または保存されることはありません。",
            ],
          },
          {
            title: "サイトの配信",
            body: [
              "{{host_provider}} はこの静的サイトを配信・保護し、IP アドレス、リクエスト時刻、ブラウザー情報、アクセス先 URL などの接続データを処理する場合があります。公表されているログ保持設定は {{host_log_retention}} です。提供者のポリシー：{{host_privacy_url}}。",
            ],
          },
          {
            title: "アクセス解析と広告",
            body: [
              "Google Analytics と Google AdSense は現在 {{integration_state}} です。有効にする場合は、端末、利用状況、Cookie、同意、保存期間、国外移転の詳細をここに記載し、「プライバシー設定」で管理します。ツールの入力と結果は、設計上、解析イベントおよび広告イベントから除外されます。",
            ],
          },
          {
            title: "Cookie と自動収集",
            body: [
              "ツールの入力や結果を Cookie またはブラウザーストレージに保存しません。テーマを選んだ場合は light または dark の値だけをローカルストレージに保存し、送信しません。ホスティングのセキュリティ技術が厳密に必要なストレージを使う場合は、選定した提供者の情報に基づいて明記します。任意の解析・広告用ストレージは、それらの連携が無効な間はブロックされます。",
            ],
          },
          {
            title: "保持と削除",
            body: [
              "運営者はツールの入力と結果を保持しません。ホスティングのリクエストデータには、上記提供者の保持期間が適用されます。お問い合わせ内容は、回答、法的義務、または不正利用への対応に必要な期間だけ保持し、その後削除または匿名化します。",
            ],
          },
          {
            title: "受領者と国外移転",
            body: [
              "選定したホスティング提供者は、そのポリシーに記載された地域と保護措置の下で、利用者の国外においてリクエストデータを処理する場合があります。アクセス解析、広告、同意管理、その他の受領者を有効にする前に、適用法令上必要な受領者、国、目的、データ、時期、方法、保持期間、移転根拠を本項に記載します。",
            ],
          },
          {
            title: "利用者の選択肢と連絡先",
            body: [
              "適用される場合、{{email}} への連絡により、アクセス、訂正、削除、処理制限、異議申立て、データポータビリティ、または同意撤回を請求できます。対応前に合理的な本人確認をお願いする場合があります。",
            ],
          },
          {
            title: "子ども、安全管理、変更",
            body: [
              "本サービスは一般向けの開発支援ツールであり、子どもを対象としていません。静的かつブラウザー内で処理する構成と制限的なブラウザーポリシーによってリスク低減に努めますが、完全に安全なサービスはありません。重要な変更には本ページで日付を付けます。施行日：{{date}}。",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie ポリシー",
        intro: "入力内容の処理に Cookie は必要ありません。",
        sections: [
          {
            title: "現在の利用",
            body: [
              "アクセス解析と広告は現在 {{integration_state}} です。ツールの入力や結果を Cookie またはローカルストレージに保存しません。選択したテーマ（light または dark）だけをローカルストレージに保存し、この値は送信しません。",
            ],
          },
          {
            title: "連携機能を有効にする場合",
            body: [
              "同意管理プラットフォームが、必要な設定保存、解析用ストレージ、広告用ストレージを制御します。常設のプライバシー設定から、同意内容の確認または撤回ができます。",
            ],
          },
        ],
      },
      terms: {
        title: "利用規約",
        intro: "この無料ツールの利用には本規約が適用されます。",
        sections: [
          {
            title: "サービス",
            body: [
              "本サービスは現状有姿で提供され、正確性、可用性、特定目的への適合性、継続的な動作を保証しません。重要な結果は利用者自身で確認してください。",
            ],
          },
          {
            title: "安全かつ適法な利用",
            body: [
              "システムへの攻撃、法令または第三者の権利の侵害、有害なコンテンツの配布に本サービスを使用しないでください。信頼できない提供元からデコードしたファイルは実行しないでください。",
            ],
          },
          {
            title: "責任と第三者",
            body: [
              "強行法規で認められる範囲において、運営者は間接損害または結果的損害について責任を負いません。第三者の広告やリンクは、当該第三者を推奨するものではありません。",
            ],
          },
          {
            title: "知的財産と変更",
            body: [
              "サイトのデザインと独自の解説内容は適用法令で保護されます。処理する内容については利用者が責任を負います。機能を変更または終了する場合があり、重要な規約変更には日付を付けます。",
            ],
          },
          {
            title: "準拠法と連絡先",
            body: [
              "本サービスは {{region}} から運営されています。準拠法：{{governing_law}}。管轄裁判所：{{jurisdiction}}。強行的な消費者保護規定は引き続き適用されます。連絡先：{{email}}。施行日：{{date}}。",
            ],
          },
        ],
      },
      contact: {
        title: "お問い合わせ",
        intro:
          "ご質問、不具合報告、プライバシーに関するご依頼、不正利用の報告を受け付けています。",
        sections: [
          {
            title: "メール",
            body: [
              "{{email}} までご連絡ください。機密性のある文字列、JSON、Base64 の値、パスワード、秘密鍵、個人ファイルなど、ツールへの入力内容をメールに含めないでください。",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "プレビュー",
    ready: "準備完了",
    working: "処理中…",
    clear: "クリア",
    copy: "コピー",
    copied: "コピーしました",
    copyFailed: "結果をコピーできませんでした。",
    processingFailed: "処理できませんでした。もう一度お試しください。",
    download: "ダウンロード",
    faqTitle: "よくある質問",
    localTitle: "AbsolTools はブラウザー内で動作します。",
    localBody:
      "入力内容と結果はこのブラウザー内だけで処理され、サーバーへ送信または保存されません。",
  },
  preview: {
    word: {
      title: "文字数・単語数カウンター",
      description:
        "文章をアップロードせずに、単語、文字、空白を除く文字、行、段落の数を確認できます。",
      inputLabel: "文章",
      words: "単語数",
      characters: "文字数",
      noWhitespace: "空白を除く文字数",
      lines: "行数",
      paragraphs: "段落数",
      completed: "集計が完了しました",
      approximate:
        "このブラウザーは Intl.Segmenter に対応していないため、文字数と単語数は概算です。",
      tooLarge:
        "入力が 1 MB の上限を超えています。短くするか消去してください。",
      guideTitle: "集計方法",
      guideBody:
        "対応ブラウザーでは、絵文字や結合文字を含む文字を、利用者が1文字と認識する書記素クラスター単位で数えます。空白を除く文字数では、前後の文字を結合せず、元の文章にある空白の書記素だけを除きます。改行ごとに行を数え、空白だけの行を含む見た目上の空行で段落を区切ります。",
      faqs: [
        {
          q: "単語数はどのように数えますか？",
          a: "Intl.Segmenter に対応するブラウザーでは、現在のページ言語の単語境界を使い、単語として扱われる区間を数えます。それ以外のブラウザーでは概算値を表示します。",
        },
        {
          q: "絵文字も1文字として数えますか？",
          a: "対応ブラウザーでは、画面上で1文字に見える絵文字や結合文字を1文字として数えます。",
        },
      ],
    },
    json: {
      title: "JSON 整形・検証",
      description:
        "JSON を読みやすく整形し、構文エラーを検証したり、1行に圧縮したりできます。",
      inputLabel: "JSON 入力",
      outputLabel: "結果",
      placeholder: "JSON を貼り付けてください…",
      outputPlaceholder: "整形または圧縮した JSON がここに表示されます。",
      openFile: ".json を開く",
      tooLarge: "入力が 10 MiB の上限を超えています。",
      manualRequired:
        "入力が大きいため自動検証を停止しました。「整形」「検証」「圧縮」のいずれかを選んでください。",
      format: "整形",
      validate: "検証",
      validateHelpLabel: "検証について",
      validateHelp:
        "入力が RFC 8259 の JSON 構文に従っているかを確認し、構文エラーの位置と原因を示します。文字列の整形や変更は行いません。",
      minify: "圧縮",
      minifyHelpLabel: "圧縮について",
      minifyHelp:
        "有効な JSON から任意の空白と改行を除き、コンパクトにします。文字列の内容、数値の表記、重複するオブジェクトキーは維持します。",
      indent: "インデント",
      twoSpaces: "スペース2個",
      fourSpaces: "スペース4個",
      tabs: "タブ",
      valid: "有効な JSON",
      invalidAt: "{message} {line}行目、{column}列目。",
      duplicate: "{line}行目、{column}列目に重複キーがあります",
      bom: "処理前に UTF-8 BOM を削除しました。",
      errorMessages: {
        InvalidSymbol: "無効な記号です。",
        InvalidNumberFormat: "数値の形式が正しくありません。",
        PropertyNameExpected: "プロパティ名が必要です。",
        ValueExpected: "値が必要です。",
        ColonExpected: "プロパティ名の後にコロンが必要です。",
        CommaExpected: "項目の間にコンマが必要です。",
        CloseBraceExpected: "閉じ波かっこが必要です。",
        CloseBracketExpected: "閉じ角かっこが必要です。",
        EndOfFileExpected: "JSON 値の後に予期しない内容があります。",
        InvalidCommentToken: "コメントは JSON では使用できません。",
        UnexpectedEndOfComment: "コメントが完結していません。",
        UnexpectedEndOfString: "文字列が完結していません。",
        UnexpectedEndOfNumber: "数値が完結していません。",
        InvalidUnicode: "Unicode エスケープが正しくありません。",
        InvalidEscapeCharacter: "エスケープシーケンスが正しくありません。",
        InvalidCharacter: "ここでは使用できない文字です。",
        Unknown: "JSON が無効です。",
      },
      guideTitle: "JSON の規則と数値表記の保持",
      guideBody:
        "RFC 8259 に従って検証し、コメント、末尾のコンマ、単一引用符をエラーとして報告します。重複キーは削除せず警告を表示し、大きな数値も入力時の表記をそのまま保ちます。",
      faqs: [
        {
          q: "大きな数値は変わりますか？",
          a: "いいえ。整形と圧縮は数値を再計算せず、入力時の表記を保つため、大きな数値も丸めません。",
        },
        {
          q: "重複キーを報告するのはなぜですか？",
          a: "重複したオブジェクトキーの扱いはソフトウェアによって異なります。AbsolTools はデータを黙って削除せず、キーを保ったまま警告します。",
        },
        {
          q: "無効な JSON を自動修復しますか？",
          a: "いいえ。コメント、末尾のコンマ、単一引用符などの無効な構文を報告し、利用者が意図を確認して修正できるようにします。",
        },
      ],
    },
    time: {
      title: "Unix タイムスタンプ変換",
      description:
        "秒またはミリ秒の Unix タイムスタンプと、指定したタイムゾーンの日時を相互に変換します。",
      timestampMode: "タイムスタンプから日時",
      dateMode: "日時からタイムスタンプ",
      timestampLabel: "Unix タイムスタンプ",
      dateLabel: "日時",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "日時を選択",
      unit: "単位",
      auto: "自動判定",
      seconds: "秒",
      milliseconds: "ミリ秒",
      zoneMode: "タイムゾーン",
      utc: "UTC オフセット",
      local: "ブラウザーのタイムゾーン",
      selected: "IANA タイムゾーン",
      zoneLabel: "都市、地域、IANA タイムゾーン",
      zonePlaceholder: "東京、Asia、Asia/Tokyo などを検索",
      popularZones: [
        { value: "Asia/Tokyo", label: "東京（日本）— Asia/Tokyo · UTC+09:00" },
        {
          value: "Asia/Seoul",
          label: "ソウル（韓国）— Asia/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "ニューヨーク（米国）— America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "ロサンゼルス（米国）— America/Los_Angeles",
        },
        { value: "Europe/London", label: "ロンドン（英国）— Europe/London" },
        { value: "Europe/Paris", label: "パリ（フランス）— Europe/Paris" },
        {
          value: "Europe/Madrid",
          label: "マドリード（スペイン）— Europe/Madrid",
        },
        { value: "Asia/Shanghai", label: "上海（中国）— Asia/Shanghai" },
        { value: "Asia/Singapore", label: "シンガポール — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "コルカタ（インド）— Asia/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "シドニー（オーストラリア）— Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "オークランド（ニュージーランド）— Pacific/Auckland",
        },
      ],
      offsetLabel: "UTC からの差",
      disambiguation: "存在しない／重複するローカル時刻",
      reject: "エラーを表示",
      earlier: "早い方を使用",
      later: "遅い方を使用",
      now: "現在時刻",
      convert: "変換",
      instant: "UTC の日時",
      zoned: "選択したタイムゾーンの日時",
      unixSeconds: "Unix タイムスタンプ（秒）",
      unixMilliseconds: "Unix タイムスタンプ（ミリ秒）",
      converted: "変換が完了しました",
      invalid:
        "有効な Unix タイムスタンプまたは ISO 形式の日時を入力し、タイムゾーンを確認してください。",
      ambiguousUnit:
        "11桁または12桁の値は単位を判定できません。秒かミリ秒を選んでください。",
      nonexistentTime:
        "選択したタイムゾーンで時計が進むため、この日時は存在しません。早い方または遅い方の結果を選んでください。",
      repeatedTime:
        "選択したタイムゾーンで時計が戻るため、この日時は2回発生します。早い方または遅い方の結果を選んでください。",
      y2038: "この値は符号付き32ビット Unix 時刻の範囲外です。",
      guideTitle: "単位とタイムゾーンの扱い",
      guideBody:
        "自動判定では、小数と1～10桁の整数を秒、13桁の整数をミリ秒として扱い、11～12桁の整数では単位の選択を求めます。ローカル日時を直接入力するかピッカーを使用でき、秒と小数秒は省略できます。初期設定ではブラウザーのタイムゾーンを使います。タイムスタンプから変換する場合、タイムゾーンは表示するローカル日時だけを変えます。ローカル日時から変換する場合は、タイムゾーンによって Unix 値が決まります。",
      faqs: [
        {
          q: "単位はどのように自動判定しますか？",
          a: "小数と1～10桁の整数は秒、13桁の整数はミリ秒として扱います。11～12桁の値では単位を選んでください。",
        },
        {
          q: "どの日時形式を入力できますか？",
          a: "2026-08-29T14:30 のように UTC オフセットを付けずにローカル日時を入力します。秒と9桁までの小数秒は省略でき、ピッカーも使用できます。",
        },
        {
          q: "タイムゾーンの選択肢はどう違いますか？",
          a: "ブラウザーのタイムゾーンは端末の時計規則に従います。UTC オフセットは +00:00 や +09:00 の固定値です。America/New_York などの IANA ゾーンは、その地域の時刻変更規則に従います。",
        },
        {
          q: "夏時間で Unix タイムスタンプが曖昧になりますか？",
          a: "いいえ。Unix タイムスタンプは1つの時点を示します。時計を変更する地域のローカル日時から変換する場合だけ、存在しない時刻や2回発生する時刻があります。初期設定ではエラーを表示し、必要な場合に限り早い方または遅い方を選べます。",
        },
      ],
    },
    textCompare: {
      title: "テキスト比較",
      description:
        "2つの文章をアップロードせずに行単位で比較し、追加、削除、変更を強調表示します。",
      originalLabel: "元の文章",
      changedLabel: "変更後の文章",
      originalPlaceholder: "元の文章を貼り付けてください…",
      changedPlaceholder: "変更後の文章を貼り付けてください…",
      compare: "比較",
      swap: "入れ替え",
      results: "比較結果",
      empty: "比較するには、どちらか一方に文章を入力してください。",
      tooLarge: "各文章は 1 MiB 以下にしてください。",
      tooManyLines: "2つの文章の合計は 20,000 行までです。",
      tooComplex:
        "比較が複雑すぎるため安全に処理できません。文章を短くしてください。",
      stale:
        "下の結果は前回の比較内容です。更新するにはもう一度比較してください。",
      complete: "比較が完了しました",
      identical: "2つの文章は同じです。",
      approximate:
        "このブラウザーは Intl.Segmenter に対応していないため、行内の文字強調は概算です。",
      inlineLimited:
        "応答性を保つため、一部の長い変更行は行全体の変更として表示します。",
      additions: "追加行：{count}",
      deletions: "削除行：{count}",
      changes: "変更行：{count}",
      previousChange: "前の変更",
      nextChange: "次の変更",
      expandUnchanged: "変更のない {count} 行を表示",
      whitespaceChange: "空白文字の変更",
      lineEndingChange: "改行コードの変更",
      unchangedRow: "変更なし",
      addedRow: "追加行",
      removedRow: "削除行",
      changedRow: "変更行",
      originalLine: "元の文章の {line} 行目",
      changedLine: "変更後の文章の {line} 行目",
      guideTitle: "比較の仕組み",
      guideBody:
        "まず行を対応付け、次に変更行の組の中で文字単位の変更を強調します。空白だけの変更と改行コードだけの変更は明示します。変更のない長い部分は、展開するまで折りたたまれます。",
      faqs: [
        {
          q: "文章はサーバーへ送信されますか？",
          a: "いいえ。2つの文章はブラウザー内で比較され、サーバーへ送信されません。",
        },
        {
          q: "改行コードの違いも検出しますか？",
          a: "はい。表示される文章が同じでも、CRLF、LF、CR の違いを示します。",
        },
      ],
    },
    caseConverter: {
      title: "大文字・小文字変換",
      description:
        "文章をアップロードせずに、大文字、小文字、文頭のみ大文字、各単語の先頭を大文字に変換します。",
      inputLabel: "文章",
      outputLabel: "変換結果",
      placeholder: "文章を入力または貼り付けてください…",
      outputPlaceholder: "変換した文章がここに表示されます。",
      modeLabel: "変換方法",
      upper: "大文字",
      lower: "小文字",
      sentence: "文頭のみ大文字",
      capitalizeWords: "各単語の先頭を大文字",
      converted: "変換が完了しました",
      noChange: "文章はすでにこの変換結果と同じです。",
      outdated: "表示中の結果は前回の入力に対するものです。",
      tooLarge: "入力が 1 MB の上限を超えています。",
      guideTitle: "各変換の動作",
      guideBody:
        "大文字と小文字への変換には Unicode の標準ケースマッピングを使います。「文頭のみ大文字」は全体を小文字にした後、文章の先頭、改行後、または . ! ? 。 ！ ？ の後にある最初のケース付き文字を大文字にします。「各単語の先頭を大文字」は、空白、句読点、改行、アポストロフィ、ハイフン、アンダースコアを保ったまま、各単語の最初のケース付き文字を大文字にします。日本語など大文字・小文字の区別がない文字は変わりません。",
      faqs: [
        {
          q: "「各単語の先頭を大文字」は英語のタイトルケースと同じですか？",
          a: "いいえ。各単語を機械的に処理するだけで、冠詞、前置詞、固有名詞、略語など、言語固有のタイトル規則は適用しません。",
        },
        {
          q: "空白や改行は維持されますか？",
          a: "はい。文字の大文字・小文字だけを変更し、元の空白、句読点、改行は維持します。",
        },
      ],
    },
  },
  examples: {
    wordInput: "例：AbsolTools でオンラインの文字数と単語数を数えます。",
    jsonInput: '例：{"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "例：1704067200（秒）または 1704067200000（ミリ秒）",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "入力例：2024-01-01T00:00。秒は省略でき、日時ピッカーも使用できます。",
    timeResult: "変換結果",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 デコーダー",
      summary: "Base64 の文字列やファイルをオンラインでデコードします。",
      searchTerms: [
        "デコード",
        "復号ではない",
        "Base64URL",
        "Data URI",
        "文字列",
        "ファイル",
        "バイナリ",
      ],
    },
    "base64-encode": {
      name: "Base64 エンコーダー",
      summary: "文字列やファイルをオンラインで Base64 にエンコードします。",
      searchTerms: [
        "エンコード",
        "符号化",
        "Base64URL",
        "Data URI",
        "文字列",
        "ファイル",
        "バイナリ",
      ],
    },
    "word-counter": {
      name: "文字数・単語数カウンター",
      summary: "文字、単語、行、段落の数をオンラインで集計します。",
      searchTerms: ["文字数", "単語数", "空白を除く", "行数", "段落数", "文章"],
    },
    "json-formatter": {
      name: "JSON 整形・検証",
      summary: "JSON を読みやすく整形し、検証または圧縮します。",
      searchTerms: [
        "JSON 整形",
        "JSON 検証",
        "JSON 圧縮",
        "JSON フォーマット",
        "データ",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix タイムスタンプ変換",
      summary: "Unix 時刻の秒・ミリ秒と日時を相互に変換します。",
      searchTerms: [
        "Unix 時間",
        "エポック",
        "タイムスタンプ",
        "秒",
        "ミリ秒",
        "日時",
      ],
    },
    "text-compare": {
      name: "テキスト比較",
      summary: "2つの文章を行単位で比較して差分を表示します。",
      searchTerms: ["テキスト比較", "文章比較", "差分", "行比較", "diff"],
    },
    "case-converter": {
      name: "大文字・小文字変換",
      summary: "文章の大文字、小文字、文頭、単語先頭の形式を変換します。",
      searchTerms: [
        "大文字",
        "小文字",
        "文頭",
        "単語先頭",
        "ケース変換",
        "文章",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "すべてのツール",
    directoryMetaTitle:
      "AbsolTools | ブラウザで使える文字列・データ・コードツール",
    directoryMetaDescription:
      "テキスト、データ、コードの整形、変換、エンコード、デコード、比較、確認をブラウザ内で行えます。入力内容と結果はアップロードされません。",
    directoryTitle: "テキスト、データ、コードをブラウザ内で処理",
    directoryIntro:
      "整形、変換、エンコード、比較に必要なツールをすぐに開けます。入力内容と結果はブラウザ内で処理されます。",
    toolPromise:
      "AbsolToolsは、オンラインでよく使われるツールを、より正確で使いやすいものにします。このサイトをブックマークに追加してください。",
    directorySearchLabel: "ツールを検索",
    directorySearchPlaceholder: "名前、説明、キーワードで検索",
    directorySearchClear: "検索をクリア",
    directorySearchNoResults: "検索条件に一致するツールはありません。",
    directorySearchCount: "一致するツール：{count}",
    available: "利用可能",
    research: "プレビュー",
    reserve: "検討中",
    breadcrumbLabel: "パンくずリスト",
    encodingCategory: "エンコード・デコード",
    categories: {
      encoding: "エンコード・デコード",
      text: "文字列",
      converter: "変換",
      data: "データ",
      time: "日時",
    },
    footerNote: "よく使われる機能を、もっと使いやすく。",
    catalogAria: "ツール一覧",
    useLightTheme: "ライトテーマを使用",
    useDarkTheme: "ダークテーマを使用",
    relatedTools: "関連ツール",
  },
};

export default bundle;
