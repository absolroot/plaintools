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

- Feature commits: `ee8c555` (owned implementation) and `86c3a8d` (shared preview wiring).
- Latest integration base: `adcbd61` (`Add time zone converter and world clock`).
- Integration commits: `b1d22be` and `b9698d`; locale conflicts were resolved by retaining both new tools and regenerating the shared fingerprints once.
- Focused integration tests: 29 passed after each cherry-pick.
- Full unit suite: 49 files, 418 tests passed.
- Gates passed: locale (19 features / 17 locales), SEO (73 tools / 17 locales), UI detail, Python QA tests, type check, ESLint, and preview network QA.
- Preview build: 1,362 static pages built successfully.
- Rendered feature QA: desktop resize/download/stale-state/no-enlarge, Arabic mobile RTL/touch sizing, local-only request capture, all 17 locale routes, and the Korean homepage card passed with zero feature failures.
- The full Playwright sweep stopped in the pre-existing Background remover model-preparation check before reaching this tool; the focused Image resizer browser suite passed independently.
- `build:production` remains intentionally blocked while Image resizer and Time zone converter are `preview/noindex`; promotion review is still required.
- Repository-wide Prettier check remains blocked by the existing Windows line-ending baseline (384 files); all other `npm run check` phases passed.
- Publication remains intentionally `preview/noindex` pending native-language promotion review.
