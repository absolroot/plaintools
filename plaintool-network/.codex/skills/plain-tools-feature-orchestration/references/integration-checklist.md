# Integration checklist

## Before integration

- Confirm the feature branch starts from the recorded base and has a clean committed tip.
- Review `git diff <base>...<branch> --stat` and the full diff.
- Confirm it changed only owned paths or explicitly allowed manifests.
- Confirm core code has unit tests and visible copy is injected rather than hardcoded.
- Confirm browser input stays local and no tool payload enters URLs, logs, storage, analytics, ads, or third-party requests.

## Integration order

1. Core packages and feature-owned UI.
2. Reconciled package manifests and one regenerated lockfile.
3. Feature routes and preview registry entries.
4. Locale bundle fields and reviewed copy for all supported locales.
5. Catalog search terms, metadata, guide, FAQ, schema, and locale review manifests.
6. Shared QA coverage and publication gates.

If a locale migration is concurrent, wait for its commit before steps 4-6. Do not copy its uncommitted files into the integration branch.

## Per-family checks

- Encoders/decoders: Unicode, malformed input, empty input, mode options, recursive bounds.
- Hash/JWT: known vectors, file/text parity, Base64URL padding, malformed segments, no verification claim.
- Structured conversion: delimiters, quotes, embedded newlines, sparse rows, nested values, table escapes, unsafe HTML kept out of the rendered DOM.
- Hidden Unicode: safe defaults preserve meaningful shaping and emoji; reports name exact code points; no authorship claim.
- QR: generator-to-scanner round trip, image upload, camera permission states, no automatic navigation.

## Final gates

- Focused unit tests after each integration.
- `npm test`, `npm run check`, and preview build/network QA.
- Desktop and mobile browser behavior, including RTL pages and LTR technical inputs.
- Console errors, cross-origin requests, copy/download, clear/newer-input authority, and local-only claims.
- Update the run ledger with final commit, gates, known limitations, and whether preview publication remains intentional.
