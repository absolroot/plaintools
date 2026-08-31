export const pdfToolIds = [
  "compress-pdf",
  "merge-pdf",
  "split-pdf",
  "pdf-to-image",
  "image-to-pdf",
] as const;

export type PdfToolId = (typeof pdfToolIds)[number];

export function isPdfToolId(value: string): value is PdfToolId {
  return (pdfToolIds as readonly string[]).includes(value);
}
