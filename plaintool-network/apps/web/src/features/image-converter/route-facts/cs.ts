import type { ImageConversionRouteFacts } from "./types";

export const csRouteFacts = {
  "svg-rasterized":
    "{from} je vektorový formát; při převodu do {to} se obrázek uloží jako pixely a vektory už nepůjde upravovat.",
  "gif-still":
    "Animace ve formátu {from} se převede na jediný statický obrázek ve formátu {to}; animace se nezachová.",
  "jpg-white-background":
    "Při převodu z {from} do {to} dostanou průhledné pixely bílé pozadí, protože JPG průhlednost nepodporuje.",
  "gif-palette":
    "Při převodu do {to} se obrázek omezí na barevnou paletu GIF; průhlednost může být jen zapnutá nebo vypnutá.",
  "bmp-uncompressed":
    "{to} nepoužívá další ztrátovou kompresi, takže výsledek může být větší než {from}.",
  "png-no-further-loss":
    "{to} nepřidává další ztrátovou kompresi, ale soubor může být větší než {from}.",
  "quality-profile":
    "Při převodu z {from} do {to} nastavení kvality určuje kompromis mezi velikostí souboru a viditelnými detaily.",
} satisfies ImageConversionRouteFacts;
