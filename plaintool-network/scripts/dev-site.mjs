import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { normalizeDevArgs } from "./dev-site-args.mjs";

const repositoryRoot = new URL("..", import.meta.url);
const webRoot = new URL("../apps/web/", import.meta.url);
const astroEntrypoint = fileURLToPath(
  new URL("node_modules/astro/bin/astro.mjs", repositoryRoot),
);

const child = spawn(
  process.execPath,
  [astroEntrypoint, "dev", ...normalizeDevArgs(process.argv.slice(2))],
  {
    cwd: webRoot,
    env: process.env,
    stdio: "inherit",
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}

child.on("error", (error) => {
  console.error(`Could not start the development server: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.exitCode = signal === "SIGINT" ? 130 : 1;
    return;
  }
  process.exitCode = code ?? 1;
});
