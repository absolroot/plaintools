# CSS formatter implementation notes

## Supported operation

The feature is format-only. It uses `prettier@3.9.6` through
`prettier/standalone` and `prettier/plugins/postcss` with the `css` parser in a
feature-owned Worker. It does not load URLs, apply styles, render a preview,
insert source into the DOM, execute code, sanitize, or minify CSS.

The first scope is plain CSS, including syntax accepted by Prettier's CSS
parser. It does not promise SCSS or Less support. No `csso` dependency was added:
`restructure:false` does not establish general semantic safety, and CSS
minification needs a separately reviewed operation and fixtures.

## Integration contract

- Root owns the route, app dependency declaration, lockfile, third-party
  notice, preview registry/catalog, locale copy, SEO, and browser QA.
- `CssFormatter.astro` receives `CssFormatterCopy` and `ToolCommonCopy`; visible
  runtime copy and the download filename are injected.
- Technical input and output remain LTR source text in textarea values.
- The explicit operation union currently contains only `format`. Input, file,
  keyboard, sample, and option reruns retain that selected operation.
- New input can leave the prior output visible only as stale. Copy and download
  are disabled immediately. Clear, error, file replacement, and newer Worker
  authority invalidate old actions.
- Sample loading is a no-op when input is non-empty. The hard limit is 10 MiB;
  input over 1 MiB requires a manual action.

## Reuse decision

CSS uses the existing shared `createLatestWorkerRunner` and DOM primitives.
The result authority mirrors the HTML pilot but remains CSS-owned because the
shared repository contract requires two integrated consumers before extracting
a neutral helper, and this branch cannot change the HTML or shared paths.

Do not create a universal formatter controller. CSS parser errors, future
minification policy, accepted syntax, and options remain language-owned.
