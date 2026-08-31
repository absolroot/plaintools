# SVG image converter integration correction

- Integrated feature commit: `85f9897`
- Scope: SVG input detection, local-only rasterization safety, valid route navigation, focused unit tests, and the existing image-converter browser QA matrix.
- Privacy boundary: SVG bytes stay in the browser worker. Remote, embedded data, scripted, and active nested resources are rejected before native rasterization.

## Corrected defects

- XML declarations, comments, normal doctypes, self-closing roots, and SVG roots beyond the old 4 KiB sniff window are detected.
- The rasterizer receives a sanitized SVG without declarations, comments, or doctypes. Scripts, foreign objects, event handlers, external or data resource references, style blocks, CSS escapes, and non-local `url(...)` references are rejected; local fragment paint references remain supported.
- Source/target changes cannot create the unsupported `png-to-svg` route. SVG input routes expose no reverse navigation to a raster-to-SVG page.
- Worker input detection is applied to SVG as well as raster formats.
- Chromium does not decode an SVG Blob through `createImageBitmap()` inside the converter worker. After reproducing that failure on `svg-to-bmp`, the client now sanitizes and rasterizes SVG through a temporary local Blob URL, an `HTMLImageElement`, and canvas, then transfers only RGBA pixels to the existing worker encoders. Pixel-budget validation happens before canvas allocation, and the Blob URL is always revoked.

## Verification

- Focused navigation, detection, sanitization, and locale inventory tests are included with the image-converter feature.
- The feature-owned browser QA matrix now exercises 42 raster pairs plus all 7 SVG-to-raster routes, a normal vector-editor prolog/doctype fixture, absent reverse SVG navigation, and source-change collision routing.
- Combined regex/SVG focused Vitest run: 35 assertions passed.
- TypeScript and Astro: 0 diagnostics.
- Python feature QA runners compiled successfully. Final integrated browser and build verification remains with the main integration owner.
- Actual-file browser QA passed for `svg-to-bmp`, `svg-to-png`, and `svg-to-jpg`, then the full feature matrix completed all 49 routes, including all seven SVG targets. The existing Arabic mobile probe separately reported the convert button below the initial 844 px viewport (`runBottom: 899.21875`) without horizontal overflow; that layout finding is outside this SVG decode correction.
