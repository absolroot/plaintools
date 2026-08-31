/// <reference lib="webworker" />

import { calculateImagePlacement } from "@plaintool/pdf-core";
import { zipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import type {
  PdfWorkerError,
  PdfWorkerReply,
  PdfWorkerRequest,
} from "./contract";

function post(reply: PdfWorkerReply, transfer: Transferable[] = []): void {
  self.postMessage(reply, { transfer });
}

function classifyError(error: unknown): PdfWorkerError {
  const name = error instanceof Error ? error.name : "";
  const message = error instanceof Error ? error.message : "";
  if (/encrypt|password/iu.test(`${name} ${message}`)) return "encrypted-pdf";
  if (/pdf|header|catalog|xref/iu.test(`${name} ${message}`))
    return "invalid-pdf";
  if (/image|png|jpg|jpeg/iu.test(`${name} ${message}`)) return "invalid-image";
  return "processing-failed";
}

function asTransferable(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

async function preserve(input: ArrayBuffer): Promise<ArrayBuffer[]> {
  const source = await PDFDocument.load(input, { updateMetadata: false });
  return [
    asTransferable(
      await source.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      }),
    ),
  ];
}

async function merge(
  inputs: ArrayBuffer[],
  id: number,
): Promise<ArrayBuffer[]> {
  const output = await PDFDocument.create();
  for (let index = 0; index < inputs.length; index += 1) {
    const source = await PDFDocument.load(inputs[index]!, {
      updateMetadata: false,
    });
    const indices = source.getPageIndices();
    const pages = await output.copyPages(source, indices);
    pages.forEach((page) => output.addPage(page));
    post({ id, kind: "progress", completed: index + 1, total: inputs.length });
  }
  return [
    asTransferable(
      await output.save({ useObjectStreams: true, addDefaultPage: false }),
    ),
  ];
}

async function split(
  input: ArrayBuffer,
  groups: number[][],
  id: number,
): Promise<ArrayBuffer[]> {
  const source = await PDFDocument.load(input, { updateMetadata: false });
  const outputs: ArrayBuffer[] = [];
  for (let index = 0; index < groups.length; index += 1) {
    const output = await PDFDocument.create();
    const pages = await output.copyPages(source, groups[index]!);
    pages.forEach((page) => output.addPage(page));
    outputs.push(
      asTransferable(
        await output.save({ useObjectStreams: true, addDefaultPage: false }),
      ),
    );
    post({ id, kind: "progress", completed: index + 1, total: groups.length });
  }
  return outputs;
}

async function imagesToPdf(
  request: Extract<PdfWorkerRequest, { operation: "images-to-pdf" }>,
): Promise<ArrayBuffer[]> {
  const output = await PDFDocument.create();
  for (let index = 0; index < request.images.length; index += 1) {
    const source = request.images[index]!;
    const image =
      source.mime === "image/jpeg"
        ? await output.embedJpg(source.bytes)
        : await output.embedPng(source.bytes);
    const placement = calculateImagePlacement({
      imageWidth: source.width,
      imageHeight: source.height,
      pageSize: request.pageSize,
      orientation: request.orientation,
      margin: request.margin,
    });
    const page = output.addPage([placement.pageWidth, placement.pageHeight]);
    page.drawImage(image, {
      x: placement.x,
      y: placement.y,
      width: placement.drawWidth,
      height: placement.drawHeight,
    });
    post({
      id: request.id,
      kind: "progress",
      completed: index + 1,
      total: request.images.length,
    });
  }
  return [
    asTransferable(
      await output.save({ useObjectStreams: true, addDefaultPage: false }),
    ),
  ];
}

async function rasterPagesToPdf(
  request: Extract<PdfWorkerRequest, { operation: "raster-pages-to-pdf" }>,
): Promise<ArrayBuffer[]> {
  const output = await PDFDocument.create();
  for (let index = 0; index < request.pages.length; index += 1) {
    const source = request.pages[index]!;
    const image = await output.embedJpg(source.bytes);
    const page = output.addPage([source.width, source.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: source.width,
      height: source.height,
    });
    post({
      id: request.id,
      kind: "progress",
      completed: index + 1,
      total: request.pages.length,
    });
  }
  return [
    asTransferable(
      await output.save({ useObjectStreams: true, addDefaultPage: false }),
    ),
  ];
}

function createZip(
  files: Array<{ name: string; bytes: ArrayBuffer }>,
): ArrayBuffer[] {
  const entries = Object.fromEntries(
    files.map((file) => [file.name, new Uint8Array(file.bytes)]),
  );
  return [asTransferable(zipSync(entries, { level: 0 }))];
}

self.addEventListener("message", (event: MessageEvent<PdfWorkerRequest>) => {
  const request = event.data;
  void (async () => {
    try {
      let outputs: ArrayBuffer[];
      switch (request.operation) {
        case "preserve":
          outputs = await preserve(request.input);
          break;
        case "merge":
          outputs = await merge(request.inputs, request.id);
          break;
        case "split":
          outputs = await split(request.input, request.groups, request.id);
          break;
        case "images-to-pdf":
          outputs = await imagesToPdf(request);
          break;
        case "raster-pages-to-pdf":
          outputs = await rasterPagesToPdf(request);
          break;
        case "zip":
          outputs = createZip(request.files);
          break;
      }
      post({ id: request.id, kind: "result", outputs }, outputs);
    } catch (error) {
      post({ id: request.id, kind: "error", error: classifyError(error) });
    }
  })();
});
