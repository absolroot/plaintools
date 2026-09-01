import type { ImageConversionRouteFacts } from "./types";

export const itRouteFacts = {
  "svg-rasterized":
    "Convertendo da {from} al {to}, la grafica vettoriale viene rasterizzata in pixel.",
  "gif-still":
    "Un file {from} viene convertito in una sola immagine statica in formato {to}; l’animazione non viene mantenuta.",
  "jpg-white-background":
    "Le aree trasparenti diventano bianche quando si converte da {from} a {to}.",
  "gif-palette":
    "Un file {to} usa una palette di colori limitata e trasparenza binaria, quindi i colori delicati o i dettagli della trasparenza possono cambiare.",
  "bmp-uncompressed":
    "{to} non aggiunge ulteriore compressione con perdita, ma il file risultante può essere più grande.",
  "png-no-further-loss":
    "{to} non aggiunge ulteriore compressione con perdita, ma il file risultante può essere più grande.",
  "quality-profile":
    "La conversione da {from} a {to} usa un’impostazione di qualità bilanciata; sia la dimensione del file sia i dettagli dell’immagine possono cambiare.",
} satisfies ImageConversionRouteFacts;
