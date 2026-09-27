import { describe, expect, it } from "vitest";
import { getRelatedTools } from "./related-tools";
import { toolCatalog } from "./tool-catalog";
import type { ToolPage } from "./site";
import { parseImageConversionMode } from "../features/image-converter/formats";

describe("related tools", () => {
  it("fills the discovery grid with unique available popular tools", () => {
    const tools = getRelatedTools("word-counter");

    expect(tools).toHaveLength(8);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(8);
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

  it("links image reversals and both shared input and output formats", () => {
    const tools = getRelatedTools("jpg-to-png");
    expect(tools[0]?.slug).toBe("png-to-jpg");
    const modes = tools
      .slice(1)
      .map((tool) => parseImageConversionMode(tool.id));
    expect(
      modes.every((mode) => mode?.source === "jpg" || mode?.target === "png"),
    ).toBe(true);
    expect(modes.some((mode) => mode?.source === "jpg")).toBe(true);
    expect(modes.some((mode) => mode?.target === "png")).toBe(true);
    expect(
      getRelatedTools("svg-to-png").every(
        (tool) => !tool.slug?.endsWith("-to-svg"),
      ),
    ).toBe(true);
  });

  it("keeps PDF, calculator, and text neighbors ahead of general discovery", () => {
    expect(
      getRelatedTools("compress-pdf")
        .slice(0, 4)
        .every((tool) => tool.category === "pdf"),
    ).toBe(true);
    expect(getRelatedTools("factor-calculator")[0]?.slug).toBe(
      "lcm-calculator",
    );
    expect(getRelatedTools("word-counter")[0]?.category).toBe("text");
    expect(getRelatedTools("unix-timestamp-converter")[0]?.slug).toBe(
      "time-zone-converter",
    );
    expect(
      getRelatedTools("csv-to-markdown")
        .slice(0, 5)
        .every((tool) => tool.featureId !== "image-converter"),
    ).toBe(true);
  });

  it("preserves bounded, available, unique and deterministic links for every route", () => {
    for (const current of toolCatalog.filter((tool) => tool.slug)) {
      const tools = getRelatedTools(current.slug as ToolPage, 100);
      expect(tools.length).toBeLessThanOrEqual(8);
      expect(tools.length).toBeGreaterThan(0);
      expect(
        tools.every(
          (tool) =>
            tool.status === "available" &&
            tool.slug &&
            tool.slug !== current.slug,
        ),
      ).toBe(true);
      expect(new Set(tools.map((tool) => tool.id)).size).toBe(tools.length);
      expect(getRelatedTools(current.slug as ToolPage, 100)).toEqual(tools);
    }
  });

  it("handles unknown routes and invalid or smaller limits safely", () => {
    expect(getRelatedTools("unknown" as ToolPage)).toEqual([]);
    expect(getRelatedTools("word-counter", 0)).toEqual([]);
    expect(getRelatedTools("word-counter", -1)).toEqual([]);
    expect(getRelatedTools("word-counter", Number.NaN)).toEqual([]);
    expect(getRelatedTools("word-counter", 2)).toHaveLength(2);
  });
});
