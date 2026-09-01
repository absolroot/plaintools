import { readFile } from "node:fs/promises";

const config = JSON.parse(await readFile("deployment.config.json", "utf8"));
if (config.mode !== "production" || !/^https:\/\/(?!preview\.invalid$)[^/]+$/i.test(config.origin)) {
  throw new Error("Production build is blocked until a verified HTTPS origin and production deployment configuration are supplied.");
}
if (config.integrations.analytics || config.integrations.ads) {
  throw new Error("Analytics and ads require separate approved privacy and deployment work.");
}
console.log("Production deployment configuration is valid.");
