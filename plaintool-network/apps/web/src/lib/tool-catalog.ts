import { localeBundles } from "./locale-data";
import { locales, type Locale } from "./site";
import directoryOrder from "./tool-directory-order.json";
import { toolRegistry } from "./tool-registry.js";
import {
  parseImageConversionMode,
  type ImageConverterToolId,
} from "../features/image-converter/formats";
import type { GeneratorToolId } from "./locale-data/generator-tools";

export type ToolStatus = "available" | "preview" | "reserve";
export type ToolCategory =
  | "encoding"
  | "generator"
  | "text"
  | "converter"
  | "image"
  | "pdf"
  | "data"
  | "calculator"
  | "time";

type LocalizedText = Record<Locale, string>;
type LocalizedSearchTerms = Record<Locale, readonly string[]>;

export interface ToolCatalogItem {
  id: string;
  featureId: string;
  slug?: string;
  mark: string;
  category: ToolCategory;
  status: ToolStatus;
  name: LocalizedText;
  subtitle?: LocalizedText;
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

const imageFormatCardNames = {
  bmp: "BMP",
  png: "PNG",
  jpg: "JPG",
  gif: "GIF",
  webp: "WebP",
  heic: "HEIC",
  avif: "AVIF",
} as const;

const backgroundRemoverCardSubtitle = {
  en: "AI model",
  ko: "AI 모델",
  es: "Modelo de IA",
  de: "KI-Modell",
  ja: "AIモデル",
  fr: "Modèle d’IA",
  "pt-BR": "Modelo de IA",
  it: "Modello di IA",
  nl: "AI-model",
  sv: "AI-modell",
  cs: "Model AI",
  pl: "Model AI",
  da: "AI-model",
  no: "KI-modell",
  ar: "نموذج ذكاء اصطناعي",
  "zh-TW": "AI 模型",
  tr: "Yapay zekâ modeli",
} as const satisfies LocalizedText;

const toolMarks = {
  "base64-decode": "B64",
  "base64-encode": "B64",
  "word-counter": "Aa",
  "json-formatter": "{}",
  "unix-timestamp-converter": "T",
  "time-zone-converter": "TZ",
  "text-compare": "≠",
  "case-converter": "aA",
  "ai-watermark-remover": "AI",
  "url-encode": "%",
  "url-decode": "%",
  "hash-generator": "#",
  "uuid-generator": "UUID",
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
  "fraction-calculator": "½",
  "factor-calculator": "×",
  "lcm-calculator": "LCM",
  "percentage-calculator": "%",
  "bmi-calculator": "BMI",
  "image-upscaler": "4×",
  "image-resizer": "PX",
  "date-calculator": "D±",
  "dday-calculator": "D",
  "age-calculator": "AGE",
  "compress-pdf": "PDF",
  "merge-pdf": "PDF",
  "split-pdf": "PDF",
  "pdf-to-image": "PDF",
  "image-to-pdf": "PDF",
} as const;

const generatorToolMarks = {
  "barcode-generator": "BAR",
  "password-generator": "PW",
} as const satisfies Record<GeneratorToolId, string>;

export type PdfToolkitToolId =
  | "compress-pdf"
  | "merge-pdf"
  | "split-pdf"
  | "pdf-to-image"
  | "image-to-pdf";
export type BaseRegisteredToolId = Exclude<
  keyof typeof toolMarks,
  PdfToolkitToolId
>;
export type RegisteredToolId =
  | BaseRegisteredToolId
  | ImageConverterToolId
  | GeneratorToolId
  | PdfToolkitToolId;

function localize<T>(select: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(
    locales.map((locale) => [locale, select(locale)]),
  ) as Record<Locale, T>;
}

const registeredTools: ToolCatalogItem[] = toolRegistry.map((tool) => ({
  id: tool.id,
  featureId: tool.featureId,
  slug: tool.slug,
  category: tool.category as ToolCategory,
  status: tool.publication === "indexable" ? "available" : "preview",
  mark:
    generatorToolMarks[tool.id as GeneratorToolId] ??
    toolMarks[tool.id as keyof typeof toolMarks] ??
    tool.id.slice(0, tool.id.indexOf("-to-")).toUpperCase(),
  name: localize(
    (locale) =>
      (localeBundles[locale].catalog as Record<string, LocaleCatalogToolCopy>)[
        tool.id
      ]!.name,
  ),
  subtitle:
    tool.id === "background-remover"
      ? backgroundRemoverCardSubtitle
      : tool.id === "image-upscaler"
        ? localize(() => "2× · 4×")
        : undefined,
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

const rawCategoryOrder = directoryOrder.categoryOrder as readonly string[];
const rawFeatureCategoryOverrides =
  directoryOrder.featureCategoryOverrides as Readonly<Record<string, string>>;
const rawPinnedToolOrder = directoryOrder.pinnedToolOrder as Readonly<
  Record<string, readonly string[]>
>;
const registeredCategories = new Set(toolCatalog.map((tool) => tool.category));
const registeredFeatures = new Set(toolCatalog.map((tool) => tool.featureId));
const configuredCategories = new Set(rawCategoryOrder);

if (configuredCategories.size !== rawCategoryOrder.length) {
  throw new Error("Home directory category order contains duplicates.");
}
for (const category of registeredCategories) {
  if (!configuredCategories.has(category)) {
    throw new Error(`Home directory category order is missing ${category}.`);
  }
}
for (const category of configuredCategories) {
  if (!registeredCategories.has(category as ToolCategory)) {
    throw new Error(`Unknown home directory category: ${category}.`);
  }
}
for (const [featureId, category] of Object.entries(
  rawFeatureCategoryOverrides,
)) {
  if (!registeredFeatures.has(featureId)) {
    throw new Error(`Unknown home directory feature override: ${featureId}.`);
  }
  if (!configuredCategories.has(category)) {
    throw new Error(
      `Unknown home directory category override for ${featureId}: ${category}.`,
    );
  }
}

function homeCategoryForTool(tool: ToolCatalogItem): ToolCategory {
  return (rawFeatureCategoryOverrides[tool.featureId] ??
    tool.category) as ToolCategory;
}

for (const [category, toolIds] of Object.entries(rawPinnedToolOrder)) {
  if (!configuredCategories.has(category)) {
    throw new Error(`Unknown pinned-tool category: ${category}.`);
  }
  if (new Set(toolIds).size !== toolIds.length) {
    throw new Error(`Pinned-tool order for ${category} contains duplicates.`);
  }
  for (const toolId of toolIds) {
    const tool = toolCatalog.find((candidate) => candidate.id === toolId);
    if (!tool) {
      throw new Error(`Unknown pinned home directory tool: ${toolId}.`);
    }
    if (homeCategoryForTool(tool) !== category) {
      throw new Error(
        `Pinned home directory tool ${toolId} does not belong to ${category}.`,
      );
    }
  }
}

export const homeDirectoryCategoryOrder = [
  ...rawCategoryOrder,
] as readonly ToolCategory[];

export function homeDirectoryToolsForCategory(
  category: ToolCategory,
): ToolCatalogItem[] {
  const pinIndex = new Map(
    (rawPinnedToolOrder[category] ?? []).map((toolId, index) => [
      toolId,
      index,
    ]),
  );
  return toolCatalog
    .filter((tool) => homeCategoryForTool(tool) === category)
    .toSorted((left, right) => {
      const leftIndex = pinIndex.get(left.id);
      const rightIndex = pinIndex.get(right.id);
      if (leftIndex === undefined && rightIndex === undefined) return 0;
      if (leftIndex === undefined) return 1;
      if (rightIndex === undefined) return -1;
      return leftIndex - rightIndex;
    });
}

export const homeDirectoryToolsInDisplayOrder =
  homeDirectoryCategoryOrder.flatMap((category) =>
    homeDirectoryToolsForCategory(category),
  );

export const networkCopy = localize((locale) => localeBundles[locale].network);

export function toolPath(
  locale: Locale,
  tool: ToolCatalogItem,
): string | undefined {
  return tool.slug ? `/${locale}/${tool.slug}/` : undefined;
}

export function toolCardName(tool: ToolCatalogItem, locale: Locale): string {
  const imageConversionMode = parseImageConversionMode(tool.id);
  if (imageConversionMode) {
    return `${imageFormatCardNames[imageConversionMode.source]} → ${imageFormatCardNames[imageConversionMode.target]}`;
  }
  return (
    converterCardNames[tool.id as keyof typeof converterCardNames] ??
    tool.name[locale]
  );
}
