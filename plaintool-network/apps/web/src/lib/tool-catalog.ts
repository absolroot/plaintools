import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";
import { toolRegistry } from "./tool-registry.js";

export type ToolStatus = "available" | "preview" | "reserve";
export type ToolCategory = "encoding" | "text" | "data" | "time";

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

type RegisteredTool = (typeof toolRegistry)[number];
export type RegisteredToolId = RegisteredTool["id"];
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
};

const toolMarks: Record<RegisteredToolId, string> = {
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
};

function localize<T>(select: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(
    locales.map((locale) => [locale, select(locale)]),
  ) as Record<Locale, T>;
}

const registeredTools: ToolCatalogItem[] = toolRegistry.map((tool) => ({
  id: tool.id,
  slug: tool.slug,
  category: tool.category,
  status: tool.publication === "indexable" ? "available" : "preview",
  mark: toolMarks[tool.id],
  name: localize((locale) => localeBundles[locale].catalog[tool.id].name),
  summary: localize((locale) => localeBundles[locale].catalog[tool.id].summary),
  searchTerms: localize(
    (locale) => localeBundles[locale].catalog[tool.id].searchTerms,
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
