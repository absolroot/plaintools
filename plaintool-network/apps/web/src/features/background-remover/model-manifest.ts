import type { BackgroundModelId } from "./contract";

export const modelManifest = {
  fast: {
    bytes: 4_574_861,
    parts: ["/models/background-remover/v1/u2netp.onnx"],
  },
  quality: {
    bytes: 44_173_029,
    parts: [
      "/models/background-remover/v1/silueta.onnx.part1.bin",
      "/models/background-remover/v1/silueta.onnx.part2.bin",
    ],
  },
} as const satisfies Record<
  BackgroundModelId,
  { bytes: number; parts: readonly string[] }
>;
