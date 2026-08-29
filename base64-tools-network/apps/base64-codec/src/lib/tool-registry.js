/**
 * Single source of truth for implemented tool routes and their publication state.
 *
 * Adding an entry automatically updates the generated sitemap and llms.txt through
 * site.ts. The SEO registry gate then requires a localized directory entry, a
 * route, and complete rendered metadata before builds can pass.
 */
export const toolRegistry = /** @type {const} */ ([
  {
    id: "base64-decode",
    featureId: "base64-codec",
    slug: "base64-decode",
    category: "encoding",
    publication: "indexable",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"]
  },
  {
    id: "base64-encode",
    featureId: "base64-codec",
    slug: "base64-encode",
    category: "encoding",
    publication: "indexable",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"]
  },
  {
    id: "word-counter",
    featureId: "word-counter",
    slug: "word-counter",
    category: "text",
    publication: "preview",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"]
  },
  {
    id: "json-formatter",
    featureId: "json-formatter",
    slug: "json-formatter",
    category: "data",
    publication: "preview",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"]
  },
  {
    id: "unix-timestamp-converter",
    featureId: "unix-timestamp-converter",
    slug: "unix-timestamp-converter",
    category: "time",
    publication: "preview",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"]
  }
]);

export const toolPages = toolRegistry.map((tool) => tool.slug);
export const previewPages = toolRegistry.filter((tool) => tool.publication === "preview").map((tool) => tool.slug);
export const publicToolPages = toolRegistry.filter((tool) => tool.publication === "indexable").map((tool) => tool.slug);
