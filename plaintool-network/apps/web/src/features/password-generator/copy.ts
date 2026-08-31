import type { ToolCommonCopy } from "../common-copy-contract";
import type {
  PasswordGeneratorClientCopy,
  PasswordGeneratorCopy,
} from "./contract";

export function createPasswordGeneratorClientCopy(
  feature: PasswordGeneratorCopy,
  common: ToolCommonCopy,
): PasswordGeneratorClientCopy {
  return { feature, common };
}
