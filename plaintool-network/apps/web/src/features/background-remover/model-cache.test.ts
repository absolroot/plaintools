import { describe, expect, it, vi } from "vitest";
import { loadVerifiedModelPart } from "./model-cache";

const abcSha256 =
  "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const part = {
  path: "/models/background-remover/v1/test.onnx",
  bytes: 3,
  sha256: abcSha256,
};

function response(bytes: number[]): Response {
  return new Response(new Uint8Array(bytes), {
    headers: { "content-length": String(bytes.length) },
  });
}

describe("background remover persistent model cache", () => {
  it("stores a verified network part and reuses it without another fetch", async () => {
    let stored: Response | undefined;
    const cache = {
      match: vi.fn(async () => stored?.clone()),
      put: vi.fn(async (_path: string, value: Response) => {
        stored = value.clone();
      }),
      delete: vi.fn(async () => true),
    };
    const fetchPart = vi.fn(async () => response([0x61, 0x62, 0x63]));
    const dependencies = {
      openCache: async () => cache,
      fetchPart,
    };
    const first = new Uint8Array(3);
    const second = new Uint8Array(3);

    await expect(
      loadVerifiedModelPart(part, first, 0, undefined, dependencies),
    ).resolves.toBe("network");
    await expect(
      loadVerifiedModelPart(part, second, 0, undefined, dependencies),
    ).resolves.toBe("cache");

    expect([...first]).toEqual([0x61, 0x62, 0x63]);
    expect([...second]).toEqual([0x61, 0x62, 0x63]);
    expect(fetchPart).toHaveBeenCalledOnce();
    expect(cache.put).toHaveBeenCalledOnce();
  });

  it("evicts an invalid cached part and replaces it from the network", async () => {
    const cache = {
      match: vi.fn(async () => response([0x61, 0x62, 0x64])),
      put: vi.fn(async () => undefined),
      delete: vi.fn(async () => true),
    };
    const fetchPart = vi.fn(async () => response([0x61, 0x62, 0x63]));
    const destination = new Uint8Array(3);

    await expect(
      loadVerifiedModelPart(part, destination, 0, undefined, {
        openCache: async () => cache,
        fetchPart,
      }),
    ).resolves.toBe("network");

    expect([...destination]).toEqual([0x61, 0x62, 0x63]);
    expect(cache.delete).toHaveBeenCalledWith(part.path);
    expect(fetchPart).toHaveBeenCalledOnce();
    expect(cache.put).toHaveBeenCalledOnce();
  });
});
