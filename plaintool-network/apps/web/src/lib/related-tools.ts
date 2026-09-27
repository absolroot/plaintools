import type { ToolPage } from "./site";
import { toolCatalog, type ToolCatalogItem } from "./tool-catalog";
import { parseImageConversionMode } from "../features/image-converter/formats";

/**
 * Put contextual next steps first, then complete the compact discovery grid
 * with tools for the same task or category before general discovery links.
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
  "compress-pdf": ["merge-pdf", "split-pdf"],
  "split-pdf": ["merge-pdf", "compress-pdf"],
  "image-to-pdf": ["merge-pdf", "compress-pdf"],
  "pdf-to-image": ["image-resizer", "image-crop"],
  "background-remover": ["image-crop", "image-resizer"],
  "image-upscaler": ["image-resizer"],
  "image-crop": ["image-resizer"],
  "image-resizer": ["image-crop", "image-upscaler", "image-to-pdf"],
  "factor-calculator": ["lcm-calculator", "fraction-calculator"],
  "lcm-calculator": ["factor-calculator", "fraction-calculator"],
  "fraction-calculator": ["percentage-calculator", "factor-calculator"],
  "date-calculator": ["dday-calculator", "age-calculator"],
  "dday-calculator": ["date-calculator", "age-calculator"],
  "age-calculator": ["date-calculator", "dday-calculator"],
  "unix-timestamp-converter": ["time-zone-converter"],
  "time-zone-converter": ["unix-timestamp-converter"],
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
  const maximum = Math.min(8, Math.floor(limit));
  if (!(maximum > 0)) return [];
  const current = toolCatalog.find((tool) => tool.slug === currentPage);
  if (!current) return [];

  const available = toolCatalog.filter(
    (tool) => tool.status === "available" && tool.slug !== currentPage,
  );
  const imageMode =
    current.featureId === "image-converter"
      ? parseImageConversionMode(current.id)
      : undefined;
  const contextual: Array<string | undefined> = [];
  if (imageMode) {
    const conversions = available
      .filter((tool) => tool.featureId === "image-converter")
      .map((tool) => ({ tool, mode: parseImageConversionMode(tool.id) }));
    contextual.push(
      conversions.find(
        ({ mode }) =>
          mode?.source === imageMode.target &&
          mode?.target === imageMode.source,
      )?.tool.slug,
    );
    const sameSource = conversions.filter(
      ({ mode }) => mode?.source === imageMode.source,
    );
    const sameTarget = conversions.filter(
      ({ mode }) => mode?.target === imageMode.target,
    );
    for (let i = 0; i < Math.max(sameSource.length, sameTarget.length); i++) {
      contextual.push(sameSource[i]?.tool.slug, sameTarget[i]?.tool.slug);
    }
  } else {
    const peers = available.filter(
      (tool) =>
        tool.category === current.category &&
        tool.featureId !== "image-converter",
    );
    contextual.push(
      ...peers
        .filter((tool) => tool.featureId === current.featureId)
        .map((tool) => tool.slug),
      ...peers.map((tool) => tool.slug),
    );
  }

  const candidates = [
    ...(nextStepTools[currentPage] ?? []),
    ...contextual,
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
    if (selected.length === maximum) break;
  }

  return selected;
}
