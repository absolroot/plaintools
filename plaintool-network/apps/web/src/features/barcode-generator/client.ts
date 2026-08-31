import {
  barcodeFormatSpecs,
  BarcodeInputError,
  BarcodeOptionError,
  type BarcodeFormat,
  validateBarcodeOptions,
  validateBarcodeValue,
} from "@plaintool/barcode-core";
import JsBarcode from "jsbarcode";
import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { BarcodeGeneratorCopy } from "./contract";
import { barcodeLibraryFormats, parseSvgLength } from "./rendering";

const AUTO_RUN_DELAY = 120;

function fill(template: string, values: Record<string, string>): string {
  return template.replace(
    /\{(\w+)\}/gu,
    (_, key: string) => values[key] ?? `{${key}}`,
  );
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<BarcodeGeneratorCopy>(root);
  const format = root.querySelector<HTMLSelectElement>("[data-format]")!;
  const input = root.querySelector<HTMLInputElement>("[data-value]")!;
  const formatHint = root.querySelector<HTMLElement>("[data-format-hint]")!;
  const moduleWidth = root.querySelector<HTMLSelectElement>(
    "[data-module-width]",
  )!;
  const height = root.querySelector<HTMLSelectElement>("[data-height]")!;
  const margin = root.querySelector<HTMLSelectElement>("[data-margin]")!;
  const displayValue = root.querySelector<HTMLInputElement>(
    "[data-display-value]",
  )!;
  const lineColor = root.querySelector<HTMLInputElement>("[data-line-color]")!;
  const background = root.querySelector<HTMLInputElement>("[data-background]")!;
  const lineColorValue = root.querySelector<HTMLOutputElement>(
    "[data-line-color-value]",
  )!;
  const backgroundValue = root.querySelector<HTMLOutputElement>(
    "[data-background-value]",
  )!;
  const svg = root.querySelector<SVGSVGElement>("[data-svg]")!;
  const canvas = root.querySelector<HTMLCanvasElement>("[data-canvas]")!;
  const placeholder = root.querySelector<HTMLElement>(
    "[data-preview-placeholder]",
  )!;
  const pngButton = root.querySelector<HTMLButtonElement>(
    "[data-download-png]",
  )!;
  const svgButton = root.querySelector<HTMLButtonElement>(
    "[data-download-svg]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  let timer = 0;
  let revision = 0;
  let committedRevision = -1;
  let serializedSvg = "";

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const currentFormat = () => format.value as BarcodeFormat;

  function clearInvalid(): void {
    root
      .querySelectorAll<HTMLElement>('[aria-invalid="true"]')
      .forEach((control) => control.removeAttribute("aria-invalid"));
  }

  function invalidateResult(): void {
    committedRevision = -1;
    serializedSvg = "";
    svg.replaceChildren();
    svg.setAttribute("hidden", "");
    canvas.width = 0;
    canvas.height = 0;
    pngButton.disabled = true;
    svgButton.disabled = true;
    placeholder.hidden = false;
    root.classList.remove("has-barcode-result");
  }

  function updateFormatContext(): void {
    const selected = currentFormat();
    const option = copy.formatOptions[selected];
    const spec = barcodeFormatSpecs[selected];
    input.placeholder = option.example;
    input.maxLength = spec.maxLength;
    input.inputMode = spec.numeric ? "numeric" : "text";
    formatHint.textContent = option.hint;
  }

  function markError(error: unknown): void {
    if (error instanceof BarcodeInputError) {
      input.setAttribute("aria-invalid", "true");
      const errorCopy =
        error.code === "digits-only"
          ? copy.errors.digitsOnly
          : error.code === "invalid-character"
            ? copy.errors.invalidCharacter
            : error.code === "wrong-length"
              ? copy.errors.wrongLength
              : error.code === "invalid-check-digit"
                ? copy.errors.invalidCheckDigit
                : error.code === "input-too-long"
                  ? copy.errors.tooLong
                  : copy.errors.generationFailed;
      setStatus(errorCopy, "error");
      return;
    }
    if (error instanceof BarcodeOptionError) {
      const control =
        error.field === "moduleWidth"
          ? moduleWidth
          : error.field === "height"
            ? height
            : error.field === "margin"
              ? margin
              : error.field === "background"
                ? background
                : lineColor;
      control.setAttribute("aria-invalid", "true");
      if (error.code === "low-contrast") {
        lineColor.setAttribute("aria-invalid", "true");
        background.setAttribute("aria-invalid", "true");
      }
      setStatus(
        error.code === "invalid-color"
          ? copy.errors.invalidColor
          : error.code === "low-contrast"
            ? copy.errors.lowContrast
            : copy.errors.invalidOption,
        "error",
      );
      return;
    }
    setStatus(copy.errors.generationFailed, "error");
  }

  function generate(runRevision: number): void {
    if (runRevision !== revision) return;
    try {
      const value = validateBarcodeValue(currentFormat(), input.value);
      const options = validateBarcodeOptions({
        moduleWidth: Number(moduleWidth.value),
        height: Number(height.value),
        margin: Number(margin.value),
        displayValue: displayValue.checked,
        lineColor: lineColor.value,
        background: background.value,
      });
      let valid = true;
      const renderOptions = {
        format: barcodeLibraryFormats[value.format],
        width: options.moduleWidth,
        height: options.height,
        margin: options.margin,
        displayValue: options.displayValue,
        lineColor: options.lineColor,
        background: options.background,
        font: "monospace",
        fontSize: 18,
        textMargin: 4,
        valid: (nextValid: boolean) => {
          valid = nextValid;
        },
      };
      JsBarcode(svg, value.encodedValue, renderOptions);
      JsBarcode(canvas, value.encodedValue, renderOptions);
      if (!valid || runRevision !== revision) {
        throw new Error("barcode-render-invalid");
      }
      const width = svg.getAttribute("width");
      const renderedHeight = svg.getAttribute("height");
      const viewBoxWidth = parseSvgLength(width);
      const viewBoxHeight = parseSvgLength(renderedHeight);
      if (viewBoxWidth && viewBoxHeight) {
        svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      }
      svg.setAttribute("role", "img");
      svg.setAttribute(
        "aria-label",
        fill(copy.previewAriaTemplate, {
          format: copy.formatOptions[value.format].label,
          value: value.encodedValue,
        }),
      );
      serializedSvg = new XMLSerializer().serializeToString(svg);
      committedRevision = revision;
      svg.removeAttribute("hidden");
      placeholder.hidden = true;
      pngButton.disabled = false;
      svgButton.disabled = false;
      root.classList.add("has-barcode-result");
      setStatus(
        value.checkDigitAdded
          ? fill(copy.checkDigitAdded, {
              digit: value.encodedValue.at(-1) ?? "",
              value: value.encodedValue,
            })
          : copy.generated,
        "success",
      );
    } catch (error) {
      invalidateResult();
      markError(error);
    }
  }

  function scheduleGeneration(): void {
    window.clearTimeout(timer);
    revision += 1;
    clearInvalid();
    invalidateResult();
    if (!input.value) {
      setStatus(copy.ready);
      return;
    }
    const runRevision = revision;
    timer = window.setTimeout(() => generate(runRevision), AUTO_RUN_DELAY);
  }

  format.addEventListener("change", () => {
    updateFormatContext();
    scheduleGeneration();
  });
  input.addEventListener("input", scheduleGeneration);
  [moduleWidth, height, margin, displayValue].forEach((control) =>
    control.addEventListener("change", scheduleGeneration),
  );
  [lineColor, background].forEach((control) =>
    control.addEventListener("input", () => {
      lineColorValue.value = lineColor.value;
      backgroundValue.value = background.value;
      scheduleGeneration();
    }),
  );
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    input.value = "";
    scheduleGeneration();
    input.focus();
  });

  pngButton.addEventListener("click", () => {
    if (committedRevision !== revision || pngButton.disabled) return;
    const downloadRevision = committedRevision;
    canvas.toBlob((blob) => {
      if (downloadRevision !== revision || committedRevision !== revision)
        return;
      if (!blob) {
        setStatus(copy.errors.downloadFailed, "error");
        return;
      }
      downloadBlob(blob, `barcode-${currentFormat()}.png`);
    }, "image/png");
  });

  svgButton.addEventListener("click", () => {
    if (
      committedRevision !== revision ||
      svgButton.disabled ||
      !serializedSvg
    ) {
      return;
    }
    downloadBlob(
      new Blob([serializedSvg], { type: "image/svg+xml;charset=utf-8" }),
      `barcode-${currentFormat()}.svg`,
    );
  });

  updateFormatContext();
}

document
  .querySelectorAll<HTMLElement>("[data-barcode-generator]")
  .forEach(init);
