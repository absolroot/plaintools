/**
 * Single source of truth for implemented tool routes and their publication state.
 *
 * Adding an entry automatically updates the generated sitemap and llms.txt through
 * site.ts. The SEO registry gate then requires a localized directory entry, a
 * route, and complete rendered metadata before builds can pass.
 */
const imageFormats = /** @type {const} */ ([
  "bmp",
  "png",
  "jpg",
  "gif",
  "webp",
  "heic",
  "avif",
]);

const imageConverterRegistry = imageFormats.flatMap((source) =>
  imageFormats
    .filter((target) => target !== source)
    .map((target) => ({
      id: `${source}-to-${target}`,
      featureId: "image-converter",
      slug: `${source}-to-${target}`,
      category: "converter",
      publication: "indexable",
      localeReviewManifest:
        "apps/web/src/lib/locale-review-manifests/image-converter.json",
      structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
    })),
);

const pdfToolSlugs = /** @type {const} */ ([
  "compress-pdf",
  "merge-pdf",
  "split-pdf",
  "pdf-to-image",
  "image-to-pdf",
]);

const pdfToolkitRegistry = pdfToolSlugs.map((slug) => ({
  id: slug,
  featureId: "pdf-toolkit",
  slug,
  category: "pdf",
  publication: "indexable",
  localeReviewManifest:
    "apps/web/src/lib/locale-review-manifests/pdf-toolkit.json",
  structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
}));

export const toolRegistry = /** @type {const} */ ([
  {
    id: "base64-decode",
    featureId: "base64-codec",
    slug: "base64-decode",
    category: "encoding",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/base64-codec.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "base64-encode",
    featureId: "base64-codec",
    slug: "base64-encode",
    category: "encoding",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/base64-codec.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "word-counter",
    featureId: "word-counter",
    slug: "word-counter",
    category: "text",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/word-counter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "json-formatter",
    featureId: "json-formatter",
    slug: "json-formatter",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/json-formatter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "unix-timestamp-converter",
    featureId: "unix-timestamp-converter",
    slug: "unix-timestamp-converter",
    category: "time",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/unix-timestamp-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "text-compare",
    featureId: "text-compare",
    slug: "text-compare",
    category: "text",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/text-compare.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "case-converter",
    featureId: "case-converter",
    slug: "case-converter",
    category: "text",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/case-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "ai-watermark-remover",
    featureId: "ai-text-cleaner",
    slug: "ai-watermark-remover",
    category: "text",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/ai-text-cleaner.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "url-encode",
    featureId: "url-codec",
    slug: "url-encode",
    category: "encoding",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/url-codec.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "url-decode",
    featureId: "url-codec",
    slug: "url-decode",
    category: "encoding",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/url-codec.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "hash-generator",
    featureId: "hash-generator",
    slug: "hash-generator",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/hash-generator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "uuid-generator",
    featureId: "uuid-generator",
    slug: "uuid-generator",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/uuid-generator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "jwt-decoder",
    featureId: "jwt-decoder",
    slug: "jwt-decoder",
    category: "encoding",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/jwt-decoder.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "qr-code-generator",
    featureId: "qr-code",
    slug: "qr-code-generator",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/qr-code.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "qr-code-scanner",
    featureId: "qr-code",
    slug: "qr-code-scanner",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/qr-code.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "csv-to-markdown",
    featureId: "data-converter",
    slug: "csv-to-markdown",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "markdown-to-csv",
    featureId: "data-converter",
    slug: "markdown-to-csv",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "json-to-csv",
    featureId: "data-converter",
    slug: "json-to-csv",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "csv-to-json",
    featureId: "data-converter",
    slug: "csv-to-json",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "html-to-markdown",
    featureId: "data-converter",
    slug: "html-to-markdown",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "markdown-to-html",
    featureId: "data-converter",
    slug: "markdown-to-html",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/data-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "html-formatter",
    featureId: "source-formatter",
    slug: "html-formatter",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/source-formatter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "css-formatter",
    featureId: "source-formatter",
    slug: "css-formatter",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/source-formatter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "javascript-formatter",
    featureId: "source-formatter",
    slug: "javascript-formatter",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/source-formatter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "sql-formatter",
    featureId: "source-formatter",
    slug: "sql-formatter",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/source-formatter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "ip-subnet-calculator",
    featureId: "ip-subnet",
    slug: "ip-subnet-calculator",
    category: "data",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/ip-subnet.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "background-remover",
    featureId: "background-remover",
    slug: "background-remover",
    category: "image",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/background-remover.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "image-upscaler",
    featureId: "image-upscaler",
    slug: "image-upscaler",
    category: "image",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/image-upscaler.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "fraction-calculator",
    featureId: "math-calculator",
    slug: "fraction-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/math-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "factor-calculator",
    featureId: "math-calculator",
    slug: "factor-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/math-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "lcm-calculator",
    featureId: "math-calculator",
    slug: "lcm-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/math-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "percentage-calculator",
    featureId: "percentage-calculator",
    slug: "percentage-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/percentage-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "bmi-calculator",
    featureId: "bmi-calculator",
    slug: "bmi-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/bmi-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "image-resizer",
    featureId: "image-resizer",
    slug: "image-resizer",
    category: "image",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/image-resizer.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "image-crop",
    featureId: "image-crop",
    slug: "image-crop",
    category: "image",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/image-crop.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "date-calculator",
    featureId: "date-calculator",
    slug: "date-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/date-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "dday-calculator",
    featureId: "date-calculator",
    slug: "dday-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/date-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "age-calculator",
    featureId: "date-calculator",
    slug: "age-calculator",
    category: "calculator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/date-calculator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "time-zone-converter",
    featureId: "time-zone-converter",
    slug: "time-zone-converter",
    category: "time",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/time-zone-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  ...pdfToolkitRegistry,
  ...imageConverterRegistry,
  {
    id: "barcode-generator",
    featureId: "barcode-generator",
    slug: "barcode-generator",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/barcode-generator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "password-generator",
    featureId: "password-generator",
    slug: "password-generator",
    category: "generator",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/password-generator.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
  {
    id: "unit-converter",
    featureId: "unit-converter",
    slug: "unit-converter",
    category: "converter",
    publication: "indexable",
    localeReviewManifest:
      "apps/web/src/lib/locale-review-manifests/unit-converter.json",
    structuredData: ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
  },
]);

export const toolPages = toolRegistry.map((tool) => tool.slug);
export const previewPages = toolRegistry
  .filter((tool) => tool.publication === "preview")
  .map((tool) => tool.slug);
export const publicToolPages = toolRegistry
  .filter((tool) => tool.publication === "indexable")
  .map((tool) => tool.slug);
