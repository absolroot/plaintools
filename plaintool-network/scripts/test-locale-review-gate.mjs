import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fingerprintManifest } from "./locale-review-fingerprint.mjs";

for (const [fixture, expected] of [
  ["fingerprint", "copy fingerprint changed"],
  ["missing-manifest", "locale review manifest cannot be read"],
]) {
  const result = spawnSync(
    process.execPath,
    ["scripts/check-locale-reviews.mjs"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      env: { ...process.env, LOCALE_REVIEW_SELF_TEST: fixture },
    },
  );
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    throw new Error(`Locale review self-test ${fixture} expected a failure.`);
  }
  if (!output.includes(expected)) {
    throw new Error(
      `Locale review self-test ${fixture} did not report: ${expected}`,
    );
  }
}

const fixtureRoot = await mkdtemp(join(tmpdir(), "absoltools-locale-review-"));
try {
  const sources = {
    "apps/web/src/lib/tool-registry.js": "image-resizer registry entry\n",
    "apps/web/src/lib/locale-data/bundle.ts": "locale assembler\n",
    "apps/web/src/lib/locale-data/new-tools/other-tool.ts":
      "unrelated tool copy\n",
    "apps/web/src/lib/locale-data/new-tools/image-resizer.ts":
      "image resizer copy v1\n",
    "apps/web/src/features/image-resizer/copy.ts": "image resizer facade v1\n",
    "apps/web/src/layouts/SiteLayout.astro": "shared site layout v1\n",
  };
  for (const [file, source] of Object.entries(sources)) {
    const path = join(fixtureRoot, ...file.split("/"));
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, source, "utf8");
  }

  const manifest = {
    featureId: "image-resizer",
    copyFiles: [
      "apps/web/src/lib/tool-registry.js",
      "apps/web/src/lib/locale-data/bundle.ts",
      "apps/web/src/lib/locale-data/new-tools/image-resizer.ts",
      "apps/web/src/features/image-resizer/copy.ts",
      "apps/web/src/layouts/SiteLayout.astro",
    ],
    copyDirectories: ["apps/web/src/lib/locale-data"],
  };
  const baseline = await fingerprintManifest(fixtureRoot, manifest, ["en"]);

  await writeFile(
    join(fixtureRoot, "apps/web/src/lib/tool-registry.js"),
    "unrelated tool registry entry changed\n",
    "utf8",
  );
  await writeFile(
    join(fixtureRoot, "apps/web/src/lib/locale-data/new-tools/other-tool.ts"),
    "unrelated tool copy changed\n",
    "utf8",
  );
  await writeFile(
    join(fixtureRoot, "apps/web/src/layouts/SiteLayout.astro"),
    "shared site layout v2\n",
    "utf8",
  );
  const unrelatedChange = await fingerprintManifest(fixtureRoot, manifest, [
    "en",
  ]);
  if (unrelatedChange !== baseline) {
    throw new Error(
      "Shared infrastructure or unrelated tool copy changed the image-resizer fingerprint.",
    );
  }

  await writeFile(
    join(
      fixtureRoot,
      "apps/web/src/lib/locale-data/new-tools/image-resizer.ts",
    ),
    "image resizer copy v2\n",
    "utf8",
  );
  const ownedChange = await fingerprintManifest(fixtureRoot, manifest, ["en"]);
  if (ownedChange === baseline) {
    throw new Error(
      "Feature-owned copy change did not change the image-resizer fingerprint.",
    );
  }
} finally {
  await rm(fixtureRoot, { recursive: true, force: true });
}

console.log(
  "Locale review self-test passed: stale fingerprints and missing manifests are rejected; shared infrastructure and unrelated registry changes are isolated, while feature-owned copy changes are detected.",
);
