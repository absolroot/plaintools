import { downloadBlob, setToolStatus } from "../../scripts/shared/tool-dom";
import type { CropRect, ImageCropClientCopy } from "./contract";
import {
  MAX_CROP_EDGE,
  MAX_CROP_PIXELS,
  clampCrop,
  cropDimensionsValid,
  cropForRatio,
  perspectiveDimensions,
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

type Point = { x: number; y: number };

function drawImageTriangle(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  source: readonly [Point, Point, Point],
  destination: readonly [Point, Point, Point],
) {
  const [s0, s1, s2] = source;
  const [d0, d1, d2] = destination;
  const determinant =
    s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
  if (Math.abs(determinant) < 0.000001) return;
  const a =
    (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) /
    determinant;
  const b =
    (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) /
    determinant;
  const c =
    (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) /
    determinant;
  const d =
    (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) /
    determinant;
  const e = d0.x - a * s0.x - c * s0.y;
  const f = d0.y - b * s0.x - d * s0.y;
  context.save();
  context.beginPath();
  context.moveTo(d0.x, d0.y);
  context.lineTo(d1.x, d1.y);
  context.lineTo(d2.x, d2.y);
  context.closePath();
  context.clip();
  context.transform(a, b, c, d, e, f);
  context.drawImage(image, 0, 0);
  context.restore();
}

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
  const perspectiveX = root.querySelector<HTMLInputElement>(
    "[data-perspective-x-range]",
  )!;
  const perspectiveY = root.querySelector<HTMLInputElement>(
    "[data-perspective-y-range]",
  )!;
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
  let drag:
    | { x: number; y: number; crop: CropRect; handle?: string }
    | undefined;

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
  const perspectiveSize = () =>
    source
      ? perspectiveDimensions(
          source.width,
          source.height,
          Number(perspectiveX.value),
          Number(perspectiveY.value),
        )
      : { width: 1, height: 1 };
  const transformedSize = () =>
    source
      ? transformedDimensions(
          perspectiveSize().width,
          perspectiveSize().height,
          totalAngle(),
        )
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
    perspectiveX.value = "0";
    perspectiveY.value = "0";
    ratio.value = "";
    root.querySelector<HTMLOutputElement>("[data-angle]")!.value = "0°";
    root.querySelector<HTMLOutputElement>("[data-perspective-x]")!.value = "0";
    root.querySelector<HTMLOutputElement>("[data-perspective-y]")!.value = "0";
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
    const sourceImage = source;
    const bounds = transformedSize();
    const perspective = perspectiveSize();
    context.save();
    context.translate(offsetX, offsetY);
    context.scale(targetWidth / bounds.width, targetHeight / bounds.height);
    context.translate(bounds.width / 2, bounds.height / 2);
    context.rotate((totalAngle() * Math.PI) / 180);
    context.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    const horizontal = Number(perspectiveX.value) / 100;
    const vertical = Number(perspectiveY.value) / 100;
    if (horizontal === 0 && vertical === 0) {
      context.drawImage(
        sourceImage.image,
        -sourceImage.width / 2,
        -sourceImage.height / 2,
      );
    } else {
      const origin = { x: -perspective.width / 2, y: -perspective.height / 2 };
      const segments = 10;
      const pointAt = (u: number, v: number): Point => {
        const scaleX = 1 + vertical * (1 - v * 2);
        const scaleY = 1 + horizontal * (1 - u * 2);
        return {
          x:
            origin.x +
            perspective.width / 2 +
            (u - 0.5) * sourceImage.width * scaleX,
          y:
            origin.y +
            perspective.height / 2 +
            (v - 0.5) * sourceImage.height * scaleY,
        };
      };
      for (let row = 0; row < segments; row += 1) {
        for (let column = 0; column < segments; column += 1) {
          const u0 = column / segments;
          const u1 = (column + 1) / segments;
          const v0 = row / segments;
          const v1 = (row + 1) / segments;
          const s00 = {
            x: u0 * sourceImage.width,
            y: v0 * sourceImage.height,
          };
          const s10 = {
            x: u1 * sourceImage.width,
            y: v0 * sourceImage.height,
          };
          const s01 = {
            x: u0 * sourceImage.width,
            y: v1 * sourceImage.height,
          };
          const s11 = {
            x: u1 * sourceImage.width,
            y: v1 * sourceImage.height,
          };
          const d00 = pointAt(u0, v0);
          const d10 = pointAt(u1, v0);
          const d01 = pointAt(u0, v1);
          const d11 = pointAt(u1, v1);
          drawImageTriangle(
            context,
            sourceImage.image,
            [s00, s10, s11],
            [d00, d10, d11],
          );
          drawImageTriangle(
            context,
            sourceImage.image,
            [s00, s11, s01],
            [d00, d11, d01],
          );
        }
      }
    }
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
  [perspectiveX, perspectiveY].forEach((input) =>
    input.addEventListener("input", () => {
      root.querySelector<HTMLOutputElement>(
        input === perspectiveX
          ? "[data-perspective-x]"
          : "[data-perspective-y]",
      )!.value = input.value;
      resetCropForTransform();
    }),
  );
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
    if (!source || !crop) return;
    const handle = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-crop-handle]",
    )?.dataset.cropHandle;
    if (event.target !== canvas && !handle) return;
    const rect = canvas.getBoundingClientRect();
    const bounds = transformedSize();
    drag = {
      x: ((event.clientX - rect.left) * bounds.width) / rect.width,
      y: ((event.clientY - rect.top) * bounds.height) / rect.height,
      crop: { ...crop },
      handle,
    };
    wrap.setPointerCapture(event.pointerId);
  });
  wrap.addEventListener("pointermove", (event) => {
    if (!source || !drag) return;
    const rect = canvas.getBoundingClientRect();
    const bounds = transformedSize();
    const x = ((event.clientX - rect.left) * bounds.width) / rect.width;
    const y = ((event.clientY - rect.top) * bounds.height) / rect.height;
    const dx = x - drag.x;
    const dy = y - drag.y;
    if (!drag.handle) {
      setCrop({ ...drag.crop, x: drag.crop.x + dx, y: drag.crop.y + dy });
      return;
    }
    const next = { ...drag.crop };
    if (drag.handle.includes("w")) {
      next.x += dx;
      next.width -= dx;
    }
    if (drag.handle.includes("e")) next.width += dx;
    if (drag.handle.includes("n")) {
      next.y += dy;
      next.height -= dy;
    }
    if (drag.handle.includes("s")) next.height += dy;
    setCrop(next);
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
