import { describe, expect, it } from "vitest";
import { getRelatedTools } from "./related-tools";

describe("related tools", () => {
  it("fills the discovery grid with unique available popular tools", () => {
    const tools = getRelatedTools("word-counter");

    expect(tools).toHaveLength(7);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(7);
    expect(tools.every((tool) => tool.status === "available")).toBe(true);
    expect(tools.some((tool) => tool.slug === "word-counter")).toBe(false);
  });

  it("keeps direct reversals where the reverse action is the next task", () => {
    expect(getRelatedTools("csv-to-markdown")[0]?.slug).toBe("markdown-to-csv");
    expect(getRelatedTools("qr-code-generator")[0]?.slug).toBe(
      "qr-code-scanner",
    );
  });

  it("puts task-completion edges ahead of popular discovery tools", () => {
    expect(
      getRelatedTools("merge-pdf")
        .slice(0, 1)
        .map((tool) => tool.slug),
    ).toEqual(["compress-pdf"]);
    expect(
      getRelatedTools("pdf-to-image")
        .slice(0, 2)
        .map((tool) => tool.slug),
    ).toEqual(["image-resizer", "image-crop"]);
    expect(getRelatedTools("csv-to-json")[0]?.slug).toBe("json-formatter");
  });

  it("keeps an image conversion route discoverable without inventing a conversion pair", () => {
    expect(getRelatedTools("jpg-to-png").map((tool) => tool.slug)).toEqual([
      "json-formatter",
      "word-counter",
      "qr-code-generator",
      "url-encode",
      "case-converter",
      "unix-timestamp-converter",
      "text-compare",
      "password-generator",
    ]);
  });
});
