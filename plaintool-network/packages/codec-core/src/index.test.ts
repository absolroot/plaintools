import { describe, expect, it } from "vitest";
import {
  CodecError,
  HEX_PREVIEW_BYTE_LIMIT,
  decodeBase64Bytes,
  decodeText,
  defaultOptions,
  detectFileSignature,
  encodeBytes,
  encodeText,
  normalizeBase64,
} from "./index";

describe("codec core", () => {
  it("round-trips multilingual UTF-8 text", () => {
    const source = "Hello · 안녕하세요 · Español · 👋";
    const encoded = encodeText(source, defaultOptions);
    const decoded = decodeText(encoded.text, defaultOptions);
    expect(decoded.text).toBe(source);
  });

  it("does not report a repair for correct padding", () => {
    const result = decodeText("Zg==", defaultOptions);
    expect(result.text).toBe("f");
    expect(result.repairs).toEqual([]);
  });

  it("lets strict mode reject inputs that need repair", () => {
    expect(() =>
      decodeText("Zg", { ...defaultOptions, strict: true }),
    ).toThrowError(CodecError);
    expect(() =>
      decodeText("Z g==", { ...defaultOptions, strict: true }),
    ).toThrowError(CodecError);
  });

  it("normalizes Base64URL and missing padding", () => {
    const normalized = normalizeBase64("SGVsbG8td29ybGQ_", defaultOptions);
    expect(normalized.variant).toBe("url");
    expect(normalized.repairs).toContain("url-alphabet-normalized");
  });

  it("decodes nested Base64 layers when recursive decoding is enabled", () => {
    const inner = encodeText("nested value", defaultOptions).text;
    const outer = encodeText(inner, defaultOptions).text;
    const result = decodeText(outer, { ...defaultOptions, recursive: true });

    expect(result.text).toBe("nested value");
    expect(result.decodePasses).toBe(2);
  });

  it("stops recursive decoding when the next layer is not text or a known file", () => {
    const encoded = encodeText("test", defaultOptions).text;
    const result = decodeText(encoded, defaultOptions);

    expect(result.text).toBe("test");
    expect(result.decodePasses).toBe(1);
  });

  it("leaves nested Base64 visible by default", () => {
    const inner = encodeText("nested value", defaultOptions).text;
    const outer = encodeText(inner, defaultOptions).text;
    const result = decodeText(outer, defaultOptions);

    expect(result.text).toBe(inner);
    expect(result.decodePasses).toBe(1);
  });

  it("strips a data URI and whitespace with visible repairs", () => {
    const normalized = normalizeBase64(
      "data:text/plain;base64,SGVs\n bG8=",
      defaultOptions,
    );
    expect(normalized.normalized).toBe("SGVsbG8=");
    expect(normalized.repairs).toEqual(
      expect.arrayContaining(["data-uri-removed", "whitespace-removed"]),
    );
  });

  it("rejects impossible lengths", () => {
    expect(() => normalizeBase64("A", defaultOptions)).toThrowError(CodecError);
  });

  it("detects safe image and executable signatures", () => {
    expect(
      detectFileSignature(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))?.preview,
    ).toBe("image");
    expect(detectFileSignature(new Uint8Array([0x4d, 0x5a]))?.executable).toBe(
      true,
    );
  });

  it("returns typed warning codes for binary and executable output", () => {
    expect(decodeText("AA==", defaultOptions).warnings).toEqual([
      "binary-output",
    ]);
    expect(decodeText("TVo=", defaultOptions).warnings).toEqual([
      "executable-file",
    ]);
  });

  it("reports decoded byte length and explicit hex preview truncation", () => {
    const bytes = new Uint8Array(HEX_PREVIEW_BYTE_LIMIT + 1);
    const encoded = encodeBytes(bytes, defaultOptions);
    const result = decodeText(encoded, {
      ...defaultOptions,
      outputView: "hex",
    });

    expect(result.byteLength).toBe(HEX_PREVIEW_BYTE_LIMIT + 1);
    expect(result.hexPreviewTruncated).toBe(true);
    expect(result.text).toContain("… 1 more bytes");
  });

  it("does not trust a claimed image MIME type without matching magic bytes", () => {
    expect(
      detectFileSignature(
        new TextEncoder().encode("<script>alert(1)</script>"),
        "image/png",
      ),
    ).toBeUndefined();
  });

  it("uses native Uint8Array Base64 methods when the browser provides them", () => {
    const constructorDescriptor = Object.getOwnPropertyDescriptor(
      Uint8Array,
      "fromBase64",
    );
    const prototypeDescriptor = Object.getOwnPropertyDescriptor(
      Uint8Array.prototype,
      "toBase64",
    );
    let decodedInput = "";
    let encodedOptions: unknown;

    try {
      Object.defineProperty(Uint8Array, "fromBase64", {
        configurable: true,
        value(input: string) {
          decodedInput = input;
          return new Uint8Array([102, 111, 111]);
        },
      });
      Object.defineProperty(Uint8Array.prototype, "toBase64", {
        configurable: true,
        value(options: unknown) {
          encodedOptions = options;
          return "Zm9v";
        },
      });

      expect(decodeBase64Bytes("Zm9v", defaultOptions).bytes).toEqual(
        new Uint8Array([102, 111, 111]),
      );
      expect(decodedInput).toBe("Zm9v");
      expect(
        encodeBytes(new Uint8Array([102, 111, 111]), {
          ...defaultOptions,
          variant: "url",
          includePadding: false,
        }),
      ).toBe("Zm9v");
      expect(encodedOptions).toEqual({
        alphabet: "base64url",
        omitPadding: true,
      });
    } finally {
      if (constructorDescriptor)
        Object.defineProperty(Uint8Array, "fromBase64", constructorDescriptor);
      else
        delete (Uint8Array as typeof Uint8Array & { fromBase64?: unknown })
          .fromBase64;
      if (prototypeDescriptor)
        Object.defineProperty(
          Uint8Array.prototype,
          "toBase64",
          prototypeDescriptor,
        );
      else
        delete (Uint8Array.prototype as Uint8Array & { toBase64?: unknown })
          .toBase64;
    }
  });
});
