import type { ToolPage } from "./site";
import { toolCatalog, type ToolCatalogItem } from "./tool-catalog";

const pairedTools: Partial<Record<ToolPage, ToolPage>> = {
  "base64-decode": "base64-encode",
  "base64-encode": "base64-decode",
  "url-encode": "url-decode",
  "url-decode": "url-encode",
  "qr-code-generator": "qr-code-scanner",
  "qr-code-scanner": "qr-code-generator",
  "csv-to-markdown": "markdown-to-csv",
  "markdown-to-csv": "csv-to-markdown",
  "json-to-csv": "csv-to-json",
  "csv-to-json": "json-to-csv",
  "html-to-markdown": "markdown-to-html",
  "markdown-to-html": "html-to-markdown",
};

const toolFamilies: ToolPage[][] = [
  ["compress-pdf", "merge-pdf", "split-pdf", "pdf-to-image", "image-to-pdf"],
  ["base64-decode", "base64-encode", "url-encode", "url-decode"],
  ["qr-code-generator", "qr-code-scanner"],
  [
    "csv-to-markdown",
    "markdown-to-csv",
    "json-to-csv",
    "csv-to-json",
    "html-to-markdown",
    "markdown-to-html",
  ],
  [
    "json-formatter",
    "html-formatter",
    "css-formatter",
    "javascript-formatter",
    "sql-formatter",
  ],
  ["word-counter", "text-compare", "case-converter", "ai-watermark-remover"],
];

const popularFallback: ToolPage[] = [
  "json-formatter",
  "word-counter",
  "base64-decode",
  "qr-code-generator",
  "url-encode",
  "case-converter",
  "unix-timestamp-converter",
  "text-compare",
];

export function getRelatedTools(
  currentPage: ToolPage,
  limit = 8,
): ToolCatalogItem[] {
  const current = toolCatalog.find((tool) => tool.slug === currentPage);
  if (!current || limit <= 0) return [];

  const family =
    toolFamilies.find((items) => items.includes(currentPage)) ?? [];
  const sameCategory = toolCatalog
    .filter((tool) => tool.category === current.category)
    .map((tool) => tool.slug)
    .filter((slug): slug is ToolPage => Boolean(slug));
  const candidates = [
    pairedTools[currentPage],
    ...family,
    ...sameCategory,
    ...popularFallback,
    ...toolCatalog.map((tool) => tool.slug),
  ];
  const selected: ToolCatalogItem[] = [];
  const seen = new Set<string>([current.id]);

  for (const slug of candidates) {
    if (!slug) continue;
    const tool = toolCatalog.find(
      (item) => item.slug === slug && item.status === "available",
    );
    if (!tool || seen.has(tool.id)) continue;
    seen.add(tool.id);
    selected.push(tool);
    if (selected.length === limit) break;
  }

  return selected;
}
