import { describe, expect, it } from "vitest";
import {
  detectImageFormat,
  encodeBmp,
  hasTransparency,
  sanitizeSvgForRasterization,
  validatePixelBudget,
} from "./codec-core";

function bytes(...values: number[]): Uint8Array {
  return new Uint8Array(values);
}

describe("image converter codec core", () => {
  it.each([
    ["bmp", bytes(0x42, 0x4d, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)],
    ["png", bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0)],
    ["jpg", bytes(0xff, 0xd8, 0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0)],
    ["gif", bytes(0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0, 0, 0, 0, 0, 0)],
    ["webp", bytes(0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50)],
    ["avif", bytes(0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66)],
    ["heic", bytes(0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63)],
  ])("detects %s by signature", (format, input) => {
    expect(detectImageFormat(input)).toBe(format);
  });

  it("rejects extensions disguised as images", () => {
    expect(
      detectImageFormat(new TextEncoder().encode("<script>x</script>")),
    ).toBeUndefined();
  });

  it("detects SVG after a normal XML declaration, comment, and doctype", () => {
    const svg = `\uFEFF<?xml version="1.0" encoding="UTF-8"?>
      <!-- exported by a vector editor -->
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"></svg>`;
    expect(detectImageFormat(new TextEncoder().encode(svg))).toBe("svg");
    expect(detectImageFormat(new TextEncoder().encode("<svg/>"))).toBe("svg");
  });

  it("sanitizes a local-only SVG before rasterization", () => {
    const svg = `<?xml version="1.0"?>
      <!-- remove this -->
      <!DOCTYPE svg [<!ENTITY unused "unused">]>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8">
        <defs><linearGradient id="paint"><stop offset="0" /></linearGradient></defs>
        <rect width="12" height="8" fill="url(#paint)" style="opacity:.8" />
      </svg>`;
    const sanitized = new TextDecoder().decode(
      sanitizeSvgForRasterization(new TextEncoder().encode(svg).buffer),
    );
    expect(sanitized).toMatch(/^<svg/u);
    expect(sanitized).not.toContain("DOCTYPE");
    expect(sanitized).not.toContain("remove this");
    expect(sanitized).toContain("url(#paint)");
  });

  it.each([
    "<svg><script>alert(1)</script></svg>",
    "<svg><foreignObject><div>unsafe</div></foreignObject></svg>",
    '<svg><rect onload="alert(1)" /></svg>',
    '<svg><image href="https://attacker.invalid/image.png" /></svg>',
    '<svg><image href="data:image/png;base64,AA==" /></svg>',
    '<svg><rect fill="url(https://attacker.invalid/paint.svg)" /></svg>',
    '<svg><rect style="fill:u\\72l(https://attacker.invalid/x)" /></svg>',
    "<svg><style>rect { fill: red }</style></svg>",
  ])("rejects active or nested SVG resources: %s", (svg) => {
    expect(() =>
      sanitizeSvgForRasterization(new TextEncoder().encode(svg).buffer),
    ).toThrow("decode-failed");
  });

  it("writes a top-down 32-bit BMP V5 with alpha", () => {
    const output = encodeBmp({
      width: 1,
      height: 1,
      data: new Uint8ClampedArray([10, 20, 30, 40]),
    });
    const view = new DataView(output.buffer);
    expect(String.fromCharCode(output[0]!, output[1]!)).toBe("BM");
    expect(view.getUint32(14, true)).toBe(124);
    expect(view.getInt32(22, true)).toBe(-1);
    expect(view.getUint16(28, true)).toBe(32);
    expect([...output.subarray(138)]).toEqual([30, 20, 10, 40]);
  });

  it("detects alpha and rejects decompression-bomb dimensions", () => {
    expect(
      hasTransparency({
        width: 1,
        height: 1,
        data: new Uint8ClampedArray([0, 0, 0, 254]),
      }),
    ).toBe(true);
    expect(() => validatePixelBudget(10_000, 10_000)).toThrow(
      "image-dimensions-too-large",
    );
  });
});
