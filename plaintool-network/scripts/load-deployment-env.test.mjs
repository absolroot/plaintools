import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadDeploymentEnv } from "./load-deployment-env.mjs";

const directories = [];
afterEach(() => {
  for (const directory of directories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "absoltools-env-"));
  directories.push(directory);
  return join(directory, ".env");
}

function run(path, value) {
  const env = { ...process.env };
  delete env.ABSOLTOOLS_ENV_TEST;
  if (value !== undefined) env.ABSOLTOOLS_ENV_TEST = value;
  return spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `import { loadDeploymentEnv } from ${JSON.stringify(new URL("./load-deployment-env.mjs", import.meta.url).href)};
       loadDeploymentEnv(process.argv[1]);
       console.log(JSON.stringify(process.env.ABSOLTOOLS_ENV_TEST ?? null));`,
      path,
    ],
    { env, encoding: "utf8" },
  );
}

describe("local deployment environment", () => {
  it("loads quoted values containing spaces from a local file", () => {
    const path = fixture();
    writeFileSync(path, 'ABSOLTOOLS_ENV_TEST="Local operator name"\n');
    const result = run(path);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toBe("Local operator name");
  });

  it.each(["Host configuration", ""])(
    "preserves an existing environment value: %j",
    (value) => {
      const path = fixture();
      writeFileSync(path, "ABSOLTOOLS_ENV_TEST=local\n");
      const result = run(path, value);
      expect(result.status).toBe(0);
      expect(JSON.parse(result.stdout)).toBe(value);
    },
  );

  it("permits a missing file without inventing deployment values", () => {
    const result = run(fixture());
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toBeNull();
  });

  it("does not hide invalid argument errors", () => {
    expect(() => loadDeploymentEnv(42)).toThrow(TypeError);
  });
});
