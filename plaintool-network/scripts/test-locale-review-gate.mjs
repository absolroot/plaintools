import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const localEvidenceEnv = { ...process.env };
delete localEvidenceEnv.LOCALE_REVIEW_MANIFEST_ROOT;

const localEvidenceRoot =
  process.env.LOCALE_REVIEW_MANIFEST_ROOT ??
  "research/i18n/local-reviews/locale-review-manifests";
if (existsSync(localEvidenceRoot)) {
  const result = spawnSync(
    process.execPath,
    ["scripts/check-locale-reviews.mjs"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...localEvidenceEnv,
        LOCALE_REVIEW_SELF_TEST: "missing-manifest",
      },
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
}

const unavailableEvidenceResult = spawnSync(
  process.execPath,
  ["scripts/check-locale-reviews.mjs", "--production"],
  {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      LOCALE_REVIEW_MANIFEST_ROOT:
        "research/i18n/local-reviews/missing-for-ci-fixture",
    },
  },
);
const unavailableEvidenceOutput = `${unavailableEvidenceResult.stdout}\n${unavailableEvidenceResult.stderr}`;

if (unavailableEvidenceResult.status !== 0) {
  throw new Error(
    "Locale review gate must allow a clean CI checkout without local-only evidence.",
  );
}
if (
  !unavailableEvidenceOutput.includes("skipping local-only evidence validation")
) {
  throw new Error(
    "Locale review gate did not report the unavailable local-only evidence.",
  );
}

console.log(
  "Locale review self-test passed: missing manifests are rejected when evidence exists, and clean CI checkouts skip local-only evidence.",
);
