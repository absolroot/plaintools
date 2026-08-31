# Image resizer delivery ledger

- Base commit: `799af32`
- Feature branch: `img-resizer`
- Feature worktree: `C:\Users\super\.herdr\worktrees\plain-tools\img-resizer`
- Integration target: `main` in `C:\Users\super\Desktop\plain-tools`
- Owner: `/root`
- Publication boundary: new route starts as `preview/noindex`

## Product direction

- Visual thesis: a calm two-pane image workspace with dimensions as the main control surface and one obvious result action.
- Content plan: upload and source facts, resize controls, original/result preview, exact output facts, then concise guide and privacy FAQ.
- Interaction thesis: drag/drop/paste entrance, linked-dimension feedback, and a restrained result reveal; all changed settings invalidate stale downloads.

## Benchmark findings

- iLoveIMG: pixels/percentage modes, aspect-ratio lock, no-enlarge option, and bulk-oriented maximum-size behavior.
- Adobe Express: custom dimensions, common output presets, linked dimensions, and enlargement quality warnings.
- ResizePixel: low-friction upload, editable sample, direct pixel dimensions, and aspect-ratio preservation.
- Squoosh: drop/paste entry, immediate visual comparison, local processing, and visible size impact.

The implementation may adopt interaction patterns, but no competitor wording or superiority claim enters product copy.

## Ownership

- Owned: `apps/web/src/features/image-resizer/**`, its route, locale pack and manifest, focused tests/QA, and the narrow registry/catalog/factory wiring required for this tool.
- Shared-file edits must remain append-only or narrowly typed: `tool-registry.js`, `tool-catalog.ts`, locale bundle/factory and per-locale seed imports, `NewToolPreview.astro`, QA inventory.
- Forbidden: unrelated active worktree files, dependency upgrades, deployment configuration, advertisements/consent work, and publication promotion.

## Integration queue

1. Implement dimensions math, stale-result lifecycle, worker resize/encode path, and the rendered workspace.
2. Add 17-locale copy through one dedicated locale pack and keep the registry entry preview-only.
3. Add focused unit and Playwright coverage for resize accuracy, privacy, stale output, mobile/RTL, and download naming.
4. Run repository gates and inspect the feature diff.
5. Re-read the integration checklist, verify current `main` ownership/status, merge, repeat critical gates on the user-facing checkout, and push only if clean and current.

## Current status

- Final integration base: `c90dcf7` (`Publish PDF toolkit and image upscaler`).
- Final integration branch: `integration/img-resizer-release-20260831`.
- Integrated commits: `7a2cc2b` (owned implementation), `2664c07` (shared preview wiring), `129ce3e` (rendered UI checkpoint), and `bcaa50b` (missing UUID browser-suite coverage found during integration).
- Shared conflicts were resolved on the latest main by retaining PDF, image upscaler, calculators, generators, UUID, time-zone, and image-resizer entries; 27 locale fingerprints were regenerated once for the combined tree.
- Full unit suite: 61 files, 548 tests passed.
- Gates passed: locale (27 features / 17 locales), SEO (87 tools / 17 locales), UI detail, Python QA tests, type check, ESLint, preview build, and preview network QA.
- Preview build: 1,600 static pages built successfully.
- Rendered feature QA: exact 4,000 × 3,000 to 1,920 × 1,440 download, linked dimensions, percentage mode, stale-result invalidation, no-enlarge cap, local-only request capture, all 17 locale routes, Arabic mobile RTL/touch sizing, and the Korean homepage card passed with zero feature failures.
- The repository-wide Playwright sweep passed preflight after UUID coverage was added but did not finish within a three-minute timebox; the focused image-resizer browser suite completed independently with no console, page, network, locale, or layout failures.
- `build:production` is intentionally blocked only by Image resizer while it remains `preview/noindex`; promotion review is still required.
- Repository-wide Prettier check remains blocked by the existing Windows line-ending baseline (492 files); all earlier `npm run check` phases passed.
- Publication remains intentionally `preview/noindex` pending native-language promotion review.
