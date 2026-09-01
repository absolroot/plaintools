import type { ImageConversionRouteFacts } from "./types";

export const nlRouteFacts = {
  "svg-rasterized":
    "{from} is een vectorformaat; bij omzetting naar {to} wordt de afbeelding als pixels opgeslagen en blijven vectoren niet bewerkbaar.",
  "gif-still":
    "Een {from}-animatie wordt omgezet naar één stilstaand beeld in {to}; de animatie blijft niet behouden.",
  "jpg-white-background":
    "Bij omzetting van {from} naar {to} krijgen transparante pixels een witte achtergrond, omdat JPG geen transparantie ondersteunt.",
  "gif-palette":
    "Bij omzetting naar {to} wordt het beeld beperkt tot het GIF-kleurenpalet; transparantie is alleen volledig aan of uit.",
  "bmp-uncompressed":
    "{to} gebruikt geen verdere verliesgevende compressie, waardoor het resultaat groter kan zijn dan {from}.",
  "png-no-further-loss":
    "{to} voegt geen verdere verliesgevende compressie toe, maar het bestand kan groter zijn dan {from}.",
  "quality-profile":
    "Bij omzetting van {from} naar {to} bepaalt de kwaliteitsinstelling de afweging tussen bestandsgrootte en zichtbare details.",
} satisfies ImageConversionRouteFacts;
