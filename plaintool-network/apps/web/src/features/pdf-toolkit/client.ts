import {
  PDF_LIMITS,
  PdfRangeError,
  createFixedPageGroups,
  parsePageGroups,
  parsePageSelection,
  pdfFileStem,
  type PdfMargin,
  type PdfOrientation,
  type PdfPageSize,
} from "@plaintool/pdf-core";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  CompressionPreset,
  PdfToolkitClientCopy,
  PdfWorkerReply,
  PdfWorkerRequest,
  RasterFormat,
  SplitMode,
  SplitRule,
} from "./contract";
import { decodeImage, openPdf, renderPdfPage } from "./pdf-render";
import { isPdfToolId, type PdfToolId } from "./modes";

type PdfEntry = {
  id: number;
  kind: "pdf";
  file: File;
  bytes: ArrayBuffer;
  document: PDFDocumentProxy;
  destroy: () => Promise<void>;
  pageCount: number;
};

type ImageEntry = {
  id: number;
  kind: "image";
  file: File;
  bytes: ArrayBuffer;
  mime: "image/jpeg" | "image/png";
  width: number;
  height: number;
  previewUrl: string;
};

type FileEntry = PdfEntry | ImageEntry;

type ResultFile = {
  name: string;
  blob: Blob;
  previewUrl?: string;
  dimensions?: string;
};

function formatBytes(value: number, locale: string): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024)
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1024)} KB`;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value / (1024 * 1024))} MB`;
}

function rangeExpression(pages: number[]): string {
  if (pages.length === 0) return "";
  const sorted = [...new Set(pages)].sort((left, right) => left - right);
  const tokens: string[] = [];
  let start = sorted[0]!;
  let end = start;
  for (let index = 1; index <= sorted.length; index += 1) {
    const value = sorted[index];
    if (value === end + 1) {
      end = value;
      continue;
    }
    tokens.push(start === end ? `${start}` : `${start}-${end}`);
    if (value !== undefined) start = end = value;
  }
  return tokens.join(", ");
}

function isPasswordError(error: unknown): boolean {
  const name = error instanceof Error ? error.name : "";
  const message = error instanceof Error ? error.message : "";
  return /password|encrypt/iu.test(`${name} ${message}`);
}

function initPdfToolkit(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const modeValue = root.dataset.mode;
  if (!modeValue || !isPdfToolId(modeValue)) return;
  const mode: PdfToolId = modeValue;
  const locale = root.dataset.locale ?? "en";
  const copy = readClientCopy<PdfToolkitClientCopy>(root);

  const dropZone = root.querySelector<HTMLElement>("[data-drop-zone]")!;
  const openButton =
    root.querySelector<HTMLButtonElement>("[data-open-files]")!;
  const fileInput = root.querySelector<HTMLInputElement>("[data-file-input]")!;
  const editor = root.querySelector<HTMLElement>("[data-editor]")!;
  const addFilesButton =
    root.querySelector<HTMLButtonElement>("[data-add-files]")!;
  const fileList = root.querySelector<HTMLElement>("[data-file-list]")!;
  const fileTemplate = root.querySelector<HTMLTemplateElement>(
    "[data-file-template]",
  )!;
  const pageSelection = root.querySelector<HTMLElement>(
    "[data-page-selection]",
  )!;
  const pageGrid = root.querySelector<HTMLElement>("[data-page-grid]")!;
  const pageSelectionCount = root.querySelector<HTMLElement>(
    "[data-page-selection-count]",
  )!;
  const selectAllButton =
    root.querySelector<HTMLButtonElement>("[data-select-all]")!;
  const clearSelectionButton = root.querySelector<HTMLButtonElement>(
    "[data-clear-selection]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const runButton = root.querySelector<HTMLButtonElement>("[data-run]")!;
  const clearButton = root.querySelector<HTMLButtonElement>("[data-clear]")!;
  const cancelButton = root.querySelector<HTMLButtonElement>("[data-cancel]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const downloadLabel = root.querySelector<HTMLElement>(
    "[data-download-label]",
  )!;
  const progressWrap = root.querySelector<HTMLElement>("[data-progress-wrap]")!;
  const progress = root.querySelector<HTMLProgressElement>("[data-progress]")!;
  const progressLabel = root.querySelector<HTMLElement>(
    "[data-progress-label]",
  )!;
  const result = root.querySelector<HTMLElement>("[data-result]")!;
  const resultFacts = root.querySelector<HTMLElement>("[data-result-facts]")!;
  const resultFiles = root.querySelector<HTMLElement>("[data-result-files]")!;
  const rasterWarning = root.querySelector<HTMLElement>(
    "[data-raster-warning]",
  );
  const extractOptions = root.querySelector<HTMLElement>(
    "[data-extract-options]",
  );
  const documentSplitOptions = root.querySelector<HTMLElement>(
    "[data-document-split-options]",
  );
  const fixedRule = root.querySelector<HTMLElement>("[data-fixed-rule]");
  const customRule = root.querySelector<HTMLElement>("[data-custom-rule]");
  const extractRange = root.querySelector<HTMLInputElement>(
    "[data-extract-range]",
  );
  const pagesPerFile = root.querySelector<HTMLInputElement>(
    "[data-pages-per-file]",
  );
  const customRanges = root.querySelector<HTMLInputElement>(
    "[data-custom-ranges]",
  );
  const imageRange = root.querySelector<HTMLInputElement>("[data-image-range]");
  const imageFormat = root.querySelector<HTMLSelectElement>(
    "[data-image-format]",
  );
  const imageDpi = root.querySelector<HTMLSelectElement>("[data-image-dpi]");
  const imageQuality = root.querySelector<HTMLInputElement>(
    "[data-image-quality]",
  );
  const imageQualityOutput = root.querySelector<HTMLOutputElement>(
    "[data-image-quality-output]",
  );
  const qualityControl = root.querySelector<HTMLElement>(
    "[data-quality-control]",
  );
  const pageSize = root.querySelector<HTMLSelectElement>("[data-page-size]");
  const orientation =
    root.querySelector<HTMLSelectElement>("[data-orientation]");
  const margin = root.querySelector<HTMLSelectElement>("[data-margin]");

  let entries: FileEntry[] = [];
  let nextEntryId = 1;
  let revision = 0;
  let worker: Worker | undefined;
  let workerTimer: number | undefined;
  let primaryResult: Blob | undefined;
  let primaryResultName = "";
  let currentResults: ResultFile[] = [];
  let pageObserver: IntersectionObserver | undefined;
  let running = false;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const updateProgress = (completed: number, total: number) => {
    progressWrap.hidden = false;
    progress.max = Math.max(1, total);
    progress.value = Math.min(total, completed);
    progressLabel.textContent = `${copy.progress}: ${completed}/${total}`;
  };

  const stopWorker = () => {
    if (workerTimer !== undefined) {
      window.clearTimeout(workerTimer);
      workerTimer = undefined;
    }
    worker?.terminate();
    worker = undefined;
  };

  const revokeResults = () => {
    for (const file of currentResults) {
      if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
    }
    currentResults = [];
  };

  const invalidateResult = () => {
    primaryResult = undefined;
    primaryResultName = "";
    revokeResults();
    result.hidden = true;
    resultFacts.replaceChildren();
    resultFiles.replaceChildren();
    downloadButton.hidden = true;
    downloadButton.disabled = true;
    runButton.hidden = false;
  };

  const cancelActive = (showReady = false) => {
    revision += 1;
    stopWorker();
    if (running) {
      running = false;
      progressWrap.hidden = true;
      cancelButton.hidden = true;
      runButton.disabled = !canRun();
      clearButton.disabled = entries.length === 0;
      if (showReady) setStatus(copy.ready);
    }
  };

  const canRun = () => {
    if (running) return false;
    if (mode === "merge-pdf") return entries.length >= 2;
    return entries.length >= 1;
  };

  const updateActions = () => {
    editor.hidden = entries.length === 0;
    dropZone.hidden = entries.length > 0;
    addFilesButton.hidden = !(mode === "merge-pdf" || mode === "image-to-pdf");
    clearButton.disabled = entries.length === 0 || running;
    runButton.disabled = !canRun();
  };

  const addFact = (label: string, value: string) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    wrapper.append(term, description);
    resultFacts.append(wrapper);
  };

  const renderResultFiles = () => {
    resultFiles.replaceChildren();
    for (const file of currentResults) {
      const card = document.createElement("article");
      card.className = "pdf-result-file";
      if (file.previewUrl) {
        const image = document.createElement("img");
        image.src = file.previewUrl;
        image.alt = "";
        card.append(image);
      } else {
        const placeholder = document.createElement("span");
        placeholder.className = "pdf-thumbnail";
        placeholder.textContent = "PDF";
        card.append(placeholder);
      }
      const text = document.createElement("span");
      const name = document.createElement("strong");
      const facts = document.createElement("small");
      name.textContent = file.name;
      facts.textContent = [file.dimensions, formatBytes(file.blob.size, locale)]
        .filter(Boolean)
        .join(" · ");
      text.append(name, facts);
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "↓";
      button.setAttribute("aria-label", `${copy.downloadImage}: ${file.name}`);
      button.addEventListener("click", () =>
        downloadBlob(file.blob, file.name),
      );
      card.append(text, button);
      resultFiles.append(card);
    }
  };

  const completeResult = (options: {
    primary: Blob;
    primaryName: string;
    files?: ResultFile[];
    facts?: Array<[string, string]>;
    label?: string;
  }) => {
    running = false;
    primaryResult = options.primary;
    primaryResultName = options.primaryName;
    currentResults = options.files ?? [];
    resultFacts.replaceChildren();
    for (const [label, value] of options.facts ?? []) addFact(label, value);
    renderResultFiles();
    result.hidden = false;
    progressWrap.hidden = true;
    cancelButton.hidden = true;
    runButton.hidden = true;
    runButton.disabled = false;
    clearButton.disabled = false;
    downloadLabel.textContent = options.label ?? copy.downloadPdf;
    downloadButton.hidden = false;
    downloadButton.disabled = false;
    setStatus(copy.complete, "success");
  };

  const workerTransferables = (request: PdfWorkerRequest): Transferable[] => {
    switch (request.operation) {
      case "preserve":
        return [request.input];
      case "merge":
        return request.inputs;
      case "split":
        return [request.input];
      case "images-to-pdf":
        return request.images.map((image) => image.bytes);
      case "raster-pages-to-pdf":
        return request.pages.map((page) => page.bytes);
      case "zip":
        return request.files.map((file) => file.bytes);
    }
  };

  const runWorker = (
    request: PdfWorkerRequest,
    onProgress?: (completed: number, total: number) => void,
  ): Promise<ArrayBuffer[]> =>
    new Promise((resolve, reject) => {
      stopWorker();
      worker = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });
      worker.addEventListener(
        "message",
        (event: MessageEvent<PdfWorkerReply>) => {
          if (event.data.id !== request.id || request.id !== revision) return;
          if (event.data.kind === "progress") {
            onProgress?.(event.data.completed, event.data.total);
            return;
          }
          stopWorker();
          if (event.data.kind === "result") resolve(event.data.outputs);
          else reject(new Error(event.data.error));
        },
      );
      worker.addEventListener("error", () => {
        if (request.id !== revision) return;
        stopWorker();
        reject(new Error("processing-failed"));
      });
      worker.postMessage(request, workerTransferables(request));
      workerTimer = window.setTimeout(() => {
        if (request.id !== revision) return;
        stopWorker();
        reject(new Error("processing-failed"));
      }, 300_000);
    });

  const clearEntries = () => {
    cancelActive();
    pageObserver?.disconnect();
    pageObserver = undefined;
    for (const entry of entries) {
      if (entry.kind === "pdf") void entry.destroy();
      else URL.revokeObjectURL(entry.previewUrl);
    }
    entries = [];
    fileInput.value = "";
    fileList.replaceChildren();
    pageGrid.replaceChildren();
    pageSelection.hidden = true;
    invalidateResult();
    progressWrap.hidden = true;
    updateActions();
    setStatus(copy.ready);
  };

  const pageFacts = (entry: FileEntry) =>
    entry.kind === "pdf"
      ? `${entry.pageCount} ${entry.pageCount === 1 ? copy.page : copy.pages} · ${formatBytes(entry.file.size, locale)}`
      : `${entry.width} × ${entry.height} · ${formatBytes(entry.file.size, locale)}`;

  const renderPdfThumbnail = async (
    entry: PdfEntry,
    canvas: HTMLCanvasElement,
    pageNumber = 1,
    targetDpi = 24,
  ) => {
    try {
      await renderPdfPage({
        document: entry.document,
        pageNumber,
        dpi: targetDpi,
        format: "image/png",
        targetCanvas: canvas,
      });
      canvas.dataset.rendered = "true";
      canvas.nextElementSibling?.replaceChildren();
    } catch {
      canvas.nextElementSibling?.replaceChildren("PDF");
    }
  };

  const moveEntry = (from: number, to: number) => {
    if (to < 0 || to >= entries.length || from === to) return;
    cancelActive();
    invalidateResult();
    const [entry] = entries.splice(from, 1);
    if (!entry) return;
    entries.splice(to, 0, entry);
    renderFileCards();
    setStatus(copy.ready);
  };

  const removeEntry = (index: number) => {
    cancelActive();
    invalidateResult();
    const [entry] = entries.splice(index, 1);
    if (entry?.kind === "pdf") void entry.destroy();
    if (entry?.kind === "image") URL.revokeObjectURL(entry.previewUrl);
    renderFileCards();
    if (mode === "split-pdf" && entries[0]?.kind === "pdf") {
      setupSplitPages(entries[0]);
    }
    updateActions();
    setStatus(copy.ready);
  };

  const renderFileCards = () => {
    fileList.replaceChildren();
    entries.forEach((entry, index) => {
      const fragment = fileTemplate.content.cloneNode(true) as DocumentFragment;
      const card = fragment.querySelector<HTMLElement>(".pdf-file-card")!;
      const canvas = fragment.querySelector<HTMLCanvasElement>("canvas")!;
      const placeholder = fragment.querySelector<HTMLElement>(
        ".pdf-thumbnail span",
      )!;
      const name = fragment.querySelector<HTMLElement>(
        ".pdf-file-copy strong",
      )!;
      const facts = fragment.querySelector<HTMLElement>(
        ".pdf-file-copy small",
      )!;
      const up = fragment.querySelector<HTMLButtonElement>("[data-move-up]")!;
      const down =
        fragment.querySelector<HTMLButtonElement>("[data-move-down]")!;
      const remove =
        fragment.querySelector<HTMLButtonElement>("[data-remove]")!;
      name.textContent = entry.file.name;
      facts.textContent = pageFacts(entry);
      up.setAttribute("aria-label", `${copy.moveUp}: ${entry.file.name}`);
      down.setAttribute("aria-label", `${copy.moveDown}: ${entry.file.name}`);
      remove.setAttribute("aria-label", `${copy.remove}: ${entry.file.name}`);
      up.disabled = index === 0;
      down.disabled = index === entries.length - 1;
      up.addEventListener("click", () => moveEntry(index, index - 1));
      down.addEventListener("click", () => moveEntry(index, index + 1));
      remove.addEventListener("click", () => removeEntry(index));
      const reorderable = mode === "merge-pdf" || mode === "image-to-pdf";
      card.draggable = reorderable;
      if (!reorderable) {
        up.hidden = true;
        down.hidden = true;
      }
      card.addEventListener("dragstart", (event) => {
        card.classList.add("is-dragging");
        event.dataTransfer?.setData("text/plain", String(index));
      });
      card.addEventListener("dragend", () =>
        card.classList.remove("is-dragging"),
      );
      card.addEventListener("dragover", (event) => event.preventDefault());
      card.addEventListener("drop", (event) => {
        event.preventDefault();
        const from = Number(event.dataTransfer?.getData("text/plain"));
        if (Number.isInteger(from)) moveEntry(from, index);
      });
      if (entry.kind === "pdf") {
        placeholder.textContent = "PDF";
        void renderPdfThumbnail(entry, canvas);
      } else {
        const context = canvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
          if (!context) return;
          const scale = Math.min(
            canvas.width / image.width,
            canvas.height / image.height,
          );
          const width = image.width * scale;
          const height = image.height * scale;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            image,
            (canvas.width - width) / 2,
            (canvas.height - height) / 2,
            width,
            height,
          );
          canvas.dataset.rendered = "true";
          placeholder.replaceChildren();
        };
        image.src = entry.previewUrl;
      }
      fileList.append(fragment);
    });
  };

  const updatePageSelection = (selected: number[]) => {
    const selectedSet = new Set(selected);
    for (const button of pageGrid.querySelectorAll<HTMLButtonElement>(
      ".pdf-page-card",
    )) {
      const page = Number(button.dataset.page);
      button.setAttribute("aria-pressed", String(selectedSet.has(page)));
    }
    pageSelectionCount.textContent = `${selected.length} / ${entries[0]?.kind === "pdf" ? entries[0].pageCount : 0} ${copy.pages}`;
  };

  const selectedPagesFromGrid = () =>
    [
      ...pageGrid.querySelectorAll<HTMLButtonElement>(
        '.pdf-page-card[aria-pressed="true"]',
      ),
    ]
      .map((button) => Number(button.dataset.page))
      .filter((page) => Number.isInteger(page));

  const setupSplitPages = (entry: PdfEntry) => {
    pageObserver?.disconnect();
    pageGrid.replaceChildren();
    pageSelection.hidden = false;
    const initialPages = Array.from(
      { length: entry.pageCount },
      (_, index) => index + 1,
    );
    if (extractRange) extractRange.value = rangeExpression(initialPages);
    if (customRanges) customRanges.value = rangeExpression(initialPages);
    updatePageSelection(initialPages);
    pageObserver = new IntersectionObserver(
      (observations) => {
        for (const observation of observations) {
          if (!observation.isIntersecting) continue;
          const button = observation.target as HTMLButtonElement;
          pageObserver?.unobserve(button);
          const canvas = button.querySelector<HTMLCanvasElement>("canvas")!;
          const page = Number(button.dataset.page);
          void renderPdfThumbnail(entry, canvas, page, 22);
        }
      },
      { root: pageGrid, rootMargin: "160px" },
    );
    for (let page = 1; page <= entry.pageCount; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pdf-page-card";
      button.dataset.page = String(page);
      button.setAttribute("aria-pressed", "true");
      button.setAttribute("aria-label", `${copy.page} ${page}`);
      const canvas = document.createElement("canvas");
      canvas.width = 86;
      canvas.height = 112;
      const label = document.createElement("span");
      label.textContent = `${copy.page} ${page}`;
      button.append(canvas, label);
      button.addEventListener("click", () => {
        cancelActive();
        invalidateResult();
        const selected = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", String(selected));
        const pages = selectedPagesFromGrid();
        if (extractRange) extractRange.value = rangeExpression(pages);
        updatePageSelection(pages);
        setStatus(copy.ready);
      });
      pageGrid.append(button);
      pageObserver.observe(button);
    }
    updatePageSelection(initialPages);
  };

  const addPdf = async (
    file: File,
    selectionRevision: number,
  ): Promise<boolean> => {
    if (
      file.size === 0 ||
      !(/\.pdf$/iu.test(file.name) || file.type === "application/pdf")
    ) {
      setStatus(copy.invalidPdf, "error");
      return false;
    }
    try {
      const bytes = await file.arrayBuffer();
      if (selectionRevision !== revision) return false;
      const openedPdf = await openPdf(bytes);
      const { document } = openedPdf;
      if (selectionRevision !== revision) {
        await openedPdf.destroy();
        return false;
      }
      if (document.numPages > PDF_LIMITS.copyPages) {
        await openedPdf.destroy();
        setStatus(copy.tooManyPages, "error");
        return false;
      }
      entries.push({
        id: nextEntryId++,
        kind: "pdf",
        file,
        bytes,
        document,
        destroy: openedPdf.destroy,
        pageCount: document.numPages,
      });
      return true;
    } catch (error) {
      setStatus(
        isPasswordError(error) ? copy.encryptedPdf : copy.invalidPdf,
        "error",
      );
      return false;
    }
  };

  const addImage = async (
    file: File,
    selectionRevision: number,
  ): Promise<boolean> => {
    if (file.size === 0 || !/^image\/(?:jpeg|png|webp)$/u.test(file.type)) {
      setStatus(copy.unsupportedImage, "error");
      return false;
    }
    try {
      const decoded = await decodeImage(file);
      if (selectionRevision !== revision) {
        URL.revokeObjectURL(decoded.previewUrl);
        return false;
      }
      entries.push({ id: nextEntryId++, kind: "image", file, ...decoded });
      return true;
    } catch {
      setStatus(copy.invalidImage, "error");
      return false;
    }
  };

  const selectFiles = async (files: File[]) => {
    cancelActive();
    invalidateResult();
    const multiple = mode === "merge-pdf" || mode === "image-to-pdf";
    if (!multiple) {
      for (const entry of entries) {
        if (entry.kind === "pdf") void entry.destroy();
        else URL.revokeObjectURL(entry.previewUrl);
      }
      entries = [];
    }
    const existingSize = entries.reduce(
      (sum, entry) => sum + entry.file.size,
      0,
    );
    const addedSize = files.reduce((sum, file) => sum + file.size, 0);
    if (existingSize + addedSize > PDF_LIMITS.totalInputBytes) {
      setStatus(copy.fileTooLarge, "error");
      updateActions();
      return;
    }
    const selectionRevision = revision;
    setStatus(copy.working, "working");
    let added = 0;
    for (const file of multiple ? files : files.slice(0, 1)) {
      const ok =
        mode === "image-to-pdf"
          ? await addImage(file, selectionRevision)
          : await addPdf(file, selectionRevision);
      if (selectionRevision !== revision) return;
      if (ok) added += 1;
    }
    if (added > 0) {
      renderFileCards();
      const first = entries[0];
      if (mode === "split-pdf" && first?.kind === "pdf") setupSplitPages(first);
      if (mode === "pdf-to-image" && first?.kind === "pdf" && imageRange) {
        imageRange.value = `1-${first.pageCount}`;
      }
      setStatus(copy.ready);
    }
    updateActions();
  };

  const rangeErrorMessage = (error: unknown) => {
    if (!(error instanceof PdfRangeError)) return copy.invalidRange;
    if (error.code === "empty-selection") return copy.emptySelection;
    if (error.code === "out-of-bounds") return copy.rangeOutOfBounds;
    if (error.code === "reversed-range") return copy.reversedRange;
    return copy.invalidRange;
  };

  const beginRun = () => {
    cancelActive();
    invalidateResult();
    running = true;
    const runRevision = revision;
    runButton.disabled = true;
    clearButton.disabled = true;
    cancelButton.hidden = false;
    setStatus(copy.working, "working");
    updateProgress(0, 1);
    return runRevision;
  };

  const failRun = (runRevision: number, message: string) => {
    if (runRevision !== revision) return;
    running = false;
    stopWorker();
    progressWrap.hidden = true;
    cancelButton.hidden = true;
    clearButton.disabled = entries.length === 0;
    runButton.disabled = !canRun();
    setStatus(message, "error");
  };

  const runCompress = async (runRevision: number) => {
    const entry = entries[0] as PdfEntry;
    const preset = root.querySelector<HTMLInputElement>(
      'input[name="compression-preset"]:checked',
    )?.value as CompressionPreset;
    try {
      let output: ArrayBuffer;
      if (preset === "preserve") {
        [output] = await runWorker({
          id: runRevision,
          operation: "preserve",
          input: entry.bytes.slice(0),
        });
      } else {
        if (entry.pageCount > PDF_LIMITS.rasterPages)
          throw new Error("raster-limit");
        const dpi = preset === "small" ? 110 : 144;
        const quality = preset === "small" ? 0.62 : 0.78;
        const pages: Array<{
          bytes: ArrayBuffer;
          width: number;
          height: number;
        }> = [];
        let pixels = 0;
        for (
          let pageNumber = 1;
          pageNumber <= entry.pageCount;
          pageNumber += 1
        ) {
          if (runRevision !== revision) return;
          const rendered = await renderPdfPage({
            document: entry.document,
            pageNumber,
            dpi,
            format: "image/jpeg",
            quality,
          });
          pixels += rendered.pixels;
          if (pixels > PDF_LIMITS.rasterPixels) throw new Error("raster-limit");
          pages.push({
            bytes: await rendered.blob.arrayBuffer(),
            width: rendered.pageWidth,
            height: rendered.pageHeight,
          });
          updateProgress(pageNumber, entry.pageCount + 1);
        }
        [output] = await runWorker(
          { id: runRevision, operation: "raster-pages-to-pdf", pages },
          () => updateProgress(entry.pageCount + 1, entry.pageCount + 1),
        );
      }
      if (runRevision !== revision) return;
      const blob = new Blob([output!], { type: "application/pdf" });
      const difference = blob.size - entry.file.size;
      const percent = Math.round(
        (Math.abs(difference) / entry.file.size) * 100,
      );
      completeResult({
        primary: blob,
        primaryName: `${pdfFileStem(entry.file.name)}-compressed.pdf`,
        facts: [
          [copy.originalSize, formatBytes(entry.file.size, locale)],
          [copy.resultSize, formatBytes(blob.size, locale)],
          [difference <= 0 ? copy.smallerBy : copy.largerBy, `${percent}%`],
        ],
      });
      if (difference >= 0) setStatus(copy.noReduction, "success");
    } catch (error) {
      failRun(
        runRevision,
        error instanceof Error && error.message === "raster-limit"
          ? copy.tooManyRasterPages
          : isPasswordError(error)
            ? copy.encryptedPdf
            : copy.workerFailed,
      );
    }
  };

  const runMerge = async (runRevision: number) => {
    if (entries.length < 2) {
      failRun(runRevision, copy.minimumMergeFiles);
      return;
    }
    const pdfs = entries as PdfEntry[];
    try {
      const [output] = await runWorker(
        {
          id: runRevision,
          operation: "merge",
          inputs: pdfs.map((entry) => entry.bytes.slice(0)),
        },
        updateProgress,
      );
      if (runRevision !== revision) return;
      const blob = new Blob([output!], { type: "application/pdf" });
      completeResult({
        primary: blob,
        primaryName: "merged.pdf",
        facts: [
          [copy.selectedFiles, String(entries.length)],
          [
            copy.pages,
            String(pdfs.reduce((sum, entry) => sum + entry.pageCount, 0)),
          ],
          [copy.resultSize, formatBytes(blob.size, locale)],
        ],
      });
    } catch (error) {
      failRun(
        runRevision,
        isPasswordError(error) ? copy.encryptedPdf : copy.workerFailed,
      );
    }
  };

  const zipResults = async (
    runRevision: number,
    files: ResultFile[],
    zipName: string,
  ): Promise<{ blob: Blob; name: string }> => {
    if (files.length === 1)
      return { blob: files[0]!.blob, name: files[0]!.name };
    const buffers = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        bytes: await file.blob.arrayBuffer(),
      })),
    );
    const [zipped] = await runWorker({
      id: runRevision,
      operation: "zip",
      files: buffers,
    });
    return {
      blob: new Blob([zipped!], { type: "application/zip" }),
      name: zipName,
    };
  };

  const runSplit = async (runRevision: number) => {
    const entry = entries[0] as PdfEntry;
    try {
      const splitMode = root.querySelector<HTMLInputElement>(
        'input[name="split-mode"]:checked',
      )?.value as SplitMode;
      let groups: number[][];
      if (splitMode === "extract") {
        groups = [
          parsePageSelection(extractRange?.value ?? "", entry.pageCount),
        ];
      } else {
        const rule = root.querySelector<HTMLInputElement>(
          'input[name="split-rule"]:checked',
        )?.value as SplitRule;
        groups =
          rule === "fixed"
            ? createFixedPageGroups(
                entry.pageCount,
                Number(pagesPerFile?.value),
              )
            : parsePageGroups(customRanges?.value ?? "", entry.pageCount);
      }
      if (groups.some((group) => group.length === 0))
        throw new PdfRangeError("empty-selection");
      const outputs = await runWorker(
        {
          id: runRevision,
          operation: "split",
          input: entry.bytes.slice(0),
          groups,
        },
        updateProgress,
      );
      if (runRevision !== revision) return;
      const stem = pdfFileStem(entry.file.name);
      const files = outputs.map((output, index) => ({
        name:
          groups.length === 1
            ? `${stem}-pages.pdf`
            : `${stem}-part-${String(index + 1).padStart(2, "0")}.pdf`,
        blob: new Blob([output], { type: "application/pdf" }),
      }));
      const primary = await zipResults(runRevision, files, `${stem}-split.zip`);
      if (runRevision !== revision) return;
      completeResult({
        primary: primary.blob,
        primaryName: primary.name,
        files,
        label: files.length > 1 ? copy.downloadZip : copy.downloadPdf,
        facts: [
          [copy.resultFiles, String(files.length)],
          [
            copy.pages,
            String(groups.reduce((sum, group) => sum + group.length, 0)),
          ],
          [copy.resultSize, formatBytes(primary.blob.size, locale)],
        ],
      });
    } catch (error) {
      failRun(
        runRevision,
        error instanceof PdfRangeError
          ? rangeErrorMessage(error)
          : copy.workerFailed,
      );
    }
  };

  const runPdfToImages = async (runRevision: number) => {
    const entry = entries[0] as PdfEntry;
    try {
      const pages = parsePageSelection(
        imageRange?.value ?? "",
        entry.pageCount,
      );
      if (pages.length > PDF_LIMITS.rasterPages)
        throw new Error("raster-limit");
      const format = (imageFormat?.value ?? "jpg") as RasterFormat;
      const dpi = Number(imageDpi?.value ?? 144);
      const quality = Number(imageQuality?.value ?? 82) / 100;
      const digits = String(entry.pageCount).length;
      const stem = pdfFileStem(entry.file.name);
      const files: ResultFile[] = [];
      let pixels = 0;
      for (let index = 0; index < pages.length; index += 1) {
        if (runRevision !== revision) return;
        const pageNumber = pages[index]! + 1;
        const rendered = await renderPdfPage({
          document: entry.document,
          pageNumber,
          dpi,
          format: format === "jpg" ? "image/jpeg" : "image/png",
          quality,
        });
        pixels += rendered.pixels;
        if (pixels > PDF_LIMITS.rasterPixels) throw new Error("raster-limit");
        const name = `${stem}-page-${String(pageNumber).padStart(digits, "0")}.${format}`;
        files.push({
          name,
          blob: rendered.blob,
          previewUrl: URL.createObjectURL(rendered.blob),
          dimensions: `${rendered.canvas.width} × ${rendered.canvas.height}`,
        });
        updateProgress(index + 1, pages.length);
      }
      const primary = await zipResults(
        runRevision,
        files,
        `${stem}-images.zip`,
      );
      if (runRevision !== revision) return;
      completeResult({
        primary: primary.blob,
        primaryName: primary.name,
        files,
        label: files.length > 1 ? copy.downloadZip : copy.downloadImage,
        facts: [
          [copy.resultFiles, String(files.length)],
          [copy.outputFormat, format.toUpperCase()],
          [copy.resultSize, formatBytes(primary.blob.size, locale)],
        ],
      });
    } catch (error) {
      failRun(
        runRevision,
        error instanceof PdfRangeError
          ? rangeErrorMessage(error)
          : error instanceof Error && error.message === "raster-limit"
            ? copy.tooManyRasterPages
            : copy.renderFailed,
      );
    }
  };

  const runImagesToPdf = async (runRevision: number) => {
    const images = entries as ImageEntry[];
    try {
      const [output] = await runWorker(
        {
          id: runRevision,
          operation: "images-to-pdf",
          images: images.map((entry) => ({
            bytes: entry.bytes.slice(0),
            mime: entry.mime,
            width: entry.width,
            height: entry.height,
          })),
          pageSize: (pageSize?.value ?? "fit") as PdfPageSize,
          orientation: (orientation?.value ?? "auto") as PdfOrientation,
          margin: (margin?.value ?? "none") as PdfMargin,
        },
        updateProgress,
      );
      if (runRevision !== revision) return;
      const blob = new Blob([output!], { type: "application/pdf" });
      completeResult({
        primary: blob,
        primaryName: "images.pdf",
        facts: [
          [copy.pages, String(images.length)],
          [copy.resultSize, formatBytes(blob.size, locale)],
        ],
      });
    } catch {
      failRun(runRevision, copy.workerFailed);
    }
  };

  const run = () => {
    if (!canRun()) {
      setStatus(
        mode === "merge-pdf" ? copy.minimumMergeFiles : copy.emptySelection,
        "error",
      );
      return;
    }
    const runRevision = beginRun();
    const operations: Record<PdfToolId, (value: number) => Promise<void>> = {
      "compress-pdf": runCompress,
      "merge-pdf": runMerge,
      "split-pdf": runSplit,
      "pdf-to-image": runPdfToImages,
      "image-to-pdf": runImagesToPdf,
    };
    void operations[mode](runRevision);
  };

  const markOptionsChanged = () => {
    cancelActive();
    invalidateResult();
    runButton.disabled = !canRun();
    setStatus(copy.ready);
  };

  openButton.addEventListener("click", () => fileInput.click());
  addFilesButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const files = [...(fileInput.files ?? [])];
    fileInput.value = "";
    if (files.length > 0) void selectFiles(files);
  });
  clearButton.addEventListener("click", clearEntries);
  cancelButton.addEventListener("click", () => cancelActive(true));
  runButton.addEventListener("click", run);
  downloadButton.addEventListener("click", () => {
    if (primaryResult) downloadBlob(primaryResult, primaryResultName);
  });

  root
    .querySelectorAll<HTMLInputElement>('input[name="compression-preset"]')
    .forEach((input) =>
      input.addEventListener("change", () => {
        if (rasterWarning) rasterWarning.hidden = input.value === "preserve";
        markOptionsChanged();
      }),
    );
  root
    .querySelectorAll<HTMLInputElement>('input[name="split-mode"]')
    .forEach((input) =>
      input.addEventListener("change", () => {
        const isExtract = input.value === "extract" && input.checked;
        if (extractOptions) extractOptions.hidden = !isExtract;
        if (documentSplitOptions) documentSplitOptions.hidden = isExtract;
        markOptionsChanged();
      }),
    );
  root
    .querySelectorAll<HTMLInputElement>('input[name="split-rule"]')
    .forEach((input) =>
      input.addEventListener("change", () => {
        const isFixed = input.value === "fixed" && input.checked;
        if (fixedRule) fixedRule.hidden = !isFixed;
        if (customRule) customRule.hidden = isFixed;
        markOptionsChanged();
      }),
    );
  [extractRange, pagesPerFile, customRanges, imageRange].forEach((input) =>
    input?.addEventListener("input", markOptionsChanged),
  );
  extractRange?.addEventListener("input", () => {
    const entry = entries[0];
    if (entry?.kind !== "pdf") return;
    try {
      updatePageSelection(
        parsePageSelection(extractRange.value, entry.pageCount).map(
          (page) => page + 1,
        ),
      );
    } catch {
      // The localized validation message is shown only when the user runs.
    }
  });
  selectAllButton.addEventListener("click", () => {
    const entry = entries[0];
    if (entry?.kind !== "pdf") return;
    const pages = Array.from(
      { length: entry.pageCount },
      (_, index) => index + 1,
    );
    if (extractRange) extractRange.value = rangeExpression(pages);
    updatePageSelection(pages);
    markOptionsChanged();
  });
  clearSelectionButton.addEventListener("click", () => {
    if (extractRange) extractRange.value = "";
    updatePageSelection([]);
    markOptionsChanged();
  });
  imageFormat?.addEventListener("change", () => {
    const isJpg = imageFormat.value === "jpg";
    if (qualityControl) qualityControl.hidden = !isJpg;
    if (imageQuality) imageQuality.disabled = !isJpg;
    markOptionsChanged();
  });
  imageQuality?.addEventListener("input", () => {
    if (imageQualityOutput) imageQualityOutput.value = `${imageQuality.value}%`;
    markOptionsChanged();
  });
  imageDpi?.addEventListener("change", markOptionsChanged);
  pageSize?.addEventListener("change", () => {
    const fixed = pageSize.value !== "fit";
    if (orientation) orientation.disabled = !fixed;
    if (margin) margin.disabled = !fixed;
    markOptionsChanged();
  });
  orientation?.addEventListener("change", markOptionsChanged);
  margin?.addEventListener("change", markOptionsChanged);

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
    const files = [...((event as DragEvent).dataTransfer?.files ?? [])];
    if (files.length > 0) void selectFiles(files);
  });

  window.addEventListener("pagehide", () => {
    cancelActive();
    pageObserver?.disconnect();
    for (const entry of entries) {
      if (entry.kind === "pdf") void entry.destroy();
      else URL.revokeObjectURL(entry.previewUrl);
    }
    revokeResults();
  });

  updateActions();
}

document
  .querySelectorAll<HTMLElement>("[data-pdf-toolkit]")
  .forEach(initPdfToolkit);
