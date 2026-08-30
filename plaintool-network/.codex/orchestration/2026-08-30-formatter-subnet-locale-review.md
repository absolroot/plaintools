# Formatter and subnet adversarial locale review

- Date: 2026-08-30 (Asia/Seoul)
- Base recovery commit: `7254791`
- Scope: all visible copy for HTML, CSS, JavaScript, and SQL formatters plus the IPv4 subnet calculator across all 17 locales.
- Publication state remains `preview` / `noindex`.

## Review lanes

| Lane | Locales | Reviewer | Method |
| --- | --- | --- | --- |
| East Asian and RTL | `ko`, `ja`, `zh-TW`, `ar` | `/root/html_pilot` | Independent adversarial report; no direct edits |
| Romance | `es`, `fr`, `pt-BR`, `it` | `/root/ip_subnet` | Independent adversarial report; no direct edits |
| Germanic and Scandinavian | `de`, `nl`, `sv`, `da`, `no` | `/root/sql_formatter` | Independent adversarial report; no direct edits |
| Source and Central/Eastern European | `en`, `cs`, `pl`, `tr` | `/root` | Direct review plus native authoritative terminology checks |

## Acceptance criteria

- Remove translationese, false friends, vague UI jargon, and unnatural imperatives.
- Use familiar developer and IPv4 networking terminology in each locale.
- Preserve implementation boundaries: source is never executed, SQL is never queried, CSS URLs are never loaded, and minification performs no compression transforms or identifier mangling.
- Avoid claims of safety or semantic equivalence.
- Preserve `{message}`, `{line}`, and `{column}` placeholders exactly.
- Keep technical input/output LTR while Arabic prose remains RTL.
- Re-run locale fingerprints, type tests, unit tests, static checks, build, and representative browser QA after accepted edits.

## Current-source terminology evidence

- Microsoft Learn Polish TCP/IP guidance confirms the native terms for subnet mask, network address, and octet.
- Microsoft Learn Czech networking guidance confirms the native terms for subnet, subnet mask, CIDR prefix notation, and broadcast address.
- Microsoft Learn Turkish Azure networking guidance confirms the native terms for subnet, CIDR notation, and broadcast address.
- IANA's current IPv4 Special-Purpose Address Space registry and RFC 3021 anchor the English source meanings for special-use blocks and `/31` point-to-point networks.

## Result

- Completed four independent review lanes covering all 17 public locales.
- Replaced ambiguous code-compression wording with minification wording that matches the implementation.
- Corrected CSS negations, SQL dialect boundaries, IPv4 classification scope, and IANA's “This network” label.
- Localized formatter samples and strengthened Arabic bidi isolation around interpolated diagnostics and tool names.
- Added fixed-length tuple typing so missing or shifted secondary-locale labels fail type checking.
- Refreshed locale-review fingerprints only after the reviewed copy was reconciled.

## Validation

- `npm run type:check`
- `node scripts/check-locale-reviews.mjs`
- `npm test`
- `npm run qa:test`
- `npm run check`
- `npm run build`
- Representative desktop/mobile browser QA for `en`, `ko`, `de`, `ar`, and `zh-TW`

The first cold dev-server pass reproduced the known Vite `504 Outdated Optimize Dep` failure while dynamically discovering formatter dependencies. The same browser matrix passed with zero console, page, network, or UI failures after restarting against the warmed dependency cache. The cold-start defect is intentionally assigned to the later dev-server phase rather than being folded into locale copy.
