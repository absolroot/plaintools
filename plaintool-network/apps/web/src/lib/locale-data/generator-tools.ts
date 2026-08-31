import type { BarcodeGeneratorCopy } from "../../features/barcode-generator/contract";
import type { PasswordGeneratorCopy } from "../../features/password-generator/contract";
import type { Locale } from "../site";
import type { LocaleCatalogToolCopy } from "../tool-catalog";

export type GeneratorToolId = "barcode-generator" | "password-generator";

type GeneratorPage<T> = {
  title: string;
  description: string;
  mobileDescription: string;
  guideTitle: string;
  guideBody: string;
  safetyTitle: string;
  safetyBody: string;
  faqs: Array<{ q: string; a: string }>;
  feature: T;
};

export type GeneratorToolLocale = {
  catalog: Record<GeneratorToolId, LocaleCatalogToolCopy>;
  tools: {
    "barcode-generator": GeneratorPage<BarcodeGeneratorCopy>;
    "password-generator": GeneratorPage<PasswordGeneratorCopy>;
  };
};

type PageSeed = {
  name: string;
  summary: string;
  terms: readonly string[];
  description: string;
  mobileDescription: string;
  guideTitle: string;
  guideBody: string;
  safetyTitle: string;
  safetyBody: string;
  faqs: [
    { q: string; a: string },
    { q: string; a: string },
    { q: string; a: string },
  ];
};

type BarcodeLabels = {
  format: string;
  value: string;
  formatHints: [string, string, string, string, string, string];
  clear: string;
  preview: string;
  previewPlaceholder: string;
  appearance: string;
  width: string;
  height: string;
  margin: string;
  showText: string;
  foreground: string;
  background: string;
  downloadPng: string;
  downloadSvg: string;
  ready: string;
  generated: string;
  checkDigitAdded: string;
  errors: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
};

type PasswordLabels = {
  result: string;
  placeholder: string;
  copy: string;
  regenerate: string;
  options: string;
  length: string;
  characterTypes: string;
  lowercase: string;
  uppercase: string;
  digits: string;
  symbols: string;
  excludeAmbiguous: string;
  excludeAmbiguousHint: string;
  strength: string;
  levels: [string, string, string, string];
  hints: [string, string, string, string];
  entropyEstimate: string;
  entropyHint: string;
  generated: string;
  errors: [string, string, string, string];
};

type LocaleSeed = {
  barcode: PageSeed & { labels: BarcodeLabels };
  password: PageSeed & { labels: PasswordLabels };
};

const define = (seed: LocaleSeed): LocaleSeed => seed;

type CompactPage = [
  string,
  string,
  readonly string[],
  string,
  string,
  string,
  string,
  string,
  string,
  PageSeed["faqs"],
];

function compact(input: {
  b: { p: CompactPage; l: BarcodeLabels };
  w: { p: CompactPage; l: PasswordLabels };
}): LocaleSeed {
  const expand = <T extends BarcodeLabels | PasswordLabels>(source: {
    p: CompactPage;
    l: T;
  }): PageSeed & { labels: T } => ({
    name: source.p[0],
    summary: source.p[1],
    terms: source.p[2],
    description: source.p[3],
    mobileDescription: source.p[4],
    guideTitle: source.p[5],
    guideBody: source.p[6],
    safetyTitle: source.p[7],
    safetyBody: source.p[8],
    faqs: source.p[9],
    labels: source.l,
  });
  return { barcode: expand(input.b), password: expand(input.w) };
}

type QuickLabels = {
  b: [string, string, string, string, string, string, string, string, string];
  be: BarcodeLabels["errors"];
  w: [string, string, string, string, string, string, string, string, string];
  wl: PasswordLabels["levels"];
  wh: PasswordLabels["hints"];
  we: PasswordLabels["errors"];
  entropy: [string, string];
};

function quick(input: {
  b: PageSeed;
  w: PageSeed;
  labels: QuickLabels;
}): LocaleSeed {
  const b = input.labels.b;
  const w = input.labels.w;
  return {
    barcode: {
      ...input.b,
      labels: {
        format: b[0],
        value: b[1],
        formatHints: [
          input.b.summary,
          input.b.summary,
          input.b.summary,
          input.b.summary,
          input.b.summary,
          input.b.summary,
        ],
        clear: b[2],
        preview: b[3],
        previewPlaceholder: input.b.mobileDescription,
        appearance: b[4],
        width: b[5],
        height: b[6],
        margin: b[7],
        showText: b[8],
        foreground: b[5],
        background: b[4],
        downloadPng: "PNG",
        downloadSvg: "SVG",
        ready: input.b.mobileDescription,
        generated: input.b.summary,
        checkDigitAdded: input.b.faqs[0].a,
        errors: input.labels.be,
      },
    },
    password: {
      ...input.w,
      labels: {
        result: w[0],
        placeholder: input.w.mobileDescription,
        copy: w[1],
        regenerate: w[2],
        options: w[3],
        length: w[4],
        characterTypes: w[5],
        lowercase: "a–z",
        uppercase: "A–Z",
        digits: "0–9",
        symbols: w[6],
        excludeAmbiguous: w[7],
        excludeAmbiguousHint: "I, l, 1, O, 0, |",
        strength: w[8],
        levels: input.labels.wl,
        hints: input.labels.wh,
        entropyEstimate: input.labels.entropy[0],
        entropyHint: input.labels.entropy[1],
        generated: input.w.summary,
        errors: input.labels.we,
      },
    },
  };
}

function buildBarcode(seed: LocaleSeed["barcode"]): BarcodeGeneratorCopy {
  const labels = seed.labels;
  return {
    ariaLabel: seed.name,
    formatLabel: labels.format,
    valueLabel: labels.value,
    formatOptions: {
      code128: {
        label: "Code 128",
        hint: labels.formatHints[0],
        example: "ORDER-2026-001",
      },
      ean13: {
        label: "EAN-13",
        hint: labels.formatHints[1],
        example: "590123412345",
      },
      upca: {
        label: "UPC-A",
        hint: labels.formatHints[2],
        example: "03600029145",
      },
      code39: {
        label: "Code 39",
        hint: labels.formatHints[3],
        example: "PART-123",
      },
      ean8: {
        label: "EAN-8",
        hint: labels.formatHints[4],
        example: "5512345",
      },
      itf14: {
        label: "ITF-14",
        hint: labels.formatHints[5],
        example: "1001234500001",
      },
    },
    clear: labels.clear,
    previewLabel: labels.preview,
    previewPlaceholder: labels.previewPlaceholder,
    appearanceTitle: labels.appearance,
    moduleWidthLabel: labels.width,
    moduleWidthOptions: {
      "1": "1 px",
      "2": "2 px",
      "3": "3 px",
      "4": "4 px",
    },
    heightLabel: labels.height,
    heightOptions: {
      "40": "40 px",
      "80": "80 px",
      "120": "120 px",
      "160": "160 px",
    },
    marginLabel: labels.margin,
    marginOptions: {
      "0": "0 px",
      "10": "10 px",
      "20": "20 px",
      "30": "30 px",
    },
    showText: labels.showText,
    foreground: labels.foreground,
    background: labels.background,
    downloadPng: labels.downloadPng,
    downloadSvg: labels.downloadSvg,
    ready: labels.ready,
    generated: labels.generated,
    checkDigitAdded: labels.checkDigitAdded,
    previewAriaTemplate: "{format}: {value}",
    errors: {
      digitsOnly: labels.errors[0],
      invalidCharacter: labels.errors[1],
      wrongLength: labels.errors[2],
      invalidCheckDigit: labels.errors[3],
      tooLong: labels.errors[4],
      invalidOption: labels.errors[5],
      invalidColor: labels.errors[6],
      lowContrast: labels.errors[7],
      generationFailed: labels.errors[8],
      downloadFailed: labels.errors[9],
    },
  };
}

function buildPassword(seed: LocaleSeed["password"]): PasswordGeneratorCopy {
  const labels = seed.labels;
  return {
    ariaLabel: seed.name,
    resultLabel: labels.result,
    resultPlaceholder: labels.placeholder,
    copyPasswordLabel: labels.copy,
    regenerate: labels.regenerate,
    optionsLabel: labels.options,
    lengthLabel: labels.length,
    lengthSliderLabel: labels.length,
    characterTypesLabel: labels.characterTypes,
    lowercase: labels.lowercase,
    uppercase: labels.uppercase,
    digits: labels.digits,
    symbols: labels.symbols,
    excludeAmbiguous: labels.excludeAmbiguous,
    excludeAmbiguousHint: labels.excludeAmbiguousHint,
    strengthLabel: labels.strength,
    strengthLevels: {
      limited: labels.levels[0],
      moderate: labels.levels[1],
      strong: labels.levels[2],
      veryStrong: labels.levels[3],
    },
    strengthHints: {
      limited: labels.hints[0],
      moderate: labels.hints[1],
      strong: labels.hints[2],
      veryStrong: labels.hints[3],
    },
    entropyEstimate: labels.entropyEstimate,
    entropyHint: labels.entropyHint,
    generated: labels.generated,
    errors: {
      lengthRange: labels.errors[0],
      noCharacterTypes: labels.errors[1],
      randomUnavailable: labels.errors[2],
      generationFailed: labels.errors[3],
    },
  };
}

function build(seed: LocaleSeed): GeneratorToolLocale {
  const page = <T>(source: PageSeed, feature: T): GeneratorPage<T> => ({
    title: source.name,
    description: source.description,
    mobileDescription: source.mobileDescription,
    guideTitle: source.guideTitle,
    guideBody: source.guideBody,
    safetyTitle: source.safetyTitle,
    safetyBody: source.safetyBody,
    faqs: source.faqs,
    feature,
  });
  return {
    catalog: {
      "barcode-generator": {
        name: seed.barcode.name,
        summary: seed.barcode.summary,
        searchTerms: seed.barcode.terms,
      },
      "password-generator": {
        name: seed.password.name,
        summary: seed.password.summary,
        searchTerms: seed.password.terms,
      },
    },
    tools: {
      "barcode-generator": page(seed.barcode, buildBarcode(seed.barcode)),
      "password-generator": page(seed.password, buildPassword(seed.password)),
    },
  };
}

const seeds = {
  en: define({
    barcode: {
      name: "Barcode Generator",
      summary:
        "Create downloadable retail, inventory, and shipping barcodes in your browser.",
      terms: ["barcode generator", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
      description:
        "Create Code 128, EAN, UPC, Code 39, and ITF-14 barcodes locally, adjust their appearance, and download PNG or SVG files.",
      mobileDescription: "Create and download common barcode formats locally.",
      guideTitle: "Create a barcode that scans reliably",
      guideBody:
        "Choose the format required by the receiving system, enter its data, and keep a clear quiet zone around the bars. EAN, UPC, and ITF-14 can calculate a missing check digit; test the final print at its real size because screens do not reproduce every printer, label stock, or scanner condition.",
      safetyTitle: "Validation is not product registration",
      safetyBody:
        "The tool checks format rules and renders locally in this browser tab. A mathematically valid EAN, UPC, or ITF-14 code does not prove that its company prefix or number was allocated by GS1 or accepted by a retailer.",
      faqs: [
        {
          q: "What is a check digit?",
          a: "It is the final digit calculated from the preceding digits. For EAN-13, UPC-A, EAN-8, and ITF-14, you may enter the payload without it and the generator will add it, or enter the full value for validation.",
        },
        {
          q: "Why does quiet zone and print testing matter?",
          a: "Scanners need blank space on both sides to find the bars. Preserve that margin and test the exported code after printing at its intended size and material.",
        },
        {
          q: "Does a valid barcode mean it is registered with GS1?",
          a: "No. Format and check-digit validation cannot confirm ownership, GS1 allocation, retailer listing, or product registration.",
        },
      ],
      labels: {
        format: "Barcode format",
        value: "Value",
        formatHints: [
          "Flexible letters, numbers, and symbols for logistics and inventory.",
          "12 data digits, or all 13 digits including the check digit.",
          "11 data digits, or all 12 digits including the check digit.",
          "Uppercase letters, numbers, spaces, and a limited symbol set.",
          "7 data digits, or all 8 digits including the check digit.",
          "13 data digits, or all 14 digits including the check digit.",
        ],
        clear: "Clear",
        preview: "Preview",
        previewPlaceholder: "Enter a value to preview the barcode.",
        appearance: "Appearance",
        width: "Bar width",
        height: "Bar height",
        margin: "Quiet zone",
        showText: "Show value",
        foreground: "Bar color",
        background: "Background color",
        downloadPng: "Download PNG",
        downloadSvg: "Download SVG",
        ready: "Enter a value to create a barcode.",
        generated: "Barcode created.",
        checkDigitAdded: "The check digit was calculated and added.",
        errors: [
          "Use digits only for this format.",
          "This value contains a character the selected format does not support.",
          "Use the required number of digits for this format.",
          "The supplied check digit is not valid.",
          "This value is too long for the selected format.",
          "Choose a supported size or margin.",
          "Use a six-digit hexadecimal color.",
          "Choose bar and background colors with stronger contrast.",
          "The barcode could not be created.",
          "The barcode file could not be downloaded.",
        ],
      },
    },
    password: {
      name: "Password Generator",
      summary:
        "Create long, unique random passwords locally with clear compatibility controls.",
      terms: [
        "password generator",
        "random password",
        "strong password",
        "secure password",
      ],
      description:
        "Generate a random password locally with Web Crypto, choose its length and allowed character types, then copy it when ready.",
      mobileDescription: "Generate a long random password locally in this tab.",
      guideTitle: "Prefer length and uniqueness",
      guideBody:
        "Use a different random password for every account and make it as long as the site allows. Character toggles are compatibility controls for sites with specific rules, not a reason to shorten the password. Save important passwords in a trusted password manager.",
      safetyTitle: "Local generation still needs careful handling",
      safetyBody:
        "Generation uses the browser Web Crypto API and the password is not uploaded or stored by this tool. Copying places it on the system clipboard, where other apps or clipboard history may be able to read it; paste it promptly and clear clipboard history when appropriate.",
      faqs: [
        {
          q: "How is the password generated?",
          a: "The browser supplies cryptographically strong random values through Web Crypto. Generation happens in this tab without sending the password to a server.",
        },
        {
          q: "Do uppercase letters, digits, and symbols guarantee safety?",
          a: "No. They help satisfy site rules and widen the available character set, but length, uniqueness, secure storage, and the account's other protections also matter.",
        },
        {
          q: "What does the entropy estimate mean?",
          a: "It describes the size of the selected random-password space. It is an estimate, not a crack-time promise or a guarantee against phishing, malware, leaks, or poor password storage.",
        },
      ],
      labels: {
        result: "Generated password",
        placeholder: "Your password will appear here",
        copy: "Copy password",
        regenerate: "Regenerate",
        options: "Password options",
        length: "Length",
        characterTypes: "Character types",
        lowercase: "Lowercase (a–z)",
        uppercase: "Uppercase (A–Z)",
        digits: "Digits (0–9)",
        symbols: "Symbols",
        excludeAmbiguous: "Exclude ambiguous characters",
        excludeAmbiguousHint:
          "Removes lookalikes such as I, l, 1, O, 0, and |.",
        strength: "Estimated strength",
        levels: ["Limited", "Moderate", "Strong", "Very strong"],
        hints: [
          "Use a longer unique password when the site allows it.",
          "Longer is preferable for important accounts.",
          "A broad random space; keep this password unique.",
          "A very broad random space; safe handling still matters.",
        ],
        entropyEstimate: "About {bits} bits of random-space entropy",
        entropyHint:
          "Estimate only; real protection depends on unique use, storage, and the service.",
        generated: "A new password was generated locally.",
        errors: [
          "Choose a whole-number length from {min} to {max}.",
          "Select at least one character type.",
          "Secure browser randomness is unavailable here.",
          "The password could not be generated.",
        ],
      },
    },
  }),
  ko: define({
    barcode: {
      name: "바코드 생성기",
      summary: "브라우저에서 상품·재고·배송용 바코드를 만들고 내려받습니다.",
      terms: ["바코드 생성기", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
      description:
        "Code 128, EAN, UPC, Code 39, ITF-14 바코드를 기기에서 만들고 모양을 조정해 PNG 또는 SVG로 내려받으세요.",
      mobileDescription: "주요 바코드를 기기에서 만들고 내려받으세요.",
      guideTitle: "잘 스캔되는 바코드 만들기",
      guideBody:
        "사용처가 요구하는 형식을 고르고 데이터를 입력한 뒤 막대 주위의 여백을 유지하세요. EAN·UPC·ITF-14는 빠진 검사 숫자를 계산할 수 있습니다. 화면과 실제 인쇄 조건은 다르므로 최종 크기와 용지에서 반드시 스캔을 시험하세요.",
      safetyTitle: "형식 검증은 상품 등록 확인이 아닙니다",
      safetyBody:
        "입력 검증과 렌더링은 이 브라우저 탭에서 처리됩니다. EAN·UPC·ITF-14의 형식과 검사 숫자가 맞아도 해당 번호가 GS1에서 배정되었거나 유통사에 등록되었다는 뜻은 아닙니다.",
      faqs: [
        {
          q: "검사 숫자는 무엇인가요?",
          a: "앞 숫자들로 계산하는 마지막 한 자리입니다. EAN-13, UPC-A, EAN-8, ITF-14는 본문 숫자만 입력하면 자동으로 더하고, 전체 번호를 입력하면 검사합니다.",
        },
        {
          q: "여백과 인쇄 테스트가 왜 중요한가요?",
          a: "스캐너가 막대를 찾으려면 양쪽에 빈 공간이 필요합니다. 여백을 유지하고 실제 크기와 용지로 인쇄한 결과를 시험하세요.",
        },
        {
          q: "유효한 바코드는 GS1 등록을 뜻하나요?",
          a: "아닙니다. 형식과 검사 숫자만으로 번호 소유권, GS1 배정, 유통사 등록 여부를 확인할 수 없습니다.",
        },
      ],
      labels: {
        format: "바코드 형식",
        value: "값",
        formatHints: [
          "물류·재고용 영문, 숫자, 기호를 유연하게 지원합니다.",
          "본문 12자리 또는 검사 숫자를 포함한 13자리입니다.",
          "본문 11자리 또는 검사 숫자를 포함한 12자리입니다.",
          "영문 대문자, 숫자, 공백과 일부 기호를 지원합니다.",
          "본문 7자리 또는 검사 숫자를 포함한 8자리입니다.",
          "본문 13자리 또는 검사 숫자를 포함한 14자리입니다.",
        ],
        clear: "지우기",
        preview: "미리보기",
        previewPlaceholder: "값을 입력하면 바코드가 표시됩니다.",
        appearance: "모양",
        width: "막대 너비",
        height: "막대 높이",
        margin: "여백",
        showText: "값 표시",
        foreground: "막대 색상",
        background: "배경 색상",
        downloadPng: "PNG 내려받기",
        downloadSvg: "SVG 내려받기",
        ready: "값을 입력해 바코드를 만드세요.",
        generated: "바코드를 만들었습니다.",
        checkDigitAdded: "검사 숫자를 계산해 추가했습니다.",
        errors: [
          "이 형식에는 숫자만 입력하세요.",
          "선택한 형식에서 지원하지 않는 문자가 있습니다.",
          "이 형식에 맞는 자릿수를 입력하세요.",
          "입력한 검사 숫자가 올바르지 않습니다.",
          "선택한 형식에 비해 값이 너무 깁니다.",
          "지원하는 크기 또는 여백을 선택하세요.",
          "6자리 16진수 색상을 입력하세요.",
          "막대와 배경의 대비를 더 높이세요.",
          "바코드를 만들지 못했습니다.",
          "바코드 파일을 내려받지 못했습니다.",
        ],
      },
    },
    password: {
      name: "비밀번호 생성기",
      summary:
        "호환성 조건을 고르고 길고 고유한 무작위 비밀번호를 기기에서 만듭니다.",
      terms: [
        "비밀번호 생성기",
        "랜덤 비밀번호",
        "강력한 비밀번호",
        "무작위 비밀번호",
      ],
      description:
        "Web Crypto로 기기에서 무작위 비밀번호를 만들고 길이와 허용할 문자 종류를 고른 뒤 복사하세요.",
      mobileDescription: "이 탭에서 긴 무작위 비밀번호를 만드세요.",
      guideTitle: "길이와 고유성을 우선하세요",
      guideBody:
        "계정마다 서로 다른 무작위 비밀번호를 쓰고 사이트가 허용하는 만큼 길게 만드세요. 문자 종류 선택은 특정 사이트 규칙을 맞추기 위한 호환성 설정이지 비밀번호를 짧게 만들 이유가 아닙니다. 중요한 비밀번호는 신뢰할 수 있는 비밀번호 관리 프로그램에 보관하세요.",
      safetyTitle: "기기에서 만들어도 취급에는 주의가 필요합니다",
      safetyBody:
        "브라우저 Web Crypto API를 사용하며 이 도구는 비밀번호를 업로드하거나 저장하지 않습니다. 복사하면 시스템 클립보드에 남아 다른 앱이나 기록 기능이 읽을 수 있으므로 바로 붙여넣고 필요하면 기록을 지우세요.",
      faqs: [
        {
          q: "비밀번호는 어떻게 만들어지나요?",
          a: "브라우저가 Web Crypto로 암호학적으로 강한 난수를 제공합니다. 비밀번호는 서버로 전송되지 않고 이 탭에서 만들어집니다.",
        },
        {
          q: "대문자·숫자·기호가 있으면 안전한가요?",
          a: "그 자체로 보장되지는 않습니다. 사이트 규칙을 맞추고 문자 공간을 넓히지만 길이, 계정별 고유성, 안전한 보관과 다른 계정 보호도 중요합니다.",
        },
        {
          q: "엔트로피 추정치는 무엇을 뜻하나요?",
          a: "선택한 무작위 비밀번호 공간의 크기를 나타냅니다. 해독 시간 약속이 아니며 피싱, 악성코드, 유출 또는 잘못된 보관까지 막는다는 뜻도 아닙니다.",
        },
      ],
      labels: {
        result: "생성된 비밀번호",
        placeholder: "생성된 비밀번호가 여기에 표시됩니다",
        copy: "비밀번호 복사",
        regenerate: "다시 생성",
        options: "비밀번호 옵션",
        length: "길이",
        characterTypes: "문자 종류",
        lowercase: "영문 소문자 (a–z)",
        uppercase: "영문 대문자 (A–Z)",
        digits: "숫자 (0–9)",
        symbols: "기호",
        excludeAmbiguous: "헷갈리는 문자 제외",
        excludeAmbiguousHint:
          "I, l, 1, O, 0, |처럼 비슷하게 보이는 문자를 뺍니다.",
        strength: "예상 강도",
        levels: ["제한적", "보통", "강함", "매우 강함"],
        hints: [
          "사이트가 허용하면 더 길고 고유하게 만드세요.",
          "중요한 계정에는 더 긴 길이를 권합니다.",
          "넓은 무작위 공간입니다. 다른 계정에 재사용하지 마세요.",
          "매우 넓은 무작위 공간이지만 안전한 취급은 여전히 중요합니다.",
        ],
        entropyEstimate: "무작위 공간 엔트로피 약 {bits}비트",
        entropyHint:
          "추정치이며 실제 보호 수준은 고유 사용, 보관 방식, 서비스 환경에 따라 달라집니다.",
        generated: "기기에서 새 비밀번호를 만들었습니다.",
        errors: [
          "길이는 {min}에서 {max} 사이의 정수로 선택하세요.",
          "문자 종류를 하나 이상 선택하세요.",
          "이 환경에서는 브라우저 보안 난수를 사용할 수 없습니다.",
          "비밀번호를 만들지 못했습니다.",
        ],
      },
    },
  }),
  ja: compact({
    b: {
      p: [
        "バーコード生成",
        "商品・在庫・配送用バーコードをブラウザーで作成して保存します。",
        ["バーコード生成", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
        "Code 128、EAN、UPC、Code 39、ITF-14を端末内で作成し、外観を調整してPNGまたはSVGで保存できます。",
        "一般的なバーコードを端末内で作成・保存します。",
        "読み取りやすいバーコードを作る",
        "利用先が指定する形式を選び、データを入力して、バーの周囲に十分なクワイエットゾーンを残してください。EAN、UPC、ITF-14では不足するチェックデジットを計算できます。画面と印刷条件は異なるため、実際のサイズと用紙で読み取りテストを行ってください。",
        "形式の検証は商品登録の証明ではありません",
        "入力の検証と描画はこのブラウザータブ内で行われます。EAN、UPC、ITF-14の形式とチェックデジットが正しくても、GS1から番号が割り当てられたことや小売店に登録済みであることは証明できません。",
        [
          {
            q: "チェックデジットとは何ですか？",
            a: "先行する数字から計算される最後の1桁です。EAN-13、UPC-A、EAN-8、ITF-14では本体だけを入力すると追加され、全桁を入力すると検証されます。",
          },
          {
            q: "余白と印刷テストはなぜ必要ですか？",
            a: "スキャナーがバーを見つけるには左右の空白が必要です。余白を保ち、実際のサイズと素材に印刷して読み取りを確認してください。",
          },
          {
            q: "有効なバーコードはGS1登録済みという意味ですか？",
            a: "いいえ。形式とチェックデジットの検証だけでは、番号の所有権、GS1割り当て、小売店登録を確認できません。",
          },
        ],
      ],
      l: {
        format: "バーコード形式",
        value: "値",
        formatHints: [
          "物流・在庫向けの英字、数字、記号に対応します。",
          "本体12桁、またはチェックデジットを含む13桁。",
          "本体11桁、またはチェックデジットを含む12桁。",
          "英大文字、数字、空白、一部の記号に対応します。",
          "本体7桁、またはチェックデジットを含む8桁。",
          "本体13桁、またはチェックデジットを含む14桁。",
        ],
        clear: "クリア",
        preview: "プレビュー",
        previewPlaceholder: "値を入力するとバーコードが表示されます。",
        appearance: "外観",
        width: "バー幅",
        height: "バー高さ",
        margin: "クワイエットゾーン",
        showText: "値を表示",
        foreground: "バーの色",
        background: "背景色",
        downloadPng: "PNGを保存",
        downloadSvg: "SVGを保存",
        ready: "値を入力してバーコードを作成してください。",
        generated: "バーコードを作成しました。",
        checkDigitAdded: "チェックデジットを計算して追加しました。",
        errors: [
          "この形式には数字だけを入力してください。",
          "選択した形式で使えない文字が含まれています。",
          "この形式に必要な桁数で入力してください。",
          "チェックデジットが正しくありません。",
          "選択した形式には長すぎます。",
          "対応するサイズまたは余白を選んでください。",
          "6桁の16進カラーを指定してください。",
          "バーと背景のコントラストを強くしてください。",
          "バーコードを作成できませんでした。",
          "バーコードファイルを保存できませんでした。",
        ],
      },
    },
    w: {
      p: [
        "パスワード生成",
        "互換性を調整しながら、長く固有なランダムパスワードを端末内で作成します。",
        [
          "パスワード生成",
          "ランダムパスワード",
          "強力なパスワード",
          "安全なパスワード",
        ],
        "Web Cryptoを使って端末内でランダムパスワードを生成し、長さと使用する文字種を選んでコピーできます。",
        "このタブ内で長いランダムパスワードを生成します。",
        "長さと固有性を優先する",
        "アカウントごとに異なるランダムパスワードを使い、サイトが許す範囲で長くしてください。文字種の切り替えはサイト固有の規則に合わせる互換性設定です。重要なパスワードは信頼できるパスワードマネージャーに保存してください。",
        "端末内生成でも取り扱いには注意",
        "ブラウザーのWeb Crypto APIを使用し、このツールはパスワードを送信・保存しません。コピーするとシステムのクリップボードに入り、他のアプリや履歴から読まれる場合があるため、速やかに貼り付けて必要に応じて履歴を消してください。",
        [
          {
            q: "どのように生成されますか？",
            a: "ブラウザーがWeb Cryptoで暗号学的に強い乱数を提供し、このタブ内で生成します。サーバーには送信されません。",
          },
          {
            q: "大文字・数字・記号があれば安全ですか？",
            a: "それだけでは保証されません。サイトの規則に合わせて文字空間を広げますが、長さ、使い回さないこと、安全な保管も重要です。",
          },
          {
            q: "エントロピー推定値とは？",
            a: "選択したランダムパスワード空間の大きさです。解読時間の約束ではなく、フィッシング、マルウェア、漏えい、不適切な保管への保証でもありません。",
          },
        ],
      ],
      l: {
        result: "生成したパスワード",
        placeholder: "ここにパスワードが表示されます",
        copy: "パスワードをコピー",
        regenerate: "再生成",
        options: "パスワード設定",
        length: "長さ",
        characterTypes: "文字種",
        lowercase: "英小文字 (a–z)",
        uppercase: "英大文字 (A–Z)",
        digits: "数字 (0–9)",
        symbols: "記号",
        excludeAmbiguous: "紛らわしい文字を除外",
        excludeAmbiguousHint: "I、l、1、O、0、| など似た文字を除きます。",
        strength: "推定強度",
        levels: ["限定的", "中程度", "強い", "非常に強い"],
        hints: [
          "可能なら、より長く固有なパスワードにしてください。",
          "重要なアカウントでは長くすることを推奨します。",
          "広いランダム空間です。使い回さないでください。",
          "非常に広いランダム空間ですが、安全な取り扱いは必要です。",
        ],
        entropyEstimate: "ランダム空間のエントロピー：約{bits}ビット",
        entropyHint:
          "推定値です。実際の保護は固有性、保管方法、サービスにも左右されます。",
        generated: "端末内で新しいパスワードを生成しました。",
        errors: [
          "{min}から{max}までの整数を選んでください。",
          "文字種を1つ以上選んでください。",
          "この環境では安全なブラウザー乱数を利用できません。",
          "パスワードを生成できませんでした。",
        ],
      },
    },
  }),
  "zh-TW": compact({
    b: {
      p: [
        "條碼產生器",
        "在瀏覽器中建立商品、庫存與物流條碼並下載。",
        ["條碼產生器", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
        "在裝置上建立 Code 128、EAN、UPC、Code 39 與 ITF-14 條碼，調整外觀並下載 PNG 或 SVG。",
        "在裝置上建立並下載常用條碼。",
        "建立容易掃描的條碼",
        "選擇接收系統要求的格式並輸入資料，同時保留條紋四周的靜區。EAN、UPC 與 ITF-14 可計算缺少的檢查碼。螢幕無法反映所有印表機、標籤材質與掃描環境，請用實際尺寸印出後測試。",
        "格式有效不代表完成商品註冊",
        "驗證與繪製都在此瀏覽器分頁中進行。EAN、UPC 或 ITF-14 的格式與檢查碼正確，並不能證明號碼已由 GS1 配發或被零售商接受。",
        [
          {
            q: "什麼是檢查碼？",
            a: "它是依前面數字計算出的最後一碼。EAN-13、UPC-A、EAN-8、ITF-14 可只輸入主體讓工具補上，也可輸入完整號碼進行驗證。",
          },
          {
            q: "為什麼靜區與列印測試很重要？",
            a: "掃描器需要條紋兩側的空白才能辨識。請保留靜區，並以實際尺寸和材質列印後測試。",
          },
          {
            q: "有效條碼代表已向 GS1 註冊嗎？",
            a: "不代表。格式與檢查碼驗證無法確認號碼所有權、GS1 配發、零售商建檔或商品註冊。",
          },
        ],
      ],
      l: {
        format: "條碼格式",
        value: "內容",
        formatHints: [
          "支援物流與庫存常用的英文字母、數字和符號。",
          "12 碼主體，或含檢查碼的完整 13 碼。",
          "11 碼主體，或含檢查碼的完整 12 碼。",
          "支援英文大寫、數字、空格和有限符號。",
          "7 碼主體，或含檢查碼的完整 8 碼。",
          "13 碼主體，或含檢查碼的完整 14 碼。",
        ],
        clear: "清除",
        preview: "預覽",
        previewPlaceholder: "輸入內容以預覽條碼。",
        appearance: "外觀",
        width: "條紋寬度",
        height: "條紋高度",
        margin: "靜區",
        showText: "顯示內容",
        foreground: "條紋顏色",
        background: "背景顏色",
        downloadPng: "下載 PNG",
        downloadSvg: "下載 SVG",
        ready: "輸入內容以建立條碼。",
        generated: "條碼已建立。",
        checkDigitAdded: "已計算並加入檢查碼。",
        errors: [
          "此格式只能使用數字。",
          "內容含有所選格式不支援的字元。",
          "請輸入此格式要求的位數。",
          "提供的檢查碼不正確。",
          "內容超過所選格式的長度。",
          "請選擇支援的尺寸或邊界。",
          "請使用六位十六進位色碼。",
          "請提高條紋與背景的對比。",
          "無法建立條碼。",
          "無法下載條碼檔案。",
        ],
      },
    },
    w: {
      p: [
        "密碼產生器",
        "在裝置上建立長度足夠且不重複的隨機密碼，並調整相容性條件。",
        ["密碼產生器", "隨機密碼", "高強度密碼", "安全密碼"],
        "使用 Web Crypto 在裝置上產生隨機密碼，選擇長度與允許的字元類型後即可複製。",
        "在此分頁中產生長隨機密碼。",
        "優先考慮長度與唯一性",
        "每個帳號都使用不同的隨機密碼，並在網站允許的範圍內加長。字元開關是為了符合網站規則的相容性設定，不是縮短密碼的理由。重要密碼請存入可信賴的密碼管理器。",
        "本機產生仍需小心處理",
        "工具使用瀏覽器 Web Crypto API，不會上傳或儲存密碼。複製後密碼會進入系統剪貼簿，其他應用程式或剪貼簿記錄可能讀取；請盡快貼上並視需要清除記錄。",
        [
          {
            q: "密碼如何產生？",
            a: "瀏覽器透過 Web Crypto 提供密碼學安全的隨機值，並在此分頁中完成產生，不會傳送到伺服器。",
          },
          {
            q: "有大寫、數字與符號就一定安全嗎？",
            a: "不一定。這些選項有助於符合網站規則並擴大字元空間，但長度、每站唯一、安全儲存及其他帳號保護也很重要。",
          },
          {
            q: "熵估計代表什麼？",
            a: "它描述所選隨機密碼空間的大小，不是破解時間承諾，也不保證能抵抗網路釣魚、惡意程式、外洩或不當儲存。",
          },
        ],
      ],
      l: {
        result: "產生的密碼",
        placeholder: "密碼會顯示在這裡",
        copy: "複製密碼",
        regenerate: "重新產生",
        options: "密碼選項",
        length: "長度",
        characterTypes: "字元類型",
        lowercase: "英文小寫 (a–z)",
        uppercase: "英文大寫 (A–Z)",
        digits: "數字 (0–9)",
        symbols: "符號",
        excludeAmbiguous: "排除易混淆字元",
        excludeAmbiguousHint: "移除 I、l、1、O、0、| 等外觀相近的字元。",
        strength: "估計強度",
        levels: ["有限", "中等", "強", "非常強"],
        hints: [
          "網站允許時請使用更長且唯一的密碼。",
          "重要帳號建議使用更長的密碼。",
          "隨機空間廣，請勿重複使用。",
          "隨機空間非常廣，但仍需妥善處理。",
        ],
        entropyEstimate: "約 {bits} 位元的隨機空間熵",
        entropyHint: "僅為估計；實際保護也取決於唯一使用、儲存方式與服務。",
        generated: "已在裝置上產生新密碼。",
        errors: [
          "請選擇 {min} 到 {max} 之間的整數長度。",
          "請至少選擇一種字元類型。",
          "此環境無法使用安全的瀏覽器亂數。",
          "無法產生密碼。",
        ],
      },
    },
  }),
  de: compact({
    b: {
      p: [
        "Barcode-Generator",
        "Barcodes für Handel, Lager und Versand direkt im Browser erstellen und herunterladen.",
        ["Barcode Generator", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
        "Code 128, EAN, UPC, Code 39 und ITF-14 lokal erstellen, anpassen und als PNG oder SVG herunterladen.",
        "Gängige Barcodes lokal erstellen und herunterladen.",
        "Zuverlässig scannbare Barcodes",
        "Wählen Sie das vom Zielsystem verlangte Format, geben Sie die Daten ein und lassen Sie eine freie Ruhezone um die Balken. Bei EAN, UPC und ITF-14 kann die Prüfziffer ergänzt werden. Testen Sie den Ausdruck in der tatsächlichen Größe und auf dem vorgesehenen Material.",
        "Gültiges Format ist keine Produktregistrierung",
        "Prüfung und Darstellung erfolgen in diesem Browser-Tab. Eine gültige EAN-, UPC- oder ITF-14-Prüfziffer belegt weder eine GS1-Zuteilung noch die Annahme durch einen Händler.",
        [
          {
            q: "Was ist eine Prüfziffer?",
            a: "Sie ist die letzte, aus den vorherigen Ziffern berechnete Stelle. Bei EAN-13, UPC-A, EAN-8 und ITF-14 kann sie ergänzt oder bei vollständiger Eingabe geprüft werden.",
          },
          {
            q: "Warum sind Ruhezone und Drucktest wichtig?",
            a: "Scanner benötigen freien Raum neben den Balken. Behalten Sie den Rand bei und testen Sie den Druck in Zielgröße und auf dem vorgesehenen Material.",
          },
          {
            q: "Bedeutet ein gültiger Barcode eine GS1-Registrierung?",
            a: "Nein. Format- und Prüfziffernprüfung bestätigen weder Eigentum noch GS1-Zuteilung, Händlerlistung oder Produktregistrierung.",
          },
        ],
      ],
      l: {
        format: "Barcode-Format",
        value: "Wert",
        formatHints: [
          "Flexible Buchstaben, Zahlen und Zeichen für Logistik und Lager.",
          "12 Nutzstellen oder 13 Stellen einschließlich Prüfziffer.",
          "11 Nutzstellen oder 12 Stellen einschließlich Prüfziffer.",
          "Großbuchstaben, Zahlen, Leerzeichen und begrenzte Sonderzeichen.",
          "7 Nutzstellen oder 8 Stellen einschließlich Prüfziffer.",
          "13 Nutzstellen oder 14 Stellen einschließlich Prüfziffer.",
        ],
        clear: "Leeren",
        preview: "Vorschau",
        previewPlaceholder: "Wert eingeben, um den Barcode anzuzeigen.",
        appearance: "Darstellung",
        width: "Balkenbreite",
        height: "Balkenhöhe",
        margin: "Ruhezone",
        showText: "Wert anzeigen",
        foreground: "Balkenfarbe",
        background: "Hintergrundfarbe",
        downloadPng: "PNG herunterladen",
        downloadSvg: "SVG herunterladen",
        ready: "Geben Sie einen Wert ein.",
        generated: "Barcode erstellt.",
        checkDigitAdded: "Prüfziffer wurde berechnet und ergänzt.",
        errors: [
          "Für dieses Format nur Ziffern verwenden.",
          "Der Wert enthält ein nicht unterstütztes Zeichen.",
          "Verwenden Sie die erforderliche Stellenzahl.",
          "Die Prüfziffer ist ungültig.",
          "Der Wert ist für dieses Format zu lang.",
          "Wählen Sie eine unterstützte Größe oder Ruhezone.",
          "Verwenden Sie einen sechsstelligen Hex-Farbwert.",
          "Wählen Sie kontrastreichere Farben.",
          "Der Barcode konnte nicht erstellt werden.",
          "Die Barcode-Datei konnte nicht heruntergeladen werden.",
        ],
      },
    },
    w: {
      p: [
        "Passwort-Generator",
        "Lange, einzigartige Zufallspasswörter lokal mit klaren Kompatibilitätsoptionen erstellen.",
        [
          "Passwort Generator",
          "Zufallspasswort",
          "starkes Passwort",
          "sicheres Passwort",
        ],
        "Mit Web Crypto lokal ein Zufallspasswort erzeugen, Länge und erlaubte Zeichen wählen und anschließend kopieren.",
        "Ein langes Zufallspasswort lokal erzeugen.",
        "Länge und Einzigartigkeit bevorzugen",
        "Verwenden Sie für jedes Konto ein anderes Zufallspasswort und wählen Sie die größtmögliche unterstützte Länge. Die Zeichenoptionen dienen der Kompatibilität mit Website-Regeln. Wichtige Passwörter gehören in einen vertrauenswürdigen Passwortmanager.",
        "Auch lokale Passwörter vorsichtig behandeln",
        "Die Erzeugung nutzt die Web Crypto API; dieses Tool lädt oder speichert das Passwort nicht. Beim Kopieren gelangt es in die Systemzwischenablage, die andere Apps oder ein Verlauf lesen können. Fügen Sie es zeitnah ein und löschen Sie den Verlauf bei Bedarf.",
        [
          {
            q: "Wie wird das Passwort erzeugt?",
            a: "Der Browser liefert über Web Crypto kryptografisch starke Zufallswerte. Die Erzeugung erfolgt in diesem Tab ohne Serverübertragung.",
          },
          {
            q: "Garantieren Großbuchstaben, Zahlen und Symbole Sicherheit?",
            a: "Nein. Sie erfüllen Website-Regeln und vergrößern den Zeichenvorrat; wichtig sind außerdem Länge, Einzigartigkeit, sichere Ablage und weitere Kontoschutzmaßnahmen.",
          },
          {
            q: "Was bedeutet die Entropieschätzung?",
            a: "Sie beschreibt die Größe des gewählten Zufallsraums, nicht eine garantierte Knackzeit oder Schutz vor Phishing, Schadsoftware, Lecks und unsicherer Speicherung.",
          },
        ],
      ],
      l: {
        result: "Erzeugtes Passwort",
        placeholder: "Das Passwort erscheint hier",
        copy: "Passwort kopieren",
        regenerate: "Neu erzeugen",
        options: "Passwortoptionen",
        length: "Länge",
        characterTypes: "Zeichenarten",
        lowercase: "Kleinbuchstaben (a–z)",
        uppercase: "Großbuchstaben (A–Z)",
        digits: "Ziffern (0–9)",
        symbols: "Sonderzeichen",
        excludeAmbiguous: "Ähnliche Zeichen ausschließen",
        excludeAmbiguousHint:
          "Entfernt ähnliche Zeichen wie I, l, 1, O, 0 und |.",
        strength: "Geschätzte Stärke",
        levels: ["Begrenzt", "Mittel", "Stark", "Sehr stark"],
        hints: [
          "Wenn möglich ein längeres, einzigartiges Passwort verwenden.",
          "Für wichtige Konten ist mehr Länge sinnvoll.",
          "Großer Zufallsraum; dieses Passwort nicht wiederverwenden.",
          "Sehr großer Zufallsraum; sorgfältige Handhabung bleibt wichtig.",
        ],
        entropyEstimate: "Etwa {bits} Bit Entropie im Zufallsraum",
        entropyHint:
          "Nur eine Schätzung; tatsächlicher Schutz hängt auch von Einzigartigkeit, Speicherung und Dienst ab.",
        generated: "Neues Passwort lokal erzeugt.",
        errors: [
          "Wählen Sie eine ganze Länge zwischen {min} und {max}.",
          "Wählen Sie mindestens eine Zeichenart.",
          "Sichere Browser-Zufallswerte sind hier nicht verfügbar.",
          "Das Passwort konnte nicht erzeugt werden.",
        ],
      },
    },
  }),
  es: compact({
    b: {
      p: [
        "Generador de códigos de barras",
        "Crea y descarga códigos para productos, inventario y envíos en el navegador.",
        [
          "generador de códigos de barras",
          "EAN-13",
          "UPC-A",
          "Code 128",
          "ITF-14",
        ],
        "Crea localmente códigos Code 128, EAN, UPC, Code 39 e ITF-14, ajusta su aspecto y descarga PNG o SVG.",
        "Crea y descarga localmente formatos de código habituales.",
        "Cómo crear un código fácil de escanear",
        "Elige el formato exigido por el sistema de destino, introduce los datos y conserva una zona muda libre alrededor de las barras. EAN, UPC e ITF-14 pueden calcular el dígito de control que falta. Prueba la impresión al tamaño y en el material finales.",
        "Validar no equivale a registrar un producto",
        "La validación y el dibujo ocurren en esta pestaña. Un EAN, UPC o ITF-14 válido no demuestra que GS1 haya asignado el número ni que un comercio lo haya aceptado.",
        [
          {
            q: "¿Qué es el dígito de control?",
            a: "Es la última cifra calculada a partir de las anteriores. En EAN-13, UPC-A, EAN-8 e ITF-14 puedes omitirla para que se añada o incluirla para validarla.",
          },
          {
            q: "¿Por qué importan la zona muda y la prueba impresa?",
            a: "El escáner necesita espacio en blanco junto a las barras. Conserva el margen y prueba el código impreso al tamaño y material previstos.",
          },
          {
            q: "¿Un código válido está registrado en GS1?",
            a: "No. La validación de formato y dígito no confirma propiedad, asignación de GS1, alta comercial ni registro del producto.",
          },
        ],
      ],
      l: {
        format: "Formato",
        value: "Valor",
        formatHints: [
          "Letras, números y símbolos flexibles para logística e inventario.",
          "12 cifras de datos o 13 con el dígito de control.",
          "11 cifras de datos o 12 con el dígito de control.",
          "Mayúsculas, números, espacios y un conjunto limitado de símbolos.",
          "7 cifras de datos u 8 con el dígito de control.",
          "13 cifras de datos o 14 con el dígito de control.",
        ],
        clear: "Borrar",
        preview: "Vista previa",
        previewPlaceholder: "Introduce un valor para ver el código.",
        appearance: "Apariencia",
        width: "Ancho de barra",
        height: "Altura",
        margin: "Zona muda",
        showText: "Mostrar valor",
        foreground: "Color de barras",
        background: "Fondo",
        downloadPng: "Descargar PNG",
        downloadSvg: "Descargar SVG",
        ready: "Introduce un valor para crear el código.",
        generated: "Código creado.",
        checkDigitAdded: "Se calculó y añadió el dígito de control.",
        errors: [
          "Usa solo cifras para este formato.",
          "El valor contiene un carácter no admitido.",
          "Usa la cantidad de cifras requerida.",
          "El dígito de control no es válido.",
          "El valor es demasiado largo.",
          "Elige un tamaño o margen admitido.",
          "Usa un color hexadecimal de seis dígitos.",
          "Aumenta el contraste entre barras y fondo.",
          "No se pudo crear el código.",
          "No se pudo descargar el archivo.",
        ],
      },
    },
    w: {
      p: [
        "Generador de contraseñas",
        "Crea contraseñas aleatorias largas y únicas localmente con controles de compatibilidad.",
        [
          "generador de contraseñas",
          "contraseña aleatoria",
          "contraseña fuerte",
          "contraseña segura",
        ],
        "Genera una contraseña aleatoria localmente con Web Crypto, elige longitud y caracteres permitidos y cópiala.",
        "Genera una contraseña aleatoria larga en esta pestaña.",
        "Prioriza longitud y uso único",
        "Usa una contraseña aleatoria distinta para cada cuenta y tan larga como permita el sitio. Los tipos de caracteres son controles de compatibilidad con reglas del sitio. Guarda las contraseñas importantes en un gestor de confianza.",
        "La generación local también exige cuidado",
        "Se usa Web Crypto y la herramienta no sube ni guarda la contraseña. Al copiarla queda en el portapapeles, que otras aplicaciones o el historial podrían leer; pégala pronto y borra el historial cuando corresponda.",
        [
          {
            q: "¿Cómo se genera?",
            a: "El navegador aporta valores aleatorios criptográficamente fuertes mediante Web Crypto y genera la contraseña en esta pestaña, sin enviarla a un servidor.",
          },
          {
            q: "¿Mayúsculas, números y símbolos garantizan seguridad?",
            a: "No. Ayudan con las reglas y amplían el conjunto, pero también importan longitud, uso único, almacenamiento seguro y otras defensas de la cuenta.",
          },
          {
            q: "¿Qué significa la entropía estimada?",
            a: "Describe el tamaño del espacio aleatorio elegido; no promete un tiempo de descifrado ni protege por sí sola ante phishing, malware, filtraciones o mal almacenamiento.",
          },
        ],
      ],
      l: {
        result: "Contraseña generada",
        placeholder: "La contraseña aparecerá aquí",
        copy: "Copiar contraseña",
        regenerate: "Generar otra",
        options: "Opciones",
        length: "Longitud",
        characterTypes: "Tipos de caracteres",
        lowercase: "Minúsculas (a–z)",
        uppercase: "Mayúsculas (A–Z)",
        digits: "Cifras (0–9)",
        symbols: "Símbolos",
        excludeAmbiguous: "Excluir caracteres ambiguos",
        excludeAmbiguousHint:
          "Elimina caracteres parecidos como I, l, 1, O, 0 y |.",
        strength: "Fuerza estimada",
        levels: ["Limitada", "Moderada", "Fuerte", "Muy fuerte"],
        hints: [
          "Usa una contraseña más larga y única si el sitio lo permite.",
          "Conviene más longitud para cuentas importantes.",
          "Espacio aleatorio amplio; no reutilices esta contraseña.",
          "Espacio muy amplio; sigue siendo necesario manejarla con cuidado.",
        ],
        entropyEstimate: "Unos {bits} bits de entropía del espacio aleatorio",
        entropyHint:
          "Es una estimación; la protección real depende también del uso único, almacenamiento y servicio.",
        generated: "Se generó una contraseña nueva localmente.",
        errors: [
          "Elige una longitud entera entre {min} y {max}.",
          "Selecciona al menos un tipo de carácter.",
          "No hay aleatoriedad segura del navegador en este entorno.",
          "No se pudo generar la contraseña.",
        ],
      },
    },
  }),
  fr: compact({
    b: {
      p: [
        "Générateur de codes-barres",
        "Créez et téléchargez dans le navigateur des codes pour produits, stocks et expéditions.",
        ["générateur code-barres", "EAN-13", "UPC-A", "Code 128", "ITF-14"],
        "Créez localement des codes Code 128, EAN, UPC, Code 39 et ITF-14, réglez leur aspect et téléchargez-les en PNG ou SVG.",
        "Créez et téléchargez localement les formats courants.",
        "Créer un code facile à scanner",
        "Choisissez le format demandé par le système destinataire, saisissez les données et conservez une zone de silence autour des barres. EAN, UPC et ITF-14 peuvent calculer le chiffre de contrôle manquant. Testez l’impression à sa taille et sur son support définitifs.",
        "Une validation n’est pas un enregistrement produit",
        "La validation et le rendu ont lieu dans cet onglet. Un EAN, UPC ou ITF-14 valide ne prouve ni l’attribution du numéro par GS1 ni son acceptation par un distributeur.",
        [
          {
            q: "Qu’est-ce qu’un chiffre de contrôle ?",
            a: "C’est le dernier chiffre calculé à partir des précédents. Pour EAN-13, UPC-A, EAN-8 et ITF-14, omettez-le pour le faire ajouter ou fournissez le numéro complet pour le vérifier.",
          },
          {
            q: "Pourquoi la zone de silence et le test imprimé comptent-ils ?",
            a: "Le scanner a besoin d’espace libre de chaque côté. Conservez cette marge et testez l’impression à la taille et sur le support prévus.",
          },
          {
            q: "Un code valide est-il enregistré auprès de GS1 ?",
            a: "Non. La validation du format et du chiffre ne confirme ni propriété, ni attribution GS1, ni référencement, ni enregistrement produit.",
          },
        ],
      ],
      l: {
        format: "Format",
        value: "Valeur",
        formatHints: [
          "Lettres, chiffres et symboles souples pour logistique et stock.",
          "12 chiffres de données ou 13 avec chiffre de contrôle.",
          "11 chiffres de données ou 12 avec chiffre de contrôle.",
          "Majuscules, chiffres, espaces et symboles limités.",
          "7 chiffres de données ou 8 avec chiffre de contrôle.",
          "13 chiffres de données ou 14 avec chiffre de contrôle.",
        ],
        clear: "Effacer",
        preview: "Aperçu",
        previewPlaceholder: "Saisissez une valeur pour afficher le code.",
        appearance: "Apparence",
        width: "Largeur des barres",
        height: "Hauteur",
        margin: "Zone de silence",
        showText: "Afficher la valeur",
        foreground: "Couleur des barres",
        background: "Arrière-plan",
        downloadPng: "Télécharger PNG",
        downloadSvg: "Télécharger SVG",
        ready: "Saisissez une valeur pour créer le code.",
        generated: "Code-barres créé.",
        checkDigitAdded: "Le chiffre de contrôle a été calculé et ajouté.",
        errors: [
          "Utilisez uniquement des chiffres pour ce format.",
          "La valeur contient un caractère non pris en charge.",
          "Utilisez le nombre de chiffres requis.",
          "Le chiffre de contrôle est incorrect.",
          "La valeur est trop longue.",
          "Choisissez une taille ou une marge prise en charge.",
          "Utilisez une couleur hexadécimale à six chiffres.",
          "Augmentez le contraste entre barres et fond.",
          "Impossible de créer le code-barres.",
          "Impossible de télécharger le fichier.",
        ],
      },
    },
    w: {
      p: [
        "Générateur de mots de passe",
        "Créez localement des mots de passe aléatoires longs et uniques avec des réglages de compatibilité.",
        [
          "générateur mot de passe",
          "mot de passe aléatoire",
          "mot de passe fort",
          "mot de passe sécurisé",
        ],
        "Générez localement un mot de passe aléatoire avec Web Crypto, choisissez sa longueur et les caractères permis, puis copiez-le.",
        "Générez un long mot de passe aléatoire dans cet onglet.",
        "Privilégier longueur et unicité",
        "Utilisez un mot de passe aléatoire différent pour chaque compte et aussi long que le site le permet. Les types de caractères servent à respecter les règles de compatibilité. Enregistrez les mots de passe importants dans un gestionnaire fiable.",
        "Une génération locale exige toujours de la prudence",
        "Web Crypto est utilisé et l’outil ne téléverse ni ne stocke le mot de passe. Une copie passe par le presse-papiers, potentiellement lisible par d’autres applications ou son historique ; collez rapidement et effacez l’historique si nécessaire.",
        [
          {
            q: "Comment le mot de passe est-il généré ?",
            a: "Le navigateur fournit des valeurs aléatoires cryptographiquement fortes via Web Crypto. La génération reste dans cet onglet sans envoi au serveur.",
          },
          {
            q: "Majuscules, chiffres et symboles garantissent-ils la sécurité ?",
            a: "Non. Ils répondent aux règles et élargissent l’alphabet, mais longueur, unicité, stockage sûr et autres protections du compte comptent aussi.",
          },
          {
            q: "Que signifie l’entropie estimée ?",
            a: "Elle décrit la taille de l’espace aléatoire choisi, sans promettre un temps de cassage ni protéger à elle seule contre hameçonnage, logiciel malveillant, fuite ou mauvais stockage.",
          },
        ],
      ],
      l: {
        result: "Mot de passe généré",
        placeholder: "Le mot de passe apparaîtra ici",
        copy: "Copier le mot de passe",
        regenerate: "Régénérer",
        options: "Options",
        length: "Longueur",
        characterTypes: "Types de caractères",
        lowercase: "Minuscules (a–z)",
        uppercase: "Majuscules (A–Z)",
        digits: "Chiffres (0–9)",
        symbols: "Symboles",
        excludeAmbiguous: "Exclure les caractères ambigus",
        excludeAmbiguousHint:
          "Retire les caractères ressemblants tels que I, l, 1, O, 0 et |.",
        strength: "Robustesse estimée",
        levels: ["Limitée", "Modérée", "Forte", "Très forte"],
        hints: [
          "Utilisez un mot de passe plus long et unique si possible.",
          "Une longueur supérieure convient aux comptes importants.",
          "Espace aléatoire large ; ne réutilisez pas ce mot de passe.",
          "Espace très large ; une manipulation sûre reste nécessaire.",
        ],
        entropyEstimate: "Environ {bits} bits d’entropie d’espace aléatoire",
        entropyHint:
          "Estimation seulement ; la protection dépend aussi de l’unicité, du stockage et du service.",
        generated: "Nouveau mot de passe généré localement.",
        errors: [
          "Choisissez une longueur entière entre {min} et {max}.",
          "Sélectionnez au moins un type de caractère.",
          "L’aléa sécurisé du navigateur est indisponible ici.",
          "Impossible de générer le mot de passe.",
        ],
      },
    },
  }),
  "pt-BR": quick({
    b: {
      name: "Gerador de código de barras",
      summary: "Crie códigos para produtos, estoque e envio no navegador.",
      terms: ["gerador de código de barras", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Crie localmente Code 128, EAN, UPC, Code 39 e ITF-14 e baixe em PNG ou SVG.",
      mobileDescription: "Crie e baixe códigos de barras localmente.",
      guideTitle: "Crie um código fácil de ler",
      guideBody:
        "Escolha o formato exigido, informe os dados e preserve a zona de silêncio. EAN, UPC e ITF-14 podem calcular o dígito verificador; teste a impressão no tamanho e material finais.",
      safetyTitle: "Validação não é registro",
      safetyBody:
        "Um código e dígito válidos não comprovam atribuição pela GS1, propriedade do número ou cadastro no varejo.",
      faqs: [
        {
          q: "O que é o dígito verificador?",
          a: "É o último dígito calculado a partir dos anteriores e pode ser adicionado ou validado.",
        },
        {
          q: "Por que testar a impressão?",
          a: "O leitor precisa de espaço livre e a impressão real pode diferir da tela.",
        },
        {
          q: "Código válido significa registro GS1?",
          a: "Não; formato válido não confirma atribuição ou propriedade.",
        },
      ],
    },
    w: {
      name: "Gerador de senhas",
      summary: "Crie senhas aleatórias longas e únicas localmente.",
      terms: ["gerador de senhas", "senha aleatória", "senha forte"],
      description:
        "Gere uma senha localmente com Web Crypto e escolha comprimento e caracteres permitidos.",
      mobileDescription: "Gere uma senha aleatória longa nesta guia.",
      guideTitle: "Priorize comprimento e exclusividade",
      guideBody:
        "Use uma senha aleatória diferente por conta e tão longa quanto o site permitir. Os tipos de caractere são controles de compatibilidade; guarde senhas em um gerenciador confiável.",
      safetyTitle: "A geração local ainda exige cuidado",
      safetyBody:
        "A senha não é enviada nem salva, mas ao copiar passa pela área de transferência, que outros aplicativos ou o histórico podem ler.",
      faqs: [
        {
          q: "Como a senha é gerada?",
          a: "O navegador usa valores aleatórios criptograficamente fortes do Web Crypto, sem envio ao servidor.",
        },
        {
          q: "Símbolos garantem segurança?",
          a: "Não. Comprimento, exclusividade, armazenamento e outras proteções também importam.",
        },
        {
          q: "O que significa a entropia?",
          a: "É uma estimativa do espaço aleatório, não uma promessa de tempo de quebra ou proteção absoluta.",
        },
      ],
    },
    labels: {
      b: [
        "Formato",
        "Valor",
        "Limpar",
        "Prévia",
        "Aparência",
        "Largura",
        "Altura",
        "Zona de silêncio",
        "Mostrar valor",
      ],
      w: [
        "Senha gerada",
        "Copiar senha",
        "Gerar outra",
        "Opções",
        "Comprimento",
        "Tipos de caractere",
        "Símbolos",
        "Excluir caracteres ambíguos",
        "Força estimada",
      ],
      be: [
        "Use apenas dígitos neste formato.",
        "O valor contém um caractere não aceito pelo formato.",
        "Use a quantidade de dígitos exigida pelo formato.",
        "O dígito verificador informado é inválido.",
        "O valor é longo demais para o formato escolhido.",
        "Escolha um tamanho ou uma margem compatível.",
        "Use uma cor hexadecimal de seis dígitos.",
        "Aumente o contraste entre as barras e o fundo.",
        "Não foi possível criar o código de barras.",
        "Não foi possível baixar o arquivo do código de barras.",
      ],
      wl: ["Limitada", "Moderada", "Forte", "Muito forte"],
      wh: [
        "Use uma senha única e mais longa quando o site permitir.",
        "Prefira mais comprimento em contas importantes.",
        "O espaço aleatório é amplo; não reutilize esta senha.",
        "O espaço aleatório é muito amplo, mas o manuseio seguro continua importante.",
      ],
      we: [
        "Escolha um comprimento inteiro entre {min} e {max}.",
        "Selecione pelo menos um tipo de caractere.",
        "A aleatoriedade segura do navegador não está disponível aqui.",
        "Não foi possível gerar a senha.",
      ],
      entropy: [
        "Cerca de {bits} bits de entropia no espaço aleatório",
        "É uma estimativa; a proteção real também depende de uso único, armazenamento e serviço.",
      ],
    },
  }),
  it: quick({
    b: {
      name: "Generatore di codici a barre",
      summary: "Crea codici per prodotti, magazzino e spedizioni nel browser.",
      terms: ["generatore codice a barre", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Crea localmente Code 128, EAN, UPC, Code 39 e ITF-14 e scarica PNG o SVG.",
      mobileDescription: "Crea e scarica codici a barre localmente.",
      guideTitle: "Crea un codice leggibile",
      guideBody:
        "Scegli il formato richiesto, inserisci i dati e conserva la zona libera. EAN, UPC e ITF-14 possono calcolare la cifra di controllo; prova la stampa nelle dimensioni e sul materiale finali.",
      safetyTitle: "La convalida non è registrazione",
      safetyBody:
        "Formato e cifra validi non provano assegnazione GS1, proprietà del numero o registrazione presso un rivenditore.",
      faqs: [
        {
          q: "Cos’è la cifra di controllo?",
          a: "È l’ultima cifra calcolata dalle precedenti e può essere aggiunta o verificata.",
        },
        {
          q: "Perché provare la stampa?",
          a: "Lo scanner richiede spazio libero e la stampa reale può differire dallo schermo.",
        },
        {
          q: "Un codice valido è registrato GS1?",
          a: "No; la validità del formato non conferma assegnazione o proprietà.",
        },
      ],
    },
    w: {
      name: "Generatore di password",
      summary: "Crea localmente password casuali lunghe e uniche.",
      terms: ["generatore password", "password casuale", "password sicura"],
      description:
        "Genera localmente una password con Web Crypto e scegli lunghezza e caratteri consentiti.",
      mobileDescription: "Genera una password casuale lunga in questa scheda.",
      guideTitle: "Dai priorità a lunghezza e unicità",
      guideBody:
        "Usa una password casuale diversa per ogni account e lunga quanto consentito. I tipi di carattere sono controlli di compatibilità; conserva le password in un gestore affidabile.",
      safetyTitle: "Anche la generazione locale richiede attenzione",
      safetyBody:
        "La password non viene inviata né salvata, ma la copia passa dagli appunti, leggibili da altre app o dalla cronologia.",
      faqs: [
        {
          q: "Come viene generata?",
          a: "Il browser usa valori casuali crittograficamente forti di Web Crypto senza invio al server.",
        },
        {
          q: "I simboli garantiscono sicurezza?",
          a: "No. Contano anche lunghezza, unicità, conservazione e altre protezioni.",
        },
        {
          q: "Cosa indica l’entropia?",
          a: "È una stima dello spazio casuale, non una promessa sui tempi di violazione o una garanzia assoluta.",
        },
      ],
    },
    labels: {
      b: [
        "Formato",
        "Valore",
        "Cancella",
        "Anteprima",
        "Aspetto",
        "Larghezza",
        "Altezza",
        "Zona libera",
        "Mostra valore",
      ],
      w: [
        "Password generata",
        "Copia password",
        "Rigenera",
        "Opzioni",
        "Lunghezza",
        "Tipi di carattere",
        "Simboli",
        "Escludi caratteri ambigui",
        "Robustezza stimata",
      ],
      be: [
        "Usa solo cifre per questo formato.",
        "Il valore contiene un carattere non supportato.",
        "Usa il numero di cifre richiesto dal formato.",
        "La cifra di controllo fornita non è valida.",
        "Il valore è troppo lungo per il formato scelto.",
        "Scegli una dimensione o un margine supportato.",
        "Usa un colore esadecimale di sei cifre.",
        "Aumenta il contrasto tra barre e sfondo.",
        "Impossibile creare il codice a barre.",
        "Impossibile scaricare il file del codice a barre.",
      ],
      wl: ["Limitata", "Moderata", "Forte", "Molto forte"],
      wh: [
        "Usa una password unica e più lunga quando il sito lo consente.",
        "Per gli account importanti è preferibile una lunghezza maggiore.",
        "Lo spazio casuale è ampio; non riutilizzare questa password.",
        "Lo spazio casuale è molto ampio, ma serve comunque cautela.",
      ],
      we: [
        "Scegli una lunghezza intera tra {min} e {max}.",
        "Seleziona almeno un tipo di carattere.",
        "La casualità sicura del browser non è disponibile.",
        "Impossibile generare la password.",
      ],
      entropy: [
        "Circa {bits} bit di entropia dello spazio casuale",
        "È una stima; la protezione reale dipende anche da unicità, conservazione e servizio.",
      ],
    },
  }),
  nl: quick({
    b: {
      name: "Barcodegenerator",
      summary:
        "Maak barcodes voor producten, voorraad en verzending in de browser.",
      terms: ["barcodegenerator", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Maak lokaal Code 128, EAN, UPC, Code 39 en ITF-14 en download PNG of SVG.",
      mobileDescription: "Maak en download barcodes lokaal.",
      guideTitle: "Maak een goed scanbare barcode",
      guideBody:
        "Kies het vereiste formaat, voer de gegevens in en behoud de stille zone. EAN, UPC en ITF-14 kunnen het controlecijfer berekenen; test de afdruk op het uiteindelijke formaat en materiaal.",
      safetyTitle: "Validatie is geen registratie",
      safetyBody:
        "Een geldig formaat en controlecijfer bewijzen geen GS1-toewijzing, eigendom of winkelregistratie.",
      faqs: [
        {
          q: "Wat is een controlecijfer?",
          a: "Het is het laatste cijfer, berekend uit de voorgaande cijfers, en kan worden toegevoegd of gecontroleerd.",
        },
        {
          q: "Waarom de afdruk testen?",
          a: "Een scanner heeft vrije ruimte nodig en een echte afdruk kan van het scherm afwijken.",
        },
        {
          q: "Is een geldige barcode bij GS1 geregistreerd?",
          a: "Nee; formaatvalidatie bevestigt geen toewijzing of eigendom.",
        },
      ],
    },
    w: {
      name: "Wachtwoordgenerator",
      summary: "Maak lokaal lange, unieke willekeurige wachtwoorden.",
      terms: [
        "wachtwoordgenerator",
        "willekeurig wachtwoord",
        "sterk wachtwoord",
      ],
      description:
        "Genereer lokaal met Web Crypto en kies lengte en toegestane tekens.",
      mobileDescription:
        "Genereer een lang willekeurig wachtwoord in dit tabblad.",
      guideTitle: "Kies lengte en uniek gebruik",
      guideBody:
        "Gebruik per account een ander willekeurig wachtwoord en maak het zo lang mogelijk. Tekensoorten zijn compatibiliteitsinstellingen; bewaar wachtwoorden in een betrouwbare manager.",
      safetyTitle: "Ook lokale generatie vraagt zorg",
      safetyBody:
        "Het wachtwoord wordt niet verzonden of opgeslagen, maar kopiëren plaatst het op het klembord dat andere apps of geschiedenis kunnen lezen.",
      faqs: [
        {
          q: "Hoe wordt het gegenereerd?",
          a: "De browser gebruikt cryptografisch sterke Web Crypto-willekeur zonder serververzending.",
        },
        {
          q: "Garanderen symbolen veiligheid?",
          a: "Nee. Lengte, uniek gebruik, opslag en andere bescherming tellen ook.",
        },
        {
          q: "Wat betekent de entropie?",
          a: "Een schatting van de willekeurige ruimte, geen kraaktijdbelofte of absolute garantie.",
        },
      ],
    },
    labels: {
      b: [
        "Formaat",
        "Waarde",
        "Wissen",
        "Voorbeeld",
        "Uiterlijk",
        "Breedte",
        "Hoogte",
        "Stille zone",
        "Waarde tonen",
      ],
      w: [
        "Gegenereerd wachtwoord",
        "Wachtwoord kopiëren",
        "Opnieuw",
        "Opties",
        "Lengte",
        "Tekensoorten",
        "Symbolen",
        "Dubbelzinnige tekens uitsluiten",
        "Geschatte sterkte",
      ],
      be: [
        "Gebruik voor dit formaat alleen cijfers.",
        "De waarde bevat een teken dat dit formaat niet ondersteunt.",
        "Gebruik het vereiste aantal cijfers.",
        "Het opgegeven controlecijfer is ongeldig.",
        "De waarde is te lang voor het gekozen formaat.",
        "Kies een ondersteunde grootte of marge.",
        "Gebruik een hexadecimale kleur van zes cijfers.",
        "Vergroot het contrast tussen balken en achtergrond.",
        "De barcode kon niet worden gemaakt.",
        "Het barcodebestand kon niet worden gedownload.",
      ],
      wl: ["Beperkt", "Gemiddeld", "Sterk", "Zeer sterk"],
      wh: [
        "Gebruik een langer, uniek wachtwoord wanneer de site dat toestaat.",
        "Meer lengte is beter voor belangrijke accounts.",
        "Grote willekeurige ruimte; hergebruik dit wachtwoord niet.",
        "Zeer grote willekeurige ruimte; zorgvuldig gebruik blijft nodig.",
      ],
      we: [
        "Kies een gehele lengte van {min} tot en met {max}.",
        "Selecteer minstens één tekensoort.",
        "Veilige browserwillekeur is hier niet beschikbaar.",
        "Het wachtwoord kon niet worden gegenereerd.",
      ],
      entropy: [
        "Ongeveer {bits} bits entropie in de willekeurige ruimte",
        "Dit is een schatting; echte bescherming hangt ook af van uniek gebruik, opslag en dienst.",
      ],
    },
  }),
  sv: quick({
    b: {
      name: "Streckkodsgenerator",
      summary:
        "Skapa streckkoder för produkter, lager och frakt i webbläsaren.",
      terms: ["streckkodsgenerator", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Skapa Code 128, EAN, UPC, Code 39 och ITF-14 lokalt och hämta PNG eller SVG.",
      mobileDescription: "Skapa och hämta streckkoder lokalt.",
      guideTitle: "Skapa en lättläst streckkod",
      guideBody:
        "Välj krävt format, ange data och behåll frizonen. EAN, UPC och ITF-14 kan beräkna kontrollsiffran; prova utskriften i slutlig storlek och på rätt material.",
      safetyTitle: "Validering är inte registrering",
      safetyBody:
        "Giltigt format och kontrollsiffra bevisar inte GS1-tilldelning, ägarskap eller registrering hos återförsäljare.",
      faqs: [
        {
          q: "Vad är en kontrollsiffra?",
          a: "Den sista siffran beräknas från de föregående och kan läggas till eller kontrolleras.",
        },
        {
          q: "Varför prova utskriften?",
          a: "Skannern behöver fritt utrymme och verklig utskrift kan skilja sig från skärmen.",
        },
        {
          q: "Är en giltig kod GS1-registrerad?",
          a: "Nej; formatvalidering bekräftar inte tilldelning eller ägarskap.",
        },
      ],
    },
    w: {
      name: "Lösenordsgenerator",
      summary: "Skapa långa, unika slumpmässiga lösenord lokalt.",
      terms: ["lösenordsgenerator", "slumpmässigt lösenord", "starkt lösenord"],
      description:
        "Generera lokalt med Web Crypto och välj längd och tillåtna tecken.",
      mobileDescription:
        "Skapa ett långt slumpmässigt lösenord på den här fliken.",
      guideTitle: "Prioritera längd och unik användning",
      guideBody:
        "Använd olika slumpmässiga lösenord för varje konto och så lång längd som webbplatsen tillåter. Teckentyper är kompatibilitetsval; lagra viktiga lösenord i en betrodd hanterare.",
      safetyTitle: "Lokal generering kräver ändå omsorg",
      safetyBody:
        "Lösenordet skickas eller sparas inte, men kopiering placerar det i urklipp som andra appar eller historik kan läsa.",
      faqs: [
        {
          q: "Hur genereras det?",
          a: "Webbläsaren använder kryptografiskt stark slump från Web Crypto utan serveröverföring.",
        },
        {
          q: "Garanterar symboler säkerhet?",
          a: "Nej. Längd, unik användning, lagring och andra skydd är också viktiga.",
        },
        {
          q: "Vad betyder entropin?",
          a: "En uppskattning av slumputrymmet, inte ett löfte om knäcktid eller absolut skydd.",
        },
      ],
    },
    labels: {
      b: [
        "Format",
        "Värde",
        "Rensa",
        "Förhandsvisning",
        "Utseende",
        "Bredd",
        "Höjd",
        "Frizon",
        "Visa värde",
      ],
      w: [
        "Genererat lösenord",
        "Kopiera lösenord",
        "Generera igen",
        "Alternativ",
        "Längd",
        "Teckentyper",
        "Symboler",
        "Uteslut tvetydiga tecken",
        "Uppskattad styrka",
      ],
      be: [
        "Använd bara siffror för detta format.",
        "Värdet innehåller ett tecken som formatet inte stöder.",
        "Använd det antal siffror som formatet kräver.",
        "Den angivna kontrollsiffran är ogiltig.",
        "Värdet är för långt för det valda formatet.",
        "Välj en storlek eller marginal som stöds.",
        "Använd en sexsiffrig hexadecimal färg.",
        "Öka kontrasten mellan streck och bakgrund.",
        "Streckkoden kunde inte skapas.",
        "Streckkodsfilen kunde inte hämtas.",
      ],
      wl: ["Begränsad", "Måttlig", "Stark", "Mycket stark"],
      wh: [
        "Använd ett längre, unikt lösenord när webbplatsen tillåter det.",
        "Mer längd är lämpligt för viktiga konton.",
        "Stort slumputrymme; återanvänd inte lösenordet.",
        "Mycket stort slumputrymme; säker hantering är fortfarande viktig.",
      ],
      we: [
        "Välj en heltalslängd mellan {min} och {max}.",
        "Välj minst en teckentyp.",
        "Säker slump från webbläsaren är inte tillgänglig här.",
        "Lösenordet kunde inte genereras.",
      ],
      entropy: [
        "Cirka {bits} bitars entropi i slumputrymmet",
        "Detta är en uppskattning; verkligt skydd beror även på unik användning, lagring och tjänst.",
      ],
    },
  }),
  cs: quick({
    b: {
      name: "Generátor čárových kódů",
      summary: "Vytvářejte v prohlížeči kódy pro produkty, sklad a dopravu.",
      terms: ["generátor čárových kódů", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Místně vytvořte Code 128, EAN, UPC, Code 39 a ITF-14 a stáhněte PNG nebo SVG.",
      mobileDescription: "Vytvářejte a stahujte čárové kódy místně.",
      guideTitle: "Vytvořte spolehlivě čitelný kód",
      guideBody:
        "Zvolte požadovaný formát, zadejte data a zachovejte ochrannou zónu. EAN, UPC a ITF-14 umí dopočítat kontrolní číslici; výtisk otestujte ve finální velikosti a na cílovém materiálu.",
      safetyTitle: "Ověření není registrace",
      safetyBody:
        "Platný formát a kontrolní číslice nedokládají přidělení GS1, vlastnictví čísla ani registraci u prodejce.",
      faqs: [
        {
          q: "Co je kontrolní číslice?",
          a: "Poslední číslice se počítá z předchozích a lze ji doplnit nebo ověřit.",
        },
        {
          q: "Proč testovat tisk?",
          a: "Skener potřebuje volný okraj a skutečný tisk se může lišit od obrazovky.",
        },
        {
          q: "Je platný kód registrovaný u GS1?",
          a: "Ne; ověření formátu nepotvrzuje přidělení ani vlastnictví.",
        },
      ],
    },
    w: {
      name: "Generátor hesel",
      summary: "Vytvářejte místně dlouhá, jedinečná náhodná hesla.",
      terms: ["generátor hesel", "náhodné heslo", "silné heslo"],
      description:
        "Generujte místně pomocí Web Crypto a zvolte délku a povolené znaky.",
      mobileDescription: "Vytvořte dlouhé náhodné heslo v této kartě.",
      guideTitle: "Upřednostněte délku a jedinečnost",
      guideBody:
        "Pro každý účet použijte jiné náhodné heslo a co největší povolenou délku. Typy znaků jsou volby kompatibility; hesla ukládejte v důvěryhodném správci.",
      safetyTitle: "I místní generování vyžaduje péči",
      safetyBody:
        "Heslo se neodesílá ani neukládá, ale kopie je ve schránce, kterou mohou číst jiné aplikace nebo historie.",
      faqs: [
        {
          q: "Jak se heslo generuje?",
          a: "Prohlížeč používá kryptograficky silnou náhodnost Web Crypto bez odeslání serveru.",
        },
        {
          q: "Zaručují symboly bezpečí?",
          a: "Ne. Důležitá je také délka, jedinečnost, uložení a další ochrana.",
        },
        {
          q: "Co znamená entropie?",
          a: "Jde o odhad náhodného prostoru, nikoli slib doby prolomení či absolutní záruku.",
        },
      ],
    },
    labels: {
      b: [
        "Formát",
        "Hodnota",
        "Vymazat",
        "Náhled",
        "Vzhled",
        "Šířka",
        "Výška",
        "Ochranná zóna",
        "Zobrazit hodnotu",
      ],
      w: [
        "Vygenerované heslo",
        "Kopírovat heslo",
        "Generovat znovu",
        "Možnosti",
        "Délka",
        "Typy znaků",
        "Symboly",
        "Vyloučit nejednoznačné znaky",
        "Odhadovaná síla",
      ],
      be: [
        "Pro tento formát použijte pouze číslice.",
        "Hodnota obsahuje znak, který formát nepodporuje.",
        "Použijte požadovaný počet číslic.",
        "Zadaná kontrolní číslice není platná.",
        "Hodnota je pro zvolený formát příliš dlouhá.",
        "Zvolte podporovanou velikost nebo okraj.",
        "Použijte šestimístnou hexadecimální barvu.",
        "Zvyšte kontrast mezi čárami a pozadím.",
        "Čárový kód se nepodařilo vytvořit.",
        "Soubor čárového kódu se nepodařilo stáhnout.",
      ],
      wl: ["Omezená", "Střední", "Silná", "Velmi silná"],
      wh: [
        "Pokud to web dovolí, použijte delší jedinečné heslo.",
        "Pro důležité účty je vhodná větší délka.",
        "Velký náhodný prostor; heslo znovu nepoužívejte.",
        "Velmi velký náhodný prostor; bezpečné zacházení je stále důležité.",
      ],
      we: [
        "Zvolte celočíselnou délku od {min} do {max}.",
        "Vyberte alespoň jeden typ znaků.",
        "Bezpečná náhodnost prohlížeče zde není dostupná.",
        "Heslo se nepodařilo vygenerovat.",
      ],
      entropy: [
        "Přibližně {bits} bitů entropie náhodného prostoru",
        "Jde o odhad; skutečná ochrana závisí také na jedinečnosti, uložení a službě.",
      ],
    },
  }),
  pl: quick({
    b: {
      name: "Generator kodów kreskowych",
      summary: "Twórz w przeglądarce kody dla produktów, magazynu i wysyłki.",
      terms: ["generator kodów kreskowych", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Twórz lokalnie Code 128, EAN, UPC, Code 39 i ITF-14 oraz pobieraj PNG lub SVG.",
      mobileDescription: "Twórz i pobieraj kody kreskowe lokalnie.",
      guideTitle: "Utwórz kod łatwy do skanowania",
      guideBody:
        "Wybierz wymagany format, wpisz dane i zachowaj cichą strefę. EAN, UPC i ITF-14 mogą obliczyć cyfrę kontrolną; przetestuj wydruk w końcowym rozmiarze i na docelowym materiale.",
      safetyTitle: "Walidacja nie jest rejestracją",
      safetyBody:
        "Poprawny format i cyfra nie dowodzą przydziału GS1, własności numeru ani rejestracji u sprzedawcy.",
      faqs: [
        {
          q: "Czym jest cyfra kontrolna?",
          a: "To ostatnia cyfra obliczana z poprzednich; można ją dodać lub zweryfikować.",
        },
        {
          q: "Dlaczego testować wydruk?",
          a: "Skaner potrzebuje wolnego marginesu, a wydruk może różnić się od ekranu.",
        },
        {
          q: "Czy poprawny kod jest zarejestrowany w GS1?",
          a: "Nie; walidacja formatu nie potwierdza przydziału ani własności.",
        },
      ],
    },
    w: {
      name: "Generator haseł",
      summary: "Twórz lokalnie długie, unikalne losowe hasła.",
      terms: ["generator haseł", "losowe hasło", "silne hasło"],
      description:
        "Generuj lokalnie przez Web Crypto i wybierz długość oraz dozwolone znaki.",
      mobileDescription: "Utwórz długie losowe hasło w tej karcie.",
      guideTitle: "Stawiaj na długość i unikalność",
      guideBody:
        "Dla każdego konta używaj innego losowego hasła i maksymalnej obsługiwanej długości. Typy znaków służą zgodności; przechowuj hasła w zaufanym menedżerze.",
      safetyTitle: "Lokalne generowanie też wymaga ostrożności",
      safetyBody:
        "Hasło nie jest wysyłane ani zapisywane, lecz kopiowanie umieszcza je w schowku, który mogą czytać inne aplikacje lub historia.",
      faqs: [
        {
          q: "Jak powstaje hasło?",
          a: "Przeglądarka używa kryptograficznie silnej losowości Web Crypto bez wysyłania na serwer.",
        },
        {
          q: "Czy symbole gwarantują bezpieczeństwo?",
          a: "Nie. Liczą się też długość, unikalność, przechowywanie i inne zabezpieczenia.",
        },
        {
          q: "Co oznacza entropia?",
          a: "To szacunek przestrzeni losowej, a nie obietnica czasu złamania ani absolutna gwarancja.",
        },
      ],
    },
    labels: {
      b: [
        "Format",
        "Wartość",
        "Wyczyść",
        "Podgląd",
        "Wygląd",
        "Szerokość",
        "Wysokość",
        "Cicha strefa",
        "Pokaż wartość",
      ],
      w: [
        "Wygenerowane hasło",
        "Kopiuj hasło",
        "Wygeneruj ponownie",
        "Opcje",
        "Długość",
        "Typy znaków",
        "Symbole",
        "Wyklucz mylące znaki",
        "Szacowana siła",
      ],
      be: [
        "W tym formacie używaj tylko cyfr.",
        "Wartość zawiera znak nieobsługiwany przez format.",
        "Wprowadź wymaganą liczbę cyfr.",
        "Podana cyfra kontrolna jest nieprawidłowa.",
        "Wartość jest zbyt długa dla wybranego formatu.",
        "Wybierz obsługiwany rozmiar lub margines.",
        "Użyj sześciocyfrowego koloru szesnastkowego.",
        "Zwiększ kontrast między kreskami a tłem.",
        "Nie udało się utworzyć kodu kreskowego.",
        "Nie udało się pobrać pliku kodu kreskowego.",
      ],
      wl: ["Ograniczona", "Umiarkowana", "Silna", "Bardzo silna"],
      wh: [
        "Jeśli witryna pozwala, użyj dłuższego, unikalnego hasła.",
        "Dla ważnych kont warto wybrać większą długość.",
        "Duża przestrzeń losowa; nie używaj tego hasła ponownie.",
        "Bardzo duża przestrzeń losowa; nadal obchodź się z hasłem ostrożnie.",
      ],
      we: [
        "Wybierz całkowitą długość od {min} do {max}.",
        "Wybierz co najmniej jeden typ znaków.",
        "Bezpieczna losowość przeglądarki nie jest tutaj dostępna.",
        "Nie udało się wygenerować hasła.",
      ],
      entropy: [
        "Około {bits} bitów entropii przestrzeni losowej",
        "To tylko szacunek; rzeczywista ochrona zależy też od unikalności, przechowywania i usługi.",
      ],
    },
  }),
  da: quick({
    b: {
      name: "Stregkodegenerator",
      summary: "Opret stregkoder til varer, lager og forsendelse i browseren.",
      terms: ["stregkodegenerator", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Opret Code 128, EAN, UPC, Code 39 og ITF-14 lokalt, og hent PNG eller SVG.",
      mobileDescription: "Opret og hent stregkoder lokalt.",
      guideTitle: "Opret en stregkode der kan scannes",
      guideBody:
        "Vælg det krævede format, indtast data og behold frizonen. EAN, UPC og ITF-14 kan beregne kontrolcifret; test udskriften i endelig størrelse og på det valgte materiale.",
      safetyTitle: "Validering er ikke registrering",
      safetyBody:
        "Gyldigt format og kontrolciffer beviser ikke GS1-tildeling, ejerskab eller registrering hos en forhandler.",
      faqs: [
        {
          q: "Hvad er et kontrolciffer?",
          a: "Det sidste ciffer beregnes ud fra de foregående og kan tilføjes eller kontrolleres.",
        },
        {
          q: "Hvorfor teste udskriften?",
          a: "Scanneren kræver frit område, og en udskrift kan afvige fra skærmen.",
        },
        {
          q: "Er en gyldig kode GS1-registreret?",
          a: "Nej; formatkontrol bekræfter ikke tildeling eller ejerskab.",
        },
      ],
    },
    w: {
      name: "Adgangskodegenerator",
      summary: "Opret lange, unikke tilfældige adgangskoder lokalt.",
      terms: [
        "adgangskodegenerator",
        "tilfældig adgangskode",
        "stærk adgangskode",
      ],
      description:
        "Generer lokalt med Web Crypto, og vælg længde og tilladte tegn.",
      mobileDescription: "Opret en lang tilfældig adgangskode i denne fane.",
      guideTitle: "Prioriter længde og unik brug",
      guideBody:
        "Brug en forskellig tilfældig adgangskode til hver konto og så lang en kode som muligt. Tegntyper er kompatibilitetsvalg; gem koder i en betroet manager.",
      safetyTitle: "Lokal generering kræver stadig omtanke",
      safetyBody:
        "Koden sendes eller gemmes ikke, men kopiering lægger den i udklipsholderen, som andre apps eller historik kan læse.",
      faqs: [
        {
          q: "Hvordan genereres den?",
          a: "Browseren bruger kryptografisk stærk tilfældighed fra Web Crypto uden serveroverførsel.",
        },
        {
          q: "Garanterer symboler sikkerhed?",
          a: "Nej. Længde, unik brug, opbevaring og andre værn betyder også noget.",
        },
        {
          q: "Hvad betyder entropien?",
          a: "Et skøn over tilfældighedsrummet, ikke et løfte om knæktid eller absolut beskyttelse.",
        },
      ],
    },
    labels: {
      b: [
        "Format",
        "Værdi",
        "Ryd",
        "Forhåndsvisning",
        "Udseende",
        "Bredde",
        "Højde",
        "Frizone",
        "Vis værdi",
      ],
      w: [
        "Genereret adgangskode",
        "Kopiér adgangskode",
        "Generer igen",
        "Indstillinger",
        "Længde",
        "Tegntyper",
        "Symboler",
        "Udeluk tvetydige tegn",
        "Anslået styrke",
      ],
      be: [
        "Brug kun cifre til dette format.",
        "Værdien indeholder et tegn, som formatet ikke understøtter.",
        "Brug det antal cifre, formatet kræver.",
        "Det angivne kontrolciffer er ugyldigt.",
        "Værdien er for lang til det valgte format.",
        "Vælg en understøttet størrelse eller margen.",
        "Brug en sekscifret hexadecimal farve.",
        "Øg kontrasten mellem streger og baggrund.",
        "Stregkoden kunne ikke oprettes.",
        "Stregkodefilen kunne ikke hentes.",
      ],
      wl: ["Begrænset", "Moderat", "Stærk", "Meget stærk"],
      wh: [
        "Brug en længere, unik adgangskode, når webstedet tillader det.",
        "Mere længde er passende til vigtige konti.",
        "Stort tilfældighedsrum; genbrug ikke adgangskoden.",
        "Meget stort tilfældighedsrum; sikker håndtering er stadig vigtig.",
      ],
      we: [
        "Vælg en heltalslængde mellem {min} og {max}.",
        "Vælg mindst én tegntype.",
        "Sikker tilfældighed fra browseren er ikke tilgængelig her.",
        "Adgangskoden kunne ikke genereres.",
      ],
      entropy: [
        "Omtrent {bits} bit entropi i tilfældighedsrummet",
        "Det er et skøn; reel beskyttelse afhænger også af unik brug, lagring og tjeneste.",
      ],
    },
  }),
  no: quick({
    b: {
      name: "Strekkodegenerator",
      summary: "Lag strekkoder for varer, lager og frakt i nettleseren.",
      terms: ["strekkodegenerator", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Lag Code 128, EAN, UPC, Code 39 og ITF-14 lokalt og last ned PNG eller SVG.",
      mobileDescription: "Lag og last ned strekkoder lokalt.",
      guideTitle: "Lag en strekkode som kan skannes",
      guideBody:
        "Velg påkrevd format, skriv inn data og behold frisonen. EAN, UPC og ITF-14 kan beregne kontrollsifferet; test utskriften i endelig størrelse og materiale.",
      safetyTitle: "Validering er ikke registrering",
      safetyBody:
        "Gyldig format og kontrollsiffer beviser ikke GS1-tildeling, eierskap eller registrering hos forhandler.",
      faqs: [
        {
          q: "Hva er et kontrollsiffer?",
          a: "Det siste sifferet beregnes fra de foregående og kan legges til eller kontrolleres.",
        },
        {
          q: "Hvorfor teste utskriften?",
          a: "Skanneren trenger fri plass, og utskrift kan avvike fra skjermen.",
        },
        {
          q: "Er en gyldig kode GS1-registrert?",
          a: "Nei; formatkontroll bekrefter ikke tildeling eller eierskap.",
        },
      ],
    },
    w: {
      name: "Passordgenerator",
      summary: "Lag lange, unike tilfeldige passord lokalt.",
      terms: ["passordgenerator", "tilfeldig passord", "sterkt passord"],
      description:
        "Generer lokalt med Web Crypto og velg lengde og tillatte tegn.",
      mobileDescription: "Lag et langt tilfeldig passord i denne fanen.",
      guideTitle: "Prioriter lengde og unik bruk",
      guideBody:
        "Bruk et forskjellig tilfeldig passord for hver konto og så lang lengde som mulig. Tegntyper er kompatibilitetsvalg; lagre passord i en betrodd behandler.",
      safetyTitle: "Lokal generering krever fortsatt omtanke",
      safetyBody:
        "Passordet sendes eller lagres ikke, men kopiering legger det på utklippstavlen som andre apper eller historikk kan lese.",
      faqs: [
        {
          q: "Hvordan genereres det?",
          a: "Nettleseren bruker kryptografisk sterk tilfeldighet fra Web Crypto uten serveroverføring.",
        },
        {
          q: "Garanterer symboler sikkerhet?",
          a: "Nei. Lengde, unik bruk, lagring og andre vern teller også.",
        },
        {
          q: "Hva betyr entropien?",
          a: "Et anslag for tilfeldighetsrommet, ikke et løfte om knekketid eller absolutt vern.",
        },
      ],
    },
    labels: {
      b: [
        "Format",
        "Verdi",
        "Tøm",
        "Forhåndsvisning",
        "Utseende",
        "Bredde",
        "Høyde",
        "Frisone",
        "Vis verdi",
      ],
      w: [
        "Generert passord",
        "Kopier passord",
        "Generer på nytt",
        "Alternativer",
        "Lengde",
        "Tegntyper",
        "Symboler",
        "Utelat tvetydige tegn",
        "Anslått styrke",
      ],
      be: [
        "Bruk bare sifre for dette formatet.",
        "Verdien inneholder et tegn som formatet ikke støtter.",
        "Bruk antallet sifre som formatet krever.",
        "Det oppgitte kontrollsifferet er ugyldig.",
        "Verdien er for lang for det valgte formatet.",
        "Velg en støttet størrelse eller marg.",
        "Bruk en sekssifret heksadesimal farge.",
        "Øk kontrasten mellom streker og bakgrunn.",
        "Strekkoden kunne ikke opprettes.",
        "Strekkodefilen kunne ikke lastes ned.",
      ],
      wl: ["Begrenset", "Moderat", "Sterkt", "Svært sterkt"],
      wh: [
        "Bruk et lengre, unikt passord når nettstedet tillater det.",
        "Mer lengde passer for viktige kontoer.",
        "Stort tilfeldighetsrom; ikke gjenbruk passordet.",
        "Svært stort tilfeldighetsrom; trygg håndtering er fortsatt viktig.",
      ],
      we: [
        "Velg en heltallslengde mellom {min} og {max}.",
        "Velg minst én tegntype.",
        "Sikker tilfeldighet fra nettleseren er ikke tilgjengelig her.",
        "Passordet kunne ikke genereres.",
      ],
      entropy: [
        "Omtrent {bits} bit entropi i tilfeldighetsrommet",
        "Dette er et anslag; reell beskyttelse avhenger også av unik bruk, lagring og tjeneste.",
      ],
    },
  }),
  tr: quick({
    b: {
      name: "Barkod oluşturucu",
      summary: "Ürün, stok ve kargo barkodlarını tarayıcıda oluşturun.",
      terms: ["barkod oluşturucu", "EAN-13", "UPC-A", "Code 128"],
      description:
        "Code 128, EAN, UPC, Code 39 ve ITF-14 barkodlarını yerel olarak oluşturup PNG veya SVG indirin.",
      mobileDescription: "Barkodları yerel olarak oluşturup indirin.",
      guideTitle: "Kolay taranan barkod oluşturun",
      guideBody:
        "Gerekli biçimi seçin, veriyi girin ve sessiz bölgeyi koruyun. EAN, UPC ve ITF-14 kontrol basamağını hesaplayabilir; baskıyı son boyut ve malzemede deneyin.",
      safetyTitle: "Doğrulama kayıt değildir",
      safetyBody:
        "Geçerli biçim ve kontrol basamağı GS1 tahsisini, numara sahipliğini veya mağaza kaydını kanıtlamaz.",
      faqs: [
        {
          q: "Kontrol basamağı nedir?",
          a: "Önceki basamaklardan hesaplanan son basamaktır; eklenebilir veya doğrulanabilir.",
        },
        {
          q: "Baskı neden test edilmeli?",
          a: "Tarayıcı boş alana ihtiyaç duyar ve gerçek baskı ekrandan farklı olabilir.",
        },
        {
          q: "Geçerli kod GS1 kayıtlı mıdır?",
          a: "Hayır; biçim doğrulaması tahsis veya sahipliği onaylamaz.",
        },
      ],
    },
    w: {
      name: "Parola oluşturucu",
      summary: "Uzun, benzersiz rastgele parolaları yerel olarak oluşturun.",
      terms: ["parola oluşturucu", "rastgele parola", "güçlü parola"],
      description:
        "Web Crypto ile yerel oluşturun; uzunluk ve izin verilen karakterleri seçin.",
      mobileDescription: "Bu sekmede uzun bir rastgele parola oluşturun.",
      guideTitle: "Uzunluk ve benzersizliği öne alın",
      guideBody:
        "Her hesapta farklı rastgele parola ve sitenin izin verdiği uzunluğu kullanın. Karakter türleri uyumluluk seçenekleridir; parolaları güvenilir bir yöneticide saklayın.",
      safetyTitle: "Yerel üretim de dikkat gerektirir",
      safetyBody:
        "Parola gönderilmez veya saklanmaz; ancak kopyalama, diğer uygulamaların ya da geçmişin okuyabileceği panoya koyar.",
      faqs: [
        {
          q: "Nasıl oluşturulur?",
          a: "Tarayıcı, sunucuya göndermeden Web Crypto'nun kriptografik güçlü rastgeleliğini kullanır.",
        },
        {
          q: "Simgeler güvenliği garanti eder mi?",
          a: "Hayır. Uzunluk, benzersizlik, saklama ve diğer korumalar da önemlidir.",
        },
        {
          q: "Entropi ne demektir?",
          a: "Rastgele uzay tahminidir; kırma süresi sözü veya mutlak garanti değildir.",
        },
      ],
    },
    labels: {
      b: [
        "Biçim",
        "Değer",
        "Temizle",
        "Önizleme",
        "Görünüm",
        "Genişlik",
        "Yükseklik",
        "Sessiz bölge",
        "Değeri göster",
      ],
      w: [
        "Oluşturulan parola",
        "Parolayı kopyala",
        "Yeniden oluştur",
        "Seçenekler",
        "Uzunluk",
        "Karakter türleri",
        "Simgeler",
        "Benzer karakterleri çıkar",
        "Tahmini güç",
      ],
      be: [
        "Bu biçim için yalnızca rakam kullanın.",
        "Değer, biçimin desteklemediği bir karakter içeriyor.",
        "Biçimin gerektirdiği basamak sayısını kullanın.",
        "Girilen kontrol basamağı geçersiz.",
        "Değer seçilen biçim için çok uzun.",
        "Desteklenen bir boyut veya kenar boşluğu seçin.",
        "Altı basamaklı onaltılık renk kullanın.",
        "Çubuklarla arka plan arasındaki karşıtlığı artırın.",
        "Barkod oluşturulamadı.",
        "Barkod dosyası indirilemedi.",
      ],
      wl: ["Sınırlı", "Orta", "Güçlü", "Çok güçlü"],
      wh: [
        "Site izin veriyorsa daha uzun ve benzersiz bir parola kullanın.",
        "Önemli hesaplarda daha fazla uzunluk tercih edin.",
        "Geniş rastgele alan; bu parolayı yeniden kullanmayın.",
        "Çok geniş rastgele alan; güvenli kullanım yine de önemlidir.",
      ],
      we: [
        "{min} ile {max} arasında tam sayı uzunluk seçin.",
        "En az bir karakter türü seçin.",
        "Güvenli tarayıcı rastgeleliği burada kullanılamıyor.",
        "Parola oluşturulamadı.",
      ],
      entropy: [
        "Rastgele alanda yaklaşık {bits} bit entropi",
        "Bu bir tahmindir; gerçek koruma benzersiz kullanıma, saklamaya ve hizmete de bağlıdır.",
      ],
    },
  }),
  ar: quick({
    b: {
      name: "مولد الباركود",
      summary: "أنشئ رموزًا للمنتجات والمخزون والشحن داخل المتصفح.",
      terms: ["مولد باركود", "EAN-13", "UPC-A", "Code 128"],
      description:
        "أنشئ Code 128 وEAN وUPC وCode 39 وITF-14 محليًا ونزّل PNG أو SVG.",
      mobileDescription: "أنشئ رموز الباركود ونزّلها محليًا.",
      guideTitle: "أنشئ باركودًا سهل المسح",
      guideBody:
        "اختر التنسيق المطلوب وأدخل البيانات وحافظ على المنطقة الهادئة. يمكن لـ EAN وUPC وITF-14 حساب رقم التحقق؛ اختبر الطباعة بالحجم والخامة النهائيين.",
      safetyTitle: "التحقق لا يعني التسجيل",
      safetyBody:
        "صحة التنسيق ورقم التحقق لا تثبت تخصيص GS1 أو ملكية الرقم أو تسجيله لدى متجر.",
      faqs: [
        {
          q: "ما رقم التحقق؟",
          a: "هو الرقم الأخير المحسوب من الأرقام السابقة، ويمكن إضافته أو التحقق منه.",
        },
        {
          q: "لماذا أختبر الطباعة؟",
          a: "يحتاج الماسح إلى مساحة فارغة وقد تختلف الطباعة الفعلية عن الشاشة.",
        },
        {
          q: "هل الباركود الصحيح مسجل لدى GS1؟",
          a: "لا؛ التحقق من التنسيق لا يؤكد التخصيص أو الملكية.",
        },
      ],
    },
    w: {
      name: "مولد كلمات المرور",
      summary: "أنشئ كلمات مرور عشوائية طويلة وفريدة محليًا.",
      terms: ["مولد كلمات مرور", "كلمة مرور عشوائية", "كلمة مرور قوية"],
      description:
        "أنشئ محليًا عبر Web Crypto واختر الطول والمحارف المسموح بها.",
      mobileDescription: "أنشئ كلمة مرور عشوائية طويلة في علامة التبويب هذه.",
      guideTitle: "أعط الأولوية للطول والتفرد",
      guideBody:
        "استخدم كلمة عشوائية مختلفة لكل حساب وبأطول طول يسمح به الموقع. أنواع المحارف خيارات توافق؛ واحفظ الكلمات المهمة في مدير موثوق.",
      safetyTitle: "التوليد المحلي يحتاج إلى عناية",
      safetyBody:
        "لا تُرسل كلمة المرور ولا تُحفظ، لكن نسخها يضعها في الحافظة التي قد تقرؤها تطبيقات أخرى أو سجل الحافظة.",
      faqs: [
        {
          q: "كيف تُنشأ كلمة المرور؟",
          a: "يستخدم المتصفح عشوائية قوية تشفيريًا من Web Crypto من دون إرسالها إلى خادم.",
        },
        {
          q: "هل الرموز تضمن الأمان؟",
          a: "لا. الطول والتفرد والتخزين والحماية الأخرى مهمة أيضًا.",
        },
        {
          q: "ماذا يعني تقدير الإنتروبيا؟",
          a: "هو تقدير لحجم المجال العشوائي، وليس وعدًا بزمن الاختراق أو ضمانًا مطلقًا.",
        },
      ],
    },
    labels: {
      b: [
        "التنسيق",
        "القيمة",
        "مسح",
        "معاينة",
        "المظهر",
        "العرض",
        "الارتفاع",
        "المنطقة الهادئة",
        "إظهار القيمة",
      ],
      w: [
        "كلمة المرور المنشأة",
        "نسخ كلمة المرور",
        "إنشاء جديد",
        "الخيارات",
        "الطول",
        "أنواع المحارف",
        "الرموز",
        "استبعاد المحارف المتشابهة",
        "القوة المقدرة",
      ],
      be: [
        "استخدم الأرقام فقط لهذا التنسيق.",
        "تحتوي القيمة على محرف لا يدعمه التنسيق.",
        "استخدم عدد الأرقام المطلوب لهذا التنسيق.",
        "رقم التحقق المُدخل غير صالح.",
        "القيمة أطول مما يسمح به التنسيق المحدد.",
        "اختر حجمًا أو هامشًا مدعومًا.",
        "استخدم لونًا سداسيًا من ست خانات.",
        "زِد التباين بين الأشرطة والخلفية.",
        "تعذر إنشاء الباركود.",
        "تعذر تنزيل ملف الباركود.",
      ],
      wl: ["محدودة", "متوسطة", "قوية", "قوية جدًا"],
      wh: [
        "استخدم كلمة مرور أطول وفريدة عندما يسمح الموقع.",
        "الطول الأكبر أنسب للحسابات المهمة.",
        "مجال عشوائي واسع؛ لا تُعد استخدام كلمة المرور.",
        "مجال عشوائي واسع جدًا؛ تبقى المعالجة الآمنة مهمة.",
      ],
      we: [
        "اختر طولًا صحيحًا بين {min} و{max}.",
        "اختر نوع محارف واحدًا على الأقل.",
        "العشوائية الآمنة في المتصفح غير متاحة هنا.",
        "تعذر إنشاء كلمة المرور.",
      ],
      entropy: [
        "نحو {bits} بت من إنتروبيا المجال العشوائي",
        "هذا تقدير فقط؛ تعتمد الحماية الفعلية أيضًا على التفرد والتخزين والخدمة.",
      ],
    },
  }),
} satisfies Record<Locale, LocaleSeed>;

export const generatorToolLocales = {
  en: build(seeds.en),
  ko: build(seeds.ko),
  es: build(seeds.es),
  de: build(seeds.de),
  ja: build(seeds.ja),
  fr: build(seeds.fr),
  "pt-BR": build(seeds["pt-BR"]),
  it: build(seeds.it),
  nl: build(seeds.nl),
  sv: build(seeds.sv),
  cs: build(seeds.cs),
  pl: build(seeds.pl),
  da: build(seeds.da),
  no: build(seeds.no),
  ar: build(seeds.ar),
  "zh-TW": build(seeds["zh-TW"]),
  tr: build(seeds.tr),
} satisfies Record<Locale, GeneratorToolLocale>;
