# PlainTools

PlainTools is the source workspace for a network of fast, single-purpose static utility sites published under the `PlainTool` product identity. Each public route should lead with one obvious job. Related functions may be linked or placed behind Options, but they must not compete with the main task on the first screen.

## Product rules

1. One public tool route, one primary search intent, one dominant workspace. Related tools may share the PlainTool root without sharing the first screen.
2. Fully static by default: no database, login, application server, upload endpoint, or server-side conversion.
3. Sensitive input stays in browser memory. Do not add network or persistence paths without an explicit product decision and matching disclosure.
4. Desktop layouts should use available width; mobile layouts may stack without turning into a dashboard of cards.
5. Specialist settings belong under Options or a dedicated long-tail route.
6. Every published locale must include the tool, errors, FAQ, legal pages, canonical URL, reciprocal hreflang, and visible header/footer language links.
7. Ads and analytics are later-stage integrations. Their runtime state, consent flow, public policy, and production configuration must agree.

## Workspace layout

```text
plain-tools/
├─ README.md                   Portfolio direction and current status
└─ plaintool-network/          PlainTool network app and reusable cores
   ├─ apps/web/                Single static Astro network app
   ├─ packages/codec-core/     Browser-compatible Base64 engine
   ├─ packages/json-core/      Strict lossless JSON operations
   ├─ packages/text-metrics-core/ Unicode-aware text metrics
   ├─ packages/time-core/      Temporal-based timestamp conversion
   └─ README.md                Project-specific commands and architecture
```

Future sites should be siblings of `plaintool-network`, not features pushed into its main screen. Start a sibling when the primary intent, domain, or data model is meaningfully different. Shared code should be extracted only after at least two real sites need the same implementation.

## Repository boundaries

The repository keeps everything required to understand, reproduce, review, and build the product:

- application and package source;
- tests, build scripts, and browser QA scripts;
- public architecture and deployment documentation;
- dependency lockfiles and safe configuration templates such as `.env.example`.

The repository intentionally excludes generated or machine-local material:

- dependency folders, build output, framework caches, logs, and coverage;
- real `.env` files, deployment secrets, certificates, and Wrangler local state;
- Playwright sessions and regenerable QA screenshots;
- private product research, evidence, and internal review records;
- external inspection checkouts under `references/`.

Reference snapshots remain local because they are third-party source, not PlainTools code. Their origin and inspected revisions are documented during research, but their files must not be committed or shipped.

## Current project

The implemented network prototype is [plaintool-network](./plaintool-network/README.md). It provides:

- a localized tool directory at each locale root;
- dedicated Base64 decode and encode routes with the existing worker optimizations;
- full preview routes for word/character counting, strict JSON formatting, and Unix timestamp conversion;
- browser-only Web Worker processing for text and files;
- standard/Base64URL handling, visible repair notices, legacy character sets, binary detection, safe-by-signature raster preview, and downloads;
- English `/en/`, Korean `/ko/`, and Spanish `/es/` routes;
- localized About, Privacy, Cookies, Terms, and Contact pages;
- static SEO files and fail-closed production configuration.

The three new tools are intentionally preview-only: they are linked for local review, carry `noindex`, stay out of the sitemap, and make `npm run build:production` fail until locale and SEO approval is promoted. The ordinary build also verifies those boundaries and route-level bundle isolation.

Rendered UI changes also pass the repository-local Cloudflare product UI review contract: one shared desktop axis, one authoritative local-processing message, equivalent-control center alignment, and computed browser measurements through `npm run ui:check` and `npm run ui:qa`.

The current feature ownership, registry boundaries, async state rules, and
known regression patterns are recorded in the project
[architecture contract](./plaintool-network/ARCHITECTURE.md). That document,
not folder-name intuition, is the starting point for future refactors.

## Continue work

```powershell
Set-Location .\plaintool-network
npm install
npm test
npm run check
npm run build
npm run dev
```

## Release boundary

The prototype is ready for local evaluation, not an indexed ad-supported launch. `plaintool.net` is selected and intended for purchase, but it is not yet recorded as purchased or controlled. Before public release, verify ownership and the final host; enter the real operator/contact/host/retention/law values; obtain legal review; run the complete browser and large-file matrix; and rebuild with `npm run build:production`.

Do not enable GA4 or AdSense by setting environment variables alone. First implement and verify the chosen CMP, permanent privacy choices, Consent Mode, provider/transfer disclosures, GA event allowlist, domain-level `ads.txt`, and live ad placement behavior. Current production validation intentionally fails while required facts are missing.

The selected network identity is `PlainTool` at `plaintool.net`, using localized function paths such as `/en/base64-decode/`. No domain purchase, DNS control, or production connection is represented by the default source configuration.

The market screen narrows future implementation. Word/character counting, JSON formatting/validation, and Unix timestamp conversion now exist as non-indexed previews. Text diff and case conversion remain reserves. URL encode/decode, hash, UUID, and password generation do not currently justify separate public routes on the available traffic evidence.
