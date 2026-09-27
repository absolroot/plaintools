import {
  previewPages,
  publicToolPages,
  toolPages,
  toolRegistry,
} from "./tool-registry.js";

export { locales } from "./locales.js";

export const legalPages = /** @type {const} */ ([
  "about",
  "privacy",
  "cookies",
  "terms",
  "contact",
]);

export { previewPages, publicToolPages, toolPages, toolRegistry };

export const contentPages = [...legalPages, ...toolPages];
