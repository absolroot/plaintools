import type { ImageConversionRouteFacts } from "./types";

export const ptBRRouteFacts = {
  "svg-rasterized":
    "Ao converter de {from} para {to}, o desenho vetorial é rasterizado e passa a ser formado por pixels.",
  "gif-still":
    "Um arquivo {from} é convertido em uma única imagem estática no formato {to}; a animação não é mantida.",
  "jpg-white-background":
    "As áreas transparentes ficam brancas ao converter de {from} para {to}.",
  "gif-palette":
    "Um arquivo {to} usa uma paleta de cores limitada e transparência binária, portanto cores sutis ou detalhes de transparência podem mudar.",
  "bmp-uncompressed":
    "{to} não adiciona mais compressão com perdas, mas o arquivo resultante pode ficar maior.",
  "png-no-further-loss":
    "{to} não adiciona mais compressão com perdas, mas o arquivo resultante pode ficar maior.",
  "quality-profile":
    "A conversão de {from} para {to} usa uma configuração de qualidade equilibrada; tanto o tamanho do arquivo quanto os detalhes da imagem podem mudar.",
} satisfies ImageConversionRouteFacts;
