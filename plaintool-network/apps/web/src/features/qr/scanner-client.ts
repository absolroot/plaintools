import { decodeQrPixels } from "@plaintool/qr-core/decode";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { QrScannerCopy, QrScannerResult } from "./contract";

const MAX_FILE_BYTES = 10_000_000;
const MAX_SCAN_DIMENSION = 1800;
const CAMERA_SCAN_INTERVAL = 160;

function toHttpUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function cameraErrorCode(error: unknown): "permission" | "unavailable" {
  if (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" || error.name === "SecurityError")
  ) {
    return "permission";
  }
  return "unavailable";
}

function drawScaled(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
): ImageData {
  const scale = Math.min(
    1,
    MAX_SCAN_DIMENSION / Math.max(sourceWidth, sourceHeight),
  );
  canvas.width = Math.max(1, Math.round(sourceWidth * scale));
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
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

function isImageBitmap(
  image: ImageBitmap | HTMLImageElement,
): image is ImageBitmap {
  return typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<QrScannerCopy>(root);
  const fileInput = root.querySelector<HTMLInputElement>("[data-file-input]")!;
  const openFileButtons =
    root.querySelectorAll<HTMLButtonElement>("[data-open-file]");
  const startCameraButton = root.querySelector<HTMLButtonElement>(
    "[data-start-camera]",
  )!;
  const stopCameraButton =
    root.querySelector<HTMLButtonElement>("[data-stop-camera]")!;
  const video = root.querySelector<HTMLVideoElement>("[data-video]")!;
  const cameraHint = root.querySelector<HTMLElement>("[data-camera-hint]")!;
  const canvas = root.querySelector<HTMLCanvasElement>("[data-scan-canvas]")!;
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  const resultOutput =
    root.querySelector<HTMLTextAreaElement>("[data-result]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const openUrlButton =
    root.querySelector<HTMLButtonElement>("[data-open-url]")!;
  const urlBadge = root.querySelector<HTMLElement>("[data-url-badge]")!;
  const resultSection = root.querySelector<HTMLElement>(".qr-scan-result")!;
  const uploadEmpty = root.querySelector<HTMLElement>("[data-upload-empty]")!;
  const uploadPreview = root.querySelector<HTMLElement>(
    "[data-upload-preview]",
  )!;
  const previewImage = root.querySelector<HTMLImageElement>(
    "[data-preview-image]",
  )!;
  const previewName = root.querySelector<HTMLElement>("[data-preview-name]")!;
  const urlDialog = root.querySelector<HTMLDialogElement>("[data-url-dialog]")!;
  const urlDestination = root.querySelector<HTMLElement>(
    "[data-url-destination]",
  )!;
  const cancelUrlButton =
    root.querySelector<HTMLButtonElement>("[data-cancel-url]")!;
  const confirmUrlButton =
    root.querySelector<HTMLButtonElement>("[data-confirm-url]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  let result: QrScannerResult | null = null;
  let resultUrl: URL | null = null;
  let previewObjectUrl: string | null = null;
  let stream: MediaStream | null = null;
  let frameRequest = 0;
  let lastScanTime = 0;
  let revision = 0;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  function scrollToResult(): void {
    if (!window.matchMedia("(max-width: 680px)").matches) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    resultSection.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function openUrlDialog(): void {
    if (!resultUrl) return;
    urlDestination.textContent = resultUrl.href;
    if (urlDialog.open) urlDialog.close();
    urlDialog.showModal();
  }

  function clearPreview(): void {
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
    previewImage.removeAttribute("src");
    previewName.textContent = "";
    uploadPreview.hidden = true;
    uploadEmpty.hidden = false;
  }

  function renderPreview(file: File): void {
    clearPreview();
    previewObjectUrl = URL.createObjectURL(file);
    previewImage.src = previewObjectUrl;
    previewName.textContent = file.name;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
  }

  function renderResult(nextResult: QrScannerResult): void {
    result = nextResult;
    resultUrl = toHttpUrl(nextResult.text);
    resultOutput.value = nextResult.text;
    copyButton.disabled = false;
    urlBadge.hidden = !resultUrl;
    openUrlButton.hidden = !resultUrl;
    openUrlButton.disabled = !resultUrl;
    setStatus(copy.completed, "success");
    scrollToResult();
    if (resultUrl) openUrlDialog();
  }

  function invalidateResult(): void {
    result = null;
    resultUrl = null;
    resultOutput.value = "";
    copyButton.disabled = true;
    urlBadge.hidden = true;
    openUrlButton.hidden = true;
    openUrlButton.disabled = true;
    if (urlDialog.open) urlDialog.close();
    urlDestination.textContent = "";
  }

  function decodeImageData(imageData: ImageData): QrScannerResult | null {
    return decodeQrPixels(imageData.data, imageData.width, imageData.height);
  }

  function stopCamera(resetStatus = false): void {
    revision += 1;
    if (frameRequest) cancelAnimationFrame(frameRequest);
    frameRequest = 0;
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    video.pause();
    video.srcObject = null;
    video.hidden = true;
    cameraHint.hidden = false;
    startCameraButton.hidden = false;
    stopCameraButton.hidden = true;
    if (resetStatus)
      setStatus(
        result ? copy.completed : copy.ready,
        result ? "success" : "idle",
      );
  }

  function scanCameraFrame(now: number, cameraRevision: number): void {
    if (!stream || cameraRevision !== revision) return;
    if (
      now - lastScanTime >= CAMERA_SCAN_INTERVAL &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      video.videoWidth > 0
    ) {
      lastScanTime = now;
      try {
        const imageData = drawScaled(
          context,
          canvas,
          video,
          video.videoWidth,
          video.videoHeight,
        );
        const decoded = decodeImageData(imageData);
        if (decoded) {
          renderResult(decoded);
          stopCamera(false);
          return;
        }
      } catch {
        stopCamera(false);
        setStatus(copy.scanFailed, "error");
        return;
      }
    }
    frameRequest = requestAnimationFrame((time) =>
      scanCameraFrame(time, cameraRevision),
    );
  }

  async function startCamera(): Promise<void> {
    stopCamera(false);
    invalidateResult();
    clearPreview();
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus(copy.cameraUnsupported, "error");
      return;
    }
    const cameraRevision = revision;
    setStatus(copy.cameraStarting, "working");
    startCameraButton.disabled = true;
    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" } },
      });
      if (cameraRevision !== revision) {
        nextStream.getTracks().forEach((track) => track.stop());
        return;
      }
      stream = nextStream;
      video.srcObject = stream;
      await video.play();
      if (cameraRevision !== revision) return;
      video.hidden = false;
      cameraHint.hidden = true;
      startCameraButton.hidden = true;
      stopCameraButton.hidden = false;
      setStatus(copy.cameraScanning, "working");
      lastScanTime = 0;
      frameRequest = requestAnimationFrame((time) =>
        scanCameraFrame(time, cameraRevision),
      );
    } catch (error) {
      if (cameraRevision !== revision) return;
      stopCamera(false);
      setStatus(
        cameraErrorCode(error) === "permission"
          ? copy.permissionDenied
          : copy.cameraUnavailable,
        "error",
      );
    } finally {
      startCameraButton.disabled = false;
    }
  }

  async function scanFile(file: File): Promise<void> {
    stopCamera(false);
    const fileRevision = revision;
    invalidateResult();
    clearPreview();
    if (file.size > MAX_FILE_BYTES) {
      setStatus(copy.fileTooLarge, "error");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setStatus(copy.invalidImage, "error");
      return;
    }
    renderPreview(file);
    setStatus(copy.readingImage, "working");
    try {
      const image = await loadImage(file);
      if (fileRevision !== revision) {
        if (isImageBitmap(image)) image.close();
        return;
      }
      const width = isImageBitmap(image) ? image.width : image.naturalWidth;
      const height = isImageBitmap(image) ? image.height : image.naturalHeight;
      const imageData = drawScaled(context, canvas, image, width, height);
      if (isImageBitmap(image)) image.close();
      const decoded = decodeImageData(imageData);
      if (fileRevision !== revision) return;
      if (decoded) renderResult(decoded);
      else setStatus(copy.noCode, "error");
    } catch {
      if (fileRevision !== revision) return;
      setStatus(copy.invalidImage, "error");
    }
  }

  openFileButtons.forEach((button) =>
    button.addEventListener("click", () => fileInput.click()),
  );
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void scanFile(file);
  });
  startCameraButton.addEventListener("click", () => void startCamera());
  stopCameraButton.addEventListener("click", () => stopCamera(true));

  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    stopCamera(false);
    invalidateResult();
    clearPreview();
    setStatus(copy.ready);
    openFileButtons[0]?.focus();
  });

  openUrlButton.addEventListener("click", openUrlDialog);
  cancelUrlButton.addEventListener("click", () => urlDialog.close("cancel"));
  urlDialog.addEventListener("close", () => {
    if (result) requestAnimationFrame(scrollToResult);
  });
  confirmUrlButton.addEventListener("click", () => {
    if (!resultUrl) return;
    const destination = resultUrl.href;
    urlDialog.close("open");
    window.open(destination, "_blank", "noopener,noreferrer");
  });

  copyButton.addEventListener("click", async () => {
    if (!result) return;
    const copyRevision = revision;
    const copied = await copyText(result.text);
    if (copyRevision !== revision) return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
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
    if (file) void scanFile(file);
  });
  window.addEventListener(
    "pagehide",
    () => {
      stopCamera(false);
      clearPreview();
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>("[data-qr-scanner]").forEach(init);
