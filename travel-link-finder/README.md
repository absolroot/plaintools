# Travel Link Finder

Static, browser-local helper that turns one Agoda hotel URL into verified direct-check links for publicly documented access routes. It never reads Agoda prices, opens tabs automatically, stores a search, or puts a traveller URL in this app's address bar.

## Data boundary

The open-source repository contains the decoder, validation rules, a schema fixture, and build tooling. The verified CID catalogue and its evidence are operational data kept outside the repository in `research/private/`. The build produces `public/catalog.payload.js`, an obfuscated browser payload. This is a copying deterrent only: users can inspect links shown in their browser.

## Local build

1. Create `research/private/catalog.private.json` from `research/catalog.example.json` and add only records with public official evidence.
2. Run `npm run build`.
3. Serve `dist/` with any static host.

`npm run check` validates the private source when present. A production build fails without it.

## Product rules

- Prices, savings, and eligibility are never fetched or claimed.
- Only hotel-preserving CID routes are created from the traveller URL.
- General partner promotions are shown separately and never receive traveller parameters.
- Expired, unsupported, candidate-only, and random CIDs are excluded from the public payload.

