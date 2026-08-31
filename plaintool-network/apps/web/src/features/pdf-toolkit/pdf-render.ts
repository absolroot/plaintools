import type { PDFDocumentProxy } from "pdfjs-dist";

type PdfJsModule = typeof import("pdfjs-dist");

let enginePromise: Promise<PdfJsModule> | undefined;

async function getEngine(): Promise<PdfJsModule> {
  enginePromise ??= Promise.all([
    import("pdfjs-dist"),
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]).then(([engine, worker]) => {
    engine.GlobalWorkerOptions.workerSrc = worker.default;
    return engine;
  });
  return enginePromise;
}

export type OpenedPdf = {
  document: PDFDocumentProxy;
  destroy: () => Promise<void>;
};

export async function openPdf(bytes: ArrayBuffer): Promise<OpenedPdf> {
  const engine = await getEngine();
  const loadingTask = engine.getDocument({
    data: new Uint8Array(bytes.slice(0)),
    useWorkerFetch: false,
  });
  return {
    document: await loadingTask.promise,
    destroy: () => loadingTask.destroy(),
  };
}

export async function renderPdfPage(options: {
  document: PDFDocumentProxy;
  pageNumber: number;
  dpi: number;
  format: "image/jpeg" | "image/png";
  quality?: number;
  targetCanvas?: HTMLCanvasElement;
}): Promise<{
  blob: Blob;
  canvas: HTMLCanvasElement;
  pageWidth: number;
  pageHeight: number;
  pixels: number;
}> {
  const page = await options.document.getPage(options.pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: options.dpi / 72 });
  const canvas = options.targetCanvas ?? document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d", {
    alpha: options.format === "image/png",
  });
  if (!context) throw new Error("canvas-unavailable");
  if (options.format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  await page.render({ canvas, canvasContext: context, viewport }).promise;
  page.cleanup();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("image-encode-failed")),
      options.format,
      options.quality,
    );
  });
  return {
    blob,
    canvas,
    pageWidth: baseViewport.width,
    pageHeight: baseViewport.height,
    pixels: canvas.width * canvas.height,
  };
}

export async function decodeImage(file: File): Promise<{
  bytes: ArrayBuffer;
  mime: "image/jpeg" | "image/png";
  width: number;
  height: number;
  previewUrl: string;
}> {
  const bitmap = await createImageBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;
  if (width < 1 || height < 1 || width * height > 80_000_000) {
    bitmap.close();
    throw new Error("invalid-image");
  }
  const previewUrl = URL.createObjectURL(file);
  if (file.type === "image/jpeg" || file.type === "image/png") {
    bitmap.close();
    return {
      bytes: await file.arrayBuffer(),
      mime: file.type,
      width,
      height,
      previewUrl,
    };
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    URL.revokeObjectURL(previewUrl);
    throw new Error("invalid-image");
  }
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (value) => (value ? resolve(value) : reject(new Error("invalid-image"))),
      "image/png",
    );
  });
  return {
    bytes: await blob.arrayBuffer(),
    mime: "image/png",
    width,
    height,
    previewUrl,
  };
}
