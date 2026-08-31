# UUID generator delivery ledger

- Date: 2026-08-31
- Base commit: `8a9c839b9965955d322b1c133094ae2b0189cb7b`
- Integration branch: `uuid`
- Worktree: `C:\Users\super\.herdr\worktrees\plain-tools\uuid`
- Owner: root session
- Publication intent: `preview/noindex`

## Scope

Build one browser-local UUID generator for RFC 9562 UUID versions 1, 3, 4,
5, 6, and 7. Keep version 4 as the simple default; reveal namespace and name
inputs only for deterministic versions 3 and 5. Support bulk generation for
time/random versions, standard namespace presets, canonical/braced/URN/compact
formats, case selection, individual and bulk copy, text download, and clear
result authority.

## Research boundary

- Primary specification: RFC 9562.
- Reference implementation and interaction inventory: EMN178 Online Tools UUID
  v1/v3/v4/v5/v6/v7 pages and their repository source.
- Comparable interaction inventory: CreateUUID, UUIDTools bulk generator, and
  ZeroTools UUID generator.
- Adopt useful interaction patterns, not competitor copy or visual branding.

## Owned paths

- `packages/uuid-core/**`
- `apps/web/src/features/uuid-generator/**`
- `apps/web/src/pages/[locale]/uuid-generator/**`
- UUID-specific shared registry, catalog, locale bundle, manifest, QA, and test
  entries required by integration
- this ledger

## Concurrent-work protections

- Do not edit another worktree or copy its uncommitted files.
- Re-read `main`, worktree status, generator-category changes, locale structure,
  and shared manifests immediately before final integration.
- Resolve overlapping registry/catalog/locale/package changes against current
  `main`; do not overwrite barcode/password generator work.
- Preserve browser-local processing: UUID input and results never enter URLs,
  logs, storage, analytics, ads, APIs, or third-party requests.

## Delivery state

| Milestone | State | Evidence / next action |
| --- | --- | --- |
| Branch and boundary | complete | clean `uuid` branch at base commit |
| Standards and UI research | in progress | inspect EMN178 source and comparable surfaces |
| Core implementation | pending | add version vectors and bulk tests |
| Feature UI | pending | implement focused workspace and state authority |
| Registry, route, locales, SEO | pending | wire preview route after copy review |
| Focused QA | pending | unit, type, source, desktop/mobile behavior |
| Main reconciliation | pending | merge current `main` into branch before final gates |
| Final commit | pending | record commit and verification evidence |
