import type { AiTextCleanerCopy } from "../../../features/ai-text-cleaner/contract";
import type { DataConverterCopy } from "../../../features/data-converter/contract";
import type { HashGeneratorCopy } from "../../../features/hash-generator/contract";
import type { JwtDecoderCopy } from "../../../features/jwt-decoder/contract";
import type {
  QrGeneratorCopy,
  QrScannerCopy,
} from "../../../features/qr/contract";
import type { UrlCodecCopy } from "../../../features/url-codec/contract";
import type { NewToolId, NewToolsCopy, ToolPageCopy } from "../bundle";
import type { LocaleCatalogToolCopy } from "../../tool-catalog";

type PageSeed = {
  title: string;
  description: string;
  guide: string;
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  terms: readonly string[];
};

export type NewToolLocaleSeed = {
  ui: {
    clear: string;
    copy: string;
    download: string;
    openFile: string;
    chooseImage: string;
    dropFile: string;
    ready: string;
    working: string;
    complete: string;
    unchanged: string;
    outdated: string;
    copied: string;
    copyFailed: string;
    tooLarge: string;
    failed: string;
    resultHere: string;
    localTitle: string;
    localBody: string;
    guideTitle: string;
    safetyTitle: string;
    faqWhat: string;
    faqPrivacy: string;
    faqCheck: string;
  };
  ai: {
    input: string;
    output: string;
    placeholder: string;
    run: string;
    report: string;
    removed: string;
    normalized: string;
    noChanges: string;
    count: string;
    advanced: string;
    advancedWarning: string;
    joinControls: string;
    joinWarning: string;
    variationSelectors: string;
    variationWarning: string;
    combiningMarks: string;
    combiningWarning: string;
    noBreakSpaces: string;
    noBreakNote: string;
    kinds: [
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
      string,
    ];
  };
  url: {
    mode: string;
    encode: string;
    decode: string;
    encodeInput: string;
    decodeInput: string;
    encodeOutput: string;
    decodeOutput: string;
    encodePlaceholder: string;
    decodePlaceholder: string;
    scope: string;
    component: string;
    uri: string;
    formSpace: string;
    recursive: string;
    passLimit: string;
    encoded: string;
    decoded: string;
    passCount: string;
    limitReached: string;
    errors: [string, string, string, string];
  };
  hash: {
    input: string;
    placeholder: string;
    results: string;
    resultLabel: string;
    copyLabel: string;
    fileSelected: string;
    drop: string;
    textTooLarge: string;
    fileTooLarge: string;
    legacyWarning: string;
    empty: string;
    unavailable: string;
  };
  jwt: {
    input: string;
    placeholder: string;
    header: string;
    payload: string;
    signature: string;
    copyHeader: string;
    copyPayload: string;
    copySignature: string;
    signatureBytes: string;
    timestamps: string;
    expires: string;
    notBefore: string;
    issuedAt: string;
    invalidTimestamp: string;
    noTimestamps: string;
    noVerifyTitle: string;
    noVerifyBody: string;
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
  qr: {
    input: string;
    placeholder: string;
    preview: string;
    previewEmpty: string;
    options: string;
    correction: string;
    correctionLevels: [string, string, string, string];
    quietZone: string;
    quietZones: [string, string, string, string];
    generate: string;
    png: string;
    svg: string;
    empty: string;
    tooLong: string;
    generationFailed: string;
    downloadFailed: string;
    upload: string;
    formats: string;
    camera: string;
    cameraHint: string;
    startCamera: string;
    stopCamera: string;
    scanResult: string;
    scanPlaceholder: string;
    urlDetected: string;
    reading: string;
    starting: string;
    scanning: string;
    invalidImage: string;
    noCode: string;
    unsupported: string;
    denied: string;
    unavailable: string;
    scanFailed: string;
  };
  data: {
    convert: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
    drop: string;
    readFailed: string;
    errorAt: string;
    delimiter: string;
    auto: string;
    comma: string;
    semicolon: string;
    tab: string;
    pipe: string;
    firstHeader: string;
    pretty: string;
    errors: [string, string, string, string, string, string, string];
  };
  pages: Record<NewToolId, PageSeed>;
};

export type NewToolLocale = {
  tools: NewToolsCopy;
  catalog: Record<NewToolId, LocaleCatalogToolCopy>;
};

function fill(value: string, replacements: Record<string, string>): string {
  return value.replace(
    /\{(\w+)\}/gu,
    (_, key: string) => replacements[key] ?? `{${key}}`,
  );
}

export function createNewToolLocale(seed: NewToolLocaleSeed): NewToolLocale {
  const { ui } = seed;
  const page = <T>(id: NewToolId, feature: T): ToolPageCopy<T> => {
    const source = seed.pages[id];
    return {
      title: source.title,
      description: source.description,
      guideTitle: fill(ui.guideTitle, { name: source.title }),
      guideBody: source.guide,
      safetyTitle: ui.safetyTitle,
      safetyBody: ui.localBody,
      faqs: [
        {
          q: fill(ui.faqWhat, { name: source.title }),
          a: source.description,
        },
        { q: ui.faqPrivacy, a: ui.localBody },
        {
          q: fill(ui.faqCheck, { name: source.title }),
          a: source.guide,
        },
      ],
      feature,
    };
  };

  const aiKinds = seed.ai.kinds;
  const ai: AiTextCleanerCopy = {
    accessibleLabel: seed.pages["ai-watermark-remover"].title,
    inputLabel: seed.ai.input,
    outputLabel: seed.ai.output,
    inputPlaceholder: seed.ai.placeholder,
    outputPlaceholder: ui.resultHere,
    clear: ui.clear,
    copy: ui.copy,
    run: seed.ai.run,
    ready: ui.ready,
    completed: ui.complete,
    unchanged: ui.unchanged,
    copied: ui.copied,
    copyFailed: ui.copyFailed,
    tooLarge: ui.tooLarge,
    processingFailed: ui.failed,
    reportTitle: seed.ai.report,
    removedHeading: seed.ai.removed,
    normalizedHeading: seed.ai.normalized,
    noChanges: seed.ai.noChanges,
    changeCountTemplate: seed.ai.count,
    advancedTitle: seed.ai.advanced,
    advancedWarning: seed.ai.advancedWarning,
    removeJoinControls: seed.ai.joinControls,
    removeJoinControlsWarning: seed.ai.joinWarning,
    removeVariationSelectors: seed.ai.variationSelectors,
    removeVariationSelectorsWarning: seed.ai.variationWarning,
    removeCombiningMarks: seed.ai.combiningMarks,
    removeCombiningMarksWarning: seed.ai.combiningWarning,
    normalizeNoBreakSpaces: seed.ai.noBreakSpaces,
    normalizeNoBreakSpacesNote: seed.ai.noBreakNote,
    kindLabels: {
      "zero-width-space": aiKinds[0],
      "word-joiner": aiKinds[1],
      "byte-order-mark": aiKinds[2],
      "soft-hyphen": aiKinds[3],
      "bidi-control": aiKinds[4],
      "invisible-separator": aiKinds[5],
      "join-control": aiKinds[6],
      "variation-selector": aiKinds[7],
      "combining-mark": aiKinds[8],
      "no-break-space": aiKinds[9],
      "narrow-no-break-space": aiKinds[10],
      "figure-space": aiKinds[9],
    },
  };

  const urlFeature = (id: "url-encode" | "url-decode"): UrlCodecCopy => ({
    ariaLabel: seed.pages[id].title,
    modeLabel: seed.url.mode,
    encodeMode: seed.url.encode,
    decodeMode: seed.url.decode,
    encodeInputLabel: seed.url.encodeInput,
    decodeInputLabel: seed.url.decodeInput,
    encodeOutputLabel: seed.url.encodeOutput,
    decodeOutputLabel: seed.url.decodeOutput,
    encodePlaceholder: seed.url.encodePlaceholder,
    decodePlaceholder: seed.url.decodePlaceholder,
    outputPlaceholder: ui.resultHere,
    scopeLabel: seed.url.scope,
    componentScope: seed.url.component,
    uriScope: seed.url.uri,
    formSpaceLabel: seed.url.formSpace,
    recursiveLabel: seed.url.recursive,
    passLimitLabel: seed.url.passLimit,
    encoded: seed.url.encoded,
    decoded: seed.url.decoded,
    unchanged: ui.unchanged,
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    passCount: seed.url.passCount,
    limitReached: seed.url.limitReached,
    errors: {
      "empty-input": seed.url.errors[0],
      "invalid-percent-sequence": seed.url.errors[1],
      "invalid-utf8": seed.url.errors[2],
      "invalid-pass-limit": seed.url.errors[3],
    },
  });

  const hash: HashGeneratorCopy = {
    ariaLabel: seed.pages["hash-generator"].title,
    inputLabel: seed.hash.input,
    inputPlaceholder: seed.hash.placeholder,
    openFile: ui.openFile,
    resultsLabel: seed.hash.results,
    resultValueLabel: seed.hash.resultLabel,
    copyHashLabel: seed.hash.copyLabel,
    fileSelected: seed.hash.fileSelected,
    dropHint: seed.hash.drop,
    completed: ui.complete,
    outdated: ui.outdated,
    textTooLarge: seed.hash.textTooLarge,
    fileTooLarge: seed.hash.fileTooLarge,
    legacyWarning: seed.hash.legacyWarning,
    errors: {
      "empty-input": seed.hash.empty,
      "digest-unavailable": seed.hash.unavailable,
    },
  };

  const jwtErrors = seed.jwt.errors;
  const jwt: JwtDecoderCopy = {
    ariaLabel: seed.pages["jwt-decoder"].title,
    inputLabel: seed.jwt.input,
    inputPlaceholder: seed.jwt.placeholder,
    headerLabel: seed.jwt.header,
    payloadLabel: seed.jwt.payload,
    signatureLabel: seed.jwt.signature,
    copyHeaderLabel: seed.jwt.copyHeader,
    copyPayloadLabel: seed.jwt.copyPayload,
    copySignatureLabel: seed.jwt.copySignature,
    signatureBytes: seed.jwt.signatureBytes,
    timestampsLabel: seed.jwt.timestamps,
    timestampClaims: {
      exp: seed.jwt.expires,
      nbf: seed.jwt.notBefore,
      iat: seed.jwt.issuedAt,
    },
    invalidTimestamp: seed.jwt.invalidTimestamp,
    noTimestamps: seed.jwt.noTimestamps,
    noVerificationTitle: seed.jwt.noVerifyTitle,
    noVerificationBody: seed.jwt.noVerifyBody,
    decoded: ui.complete,
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    errors: {
      "empty-input": jwtErrors[0],
      "segment-count": jwtErrors[1],
      "empty-header": jwtErrors[2],
      "empty-payload": jwtErrors[3],
      "invalid-base64url": jwtErrors[4],
      "invalid-utf8": jwtErrors[5],
      "invalid-json-header": jwtErrors[6],
      "invalid-json-payload": jwtErrors[7],
      "invalid-header-shape": jwtErrors[8],
      "invalid-payload-shape": jwtErrors[9],
    },
  };

  const qrLevels = seed.qr.correctionLevels;
  const qrZones = seed.qr.quietZones;
  const qrGenerator: QrGeneratorCopy = {
    accessibleLabel: seed.pages["qr-code-generator"].title,
    inputLabel: seed.qr.input,
    inputPlaceholder: seed.qr.placeholder,
    clear: ui.clear,
    previewLabel: seed.qr.preview,
    previewPlaceholder: seed.qr.previewEmpty,
    optionsLabel: seed.qr.options,
    errorCorrectionLabel: seed.qr.correction,
    errorCorrectionOptions: {
      L: qrLevels[0],
      M: qrLevels[1],
      Q: qrLevels[2],
      H: qrLevels[3],
    },
    quietZoneLabel: seed.qr.quietZone,
    quietZoneOptions: {
      "0": qrZones[0],
      "2": qrZones[1],
      "4": qrZones[2],
      "8": qrZones[3],
    },
    generate: seed.qr.generate,
    downloadPng: seed.qr.png,
    downloadSvg: seed.qr.svg,
    ready: ui.ready,
    completed: ui.complete,
    empty: seed.qr.empty,
    tooLong: seed.qr.tooLong,
    generationFailed: seed.qr.generationFailed,
    downloadFailed: seed.qr.downloadFailed,
    pngFileName: "qr-code.png",
    svgFileName: "qr-code.svg",
  };

  const qrScanner: QrScannerCopy = {
    accessibleLabel: seed.pages["qr-code-scanner"].title,
    uploadLabel: seed.qr.upload,
    chooseImage: ui.chooseImage,
    dropHint: ui.dropFile,
    supportedImageTypes: seed.qr.formats,
    cameraLabel: seed.qr.camera,
    cameraHint: seed.qr.cameraHint,
    startCamera: seed.qr.startCamera,
    stopCamera: seed.qr.stopCamera,
    resultLabel: seed.qr.scanResult,
    resultPlaceholder: seed.qr.scanPlaceholder,
    copy: ui.copy,
    clear: ui.clear,
    urlDetected: seed.qr.urlDetected,
    ready: ui.ready,
    readingImage: seed.qr.reading,
    cameraStarting: seed.qr.starting,
    cameraScanning: seed.qr.scanning,
    completed: ui.complete,
    copied: ui.copied,
    copyFailed: ui.copyFailed,
    fileTooLarge: ui.tooLarge,
    invalidImage: seed.qr.invalidImage,
    noCode: seed.qr.noCode,
    cameraUnsupported: seed.qr.unsupported,
    permissionDenied: seed.qr.denied,
    cameraUnavailable: seed.qr.unavailable,
    scanFailed: seed.qr.scanFailed,
  };

  const dataErrors = seed.data.errors;
  const dataFeature = (id: NewToolId): DataConverterCopy => {
    const source = seed.pages[id];
    return {
      ariaLabel: source.title,
      inputLabel: source.inputLabel!,
      outputLabel: source.outputLabel!,
      inputPlaceholder: source.inputPlaceholder ?? seed.data.inputPlaceholder,
      outputPlaceholder: seed.data.outputPlaceholder,
      openFile: ui.openFile,
      dropHint: seed.data.drop,
      clear: ui.clear,
      copy: ui.copy,
      download: ui.download,
      convert: seed.data.convert,
      ready: ui.ready,
      working: ui.working,
      complete: ui.complete,
      copied: ui.copied,
      copyFailed: ui.copyFailed,
      tooLarge: ui.tooLarge,
      readFailed: seed.data.readFailed,
      processingFailed: ui.failed,
      errorAt: seed.data.errorAt,
      delimiterLabel: seed.data.delimiter,
      autoDelimiter: seed.data.auto,
      commaDelimiter: seed.data.comma,
      semicolonDelimiter: seed.data.semicolon,
      tabDelimiter: seed.data.tab,
      pipeDelimiter: seed.data.pipe,
      firstRowHeader: seed.data.firstHeader,
      prettyJson: seed.data.pretty,
      localTitle: ui.localTitle,
      localBody: ui.localBody,
      errorMessages: {
        "invalid-csv": dataErrors[0],
        "missing-markdown-table": dataErrors[1],
        "invalid-markdown-table": dataErrors[2],
        "invalid-json": dataErrors[3],
        "invalid-json-shape": dataErrors[4],
        "empty-header": dataErrors[5],
        "duplicate-header": dataErrors[6],
      },
    };
  };

  const tools: NewToolsCopy = {
    "ai-watermark-remover": page("ai-watermark-remover", ai),
    "url-encode": page("url-encode", urlFeature("url-encode")),
    "url-decode": page("url-decode", urlFeature("url-decode")),
    "hash-generator": page("hash-generator", hash),
    "jwt-decoder": page("jwt-decoder", jwt),
    "qr-code-generator": page("qr-code-generator", qrGenerator),
    "qr-code-scanner": page("qr-code-scanner", qrScanner),
    "csv-to-markdown": page("csv-to-markdown", dataFeature("csv-to-markdown")),
    "markdown-to-csv": page("markdown-to-csv", dataFeature("markdown-to-csv")),
    "json-to-csv": page("json-to-csv", dataFeature("json-to-csv")),
    "csv-to-json": page("csv-to-json", dataFeature("csv-to-json")),
    "html-to-markdown": page(
      "html-to-markdown",
      dataFeature("html-to-markdown"),
    ),
    "markdown-to-html": page(
      "markdown-to-html",
      dataFeature("markdown-to-html"),
    ),
  };

  const catalog = Object.fromEntries(
    (Object.keys(tools) as NewToolId[]).map((id) => [
      id,
      {
        name: tools[id].title,
        summary: tools[id].description,
        searchTerms: seed.pages[id].terms,
      },
    ]),
  ) as Record<NewToolId, LocaleCatalogToolCopy>;

  return { tools, catalog };
}
