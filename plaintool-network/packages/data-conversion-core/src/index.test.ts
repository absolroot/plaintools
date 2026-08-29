import { describe, expect, it } from "vitest";
import {
  DataConversionError,
  convertData,
  csvToJson,
  csvToMarkdown,
  detectCsvDelimiter,
  htmlToMarkdown,
  jsonToCsv,
  markdownToCsv,
  markdownToHtml,
  parseCsv,
  parseMarkdownTable,
  serializeCsv,
} from "./index";

describe("CSV parsing and serialization", () => {
  it("parses escaped quotes, delimiters, CRLF, and quoted newlines", () => {
    expect(parseCsv('name,note\r\n"Ada, A.","line 1\r\nline ""2"""')).toEqual([
      ["name", "note"],
      ["Ada, A.", 'line 1\r\nline "2"'],
    ]);
  });

  it("detects common delimiters without counting quoted delimiters", () => {
    expect(detectCsvDelimiter('a;b;c\n"1,2";3;4')).toBe(";");
    expect(detectCsvDelimiter("a\tb\n1\t2")).toBe("\t");
    expect(detectCsvDelimiter("single column")).toBe(",");
  });

  it("removes a BOM, preserves empty cells, and can skip empty lines", () => {
    expect(parseCsv("\uFEFFa,b\n,\n\n", { skipEmptyLines: true })).toEqual([
      ["a", "b"],
      ["", ""],
    ]);
  });

  it("reports the location of malformed quoted fields", () => {
    expect(() => parseCsv('a,b\n"open,b')).toThrowError(DataConversionError);
    try {
      parseCsv('a,b\n"open,b');
    } catch (error) {
      expect(error).toMatchObject({ code: "invalid-csv", line: 2, column: 8 });
    }
  });

  it("quotes values that would not round-trip unquoted", () => {
    const rows = [[" spaced ", 'a"b', "line\nbreak", "plain"]];
    const encoded = serializeCsv(rows);
    expect(encoded).toBe('" spaced ","a""b","line\nbreak",plain');
    expect(parseCsv(encoded)).toEqual(rows);
  });
});

describe("CSV and Markdown tables", () => {
  it("creates a rectangular Markdown table and escapes table syntax", () => {
    expect(csvToMarkdown('name,note\nAda,"a|b"\nLin,"x\ny"')).toBe(
      "| name | note |\n| --- | --- |\n| Ada | a\\|b |\n| Lin | x<br>y |",
    );
  });

  it("supports a table without a source header", () => {
    expect(csvToMarkdown("a,b\n1,2", { firstRowHeader: false })).toBe(
      "|  |  |\n| --- | --- |\n| a | b |\n| 1 | 2 |",
    );
  });

  it("finds a table in surrounding prose and tolerates alignment markers", () => {
    const markdown = [
      "Before",
      "",
      "| Name | Value |",
      "| :--- | ---: |",
      "| one | two |",
      "",
      "After",
    ].join("\n");
    expect(parseMarkdownTable(markdown)).toEqual([
      ["Name", "Value"],
      ["one", "two"],
    ]);
  });

  it("preserves escaped and inline-code pipes and converts breaks", () => {
    expect(markdownToCsv("| a | b |\n|-|-|\n| x\\|y | `a|b`<br>next |")).toBe(
      'a,b\r\nx|y,"`a|b`\nnext"',
    );
  });

  it("rejects Markdown without a table separator", () => {
    expect(() => markdownToCsv("one | two")).toThrowError(
      expect.objectContaining({ code: "missing-markdown-table" }),
    );
  });
});

describe("JSON and CSV", () => {
  it("uses the union of object keys and serializes nested values compactly", () => {
    expect(
      jsonToCsv(
        JSON.stringify([
          { id: 1, profile: { name: "Ada" }, tags: ["a", "b"] },
          { id: 2, active: false, profile: null },
        ]),
      ),
    ).toBe(
      'id,profile,tags,active\r\n1,"{""name"":""Ada""}","[""a"",""b""]",\r\n2,,,false',
    );
  });

  it("requires an array of objects", () => {
    for (const value of [{ id: 1 }, [1, 2], [null]]) {
      expect(() => jsonToCsv(JSON.stringify(value))).toThrowError(
        expect.objectContaining({ code: "invalid-json-shape" }),
      );
    }
  });

  it("returns an empty document for arrays with no columns", () => {
    expect(jsonToCsv("[]")).toBe("");
    expect(jsonToCsv("[{},{}]")).toBe("");
  });

  it("reports invalid JSON with a source location", () => {
    expect(() => jsonToCsv('[{"a": 1},\n]')).toThrowError(
      expect.objectContaining({ code: "invalid-json", line: 2 }),
    );
  });

  it("maps headers to strings and fills missing trailing cells", () => {
    expect(csvToJson("name,age,note\nAda,37\nLin,29,ok")).toBe(
      JSON.stringify(
        [
          { name: "Ada", age: "37", note: "" },
          { name: "Lin", age: "29", note: "ok" },
        ],
        null,
        2,
      ),
    );
  });

  it("rejects empty and duplicate headers instead of losing data", () => {
    expect(() => csvToJson("name,,age\na,b,c")).toThrowError(
      expect.objectContaining({ code: "empty-header", column: 2 }),
    );
    expect(() => csvToJson("name,name\na,b")).toThrowError(
      expect.objectContaining({ code: "duplicate-header" }),
    );
    expect(() => csvToJson("name\nAda,extra")).toThrowError(
      expect.objectContaining({ code: "invalid-csv", line: 2, column: 2 }),
    );
  });
});

describe("HTML and Markdown", () => {
  it("converts headings, links, lists, emphasis, and fenced code", () => {
    const output = htmlToMarkdown(
      '<h2>Title</h2><p>Hello <strong>world</strong> <a href="/docs">docs</a>.</p><ul><li>One</li><li>Two</li></ul><pre><code>let x = 1;</code></pre>',
    );
    expect(output).toContain("## Title");
    expect(output).toContain("**world**");
    expect(output).toContain("[docs](/docs)");
    expect(output).toContain("-   One");
    expect(output).toContain("```\nlet x = 1;\n```");
  });

  it("retains HTML tables as Markdown tables", () => {
    expect(
      htmlToMarkdown(
        "<table><tr><th>Name</th><th>Score</th></tr><tr><td>Ada</td><td>10</td></tr></table>",
      ),
    ).toBe("| Name | Score |\n| --- | --- |\n| Ada | 10 |");
  });

  it("renders GFM tables and fenced code as HTML text", () => {
    const output = markdownToHtml(
      "# Title\n\n| A | B |\n|-|-|\n| 1 | 2 |\n\n```js\nalert(1)\n```",
    );
    expect(output).toContain("<h1>Title</h1>");
    expect(output).toContain("<table>");
    expect(output).toContain('<code class="language-js">');
  });

  it("keeps raw HTML in the returned source without executing it", () => {
    expect(markdownToHtml('<img src=x onerror="alert(1)">')).toContain(
      "onerror",
    );
  });
});

describe("convertData", () => {
  it("dispatches all six modes", () => {
    expect(convertData("csv-to-markdown", "a,b\n1,2")).toContain("| a | b |");
    expect(convertData("markdown-to-csv", "|a|b|\n|-|-|\n|1|2|")).toBe(
      "a,b\r\n1,2",
    );
    expect(convertData("json-to-csv", '[{"a":1}]')).toBe("a\r\n1");
    expect(convertData("csv-to-json", "a\n1")).toContain('"a": "1"');
    expect(convertData("html-to-markdown", "<h1>A</h1>")).toBe("# A");
    expect(convertData("markdown-to-html", "# A")).toBe("<h1>A</h1>\n");
  });
});
