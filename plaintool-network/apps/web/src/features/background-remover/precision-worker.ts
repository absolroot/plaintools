/// <reference lib="webworker" />

import * as ort from "onnxruntime-web/webgpu";
import wasmModuleUrl from "onnxruntime-web/ort-wasm-simd-threaded.asyncify.mjs?url";
import wasmUrl from "onnxruntime-web/ort-wasm-simd-threaded.asyncify.wasm?url";
import { startBackgroundWorker } from "./worker-runtime";

const workerScope = self as DedicatedWorkerGlobalScope;
ort.env.logLevel = "error";
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.wasmPaths = {
  wasm: new URL(wasmUrl, workerScope.location.href).href,
  mjs: new URL(wasmModuleUrl, workerScope.location.href).href,
};

startBackgroundWorker(ort);
