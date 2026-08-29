import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_ORIGIN || "https://preview.invalid";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  vite: {
    build: {
      sourcemap: true
    }
  }
});
