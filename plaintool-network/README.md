# AbsolTools Network

A single Astro application for focused browser utilities. Locale roots are directories; every implemented tool has a dedicated route and workspace.

This is fully static. There is no database, account system, application server, upload endpoint, persistence layer, telemetry, or server-side conversion. Text and file bytes stay in browser memory.

The source ownership rules, runtime chronology, registry boundaries, and
previously observed regression patterns are documented in
[ARCHITECTURE.md](./ARCHITECTURE.md). Read it before moving a tool or extracting
a shared abstraction.

## Development

Use Node.js 22.19.x and npm 11. The declared engine range is enforced by the
package metadata because Astro's current runtime dependencies require Node
22.19 or newer.

```powershell
npm install
npm run dev
npm test
npm run check
npm run build
npm run ui:qa
```

The root development launcher preserves Astro's host and port options on
Windows/npm 11 and exposes the managed-server lifecycle commands:

```powershell
npm run dev -- --host 127.0.0.1 --port 4321
npm run dev -- status
npm run dev -- logs
npm run dev -- stop
```

Development pages omit the production CSP meta so Astro HMR and local browser
inspection can run. Static builds retain the CSP meta and the deployment
headers described below.

`npm run check` is non-mutating: it runs SEO, UI-detail, TypeScript,
ESLint, and Prettier checks. Use `npm run format` only when intentionally
applying formatter changes. `npm run verify` combines the source tests, static
checks, and preview build; browser QA remains explicit because it starts a real
local site and captures desktop and mobile surfaces. The default `npm run ui:qa`
uses the representative `en`, `ko`, `de`, `ar`, and `zh-TW` layout-risk matrix;
run `npm run ui:qa:full` when a release needs every published locale traversed.
The build and locale/SEO gates continue to verify all locale routes on every run.

The generated site includes 17 complete locale route families: `en`, `ko`, `es`, `de`, `ja`, `fr`, `pt-BR`, `it`, `nl`, `sv`, `cs`, `pl`, `da`, `no`, `ar`, `zh-TW`, and `tr`. On the first visit to `/`, the root document chooses the closest supported `navigator.languages` value and falls back to `/en/`; it does not use IP lookup, storage, or a third-party request. Explicit locale routes are never replaced. Legacy `/{locale}/tools/` routes redirect to the locale directory.

## What is implemented

- Text and file Base64 decode/encode, Base64URL, Data URI stripping, padding and whitespace repair
- Strict validation, line-by-line decode, legacy browser-supported character sets, and hex view under Options
- File-signature detection, safe raster previews, binary download, and executable warnings
- Static locale routes, canonical and hreflang tags, sitemap, robots controls, and localized legal pages
- Token-based responsive workbench with a two-pane desktop workspace and stacked mobile layout
- Unicode-aware word, grapheme-character, line, and paragraph counting in a cancellable worker
- Strict RFC 8259 JSON formatting, validation, and minification that preserves numeric lexemes and duplicate keys
- Unix seconds/milliseconds and strict ISO local date-time conversion with IANA zones and explicit DST disambiguation
- Localized directory with `available`, `preview`, and `reserve` states
- Preview routes are linked and functional but forced `noindex`, excluded from the sitemap, and rejected by the production build
- Third-party consent, analytics, and advertising integrations remain disabled until AdSense and Google's CMP are implemented and reviewed together

## Repository map

```text
apps/web/src/features/ Feature-owned Astro UI, client runtime, worker, copy facade, contract, and styles
apps/web/src/components/ Shared presentation components
apps/web/src/lib/locale-data/ Complete independently reviewed per-locale bundles
apps/web/src/lib/ Shared content, deployment, locale, and SEO registries
packages/codec-core/     Framework-independent conversion and detection logic
packages/json-core/      Strict JSON inspection and lossless text transforms
packages/text-metrics-core/ Unicode-aware text counting
packages/time-core/      Native-first Temporal timestamp conversion
scripts/                 Production configuration checks
```

Feature folders keep parsing rules, file behavior, worker lifecycles, and error
meaning local. Shared runtime utilities are extracted only when at least two
tools use the same behavior contract. Deployment configuration resolves once in
fail-closed `preview` or `production` mode, while the content registry provides
the common locale/legal/tool view consumed by routes and build QA.

The feature folder convention is intentional: routes compose features,
features own browser behavior, core packages own framework-independent domain
logic, and registries own cross-route inventory. Do not move tool behavior back
into generic `components/`, rebuild route lists in scripts, or add a universal
controller merely to reduce line count.

The build output is `apps/web/dist/`. Cloudflare Pages applies the committed `_headers` policy directly. Any other production host must be configured to send the same CSP, HSTS, frame, MIME, referrer, permissions, and cross-origin headers; GitHub Pages alone does not apply `_headers` and is not a complete production deployment target.

## Production gate

Copy `.env.example` to `.env` and complete the operator and canonical-origin fields. Use `npm run build:production` for an indexable release. It fails while any feature remains in the `preview` publication state. AdSense, GA4, and consent-management code are currently unimplemented and disabled. AdSense and Google's CMP will be implemented and reviewed together before either is enabled.

Do not send input text, output text, file names, file bytes, error details, or hashes derived from them to analytics. The default source configuration ships no third-party consent, analytics, or advertising tags. Preview builds and invalid production configurations keep all optional integrations disabled.

## Localization and localized SEO

The public locale inventory lives in `apps/web/src/lib/content-registry.js`; tool publication state lives in `apps/web/src/lib/tool-registry.js`. Public builds validate routes, locale completeness, structured-data requirements, crawler membership, and preview/indexable boundaries without shipping private market or review evidence.

Useful commands:

```powershell
npm run seo:check
```

Implemented tool routes are registered once in `apps/web/src/lib/tool-registry.js`. That registry drives route typing, sitemap membership, `llms.txt`, directory status, and rendered SEO QA. A new registry entry fails `npm test`, `npm run check`, and `npm run build` until its route, complete localized directory copy, metadata, structured data, and indexability state agree. New features must enter as `preview` until their private publication review is complete.
