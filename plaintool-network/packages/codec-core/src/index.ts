export type CodecMode = "decode" | "encode";
export type Base64Variant = "auto" | "standard" | "url";
export type OutputView = "text" | "hex";

export interface CodecOptions {
  mode: CodecMode;
  variant: Base64Variant;
  charset: string;
  strict: boolean;
  lineByLine: boolean;
  recursive: boolean;
  autoRepair: boolean;
  lenientRepair: boolean;
  outputView: OutputView;
  includePadding: boolean;
  mimeWrap: boolean;
  dataUri: boolean;
}

export type Base64DecodeOptions = Pick<
  CodecOptions,
  "variant" | "strict" | "autoRepair" | "lenientRepair"
>;

export type DecodeOptions = Base64DecodeOptions &
  Pick<CodecOptions, "charset" | "lineByLine" | "recursive" | "outputView">;

export type EncodeOptions = Pick<
  CodecOptions,
  "variant" | "includePadding" | "mimeWrap" | "dataUri"
>;

export type RepairCode =
  | "data-uri-removed"
  | "whitespace-removed"
  | "url-alphabet-normalized"
  | "padding-added"
  | "invalid-characters-removed";

export type CodecErrorCode =
  | "empty-input"
  | "invalid-character"
  | "invalid-length"
  | "decode-failed"
  | "unsupported-charset";

export type CodecWarningCode = "executable-file" | "binary-output";

export interface FileSignature {
  mime: string;
  extension: string;
  preview: "text" | "image" | "download";
  executable?: boolean;
}

export interface CodecResult {
  mode: CodecMode;
  kind: "text" | "binary" | "base64";
  text: string;
  bytes?: Uint8Array;
  repairs: RepairCode[];
  warnings: CodecWarningCode[];
  signature?: FileSignature;
  detectedVariant?: "standard" | "url";
  decodePasses?: number;
}

export class CodecError extends Error {
  constructor(
    public readonly code: CodecErrorCode,
    message?: string,
  ) {
    super(message || code);
    this.name = "CodecError";
  }
}

const STANDARD_BODY = /^[A-Za-z0-9+/]*={0,2}$/;
const URL_BODY = /^[A-Za-z0-9_-]*={0,2}$/;

type NativeBase64Options = {
  alphabet?: "base64" | "base64url";
  lastChunkHandling?: "loose" | "strict" | "stop-before-partial";
  omitPadding?: boolean;
};

type NativeBase64Uint8Array = Uint8Array & {
  toBase64?: (options?: NativeBase64Options) => string;
};

type NativeBase64Uint8ArrayConstructor = typeof Uint8Array & {
  fromBase64?: (input: string, options?: NativeBase64Options) => Uint8Array;
};

export const defaultOptions: CodecOptions = {
  mode: "decode",
  variant: "auto",
  charset: "utf-8",
  strict: false,
  lineByLine: false,
  recursive: true,
  autoRepair: true,
  lenientRepair: false,
  outputView: "text",
  includePadding: true,
  mimeWrap: false,
  dataUri: false,
};

function getAtob(): (value: string) => string {
  if (typeof globalThis.atob !== "function") {
    throw new CodecError(
      "decode-failed",
      "Base64 decoding is unavailable in this browser.",
    );
  }
  return globalThis.atob.bind(globalThis);
}

function getBtoa(): (value: string) => string {
  if (typeof globalThis.btoa !== "function") {
    throw new CodecError(
      "decode-failed",
      "Base64 encoding is unavailable in this browser.",
    );
  }
  return globalThis.btoa.bind(globalThis);
}

export function normalizeBase64(
  rawInput: string,
  options: Base64DecodeOptions,
): {
  normalized: string;
  repairs: RepairCode[];
  variant: "standard" | "url";
  mime?: string;
} {
  if (!rawInput.trim()) throw new CodecError("empty-input");

  const repairs: RepairCode[] = [];
  let input = rawInput;
  let mime: string | undefined;
  const dataUri = input.match(/^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,/i);
  if (dataUri) {
    if (options.strict) throw new CodecError("invalid-character");
    mime = dataUri[1] || undefined;
    input = input.slice(dataUri[0].length);
    repairs.push("data-uri-removed");
  }

  if (/\s/.test(input)) {
    if (options.strict || !options.autoRepair)
      throw new CodecError("invalid-character");
    input = input.replace(/\s+/g, "");
    repairs.push("whitespace-removed");
  }

  const detectedUrl = /[-_]/.test(input);
  const variant =
    options.variant === "auto"
      ? detectedUrl
        ? "url"
        : "standard"
      : options.variant;
  const allowed = variant === "url" ? URL_BODY : STANDARD_BODY;

  if (!allowed.test(input)) {
    if (options.strict || !options.lenientRepair)
      throw new CodecError("invalid-character");
    input = input.replace(
      variant === "url" ? /[^A-Za-z0-9_=-]/g : /[^A-Za-z0-9+/=]/g,
      "",
    );
    repairs.push("invalid-characters-removed");
  }

  if (variant === "url") {
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    if (detectedUrl) repairs.push("url-alphabet-normalized");
  }

  const body = input.replace(/=+$/, "");
  if (body.length % 4 === 1) throw new CodecError("invalid-length");
  const requiredPadding = (4 - (body.length % 4)) % 4;
  const existingPadding = input.length - body.length;

  if (existingPadding) {
    if (input.length % 4 !== 0 || existingPadding !== requiredPadding)
      throw new CodecError("invalid-length");
    input = body + "=".repeat(existingPadding);
  } else if (requiredPadding) {
    if (options.strict || !options.autoRepair)
      throw new CodecError("invalid-length");
    input = body + "=".repeat(requiredPadding);
    repairs.push("padding-added");
  } else {
    input = body;
  }

  return { normalized: input, repairs: [...new Set(repairs)], variant, mime };
}

export function decodeBase64Bytes(
  input: string,
  options: Base64DecodeOptions,
): {
  bytes: Uint8Array;
  repairs: RepairCode[];
  variant: "standard" | "url";
  mime?: string;
} {
  const normalized = normalizeBase64(input, options);
  try {
    const nativeFromBase64 = (Uint8Array as NativeBase64Uint8ArrayConstructor)
      .fromBase64;
    let bytes: Uint8Array;
    if (typeof nativeFromBase64 === "function") {
      bytes = nativeFromBase64.call(Uint8Array, normalized.normalized, {
        alphabet: "base64",
        lastChunkHandling: "loose",
      });
    } else {
      const binary = getAtob()(normalized.normalized);
      bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1)
        bytes[index] = binary.charCodeAt(index);
    }
    return {
      bytes,
      repairs: normalized.repairs,
      variant: normalized.variant,
      mime: normalized.mime,
    };
  } catch (error) {
    if (error instanceof CodecError) throw error;
    throw new CodecError("decode-failed");
  }
}

export function encodeBytes(bytes: Uint8Array, options: EncodeOptions): string {
  const nativeToBase64 = (bytes as NativeBase64Uint8Array).toBase64;
  let output: string;
  if (typeof nativeToBase64 === "function") {
    output = nativeToBase64.call(bytes, {
      alphabet: options.variant === "url" ? "base64url" : "base64",
      omitPadding: !options.includePadding,
    });
  } else {
    const chunkSize = 0x8000;
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(
        ...bytes.subarray(offset, offset + chunkSize),
      );
    }
    output = getBtoa()(binary);
    if (options.variant === "url")
      output = output.replace(/\+/g, "-").replace(/\//g, "_");
    if (!options.includePadding) output = output.replace(/=+$/, "");
  }
  if (options.mimeWrap)
    output = output.match(/.{1,76}/g)?.join("\r\n") || output;
  if (options.dataUri)
    output = `data:application/octet-stream;base64,${output}`;
  return output;
}

export function encodeText(input: string, options: EncodeOptions): CodecResult {
  if (!input) throw new CodecError("empty-input");
  const bytes = new TextEncoder().encode(input);
  return {
    mode: "encode",
    kind: "base64",
    text: encodeBytes(bytes, options),
    bytes,
    repairs: [],
    warnings: [],
    detectedVariant: options.variant === "url" ? "url" : "standard",
  };
}

export function decodeBytesToText(bytes: Uint8Array, charset: string): string {
  try {
    return new TextDecoder(charset, { fatal: false }).decode(bytes);
  } catch {
    throw new CodecError("unsupported-charset");
  }
}

export function isLikelyText(bytes: Uint8Array, text: string): boolean {
  if (!bytes.length) return true;
  const sample = bytes.subarray(0, Math.min(bytes.length, 8192));
  if (sample.some((byte) => byte === 0)) return false;
  let printable = 0;
  for (const char of text.slice(0, 8192)) {
    const code = char.codePointAt(0) || 0;
    if (char === "\n" || char === "\r" || char === "\t" || code >= 32)
      printable += 1;
  }
  return (
    printable / Math.max(1, Math.min(text.length, 8192)) > 0.82 &&
    !text.includes("�")
  );
}

function starts(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value);
}

export function detectFileSignature(
  bytes: Uint8Array,
  _hintedMime?: string,
): FileSignature | undefined {
  if (starts(bytes, [0x89, 0x50, 0x4e, 0x47]))
    return { mime: "image/png", extension: "png", preview: "image" };
  if (starts(bytes, [0xff, 0xd8, 0xff]))
    return { mime: "image/jpeg", extension: "jpg", preview: "image" };
  if (starts(bytes, [0x47, 0x49, 0x46, 0x38]))
    return { mime: "image/gif", extension: "gif", preview: "image" };
  if (
    starts(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP"
  )
    return { mime: "image/webp", extension: "webp", preview: "image" };
  if (starts(bytes, [0x25, 0x50, 0x44, 0x46]))
    return { mime: "application/pdf", extension: "pdf", preview: "download" };
  if (starts(bytes, [0x50, 0x4b, 0x03, 0x04]))
    return { mime: "application/zip", extension: "zip", preview: "download" };
  if (starts(bytes, [0x4d, 0x5a]))
    return {
      mime: "application/vnd.microsoft.portable-executable",
      extension: "exe",
      preview: "download",
      executable: true,
    };
  return undefined;
}

export function bytesToHex(bytes: Uint8Array, limit = 65536): string {
  const shown = bytes.subarray(0, Math.min(bytes.length, limit));
  const rows: string[] = [];
  for (let offset = 0; offset < shown.length; offset += 16) {
    const chunk = shown.subarray(offset, offset + 16);
    const hex = [...chunk]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(" ")
      .padEnd(47, " ");
    const ascii = [...chunk]
      .map((byte) =>
        byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".",
      )
      .join("");
    rows.push(`${offset.toString(16).padStart(8, "0")}  ${hex}  ${ascii}`);
  }
  if (bytes.length > limit) rows.push(`… ${bytes.length - limit} more bytes`);
  return rows.join("\n");
}

export function decodeText(input: string, options: DecodeOptions): CodecResult {
  const decodeLayers = (value: string, allowBinary: boolean) => {
    let decoded = decodeBase64Bytes(value, options);
    let repairs = [...decoded.repairs];
    let detectedVariant = decoded.variant;
    let decodePasses = 1;

    while (options.recursive && decodePasses < 10) {
      const text = decodeBytesToText(decoded.bytes, options.charset);
      const signature = detectFileSignature(decoded.bytes, decoded.mime);
      if (signature || !isLikelyText(decoded.bytes, text)) break;

      const nestedInput = text.trim();
      if (
        nestedInput.length < 4 ||
        (nestedInput.length < 8 && !nestedInput.includes("="))
      )
        break;

      try {
        const next = decodeBase64Bytes(nestedInput, options);
        const nextText = decodeBytesToText(next.bytes, options.charset);
        const nextSignature = detectFileSignature(next.bytes, next.mime);
        const nextIsText = !nextSignature && isLikelyText(next.bytes, nextText);
        if ((!allowBinary && nextSignature) || (!nextSignature && !nextIsText))
          break;
        decoded = next;
        repairs = [...repairs, ...next.repairs];
        if (next.variant === "url") detectedVariant = "url";
        decodePasses += 1;
      } catch (error) {
        if (error instanceof CodecError) break;
        throw error;
      }
    }

    return {
      ...decoded,
      repairs: [...new Set(repairs)],
      variant: detectedVariant,
      decodePasses,
    };
  };

  if (options.lineByLine) {
    const lines = input.split(/\r?\n/).filter((line) => line.trim());
    if (!lines.length) throw new CodecError("empty-input");
    const decoded = lines.map((line) => {
      const result = decodeLayers(line, false);
      return {
        ...result,
        text: decodeBytesToText(result.bytes, options.charset),
      };
    });
    return {
      mode: "decode",
      kind: "text",
      text: decoded.map((item) => item.text).join("\n"),
      repairs: [...new Set(decoded.flatMap((item) => item.repairs))],
      warnings: [],
      detectedVariant: decoded.some((item) => item.variant === "url")
        ? "url"
        : "standard",
      decodePasses: Math.max(...decoded.map((item) => item.decodePasses)),
    };
  }

  const decoded = decodeLayers(input, true);
  const text = decodeBytesToText(decoded.bytes, options.charset);
  const signature = detectFileSignature(decoded.bytes, decoded.mime);
  const textLike = !signature && isLikelyText(decoded.bytes, text);
  return {
    mode: "decode",
    kind: textLike ? "text" : "binary",
    text:
      options.outputView === "hex" || !textLike
        ? bytesToHex(decoded.bytes)
        : text,
    bytes: decoded.bytes,
    repairs: decoded.repairs,
    warnings: signature?.executable
      ? ["executable-file"]
      : textLike
        ? []
        : ["binary-output"],
    signature,
    detectedVariant: decoded.variant,
    decodePasses: decoded.decodePasses,
  };
}
