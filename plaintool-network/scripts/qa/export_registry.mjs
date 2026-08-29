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
    ({ id, featureId, slug, publication, structuredData }) => ({
      id,
      featureId,
      slug,
      publication,
      structuredData: [...structuredData],
    }),
  ),
};

process.stdout.write(`${JSON.stringify(payload)}\n`);
