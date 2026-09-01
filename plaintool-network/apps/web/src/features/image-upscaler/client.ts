import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  ImageUpscalerCopy,
  UpscaleBackend,
  UpscaleFormat,
  UpscaleRequest,
  UpscalerMode,
  UpscaleScale,
  UpscaleWorkerResponse,
} from "./contract";
import {
  containsTransparency,
  inputPixelLimit,
  MAX_FILE_BYTES,
  outputFilename,
  validateOutputDimensions,
} from "./image";
import {
  modelTransferLabel,
  upscalerTileSize,
} from "./model-manifest";
import {
  runTransformersUpscale,
  type InferenceProgress,
} from "./transformers-worker-runtime";

type DecodedImage = ImageBitmap | HTMLImageElement;
type Result = {
  rgba: Uint8ClampedArray<ArrayBuffer>;
  width: number;
  height: number;
};

function isImageBitmap(image: DecodedImage): image is ImageBitmap {
  return typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
}

function closeImage(image: DecodedImage): void {
  if (isImageBitmap(image)) image.close();
}

async function decodeImage(file: File): Promise<DecodedImage> {
  if ("createImageBitmap" in globalThis) {
    return createImageBitmap(file, { imageOrientation: "from-image" });
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function dimensions(image: DecodedImage): { width: number; height: number } {
  return isImageBitmap(image)
    ? { width: image.width, height: image.height }
    : { width: image.naturalWidth, height: image.naturalHeight };
}

function template(
  source: string,
  values: Record<string, string | number>,
): string {
  return source.replace(/\{([^}]+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

function webGpuApi(): { requestAdapter: () => Promise<unknown> } | undefined {
  return (
    navigator as Navigator & {
      gpu?: { requestAdapter: () => Promise<unknown> };
    }
  ).gpu;
}

document
  .querySelectorAll<HTMLElement>("[data-image-upscaler]")
  .forEach((root) => {
    const copy = readClientCopy<ImageUpscalerCopy>(root);
    const fileInput =
      root.querySelector<HTMLInputElement>("[data-file-input]")!;
    const openButton =
      root.querySelector<HTMLButtonElement>("[data-open-file]")!;
    const newImageButton =
      root.querySelector<HTMLButtonElement>("[data-new-image]")!;
    const uploadPrompt = root.querySelector<HTMLElement>(
      "[data-upload-prompt]",
    )!;
    const sourceCanvas = root.querySelector<HTMLCanvasElement>(
      "[data-source-canvas]",
    )!;
    const comparisonOriginal = root.querySelector<HTMLCanvasElement>(
      "[data-comparison-original]",
    )!;
    const resultCanvas = root.querySelector<HTMLCanvasElement>(
      "[data-result-canvas]",
    )!;
    const comparison = root.querySelector<HTMLElement>("[data-comparison]")!;
    const resultClip = root.querySelector<HTMLElement>("[data-result-clip]")!;
    const divider = root.querySelector<HTMLElement>("[data-divider]")!;
    const comparisonRange = root.querySelector<HTMLInputElement>(
      "[data-comparison-range]",
    )!;
    const resultPlaceholder = root.querySelector<HTMLElement>(
      "[data-result-placeholder]",
    )!;
    const inputDetails = root.querySelector<HTMLElement>(
      "[data-input-details]",
    )!;
    const outputDetails = root.querySelector<HTMLElement>(
      "[data-output-details]",
    )!;
    const status = root.querySelector<HTMLElement>("[data-status]")!;
    const upscaleButton =
      root.querySelector<HTMLButtonElement>("[data-upscale]")!;
    const upscaleLabel = root.querySelector<HTMLElement>(
      "[data-upscale-label]",
    )!;
    const cancelButton =
      root.querySelector<HTMLButtonElement>("[data-cancel]")!;
    const downloadButton =
      root.querySelector<HTMLButtonElement>("[data-download]")!;
    const qualityOption = root.querySelector<HTMLElement>(
      "[data-quality-option]",
    )!;
    const qualityInput =
      qualityOption.querySelector<HTMLInputElement>("input")!;
    const fastInput = root.querySelector<HTMLInputElement>(
      'input[name="upscaler-mode"][value="fast"]',
    )!;
    const qualityUnavailable = root.querySelector<HTMLElement>(
      "[data-quality-unavailable]",
    )!;
    const jpegQualityWrap = root.querySelector<HTMLElement>(
      "[data-jpeg-quality-wrap]",
    )!;
    const jpegQuality = root.querySelector<HTMLInputElement>(
      "[data-jpeg-quality]",
    )!;
    const jpegQualityOutput = root.querySelector<HTMLOutputElement>(
      "[data-jpeg-quality-output]",
    )!;
    const progressWrap = root.querySelector<HTMLElement>(
      "[data-progress-wrap]",
    )!;
    const progress =
      root.querySelector<HTMLProgressElement>("[data-progress]")!;
    const progressLabel = root.querySelector<HTMLElement>(
      "[data-progress-label]",
    )!;
    const consent = root.querySelector<HTMLDialogElement>("[data-consent]")!;
    const consentEyebrow = root.querySelector<HTMLElement>(
      "[data-consent-eyebrow]",
    )!;
    const consentBody = root.querySelector<HTMLElement>("[data-consent-body]")!;
    const consentConfirm = root.querySelector<HTMLButtonElement>(
      "[data-consent-confirm]",
    )!;
    const consentCancel = root.querySelector<HTMLButtonElement>(
      "[data-consent-cancel]",
    )!;
    const optionInputs = [
      ...root.querySelectorAll<HTMLInputElement>(
        'input[name="upscaler-mode"], input[name="upscaler-scale"], input[name="upscaler-format"]',
      ),
    ];

    let sourcePixels: ImageData | undefined;
    let sourceName = "image";
    let result: Result | undefined;
    let revision = 0;
    let requestSequence = 0;
    let activeRequestId: number | undefined;
    let worker: Worker | undefined;
    let webgpuSupported = false;
    let busy = false;
    const approvedModels = new Set<string>();

    const setStatus = (
      message: string,
      state: "idle" | "working" | "success" | "error" = "idle",
    ) => setToolStatus(root, status, message, state);
    const selectedMode = () =>
      root.querySelector<HTMLInputElement>(
        'input[name="upscaler-mode"]:checked',
      )!.value as UpscalerMode;
    const selectedScale = () =>
      Number(
        root.querySelector<HTMLInputElement>(
          'input[name="upscaler-scale"]:checked',
        )!.value,
      ) as UpscaleScale;
    const selectedFormat = () =>
      root.querySelector<HTMLInputElement>(
        'input[name="upscaler-format"]:checked',
      )!.value as UpscaleFormat;
    const selectedBackend = (): UpscaleBackend =>
      webgpuSupported ? "webgpu" : "wasm";

    function hideProgress(): void {
      progressWrap.hidden = true;
      progress.removeAttribute("value");
      progressLabel.textContent = "";
    }

    function setBusy(next: boolean): void {
      busy = next;
      upscaleButton.disabled = next || !sourcePixels;
      cancelButton.hidden = !next;
      downloadButton.disabled = next || !result;
      optionInputs.forEach((input) => {
        input.disabled =
          next || (input.value === "quality" && !webgpuSupported);
      });
      fileInput.disabled = next;
      if (next) upscaleButton.setAttribute("aria-busy", "true");
      else upscaleButton.removeAttribute("aria-busy");
      upscaleLabel.textContent = next ? copy.processingImage : copy.upscale;
    }

    function stopWorker(): void {
      worker?.terminate();
      worker = undefined;
      activeRequestId = undefined;
    }

    function clearResult(): void {
      result = undefined;
      resultCanvas.width = 0;
      resultCanvas.height = 0;
      comparisonOriginal.width = 0;
      comparisonOriginal.height = 0;
      comparison.hidden = true;
      resultPlaceholder.hidden = false;
      outputDetails.hidden = true;
      outputDetails.textContent = "";
      downloadButton.disabled = true;
    }

    function invalidateResult(): void {
      revision += 1;
      if (busy) stopWorker();
      setBusy(false);
      hideProgress();
      clearResult();
      if (sourcePixels) setStatus(copy.ready);
    }

    function reportMainProgress(
      requestId: number,
      next: InferenceProgress,
    ): void {
      if (requestId !== activeRequestId) return;
      setProgress({ kind: "progress", requestId, ...next });
    }

    function ensureWorker(): Worker {
      if (worker) return worker;
      worker = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });
      worker.addEventListener("message", handleWorkerMessage);
      worker.addEventListener("error", () => {
        if (activeRequestId === undefined) return;
        finishFailure(copy.processingFailed);
      });
      return worker;
    }

    function runInWorker(request: UpscaleRequest): void {
      ensureWorker().postMessage(request, [request.rgba.buffer]);
    }

    async function runOnMain(
      request: UpscaleRequest,
      backend: UpscaleBackend,
      runRevision: number,
    ): Promise<void> {
      try {
        const next = await runTransformersUpscale(
          request,
          backend,
          (progress) => reportMainProgress(request.requestId, progress),
          () =>
            runRevision === revision && request.requestId === activeRequestId,
        );
        if (runRevision !== revision || request.requestId !== activeRequestId) {
          return;
        }
        activeRequestId = undefined;
        setBusy(false);
        hideProgress();
        renderResult(next);
        setStatus(copy.completed, "success");
      } catch {
        if (runRevision !== revision || request.requestId !== activeRequestId) {
          return;
        }
        if (backend === "webgpu" && request.mode === "fast") {
          setStatus(copy.processingImage, "working");
          runInWorker({
            ...request,
            tileSize: upscalerTileSize(request.mode, request.scale, "wasm"),
          });
          return;
        }
        finishFailure(copy.processingFailed);
      }
    }

    function handleWorkerMessage(
      event: MessageEvent<UpscaleWorkerResponse>,
    ): void {
      const message = event.data;
      if (message.requestId !== activeRequestId) return;
      if (message.kind === "progress") {
        setProgress(message);
        return;
      }
      if (message.kind === "error") {
        if (!sourcePixels) {
          finishFailure(copy.processingFailed);
          return;
        }
        stopWorker();
        const fallbackRequestId = ++requestSequence;
        activeRequestId = fallbackRequestId;
        const fallbackPixels = new Uint8ClampedArray(sourcePixels.data);
        void runOnMain(
          {
            kind: "upscale",
            requestId: fallbackRequestId,
            mode: selectedMode(),
            scale: selectedScale(),
            rgba: fallbackPixels,
            width: sourcePixels.width,
            height: sourcePixels.height,
            tileSize: upscalerTileSize(
              selectedMode(),
              selectedScale(),
              "wasm",
            ),
          },
          "wasm",
          revision,
        );
        return;
      }
      activeRequestId = undefined;
      setBusy(false);
      hideProgress();
      renderResult({
        rgba: message.rgba,
        width: message.width,
        height: message.height,
      });
      setStatus(copy.completed, "success");
    }

    function setProgress(message: UpscaleWorkerResponse): void {
      if (message.kind !== "progress") return;
      progressWrap.hidden = false;
      if (
        (message.phase === "download" || message.phase === "cache") &&
        message.loaded !== undefined &&
        message.total
      ) {
        progress.value = Math.round((message.loaded / message.total) * 100);
        progressLabel.textContent = `${copy.downloadingModel} ${(
          message.loaded / 1_000_000
        ).toFixed(1)} / ${(message.total / 1_000_000).toFixed(1)} MB`;
      } else if (
        message.phase === "inference" &&
        message.completedTiles !== undefined &&
        message.totalTiles
      ) {
        progress.value = Math.round(
          (message.completedTiles / message.totalTiles) * 100,
        );
        progressLabel.textContent = `${
          message.retried ? copy.retryingSmallerTiles : copy.processingImage
        } ${message.completedTiles} / ${message.totalTiles}`;
      } else {
        progress.removeAttribute("value");
        progressLabel.textContent =
          message.phase === "composition"
            ? copy.composingImage
            : message.phase === "model"
              ? copy.loadingModel
              : copy.processingImage;
      }
      setStatus(progressLabel.textContent, "working");
    }

    function renderResult(next: Result): void {
      result = next;
      resultCanvas.width = next.width;
      resultCanvas.height = next.height;
      resultCanvas
        .getContext("2d")!
        .putImageData(new ImageData(next.rgba, next.width, next.height), 0, 0);
      comparisonOriginal.width = next.width;
      comparisonOriginal.height = next.height;
      const originalContext = comparisonOriginal.getContext("2d")!;
      originalContext.imageSmoothingEnabled = true;
      originalContext.imageSmoothingQuality = "high";
      originalContext.drawImage(sourceCanvas, 0, 0, next.width, next.height);
      comparison.hidden = false;
      resultPlaceholder.hidden = true;
      comparisonRange.value = "50";
      updateComparison();
      outputDetails.textContent = template(copy.outputDetails, {
        width: next.width,
        height: next.height,
        scale: selectedScale(),
      });
      outputDetails.hidden = false;
      downloadButton.disabled = false;
    }

    function finishFailure(message: string): void {
      stopWorker();
      setBusy(false);
      hideProgress();
      setStatus(message, "error");
    }

    function validateCurrentSelection(): boolean {
      if (!sourcePixels) return false;
      const mode = selectedMode();
      const backend = selectedBackend();
      if (mode === "quality" && backend !== "webgpu") {
        setStatus(copy.qualityUnavailable, "error");
        return false;
      }
      if (
        sourcePixels.width * sourcePixels.height >
        inputPixelLimit(mode, backend)
      ) {
        setStatus(copy.imageTooLarge, "error");
        return false;
      }
      if (
        !validateOutputDimensions(
          sourcePixels.width,
          sourcePixels.height,
          selectedScale(),
        )
      ) {
        setStatus(copy.outputTooLarge, "error");
        return false;
      }
      return true;
    }

    function startRun(): void {
      if (!sourcePixels || !validateCurrentSelection()) return;
      const runRevision = ++revision;
      clearResult();
      const mode = selectedMode();
      const backend = selectedBackend();
      const requestId = ++requestSequence;
      activeRequestId = requestId;
      setBusy(true);
      setStatus(copy.loadingModel, "working");
      const pixels = new Uint8ClampedArray(sourcePixels.data);
      const request: UpscaleRequest = {
        kind: "upscale",
        requestId,
        mode,
        scale: selectedScale(),
        rgba: pixels,
        width: sourcePixels.width,
        height: sourcePixels.height,
        tileSize: upscalerTileSize(mode, selectedScale(), backend),
      };
      if (backend === "wasm") {
        runInWorker(request);
      } else {
        void runOnMain(request, backend, runRevision);
      }
    }

    function requestRun(): void {
      if (!validateCurrentSelection()) return;
      const mode = selectedMode();
      const backend = selectedBackend();
      const scale = selectedScale();
      const approval = `${mode}:${backend}:${scale}:v2`;
      if (approvedModels.has(approval)) {
        startRun();
        return;
      }
      const size = modelTransferLabel(mode, scale);
      consent.dataset.approval = approval;
      consentEyebrow.textContent = `${copy.modeOptions[mode]} · ${size}`;
      consentBody.textContent = template(copy.consentBody, {
        mode: copy.modeOptions[mode],
        size,
      });
      consent.showModal();
    }

    async function selectFile(file: File): Promise<void> {
      invalidateResult();
      if (file.size > MAX_FILE_BYTES) {
        setStatus(copy.fileTooLarge, "error");
        return;
      }
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setStatus(copy.invalidImage, "error");
        return;
      }
      const fileRevision = ++revision;
      setStatus(copy.readingImage, "working");
      try {
        const image = await decodeImage(file);
        if (fileRevision !== revision) {
          closeImage(image);
          return;
        }
        const size = dimensions(image);
        if (!size.width || !size.height) throw new Error("image-size");
        sourceCanvas.width = size.width;
        sourceCanvas.height = size.height;
        const context = sourceCanvas.getContext("2d", {
          willReadFrequently: true,
        })!;
        context.drawImage(image, 0, 0);
        closeImage(image);
        sourcePixels = context.getImageData(0, 0, size.width, size.height);
        sourceName = file.name;
        sourceCanvas.hidden = false;
        uploadPrompt.hidden = true;
        newImageButton.hidden = false;
        inputDetails.textContent = template(copy.inputDetails, {
          width: size.width,
          height: size.height,
        });
        inputDetails.hidden = false;
        const transparent = containsTransparency(sourcePixels.data);
        root.querySelector<HTMLInputElement>(
          `input[name="upscaler-format"][value="${transparent ? "png" : "jpeg"}"]`,
        )!.checked = true;
        updateFormatControls();
        setBusy(false);
        setStatus(copy.ready);
      } catch {
        if (fileRevision !== revision) return;
        sourcePixels = undefined;
        setBusy(false);
        setStatus(copy.invalidImage, "error");
      }
    }

    function updateComparison(): void {
      const value = Number(comparisonRange.value);
      resultClip.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      divider.style.insetInlineStart = `${value}%`;
    }

    function updateFormatControls(): void {
      const jpeg = selectedFormat() === "jpeg";
      jpegQualityWrap.hidden = !jpeg;
      jpegQuality.hidden = !jpeg;
      jpegQuality.disabled = !jpeg;
    }

    async function downloadResult(): Promise<void> {
      if (!result) return;
      const downloadRevision = revision;
      const format = selectedFormat();
      const canvas = document.createElement("canvas");
      canvas.width = result.width;
      canvas.height = result.height;
      const context = canvas.getContext("2d")!;
      if (format === "jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      const buffer = document.createElement("canvas");
      buffer.width = result.width;
      buffer.height = result.height;
      buffer
        .getContext("2d")!
        .putImageData(
          new ImageData(result.rgba, result.width, result.height),
          0,
          0,
        );
      context.drawImage(buffer, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(
          resolve,
          format === "jpeg" ? "image/jpeg" : "image/png",
          Number(jpegQuality.value) / 100,
        ),
      );
      if (downloadRevision !== revision || !result) return;
      if (!blob) {
        setStatus(copy.downloadFailed, "error");
        return;
      }
      downloadBlob(blob, outputFilename(sourceName, selectedScale(), format));
    }

    openButton.addEventListener("click", () => fileInput.click());
    newImageButton.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) void selectFile(file);
    });
    root.addEventListener("dragover", (event) => {
      event.preventDefault();
      root.classList.add("is-dragging");
    });
    root.addEventListener("dragleave", () =>
      root.classList.remove("is-dragging"),
    );
    root.addEventListener("drop", (event) => {
      event.preventDefault();
      root.classList.remove("is-dragging");
      const file = event.dataTransfer?.files[0];
      if (file) void selectFile(file);
    });
    optionInputs.forEach((input) =>
      input.addEventListener("change", () => {
        invalidateResult();
        updateFormatControls();
      }),
    );
    jpegQuality.addEventListener("input", () => {
      jpegQualityOutput.textContent = `${jpegQuality.value}%`;
      invalidateResult();
    });
    comparisonRange.addEventListener("input", updateComparison);
    upscaleButton.addEventListener("click", requestRun);
    cancelButton.addEventListener("click", () => {
      revision += 1;
      stopWorker();
      setBusy(false);
      hideProgress();
      setStatus(copy.cancelled);
    });
    downloadButton.addEventListener("click", () => void downloadResult());
    consentConfirm.addEventListener("click", () => {
      const approval = consent.dataset.approval;
      if (approval) approvedModels.add(approval);
      consent.close();
      startRun();
    });
    consentCancel.addEventListener("click", () => consent.close());
    consent.addEventListener("cancel", () => {
      consent.dataset.approval = "";
    });
    window.addEventListener("pagehide", stopWorker, { once: true });

    root.dataset.webgpuSupport = "checking";
    void (async () => {
      const gpu = webGpuApi();
      if (gpu) {
        try {
          webgpuSupported = Boolean(await gpu.requestAdapter());
        } catch {
          webgpuSupported = false;
        }
      }
      qualityInput.disabled = !webgpuSupported;
      qualityOption.classList.toggle("is-unavailable", !webgpuSupported);
      qualityUnavailable.hidden = webgpuSupported;
      if (!webgpuSupported && qualityInput.checked) {
        fastInput.checked = true;
      }
      root.dataset.webgpuSupport = webgpuSupported
        ? "available"
        : "unavailable";
      setBusy(false);
    })();
    updateFormatControls();
  });
