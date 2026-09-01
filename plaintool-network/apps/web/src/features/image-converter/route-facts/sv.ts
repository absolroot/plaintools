import type { ImageConversionRouteFacts } from "./types";

export const svRouteFacts = {
  "svg-rasterized":
    "{from} är ett vektorformat; vid konvertering till {to} sparas bilden som pixlar och vektorerna kan inte längre redigeras.",
  "gif-still":
    "En animation i {from} konverteras till en enda stillbild i {to}; animationen behålls inte.",
  "jpg-white-background":
    "Vid konvertering från {from} till {to} får genomskinliga pixlar vit bakgrund eftersom JPG inte har stöd för genomskinlighet.",
  "gif-palette":
    "Vid konvertering till {to} begränsas bilden till GIF:s färgpalett; genomskinlighet är antingen helt på eller helt av.",
  "bmp-uncompressed":
    "{to} använder ingen ytterligare förstörande komprimering, så resultatet kan bli större än {from}.",
  "png-no-further-loss":
    "{to} lägger inte till någon ytterligare förstörande komprimering, men filen kan bli större än {from}.",
  "quality-profile":
    "Vid konvertering från {from} till {to} styr kvalitetsinställningen avvägningen mellan filstorlek och synliga detaljer.",
} satisfies ImageConversionRouteFacts;
