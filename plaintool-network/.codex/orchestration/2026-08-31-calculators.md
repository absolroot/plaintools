# Calculator category delivery ledger

- Date: 2026-08-31 (Asia/Seoul)
- Base commit: `799af32`
- Integration branch: `feature/calculators-20260831`
- Integration worktree: `C:\Users\super\.herdr\worktrees\plain-tools\calc`
- Repository: `C:\Users\super\.herdr\worktrees\plain-tools\calc\plaintool-network`
- Publication boundary: new routes start as `preview` / `noindex` until locale, SEO, build, and rendered UI gates are complete.

## Product decision

Create a new `calculator` directory category. Deliver five focused routes so distinct search intents do not compete inside one page:

- `fraction-calculator`: fraction arithmetic, simplification, decimal, and mixed-number result.
- `factor-calculator`: positive factors, factor pairs, prime factorization, and prime/composite status.
- `lcm-calculator`: two or more integers, LCM, GCF, and prime-factor working.
- `percentage-calculator`: common percentage phrases plus percentage change.
- `bmi-calculator`: metric and US units, adult BMI category, and healthy-weight range with an explicit screening limitation.

The existing `date-calculator`, `dday-calculator`, and `age-calculator` routes move to the new directory category during root integration. English search terms for `date-calculator` must explicitly include `Date Calculator`; localized terms remain additive.

## Shared ownership lock

Only the root integration session may change:

- `apps/web/src/pages/**`
- `apps/web/src/features/new-tools/NewToolPreview.astro`
- `apps/web/src/lib/tool-registry.js`
- `apps/web/src/lib/tool-catalog.ts`
- `apps/web/src/lib/locale-data/**`
- `apps/web/src/lib/locale-review-manifests/**`
- shared SEO, route, UI, or browser QA
- root/app package manifests, lockfile, and notices

Feature branches own only their listed `packages/*-core`, feature folders, and focused tests. Visible runtime copy must be passed through typed props; feature code must not contain user-facing English fallbacks.

## Branch tree

| Branch | Planned worktree | Owner | Owned scope | Status |
| --- | --- | --- | --- | --- |
| `agent/calculator-fraction-factor-lcm` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-calculator-fraction-factor-lcm` | `/root/fraction_factor_lcm` | `packages/math-calculator-core/**`, `apps/web/src/features/math-calculator/**` | planned |
| `agent/calculator-percentage` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-calculator-percentage` | `/root/percentage` | `packages/percentage-calculator-core/**`, `apps/web/src/features/percentage-calculator/**` | planned |
| `agent/calculator-bmi` | `C:\Users\super\.herdr\worktrees\plain-tools\agent-calculator-bmi` | `/root/bmi` | `packages/bmi-calculator-core/**`, `apps/web/src/features/bmi-calculator/**` | planned |

## Benchmark decisions

- Preserve AbsolTools' calm square-control system and 1180 px axis.
- Prefer one focused workspace with modes/tabs over the repeated stacked calculators used by comparable sites.
- Show results and the important working immediately: reduced/mixed fraction, factors or prime factors, percentage formula, BMI category and healthy-weight range.
- Accept negative fractions and multiple LCM integers; reject zero denominators, unsafe integers, and ambiguous empty values explicitly.
- Keep BMI adult-only in the first version. Do not request age or sex when they do not affect the adult formula, and do not present BMI as a diagnosis.
- No calculator input, result, or derived value may enter URLs, storage, logs, analytics, ads, or third-party requests.

## Integration queue

1. Commit this ledger and create three feature worktrees at the recorded base.
2. Integrate feature/core commits one at a time after diff and positive-test review.
3. Add the `calculator` category, five preview routes, typed locale copy for all 17 locales, catalog search terms, schema/FAQ, manifests, and shared QA from the root branch.
4. Move the three existing date-family routes from `time` to `calculator` and add exact Date Calculator search coverage without changing their behavior.
5. Run focused tests after each integration, then `npm test`, `npm run check`, `npm run build`, and rendered desktop/mobile QA.

## Final evidence

- Pending.
