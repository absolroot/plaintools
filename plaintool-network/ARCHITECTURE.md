# AbsolTools architecture and regression contracts

This document explains where code belongs after the feature-oriented refactor
and records the behavior contracts that must survive future cleanup. Read it
before moving a tool, extracting a shared utility, or changing build and locale
configuration.

## System boundary

AbsolTools is a static Astro application. Tool input, filenames, output, raw
errors, and payload-derived values stay in browser memory and must not enter a
URL, log, analytics event, advertisement request, or other third-party request.
There is no server conversion, upload endpoint, database, account system,
service worker, or tool-data persistence.

The only application-owned localStorage entry is `plaintool.theme`, with the
value `light` or `dark`. Production loads GA4 and the AdSense publisher code.
Google Privacy & messaging provides the planned CMP surface; Consent Mode v2
defaults analytics and advertising storage to denied in the EEA, UK, and
Switzerland. Tool input, filenames, output, raw errors, and payload-derived
values remain prohibited from integrations. Do not persist tool state or
results.

## Source ownership

```text
apps/web/src/
  features/
    <tool>/
      <Tool>.astro       Tool-owned rendered workspace
      client.ts          Browser state and interaction lifecycle
      contract.ts        Client/worker/copy message types
      copy.ts            Typed feature view of reviewed locale copy
      worker.ts          Optional tool-owned Worker entry
      styles.css         Optional tool-owned rendered styles
  components/            Presentation shared by multiple real features
  scripts/shared/        Browser behavior shared by multiple real features
  lib/
    tool-registry.js     Tool route, publication, and schema inventory
    content-registry.js  Locale, legal-route, and tool facade for build/runtime
    deployment-config.js Preview/production and integration truth
    locale-data/         Complete independently reviewed per-locale bundles
    *-i18n.ts            Thin typed views over those locale bundles
  pages/                 Thin route composition only
packages/
  *-core/                Framework-independent parsing and conversion rules
scripts/
  qa/                    Feature-oriented browser QA modules
```

A route should select a locale and compose a feature. It must not acquire a
second copy table, route inventory, conversion implementation, or deployment
decision.

## What to share and what to keep local

Extract a component or utility only after at least two real tools use the same
semantics and state contract.

Good shared responsibilities include:

- status rendering and the `idle -> working -> success | error` state model;
- UTF-8 byte-limit measurement;
- downloads, clipboard primitives, and small DOM badges;
- latest-only Worker scheduling when cancellation and stale-result rules match;
- locale parity and interpolation-placeholder test helpers.

Keep these responsibilities inside a feature unless another tool genuinely has
the same behavior:

- parsing and validation meaning;
- file acceptance, size policy, and read errors;
- Worker message payloads and lifecycle details;
- result invalidation rules;
- tool-specific warnings and recovery copy;
- mode-specific URL and metadata transitions.

Do not introduce a generic tool controller whose main benefit is fewer lines.
Types and small facades are preferred over runtime indirection.

## Runtime chronology

Continuous tools must preserve the last committed result while a newer input is
debounced or processed. A normal keystroke must not flash a blank result, zero
metrics, or a working state for work that completes in under 180 ms.

Every asynchronous completion needs an authority check:

- Worker work uses `LatestWorkerRunner`, which terminates superseded work and
  rejects stale preparation, replies, and failures.
- File reads and clipboard writes use a monotonically increasing revision and
  recheck both the revision and relevant value before updating the UI.
- Clear, empty input, a newer file, and an error invalidate pending results and
  actions immediately.
- Infrastructure failures become localized actionable errors; raw exceptions
  never become user copy or analytics data.

Manual actions remain only when they represent an expensive operation, a
meaningful commit point, or an operation that should not run on every edit.

## Core and UI error boundaries

Core packages return or throw typed domain errors. UI-only policy, such as a
10 MiB browser input limit, stays in the feature layer. Do not add a UI policy
code to a framework-independent core union.

Client/Worker protocols must be explicit discriminated types. Do not depend on
object property order for metric mapping, infer an error taxonomy from message
text, or pass an unrestricted options object to a core function.

## Content, locale, and SEO ownership

`tool-registry.js` is the source of truth for tool slugs, route state,
indexability, and tool schema inventory. `content-registry.js` combines it with
the active locale and legal-route inventories for consumers that run in Astro
or Node. Sitemap, `llms.txt`, directory rendering, route QA, and production
validation must consume these registries instead of maintaining parallel
arrays.

Each public locale owns one complete bundle for site, tool, example, directory,
and network copy. Thin typed facades may select fields from that bundle, but no
source-locale spread, runtime fallback, or hardcoded locale ternary may conceal
a missing field. Tests compare all bundle field paths, non-empty strings, and
interpolation placeholders.

The bare root uses the browser's ordered language preferences to choose a
supported locale without IP lookup, storage, or a third-party request. It runs
only at `/`; an explicit locale route remains authoritative. Unsupported
regional variants fall back to English instead of being mislabeled as another
regional language.

Any visible meaning change requires all of the following before publication:

1. review every public locale as an independent product surface;
2. record native-language terminology and technical evidence;
3. review metadata, controls, states, errors, guide, FAQ, schema, directory, and
   legal/shared claims;
4. render desktop and mobile routes;
5. run the locale parity tests and the private publication review.

Preview tools remain `noindex`, outside the sitemap, and rejected by the
production gate until their evidence and publication state are deliberately
promoted.

## Deployment truth

All deployment decisions flow through `resolveDeploymentConfig(env, target,
capabilities)`. Callers must pass `preview` or `production` explicitly.

An integration is active only when both its reviewed implementation capability
and valid deployment configuration exist. Environment variables alone must not
turn on GA4, AdSense, or a CMP. Production fails closed when required operator,
host, legal, origin, locale, or integration facts are absent.

Cookiebot is not part of the build. Google Privacy & messaging is delivered by
the AdSense publisher code. Its European regulations message and Consent Mode
integration must also be published in the AdSense dashboard; source code alone
cannot prove that account-side state.

The default build uses the preview target. Do not set the production origin to
`https://absoltools.com` until ownership and host control are verified.

## Rendered UI contract

At a 1440 px viewport, the header, breadcrumbs, page header, workspace,
supporting rules, directory, and footer share the 1180 px axis at x=130..1310.
Only a genuinely active advertisement rail may use a wider shell. Reading width
is controlled inside that axis.

The information order is header with location context, task description,
workspace, status/action, local-processing note, then guide/FAQ. Each visible
message must answer a different question. Local-processing and status messages
must have one authoritative placement.

Desktop controls use the 36 px family; visible mobile controls are at least
44 px high. Surfaces, controls, popovers, and badges are square by default.
Circles are reserved for semantic indicators such as the status dot.

The self-hosted `PlainTool Mono` face is limited to code/result fields. It is
split by `unicode-range`, loads from the AbsolTools origin, and retains system
monospace fallbacks. Browser QA verifies that the face actually loads and that
the initial Korean code-font payload stays within 1.2 MiB. Do not apply it to
navigation or prose, add another webfont, remove subsetting, or introduce a
third-party font request without a new measured decision.

## Deployment and browser gates

Use Node.js 22.19.x and npm 11.

```powershell
npm test
npm run check
npm run build
npm run ui:qa:affected
npm run ui:qa
npm run ui:qa:full
```

`ui:qa:affected` is the normal feature-development browser gate. It maps changed
feature, package, route, and locale files to focused behavior checks and rendered
routes. Feature-local changes default to English; shared UI changes use one route
per feature across the representative locale matrix (`en`, `ko`, `de`, `ar`, and
`zh-TW`). Non-browser changes do not start Playwright.

`ui:qa` retains the broad compatibility pass over every tool at desktop and
mobile sizes across the representative locale matrix. `ui:qa:full` expands the
same browser checks to every published locale and is reserved for releases and
intentional full audits. Static locale, route, and metadata gates remain
exhaustive in every workflow.

`npm run check` is non-mutating and includes SEO registry, locale review,
UI detail, TypeScript/Astro, ESLint, and Prettier checks. `npm run build` creates
the preview static site and inspects built metadata, JSON-LD, crawler rules,
sitemap membership, integrations, redirects, locale links, and route bundle
isolation.

Browser QA owns behavior that source checks cannot prove:

- desktop/mobile shared axes and control centers;
- touch heights, overflow, first-viewport action reach, and square geometry;
- rapid-input transition history and Clear/newer-input authority;
- file, clipboard, tooltip, theme, locale, and mode interactions;
- console/page errors and cross-origin conversion requests;
- actual code-font loading and payload budget.

Check the existing Astro server before starting another one. Reuse it only when
its process command points to this checkout, and never stop a server whose
ownership is uncertain.

## Failure patterns already seen

Do not reintroduce these defects during future cleanup:

- route, sitemap, `llms.txt`, directory, and QA lists maintained separately;
- production behavior inferred directly from scattered environment reads;
- Base64 mode state duplicated between server rendering and client metadata;
- a shared helper extracted before two tools have matching semantics;
- core errors mixed with browser-only size or file policy;
- Worker callbacks, File reads, or clipboard writes restoring stale state;
- a temporary blank/zero result or working flash during rapid input;
- file-read and Worker infrastructure failures appearing as success or silence;
- object-value order used as the metric-to-field contract;
- source locale fallback hiding incomplete public copy;
- localized copy published before native, technical, and rendered review;
- fake schema features populated with generic guide prose;
- tooltip Escape closing without restoring trigger focus;
- repeated local-processing messages or misaligned outer content axes;
- CSS/source-only review used in place of a real desktop/mobile browser pass;
- a declared font family accepted without checking its request, loaded face,
  origin, and payload.

## Adding or revising a feature

1. Confirm the feature belongs in this static network and has one primary task.
2. Add or update the registry entry and keep new routes in preview unless the
   publication evidence gate is already complete.
3. Create a feature folder with the minimum files its behavior needs.
4. Keep parsing in a core package only when it is framework-independent.
5. Define typed copy, client, Worker, result, warning, and error contracts.
6. Implement cancellation/revision rules before polishing the settled result.
7. Complete the private localization and publication review before changing a
   public meaning or route.
8. Verify source behavior, built output, and the real desktop/mobile surface.
9. Update this document when a new architectural rule or repeated failure is
   discovered.
