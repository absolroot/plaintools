import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  legalPages,
  locales,
  toolRegistry,
} from "../apps/web/src/lib/content-registry.js";
import {
  implementedIntegrationCapabilities,
  resolveDeploymentConfig,
} from "../apps/web/src/lib/deployment-config.js";

const args = process.argv.slice(2);
const targetIndex = args.indexOf("--target");
const target = targetIndex >= 0 ? args[targetIndex + 1] : "preview";
if (target !== "preview" && target !== "production") {
  throw new Error("qa-network requires --target preview|production.");
}

const config = resolveDeploymentConfig(
  process.env,
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
  const canonical = canonicalUrl(html);
  const expectedCanonical = expectedUrl(locale, page);
  if (canonical !== expectedCanonical)
    throw new Error(
      `${route} canonical is ${canonical}, expected ${expectedCanonical}.`,
    );
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
  `Network QA passed for ${target}: metadata, parsed JSON-LD, indexability, crawler policy, sitemap, llms.txt, redirects, locale links, integrations and route isolation are intact.`,
);
