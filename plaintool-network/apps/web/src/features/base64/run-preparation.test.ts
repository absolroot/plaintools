import { describe, expect, it, vi } from "vitest";
import {
  base64FailureCode,
  prepareBase64WorkerMessage,
} from "./run-preparation";

const options = { mode: "encode" as const, variant: "standard" as const };

describe("prepareBase64WorkerMessage", () => {
  it("keeps encode and decode infrastructure failures distinct", () => {
    expect(base64FailureCode("encode")).toBe("encode-failed");
    expect(base64FailureCode("decode")).toBe("decode-failed");
  });

  it("passes text through without a transfer list", async () => {
    await expect(
      prepareBase64WorkerMessage(4, {
        mode: "encode",
        input: "PlainTool",
        file: null,
        options,
      }),
    ).resolves.toEqual({
      payload: { id: 4, input: "PlainTool", options },
      transfer: [],
    });
  });

  it("reads encode files as bytes and transfers the same buffer", async () => {
    const buffer = new ArrayBuffer(8);
    const file = {
      arrayBuffer: vi.fn().mockResolvedValue(buffer),
      text: vi.fn(),
    } as unknown as File;

    const prepared = await prepareBase64WorkerMessage(7, {
      mode: "encode",
      input: "file.bin",
      file,
      options,
    });

    expect(file.arrayBuffer).toHaveBeenCalledOnce();
    expect(file.text).not.toHaveBeenCalled();
    expect(prepared.payload.input).toBe(buffer);
    expect(prepared.transfer).toEqual([buffer]);
  });

  it("reads decode files as text and propagates read failures", async () => {
    const failure = new Error("read failed");
    const file = {
      arrayBuffer: vi.fn(),
      text: vi.fn().mockRejectedValue(failure),
    } as unknown as File;

    await expect(
      prepareBase64WorkerMessage(9, {
        mode: "decode",
        input: "encoded.txt",
        file,
        options: { ...options, mode: "decode" },
      }),
    ).rejects.toBe(failure);
    expect(file.arrayBuffer).not.toHaveBeenCalled();
  });
});
