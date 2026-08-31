import { describe, expect, it, vi } from "vitest";
import {
  AMBIGUOUS_PASSWORD_CHARACTERS,
  estimateCoveredEntropy,
  estimateEntropyUpperBound,
  generatePassword,
  passwordCharacterSets,
  PasswordGenerationError,
  type PasswordGenerationOptions,
} from "./index";

const allSets: PasswordGenerationOptions = {
  length: 20,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
};

function sequenceSource(seed = 0): () => number {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1_664_525) + 1_013_904_223) >>> 0;
    return value;
  };
}

describe("password core", () => {
  it("is deterministic with an injected random source and covers every enabled set", () => {
    const first = generatePassword(allSets, sequenceSource(42));
    const second = generatePassword(allSets, sequenceSource(42));

    expect(first).toEqual(second);
    expect(first.password).toHaveLength(20);
    expect(first.password).toMatch(/[a-z]/u);
    expect(first.password).toMatch(/[A-Z]/u);
    expect(first.password).toMatch(/[0-9]/u);
    expect(
      [...first.password].some((character) =>
        passwordCharacterSets.symbols.includes(character),
      ),
    ).toBe(true);
    expect(first.coverageGuaranteed).toBe(true);
  });

  it("removes lookalike characters from every selected set", () => {
    const result = generatePassword(
      { ...allSets, length: 128, excludeAmbiguous: true },
      sequenceSource(7),
    );

    for (const character of AMBIGUOUS_PASSWORD_CHARACTERS) {
      expect(result.password).not.toContain(character);
    }
  });

  it("uses unbiased rejection sampling instead of reducing every value modulo the pool", () => {
    const random = vi
      .fn()
      .mockReturnValueOnce(0xffff_ffff)
      .mockReturnValueOnce(0);
    const result = generatePassword(
      {
        ...allSets,
        length: 1,
        uppercase: false,
        digits: false,
        symbols: false,
      },
      random,
    );

    expect(result.password).toBe("a");
    expect(random).toHaveBeenCalledTimes(2);
  });

  it("reports when enabled-set coverage is impossible at the requested length", () => {
    const result = generatePassword(
      { ...allSets, length: 2 },
      sequenceSource(99),
    );

    expect(result.password).toHaveLength(2);
    expect(result.coverageGuaranteed).toBe(false);
    expect(result.enabledSetCount).toBe(4);
  });

  it("rejects invalid lengths, empty character selections, and invalid random values", () => {
    expect(() =>
      generatePassword({ ...allSets, length: 0 }, sequenceSource()),
    ).toThrow(new PasswordGenerationError("invalid-length"));
    expect(() =>
      generatePassword(
        {
          ...allSets,
          lowercase: false,
          uppercase: false,
          digits: false,
          symbols: false,
        },
        sequenceSource(),
      ),
    ).toThrow(new PasswordGenerationError("no-character-sets"));
    expect(() =>
      generatePassword(
        {
          ...allSets,
          length: 1,
          uppercase: false,
          digits: false,
          symbols: false,
        },
        () => Number.NaN,
      ),
    ).toThrow(new PasswordGenerationError("invalid-random-source"));
  });

  it("returns a search-space upper bound without rounding away information", () => {
    expect(estimateEntropyUpperBound(10, 2)).toBe(10);
    expect(estimateEntropyUpperBound(0, 62)).toBe(0);
    expect(generatePassword(allSets, sequenceSource()).poolSize).toBe(
      Object.values(passwordCharacterSets).join("").length,
    );
  });

  it("calculates the entropy of the uniform strings that cover selected sets", () => {
    expect(estimateCoveredEntropy(2, [1, 1])).toBe(1);
    expect(estimateCoveredEntropy(1, [1, 1])).toBe(0);
    const sizes = Object.values(passwordCharacterSets).map(
      (characters) => characters.length,
    );
    expect(estimateCoveredEntropy(20, sizes)).toBeLessThan(
      estimateEntropyUpperBound(
        20,
        sizes.reduce((sum, size) => sum + size, 0),
      ),
    );
  });
});
