import { describe, expect, it } from "vitest";
import { JwtError, decodeJwt } from "./index";

function base64Url(value: string): string {
  return btoa(unescape(encodeURIComponent(value)))
    .replace(/=/gu, "")
    .replace(/\+/gu, "-")
    .replace(/\//gu, "_");
}

describe("JWT core", () => {
  it("decodes padded and unpadded Base64URL JSON segments", () => {
    const token = `${base64Url('{"alg":"HS256","typ":"JWT"}')}.${base64Url(
      '{"sub":"한글","admin":true}',
    )}.AQID`;
    const result = decodeJwt(token);
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload).toEqual({ sub: "한글", admin: true });
    expect(result.signature).toEqual({
      base64url: "AQID",
      byteLength: 3,
      hex: "010203",
    });

    const padded = decodeJwt("eyJhbGciOiJub25lIn0=.e30=.");
    expect(padded.header).toEqual({ alg: "none" });
    expect(padded.payload).toEqual({});
  });

  it("accepts an empty signature segment for unsecured three-part tokens", () => {
    const result = decodeJwt(
      `${base64Url('{"alg":"none"}')}.${base64Url('{"sub":"123"}')}.`,
    );
    expect(result.signature).toEqual({
      base64url: "",
      byteLength: 0,
      hex: "",
    });
  });

  it("normalizes NumericDate claims to ISO timestamps", () => {
    const payload = JSON.stringify({ exp: 1_700_000_000, nbf: 0, iat: 1.5 });
    const result = decodeJwt(
      `${base64Url('{"alg":"none"}')}.${base64Url(payload)}.`,
    );
    expect(result.timestamps).toEqual([
      {
        claim: "exp",
        valid: true,
        seconds: 1_700_000_000,
        milliseconds: 1_700_000_000_000,
        iso: "2023-11-14T22:13:20.000Z",
      },
      {
        claim: "nbf",
        valid: true,
        seconds: 0,
        milliseconds: 0,
        iso: "1970-01-01T00:00:00.000Z",
      },
      {
        claim: "iat",
        valid: true,
        seconds: 1.5,
        milliseconds: 1500,
        iso: "1970-01-01T00:00:01.500Z",
      },
    ]);
  });

  it("marks non-numeric and out-of-range timestamp claims invalid", () => {
    const payload = JSON.stringify({ exp: "soon", nbf: 9e20 });
    const result = decodeJwt(
      `${base64Url('{"alg":"none"}')}.${base64Url(payload)}.`,
    );
    expect(result.timestamps).toEqual([
      { claim: "exp", valid: false },
      { claim: "nbf", valid: false },
    ]);
  });

  it("distinguishes token structure, Base64URL, UTF-8, and JSON errors", () => {
    expect(() => decodeJwt("one.two")).toThrowError(
      new JwtError("segment-count"),
    );
    expect(() => decodeJwt("*.e30.")).toThrowError(
      new JwtError("invalid-base64url"),
    );
    expect(() => decodeJwt("e30==.e30.")).toThrowError(
      new JwtError("invalid-base64url"),
    );
    expect(() => decodeJwt("_w.e30.")).toThrowError(
      new JwtError("invalid-utf8"),
    );
    expect(() => decodeJwt(`${base64Url("nope")}.e30.`)).toThrowError(
      new JwtError("invalid-json-header"),
    );
  });

  it("requires JSON objects for header and payload", () => {
    expect(() =>
      decodeJwt(`${base64Url("[]")}.${base64Url("{}")}.`),
    ).toThrowError(new JwtError("invalid-header-shape"));
    expect(() =>
      decodeJwt(`${base64Url("{}")}.${base64Url("null")}.`),
    ).toThrowError(new JwtError("invalid-payload-shape"));
  });
});
