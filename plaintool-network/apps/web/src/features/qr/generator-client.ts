import { createQrMatrix, renderQrSvg } from "@plaintool/qr-core/encode";
import type { QrErrorCorrectionLevel, QrMatrix } from "@plaintool/qr-core";
import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { QrGeneratorCopy } from "./contract";

const AUTO_RUN_DELAY = 120;
const CANVAS_TARGET_SIZE = 1024;

function drawMatrix(canvas: HTMLCanvasElement, matrix: QrMatrix): void {
  const modulesWide = matrix.size + matrix.quietZone * 2;
  const modulePixels = Math.max(
    1,
    Math.floor(CANVAS_TARGET_SIZE / modulesWide),
  );
  const canvasSize = modulesWide * modulePixels;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("canvas-context-unavailable");
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvasSize, canvasSize);
  context.fillStyle = "#000000";
  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (!matrix.modules[y * matrix.size + x]) continue;
      context.fillRect(
        (x + matrix.quietZone) * modulePixels,
        (y + matrix.quietZone) * modulePixels,
        modulePixels,
        modulePixels,
      );
    }
  }
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<QrGeneratorCopy>(root);
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const canvas = root.querySelector<HTMLCanvasElement>("[data-canvas]")!;
  const placeholder = root.querySelector<HTMLElement>(
    "[data-preview-placeholder]",
  )!;
  const errorCorrection = root.querySelector<HTMLSelectElement>(
    "[data-error-correction]",
  )!;
  const quietZone = root.querySelector<HTMLSelectElement>("[data-quiet-zone]")!;
  const pngButton = root.querySelector<HTMLButtonElement>(
    "[data-download-png]",
  )!;
  const svgButton = root.querySelector<HTMLButtonElement>(
    "[data-download-svg]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  let timer = 0;
  let matrix: QrMatrix | null = null;
  let revision = 0;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  function invalidateResult(): void {
    matrix = null;
    canvas.hidden = true;
    placeholder.hidden = false;
    pngButton.disabled = true;
    svgButton.disabled = true;
  }

  function generate(): void {
    window.clearTimeout(timer);
    revision += 1;
    if (!input.value) {
      invalidateResult();
      setStatus(copy.empty, "error");
      return;
    }
    try {
      const nextMatrix = createQrMatrix(input.value, {
        errorCorrectionLevel: errorCorrection.value as QrErrorCorrectionLevel,
        quietZone: Number(quietZone.value),
      });
      drawMatrix(canvas, nextMatrix);
      matrix = nextMatrix;
      canvas.hidden = false;
      placeholder.hidden = true;
      pngButton.disabled = false;
      svgButton.disabled = false;
      setStatus(copy.completed, "success");
    } catch (error) {
      invalidateResult();
      const isCapacityError =
        error instanceof RangeError ||
        (error instanceof Error && /code length overflow/i.test(error.message));
      setStatus(
        isCapacityError ? copy.tooLong : copy.generationFailed,
        "error",
      );
    }
  }

  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    revision += 1;
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    pngButton.disabled = true;
    svgButton.disabled = true;
    timer = window.setTimeout(generate, AUTO_RUN_DELAY);
  });

  [errorCorrection, quietZone].forEach((control) =>
    control.addEventListener("change", () => {
      if (input.value) generate();
    }),
  );
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    window.clearTimeout(timer);
    revision += 1;
    input.value = "";
    invalidateResult();
    setStatus(copy.ready);
    input.focus();
  });

  pngButton.addEventListener("click", () => {
    if (!matrix) return;
    const downloadRevision = revision;
    canvas.toBlob((blob) => {
      if (downloadRevision !== revision) return;
      if (!blob) {
        setStatus(copy.downloadFailed, "error");
        return;
      }
      downloadBlob(blob, copy.pngFileName);
    }, "image/png");
  });

  svgButton.addEventListener("click", () => {
    if (!matrix) return;
    const svg = renderQrSvg(matrix);
    downloadBlob(
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
      copy.svgFileName,
    );
  });
}

document.querySelectorAll<HTMLElement>("[data-qr-generator]").forEach(init);
