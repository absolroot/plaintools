import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { upscalerModelEntry, upscalerTileSize } from "./model-manifest";

describe("image upscaler model assets", () => {
  it("uses the direct lightweight model only for compact 2x output", () => {
    expect(upscalerModelEntry("fast", 2)).toMatchObject({
      modelId: "swin2sr-lightweight-x2",
      nativeScale: 2,
      bytes: 7_082_844,
    });
    expect(upscalerModelEntry("fast", 4)).toMatchObject({
      modelId: "swin2sr-realworld-x4",
      nativeScale: 4,
    });
    expect(upscalerModelEntry("quality", 2)).toBe(
      upscalerModelEntry("quality", 4),
    );
  });

  it("uses larger WebGPU tiles without relaxing the WASM memory bounds", () => {
    expect(upscalerTileSize("fast", 2, "wasm")).toBe(256);
    expect(upscalerTileSize("fast", 2, "webgpu")).toBe(512);
    expect(upscalerTileSize("fast", 4, "wasm")).toBe(64);
    expect(upscalerTileSize("fast", 4, "webgpu")).toBe(256);
  });

  it("matches every built part and reconstructed model hash", async () => {
    const rawManifest = JSON.parse(
      await readFile(
        fileURLToPath(
          new URL(
            "../../../public/models/image-upscaler/v2/manifest.json",
            import.meta.url,
          ),
        ),
        "utf8",
      ),
    ) as {
      variants: Record<
        string,
        {
          bytes: number;
          sha256: string;
          parts: Array<{ path: string; bytes: number; sha256: string }>;
        }
      >;
    };

    const variants = [
      { mode: "fast", scale: 2, manifestId: "compact-2x" },
      { mode: "fast", scale: 4, manifestId: "compact" },
      { mode: "quality", scale: 2, manifestId: "quality" },
    ] as const;

    for (const { mode, scale, manifestId } of variants) {
      const built = upscalerModelEntry(mode, scale);
      const raw = rawManifest.variants[manifestId];
      expect(built.bytes).toBe(raw.bytes);
      const combined = createHash("sha256");
      let bytes = 0;
      for (let index = 0; index < raw.parts.length; index += 1) {
        const part = raw.parts[index];
        const builtPart = built.parts[index];
        expect(builtPart.path.endsWith("/" + part.path)).toBe(true);
        expect(builtPart.bytes).toBe(part.bytes);
        expect(builtPart.sha256).toBe(part.sha256);
        const data = await readFile(
          fileURLToPath(
            new URL(
              "../../../public/models/image-upscaler/v2/" + part.path,
              import.meta.url,
            ),
          ),
        );
        expect(data.byteLength).toBe(part.bytes);
        expect(createHash("sha256").update(data).digest("hex")).toBe(
          part.sha256,
        );
        combined.update(data);
        bytes += data.byteLength;
      }
      expect(bytes).toBe(raw.bytes);
      expect(combined.digest("hex")).toBe(raw.sha256);
    }
  });
});
