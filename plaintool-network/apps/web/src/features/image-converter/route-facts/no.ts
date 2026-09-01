import type { ImageConversionRouteFacts } from "./types";

export const noRouteFacts = {
  "svg-rasterized":
    "{from} er et vektorformat; ved konvertering til {to} lagres bildet som piksler, og vektorene kan ikke lenger redigeres.",
  "gif-still":
    "En animasjon i {from} konverteres til ett stillbilde i {to}; animasjonen beholdes ikke.",
  "jpg-white-background":
    "Ved konvertering fra {from} til {to} får gjennomsiktige piksler hvit bakgrunn, fordi JPG ikke støtter gjennomsiktighet.",
  "gif-palette":
    "Ved konvertering til {to} begrenses bildet til GIF-fargepaletten; gjennomsiktighet er enten helt på eller helt av.",
  "bmp-uncompressed":
    "{to} bruker ingen ytterligere komprimering med kvalitetstap, så resultatet kan bli større enn {from}.",
  "png-no-further-loss":
    "{to} legger ikke til ytterligere komprimering med kvalitetstap, men filen kan bli større enn {from}.",
  "quality-profile":
    "Ved konvertering fra {from} til {to} bestemmer kvalitetsinnstillingen balansen mellom filstørrelse og synlige detaljer.",
} satisfies ImageConversionRouteFacts;
