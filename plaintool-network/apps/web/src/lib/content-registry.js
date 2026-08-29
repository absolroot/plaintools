import {
  previewPages,
  publicToolPages,
  toolPages,
  toolRegistry,
} from "./tool-registry.js";

export const locales = /** @type {const} */ ([
  "en",
  "ko",
  "es",
  "de",
  "ja",
  "fr",
  "pt-BR",
  "it",
  "nl",
  "sv",
  "cs",
  "pl",
  "da",
  "no",
  "ar",
  "zh-TW",
  "tr",
]);
export const legalPages = /** @type {const} */ ([
  "about",
  "privacy",
  "cookies",
  "terms",
  "contact",
]);

export { previewPages, publicToolPages, toolPages, toolRegistry };

export const contentPages = [...legalPages, ...toolPages];
