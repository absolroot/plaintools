import { defineConfig } from "astro/config";
import {
  implementedIntegrationCapabilities,
  resolveDeploymentConfig,
} from "./src/lib/deployment-config.js";

const deploymentTarget =
  process.env.PLAINTOOL_BUILD_TARGET === "production"
    ? "production"
    : "preview";
const deploymentConfig = resolveDeploymentConfig(
  process.env,
  deploymentTarget,
  implementedIntegrationCapabilities,
);

export default defineConfig({
  site: deploymentConfig.origin,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      sourcemap: false,
    },
    worker: {
      format: "es",
    },
  },
});
