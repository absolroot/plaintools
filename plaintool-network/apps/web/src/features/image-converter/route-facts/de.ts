import type { ImageConversionRouteFacts } from "./types";

export const deRouteFacts = {
  "svg-rasterized":
    "Beim Umwandeln von {from} in {to} wird die Vektorgrafik in Pixel gerastert.",
  "gif-still":
    "Eine {from}-Datei wird in ein einzelnes Standbild im Format {to} umgewandelt; die Animation bleibt nicht erhalten.",
  "jpg-white-background":
    "Transparente Bereiche werden beim Umwandeln von {from} in {to} weiß.",
  "gif-palette":
    "Eine {to}-Datei verwendet eine begrenzte Farbpalette und binäre Transparenz; feine Farb- oder Transparenzdetails können sich daher ändern.",
  "bmp-uncompressed":
    "{to} fügt keine weitere verlustbehaftete Komprimierung hinzu, die resultierende Datei kann jedoch größer sein.",
  "png-no-further-loss":
    "{to} fügt keine weitere verlustbehaftete Komprimierung hinzu, die resultierende Datei kann jedoch größer sein.",
  "quality-profile":
    "Für die Umwandlung von {from} in {to} wird eine ausgewogene Qualitätseinstellung verwendet; Dateigröße und Bilddetails können sich ändern.",
} satisfies ImageConversionRouteFacts;
