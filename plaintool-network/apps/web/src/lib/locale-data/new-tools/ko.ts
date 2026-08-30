import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";

const seed = {
  formatterSubnet: formatterSubnetFor("ko"),
  ui: {
    clear: "지우기",
    copy: "복사",
    download: "다운로드",
    openFile: "파일 열기",
    chooseImage: "이미지 선택",
    dropFile: "이미지를 여기에 놓으세요.",
    ready: "준비됨",
    working: "처리 중…",
    complete: "처리 완료",
    unchanged: "바꿀 내용 없음",
    outdated: "결과가 현재 입력과 다릅니다",
    copied: "복사됨",
    copyFailed: "복사하지 못했습니다",
    tooLarge: "안전하게 처리하기에는 입력이 너무 큽니다.",
    failed: "처리하지 못했습니다. 입력을 확인한 뒤 다시 시도하세요.",
    resultHere: "결과가 여기에 표시됩니다.",
    localTitle: "이 브라우저에서만 처리됩니다",
    localBody:
      "입력과 결과를 서버로 전송하거나 저장하지 않습니다. 현재 브라우저 탭 안에서만 처리됩니다.",
    guideTitle: "{name} 사용 방법",
    safetyTitle: "서버 전송 없는 로컬 처리",
    faqWhat: "{name}의 기능은 무엇인가요?",
    faqPrivacy: "입력한 데이터가 서버로 전송되나요?",
    faqCheck: "{name} 사용 시 무엇을 확인해야 하나요?",
  },
  ai: {
    input: "원본 텍스트",
    output: "정제된 텍스트",
    placeholder: "숨은 유니코드 문자가 섞였을 수 있는 텍스트를 붙여넣으세요.",
    run: "숨은 문자 정리",
    report: "제거 내역",
    removed: "제거한 문자",
    normalized: "일반 공백으로 바꾼 문자",
    noChanges: "기본 제거 대상인 숨은 문자를 찾지 못했습니다.",
    count: "{count}개 제거",
    advanced: "고급 옵션",
    advancedWarning:
      "아래 옵션은 철자, 이모지 또는 문자 결합 모양을 바꿀 수 있습니다. 원문 구조를 이해할 때만 사용하세요.",
    joinControls: "ZWJ·ZWNJ 제거",
    joinWarning:
      "이모지 조합과 아랍어·페르시아어·인도계 문자의 연결 모양이 깨질 수 있습니다.",
    variationSelectors: "모양 선택자 제거",
    variationWarning:
      "이모지 또는 CJK 글리프의 표시 모양이 달라질 수 있습니다.",
    combiningMarks: "결합 문자 제거",
    combiningWarning:
      "악센트, 모음 부호 등 의미 있는 기호가 사라질 수 있습니다.",
    noBreakSpaces: "줄바꿈 방지 공백 정규화",
    noBreakNote: "NBSP 계열 문자를 일반 공백으로 바꿉니다.",
    kinds: [
      "폭 없는 공백",
      "단어 연결 문자",
      "바이트 순서 표시",
      "소프트 하이픈",
      "양방향 제어 문자",
      "보이지 않는 구분자",
      "문자 연결 제어",
      "모양 선택자",
      "결합 문자",
      "줄바꿈 방지·숫자폭 공백",
      "좁은 줄바꿈 방지 공백",
    ],
  },
  url: {
    mode: "URL 변환 방식",
    encode: "인코드",
    decode: "디코드",
    encodeInput: "인코드할 텍스트 또는 URL",
    decodeInput: "인코딩된 URL 값",
    encodeOutput: "인코드 결과",
    decodeOutput: "디코드 결과",
    encodePlaceholder: "예: https://example.com/search?q=hello world",
    decodePlaceholder: "예: hello%20world%3Fpage%3D1",
    scope: "인코딩 범위",
    component: "URL 구성 요소",
    uri: "전체 URI",
    formSpace: "폼 데이터의 공백을 +로 표시",
    recursive: "반복 디코드",
    passLimit: "최대 반복 횟수",
    encoded: "URL 인코드 완료",
    decoded: "URL 디코드 완료",
    passCount: "{count}회 디코드",
    limitReached: "설정한 횟수 뒤에도 인코딩된 단계가 남아 있습니다.",
    errors: [
      "먼저 값을 입력하세요.",
      "퍼센트 이스케이프가 불완전하거나 잘못되었습니다.",
      "디코드된 바이트가 올바른 UTF-8이 아닙니다.",
      "반복 횟수는 1~10 사이에서 선택하세요.",
    ],
  },
  hash: {
    input: "텍스트 또는 파일",
    placeholder:
      "SHA-256, SHA-512, SHA-1, MD5 해시를 계산할 텍스트를 입력하세요.",
    results: "해시 값",
    resultLabel: "{algorithm} 해시 값",
    copyLabel: "{algorithm} 해시 복사",
    fileSelected: "선택한 파일: {name} ({size})",
    drop: "해시를 계산할 파일을 여기에 놓으세요.",
    textTooLarge: "현재 브라우저에서 처리하기에는 텍스트가 너무 큽니다.",
    fileTooLarge: "파일이 로컬 처리 안전 한도를 넘었습니다.",
    legacyWarning:
      "MD5와 SHA-1은 호환성 확인용입니다. 비밀번호 저장이나 새 보안 설계에는 사용하지 마세요.",
    expectedChecksum: "예상 체크섬",
    checksumMatch: "일치",
    checksumMismatch: "불일치",
    checksumInvalid: "지원되는 16진수 체크섬을 입력하세요.",
    empty: "먼저 텍스트를 입력하거나 파일을 선택하세요.",
    unavailable: "이 브라우저에서는 요청한 해시 중 하나를 계산할 수 없습니다.",
  },
  jwt: {
    input: "JWT 토큰",
    placeholder: "점으로 구분된 JWT를 붙여넣으세요: header.payload.signature",
    header: "헤더",
    payload: "페이로드",
    signature: "서명",
    copyHeader: "디코드한 JWT 헤더 복사",
    copyPayload: "디코드한 JWT 페이로드 복사",
    copySignature: "JWT 서명 바이트 복사",
    signatureBytes: "{count}바이트",
    timestamps: "시간 클레임",
    expires: "만료 시각(exp)",
    notBefore: "사용 시작 시각(nbf)",
    issuedAt: "발급 시각(iat)",
    invalidTimestamp: "숫자로 된 올바른 타임스탬프가 아닙니다.",
    noTimestamps: "exp, nbf, iat 클레임이 없습니다.",
    noVerifyTitle: "서명은 검증하지 않습니다",
    noVerifyBody:
      "디코드는 토큰 내용을 보여줄 뿐입니다. 발급자나 서명의 유효성을 증명하지 않습니다.",
    errors: [
      "먼저 JWT를 붙여넣으세요.",
      "JWT는 점으로 구분된 세 부분이어야 합니다.",
      "JWT 헤더가 비어 있습니다.",
      "JWT 페이로드가 비어 있습니다.",
      "올바른 Base64URL이 아닌 부분이 있습니다.",
      "올바른 UTF-8이 아닌 부분이 있습니다.",
      "헤더가 올바른 JSON이 아닙니다.",
      "페이로드가 올바른 JSON이 아닙니다.",
      "헤더는 JSON 객체여야 합니다.",
      "페이로드는 JSON 객체여야 합니다.",
    ],
  },
  qr: {
    input: "텍스트 또는 URL",
    placeholder: "QR 코드에 넣을 텍스트나 URL을 입력하세요.",
    preview: "QR 코드 미리보기",
    previewEmpty: "내용을 입력하면 QR 코드가 생성됩니다.",
    options: "QR 코드 옵션",
    correction: "오류 복원 수준",
    correctionLevels: ["낮음(L)", "중간(M)", "높은 편(Q)", "높음(H)"],
    quietZone: "여백",
    quietZones: ["없음", "2모듈", "4모듈(권장)", "8모듈"],
    generate: "QR 코드 생성",
    png: "PNG 다운로드",
    svg: "SVG 다운로드",
    empty: "먼저 텍스트나 URL을 입력하세요.",
    tooLong: "현재 오류 복원 수준에 비해 내용이 너무 깁니다.",
    generationFailed: "QR 코드를 생성하지 못했습니다.",
    downloadFailed: "다운로드할 이미지를 준비하지 못했습니다.",
    upload: "QR 코드 이미지",
    formats: "PNG, JPEG, WebP, GIF, BMP · 최대 10MB",
    camera: "카메라 스캐너",
    cameraHint:
      "카메라 권한을 허용하면 계속 스캔합니다. 읽은 URL은 자동으로 열지 않습니다.",
    startCamera: "카메라 시작",
    stopCamera: "카메라 중지",
    scanResult: "읽은 내용",
    scanPlaceholder: "스캔한 텍스트가 여기에 표시됩니다.",
    urlDetected: "URL 감지됨",
    reading: "이미지 읽는 중…",
    starting: "카메라 시작 중…",
    scanning: "QR 코드 찾는 중…",
    invalidImage: "지원되는 올바른 이미지를 선택하세요.",
    noCode: "이미지에서 읽을 수 있는 QR 코드를 찾지 못했습니다.",
    unsupported: "이 브라우저는 카메라 스캔을 지원하지 않습니다.",
    denied: "카메라 권한이 거부되었습니다.",
    unavailable: "사용할 수 있는 카메라가 없습니다.",
    scanFailed: "QR 코드를 스캔하지 못했습니다.",
  },
  data: {
    convert: "변환",
    inputPlaceholder: "원본 데이터를 붙여넣으세요.",
    outputPlaceholder: "변환 결과가 여기에 표시됩니다.",
    drop: "지원되는 텍스트 파일을 여기에 놓으세요.",
    readFailed: "파일을 읽지 못했습니다.",
    errorAt: "{message} {line}행 {column}열.",
    delimiter: "CSV 구분자",
    auto: "자동 감지",
    comma: "쉼표(,)",
    semicolon: "세미콜론(;)",
    tab: "탭",
    pipe: "파이프(|)",
    firstHeader: "첫 행을 헤더로 사용",
    pretty: "JSON 들여쓰기 적용",
    errors: [
      "CSV에 닫히지 않은 따옴표 또는 잘못된 필드가 있습니다.",
      "구분선이 있는 Markdown 표를 찾지 못했습니다.",
      "Markdown 표 형식이 올바르지 않습니다.",
      "올바른 JSON이 아닙니다.",
      "JSON은 객체 배열이어야 합니다.",
      "비어 있는 CSV 헤더가 있습니다.",
      "CSV 헤더 이름은 중복될 수 없습니다.",
    ],
  },
  pages: {
    "ai-watermark-remover": {
      title: "AI 워터마크 제거기 - GPT·Claude·Gemini 숨은 문자 정리",
      description:
        "GPT·Claude·Gemini 텍스트에 섞인 실제 숨은 유니코드 문자를 찾아 제거합니다. AI 작성 여부를 판별하는 기능은 아닙니다.",
      guide:
        "원문을 붙여넣고 정제된 텍스트를 먼저 확인한 뒤, 제거한 문자 이름·개수·U+ 코드 포인트를 검토하세요. 문자 모양을 바꿀 수 있는 고급 옵션은 기본으로 꺼져 있습니다.",
      terms: [
        "AI 워터마크 제거기",
        "GPT 작성 확인기",
        "클로드 숨은 문자",
        "Gemini 숨은 문자",
        "제로폭 공백 제거",
        "AI 텍스트 정리",
      ],
    },
    "url-encode": {
      title: "URL 인코더",
      description:
        "텍스트, 쿼리 값 또는 전체 URI를 브라우저 표준에 맞게 퍼센트 인코딩합니다.",
      guide:
        "쿼리 값 하나는 URL 구성 요소를, 구분자를 보존할 전체 주소는 전체 URI를 선택하세요. + 공백은 폼 데이터일 때만 사용하세요.",
      terms: [
        "URL 인코드",
        "퍼센트 인코딩",
        "encodeURIComponent",
        "쿼리 문자열",
      ],
    },
    "url-decode": {
      title: "URL 디코더",
      description:
        "퍼센트 인코딩된 URL과 쿼리 값을 풀고, 필요하면 제한된 횟수만 반복 디코드합니다.",
      guide:
        "인코딩된 값을 붙여넣고 범위를 선택하세요. 중첩 인코딩임을 아는 데이터에만 반복 디코드를 사용하세요.",
      terms: [
        "URL 디코드",
        "퍼센트 디코딩",
        "decodeURIComponent",
        "쿼리 문자열",
      ],
    },
    "hash-generator": {
      title: "해시 생성기",
      description:
        "텍스트나 파일의 SHA-256, SHA-512, SHA-1, MD5 체크섬을 브라우저에서 계산합니다.",
      guide:
        "텍스트를 입력하거나 파일을 선택한 뒤 필요한 알고리즘의 값을 정확히 비교하세요. 해시는 동일성 확인용이며 암호화나 안전한 비밀번호 저장 방식 자체가 아닙니다.",
      terms: ["SHA-256", "SHA-512", "MD5", "체크섬", "파일 해시"],
    },
    "jwt-decoder": {
      title: "JWT 디코더",
      description:
        "JWT 헤더·페이로드·서명 바이트·시간 클레임을 서버 전송 없이 디코드합니다.",
      guide:
        "JSON과 시간 값을 확인하되, 서명과 클레임 검증은 서명 키를 관리하는 시스템에서 수행하세요. 디코드만으로 토큰을 신뢰할 수는 없습니다.",
      terms: ["JWT 디코더", "JSON Web Token", "JWT 페이로드", "JWT 헤더"],
    },
    "qr-code-generator": {
      title: "QR 코드 생성기",
      description:
        "텍스트나 URL로 표준 정적 QR 코드를 만들고 PNG 또는 SVG로 내려받습니다.",
      guide:
        "정확한 내용을 입력하고 안정적인 인식을 위해 4모듈 여백을 유지하세요. 코드 일부가 가려질 수 있다면 오류 복원 수준을 높이세요.",
      terms: ["QR 코드 생성기", "QR PNG", "QR SVG", "정적 QR"],
    },
    "qr-code-scanner": {
      title: "QR 코드 스캐너",
      description:
        "이미지 또는 카메라의 QR 코드를 브라우저에서 읽으며, 감지한 링크를 자동으로 열지 않습니다.",
      guide:
        "QR 전체 여백이 보이는 선명한 이미지를 사용하세요. URL의 안전성을 직접 확인한 뒤 필요한 경우에만 복사해 여세요.",
      terms: [
        "QR 코드 스캐너",
        "QR 이미지 인식",
        "카메라 QR 리더",
        "QR 디코드",
      ],
    },
    "csv-to-markdown": {
      title: "CSV to Markdown 변환기",
      description:
        "CSV 행을 구분자 자동 감지와 셀 이스케이프가 적용된 Markdown 표로 바꿉니다.",
      guide:
        "구분자와 첫 행의 헤더 사용 여부를 확인하세요. 여러 줄 셀은 표 안의 줄바꿈으로 바뀌고 파이프 문자는 이스케이프됩니다.",
      inputLabel: "CSV 입력",
      outputLabel: "Markdown 표",
      inputPlaceholder: "이름,점수\n민지,92",
      terms: ["CSV to Markdown", "마크다운 표", "CSV 변환"],
    },
    "markdown-to-csv": {
      title: "Markdown to CSV 변환기",
      description:
        "Markdown 표를 스프레드시트와 데이터 도구에서 쓰기 좋은 CSV로 바꿉니다.",
      guide:
        "Markdown 표에 헤더와 구분선 행을 포함하고, 대상 프로그램이 요구하는 CSV 구분자를 선택하세요.",
      inputLabel: "Markdown 표",
      outputLabel: "CSV 결과",
      inputPlaceholder: "| 이름 | 점수 |\n| --- | --- |\n| 민지 | 92 |",
      terms: ["Markdown to CSV", "표 CSV 변환", "마크다운 변환"],
    },
    "json-to-csv": {
      title: "JSON to CSV 변환기",
      description:
        "JSON 객체 배열의 키를 모아 일정한 열을 가진 CSV로 변환합니다.",
      guide:
        "최상위 값은 객체 배열이어야 합니다. 중첩 값은 짧은 JSON 문자열로 보존되므로 스프레드시트에서 다룰 방식을 확인하세요.",
      inputLabel: "JSON 배열",
      outputLabel: "CSV 결과",
      inputPlaceholder: '[{"이름":"민지","점수":92}]',
      terms: ["JSON to CSV", "JSON 배열 CSV", "데이터 변환"],
    },
    "csv-to-json": {
      title: "CSV to JSON 변환기",
      description:
        "CSV 첫 행을 필드 이름으로 사용해 JSON 객체 배열로 변환합니다.",
      guide:
        "모든 헤더 이름은 비어 있지 않고 서로 달라야 합니다. 쉼표·따옴표·여러 줄 셀이 있다면 구분자 감지 결과를 먼저 확인하세요.",
      inputLabel: "CSV 입력",
      outputLabel: "JSON 배열",
      inputPlaceholder: "이름,점수\n민지,92",
      terms: ["CSV to JSON", "CSV 파서", "JSON 배열"],
    },
    "html-to-markdown": {
      title: "HTML to Markdown 변환기",
      description:
        "제목, 링크, 목록, 코드, 표가 포함된 HTML 구조를 읽기 쉬운 Markdown으로 바꿉니다.",
      guide:
        "변환할 HTML 조각을 붙여넣으세요. Markdown으로 모두 표현할 수 없는 복잡한 레이아웃과 삽입 콘텐츠는 결과를 직접 확인해야 합니다.",
      inputLabel: "HTML 입력",
      outputLabel: "Markdown 결과",
      inputPlaceholder: "<h1>제목</h1><p><strong>내용</strong>입니다.</p>",
      terms: ["HTML to Markdown", "HTML 변환", "마크다운 변환"],
    },
    "markdown-to-html": {
      title: "Markdown to HTML 변환기",
      description:
        "GFM 표, 목록, 링크, 코드 블록을 포함한 Markdown을 HTML로 렌더링합니다.",
      guide:
        "사용할 Markdown만 변환하고, 신뢰할 수 없는 결과를 웹페이지에 삽입하기 전에는 HTML을 별도로 정화하세요.",
      inputLabel: "Markdown 입력",
      outputLabel: "HTML 결과",
      inputPlaceholder: "# 제목\n\n**내용**입니다.",
      terms: ["Markdown to HTML", "마크다운 렌더러", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
