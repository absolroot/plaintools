import test from "node:test";
import assert from "node:assert/strict";
import { obfuscateCatalog, restoreCatalog } from "../src/catalog-codec.js";
import { validateCatalog } from "../scripts/catalog-rules.mjs";

test("catalogue payload round-trips without plaintext JSON", () => {
  const catalog = { version: 1, records: [{ id: "x", cid: "1833981" }] };
  const payload = obfuscateCatalog(catalog);
  assert.equal(payload.includes("1833981"), false);
  assert.deepEqual(restoreCatalog(payload), catalog);
});

test("verified hotel records need official evidence and a numeric CID", () => {
  const catalogue = { version: 1, records: [{ id: "map-a", state: "verified", kind: "hotel", cid: "1833981", label: "Maps", category: "map", markets: ["global"], eligibility: "Check Agoda", evidence: [{ url: "https://www.agoda.com/example", checkedAt: "2026-09-01", sourceType: "official" }], validUntil: "2026-12-31" }] };
  assert.deepEqual(validateCatalog(catalogue), []);
});
