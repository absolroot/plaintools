import type { ImageConversionMode } from "../features/image-converter/formats";
import type { Locale } from "./site";

export type SourceReference = {
  id: string;
  title: string;
  publisher: string;
  href: string;
};

const references = {
  "unicode-format-characters": {
    id: "unicode-format-characters",
    title:
      "The Unicode Standard, Chapter 23: Special Areas and Format Characters",
    publisher: "Unicode Consortium",
    href: "https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-23/",
  },
  "unicode-bidi": {
    id: "unicode-bidi",
    title: "Unicode Standard Annex #9: Unicode Bidirectional Algorithm",
    publisher: "Unicode Consortium",
    href: "https://www.unicode.org/reports/tr9/",
  },
  "microsoft-bmp": {
    id: "microsoft-bmp",
    title: "Bitmap Storage",
    publisher: "Microsoft",
    href: "https://learn.microsoft.com/en-us/windows/win32/gdi/bitmap-storage",
  },
  "w3c-png": {
    id: "w3c-png",
    title: "Portable Network Graphics (PNG) Specification (Third Edition)",
    publisher: "W3C",
    href: "https://www.w3.org/TR/png-3/",
  },
  "itu-jpeg": {
    id: "itu-jpeg",
    title:
      "ITU-T T.81: Digital compression and coding of continuous-tone still images",
    publisher: "International Telecommunication Union",
    href: "https://www.itu.int/rec/T-REC-T.81/en",
  },
  "w3c-gif": {
    id: "w3c-gif",
    title: "Graphics Interchange Format Version 89a",
    publisher: "W3C",
    href: "https://www.w3.org/Graphics/GIF/spec-gif89a.txt",
  },
  "google-webp": {
    id: "google-webp",
    title: "WebP container specification",
    publisher: "Google",
    href: "https://developers.google.com/speed/webp/docs/riff_container",
  },
  "iso-heif": {
    id: "iso-heif",
    title: "ISO/IEC 23008-12: High Efficiency Image File Format",
    publisher: "ISO",
    href: "https://www.iso.org/standard/89035.html",
  },
  "aom-avif": {
    id: "aom-avif",
    title: "AV1 Image File Format (AVIF)",
    publisher: "Alliance for Open Media",
    href: "https://aomediacodec.github.io/av1-avif/",
  },
  "w3c-svg": {
    id: "w3c-svg",
    title: "Scalable Vector Graphics (SVG) 2",
    publisher: "W3C",
    href: "https://www.w3.org/TR/SVG/",
  },
} as const satisfies Record<string, SourceReference>;

const formatReferenceIds = {
  bmp: "microsoft-bmp",
  png: "w3c-png",
  jpg: "itu-jpeg",
  gif: "w3c-gif",
  webp: "google-webp",
  heic: "iso-heif",
  avif: "aom-avif",
  svg: "w3c-svg",
} as const satisfies Record<
  ImageConversionMode["source"],
  keyof typeof references
>;

export const sourceReferenceCopy: Record<Locale, { heading: string }> = {
  en: { heading: "Sources and standards" },
  ko: { heading: "출처 및 표준" },
  es: { heading: "Fuentes y estándares" },
  de: { heading: "Quellen und Standards" },
  ja: { heading: "出典と標準" },
  fr: { heading: "Sources et normes" },
  "pt-BR": { heading: "Fontes e padrões" },
  it: { heading: "Fonti e standard" },
  nl: { heading: "Bronnen en standaarden" },
  sv: { heading: "Källor och standarder" },
  cs: { heading: "Zdroje a standardy" },
  pl: { heading: "Źródła i standardy" },
  da: { heading: "Kilder og standarder" },
  no: { heading: "Kilder og standarder" },
  ar: { heading: "المصادر والمعايير" },
  "zh-TW": { heading: "來源與標準" },
  tr: { heading: "Kaynaklar ve standartlar" },
};

export const invisibleCharacterRemoverSources = [
  references["unicode-format-characters"],
  references["unicode-bidi"],
] as const;

export function imageConversionSources(
  mode: ImageConversionMode,
): SourceReference[] {
  const ids = [
    formatReferenceIds[mode.source],
    formatReferenceIds[mode.target],
  ];
  return [...new Set(ids)].map((id) => references[id]);
}
