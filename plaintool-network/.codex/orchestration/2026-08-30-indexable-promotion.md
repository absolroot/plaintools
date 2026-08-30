# Full indexable promotion — 2026-08-30

## Scope

- Promoted all 25 registered tool routes to `indexable`.
- Kept the two original Base64 routes as the existing indexable baseline.
- Marked previously reviewed tools as `existing-baseline`.
- Marked the four source formatters and IPv4 subnet calculator as
  `new-feature` with the honest `adversarial-reviewed` status from the prior
  17-locale review; no native-speaker approval was invented.
- Removed the preview-only `noindex` directive and preview badge from the
  shared tool page surface.
- Updated the registry self-test so a synthetic preview fixture continues to
  prove that production builds reject future preview routes even though the
  current registry contains none.

## Isolation

Unrelated, concurrently edited home UI, icon, Base64, and Korean copy files
were not included. Validation used a detached worktree containing only the
promotion diff so those changes could not be silently accepted by locale
fingerprints.

## Verification

- 331 Vitest tests passed.
- `npm run check` passed after line-ending normalization in the detached
  Windows verification worktree: 0 Astro/TypeScript errors and warnings.
- Production locale review passed for 14 features and all 17 locales.
- Production SEO registry passed for all 25 tools and all 17 locales.
- A production-configured static build generated 546 pages.
- Production network QA passed metadata, JSON-LD, canonical/hreflang, robots,
  sitemap, crawler policy, route isolation, license, and worker-budget checks.
