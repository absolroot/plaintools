import { downloadBlob, setToolStatus } from "../../scripts/shared/tool-dom";
import type { CropRect, ImageCropClientCopy } from "./contract";
import { clampCrop, cropDimensionsValid, cropForRatio } from "./core";

const MAX_BYTES = 50 * 1024 * 1024;
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
  let resultUrl = "";
  let drag: { x: number; y: number; crop: CropRect } | undefined;
  const state = (
    message: string,
    kind: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, kind);
  const revoke = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultUrl = "";
  };
  const resetResult = () => {
    revoke();
    result = undefined;
    resultImage.hidden = true;
    resultImage.removeAttribute("src");
    download.hidden = true;
    download.disabled = true;
    save.hidden = false;
  };
  const sync = () => {
    if (!source || !crop) return;
    crop = clampCrop(crop, source.width, source.height);
    xInput.value = String(crop.x);
    yInput.value = String(crop.y);
    widthInput.value = String(crop.width);
    heightInput.value = String(crop.height);
    const canvasRect = canvas.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    selection.style.left = `${canvasRect.left - wrapRect.left + (crop.x / source.width) * canvasRect.width}px`;
    selection.style.top = `${canvasRect.top - wrapRect.top + (crop.y / source.height) * canvasRect.height}px`;
    selection.style.width = `${(crop.width / source.width) * canvasRect.width}px`;
    selection.style.height = `${(crop.height / source.height) * canvasRect.height}px`;
    selection.hidden = false;
    save.disabled = !cropDimensionsValid(crop);
  };
  const render = () => {
    if (!source) return;
    const rect = wrap.getBoundingClientRect();
    const scale = Math.min(
      (rect.width - 28) / source.width,
      (rect.height - 28) / source.height,
      1,
    );
    canvas.width = source.width;
    canvas.height = source.height;
    canvas.style.width = `${Math.max(1, source.width * scale)}px`;
    canvas.style.height = `${Math.max(1, source.height * scale)}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source.image, 0, 0);
    sync();
  };
  const invalidate = () => {
    resetResult();
    sync();
    state(copy.ready);
  };
  const setCrop = (next: CropRect) => {
    if (!source) return;
    crop = clampCrop(next, source.width, source.height);
    invalidate();
  };
  const load = async (file: File) => {
    resetResult();
    if (
      !file.type.startsWith("image/") ||
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
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    try {
      await image.decode();
    } catch {
      URL.revokeObjectURL(url);
      state(copy.decodeFailed, "error");
      return;
    }
    URL.revokeObjectURL(url);
    if (image.naturalWidth * image.naturalHeight > 40_000_000) {
      state(copy.dimensionsTooLarge, "error");
      return;
    }
    source = {
      file,
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
    crop = { x: 0, y: 0, width: source.width, height: source.height };
    rotation = 0;
    flipX = false;
    flipY = false;
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
    state(copy.working, "working");
    save.disabled = true;
    try {
      const radians = (Number(angle.value) * Math.PI) / 180;
      const quarter = (((rotation / 90) % 4) + 4) % 4;
      const rotated =
        quarter % 2 ? { width: source.height, height: source.width } : source;
      const temp = document.createElement("canvas");
      temp.width = rotated.width;
      temp.height = rotated.height;
      const t = temp.getContext("2d")!;
      t.translate(temp.width / 2, temp.height / 2);
      t.rotate((rotation * Math.PI) / 180 + radians);
      t.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      t.drawImage(source.image, -source.width / 2, -source.height / 2);
      const out = document.createElement("canvas");
      out.width = crop.width;
      out.height = crop.height;
      out
        .getContext("2d")!
        .drawImage(
          temp,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height,
        );
      const mime =
        output.value === "jpg" ? "image/jpeg" : `image/${output.value}`;
      const blob = await new Promise<Blob | null>((resolve) =>
        out.toBlob(resolve, mime, Number(quality.value) / 100),
      );
      if (!blob) throw new Error("encode");
      result = blob;
      resultUrl = URL.createObjectURL(blob);
      resultImage.src = resultUrl;
      resultImage.hidden = false;
      save.hidden = true;
      download.hidden = false;
      download.disabled = false;
      state(copy.complete, "success");
    } catch {
      state(copy.encodeFailed, "error");
      save.disabled = false;
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
    source = undefined;
    crop = undefined;
    canvas.hidden = true;
    selection.hidden = true;
    empty.hidden = false;
    settings.disabled = true;
    clear.disabled = true;
    save.disabled = true;
    root.querySelector<HTMLElement>("[data-file-name]")!.textContent =
      copy.dropImage;
    resetResult();
    state(copy.ready);
  });
  ratio.addEventListener("change", () => {
    if (source)
      setCrop(
        cropForRatio(
          source.width,
          source.height,
          Number(ratio.value) || undefined,
        ),
      );
  });
  numberInputs.forEach((input) =>
    input.addEventListener("input", () => {
      if (source)
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
      invalidate();
    }),
  );
  root.querySelectorAll<HTMLButtonElement>("[data-flip]").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.flip === "x") flipX = !flipX;
      else flipY = !flipY;
      invalidate();
    }),
  );
  angle.addEventListener("input", () => {
    root.querySelector<HTMLOutputElement>("[data-angle]")!.value =
      `${angle.value}°`;
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
      rotation = 0;
      flipX = false;
      flipY = false;
      angle.value = "0";
      ratio.value = "";
      setCrop({ x: 0, y: 0, width: source.width, height: source.height });
    });
  save.addEventListener("click", () => void exportImage());
  download.addEventListener("click", () => {
    if (result && source)
      downloadBlob(
        result,
        `${source.file.name.replace(/\.[^.]+$/, "")}-cropped.${output.value === "jpg" ? "jpg" : output.value}`,
      );
  });
  wrap.addEventListener("pointerdown", (event) => {
    if (!source || !crop || event.target !== canvas) return;
    const rect = canvas.getBoundingClientRect();
    drag = {
      x: ((event.clientX - rect.left) * source.width) / rect.width,
      y: ((event.clientY - rect.top) * source.height) / rect.height,
      crop: { ...crop },
    };
    canvas.setPointerCapture(event.pointerId);
  });
  wrap.addEventListener("pointermove", (event) => {
    if (!source || !drag) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * source.width) / rect.width;
    const y = ((event.clientY - rect.top) * source.height) / rect.height;
    setCrop({
      ...drag.crop,
      x: drag.crop.x + x - drag.x,
      y: drag.crop.y + y - drag.y,
    });
  });
  wrap.addEventListener("pointerup", () => {
    drag = undefined;
  });
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
      entry.type.startsWith("image/"),
    );
    if (file) void load(file);
  });
  window.addEventListener("resize", render);
  window.addEventListener("pagehide", revoke, { once: true });
  state(copy.ready);
}
document.querySelectorAll<HTMLElement>("[data-image-crop]").forEach(init);
