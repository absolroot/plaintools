export type ImageToImagePipeline = {
  (image: RawImage): Promise<RawImage>;
  dispose(): Promise<void>;
};

export class RawImage {
  constructor(
    data: Uint8ClampedArray | Uint8Array,
    width: number,
    height: number,
    channels: 1 | 2 | 3 | 4,
  );
  data: Uint8ClampedArray | Uint8Array;
  width: number;
  height: number;
  channels: 1 | 2 | 3 | 4;
}

export const env: {
  backends: {
    onnx: {
      wasm?: {
        numThreads: number;
        proxy: boolean;
        wasmPaths: { wasm: string; mjs: string };
      };
    };
  };
  allowLocalModels: boolean;
  allowRemoteModels: boolean;
  localModelPath: string;
  useBrowserCache: boolean;
  fetch?: typeof fetch;
};

export function pipeline(
  task: "image-to-image",
  model: string,
  options: {
    device: "wasm" | "webgpu";
    dtype: "q8" | "fp32";
    local_files_only: boolean;
  },
): Promise<ImageToImagePipeline>;
