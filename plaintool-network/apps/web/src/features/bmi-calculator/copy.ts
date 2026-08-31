import type { ToolCommonCopy } from "../common-copy-contract";
import type { BmiCalculatorClientCopy, BmiCalculatorCopy } from "./contract";

/** Creates the exact reviewed-copy payload exposed to the browser client. */
export function createBmiCalculatorClientCopy(
  feature: BmiCalculatorCopy,
  common: ToolCommonCopy,
): BmiCalculatorClientCopy {
  return { feature, common };
}
