import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  BackgroundMode,
  BackgroundModelId,
  BackgroundRemoverCopy,
  BackgroundWorkerResponse,
  RemoveRequest,
} from "./contract";
import {
  createInputTensor,
  maskCropBounds,
  MAX_FILE_BYTES,
  MAX_IMAGE_PIXELS,
  outputDimensions,
  resultFileName,
  scaleCropBounds,
  type CropBounds,
} from "./image";
import { modelManifest } from "./model-manifest";

type DecodedImage = ImageBitmap | HTMLImageElement;
type ConsentIntent = "single" | "compare";
type WorkerKind = "standard" | "precision";
type BackgroundRunMode = BackgroundModelId | "compare";
type ModelResult = {
  model: BackgroundModelId;
  mask: Uint8ClampedArray;
  width: number;
  height: number;
  trimmed: boolean;
};

const MODEL_ORDER: readonly BackgroundModelId[] = [
  "fast",
  "portrait",
  "quality",
  "precision",
];
const PREVIEW_EDGE = 512;
const PRECISION_NOTICE_STORAGE_KEY =
  "plaintool.background-remover.precision-notice.v1";

function hasAcknowledgedPrecisionNotice(): boolean {
  try {
    return localStorage.getItem(PRECISION_NOTICE_STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

function acknowledgePrecisionNotice(): void {
  try {
    localStorage.setItem(PRECISION_NOTICE_STORAGE_KEY, "seen");
  } catch {}
}

class Cancelled extends Error {}
class InferenceFailure extends Error {
  constructor(readonly code: "model" | "inference") {
    super(code);
  }
}

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
  const trimButton = root.querySelector<HTMLButtonElement>("[data-trim]")!;
  const trimButtonLabel = root.querySelector<HTMLElement>("[data-trim-label]")!;
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
  const comparison = root.querySelector<HTMLElement>("[data-comparison]")!;
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
  const consentEyebrow = root.querySelector<HTMLElement>(
    "[data-consent-eyebrow]",
  )!;
  const consentTitle = root.querySelector<HTMLElement>("[data-consent-title]")!;
  const consentBody = root.querySelector<HTMLElement>("[data-consent-body]")!;
  const consentConfirm = root.querySelector<HTMLButtonElement>(
    "[data-consent-confirm]",
  )!;
  const consentConfirmLabel = root.querySelector<HTMLElement>(
    "[data-consent-confirm-label]",
  )!;
  const consentCancel = root.querySelector<HTMLButtonElement>(
    "[data-consent-cancel]",
  )!;
  const modelInputs = [
    ...root.querySelectorAll<HTMLInputElement>(
      'input[name="background-model"]',
    ),
  ];

  let sourcePixels: ImageData | undefined;
  let sourceName = "image";
  let revision = 0;
  let requestSequence = 0;
  let worker: Worker | undefined;
  let workerKind: WorkerKind | undefined;
  let rejectActive: ((reason: Error) => void) | undefined;
  let precisionApproved = false;
  let precisionNoticeAcknowledged = hasAcknowledgedPrecisionNotice();
  let precisionSupported = false;
  let previousModel: BackgroundRunMode = "fast";
  let consentIntent: ConsentIntent | undefined;
  let comparisonMode = false;
  let selectedResultModel: BackgroundModelId | undefined;
  const results = new Map<BackgroundModelId, ModelResult>();

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const selectedRunMode = (): BackgroundRunMode =>
    root.querySelector<HTMLInputElement>(
      'input[name="background-model"]:checked',
    )!.value as BackgroundRunMode;
  const selectedBackground = (): BackgroundMode =>
    root.querySelector<HTMLInputElement>(
      'input[name="background-mode"]:checked',
    )!.value as BackgroundMode;

  function updateRemoveButtonLabel(): void {
    removeButtonLabel.textContent = copy.removeBackground;
  }

  function setBusy(busy: boolean, comparisonRun = false): void {
    root.classList.toggle("is-comparing", busy && comparisonRun);
    removeButton.disabled = busy || !sourcePixels;
    trimButton.disabled = busy || !selectedResultModel;
    downloadButton.disabled = busy || !selectedResultModel;
    modelInputs.forEach((input) => {
      input.disabled =
        busy || (input.value === "precision" && !precisionSupported);
    });
    if (busy) removeButton.setAttribute("aria-busy", "true");
    else removeButton.removeAttribute("aria-busy");
    if (busy) {
      removeButtonLabel.textContent = comparisonRun
        ? copy.comparingModels
        : copy.processingImage;
    } else {
      updateRemoveButtonLabel();
    }
  }

  function stopWorker(): void {
    const reject = rejectActive;
    rejectActive = undefined;
    worker?.terminate();
    worker = undefined;
    workerKind = undefined;
    reject?.(new Cancelled());
  }

  function hideProgress(): void {
    progressWrap.hidden = true;
    progress.removeAttribute("value");
    progressLabel.textContent = "";
  }

  function setTileState(
    model: BackgroundModelId,
    state: "pending" | "working" | "success" | "error" | "unavailable",
    message: string,
  ): void {
    const card = root.querySelector<HTMLButtonElement>(
      `[data-comparison-card="${model}"]`,
    )!;
    card.dataset.state = state;
    card.disabled = state !== "success";
    root.querySelector<HTMLElement>(
      `[data-comparison-state="${model}"]`,
    )!.textContent = message;
  }

  function clearResults(): void {
    results.clear();
    selectedResultModel = undefined;
    comparisonMode = false;
    comparison.hidden = true;
    resultCanvas.width = 0;
    resultCanvas.height = 0;
    resultCanvas.hidden = true;
    resultPlaceholder.hidden = false;
    trimButton.hidden = true;
    trimButton.disabled = true;
    trimButtonLabel.textContent = copy.trimImage;
    downloadButton.disabled = true;
    MODEL_ORDER.forEach((model) => {
      const canvas = root.querySelector<HTMLCanvasElement>(
        `[data-comparison-canvas="${model}"]`,
      )!;
      canvas.width = 0;
      canvas.height = 0;
      canvas.hidden = true;
      setTileState(model, "pending", copy.ready);
      root
        .querySelector<HTMLButtonElement>(`[data-comparison-card="${model}"]`)!
        .setAttribute("aria-pressed", "false");
    });
  }

  function maskCanvas(result: ModelResult): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = result.width;
    canvas.height = result.height;
    const pixels = new Uint8ClampedArray(result.width * result.height * 4);
    for (let pixel = 0; pixel < result.mask.length; pixel += 1) {
      const index = pixel * 4;
      pixels[index] = 255;
      pixels[index + 1] = 255;
      pixels[index + 2] = 255;
      pixels[index + 3] = result.mask[pixel];
    }
    canvas
      .getContext("2d")!
      .putImageData(new ImageData(pixels, result.width, result.height), 0, 0);
    return canvas;
  }

  function sourceCrop(result: ModelResult): CropBounds | undefined {
    if (!sourcePixels) return undefined;
    if (!result.trimmed) {
      return {
        x: 0,
        y: 0,
        width: sourcePixels.width,
        height: sourcePixels.height,
      };
    }
    const maskBounds = maskCropBounds(result.mask, result.width, result.height);
    return maskBounds
      ? scaleCropBounds(
          maskBounds,
          result.width,
          result.height,
          sourcePixels.width,
          sourcePixels.height,
        )
      : undefined;
  }

  function renderComposite(
    target: HTMLCanvasElement,
    result: ModelResult,
    maximumEdge?: number,
  ): boolean {
    if (!sourcePixels) return false;
    const crop = sourceCrop(result);
    if (!crop) return false;
    const scale = maximumEdge
      ? Math.min(1, maximumEdge / Math.max(crop.width, crop.height))
      : 1;
    const width = Math.max(1, Math.round(crop.width * scale));
    const height = Math.max(1, Math.round(crop.height * scale));
    const foreground = document.createElement("canvas");
    foreground.width = width;
    foreground.height = height;
    const foregroundContext = foreground.getContext("2d")!;
    foregroundContext.imageSmoothingEnabled = true;
    foregroundContext.imageSmoothingQuality = "high";
    foregroundContext.drawImage(
      originalCanvas,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      width,
      height,
    );
    const alpha = maskCanvas(result);
    foregroundContext.globalCompositeOperation = "destination-in";
    foregroundContext.drawImage(
      alpha,
      (crop.x / sourcePixels.width) * result.width,
      (crop.y / sourcePixels.height) * result.height,
      (crop.width / sourcePixels.width) * result.width,
      (crop.height / sourcePixels.height) * result.height,
      0,
      0,
      width,
      height,
    );
    target.width = width;
    target.height = height;
    const context = target.getContext("2d")!;
    context.clearRect(0, 0, width, height);
    const background = selectedBackground();
    if (background !== "transparent") {
      context.fillStyle = background === "white" ? "#ffffff" : colorInput.value;
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(foreground, 0, 0);
    target.hidden = false;
    return true;
  }

  function renderPreview(result: ModelResult): void {
    const canvas = root.querySelector<HTMLCanvasElement>(
      `[data-comparison-canvas="${result.model}"]`,
    )!;
    renderComposite(canvas, result, PREVIEW_EDGE);
  }

  function renderSelected(): void {
    const selected = selectedResultModel
      ? results.get(selectedResultModel)
      : undefined;
    if (!selected || !renderComposite(resultCanvas, selected)) return;
    resultPlaceholder.hidden = true;
    trimButton.hidden = false;
    trimButton.disabled = false;
    trimButtonLabel.textContent = selected.trimmed
      ? copy.restoreImage
      : copy.trimImage;
    downloadButton.disabled = false;
    MODEL_ORDER.forEach((model) => {
      root
        .querySelector<HTMLButtonElement>(`[data-comparison-card="${model}"]`)!
        .setAttribute("aria-pressed", String(model === selectedResultModel));
    });
  }

  function updateProgress(
    model: BackgroundModelId,
    message: Extract<BackgroundWorkerResponse, { kind: "progress" }>,
  ): void {
    progressWrap.hidden = false;
    const prefix = comparisonMode ? `${copy.modelOptions[model]} · ` : "";
    if (message.phase === "download" || message.phase === "cache") {
      const loaded = message.loaded ?? 0;
      const total = message.total ?? 0;
      progress.max = total || 1;
      progress.value = loaded;
      progressLabel.textContent =
        prefix +
        (message.phase === "download"
          ? `${copy.downloadingModel} ${formatBytes(loaded)} / ${formatBytes(total)}`
          : copy.loadingModel);
    } else {
      progress.removeAttribute("value");
      progressLabel.textContent =
        prefix +
        (message.phase === "model" ? copy.loadingModel : copy.processingImage);
    }
    setStatus(progressLabel.textContent, "working");
  }

  function ensureWorker(model: BackgroundModelId): Worker {
    const desiredKind: WorkerKind =
      model === "precision" ? "precision" : "standard";
    if (worker && workerKind === desiredKind) return worker;
    stopWorker();
    worker =
      desiredKind === "precision"
        ? new Worker(new URL("./precision-worker.ts", import.meta.url), {
            type: "module",
          })
        : new Worker(new URL("./worker.ts", import.meta.url), {
            type: "module",
          });
    workerKind = desiredKind;
    return worker;
  }

  function createTensor(model: BackgroundModelId): Float32Array {
    const manifest = modelManifest[model];
    const canvas = document.createElement("canvas");
    canvas.width = manifest.inputSize;
    canvas.height = manifest.inputSize;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    context.drawImage(
      originalCanvas,
      0,
      0,
      manifest.inputSize,
      manifest.inputSize,
    );
    return createInputTensor(
      context.getImageData(0, 0, manifest.inputSize, manifest.inputSize).data,
      manifest.normalization,
    );
  }

  function runInference(
    model: BackgroundModelId,
    taskRevision: number,
  ): Promise<ModelResult> {
    const activeWorker = ensureWorker(model);
    const requestId = ++requestSequence;
    const tensor = createTensor(model);
    return new Promise((resolve, reject) => {
      let settled = false;
      const cleanup = () => {
        activeWorker.removeEventListener("message", onMessage);
        activeWorker.removeEventListener("error", onError);
        if (rejectActive === cancel) rejectActive = undefined;
      };
      const finish = (callback: () => void) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback();
      };
      const cancel = (reason: Error) => finish(() => reject(reason));
      const onError = () => {
        finish(() => reject(new InferenceFailure("model")));
        if (worker === activeWorker) {
          activeWorker.terminate();
          worker = undefined;
          workerKind = undefined;
        }
      };
      const onMessage = (event: MessageEvent<BackgroundWorkerResponse>) => {
        const message = event.data;
        if (message.requestId !== requestId) return;
        if (taskRevision !== revision) {
          cancel(new Cancelled());
          return;
        }
        if (message.kind === "progress") {
          updateProgress(model, message);
          return;
        }
        if (message.kind === "error") {
          finish(() => reject(new InferenceFailure(message.code)));
          if (message.code === "model" && worker === activeWorker) {
            activeWorker.terminate();
            worker = undefined;
            workerKind = undefined;
          }
          return;
        }
        finish(() =>
          resolve({
            model,
            mask: message.alpha,
            width: message.width,
            height: message.height,
            trimmed: false,
          }),
        );
      };
      rejectActive = cancel;
      activeWorker.addEventListener("message", onMessage);
      activeWorker.addEventListener("error", onError);
      const request: RemoveRequest = {
        kind: "remove",
        requestId,
        model,
        tensor,
      };
      activeWorker.postMessage(request, [tensor.buffer]);
    });
  }

  async function runSingle(model: BackgroundModelId): Promise<void> {
    if (!sourcePixels) return;
    const taskRevision = ++revision;
    clearResults();
    setBusy(true);
    try {
      const result = await runInference(model, taskRevision);
      if (taskRevision !== revision) return;
      results.set(result.model, result);
      selectedResultModel = result.model;
      renderSelected();
      setStatus(copy.completed, "success");
    } catch (error) {
      if (error instanceof Cancelled || taskRevision !== revision) return;
      setStatus(
        error instanceof InferenceFailure && error.code === "model"
          ? copy.modelFailed
          : copy.processingFailed,
        "error",
      );
    } finally {
      if (taskRevision === revision) {
        hideProgress();
        setBusy(false);
      }
    }
  }

  async function runComparison(includePrecision: boolean): Promise<void> {
    if (!sourcePixels) return;
    const taskRevision = ++revision;
    clearResults();
    comparisonMode = true;
    comparison.hidden = false;
    setBusy(true, true);
    setStatus(copy.comparingModels, "working");
    if (!includePrecision) {
      setTileState("precision", "unavailable", copy.precisionUnavailable);
    }
    const models = MODEL_ORDER.filter(
      (model) => model !== "precision" || includePrecision,
    );
    let failures = 0;
    for (const model of models) {
      if (taskRevision !== revision) return;
      setTileState(model, "working", copy.processingImage);
      try {
        const result = await runInference(model, taskRevision);
        if (taskRevision !== revision) return;
        results.set(model, result);
        if (!selectedResultModel) selectedResultModel = model;
        renderPreview(result);
        renderSelected();
        setTileState(model, "success", copy.ready);
      } catch (error) {
        if (error instanceof Cancelled || taskRevision !== revision) return;
        failures += 1;
        setTileState(
          model,
          "error",
          error instanceof InferenceFailure && error.code === "model"
            ? copy.modelFailed
            : copy.processingFailed,
        );
      }
    }
    if (taskRevision !== revision) return;
    hideProgress();
    setBusy(false);
    if (!results.size) {
      setStatus(copy.processingFailed, "error");
    } else {
      setStatus(
        `${failures ? copy.comparePartial : copy.compareCompleted} ${copy.completed}`,
        "success",
      );
    }
  }

  async function selectFile(file: File): Promise<void> {
    revision += 1;
    stopWorker();
    clearResults();
    hideProgress();
    setBusy(false);
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
      setBusy(false);
      setStatus(output.scaled ? copy.scaledImage : copy.ready);
    } catch {
      if (fileRevision !== revision) return;
      setStatus(copy.invalidImage, "error");
    }
  }

  function reset(): void {
    revision += 1;
    stopWorker();
    sourcePixels = undefined;
    sourceName = "image";
    clearResults();
    hideProgress();
    originalCanvas.width = 0;
    originalCanvas.height = 0;
    originalCanvas.hidden = true;
    uploadPrompt.hidden = false;
    newImageButton.hidden = true;
    fileInput.value = "";
    setBusy(false);
    setStatus(copy.ready);
  }

  function showConsent(intent: ConsentIntent): void {
    consentIntent = intent;
    const compare = intent === "compare";
    consentEyebrow.textContent = compare
      ? root.dataset.runTogetherLabel!
      : `${copy.modelOptions.precision} · 98.5 MB`;
    consentTitle.textContent = compare
      ? root.dataset.runTogetherLabel!
      : copy.precisionConsentTitle;
    consentBody.textContent = compare
      ? `${root.dataset.comparisonChoiceSummary}. ${copy.compareConsentBody}`
      : copy.precisionConsentBody;
    consentConfirmLabel.textContent = compare
      ? root.dataset.fourModelSummary!
      : copy.precisionConsentConfirm;
    consentCancel.textContent = compare
      ? root.dataset.threeModelSummary!
      : copy.cancel;
    precisionConsent.showModal();
    precisionNoticeAcknowledged = true;
    acknowledgePrecisionNotice();
  }

  function handleConsentCancel(): void {
    const intent = consentIntent;
    consentIntent = undefined;
    precisionConsent.close();
    if (intent === "compare") void runComparison(false);
  }

  openButton.addEventListener("click", () => fileInput.click());
  newImageButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void selectFile(file);
  });
  removeButton.addEventListener("click", () => {
    const runMode = selectedRunMode();
    if (runMode !== "compare") {
      void runSingle(runMode);
      return;
    }
    if (precisionSupported && !precisionNoticeAcknowledged) {
      showConsent("compare");
    } else {
      void runComparison(precisionSupported);
    }
  });
  trimButton.addEventListener("click", () => {
    const result = selectedResultModel
      ? results.get(selectedResultModel)
      : undefined;
    if (!result) return;
    if (
      !result.trimmed &&
      !maskCropBounds(result.mask, result.width, result.height)
    ) {
      setStatus(copy.trimUnavailable, "error");
      return;
    }
    result.trimmed = !result.trimmed;
    renderSelected();
    if (comparisonMode) renderPreview(result);
    setStatus(result.trimmed ? copy.trimmed : copy.completed, "success");
  });
  downloadButton.addEventListener("click", () => {
    const result = selectedResultModel
      ? results.get(selectedResultModel)
      : undefined;
    if (!result) return;
    const downloadRevision = revision;
    const downloadName = resultFileName(
      sourceName,
      comparisonMode ? result.model : undefined,
      result.trimmed,
    );
    resultCanvas.toBlob((blob) => {
      if (downloadRevision !== revision || !results.has(result.model)) return;
      if (!blob) {
        setStatus(copy.downloadFailed, "error");
        return;
      }
      downloadBlob(blob, downloadName);
    }, "image/png");
  });

  MODEL_ORDER.forEach((model) => {
    root
      .querySelector<HTMLButtonElement>(`[data-comparison-card="${model}"]`)!
      .addEventListener("click", () => {
        if (!results.has(model)) return;
        selectedResultModel = model;
        renderSelected();
      });
  });

  function modelSelectionChanged(): void {
    updateRemoveButtonLabel();
    if (!sourcePixels) return;
    revision += 1;
    clearResults();
    hideProgress();
    setBusy(false);
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
    precisionSupported = available;
    precisionInput.disabled = !available;
    precisionOption.classList.toggle("is-unavailable", !available);
    precisionUnavailable.hidden = available;
    root.dataset.precisionSupport = available ? "supported" : "unsupported";
  })();

  consentCancel.addEventListener("click", handleConsentCancel);
  consentConfirm.addEventListener("click", () => {
    const intent = consentIntent;
    consentIntent = undefined;
    precisionApproved = true;
    precisionConsent.close();
    if (intent === "compare") {
      void runComparison(true);
      return;
    }
    precisionInput.checked = true;
    previousModel = "precision";
    modelSelectionChanged();
  });
  precisionConsent.addEventListener("cancel", (event) => {
    event.preventDefault();
    handleConsentCancel();
  });

  modelInputs.forEach((input) =>
    input.addEventListener("change", () => {
      const nextModel = input.value as BackgroundRunMode;
      if (
        nextModel === "precision" &&
        !precisionApproved &&
        !precisionNoticeAcknowledged
      ) {
        input.checked = false;
        root.querySelector<HTMLInputElement>(
          `input[name="background-model"][value="${previousModel}"]`,
        )!.checked = true;
        showConsent("single");
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
        results.forEach(renderPreview);
        renderSelected();
      }),
    );
  colorInput.addEventListener("input", () => {
    results.forEach(renderPreview);
    renderSelected();
  });

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
