# PDF icon, time-zone workflow, and localized place-name audit

- Access date: 2026-09-01 (Asia/Seoul)
- Checkout snapshot inspected: `main` at `c37d69a`
- Scope: read-only product and standards research. No product source was edited.
- Chrome DevTools MCP was attempted first and did not connect. Exact error:
  `Could not connect to Chrome. Check if Chrome is running. Cause: Could not find DevToolsActivePort for chrome at C:\Users\super\AppData\Local\Google\Chrome\User Data\DevToolsActivePort`
- An isolated Chrome was not launched. Fallback evidence came from the live
  products' official HTML/assets, official product documentation, and primary
  internationalization standards.

## Current checkout findings

- `apps/web/src/lib/tool-catalog.ts` maps all five PDF tools (`compress-pdf`,
  `merge-pdf`, `split-pdf`, `pdf-to-image`, and `image-to-pdf`) to the same
  visible `PDF` mark. The cards therefore provide no function-level visual cue.
- The only public time route is `/{locale}/time-zone-converter/`. Its
  `TimeZoneConverter.astro` combines the conversion form and a World Clock
  section.
- The client obtains every browser-supported primary time-zone ID with
  `Intl.supportedValuesOf("timeZone")`, removes only the current source zone,
  and renders the remainder as clock/result rows. In the local runtime probe
  this meant about 416 target rows, which is a directory rather than a focused
  converter result.
- There is no independent `world-clock` route in the inspected source.

## 1. PDF card icon benchmark

The comparison is about compact recognition, not copying any product's SVG or
brand styling. Labels remain necessary; the icon is an additional scan cue.

### Adobe Acrobat online

Official surfaces:

- [Compress PDF](https://www.adobe.com/acrobat/online/compress-pdf.html)
- [Merge PDF](https://www.adobe.com/acrobat/online/merge-pdf.html)
- [Split PDF](https://www.adobe.com/acrobat/online/split-pdf.html)
- [PDF to JPG](https://www.adobe.com/acrobat/online/pdf-to-jpg.html)
- [JPG to PDF](https://www.adobe.com/acrobat/online/jpg-to-pdf.html)

Observed visual language in Adobe's own accessible image descriptions:

- Compress: a large file becoming smaller and a PDF paired with a measurement
  bar. The recognizable idea is size reduction, not a download arrow.
- Merge: three document icons flowing through an arrow to one document; a PDF
  with a plus sign is used as a second merge metaphor.
- Split: pages cut by scissors and one PDF becoming several separate files.
- PDF to image and image to PDF: two distinct file/document forms connected by
  directional arrows. The page context establishes which format is the source.

### Smallpdf

Official surfaces:

- [Tool directory](https://smallpdf.com/)
- [Split PDF](https://smallpdf.com/split-pdf)
- [PDF to JPG](https://smallpdf.com/pdf-to-jpg)
- [JPG to PDF](https://smallpdf.com/jpg-to-pdf)

Observed live DOM and official instructions:

- Merge's compact home-card SVG is two offset page outlines with a small plus.
- Compress's compact home-card SVG is offset page outlines with opposing
  diagonal size-change arrows.
- JPG to PDF's compact home card uses the conventional landscape/photo glyph.
  It is less direction-explicit than Adobe, so the visible card label carries
  more of the distinction.
- The Split PDF instructions explicitly tell the user to click a scissors tool
  icon. Its accompanying illustration shows pages becoming separate files.

### iLovePDF

Official surfaces:

- [Tool directory](https://www.ilovepdf.com/)
- [Merge PDF](https://www.ilovepdf.com/merge_pdf)
- [Split PDF](https://www.ilovepdf.com/split_pdf)
- [Compress PDF](https://www.ilovepdf.com/compress_pdf)
- [PDF to JPG](https://www.ilovepdf.com/pdf_to_jpg)
- [JPG to PDF](https://www.ilovepdf.com/jpg_to_pdf)
- [Official compact icon sprite](https://www.ilovepdf.com/img/icons/sprite.6.svg)

Observed live DOM/CSS asset mappings:

- The site assigns separate compact icons named `ico--merge`, `ico--split`,
  `ico--compress`, `ico--pdfjpg`, and `ico--jpgpdf`; it does not reuse one PDF
  badge for the family.
- Merge and split reuse a paired/offset-document base but reverse the movement
  cue: convergence versus separation.
- Compress uses a page/square with corner-directed size arrows.
- The two conversion directions have separate sprite regions, keeping source
  and result visually distinguishable.

### PDF24 Tools (useful outlier)

Official surfaces and first-party assets:

- [Tool directory](https://tools.pdf24.org/en/)
- [Merge PDF](https://tools.pdf24.org/en/merge-pdf)
- [Split PDF](https://tools.pdf24.org/en/split-pdf)
- [Compress PDF](https://tools.pdf24.org/en/compress-pdf)
- [PDF to images](https://tools.pdf24.org/en/pdf-to-images)
- [Images to PDF](https://tools.pdf24.org/en/images-to-pdf)

PDF24 maps every tool to its own large vector illustration. These branded
illustrations are visibly distinct at directory size but do not form a compact,
portable glyph grammar. This is evidence that differentiation matters, not a
pattern to reproduce in AbsolTools' small card marks.

### Common metaphors and proposed icon contract

| Function | Cross-product recognition cue | AbsolTools compact icon contract |
| --- | --- | --- |
| Compress PDF | document gets smaller; inward/size-change arrows; measurement | One PDF-page outline with two clear inward diagonal arrows. Avoid cloud/download arrows. |
| Merge PDF | several pages converge/overlap; plus; many-to-one | Two offset page outlines, a small plus, and/or a short convergence cue. It must not look like duplicate/copy alone. |
| Split PDF | scissors/cut line; one document becomes several | One page divided by a vertical dashed cut with scissors, or two page halves separating. Scissors is the strongest shared cue. |
| PDF to image | document becomes a landscape/photo | PDF page, short directional arrow, landscape rectangle. Source and output must remain recognizable at 24 px. |
| Image to PDF | landscape/photo becomes a document | Landscape rectangle, short directional arrow, PDF page; the exact reverse of PDF-to-image. |

Implementation constraints for the integrator:

- Draw original repo-native SVG geometry; do not copy the benchmark assets.
- Keep all five icons in one visual system: same view box, stroke width, corner
  treatment, and optical size. Function geometry, not arbitrary color alone,
  must distinguish them.
- Keep the card title visible and make decorative SVGs `aria-hidden="true"`.
- At RTL locales, preserve logical source-to-result order. If the icon group is
  mirrored, mirror the complete conversion group rather than only the arrow.
- Verify recognition at the actual home-card size, in light/dark themes, at
  390 px Arabic RTL, and with color removed. A single `PDF` text mark is not an
  acceptable fallback for these five tools.

## 2. Separate Time Zone Converter and World Clock products

### timeanddate.com

- [Time Zone Converter](https://www.timeanddate.com/worldclock/converter.html)
- [Converter help](https://www.timeanddate.com/worldclock/converter-help.html)
- [World Clock](https://www.timeanddate.com/worldclock/)
- [World Clock help](https://www.timeanddate.com/worldclock/help.html)

Separation observed:

- The converter is an editable comparison task: search a city/time zone, add
  more locations, change the date/time, and see corresponding local times. It
  caps the comparison at 12 locations.
- The World Clock is a browse/current-time surface. Its main page shows a
  curated set of important or commonly searched cities, with separate extended
  coverage, search, sorting, and continent filters.
- The converter can include current time, offsets, and time differences, but
  those are result options; they do not turn the route into the full worldwide
  clock directory.

### Dateful

- [Time Zone Converter](https://dateful.com/time-zone-converter)
- [World Clock](https://dateful.com/world-clock)

Separation observed:

- The converter exposes location rows plus explicit time/date and 12/24-hour
  controls; the task is changing a reference instant and comparing results.
- The World Clock has its own route, clock collection/search area, and link back
  to the converter. Current clocks are a destination, not a result table forced
  below every conversion.

### Savvy Time

- [Time Zone Converter](https://savvytime.com/converter)
- [World Clock home](https://savvytime.com/)

Separation observed:

- `/converter` starts with `Add time zone, city, or town`, then supports
  multiple places, date/time adjustment, 12/24-hour format, and comparison.
- The World Clock home detects the browser zone, displays current time, and
  offers city/country search. It links separately to `Time Converter` and `Time
  Around the World`, making the current-time intent distinct from planning a
  conversion.

### Product contract proposed for AbsolTools

#### Route A: `/{locale}/time-zone-converter/`

Primary job: convert one stated UTC instant to one chosen local time without
making the user scan hundreds of clocks.

1. The first and most prominent input is UTC date and time. Default to the
   current UTC minute, but make the value editable and label it explicitly UTC.
2. The primary destination is one searchable city/time-zone selector. A
   detected browser zone can be the initial destination only when it resolves
   to a supported IANA ID; otherwise use `Asia/Seoul` or another explicit
   product default chosen by the main integrator.
3. One manual `Convert` action commits the result. The result contains:
   destination local date/time, day change relative to UTC, current offset,
   IANA ID, and a DST/standard-time descriptor when the platform supplies one.
4. A secondary `From another time zone` control may unlock a searchable source
   selector, but UTC remains the default and visual anchor. Do not begin with
   two enormous native selects.
5. A Swap action is optional only after both source and target are explicit.
6. Do not render the browser's entire supported-zone list as conversion output.
   No live one-minute interval is necessary once the user commits a historical
   or future instant.

#### Route B: `/{locale}/world-clock/`

Primary job: scan the current time in a small, useful set of cities.

1. Show current UTC as the anchor, updated once per minute while the page is
   visible.
2. Show six representative city clocks by default: Seoul, Tokyo, Singapore,
   London, New York, and Sydney. Keep this ordered list in a small product
   configuration so it can be reviewed, not inferred from browser order.
3. Each row/card shows reviewed city label, local time, local date/day change,
   UTC offset, and visible IANA ID. Do not show weather, flags, or political
   claims.
4. Provide one search field to replace/add a city, with an explicit small cap
   such as eight clocks. Search results may cover all supported IANA zones, but
   the full set should not render into the initial document.
5. Keep 12/24-hour format as a compact preference for the current visit only;
   do not add storage for it under the current architecture rules.
6. Cross-link the two routes as related tools. Their H1, title, description,
   FAQ, and indexability review must remain independent.

Acceptance points:

- A converter result must be reachable by keyboard using one destination
  search and one action.
- Ambiguous/nonexistent DST wall times receive a localized, actionable error;
  no raw exception text is shown.
- World Clock starts with no more than the reviewed representative set and does
  not render 400+ rows.
- Source/target changes invalidate stale results. No time, location, or result
  enters a URL, analytics event, log, or storage.

## 3. Authoritative localization of city and country names

Primary references:

- [ECMA-402 `Intl.DisplayNames`](https://tc39.es/ecma402/#intl-displaynames-objects)
- [ECMA-402 `Intl.supportedValuesOf`](https://tc39.es/ecma402/#sec-intl.supportedvaluesof)
- [ECMA-402 `Intl.DateTimeFormat`](https://tc39.es/ecma402/#datetimeformat-objects)
- [Unicode CLDR time-zone names](https://unicode.org/reports/tr35/tr35-dates.html#Time_Zone_Names)
- [IANA time-zone database](https://www.iana.org/time-zones)
- [IANA `zone1970.tab`](https://data.iana.org/time-zones/tzdb/zone1970.tab)

### What browser APIs can safely supply

- `Intl.supportedValuesOf("timeZone")` supplies the implementation's primary
  IANA time-zone identifiers. It is a zone inventory, not localized city names.
- `Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "longGeneric" })`
  plus `formatToParts()` can supply a localized zone descriptor. ECMA-402
  explicitly permits a fallback to the raw zone value when a localized form is
  unavailable, so the UI must tolerate IANA IDs or GMT-offset-like results.
- `Intl.DisplayNames(locale, { type: "region", fallback: "code" })` can supply
  localized country/region names from a known region code. ECMA-402 supports
  language, region, script, currency, calendar, and date-time-field display
  names; it does **not** define city or IANA-zone display names.
- `supportedLocalesOf()` and `resolvedOptions().locale` can detect locale
  fallback. They do not prove native-language review or consistent wording
  across Chrome, Safari, Firefox, and operating-system ICU releases.

### What requires CLDR/IANA data outside the browser API

- CLDR has `exemplarCity` entries and localized generic-location formats, but
  JavaScript has no `Intl` API that returns `exemplarCity` for a zone.
- Splitting `America/Argentina/Buenos_Aires` on `/` and `_` produces a technical
  label, not an authoritative localized city name. CLDR notes that some zone
  IDs designate countries or territories rather than cities and that the zone
  ID itself must not be translated.
- IANA `zone1970.tab` provides zone-to-country-code relationships and principal
  locations. Some zones cover multiple countries. IANA explicitly states that
  the table is a practical selection aid and does not endorse legal or
  territorial claims.
- A complete localized city directory therefore needs a pinned, licensed CLDR
  exemplar-city dataset (and a pinned IANA zone/region mapping) generated at
  build time. It must carry a version/provenance record and update deliberately;
  a browser-only implementation cannot manufacture equivalent translations.

### Fail-safe implementation contract for the 17 locales

The repository locales inspected are `en`, `ko`, `es`, `de`, `ja`, `fr`,
`pt-BR`, `it`, `nl`, `sv`, `cs`, `pl`, `da`, `no`, `ar`, `zh-TW`, and `tr`.

1. Keep the IANA zone ID as the stable, visible technical identity. Never
   translate it and never hide it behind a possibly ambiguous abbreviation.
2. For the six curated World Clock cities, use reviewed locale copy or a pinned
   CLDR `exemplarCity` extraction. Do not generate city names from the ID leaf
   and present them as translations.
3. For the searchable long tail, a safe browser-only label is:
   `IANA ID — localized generic zone name — current UTC offset`. City and
   country are optional until authoritative mappings exist.
4. If a pinned IANA mapping supplies exactly one agreed ISO region code, obtain
   its displayed region name with `Intl.DisplayNames`. If the mapping has
   multiple country codes, show no country by default or show all mapped region
   names neutrally; do not select the first as a sovereignty claim.
5. Always retain the current numeric UTC offset because generic names may fall
   back, collide, or change with daylight saving time. Compute it for the exact
   instant being displayed.
6. Add `UTC` explicitly. The local runtime's primary-zone inventory did not
   contain `UTC`, even though `Intl.DateTimeFormat` accepts it.
7. If `Intl.supportedValuesOf` is unavailable, use a small reviewed fallback
   zone set rather than shipping an unproven English city translation table.
8. Do not depend on `Intl.Locale.prototype.getTimeZones()` for production yet;
   the local Node 22.12 runtime did not expose it, and it would still provide
   identifiers rather than localized city labels.

### Local runtime probe (support evidence, not browser parity)

A read-only Node probe used Node `v22.12.0` with ICU `76.1`:

- `Intl.supportedValuesOf("timeZone")` returned 417 primary IDs; it included
  `Asia/Seoul` and `America/New_York` but not `UTC`.
- `Intl.DisplayNames.supportedLocalesOf()` reported all 17 repository locales
  as supported, and `type: "region"` localized `KR` in every one.
- `Intl.DateTimeFormat(... timeZoneName: "longGeneric")` produced a localized
  Korean-time descriptor in all 17 locales for `Asia/Seoul` at the test
  instant.
- `Intl.Locale.prototype.getTimeZones` was `undefined`.

These results confirm the API layering but cannot guarantee the same CLDR
version or fallback choices in the user's Chrome. Rendered browser QA must
repeat representative checks once the configured Chrome DevTools connection is
available.

## Decision summary

- Replace the five identical PDF marks with five original, function-specific
  SVGs following the compact contracts above.
- Split Time Zone Converter and World Clock into independent routes and product
  intents. The converter is UTC-first and single-destination by default; the
  World Clock is current-time scanning over a small reviewed city set.
- Use browser `Intl` for date/time formatting, zone descriptors, offsets, and
  region display names. Do not claim that `Intl` localizes cities.
- Keep IANA IDs visible and treat a pinned CLDR/IANA data pipeline plus native
  review as the gate for a fully localized all-city directory.
