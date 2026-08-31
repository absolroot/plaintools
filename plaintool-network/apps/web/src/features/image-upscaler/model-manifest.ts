import type { BrowserModelPart } from "../../lib/browser-model/model-integrity";
import type { UpscalerMode } from "./contract";

type UpscalerManifestEntry = {
  name: string;
  bytes: number;
  parts: readonly BrowserModelPart[];
  initialTileSize: number;
};

export const upscalerModelManifest = {
  fast: {
    name: "Swin2SR Realworld x4 Q8",
    bytes: 21_438_622,
    parts: [
      {
        path: "/models/image-upscaler/v2/swin2sr-realworld-x4/onnx/model_quantized.onnx",
        bytes: 21_438_622,
        sha256:
          "9e9bae06e1c280a1f2f5ab093312ee1ec39186afc8912259bb9e3de838f85fb8",
      },
    ],
    initialTileSize: 64,
  },
  quality: {
    name: "Swin2SR Realworld x4 FP32",
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
    initialTileSize: 256,
  },
} as const satisfies Record<UpscalerMode, UpscalerManifestEntry>;

export function modelTransferLabel(mode: UpscalerMode): string {
  const bytes = upscalerModelManifest[mode].bytes;
  return `${(bytes / 1_000_000).toFixed(1)} MB (${bytes.toLocaleString("en-US")} B)`;
}
