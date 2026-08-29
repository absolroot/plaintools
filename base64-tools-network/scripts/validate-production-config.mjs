import {
  implementedIntegrationCapabilities,
  resolveDeploymentConfig,
} from "../apps/base64-codec/src/lib/deployment-config.js";

const config = resolveDeploymentConfig(
  process.env,
  "production",
  implementedIntegrationCapabilities,
);

if (!config.productionReady) {
  console.error("Production configuration is invalid:");
  for (const issue of config.issues) console.error(`- ${issue.message}`);
  process.exit(1);
}

console.log(
  "Production configuration passed: required deployment facts are valid and requested integrations are implemented.",
);
