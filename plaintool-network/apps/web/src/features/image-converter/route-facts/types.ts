export const routeFactKinds = [
  "svg-rasterized",
  "gif-still",
  "jpg-white-background",
  "gif-palette",
  "bmp-uncompressed",
  "png-no-further-loss",
  "quality-profile",
] as const;

export type ImageConversionRouteFactKind = (typeof routeFactKinds)[number];

/**
 * Each locale owns these sentences. They describe a verified consequence of a
 * route direction; `{from}` and `{to}` are replaced only with that locale's
 * own format names.
 */
export type ImageConversionRouteFacts = Record<
  ImageConversionRouteFactKind,
  string
>;
