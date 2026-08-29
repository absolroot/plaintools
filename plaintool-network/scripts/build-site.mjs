import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const targetIndex = args.indexOf("--target");
const target = targetIndex >= 0 ? args[targetIndex + 1] : "preview";

if (target !== "preview" && target !== "production") {
  console.error(
    "Usage: node scripts/build-site.mjs --target preview|production",
  );
  process.exit(1);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const child = spawn(
  npmCommand,
  ["run", "build", "--workspace", "@plaintool/web"],
  {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, PLAINTOOL_BUILD_TARGET: target },
    shell: process.platform === "win32",
    stdio: "inherit",
  },
);

child.on("error", (error) => {
  console.error(`Could not start the ${target} site build: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`The ${target} site build stopped after signal ${signal}.`);
    process.exitCode = 1;
    return;
  }
  process.exitCode = code ?? 1;
});
