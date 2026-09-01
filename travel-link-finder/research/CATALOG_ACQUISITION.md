# Global route-catalogue acquisition

Updated: 2026-09-01. This file documents the process only; its raw evidence and CID values live in ignored `research/private/`.

## Publication rule

Only a current official public source plus a live target and explicit eligibility can make a record `verified`. A competitor-discovered CID remains a private `candidate` until independently confirmed. Random numeric CIDs are never published.

## Collection sequence

1. Manually inspect a competitor's generated result with a disposable test URL. Record the label, CID or destination route, whether the hotel path is preserved, and its visible eligibility claim. Do not open Agoda pages in bulk.
2. Find the named card, wallet, airline, or Agoda campaign's public official source in the relevant market.
3. Record issuer country, card type, currency, booking/stay window, member requirement, property/rate exclusions, and direct-vs-general landing behavior.
4. Validate catalogue schema, deduplicate by CID and target, then publish only verified non-expired records.
5. Recheck every verified record quarterly and before its `validUntil` date. A changed redirect, expired condition, missing official source, or mismatch changes it to `expired`.

## Country policy fields

Every record carries `markets`, `eligibility`, `validFrom`, and `validUntil`. Private evidence adds `issuerCountry`, `cardBrand`, `residenceOrIpRule`, `currencyRule`, `membershipRule`, `bookingWindow`, `stayWindow`, `eligibleRateRule`, and `exclusions`.

No current restriction is inferred from the destination, interface language, or CID number. The UI never asks for IP location and never recommends a VPN or country bypass.

## Official landing-route examples

These are verified general-promotion candidates, not numeric CIDs and not hotel-URL transforms:

- Visa Infinite AP routes: Japan, Taiwan, Hong Kong, Singapore, Malaysia; issued-card and qualifying-stay terms apply. Primary evidence: <https://www.visa.com.sg/en_sg/visa-offers-and-perks/agoda/173296?category=1004>.
- Taiwan Visa: local-issued Visa terms and date window are published at <https://www.visa.com.tw/zh_tw/visa-offers-and-perks/agoda/177864?category=18&redemptionCountry=119>.
- Taiwan Amex and Hong Kong Amex: eligible local-issued cards, selected prepaid properties, and campaign dates apply. Primary sources: <https://www.americanexpress.com/zh-tw/benefits/campaigns/travel/index.agoda.html> and <https://www.americanexpress.com/hk/ch/benefits/shopping/offers/travel/agoda.html>.

Airline widgets (for example JAL and Singapore Airlines) are tracked separately and are not treated as generic hotel URL transforms unless their direct landing behavior is revalidated.
