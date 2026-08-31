import type { Copy } from "../i18n";
import type { CommonToolCopy } from "../common-tool-i18n";
import type { PreviewToolCopy } from "../tool-i18n";
import type { ToolExamples } from "../tool-examples";
import type {
  LocaleCatalogToolCopy,
  NetworkCopy,
  BaseRegisteredToolId,
} from "../tool-catalog";
import type { AiTextCleanerCopy } from "../../features/ai-text-cleaner/contract";
import type { DataConverterCopy } from "../../features/data-converter/contract";
import type { HashGeneratorCopy } from "../../features/hash-generator/contract";
import type { JwtDecoderCopy } from "../../features/jwt-decoder/contract";
import type {
  QrGeneratorCopy,
  QrScannerCopy,
} from "../../features/qr/contract";
import type { UrlCodecCopy } from "../../features/url-codec/contract";
import type { HtmlFormatterCopy } from "../../features/html-formatter/contract";
import type { CssFormatterCopy } from "../../features/css-formatter/contract";
import type { JavaScriptFormatterCopy } from "../../features/javascript-formatter/contract";
import type { SqlFormatterCopy } from "../../features/sql-formatter/contract";
import type { IpSubnetCopy } from "../../features/ip-subnet/contract";
import type { BackgroundRemoverCopy } from "../../features/background-remover/contract";
import type { DateCalculatorCopy } from "../../features/date-calculator/contract";

export type NewToolId =
  | "ai-watermark-remover"
  | "url-encode"
  | "url-decode"
  | "hash-generator"
  | "jwt-decoder"
  | "qr-code-generator"
  | "qr-code-scanner"
  | "background-remover"
  | "csv-to-markdown"
  | "markdown-to-csv"
  | "json-to-csv"
  | "csv-to-json"
  | "html-to-markdown"
  | "markdown-to-html"
  | "html-formatter"
  | "css-formatter"
  | "javascript-formatter"
  | "sql-formatter"
  | "ip-subnet-calculator"
  | "date-calculator";

export type FormatterSubnetToolId =
  | "html-formatter"
  | "css-formatter"
  | "javascript-formatter"
  | "sql-formatter"
  | "ip-subnet-calculator";

export type LegacyNewToolId = Exclude<
  NewToolId,
  FormatterSubnetToolId | "date-calculator"
>;

export type ToolPageCopy<T> = {
  title: string;
  description: string;
  mobileDescription: string;
  guideTitle: string;
  guideBody: string;
  safetyTitle: string;
  safetyBody: string;
  faqs: Array<{ q: string; a: string }>;
  feature: T;
};

export type NewToolsCopy = {
  "ai-watermark-remover": ToolPageCopy<AiTextCleanerCopy>;
  "url-encode": ToolPageCopy<UrlCodecCopy>;
  "url-decode": ToolPageCopy<UrlCodecCopy>;
  "hash-generator": ToolPageCopy<HashGeneratorCopy>;
  "jwt-decoder": ToolPageCopy<JwtDecoderCopy>;
  "qr-code-generator": ToolPageCopy<QrGeneratorCopy>;
  "qr-code-scanner": ToolPageCopy<QrScannerCopy>;
  "background-remover": ToolPageCopy<BackgroundRemoverCopy>;
  "csv-to-markdown": ToolPageCopy<DataConverterCopy>;
  "markdown-to-csv": ToolPageCopy<DataConverterCopy>;
  "json-to-csv": ToolPageCopy<DataConverterCopy>;
  "csv-to-json": ToolPageCopy<DataConverterCopy>;
  "html-to-markdown": ToolPageCopy<DataConverterCopy>;
  "markdown-to-html": ToolPageCopy<DataConverterCopy>;
  "html-formatter": ToolPageCopy<HtmlFormatterCopy>;
  "css-formatter": ToolPageCopy<CssFormatterCopy>;
  "javascript-formatter": ToolPageCopy<JavaScriptFormatterCopy>;
  "sql-formatter": ToolPageCopy<SqlFormatterCopy>;
  "ip-subnet-calculator": ToolPageCopy<IpSubnetCopy>;
  "date-calculator": ToolPageCopy<DateCalculatorCopy>;
};

export type LocaleBundle = {
  site: Copy;
  common: CommonToolCopy;
  preview: Omit<PreviewToolCopy, "common">;
  examples: ToolExamples;
  catalog: Record<BaseRegisteredToolId, LocaleCatalogToolCopy>;
  tools: NewToolsCopy;
  network: NetworkCopy;
};
