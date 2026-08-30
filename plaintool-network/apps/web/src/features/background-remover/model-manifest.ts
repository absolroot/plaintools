import type {
  BackgroundModelId,
  BackgroundModelNormalization,
  BackgroundModelOutput,
} from "./contract";

type BackgroundModelManifestEntry = {
  bytes: number;
  parts: readonly string[];
  inputSize: number;
  normalization: BackgroundModelNormalization;
  output: BackgroundModelOutput;
  executionProvider: "wasm" | "webgpu";
};

export const modelManifest = {
  fast: {
    bytes: 4_574_861,
    parts: ["/models/background-remover/v1/u2netp.onnx"],
    inputSize: 320,
    normalization: "u2net",
    output: "minmax",
    executionProvider: "wasm",
  },
  portrait: {
    bytes: 6_632_188,
    parts: ["/models/background-remover/v1/modnet-quantized.onnx"],
    inputSize: 512,
    normalization: "modnet",
    output: "direct",
    executionProvider: "wasm",
  },
  quality: {
    bytes: 44_173_029,
    parts: [
      "/models/background-remover/v1/silueta.onnx.part1.bin",
      "/models/background-remover/v1/silueta.onnx.part2.bin",
    ],
    inputSize: 320,
    normalization: "u2net",
    output: "minmax",
    executionProvider: "wasm",
  },
  precision: {
    bytes: 98_484_532,
    parts: [
      "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part1.bin",
      "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part2.bin",
      "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part3.bin",
      "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part4.bin",
      "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part5.bin",
    ],
    inputSize: 512,
    normalization: "imagenet",
    output: "sigmoid-minmax",
    executionProvider: "webgpu",
  },
} as const satisfies Record<BackgroundModelId, BackgroundModelManifestEntry>;
