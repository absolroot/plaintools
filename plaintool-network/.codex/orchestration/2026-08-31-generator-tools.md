# Barcode and password generator delivery ledger

## Run boundary

- Date: 2026-08-31
- Base commit: `799af32`
- Integration branch: `feature/barcode-password-generators-20260831`
- Integration worktree: `C:\Users\super\.herdr\worktrees\plain-tools\generator`
- Publication target: both routes were developed behind `preview` / `noindex`, then promoted to `indexable` after adversarial locale review and full integration QA.
- Root ownership: registry, routes, catalog, locale bundles/assembler/manifests, SEO/schema, shared QA, dependencies/lockfile, final browser verification, integration commits
- Product boundary: fully browser-local generation; no payload in URLs, storage, logs, analytics, ads, or third-party requests

## Visual and interaction thesis

- Visual thesis: preserve the calm, square AbsolTools workspace and make the generated barcode or password result the dominant visual surface.
- Content plan: task description, compact input and options, live result and actions, local-processing note, guide, FAQ.
- Interaction thesis: stable live preview, immediate stale-result invalidation on invalid input, restrained copy/download feedback with no decorative motion.

## Planned branches

| Owner | Branch | Worktree | Owned paths | Forbidden shared paths | State |
| --- | --- | --- | --- | --- | --- |
| barcode feature agent | `feature/barcode-generator-core-20260831` | `C:\Users\super\.herdr\worktrees\plain-tools\generator-barcode` | `packages/barcode-core/**`, `apps/web/src/features/barcode-generator/**` | registry, routes, catalog, locale data/manifests, shared components/styles, root manifests/lockfile | complete |
| password feature agent | `feature/password-generator-core-20260831` | `C:\Users\super\.herdr\worktrees\plain-tools\generator-password` | `packages/password-core/**`, `apps/web/src/features/password-generator/**` | registry, routes, catalog, locale data/manifests, shared components/styles, root manifests/lockfile | complete |
| generator locale agent | `feature/generator-locales-20260831` | `C:\Users\super\.herdr\worktrees\plain-tools\generator-locales` | `apps/web/src/lib/locale-data/generator-tools.ts` | every other source, registry, routes, catalog, manifests, shared components/styles, manifests/lockfile | complete |
| root integrator | `feature/barcode-password-generators-20260831` | current integration worktree | all shared integration paths | unrelated user changes and other worktrees | in progress |

## Required feature contracts

- Barcode: validated symbology-specific input, accessible live preview, human-readable text option, size/margin/color controls only when supported, SVG and PNG downloads, clear invalid-state recovery, no remote rendering.
- Password: cryptographically secure browser randomness, length and character-set controls, ambiguity option, guaranteed enabled-set coverage when possible, strength/entropy explanation without absolute security claims, copy/regenerate actions, no persistence.
- Both: typed copy props, deterministic core tests where practical, localized errors supplied by integration, 44 px mobile controls, LTR technical inputs in RTL locales, no stale actions after invalid input.

## Evidence and milestones

- Initial repository status: clean at `799af32`; `origin/main`, local `main`, and prior `generator` all pointed to the same commit.
- Architecture and feature-orchestration instructions read before implementation.
- Competitor/standards benchmark: TEC-IT, barcode-generator.de, Free Barcode Generator, Aspose, 1Password, Proton Pass, Bitwarden, Dashlane, GS1, MDN Web Crypto, NIST SP 800-63B-4, and WCAG status messages reviewed.
- Password feature commit: `51cb217835d1f317477481712878099a92f874bc`, integrated as `6175d68`; 7 focused tests passed on the feature branch.
- Barcode feature commit: `827dd9ab8fdd5e20f52a7a16ba908dcd7cab7049`, integrated as `97bfa9a`; 20 focused tests passed on the feature branch.
- Feature dependency pin: `jsbarcode@3.12.3` (MIT); root manifest/lockfile reconciliation in progress.
- Locale commits: `730c6d2` plus validation-feedback refinement `d090a47`; 17 locale bundles provide catalog, page, FAQ, controls, validation, and safety copy without English fallback.
- Focused browser QA server: command `npm run dev -- 127.0.0.1 4337`, URL `http://127.0.0.1:4337`, port `4337`, PID `77380`; stopped after verification.
- Project Chrome DevTools QA was attempted first but its managed CDP endpoint refused connection. Focused Playwright Chromium QA then covered desktop English and 390 px Arabic RTL for both tools.
- Browser QA caught and fixed JsBarcode's CSS-sized SVG dimensions (`234px`) producing an invalid numeric `viewBox`; the rerun passed with no console errors, page errors, overflow, or external conversion requests.
- Focused core/rendering tests: 29 passed after the viewBox regression test was added. Integrated Python QA contract tests: 18 passed.
- Integration and locale wiring: complete; final production gates and latest-main integration remain.
- Final action: refresh `main`, inspect `git cherry -v main feature/barcode-password-generators-20260831`, apply only new commits in order, resolve shared integration once, run the full test and production/rendered checks, create the integration checkpoint, then push once.

## Final main integration

- Authoritative integration base: fetched `origin/main` at `60193f4`. A separate local-only Time Zone Converter commit was preserved but excluded because its preview publication state intentionally fails the production gate.
- `git cherry -v origin/main feature/barcode-password-generators-20260831` identified six new commits; all six were cherry-picked individually in order.
- Shared fingerprint conflicts were resolved from the current `origin/main` side, then all affected fingerprints were recalculated once against the combined source tree.
- Node 22.19 verification: 51 Vitest files and 437 tests passed; 18 Python QA contract tests passed; TypeScript/Astro reported zero diagnostics; ESLint passed.
- Production build: deployment validation, locale/SEO/UI gates, 1,362 static pages, sitemap/crawler/JSON-LD/license checks, route isolation, and production network QA passed using the repository's public `.env.example` configuration.
- Final browser server: command `npm run dev -- 127.0.0.1 4338`, URL `http://127.0.0.1:4338`, port `4338`, PID `90156`; stopped after verification.
- Final Playwright Chromium QA: 17 locales, 34 generator routes, and 34 homepage cards passed; desktop generation, check-digit validation, stale-state invalidation, Arabic RTL at 390 px, 44 px controls, console/page errors, overflow, and conversion-network leakage all passed.
