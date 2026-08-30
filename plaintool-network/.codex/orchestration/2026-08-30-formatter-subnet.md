# Formatter and subnet orchestration ledger

- Date: 2026-08-30 (Asia/Seoul)
- Integration branch: `worktree/lucky-cloud-860c`
- Repository: `C:\Users\super\.herdr\worktrees\plain-tools\worktree-lucky-cloud-860c\plaintool-network`
- Validated product base: `f4f6efb` (`Integrate 17-locale tool suite`)
- Publication boundary: every new route remains `preview` / `noindex`; no promotion is in scope.

## Predecessor audit

- The earlier new-tools batch is complete at `f4f6efb` in this checkout.
- Positive source evidence: 22 Vitest files and 175 tests passed.
- Static evidence: `npm run check` passed, including 12-feature / 17-locale review, 20-tool SEO registry, UI detail, Astro/TypeScript, ESLint, and Prettier gates.
- Build evidence: `npm run build` produced 461 preview pages and passed network, crawler, metadata, JSON-LD, locale-link, integration, and route-isolation QA.
- Browser evidence: the repository Playwright suite passed its representative `en`, `ko`, `de`, `ar`, and `zh-TW` desktop/mobile matrix with no console errors, page errors, external conversion requests, or UI detail failures.
- First browser attempt reused a short-lived server and timed out during navigation. A server started from this checkout was then verified by its route marker and the same full QA passed. Future runs must verify server ownership immediately before the browser suite.
- The separate `main` worktree has unresolved conflicts from another session. It is read-only for this run and is not a source of files or commits.

## Shared ownership lock

Only `/root` may change:

- `apps/web/src/pages/**`
- `apps/web/src/lib/tool-registry.js`
- `apps/web/src/lib/tool-catalog.ts`
- `apps/web/src/lib/locale-data/**`
- `apps/web/src/lib/tool-i18n.ts` and locale/content assemblers
- `apps/web/src/lib/locale-review-manifests/**`
- SEO metadata, FAQ/schema, sitemap/llms/publication state
- `scripts/qa/**` shared inventory and route-matrix wiring
- root/app package manifests, `package-lock.json`, and `THIRD_PARTY_NOTICES.md`

Feature branches may change only their assigned `packages/*-core`, feature-owned UI/client/worker/copy contracts and styles, and focused tests. They must not hardcode visible English copy into runtime code. Dependency proposals must be reported without editing shared manifests or the lockfile.

## Branch plan

| Phase | Branch | Planned worktree | Owner | Owned scope | Base | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A | `agent/formatter-html-pilot` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-formatter-html-pilot` | `/root/html_pilot` | JSON audit plus HTML core/feature/focused tests | `f4f6efb` | integrated as `41c4a2d`; focused 15 tests and type check passed |
| C | `agent/ip-subnet` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-ip-subnet` | `/root/ip_subnet` | IPv4 subnet core/feature/focused tests | `f4f6efb` | integrated as `1b059f8`; focused tests passed |
| B | `agent/formatter-css` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-formatter-css` | `/root/html_pilot` | CSS core/feature/focused tests | `e256e73` | integrated as `1e107a7`; focused tests passed |
| B | `agent/formatter-javascript` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-formatter-javascript` | `/root/ip_subnet` | JavaScript core/feature/focused tests | `e256e73` | integrated as `a4a54d1`; focused tests passed |
| B | `agent/formatter-sql` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-formatter-sql` | `/root/sql_formatter` | SQL core/feature/focused tests | `e256e73` | integrated as `3a414bc`; focused tests passed |

## Integration order

1. Complete common competitor and OSS/licensing research once under the ignored research path.
2. Start the JSON audit + HTML pilot and independent IPv4 subnet branches.
3. Review the pilot diff, named positive test count, browser behavior, JSON changes, and implementation lessons; integrate it alone.
4. Record the pilot integration commit as the CSS/JavaScript/SQL base and pass its explicit decisions/failures to those agents.
5. Integrate CSS, JavaScript, SQL, then subnet feature/core commits one at a time with focused tests after each.
6. Reconcile exact dependencies, notices, manifests, and the lockfile once from the root branch.
7. Wire root-owned preview routes, registry/catalog, 17 locale bundles, metadata, guide/FAQ/schema, locale review manifests, and shared browser QA.
8. Run `npm test`, `npm run check`, `npm run build`, and `npm run ui:qa`; add full locale/browser gates only if publication promotion is later requested.

## Cross-feature contracts

- One route, one primary job. Format/minify modes must be explicit; SQL dialect selection is explicit.
- Technical input/output stays LTR, source-only, and never executes or enters the DOM as markup.
- Input, filenames, outputs, raw errors, and derived values remain in browser memory and never enter URLs, storage, logs, analytics, ads, or third-party requests.
- Empty/new input, Clear, errors, and cancellation immediately invalidate copy/download authority. Slow old work cannot overwrite newer input.
- Small input may update continuously without a visible working flash under 180 ms. Large or Worker-backed input must expose meaningful progress/cancellation only when needed.
- Errors prefer typed cause plus line/column and actionable localized copy; raw exceptions are forbidden.
- Desktop uses the 1180 px axis and 36 px controls; visible mobile controls are at least 44 px; technical fields use the self-hosted PlainTool Mono family.
- Common controller extraction waits until two real formatter implementations demonstrate matching semantics. The pilot may share small typed contracts or presentation primitives only when JSON and HTML genuinely match.
- Initial subnet scope is IPv4 CIDR/netmask calculation with `/0`, `/1`, `/30`, `/31`, and `/32` semantics. IPv6, DNS, geolocation, and external APIs are excluded from the first implementation unless later evidence changes the scope.

## Research and decision artifacts

Ignored local path: `references/tmp/absoltools-formatter-subnet-research-2026-08-30/`

Required files: `README.md`, `competitor-matrix.md`, `oss-and-licenses.md`, `json-formatter-review.md`, `claim-candidates.md`, and `implementation-lessons.md`.

Common research completed before delegation. It includes direct 1440x1000 and 390x844 renders for nine public surfaces, exact npm registry version/license snapshots, the JSON audit, and claim/implementation boundaries.

## Orchestration incidents

- The provided worktree helper stopped after creating the HTML pilot because Windows PowerShell promoted Git's normal `Preparing worktree` stderr message to a terminating error under `$ErrorActionPreference = "Stop"`. Git state was inspected before recovery; only the missing subnet worktree was then added directly. No created worktree was removed or recreated.

## HTML pilot integration decision

- Reviewed every changed path and `git diff --check`; the branch stayed inside its owned package/feature/JSON-audit scope.
- Accepted a format-only Prettier HTML implementation in a module Worker. It treats the input as source text only and does not preview, sanitize, insert, or execute markup.
- Accepted the feature-owned revision authority: edited input may preserve a visibly stale result, but immediately disables copy/download; Clear, errors, and newer replies invalidate prior authority.
- Accepted the narrow JSON follow-up: selected operation persists across input/file changes, indentation is enabled only for format, and format/minify downloads use distinct filenames.
- The pilot intentionally does not format embedded CSS/JavaScript and makes no semantic-preservation claim for whitespace-sensitive HTML. Those limits must remain explicit in localized page copy.
- Integrated commit: `41c4a2d`. The exact Prettier workspace dependency was installed and the updated lockfile is owned by root.

## Central integration result

- CSS, JavaScript, SQL, and subnet branches were integrated in the recorded order after the HTML pilot.
- Root reconciled exact workspace dependencies and notices once, wired five routes through the registry/catalog, and added explicit copy contracts for all 17 locales without source-locale fallback spreads.
- Shared contract QA now covers 18 new-tool routes and 8 feature families. Vitest passed 35 files and 310 tests; Python contract tests passed 18 tests.
- `npm run check` passed the 14-feature / 17-locale review gate, 25-tool SEO registry, UI detail, type, lint, and formatting gates.
- `npm run build` produced 546 pages and passed metadata, JSON-LD, indexability, crawler, sitemap, locale-link, integration, and route-isolation QA.
- Browser QA passed the representative `en`, `ko`, `de`, `ar`, and `zh-TW` desktop/mobile matrix with no console errors, page errors, external conversion requests, or UI detail failures.
- The first two browser runs exposed Vite's `504 Outdated Optimize Dep` behavior while newly introduced formatter dependencies were optimized. After the owned server was restarted against the completed optimizer cache, the unchanged full matrix passed. This development-server startup behavior remains an explicit later-phase fix target.

## Next action

Create the central integration recovery commit. Then run the requested sequential adversarial locale, security, performance, and development-server phases with a recovery commit after each phase.
