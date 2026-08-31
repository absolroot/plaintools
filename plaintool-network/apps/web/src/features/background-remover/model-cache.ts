import {
  loadVerifiedModelPart as loadSharedModelPart,
  type ModelPartLoadSource,
} from "../../lib/browser-model/model-cache";
import type { BackgroundModelPart } from "./model-manifest";

export const BACKGROUND_MODEL_CACHE = "background-remover-models-v1";

export async function loadVerifiedModelPart(
  part: BackgroundModelPart,
  destination: Uint8Array<ArrayBuffer>,
  offset: number,
  onProgress: (source: ModelPartLoadSource, loaded: number) => void = () =>
    undefined,
  dependencies: Parameters<typeof loadSharedModelPart>[5] = {},
): ReturnType<typeof loadSharedModelPart> {
  return loadSharedModelPart(
    BACKGROUND_MODEL_CACHE,
    part,
    destination,
    offset,
    onProgress,
    dependencies,
  );
}
