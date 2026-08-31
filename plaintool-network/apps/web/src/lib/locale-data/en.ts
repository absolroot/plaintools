import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/en";

const bundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "English",
    metaTitle: "Base64 Decoder & Encoder — Fast, Private, Online",
    metaDescription:
      "Decode Base64 into text or files and encode text or files online. Supports Base64URL, missing padding, Data URIs, and legacy character encodings.",
    decodeMetaTitle: "Base64 Decoder for Text & Files | AbsolTools",
    encodeMetaTitle: "Base64 Encoder for Text & Files | AbsolTools",
    skipToContent: "Skip to content",
    languageNavLabel: "Language",
    legalNavLabel: "Legal and contact",
    modeLabel: "Conversion mode",
    heading: "Decode Base64 online.",
    subheading:
      "Paste Base64 text or open a file. Standard Base64, Base64URL, missing padding, and Data URI input are handled locally.",
    encodeHeading: "Encode text or files as Base64 online.",
    encodeSubheading:
      "Enter text or open a file. Convert UTF-8 text and binary files to standard Base64 or Base64URL without uploading them.",
    decode: "Decode",
    encode: "Encode",
    inputLabel: "Base64 input",
    outputLabel: "Decoded output",
    encodeInputLabel: "Text or file input",
    encodeOutputLabel: "Base64 output",
    decodePlaceholder: "Example: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Example: Hello, AbsolTools!",
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
      "encode-failed": "The file could not be encoded.",
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
          "AbsolTools provides online tools for text, data, time, and encoding tasks.",
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
  common: {
    preview: "Preview",
    ready: "Ready",
    working: "Working…",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Could not copy the result.",
    processingFailed: "Processing failed. Try again.",
    download: "Download",
    faqTitle: "Frequently asked questions",
    localTitle: "AbsolTools works in your browser.",
    localBody:
      "Your input and results are processed only in this browser. They are not uploaded to or stored on a server.",
  },
  preview: {
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
          a: "Software may handle duplicate object keys differently. AbsolTools preserves them and shows a warning instead of silently deleting data.",
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
        {
          value: "Europe/Paris",
          label: "Paris, France — Europe/Paris",
        },
        {
          value: "Europe/Madrid",
          label: "Madrid, Spain — Europe/Madrid",
        },
        {
          value: "Asia/Tokyo",
          label: "Tokyo, Japan — Asia/Tokyo",
        },
        {
          value: "Asia/Shanghai",
          label: "Shanghai, China — Asia/Shanghai",
        },
        {
          value: "Asia/Singapore",
          label: "Singapore — Asia/Singapore",
        },
        {
          value: "Asia/Kolkata",
          label: "Kolkata, India — Asia/Kolkata",
        },
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
        "This comparison is too complex to process safely. Try shorter texts.",
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
          q: "Does AbsolTools upload the texts?",
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
  examples: {
    wordInput: "Example: AbsolTools counts words and characters online.",
    jsonInput: 'Example: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Example: 1704067200 (seconds) or 1704067200000 (milliseconds).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Example format: 2024-01-01T00:00. Seconds are optional, and you can also use the date picker.",
    timeResult: "Converted value",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 decoder",
      summary: "Decode Base64 text or files online.",
      searchTerms: [
        "decode",
        "decoder",
        "Base64URL",
        "Data URI",
        "text",
        "file",
        "binary",
      ],
    },
    "base64-encode": {
      name: "Base64 encoder",
      summary: "Encode text or files to Base64 online.",
      searchTerms: [
        "encode",
        "encoder",
        "Base64URL",
        "Data URI",
        "text",
        "file",
        "binary",
      ],
    },
    "word-counter": {
      name: "Word & character counter",
      summary: "Count words, characters, lines, and paragraphs online.",
      searchTerms: [
        "word count",
        "character count",
        "letters",
        "lines",
        "paragraphs",
        "text",
      ],
    },
    "json-formatter": {
      name: "JSON formatter",
      summary:
        "Make JSON easier to read, check it for errors, or minify it to one line.",
      searchTerms: [
        "format JSON",
        "validate JSON",
        "minify JSON",
        "pretty print",
        "data",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix timestamp converter",
      summary:
        "Convert Unix timestamps in seconds or milliseconds to dates and times, and back.",
      searchTerms: [
        "Unix time",
        "epoch",
        "epoch time",
        "seconds",
        "milliseconds",
        "date",
        "time",
      ],
    },
    "text-compare": {
      name: "Text compare",
      summary:
        "Compare two texts line by line and highlight their differences.",
      searchTerms: [
        "text diff",
        "compare text",
        "differences",
        "line comparison",
      ],
    },
    "case-converter": {
      name: "Case converter",
      summary:
        "Convert text to uppercase, lowercase, sentence case, or capitalized words.",
      searchTerms: [
        "uppercase",
        "lowercase",
        "sentence case",
        "capitalize",
        "text",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "All tools",
    directoryMetaTitle: "AbsolTools | Useful Tools, Ready When You Need Them",
    directoryMetaDescription:
      "Format, convert, encode, decode, compare, and inspect text, data, and code directly in your browser. Tool inputs and results are not uploaded.",
    directoryTitle: "We make the tools you use often cleaner and easier to use",
    directoryIntro: "Bookmark this site to come straight back next time.",
    toolPromise:
      "AbsolTools makes commonly used online tools more accurate and easier to use. Bookmark this site for easy access.",
    directorySearchLabel: "Search tools",
    directorySearchPlaceholder: "Search by name, description, or keyword",
    directorySearchClear: "Clear search",
    directorySearchNoResults: "No tools match your search.",
    directorySearchCount: "Matching tools: {count}",
    available: "Available",
    research: "Preview",
    reserve: "Under consideration",
    breadcrumbLabel: "Breadcrumb",
    encodingCategory: "Encoding & decoding",
    categories: {
      encoding: "Encoding & decoding",
      generator: "Generators",
      text: "Text",
      converter: "Converters",
      image: "Images",
      data: "Data",
      time: "Time",
    },
    footerNote: "Popular features, made easier to use.",
    catalogAria: "Tool directory",
    useLightTheme: "Use light theme",
    useDarkTheme: "Use dark theme",
    relatedTools: "Related tools",
  },
};

export default bundle;
