import type { ToolPage } from "./site";
import { toolCatalog, type ToolCatalogItem } from "./tool-catalog";

/**
 * Put contextual next steps first, then complete the compact discovery grid
 * with popular tools. This preserves a route's workflow while still exposing
 * useful entry points beyond the one task the visitor arrived to complete.
 */
const nextStepTools: Partial<Record<ToolPage, readonly ToolPage[]>> = {
  "base64-decode": ["base64-encode"],
  "base64-encode": ["base64-decode"],
  "url-encode": ["url-decode"],
  "url-decode": ["url-encode"],
  "qr-code-generator": ["qr-code-scanner"],
  "qr-code-scanner": ["qr-code-generator"],
  "csv-to-markdown": ["markdown-to-csv"],
  "markdown-to-csv": ["csv-to-markdown"],
  "json-to-csv": ["csv-to-json"],
  "csv-to-json": ["json-formatter"],
  "html-to-markdown": ["markdown-to-html"],
  "markdown-to-html": ["html-to-markdown"],
  "json-formatter": ["json-to-csv"],
  "html-formatter": ["html-to-markdown"],
  "merge-pdf": ["compress-pdf"],
  "image-to-pdf": ["merge-pdf", "compress-pdf"],
  "pdf-to-image": ["image-resizer", "image-crop"],
  "background-remover": ["image-crop", "image-resizer"],
  "image-upscaler": ["image-resizer"],
  "image-crop": ["image-resizer"],
};

const popularFallback: readonly ToolPage[] = [
  "json-formatter",
  "word-counter",
  "qr-code-generator",
  "url-encode",
  "case-converter",
  "unix-timestamp-converter",
  "text-compare",
  "password-generator",
];

export function getRelatedTools(
  currentPage: ToolPage,
  limit = 8,
): ToolCatalogItem[] {
  if (limit <= 0) return [];

  const candidates = [
    ...(nextStepTools[currentPage] ?? []),
    ...popularFallback,
  ];
  const selected: ToolCatalogItem[] = [];
  const seen = new Set<string>();

  for (const slug of candidates) {
    if (!slug) continue;
    const tool = toolCatalog.find(
      (item) => item.slug === slug && item.status === "available",
    );
    if (!tool || tool.slug === currentPage || seen.has(tool.id)) continue;
    seen.add(tool.id);
    selected.push(tool);
    if (selected.length === limit) break;
  }

  return selected;
}
