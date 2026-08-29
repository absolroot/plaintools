import { describe, expect, it } from "vitest";
import { UrlCodecError, decodeUrl, encodeUrl } from "./index";

describe("URL codec core", () => {
  it("round-trips multilingual UTF-8 component text", () => {
    const source = "안녕하세요 / café? x=1&y=둘";
    const encoded = encodeUrl(source, { scope: "component", formSpace: false });
    expect(encoded).toBe(
      "%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%20%2F%20caf%C3%A9%3F%20x%3D1%26y%3D%EB%91%98",
    );
    expect(
      decodeUrl(encoded, {
        scope: "component",
        formSpace: false,
        recursive: false,
        maxPasses: 1,
      }).text,
    ).toBe(source);
  });

  it("preserves URI structure in full URI mode", () => {
    const source = "https://example.com/a path?q=hello world&x=1#top";
    expect(encodeUrl(source, { scope: "uri", formSpace: false })).toBe(
      "https://example.com/a%20path?q=hello%20world&x=1#top",
    );
  });

  it("supports form-style spaces without changing literal percent rules", () => {
    const encoded = encodeUrl("a+b c", {
      scope: "component",
      formSpace: true,
    });
    expect(encoded).toBe("a%2Bb+c");
    expect(
      decodeUrl(encoded, {
        scope: "component",
        formSpace: true,
        recursive: false,
        maxPasses: 1,
      }).text,
    ).toBe("a+b c");
  });

  it("applies form-space semantics on every recursive layer", () => {
    expect(
      decodeUrl("a%252Bb", {
        scope: "component",
        formSpace: true,
        recursive: true,
        maxPasses: 3,
      }).text,
    ).toBe("a b");
  });

  it("decodes recursively within the requested bound", () => {
    const result = decodeUrl("hello%252520world", {
      scope: "component",
      formSpace: false,
      recursive: true,
      maxPasses: 2,
    });
    expect(result).toEqual({
      text: "hello%20world",
      passes: 2,
      limitReached: true,
    });
  });

  it("stops recursive decoding once output is stable", () => {
    expect(
      decodeUrl("plain-text", {
        scope: "component",
        formSpace: false,
        recursive: true,
        maxPasses: 5,
      }),
    ).toEqual({ text: "plain-text", passes: 1, limitReached: false });
  });

  it("does not inspect malformed data beyond the requested decode bound", () => {
    expect(
      decodeUrl("%252", {
        scope: "component",
        formSpace: false,
        recursive: true,
        maxPasses: 1,
      }),
    ).toEqual({ text: "%2", passes: 1, limitReached: false });
  });

  it("reports malformed percent escapes distinctly", () => {
    expect(() =>
      decodeUrl("bad%2", {
        scope: "component",
        formSpace: false,
        recursive: false,
        maxPasses: 1,
      }),
    ).toThrowError(new UrlCodecError("invalid-percent-sequence"));
  });

  it("reports percent-encoded invalid UTF-8 distinctly", () => {
    expect(() =>
      decodeUrl("%E0%A4%A", {
        scope: "component",
        formSpace: false,
        recursive: false,
        maxPasses: 1,
      }),
    ).toThrowError(new UrlCodecError("invalid-percent-sequence"));
    expect(() =>
      decodeUrl("%E0%A4%A6%E0%A4", {
        scope: "component",
        formSpace: false,
        recursive: false,
        maxPasses: 1,
      }),
    ).toThrowError(new UrlCodecError("invalid-utf8"));
  });

  it("rejects recursive pass limits outside the supported range", () => {
    expect(() =>
      decodeUrl("a", {
        scope: "component",
        formSpace: false,
        recursive: true,
        maxPasses: 11,
      }),
    ).toThrowError(new UrlCodecError("invalid-pass-limit"));
  });
});
