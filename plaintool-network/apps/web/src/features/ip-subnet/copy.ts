import type { ToolCommonCopy } from "../common-copy-contract";
import type { IpSubnetClientCopy, IpSubnetCopy } from "./contract";

/**
 * Creates the exact reviewed-copy payload exposed to the browser client.
 * Locale ownership stays with the root locale assembler.
 */
export function createIpSubnetClientCopy(
  feature: IpSubnetCopy,
  common: ToolCommonCopy,
): IpSubnetClientCopy {
  return { feature, common };
}
