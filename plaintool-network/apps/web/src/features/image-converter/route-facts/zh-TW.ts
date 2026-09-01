import type { ImageConversionRouteFacts } from "./types";

export const zhTWRouteFacts = {
  "svg-rasterized": "{from} 不會保留為向量圖形，轉成 {to} 時會繪製為像素圖片。",
  "gif-still": "將動畫 {from} 轉成 {to} 後，動畫不會保留，會產生一張靜態圖片。",
  "jpg-white-background":
    "如果 {from} 有透明區域，轉成 {to} 時會以白色背景填滿。",
  "gif-palette":
    "將 {from} 轉成 {to} 時，可用色彩會受限制，透明效果也會以較簡化的方式處理。",
  "bmp-uncompressed":
    "將 {from} 轉成 {to} 時不會再套用有損壓縮，因此檔案可能更大。",
  "png-no-further-loss":
    "將 {from} 轉成 {to} 時不會再套用有損壓縮，因此檔案可能更大。",
  "quality-profile":
    "將 {from} 轉成 {to} 時，品質設定可調整檔案大小與圖片清晰度之間的平衡。",
} satisfies ImageConversionRouteFacts;
