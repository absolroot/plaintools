import {
  v1 as uuidV1,
  v3 as uuidV3,
  v4 as uuidV4,
  v5 as uuidV5,
  v6 as uuidV6,
  v7 as uuidV7,
  validate as validateUuid,
} from "uuid";

export const uuidVersions = ["v4", "v7", "v1", "v3", "v5", "v6"] as const;
export type UuidVersion = (typeof uuidVersions)[number];

export const uuidNamespaceKinds = [
  "dns",
  "url",
  "oid",
  "x500",
  "custom",
] as const;
export type UuidNamespaceKind = (typeof uuidNamespaceKinds)[number];

export const uuidNamespaces = {
  dns: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  url: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  oid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  x500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
} as const;

export const uuidOutputFormats = [
  "canonical",
  "braces",
  "urn",
  "compact",
] as const;
export type UuidOutputFormat = (typeof uuidOutputFormats)[number];
export type UuidLetterCase = "lower" | "upper";

export type UuidErrorCode =
  | "invalid-count"
  | "name-required"
  | "namespace-required"
  | "invalid-namespace"
  | "generation-failed";

export class UuidCoreError extends Error {
  readonly code: UuidErrorCode;

  constructor(code: UuidErrorCode) {
    super(code);
    this.name = "UuidCoreError";
    this.code = code;
  }
}

export type GenerateUuidOptions = {
  version: UuidVersion;
  count?: number;
  name?: string;
  namespaceKind?: UuidNamespaceKind;
  customNamespace?: string;
};

export function isNameBasedUuidVersion(
  version: UuidVersion,
): version is "v3" | "v5" {
  return version === "v3" || version === "v5";
}

export function supportsUuidBulk(version: UuidVersion): boolean {
  return !isNameBasedUuidVersion(version);
}

function resolveNamespace(options: GenerateUuidOptions): string {
  const kind = options.namespaceKind ?? "dns";
  if (kind !== "custom") return uuidNamespaces[kind];

  const custom = options.customNamespace?.trim();
  if (!custom) throw new UuidCoreError("namespace-required");
  if (!validateUuid(custom)) throw new UuidCoreError("invalid-namespace");
  return custom;
}

function normalizedCount(options: GenerateUuidOptions): number {
  if (isNameBasedUuidVersion(options.version)) return 1;
  const count = options.count ?? 1;
  if (!Number.isInteger(count) || count < 1 || count > 1_000) {
    throw new UuidCoreError("invalid-count");
  }
  return count;
}

function generateOne(options: GenerateUuidOptions): string {
  switch (options.version) {
    case "v1":
      return uuidV1();
    case "v3": {
      if (!options.name) throw new UuidCoreError("name-required");
      return uuidV3(options.name, resolveNamespace(options));
    }
    case "v4":
      return uuidV4();
    case "v5": {
      if (!options.name) throw new UuidCoreError("name-required");
      return uuidV5(options.name, resolveNamespace(options));
    }
    case "v6":
      return uuidV6();
    case "v7":
      return uuidV7();
  }
}

export function generateUuidBatch(options: GenerateUuidOptions): string[] {
  const count = normalizedCount(options);
  try {
    return Array.from({ length: count }, () => generateOne(options));
  } catch (error) {
    if (error instanceof UuidCoreError) throw error;
    throw new UuidCoreError("generation-failed");
  }
}

export function formatUuid(
  uuid: string,
  format: UuidOutputFormat,
  letterCase: UuidLetterCase,
): string {
  if (!validateUuid(uuid)) throw new UuidCoreError("generation-failed");
  const body = letterCase === "upper" ? uuid.toUpperCase() : uuid.toLowerCase();
  switch (format) {
    case "canonical":
      return body;
    case "braces":
      return `{${body}}`;
    case "urn":
      return `urn:uuid:${body}`;
    case "compact":
      return body.replaceAll("-", "");
  }
}
