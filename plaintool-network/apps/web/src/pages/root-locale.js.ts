import type { APIRoute } from "astro";
import { build } from "esbuild";
import { resolve } from "node:path";

// Emit a static, same-origin classic script. Running it in the head before
// parsing the directory avoids flashing English before a locale redirect.
// Bundle the tested detector so the client has exactly one matching policy.
export const GET: APIRoute = async () => {
  const result = await build({
    stdin: {
      contents: `import { detectPreferredLocale } from "./locale-detection";
window.location.replace("/" + detectPreferredLocale(navigator.languages) + "/");`,
      resolveDir: resolve("src/lib"),
    },
    bundle: true,
    write: false,
    format: "iife",
    platform: "browser",
    target: "es2022",
    minify: true,
  });
  return new Response(result.outputFiles[0].text, {
    headers: { "Content-Type": "text/javascript; charset=utf-8" },
  });
};
