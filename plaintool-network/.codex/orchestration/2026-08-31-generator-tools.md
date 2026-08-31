# Barcode and password generator delivery ledger

## Run boundary

- Date: 2026-08-31
- Base commit: `799af32`
- Integration branch: `feature/barcode-password-generators-20260831`
- Integration worktree: `C:\Users\super\.herdr\worktrees\plain-tools\generator`
- Publication target: both routes start as `preview` / `noindex`
- Root ownership: registry, routes, catalog, locale bundles/assembler/manifests, SEO/schema, shared QA, dependencies/lockfile, final browser verification, integration commits
- Product boundary: fully browser-local generation; no payload in URLs, storage, logs, analytics, ads, or third-party requests

## Visual and interaction thesis

- Visual thesis: preserve the calm, square AbsolTools workspace and make the generated barcode or password result the dominant visual surface.
- Content plan: task description, compact input and options, live result and actions, local-processing note, guide, FAQ.
- Interaction thesis: stable live preview, immediate stale-result invalidation on invalid input, restrained copy/download feedback with no decorative motion.

## Planned branches

| Owner | Branch | Worktree | Owned paths | Forbidden shared paths | State |
| --- | --- | --- | --- | --- | --- |
| barcode feature agent | `feature/barcode-generator-core-20260831` | `C:\Users\super\.herdr\worktrees\plain-tools\generator-barcode` | `packages/barcode-core/**`, `apps/web/src/features/barcode-generator/**` | registry, routes, catalog, locale data/manifests, shared components/styles, root manifests/lockfile | benchmark pending |
| password feature agent | `feature/password-generator-core-20260831` | `C:\Users\super\.herdr\worktrees\plain-tools\generator-password` | `packages/password-core/**`, `apps/web/src/features/password-generator/**` | registry, routes, catalog, locale data/manifests, shared components/styles, root manifests/lockfile | benchmark pending |
| root integrator | `feature/barcode-password-generators-20260831` | current integration worktree | all shared integration paths | unrelated user changes and other worktrees | in progress |

## Required feature contracts

- Barcode: validated symbology-specific input, accessible live preview, human-readable text option, size/margin/color controls only when supported, SVG and PNG downloads, clear invalid-state recovery, no remote rendering.
- Password: cryptographically secure browser randomness, length and character-set controls, ambiguity option, guaranteed enabled-set coverage when possible, strength/entropy explanation without absolute security claims, copy/regenerate actions, no persistence.
- Both: typed copy props, deterministic core tests where practical, localized errors supplied by integration, 44 px mobile controls, LTR technical inputs in RTL locales, no stale actions after invalid input.

## Evidence and milestones

- Initial repository status: clean at `799af32`; `origin/main`, local `main`, and prior `generator` all pointed to the same commit.
- Architecture and feature-orchestration instructions read before implementation.
- Competitor/standards benchmark: pending.
- Feature commits: pending.
- Focused tests: pending.
- Integration and locale wiring: pending.
- Full gates: pending.
- Browser QA: pending.
- Final action: keep the completed integration branch ready for review/merge and report exact commit and merge command; do not alter another checkout's `main` without verifying its live state.
