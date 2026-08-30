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
| `agent/review-text` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-text` | `/root/review_text` | word counter, text compare, case converter, AI text cleaner | `word-counter.md`, `text-compare.md`, `case-converter.md`, `ai-text-cleaner.md` | integrated as `984b491` from `4285b27` |
| `agent/review-codec-security` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-codec-security` | `/root/review_codec_security` | Base64, URL codec, hash, JWT, QR | `base64-codec.md`, `url-codec.md`, `hash-generator.md`, `jwt-decoder.md`, `qr-code.md` | integrated as `61f82a6` from `e06eb00` |
| `agent/review-data-source` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-review-data-source` | `/root/review_data_source` | JSON, structured converters, HTML/CSS/JS/SQL formatters | `json-formatter.md`, `data-converters.md`, `html-formatter.md`, `css-formatter.md`, `javascript-formatter.md`, `sql-formatter.md` | integrated as `d8685e9` from `34dcf77` |
| root | integration worktree | `/root` | timestamp, subnet, cross-tool UX, integration, fixes, browser QA | `unix-timestamp-converter.md`, `ip-subnet-calculator.md`, `README.md`, `summary.md` | reports complete; final gates pending |

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

## Integration results

- Initial audit ledger: `6025eb0`.
- Text reports: `984b491` (source branch `4285b27`).
- Data/formatter reports: `d8685e9` (source branch `34dcf77`).
- Codec/security reports: `61f82a6` (source branch `e06eb00`).
- Case Converter locale-aware fix: `7e59906`; Turkish upper/lower/sentence/
  capitalize-words coverage added.
- Root reports and indexes: staged for the final audit documentation commit.

## Verification and blockers

- Passed: timestamp+subnet `2 files / 69 tests`.
- Passed after fix: Case Converter `1 file / 13 tests`.
- Review branch evidence: text cores `4 files / 46 tests`, codec/security
  `6 files / 41 tests`, data/formatter `13 files / 112 tests`.
- Root `tsc -p tsconfig.json` passed as the first half of `npm run type:check`.
- Full Astro check is currently blocked by five `help` prop omissions in the
  separately modified `NewToolPreview.astro`; no Case Converter diagnostic was
  reported. Do not repair that other session's in-progress ownership here.
- In-app browser connection failed because the execution metadata required by
  the browser runtime was unavailable. Repository Chromium QA remains the
  fallback final surface gate.
- Current Node is `22.12.0`, below the repository's `>=22.19 <23` requirement;
  focused test results are regression evidence, not a formal release gate.

## Remaining P0 queue

1. AI cleaner: preserve bidi controls in the safe default and reconsider the
   hidden default-on NBSP normalization.
2. Base64: make recursive decode opt-in or preserve an explicit first-stage
   result beside the final recursive result.
3. JWT: carry `NOT VERIFIED` into result headings and downloaded output.

These paths overlap a separate session's active uncommitted UI/locale changes,
so this audit records them without overwriting that work.
