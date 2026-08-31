import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import {
  detectImageFormat,
  MAX_IMAGE_BYTES,
} from "../image-converter/codec-core";
import { imageFormatMime, type ImageFormat } from "../image-converter/formats";
import {
  applyEnlargeLimit,
  dimensionsFromPercent,
  fitWithin,
  linkedDimension,
  validateResizeDimensions,
  type Dimensions,
} from "./core";
import type {
  ImageResizerClientCopy,
  ImageResizerWorkerReply,
  ImageResizerWorkerRequest,
  ResizeMode,
} from "./contract";

const lossyFormats = new Set<ImageFormat>(["jpg", "webp", "avif", "gif"]);

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function outputName(
  inputName: string,
  target: ImageFormat,
  dimensions: Dimensions,
): string {
  const stem = inputName.replace(/\.[^.]+$/u, "") || "resized-image";
  return `${stem}-${dimensions.width}x${dimensions.height}.${target}`;
}

function initImageResizer(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<ImageResizerClientCopy>(root);
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const openButton = root.querySelector<HTMLButtonElement>("[data-open-file]")!;
  const openLabel = root.querySelector<HTMLElement>("[data-open-label]")!;
  const clearButton = root.querySelector<HTMLButtonElement>("[data-clear]")!;
  const fileName = root.querySelector<HTMLElement>("[data-file-name]")!;
  const sourceSummary = root.querySelector<HTMLElement>(
    "[data-source-summary]",
  )!;
  const settings = root.querySelector<HTMLFieldSetElement>("[data-settings]")!;
  const widthInput = root.querySelector<HTMLInputElement>("[data-width]")!;
  const heightInput = root.querySelector<HTMLInputElement>("[data-height]")!;
  const percentageInput =
    root.querySelector<HTMLInputElement>("[data-percentage]")!;
  const pixelControls = root.querySelector<HTMLElement>(
    "[data-pixel-controls]",
  )!;
  const percentageControl = root.querySelector<HTMLElement>(
    "[data-percentage-control]",
  )!;
  const keepRatio = root.querySelector<HTMLInputElement>("[data-keep-ratio]")!;
  const preventEnlarge = root.querySelector<HTMLInputElement>(
    "[data-prevent-enlarge]",
  )!;
  const outputFormat = root.querySelector<HTMLSelectElement>(
    "[data-output-format]",
  )!;
  const qualityControl = root.querySelector<HTMLElement>(
    "[data-quality-control]",
  )!;
  const quality = root.querySelector<HTMLInputElement>("[data-quality]")!;
  const qualityValue = root.querySelector<HTMLOutputElement>(
    "[data-quality-value]",
  )!;
  const targetSummary = root.querySelector<HTMLOutputElement>(
    "[data-target-summary]",
  )!;
  const dropTarget =
    root.querySelector<HTMLButtonElement>("[data-drop-target]")!;
  const inputPreview = root.querySelector<HTMLImageElement>(
    "[data-input-preview]",
  )!;
  const outputPreview = root.querySelector<HTMLImageElement>(
    "[data-output-preview]",
  )!;
  const inputPlaceholder = root.querySelector<HTMLElement>(
    "[data-input-placeholder]",
  )!;
  const outputPlaceholder = root.querySelector<HTMLElement>(
    "[data-output-placeholder]",
  )!;
  const inputFacts = root.querySelector<HTMLElement>("[data-input-facts]")!;
  const outputFacts = root.querySelector<HTMLElement>("[data-output-facts]")!;
  const originalDimensions = root.querySelector<HTMLElement>(
    "[data-original-dimensions]",
  )!;
  const inputDimensions = root.querySelector<HTMLElement>(
    "[data-input-dimensions]",
  )!;
  const inputSize = root.querySelector<HTMLElement>("[data-input-size]")!;
  const resultFormat = root.querySelector<HTMLElement>("[data-result-format]")!;
  const resultDimensions = root.querySelector<HTMLElement>(
    "[data-result-dimensions]",
  )!;
  const outputDimensions = root.querySelector<HTMLElement>(
    "[data-output-dimensions]",
  )!;
  const outputSize = root.querySelector<HTMLElement>("[data-output-size]")!;
  const sizeResultLabel = root.querySelector<HTMLElement>(
    "[data-size-result-label]",
  )!;
  const sizeResult = root.querySelector<HTMLElement>("[data-size-result]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const warnings = root.querySelector<HTMLElement>("[data-warnings]")!;
  const runButton = root.querySelector<HTMLButtonElement>("[data-run]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;

  let selectedFile: File | undefined;
  let sourceFormat: ImageFormat | undefined;
  let sourceDimensions: Dimensions | undefined;
  let resultBlob: Blob | undefined;
  let resultTarget: ImageFormat | undefined;
  let resultSize: Dimensions | undefined;
  let inputUrl = "";
  let outputUrl = "";
  let revision = 0;
  let worker: Worker | undefined;
  let workerReject: ((reason?: unknown) => void) | undefined;
  let workerTimeout: number | undefined;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const revoke = (url: string) => {
    if (url) URL.revokeObjectURL(url);
  };

  const stopWorker = (reason = new DOMException("Cancelled", "AbortError")) => {
    if (workerTimeout !== undefined) {
      window.clearTimeout(workerTimeout);
      workerTimeout = undefined;
    }
    worker?.terminate();
    worker = undefined;
    const reject = workerReject;
    workerReject = undefined;
    reject?.(reason);
  };

  const cancel = () => {
    revision += 1;
    stopWorker();
  };

  const sendToWorker = (
    request: ImageResizerWorkerRequest,
    transfer: Transferable[],
  ): Promise<ImageResizerWorkerReply> => {
    stopWorker();
    worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });
    return new Promise((resolve, reject) => {
      workerReject = reject;
      const finish = () => {
        if (workerTimeout !== undefined) {
          window.clearTimeout(workerTimeout);
          workerTimeout = undefined;
        }
        worker?.terminate();
        worker = undefined;
        workerReject = undefined;
      };
      worker!.addEventListener(
        "message",
        (event: MessageEvent<ImageResizerWorkerReply>) => {
          if (event.data.id !== request.id) return;
          finish();
          resolve(event.data);
        },
        { once: true },
      );
      worker!.addEventListener(
        "error",
        () => {
          finish();
          reject(new Error("worker-failed"));
        },
        { once: true },
      );
      worker!.postMessage(request, transfer);
      workerTimeout = window.setTimeout(() => {
        finish();
        reject(new Error("worker-timeout"));
      }, 60_000);
    });
  };

  const resetResult = () => {
    revoke(outputUrl);
    outputUrl = "";
    resultBlob = undefined;
    resultTarget = undefined;
    resultSize = undefined;
    outputPreview.hidden = true;
    outputPreview.removeAttribute("src");
    outputPlaceholder.hidden = false;
    outputFacts.hidden = true;
    resultFormat.textContent = "—";
    downloadButton.hidden = true;
    downloadButton.disabled = true;
    runButton.hidden = false;
    warnings.replaceChildren();
  };

  const currentMode = (): ResizeMode =>
    root.querySelector<HTMLInputElement>('input[name="resize-mode"]:checked')
      ?.value === "percentage"
      ? "percentage"
      : "pixels";

  const targetFormat = (): ImageFormat | undefined => {
    if (!sourceFormat) return undefined;
    return outputFormat.value === "same"
      ? sourceFormat
      : (outputFormat.value as ImageFormat);
  };

  const rawTargetDimensions = (): Dimensions | undefined => {
    if (!sourceDimensions) return undefined;
    if (currentMode() === "percentage") {
      const percentage = Number(percentageInput.value);
      if (!Number.isFinite(percentage)) return undefined;
      return dimensionsFromPercent(sourceDimensions, percentage);
    }
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return undefined;
    return { width: Math.round(width), height: Math.round(height) };
  };

  const effectiveTarget = ():
    | { dimensions: Dimensions; limited: boolean }
    | undefined => {
    if (!sourceDimensions) return undefined;
    const raw = rawTargetDimensions();
    if (!raw) return undefined;
    const effective = preventEnlarge.checked
      ? applyEnlargeLimit(sourceDimensions, raw, keepRatio.checked)
      : { dimensions: raw, limited: false };
    return validateResizeDimensions(effective.dimensions)
      ? effective
      : undefined;
  };

  const updateQualityVisibility = () => {
    const target = targetFormat();
    const visible = Boolean(target && lossyFormats.has(target));
    qualityControl.hidden = !visible;
    quality.disabled = !visible;
  };

  const updateModeVisibility = () => {
    const percentage = currentMode() === "percentage";
    pixelControls.hidden = percentage;
    percentageControl.hidden = !percentage;
    keepRatio.disabled = percentage;
  };

  const updateTargetState = () => {
    updateModeVisibility();
    updateQualityVisibility();
    qualityValue.value = `${quality.value}%`;
    qualityValue.textContent = `${quality.value}%`;
    const target = effectiveTarget();
    if (!selectedFile || !target) {
      targetSummary.value = "—";
      targetSummary.textContent = "—";
      resultDimensions.textContent = "—";
      runButton.disabled = true;
      if (selectedFile) setStatus(copy.dimensionsTooLarge, "error");
      return;
    }
    const label = `${target.dimensions.width} × ${target.dimensions.height} px`;
    targetSummary.value = label;
    targetSummary.textContent = label;
    resultDimensions.textContent = label;
    runButton.disabled = false;
    setStatus(copy.ready);
  };

  const invalidateResult = () => {
    cancel();
    resetResult();
    updateTargetState();
  };

  const addWarning = (message: string) => {
    const badge = document.createElement("span");
    badge.className = "badge is-warning";
    badge.textContent = message;
    warnings.append(badge);
  };

  const inspectDimensions = async (
    file: File,
    source: ImageFormat,
    requestRevision: number,
  ): Promise<Dimensions> => {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return dimensions;
    } catch {
      const input = await file.arrayBuffer();
      if (requestRevision !== revision)
        throw new DOMException("Cancelled", "AbortError");
      const reply = await sendToWorker(
        { id: requestRevision, action: "inspect", input, source },
        [input],
      );
      if (!reply.ok) throw new Error(reply.error);
      if (reply.action !== "inspect") throw new Error("decode-failed");
      return { width: reply.width, height: reply.height };
    }
  };

  const selectFile = async (file: File) => {
    cancel();
    resetResult();
    selectedFile = undefined;
    sourceFormat = undefined;
    sourceDimensions = undefined;
    settings.disabled = true;
    clearButton.disabled = true;
    runButton.disabled = true;
    openLabel.textContent = copy.chooseImage;
    revoke(inputUrl);
    inputUrl = "";
    inputPreview.hidden = true;
    inputPreview.removeAttribute("src");
    inputPlaceholder.hidden = false;
    inputFacts.hidden = true;
    originalDimensions.textContent = "—";
    fileName.textContent = copy.dropImage;
    sourceSummary.textContent = copy.formats;

    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      setStatus(
        file.size > MAX_IMAGE_BYTES ? copy.fileTooLarge : copy.invalidImage,
        "error",
      );
      return;
    }

    const selectionRevision = revision;
    setStatus(copy.reading, "working");
    let detected: ImageFormat | undefined;
    try {
      detected = detectImageFormat(
        new Uint8Array(await file.slice(0, 32).arrayBuffer()),
      );
    } catch {
      detected = undefined;
    }
    if (selectionRevision !== revision) return;
    if (!detected) {
      setStatus(copy.invalidImage, "error");
      return;
    }

    let dimensions: Dimensions;
    try {
      dimensions = await inspectDimensions(file, detected, selectionRevision);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (selectionRevision !== revision) return;
      setStatus(copy.decodeFailed, "error");
      return;
    }
    if (selectionRevision !== revision) return;
    if (!validateResizeDimensions(dimensions)) {
      setStatus(copy.dimensionsTooLarge, "error");
      return;
    }

    selectedFile = file;
    sourceFormat = detected;
    sourceDimensions = dimensions;
    inputUrl = URL.createObjectURL(file);
    inputPreview.src = inputUrl;
    inputPreview.hidden = false;
    inputPlaceholder.hidden = true;
    inputPreview.addEventListener(
      "error",
      () => {
        inputPreview.hidden = true;
        inputPlaceholder.hidden = false;
      },
      { once: true },
    );
    const dimensionsLabel = `${dimensions.width} × ${dimensions.height} px`;
    fileName.textContent = file.name;
    sourceSummary.textContent = `${detected.toUpperCase()} · ${dimensionsLabel} · ${formatBytes(file.size)}`;
    originalDimensions.textContent = dimensionsLabel;
    inputDimensions.textContent = dimensionsLabel;
    inputSize.textContent = formatBytes(file.size);
    inputFacts.hidden = false;
    widthInput.value = String(dimensions.width);
    heightInput.value = String(dimensions.height);
    percentageInput.value = "100";
    outputFormat.value = "same";
    settings.disabled = false;
    clearButton.disabled = false;
    openLabel.textContent = copy.replaceImage;
    updateTargetState();
  };

  const clear = () => {
    cancel();
    selectedFile = undefined;
    sourceFormat = undefined;
    sourceDimensions = undefined;
    fileInput.value = "";
    revoke(inputUrl);
    inputUrl = "";
    inputPreview.hidden = true;
    inputPreview.removeAttribute("src");
    inputPlaceholder.hidden = false;
    inputFacts.hidden = true;
    originalDimensions.textContent = "—";
    fileName.textContent = copy.dropImage;
    sourceSummary.textContent = copy.formats;
    openLabel.textContent = copy.chooseImage;
    clearButton.disabled = true;
    settings.disabled = true;
    resetResult();
    updateTargetState();
    setStatus(copy.ready);
  };

  const run = async () => {
    const file = selectedFile;
    const source = sourceFormat;
    const target = targetFormat();
    const effective = effectiveTarget();
    if (!file || !source || !target || !effective) return;

    cancel();
    resetResult();
    const runRevision = revision;
    runButton.disabled = true;
    setStatus(copy.working, "working");

    let input: ArrayBuffer;
    try {
      input = await file.arrayBuffer();
    } catch {
      if (runRevision !== revision) return;
      runButton.disabled = false;
      setStatus(copy.decodeFailed, "error");
      return;
    }
    if (runRevision !== revision) return;

    try {
      const reply = await sendToWorker(
        {
          id: runRevision,
          action: "resize",
          input,
          source,
          target,
          width: effective.dimensions.width,
          height: effective.dimensions.height,
          quality: Number(quality.value),
        },
        [input],
      );
      if (runRevision !== revision) return;
      if (!reply.ok) {
        const messages = {
          "invalid-image": copy.invalidImage,
          "wrong-format": copy.invalidImage,
          "dimensions-too-large": copy.dimensionsTooLarge,
          "decode-failed": copy.decodeFailed,
          "encode-failed": copy.encodeFailed,
        };
        runButton.disabled = false;
        setStatus(messages[reply.error], "error");
        return;
      }
      if (reply.action !== "resize") throw new Error("encode-failed");

      resultBlob = new Blob([reply.output], { type: imageFormatMime[target] });
      resultTarget = target;
      resultSize = { width: reply.width, height: reply.height };
      outputUrl = URL.createObjectURL(resultBlob);
      outputPreview.src = outputUrl;
      outputPreview.hidden = false;
      outputPlaceholder.hidden = true;
      outputPreview.addEventListener(
        "error",
        () => {
          outputPreview.hidden = true;
          outputPlaceholder.hidden = false;
        },
        { once: true },
      );
      const outputLabel = `${reply.width} × ${reply.height} px`;
      resultFormat.textContent = target.toUpperCase();
      outputDimensions.textContent = outputLabel;
      outputSize.textContent = formatBytes(resultBlob.size);
      const difference = resultBlob.size - file.size;
      const percent = Math.round((Math.abs(difference) / file.size) * 100);
      sizeResultLabel.textContent = difference <= 0 ? copy.saved : copy.larger;
      sizeResult.textContent = `${percent}%`;
      outputFacts.hidden = false;
      runButton.hidden = true;
      downloadButton.hidden = false;
      downloadButton.disabled = false;
      if (reply.transparencyFlattened) addWarning(copy.transparencyFlattened);
      if (reply.firstFrameOnly) addWarning(copy.animationFirstFrame);
      if (effective.limited) addWarning(copy.preventedEnlarge);
      setStatus(copy.complete, "success");

      if (window.matchMedia("(max-width: 680px)").matches) {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        outputPreview.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "center",
        });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (runRevision !== revision) return;
      runButton.disabled = false;
      setStatus(copy.encodeFailed, "error");
    }
  };

  const setPixelDimensions = (dimensions: Dimensions) => {
    root.querySelector<HTMLInputElement>(
      'input[name="resize-mode"][value="pixels"]',
    )!.checked = true;
    widthInput.value = String(dimensions.width);
    heightInput.value = String(dimensions.height);
    invalidateResult();
  };

  openButton.addEventListener("click", () => fileInput.click());
  dropTarget.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void selectFile(file);
  });
  clearButton.addEventListener("click", clear);
  runButton.addEventListener("click", () => void run());
  downloadButton.addEventListener("click", () => {
    if (selectedFile && resultBlob && resultTarget && resultSize) {
      downloadBlob(
        resultBlob,
        outputName(selectedFile.name, resultTarget, resultSize),
      );
    }
  });

  root
    .querySelectorAll<HTMLInputElement>('input[name="resize-mode"]')
    .forEach((input) => input.addEventListener("change", invalidateResult));
  widthInput.addEventListener("input", () => {
    if (sourceDimensions && keepRatio.checked && Number(widthInput.value) > 0) {
      const linked = linkedDimension(
        sourceDimensions,
        "width",
        Number(widthInput.value),
      );
      heightInput.value = String(linked.height);
    }
    invalidateResult();
  });
  heightInput.addEventListener("input", () => {
    if (
      sourceDimensions &&
      keepRatio.checked &&
      Number(heightInput.value) > 0
    ) {
      const linked = linkedDimension(
        sourceDimensions,
        "height",
        Number(heightInput.value),
      );
      widthInput.value = String(linked.width);
    }
    invalidateResult();
  });
  percentageInput.addEventListener("input", invalidateResult);
  keepRatio.addEventListener("change", () => {
    if (sourceDimensions && keepRatio.checked && Number(widthInput.value) > 0) {
      const linked = linkedDimension(
        sourceDimensions,
        "width",
        Number(widthInput.value),
      );
      heightInput.value = String(linked.height);
    }
    invalidateResult();
  });
  preventEnlarge.addEventListener("change", invalidateResult);
  outputFormat.addEventListener("change", invalidateResult);
  quality.addEventListener("input", invalidateResult);

  root
    .querySelectorAll<HTMLButtonElement>("[data-percent-preset]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        root.querySelector<HTMLInputElement>(
          'input[name="resize-mode"][value="percentage"]',
        )!.checked = true;
        percentageInput.value = button.dataset.percentPreset ?? "100";
        invalidateResult();
      });
    });
  root
    .querySelectorAll<HTMLButtonElement>("[data-size-preset]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        if (!sourceDimensions) return;
        const [width, height] = (button.dataset.sizePreset ?? "")
          .split("x")
          .map(Number);
        if (!width || !height) return;
        setPixelDimensions(
          fitWithin(
            sourceDimensions,
            { width, height },
            preventEnlarge.checked,
          ),
        );
      });
    });
  root
    .querySelector<HTMLButtonElement>("[data-original-size]")!
    .addEventListener("click", () => {
      if (sourceDimensions) setPixelDimensions(sourceDimensions);
    });

  ["dragenter", "dragover"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.add("is-dragging");
    }),
  );
  ["dragleave", "drop"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.remove("is-dragging");
    }),
  );
  root.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (file) void selectFile(file);
  });
  document.addEventListener("paste", (event) => {
    const file = Array.from(event.clipboardData?.files ?? []).find(
      (candidate) => candidate.type.startsWith("image/"),
    );
    if (file) void selectFile(file);
  });
  window.addEventListener(
    "pagehide",
    () => {
      cancel();
      revoke(inputUrl);
      revoke(outputUrl);
    },
    { once: true },
  );

  updateTargetState();
}

document
  .querySelectorAll<HTMLElement>("[data-image-resizer]")
  .forEach(initImageResizer);
