# Root entry, directory SEO, and favicon QA — 2026-08-30

## Scope

- Make `/` redirect at the Cloudflare Pages HTTP layer to the x-default `/en/`
  route before the fallback HTML can paint.
- Replace generic free-online-tools directory positioning with brand-first text,
  data, and code tool wording in all 17 public locales.
- Replace the legacy `64` favicon with a shared blue `AT` monogram and expose a
  64 x 64 PNG from every generated HTML surface.

## Redirect contract

- `_redirects` begins with `/ /en/ 302`; the first-match order is asserted by
  `scripts/qa-network.mjs`.
- `/en/` remains the existing `x-default` directory. Explicit locale routes,
  canonical URLs, reciprocal hreflang, sitemap URLs, and the `www` to apex
  redirect contract are unchanged.
- Astro development mode does not interpret Cloudflare Pages `_redirects`, so
  the HTTP redirect itself is gated in build output and requires live
  verification after deployment. It is not reported as live before that point.

## Locale and SEO review

- Updated `directoryMetaTitle`, `directoryMetaDescription`, `directoryTitle`,
  and `directoryIntro` in `en`, `ko`, `es`, `de`, `ja`, `fr`, `pt-BR`, `it`,
  `nl`, `sv`, `cs`, `pl`, `da`, `no`, `ar`, `zh-TW`, and `tr`.
- The shared source meaning names browser-based text, data, and code tasks and
  limits the no-upload statement to tool inputs and results.
- All 14 feature manifests were reviewed and refreshed because their locale
  fingerprints include the shared directory fields.
- This is source-meaning-aligned agent review, not native-human approval and not
  evidence of search volume or a ranking claim.

## Browser and visual evidence

- Chrome DevTools MCP failed before navigation with `Could not find
  DevToolsActivePort` for the user's Chrome profile.
- The in-app browser fallback failed during connection with
  `codex/sandbox-state-meta: missing field sandboxPolicy`.
- Pre-existing listeners at ports 4321 and 4327 were preserved.
- Task-owned server command: `$env:ASTRO_DEV_BACKGROUND='1'; node
  ..\..\node_modules\astro\bin\astro.mjs dev --ignore-lock --host 127.0.0.1
  --port 4328`.
- Task-owned URL and unified-exec session: `http://127.0.0.1:4328`, session
  `33195`.
- The repository-wide Playwright suite was attempted and reached the owned
  server, but its Base64 desktop alignment check expected a missing DOM node and
  stopped with `Cannot read properties of null (reading
  'getBoundingClientRect')`. This is recorded as an unavailable suite result,
  not a pass.
- Focused Playwright fallback rendered `/en/` at 1440 x 1000 and `/ko/` at
  390 x 844. Both returned 200, had no console errors, made no cross-origin
  requests, and had `scrollWidth === clientWidth`.
- The rendered English and Korean headings were visually inspected and remained
  aligned with the existing directory grid. No page geometry, navigation, card,
  or control styling changed.
- `/favicon.png` returned 200 as `image/png`, was 1,362 bytes, and the rendered
  64 x 64 image was visually inspected as a clear white `AT` on the existing
  blue tile.

## Source and build checks

- `npm run locale:check`: passed, 14 features and 17 public locales.
- `npm run seo:check`: passed, 25 tools and 17 locales.
- `npm test`: passed, 38 files and 341 tests.
- `npm run ui:check`: passed.
- TypeScript, Astro diagnostics, and ESLint passed as part of `npm run check`.
- The full `npm run check` remained blocked only at the repository-wide
  Prettier gate by 136 existing out-of-format paths; none of the task-modified
  app source files appeared in that warning list.
- `npm run build`: passed, 546 preview pages and preview network QA.
- `npm run build:production`: passed with the reviewed production facts, 546
  production pages, and production network QA.
