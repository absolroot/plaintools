# AbsolTools tool illustration system

The user-provided 12-icon reference set on 2026-10-24 defines this system. Its repeated features are a single purple material, simple filled geometry, square negative-space details, and a subtle vertical gradient. The reference artwork is not copied into the repository.

## Visual grammar

- Use a 128 × 128 SVG artboard. Keep the principal silhouette inside an approximately 8–120 unit safe area and optically center it at the final displayed size.
- Apply the same vertical gradient to every icon: lavender near `#BF96FA` at the top and violet near `#8673F3` at the bottom. The color values were sampled from the supplied reference. Do not assign category colors or add secondary gradients, shadows, outlines, white paint, or glowing highlights.
- Build icons from one dominant filled shape plus, when necessary, one operation cue. Use transparent cutouts to describe a photo, document, number, code structure, or QR matrix. Let the card surface show through the cutout in both themes.
- Use a consistent 8-unit construction grid for repeated blocks, lines, rays, arrows, and QR modules; use 4-unit adjustments only for optical positioning and curves. Repeated parts must have identical dimensions and regular gaps. Use a small consistent object radius when the depicted object needs it; the UI cards remain square.
- Related tools share an object silhouette but differ in the operation. A merge icon must visibly contain multiple inputs; compression must have a clear inward motion. Do not let a generic plus, sparkle, or check carry the entire meaning.
- Keep text out of icons unless a short file type or numeral is necessary for recognition at 56 px. `PDF` and `123` may be used as transparent cutouts after rendered-size review. Adobe's Acrobat/PDF mark is not a generic product icon for this project.

## Reference traits to preserve

The folder/zip and selection-frame examples use equal square notches on a stable grid. The crop, arrow, and transform examples communicate one operation with large orthogonal shapes. The photo, camera, and sun examples use a single immediately recognizable silhouette. The document examples align their interior bars to one edge and a steady rhythm. The overlapping-object example keeps the back and front forms separate without an outline. These traits matter more than reproducing any one example's exact path.

## Acceptance check

Render all affected icons together on the actual home cards at 72 px desktop and 56 px mobile. Inspect light, dark, and RTL layouts. At the final size, the subject and operation must remain distinct without relying on fine detail. Check the 128 × 128 viewBox, intrinsic dimensions, equal module sizes, transparent cutouts, local loading, no remote resources, and no page overflow. Save a browser screenshot; source geometry alone does not establish quality.

References: [DENSO WAVE on QR finder positions](https://www.qrcode.com/en/about/featurePage/featurePage5.html) and [Adobe icon permissions](https://www.adobe.com/legal/permissions/icons-web-logos.html).
