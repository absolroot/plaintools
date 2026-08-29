import type { CodecMode, CodecOptions } from "@plaintool/codec-core";
import type { PreparedWorkerMessage } from "../../scripts/shared/latest-worker-runner";
import type { Base64ClientErrorCode, Base64WorkerRequest } from "./contract";

export type Base64RunContext = {
  mode: CodecMode;
  input: string;
  file: File | null;
  options: Partial<CodecOptions>;
};

export function base64FailureCode(mode: CodecMode): Base64ClientErrorCode {
  return mode === "encode" ? "encode-failed" : "decode-failed";
}

export async function prepareBase64WorkerMessage(
  id: number,
  context: Base64RunContext,
): Promise<PreparedWorkerMessage<Base64WorkerRequest>> {
  const payloadInput = context.file
    ? context.mode === "encode"
      ? await context.file.arrayBuffer()
      : await context.file.text()
    : context.input;
  return {
    payload: { id, input: payloadInput, options: context.options },
    transfer: payloadInput instanceof ArrayBuffer ? [payloadInput] : [],
  };
}
