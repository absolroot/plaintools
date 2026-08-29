# PlainTool Network

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

`npm run check` is non-mutating: it runs SEO, UI-detail, TypeScript,
ESLint, and Prettier checks. Use `npm run format` only when intentionally
applying formatter changes. `npm run verify` combines the source tests, static
checks, and preview build; browser QA remains explicit because it starts a real
local site and captures desktop and mobile surfaces.

The generated site includes English (`/en/`), Korean (`/ko/`), and Spanish (`/es/`). The root redirects to `/en/`; legacy `/{locale}/tools/` routes redirect to the locale directory.

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
- Empty, gated integration points for AdSense, GA4, and a CMP; no Google code is shipped in the default build

## Repository map

```text
apps/base64-codec/src/features/ Feature-owned Astro UI, client runtime, worker, copy facade, contract, and styles
apps/base64-codec/src/components/ Shared presentation components
apps/base64-codec/src/lib/ Shared content, deployment, locale, and SEO registries
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

The build output is `apps/base64-codec/dist/` and can be deployed directly to Cloudflare Pages or GitHub Pages on a custom root domain.

## Production gate

Copy `.env.example` to `.env` and complete the operator and canonical-origin fields. Use `npm run build:production` for an indexable release. It fails while any feature remains in the `preview` publication state. AdSense, GA4, and the CMP stay disabled until their corresponding values are supplied and the legal copy has been reviewed.

Do not send input text, output text, file names, file bytes, error details, or hashes derived from them to analytics. The default source configuration keeps all third-party integrations disabled and fails closed when required production facts are absent.

## Localization and localized SEO

The public locale inventory lives in `apps/base64-codec/src/lib/content-registry.js`; tool publication state lives in `apps/base64-codec/src/lib/tool-registry.js`. Public builds validate routes, locale completeness, structured-data requirements, crawler membership, and preview/indexable boundaries without shipping private market or review evidence.

Useful commands:

```powershell
npm run seo:check
```

Implemented tool routes are registered once in `apps/base64-codec/src/lib/tool-registry.js`. That registry drives route typing, sitemap membership, `llms.txt`, directory status, and rendered SEO QA. A new registry entry fails `npm test`, `npm run check`, and `npm run build` until its route, complete localized directory copy, metadata, structured data, and indexability state agree. New features must enter as `preview` until their private publication review is complete.
