import type { ToolCommonCopy } from "../common-copy-contract";
import type {
  PercentageCalculatorClientCopy,
  PercentageCalculatorCopy,
} from "./contract";

export function createPercentageCalculatorClientCopy(
  feature: PercentageCalculatorCopy,
  common: ToolCommonCopy,
): PercentageCalculatorClientCopy {
  return { feature, common };
}
