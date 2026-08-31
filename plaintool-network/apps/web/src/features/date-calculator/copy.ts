import type { ToolCommonCopy } from "../common-copy-contract";
import type { DateCalculatorClientCopy, DateCalculatorCopy } from "./contract";

export function createDateCalculatorClientCopy(
  feature: DateCalculatorCopy,
  common: ToolCommonCopy,
): DateCalculatorClientCopy {
  return { feature, common };
}
