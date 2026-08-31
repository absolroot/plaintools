export const PASSWORD_LENGTH_MIN = 1;
export const PASSWORD_LENGTH_MAX = 128;

export const passwordCharacterSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/|",
} as const;

export const AMBIGUOUS_PASSWORD_CHARACTERS = "Il1O0o|";

export type PasswordCharacterSet = keyof typeof passwordCharacterSets;
export type PasswordGenerationErrorCode =
  | "invalid-length"
  | "no-character-sets"
  | "invalid-random-source";

export type RandomUint32Source = () => number;

export interface PasswordGenerationOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordGenerationResult {
  password: string;
  poolSize: number;
  enabledSetCount: number;
  coverageGuaranteed: boolean;
  /** Entropy of the uniform generated-string space, before operational risks. */
  entropyBits: number;
}

export class PasswordGenerationError extends Error {
  constructor(readonly code: PasswordGenerationErrorCode) {
    super(code);
    this.name = "PasswordGenerationError";
  }
}

const UINT32_RANGE = 0x1_0000_0000;
const characterSetOrder = [
  "lowercase",
  "uppercase",
  "digits",
  "symbols",
] as const satisfies readonly PasswordCharacterSet[];

function nextUint32(source: RandomUint32Source): number {
  const value = source();
  if (!Number.isInteger(value) || value < 0 || value >= UINT32_RANGE) {
    throw new PasswordGenerationError("invalid-random-source");
  }
  return value;
}

function randomIndex(
  upperExclusive: number,
  source: RandomUint32Source,
): number {
  const acceptedRange =
    UINT32_RANGE - (UINT32_RANGE % Math.trunc(upperExclusive));
  let value = nextUint32(source);
  while (value >= acceptedRange) value = nextUint32(source);
  return value % upperExclusive;
}

function removeAmbiguousCharacters(characters: string): string {
  return [...characters]
    .filter((character) => !AMBIGUOUS_PASSWORD_CHARACTERS.includes(character))
    .join("");
}

export function estimateEntropyUpperBound(
  length: number,
  poolSize: number,
): number {
  if (!Number.isFinite(length) || length <= 0 || poolSize <= 1) return 0;
  return length * Math.log2(poolSize);
}

export function estimateCoveredEntropy(
  length: number,
  setSizes: readonly number[],
): number {
  const poolSize = setSizes.reduce((sum, size) => sum + size, 0);
  if (
    !Number.isInteger(length) ||
    length <= 0 ||
    !setSizes.length ||
    setSizes.some((size) => !Number.isInteger(size) || size <= 0) ||
    length < setSizes.length
  ) {
    return 0;
  }

  let validFraction = 0;
  const subsetCount = 1 << setSizes.length;
  for (let mask = 0; mask < subsetCount; mask += 1) {
    let excludedSize = 0;
    let excludedSets = 0;
    for (let index = 0; index < setSizes.length; index += 1) {
      if ((mask & (1 << index)) === 0) continue;
      excludedSize += setSizes[index];
      excludedSets += 1;
    }
    const remainingRatio = (poolSize - excludedSize) / poolSize;
    const term = remainingRatio ** length;
    validFraction += excludedSets % 2 === 0 ? term : -term;
  }

  if (validFraction <= 0) return 0;
  return length * Math.log2(poolSize) + Math.log2(validFraction);
}

export function generatePassword(
  options: PasswordGenerationOptions,
  randomUint32: RandomUint32Source,
): PasswordGenerationResult {
  if (
    !Number.isInteger(options.length) ||
    options.length < PASSWORD_LENGTH_MIN ||
    options.length > PASSWORD_LENGTH_MAX
  ) {
    throw new PasswordGenerationError("invalid-length");
  }

  const enabledSets = characterSetOrder
    .filter((name) => options[name])
    .map((name) => passwordCharacterSets[name])
    .map((characters) =>
      options.excludeAmbiguous
        ? removeAmbiguousCharacters(characters)
        : characters,
    )
    .filter(Boolean);

  if (!enabledSets.length) {
    throw new PasswordGenerationError("no-character-sets");
  }

  const pool = enabledSets.join("");
  const coverageGuaranteed = options.length >= enabledSets.length;
  let characters: string[];
  do {
    characters = Array.from(
      { length: options.length },
      () => pool[randomIndex(pool.length, randomUint32)],
    );
  } while (
    coverageGuaranteed &&
    enabledSets.some(
      (set) => !characters.some((character) => set.includes(character)),
    )
  );

  return {
    password: characters.join(""),
    poolSize: pool.length,
    enabledSetCount: enabledSets.length,
    coverageGuaranteed,
    entropyBits: coverageGuaranteed
      ? estimateCoveredEntropy(
          options.length,
          enabledSets.map((set) => set.length),
        )
      : estimateEntropyUpperBound(options.length, pool.length),
  };
}
