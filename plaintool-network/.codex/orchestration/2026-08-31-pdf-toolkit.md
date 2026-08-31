# PDF toolkit implementation ledger

- Date: 2026-08-31 (Asia/Seoul)
- Base commit: `799af323d3c5f285c84c99679d6492832a62c2c9`
- Integration branch: `feature/pdf-toolkit-20260831`
- Worktree: `C:\Users\super\.herdr\worktrees\plain-tools\pdf`
- Owner: root session (single PDF feature family; no delegated worktrees)
- Scope: PDF compression, merge, split, PDF to images, images to PDF
- Shared ownership: root manifests/lockfile, PDF core/runtime, routes, tool registry,
  catalog/category, all locale bundles, SEO/review manifests, browser QA
- Forbidden scope: deployment configuration, analytics/ads/CMP, legal policy,
  unrelated feature cleanup, other worktrees
- Publication state: preview/noindex until locale, SEO, metadata, FAQ, render,
  and publication evidence gates pass

## Milestones

| Milestone | State | Evidence / next action |
| --- | --- | --- |
| Branch and boundary | complete | Clean branch renamed from `pdf` at base commit |
| Comparable-product benchmark | complete | Smallpdf, iLovePDF, and PDF24 inspected before code; empty and post-upload states recorded in `research/competitive/pdf-toolkit-2026-08-31.md` |
| Design contract | complete | Product, interaction, UI, accessibility, locale, privacy, performance, and error contracts recorded before code |
| Core and feature UI | pending | Add focused tests with positive discovered count |
| Registry, routes, locales, SEO | pending | Integrate centrally and retain preview state |
| Full validation | pending | Unit, check, build/network, desktop/mobile/RTL browser QA |
| Integration readiness | pending | Review complete diff, commit, verify clean tip and main relationship |

## Server ownership

No task-owned Astro server started yet. Before local browser QA, run
`npm run dev -- status`, preserve all existing listeners, and record the exact
owned command, URL, port, and process or exec-session identifier here.
