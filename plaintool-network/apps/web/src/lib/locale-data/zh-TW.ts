import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/zh-TW";

const bundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "繁體中文",
    metaTitle: "Base64 編碼與解碼 — 快速、隱私的線上工具",
    metaDescription:
      "線上解碼 Base64 文字或檔案，也能將文字或檔案編碼為 Base64。支援 Base64URL、缺少的填充字元、Data URI 與舊式字元編碼。",
    decodeMetaTitle: "Base64 解碼器（文字與檔案）| AbsolTools",
    encodeMetaTitle: "Base64 編碼器（文字與檔案）| AbsolTools",
    skipToContent: "跳到主要內容",
    languageNavLabel: "語言",
    legalNavLabel: "法律資訊與聯絡方式",
    modeLabel: "轉換模式",
    heading: "線上解碼 Base64",
    subheading:
      "貼上 Base64 文字或開啟檔案。標準 Base64、Base64URL、缺少的填充字元及 Data URI 都會在瀏覽器內處理。",
    encodeHeading: "線上將文字或檔案編碼為 Base64",
    encodeSubheading:
      "輸入文字或開啟檔案。不需上傳，即可將 UTF-8 文字與二進位檔案轉為標準 Base64 或 Base64URL。",
    decode: "解碼",
    encode: "編碼",
    inputLabel: "Base64 輸入",
    outputLabel: "解碼結果",
    encodeInputLabel: "文字或檔案輸入",
    encodeOutputLabel: "Base64 輸出",
    decodePlaceholder: "範例：SGVsbG8sIEFic29sVG9vbHMh",
    encodePlaceholder: "範例：你好，AbsolTools！",
    outputPlaceholder: "結果會顯示在這裡。",
    openFile: "開啟檔案",
    runDecode: "開始解碼",
    runEncode: "開始編碼",
    options: "選項",
    detected: "偵測結果",
    decodeComplete: "解碼完成",
    encodeComplete: "編碼完成",
    charset: "字元編碼",
    variant: "Base64 格式",
    auto: "自動偵測",
    standard: "標準",
    urlSafe: "URL 安全格式",
    strict: "嚴格驗證",
    lineByLine: "逐行解碼",
    autoRepair: "修正空白與填補字元",
    lenientRepair: "移除剩餘的無效字元",
    outputView: "輸出格式",
    text: "文字",
    hex: "十六進位",
    includePadding: "包含 = 填補字元",
    mimeWrap: "每 76 個字元換行",
    dataUri: "加入 Data URI 前綴",
    dropHint: "可將文字或二進位檔案拖曳到轉換區。",
    fileTooLarge: "輸入大小上限為 100 MiB。",
    binaryOutput:
      "偵測到二進位資料。請先確認檔案類型，再下載檔案，請勿直接執行。",
    executableWarning: "偵測到可執行檔。請勿執行從不可信來源解碼出的檔案。",
    imagePreview: "圖片預覽",
    errors: {
      "empty-input": "請先輸入文字或開啟檔案。",
      "invalid-character": "內容包含 Base64 不允許的字元。",
      "invalid-length": "Base64 內容可能不完整，或長度不正確。",
      "decode-failed": "無法解碼此內容。",
      "encode-failed": "無法編碼此檔案。",
      "unsupported-charset": "您的瀏覽器不支援這個字元編碼。",
      "file-too-large": "輸入超過 100 MiB 的安全上限。",
    },
    repairs: {
      "data-uri-removed": "已移除 Data URI 前綴",
      "whitespace-removed": "已移除空白字元",
      "url-alphabet-normalized": "偵測到 Base64URL 字元表",
      "padding-added": "已補上缺少的填補字元",
      "invalid-characters-removed": "已移除無效字元",
    },
    guideTitle: "如何解碼 Base64",
    guideIntro: "Base64 是編碼格式，不是加密。任何取得內容的人都能將它解碼。",
    guideSteps: [
      "貼上 Base64 內容，或開啟包含該內容的檔案。",
      "工具會偵測格式，並執行移除空白或補上缺少的填補字元等常見修正。",
      "可讀文字可直接複製；二進位結果則下載為檔案。",
    ],
    encodeGuideTitle: "如何編碼 Base64",
    encodeGuideIntro:
      "Base64 會把文字或二進位位元組轉為可列印字元，不會加密或保護原始資料。",
    encodeGuideSteps: [
      "輸入要編碼的文字，或開啟檔案。",
      "選擇標準 Base64 或 URL 安全字元表；只有在目的端要求時，才調整填補字元或換行。",
      "複製 Base64 結果，或下載為文字檔。",
    ],
    safetyTitle: "輸入內容不會被儲存。",
    safetyBody:
      "網站不會儲存或傳送您的輸入內容與轉換結果。所有處理都只在目前的瀏覽器工作階段內完成，重新載入或關閉頁面後即會消失。",
    detailsTitle: "規範與輸入處理",
    detailsBody:
      "工具預設遵循 RFC 4648，可處理標準與 URL 安全字元表、選用的填補字元、MIME 空白及 Data URI 前綴。需要確認精確格式時，請開啟嚴格驗證。",
    faqTitle: "常見問題",
    faqs: [
      {
        q: "Base64 是加密嗎？",
        a: "不是。Base64 只是把二進位資料表示為可列印文字，不提供保密性或驗證功能。",
      },
      {
        q: "為什麼解碼後的內容無法閱讀？",
        a: "結果可能是檔案、壓縮或加密資料，或採用其他字元編碼的文字。請嘗試下載檔案或選擇其他字元編碼。",
      },
      {
        q: "網站會上傳我的輸入內容嗎？",
        a: "不會。轉換在瀏覽器內完成，輸入內容、檔案與結果都不會上傳到伺服器。",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 是加密嗎？",
        a: "不是。Base64 只是把二進位資料表示為可列印文字，不提供保密性或驗證功能。",
      },
      {
        q: "該使用標準 Base64 還是 Base64URL？",
        a: "一般檔案與資料請使用標準 Base64。內容需要安全地放入網址或檔名時，請使用 Base64URL。",
      },
      {
        q: "網站會上傳我的輸入內容嗎？",
        a: "不會。轉換在瀏覽器內完成，輸入內容、檔案與結果都不會上傳到伺服器。",
      },
    ],
    advertisement: "廣告",
    integrationState: { enabled: "已啟用並提供同意控制", disabled: "未啟用" },
    legalNav: {
      about: "關於我們",
      privacy: "隱私權",
      cookies: "Cookie",
      terms: "使用條款",
      contact: "聯絡我們",
    },
    legal: {
      about: {
        title: "關於 AbsolTools",
        intro: "AbsolTools 提供文字、資料、時間及編碼工作的線上工具。",
        sections: [
          {
            title: "我們提供的工具",
            body: [
              "每項工具專注處理一項工作，不需註冊帳號。工具的輸入內容與結果皆在瀏覽器內處理。",
            ],
          },
          {
            title: "聯絡方式",
            body: ["如有問題、錯誤回報或隱私權請求，請寄至 {{email}}。"],
          },
        ],
      },
      privacy: {
        title: "隱私權政策",
        intro:
          "本政策分別說明工具輸入與結果，以及網站、分析與廣告資料的處理方式。",
        sections: [
          {
            title: "工具輸入與結果",
            body: [
              "文字、檔案、JSON、日期與時間值、解碼後的位元組及產生的結果均在瀏覽器內處理。工具輸入與結果不會上傳或儲存在伺服器。",
            ],
          },
          {
            title: "網站傳遞",
            body: [
              "{{host_provider}} 提供並保護此靜態網站，可能處理 IP 位址、請求時間、瀏覽器資訊與請求網址等連線資料。其標示的紀錄保留設定為 {{host_log_retention}}。服務商政策：{{host_privacy_url}}。",
            ],
          },
          {
            title: "分析與廣告",
            body: [
              "Google Analytics 與 Google AdSense 目前為 {{integration_state}}。若日後啟用，這裡會揭露裝置、使用情形、Cookie、同意、保留期間與跨境傳輸細節，並透過「隱私權選擇」管理。依系統設計，工具輸入與結果不會進入分析或廣告事件。",
            ],
          },
          {
            title: "Cookie 與自動蒐集",
            body: [
              "工具不會把輸入或結果儲存在 Cookie 或瀏覽器儲存空間。若您選擇主題，網站只會把 light 或 dark 儲存在本機儲存空間，且不會傳送該值。網站主機的安全技術只有在所選服務商有明確說明時，才可能使用絕對必要的儲存機制。分析與廣告整合停用期間，選用的分析與廣告儲存功能會維持封鎖。",
            ],
          },
          {
            title: "保留與刪除",
            body: [
              "營運者不會保留工具輸入與結果。網站主機的請求資料依上述服務商的保留期間處理。聯絡信件只在回覆請求、履行法律義務或處理濫用所需期間內保留，之後會刪除或去識別化。",
            ],
          },
          {
            title: "接收者與跨境傳輸",
            body: [
              "所選網站主機可能依其政策所述地點與保護措施，在您的國家或地區以外處理請求資料。啟用分析、廣告、同意管理平台或其他接收者之前，本節會依適用法律列明接收者、國家、目的、資料、時間、方式、保留期間與傳輸依據。",
            ],
          },
          {
            title: "您的權利與聯絡方式",
            body: [
              "如適用，您可聯絡 {{email}}，要求查閱、更正、刪除、限制處理、提出異議、資料可攜或撤回同意。我們可能在處理前進行合理的身分驗證。",
            ],
          },
          {
            title: "兒童、安全性與政策變更",
            body: [
              "這項一般用途的開發工具並非針對兒童。我們採用靜態、瀏覽器本機處理架構與限制性瀏覽器政策以降低風險，但沒有任何服務能保證絕對安全。重大政策變更會在本頁標示日期；生效日：{{date}}。",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie 政策",
        intro: "工具不需要 Cookie 即可處理輸入內容。",
        sections: [
          {
            title: "目前使用情形",
            body: [
              "分析與廣告目前為 {{integration_state}}。網站不會將工具輸入或結果儲存在 Cookie 或本機儲存空間，只會把您選擇的主題（light 或 dark）存入本機儲存空間，且不會傳送該值。",
            ],
          },
          {
            title: "若啟用整合服務",
            body: [
              "同意管理平台將控制必要的偏好設定儲存、分析儲存與廣告儲存。訪客可透過永久顯示的隱私權控制，檢視或撤回同意。",
            ],
          },
        ],
      },
      terms: {
        title: "使用條款",
        intro: "使用本免費工具即表示您同意以下條款。",
        sections: [
          {
            title: "服務",
            body: [
              "本服務依現況提供，不保證準確性、可用性、特定用途適用性或不中斷運作。重要結果請自行再次確認。",
            ],
          },
          {
            title: "安全且合法的使用",
            body: [
              "請勿使用本服務攻擊系統、違反法律或第三方權利，或散布有害內容。切勿執行從不可信來源解碼出的檔案。",
            ],
          },
          {
            title: "責任與第三方",
            body: [
              "在強制適用法律允許的範圍內，營運者不對間接或衍生損失負責。第三方廣告與連結不代表本站為其背書。",
            ],
          },
          {
            title: "智慧財產與變更",
            body: [
              "網站設計與原創說明內容受適用法律保護。您應對自己處理的內容負責。我們可能變更或停止功能，並會為重大條款變更標示日期。",
            ],
          },
          {
            title: "準據法與聯絡方式",
            body: [
              "本服務由 {{region}} 營運。準據法：{{governing_law}}。管轄法院：{{jurisdiction}}。強制消費者保護規定仍然適用。聯絡信箱：{{email}}。生效日：{{date}}。",
            ],
          },
        ],
      },
      contact: {
        title: "聯絡我們",
        intro: "歡迎提出問題、錯誤回報、隱私權請求與濫用檢舉。",
        sections: [
          {
            title: "電子郵件",
            body: [
              "請聯絡 {{email}}。請勿在信件中附上工具輸入內容，例如敏感文字、JSON、Base64 值、密碼、私密金鑰或個人檔案。",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "預覽版",
    ready: "準備完成",
    working: "處理中…",
    clear: "清除",
    copy: "複製",
    copied: "已複製",
    copyFailed: "無法複製結果。",
    processingFailed: "處理失敗，請再試一次。",
    download: "下載",
    faqTitle: "常見問題",
    localTitle: "AbsolTools 在您的瀏覽器內運作。",
    localBody: "輸入內容與結果只會在這個瀏覽器內處理，不會上傳或儲存在伺服器。",
  },
  preview: {
    word: {
      title: "字數統計與單字計算器",
      description: "線上統計字數、字元、英文單字、行與段落數。",
      inputLabel: "文字",
      words: "單字",
      characters: "字元",
      noWhitespace: "不含空白的字元",
      lines: "行",
      paragraphs: "段落",
      completed: "計算完成",
      approximate:
        "這個瀏覽器不支援 Intl.Segmenter，因此字元與單字數為估算值。",
      tooLarge: "輸入超過 1 MB 上限。請縮短或清除文字後再繼續。",
      guideTitle: "計算方式",
      guideBody:
        "在支援的瀏覽器中，字元會依使用者感知的字素叢集計算，因此一個表情符號或帶組合符號的字母通常算一個字元。不含空白的計數只略過原文中的空白字素，不會合併兩側字素。行數依換行符號計算；只包含空白的行也會視為空白行，用來分隔段落。",
      faqs: [
        {
          q: "單字數如何計算？",
          a: "支援 Intl.Segmenter 的瀏覽器會依目前頁面語言判斷單字邊界，並計算可視為單字的區段。其他瀏覽器會顯示估算值。",
        },
        {
          q: "表情符號算一個字元嗎？",
          a: "在支援的瀏覽器中，看起來是一個字元的表情符號或組合字元會計算一次。",
        },
      ],
    },
    json: {
      title: "JSON 格式化與驗證",
      description: "將 JSON 排版得更容易閱讀、檢查錯誤，或壓縮為單行。",
      inputLabel: "JSON 輸入",
      outputLabel: "結果",
      placeholder: "在此貼上 JSON…",
      outputPlaceholder: "格式化或壓縮後的 JSON 會顯示在這裡。",
      openFile: "開啟 .json",
      tooLarge: "輸入超過 10 MiB 上限。",
      manualRequired:
        "此輸入較大，已暫停自動驗證。請選擇「格式化」、「驗證」或「壓縮」。",
      format: "格式化",
      validate: "驗證",
      validateHelpLabel: "關於驗證",
      validateHelp:
        "檢查輸入是否符合 RFC 8259 JSON 語法，並回報語法錯誤的位置與原因。不會重新排版或變更文字。",
      minify: "壓縮",
      minifyHelpLabel: "關於壓縮",
      minifyHelp:
        "移除有效 JSON 中可省略的空白與換行，使內容更精簡。字串內容、原始數字表示方式與重複的物件鍵都會保留。",
      indent: "縮排",
      twoSpaces: "2 個空格",
      fourSpaces: "4 個空格",
      tabs: "定位字元",
      valid: "有效的 JSON",
      invalidAt: "{message} 第 {line} 行，第 {column} 欄。",
      duplicate: "第 {line} 行，第 {column} 欄有重複鍵",
      bom: "處理前已移除 UTF-8 BOM。",
      errorMessages: {
        InvalidSymbol: "符號無效。",
        InvalidNumberFormat: "數字格式無效。",
        PropertyNameExpected: "需要屬性名稱。",
        ValueExpected: "需要值。",
        ColonExpected: "屬性名稱後需要冒號。",
        CommaExpected: "項目之間需要逗號。",
        CloseBraceExpected: "需要右大括號。",
        CloseBracketExpected: "需要右中括號。",
        EndOfFileExpected: "JSON 值後出現非預期內容。",
        InvalidCommentToken: "JSON 不允許註解。",
        UnexpectedEndOfComment: "註解不完整。",
        UnexpectedEndOfString: "字串不完整。",
        UnexpectedEndOfNumber: "數字不完整。",
        InvalidUnicode: "Unicode 跳脫序列無效。",
        InvalidEscapeCharacter: "跳脫序列無效。",
        InvalidCharacter: "此處不允許這個字元。",
        Unknown: "JSON 無效。",
      },
      guideTitle: "JSON 規則與數字保留",
      guideBody:
        "驗證遵循 RFC 8259：註解、結尾逗號與單引號都會回報為錯誤。重複鍵會保留並顯示警告，大數字也會維持您輸入的精確表示方式。",
      faqs: [
        {
          q: "大數字會改變嗎？",
          a: "不會。格式化與壓縮不會重新計算數字，而會保留原始表示方式，因此不會將大數字四捨五入。",
        },
        {
          q: "為什麼要回報重複鍵？",
          a: "不同軟體可能用不同方式處理重複的物件鍵。AbsolTools 會保留它們並顯示警告，不會在未告知的情況下刪除資料。",
        },
        {
          q: "格式化工具會修復無效 JSON 嗎？",
          a: "不會。註解、結尾逗號、單引號及其他無效語法都會回報，讓您自行確認後修正來源。",
        },
        {
          q: "這和用 Prettier 格式化 JSON 類似嗎？",
          a: "兩者都會透過縮排與換行讓有效的 JSON 更容易閱讀。此工具在瀏覽器中處理嚴格 JSON；並不宣稱會執行 Prettier、保留註解或排序物件鍵。",
        },
      ],
    },
    time: {
      title: "Unix 時間戳記轉換器",
      description:
        "將秒或毫秒的 Unix 時間戳記轉換為指定時區的日期時間，也能反向轉換。",
      timestampMode: "時間戳記轉日期時間",
      dateMode: "日期時間轉時間戳記",
      timestampLabel: "Unix 時間戳記",
      dateLabel: "日期與時間",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "選擇日期與時間",
      unit: "單位",
      auto: "自動偵測",
      seconds: "秒",
      milliseconds: "毫秒",
      zoneMode: "時區",
      utc: "UTC 時差",
      local: "瀏覽器時區",
      selected: "IANA 時區",
      zoneLabel: "城市、地區或 IANA 時區",
      zonePlaceholder: "搜尋台北、Asia 或 Asia/Taipei",
      popularZones: [
        {
          value: "Asia/Taipei",
          label: "台北（台灣）— Asia/Taipei · UTC+08:00",
        },
        { value: "Asia/Tokyo", label: "東京（日本）— Asia/Tokyo · UTC+09:00" },
        { value: "Asia/Seoul", label: "首爾（韓國）— Asia/Seoul · UTC+09:00" },
        { value: "America/New_York", label: "紐約（美國）— America/New_York" },
        {
          value: "America/Los_Angeles",
          label: "洛杉磯（美國）— America/Los_Angeles",
        },
        { value: "Europe/London", label: "倫敦（英國）— Europe/London" },
        { value: "Europe/Paris", label: "巴黎（法國）— Europe/Paris" },
        { value: "Europe/Madrid", label: "馬德里（西班牙）— Europe/Madrid" },
        { value: "Asia/Shanghai", label: "上海（中國）— Asia/Shanghai" },
        { value: "Asia/Singapore", label: "新加坡 — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "加爾各答（印度）— Asia/Kolkata" },
        { value: "Australia/Sydney", label: "雪梨（澳洲）— Australia/Sydney" },
      ],
      offsetLabel: "UTC 時差",
      disambiguation: "略過或重複的當地時間",
      reject: "顯示錯誤",
      earlier: "使用較早結果",
      later: "使用較晚結果",
      now: "現在",
      convert: "轉換",
      instant: "UTC 日期與時間",
      zoned: "所選時區的日期與時間",
      unixSeconds: "Unix 時間戳記（秒）",
      unixMilliseconds: "Unix 時間戳記（毫秒）",
      converted: "轉換完成",
      invalid: "請輸入有效的 Unix 時間戳記或 ISO 日期時間，並檢查時區。",
      ambiguousUnit: "11 或 12 位數的值無法判定單位，請選擇秒或毫秒。",
      nonexistentTime:
        "所選時區的時鐘向前調整，因此這個日期時間不存在。請選擇較早或較晚的結果。",
      repeatedTime:
        "所選時區的時鐘向後調整，因此這個日期時間會出現兩次。請選擇較早或較晚的結果。",
      y2038: "此值超出帶正負號 32 位元 Unix 時間範圍。",
      guideTitle: "單位與時區的處理方式",
      guideBody:
        "自動偵測會把小數與 1 至 10 位整數視為秒、13 位整數視為毫秒；11 或 12 位整數則要求您選擇單位。可直接輸入當地日期時間或使用選擇器，秒與小數秒可省略。預設使用瀏覽器時區。將時間戳記轉為日期時間時，時區只影響顯示的當地時間；將當地日期時間轉為時間戳記時，時區會決定 Unix 值。",
      faqs: [
        {
          q: "如何自動偵測單位？",
          a: "小數與 1 至 10 位整數會視為秒，13 位整數會視為毫秒。11 至 12 位的值請自行選擇單位。",
        },
        {
          q: "可以輸入哪種日期格式？",
          a: "請輸入不含 UTC 時差的當地日期時間，例如 2026-08-29T14:30。秒與最多九位小數秒可省略，也可以使用選擇器。",
        },
        {
          q: "各時區選項有何差異？",
          a: "瀏覽器時區會依裝置設定的時鐘規則運作。UTC 時差使用 +00:00 或 +08:00 等固定值。America/New_York 等 IANA 時區則遵循該地區的調時規則。",
        },
        {
          q: "日光節約時間會讓 Unix 時間戳記變得模糊嗎？",
          a: "不會。Unix 時間戳記代表單一時間點。只有把當地日期時間轉換到會調整時鐘的時區時，才可能遇到不存在或出現兩次的當地時間。工具預設顯示錯誤；只有在您要明確解決時，才選擇較早或較晚的結果。",
        },
      ],
    },
    textCompare: {
      title: "文字差異比對",
      description: "不需上傳，即可逐行比較兩段文字並標示新增、刪除與修改。",
      originalLabel: "原始文字",
      changedLabel: "修改後文字",
      originalPlaceholder: "在此貼上原始文字…",
      changedPlaceholder: "在此貼上修改後文字…",
      compare: "開始比對",
      swap: "對調",
      results: "比對結果",
      empty: "請至少在其中一側輸入文字。",
      tooLarge: "每段文字不得超過 1 MiB。",
      tooManyLines: "兩段文字合計最多 20,000 行。",
      tooComplex: "差異過於複雜，無法安全處理。請縮短文字。",
      stale: "下方是前一次比對結果。請重新比對以更新。",
      complete: "比對完成",
      identical: "兩段文字完全相同。",
      approximate:
        "這個瀏覽器不支援 Intl.Segmenter，因此行內字元標示為估算結果。",
      inlineLimited: "為維持回應速度，部分很長的修改行會以整行變更顯示。",
      additions: "新增行：{count}",
      deletions: "刪除行：{count}",
      changes: "修改列：{count}",
      previousChange: "上一個差異",
      nextChange: "下一個差異",
      expandUnchanged: "顯示 {count} 行未變更內容",
      whitespaceChange: "空白字元有變更",
      lineEndingChange: "換行格式有變更",
      unchangedRow: "未變更行",
      addedRow: "新增行",
      removedRow: "刪除行",
      changedRow: "修改行",
      originalLine: "原始文字第 {line} 行",
      changedLine: "修改後文字第 {line} 行",
      guideTitle: "比對方式",
      guideBody:
        "工具會先對齊各行，再於成對的修改行內標示字元層級的差異。只有空白或換行格式不同時會明確標示。較長的未變更區段會先收合，直到您展開。",
      faqs: [
        {
          q: "AbsolTools 會上傳文字嗎？",
          a: "不會。兩段文字只在瀏覽器內比對，不會傳送到伺服器。",
        },
        {
          q: "能偵測不同的換行格式嗎？",
          a: "可以。即使畫面上的文字相同，CRLF、LF 與 CR 換行格式的差異仍會標示。",
        },
      ],
    },
    caseConverter: {
      title: "英文大小寫轉換",
      description:
        "不需上傳文字，即可轉換為大寫、小寫、句首大寫或每個單字首字母大寫。",
      inputLabel: "文字",
      outputLabel: "轉換後文字",
      placeholder: "輸入或貼上文字…",
      outputPlaceholder: "轉換後的文字會顯示在這裡。",
      modeLabel: "轉換方式",
      upper: "全部大寫",
      lower: "全部小寫",
      sentence: "句首大寫",
      capitalizeWords: "單字首字母大寫",
      converted: "轉換完成",
      noChange: "文字已符合這個轉換結果。",
      outdated: "目前顯示的是前一次輸入的結果。",
      tooLarge: "輸入超過 1 MB 上限。",
      guideTitle: "各種轉換的運作方式",
      guideBody:
        "大寫與小寫採用 Unicode 預設大小寫對應。「句首大寫」會先將文字轉為小寫，再把開頭、換行後或 . ! ? 。 ！ ？ 後第一個有大小寫的字母轉為大寫。「單字首字母大寫」會將每個單字中第一個有大小寫的字母轉為大寫，並保留空格、標點、換行、撇號、連字號與底線。中文等沒有大小寫的字元不會改變。",
      faqs: [
        {
          q: "單字首字母大寫等同英文標題格式嗎？",
          a: "不等同。它會機械式地處理每個單字，不套用冠詞、介系詞、名稱或縮寫等語言特定的標題規則。",
        },
        {
          q: "會保留空格與換行嗎？",
          a: "會。工具只改變字母大小寫，原有空格、標點與換行都會保留。",
        },
      ],
    },
  },
  examples: {
    wordInput: "範例：AbsolTools 可在線上計算單字與字元數。",
    jsonInput: '範例：{"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "範例：1704067200（秒）或 1704067200000（毫秒）",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "格式範例：2024-01-01T00:00。秒可省略，也可以使用日期時間選擇器。",
    timeResult: "轉換結果",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 解碼器",
      summary: "線上解碼 Base64 文字或檔案。",
      searchTerms: [
        "Base64 解碼",
        "解碼器",
        "Base64URL",
        "Data URI",
        "文字",
        "檔案",
        "二進位",
      ],
    },
    "base64-encode": {
      name: "Base64 編碼器",
      summary: "線上將文字或檔案編碼為 Base64。",
      searchTerms: [
        "Base64 編碼",
        "編碼器",
        "Base64URL",
        "Data URI",
        "文字",
        "檔案",
        "二進位",
      ],
    },
    "word-counter": {
      name: "字數統計與單字計算器",
      summary: "線上統計字數、字元、英文單字、行與段落數。",
      searchTerms: [
        "字數統計",
        "字數計算器",
        "中文字數",
        "英文字數",
        "字元數",
        "行數",
        "段落數",
      ],
    },
    "json-formatter": {
      name: "JSON 格式化與驗證",
      summary: "排版 JSON、檢查錯誤或壓縮為單行。",
      searchTerms: [
        "JSON 格式化",
        "JSON 驗證",
        "JSON 壓縮",
        "JSON 排版",
        "資料",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix 時間戳記轉換器",
      summary: "在 Unix 秒、毫秒與日期時間之間互相轉換。",
      searchTerms: ["Unix 時間", "時間戳記", "epoch", "秒", "毫秒", "日期時間"],
    },
    "text-compare": {
      name: "文字差異比對",
      summary: "逐行比較兩段文字並標示差異。",
      searchTerms: ["文字比對", "文字比較", "差異", "逐行比較", "diff"],
    },
    "case-converter": {
      name: "英文大小寫轉換",
      summary: "轉換英文大寫、小寫、句首或單字首字母。",
      searchTerms: [
        "大寫轉換",
        "小寫轉換",
        "句首大寫",
        "單字首字母",
        "英文",
        "文字",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "所有工具",
    directoryMetaTitle: "AbsolTools | 需要時立即可用的實用工具",
    directoryMetaDescription:
      "直接在瀏覽器中格式化、轉換、編碼、解碼、比較及檢查文字、資料與程式碼。工具輸入與結果不會上傳。",
    directoryTitle: "我們讓常用工具更簡潔、更好用",
    directoryIntro:
      "免登入、資料不儲存於伺服器，所有工具皆可免費使用。將本站加入書籤，下次即可直接開啟。",
    toolPromise: {
      improvement: "AbsolTools 讓常用工具更精準、更方便使用。",
      privacy:
        "所有工具皆免費且無須註冊。處理只在瀏覽器中進行，輸入內容與結果不會儲存於伺服器，也不會傳送到伺服器。",
      bookmark: "將本站加入書籤，下次需要時即可直接使用。",
    },
    directorySearchLabel: "搜尋工具",
    directorySearchPlaceholder: "依名稱、說明或關鍵字搜尋",
    directorySearchClear: "清除搜尋",
    directorySearchNoResults: "沒有符合搜尋條件的工具。",
    directorySearchCount: "符合的工具：{count}",
    available: "可使用",
    research: "預覽版",
    reserve: "評估中",
    breadcrumbLabel: "麵包屑導覽",
    encodingCategory: "編碼與解碼",
    categories: {
      encoding: "編碼與解碼",
      generator: "產生器",
      text: "文字",
      converter: "轉換工具",
      image: "圖片",
      pdf: "PDF",
      data: "資料",
      calculator: "計算器",
      time: "時間",
    },
    footerNote: "常用功能，使用起來更方便。",
    catalogAria: "工具目錄",
    useLightTheme: "使用淺色主題",
    useDarkTheme: "使用深色主題",
    relatedTools: "相關工具",
  },
};

export default bundle;
