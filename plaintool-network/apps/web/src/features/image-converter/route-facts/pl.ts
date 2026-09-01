import type { ImageConversionRouteFacts } from "./types";

export const plRouteFacts = {
  "svg-rasterized":
    "{from} jest formatem wektorowym; podczas konwersji do {to} obraz zostaje zapisany jako piksele, więc wektory nie będą już edytowalne.",
  "gif-still":
    "Animacja w formacie {from} zostanie zamieniona na jeden nieruchomy obraz w formacie {to}; animacja nie zostanie zachowana.",
  "jpg-white-background":
    "Przy konwersji z {from} do {to} przezroczyste piksele otrzymują białe tło, ponieważ JPG nie obsługuje przezroczystości.",
  "gif-palette":
    "Przy konwersji do {to} obraz zostaje ograniczony do palety kolorów GIF; przezroczystość jest tylko włączona albo wyłączona.",
  "bmp-uncompressed":
    "{to} nie stosuje dalszej kompresji stratnej, więc wynik może być większy niż {from}.",
  "png-no-further-loss":
    "{to} nie dodaje dalszej kompresji stratnej, ale plik może być większy niż {from}.",
  "quality-profile":
    "Przy konwersji z {from} do {to} ustawienie jakości określa kompromis między rozmiarem pliku a widocznymi szczegółami.",
} satisfies ImageConversionRouteFacts;
