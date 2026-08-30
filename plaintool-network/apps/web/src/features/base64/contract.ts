import type {
  CodecErrorCode,
  CodecOptions,
  CodecResult,
  RepairCode,
} from "@plaintool/codec-core";

export type Base64ClientErrorCode =
  | CodecErrorCode
  | "encode-failed"
  | "file-too-large";

export type Base64ClientCopy = {
  decodeMetaTitle: string;
  encodeMetaTitle: string;
  decodeHeaderLabel: string;
  encodeHeaderLabel: string;
  heading: string;
  subheading: string;
  encodeHeading: string;
  encodeSubheading: string;
  guideTitle: string;
  guideIntro: string;
  guideSteps: string[];
  encodeGuideTitle: string;
  encodeGuideIntro: string;
  encodeGuideSteps: string[];
  faqs: Array<{ q: string; a: string }>;
  encodeFaqs: Array<{ q: string; a: string }>;
  inputLabel: string;
  outputLabel: string;
  encodeInputLabel: string;
  encodeOutputLabel: string;
  decodePlaceholder: string;
  encodePlaceholder: string;
  runDecode: string;
  runEncode: string;
  ready: string;
  working: string;
  decodeComplete: string;
  encodeComplete: string;
  copied: string;
  copyFailed: string;
  fileTooLarge: string;
  detected: string;
  binaryOutput: string;
  executableWarning: string;
  hexLabel: string;
  recursive: string;
  recursiveApplied: string;
  errors: Record<Base64ClientErrorCode, string>;
  repairs: Record<RepairCode, string>;
};

export type Base64ModeDefinition = {
  slug: "base64-decode" | "base64-encode";
  metaTitle: string;
  heading: string;
  description: string;
  guideTitle: string;
  guideIntro: string;
  guideSteps: string[];
  faqs: Array<{ q: string; a: string }>;
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  runLabel: string;
  completeLabel: string;
};

export type Base64ModeCopy = Pick<
  Base64ClientCopy,
  | "decodeMetaTitle"
  | "encodeMetaTitle"
  | "heading"
  | "subheading"
  | "encodeHeading"
  | "encodeSubheading"
  | "guideTitle"
  | "guideIntro"
  | "guideSteps"
  | "encodeGuideTitle"
  | "encodeGuideIntro"
  | "encodeGuideSteps"
  | "faqs"
  | "encodeFaqs"
  | "inputLabel"
  | "outputLabel"
  | "encodeInputLabel"
  | "encodeOutputLabel"
  | "decodePlaceholder"
  | "encodePlaceholder"
  | "runDecode"
  | "runEncode"
  | "decodeComplete"
  | "encodeComplete"
>;

export type Base64WorkerRequest = {
  id: number;
  input: string | ArrayBuffer;
  options: Partial<CodecOptions>;
};

export type Base64WorkerReply =
  | { id: number; ok: true; result: CodecResult }
  | { id: number; ok: false; error: CodecErrorCode };
