export const hashAlgorithms = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const;
export type HashAlgorithm = (typeof hashAlgorithms)[number];
export type HashResults = Record<HashAlgorithm, string>;

export type ChecksumComparison =
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "match" | "mismatch"; algorithm: HashAlgorithm };

export type HashErrorCode = "empty-input" | "digest-unavailable";

export class HashError extends Error {
  constructor(public readonly code: HashErrorCode) {
    super(code);
    this.name = "HashError";
  }
}

export function compareExpectedChecksum(
  expected: string,
  results: HashResults,
): ChecksumComparison {
  const normalized = expected.trim().toLowerCase();
  if (!normalized) return { status: "empty" };
  if (!/^[0-9a-f]+$/u.test(normalized)) return { status: "invalid" };

  const algorithm = hashAlgorithms.find(
    (candidate) => results[candidate].length === normalized.length,
  );
  if (!algorithm) return { status: "invalid" };
  return {
    status:
      results[algorithm].toLowerCase() === normalized ? "match" : "mismatch",
    algorithm,
  };
}

function rotateLeft(value: number, bits: number): number {
  return (value << bits) | (value >>> (32 - bits));
}

function toHexWordLittleEndian(value: number): string {
  let output = "";
  for (let offset = 0; offset < 4; offset += 1) {
    output += ((value >>> (offset * 8)) & 0xff).toString(16).padStart(2, "0");
  }
  return output;
}

export function md5(bytes: Uint8Array): string {
  const originalLength = bytes.byteLength;
  const paddedLength = Math.ceil((originalLength + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[originalLength] = 0x80;
  const bitLength = BigInt(originalLength) * 8n;
  for (let index = 0; index < 8; index += 1) {
    padded[paddedLength - 8 + index] = Number(
      (bitLength >> BigInt(index * 8)) & 0xffn,
    );
  }

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;
  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
    9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
    16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21,
  ];
  const constants = Array.from({ length: 64 }, (_, index) =>
    Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32),
  );

  for (let offset = 0; offset < paddedLength; offset += 64) {
    const words = new Uint32Array(16);
    for (let index = 0; index < 16; index += 1) {
      const start = offset + index * 4;
      words[index] =
        padded[start] |
        (padded[start + 1] << 8) |
        (padded[start + 2] << 16) |
        (padded[start + 3] << 24);
    }

    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let index = 0; index < 64; index += 1) {
      let f: number;
      let wordIndex: number;
      if (index < 16) {
        f = (b & c) | (~b & d);
        wordIndex = index;
      } else if (index < 32) {
        f = (d & b) | (~d & c);
        wordIndex = (5 * index + 1) % 16;
      } else if (index < 48) {
        f = b ^ c ^ d;
        wordIndex = (3 * index + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        wordIndex = (7 * index) % 16;
      }
      const previousD = d;
      d = c;
      c = b;
      b =
        (b +
          rotateLeft(
            (a + f + constants[index] + words[wordIndex]) | 0,
            shifts[index],
          )) |
        0;
      a = previousD;
    }

    a0 = (a0 + a) | 0;
    b0 = (b0 + b) | 0;
    c0 = (c0 + c) | 0;
    d0 = (d0 + d) | 0;
  }

  return [a0, b0, c0, d0].map(toHexWordLittleEndian).join("");
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function hashBytes(
  input: Uint8Array,
  algorithm: HashAlgorithm,
): Promise<string> {
  if (!input.byteLength) throw new HashError("empty-input");
  if (algorithm === "MD5") return md5(input);
  if (!globalThis.crypto?.subtle) throw new HashError("digest-unavailable");

  try {
    const digestInput = Uint8Array.from(input);
    const digest = await globalThis.crypto.subtle.digest(
      algorithm,
      digestInput.buffer,
    );
    return bytesToHex(new Uint8Array(digest));
  } catch {
    throw new HashError("digest-unavailable");
  }
}

export async function hashAllBytes(input: Uint8Array): Promise<HashResults> {
  if (!input.byteLength) throw new HashError("empty-input");
  const results = {} as HashResults;
  for (const algorithm of hashAlgorithms) {
    results[algorithm] = await hashBytes(input, algorithm);
  }
  return results;
}

export async function hashText(input: string): Promise<HashResults> {
  if (!input) throw new HashError("empty-input");
  return hashAllBytes(new TextEncoder().encode(input));
}
