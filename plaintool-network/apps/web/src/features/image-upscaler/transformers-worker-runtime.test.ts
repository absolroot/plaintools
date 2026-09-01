import { describe, expect, it } from "vitest";
import type { UpscaleRequest } from "./contract";
import { tilesFor, writeTile } from "./transformers-worker-runtime";

function modelTile(
  width: number,
  height: number,
  rgb: readonly [number, number, number],
) {
  const data = new Uint8ClampedArray(width * height * 3);
  for (let index = 0; index < data.length; index += 3) {
    data.set(rgb, index);
  }
  return { channels: 3 as const, data, height, width };
}

describe("image upscaler tile composition", () => {
  it("writes native 4x model tiles directly into a final 2x surface", () => {
    const rgba = new Uint8ClampedArray(4 * 2 * 4);
    for (let index = 0; index < rgba.length; index += 4) {
      rgba.set([9, 19, 29, 211], index);
    }
    const request: UpscaleRequest = {
      kind: "upscale",
      requestId: 1,
      mode: "quality",
      scale: 2,
      rgba,
      width: 4,
      height: 2,
      tileSize: 2,
    };
    const [left, right] = tilesFor(request.width, request.height, 2);
    const destination = new Uint8ClampedArray(8 * 4 * 4);
    writeTile(
      destination,
      request,
      left,
      modelTile(left.extendedWidth * 4, left.extendedHeight * 4, [200, 10, 20]),
      4,
    );
    writeTile(
      destination,
      request,
      right,
      modelTile(
        right.extendedWidth * 4,
        right.extendedHeight * 4,
        [30, 180, 40],
      ),
      4,
    );

    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 8; x += 1) {
        const pixel = Array.from(
          destination.subarray((y * 8 + x) * 4, (y * 8 + x) * 4 + 4),
        );
        expect(pixel).toEqual(x < 4 ? [200, 10, 20, 211] : [30, 180, 40, 211]);
      }
    }
  });
});
