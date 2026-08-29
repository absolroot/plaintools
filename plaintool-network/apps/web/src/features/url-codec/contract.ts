import type {
  UrlCodecErrorCode,
  UrlCodecMode,
  UrlCodecScope,
} from "@plaintool/url-core";

export interface UrlCodecCopy {
  ariaLabel: string;
  modeLabel: string;
  encodeMode: string;
  decodeMode: string;
  encodeInputLabel: string;
  decodeInputLabel: string;
  encodeOutputLabel: string;
  decodeOutputLabel: string;
  encodePlaceholder: string;
  decodePlaceholder: string;
  outputPlaceholder: string;
  scopeLabel: string;
  componentScope: string;
  uriScope: string;
  formSpaceLabel: string;
  recursiveLabel: string;
  passLimitLabel: string;
  encoded: string;
  decoded: string;
  unchanged: string;
  outdated: string;
  tooLarge: string;
  /** Includes the `{count}` placeholder. */
  passCount: string;
  limitReached: string;
  errors: Record<UrlCodecErrorCode, string>;
}

export interface UrlCodecClientCopy {
  feature: UrlCodecCopy;
  common: import("../common-copy-contract").ToolCommonCopy;
}

export interface UrlCodecOptions {
  mode: UrlCodecMode;
  scope: UrlCodecScope;
  formSpace: boolean;
  recursive: boolean;
  maxPasses: number;
}
