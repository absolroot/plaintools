import type { ImageConversionRouteFacts } from "./types";

export const daRouteFacts = {
  "svg-rasterized":
    "{from} er et vektorformat; ved konvertering til {to} gemmes billedet som pixels, og vektorerne kan ikke længere redigeres.",
  "gif-still":
    "En animation i {from} konverteres til ét stillbillede i {to}; animationen bevares ikke.",
  "jpg-white-background":
    "Ved konvertering fra {from} til {to} får gennemsigtige pixels hvid baggrund, fordi JPG ikke understøtter gennemsigtighed.",
  "gif-palette":
    "Ved konvertering til {to} begrænses billedet til GIF-farvepaletten; gennemsigtighed er enten helt til eller fra.",
  "bmp-uncompressed":
    "{to} bruger ingen yderligere komprimering med kvalitetstab, så resultatet kan blive større end {from}.",
  "png-no-further-loss":
    "{to} tilføjer ingen yderligere komprimering med kvalitetstab, men filen kan blive større end {from}.",
  "quality-profile":
    "Ved konvertering fra {from} til {to} bestemmer kvalitetsindstillingen balancen mellem filstørrelse og synlige detaljer.",
} satisfies ImageConversionRouteFacts;
