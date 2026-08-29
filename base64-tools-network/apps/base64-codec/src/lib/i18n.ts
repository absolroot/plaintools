import type { LegalPage, Locale } from "./site";

type Copy = {
  languageName: string;
  metaTitle: string;
  metaDescription: string;
  decodeMetaTitle: string;
  encodeMetaTitle: string;
  skipToContent: string;
  languageNavLabel: string;
  legalNavLabel: string;
  modeLabel: string;
  heading: string;
  subheading: string;
  encodeHeading: string;
  encodeSubheading: string;
  decode: string;
  encode: string;
  inputLabel: string;
  outputLabel: string;
  encodeInputLabel: string;
  encodeOutputLabel: string;
  decodePlaceholder: string;
  encodePlaceholder: string;
  outputPlaceholder: string;
  openFile: string;
  runDecode: string;
  runEncode: string;
  options: string;
  detected: string;
  decodeComplete: string;
  encodeComplete: string;
  charset: string;
  variant: string;
  auto: string;
  standard: string;
  urlSafe: string;
  strict: string;
  lineByLine: string;
  autoRepair: string;
  lenientRepair: string;
  outputView: string;
  text: string;
  hex: string;
  includePadding: string;
  mimeWrap: string;
  dataUri: string;
  dropHint: string;
  fileTooLarge: string;
  binaryOutput: string;
  executableWarning: string;
  imagePreview: string;
  errors: Record<string, string>;
  repairs: Record<string, string>;
  guideTitle: string;
  guideIntro: string;
  guideSteps: string[];
  encodeGuideTitle: string;
  encodeGuideIntro: string;
  encodeGuideSteps: string[];
  safetyTitle: string;
  safetyBody: string;
  detailsTitle: string;
  detailsBody: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  encodeFaqs: Array<{ q: string; a: string }>;
  advertisement: string;
  integrationState: { enabled: string; disabled: string };
  legalNav: Record<LegalPage, string>;
  legal: Record<
    LegalPage,
    {
      title: string;
      intro: string;
      sections: Array<{ title: string; body: string[] }>;
    }
  >;
};

export const copy: Record<Locale, Copy> = {
  en: {
    languageName: "English",
    metaTitle: "Base64 Decoder & Encoder — Fast, Private, In-Browser",
    metaDescription:
      "Decode Base64 into text or files and encode text or files directly in your browser. Supports Base64URL, missing padding, Data URIs, and legacy character encodings.",
    decodeMetaTitle: "Base64 Decoder for Text & Files | PlainTool",
    encodeMetaTitle: "Base64 Encoder for Text & Files | PlainTool",
    skipToContent: "Skip to content",
    languageNavLabel: "Language",
    legalNavLabel: "Legal and contact",
    modeLabel: "Conversion mode",
    heading: "Decode Base64 directly in your browser.",
    subheading:
      "Paste Base64 text or open a file. Standard Base64, Base64URL, missing padding, and Data URI input are handled locally.",
    encodeHeading: "Encode text or files as Base64 in your browser.",
    encodeSubheading:
      "Enter text or open a file. Convert UTF-8 text and binary files to standard Base64 or Base64URL without uploading them.",
    decode: "Decode",
    encode: "Encode",
    inputLabel: "Base64 input",
    outputLabel: "Decoded output",
    encodeInputLabel: "Text or file input",
    encodeOutputLabel: "Base64 output",
    decodePlaceholder: "Example: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Example: Hello, PlainTool!",
    outputPlaceholder: "The result appears here.",
    openFile: "Open file",
    runDecode: "Decode now",
    runEncode: "Encode now",
    options: "Options",
    detected: "Detected",
    decodeComplete: "Decoding complete",
    encodeComplete: "Encoding complete",
    charset: "Character encoding",
    variant: "Base64 format",
    auto: "Detect automatically",
    standard: "Standard",
    urlSafe: "URL-safe",
    strict: "Validate strictly",
    lineByLine: "Decode each line separately",
    autoRepair: "Repair whitespace and padding",
    lenientRepair: "Remove remaining invalid characters",
    outputView: "Output format",
    text: "Text",
    hex: "Hex",
    includePadding: "Include = padding",
    mimeWrap: "Wrap at 76 characters",
    dataUri: "Add Data URI prefix",
    dropHint: "Drop a text or binary file anywhere in the converter.",
    fileTooLarge: "The maximum input size is 100 MiB.",
    binaryOutput:
      "Binary data detected. Review the file type, then download it instead of running it directly.",
    executableWarning:
      "Executable file detected. Do not run files decoded from an untrusted source.",
    imagePreview: "Image preview",
    errors: {
      "empty-input": "Enter some text or open a file first.",
      "invalid-character":
        "This value contains a character that is not valid Base64.",
      "invalid-length":
        "The Base64 value is truncated or has an impossible length.",
      "decode-failed": "The value could not be decoded.",
      "unsupported-charset":
        "This character encoding is not supported by your browser.",
      "file-too-large": "This input is larger than the 100 MiB safety limit.",
    },
    repairs: {
      "data-uri-removed": "Data URI prefix removed",
      "whitespace-removed": "Whitespace removed",
      "url-alphabet-normalized": "Base64URL alphabet detected",
      "padding-added": "Missing padding added",
      "invalid-characters-removed": "Invalid characters removed",
    },
    guideTitle: "How to decode Base64",
    guideIntro:
      "Base64 is an encoding format, not encryption. Anyone who has the value can decode it.",
    guideSteps: [
      "Paste a Base64 value or open a file that contains one.",
      "The tool detects the format and applies common corrections such as removing whitespace or restoring missing padding.",
      "Copy readable text, or download binary output as a file.",
    ],
    encodeGuideTitle: "How to encode Base64",
    encodeGuideIntro:
      "Base64 turns text or binary bytes into printable characters. It does not encrypt or protect the source data.",
    encodeGuideSteps: [
      "Type text or open the file you want to encode.",
      "Choose standard Base64 or the URL-safe alphabet, then adjust padding or line wrapping only when the destination requires it.",
      "Copy the Base64 result or download it as a text file.",
    ],
    safetyTitle: "Your input is not stored.",
    safetyBody:
      "The site does not store your input or conversion results, and it does not send them to a server. Everything is processed in your current browser session and disappears when you reload or close the page.",
    detailsTitle: "Standards and input handling",
    detailsBody:
      "By default, the tool follows RFC 4648 and handles standard and URL-safe alphabets, optional padding, MIME whitespace, and Data URI prefixes. Turn on strict validation when the exact format matters.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Is Base64 encryption?",
        a: "No. Base64 changes binary data into printable text. It provides no secrecy or authentication.",
      },
      {
        q: "Why can't I read the decoded output?",
        a: "The output may be a file, compressed or encrypted data, or text in a different character encoding. Try downloading the file or choosing another character encoding.",
      },
      {
        q: "Does this site upload my input?",
        a: "No. Conversion happens in your browser. Your input, files, and results are not uploaded to a server.",
      },
    ],
    encodeFaqs: [
      {
        q: "Is Base64 encryption?",
        a: "No. Base64 changes binary data into printable text. It provides no secrecy or authentication.",
      },
      {
        q: "Should I use standard Base64 or Base64URL?",
        a: "Use standard Base64 for general files and data. Use Base64URL when the value must appear safely in a URL or filename.",
      },
      {
        q: "Does this site upload my input?",
        a: "No. Conversion happens in your browser. Your input, files, and results are not uploaded to a server.",
      },
    ],
    advertisement: "Advertisement",
    integrationState: {
      enabled: "enabled with consent controls",
      disabled: "disabled",
    },
    legalNav: {
      about: "About",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Terms",
      contact: "Contact",
    },
    legal: {
      about: {
        title: "About",
        intro:
          "PlainTool provides browser tools for text, data, time, and encoding tasks.",
        sections: [
          {
            title: "What we build",
            body: [
              "Each tool handles one focused task without requiring an account. Tool input and results are processed in your browser.",
            ],
          },
          {
            title: "Contact",
            body: [
              "Send questions, bug reports, and privacy requests to {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Privacy policy",
        intro:
          "This policy separates tool input and results from website, analytics, and advertising data.",
        sections: [
          {
            title: "Tool input and results",
            body: [
              "Text, files, JSON, date and time values, decoded bytes, and generated results are processed in the browser. Tool input and results are not uploaded to or stored on a server.",
            ],
          },
          {
            title: "Website delivery",
            body: [
              "{{host_provider}} serves and protects this static site and may process connection data such as your IP address, request time, browser information, and requested URL. Its stated log-retention setting is {{host_log_retention}}. Provider policy: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analytics and advertising",
            body: [
              "Google Analytics and Google AdSense are currently {{integration_state}}. When enabled, their device, usage, cookie, consent, retention, and international-transfer details will be disclosed here and managed through Privacy choices. Tool input and results are excluded from analytics and advertising events by design.",
            ],
          },
          {
            title: "Cookies and automatic collection",
            body: [
              "The tools do not store tool input or results in cookies or browser storage. If you choose a theme, the site stores only light or dark in local storage and does not transmit it. Hosting security technology may use strictly necessary storage only when documented by the selected provider. Optional analytics and advertising storage remains blocked while those integrations are disabled.",
            ],
          },
          {
            title: "Retention and deletion",
            body: [
              "The operator does not retain tool input or results. Hosting request data follows the provider retention stated above. Contact correspondence is retained only as long as needed to answer the request, meet legal obligations, or handle abuse, then deleted or anonymized.",
            ],
          },
          {
            title: "Recipients and international transfers",
            body: [
              "The selected host may process request data outside your country in the locations and under the safeguards described in its policy. Before analytics, advertising, a consent manager, or another recipient is enabled, this section must identify the recipient, countries, purpose, data, timing, method, retention period, and transfer basis required by applicable law.",
            ],
          },
          {
            title: "Your choices and contact",
            body: [
              "Where applicable, you may request access, correction, deletion, restriction, objection, portability, or withdrawal of consent by contacting {{email}}. We may need reasonable verification before fulfilling a request.",
            ],
          },
          {
            title: "Children, security, and changes",
            body: [
              "This general-purpose developer utility is not directed to children. We use a static, browser-local architecture and restrictive browser policies to reduce risk, but no service is completely secure. Material policy changes will be dated on this page; effective date: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie policy",
        intro: "The tools do not need cookies to process input.",
        sections: [
          {
            title: "Current use",
            body: [
              "Analytics and advertising are currently {{integration_state}}. The site does not store tool input or results in cookies or local storage. It stores only your selected theme preference (light or dark) in local storage; this value is not transmitted.",
            ],
          },
          {
            title: "If integrations are enabled",
            body: [
              "A consent platform will control required preference storage, analytics storage, and advertising storage. A permanent privacy control will let visitors review or withdraw consent.",
            ],
          },
        ],
      },
      terms: {
        title: "Terms of use",
        intro: "Use of this free tool is subject to these terms.",
        sections: [
          {
            title: "Service",
            body: [
              "The service is provided as is, without guarantees of accuracy, availability, fitness for a particular purpose, or uninterrupted operation. Verify important results independently.",
            ],
          },
          {
            title: "Safe and lawful use",
            body: [
              "Do not use the service to attack systems, violate law or third-party rights, or distribute harmful content. Never execute a decoded file from an untrusted source.",
            ],
          },
          {
            title: "Liability and third parties",
            body: [
              "To the extent permitted by mandatory law, the operator is not liable for indirect or consequential loss. Third-party advertisements and links are not endorsements.",
            ],
          },
          {
            title: "Intellectual property and changes",
            body: [
              "The site design and original explanatory content are protected by applicable law. You retain responsibility for content you process. We may change or discontinue features and will date material term changes.",
            ],
          },
          {
            title: "Governing law and contact",
            body: [
              "This service is operated from {{region}}. Governing law: {{governing_law}}. Jurisdiction: {{jurisdiction}}. Mandatory consumer protections continue to apply. Contact {{email}}. Effective date: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contact",
        intro:
          "We welcome questions, bug reports, privacy requests, and abuse reports.",
        sections: [
          {
            title: "Email",
            body: [
              "Contact {{email}}. Do not include tool input such as sensitive text, JSON, Base64 values, passwords, private keys, or personal files in your message.",
            ],
          },
        ],
      },
    },
  },
  ko: {} as Copy,
  es: {} as Copy,
};

copy.ko = {
  languageName: "한국어",
  metaTitle: "Base64 디코딩·인코딩 — 빠른 브라우저 변환기",
  metaDescription:
    "Base64 텍스트나 파일을 브라우저에서 디코딩하고, 텍스트나 파일을 Base64로 인코딩하세요. Base64URL, 빠진 패딩, Data URI와 여러 문자 인코딩을 지원합니다.",
  decodeMetaTitle: "Base64 디코더 - 텍스트·파일 변환 | PlainTool",
  encodeMetaTitle: "Base64 인코더 - 텍스트·파일 변환 | PlainTool",
  skipToContent: "본문으로 건너뛰기",
  languageNavLabel: "언어 선택",
  legalNavLabel: "정책 및 문의",
  modeLabel: "변환 모드",
  heading: "브라우저에서 바로 Base64를 디코딩하세요.",
  subheading:
    "Base64 텍스트를 붙여넣거나 파일을 여세요. 표준 Base64와 Base64URL을 자동으로 구분하고, 빠진 패딩과 Data URI도 처리합니다.",
  encodeHeading: "브라우저에서 바로 Base64로 인코딩하세요.",
  encodeSubheading:
    "텍스트를 입력하거나 파일을 여세요. UTF-8 텍스트와 바이너리 파일을 표준 Base64 또는 Base64URL로 변환하며 서버에 업로드하지 않습니다.",
  decode: "디코딩",
  encode: "인코딩",
  inputLabel: "Base64 입력",
  outputLabel: "디코딩한 결과",
  encodeInputLabel: "인코딩할 텍스트 또는 파일",
  encodeOutputLabel: "Base64 결과",
  decodePlaceholder: "예: SGVsbG8sIFBsYWluVG9vbCE=",
  encodePlaceholder: "예: Hello, PlainTool!",
  outputPlaceholder: "결과가 여기에 표시됩니다.",
  openFile: "파일 열기",
  runDecode: "디코딩하기",
  runEncode: "인코딩하기",
  options: "옵션",
  detected: "감지됨",
  decodeComplete: "디코딩 완료",
  encodeComplete: "인코딩 완료",
  charset: "문자 인코딩",
  variant: "Base64 형식",
  auto: "자동 감지",
  standard: "표준",
  urlSafe: "URL-safe",
  strict: "엄격한 형식 검사",
  lineByLine: "줄마다 따로 디코딩",
  autoRepair: "공백·패딩 자동 보정",
  lenientRepair: "나머지 잘못된 문자 제거",
  outputView: "결과 형식",
  text: "텍스트",
  hex: "16진수",
  includePadding: "끝에 = 패딩 추가",
  mimeWrap: "76자마다 줄 바꿈",
  dataUri: "Data URI 접두사 붙이기",
  dropHint: "텍스트 파일이나 바이너리 파일을 변환기 영역에 끌어다 놓으세요.",
  fileTooLarge: "입력할 수 있는 최대 크기는 100 MiB입니다.",
  binaryOutput:
    "바이너리 데이터가 감지되었습니다. 파일 형식을 확인한 뒤 직접 실행하지 말고 다운로드하세요.",
  executableWarning:
    "실행 파일이 감지되었습니다. 신뢰할 수 없는 출처에서 디코딩한 파일은 실행하지 마세요.",
  imagePreview: "이미지 미리보기",
  errors: {
    "empty-input": "먼저 텍스트를 입력하거나 파일을 여세요.",
    "invalid-character": "Base64에 사용할 수 없는 문자가 들어 있습니다.",
    "invalid-length": "Base64 값이 중간에 잘렸거나 올바른 길이가 아닙니다.",
    "decode-failed": "입력한 값을 디코딩할 수 없습니다.",
    "unsupported-charset":
      "이 브라우저에서는 선택한 문자 인코딩을 지원하지 않습니다.",
    "file-too-large": "입력 크기가 100 MiB 제한을 넘었습니다.",
  },
  repairs: {
    "data-uri-removed": "Data URI 접두사를 제거했습니다",
    "whitespace-removed": "공백을 제거했습니다",
    "url-alphabet-normalized": "Base64URL 형식을 감지했습니다",
    "padding-added": "빠진 패딩을 추가했습니다",
    "invalid-characters-removed": "잘못된 문자를 제거했습니다",
  },
  guideTitle: "Base64 디코딩 방법",
  guideIntro:
    "Base64는 데이터를 문자로 표현하는 인코딩 방식이며 암호화가 아닙니다. 값을 알고 있으면 누구나 디코딩할 수 있습니다.",
  guideSteps: [
    "Base64 값을 붙여넣거나 해당 값이 들어 있는 파일을 엽니다.",
    "형식을 자동으로 감지하고 공백 제거, 빠진 패딩 추가처럼 일반적인 보정을 적용합니다.",
    "텍스트 결과는 복사하고, 바이너리 결과는 파일로 다운로드합니다.",
  ],
  encodeGuideTitle: "Base64 인코딩 방법",
  encodeGuideIntro:
    "Base64는 텍스트나 바이너리 바이트를 출력 가능한 문자로 바꿉니다. 원본 데이터를 암호화하거나 보호하지는 않습니다.",
  encodeGuideSteps: [
    "인코딩할 텍스트를 입력하거나 파일을 엽니다.",
    "사용할 곳의 요구 사항에 맞춰 표준 Base64 또는 URL-safe 형식을 고르고, 필요할 때만 패딩이나 줄바꿈을 조정합니다.",
    "Base64 결과를 복사하거나 텍스트 파일로 다운로드합니다.",
  ],
  safetyTitle: "입력 데이터는 저장되지 않습니다.",
  safetyBody:
    "입력 내용과 변환 결과는 저장되지 않으며 서버로 전송되지도 않습니다. 모든 변환은 현재 브라우저 안에서만 처리되고, 페이지를 새로고침하거나 닫으면 화면의 내용이 사라집니다.",
  detailsTitle: "표준과 입력 처리 방식",
  detailsBody:
    "기본 설정에서는 RFC 4648에 따른 표준 및 URL-safe 문자, 선택적 패딩, MIME 공백, Data URI 접두사를 처리합니다. 형식을 정확히 검사하려면 ‘엄격한 형식 검사’를 켜세요.",
  faqTitle: "자주 묻는 질문",
  faqs: [
    {
      q: "Base64는 암호화인가요?",
      a: "아닙니다. 바이너리 데이터를 출력 가능한 문자로 바꾸는 방식이며 기밀성이나 인증 기능은 없습니다.",
    },
    {
      q: "디코딩한 결과를 읽을 수 없는 이유는 무엇인가요?",
      a: "디코딩 결과가 파일이거나 압축·암호화된 데이터일 수 있고, 다른 문자 인코딩을 사용했을 수도 있습니다. 파일로 다운로드하거나 문자 인코딩을 바꿔 보세요.",
    },
    {
      q: "입력한 내용이 서버로 전송되나요?",
      a: "아니요. 변환은 브라우저에서 이루어지며 입력값, 파일, 변환 결과는 서버에 업로드되지 않습니다.",
    },
  ],
  encodeFaqs: [
    {
      q: "Base64는 암호화인가요?",
      a: "아닙니다. 바이너리 데이터를 출력 가능한 문자로 바꾸는 방식이며 기밀성이나 인증 기능은 없습니다.",
    },
    {
      q: "표준 Base64와 Base64URL 중 무엇을 써야 하나요?",
      a: "일반 파일과 데이터에는 표준 Base64를 사용하세요. URL이나 파일 이름에 값을 안전하게 넣어야 할 때는 Base64URL을 사용하세요.",
    },
    {
      q: "입력한 내용이 서버로 전송되나요?",
      a: "아니요. 변환은 브라우저에서 이루어지며 입력값, 파일, 변환 결과는 서버에 업로드되지 않습니다.",
    },
  ],
  advertisement: "광고",
  integrationState: {
    enabled: "동의 설정에 따라 활성화되어 있습니다",
    disabled: "비활성화되어 있습니다",
  },
  legalNav: {
    about: "소개",
    privacy: "개인정보",
    cookies: "쿠키",
    terms: "이용약관",
    contact: "문의",
  },
  legal: {
    about: {
      title: "서비스 소개",
      intro:
        "PlainTool은 텍스트, 데이터, 시간, 인코딩 작업을 브라우저에서 처리하는 도구를 제공합니다.",
      sections: [
        {
          title: "제공 기능",
          body: [
            "각 도구는 계정 없이 한 가지 작업에 집중하며, 도구 입력과 결과는 브라우저 안에서 처리됩니다.",
          ],
        },
        {
          title: "문의",
          body: [
            "질문, 오류 제보, 개인정보 관련 요청은 {{email}}로 보내 주세요.",
          ],
        },
      ],
    },
    privacy: {
      title: "개인정보처리방침",
      intro:
        "도구 입력 및 결과와 사이트 운영 중 처리될 수 있는 접속·분석·광고 데이터를 구분해 설명합니다.",
      sections: [
        {
          title: "도구 입력 및 결과",
          body: [
            "텍스트, 파일, JSON, 날짜·시간 값, 디코딩한 바이트와 생성된 결과는 브라우저에서 처리됩니다. 도구에 입력한 내용과 결과는 서버로 전송되거나 저장되지 않습니다.",
          ],
        },
        {
          title: "웹사이트 제공",
          body: [
            "{{host_provider}}는 이 정적 사이트를 제공하고 보호하는 과정에서 IP 주소, 요청 시각, 브라우저 정보, 요청 URL 등의 접속 정보를 처리할 수 있습니다. 설정된 로그 보유 기간은 {{host_log_retention}}입니다. 제공자 정책: {{host_privacy_url}}.",
          ],
        },
        {
          title: "분석과 광고",
          body: [
            "Google Analytics와 Google AdSense는 현재 {{integration_state}}. 해당 기능을 도입할 경우 기기·이용·쿠키·동의·보유 기간·국외 이전에 관한 내용을 고지하고, 개인정보 설정에서 선택할 수 있도록 합니다. 도구 입력과 결과는 분석·광고 이벤트에 포함하지 않도록 설계합니다.",
          ],
        },
        {
          title: "쿠키와 자동 수집",
          body: [
            "도구는 입력 내용이나 결과를 쿠키 또는 브라우저 저장소에 저장하지 않습니다. 테마를 선택하면 라이트·다크 중 선택값만 로컬 스토리지에 저장하며 외부로 전송하지 않습니다. 선택한 호스팅 서비스의 보안 기능이 꼭 필요한 저장 기능을 사용한다면 실제 설정과 목록을 이 방침에 공개합니다. 분석·광고용 저장 기능은 해당 연동이 비활성화된 동안 차단됩니다.",
          ],
        },
        {
          title: "보유와 파기",
          body: [
            "운영자는 도구 입력이나 결과를 보유하지 않습니다. 호스팅 요청 데이터는 위 제공자 보유기간을 따릅니다. 문의 내용은 답변, 법적 의무 또는 악용 대응에 필요한 기간만 보유한 뒤 삭제하거나 익명화합니다.",
          ],
        },
        {
          title: "제3자 제공 및 국외 이전",
          body: [
            "선택한 호스팅 서비스는 자체 정책에 명시된 지역과 보호 조치에 따라 이용자의 국가 밖에서 요청 정보를 처리할 수 있습니다. 분석·광고·동의 관리 기능을 활성화하기 전에 제공받는 자, 이전 국가, 목적, 항목, 시기와 방법, 보유 기간, 법적 근거를 실제 계약에 맞춰 이 항목에 공개합니다.",
          ],
        },
        {
          title: "이용자 권리와 문의",
          body: [
            "적용되는 법률에 따라 열람·정정·삭제·처리정지·반대·이동 및 동의 철회를 {{email}}로 요청할 수 있습니다. 요청 처리 전에 합리적인 본인 확인을 요구할 수 있습니다. 대한민국 이용자는 개인정보보호위원회 등 관할 기관의 권리구제 절차도 이용할 수 있습니다.",
          ],
        },
        {
          title: "아동, 보안 및 방침 변경",
          body: [
            "이 일반 개발 도구는 아동을 대상으로 하지 않습니다. 정적 사이트와 브라우저 내 처리 구조, 제한적인 브라우저 정책으로 위험을 줄이지만 완전한 보안을 보장할 수는 없습니다. 중요한 변경 사항은 이 페이지에 날짜와 함께 알립니다. 시행일: {{date}}.",
          ],
        },
      ],
    },
    cookies: {
      title: "쿠키 정책",
      intro: "도구 입력을 처리하는 데 쿠키는 필요하지 않습니다.",
      sections: [
        {
          title: "현재 사용",
          body: [
            "분석과 광고는 현재 {{integration_state}}. 도구 입력과 결과는 쿠키나 로컬 스토리지에 저장하지 않습니다. 선택한 테마(라이트·다크)만 로컬 스토리지에 저장하며 이 값은 외부로 전송하지 않습니다.",
          ],
        },
        {
          title: "연동 기능을 도입할 경우",
          body: [
            "동의 관리 플랫폼이 필수 설정, 분석, 광고에 필요한 저장 기능을 관리합니다. 푸터의 개인정보 설정에서 동의 내용을 다시 확인하거나 철회할 수 있습니다.",
          ],
        },
      ],
    },
    terms: {
      title: "이용약관",
      intro: "이 무료 도구의 이용에는 다음 조건이 적용됩니다.",
      sections: [
        {
          title: "서비스",
          body: [
            "서비스는 현 상태로 제공되며 정확성, 가용성, 특정 목적에 대한 적합성 또는 중단 없는 운영을 보장하지 않습니다. 중요한 결과는 별도로 확인하세요.",
          ],
        },
        {
          title: "안전하고 적법한 이용",
          body: [
            "시스템 공격, 불법 행위, 제3자 권리 침해나 유해 콘텐츠 유포에 사용하지 마세요. 신뢰할 수 없는 출처에서 복원한 파일을 실행하지 마세요.",
          ],
        },
        {
          title: "책임과 제3자",
          body: [
            "관련 법률이 허용하는 범위에서 운영자는 간접 손해나 결과적 손해에 책임을 지지 않습니다. 제3자 광고와 링크는 해당 대상을 보증하거나 추천한다는 뜻이 아닙니다.",
          ],
        },
        {
          title: "지식재산과 변경",
          body: [
            "사이트 디자인과 독창적인 설명 콘텐츠는 관련 법률의 보호를 받습니다. 이용자는 자신이 처리하는 콘텐츠에 대한 책임을 집니다. 운영자는 기능을 변경하거나 종료할 수 있으며 중요한 약관 변경일을 고지합니다.",
          ],
        },
        {
          title: "준거법과 문의",
          body: [
            "이 서비스는 {{region}}에서 운영됩니다. 준거법: {{governing_law}}. 관할: {{jurisdiction}}. 강행적인 소비자 보호 규정은 그대로 적용됩니다. 문의 {{email}}. 시행일: {{date}}.",
          ],
        },
      ],
    },
    contact: {
      title: "문의",
      intro:
        "질문, 오류 제보, 개인정보 관련 요청, 악용 신고를 보낼 수 있습니다.",
      sections: [
        {
          title: "이메일",
          body: [
            "{{email}}로 문의하세요. 이메일에 민감한 텍스트, JSON, Base64 값, 비밀번호, 개인키 또는 개인 파일 등 도구 입력 내용을 포함하지 마세요.",
          ],
        },
      ],
    },
  },
};

copy.es = {
  languageName: "Español",
  metaTitle: "Decodificador y codificador Base64 — Rápido y privado",
  metaDescription:
    "Decodifica Base64 en texto o archivos y codifica texto o archivos directamente en tu navegador. Admite Base64URL, relleno ausente, URI de datos y varias codificaciones de caracteres.",
  decodeMetaTitle: "Decodificador Base64 de texto y archivos | PlainTool",
  encodeMetaTitle: "Codificador Base64 de texto y archivos | PlainTool",
  skipToContent: "Saltar al contenido",
  languageNavLabel: "Idioma",
  legalNavLabel: "Información legal y contacto",
  modeLabel: "Modo de conversión",
  heading: "Decodifica Base64 en tu navegador.",
  subheading:
    "Pega texto Base64 o abre un archivo. Detectamos Base64 estándar, Base64URL, relleno ausente y URI de datos.",
  encodeHeading: "Codifica texto o archivos en Base64 desde tu navegador.",
  encodeSubheading:
    "Escribe un texto o abre un archivo. Convierte texto UTF-8 y archivos binarios a Base64 estándar o Base64URL sin subirlos a un servidor.",
  decode: "Decodificar",
  encode: "Codificar",
  inputLabel: "Entrada en Base64",
  outputLabel: "Resultado de la decodificación",
  encodeInputLabel: "Texto o archivo para codificar",
  encodeOutputLabel: "Resultado Base64",
  decodePlaceholder: "Ejemplo: SGVsbG8sIFBsYWluVG9vbCE=",
  encodePlaceholder: "Ejemplo: Hello, PlainTool!",
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
    "unsupported-charset":
      "Este navegador no admite la codificación de caracteres seleccionada.",
    "file-too-large": "La entrada supera el límite de 100 MiB.",
  },
  repairs: {
    "data-uri-removed": "Se ha eliminado el prefijo de URI de datos",
    "whitespace-removed": "Se han eliminado los espacios",
    "url-alphabet-normalized": "Se ha detectado el formato Base64URL",
    "padding-added": "Se ha añadido el relleno ausente",
    "invalid-characters-removed": "Se han eliminado los caracteres no válidos",
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
        "PlainTool ofrece herramientas de navegador para tareas de texto, datos, tiempo y codificación.",
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
      intro: "Las herramientas no necesitan cookies para procesar la entrada.",
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
};

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}

export function interpolate(
  value: string,
  variables: Record<string, string>,
): string {
  return value.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => variables[key] ?? `{{${key}}}`,
  );
}
