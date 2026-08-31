import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type {
  BackgroundMode,
  BackgroundModelId,
  BackgroundRemoverCopy,
  BackgroundWorkerResponse,
  RemoveRequest,
} from "./contract";
import {
  createInputTensor,
  MAX_FILE_BYTES,
  MAX_IMAGE_PIXELS,
  outputDimensions,
  resultFileName,
} from "./image";
import { modelManifest } from "./model-manifest";

type DecodedImage = ImageBitmap | HTMLImageElement;

async function decodeImage(file: File): Promise<DecodedImage> {
  if ("createImageBitmap" in window) {
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
  return image instanceof ImageBitmap
    ? { width: image.width, height: image.height }
    : { width: image.naturalWidth, height: image.naturalHeight };
}

function closeImage(image: DecodedImage): void {
  if (image instanceof ImageBitmap) image.close();
}

function formatBytes(value: number): string {
  return `${(value / 1_000_000).toFixed(1)} MB`;
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<BackgroundRemoverCopy>(root);
  const fileInput = root.querySelector<HTMLInputElement>("[data-file-input]")!;
  const openButton = root.querySelector<HTMLButtonElement>("[data-open-file]")!;
  const newImageButton =
    root.querySelector<HTMLButtonElement>("[data-new-image]")!;
  const removeButton = root.querySelector<HTMLButtonElement>("[data-remove]")!;
  const removeButtonLabel = root.querySelector<HTMLElement>(
    "[data-remove-label]",
  )!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const uploadPrompt = root.querySelector<HTMLElement>("[data-upload-prompt]")!;
  const originalCanvas = root.querySelector<HTMLCanvasElement>(
    "[data-original-canvas]",
  )!;
  const resultCanvas = root.querySelector<HTMLCanvasElement>(
    "[data-result-canvas]",
  )!;
  const resultPlaceholder = root.querySelector<HTMLElement>(
    "[data-result-placeholder]",
  )!;
  const colorInput = root.querySelector<HTMLInputElement>(
    "[data-background-color]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const progressWrap = root.querySelector<HTMLElement>("[data-progress-wrap]")!;
  const progress = root.querySelector<HTMLProgressElement>("[data-progress]")!;
  const progressLabel = root.querySelector<HTMLElement>(
    "[data-progress-label]",
  )!;
  const precisionInput = root.querySelector<HTMLInputElement>(
    'input[name="background-model"][value="precision"]',
  )!;
  const precisionOption = root.querySelector<HTMLElement>(
    "[data-precision-option]",
  )!;
  const precisionUnavailable = root.querySelector<HTMLElement>(
    "[data-precision-unavailable]",
  )!;
  const precisionConsent = root.querySelector<HTMLDialogElement>(
    "[data-precision-consent]",
  )!;
  const consentConfirm = root.querySelector<HTMLButtonElement>(
    "[data-consent-confirm]",
  )!;
  const consentCancel = root.querySelector<HTMLButtonElement>(
    "[data-consent-cancel]",
  )!;

  let sourcePixels: ImageData | undefined;
  let mask: Uint8ClampedArray | undefined;
  let maskWidth = 0;
  let maskHeight = 0;
  let sourceName = "image";
  let revision = 0;
  let worker: Worker | undefined;
  let activeRequest = 0;
  let precisionApproved = false;
  let previousModel: BackgroundModelId = "fast";

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  function setRemoveBusy(busy: boolean): void {
    if (busy) removeButton.setAttribute("aria-busy", "true");
    else removeButton.removeAttribute("aria-busy");
    removeButtonLabel.textContent = busy
      ? copy.processingImage
      : copy.removeBackground;
  }

  const selectedModel = (): BackgroundModelId =>
    root.querySelector<HTMLInputElement>(
      'input[name="background-model"]:checked',
    )!.value as BackgroundModelId;
  const selectedBackground = (): BackgroundMode =>
    root.querySelector<HTMLInputElement>(
      'input[name="background-mode"]:checked',
    )!.value as BackgroundMode;

  function stopWorker(): void {
    worker?.terminate();
    worker = undefined;
    activeRequest = 0;
  }

  function hideProgress(): void {
    progressWrap.hidden = true;
    progress.removeAttribute("value");
    progressLabel.textContent = "";
  }

  function invalidateResult(): void {
    mask = undefined;
    maskWidth = 0;
    maskHeight = 0;
    resultCanvas.hidden = true;
    resultPlaceholder.hidden = false;
    downloadButton.disabled = true;
  }

  function renderResult(): void {
    if (!sourcePixels || !mask) return;
    const alphaCanvas = document.createElement("canvas");
    alphaCanvas.width = maskWidth;
    alphaCanvas.height = maskHeight;
    const alphaContext = alphaCanvas.getContext("2d")!;
    const maskPixels = new Uint8ClampedArray(maskWidth * maskHeight * 4);
    for (let pixel = 0; pixel < mask.length; pixel += 1) {
      const index = pixel * 4;
      maskPixels[index] = 255;
      maskPixels[index + 1] = 255;
      maskPixels[index + 2] = 255;
      maskPixels[index + 3] = mask[pixel];
    }
    alphaContext.putImageData(
      new ImageData(maskPixels, maskWidth, maskHeight),
      0,
      0,
    );

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = sourcePixels.width;
    maskCanvas.height = sourcePixels.height;
    const maskContext = maskCanvas.getContext("2d")!;
    maskContext.imageSmoothingEnabled = true;
    maskContext.imageSmoothingQuality = "high";
    maskContext.drawImage(
      alphaCanvas,
      0,
      0,
      maskCanvas.width,
      maskCanvas.height,
    );
    const scaledMask = maskContext.getImageData(
      0,
      0,
      maskCanvas.width,
      maskCanvas.height,
    ).data;

    const output = new Uint8ClampedArray(sourcePixels.data);
    for (let index = 0; index < output.length; index += 4) {
      output[index + 3] = scaledMask[index + 3];
    }
    const foreground = document.createElement("canvas");
    foreground.width = sourcePixels.width;
    foreground.height = sourcePixels.height;
    foreground
      .getContext("2d")!
      .putImageData(
        new ImageData(output, sourcePixels.width, sourcePixels.height),
        0,
        0,
      );

    resultCanvas.width = sourcePixels.width;
    resultCanvas.height = sourcePixels.height;
    const resultContext = resultCanvas.getContext("2d")!;
    resultContext.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
    const background = selectedBackground();
    if (background !== "transparent") {
      resultContext.fillStyle =
        background === "white" ? "#ffffff" : colorInput.value;
      resultContext.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
    }
    resultContext.drawImage(foreground, 0, 0);
    resultCanvas.hidden = false;
    resultPlaceholder.hidden = true;
    downloadButton.disabled = false;
  }

  function ensureWorker(model: BackgroundModelId): Worker {
    if (worker) return worker;
    worker =
      model === "precision"
        ? new Worker(new URL("./precision-worker.ts", import.meta.url), {
            type: "module",
          })
        : new Worker(new URL("./worker.ts", import.meta.url), {
            type: "module",
          });
    worker.addEventListener(
      "message",
      (event: MessageEvent<BackgroundWorkerResponse>) => {
        const message = event.data;
        if (
          message.requestId !== activeRequest ||
          message.requestId !== revision
        )
          return;
        if (message.kind === "progress") {
          progressWrap.hidden = false;
          if (message.phase === "download") {
            const loaded = message.loaded ?? 0;
            const total = message.total ?? 0;
            progress.max = total || 1;
            progress.value = loaded;
            progressLabel.textContent = `${copy.downloadingModel} ${formatBytes(loaded)} / ${formatBytes(total)}`;
            setStatus(copy.downloadingModel, "working");
          } else {
            progress.removeAttribute("value");
            progressLabel.textContent =
              message.phase === "model"
                ? copy.loadingModel
                : copy.processingImage;
            setStatus(progressLabel.textContent, "working");
          }
          return;
        }
        setRemoveBusy(false);
        removeButton.disabled = false;
        hideProgress();
        if (message.kind === "error") {
          if (message.code === "model") stopWorker();
          setStatus(
            message.code === "model" ? copy.modelFailed : copy.processingFailed,
            "error",
          );
          return;
        }
        mask = message.alpha;
        maskWidth = message.width;
        maskHeight = message.height;
        renderResult();
        setStatus(copy.completed, "success");
      },
    );
    worker.addEventListener("error", () => {
      if (!activeRequest) return;
      setRemoveBusy(false);
      removeButton.disabled = false;
      hideProgress();
      stopWorker();
      setStatus(copy.modelFailed, "error");
    });
    return worker;
  }

  async function selectFile(file: File): Promise<void> {
    revision += 1;
    stopWorker();
    setRemoveBusy(false);
    invalidateResult();
    hideProgress();
    removeButton.disabled = true;
    if (file.size > MAX_FILE_BYTES) {
      setStatus(copy.fileTooLarge, "error");
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setStatus(copy.invalidImage, "error");
      return;
    }
    const fileRevision = revision;
    setStatus(copy.readingImage, "working");
    try {
      const image = await decodeImage(file);
      if (fileRevision !== revision) {
        closeImage(image);
        return;
      }
      const size = dimensions(image);
      if (
        !size.width ||
        !size.height ||
        size.width * size.height > MAX_IMAGE_PIXELS
      ) {
        closeImage(image);
        setStatus(copy.imageTooLarge, "error");
        return;
      }
      const output = outputDimensions(size.width, size.height);
      originalCanvas.width = output.width;
      originalCanvas.height = output.height;
      const context = originalCanvas.getContext("2d", {
        willReadFrequently: true,
      })!;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, output.width, output.height);
      closeImage(image);
      sourcePixels = context.getImageData(0, 0, output.width, output.height);
      sourceName = file.name;
      originalCanvas.hidden = false;
      uploadPrompt.hidden = true;
      newImageButton.hidden = false;
      removeButton.disabled = false;
      setStatus(output.scaled ? copy.scaledImage : copy.ready);
    } catch {
      if (fileRevision !== revision) return;
      setStatus(copy.invalidImage, "error");
    }
  }

  function run(): void {
    if (!sourcePixels) return;
    revision += 1;
    activeRequest = revision;
    invalidateResult();
    setRemoveBusy(true);
    removeButton.disabled = true;
    const selectedModelId = selectedModel();
    const selectedManifest = modelManifest[selectedModelId];
    const preprocessingCanvas = document.createElement("canvas");
    preprocessingCanvas.width = selectedManifest.inputSize;
    preprocessingCanvas.height = selectedManifest.inputSize;
    const preprocessingContext = preprocessingCanvas.getContext("2d", {
      willReadFrequently: true,
    })!;
    preprocessingContext.drawImage(
      originalCanvas,
      0,
      0,
      selectedManifest.inputSize,
      selectedManifest.inputSize,
    );
    const tensor = createInputTensor(
      preprocessingContext.getImageData(
        0,
        0,
        selectedManifest.inputSize,
        selectedManifest.inputSize,
      ).data,
      selectedManifest.normalization,
    );
    const request: RemoveRequest = {
      kind: "remove",
      requestId: activeRequest,
      model: selectedModelId,
      tensor,
    };
    ensureWorker(selectedModelId).postMessage(request, [tensor.buffer]);
  }

  function reset(): void {
    revision += 1;
    stopWorker();
    setRemoveBusy(false);
    sourcePixels = undefined;
    sourceName = "image";
    invalidateResult();
    hideProgress();
    originalCanvas.width = 0;
    originalCanvas.height = 0;
    originalCanvas.hidden = true;
    uploadPrompt.hidden = false;
    newImageButton.hidden = true;
    removeButton.disabled = true;
    fileInput.value = "";
    setStatus(copy.ready);
    openButton.focus();
  }

  openButton.addEventListener("click", () => fileInput.click());
  newImageButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void selectFile(file);
  });
  removeButton.addEventListener("click", run);
  downloadButton.addEventListener("click", () => {
    if (!mask) return;
    resultCanvas.toBlob((blob) => {
      if (!blob) {
        setStatus(copy.downloadFailed, "error");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resultFileName(sourceName);
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  });

  function modelSelectionChanged(): void {
    if (!sourcePixels) return;
    revision += 1;
    stopWorker();
    setRemoveBusy(false);
    invalidateResult();
    hideProgress();
    removeButton.disabled = false;
    setStatus(copy.ready);
  }

  root.dataset.precisionSupport = "checking";
  void (async () => {
    let available = false;
    const gpu = (
      navigator as Navigator & {
        gpu?: { requestAdapter: () => Promise<unknown> };
      }
    ).gpu;
    if (gpu) {
      try {
        available = Boolean(await gpu.requestAdapter());
      } catch {
        available = false;
      }
    }
    precisionInput.disabled = !available;
    precisionOption.classList.toggle("is-unavailable", !available);
    precisionUnavailable.hidden = available;
    root.dataset.precisionSupport = available ? "supported" : "unsupported";
  })();

  consentCancel.addEventListener("click", () => precisionConsent.close());
  consentConfirm.addEventListener("click", () => {
    precisionApproved = true;
    precisionInput.checked = true;
    precisionConsent.close();
    previousModel = "precision";
    modelSelectionChanged();
  });
  precisionConsent.addEventListener("cancel", () => precisionConsent.close());

  root
    .querySelectorAll<HTMLInputElement>('input[name="background-model"]')
    .forEach((input) =>
      input.addEventListener("change", () => {
        const nextModel = input.value as BackgroundModelId;
        if (nextModel === "precision" && !precisionApproved) {
          input.checked = false;
          root.querySelector<HTMLInputElement>(
            `input[name="background-model"][value="${previousModel}"]`,
          )!.checked = true;
          precisionConsent.showModal();
          return;
        }
        previousModel = nextModel;
        modelSelectionChanged();
      }),
    );
  root
    .querySelectorAll<HTMLInputElement>('input[name="background-mode"]')
    .forEach((input) =>
      input.addEventListener("change", () => {
        colorInput.disabled = selectedBackground() !== "color";
        renderResult();
      }),
    );
  colorInput.addEventListener("input", renderResult);

  ["dragenter", "dragover"].forEach((eventName) =>
    root.addEventListener(eventName, (event) => {
      event.preventDefault();
      root.classList.add("is-dragging");
    }),
  );
  ["dragleave", "drop"].forEach((eventName) =>
    root.addEventListener(eventName, (event) => {
      event.preventDefault();
      root.classList.remove("is-dragging");
    }),
  );
  root.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (file) void selectFile(file);
  });
  window.addEventListener("pagehide", reset, { once: true });
}

document
  .querySelectorAll<HTMLElement>("[data-background-remover]")
  .forEach(init);
