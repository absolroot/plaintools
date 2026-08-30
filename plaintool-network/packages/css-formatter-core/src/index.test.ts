import { describe, expect, it } from "vitest";
import { CssInputError, formatCss } from "./index";

describe("CSS source formatting", () => {
  it("formats selectors, declarations, comments, and custom properties", async () => {
    const output = await formatCss(
      ":root{--space:calc(1rem + 2px)}/* lead */.card,.panel{color:red;margin:0 auto}",
    );
    expect(output).toContain("--space: calc(1rem + 2px);");
    expect(output).toContain("/* lead */");
    expect(output).toContain(".card,");
    expect(output).toContain("color: red;");
  });

  it("formats at-rules, keyframes, and supported native nesting", async () => {
    const output = await formatCss(
      "@media (width >= 40rem){.card{&:hover{opacity:.8}}}@keyframes fade{from{opacity:0}to{opacity:1}}",
    );
    expect(output).toContain("@media (width >= 40rem) {");
    expect(output).toContain("  &:hover {");
    expect(output).toContain("@keyframes fade {");
  });

  it("keeps URL and string values as inert source text", async () => {
    const output = await formatCss(
      '.hero{background-image:url("https://example.invalid/image.png");content:"a  b"}',
    );
    expect(output).toContain('url("https://example.invalid/image.png")');
    expect(output).toContain('content: "a  b";');
  });

  it.each([
    [4, "    color: red;"],
    ["tab", "\tcolor: red;"],
  ] as const)(
    "supports the %s indentation option",
    async (indent, expected) => {
      expect(await formatCss(".card{color:red}", { indent })).toContain(
        expected,
      );
    },
  );

  it("honors print width for a long selector list", async () => {
    const output = await formatCss(".alpha,.beta,.gamma,.delta{color:red}", {
      printWidth: 20,
    });
    expect(output).toContain(".alpha,\n.beta,\n.gamma,\n.delta");
  });

  it("returns a typed location for malformed CSS", async () => {
    await expect(
      formatCss(".card {\n  color: ;\n  broken\n}"),
    ).rejects.toMatchObject({
      name: "CssInputError",
      issue: expect.objectContaining({
        code: "SyntaxError",
        line: 3,
        column: 3,
      }),
    } satisfies Partial<CssInputError>);
  });
});
