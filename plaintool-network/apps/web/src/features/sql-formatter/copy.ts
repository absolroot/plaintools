import type { ToolCommonCopy } from "../common-copy-contract";
import type { SqlFormatterClientCopy, SqlFormatterCopy } from "./contract";

/** Keeps the feature independent of the central locale bundle during preview. */
export function createSqlFormatterClientCopy(
  feature: SqlFormatterCopy,
  common: ToolCommonCopy,
): SqlFormatterClientCopy {
  return { feature, common };
}
