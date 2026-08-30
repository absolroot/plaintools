import { describe, expect, it } from "vitest";
import { getRelatedTools } from "./related-tools";

describe("related tools", () => {
  it("returns eight unique available tools without the current tool", () => {
    const tools = getRelatedTools("word-counter");

    expect(tools).toHaveLength(8);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(8);
    expect(tools.every((tool) => tool.status === "available")).toBe(true);
    expect(tools.some((tool) => tool.slug === "word-counter")).toBe(false);
  });

  it("puts the reverse conversion first", () => {
    expect(getRelatedTools("csv-to-markdown")[0]?.slug).toBe("markdown-to-csv");
    expect(getRelatedTools("qr-code-generator")[0]?.slug).toBe(
      "qr-code-scanner",
    );
  });
});
