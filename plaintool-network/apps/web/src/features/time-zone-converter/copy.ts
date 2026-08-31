import type { ToolCommonCopy } from "../common-copy-contract";
import type {
  TimeZoneConverterClientCopy,
  TimeZoneConverterCopy,
} from "./contract";

export function createTimeZoneConverterClientCopy(
  feature: TimeZoneConverterCopy,
  common: ToolCommonCopy,
): TimeZoneConverterClientCopy {
  return { feature, common };
}
