import type { ImageConversionRouteFacts } from "./types";

export const frRouteFacts = {
  "svg-rasterized":
    "Lors de la conversion de {from} en {to}, le dessin vectoriel est pixellisé.",
  "gif-still":
    "Un fichier {from} est converti en une seule image fixe au format {to} ; l’animation n’est pas conservée.",
  "jpg-white-background":
    "Les zones transparentes deviennent blanches lors de la conversion de {from} en {to}.",
  "gif-palette":
    "Un fichier {to} utilise une palette de couleurs limitée et une transparence binaire ; les couleurs fines ou les détails de transparence peuvent donc changer.",
  "bmp-uncompressed":
    "{to} n’ajoute pas de compression avec perte, mais le fichier obtenu peut être plus volumineux.",
  "png-no-further-loss":
    "{to} n’ajoute pas de compression avec perte, mais le fichier obtenu peut être plus volumineux.",
  "quality-profile":
    "La conversion de {from} en {to} utilise un réglage de qualité équilibré ; la taille du fichier et le niveau de détail peuvent changer.",
} satisfies ImageConversionRouteFacts;
