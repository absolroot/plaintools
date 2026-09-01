import { describe, expect, it } from "vitest";
import { locales } from "./content-registry.js";
import { toolCatalog } from "./tool-catalog";
import {
  buildToolDirectorySearchCorpus,
  matchesToolDirectorySearch,
  normalizeToolDirectorySearch,
} from "./tool-directory-search";

describe("tool directory search catalog", () => {
  it("defines complete localized search terms for every tool", () => {
    expect(new Set(toolCatalog.map((tool) => tool.id)).size).toBe(
      toolCatalog.length,
    );

    for (const tool of toolCatalog) {
      expect(Object.keys(tool.name)).toEqual([...locales]);
      expect(Object.keys(tool.summary)).toEqual([...locales]);
      expect(Object.keys(tool.searchTerms)).toEqual([...locales]);

      for (const locale of locales) {
        expect(tool.name[locale].trim()).not.toBe("");
        expect(tool.summary[locale].trim()).not.toBe("");
        expect(tool.searchTerms[locale].length).toBeGreaterThan(0);
        for (const term of tool.searchTerms[locale]) {
          expect(term.trim(), `${tool.id}:${locale}`).not.toBe("");
        }
      }
    }
  });

  it("does not index inaccurate cryptography terms for Base64", () => {
    const base64Terms = toolCatalog
      .filter((tool) => tool.id.startsWith("base64-"))
      .flatMap((tool) => locales.flatMap((locale) => tool.searchTerms[locale]));

    expect(base64Terms).not.toContain("decrypt");
    expect(base64Terms).not.toContain("복호화");
    expect(base64Terms).not.toContain("descifrar");
  });
});

describe("tool directory search matching", () => {
  const jsonTool = toolCatalog.find((tool) => tool.id === "json-formatter");
  const wordTool = toolCatalog.find((tool) => tool.id === "word-counter");
  const base64Tool = toolCatalog.find((tool) => tool.id === "base64-decode");
  const timestampTool = toolCatalog.find(
    (tool) => tool.id === "unix-timestamp-converter",
  );

  if (!jsonTool || !wordTool || !base64Tool || !timestampTool) {
    throw new Error(
      "Expected search fixtures are missing from the tool catalog.",
    );
  }

  it("normalizes case, accents, punctuation, and whitespace", () => {
    expect(
      normalizeToolDirectorySearch("  MINIFÍCALO—JSON\tAhora  ", "es"),
    ).toBe("minificalo json ahora");
  });

  it("builds a current-locale corpus from name, summary, and search terms", () => {
    const corpus = buildToolDirectorySearchCorpus(jsonTool, "ko");

    expect(corpus).toContain("json 포맷터");
    expect(corpus).toContain("오류를 검증");
    expect(corpus).toContain("json 압축");
    expect(corpus).not.toContain("pretty print");
  });

  it("matches blank, case-insensitive, accentless, and Korean queries", () => {
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(jsonTool, "en"),
        "  ",
        "en",
      ),
    ).toBe(true);
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(jsonTool, "en"),
        "JSON",
        "en",
      ),
    ).toBe(true);
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(wordTool, "es"),
        "lineas",
        "es",
      ),
    ).toBe(true);
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(wordTool, "ko"),
        "글자 수",
        "ko",
      ),
    ).toBe(true);
  });

  it("matches a Korean keyword that is absent from the visible card copy", () => {
    expect(timestampTool.name.ko).not.toContain("에포크");
    expect(timestampTool.summary.ko).not.toContain("에포크");
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(timestampTool, "ko"),
        "에포크",
        "ko",
      ),
    ).toBe(true);
  });

  it("requires every query token while allowing any token order", () => {
    const corpus = buildToolDirectorySearchCorpus(jsonTool, "en");

    expect(matchesToolDirectorySearch(corpus, "errors JSON", "en")).toBe(true);
    expect(matchesToolDirectorySearch(corpus, "JSON timestamp", "en")).toBe(
      false,
    );
  });

  it("allows spacing variants such as base 64", () => {
    expect(
      matchesToolDirectorySearch(
        buildToolDirectorySearchCorpus(base64Tool, "en"),
        "base 64",
        "en",
      ),
    ).toBe(true);
  });
});
