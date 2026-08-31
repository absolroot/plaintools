import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { readVerifiedModelPart, sha256Hex } from "./model-integrity";
import { modelManifest } from "./model-manifest";

const abcSha256 =
  "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";

describe("background remover model integrity", () => {
  it("keeps the runtime part metadata aligned with the deployed manifest", () => {
    const deployed = JSON.parse(
      readFileSync(
        new URL(
          "../../../public/models/background-remover/v1/manifest.json",
          import.meta.url,
        ),
        "utf8",
      ),
    ) as {
      models: Record<
        keyof typeof modelManifest,
        {
          bytes: number;
          parts: Array<{ path: string; bytes: number; sha256: string }>;
        }
      >;
    };

    for (const modelId of Object.keys(modelManifest) as Array<
      keyof typeof modelManifest
    >) {
      expect(modelManifest[modelId].bytes).toBe(deployed.models[modelId].bytes);
      expect(modelManifest[modelId].parts).toEqual(
        deployed.models[modelId].parts.map((part) => ({
          ...part,
          path: `/models/background-remover/v1/${part.path}`,
        })),
      );
    }
  });

  it("writes a streamed part into the destination and verifies its digest", async () => {
    const progress = vi.fn();
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new Uint8Array([0x61, 0x62]));
          controller.enqueue(new Uint8Array([0x63]));
          controller.close();
        },
      }),
      { headers: { "content-length": "3" } },
    );
    const destination = new Uint8Array(5);

    await readVerifiedModelPart(
      response,
      destination,
      1,
      {
        path: "/model.bin",
        bytes: 3,
        sha256: abcSha256,
      },
      progress,
    );

    expect([...destination]).toEqual([0, 0x61, 0x62, 0x63, 0]);
    expect(progress.mock.calls).toEqual([[2], [3]]);
    expect(await sha256Hex(destination.subarray(1, 4))).toBe(abcSha256);
  });

  it("rejects and clears a same-size part with a different digest", async () => {
    const destination = new Uint8Array(3);
    const response = new Response(new Uint8Array([0x61, 0x62, 0x64]));

    await expect(
      readVerifiedModelPart(response, destination, 0, {
        path: "/model.bin",
        bytes: 3,
        sha256: abcSha256,
      }),
    ).rejects.toMatchObject({ code: "model-sha256" });
    expect([...destination]).toEqual([0, 0, 0]);
  });

  it("cancels an oversized stream before copying the overflow chunk", async () => {
    const cancel = vi.fn();
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2]));
          controller.enqueue(new Uint8Array([3, 4]));
        },
        cancel,
      }),
    );
    const destination = new Uint8Array(3);

    await expect(
      readVerifiedModelPart(response, destination, 0, {
        path: "/model.bin",
        bytes: 3,
        sha256: abcSha256,
      }),
    ).rejects.toMatchObject({ code: "model-size" });
    expect(cancel).toHaveBeenCalledOnce();
    expect([...destination]).toEqual([0, 0, 0]);
  });
});
