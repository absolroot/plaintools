import { spawnSync } from "node:child_process";

const result = spawnSync(
  process.execPath,
  ["scripts/check-locale-reviews.mjs"],
  {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, LOCALE_REVIEW_SELF_TEST: "missing-manifest" },
  },
);
const output = `${result.stdout}\n${result.stderr}`;

if (result.status === 0) {
  throw new Error(
    "Locale review missing-manifest self-test expected a failure.",
  );
}
if (!output.includes("locale review manifest cannot be read")) {
  throw new Error(
    "Locale review missing-manifest self-test did not report the missing manifest.",
  );
}

console.log(
  "Locale review self-test passed: missing manifests are rejected without coupling unrelated feature changes through repository-wide fingerprints.",
);
