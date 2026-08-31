# Fraction calculator and time-zone converter workflow review

Review date: 2026-08-31 (Asia/Seoul)

## Scope and evidence boundary

This is a pre-implementation interaction review for two requested redesigns:

- make the fraction expression immediately legible as two fractions and one
  operation;
- make the source time zone reliably selectable and replace the small,
  manually curated clock set with a useful world-time view.

Chrome DevTools MCP was attempted first. It could not attach to the existing
Chrome profile and returned:

> Could not connect to Chrome. Check if Chrome is running. Cause: Could not
> find DevToolsActivePort for chrome at
> `C:\Users\super\AppData\Local\Google\Chrome\User Data\DevToolsActivePort`

The in-app browser runtime was also unavailable because the required
`node_repl` JavaScript execution tool was not exposed. The live comparison
therefore used the actual working product pages through the web reader. The
live AbsolTools routes returned an internal fetch error in that reader, so the
current AbsolTools surface was audited from the checked-out Astro, CSS, client,
and browser-QA sources. No rendered-completion claim is made in this record.

## Current fraction-calculator audit

Current sources:

- `apps/web/src/features/math-calculator/MathCalculator.astro`
- `apps/web/src/features/math-calculator/styles.css`
- `apps/web/src/features/math-calculator/client.ts`
- `scripts/qa/calculator_feature.py`

### Current interaction and hierarchy

- Each fraction is a bordered `fieldset` with a legend, two separately labelled
  inputs, and a horizontal fraction rule between them.
- The operation is a full-width labelled select in a separate middle grid
  column.
- Desktop orders the expression as first fraction, operation, second fraction.
- At the current mobile breakpoint, the two operands stay beside one another
  while the operation moves to a full-width second row. The visual reading
  order therefore becomes operand A, operand B, then operation, rather than
  `A operation B`.
- The user must explicitly press Calculate. Input changes correctly invalidate
  the old result rather than silently recalculating.
- The checked-in QA proves `1/2 + 1/3 = 5/6`, route navigation, and overflow,
  but records no bounding boxes, operator reading order, label visibility, or
  mobile fraction screenshot assertion.

### Why the expression is hard to scan

The implementation has the right mathematical ingredients, but four visual
containers compete with the equation itself: two fieldset borders, four input
labels, and a large labelled operation control. The numerator and denominator
positions no longer do enough work because the labels and card boundaries are
more prominent than the fraction bar. On mobile, moving the operator below both
operands breaks the expression's semantic order.

## Live fraction-calculator comparison

All pages below were opened on 2026-08-31. Observations are limited to their
working product surfaces; product prose or source code was not copied.

### Calculator.net Fraction Calculator

- Working surface: <https://www.calculator.net/fraction-calculator.html>
- Input model: two compact vertical numerator/denominator stacks arranged as a
  single equation. A solid horizontal line separates each numerator and
  denominator; the operator sits between the stacks and the result is aligned
  after an equals sign.
- Action hierarchy: the calculator is manual, with calculation and reset-style
  actions subordinate to the equation.
- Effective pattern: the page explicitly explains once that fields above the
  line are numerators and fields below are denominators, then lets position and
  the rule communicate the structure.
- Pattern to reject: the page combines several separate fraction calculators
  below the primary one, which is unnecessary for AbsolTools' focused route.

### RapidTables Fractions Calculator

- Working surface:
  <https://www.rapidtables.com/calc/math/fractions-calculator.html>
- Input model: Simple Fractions and Mixed Fractions are explicit modes. The two
  vertically stacked fractions and the operator select stay together in one
  equation row.
- Output model: a manual Calculate action reveals the reduced result and a
  separate calculation-steps section; Reset is a secondary action.
- Effective pattern: inputs, operator, equals relationship, result, and steps
  form one left-to-right mathematical story. The operation is represented by
  the symbol itself rather than a wide prose control.
- Pattern to reject: a second free-form calculation input duplicates the
  primary workflow.

### Omni Calculator Fraction Calculator

- Working surface: <https://www.omnicalculator.com/math/fraction>
- Input model: operation and simple/mixed-number mode are chosen first. The
  first and second fractions are then grouped with explicit Numerator and
  Denominator labels.
- Output/action model: the result area updates from the entered values and
  offers clear/reload actions; detailed education remains below the calculator.
- Effective pattern: operand identity (`1st fraction`, `2nd fraction`) is clear,
  and the simple/mixed choice is separate from the number fields.
- Pattern to reject: the long calculator platform chrome and promotional
  actions are outside AbsolTools' primary task.

## Fraction redesign contract

### Product and interaction contract

- Primary intent: enter two ordinary fractions, choose one operation, and get a
  reduced fraction plus supporting forms after an explicit Calculate action.
- Default state: four empty integer inputs, addition selected, no result, neutral
  status and neutral surfaces.
- Desktop equation: one unbroken row containing a compact first-fraction stack,
  a square symbol selector, a compact second-fraction stack, and an equals cue
  leading toward the result region.
- Mobile equation: preserve the same semantic order. A 390 px layout can keep
  two compact operand stacks and a 44 px operator between them; if localization
  makes that impossible, stack vertically as first fraction, operator, second
  fraction rather than moving the operator after both operands.
- Fraction fields: remove the decorative fieldset cards. Give each operand one
  short heading, make the horizontal rule stronger than container borders, and
  keep accessible labels for numerator and denominator. Visible labels may be
  compact and secondary, but they must not visually separate the numerator from
  its denominator.
- Operation: show `+`, `−`, `×`, or `÷` as the dominant selected value; keep the
  localized operation name as the accessible name or supporting option text.
- Keyboard: Enter in any numeric input calculates. Tab order must follow first
  numerator, first denominator, operation, second numerator, second denominator,
  Calculate.
- Recovery: a zero denominator or invalid integer marks and focuses only the
  responsible field. Ordinary edits clear the stale result and return to a
  neutral ready state.
- Result: keep reduced fraction dominant; mixed number, decimal, expression, and
  reduction steps remain subordinate. Success does not tint the entire input or
  output panel.
- Network boundary: values and results remain in browser memory and do not enter
  URLs, storage, analytics, logs, or requests.

### Visual thesis and measurements for implementation

Visual thesis: use compact system-type calculator density, a flat neutral
workspace, a mathematically dominant fraction bar, and accent color only for
the Calculate action and focus/error states.

Required rendered evidence:

- desktop 1440 x 1000: both fraction stacks, operator, and equals cue share one
  center axis; operator center-Y delta from the expression center is at most
  1 px;
- mobile 390 x 844: semantic visual order remains A, operation, B, and every
  visible control is at least 44 px high;
- numerator and denominator inputs within each operand have identical width;
- no pale success/danger fill is present in idle or successful manual-result
  states; danger color appears only on the invalid control and error status;
- no horizontal overflow in English, Korean, German, Arabic RTL, or Traditional
  Chinese.

## Current time-zone-converter audit

Current sources:

- `apps/web/src/features/time-zone-converter/TimeZoneConverter.astro`
- `apps/web/src/features/time-zone-converter/client.ts`
- `apps/web/src/features/time-zone-converter/styles.css`
- `scripts/qa/time_zone_converter_feature.py`

### Current workflow

- The page starts in live mode with the browser's detected IANA zone as the
  source and three target rows: UTC, New York, London, or Tokyo after excluding
  the source.
- Source date/time, source zone, and 12/24-hour mode sit above a World Clock
  list. Users can add up to seven target zones, making eight rows including the
  source.
- Each row shows a place label, IANA identifier, clock, UTC offset, date/day
  difference, a day-position line, and a remove action for targets.

### Source-selection defect and evidence gap

The control labelled as a source time-zone choice is not a `<select>`. It is a
pre-filled text `<input list="time-zone-options">` backed by a native
`<datalist>`. The client appends every `Intl.supportedValuesOf("timeZone")`
identifier to that datalist after initialization.

This produces a brittle interaction:

1. The input starts with the detected zone, such as `Asia/Seoul`.
2. A datalist is a recommendation/autocomplete mechanism, so its popup is
   filtered by the current text instead of behaving like an always-open list of
   choices. Opening it with `Asia/Seoul` already present does not expose a useful
   all-zone picker.
3. The input listener clears every world-clock row, clears the last result, and
   returns status to Ready on any input event.
4. Recalculation relies on a later `change` event or explicit Enter. Native
   datalist popup behavior and label rendering vary by browser, so a selection
   can appear to do nothing or leave a blank clock until that second event.
5. Both source selection and Add Zone reuse the same large datalist, although
   their tasks are different.

MDN marks `<datalist>` as limited availability and describes its options as
recommended values, while `<select>` is a widely available menu of choices:

- <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist>
- <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select>

The browser QA does not exercise the broken path. It fills the source with the
exact string `Asia/Seoul` and presses Enter. It never opens the picker, clicks a
suggestion, changes the source with a mouse/touch interaction, or checks the
intermediate blank state.

The Unix timestamp converter is not a safe component to copy verbatim here. It
uses a real `<select>` only for choosing the zone mode and UTC offset; its IANA
zone field is also an `<input>` plus `<datalist>`. Reusing that IANA field would
retain the same native-popup limitation.

### Other product-fit gaps

- The World Clock is a manually managed comparison set, not an at-a-glance
  world-time list. Only three targets appear initially and users must discover,
  type, and add every other city.
- The eight-row cap is appropriate for a comparison timeline, but it conflicts
  with the requested browse-all-world-times job.
- Dynamically generated IANA options provide technical zone identifiers and
  inferred city names, but no reliable country/region label for most zones.
- The add/remove controls take substantial space in every row even when the
  primary need is simply to scan current world times.
- The current result rows show one point on a 24-hour line, but no aligned
  multi-zone hour grid. It has the visual cost of a timeline without the direct
  comparison benefit demonstrated by timeline products.

## Live time-zone product comparison

All pages below were opened on 2026-08-31.

### timeanddate Time Zone Converter

- Working surface:
  <https://www.timeanddate.com/worldclock/converter.html?p1=0&p2=44>
- Location model: one city/time-zone search adds locations to a shared list;
  the current implementation reports a limit of 12 cities and provides remove
  all and sorting.
- Date/time model: one selected date/time drives all city rows; Current Time is
  an explicit reset.
- Result model: rows align each city's local date/time. Settings can expose the
  time zone, current time, and difference from the first city; calling-hour
  bands and export/share are secondary.
- Effective pattern: source-of-truth time and locations are clearly separate,
  and one edit updates the whole comparison.
- Pattern to reject: account, export, calendar, holiday, and dense settings are
  beyond this browser-local tool's primary task.

### World Time Buddy

- Working surface: <https://www.worldtimebuddy.com/>
- Location model: users add, remove, reorder, and set a home location.
- Date/time model: a visible multi-day date strip and aligned 24-hour rows make
  date boundaries part of the comparison rather than small text after the fact.
- Result model: hovering an hour converts across every row; clicking a tile
  commits a time for scheduling/sharing.
- Effective pattern: city identity stays at the row edge while hours share one
  horizontal coordinate system. A user can compare several zones at a glance.
- Pattern to reject: the dense scheduling/export workflow is unnecessary if the
  primary job is world-clock browsing.

### Savvy Time Converter

- Working surfaces: <https://savvytime.com/converter> and
  <https://savvytime.com/converter/kst-to-est>
- Location model: the first control searches a time zone, city, or town and can
  add multiple places. Rows show the familiar abbreviation, full zone name, and
  GMT offset.
- Date/time model: users can adjust date or time and return to current time;
  12/24-hour format and table view are explicit controls.
- Result model: corresponding local times are visible together, followed by a
  full-hour conversion table for scanning an entire day.
- Effective pattern: one search entry point, immediate visible zone identity,
  and a full-day table provide both quick conversion and longer browsing.
- Pattern to reject: permalink/calendar and long zone-reference content should
  stay outside the primary workspace.

### Every Time Zone

- Working surface: <https://www.everytimezone.net/>
- Location model: Add Timezone opens a searchable selector with an explicit
  Select action. Selected zones remain in one long vertically scrollable list.
- Date/time model: the date button opens a clear date-and-time selection dialog;
  12/24-hour format is an appearance option.
- Result model: every selected time zone gets a long aligned hour row across
  multiple dates, including fractional-hour offsets such as `+8:45`.
- Effective pattern: the product embraces a long world-time surface and makes
  day changes unmistakable.
- Pattern to adapt, not copy: hundreds of full 48-hour rows would be too heavy.
  AbsolTools can show all meaningful current-offset bands and their major cities
  in a compact table, with detailed comparison reserved for pinned rows.

## Time-zone redesign contract

### Product and interaction contract

- Primary intent: choose a source date/time and immediately scan its equivalent
  across the world's time zones without adding cities one by one.
- Default state: browser time zone and current minute, 12/24-hour preference from
  the active locale, and a populated world-time table. No empty clock surface.
- Source picker: replace the native datalist with a reliable control. Use either
  a true `<select>` for a curated source list plus a separate All zones search,
  or an accessible combobox with a product-owned popup/listbox, keyboard active
  descendant, filtered results, and explicit selection. Clicking/tapping one
  result must commit immediately and keep the table visible.
- Source labels: display city/region and current UTC offset, with the IANA ID as
  secondary technical text. Do not claim country search unless a curated
  country/city data source actually supplies it.
- Time chronology: editing date/time enters planning mode and updates the table
  only after a valid value is committed. Now resumes live mode. Source-zone
  selection updates the table atomically; it must never clear rows while waiting
  for another native event.
- World-time inventory: remove the add-seven target cap from the browse view.
  Render a long, searchable table covering every distinct current UTC offset
  band and curated major-city representatives, including half- and quarter-hour
  zones. If the product decision is to expose every supported IANA identifier,
  group duplicate offsets/regions and render/update rows efficiently rather
  than treating 400 near-duplicate identifiers as 400 clocks.
- Row content: major city/region, local time as the dominant value, local date
  and previous/today/next-day relation, UTC offset, and IANA identifier. Remove
  per-row delete actions from the all-world view.
- Optional comparison: a small in-memory pinned set can adopt the aligned
  multi-zone timeline pattern from World Time Buddy/Every Time Zone. It is
  secondary to the complete browse table and must not use localStorage.
- Format toggle: 12/24-hour switching only reformats committed results and does
  not clear or reconvert the selected instant.
- Errors: invalid date/time or a no-result search keeps the last valid table and
  marks only the responsible control. No blank full workspace.
- Payload/network boundary: all conversion and filtering remain browser-local;
  no typed city, date, result, or zone is placed in URLs, storage, logs,
  analytics, or requests.

### Visual thesis and measurements for implementation

Visual thesis: use operational world-clock density, system type, a flat neutral
table hierarchy, strong local-time numerals, and accent color only for the
source row, focus, and the primary time action.

Required rendered evidence:

- the source picker opens and commits with mouse, touch, Enter, Arrow keys, and
  Escape; the popup is not filtered to only the prefilled current value;
- selecting `Asia/Seoul`, `America/New_York`, and `Asia/Kathmandu` updates the
  source and all rows atomically, including `UTC+05:45`;
- changing source via an actual option click is covered by browser QA, not only
  `fill()` plus Enter;
- live, manual-date, invalid-time, no-search-result, 12/24-hour, and DST boundary
  states retain the last valid table according to the interaction contract;
- desktop 1440 x 1000 exposes source controls and the beginning of the table in
  the first viewport; mobile 390 x 844 exposes the source action and several
  useful rows without horizontal overflow;
- all visible mobile controls are at least 44 px high and Arabic retains RTL
  page direction with LTR technical zone IDs and clock values;
- no console/page error and no cross-origin request contains a time, city search,
  zone identifier chosen by the user, or conversion result.

## Implementation priority

1. Replace and test source-zone selection before any visual expansion.
2. Define the world-time inventory (unique offset bands plus curated cities, or
   grouped full IANA coverage) and make the browse-all table the default result.
3. Simplify fraction operands into one semantic equation and preserve its order
   on mobile.
4. Apply neutral manual-calculator status surfaces and add the missing geometry,
   interaction, and actual-option-click browser assertions.
