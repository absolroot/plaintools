import type { AiTextCleanerCopy } from "../../../features/ai-text-cleaner/contract";
import type { DataConverterCopy } from "../../../features/data-converter/contract";
import type { HashGeneratorCopy } from "../../../features/hash-generator/contract";
import type { JwtDecoderCopy } from "../../../features/jwt-decoder/contract";
import type {
  QrGeneratorCopy,
  QrScannerCopy,
} from "../../../features/qr/contract";
import type { UrlCodecCopy } from "../../../features/url-codec/contract";
import type { HtmlFormatterCopy } from "../../../features/html-formatter/contract";
import type { CssFormatterCopy } from "../../../features/css-formatter/contract";
import type { JavaScriptFormatterCopy } from "../../../features/javascript-formatter/contract";
import type { SqlFormatterCopy } from "../../../features/sql-formatter/contract";
import type { IpSubnetCopy } from "../../../features/ip-subnet/contract";
import type { BackgroundRemoverCopy } from "../../../features/background-remover/contract";
import type { UuidGeneratorCopy } from "../../../features/uuid-generator/contract";
import type {
  DateCalculatorLocaleSeed,
  DateCalculatorPageId,
} from "./date-calculator";
import type { TimeZoneConverterLocaleSeed } from "./time-zone-converter";
import type {
  CalculatorPageId,
  CalculatorSuiteLocaleSeed,
} from "./calculator-suite";
import type {
  FormatterSubnetToolId,
  LegacyNewToolId,
  NewToolId,
  NewToolsCopy,
  ToolPageCopy,
} from "../bundle";
import type { LocaleCatalogToolCopy } from "../../tool-catalog";
import type { UuidGeneratorLocaleSeed } from "./uuid-generator";

type PageSeed = {
  title: string;
  description: string;
  guide: string;
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  terms: readonly string[];
  mobileDescription?: string;
  faqs?: Array<{ q: string; a: string }>;
};

export type FormatterSubnetLocaleSeed = {
  formatter: {
    mode: string;
    format: string;
    minify: string;
    loadSample: string;
    options: string;
    indentation: string;
    twoSpaces: string;
    fourSpaces: string;
    tabs: string;
    printWidth: string;
    formatted: string;
    minified: string;
    manualRequired: string;
    invalidAt: string;
    syntaxError: string;
    unknownError: string;
  };
  scopes: {
    html: string;
    css: string;
    javascript: string;
    sql: string;
  };
  javascript: {
    runFormat: string;
    runMinify: string;
    semicolons: string;
    singleQuotes: string;
    preserveComments: string;
    emptyInput: string;
    transformError: string;
  };
  sql: {
    dialect: string;
    standard: string;
    keywordCase: string;
    preserveCase: string;
    uppercase: string;
    lowercase: string;
    formattingFailed: string;
  };
  subnet: {
    inputHint: string;
    sample: string;
    resultTitle: string;
    normalizedCidr: string;
    netmask: string;
    wildcardMask: string;
    networkAddress: string;
    broadcastAddress: string;
    firstUsableAddress: string;
    lastUsableAddress: string;
    totalAddresses: string;
    usableAddresses: string;
    containingRange: string;
    semanticsLabel: string;
    semantics: [string, string, string];
    specialUseTitle: string;
    classificationLabel: string;
    classificationBlockLabel: string;
    classifications: [
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
      string,
      string,
      string,
      string,
    ];
    binaryTitle: string;
    binaryAddress: string;
    binaryNetmask: string;
    binaryWildcard: string;
    binaryNetwork: string;
    binaryBroadcast: string;
    errors: [string, string, string, string, string, string, string, string];
  };
  pages: Record<FormatterSubnetToolId, PageSeed>;
};

export type NewToolLocaleSeed = {
  mobileDescriptions?: Partial<Record<NewToolId, string>>;
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
    expectedChecksum: string;
    checksumMatch: string;
    checksumMismatch: string;
    checksumInvalid: string;
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
    openUrl: string;
    urlDialogTitle: string;
    urlDialogBody: string;
    urlDialogDestination: string;
    cancel: string;
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
  background: {
    original: string;
    result: string;
    uploadHint: string;
    formats: string;
    options: string;
    model: string;
    fast: string;
    fastHint: string;
    portrait: string;
    portraitHint: string;
    quality: string;
    qualityHint: string;
    precision: string;
    precisionHint: string;
    precisionUnavailable: string;
    precisionConsentTitle: string;
    precisionConsentBody: string;
    precisionConsentNotice: string;
    precisionConsentConfirm: string;
    cancel: string;
    background: string;
    transparent: string;
    white: string;
    custom: string;
    color: string;
    remove: string;
    compare: string;
    comparison: string;
    selected: string;
    compareConsentTitle: string;
    compareConsentBody: string;
    compareConsentConfirm: string;
    compareWithoutPrecision: string;
    newImage: string;
    png: string;
    trim: string;
    restore: string;
    reading: string;
    downloading: string;
    loading: string;
    processing: string;
    comparing: string;
    compareCompleted: string;
    comparePartial: string;
    trimmed: string;
    trimUnavailable: string;
    completed: string;
    scaled: string;
    imageTooLarge: string;
    invalid: string;
    modelFailed: string;
    processingFailed: string;
    downloadFailed: string;
    resultEmpty: string;
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
  pages: Record<LegacyNewToolId, PageSeed>;
  formatterSubnet: FormatterSubnetLocaleSeed;
  dateCalculator: DateCalculatorLocaleSeed;
  timeZoneConverter: TimeZoneConverterLocaleSeed;
  calculatorSuite: CalculatorSuiteLocaleSeed;
  uuidGenerator: UuidGeneratorLocaleSeed;
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
  const pageSeed = (id: NewToolId): PageSeed =>
    id === "time-zone-converter"
      ? seed.timeZoneConverter.page
      : id === "uuid-generator"
        ? seed.uuidGenerator.page
        : id === "date-calculator" ||
            id === "dday-calculator" ||
            id === "age-calculator"
          ? seed.dateCalculator.pages[id as DateCalculatorPageId]
          : id === "fraction-calculator" ||
              id === "factor-calculator" ||
              id === "lcm-calculator" ||
              id === "percentage-calculator" ||
              id === "bmi-calculator"
            ? seed.calculatorSuite.pages[id as CalculatorPageId]
            : id in seed.pages
              ? seed.pages[id as LegacyNewToolId]
              : seed.formatterSubnet.pages[id as FormatterSubnetToolId];
  const page = <T>(id: NewToolId, feature: T): ToolPageCopy<T> => {
    const source = pageSeed(id);
    return {
      title: source.title,
      description: source.description,
      mobileDescription:
        source.mobileDescription ??
        seed.mobileDescriptions?.[id] ??
        source.description,
      guideTitle: fill(ui.guideTitle, { name: source.title }),
      guideBody: source.guide,
      safetyTitle: ui.safetyTitle,
      safetyBody: ui.localBody,
      faqs: source.faqs ?? [
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
    expectedChecksum: seed.hash.expectedChecksum,
    checksumMatch: seed.hash.checksumMatch,
    checksumMismatch: seed.hash.checksumMismatch,
    checksumInvalid: seed.hash.checksumInvalid,
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
    openUrl: seed.qr.openUrl,
    urlDialogTitle: seed.qr.urlDialogTitle,
    urlDialogBody: seed.qr.urlDialogBody,
    urlDialogDestination: seed.qr.urlDialogDestination,
    cancel: seed.qr.cancel,
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

  const background: BackgroundRemoverCopy = {
    accessibleLabel: seed.pages["background-remover"].title,
    originalLabel: seed.background.original,
    resultLabel: seed.background.result,
    chooseImage: ui.chooseImage,
    dropHint: seed.background.uploadHint,
    supportedImageTypes: seed.background.formats,
    optionsLabel: seed.background.options,
    modelLabel: seed.background.model,
    modelOptions: {
      fast: seed.background.fast,
      portrait: seed.background.portrait,
      quality: seed.background.quality,
      precision: seed.background.precision,
    },
    modelHints: {
      fast: seed.background.fastHint,
      portrait: seed.background.portraitHint,
      quality: seed.background.qualityHint,
      precision: seed.background.precisionHint,
    },
    precisionUnavailable: seed.background.precisionUnavailable,
    precisionConsentTitle: seed.background.precisionConsentTitle,
    precisionConsentBody: seed.background.precisionConsentBody,
    precisionConsentNotice: seed.background.precisionConsentNotice,
    precisionConsentConfirm: seed.background.precisionConsentConfirm,
    cancel: seed.background.cancel,
    backgroundLabel: seed.background.background,
    backgroundOptions: {
      transparent: seed.background.transparent,
      white: seed.background.white,
      color: seed.background.custom,
    },
    colorLabel: seed.background.color,
    removeBackground: seed.background.remove,
    compareModels: seed.background.compare,
    comparisonLabel: seed.background.comparison,
    comparisonSelected: seed.background.selected,
    compareConsentTitle: seed.background.compareConsentTitle,
    compareConsentBody: seed.background.compareConsentBody,
    compareConsentConfirm: seed.background.compareConsentConfirm,
    compareWithoutPrecision: seed.background.compareWithoutPrecision,
    newImage: seed.background.newImage,
    downloadPng: seed.background.png,
    trimImage: seed.background.trim,
    restoreImage: seed.background.restore,
    ready: ui.ready,
    readingImage: seed.background.reading,
    downloadingModel: seed.background.downloading,
    loadingModel: seed.background.loading,
    processingImage: seed.background.processing,
    completed: seed.background.completed,
    comparingModels: seed.background.comparing,
    compareCompleted: seed.background.compareCompleted,
    comparePartial: seed.background.comparePartial,
    trimmed: seed.background.trimmed,
    trimUnavailable: seed.background.trimUnavailable,
    scaledImage: seed.background.scaled,
    fileTooLarge: ui.tooLarge,
    imageTooLarge: seed.background.imageTooLarge,
    invalidImage: seed.background.invalid,
    modelFailed: seed.background.modelFailed,
    processingFailed: seed.background.processingFailed,
    downloadFailed: seed.background.downloadFailed,
    resultPlaceholder: seed.background.resultEmpty,
  };

  const dataErrors = seed.data.errors;
  const dataFeature = (id: NewToolId): DataConverterCopy => {
    const source = pageSeed(id);
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

  const extra = seed.formatterSubnet;
  const formatterPage = (id: FormatterSubnetToolId) => pageSeed(id);
  const htmlFormatter: HtmlFormatterCopy = {
    ariaLabel: formatterPage("html-formatter").title,
    format: extra.formatter.format,
    inputLabel: formatterPage("html-formatter").inputLabel!,
    inputPlaceholder: formatterPage("html-formatter").inputPlaceholder!,
    outputLabel: formatterPage("html-formatter").outputLabel!,
    outputPlaceholder: ui.resultHere,
    openFile: ui.openFile,
    loadSample: extra.formatter.loadSample,
    optionsLabel: extra.formatter.options,
    indentationLabel: extra.formatter.indentation,
    twoSpaces: extra.formatter.twoSpaces,
    fourSpaces: extra.formatter.fourSpaces,
    tabs: extra.formatter.tabs,
    printWidthLabel: extra.formatter.printWidth,
    formatted: extra.formatter.formatted,
    downloadFilename: "formatted.html",
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    manualRequired: extra.formatter.manualRequired,
    invalidAt: extra.formatter.invalidAt,
    scopeNotice: extra.scopes.html,
    sampleInput: formatterPage("html-formatter").inputPlaceholder!,
    errors: {
      SyntaxError: extra.formatter.syntaxError,
      Unknown: extra.formatter.unknownError,
    },
  };
  const cssFormatter: CssFormatterCopy = {
    ariaLabel: formatterPage("css-formatter").title,
    modeLabel: extra.formatter.mode,
    format: extra.formatter.format,
    inputLabel: formatterPage("css-formatter").inputLabel!,
    inputPlaceholder: formatterPage("css-formatter").inputPlaceholder!,
    outputLabel: formatterPage("css-formatter").outputLabel!,
    outputPlaceholder: ui.resultHere,
    openFile: ui.openFile,
    loadSample: extra.formatter.loadSample,
    optionsLabel: extra.formatter.options,
    indentationLabel: extra.formatter.indentation,
    twoSpaces: extra.formatter.twoSpaces,
    fourSpaces: extra.formatter.fourSpaces,
    tabs: extra.formatter.tabs,
    printWidthLabel: extra.formatter.printWidth,
    formatted: extra.formatter.formatted,
    downloadFilename: "formatted.css",
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    manualRequired: extra.formatter.manualRequired,
    invalidAt: extra.formatter.invalidAt,
    scopeNotice: extra.scopes.css,
    sampleInput:
      ".card{display:grid;gap:1rem;color:#1f2937}@media(max-width:680px){.card{display:block}}",
    errors: {
      SyntaxError: extra.formatter.syntaxError,
      Unknown: extra.formatter.unknownError,
    },
  };
  const javascriptFormatter: JavaScriptFormatterCopy = {
    ariaLabel: formatterPage("javascript-formatter").title,
    modeLabel: extra.formatter.mode,
    formatMode: extra.formatter.format,
    minifyMode: extra.formatter.minify,
    runFormat: extra.javascript.runFormat,
    runMinify: extra.javascript.runMinify,
    inputLabel: formatterPage("javascript-formatter").inputLabel!,
    inputPlaceholder: formatterPage("javascript-formatter").inputPlaceholder!,
    outputLabel: formatterPage("javascript-formatter").outputLabel!,
    outputPlaceholder: ui.resultHere,
    openFile: ui.openFile,
    loadSample: extra.formatter.loadSample,
    optionsLabel: extra.formatter.options,
    indentationLabel: extra.formatter.indentation,
    twoSpaces: extra.formatter.twoSpaces,
    fourSpaces: extra.formatter.fourSpaces,
    tabs: extra.formatter.tabs,
    printWidthLabel: extra.formatter.printWidth,
    semicolonsLabel: extra.javascript.semicolons,
    singleQuoteLabel: extra.javascript.singleQuotes,
    preserveCommentsLabel: extra.javascript.preserveComments,
    formatted: extra.formatter.formatted,
    minified: extra.formatter.minified,
    formatDownloadFilename: "formatted.js",
    minifyDownloadFilename: "minified.js",
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    manualRequired: extra.formatter.manualRequired,
    invalidAt: extra.formatter.invalidAt,
    scopeNotice: extra.scopes.javascript,
    sampleInput:
      "const greet=(name)=>{console.log(`Hello, ${name}!`)};greet('world');",
    errors: {
      EmptyInput: extra.javascript.emptyInput,
      SyntaxError: extra.formatter.syntaxError,
      TransformError: extra.javascript.transformError,
      Unknown: extra.formatter.unknownError,
    },
  };
  const sqlFormatter: SqlFormatterCopy = {
    ariaLabel: formatterPage("sql-formatter").title,
    format: extra.formatter.format,
    inputLabel: formatterPage("sql-formatter").inputLabel!,
    inputPlaceholder: formatterPage("sql-formatter").inputPlaceholder!,
    outputLabel: formatterPage("sql-formatter").outputLabel!,
    outputPlaceholder: ui.resultHere,
    openFile: ui.openFile,
    loadSample: extra.formatter.loadSample,
    dialectLabel: extra.sql.dialect,
    dialects: {
      sql: extra.sql.standard,
      postgresql: "PostgreSQL",
      mysql: "MySQL",
      mariadb: "MariaDB",
      sqlite: "SQLite",
      transactsql: "SQL Server / T-SQL",
    },
    optionsLabel: extra.formatter.options,
    indentationLabel: extra.formatter.indentation,
    twoSpaces: extra.formatter.twoSpaces,
    fourSpaces: extra.formatter.fourSpaces,
    tabs: extra.formatter.tabs,
    keywordCaseLabel: extra.sql.keywordCase,
    preserveCase: extra.sql.preserveCase,
    uppercase: extra.sql.uppercase,
    lowercase: extra.sql.lowercase,
    formatted: extra.formatter.formatted,
    downloadFilename: "formatted.sql",
    outdated: ui.outdated,
    tooLarge: ui.tooLarge,
    manualRequired: extra.formatter.manualRequired,
    invalidAt: extra.formatter.invalidAt,
    scopeNotice: extra.scopes.sql,
    sampleInput:
      "select users.id,users.name from users where users.active=true order by users.name;",
    errors: {
      FormattingFailed: extra.sql.formattingFailed,
      Unknown: extra.formatter.unknownError,
    },
  };
  const subnetSemantics = extra.subnet.semantics;
  const subnetClassifications = extra.subnet.classifications;
  const subnetErrors = extra.subnet.errors;
  const ipSubnet: IpSubnetCopy = {
    ariaLabel: formatterPage("ip-subnet-calculator").title,
    inputLabel: formatterPage("ip-subnet-calculator").inputLabel!,
    inputPlaceholder: formatterPage("ip-subnet-calculator").inputPlaceholder!,
    inputHint: extra.subnet.inputHint,
    sample: extra.subnet.sample,
    resultTitle: extra.subnet.resultTitle,
    normalizedCidr: extra.subnet.normalizedCidr,
    netmask: extra.subnet.netmask,
    wildcardMask: extra.subnet.wildcardMask,
    networkAddress: extra.subnet.networkAddress,
    broadcastAddress: extra.subnet.broadcastAddress,
    firstUsableAddress: extra.subnet.firstUsableAddress,
    lastUsableAddress: extra.subnet.lastUsableAddress,
    totalAddresses: extra.subnet.totalAddresses,
    usableAddresses: extra.subnet.usableAddresses,
    containingRange: extra.subnet.containingRange,
    semanticsLabel: extra.subnet.semanticsLabel,
    semantics: {
      subnet: subnetSemantics[0],
      "point-to-point": subnetSemantics[1],
      "single-address": subnetSemantics[2],
    },
    specialUseTitle: extra.subnet.specialUseTitle,
    classificationLabel: extra.subnet.classificationLabel,
    classificationBlockLabel: extra.subnet.classificationBlockLabel,
    classifications: {
      "not-classified": subnetClassifications[0],
      unspecified: subnetClassifications[1],
      "current-network": subnetClassifications[2],
      "private-use": subnetClassifications[3],
      "shared-address-space": subnetClassifications[4],
      loopback: subnetClassifications[5],
      "link-local": subnetClassifications[6],
      "ietf-protocol-assignment": subnetClassifications[7],
      documentation: subnetClassifications[8],
      "deprecated-6to4-relay": subnetClassifications[9],
      "6a44-relay": subnetClassifications[10],
      benchmarking: subnetClassifications[11],
      multicast: subnetClassifications[12],
      reserved: subnetClassifications[13],
      "limited-broadcast": subnetClassifications[14],
    },
    binaryTitle: extra.subnet.binaryTitle,
    binaryAddress: extra.subnet.binaryAddress,
    binaryNetmask: extra.subnet.binaryNetmask,
    binaryWildcard: extra.subnet.binaryWildcard,
    binaryNetwork: extra.subnet.binaryNetwork,
    binaryBroadcast: extra.subnet.binaryBroadcast,
    calculated: ui.complete,
    outdated: ui.outdated,
    downloadFilename: "subnet-result.txt",
    errors: {
      "empty-input": subnetErrors[0],
      "missing-prefix": subnetErrors[1],
      "invalid-format": subnetErrors[2],
      "invalid-address": subnetErrors[3],
      "invalid-octet": subnetErrors[4],
      "invalid-prefix": subnetErrors[5],
      "invalid-netmask": subnetErrors[6],
      "non-contiguous-netmask": subnetErrors[7],
    },
  };

  const tools: NewToolsCopy = {
    "ai-watermark-remover": page("ai-watermark-remover", ai),
    "url-encode": page("url-encode", urlFeature("url-encode")),
    "url-decode": page("url-decode", urlFeature("url-decode")),
    "hash-generator": page("hash-generator", hash),
    "uuid-generator": page("uuid-generator", {
      ...seed.uuidGenerator.feature,
      ariaLabel: pageSeed("uuid-generator").title,
      outdated: ui.outdated,
    } satisfies UuidGeneratorCopy),
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
    "html-formatter": page("html-formatter", htmlFormatter),
    "css-formatter": page("css-formatter", cssFormatter),
    "javascript-formatter": page("javascript-formatter", javascriptFormatter),
    "sql-formatter": page("sql-formatter", sqlFormatter),
    "ip-subnet-calculator": page("ip-subnet-calculator", ipSubnet),
    "background-remover": page("background-remover", background),
    "date-calculator": page("date-calculator", {
      ...seed.dateCalculator.feature,
      ariaLabel: pageSeed("date-calculator").title,
    }),
    "dday-calculator": page("dday-calculator", {
      ...seed.dateCalculator.feature,
      ariaLabel: pageSeed("dday-calculator").title,
    }),
    "age-calculator": page("age-calculator", {
      ...seed.dateCalculator.feature,
      ariaLabel: pageSeed("age-calculator").title,
    }),
    "time-zone-converter": page(
      "time-zone-converter",
      seed.timeZoneConverter.feature,
    ),
    "fraction-calculator": page(
      "fraction-calculator",
      seed.calculatorSuite.math,
    ),
    "factor-calculator": page("factor-calculator", seed.calculatorSuite.math),
    "lcm-calculator": page("lcm-calculator", seed.calculatorSuite.math),
    "percentage-calculator": page(
      "percentage-calculator",
      seed.calculatorSuite.percentage,
    ),
    "bmi-calculator": page("bmi-calculator", seed.calculatorSuite.bmi),
  };

  const catalogToolIds = [
    ...Object.keys(tools).filter(
      (id) =>
        id !== "date-calculator" &&
        id !== "dday-calculator" &&
        id !== "age-calculator" &&
        id !== "time-zone-converter",
    ),
    "date-calculator",
    "dday-calculator",
    "age-calculator",
    "time-zone-converter",
  ] as NewToolId[];
  const catalog = Object.fromEntries(
    catalogToolIds.map((id) => [
      id,
      {
        name: tools[id].title,
        summary: tools[id].mobileDescription,
        searchTerms:
          id === "date-calculator"
            ? [...pageSeed(id).terms, "Date Calculator"]
            : pageSeed(id).terms,
      },
    ]),
  ) as Record<NewToolId, LocaleCatalogToolCopy>;

  return { tools, catalog };
}
