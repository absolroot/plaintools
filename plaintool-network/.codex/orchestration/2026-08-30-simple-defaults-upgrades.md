# Simple-default feature upgrades

- Started: `2026-08-30`
- Base branch: `main`
- Base commit: `63d8f68`
- Feature branch: `feature/simple-defaults-upgrades-20260830`
- Feature worktree: `C:\Users\super\.herdr\worktrees\plain-tools\feature-simple-defaults-20260830`
- Main worktree: `C:\Users\super\Desktop\plain-tools`
- Integration owner: `/root`

## Product contract

- A normal user completes the primary task without opening Options.
- Safe, reversible, broadly expected behavior may be enabled by default.
- Behavior that changes source meaning or expands interpretation is default off.
- Implementation quality such as streaming and stale-result protection is automatic,
  not a user setting.
- Specialist workflows are deferred or placed on separate routes rather than added
  to the primary workspace.

## Implementation scope

1. AI text cleaner: conservative bidi/NBSP defaults and explicit security cleanup.
2. Base64: recursive decode default off; retain transparent repair/result metadata.
3. JWT: persistent `NOT VERIFIED` context in results and downloads.
4. JavaScript minify: preserve legal/license comments by default.
5. Data converter: remove visible English mode-label hardcoding.
6. Base64: show total byte count and whether hex preview is truncated.
7. Hash generator: expected-checksum comparison without adding algorithm clutter.
8. Word counter: explain counting rules instead of adding speculative metrics.
9. IP subnet: copy individual result values without adding IPv6/VLSM controls.
10. Carry the locale-aware Case Converter fix if current `main` lacks it.
11. Refresh focused tests, locale contracts, shared QA, and traceability records.

## Deferred by design

- Timestamp microseconds/nanoseconds.
- IPv6/VLSM inside the IPv4 calculator.
- Reading-time/keyword dashboards.
- Batch URL/timestamp controls on the primary route.
- Embedded CSS/JavaScript formatting in the HTML formatter.
- Structured QR payload forms without demand evidence.

## Shared-file policy

This branch owns all implementation and locale changes for this batch. The dirty
`worktree/lucky-cloud-860c` checkout is read-only and will not be used as an edit
source. Before merging, compare this branch against the latest clean `main`, merge
or rebase `main` into the feature branch, resolve shared locale/QA conflicts here,
and run the final gates again.

## Verification ledger

| Stage | Commit | Evidence | Status |
| --- | --- | --- | --- |
| Boundary recorded | `17bfff7` | clean branch from `63d8f68`; dirty source worktree left untouched | complete |
| Locale-aware Case Converter | `06007b9` | focused core and browser QA carried from isolated review branch | complete |
| P0 defaults | `4d139db` | 49 focused tests; TypeScript/Astro check; locale review gate | complete |
| Result usability | pending | 65 focused tests; TypeScript/Astro check; 17-locale review gate; Python QA compilation | in progress |
| Full feature branch | pending | `npm test`, `npm run check`, `npm run build`, browser QA | pending |
| Main integration | pending | clean merge and post-merge gates | pending |
