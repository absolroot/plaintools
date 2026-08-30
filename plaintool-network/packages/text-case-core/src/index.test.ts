import { describe, expect, it } from "vitest";
import { convertCase, type CaseMode } from "./index";

describe("convertCase", () => {
  it("uses the default Unicode upper- and lowercase mappings", () => {
    expect(convertCase("Straße İSTANBUL ΟΣ", "upper")).toBe(
      "STRASSE İSTANBUL ΟΣ",
    );
    expect(convertCase("Straße İSTANBUL ΟΣ", "lower")).toBe(
      "straße i\u0307stanbul ος",
    );
  });

  it("uses locale-aware mappings when the route locale is provided", () => {
    expect(convertCase("istanbul ızmir", "upper", "tr")).toBe("İSTANBUL IZMİR");
    expect(convertCase("I İ", "lower", "tr")).toBe("ı i");
    expect(convertCase("İSTANBUL. IZMIR", "sentence", "tr")).toBe(
      "İstanbul. Izmır",
    );
    expect(convertCase("İSTANBUL IZMIR", "capitalize-words", "tr")).toBe(
      "İstanbul Izmır",
    );
  });

  it("does not normalize combining sequences", () => {
    const decomposed = "Cafe\u0301";
    expect(convertCase(decomposed, "upper")).toBe("CAFE\u0301");
    expect(convertCase(decomposed, "lower")).toBe("cafe\u0301");
    expect(convertCase(decomposed, "upper")).not.toBe(
      convertCase(decomposed.normalize("NFC"), "upper"),
    );
  });

  it("preserves whitespace and mixed line endings", () => {
    const input = "  FIRST\r\n\tSECOND\rthird\nfourth  ";
    expect(convertCase(input, "sentence")).toBe(
      "  First\r\n\tSecond\rThird\nFourth  ",
    );
  });

  it("capitalizes the first cased character through quotes and numbers", () => {
    expect(convertCase("123 “HELLO.” 456 'WORLD'", "sentence")).toBe(
      "123 “Hello.” 456 'World'",
    );
  });

  it("recognizes ASCII and full-width sentence terminators", () => {
    expect(
      convertCase("ONE. TWO! THREE? FOUR。 FIVE！ SIX？ SEVEN", "sentence"),
    ).toBe("One. Two! Three? Four。 Five！ Six？ Seven");
  });

  it("uses the documented simple rule for abbreviations and decimals", () => {
    expect(convertCase("DR. SMITH USES VERSION 1.2 BETA", "sentence")).toBe(
      "Dr. Smith uses version 1.2 Beta",
    );
  });

  it("handles expanding and contextual case mappings", () => {
    expect(convertCase("ßETA. ΟΣ", "sentence")).toBe("SSeta. Ος");
    expect(convertCase("ßETA ΟΣ", "capitalize-words")).toBe("SSeta Ος");
  });

  it("capitalizes each Unicode word while retaining internal apostrophes", () => {
    expect(
      convertCase("O'NEILL ROCK’N’ROLL TWO-WORDS FOO_BAR", "capitalize-words"),
    ).toBe("O'neill Rock’n’roll Two-Words Foo_Bar");
  });

  it("capitalizes the first cased character after leading marks or numbers", () => {
    expect(convertCase("\u0301E 42ND", "capitalize-words")).toBe(
      "\u0301E 42Nd",
    );
  });

  it("treats surrounding apostrophes as punctuation, not word joins", () => {
    expect(convertCase("'HELLO' ’WORLD’", "capitalize-words")).toBe(
      "'Hello' ’World’",
    );
  });

  it("leaves emoji and scripts without case unchanged", () => {
    const input = "👩🏽‍💻 한국어 日本語";
    const modes: CaseMode[] = [
      "upper",
      "lower",
      "sentence",
      "capitalize-words",
    ];

    for (const mode of modes) {
      expect(convertCase(input, mode)).toBe(input);
    }
  });

  it("satisfies fixed-seed conversion invariants", () => {
    let seed = 0x5eed1234;
    const next = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed;
    };
    const alphabet = Array.from(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .!?-_\r\n'’한국어日本語👩‍💻",
    );

    for (let sample = 0; sample < 100; sample += 1) {
      let input = "";
      const length = next() % 160;
      for (let index = 0; index < length; index += 1) {
        input += alphabet[next() % alphabet.length];
      }

      expect(convertCase(input, "upper")).toBe(input.toUpperCase());
      expect(convertCase(input, "lower")).toBe(input.toLowerCase());

      for (const mode of ["sentence", "capitalize-words"] as const) {
        const converted = convertCase(input, mode);
        expect(convertCase(converted, mode)).toBe(converted);
        expect(converted.replace(/[\p{L}\p{M}]/gu, "")).toBe(
          input.toLowerCase().replace(/[\p{L}\p{M}]/gu, ""),
        );
      }
    }
  });
});
