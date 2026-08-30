import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  legalPages,
  locales,
  toolRegistry,
} from "../apps/web/src/lib/content-registry.js";
import {
  implementedIntegrationCapabilities,
  productionIntegrationDefaults,
  resolveDeploymentConfig,
} from "../apps/web/src/lib/deployment-config.js";

const args = process.argv.slice(2);
const targetIndex = args.indexOf("--target");
const target = targetIndex >= 0 ? args[targetIndex + 1] : "preview";
if (target !== "preview" && target !== "production") {
  throw new Error("qa-network requires --target preview|production.");
}

const config = resolveDeploymentConfig(
  target === "production"
    ? { ...productionIntegrationDefaults, ...process.env }
    : process.env,
  target,
  implementedIntegrationCapabilities,
);
if (target === "production" && !config.productionReady) {
  throw new Error(
    `Production QA received invalid deployment configuration:\n${config.issues.map((issue) => `- ${issue.message}`).join("\n")}`,
  );
}

const dist = resolve("apps/web/dist");
const previewTools = toolRegistry.filter(
  (tool) => tool.publication === "preview",
);
const indexableTools = toolRegistry.filter(
  (tool) => tool.publication === "indexable",
);
const previews = previewTools.map((tool) => tool.slug);
const publicTools = indexableTools.map((tool) => tool.slug);
const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const robots = await readFile(join(dist, "robots.txt"), "utf8");
const llms = await readFile(join(dist, "llms.txt"), "utf8");
const headers = await readFile(join(dist, "_headers"), "utf8");
const redirects = await readFile(join(dist, "_redirects"), "utf8");
const adsTxt = await readFile(join(dist, "ads.txt"), "utf8");
const faviconPng = await readFile(join(dist, "favicon.png"));
const thirdPartyNotices = await readFile(
  join(dist, "third-party-notices.txt"),
  "utf8",
);
const prettierNotices = await readFile(
  join(dist, "licenses", "prettier-3.9.6.txt"),
  "utf8",
);
const builtAssets = await readdir(join(dist, "_astro"));

const requiredRuntimeNotices = [
  "flag-icons",
  "Prettier",
  "sql-formatter",
  "nearley",
  "Terser",
  "@jridgewell/source-map",
];
for (const packageName of requiredRuntimeNotices) {
  if (!thirdPartyNotices.includes(packageName)) {
    throw new Error(`Deployed third-party notices are missing ${packageName}.`);
  }
}
if (
  !thirdPartyNotices.includes("/licenses/prettier-3.9.6.txt") ||
  prettierNotices.length < 350_000 ||
  !prettierNotices.includes("Apache License") ||
  !prettierNotices.includes("Blue Oak Model License")
) {
  throw new Error(
    "The deployed Prettier vendor notice is missing or unexpectedly truncated.",
  );
}

const formatterWorkerBudgets = {
  HtmlFormatter: 300_000,
  CssFormatter: 300_000,
  JavaScriptFormatter: 1_250_000,
  SqlFormatter: 150_000,
};
const formatterWorkerSizes = {};

async function builtJavaScriptClosure(entryAsset, seen = new Set()) {
  if (seen.has(entryAsset)) return seen;
  seen.add(entryAsset);
  const source = await readFile(join(dist, "_astro", entryAsset), "utf8");
  const imports = [
    ...source.matchAll(/\b(?:from|import\()\s*["'`]\.\/([^"'`]+\.js)["'`]/gu),
  ].map((match) => match[1]);
  for (const importedAsset of imports) {
    await builtJavaScriptClosure(importedAsset, seen);
  }
  return seen;
}

for (const [component, budget] of Object.entries(formatterWorkerBudgets)) {
  const clientAsset = builtAssets.find(
    (asset) => asset.startsWith(`${component}.astro_`) && asset.endsWith(".js"),
  );
  if (!clientAsset) {
    throw new Error(`Could not find the built ${component} client asset.`);
  }
  const clientSource = await readFile(
    join(dist, "_astro", clientAsset),
    "utf8",
  );
  const workerAsset = clientSource.match(/worker-[A-Za-z0-9_-]+\.js/u)?.[0];
  if (!workerAsset) {
    throw new Error(`Could not find the ${component} worker reference.`);
  }
  const workerClosure = await builtJavaScriptClosure(workerAsset);
  let size = 0;
  for (const asset of workerClosure) {
    size += (await stat(join(dist, "_astro", asset))).size;
  }
  formatterWorkerSizes[component] = size;
  if (size > budget) {
    throw new Error(
      `${component} worker is ${size} bytes, over its ${budget}-byte budget.`,
    );
  }
}

const requiredSecurityHeaders = [
  "X-Content-Type-Options: nosniff",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Strict-Transport-Security: max-age=31536000",
  "X-Frame-Options: DENY",
  "Cross-Origin-Opener-Policy: same-origin",
  "Cross-Origin-Resource-Policy: same-origin",
  "Content-Security-Policy: default-src 'self'; script-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://imgsct.cookiebot.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; worker-src 'self'; connect-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://*.google-analytics.com https://*.analytics.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; frame-src 'self' https://consentcdn.cookiebot.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'",
];
const expectedAdsRecord =
  "google.com, pub-5862324369257695, DIRECT, f08c47fec0942fa0";
if (adsTxt.trim() !== expectedAdsRecord) {
  throw new Error(
    "The deployed ads.txt does not match the approved AdSense record.",
  );
}
if (
  faviconPng.length < 24 ||
  faviconPng.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" ||
  faviconPng.readUInt32BE(16) !== 64 ||
  faviconPng.readUInt32BE(20) !== 64
) {
  throw new Error("The deployed favicon must be a valid 64x64 PNG.");
}
for (const header of requiredSecurityHeaders) {
  if (!headers.includes(header)) {
    throw new Error(`Static deployment is missing security header: ${header}`);
  }
}
const sourceMaps = builtAssets.filter((asset) => asset.endsWith(".map"));
if (sourceMaps.length) {
  throw new Error(
    `Static deployment exposes JavaScript source maps: ${sourceMaps.join(", ")}`,
  );
}

function requireMatch(value, pattern, message) {
  const match = value.match(pattern);
  if (!match) throw new Error(message);
  return match[1];
}

function metaContent(html, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return requireMatch(
    html,
    new RegExp(`<meta\\s+${attribute}="${escaped}"\\s+content="([^"]*)"`, "u"),
    `Missing ${attribute}=${value} metadata.`,
  );
}

function canonicalUrl(html) {
  return requireMatch(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/u,
    "Missing canonical URL.",
  );
}

function alternateUrls(html) {
  return new Map(
    [
      ...html.matchAll(
        /<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gu,
      ),
    ].map((match) => [match[1], match[2]]),
  );
}

function structuredDataDocuments(html, route) {
  const sources = [
    ...html.matchAll(
      /<script\s+[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gu,
    ),
  ].map((match) => match[1]);
  if (!sources.length) throw new Error(`${route} has no JSON-LD documents.`);
  return sources.map((source) => {
    try {
      return JSON.parse(source);
    } catch (error) {
      throw new Error(`${route} contains invalid JSON-LD: ${error.message}`);
    }
  });
}

function structuredDataNodes(documents) {
  return documents.flatMap((document) =>
    Array.isArray(document["@graph"]) ? document["@graph"] : [document],
  );
}

function verifyStaticContentPolicy(html, route) {
  const metaPolicy = html.includes('id="Cookiebot"')
    ? "default-src 'self'; script-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://imgsct.cookiebot.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; worker-src 'self'; connect-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://*.google-analytics.com https://*.analytics.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; frame-src 'self' https://consentcdn.cookiebot.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'none'"
    : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; worker-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'";
  if (
    !html.includes(
      `<meta http-equiv="Content-Security-Policy" content="${metaPolicy}">`,
    )
  ) {
    throw new Error(`${route} is missing the expected CSP meta policy.`);
  }

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gu)];
  for (const [, attributes, body] of scripts) {
    if (/\bsrc=(?:"[^"]*"|'[^']*')/u.test(attributes)) continue;
    const type = /\btype=(?:"([^"]*)"|'([^']*)')/u.exec(attributes);
    const value = type?.[1] ?? type?.[2] ?? "";
    if (value === "application/json" || value === "application/ld+json") {
      continue;
    }
    if (body.trim()) {
      throw new Error(`${route} contains executable inline JavaScript.`);
    }
  }
  if (/<style\b/iu.test(html) || /\sstyle=(?:"[^"]*"|'[^']*')/iu.test(html)) {
    throw new Error(`${route} contains inline CSS blocked by the static CSP.`);
  }
}

function verifyFaviconLink(html, route) {
  if (
    !html.includes(
      '<link rel="icon" href="/favicon.png" type="image/png" sizes="64x64">',
    )
  ) {
    throw new Error(`${route} does not expose the shared PNG favicon.`);
  }
}

function nodeTypes(node) {
  return Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
}

function findStructuredNode(nodes, type) {
  return nodes.find((node) => nodeTypes(node).includes(type));
}

function expectedRobots(publication) {
  if (target === "preview") return "noindex,nofollow";
  return publication === "preview"
    ? "noindex,follow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
}

function expectedUrl(locale, page) {
  return new URL(
    page ? `/${locale}/${page}/` : `/${locale}/`,
    config.origin,
  ).toString();
}

function verifyAlternates(html, page, route) {
  const alternates = alternateUrls(html);
  for (const targetLocale of locales) {
    const expected = expectedUrl(targetLocale, page);
    if (alternates.get(targetLocale) !== expected)
      throw new Error(`${route} has an incorrect ${targetLocale} alternate.`);
  }
  if (alternates.get("x-default") !== expectedUrl("en", page))
    throw new Error(`${route} has an incorrect x-default alternate.`);
}

function verifyMetadata(
  html,
  locale,
  page,
  publication,
  requiredSchema,
  route,
) {
  verifyStaticContentPolicy(html, route);
  verifyFaviconLink(html, route);
  const canonical = canonicalUrl(html);
  const expectedCanonical = expectedUrl(locale, page);
  if (canonical !== expectedCanonical)
    throw new Error(
      `${route} canonical is ${canonical}, expected ${expectedCanonical}.`,
    );
  if (!html.includes('<link rel="license" href="/third-party-notices.txt">'))
    throw new Error(`${route} does not expose its third-party notices.`);
  if (!metaContent(html, "name", "description"))
    throw new Error(`${route} has an empty description.`);
  if (!metaContent(html, "property", "og:title"))
    throw new Error(`${route} has an empty Open Graph title.`);
  if (!metaContent(html, "name", "twitter:title"))
    throw new Error(`${route} has an empty Twitter title.`);
  if (metaContent(html, "name", "robots") !== expectedRobots(publication))
    throw new Error(`${route} has the wrong robots directive for ${target}.`);
  verifyAlternates(html, page, route);

  const documents = structuredDataDocuments(html, route);
  const nodes = structuredDataNodes(documents);
  for (const type of ["WebSite", "WebPage", ...requiredSchema]) {
    if (!findStructuredNode(nodes, type))
      throw new Error(`${route} JSON-LD is missing ${type}.`);
  }
  const webpage = findStructuredNode(nodes, "WebPage");
  if (webpage?.url !== canonical)
    throw new Error(`${route} WebPage URL does not match its canonical.`);
  const application = findStructuredNode(nodes, "SoftwareApplication");
  if (application && application.url !== canonical)
    throw new Error(
      `${route} SoftwareApplication URL does not match its canonical.`,
    );
  const breadcrumb = findStructuredNode(nodes, "BreadcrumbList");
  const breadcrumbItems = breadcrumb?.itemListElement;
  if (
    breadcrumb &&
    (!Array.isArray(breadcrumbItems) ||
      breadcrumbItems.at(-1)?.item !== canonical)
  ) {
    throw new Error(
      `${route} BreadcrumbList does not end at its canonical URL.`,
    );
  }
  const faq = findStructuredNode(nodes, "FAQPage");
  if (faq && (!Array.isArray(faq.mainEntity) || faq.mainEntity.length === 0))
    throw new Error(`${route} FAQPage has no questions.`);

  const integrationState = config.integrations.active ? "enabled" : "disabled";
  if (!html.includes(`data-integrations="${integrationState}"`))
    throw new Error(
      `${route} integration state does not match validated capabilities.`,
    );
  if (config.integrations.ga4MeasurementId) {
    for (const marker of [
      'id="Cookiebot"',
      `data-cbid="${config.integrations.cookiebotDomainGroupId}"`,
      `gtag/js?id=${config.integrations.ga4MeasurementId}`,
      'data-cookieconsent="statistics"',
      `data-measurement-id="${config.integrations.ga4MeasurementId}"`,
    ]) {
      if (!html.includes(marker))
        throw new Error(
          `${route} is missing consented analytics marker ${marker}.`,
        );
    }
  } else if (
    html.includes('id="Cookiebot"') ||
    html.includes("googletagmanager.com/gtag/js")
  ) {
    throw new Error(`${route} ships consent or analytics code while disabled.`);
  }
  if (config.integrations.adsensePublisherId) {
    for (const marker of [
      `name="google-adsense-account" content="${config.integrations.adsensePublisherId}"`,
      `adsbygoogle.js?client=${config.integrations.adsensePublisherId}`,
      'crossorigin="anonymous"',
      'data-cookieconsent="marketing"',
    ]) {
      if (!html.includes(marker))
        throw new Error(
          `${route} is missing consented advertising marker ${marker}.`,
        );
    }
  } else if (
    html.includes('name="google-adsense-account"') ||
    html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
  ) {
    throw new Error(
      `${route} ships AdSense code while advertising is disabled.`,
    );
  }
}

for (const locale of locales) {
  const directoryRoute = `${locale}/`;
  const directory = await readFile(join(dist, locale, "index.html"), "utf8");
  verifyMetadata(
    directory,
    locale,
    undefined,
    "indexable",
    ["ItemList"],
    directoryRoute,
  );

  for (const route of [...previews, ...publicTools]) {
    if (!directory.includes(`/${locale}/${route}/`))
      throw new Error(`${locale} directory does not link ${route}.`);
  }

  for (const tool of toolRegistry) {
    const route = tool.slug;
    const routeName = `${locale}/${route}`;
    const html = await readFile(
      join(dist, locale, route, "index.html"),
      "utf8",
    );
    verifyMetadata(
      html,
      locale,
      route,
      tool.publication,
      tool.structuredData,
      routeName,
    );
    if (
      tool.publication === "preview" &&
      sitemap.includes(`/${locale}/${route}/`)
    )
      throw new Error(`${routeName} leaked into the sitemap.`);
    if (
      tool.publication === "indexable" &&
      !sitemap.includes(`/${locale}/${route}/`)
    )
      throw new Error(`${routeName} is missing from the sitemap.`);
  }

  for (const legalPage of legalPages) {
    const routeName = `${locale}/${legalPage}`;
    const html = await readFile(
      join(dist, locale, legalPage, "index.html"),
      "utf8",
    );
    verifyMetadata(html, locale, legalPage, "indexable", [], routeName);
    if (!sitemap.includes(`/${locale}/${legalPage}/`))
      throw new Error(`${routeName} is missing from the sitemap.`);
  }

  const redirect = await readFile(
    join(dist, locale, "tools", "index.html"),
    "utf8",
  );
  if (!redirect.includes(`url=/${locale}/`))
    throw new Error(`${locale}/tools does not redirect to the directory.`);
}

for (const locale of locales) {
  if (!sitemap.includes(`hreflang="${locale}"`))
    throw new Error(`Sitemap is missing ${locale} hreflang alternates.`);
  if (!sitemap.includes(`<loc>${expectedUrl(locale)}</loc>`))
    throw new Error(`Sitemap is missing the ${locale} directory.`);
}
if (!sitemap.includes('hreflang="x-default"'))
  throw new Error("Sitemap is missing x-default alternates.");
if (sitemap.includes("<lastmod>"))
  throw new Error(
    "Sitemap must omit lastmod until trustworthy per-page dates exist.",
  );

if (target === "preview") {
  if (robots !== "User-agent: *\nDisallow: /\n")
    throw new Error("Preview robots.txt must disallow all crawling.");
} else {
  for (const agent of [
    "*",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "Claude-SearchBot",
    "Claude-User",
    "ClaudeBot",
    "PerplexityBot",
    "Perplexity-User",
  ]) {
    if (!robots.includes(`User-agent: ${agent}\nAllow: /`))
      throw new Error(`Production robots.txt is missing the ${agent} policy.`);
  }
  if (!robots.includes(`Sitemap: ${new URL("/sitemap.xml", config.origin)}`))
    throw new Error("Production robots.txt has the wrong sitemap URL.");
}

for (const route of previews) {
  if (llms.includes(`/${route}/`))
    throw new Error(
      `${route} leaked into llms.txt before its indexability review.`,
    );
}
for (const route of publicTools) {
  if (!llms.includes(`/${route}/`))
    throw new Error(`${route} is missing from llms.txt.`);
}
for (const legalPage of legalPages) {
  if (!llms.includes(`/${legalPage}/`))
    throw new Error(`${legalPage} is missing from llms.txt.`);
}

const notFound = await readFile(join(dist, "404.html"), "utf8");
verifyStaticContentPolicy(notFound, "404");
verifyFaviconLink(notFound, "404");
const rootIndex = await readFile(join(dist, "index.html"), "utf8");
verifyStaticContentPolicy(rootIndex, "root index");
verifyFaviconLink(rootIndex, "root index");
const rootIndexForScriptingBrowsers = rootIndex.replace(
  /<noscript\b[^>]*>[\s\S]*?<\/noscript>/giu,
  "",
);
if (rootIndexForScriptingBrowsers.includes("Continue to all tools")) {
  throw new Error(
    "The root entry exposes its English fallback before browser-language detection completes.",
  );
}
if (
  !/<noscript\b[^>]*>[\s\S]*?http-equiv=["']refresh["'][\s\S]*?url=\/en\/[\s\S]*?<\/noscript>/iu.test(
    rootIndex,
  )
) {
  throw new Error(
    "The root entry must retain an English fallback when browser-language detection cannot run.",
  );
}
const redirectLines = redirects
  .split(/\r?\n/u)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
if (redirectLines.some((line) => line.split(/\s+/u)[0] === "/")) {
  throw new Error(
    "The root entry must remain available for browser-language detection instead of forcing a static locale redirect.",
  );
}
if (!rootIndex.includes('<link rel="license" href="/third-party-notices.txt">'))
  throw new Error("Root index does not expose its third-party notices.");
if (
  metaContent(notFound, "name", "robots") !==
  (target === "production" ? "noindex,follow" : "noindex,nofollow")
) {
  throw new Error(`404 has the wrong ${target} robots directive.`);
}
if (
  notFound.includes('rel="canonical"') ||
  notFound.includes('rel="alternate" hreflang=')
)
  throw new Error("404 must not declare canonical or head locale alternates.");
if (notFound.includes('type="application/ld+json"'))
  throw new Error("404 must not emit canonical structured data.");

const base64Html = await readFile(
  join(dist, "en", "base64-decode", "index.html"),
  "utf8",
);
const timeHtml = await readFile(
  join(dist, "en", "unix-timestamp-converter", "index.html"),
  "utf8",
);
if (
  base64Html.includes("TimeConverter") ||
  base64Html.includes("temporal-polyfill")
)
  throw new Error("Time conversion code leaked into the Base64 route.");
if (timeHtml.includes("codec.worker"))
  throw new Error("Base64 worker code leaked into the timestamp route.");

console.log(
  `Network QA passed for ${target}: metadata, parsed JSON-LD, indexability, crawler policy, sitemap, llms.txt, redirects, locale links, integrations, licenses, formatter worker budgets and route isolation are intact.`,
);
console.log(
  `Formatter worker bytes: ${Object.entries(formatterWorkerSizes)
    .map(([component, size]) => `${component}=${size}`)
    .join(", ")}.`,
);
