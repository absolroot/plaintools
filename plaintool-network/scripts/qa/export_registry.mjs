import {
  legalPages,
  locales,
  toolRegistry,
} from "../../apps/web/src/lib/content-registry.js";

const payload = {
  schemaVersion: 1,
  locales: [...locales],
  legalPages: [...legalPages],
  tools: toolRegistry.map(
    ({ id, featureId, slug, publication, structuredData, topToolPromise }) => ({
      id,
      featureId,
      slug,
      publication,
      structuredData: [...structuredData],
      topToolPromise: topToolPromise !== false,
    }),
  ),
};

process.stdout.write(`${JSON.stringify(payload)}\n`);
