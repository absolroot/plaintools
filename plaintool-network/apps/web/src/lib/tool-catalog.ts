import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";
import { toolRegistry } from "./tool-registry.js";
import type { ImageConverterToolId } from "../features/image-converter/formats";

export type ToolStatus = "available" | "preview" | "reserve";
export type ToolCategory =
  | "encoding"
  | "generator"
  | "text"
  | "converter"
  | "image"
  | "data"
  | "time";

type LocalizedText = Record<Locale, string>;
type LocalizedSearchTerms = Record<Locale, readonly string[]>;

export interface ToolCatalogItem {
  id: string;
  slug?: string;
  mark: string;
  category: ToolCategory;
  status: ToolStatus;
  name: LocalizedText;
  summary: LocalizedText;
  searchTerms: LocalizedSearchTerms;
}

export type LocaleCatalogToolCopy = {
  name: string;
  summary: string;
  searchTerms: readonly string[];
};

export type NetworkCopy = {
  allTools: string;
  directoryMetaTitle: string;
  directoryMetaDescription: string;
  directoryTitle: string;
  directoryIntro: string;
  toolPromise: string;
  directorySearchLabel: string;
  directorySearchPlaceholder: string;
  directorySearchClear: string;
  directorySearchNoResults: string;
  directorySearchCount: string;
  available: string;
  research: string;
  reserve: string;
  breadcrumbLabel: string;
  encodingCategory: string;
  categories: Record<ToolCategory, string>;
  footerNote: string;
  catalogAria: string;
  useLightTheme: string;
  useDarkTheme: string;
  relatedTools: string;
};

const converterCardNames = {
  "csv-to-markdown": "CSV → Markdown",
  "markdown-to-csv": "Markdown → CSV",
  "json-to-csv": "JSON → CSV",
  "csv-to-json": "CSV → JSON",
  "html-to-markdown": "HTML → Markdown",
  "markdown-to-html": "Markdown → HTML",
} as const satisfies Partial<Record<RegisteredToolId, string>>;

const toolMarks = {
  "base64-decode": "B64",
  "base64-encode": "B64",
  "word-counter": "Aa",
  "json-formatter": "{}",
  "unix-timestamp-converter": "T",
  "text-compare": "≠",
  "case-converter": "aA",
  "ai-watermark-remover": "AI",
  "url-encode": "%",
  "url-decode": "%",
  "hash-generator": "#",
  "jwt-decoder": "JWT",
  "qr-code-generator": "QR",
  "qr-code-scanner": "QR",
  "csv-to-markdown": "CSV",
  "markdown-to-csv": "MD",
  "json-to-csv": "{}",
  "csv-to-json": "CSV",
  "html-to-markdown": "<>",
  "markdown-to-html": "MD",
  "html-formatter": "<>",
  "css-formatter": "CSS",
  "javascript-formatter": "JS",
  "sql-formatter": "SQL",
  "ip-subnet-calculator": "IP",
  "background-remover": "BG",
  "date-calculator": "D±",
  "dday-calculator": "D",
  "age-calculator": "AGE",
} as const;

export type BaseRegisteredToolId = keyof typeof toolMarks;
export type RegisteredToolId = BaseRegisteredToolId | ImageConverterToolId;

function localize<T>(select: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(
    locales.map((locale) => [locale, select(locale)]),
  ) as Record<Locale, T>;
}

const registeredTools: ToolCatalogItem[] = toolRegistry.map((tool) => ({
  id: tool.id,
  slug: tool.slug,
  category: tool.category as ToolCategory,
  status: tool.publication === "indexable" ? "available" : "preview",
  mark:
    toolMarks[tool.id as keyof typeof toolMarks] ??
    tool.id.slice(0, tool.id.indexOf("-to-")).toUpperCase(),
  name: localize(
    (locale) =>
      (localeBundles[locale].catalog as Record<string, LocaleCatalogToolCopy>)[
        tool.id
      ]!.name,
  ),
  summary: localize(
    (locale) =>
      (localeBundles[locale].catalog as Record<string, LocaleCatalogToolCopy>)[
        tool.id
      ]!.summary,
  ),
  searchTerms: localize(
    (locale) =>
      (localeBundles[locale].catalog as Record<string, LocaleCatalogToolCopy>)[
        tool.id
      ]!.searchTerms,
  ),
}));

export const toolCatalog: ToolCatalogItem[] = [...registeredTools];

export const networkCopy = localize((locale) => localeBundles[locale].network);

export function toolPath(
  locale: Locale,
  tool: ToolCatalogItem,
): string | undefined {
  return tool.slug ? `/${locale}/${tool.slug}/` : undefined;
}

export function toolCardName(tool: ToolCatalogItem, locale: Locale): string {
  return (
    converterCardNames[tool.id as keyof typeof converterCardNames] ??
    tool.name[locale]
  );
}
