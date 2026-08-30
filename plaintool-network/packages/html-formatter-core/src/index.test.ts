import { describe, expect, it } from "vitest";
import { formatHtml, HtmlInputError } from "./index";

describe("HTML source formatting", () => {
  it("formats nested markup, attributes, and comments", async () => {
    const output = await formatHtml(
      '<main class="page"><!-- lead --><article data-id="7"><h1>Hello</h1><p>World</p></article></main>',
    );
    expect(output).toContain('class="page"');
    expect(output).toContain("<!-- lead -->");
    expect(output).toContain('  <article data-id="7">');
    expect(output).toContain("    <h1>Hello</h1>");
  });

  it("keeps embedded style and script source within HTML-plugin scope", async () => {
    const output = await formatHtml(
      "<style>body{color:red}</style><script>const value={ok:true};</script>",
    );
    expect(output).toContain("  body{color:red}");
    expect(output).toContain("  const value={ok:true};");
  });

  it("covers Prettier's whitespace-sensitive pre and code behavior", async () => {
    const source =
      "<pre>  first\n    second</pre><p>Use <code>a   b</code> now.</p>";
    const output = await formatHtml(source);
    expect(output).toContain("<pre>\n  first\n    second</pre>");
    expect(output).toContain("<code>a b</code>");
  });

  it.each([
    [4, "    <section>"],
    ["tab", "\t<section>"],
  ] as const)(
    "supports the %s indentation option",
    async (indent, expected) => {
      const output = await formatHtml(
        "<div><section><span>two</span></section></div>",
        {
          indent,
        },
      );
      expect(output).toContain(expected);
    },
  );

  it("honors print width for attributes", async () => {
    const output = await formatHtml(
      '<div class="alpha" data-first="one" data-second="two">text</div>',
      { printWidth: 35 },
    );
    expect(output).toContain('\n  class="alpha"');
    expect(output).toContain('\n  data-second="two"');
  });

  it("returns a typed actionable location for malformed HTML", async () => {
    await expect(formatHtml("<div>\n  <span></div>")).rejects.toMatchObject({
      name: "HtmlInputError",
      issue: expect.objectContaining({
        code: "SyntaxError",
        line: 2,
        column: 9,
      }),
    } satisfies Partial<HtmlInputError>);
  });
});
