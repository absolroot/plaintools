import type {
  BackgroundModelId,
  BackgroundModelNormalization,
  BackgroundModelOutput,
} from "./contract";

type BackgroundModelManifestEntry = {
  bytes: number;
  parts: readonly BackgroundModelPart[];
  inputSize: number;
  normalization: BackgroundModelNormalization;
  output: BackgroundModelOutput;
  executionProvider: "wasm" | "webgpu";
};

export type BackgroundModelPart = {
  path: string;
  bytes: number;
  sha256: string;
};

export const modelManifest = {
  fast: {
    bytes: 4_574_861,
    parts: [
      {
        path: "/models/background-remover/v1/u2netp.onnx",
        bytes: 4_574_861,
        sha256:
          "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8",
      },
    ],
    inputSize: 320,
    normalization: "u2net",
    output: "minmax",
    executionProvider: "wasm",
  },
  portrait: {
    bytes: 6_632_188,
    parts: [
      {
        path: "/models/background-remover/v1/modnet-quantized.onnx",
        bytes: 6_632_188,
        sha256:
          "92e49898c3e05a6d7a944fc67a8cb87c4aad754ffb6ebd949528c7d1105fee3a",
      },
    ],
    inputSize: 512,
    normalization: "modnet",
    output: "direct",
    executionProvider: "wasm",
  },
  quality: {
    bytes: 44_173_029,
    parts: [
      {
        path: "/models/background-remover/v1/silueta.onnx.part1.bin",
        bytes: 22_086_515,
        sha256:
          "ab84d10ba33469c797d9655de7342bd7396d35f22e79873aa10a003bc3e3bd38",
      },
      {
        path: "/models/background-remover/v1/silueta.onnx.part2.bin",
        bytes: 22_086_514,
        sha256:
          "031c923e8ce7a1f092d408426fe51ccd136e81b31857e3dc3019ce5313aa0fbc",
      },
    ],
    inputSize: 320,
    normalization: "u2net",
    output: "minmax",
    executionProvider: "wasm",
  },
  precision: {
    bytes: 98_484_532,
    parts: [
      {
        path: "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part1.bin",
        bytes: 20_000_000,
        sha256:
          "87d0e8f80d7e34b77b148758216b3f5ebe5e421d2c8181685a7b070845dc97ee",
      },
      {
        path: "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part2.bin",
        bytes: 20_000_000,
        sha256:
          "3f3959df5d815da60c5ab4a19600a7351a261ec2ac96452fe943e70eb17124c5",
      },
      {
        path: "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part3.bin",
        bytes: 20_000_000,
        sha256:
          "10f4e710142287bfc714b0b9813ce81f5aef29118acf2c2853edf474ae02debc",
      },
      {
        path: "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part4.bin",
        bytes: 20_000_000,
        sha256:
          "4a4d3b01a3215f0bd773c465ada6a085870b0de788bf3d2186a8483a508a9cfd",
      },
      {
        path: "/models/background-remover/v1/birefnet-lite-512-fp16.onnx.part5.bin",
        bytes: 18_484_532,
        sha256:
          "d1595dd2c71ba2ea9b095093194cb010960681e4116b20a1c7e39dd0ddca48c2",
      },
    ],
    inputSize: 512,
    normalization: "imagenet",
    output: "sigmoid-minmax",
    executionProvider: "webgpu",
  },
} as const satisfies Record<BackgroundModelId, BackgroundModelManifestEntry>;
