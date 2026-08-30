# Formatter and subnet adversarial security review

- Date: 2026-08-30 (Asia/Seoul)
- Base recovery commit: `c5560db`
- Scope: the four source formatters, IPv4 subnet calculator, shared browser utilities, workers, and static deployment controls.
- Threat model: all text and files are attacker-controlled; tools must never execute source, load source-referenced URLs, query SQL, leak input, or turn attacker text into active DOM.

## Review lanes

| Lane | Reviewer | Focus |
| --- | --- | --- |
| Formatter execution boundary | `/root/html_pilot` | DOM injection, execution, URL loads, workers, downloads, stale results, resource exhaustion |
| IPv4 and shared input boundary | `/root/ip_subnet` | parser confusion, malformed masks, Unicode, bounds, output injection, shared file/clipboard paths |
| Static deployment boundary | `/root/sql_formatter` | CSP and headers, dependency audit, worker policy, route isolation, production/preview differences |
| Integration and attack tests | `/root` | source tracing, accepted fixes, automated adversarial regression tests, browser verification |

## Acceptance criteria

- No formatter input is evaluated, previewed as markup, applied as CSS, queried, or inserted through an HTML sink.
- Source-referenced URLs do not produce browser network requests.
- Parser and UI boundaries reject ambiguous IPv4 forms and remain bounded for hostile input.
- Worker failures and rapid repeated operations cannot publish stale output.
- Static output carries the intended security policy without breaking local workers or required assets.
- Dependency and production-network checks pass with no unreviewed findings.

## Result

- Three independent read-only review lanes found no remaining Critical issues in the five tools after reconciliation.
- Fixed a deployment-blocking CSP mismatch by externalizing executable scripts and CSS, adding a host-independent meta CSP, and rejecting inline executable code in built-page QA.
- Strengthened response policy with HSTS, COOP, CORP, a same-origin-only worker policy, and no public source maps.
- Added a five-second formatter worker watchdog and a 20 MiB UTF-8 output cap to contain parser/output amplification before results reach the DOM.
- Routed HTML/CSS file and option changes through the same automatic/manual/hard-limit policy and prevented stale HTML file reads from overwriting newer input.
- Bounded IPv4 core input before parsing and rejected Unicode/control-bearing or ambiguous whitespace syntax.
- Made malformed worker replies fail closed and recreate the worker instead of leaving the UI busy.
- Added browser attacks for HTML event handlers/scripts, CSS URL/style breakout text, JavaScript execution/fetch text, SQL command/markup text, and oversized IPv4 input.
- Confirmed all formatter output remains in textarea values, subnet output remains in `textContent`, and attack source creates no active DOM or external request.

## Deferred to the next OSS/performance phase

- Expand the deployed third-party notice from direct formatter dependencies to every bundled transitive copyright/license and expose the notice from the legal surface.
- Record the measured formatter worker bundles and assess whether dependency-level alternatives improve size without weakening compatibility.
- Reconcile the declared Node 22.19+ engine with the current local Node 22.12 runtime as part of the dev-server reliability work.

## Validation

- `npm audit --audit-level=low` and `npm audit --omit=dev --audit-level=low`: zero known vulnerabilities.
- `npm test`: 36 files and 324 tests passed.
- `npm run qa:test`: 18 tests passed.
- `npm run check`: type, Astro, ESLint, formatting, locale, SEO, and UI gates.
- `npm run build`: 546 static pages plus network/security QA; zero source maps and zero executable inline scripts/styles.
- `npm run qa:security` against the built static site with CSP enforced: zero console errors, page errors, external conversion requests, or UI failures.
