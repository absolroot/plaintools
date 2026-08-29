import type {
  DecodedJwt,
  JwtErrorCode,
  JwtTimestampClaim,
} from "@plaintool/jwt-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface JwtDecoderCopy {
  ariaLabel: string;
  inputLabel: string;
  inputPlaceholder: string;
  headerLabel: string;
  payloadLabel: string;
  signatureLabel: string;
  copyHeaderLabel: string;
  copyPayloadLabel: string;
  copySignatureLabel: string;
  /** Includes the `{count}` placeholder. */
  signatureBytes: string;
  timestampsLabel: string;
  timestampClaims: Record<JwtTimestampClaim, string>;
  invalidTimestamp: string;
  noTimestamps: string;
  noVerificationTitle: string;
  noVerificationBody: string;
  decoded: string;
  outdated: string;
  tooLarge: string;
  errors: Record<JwtErrorCode, string>;
}

export interface JwtClientCopy {
  feature: JwtDecoderCopy;
  common: ToolCommonCopy;
}

export type JwtWorkerRequest = { id: number; input: string };
export type JwtWorkerReply =
  | { id: number; ok: true; result: DecodedJwt }
  | { id: number; ok: false; error: JwtErrorCode | "processing-failed" };
export type JwtRunContext = { revision: number; source: string };
