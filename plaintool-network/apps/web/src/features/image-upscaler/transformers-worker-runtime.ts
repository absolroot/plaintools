/// <reference lib="webworker" />

import {
  env,
  pipeline,
  RawImage,
  type ImageToImagePipeline,
} from "../../vendor/transformers-4.2.0.js";
import type {
  UpscaleBackend,
  UpscaleRequest,
  UpscalerMode,
  UpscaleWorkerResponse,
} from "./contract";
import { resampleHalfLanczos3 } from "./image";
import { loadVerifiedModelPart } from "./model-cache";
import { upscalerModelManifest } from "./model-manifest";

const MODEL_ID = "swin2sr-realworld-x4";
const NATIVE_SCALE = 4;
const TILE_OVERLAP = 16;

type LoadedPipeline = {
  mode: UpscalerMode;
  backend: UpscaleBackend;
  value: ImageToImagePipeline;
};

export type InferenceProgress =
  | { phase: "cache" | "download"; loaded: number; total: number }
  | { phase: "model" | "composition" }
  | { phase: "inference"; completedTiles: number; totalTiles: number };

type Tile = {
  coreX: number;
  coreY: number;
  coreWidth: number;
  coreHeight: number;
  extendedX: number;
  extendedY: number;
  extendedWidth: number;
  extendedHeight: number;
};

let loadedPipeline: LoadedPipeline | undefined;

function modelFile(mode: UpscalerMode): string {
  return mode === "fast" ? "model_quantized.onnx" : "model.onnx";
}

function modelDtype(mode: UpscalerMode): "q8" | "fp32" {
  return mode === "fast" ? "q8" : "fp32";
}

function tilesFor(width: number, height: number, tileSize: number): Tile[] {
  const tiles: Tile[] = [];
  for (let coreY = 0; coreY < height; coreY += tileSize) {
    for (let coreX = 0; coreX < width; coreX += tileSize) {
      const coreWidth = Math.min(tileSize, width - coreX);
      const coreHeight = Math.min(tileSize, height - coreY);
      const extendedX = Math.max(0, coreX - TILE_OVERLAP);
      const extendedY = Math.max(0, coreY - TILE_OVERLAP);
      const right = Math.min(width, coreX + coreWidth + TILE_OVERLAP);
      const bottom = Math.min(height, coreY + coreHeight + TILE_OVERLAP);
      tiles.push({
        coreX,
        coreY,
        coreWidth,
        coreHeight,
        extendedX,
        extendedY,
        extendedWidth: right - extendedX,
        extendedHeight: bottom - extendedY,
      });
    }
  }
  return tiles;
}

function tileImage(request: UpscaleRequest, tile: Tile): RawImage {
  const rgb = new Uint8ClampedArray(
    tile.extendedWidth * tile.extendedHeight * 3,
  );
  for (let y = 0; y < tile.extendedHeight; y += 1) {
    for (let x = 0; x < tile.extendedWidth; x += 1) {
      const source =
        ((tile.extendedY + y) * request.width + tile.extendedX + x) * 4;
      const target = (y * tile.extendedWidth + x) * 3;
      rgb[target] = request.rgba[source];
      rgb[target + 1] = request.rgba[source + 1];
      rgb[target + 2] = request.rgba[source + 2];
    }
  }
  return new RawImage(rgb, tile.extendedWidth, tile.extendedHeight, 3);
}

function alphaAt(request: UpscaleRequest, outputX: number, outputY: number) {
  const sourceX = (outputX + 0.5) / NATIVE_SCALE - 0.5;
  const sourceY = (outputY + 0.5) / NATIVE_SCALE - 0.5;
  const x0 = Math.max(0, Math.min(request.width - 1, Math.floor(sourceX)));
  const y0 = Math.max(0, Math.min(request.height - 1, Math.floor(sourceY)));
  const x1 = Math.min(request.width - 1, x0 + 1);
  const y1 = Math.min(request.height - 1, y0 + 1);
  const wx = Math.max(0, Math.min(1, sourceX - Math.floor(sourceX)));
  const wy = Math.max(0, Math.min(1, sourceY - Math.floor(sourceY)));
  const a00 = request.rgba[(y0 * request.width + x0) * 4 + 3];
  const a10 = request.rgba[(y0 * request.width + x1) * 4 + 3];
  const a01 = request.rgba[(y1 * request.width + x0) * 4 + 3];
  const a11 = request.rgba[(y1 * request.width + x1) * 4 + 3];
  return Math.round(
    (a00 * (1 - wx) + a10 * wx) * (1 - wy) + (a01 * (1 - wx) + a11 * wx) * wy,
  );
}

function writeTile(
  destination: Uint8ClampedArray<ArrayBuffer>,
  request: UpscaleRequest,
  tile: Tile,
  output: RawImage,
): void {
  const outputWidth = request.width * NATIVE_SCALE;
  const cropX = (tile.coreX - tile.extendedX) * NATIVE_SCALE;
  const cropY = (tile.coreY - tile.extendedY) * NATIVE_SCALE;
  const coreWidth = tile.coreWidth * NATIVE_SCALE;
  const coreHeight = tile.coreHeight * NATIVE_SCALE;
  for (let y = 0; y < coreHeight; y += 1) {
    for (let x = 0; x < coreWidth; x += 1) {
      const source = ((cropY + y) * output.width + cropX + x) * output.channels;
      const outputX = tile.coreX * NATIVE_SCALE + x;
      const outputY = tile.coreY * NATIVE_SCALE + y;
      const target = (outputY * outputWidth + outputX) * 4;
      destination[target] = output.data[source];
      destination[target + 1] = output.data[source + 1];
      destination[target + 2] = output.data[source + 2];
      destination[target + 3] = alphaAt(request, outputX, outputY);
    }
  }
}

async function ensurePipeline(
  mode: UpscalerMode,
  backend: UpscaleBackend,
  onProgress: (progress: InferenceProgress) => void,
): Promise<ImageToImagePipeline> {
  if (loadedPipeline?.mode === mode && loadedPipeline.backend === backend) {
    return loadedPipeline.value;
  }
  if (loadedPipeline) {
    await loadedPipeline.value.dispose();
    loadedPipeline = undefined;
  }

  const manifest = upscalerModelManifest[mode];
  const bytes = new Uint8Array(manifest.bytes);
  let completed = 0;
  onProgress({ phase: "model" });
  for (const part of manifest.parts) {
    await loadVerifiedModelPart(part, bytes, completed, (source, loaded) =>
      onProgress({
        phase: source === "cache" ? "cache" : "download",
        loaded: completed + loaded,
        total: manifest.bytes,
      }),
    );
    completed += part.bytes;
  }

  const expectedSuffix = `/onnx/${modelFile(mode)}`;
  const originalFetch = env.fetch ?? globalThis.fetch.bind(globalThis);
  env.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.endsWith(expectedSuffix)) {
      return Promise.resolve(
        new Response(bytes.slice(), {
          status: 200,
          headers: {
            "content-length": String(bytes.byteLength),
            "content-type": "application/octet-stream",
          },
        }),
      );
    }
    return originalFetch(input, init);
  }) as typeof fetch;

  try {
    const wasm = env.backends.onnx.wasm;
    if (!wasm) throw new Error("wasm-runtime-unavailable");
    wasm.numThreads = 1;
    wasm.proxy = false;
    wasm.wasmPaths = {
      wasm: new URL(
        "/runtime/transformers-4.2.0/ort-wasm-simd-threaded.asyncify.wasm",
        globalThis.location.href,
      ).href,
      mjs: new URL(
        "/runtime/transformers-4.2.0/ort-wasm-simd-threaded.asyncify.mjs",
        globalThis.location.href,
      ).href,
    };
    env.allowLocalModels = true;
    env.allowRemoteModels = false;
    env.localModelPath = "/models/image-upscaler/v2/";
    env.useBrowserCache = false;
    const value = await pipeline("image-to-image", MODEL_ID, {
      device: backend,
      dtype: modelDtype(mode),
      local_files_only: true,
    });
    loadedPipeline = { mode, backend, value };
    return value;
  } finally {
    env.fetch = originalFetch;
  }
}

export async function runTransformersUpscale(
  request: UpscaleRequest,
  backend: UpscaleBackend,
  onProgress: (progress: InferenceProgress) => void,
  shouldContinue: () => boolean = () => true,
): Promise<{
  rgba: Uint8ClampedArray<ArrayBuffer>;
  width: number;
  height: number;
}> {
  const upscaler = await ensurePipeline(request.mode, backend, onProgress);
  if (!shouldContinue()) throw new DOMException("Cancelled", "AbortError");
  const tiles = tilesFor(request.width, request.height, request.tileSize);
  let output = new Uint8ClampedArray(
    request.width * request.height * NATIVE_SCALE * NATIVE_SCALE * 4,
  );
  for (let index = 0; index < tiles.length; index += 1) {
    if (!shouldContinue()) throw new DOMException("Cancelled", "AbortError");
    const tile = tiles[index];
    const result = await upscaler(tileImage(request, tile));
    if (!shouldContinue()) throw new DOMException("Cancelled", "AbortError");
    writeTile(output, request, tile, result);
    onProgress({
      phase: "inference",
      completedTiles: index + 1,
      totalTiles: tiles.length,
    });
  }

  let width = request.width * NATIVE_SCALE;
  let height = request.height * NATIVE_SCALE;
  if (request.scale === 2) {
    if (!shouldContinue()) throw new DOMException("Cancelled", "AbortError");
    onProgress({ phase: "composition" });
    output = resampleHalfLanczos3(output, width, height);
    width /= 2;
    height /= 2;
  }
  return { rgba: output, width, height };
}

export function startTransformersUpscalerWorker(): void {
  const workerScope = self as DedicatedWorkerGlobalScope;
  workerScope.addEventListener(
    "message",
    (event: MessageEvent<UpscaleRequest>) => {
      const request = event.data;
      if (request.kind !== "upscale") return;
      void (async () => {
        try {
          const result = await runTransformersUpscale(
            request,
            "wasm",
            (progress) =>
              workerScope.postMessage({
                kind: "progress",
                requestId: request.requestId,
                ...progress,
              } satisfies UpscaleWorkerResponse),
          );
          workerScope.postMessage(
            {
              kind: "result",
              requestId: request.requestId,
              ...result,
              tileSize: request.tileSize,
              retried: false,
            } satisfies UpscaleWorkerResponse,
            [result.rgba.buffer],
          );
        } catch {
          workerScope.postMessage({
            kind: "error",
            requestId: request.requestId,
            code: "inference",
          } satisfies UpscaleWorkerResponse);
        }
      })();
    },
  );
}
