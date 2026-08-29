import {
  CodecError,
  decodeText,
  defaultOptions,
  encodeBytes,
  encodeText,
  type CodecOptions,
  type CodecResult,
} from "@plaintool/codec-core";
import type { Base64WorkerReply, Base64WorkerRequest } from "./contract";

const workerScope = self as unknown as {
  postMessage(message: Base64WorkerReply, transfer: ArrayBuffer[]): void;
};

self.addEventListener("message", (event: MessageEvent<Base64WorkerRequest>) => {
  const { id, input } = event.data;
  const options: CodecOptions = { ...defaultOptions, ...event.data.options };

  try {
    let result: CodecResult;
    if (options.mode === "encode" && input instanceof ArrayBuffer) {
      const bytes = new Uint8Array(input);
      result = {
        mode: "encode",
        kind: "base64",
        text: encodeBytes(bytes, options),
        repairs: [],
        warnings: [],
        detectedVariant: options.variant === "url" ? "url" : "standard",
      };
    } else {
      const text =
        typeof input === "string" ? input : new TextDecoder().decode(input);
      result =
        options.mode === "encode"
          ? encodeText(text, options)
          : decodeText(text, options);
    }
    if (result.kind !== "binary") result = { ...result, bytes: undefined };
    const reply: Base64WorkerReply = { id, ok: true, result };
    const transfer =
      result.bytes?.buffer instanceof ArrayBuffer ? [result.bytes.buffer] : [];
    workerScope.postMessage(reply, transfer);
  } catch (error) {
    const code = error instanceof CodecError ? error.code : "decode-failed";
    const reply: Base64WorkerReply = { id, ok: false, error: code };
    self.postMessage(reply);
  }
});
