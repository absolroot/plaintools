import type { ToolCommonCopy } from "../common-copy-contract";
import type { UuidGeneratorClientCopy, UuidGeneratorCopy } from "./contract";

export function createUuidGeneratorClientCopy(
  feature: UuidGeneratorCopy,
  common: ToolCommonCopy,
): UuidGeneratorClientCopy {
  return {
    feature,
    common: {
      ready: common.ready,
      copied: common.copied,
      copyFailed: common.copyFailed,
      failed: common.processingFailed,
    },
  };
}
