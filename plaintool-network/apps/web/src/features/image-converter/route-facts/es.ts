import type { ImageConversionRouteFacts } from "./types";

export const esRouteFacts = {
  "svg-rasterized":
    "Al convertir de {from} a {to}, el gráfico vectorial se rasteriza y pasa a estar formado por píxeles.",
  "gif-still":
    "Un archivo {from} se convierte en una sola imagen fija en {to}; la animación no se conserva.",
  "jpg-white-background":
    "Las zonas transparentes pasan a ser blancas al convertir de {from} a {to}.",
  "gif-palette":
    "Un archivo {to} usa una paleta de colores limitada y transparencia binaria, por lo que pueden cambiar los colores o los detalles de transparencia.",
  "bmp-uncompressed":
    "{to} no añade más compresión con pérdida, pero el archivo resultante puede ser más grande.",
  "png-no-further-loss":
    "{to} no añade más compresión con pérdida, pero el archivo resultante puede ser más grande.",
  "quality-profile":
    "La conversión de {from} a {to} usa un ajuste de calidad equilibrado; pueden cambiar tanto el tamaño del archivo como el detalle de la imagen.",
} satisfies ImageConversionRouteFacts;
