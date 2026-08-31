import { downloadBlob, setToolStatus } from "../../scripts/shared/tool-dom";
import type { CropRect, ImageCropClientCopy } from "./contract";
import {
  MAX_CROP_EDGE,
  MAX_CROP_PIXELS,
  clampCrop,
  cropDimensionsValid,
  cropForRatio,
  previewDimensions,
  transformedDimensions,
} from "./core";

const MAX_BYTES = 50 * 1024 * 1024;
const INPUT_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
]);

type Source = {
  file: File;
  image: HTMLImageElement;
  width: number;
  height: number;
};

function init(root: HTMLElement) {
  const copy = JSON.parse(
    root.querySelector<HTMLScriptElement>("[data-client-copy]")!.textContent ??
      "{}",
  ) as ImageCropClientCopy;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file]")!;
  const canvas = root.querySelector<HTMLCanvasElement>("[data-canvas]")!;
  const wrap = root.querySelector<HTMLButtonElement>("[data-canvas-wrap]")!;
  const selection = root.querySelector<HTMLElement>("[data-selection]")!;
  const empty = root.querySelector<HTMLElement>("[data-empty]")!;
  const settings = root.querySelector<HTMLFieldSetElement>("[data-settings]")!;
  const save = root.querySelector<HTMLButtonElement>("[data-save]")!;
  const download = root.querySelector<HTMLButtonElement>("[data-download]")!;
  const clear = root.querySelector<HTMLButtonElement>("[data-clear]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const ratio = root.querySelector<HTMLSelectElement>("[data-ratio]")!;
  const output = root.querySelector<HTMLSelectElement>("[data-output]")!;
  const quality = root.querySelector<HTMLInputElement>("[data-quality-range]")!;
  const qualityControl = root.querySelector<HTMLElement>(
    "[data-quality-control]",
  )!;
  const angle = root.querySelector<HTMLInputElement>("[data-straighten]")!;
  const resultImage = root.querySelector<HTMLImageElement>("[data-result]")!;
  const numberInputs = ["x", "y", "width", "height"].map(
    (name) => root.querySelector<HTMLInputElement>(`[data-${name}]`)!,
  );
  const [xInput, yInput, widthInput, heightInput] = numberInputs;
  let source: Source | undefined;
  let crop: CropRect | undefined;
  let rotation = 0;
  let flipX = false;
  let flipY = false;
  let result: Blob | undefined;
  let resultExtension = "png";
  let resultUrl = "";
  let pendingUrl = "";
  let revision = 0;
  let drag: { x: number; y: number; crop: CropRect } | undefined;

  const state = (
    message: string,
    kind: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, kind);
  const revokeResult = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultUrl = "";
  };
  const revokePending = () => {
    if (pendingUrl) URL.revokeObjectURL(pendingUrl);
    pendingUrl = "";
  };
  const resetResult = () => {
    revokeResult();
    result = undefined;
    resultExtension = "png";
    resultImage.hidden = true;
    resultImage.removeAttribute("src");
    download.hidden = true;
    download.disabled = true;
    save.hidden = false;
  };
  const totalAngle = () => rotation + Number(angle.value || 0);
  const transformedSize = () =>
    source
      ? transformedDimensions(source.width, source.height, totalAngle())
      : { width: 1, height: 1 };
  const syncQuality = () => {
    const applies = output.value !== "png";
    qualityControl.hidden = !applies;
    quality.disabled = !applies;
  };
  const resetEditControls = () => {
    rotation = 0;
    flipX = false;
    flipY = false;
    angle.value = "0";
    ratio.value = "";
    root.querySelector<HTMLOutputElement>("[data-angle]")!.value = "0°";
  };
  const resetOutputControls = () => {
    output.value = "png";
    quality.value = "92";
    root.querySelector<HTMLOutputElement>("[data-quality]")!.value = "92%";
    syncQuality();
  };
  const drawTransformed = (
    context: CanvasRenderingContext2D,
    targetWidth: number,
    targetHeight: number,
    offsetX = 0,
    offsetY = 0,
  ) => {
    if (!source) return;
    const bounds = transformedSize();
    context.save();
    context.translate(offsetX, offsetY);
    context.scale(targetWidth / bounds.width, targetHeight / bounds.height);
    context.translate(bounds.width / 2, bounds.height / 2);
    context.rotate((totalAngle() * Math.PI) / 180);
    context.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    context.drawImage(source.image, -source.width / 2, -source.height / 2);
    context.restore();
  };
  const sync = () => {
    if (!source || !crop) return;
    const bounds = transformedSize();
    crop = clampCrop(crop, bounds.width, bounds.height);
    xInput.value = String(crop.x);
    yInput.value = String(crop.y);
    widthInput.value = String(crop.width);
    heightInput.value = String(crop.height);
    const canvasRect = canvas.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    selection.style.left = `${canvasRect.left - wrapRect.left + (crop.x / bounds.width) * canvasRect.width}px`;
    selection.style.top = `${canvasRect.top - wrapRect.top + (crop.y / bounds.height) * canvasRect.height}px`;
    selection.style.width = `${(crop.width / bounds.width) * canvasRect.width}px`;
    selection.style.height = `${(crop.height / bounds.height) * canvasRect.height}px`;
    selection.hidden = false;
    save.disabled = !cropDimensionsValid(crop);
  };
  const render = () => {
    if (!source) return;
    const bounds = transformedSize();
    const preview = previewDimensions(bounds.width, bounds.height);
    canvas.width = preview.width;
    canvas.height = preview.height;
    const rect = wrap.getBoundingClientRect();
    const displayScale = Math.min(
      Math.max(1, rect.width - 28) / preview.width,
      Math.max(1, rect.height - 28) / preview.height,
      1,
    );
    canvas.style.width = `${Math.max(1, preview.width * displayScale)}px`;
    canvas.style.height = `${Math.max(1, preview.height * displayScale)}px`;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTransformed(context, preview.width, preview.height);
    sync();
  };
  const invalidate = (renderPreview = false) => {
    revision += 1;
    resetResult();
    if (renderPreview) render();
    else sync();
    state(copy.ready);
  };
  const setCrop = (next: CropRect) => {
    if (!source) return;
    const bounds = transformedSize();
    crop = clampCrop(next, bounds.width, bounds.height);
    invalidate();
  };
  const resetCropForTransform = () => {
    if (!source) return;
    const bounds = transformedSize();
    crop = cropForRatio(
      bounds.width,
      bounds.height,
      Number(ratio.value) || undefined,
    );
    invalidate(true);
  };
  const load = async (file: File) => {
    const requestRevision = ++revision;
    revokePending();
    resetResult();
    if (
      !INPUT_TYPES.has(file.type) ||
      file.size === 0 ||
      file.size > MAX_BYTES
    ) {
      state(
        file.size > MAX_BYTES ? copy.fileTooLarge : copy.invalidImage,
        "error",
      );
      return;
    }
    state(copy.reading, "working");
    const url = URL.createObjectURL(file);
    pendingUrl = url;
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    try {
      await image.decode();
    } catch {
      if (requestRevision === revision) state(copy.decodeFailed, "error");
      return;
    } finally {
      URL.revokeObjectURL(url);
      if (pendingUrl === url) pendingUrl = "";
    }
    if (requestRevision !== revision) return;
    if (
      image.naturalWidth < 1 ||
      image.naturalHeight < 1 ||
      image.naturalWidth > MAX_CROP_EDGE ||
      image.naturalHeight > MAX_CROP_EDGE ||
      image.naturalWidth * image.naturalHeight > MAX_CROP_PIXELS
    ) {
      state(copy.dimensionsTooLarge, "error");
      return;
    }
    source = {
      file,
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
    resetEditControls();
    const bounds = transformedSize();
    crop = { x: 0, y: 0, width: bounds.width, height: bounds.height };
    settings.disabled = false;
    clear.disabled = false;
    canvas.hidden = false;
    empty.hidden = true;
    root.querySelector<HTMLElement>("[data-file-name]")!.textContent =
      file.name;
    root.querySelector<HTMLElement>("[data-open-label]")!.textContent =
      copy.replaceImage;
    requestAnimationFrame(render);
    state(copy.ready);
  };
  const exportImage = async () => {
    if (!source || !crop || !cropDimensionsValid(crop)) return;
    const exportRevision = ++revision;
    state(copy.working, "working");
    save.disabled = true;
    try {
      const mime =
        output.value === "jpg" ? "image/jpeg" : `image/${output.value}`;
      const out = document.createElement("canvas");
      out.width = crop.width;
      out.height = crop.height;
      const context = out.getContext("2d");
      if (!context) throw new Error("context");
      if (mime === "image/jpeg") {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, out.width, out.height);
      }
      const bounds = transformedSize();
      drawTransformed(context, bounds.width, bounds.height, -crop.x, -crop.y);
      const blob = await new Promise<Blob | null>((resolve) =>
        out.toBlob(
          resolve,
          mime,
          output.value === "png" ? undefined : Number(quality.value) / 100,
        ),
      );
      if (exportRevision !== revision) return;
      if (!blob) throw new Error("encode");
      revokeResult();
      result = blob;
      resultExtension =
        blob.type === "image/jpeg"
          ? "jpg"
          : blob.type === "image/webp"
            ? "webp"
            : "png";
      resultUrl = URL.createObjectURL(blob);
      resultImage.src = resultUrl;
      resultImage.hidden = false;
      save.hidden = true;
      download.hidden = false;
      download.disabled = false;
      state(copy.complete, "success");
    } catch {
      if (exportRevision === revision) {
        state(copy.encodeFailed, "error");
        save.disabled = false;
      }
    }
  };

  root
    .querySelector<HTMLButtonElement>("[data-open-file]")!
    .addEventListener("click", () => fileInput.click());
  wrap.addEventListener("click", () => {
    if (!source) fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (file) void load(file);
  });
  clear.addEventListener("click", () => {
    revision += 1;
    revokePending();
    source = undefined;
    crop = undefined;
    drag = undefined;
    resetEditControls();
    resetOutputControls();
    numberInputs.forEach((input) => {
      input.value = "";
    });
    canvas.hidden = true;
    canvas.width = 1;
    canvas.height = 1;
    selection.hidden = true;
    empty.hidden = false;
    settings.disabled = true;
    clear.disabled = true;
    save.disabled = true;
    root.querySelector<HTMLElement>("[data-file-name]")!.textContent =
      copy.dropImage;
    root.querySelector<HTMLElement>("[data-open-label]")!.textContent =
      copy.chooseImage;
    resetResult();
    state(copy.ready);
  });
  ratio.addEventListener("change", resetCropForTransform);
  numberInputs.forEach((input) =>
    input.addEventListener("input", () => {
      if (!source) return;
      setCrop({
        x: Number(xInput.value),
        y: Number(yInput.value),
        width: Number(widthInput.value),
        height: Number(heightInput.value),
      });
    }),
  );
  root.querySelectorAll<HTMLButtonElement>("[data-rotate]").forEach((button) =>
    button.addEventListener("click", () => {
      rotation += Number(button.dataset.rotate);
      resetCropForTransform();
    }),
  );
  root.querySelectorAll<HTMLButtonElement>("[data-flip]").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.flip === "x") flipX = !flipX;
      else flipY = !flipY;
      invalidate(true);
    }),
  );
  angle.addEventListener("input", () => {
    root.querySelector<HTMLOutputElement>("[data-angle]")!.value =
      `${angle.value}°`;
    resetCropForTransform();
  });
  output.addEventListener("change", () => {
    syncQuality();
    invalidate();
  });
  quality.addEventListener("input", () => {
    root.querySelector<HTMLOutputElement>("[data-quality]")!.value =
      `${quality.value}%`;
    invalidate();
  });
  root
    .querySelector<HTMLButtonElement>("[data-reset]")!
    .addEventListener("click", () => {
      if (!source) return;
      resetEditControls();
      resetCropForTransform();
    });
  save.addEventListener("click", () => void exportImage());
  download.addEventListener("click", () => {
    if (result && source)
      downloadBlob(
        result,
        `${source.file.name.replace(/\.[^.]+$/, "")}-cropped.${resultExtension}`,
      );
  });
  wrap.addEventListener("pointerdown", (event) => {
    if (!source || !crop || event.target !== canvas) return;
    const rect = canvas.getBoundingClientRect();
    const bounds = transformedSize();
    drag = {
      x: ((event.clientX - rect.left) * bounds.width) / rect.width,
      y: ((event.clientY - rect.top) * bounds.height) / rect.height,
      crop: { ...crop },
    };
    canvas.setPointerCapture(event.pointerId);
  });
  wrap.addEventListener("pointermove", (event) => {
    if (!source || !drag) return;
    const rect = canvas.getBoundingClientRect();
    const bounds = transformedSize();
    const x = ((event.clientX - rect.left) * bounds.width) / rect.width;
    const y = ((event.clientY - rect.top) * bounds.height) / rect.height;
    setCrop({
      ...drag.crop,
      x: drag.crop.x + x - drag.x,
      y: drag.crop.y + y - drag.y,
    });
  });
  const stopDrag = () => {
    drag = undefined;
  };
  wrap.addEventListener("pointerup", stopDrag);
  wrap.addEventListener("pointercancel", stopDrag);
  ["dragenter", "dragover"].forEach((name) =>
    root.addEventListener(name, (event) => event.preventDefault()),
  );
  root.addEventListener("drop", (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) void load(file);
  });
  document.addEventListener("paste", (event) => {
    const file = Array.from(event.clipboardData?.files ?? []).find((entry) =>
      INPUT_TYPES.has(entry.type),
    );
    if (file) void load(file);
  });
  window.addEventListener("resize", render);
  window.addEventListener(
    "pagehide",
    () => {
      revision += 1;
      revokePending();
      revokeResult();
    },
    { once: true },
  );
  syncQuality();
  state(copy.ready);
}

document.querySelectorAll<HTMLElement>("[data-image-crop]").forEach(init);
