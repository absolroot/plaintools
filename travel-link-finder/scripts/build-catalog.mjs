import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { obfuscateCatalog } from "../src/catalog-codec.js";
import { validateCatalog } from "./catalog-rules.mjs";

const input = resolve(process.env.TRAVEL_CATALOG_SOURCE || "research/private/catalog.private.json");
const output = resolve(process.env.TRAVEL_CATALOG_OUTPUT || "public/catalog.payload.js");
const catalog = JSON.parse(await readFile(input, "utf8"));
const errors = validateCatalog(catalog, { publicOnly: true });
if (errors.length) throw new Error(`Catalogue validation failed:\n${errors.join("\n")}`);
const publicRecords = catalog.records.filter((record) => record.state === "verified").map(({ evidence, ...record }) => record);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `window.TRAVEL_CATALOG_PAYLOAD = "${obfuscateCatalog({ version: catalog.version, records: publicRecords })}";\n`, "utf8");
console.log(`Built ${publicRecords.length} verified route records.`);

