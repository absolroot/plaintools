import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const SHARED_ASSEMBLY_FILES = new Set([
  "apps/web/src/lib/tool-registry.js",
  "apps/web/src/lib/tool-catalog.ts",
  "apps/web/src/lib/locale-data/bundle.ts",
  "apps/web/src/lib/locale-data/index.ts",
  "apps/web/src/lib/locale-data/new-tools/factory.ts",
]);

// Older copy predates feature-local locale modules. Keep those two authored
// locale groups fail-closed without letting a new dedicated locale module
// invalidate every manifest that once scanned the whole locale-data tree.
const ROOT_LOCALE_FEATURES = new Set([
  "base64-codec",
  "case-converter",
  "json-formatter",
  "text-compare",
  "unix-timestamp-converter",
  "word-counter",
]);

const LEGACY_NEW_TOOL_LOCALE_FEATURES = new Set([
  "ai-text-cleaner",
  "data-converter",
  "hash-generator",
  "jwt-decoder",
  "qr-code",
  "url-codec",
]);

function normalizePath(file) {
  return file.replaceAll("\\", "/");
}

function isLocaleModule(file, directory, locales) {
  return locales.some((locale) => file === `${directory}/${locale}.ts`);
}

function isOwnedDirectoryFile(manifest, file, locales) {
  if (ROOT_LOCALE_FEATURES.has(manifest.featureId)) {
    return isLocaleModule(file, "apps/web/src/lib/locale-data", locales);
  }
  if (LEGACY_NEW_TOOL_LOCALE_FEATURES.has(manifest.featureId)) {
    return isLocaleModule(
      file,
      "apps/web/src/lib/locale-data/new-tools",
      locales,
    );
  }
  return false;
}

export async function filesInDirectory(projectRoot, relativeDirectory) {
  const absoluteDirectory = resolve(projectRoot, relativeDirectory);
  const files = [];
  for (const entry of await readdir(absoluteDirectory, {
    withFileTypes: true,
  })) {
    const relativePath = normalizePath(`${relativeDirectory}/${entry.name}`);
    if (entry.isDirectory()) {
      files.push(...(await filesInDirectory(projectRoot, relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  return files.sort();
}

export async function fingerprintFiles(projectRoot, files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file);
    hash.update("\0");
    const source = await readFile(resolve(projectRoot, file), "utf8");
    hash.update(source.replace(/\r\n?/g, "\n"));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

export async function manifestFingerprintFiles(projectRoot, manifest, locales) {
  const directoryFiles = (
    await Promise.all(
      (manifest.copyDirectories ?? []).map((directory) =>
        filesInDirectory(projectRoot, directory),
      ),
    )
  ).flat();
  const files = [
    ...new Set([
      ...manifest.copyFiles.map(normalizePath),
      ...directoryFiles.filter((file) =>
        isOwnedDirectoryFile(manifest, file, locales),
      ),
    ]),
  ]
    .filter((file) => !SHARED_ASSEMBLY_FILES.has(file))
    .sort();

  if (files.length === 0) {
    throw new Error(
      `${manifest.featureId} has no feature-owned copy surfaces.`,
    );
  }
  for (const file of files) await access(resolve(projectRoot, file));
  return files;
}

export async function fingerprintManifest(projectRoot, manifest, locales) {
  const files = await manifestFingerprintFiles(projectRoot, manifest, locales);
  return fingerprintFiles(projectRoot, files);
}
