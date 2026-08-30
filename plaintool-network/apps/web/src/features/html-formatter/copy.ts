import type { ToolCommonCopy } from "../common-copy-contract";
import type { HtmlFormatterClientCopy, HtmlFormatterCopy } from "./contract";

/** Keeps the feature independent of the central locale bundle during preview. */
export function createHtmlFormatterClientCopy(
  feature: HtmlFormatterCopy,
  common: ToolCommonCopy,
): HtmlFormatterClientCopy {
  return { feature, common };
}
