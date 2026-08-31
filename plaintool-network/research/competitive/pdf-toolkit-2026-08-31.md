# PDF toolkit benchmark and design contract

- Access date: 2026-08-31 (Asia/Seoul)
- Primary inspection: project-scoped Chrome DevTools QA
- Chrome result: the managed session opened the first Smallpdf route, then the
  CDP connection ended with `ECONNREFUSED 127.0.0.1:9478`; a repeat page-list
  call returned the same error.
- Fallback: the repository's installed Playwright/Chromium environment, at
  1440 x 1000 and 390 x 844. Generated three-page and one-page PDFs plus a
  non-sensitive sample image were uploaded to inspect post-selection controls.
- Scope: interaction patterns only. No third-party source code or product copy
  is reused.

## Comparable products

### Smallpdf

Inspected routes:

- <https://smallpdf.com/compress-pdf>
- <https://smallpdf.com/merge-pdf>
- <https://smallpdf.com/split-pdf>
- <https://smallpdf.com/pdf-to-jpg>
- <https://smallpdf.com/jpg-to-pdf>

Observed patterns:

- Empty state is one dominant `Choose files` action with drag-and-drop text.
- After selection, the marketing page becomes a dedicated editing shell. The
  primary completion action stays visually separate from file management.
- Compression presents Basic, Moderate, and Strong levels with an estimated
  result size before running.
- Merge exposes Files and Pages views, a visible Add action, selection, and a
  final Finish action. The inspected file view showed filename and page count.
- Split separates Split and Extract. The default split rule was every one page,
  with page thumbnails shown beside the rule.
- PDF to image completed into an image result with a compact Done state.
- Image to PDF exposed A4, automatic orientation, small margins, a separate-PDF
  toggle, ordering, and Finish.
- At 390 x 844, the empty state removed most header chrome and kept the upload
  action near the top. Keyboard and forced-error recovery were not exercised.
- The public surface makes service security claims, but this inspection did not
  archive request bodies or storage state; no local-processing inference is
  made from those claims.

Effective pattern to adopt: a calm empty drop zone that becomes a focused,
operation-specific editor after selection.

### iLovePDF

Inspected routes:

- <https://www.ilovepdf.com/compress_pdf>
- <https://www.ilovepdf.com/merge_pdf>
- <https://www.ilovepdf.com/split_pdf>
- <https://www.ilovepdf.com/pdf_to_jpg>
- <https://www.ilovepdf.com/jpg_to_pdf>

Observed patterns:

- Empty states are extremely terse: title, one-line task description, file
  selection, and drop target.
- Compression reveals three plain-language levels after upload: extreme,
  recommended, and less compression, each paired with a quality consequence.
- Merge places file-order guidance next to the ordered file list and uses one
  direct `Merge PDF` action.
- Split makes the strongest mode distinction of the benchmark: custom/fixed
  ranges, explicit from/to fields, add-range, and a switch to merge ranges into
  one output. A separate extract-pages input accepts syntax such as `1,5-8`.
- PDF to image distinguishes rendering every page from extracting embedded
  images, then exposes a small quality choice.
- Image to PDF exposes automatic/portrait/landscape orientation, Fit/A4/Letter
  page size, three margin levels, and one combined-PDF default.
- At 390 x 844, the empty split surface reduced navigation to the task and file
  action. Post-upload controls were keyboard-addressable native inputs, though
  detailed keyboard order and forced-error recovery were not exercised.
- File bytes were accepted by the live service. Network payload inspection was
  outside this comparison, so its privacy model is not used as evidence.

Effective patterns to adopt: compression presets with consequences, `Extract`
versus `Split` as the first decision, and compact page-size/orientation/margin
controls for image-to-PDF.

### PDF24 Tools

Inspected routes:

- <https://tools.pdf24.org/en/compress-pdf>
- <https://tools.pdf24.org/en/merge-pdf>
- <https://tools.pdf24.org/en/split-pdf>
- <https://tools.pdf24.org/en/pdf-to-images>
- <https://tools.pdf24.org/en/images-to-pdf>

Observed patterns:

- Empty states combine a clear choose/drop action with free/online/security
  badges and supporting content below the tool.
- Compression defaults were 144 DPI and 75% image quality. The surface also
  exposed many expert switches for thumbnails, stream deduplication, font
  subsetting, grayscale, attachments, annotations, metadata, forms, and more.
- Merge explicitly states drag reordering, shows page counts and byte sizes,
  and offers page mode, bookmarks, and blank-page insertion.
- Split uses a Mode select with Pages per PDF, Even/Odd, Halve, and Custom. The
  default is one page per PDF.
- PDF to images defaults to JPG, color, 144 DPI, and 85% quality; PNG and
  grayscale are also visible.
- Images to PDF supports drag ordering, A-series/Letter/Legal/custom page size,
  automatic/portrait/landscape orientation, and fixed/custom margins.
- At 390 x 844, the file action remained in the first viewport, but supporting
  badges and advertising occupied more space than the other two products.
- The inspected copy explicitly described server/cloud processing. PlainTool
  does not adopt that processing model.

Effective patterns to adapt: 144 DPI as a balanced raster default, exact page
count/byte feedback, and native selects for compact advanced choices.

Patterns to reject: the long low-level compression switch list, advertisement
inside the task flow, bookmarks/blank-page controls before basic merge proves
useful, and cloud processing.

## Product contract

### Product fit and primary intent

Create one browser-local PDF family under a dedicated PDF directory section:

1. Compress PDF: reduce transfer/storage size with an honest quality and
   document-function tradeoff.
2. Merge PDF: order several PDFs and copy their pages into one PDF.
3. Split PDF: extract selected pages into one PDF or divide a document into
   multiple PDFs.
4. PDF to images: render selected PDF pages to JPG or PNG.
5. Images to PDF: order images and place them into one PDF.

Each route has one primary task and remains `preview/noindex` until the locale,
SEO, publication, and rendered-review evidence gates are complete.

### Visual thesis and geometry

A compact operational workspace with system type, quiet square surfaces, and a
single warm accent reserved for file selection, the committed action, progress,
and successful download.

- Desktop axis: the existing 1180 px site axis owns the page header, workspace,
  support rules, related tools, and footer. No PDF wrapper adds an outer gutter.
- Desktop workspace: full-width empty drop zone; after selection, a flexible
  file/page canvas plus a 320-360 px option/action rail.
- Mobile: one column at 390 px; required controls are at least 44 px high; the
  file list precedes options and the primary action remains reachable without
  horizontal scrolling.
- Geometry: 0 px radius for surfaces, buttons, cards, inputs, thumbnails, and
  progress bars. Only status dots and radio controls remain circular.
- Type: system UI for prose and controls; filenames/page-range technical values
  may use the existing local mono face. No new font request.

### Shared state and chronology

- Default state: one choose/drop surface, supported types/limits, no inactive
  result panel, and no duplicated privacy statement.
- Selecting/reordering/removing a file immediately invalidates an older result
  and download URL.
- All five operations are manual because they are file-heavy commit points.
- State is `idle -> working -> success | error`. Progress includes completed
  pages/files where available. Work is cancellable by Clear or a newer input.
- Every File read, PDF render, and Worker response uses a monotonically
  increasing revision. A stale completion cannot restore a result or action.
- Results remain visible until input/order/options change, Clear is pressed, or
  a newer run commits.
- Object URLs are revoked on replacement, Clear, and page teardown.

### Input, output, and controls

#### Compress PDF

- One PDF, with name, bytes, page count, and first-page preview.
- Presets:
  - Preserve document: structural rewrite with object streams; keeps selectable
    content and interactive page content but may save little or nothing.
  - Balanced (default): render at 144 DPI and JPEG quality 78.
  - Smaller file: render at 110 DPI and JPEG quality 62.
- Balanced/Smaller show a persistent warning before run: pages become images,
  so text selection/search, links, forms, annotations, layers, and accessibility
  structure are not preserved. No “lossless” or guaranteed reduction claim.
- Result shows original size, result size, absolute/percentage difference, and
  whether the result is larger. Download remains allowed so the user can judge.

#### Merge PDF

- Two or more PDFs; Add files remains available.
- Each row shows a thumbnail, filename, size, and page count.
- Drag handles plus Move up/Move down and Remove buttons provide pointer and
  keyboard-equivalent ordering.
- Output is one PDF. No bookmark, blank-page, or per-page rearrangement control
  in the initial version.

#### Split PDF

- One PDF with page count and lazy, bounded page thumbnails.
- First choice: Extract pages or Split document.
- Extract accepts a page expression such as `1, 3-5` and thumbnail selection;
  selected pages are combined into one PDF in document order.
- Split supports Every N pages (default 1) or Custom ranges such as
  `1-3, 4-6, 7`. Multiple outputs download as a ZIP; a single output downloads
  directly as PDF.
- Range errors identify the invalid token and valid page bounds without raw
  exception text.

#### PDF to images

- One PDF. Page expression defaults to all pages.
- JPG (default) or PNG; 144 DPI default with 96 and 200 DPI presets; JPG quality
  defaults to 82 and is hidden/disabled for PNG.
- Pages render sequentially to cap peak memory. One selected page downloads as
  an image; multiple pages download as one ZIP with zero-padded page filenames.
- Result shows thumbnail, dimensions, and size per page with individual download
  actions plus the primary combined download.

#### Images to PDF

- Multiple JPG, PNG, and WebP images with thumbnail, filename, dimensions, size,
  drag order, accessible move controls, and remove.
- Page size: Fit image (default), A4, or Letter. Orientation: Automatic
  (default), Portrait, or Landscape. Margin: None, Small, or Large.
- Original JPEG/PNG bytes are embedded when possible; WebP is normalized in the
  browser. Images are scaled to fit without cropping or upscaling.
- Output is one ordered PDF with page count and result size.

### Error and recovery contract

- Reject wrong types, empty files, malformed PDFs, unsupported encryption, and
  browser memory limits with localized next-step text.
- Keep valid files when one added file fails; identify the rejected filename in
  the local UI only and never log it.
- A page render failure identifies the page number and allows retry after
  changing resolution/range.
- If a Worker or PDF engine cannot initialize, show an actionable localized
  browser-support error; never surface raw stack or dependency text.

### Accessibility and keyboard contract

- Native file inputs remain reachable through visible labels.
- Drop zones are not the only input mechanism.
- Fieldsets/legends define mode and preset groups. Dependent controls are hidden
  and disabled together.
- File order has visible move buttons; drag is an enhancement, not a requirement.
- Live status uses polite announcements; errors use an alert role.
- Page-selection buttons expose page number and selected state. Focus remains
  stable after reordering/removal and never moves to a hidden result action.

### Payload, performance, and network boundary

- Files, names, bytes, pages, thumbnails, outputs, errors, and derived sizes stay
  in browser memory. They never enter a URL, log, storage, analytics, ads, or a
  third-party request.
- `pdf-lib` performs page copying/creation in a dedicated module Worker.
- Mozilla PDF.js parses and renders pages with its worker loaded only on PDF
  routes. Thumbnail and export rendering is sequential and revision-cancellable.
- ZIP creation uses `fflate` only for multi-file results. PDF libraries are
  dynamically imported so non-PDF routes do not inherit their payload.
- Initial safety policy: at most 200 MiB total input, 500 source pages for
  copy-only merge/split, and 120 selected raster pages or 240 megapixels for
  raster conversion/compression. The UI reports a limit before expensive work.

### Locale and SEO impact

- Add a `pdf` category to all 17 locale network bundles.
- Add complete metadata, H1/description, controls, states, errors, guide, FAQ,
  catalog name/summary/search terms, and accessibility labels for all five
  routes in all 17 locale bundles.
- Add one feature-level locale review manifest. Agent/source-backed translations
  remain `reference-backed`; no `native-approved` claim is made.
- All five routes remain `preview`, `noindex`, absent from sitemap/llms public
  membership, and visible in the PDF directory section for review.

## Final comparison checklist

After the first live render, re-open this record and verify:

- the empty state is as direct as iLovePDF without losing local-processing truth;
- the post-upload editor separates file management, options, and primary action
  as clearly as Smallpdf;
- compression/raster controls retain PDF24's useful DPI/quality precision without
  exposing its long expert switch list;
- split makes Extract versus Split clearer than a single overloaded mode menu;
- image-to-PDF order, size, orientation, and margin controls fit mobile without
  pushing the primary action outside the first useful workflow viewport;
- every PlainTool difference above is still intentional and accurately worded.

