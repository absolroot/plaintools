import type { ToolCommonCopy } from "../common-copy-contract";
import type { MathCalculatorClientCopy, MathCalculatorCopy } from "./contract";

export function createMathCalculatorClientCopy(
  feature: MathCalculatorCopy,
  common: ToolCommonCopy,
): MathCalculatorClientCopy {
  return { feature, common };
}
