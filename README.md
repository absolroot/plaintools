# AbsolTools

AbsolTools is the source workspace for a network of fast, single-purpose static utility sites published under the `AbsolTools` product identity. Each tool focuses on one common online task and refines the experience to make it faster, cleaner, and easier to use. Each public route should lead with one obvious job. Related functions may be linked or placed behind Options, but they must not compete with the main task on the first screen.

## Product rules

1. One public tool route, one primary search intent, one dominant workspace. Related tools may share the AbsolTools root without sharing the first screen.
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
└─ plaintool-network/          AbsolTools network app and reusable cores
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

Reference snapshots remain local because they are third-party source, not AbsolTools code. Their origin and inspected revisions are documented during research, but their files must not be committed or shipped.

## Current project

The [plaintool-network](./plaintool-network/README.md) app implements 97 tool routes across 30 feature families and 17 locales at this revision. The [tool registry](./plaintool-network/apps/web/src/lib/tool-registry.js) is the source of truth for publication state; all current entries are indexable in a valid production build. Families include text, encoding, developer utilities, calculators, dates, images, and PDF tools. These counts describe implementation, not measured demand or search-engine indexing.

Each locale has a tool directory and About, Privacy, Cookies, Terms, and Contact pages. Static output includes canonical URLs, reciprocal hreflang, structured data, robots.txt, and sitemap.xml. Preview builds remain non-indexable and disable optional integrations. New tools must remain preview-only until their publication review is complete.

Rendered UI changes must pass the shared desktop-axis, local-processing-message, control-alignment, and browser measurement contracts. Feature ownership, async state rules, and known regression patterns are recorded in the [architecture contract](./plaintool-network/ARCHITECTURE.md).

## Continue work

```powershell
Set-Location .\plaintool-network
npm ci
npm test
npm run check
npm run build
npm run dev
```

## Release boundary

The production configuration targets `https://absoltools.com` and Cloudflare Pages. Use Node.js 22.19.x and npm 11, then follow the [production gate](./plaintool-network/README.md#production-gate). The output directory is `plaintool-network/apps/web/dist/`. A successful local build does not prove which revision or environment is currently deployed.

Production source includes GA4, the AdSense publisher script, Consent Mode v2 defaults, and `ads.txt`. Google Privacy & messaging supplies the intended CMP; its account-side publication and live behavior require separate verification. Cookiebot is not implemented. Source identifiers and tags do not establish analytics account access, collection accuracy, AdSense approval, or revenue.

Verify operator and hosting facts, localized disclosures, consent controls, and the rendered release before deployment. Private locale-review evidence is excluded from the repository; the clean-checkout locale gate explicitly skips that evidence, so its success alone does not prove native-language review.

Establish a measured baseline before adding tools: confirm the GA4 metric and date range, examine landing pages and completed workflows, verify search indexing, and obtain the exact AdSense rejection reason. Do not infer demand or earnings from route count or unqualified visitor totals. No GitHub Actions workflow is currently committed. The existing Cloudflare GitHub integration deploys the `plaintools` Pages project (`plaintools-842.pages.dev`); inspect its check run on the exact commit before declaring a deployment successful. Keep the last successful production deployment as the host rollback target and use revert commits for source rollback.
