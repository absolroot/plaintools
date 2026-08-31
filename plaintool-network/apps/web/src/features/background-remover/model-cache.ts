import { readVerifiedModelPart } from "./model-integrity";
import type { BackgroundModelPart } from "./model-manifest";

export const BACKGROUND_MODEL_CACHE = "background-remover-models-v1";

export type ModelPartLoadSource = "cache" | "network";

type ModelPartCache = {
  match(path: string): Promise<Response | undefined>;
  put(path: string, response: Response): Promise<void>;
  delete(path: string): Promise<boolean>;
};

type ModelCacheDependencies = {
  openCache?: () => Promise<ModelPartCache | undefined>;
  fetchPart?: (path: string) => Promise<Response>;
};

async function openPersistentCache(): Promise<ModelPartCache | undefined> {
  if (!("caches" in globalThis)) return undefined;
  try {
    return await globalThis.caches.open(BACKGROUND_MODEL_CACHE);
  } catch {
    return undefined;
  }
}

async function fetchModelPart(path: string): Promise<Response> {
  return fetch(path, { credentials: "same-origin" });
}

async function deleteCachedPart(
  cache: ModelPartCache,
  path: string,
): Promise<void> {
  try {
    await cache.delete(path);
  } catch {
    // A failed eviction must not prevent a verified network fallback.
  }
}

async function storeVerifiedPart(
  cache: ModelPartCache,
  part: BackgroundModelPart,
  bytes: Uint8Array<ArrayBuffer>,
): Promise<void> {
  try {
    await cache.put(
      part.path,
      new Response(bytes, {
        headers: {
          "content-length": String(part.bytes),
          "content-type": "application/octet-stream",
        },
      }),
    );
  } catch {
    // Storage can be unavailable or evicted under quota pressure. HTTP caching
    // and the normal network path remain valid fallbacks.
  }
}

export async function loadVerifiedModelPart(
  part: BackgroundModelPart,
  destination: Uint8Array<ArrayBuffer>,
  offset: number,
  onProgress: (source: ModelPartLoadSource, loaded: number) => void = () =>
    undefined,
  dependencies: ModelCacheDependencies = {},
): Promise<ModelPartLoadSource> {
  const cache = await (dependencies.openCache ?? openPersistentCache)();
  let cachedResponse: Response | undefined;
  if (cache) {
    try {
      cachedResponse = await cache.match(part.path);
    } catch {
      cachedResponse = undefined;
    }
  }

  if (cache && cachedResponse) {
    try {
      await readVerifiedModelPart(
        cachedResponse,
        destination,
        offset,
        part,
        (loaded) => onProgress("cache", loaded),
      );
      return "cache";
    } catch {
      destination.fill(0, offset, offset + part.bytes);
      await deleteCachedPart(cache, part.path);
    }
  }

  const response = await (dependencies.fetchPart ?? fetchModelPart)(part.path);
  await readVerifiedModelPart(response, destination, offset, part, (loaded) =>
    onProgress("network", loaded),
  );
  if (cache) {
    await storeVerifiedPart(
      cache,
      part,
      destination.slice(offset, offset + part.bytes),
    );
  }
  return "network";
}
