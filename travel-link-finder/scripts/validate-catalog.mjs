import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateCatalog } from "./catalog-rules.mjs";
const input = resolve(process.env.TRAVEL_CATALOG_SOURCE || "research/private/catalog.private.json");
try { await access(input); } catch { console.log("No private catalogue installed; schema-only checkout is valid."); process.exit(0); }
const errors = validateCatalog(JSON.parse(await readFile(input, "utf8")));
if (errors.length) throw new Error(errors.join("\n"));
console.log("Catalogue source is valid.");

