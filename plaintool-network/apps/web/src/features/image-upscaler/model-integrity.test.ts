import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { upscalerModelManifest } from "./model-manifest";

describe("image upscaler model assets", () => {
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

    for (const mode of ["fast", "quality"] as const) {
      const built = upscalerModelManifest[mode];
      const raw = rawManifest.variants[mode === "fast" ? "compact" : mode];
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
