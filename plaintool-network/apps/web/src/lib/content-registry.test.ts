import { describe, expect, it } from "vitest";
import {
  contentPages,
  legalPages,
  locales,
  previewPages,
  publicToolPages,
  toolPages,
  toolRegistry,
} from "./content-registry.js";

describe("content registry", () => {
  it("keeps locale, legal, and tool route inventories unique", () => {
    expect(new Set(locales).size).toBe(locales.length);
    expect(new Set(legalPages).size).toBe(legalPages.length);
    expect(new Set(toolPages).size).toBe(toolPages.length);
    expect(new Set(contentPages).size).toBe(contentPages.length);
  });

  it("separates indexable routes from intentional previews", () => {
    expect(publicToolPages).toEqual(
      toolRegistry
        .filter((tool) => tool.publication === "indexable")
        .map((tool) => tool.slug),
    );
    expect(previewPages).toEqual(["date-calculator"]);
    expect(toolPages).toEqual(toolRegistry.map((tool) => tool.slug));
  });
});
