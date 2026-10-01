# AbsolTools Network

A single Astro application for focused browser utilities. Locale roots are directories; every implemented tool has a dedicated route and workspace.

This is fully static. There is no database, account system, application server, upload endpoint, tool-data persistence layer, or server-side conversion. Production includes the Google integrations described below. Text and file bytes stay in browser memory.

The source ownership rules, runtime chronology, registry boundaries, and
previously observed regression patterns are documented in
[ARCHITECTURE.md](./ARCHITECTURE.md). Read it before moving a tool or extracting
a shared abstraction.

## Development

Use Node.js 22.19.x and npm 11. The declared engine range is enforced by the
package metadata because Astro's current runtime dependencies require Node
22.19 or newer.

```powershell
npm ci
npm run dev
npm test
npm run check
npm run build
npm run ui:qa:affected
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
local site and captures rendered surfaces.

Use `npm run ui:qa:affected` during normal feature work. It reads the Git diff,
runs behavior checks only for changed features, and limits the route matrix to
their routes in English. Shared UI changes expand deliberately to one route per
feature across the `en`, `ko`, `de`, `ar`, and `zh-TW` layout-risk locales.
Changes limited to tests, scripts, docs, or repository configuration skip
Playwright. To include committed branch work, run
`python scripts/qa-redesign.py --affected --changed-from <git-ref>` directly;
this avoids npm treating the option as npm configuration on Windows.

The default `npm run ui:qa` retains the broader representative compatibility
gate. Run `npm run ui:qa:full` only for a release or an intentional full browser
audit. The build and locale/SEO gates continue to verify all locale routes on
every run.

Manual focused examples:

```powershell
python scripts/qa-redesign.py --feature background-remover
python scripts/qa-redesign.py --feature background-remover --locale en,ar
python scripts/qa-redesign.py --feature background-remover --surface mobile
python scripts/qa-redesign.py --feature data-converter --routes representative
```

The generated site includes 17 complete locale route families: `en`, `ko`, `es`, `de`, `ja`, `fr`, `pt-BR`, `it`, `nl`, `sv`, `cs`, `pl`, `da`, `no`, `ar`, `zh-TW`, and `tr`. On the first visit to `/`, the root document chooses the closest supported `navigator.languages` value and falls back to `/en/`; it does not use IP lookup, storage, or a third-party request. Explicit locale routes are never replaced. Legacy `/{locale}/tools/` routes redirect to the locale directory.

The root also serves the complete static English directory, crawlable locale and
tool links, and the shared `WebSite` structured data before JavaScript runs.
Production permits indexing and keeps `/en/` canonical; preview remains
`noindex,nofollow`. A small same-origin script built from the tested locale
detector runs in the head before the English content paints. The root does not
load analytics or ads before that redirect. Retired `/{locale}/tools` URLs have
explicit Cloudflare Pages 301 rules as well as static HTML fallbacks.

## What is implemented

The current registry contains 97 tool routes in 30 feature families, all marked indexable for production. Besides the original tools detailed below, it includes text, source formatting, data conversion, image, PDF, generation, and calculator workflows. See `apps/web/src/lib/tool-registry.js` for the complete inventory.

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
- Production GA4 with regional Consent Mode v2 defaults, plus the AdSense publisher code used for site review and Google Privacy & messaging

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

Copy `.env.example` to `.env` and verify the operator, hosting, legal, and canonical-origin fields. The production validator, build launcher, and built-output QA load the project-root `.env`; existing shell or host environment variables take precedence, including explicit empty values. A missing `.env` is allowed when the host supplies the required variables. These scripts do not load `.env.local` or mode-specific files: use `.env` or host variables for deployment facts so validation and build agree. Use `npm run build:production` for an indexable release. It fails while any feature remains in the `preview` publication state. Production enables GA4 and the AdSense publisher code from reviewed public identifiers. In AdSense, publish the European regulations message and enable its Consent Mode integration; the repository cannot publish that account-side configuration.

Do not send input text, output text, file names, file bytes, error details, or hashes derived from them to analytics. Consent Mode v2 defaults analytics and advertising storage to denied in the EEA, UK, and Switzerland. Outside those regions GA4 analytics storage is granted, while advertising storage remains denied until a later reviewed policy change. Preview builds and invalid production configurations keep all optional integrations disabled.

## Tool measurement

The existing GA4 stream receives `tool_complete`, `tool_copy`,
`tool_download`, and `tool_error` events only after a trusted page interaction
and a current Google Privacy & messaging analytics status of granted or not
applicable. Unknown, denied, unavailable, or unconfigured consent drops the
custom event. Dropped events are not replayed. Existing page-view consent
configuration is unchanged.

Each event is capped at once per tool, locale, and document, so these counts are
engaged page/action counts rather than a count of every keystroke or operation.
Completion is explicitly instrumented for Base64 encode/decode, JSON formatting
and validation, word counting, and Unix timestamp conversion. Copy, initiated
download, and reported error coverage follows the shared `tool-dom` helpers;
feature-specific clipboard/download paths are not automatically covered.
Downloads measure initiation, not a confirmed saved file. Error counts include
validation feedback during editing and must not be interpreted as an operational
failure rate. No custom key events
or custom dimensions are configured in the analytics account by this code.

Only fixed event names, a registry-validated tool slug and locale, and static
page metadata are sent. Input, output, filenames, byte counts, raw errors,
query strings, fragments, and referrer contents are not custom event parameters.
No new storage, tag, or service is introduced. The footer's Privacy choices
button appears only when the Google TCF API reports applicable European consent
controls and the revocation API is available. Its absence must not be treated
as proof that consent is granted.

For a local production build, run `python scripts/qa-analytics.py` against the
server selected by `PLAINTOOL_QA_BASE_URL`. This browser check mocks Google’s
consent and tag APIs, blocks every external request, checks all 17 policy locales
at desktop/mobile sizes, and exercises completion, copy, download, validation,
consent denial, and revocation. `PLAINTOOL_QA_BROWSER_PATH` optionally selects an
installed Chromium executable. It does not verify the real account-side CMP.

Manual advertising placeholders are not rendered: the publisher script alone
is not evidence of a configured manual ad unit. Future placements require an
actual reviewed unit and consent behavior before layout space is reserved.

## Localization and localized SEO

The public locale inventory lives in `apps/web/src/lib/content-registry.js`; tool publication state lives in `apps/web/src/lib/tool-registry.js`. Public builds validate routes, locale completeness, structured-data requirements, crawler membership, and preview/indexable boundaries without shipping private market or review evidence.

Useful commands:

```powershell
npm run seo:check
```

Implemented tool routes are registered once in `apps/web/src/lib/tool-registry.js`. That registry drives route typing, sitemap membership, `llms.txt`, directory status, and rendered SEO QA. A new registry entry fails `npm test`, `npm run check`, and `npm run build` until its route, complete localized directory copy, metadata, structured data, and indexability state agree. New features must enter as `preview` until their private publication review is complete.
