import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import { detectImageFormat, MAX_IMAGE_BYTES } from "./codec-core";
import type {
  ImageConverterClientCopy,
  ImageConverterWorkerReply,
  ImageConverterWorkerRequest,
  ImageQualityProfile,
} from "./contract";
import { imageFormatMime, isImageFormat, type ImageFormat } from "./formats";

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function outputName(inputName: string, target: ImageFormat): string {
  const stem = inputName.replace(/\.[^.]+$/u, "") || "converted-image";
  return `${stem}.${target === "jpg" ? "jpg" : target}`;
}

function initImageConverter(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const source = root.dataset.source;
  const target = root.dataset.target;
  if (!source || !target || !isImageFormat(source) || !isImageFormat(target))
    return;

  const copy = readClientCopy<ImageConverterClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const openButton = root.querySelector<HTMLButtonElement>("[data-open-file]")!;
  const openLabel = root.querySelector<HTMLElement>("[data-open-label]")!;
  const clearButton = root.querySelector<HTMLButtonElement>("[data-clear]")!;
  const runButton = root.querySelector<HTMLButtonElement>("[data-run]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
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
  const fileName = root.querySelector<HTMLElement>("[data-file-name]")!;
  const inputSize = root.querySelector<HTMLElement>("[data-input-size]")!;
  const outputSize = root.querySelector<HTMLElement>("[data-output-size]")!;
  const dimensions = root.querySelector<HTMLElement>("[data-dimensions]")!;
  const sizeResult = root.querySelector<HTMLElement>("[data-size-result]")!;
  const sizeResultLabel = root.querySelector<HTMLElement>(
    "[data-size-result-label]",
  )!;
  const warnings = root.querySelector<HTMLElement>("[data-warnings]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const quality = root.querySelector<HTMLSelectElement>("[data-quality]");
  const sourceSelect = root.querySelector<HTMLSelectElement>(
    "[data-source-format]",
  )!;
  const targetSelect = root.querySelector<HTMLSelectElement>(
    "[data-target-format]",
  )!;

  let selectedFile: File | undefined;
  let inputUrl = "";
  let outputUrl = "";
  let resultBlob: Blob | undefined;
  let revision = 0;
  let worker: Worker | undefined;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const revoke = (url: string) => {
    if (url) URL.revokeObjectURL(url);
  };
  const resetResult = () => {
    revoke(outputUrl);
    outputUrl = "";
    resultBlob = undefined;
    outputPreview.hidden = true;
    outputPreview.removeAttribute("src");
    outputPlaceholder.hidden = false;
    outputFacts.hidden = true;
    downloadButton.disabled = true;
    warnings.replaceChildren();
  };
  const cancel = () => {
    revision += 1;
    worker?.terminate();
    worker = undefined;
  };
  const clear = () => {
    cancel();
    selectedFile = undefined;
    fileInput.value = "";
    revoke(inputUrl);
    inputUrl = "";
    inputPreview.hidden = true;
    inputPreview.removeAttribute("src");
    inputPlaceholder.hidden = false;
    inputFacts.hidden = true;
    clearButton.disabled = runButton.disabled = true;
    openLabel.textContent = copy.chooseImage;
    resetResult();
    setStatus(copy.ready);
  };

  const selectFile = async (file: File) => {
    cancel();
    resetResult();
    selectedFile = undefined;
    revoke(inputUrl);
    inputUrl = "";
    inputPreview.hidden = true;
    inputPreview.removeAttribute("src");
    inputPlaceholder.hidden = false;
    inputFacts.hidden = true;
    clearButton.disabled = runButton.disabled = true;
    openLabel.textContent = copy.chooseImage;
    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      setStatus(
        file.size > MAX_IMAGE_BYTES ? copy.fileTooLarge : copy.invalidImage,
        "error",
      );
      return;
    }
    const selectionRevision = revision;
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
    if (detected !== source) {
      setStatus(
        copy.wrongFormat.replace("{format}", detected.toUpperCase()),
        "error",
      );
      return;
    }

    selectedFile = file;
    revoke(inputUrl);
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
    fileName.textContent = file.name;
    inputSize.textContent = formatBytes(file.size);
    inputFacts.hidden = false;
    clearButton.disabled = runButton.disabled = false;
    openLabel.textContent = copy.replaceImage;
    setStatus(copy.ready);
  };

  const addWarning = (message: string) => {
    const badge = document.createElement("span");
    badge.className = "badge is-warning";
    badge.textContent = message;
    warnings.append(badge);
  };

  const run = async () => {
    if (!selectedFile) return;
    cancel();
    resetResult();
    const runRevision = revision;
    runButton.disabled = true;
    setStatus(copy.working, "working");
    let input: ArrayBuffer;
    try {
      input = await selectedFile.arrayBuffer();
    } catch {
      if (runRevision !== revision) return;
      setStatus(copy.decodeFailed, "error");
      runButton.disabled = false;
      return;
    }
    if (runRevision !== revision) return;

    worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });
    const request: ImageConverterWorkerRequest = {
      id: runRevision,
      input,
      source,
      target,
      quality: (quality?.value ?? "balanced") as ImageQualityProfile,
    };
    worker.addEventListener(
      "message",
      (event: MessageEvent<ImageConverterWorkerReply>) => {
        if (event.data.id !== revision || !selectedFile) return;
        worker?.terminate();
        worker = undefined;
        runButton.disabled = false;
        if (!event.data.ok) {
          const messages = {
            "invalid-image": copy.invalidImage,
            "wrong-format": copy.wrongFormat.replace(
              "{format}",
              event.data.detected?.toUpperCase() ?? "?",
            ),
            "dimensions-too-large": copy.dimensionsTooLarge,
            "decode-failed": copy.decodeFailed,
            "encode-failed": copy.encodeFailed,
          };
          setStatus(messages[event.data.error], "error");
          return;
        }

        resultBlob = new Blob([event.data.output], {
          type: imageFormatMime[target],
        });
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
        dimensions.textContent = `${event.data.width} × ${event.data.height}`;
        outputSize.textContent = formatBytes(resultBlob.size);
        const difference = resultBlob.size - selectedFile.size;
        const percent = Math.round(
          (Math.abs(difference) / selectedFile.size) * 100,
        );
        sizeResultLabel.textContent =
          difference <= 0 ? copy.saved : copy.larger;
        sizeResult.textContent = `${percent}%`;
        outputFacts.hidden = false;
        downloadButton.disabled = false;
        if (event.data.transparencyFlattened)
          addWarning(copy.transparencyFlattened);
        if (event.data.firstFrameOnly) addWarning(copy.animationFirstFrame);
        if (difference > selectedFile.size)
          addWarning(copy.sizeIncreaseExpected);
        setStatus(copy.complete, "success");
      },
    );
    worker.addEventListener("error", () => {
      if (runRevision !== revision) return;
      worker?.terminate();
      worker = undefined;
      runButton.disabled = false;
      setStatus(copy.encodeFailed, "error");
    });
    worker.postMessage(request, [input]);
  };

  const navigate = () => {
    const nextSource = sourceSelect.value;
    let nextTarget = targetSelect.value;
    if (nextSource === nextTarget) {
      nextTarget = source;
      targetSelect.value = nextTarget;
    }
    window.location.assign(`/${locale}/${nextSource}-to-${nextTarget}/`);
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
    if (selectedFile && resultBlob)
      downloadBlob(resultBlob, outputName(selectedFile.name, target));
  });
  quality?.addEventListener("change", () => {
    cancel();
    resetResult();
    runButton.disabled = !selectedFile;
    setStatus(copy.ready);
  });
  sourceSelect.addEventListener("change", navigate);
  targetSelect.addEventListener("change", navigate);
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
  window.addEventListener(
    "pagehide",
    () => {
      cancel();
      revoke(inputUrl);
      revoke(outputUrl);
    },
    { once: true },
  );
}

document
  .querySelectorAll<HTMLElement>("[data-image-converter]")
  .forEach(initImageConverter);
