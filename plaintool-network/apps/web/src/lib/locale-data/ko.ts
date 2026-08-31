import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/ko";

const bundle: LocaleBundle = {
  site: {
    brandName: "앱솔툴즈",
    languageName: "한국어",
    metaTitle: "Base64 디코딩·인코딩 — 빠른 온라인 변환기",
    metaDescription:
      "Base64 텍스트나 파일을 온라인에서 디코딩하고, 텍스트나 파일을 Base64로 인코딩하세요. Base64URL, 빠진 패딩, Data URI와 여러 문자 인코딩을 지원합니다.",
    decodeMetaTitle: "Base64 디코더 - 텍스트·파일 변환 | AbsolTools",
    encodeMetaTitle: "Base64 인코더 - 텍스트·파일 변환 | AbsolTools",
    skipToContent: "본문으로 건너뛰기",
    languageNavLabel: "언어 선택",
    legalNavLabel: "정책 및 문의",
    modeLabel: "변환 모드",
    heading: "온라인에서 바로 Base64를 디코딩하세요.",
    subheading:
      "Base64 텍스트를 붙여넣거나 파일을 여세요. 표준 Base64와 Base64URL을 자동으로 구분하고, 빠진 패딩과 Data URI도 처리합니다.",
    encodeHeading: "온라인에서 바로 Base64로 인코딩하세요.",
    encodeSubheading:
      "텍스트를 입력하거나 파일을 여세요. UTF-8 텍스트와 바이너리 파일을 표준 Base64 또는 Base64URL로 변환하며 서버에 업로드하지 않습니다.",
    decode: "디코딩",
    encode: "인코딩",
    inputLabel: "Base64 입력",
    outputLabel: "디코딩한 결과",
    encodeInputLabel: "인코딩할 텍스트 또는 파일",
    encodeOutputLabel: "Base64 결과",
    decodePlaceholder: "예: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "예: 안녕하세요, AbsolTools!",
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
      "encode-failed": "파일을 인코딩할 수 없습니다.",
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
          "AbsolTools는 텍스트, 데이터, 시간, 인코딩 작업을 위한 온라인 도구를 제공합니다.",
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
  },
  common: {
    preview: "시험판",
    ready: "준비됨",
    working: "처리 중…",
    clear: "지우기",
    copy: "복사",
    copied: "복사됨",
    copyFailed: "복사하지 못했습니다.",
    processingFailed: "처리하지 못했습니다. 다시 시도하세요.",
    download: "다운로드",
    faqTitle: "자주 묻는 질문",
    localTitle: "AbsolTools는 브라우저에서만 작동합니다.",
    localBody:
      "입력한 내용과 결과는 브라우저 안에서만 처리되며 서버로 전송되거나 저장되지 않습니다.",
  },
  preview: {
    word: {
      title: "단어·글자 수 세기",
      description:
        "텍스트를 서버에 업로드하지 않고 단어, 글자, 공백 제외 글자, 줄, 문단 수를 셉니다.",
      inputLabel: "텍스트",
      words: "단어",
      characters: "글자",
      noWhitespace: "공백 제외 글자",
      lines: "줄",
      paragraphs: "문단",
      completed: "계산 완료",
      approximate:
        "이 브라우저는 Intl.Segmenter를 지원하지 않아 단어와 글자 수가 근사값입니다.",
      tooLarge:
        "입력이 1 MB 제한을 넘었습니다. 텍스트를 줄이거나 지운 뒤 계속하세요.",
      guideTitle: "계산 기준",
      guideBody:
        "지원되는 브라우저에서는 이모지와 결합 문자를 포함해 화면에서 한 글자로 인식되는 단위로 셉니다. 공백 제외 글자 수는 원문의 글자 단위 중 공백인 단위를 빼되, 공백 양쪽의 글자를 합치지 않습니다. 줄바꿈을 기준으로 줄을 세고, 공백만 있는 줄을 포함해 화면에서 비어 보이는 줄을 기준으로 문단을 구분합니다.",
      faqs: [
        {
          q: "단어 수는 어떻게 계산하나요?",
          a: "Intl.Segmenter를 지원하는 브라우저에서는 현재 페이지 언어의 단어 경계를 적용해 단어에 해당하는 구간을 셉니다. 지원하지 않는 브라우저에서는 근사값을 표시합니다.",
        },
        {
          q: "글자 수에는 이모지도 포함되나요?",
          a: "지원되는 브라우저에서는 여러 코드 포인트로 이루어진 이모지나 결합 문자도 화면에서 한 글자로 보이면 한 글자로 셉니다.",
        },
      ],
    },
    json: {
      title: "JSON 포매터",
      description:
        "JSON을 보기 좋게 정리하고, 오류를 검사하거나 한 줄로 압축하세요.",
      inputLabel: "JSON 입력",
      outputLabel: "결과",
      placeholder: "JSON을 붙여 넣으세요…",
      outputPlaceholder: "정리하거나 압축한 JSON이 여기에 표시됩니다.",
      openFile: ".json 열기",
      tooLarge: "입력이 10 MiB 제한을 넘었습니다.",
      manualRequired:
        "입력이 커서 자동 검사를 멈췄습니다. 정리, 검사 또는 압축을 선택하세요.",
      format: "정리",
      validate: "검사",
      validateHelpLabel: "검사 도움말",
      validateHelp:
        "입력이 표준 JSON 문법(RFC 8259)에 맞는지 확인하고 오류가 있으면 위치와 원인을 알려 줍니다. 입력 내용은 정리하거나 바꾸지 않습니다.",
      minify: "압축",
      minifyHelpLabel: "압축 도움말",
      minifyHelp:
        "유효한 JSON에서 불필요한 공백과 줄바꿈만 제거해 한 줄로 만듭니다. 문자열 안의 공백과 숫자 표기, 중복 키는 그대로 유지합니다.",
      indent: "들여쓰기",
      twoSpaces: "공백 2칸",
      fourSpaces: "공백 4칸",
      tabs: "탭",
      valid: "올바른 JSON입니다.",
      invalidAt: "{line}행 {column}열: {message}",
      duplicate: "{line}행 {column}열에 중복 키가 있습니다.",
      bom: "처리 전에 UTF-8 BOM을 제거했습니다.",
      errorMessages: {
        InvalidSymbol: "올바르지 않은 기호입니다.",
        InvalidNumberFormat: "숫자 형식이 올바르지 않습니다.",
        PropertyNameExpected: "속성 이름이 필요합니다.",
        ValueExpected: "값이 필요합니다.",
        ColonExpected: "속성 이름 뒤에 콜론이 필요합니다.",
        CommaExpected: "항목 사이에 쉼표가 필요합니다.",
        CloseBraceExpected: "닫는 중괄호가 필요합니다.",
        CloseBracketExpected: "닫는 대괄호가 필요합니다.",
        EndOfFileExpected: "JSON 값 뒤에 예상하지 못한 내용이 있습니다.",
        InvalidCommentToken: "JSON에서는 주석을 사용할 수 없습니다.",
        UnexpectedEndOfComment: "주석이 끝나지 않았습니다.",
        UnexpectedEndOfString: "문자열이 끝나지 않았습니다.",
        UnexpectedEndOfNumber: "숫자가 끝나지 않았습니다.",
        InvalidUnicode: "유니코드 이스케이프가 올바르지 않습니다.",
        InvalidEscapeCharacter: "이스케이프 문자가 올바르지 않습니다.",
        InvalidCharacter: "이 위치에 사용할 수 없는 문자입니다.",
        Unknown: "올바른 JSON이 아닙니다.",
      },
      guideTitle: "JSON 검사 방식과 숫자 표기 보존",
      guideBody:
        "RFC 8259 기준으로 주석, 후행 쉼표, 작은따옴표를 오류로 표시합니다. 중복 키는 삭제하지 않고 경고하며, 큰 숫자의 표기도 그대로 유지합니다.",
      faqs: [
        {
          q: "큰 숫자의 값이 바뀌나요?",
          a: "아니요. 숫자를 다시 계산하지 않고 입력된 표기를 그대로 처리하므로 큰 숫자도 반올림되지 않습니다.",
        },
        {
          q: "중복 키를 왜 경고하나요?",
          a: "중복된 객체 키는 프로그램마다 처리 결과가 다를 수 있습니다. AbsolTools는 데이터를 임의로 삭제하지 않고 원문을 보존하면서 경고합니다.",
        },
        {
          q: "잘못된 JSON을 자동으로 고치나요?",
          a: "아니요. 주석, 후행 쉼표, 작은따옴표와 같은 잘못된 구문을 표시해 사용자가 원문을 직접 수정할 수 있게 합니다.",
        },
      ],
    },
    time: {
      title: "Unix 타임스탬프 변환기",
      description:
        "Unix 타임스탬프(초·밀리초)와 선택한 시간대의 날짜·시간을 서로 변환합니다.",
      timestampMode: "타임스탬프 → 날짜·시간",
      dateMode: "날짜·시간 → 타임스탬프",
      timestampLabel: "Unix 타임스탬프",
      dateLabel: "날짜와 시간",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "날짜·시간 선택",
      unit: "단위",
      auto: "자동 판별",
      seconds: "초",
      milliseconds: "밀리초",
      zoneMode: "시간대",
      utc: "UTC 오프셋",
      local: "브라우저 현지 시간",
      selected: "IANA 지역 시간대",
      zoneLabel: "도시·지역 또는 IANA 시간대",
      zonePlaceholder: "서울, Asia 또는 Asia/Seoul 검색",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "서울, 대한민국 — Asia/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "뉴욕, 미국 — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "로스앤젤레스, 미국 — America/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "런던, 영국 — Europe/London",
        },
        {
          value: "Europe/Paris",
          label: "파리, 프랑스 — Europe/Paris",
        },
        {
          value: "Europe/Madrid",
          label: "마드리드, 스페인 — Europe/Madrid",
        },
        {
          value: "Asia/Tokyo",
          label: "도쿄, 일본 — Asia/Tokyo",
        },
        {
          value: "Asia/Shanghai",
          label: "상하이, 중국 — Asia/Shanghai",
        },
        {
          value: "Asia/Singapore",
          label: "싱가포르 — Asia/Singapore",
        },
        {
          value: "Asia/Kolkata",
          label: "콜카타, 인도 — Asia/Kolkata",
        },
        {
          value: "Australia/Sydney",
          label: "시드니, 호주 — Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "오클랜드, 뉴질랜드 — Pacific/Auckland",
        },
      ],
      offsetLabel: "UTC와의 시차",
      disambiguation: "건너뛰거나 반복되는 현지 시각",
      reject: "오류 표시",
      earlier: "이른 결과 사용",
      later: "늦은 결과 사용",
      now: "현재 시각",
      convert: "변환",
      instant: "UTC 날짜·시간",
      zoned: "선택한 시간대의 날짜·시간",
      unixSeconds: "Unix 타임스탬프(초)",
      unixMilliseconds: "Unix 타임스탬프(밀리초)",
      converted: "변환 완료",
      invalid:
        "올바른 Unix 타임스탬프 또는 ISO 형식의 날짜·시간을 입력하고 시간대를 확인하세요.",
      ambiguousUnit:
        "11~12자리 값은 단위를 판별할 수 없습니다. 초 또는 밀리초를 직접 선택하세요.",
      nonexistentTime:
        "선택한 시간대에서 시계를 앞당겨 이 날짜·시간을 건너뜁니다. 이른 결과 또는 늦은 결과를 선택하세요.",
      repeatedTime:
        "선택한 시간대에서 시계를 뒤로 돌려 이 날짜·시간이 두 번 나타납니다. 이른 결과 또는 늦은 결과를 선택하세요.",
      y2038: "이 값은 부호 있는 32비트 Unix 시간 범위를 벗어납니다.",
      guideTitle: "단위와 시간대 처리 방식",
      guideBody:
        "자동 판별에서는 소수와 1~10자리 정수를 초로, 13자리 정수를 밀리초로 처리하고 11~12자리 값은 단위를 직접 선택하게 합니다. 날짜·시간은 직접 입력하거나 선택할 수 있고 초와 소수초는 생략할 수 있습니다. 기본값은 브라우저의 현지 시간대입니다. 타임스탬프를 변환할 때 시간대는 표시되는 날짜·시간만 바꾸고, 현지 날짜·시간을 변환할 때는 어느 Unix 시점인지를 결정합니다.",
      faqs: [
        {
          q: "단위는 어떻게 자동으로 판별하나요?",
          a: "소수와 1~10자리 정수는 초로, 13자리 정수는 밀리초로 처리합니다. 11~12자리 값은 초 또는 밀리초를 직접 선택해야 합니다.",
        },
        {
          q: "날짜와 시간은 어떤 형식으로 입력하나요?",
          a: "UTC 오프셋 없이 2026-08-29T14:30과 같은 ISO 형식의 현지 날짜·시간을 입력하세요. 초와 최대 9자리 소수초는 생략할 수 있고 선택기도 사용할 수 있습니다.",
        },
        {
          q: "시간대 선택지는 어떻게 다른가요?",
          a: "기본값인 브라우저 현지 시간은 기기에 설정된 시간대 규칙을 따릅니다. +00:00이나 +09:00처럼 고정된 시차가 필요하면 UTC 오프셋을 선택하세요. America/New_York 같은 IANA 시간대는 서머타임(DST)을 포함한 해당 지역의 시계 변경 규칙을 적용합니다.",
        },
        {
          q: "서머타임(DST)이 Unix 타임스탬프를 모호하게 만드나요?",
          a: "아니요. Unix 타임스탬프는 하나의 시점을 가리킵니다. 시계를 바꾸는 지역의 현지 날짜·시간을 변환할 때만 일부 시각이 건너뛰어지거나 두 번 나타납니다. 이 도구는 기본적으로 오류를 표시하며, 필요할 때만 이른 결과 또는 늦은 결과를 선택하면 됩니다.",
        },
      ],
    },
    textCompare: {
      title: "텍스트 비교",
      description:
        "두 텍스트를 업로드하지 않고 줄 단위로 비교해 추가, 삭제, 변경된 부분을 표시합니다.",
      originalLabel: "원본 텍스트",
      changedLabel: "변경한 텍스트",
      originalPlaceholder: "원본 텍스트를 붙여 넣으세요…",
      changedPlaceholder: "변경한 텍스트를 붙여 넣으세요…",
      compare: "비교",
      swap: "서로 바꾸기",
      results: "비교 결과",
      empty: "비교할 텍스트를 한쪽 이상 입력하세요.",
      tooLarge: "각 텍스트는 1 MiB 이하여야 합니다.",
      tooManyLines: "두 텍스트는 합쳐서 최대 20,000줄까지 비교할 수 있습니다.",
      tooComplex:
        "안전하게 처리하기에는 비교가 너무 복잡합니다. 텍스트를 줄여 보세요.",
      stale: "아래 결과는 이전 비교 내용입니다. 다시 비교해 결과를 갱신하세요.",
      complete: "비교 완료",
      identical: "두 텍스트가 같습니다.",
      approximate:
        "이 브라우저는 Intl.Segmenter를 지원하지 않아 글자 단위 강조가 근사값입니다.",
      inlineLimited:
        "반응 속도를 유지하기 위해 일부 긴 줄은 줄 전체가 변경된 것으로 표시됩니다.",
      additions: "추가된 줄: {count}",
      deletions: "삭제된 줄: {count}",
      changes: "변경된 행: {count}",
      previousChange: "이전 변경",
      nextChange: "다음 변경",
      expandUnchanged: "변경 없는 줄 {count}개 보기",
      whitespaceChange: "공백 변경",
      lineEndingChange: "줄바꿈 형식 변경",
      unchangedRow: "변경 없는 줄",
      addedRow: "추가된 줄",
      removedRow: "삭제된 줄",
      changedRow: "변경된 줄",
      originalLine: "원본 {line}번째 줄",
      changedLine: "변경본 {line}번째 줄",
      guideTitle: "비교 방식",
      guideBody:
        "먼저 줄을 맞춘 뒤 짝지어진 변경 줄 안에서 글자 단위 차이를 강조합니다. 공백만 바뀌었거나 줄바꿈 형식만 다른 경우도 따로 표시합니다. 긴 미변경 구간은 펼치기 전까지 접어 둡니다.",
      faqs: [
        {
          q: "입력한 텍스트가 서버로 전송되나요?",
          a: "아니요. 두 텍스트는 브라우저 안에서만 비교되며 서버로 전송되지 않습니다.",
        },
        {
          q: "줄바꿈 형식 차이도 찾나요?",
          a: "네. 화면에 보이는 글자가 같아도 CRLF, LF, CR 줄바꿈이 다르면 변경으로 표시합니다.",
        },
      ],
    },
    caseConverter: {
      title: "대소문자 변환기",
      description:
        "텍스트를 업로드하지 않고 대문자, 소문자, 문장형, 단어 첫 글자 대문자로 변환합니다.",
      inputLabel: "텍스트",
      outputLabel: "변환 결과",
      placeholder: "텍스트를 입력하거나 붙여 넣으세요…",
      outputPlaceholder: "변환한 텍스트가 여기에 표시됩니다.",
      modeLabel: "변환 방식",
      upper: "대문자",
      lower: "소문자",
      sentence: "문장형",
      capitalizeWords: "단어 첫 글자",
      converted: "변환 완료",
      noChange: "이미 선택한 방식과 같은 텍스트입니다.",
      outdated: "표시된 결과는 이전 입력을 변환한 내용입니다.",
      tooLarge: "입력이 1 MB 제한을 넘었습니다.",
      guideTitle: "변환 방식 안내",
      guideBody:
        "대문자와 소문자는 Unicode 기본 대소문자 매핑을 사용합니다. 문장형은 전체를 소문자로 바꾼 뒤 처음, 줄바꿈 뒤, 또는 . ! ? 。 ！ ？ 뒤에서 처음 나타나는 대소문자 구분 글자를 대문자로 바꿉니다. 단어 첫 글자는 공백, 문장부호, 줄바꿈, 아포스트로피, 하이픈, 밑줄을 유지하면서 각 단어에서 처음 나타나는 대소문자 구분 글자를 대문자로 바꿉니다.",
      faqs: [
        {
          q: "단어 첫 글자 변환은 제목 표기법과 같나요?",
          a: "아니요. 모든 단어를 기계적으로 변환하며 언어별 조사·전치사, 이름, 약어 같은 제목 표기 규칙은 적용하지 않습니다.",
        },
        {
          q: "공백과 줄바꿈도 그대로 유지되나요?",
          a: "네. 글자의 대소문자만 바꾸며 원래 공백, 문장부호, 줄바꿈은 유지합니다.",
        },
      ],
    },
  },
  examples: {
    wordInput: "예: AbsolTools는 온라인에서 단어와 글자 수를 셉니다.",
    jsonInput: '예: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "예: 1704067200(초) 또는 1704067200000(밀리초)",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "예시 형식: 2024-01-01T00:00. 초는 생략할 수 있고 날짜 선택도 사용할 수 있습니다.",
    timeResult: "변환 결과",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 디코더",
      summary: "Base64 텍스트나 파일을 온라인에서 바로 디코딩합니다.",
      searchTerms: [
        "디코딩",
        "디코더",
        "Base64URL",
        "Data URI",
        "텍스트",
        "파일",
        "바이너리",
      ],
    },
    "base64-encode": {
      name: "Base64 인코더",
      summary: "텍스트나 파일을 온라인에서 Base64로 인코딩합니다.",
      searchTerms: [
        "인코딩",
        "인코더",
        "Base64URL",
        "Data URI",
        "텍스트",
        "파일",
        "바이너리",
      ],
    },
    "word-counter": {
      name: "단어·글자 수 세기",
      summary: "단어, 글자, 줄, 문단 수를 온라인에서 셉니다.",
      searchTerms: [
        "단어 수",
        "글자 수",
        "공백 제외",
        "줄 수",
        "문단 수",
        "텍스트",
      ],
    },
    "json-formatter": {
      name: "JSON 포매터",
      summary: "JSON 오류를 검사하고 정리·압축합니다.",
      searchTerms: [
        "JSON 정리",
        "JSON 검사",
        "JSON 압축",
        "JSON 포맷",
        "데이터",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix 타임스탬프 변환기",
      summary: "Unix 타임스탬프(초·밀리초)와 날짜·시간을 서로 변환합니다.",
      searchTerms: [
        "Unix 시간",
        "에포크",
        "에포크 시간",
        "초",
        "밀리초",
        "날짜",
        "시간",
      ],
    },
    "text-compare": {
      name: "텍스트 비교",
      summary: "두 텍스트를 줄 단위로 비교해 다른 부분을 표시합니다.",
      searchTerms: ["텍스트 비교", "문자열 비교", "차이", "줄 비교", "diff"],
    },
    "case-converter": {
      name: "대소문자 변환기",
      summary: "텍스트의 대소문자 형식을 변환합니다.",
      searchTerms: ["대문자", "소문자", "문장형", "단어 첫 글자", "텍스트"],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "전체 도구",
    directoryMetaTitle: "AbsolTools | 필요한 순간, 바로 쓰는 도구",
    directoryMetaDescription:
      "변환·정리·비교·인코딩처럼 자주 필요한 작업을 브라우저에서 처리하세요. 도구의 입력값과 결과는 서버로 업로드되지 않습니다.",
    directoryTitle: "자주 쓰이는 도구들을 더 편리하게",
    directoryIntro:
      "즐겨찾기에 사이트를 추가하면 다음에 바로 접속하실 수 있어요.",
    toolPromise:
      "AbsolTools는 자주 쓰는 온라인 도구를 더 정확하고 편리하게 만듭니다. 모든 작업은 브라우저 안에서만 이루어져 별도로 저장하거나 서버에 전송하지 않습니다. 즐겨찾기에 추가해 필요할 때 바로 사용하세요.",
    directorySearchLabel: "도구 검색",
    directorySearchPlaceholder: "이름, 설명 또는 키워드로 검색",
    directorySearchClear: "검색어 지우기",
    directorySearchNoResults: "검색어와 일치하는 도구가 없습니다.",
    directorySearchCount: "일치하는 도구: {count}개",
    available: "사용 가능",
    research: "시험판",
    reserve: "검토 중",
    breadcrumbLabel: "현재 위치",
    encodingCategory: "인코딩/디코딩",
    categories: {
      encoding: "인코딩/디코딩",
      generator: "생성기",
      text: "텍스트",
      converter: "변환기",
      image: "이미지",
      data: "데이터",
      time: "시간",
    },
    footerNote: "많이 사용되는 기능을 보다 편하게",
    catalogAria: "도구 디렉터리",
    useLightTheme: "라이트 테마 사용",
    useDarkTheme: "다크 테마 사용",
    relatedTools: "다른 도구 바로가기",
  },
};

export default bundle;
