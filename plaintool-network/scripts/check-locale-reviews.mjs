import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { locales, toolRegistry } from "../apps/web/src/lib/content-registry.js";
import { fingerprintManifest } from "./locale-review-fingerprint.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestRoot = resolve(
  projectRoot,
  "apps/web/src/lib/locale-review-manifests",
);
const args = process.argv.slice(2);
const production = args.includes("--production");
const printFingerprints = args.includes("--print-fingerprints");
const selfTest = process.env.LOCALE_REVIEW_SELF_TEST;

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function exportedLocales(file) {
  const source = await import(pathToFileURL(resolve(projectRoot, file)).href);
  if (!Array.isArray(source.locales)) {
    throw new TypeError(`${file} must export a locales array.`);
  }
  return source.locales;
}

const featureManifests = new Map();
for (const tool of toolRegistry) {
  const existing = featureManifests.get(tool.featureId);
  if (existing && existing !== tool.localeReviewManifest) {
    console.error(
      `Locale review gate failed: ${tool.featureId} has conflicting manifests.`,
    );
    process.exit(1);
  }
  featureManifests.set(tool.featureId, tool.localeReviewManifest);
}

if (selfTest === "missing-manifest") {
  featureManifests.set(
    "missing-gate-fixture",
    "apps/web/src/lib/locale-review-manifests/missing-gate-fixture.json",
  );
}

const errors = [];
const referencedNames = new Set();
for (const [featureId, manifestFile] of featureManifests) {
  if (typeof manifestFile !== "string" || !manifestFile) {
    errors.push(`${featureId} has no locale review manifest path.`);
    continue;
  }

  const manifestPath = resolve(projectRoot, manifestFile);
  referencedNames.add(manifestPath.split(/[\\/]/).at(-1));
  let manifest;
  try {
    manifest = await readJson(manifestPath);
  } catch (error) {
    errors.push(
      `${featureId} locale review manifest cannot be read: ${error.message}`,
    );
    continue;
  }

  if (manifest.schemaVersion !== 1)
    errors.push(`${featureId} uses an unsupported locale review schema.`);
  if (manifest.featureId !== featureId)
    errors.push(
      `${manifestFile} belongs to ${manifest.featureId}, not ${featureId}.`,
    );
  if (
    !new Set(["existing-baseline", "new-feature", "preview-feature"]).has(
      manifest.enforcement,
    )
  ) {
    errors.push(
      `${featureId} has invalid enforcement: ${manifest.enforcement}.`,
    );
  }
  if (manifest.sourceLocale !== "en")
    errors.push(`${featureId} must declare en as its source locale.`);
  if (!Array.isArray(manifest.copyFiles) || manifest.copyFiles.length === 0) {
    errors.push(`${featureId} has no fingerprinted copy surfaces.`);
    continue;
  }
  if (
    manifest.copyDirectories !== undefined &&
    !Array.isArray(manifest.copyDirectories)
  ) {
    errors.push(`${featureId} copyDirectories must be an array when present.`);
    continue;
  }

  let sourceLocales = [];
  try {
    sourceLocales = await exportedLocales(manifest.localeSourceFile);
  } catch (error) {
    errors.push(`${featureId} locale source cannot be read: ${error.message}`);
  }
  if (JSON.stringify(sourceLocales) !== JSON.stringify(locales)) {
    errors.push(
      `${featureId} source locales do not match the public locale registry.`,
    );
  }
  if (JSON.stringify(manifest.publicLocales) !== JSON.stringify(locales)) {
    errors.push(
      `${featureId} reviewed locales do not match the public locale registry.`,
    );
  }

  for (const locale of locales) {
    const review = manifest.locales?.[locale];
    if (!review) {
      errors.push(`${featureId}:${locale} has no locale review.`);
      continue;
    }
    const allowedStatuses =
      manifest.enforcement === "new-feature"
        ? ["adversarial-reviewed", "native-approved"]
        : ["reference-backed", "native-approved"];
    if (!allowedStatuses.includes(review.status)) {
      errors.push(
        `${featureId}:${locale} review status ${review.status} is not allowed for ${manifest.enforcement}.`,
      );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt ?? "")) {
      errors.push(`${featureId}:${locale} has no valid review date.`);
    }
    if (!Array.isArray(review.referenceIds) || review.referenceIds.length < 2) {
      errors.push(
        `${featureId}:${locale} needs at least two native reference ids.`,
      );
    }
  }

  let currentFingerprint;
  try {
    currentFingerprint = await fingerprintManifest(
      projectRoot,
      manifest,
      locales,
    );
  } catch (error) {
    errors.push(`${featureId} copy surface cannot be read: ${error.message}`);
    continue;
  }

  if (printFingerprints) {
    console.log(`${featureId} ${currentFingerprint}`);
    continue;
  }
  const expectedFingerprint =
    selfTest === "fingerprint" &&
    featureId === featureManifests.keys().next().value
      ? "sha256:self-test-stale"
      : manifest.copyFingerprint;
  if (expectedFingerprint !== currentFingerprint) {
    errors.push(
      `${featureId} copy fingerprint changed. Expected ${expectedFingerprint}, received ${currentFingerprint}. Complete the locale review before updating the manifest.`,
    );
  }

  const publicationStates = toolRegistry
    .filter((tool) => tool.featureId === featureId)
    .map((tool) => tool.publication);
  if (
    production &&
    (manifest.enforcement === "preview-feature" ||
      publicationStates.some((state) => state !== "indexable"))
  ) {
    errors.push(
      `${featureId} cannot enter a production build before promotion review.`,
    );
  }
}

for (const name of (await readdir(manifestRoot)).filter((item) =>
  item.endsWith(".json"),
)) {
  if (!referencedNames.has(name))
    errors.push(`Orphan locale review manifest: ${name}.`);
}

if (printFingerprints) process.exit(0);

if (errors.length) {
  console.error("Locale review gate failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Locale review gate passed: ${featureManifests.size} features, ${locales.length} public locales${production ? ", production promotion state" : ""}.`,
);
