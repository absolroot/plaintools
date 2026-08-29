import type { Locale } from "./site";
import type { ToolCatalogItem } from "./tool-catalog";

type SearchableTool = Pick<ToolCatalogItem, "name" | "summary" | "searchTerms">;

const combiningMarks = /\p{Mark}+/gu;
const punctuation = /[^\p{Letter}\p{Number}]+/gu;
const whitespace = /\s+/gu;

export function normalizeToolDirectorySearch(
  value: string,
  locale: Locale,
): string {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase(locale)
    .replace(combiningMarks, "")
    .normalize("NFC")
    .replace(punctuation, " ")
    .trim()
    .replace(whitespace, " ");
}

export function buildToolDirectorySearchCorpus(
  tool: SearchableTool,
  locale: Locale,
): string {
  return normalizeToolDirectorySearch(
    [tool.name[locale], tool.summary[locale], ...tool.searchTerms[locale]].join(
      " ",
    ),
    locale,
  );
}

export function matchesToolDirectorySearch(
  corpus: string,
  query: string,
  locale: Locale,
): boolean {
  const normalizedQuery = normalizeToolDirectorySearch(query, locale);
  if (!normalizedQuery) return true;

  const normalizedCorpus = normalizeToolDirectorySearch(corpus, locale);
  return normalizedQuery
    .split(" ")
    .every((token) => normalizedCorpus.includes(token));
}
