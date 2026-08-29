export type JwtErrorCode =
  | "empty-input"
  | "segment-count"
  | "empty-header"
  | "empty-payload"
  | "invalid-base64url"
  | "invalid-utf8"
  | "invalid-json-header"
  | "invalid-json-payload"
  | "invalid-header-shape"
  | "invalid-payload-shape";

export class JwtError extends Error {
  constructor(public readonly code: JwtErrorCode) {
    super(code);
    this.name = "JwtError";
  }
}

export type JsonObject = Record<string, unknown>;
export type JwtTimestampClaim = "exp" | "nbf" | "iat";

export type JwtTimestamp =
  | {
      claim: JwtTimestampClaim;
      valid: true;
      seconds: number;
      milliseconds: number;
      iso: string;
    }
  | {
      claim: JwtTimestampClaim;
      valid: false;
    };

export interface DecodedJwt {
  header: JsonObject;
  payload: JsonObject;
  headerText: string;
  payloadText: string;
  signature: {
    base64url: string;
    byteLength: number;
    hex: string;
  };
  timestamps: JwtTimestamp[];
}

const BASE64URL = /^([A-Za-z0-9_-]*)(={0,2})$/u;
const timestampClaims: JwtTimestampClaim[] = ["exp", "nbf", "iat"];

function decodeBase64Url(segment: string): Uint8Array {
  const match = segment.match(BASE64URL);
  if (!match) {
    throw new JwtError("invalid-base64url");
  }
  const [, body, existingPadding] = match;
  if (body.length % 4 === 1) throw new JwtError("invalid-base64url");
  const requiredPadding = (4 - (body.length % 4)) % 4;
  if (
    existingPadding &&
    (segment.length % 4 !== 0 || existingPadding.length !== requiredPadding)
  ) {
    throw new JwtError("invalid-base64url");
  }
  const normalized = body.replace(/-/gu, "+").replace(/_/gu, "/");
  const padded = normalized.padEnd(normalized.length + requiredPadding, "=");
  try {
    const binary = globalThis.atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    throw new JwtError("invalid-base64url");
  }
}

function decodeText(segment: string): string {
  const bytes = decodeBase64Url(segment);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new JwtError("invalid-utf8");
  }
}

function parseObject(text: string, target: "header" | "payload"): JsonObject {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new JwtError(
      target === "header" ? "invalid-json-header" : "invalid-json-payload",
    );
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new JwtError(
      target === "header" ? "invalid-header-shape" : "invalid-payload-shape",
    );
  }
  return parsed as JsonObject;
}

function normalizeTimestamps(payload: JsonObject): JwtTimestamp[] {
  return timestampClaims.flatMap((claim): JwtTimestamp[] => {
    if (!(claim in payload)) return [];
    const seconds = payload[claim];
    if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
      return [{ claim, valid: false }];
    }
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
    if (!Number.isFinite(milliseconds) || Number.isNaN(date.getTime())) {
      return [{ claim, valid: false }];
    }
    try {
      return [
        {
          claim,
          valid: true,
          seconds,
          milliseconds,
          iso: date.toISOString(),
        },
      ];
    } catch {
      return [{ claim, valid: false }];
    }
  });
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export function decodeJwt(input: string): DecodedJwt {
  const token = input.trim();
  if (!token) throw new JwtError("empty-input");
  const segments = token.split(".");
  if (segments.length !== 3) throw new JwtError("segment-count");
  if (!segments[0]) throw new JwtError("empty-header");
  if (!segments[1]) throw new JwtError("empty-payload");

  const headerText = decodeText(segments[0]);
  const payloadText = decodeText(segments[1]);
  const header = parseObject(headerText, "header");
  const payload = parseObject(payloadText, "payload");
  const signatureBytes = decodeBase64Url(segments[2]);

  return {
    header,
    payload,
    headerText: JSON.stringify(header, null, 2),
    payloadText: JSON.stringify(payload, null, 2),
    signature: {
      base64url: segments[2],
      byteLength: signatureBytes.byteLength,
      hex: bytesToHex(signatureBytes),
    },
    timestamps: normalizeTimestamps(payload),
  };
}
