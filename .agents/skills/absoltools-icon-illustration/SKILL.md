---
name: absoltools-icon-illustration
description: Create or revise AbsolTools tool illustrations using the project's purple filled-shape system. Use for featured or directory tool artwork and related generation prompts; do not use for ordinary UI action glyphs or the brand logo.
---

# AbsolTools icon illustrations

Read `plaintool-network/ILLUSTRATION_GUIDE.md` before making assets. The user-provided 35-image reference archive from 2026-10-24 is stored locally under `plaintool-network/research/design/icon-shape-references-2026-10-24/`. It establishes the visual direction: a restricted purple palette, bold filled silhouettes, deliberate transparent cutouts, and geometrically consistent repeated parts. The six featured illustrations retain their vertical gradient; compact directory marks use flat subject and action tones. Use the references as a grammar; do not trace or redistribute the example images. Consult the official iLoveIMG tool directory for how a compact icon communicates one action within a card.

For each tool, name the subject and the operation in one sentence before drawing. Give the subject a clear silhouette, then add the smallest operation cue needed to distinguish adjacent tools. Avoid generic file badges, extra plus/check/sparkle marks, thin strokes, category-specific colors, glossy layers, or a cluster of tiny details. Where a label is essential, such as `PDF` or `123`, keep it readable at the shipped size and do not substitute an Adobe trademark.

Construct SVG on the 128 × 128 artboard in the guide. Align repeated cutouts and modules to one grid; QR finder shapes must match, and the data cells must all share one size. Image thumbnails must be squares, and a two-sided conversion must connect equal square tiles. A resize pictogram may connect a larger square to a smaller square. Leave enough material around photo cutouts to keep the square contour visible. Prefer transparent negative space to white paint. A generated bitmap can help explore a silhouette, but it must be translated into the approved geometry and reviewed as a final project asset before use.

For compact directory marks, edit `plaintool-network/scripts/generate-tool-illustrations.py` and regenerate its SVG outputs. Keep the route mapping in `tool-illustrations.ts` complete. The six featured illustrations are authored separately under `apps/web/public/illustrations/featured/`.

Render the complete icon row at 64 px desktop and 50 px mobile. Render compact directory marks at 40 px on light and dark cards. Inspect an RTL locale, compare all icons together, and fix irregular spacing or ambiguous cues. Verify the SVGs parse, load locally, and introduce no external requests. Save browser captures with the task's QA notes. The project UI review skill supplies the server and browser verification workflow.
