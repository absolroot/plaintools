import type { Copy } from "../i18n";
import type { CommonToolCopy } from "../common-tool-i18n";
import type { PreviewToolCopy } from "../tool-i18n";
import type { ToolExamples } from "../tool-examples";
import type {
  LocaleCatalogToolCopy,
  NetworkCopy,
  RegisteredToolId,
} from "../tool-catalog";

export type LocaleBundle = {
  site: Copy;
  common: CommonToolCopy;
  preview: Omit<PreviewToolCopy, "common">;
  examples: ToolExamples;
  catalog: Record<RegisteredToolId, LocaleCatalogToolCopy>;
  network: NetworkCopy;
};
