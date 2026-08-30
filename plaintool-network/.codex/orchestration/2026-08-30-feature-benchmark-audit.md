# Feature benchmark audit ledger

- Audit date: `2026-08-30`
- Base commit: `02a7c57`
- Integration branch: `worktree/lucky-cloud-860c`
- Integration worktree: `C:\Users\super\.herdr\worktrees\plain-tools\worktree-lucky-cloud-860c`
- Current review surface: the integration worktree, including its pre-existing uncommitted feature changes
- Deliverable root: `plaintool-network/research/feature-reviews/2026-08-30/`
- Publication boundary: internal evidence and claim candidates only; no marketing superiority claim is approved by this audit alone

## Product direction

- Visual thesis: a calm, dense utility workspace where the input, result, and next action are immediately legible without decorative chrome.
- Content plan: primary task workspace, exact result/status, local-processing evidence, then concise guide and FAQ.
- Interaction thesis: instant or explicitly committed processing according to cost, stale-result prevention during rapid input, and restrained action feedback on copy/download/clear.

## Shared ownership lock

Only the root integration session may edit existing source, routes, registries,
locale bundles, locale manifests, shared QA, SEO/schema, lockfiles, or publication
state. Review agents may inspect the current integration worktree read-only and
write only their assigned files under the deliverable root in their own worktree.

## Review contract

Each feature report must record:

1. route(s), core/feature/test ownership, and current publication state;
2. improvements already present, tied to Git history or current code/test evidence;
3. dated competitor URLs and only capabilities directly observed on those pages;
4. where AbsolTools is stronger, roughly equivalent, or weaker, with scope and caveats;
5. defects and upgrade candidates ranked `P0` to `P3` by user impact, confidence, and effort;
6. safe claim candidates and claims that must not be made;
7. verification performed and any live-surface limitation.

## Branch tree

| Branch | Planned worktree | Owner | Scope | Owned deliverables | Status |
| --- | --- | --- | --- | --- | --- |
| `agent/review-text` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-text` | `/root/review_text` | word counter, text compare, case converter, AI text cleaner | `word-counter.md`, `text-compare.md`, `case-converter.md`, `ai-text-cleaner.md` | planned |
| `agent/review-codec-security` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-codec-security` | `/root/review_codec_security` | Base64, URL codec, hash, JWT, QR | `base64-codec.md`, `url-codec.md`, `hash-generator.md`, `jwt-decoder.md`, `qr-code.md` | planned |
| `agent/review-data-source` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-data-source` | `/root/review_data_source` | JSON, structured converters, HTML/CSS/JS/SQL formatters | `json-formatter.md`, `data-converters.md`, `html-formatter.md`, `css-formatter.md`, `javascript-formatter.md`, `sql-formatter.md` | planned |
| root | integration worktree | `/root` | timestamp, subnet, cross-tool UX, integration, fixes, browser QA | `unix-timestamp-converter.md`, `ip-subnet-calculator.md`, `README.md`, `summary.md` | in progress |

## Forbidden paths for review agents

- `apps/web/src/lib/tool-registry.js`
- `apps/web/src/lib/tool-catalog.ts`
- `apps/web/src/lib/locale-data/**`
- `apps/web/src/lib/locale-review-manifests/**`
- `apps/web/src/pages/**`
- `scripts/qa/**`
- any existing feature/core/package source or test file
- root manifests and lockfiles

## Integration queue

1. Commit this initial ledger without staging pre-existing user changes.
2. Create the three recorded worktrees from `02a7c57` and dispatch bounded reviews.
3. Review each returned diff and cherry-pick only assigned research files.
4. Add root-owned timestamp, subnet, cross-tool summary, and report index.
5. Implement only high-confidence improvements that do not overwrite existing work.
6. Run focused tests, repository gates, and representative desktop/mobile browser checks.
7. Record final commits, tests, limitations, and remaining backlog here.

