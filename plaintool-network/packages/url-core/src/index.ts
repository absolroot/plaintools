export type UrlCodecMode = "encode" | "decode";
export type UrlCodecScope = "component" | "uri";

export type UrlCodecErrorCode =
  | "empty-input"
  | "invalid-percent-sequence"
  | "invalid-utf8"
  | "invalid-pass-limit";

export class UrlCodecError extends Error {
  constructor(public readonly code: UrlCodecErrorCode) {
    super(code);
    this.name = "UrlCodecError";
  }
}

export interface UrlEncodeOptions {
  scope: UrlCodecScope;
  formSpace: boolean;
}

export interface UrlDecodeOptions extends UrlEncodeOptions {
  recursive: boolean;
  maxPasses: number;
}

export interface UrlDecodeResult {
  text: string;
  passes: number;
  limitReached: boolean;
}

const INVALID_PERCENT = /%(?![\da-f]{2})/iu;

function assertInput(input: string): void {
  if (!input) throw new UrlCodecError("empty-input");
}

function assertPassLimit(value: number): void {
  if (!Number.isInteger(value) || value < 1 || value > 10) {
    throw new UrlCodecError("invalid-pass-limit");
  }
}

function decodeOnce(
  input: string,
  scope: UrlCodecScope,
  formSpace: boolean,
): string {
  const prepared = formSpace ? input.replace(/\+/gu, " ") : input;
  if (INVALID_PERCENT.test(prepared)) {
    throw new UrlCodecError("invalid-percent-sequence");
  }

  try {
    return scope === "component"
      ? decodeURIComponent(prepared)
      : decodeURI(prepared);
  } catch {
    throw new UrlCodecError("invalid-utf8");
  }
}

export function encodeUrl(input: string, options: UrlEncodeOptions): string {
  assertInput(input);
  const encoded =
    options.scope === "component"
      ? encodeURIComponent(input)
      : encodeURI(input);
  return options.formSpace ? encoded.replace(/%20/gu, "+") : encoded;
}

export function decodeUrl(
  input: string,
  options: UrlDecodeOptions,
): UrlDecodeResult {
  assertInput(input);
  assertPassLimit(options.maxPasses);

  let current = input;
  let passes = 0;
  const passLimit = options.recursive ? options.maxPasses : 1;

  while (passes < passLimit) {
    const decoded = decodeOnce(current, options.scope, options.formSpace);
    passes += 1;
    if (!options.recursive || decoded === current) {
      return { text: decoded, passes, limitReached: false };
    }
    current = decoded;
  }

  let limitReached = false;
  try {
    limitReached =
      decodeOnce(current, options.scope, options.formSpace) !== current;
  } catch {
    // The bound was honored. A newly revealed malformed escape is not decoded.
  }
  return { text: current, passes, limitReached };
}
