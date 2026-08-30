# Formatter and subnet performance / OSS review

Date: 2026-08-30
Scope: HTML, CSS, JavaScript and SQL formatters plus IPv4 subnet calculator

## Review lanes

- HTML lane: built worker size, dependency duplication and lazy route isolation.
- Subnet lane: input scheduling, worker lifecycle and mobile responsiveness.
- SQL lane: deployed direct/transitive OSS notices and replacement trade-offs.
- Integration lane: measured experiment, build budget gates and final validation.

## Baseline

- HTML worker: 241,451 bytes.
- CSS worker: 237,920 bytes.
- JavaScript worker: 1,097,038 bytes.
- SQL worker: 107,642 bytes.
- Formatter workers are loaded only on their own route and are covered by the
  immutable hashed-asset cache policy.

## Experiment

Splitting Prettier into named worker chunks did not create a shared artifact:
HTML and CSS each gained a request with unchanged total bytes, while JavaScript
split into 487,338 and 608,338 byte files. The experiment was rejected.

## Accepted work

- Made worker creation opt-in lazy for the four formatters. Empty visits and
  manual-wait states create no worker; cancellation, failure and disposal do
  not create an unused replacement.
- Split JavaScript format and minify engines behind worker dynamic imports.
  Format now transfers 609,850 raw / 167,613 gzip bytes including the worker;
  minify transfers 487,142 raw / 137,052 gzip bytes. Previously either mode
  transferred about 1,097,038 raw / 303,711 gzip bytes.
- Added raw transitive-worker budgets to static build QA so split chunks cannot
  hide a dependency regression.
- Deployed the project notice at `/third-party-notices.txt`, linked it from
  every page with `rel="license"`, and deployed Prettier 3.9.6's complete
  362,597-byte vendor notice verbatim at `/licenses/prettier-3.9.6.txt`.
- Added exact notices for nearley and the five bundled `@jridgewell` source-map
  packages. CLI-only installed dependencies were not mislabeled as deployed.
- Gave primary actions an accessible dedicated color pair. The JavaScript
  formatter mobile Lighthouse accessibility score improved from 96 to 100.
- Removed a duplicate UTF-8 byte-count pass from HTML input handling.
- Replaced the unsafe common 1 MiB auto / 10 MiB hard policy with measured,
  engine-specific limits: HTML 64 KiB / 1 MiB, CSS and JavaScript 256 KiB /
  2 MiB, and SQL 8 KiB / 32 KiB. This blocks the repeated-SQL OOM and avoids
  automatically starting pathological HTML work that exceeded 37 seconds.

## Rejected or deferred

- Prettier worker `manualChunks` was rejected because it added requests without
  producing a shared cache artifact.
- `js-beautify`, Biome WASM, esbuild/SWC WASM, dprint and alternative SQL
  formatters were not adopted: none preserved the current four-tool surface,
  dialect set, source-transform semantics and permissive licensing at a
  measured lower browser cost.
- SQL dialect deep imports were rejected as private, version-fragile paths for
  a worker that is only about 30 KB gzip.

## Validation

- Unit tests: 328 passed; Python QA tests: 18 passed.
- Type, Astro, ESLint and formatting checks: zero errors or warnings.
- Static build: 546 pages generated with both notice endpoints.
- Browser CSP/adversarial QA: no console/page errors, external requests or DOM
  activation; formatter initial worker requests were empty; both JavaScript
  dynamic engines ran and oversized SQL was rejected before work was submitted.
- 320px mobile: zero horizontal overflow, 44px primary targets, Lighthouse
  Accessibility / Best Practices / SEO all 100.
