import { loadVerifiedModelPart as loadSharedModelPart } from "../../lib/browser-model/model-cache";

export const UPSCALER_MODEL_CACHE = "image-upscaler-models-v1";

export function loadVerifiedModelPart(
  ...args: Parameters<typeof loadSharedModelPart> extends [
    string,
    ...infer Rest,
  ]
    ? Rest
    : never
): ReturnType<typeof loadSharedModelPart> {
  return loadSharedModelPart(UPSCALER_MODEL_CACHE, ...args);
}
