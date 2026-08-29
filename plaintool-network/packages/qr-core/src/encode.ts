import QRCode from "qrcode";
import type { QrEncodeOptions, QrMatrix, QrRgbaImage } from "./types";

function normalizeQuietZone(value: number | undefined): number {
  if (value === undefined) return 4;
  if (!Number.isInteger(value) || value < 0 || value > 16) {
    throw new RangeError("quiet-zone-out-of-range");
  }
  return value;
}

export function createQrMatrix(
  text: string,
  options: QrEncodeOptions = {},
): QrMatrix {
  if (!text) throw new RangeError("empty-input");
  const code = QRCode.create(text, {
    errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
  });
  return {
    size: code.modules.size,
    quietZone: normalizeQuietZone(options.quietZone),
    modules: Array.from(code.modules.data, Boolean),
  };
}

export function renderQrSvg(
  matrix: QrMatrix,
  foreground = "#000000",
  background = "#ffffff",
): string {
  const fullSize = matrix.size + matrix.quietZone * 2;
  const path: string[] = [];
  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (matrix.modules[y * matrix.size + x]) {
        path.push(`M${x + matrix.quietZone} ${y + matrix.quietZone}h1v1h-1z`);
      }
    }
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fullSize} ${fullSize}" shape-rendering="crispEdges">`,
    `<path fill="${background}" d="M0 0h${fullSize}v${fullSize}H0z"/>`,
    `<path fill="${foreground}" d="${path.join("")}"/>`,
    "</svg>",
  ].join("");
}

export function renderQrRgba(matrix: QrMatrix, modulePixels = 8): QrRgbaImage {
  if (
    !Number.isInteger(modulePixels) ||
    modulePixels < 1 ||
    modulePixels > 64
  ) {
    throw new RangeError("module-size-out-of-range");
  }
  const modulesWide = matrix.size + matrix.quietZone * 2;
  const width = modulesWide * modulePixels;
  const data = new Uint8ClampedArray(width * width * 4);
  data.fill(255);

  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (!matrix.modules[y * matrix.size + x]) continue;
      const left = (x + matrix.quietZone) * modulePixels;
      const top = (y + matrix.quietZone) * modulePixels;
      for (let py = top; py < top + modulePixels; py += 1) {
        for (let px = left; px < left + modulePixels; px += 1) {
          const offset = (py * width + px) * 4;
          data[offset] = 0;
          data[offset + 1] = 0;
          data[offset + 2] = 0;
          data[offset + 3] = 255;
        }
      }
    }
  }
  return { data, width, height: width };
}
