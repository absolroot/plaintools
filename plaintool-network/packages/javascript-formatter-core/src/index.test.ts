import { afterEach, describe, expect, it } from "vitest";
import {
  JavaScriptInputError,
  formatJavaScript,
  minifyJavaScript,
  processJavaScript,
} from "./index";

describe("JavaScript source formatting", () => {
  it("formats functions, objects, and expressions", async () => {
    const output = await formatJavaScript(
      "const double=(value)=>{const options={enabled:true,count:2};return value*options.count}",
    );
    expect(output).toContain("const double = (value) => {");
    expect(output).toContain("enabled: true");
    expect(output).toContain("return value * options.count;");
  });

  it("parses and prints ECMAScript modules", async () => {
    const output = await formatJavaScript(
      'import value from "./value.js";export const result={value};',
    );
    expect(output).toContain('import value from "./value.js";');
    expect(output).toContain("export const result = { value };");
  });

  it("supports modern syntax without executing it", async () => {
    const output = await formatJavaScript(
      "const read=async(source)=>await source?.load?.();",
    );
    expect(output).toContain("async (source)");
    expect(output).toContain("source?.load?.()");
  });

  it("preserves source comments while formatting", async () => {
    const output = await formatJavaScript(
      "// explanation\nconst value=1;/* tail */",
    );
    expect(output).toContain("// explanation");
    expect(output).toContain("/* tail */");
  });

  it.each([
    [4, "    return true;"],
    ["tab", "\treturn true;"],
  ] as const)(
    "supports the %s indentation option",
    async (indent, expected) => {
      const output = await formatJavaScript("function ready(){return true}", {
        indent,
      });
      expect(output).toContain(expected);
    },
  );

  it("supports print width, quote, and semicolon format options", async () => {
    const output = await formatJavaScript(
      'const record={first:"alpha",second:"beta",third:"gamma"};',
      { printWidth: 32, singleQuote: true, semi: false },
    );
    expect(output).toContain("first: 'alpha'");
    expect(output).toContain("\n  second:");
    expect(output.trimEnd().endsWith(";")).toBe(false);
  });

  it("returns a typed syntax location for malformed source", async () => {
    await expect(
      formatJavaScript("const ready = true;\nfunction broken( {"),
    ).rejects.toMatchObject({
      name: "JavaScriptInputError",
      issue: {
        code: "SyntaxError",
        line: 2,
        column: expect.any(Number),
      },
    } satisfies Partial<JavaScriptInputError>);
  });
});

describe("JavaScript source minification", () => {
  it("removes layout without compression or identifier mangling", async () => {
    const output = await minifyJavaScript(
      "function double(longName) { const unused = 1; return longName * 2; }",
    );
    expect(output).toContain("longName");
    expect(output).toContain("unused");
    expect(output).toContain("return longName*2");
  });

  it("minifies module syntax", async () => {
    const output = await minifyJavaScript(
      'import value from "./value.js"; export { value };',
    );
    expect(output).toContain('import value from"./value.js"');
    expect(output).toContain("export{value}");
  });

  it("retains an executable shebang while removing ordinary comments", async () => {
    const output = await minifyJavaScript(
      "#!/usr/bin/env node\n// explanation\nconst value = 1;",
    );
    expect(output.startsWith("#!/usr/bin/env node")).toBe(true);
    expect(output).not.toContain("explanation");
  });

  it("preserves legal comments by default and all comments only on request", async () => {
    const input =
      "/*! license */\n/* @preserve attribution */\n// note\nconst value = 1;";
    const defaultOutput = await minifyJavaScript(input);
    expect(defaultOutput).toContain("/*! license */");
    expect(defaultOutput).toContain("@preserve attribution");
    expect(defaultOutput).not.toContain("// note");
    const preserved = await minifyJavaScript(input, {
      preserveComments: true,
    });
    expect(preserved).toContain("/*! license */");
    expect(preserved).toContain("@preserve attribution");
    expect(preserved).toContain("// note");
  });

  it("returns a typed syntax location for malformed minify input", async () => {
    await expect(
      minifyJavaScript("const value = ;\nconst next = 2;"),
    ).rejects.toMatchObject({
      name: "JavaScriptInputError",
      issue: {
        code: "SyntaxError",
        line: 1,
        column: expect.any(Number),
      },
    } satisfies Partial<JavaScriptInputError>);
  });
});

describe("JavaScript processing boundary", () => {
  const sentinel = "__PLAINTOOL_JAVASCRIPT_FORMATTER_SENTINEL__";

  afterEach(() => {
    Reflect.deleteProperty(globalThis, sentinel);
  });

  it("does not execute source in either mode", async () => {
    const input = `globalThis.${sentinel} = true;`;
    await formatJavaScript(input);
    await minifyJavaScript(input);
    expect(Reflect.get(globalThis, sentinel)).toBeUndefined();
  });

  it.each(["format", "minify"] as const)(
    "dispatches the %s operation explicitly",
    async (mode) => {
      const output = await processJavaScript("const value = 1;", { mode });
      expect(output).toContain("const value=1".slice(0, 5));
    },
  );

  it("rejects whitespace-only input with a typed code", async () => {
    await expect(formatJavaScript(" \n\t")).rejects.toMatchObject({
      issue: { code: "EmptyInput" },
    });
  });
});
