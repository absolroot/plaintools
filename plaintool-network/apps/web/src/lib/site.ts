import {
  contentPages,
  legalPages,
  locales,
  previewPages,
  publicToolPages,
  toolPages,
  toolRegistry,
} from "./content-registry.js";
import {
  implementedIntegrationCapabilities,
  productionIntegrationDefaults,
  resolveDeploymentConfig,
} from "./deployment-config.js";

export type Locale = (typeof locales)[number];
export type LegalPage = (typeof legalPages)[number];
export type ToolPage = (typeof toolRegistry)[number]["slug"];
export type ContentPage = (typeof contentPages)[number];

export {
  contentPages,
  legalPages,
  locales,
  previewPages,
  publicToolPages,
  toolPages,
};

const deploymentTarget =
  import.meta.env.PLAINTOOL_BUILD_TARGET === "production"
    ? "production"
    : "preview";

export const siteConfig = resolveDeploymentConfig(
  deploymentTarget === "production"
    ? { ...productionIntegrationDefaults, ...import.meta.env }
    : import.meta.env,
  deploymentTarget,
  implementedIntegrationCapabilities,
);

export function localizedPath(locale: Locale, page?: ContentPage): string {
  return page ? `/${locale}/${page}/` : `/${locale}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.origin).toString();
}
