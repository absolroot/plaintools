declare module "gifenc" {
  export type GifPalette = number[][];
  export type GifPixelFormat = "rgb565" | "rgb444" | "rgba4444";

  export function quantize(
    pixels: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    options?: { format?: GifPixelFormat },
  ): GifPalette;

  export function applyPalette(
    pixels: Uint8Array | Uint8ClampedArray,
    palette: GifPalette,
    format?: GifPixelFormat,
  ): Uint8Array;

  export function GIFEncoder(): {
    writeFrame(
      indexedPixels: Uint8Array,
      width: number,
      height: number,
      options: {
        palette: GifPalette;
        transparent?: boolean;
        transparentIndex?: number;
        repeat?: number;
      },
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };
}
