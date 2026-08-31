import { describe, expect, it } from "vitest";
import {
  UuidCoreError,
  formatUuid,
  generateUuidBatch,
  supportsUuidBulk,
  uuidNamespaces,
} from "./index";

const canonical =
  /^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

describe("UUID generation", () => {
  it.each(["v1", "v4", "v6", "v7"] as const)(
    "generates a unique bulk batch for %s with RFC version and variant bits",
    (version) => {
      const values = generateUuidBatch({ version, count: 250 });
      expect(values).toHaveLength(250);
      expect(new Set(values)).toHaveLength(250);
      for (const value of values) {
        expect(value).toMatch(canonical);
        expect(value[14]).toBe(version.slice(1));
      }
    },
  );

  it("uses a randomized multicast node for UUID v1", () => {
    const [value] = generateUuidBatch({ version: "v1" });
    expect(Number.parseInt(value.slice(24, 26), 16) & 1).toBe(1);
  });

  it("creates RFC name-based UUID vectors for v3 and v5", () => {
    expect(
      generateUuidBatch({
        version: "v3",
        namespaceKind: "dns",
        name: "www.widgets.com",
      }),
    ).toEqual(["3d813cbb-47fb-32ba-91df-831e1593ac29"]);
    expect(
      generateUuidBatch({
        version: "v5",
        namespaceKind: "dns",
        name: "www.widgets.com",
      }),
    ).toEqual(["21f7f8de-8051-5b89-8680-0195ef798b6a"]);
  });

  it("accepts a custom namespace and preserves Unicode names", () => {
    const options = {
      version: "v5" as const,
      namespaceKind: "custom" as const,
      customNamespace: uuidNamespaces.url,
      name: "https://example.com/사용자/42",
    };
    expect(generateUuidBatch(options)).toEqual(generateUuidBatch(options));
  });

  it("rejects invalid counts and namespace input with typed errors", () => {
    expect(() =>
      generateUuidBatch({ version: "v4", count: 1_001 }),
    ).toThrowError(new UuidCoreError("invalid-count"));
    expect(() =>
      generateUuidBatch({
        version: "v5",
        name: "example",
        namespaceKind: "custom",
        customNamespace: "not-a-uuid",
      }),
    ).toThrowError(new UuidCoreError("invalid-namespace"));
  });

  it("limits deterministic versions to one result", () => {
    expect(
      generateUuidBatch({
        version: "v5",
        name: "example",
        count: 100,
      }),
    ).toHaveLength(1);
    expect(supportsUuidBulk("v5")).toBe(false);
    expect(supportsUuidBulk("v7")).toBe(true);
  });
});

describe("UUID formatting", () => {
  const value = "550e8400-e29b-41d4-a716-446655440000";

  it("formats standard, braced, URN, and compact output", () => {
    expect(formatUuid(value, "canonical", "lower")).toBe(value);
    expect(formatUuid(value, "braces", "upper")).toBe(
      "{550E8400-E29B-41D4-A716-446655440000}",
    );
    expect(formatUuid(value, "urn", "upper")).toBe(
      "urn:uuid:550E8400-E29B-41D4-A716-446655440000",
    );
    expect(formatUuid(value, "compact", "lower")).toBe(
      "550e8400e29b41d4a716446655440000",
    );
  });
});
