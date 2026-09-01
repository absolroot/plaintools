import type { ImageConversionRouteFacts } from "./types";

export const enRouteFacts = {
  "svg-rasterized":
    "When converting {from} to {to}, the vector artwork is rasterized into pixels.",
  "gif-still":
    "A {from} source is converted to one still image in {to}; animation is not retained.",
  "jpg-white-background":
    "Transparent areas become white when {from} is converted to {to}.",
  "gif-palette":
    "A {to} file uses a limited color palette and binary transparency, so fine color or transparency detail can change.",
  "bmp-uncompressed":
    "{to} does not add further lossy compression, but the resulting file can be larger.",
  "png-no-further-loss":
    "{to} does not add further lossy compression, but the resulting file can be larger.",
  "quality-profile":
    "The conversion uses a balanced quality setting for {from} to {to}, so file size and image detail may both change.",
} satisfies ImageConversionRouteFacts;
