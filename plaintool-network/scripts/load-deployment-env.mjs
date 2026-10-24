import { loadEnvFile } from "node:process";

// Match the documented local production workflow without overriding host/CI
// variables. Missing local files are normal on a configured build host.
export function loadDeploymentEnv(path = new URL("../.env", import.meta.url)) {
  try {
    loadEnvFile(path);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
