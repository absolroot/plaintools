import { describe, expect, it } from "vitest";
import { formatJson, inspectJson, JsonInputError, minifyJson } from "./index";

describe("strict JSON tools", () => {
  it("formats without changing a large numeric lexeme", () => {
    const value = '{"id":900719925474099312345,"escaped":"a\\n b"}';
    expect(formatJson(value, 2)).toContain("900719925474099312345");
    expect(formatJson(value, 2)).toContain('"a\\n b"');
  });

  it("minifies only insignificant whitespace", () => {
    expect(minifyJson('{ "value": "a b", "n": 1 }')).toBe(
      '{"value":"a b","n":1}',
    );
  });

  it.each(['{// no\n"a":1}', '{"a":1,}', "{'a':1}"])(
    "rejects non-RFC JSON: %s",
    (value) => {
      expect(inspectJson(value).valid).toBe(false);
    },
  );

  it("preserves duplicate keys and reports a warning", () => {
    const source = '{"a":1,"a":2}';
    expect(inspectJson(source).duplicateKeys).toHaveLength(1);
    expect(minifyJson(source)).toBe(source);
  });

  it("strips a BOM with an explicit notice", () => {
    expect(inspectJson('\uFEFF{"ok":true}')).toMatchObject({
      valid: true,
      bomRemoved: true,
      source: '{"ok":true}',
    });
  });

  it("reports the first error position", () => {
    expect(inspectJson('{\n  "a": }').errors[0]).toMatchObject({
      line: 2,
      column: 8,
    });
  });

  it("throws a typed error with the first syntax issue", () => {
    expect(() => formatJson('{"a":}')).toThrowError(
      expect.objectContaining({
        name: "JsonInputError",
        issue: expect.objectContaining({
          code: "ValueExpected",
          line: 1,
          column: 6,
        }),
      } satisfies Partial<JsonInputError>),
    );
  });
});
