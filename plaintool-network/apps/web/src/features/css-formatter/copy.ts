import type { ToolCommonCopy } from "../common-copy-contract";
import type { CssFormatterClientCopy, CssFormatterCopy } from "./contract";

/** Keeps the preview feature independent of central locale assembly. */
export function createCssFormatterClientCopy(
  feature: CssFormatterCopy,
  common: ToolCommonCopy,
): CssFormatterClientCopy {
  return { feature, common };
}
