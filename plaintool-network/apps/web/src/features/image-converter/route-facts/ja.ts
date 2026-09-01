import type { ImageConversionRouteFacts } from "./types";

export const jaRouteFacts = {
  "svg-rasterized":
    "{from} はベクターのまま保持されず、{to} への変換時にピクセル画像として描画されます。",
  "gif-still":
    "アニメーション {from} を {to} に変換すると、動きは保持されず1枚の静止画像になります。",
  "jpg-white-background":
    "{from} に透明部分がある場合、{to} への変換時に白い背景で塗りつぶされます。",
  "gif-palette":
    "{from} を {to} に変換すると、使用できる色数が限られ、透明度も簡易的に処理されます。",
  "bmp-uncompressed":
    "{from} を {to} に変換すると追加の非可逆圧縮は行われないため、ファイルサイズが大きくなることがあります。",
  "png-no-further-loss":
    "{from} を {to} に変換すると追加の非可逆圧縮は行われないため、ファイルサイズが大きくなることがあります。",
  "quality-profile":
    "{from} から {to} への変換では、品質設定でファイルサイズと画像の見え方のバランスを調整できます。",
} satisfies ImageConversionRouteFacts;
