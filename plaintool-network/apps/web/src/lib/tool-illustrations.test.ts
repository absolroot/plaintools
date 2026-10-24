import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { toolRegistry } from "./tool-registry.js";
import { toolIllustrationSrc } from "./tool-illustrations";

describe("tool illustrations", () => {
  it("gives every registered directory tool a local, consistent illustration", () => {
    const sources = new Set(
      toolRegistry.map((tool) => toolIllustrationSrc(tool.id)),
    );
    sources.add(toolIllustrationSrc("image-converter"));

    for (const source of sources) {
      const file = fileURLToPath(
        new URL(`../../public${source}`, import.meta.url),
      );
      const svg = readFileSync(file, "utf8");
      expect(svg, source).toContain('viewBox="0 0 128 128"');
      expect(svg, source).toContain('width="128" height="128"');
      expect(svg, source).toContain("#BF96FA");
      expect(svg, source).toContain("#8673F3");
      expect(svg, source).not.toMatch(
        /<(?:image|use)\b[^>]+(?:href|src)="(?:https?:)?\/\//,
      );
    }
    expect(sources.size).toBe(49);
  });
});
