import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["scripts/check-seo-registry.mjs"], {
  cwd: process.cwd(),
  encoding: "utf8",
  env: { ...process.env, SEO_REGISTRY_SELF_TEST: "1" },
});

const output = `${result.stdout}\n${result.stderr}`;
if (result.status === 0)
  throw new Error(
    "SEO registry self-test expected the incomplete feature to fail.",
  );
for (const expected of [
  "missing-gate-fixture is registered but its route is missing",
]) {
  if (!output.includes(expected))
    throw new Error(`SEO registry self-test did not report: ${expected}`);
}

const productionResult = spawnSync(
  process.execPath,
  ["scripts/check-seo-registry.mjs", "--production"],
  {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, SEO_REGISTRY_SELF_TEST: "1" },
  },
);
const productionOutput = `${productionResult.stdout}\n${productionResult.stderr}`;
if (productionResult.status === 0)
  throw new Error(
    "SEO registry self-test expected preview tools to fail production.",
  );
if (!productionOutput.includes("cannot enter a production build"))
  throw new Error(
    "SEO registry self-test did not enforce production publication state.",
  );

console.log(
  "SEO registry self-test passed: incomplete routes and preview production builds are rejected.",
);
