# Dev server reliability pass — 2026-08-30

## Reproduction

- `npm run dev -- --host 127.0.0.1 --port 4321` reached the workspace script as
  `astro dev 127.0.0.1 4321`; npm 11 removed the option names and Astro started
  its default `localhost:4321` server.
- A production CSP meta was also emitted in `astro dev`, blocking HMR-related
  inline development behavior and browser-side QA evaluation.
- Cold discovery of the formatter engines could trigger Vite's
  `504 Outdated Optimize Dep` response before its dependency cache warmed.

## Changes

- The root `dev` script now invokes Astro through `scripts/dev-site.mjs` and
  preserves `status`, `logs`, and `stop` lifecycle commands.
- `scripts/dev-site-args.mjs` restores host/port option names when npm 11 on
  Windows passes only their values. Unit tests cover stripped arguments,
  explicit arguments, and lifecycle commands.
- The five formatter engine entry points are included in Vite dependency
  optimization so they are ready before the first tool interaction.
- The CSP meta is production-only. Static builds still emit it, while dev mode
  remains compatible with Astro HMR and browser QA.

## Verification

- Deleted only the two verified repository-local `.vite` caches and started
  the exact root command on `127.0.0.1:4387`.
- Cold start completed in 1.689 seconds at the requested address.
- Immediate `qa:security` browser traversal covered HTML, CSS, JavaScript
  format/minify, SQL, and IPv4 subnet routes without console errors, page
  errors, external conversion requests, UI failures, or first-load 504s.
- Dev HTML returned HTTP 200 without the production CSP meta; the generated
  root and HTML formatter pages retained the CSP meta.
- 331 Vitest tests passed.
- `npm run check` passed with 14 feature manifests and 17 public locales.
- `npm run build` generated and validated all 546 preview pages, license files,
  locale metadata, route isolation, and formatter worker budgets.
