import type { ToolCommonCopy } from "../common-copy-contract";
import type {
  JavaScriptFormatterClientCopy,
  JavaScriptFormatterCopy,
} from "./contract";

/** Keeps preview feature copy independent of the central locale assembler. */
export function createJavaScriptFormatterClientCopy(
  feature: JavaScriptFormatterCopy,
  common: ToolCommonCopy,
): JavaScriptFormatterClientCopy {
  return { feature, common };
}
