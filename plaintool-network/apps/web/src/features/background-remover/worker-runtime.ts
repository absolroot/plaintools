/// <reference lib="webworker" />

import type { InferenceSession } from "onnxruntime-web";
import type {
  BackgroundModelId,
  BackgroundWorkerResponse,
  RemoveRequest,
} from "./contract";
import { joinByteParts, normalizeMask } from "./image";
import { modelManifest } from "./model-manifest";

type OrtApi = typeof import("onnxruntime-web");

export function startBackgroundWorker(ort: OrtApi): void {
  const workerScope = self as DedicatedWorkerGlobalScope;
  let session: InferenceSession | undefined;
  let sessionModel: BackgroundModelId | undefined;

  function post(
    message: BackgroundWorkerResponse,
    transfer: Transferable[] = [],
  ): void {
    workerScope.postMessage(message, transfer);
  }

  async function fetchPart(
    path: string,
    requestId: number,
    completed: number,
    total: number,
  ): Promise<Uint8Array> {
    const response = await fetch(path, { credentials: "same-origin" });
    if (!response.ok) throw new Error("model-fetch");
    if (!response.body) return new Uint8Array(await response.arrayBuffer());
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = completed;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.byteLength;
      post({ kind: "progress", requestId, phase: "download", loaded, total });
    }
    return joinByteParts(chunks);
  }

  async function loadModel(
    model: BackgroundModelId,
    requestId: number,
  ): Promise<void> {
    if (session && sessionModel === model) return;
    if (session) {
      await session.release();
      session = undefined;
      sessionModel = undefined;
    }
    const manifest = modelManifest[model];
    const parts: Uint8Array[] = [];
    let completed = 0;
    post({
      kind: "progress",
      requestId,
      phase: "download",
      loaded: 0,
      total: manifest.bytes,
    });
    for (const path of manifest.parts) {
      const part = await fetchPart(path, requestId, completed, manifest.bytes);
      parts.push(part);
      completed += part.byteLength;
    }
    const modelBytes = joinByteParts(parts);
    if (modelBytes.byteLength !== manifest.bytes) throw new Error("model-size");
    post({ kind: "progress", requestId, phase: "model" });
    session = await ort.InferenceSession.create(modelBytes, {
      executionProviders: [manifest.executionProvider],
      graphOptimizationLevel: "all",
      logSeverityLevel: 3,
    });
    sessionModel = model;
  }

  workerScope.addEventListener(
    "message",
    (event: MessageEvent<RemoveRequest>) => {
      const request = event.data;
      if (request.kind !== "remove") return;
      void (async () => {
        try {
          await loadModel(request.model, request.requestId);
        } catch {
          post({ kind: "error", requestId: request.requestId, code: "model" });
          return;
        }
        try {
          post({
            kind: "progress",
            requestId: request.requestId,
            phase: "inference",
          });
          const activeSession = session!;
          const inputName = activeSession.inputNames[0];
          const outputName = activeSession.outputNames[0];
          const output = await activeSession.run({
            [inputName]: new ort.Tensor("float32", request.tensor, [
              1,
              3,
              modelManifest[request.model].inputSize,
              modelManifest[request.model].inputSize,
            ]),
          });
          const alpha = normalizeMask(
            output[outputName].data as ArrayLike<number>,
            modelManifest[request.model].output,
          );
          post(
            {
              kind: "result",
              requestId: request.requestId,
              alpha,
              width: modelManifest[request.model].inputSize,
              height: modelManifest[request.model].inputSize,
            },
            [alpha.buffer],
          );
        } catch {
          post({
            kind: "error",
            requestId: request.requestId,
            code: "inference",
          });
        }
      })();
    },
  );
}
