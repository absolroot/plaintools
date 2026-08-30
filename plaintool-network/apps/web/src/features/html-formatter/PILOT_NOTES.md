# HTML formatter pilot notes

## Supported operation

The pilot is format-only. It uses `prettier@3.9.6` through
`prettier/standalone` and `prettier/plugins/html` in a feature-owned Worker.
It does not render, inject, execute, sanitize, or minify HTML source.

Only the HTML plugin is loaded. Embedded `<style>` and `<script>` bodies are
indented as HTML raw text but are not formatted with the PostCSS or Babel
plugins. Prettier can normalize whitespace inside `<pre>` and `<code>`; the
required `scopeNotice` copy must disclose that source-formatting boundary.
Do not describe output as semantics-preserving or minification-safe.

## Integration contract

- Root owns the route, preview registry/catalog, app dependency declaration,
  lockfile, third-party notice, 17-locale copy, SEO, and shared browser QA.
- `HtmlFormatter.astro` takes `HtmlFormatterCopy` and `ToolCommonCopy`; it has no
  locale lookup and no runtime English fallback.
- Output is assigned only to a textarea value. It never enters `innerHTML` or a
  preview DOM.
- New input preserves the old source result only as visibly stale, while copy
  and download become disabled immediately. Clear, errors, file replacement,
  and newer Worker authority invalidate old actions.
- Sample loading is a no-op when the input is non-empty.

## JSON audit follow-up

This pilot can improve JSON mode selection, option scope, current-mode file
handling, stale visual treatment, and mode-specific download names without new
locale fields. Root integration still needs reviewed JSON keys before adding a
visible Load sample action, an explicit stale message, and distinct validated,
formatted, and minified completion messages.

## Reuse decision

The only shared runtime used by both formatters is the existing
`createLatestWorkerRunner` plus small DOM primitives. HTML result authority and
syntax errors stay feature-owned. Do not create a universal formatter
controller: CSS, JavaScript, and SQL have different parser errors, option
meaning, minification risk, and operation sets.
