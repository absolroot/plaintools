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
| Core and feature UI | complete | `@plaintool/pdf-core`, PDF.js/pdf-lib worker runtime, one shared five-mode UI; 14 focused unit/i18n tests pass |
| Registry, routes, locales, SEO | complete for preview | Five routes and 17 complete locale objects integrated; one final shared fingerprint reconciliation completed; locale and SEO preview gates pass |
| Full validation | complete for preview | 419 unit tests, typecheck, lint, preview build/network QA, and focused browser QA pass; production promotion remains gated |
| Integration readiness | pending | Review complete diff, commit, verify clean tip and main relationship |

## Server ownership

- Preflight: `npm run dev -- status` reported no managed server.
- Preserved listener: `127.0.0.1:4337`, PID `75936` (not touched).
- Owned command: `npm run dev -- 127.0.0.1 4359`
- Owned URL: `http://127.0.0.1:4359`
- Owned process: Astro-managed PID `18300`
- Stop result: `npm run dev -- stop` stopped only PID `18300` after final QA.
- Final locale-matrix rerun reused explicit port `4359` with task-owned PID
  `61396`; status confirmed no managed server remained after stopping it.

## Validation notes

- `chrome-devtools-qa` was attempted first for both comparable-product and
  localhost work. It disconnected at `127.0.0.1:9478`; focused Playwright QA
  was used as the documented fallback.
- First focused browser run stopped at a styled split-mode radio because its
  visible label intercepted Playwright's direct input click. The QA was fixed
  to select the real radio state and rerun; this was not a product failure.
- First Arabic mobile assertion included hidden reorder buttons and therefore
  measured `0px`. The assertion now measures visible controls only; the rerun
  recorded RTL, `0px` horizontal overflow, a single-column editor, LTR numeric
  input, and a `44px` minimum visible action height.
- `npm run seo:check` currently reports stale fingerprints for the existing
  manifests because the shared registry/catalog changed. Per the user-owned
  integration procedure, all shared fingerprints were reconciled exactly once
  after the feature implementation stabilized; the next run passed all locale
  and SEO preview gates.
- `npm run build` passed and generated 1,413 static pages; preview network QA
  passed.
- The representative whole-site browser suite stopped in the pre-existing
  background-remover model readiness wait after 180 seconds. The PDF-focused
  desktop/mobile suite completed separately with all five real conversions and
  no console, page, or external-request failures.
- The final focused matrix rendered all 85 PDF locale routes and all 85 PDF
  homepage cards. Every route returned 200 with the expected locale/mode and
  preview `noindex` metadata.
- `npm run build:production` is intentionally rejected with
  `pdf-toolkit cannot enter a production build before promotion review` while
  the feature remains `preview/noindex`. Do not bypass this by relabeling
  reference-backed locale copy as native-approved.
- Whole-repository `format:check` reaches the existing baseline of 378
  Prettier warnings; task-owned JS/TS/Astro/CSS/JSON surfaces were formatted
  directly instead of rewriting unrelated files.

## Latest main relationship

- Last fetch of `origin/main`: `ae07881f9e68afa6f219af7cf3ad340b38b2f0ab`
- Current local integration `main`: `255ae4fcd340274996270a745ad0be8874ff9caa`
  (ahead of and containing `origin/main`)
- `git cherry -v main feature/pdf-toolkit-20260831` reports exactly three new
  commits: design contract, browser-local PDF toolkit, preview integration.
- Do not cherry-pick into main until the explicit promotion review resolves the
  production gate; after that, refresh main and rerun `git cherry` because the
  shared calculator work already makes conflicts in registry/locale/fingerprint
  surfaces plausible.

## Required main integration procedure

The final integration must use this exact order:

1. Refresh and verify the latest `main` state.
2. Run `git cherry -v main feature/pdf-toolkit-20260831` and separate already
   included commits from genuinely new commits.
3. Cherry-pick completed feature commits one at a time.
4. Resolve every conflict on the integration checkout against the latest
   `main`; the integration owner owns those decisions.
5. Reconcile the shared registry, locale layer, SEO state, fingerprints, and
   lockfile exactly once after the feature commits are present.
6. Run the full test suite and production build, then verify the rendered
   homepage PDF cards and all locale route families.
7. Create one reviewed integration checkpoint commit.
8. After the final evidence check, push once.

Do not merge or push from the feature worktree before this procedure. If the
production gate intentionally rejects preview tools, either finish the explicit
publication evidence/promotion step or record that exact gate as a blocker;
never call a preview-only build a production verification.
