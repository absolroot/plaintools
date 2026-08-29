import { spawnSync } from "node:child_process";

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

console.log(
  "Locale review self-test passed: stale fingerprints and missing manifests are rejected.",
);
