import type { Locale } from "./site";
import { commonToolCopy, type CommonToolCopy } from "./common-tool-i18n";

type Faq = { q: string; a: string };

export interface PreviewToolCopy {
  common: CommonToolCopy;
  word: {
    title: string;
    description: string;
    inputLabel: string;
    words: string;
    characters: string;
    noWhitespace: string;
    lines: string;
    paragraphs: string;
    completed: string;
    approximate: string;
    tooLarge: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  json: {
    title: string;
    description: string;
    inputLabel: string;
    outputLabel: string;
    placeholder: string;
    outputPlaceholder: string;
    openFile: string;
    tooLarge: string;
    manualRequired: string;
    format: string;
    validate: string;
    validateHelpLabel: string;
    validateHelp: string;
    minify: string;
    minifyHelpLabel: string;
    minifyHelp: string;
    indent: string;
    twoSpaces: string;
    fourSpaces: string;
    tabs: string;
    valid: string;
    invalidAt: string;
    duplicate: string;
    bom: string;
    errorMessages: Record<string, string>;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  time: {
    title: string;
    description: string;
    timestampMode: string;
    dateMode: string;
    timestampLabel: string;
    dateLabel: string;
    datePlaceholder: string;
    pickDate: string;
    unit: string;
    auto: string;
    seconds: string;
    milliseconds: string;
    zoneMode: string;
    utc: string;
    local: string;
    selected: string;
    zoneLabel: string;
    zonePlaceholder: string;
    popularZones: Array<{ value: string; label: string }>;
    offsetLabel: string;
    disambiguation: string;
    reject: string;
    earlier: string;
    later: string;
    now: string;
    convert: string;
    instant: string;
    zoned: string;
    unixSeconds: string;
    unixMilliseconds: string;
    invalid: string;
    ambiguousUnit: string;
    converted: string;
    nonexistentTime: string;
    repeatedTime: string;
    y2038: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  textCompare: {
    title: string;
    description: string;
    originalLabel: string;
    changedLabel: string;
    originalPlaceholder: string;
    changedPlaceholder: string;
    compare: string;
    swap: string;
    results: string;
    empty: string;
    tooLarge: string;
    tooManyLines: string;
    tooComplex: string;
    stale: string;
    complete: string;
    identical: string;
    approximate: string;
    inlineLimited: string;
    additions: string;
    deletions: string;
    changes: string;
    previousChange: string;
    nextChange: string;
    expandUnchanged: string;
    whitespaceChange: string;
    lineEndingChange: string;
    unchangedRow: string;
    addedRow: string;
    removedRow: string;
    changedRow: string;
    originalLine: string;
    changedLine: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
  caseConverter: {
    title: string;
    description: string;
    inputLabel: string;
    outputLabel: string;
    placeholder: string;
    outputPlaceholder: string;
    modeLabel: string;
    upper: string;
    lower: string;
    sentence: string;
    capitalizeWords: string;
    converted: string;
    noChange: string;
    outdated: string;
    tooLarge: string;
    guideTitle: string;
    guideBody: string;
    faqs: Faq[];
  };
}

export const previewCopy: Record<Locale, PreviewToolCopy> = {
  en: {
    common: commonToolCopy.en,
    word: {
      title: "Word & character counter",
      description:
        "Count words, characters, characters without whitespace, lines, and paragraphs without uploading your text.",
      inputLabel: "Text",
      words: "Words",
      characters: "Characters",
      noWhitespace: "Characters without whitespace",
      lines: "Lines",
      paragraphs: "Paragraphs",
      completed: "Count complete",
      approximate:
        "This browser lacks Intl.Segmenter, so character and word counts are approximate.",
      tooLarge:
        "Input exceeds the 1 MB limit. Shorten or clear the text to continue.",
      guideTitle: "What is counted",
      guideBody:
        "In supported browsers, characters are counted as user-perceived grapheme clusters, so an emoji or a letter with combining marks usually counts as one. The count without whitespace skips whitespace graphemes in the original text without merging the graphemes on either side. Lines follow line breaks. Visually blank lines, including lines that contain only whitespace, separate paragraphs.",
      faqs: [
        {
          q: "How are words counted?",
          a: "Browsers with Intl.Segmenter use the current page language for word boundaries and count word-like segments. Other browsers show an approximate count.",
        },
        {
          q: "Do emoji count as characters?",
          a: "In supported browsers, an emoji or combined character that appears as one character is counted once.",
        },
      ],
    },
    json: {
      title: "JSON formatter",
      description:
        "Format JSON to make it easier to read, check it for errors, or minify it to one line.",
      inputLabel: "JSON input",
      outputLabel: "Result",
      placeholder: "Paste JSON here…",
      outputPlaceholder: "Formatted or minified JSON appears here.",
      openFile: "Open .json",
      tooLarge: "Input exceeds the 10 MiB limit.",
      manualRequired:
        "Automatic validation paused for this large input. Choose Format, Validate, or Minify.",
      format: "Format",
      validate: "Validate",
      validateHelpLabel: "About Validate",
      validateHelp:
        "Checks whether the input follows RFC 8259 JSON syntax and reports the location and cause of any syntax error. It does not reformat or otherwise change the text.",
      minify: "Minify",
      minifyHelpLabel: "About Minify",
      minifyHelp:
        "Removes optional spaces and line breaks from valid JSON to make it compact. String contents, the original form of numbers, and duplicate object keys are preserved.",
      indent: "Indentation",
      twoSpaces: "2 spaces",
      fourSpaces: "4 spaces",
      tabs: "Tabs",
      valid: "Valid JSON",
      invalidAt: "{message} Line {line}, column {column}.",
      duplicate: "Duplicate key at line {line}, column {column}",
      bom: "UTF-8 BOM removed before processing.",
      errorMessages: {
        InvalidSymbol: "Invalid symbol.",
        InvalidNumberFormat: "Invalid number format.",
        PropertyNameExpected: "A property name is required.",
        ValueExpected: "A value is required.",
        ColonExpected: "A colon is required after the property name.",
        CommaExpected: "A comma is required between items.",
        CloseBraceExpected: "A closing brace is required.",
        CloseBracketExpected: "A closing bracket is required.",
        EndOfFileExpected: "Unexpected content appears after the JSON value.",
        InvalidCommentToken: "Comments are not valid JSON.",
        UnexpectedEndOfComment: "The comment is incomplete.",
        UnexpectedEndOfString: "The string is incomplete.",
        UnexpectedEndOfNumber: "The number is incomplete.",
        InvalidUnicode: "The Unicode escape is invalid.",
        InvalidEscapeCharacter: "The escape sequence is invalid.",
        InvalidCharacter: "This character is not valid here.",
        Unknown: "The JSON is not valid.",
      },
      guideTitle: "JSON rules and number preservation",
      guideBody:
        "Validation follows RFC 8259: comments, trailing commas, and single quotes are reported as errors. Duplicate keys are preserved with a warning, and large numbers keep the exact notation you entered.",
      faqs: [
        {
          q: "Will large numbers change?",
          a: "No. Formatting and minification do not recalculate numbers; they keep the notation you entered, so large numbers are not rounded.",
        },
        {
          q: "Why are duplicate keys reported?",
          a: "Software may handle duplicate object keys differently. PlainTool preserves them and shows a warning instead of silently deleting data.",
        },
        {
          q: "Does the formatter repair invalid JSON?",
          a: "No. Comments, trailing commas, single quotes, and other invalid syntax are reported so you can correct the source deliberately.",
        },
      ],
    },
    time: {
      title: "Unix timestamp converter",
      description:
        "Convert Unix timestamps in seconds or milliseconds to dates and times in a chosen time zone, and back again.",
      timestampMode: "Timestamp to date and time",
      dateMode: "Date and time to timestamp",
      timestampLabel: "Unix timestamp",
      dateLabel: "Date and time",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Choose date and time",
      unit: "Unit",
      auto: "Auto detect",
      seconds: "Seconds",
      milliseconds: "Milliseconds",
      zoneMode: "Time zone",
      utc: "UTC offset",
      local: "Browser time zone",
      selected: "IANA time zone",
      zoneLabel: "City, region, or IANA time zone",
      zonePlaceholder: "Search New York, Asia, or America/New_York",
      popularZones: [
        {
          value: "Asia/Seoul",
          label: "Seoul, South Korea — Asia/Seoul · UTC+09:00",
        },
        {
          value: "America/New_York",
          label: "New York, United States — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, United States — America/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "London, United Kingdom — Europe/London",
        },
        { value: "Europe/Paris", label: "Paris, France — Europe/Paris" },
        { value: "Europe/Madrid", label: "Madrid, Spain — Europe/Madrid" },
        { value: "Asia/Tokyo", label: "Tokyo, Japan — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghai, China — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapore — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "Kolkata, India — Asia/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Australia — Australia/Sydney",
        },
        {
          value: "Pacific/Auckland",
          label: "Auckland, New Zealand — Pacific/Auckland",
        },
      ],
      offsetLabel: "Offset from UTC",
      disambiguation: "Skipped or repeated local time",
      reject: "Show an error",
      earlier: "Use earlier result",
      later: "Use later result",
      now: "Now",
      convert: "Convert",
      instant: "UTC date and time",
      zoned: "Date and time in selected zone",
      unixSeconds: "Unix timestamp (seconds)",
      unixMilliseconds: "Unix timestamp (milliseconds)",
      converted: "Conversion complete",
      invalid:
        "Enter a valid Unix timestamp or an ISO date and time, and check the time zone.",
      ambiguousUnit:
        "11- or 12-digit values are ambiguous. Choose seconds or milliseconds.",
      nonexistentTime:
        "This date and time is skipped in the selected time zone because the clock moves forward. Choose the earlier or later result.",
      repeatedTime:
        "This date and time occurs twice in the selected time zone because the clock moves back. Choose the earlier or later result.",
      y2038: "This value is outside the signed 32-bit Unix time range.",
      guideTitle: "How units and time zones are handled",
      guideBody:
        "Auto detection treats decimals and 1–10-digit integers as seconds, 13-digit integers as milliseconds, and asks you to choose a unit for 11- or 12-digit integers. Enter a local date and time directly or use the picker; seconds and fractional seconds are optional. The browser time zone is used by default. When converting a timestamp, the time zone changes only the displayed local date and time. When converting a local date and time, the time zone determines the Unix value.",
      faqs: [
        {
          q: "How does automatic unit detection work?",
          a: "Decimals and 1–10 digit integers are treated as seconds. Thirteen-digit integers are treated as milliseconds. Choose a unit for 11–12 digit values.",
        },
        {
          q: "Which date format can I enter?",
          a: "Enter a local date and time without a UTC offset, such as 2026-08-29T14:30. Seconds and up to nine fractional digits are optional, or use the picker.",
        },
        {
          q: "How do the time zone options differ?",
          a: "The browser time zone is the default and follows the clock rules configured on your device. Choose UTC offset to use a fixed value such as +00:00 or +09:00. An IANA zone such as America/New_York follows that region's clock-change rules.",
        },
        {
          q: "Can daylight saving time make a Unix timestamp ambiguous?",
          a: "No. A Unix timestamp identifies one instant. Ambiguity arises only when you convert a local date and time in a zone where clocks change: some local times are skipped, while others occur twice. The tool shows an error by default; choose the earlier or later result only if you want it resolved.",
        },
      ],
    },
    textCompare: {
      title: "Text compare",
      description:
        "Compare two texts line by line and highlight additions, removals, and edits without uploading either version.",
      originalLabel: "Original text",
      changedLabel: "Changed text",
      originalPlaceholder: "Paste the original text here…",
      changedPlaceholder: "Paste the changed text here…",
      compare: "Compare",
      swap: "Swap",
      results: "Comparison results",
      empty: "Enter text in at least one side to compare.",
      tooLarge: "Each text must be 1 MiB or smaller.",
      tooManyLines: "The two texts can contain up to 20,000 lines in total.",
      tooComplex:
        "This comparison is too complex to finish safely in the browser. Try shorter texts.",
      stale:
        "The result below is from the previous comparison. Compare again to update it.",
      complete: "Comparison complete",
      identical: "The two texts are identical.",
      approximate:
        "This browser lacks Intl.Segmenter, so inline character highlights are approximate.",
      inlineLimited:
        "Some long edited lines are shown as whole-line changes to keep the comparison responsive.",
      additions: "Added lines: {count}",
      deletions: "Removed lines: {count}",
      changes: "Changed rows: {count}",
      previousChange: "Previous change",
      nextChange: "Next change",
      expandUnchanged: "Show {count} unchanged lines",
      whitespaceChange: "Whitespace changed",
      lineEndingChange: "Line ending changed",
      unchangedRow: "Unchanged line",
      addedRow: "Added line",
      removedRow: "Removed line",
      changedRow: "Changed line",
      originalLine: "Original line {line}",
      changedLine: "Changed line {line}",
      guideTitle: "How the comparison works",
      guideBody:
        "The comparison aligns lines first, then highlights character-level edits inside paired changed lines. Spaces and line-ending-only changes are labeled explicitly. Long unchanged sections stay collapsed until you expand them.",
      faqs: [
        {
          q: "Does PlainTool upload the texts?",
          a: "No. Both texts are compared locally in your browser and are not sent to a server.",
        },
        {
          q: "Are different line endings detected?",
          a: "Yes. Differences between CRLF, LF, and CR line endings are marked even when the visible line text is the same.",
        },
      ],
    },
    caseConverter: {
      title: "Case converter",
      description:
        "Convert text to uppercase, lowercase, sentence case, or capitalized words without uploading it.",
      inputLabel: "Text",
      outputLabel: "Converted text",
      placeholder: "Type or paste text here…",
      outputPlaceholder: "Converted text appears here.",
      modeLabel: "Conversion",
      upper: "UPPERCASE",
      lower: "lowercase",
      sentence: "Sentence case",
      capitalizeWords: "Capitalize words",
      converted: "Conversion complete",
      noChange: "The text already matches this conversion.",
      outdated: "The visible output is from the previous input.",
      tooLarge: "Input exceeds the 1 MB limit.",
      guideTitle: "How each conversion works",
      guideBody:
        "Uppercase and lowercase use Unicode's default case mappings. Sentence case lowercases the text and capitalizes the first cased letter at the start, after a line break, or after . ! ? 。 ！ ？. Capitalize words uppercases the first cased letter of each word while preserving spaces, punctuation, line breaks, apostrophes, hyphens, and underscores.",
      faqs: [
        {
          q: "Is Capitalize words the same as title case?",
          a: "No. It capitalizes every word mechanically and does not apply language-specific title rules for articles, prepositions, names, or abbreviations.",
        },
        {
          q: "Does conversion preserve spacing and line breaks?",
          a: "Yes. The tool changes letter case only and keeps the original spacing, punctuation, and line breaks.",
        },
      ],
    },
  },
  ko: {
    common: commonToolCopy.ko,
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
          a: "중복된 객체 키는 프로그램마다 처리 결과가 다를 수 있습니다. PlainTool은 데이터를 임의로 삭제하지 않고 원문을 보존하면서 경고합니다.",
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
        { value: "America/New_York", label: "뉴욕, 미국 — America/New_York" },
        {
          value: "America/Los_Angeles",
          label: "로스앤젤레스, 미국 — America/Los_Angeles",
        },
        { value: "Europe/London", label: "런던, 영국 — Europe/London" },
        { value: "Europe/Paris", label: "파리, 프랑스 — Europe/Paris" },
        { value: "Europe/Madrid", label: "마드리드, 스페인 — Europe/Madrid" },
        { value: "Asia/Tokyo", label: "도쿄, 일본 — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "상하이, 중국 — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "싱가포르 — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "콜카타, 인도 — Asia/Kolkata" },
        { value: "Australia/Sydney", label: "시드니, 호주 — Australia/Sydney" },
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
        "브라우저에서 안전하게 처리하기에는 비교가 너무 복잡합니다. 텍스트를 줄여 보세요.",
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
  es: {
    common: commonToolCopy.es,
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
          a: "Cada programa puede tratar las claves duplicadas de forma distinta. PlainTool las conserva y muestra un aviso en lugar de borrar datos sin indicarlo.",
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
        { value: "Europe/Paris", label: "París, Francia — Europe/Paris" },
        { value: "Europe/Madrid", label: "Madrid, España — Europe/Madrid" },
        { value: "Asia/Tokyo", label: "Tokio, Japón — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Shanghái, China — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapur — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "Calcuta, India — Asia/Kolkata" },
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
        "La comparación es demasiado compleja para completarla con seguridad en el navegador. Prueba con textos más cortos.",
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
          q: "¿PlainTool sube los textos a un servidor?",
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
};

export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}
