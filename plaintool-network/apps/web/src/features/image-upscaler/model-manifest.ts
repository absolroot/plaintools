import type { BrowserModelPart } from "../../lib/browser-model/model-integrity";
import type { UpscaleBackend, UpscalerMode, UpscaleScale } from "./contract";

type UpscalerManifestEntry = {
  name: string;
  modelId: string;
  bytes: number;
  parts: readonly BrowserModelPart[];
  dtype: "q8" | "fp32";
  nativeScale: UpscaleScale;
  tileSize: Record<UpscaleBackend, number>;
};

const lightweight2x = {
  name: "Swin2SR Lightweight x2 Q8",
  modelId: "swin2sr-lightweight-x2",
  bytes: 7_082_844,
  parts: [
    {
      path: "/models/image-upscaler/v2/swin2sr-lightweight-x2/onnx/model_quantized.onnx",
      bytes: 7_082_844,
      sha256:
        "8be384ae3a1483833996886278022f94d332813e8d08f03a1e315ea4a412b3c2",
    },
  ],
  dtype: "q8",
  nativeScale: 2,
  tileSize: { wasm: 256, webgpu: 512 },
} as const satisfies UpscalerManifestEntry;

const realworld4xCompact = {
  name: "Swin2SR Realworld x4 Q8",
  modelId: "swin2sr-realworld-x4",
  bytes: 21_438_622,
  parts: [
    {
      path: "/models/image-upscaler/v2/swin2sr-realworld-x4/onnx/model_quantized.onnx",
      bytes: 21_438_622,
      sha256:
        "9e9bae06e1c280a1f2f5ab093312ee1ec39186afc8912259bb9e3de838f85fb8",
    },
  ],
  dtype: "q8",
  nativeScale: 4,
  tileSize: { wasm: 64, webgpu: 256 },
} as const satisfies UpscalerManifestEntry;

const realworld4xQuality = {
  name: "Swin2SR Realworld x4 FP32",
  modelId: "swin2sr-realworld-x4",
  bytes: 52_772_645,
  parts: [
    {
      path: "/models/image-upscaler/v2/swin2sr-realworld-x4/onnx/model.onnx.part1.bin",
      bytes: 20_000_000,
      sha256:
        "9553c663c862700934f7209aceaf6533768296d93c7cbaedfe696ae69d2f808b",
    },
    {
      path: "/models/image-upscaler/v2/swin2sr-realworld-x4/onnx/model.onnx.part2.bin",
      bytes: 20_000_000,
      sha256:
        "135fb7fe4b80346851254424ab5ee112158bbc8f64a6ec1750ddcaa9ffd83032",
    },
    {
      path: "/models/image-upscaler/v2/swin2sr-realworld-x4/onnx/model.onnx.part3.bin",
      bytes: 12_772_645,
      sha256:
        "93b9c3c149f4838bdd0177e85f2bb87f7dce7955e206909644ab2753167fe207",
    },
  ],
  dtype: "fp32",
  nativeScale: 4,
  tileSize: { wasm: 256, webgpu: 256 },
} as const satisfies UpscalerManifestEntry;

export const upscalerModelManifest = {
  fast: {
    2: lightweight2x,
    4: realworld4xCompact,
  },
  quality: {
    2: realworld4xQuality,
    4: realworld4xQuality,
  },
} as const satisfies Record<
  UpscalerMode,
  Record<UpscaleScale, UpscalerManifestEntry>
>;

export function upscalerModelEntry(
  mode: UpscalerMode,
  scale: UpscaleScale,
): UpscalerManifestEntry {
  return upscalerModelManifest[mode][scale];
}

export function upscalerTileSize(
  mode: UpscalerMode,
  scale: UpscaleScale,
  backend: UpscaleBackend,
): number {
  return upscalerModelEntry(mode, scale).tileSize[backend];
}

export function modelTransferLabel(
  mode: UpscalerMode,
  scale: UpscaleScale,
): string {
  const bytes = upscalerModelEntry(mode, scale).bytes;
  return `${(bytes / 1_000_000).toFixed(1)} MB (${bytes.toLocaleString("en-US")} B)`;
}
