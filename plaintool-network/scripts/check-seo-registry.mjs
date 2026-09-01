import { access, readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { locales, toolRegistry } from "../apps/web/src/lib/content-registry.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const production = process.argv.slice(2).includes("--production");
const routeRoot = resolve(projectRoot, "apps/web/src/pages/[locale]");
const errors = [];
const registeredTools =
  process.env.SEO_REGISTRY_SELF_TEST === "1"
    ? [
        ...toolRegistry,
        {
          id: "missing-gate-fixture",
          featureId: "missing-gate-fixture",
          slug: "missing-gate-fixture",
          category: "text",
          publication: "preview",
          structuredData: ["SoftwareApplication", "BreadcrumbList"],
        },
      ]
    : toolRegistry;

const ids = new Set();
const slugs = new Set();
for (const tool of registeredTools) {
  if (ids.has(tool.id)) errors.push(`Duplicate tool registry id: ${tool.id}`);
  if (slugs.has(tool.slug))
    errors.push(`Duplicate tool registry slug: ${tool.slug}`);
  ids.add(tool.id);
  slugs.add(tool.slug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.slug))
    errors.push(`Invalid tool slug: ${tool.slug}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.featureId))
    errors.push(`Invalid feature id: ${tool.featureId}`);
  if (!new Set(["indexable", "preview"]).has(tool.publication))
    errors.push(
      `Invalid publication state for ${tool.slug}: ${tool.publication}`,
    );
  if (production && tool.publication !== "indexable")
    errors.push(
      `${tool.slug} cannot enter a production build while its publication state is ${tool.publication}.`,
    );
  if (
    !new Set([
      "encoding",
      "generator",
      "text",
      "converter",
      "image",
      "pdf",
      "data",
      "calculator",
      "time",
    ]).has(tool.category)
  )
    errors.push(`Invalid category for ${tool.slug}: ${tool.category}`);
  if (
    !Array.isArray(tool.structuredData) ||
    !tool.structuredData.includes("SoftwareApplication") ||
    !tool.structuredData.includes("BreadcrumbList")
  ) {
    errors.push(
      `${tool.slug} must declare its required application and breadcrumb structured data.`,
    );
  }

  const routeFile = `apps/web/src/pages/[locale]/${tool.slug}/index.astro`;
  try {
    await access(resolve(projectRoot, routeFile));
  } catch {
    errors.push(
      `${tool.slug} is registered but its route is missing: ${routeFile}`,
    );
  }
}

const routeEntries = await readdir(routeRoot, { withFileTypes: true });
for (const entry of routeEntries) {
  if (!entry.isDirectory() || entry.name === "tools") continue;
  try {
    const routeFile = resolve(routeRoot, entry.name, "index.astro");
    await access(routeFile);
    const source = await readFile(routeFile, "utf8");
    const isRedirectOnly = /return\s+Astro\.redirect\(/u.test(source);
    if (!slugs.has(entry.name) && !isRedirectOnly)
      errors.push(
        `Implemented tool route is absent from the SEO registry: ${entry.name}`,
      );
  } catch {}
}

if (errors.length) {
  console.error("SEO registry gate failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `SEO registry gate passed: ${registeredTools.length} tools, ${locales.length} locales${production ? ", production publication state" : ""}.`,
);
