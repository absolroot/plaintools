import { readFile } from "node:fs/promises";

const cssUrls = [
  "../apps/web/src/styles/global.css",
  "../apps/web/src/features/base64/styles.css",
  "../apps/web/src/features/json/styles.css",
  "../apps/web/src/features/time/styles.css",
  "../apps/web/src/features/word/styles.css",
  "../apps/web/src/features/text-compare/styles.css",
  "../apps/web/src/features/case-converter/styles.css",
  "../apps/web/src/features/hash-generator/styles.css",
].map((path) => new URL(path, import.meta.url));
const pageUrl = new URL(
  "../apps/web/src/features/base64/Base64Page.astro",
  import.meta.url,
);
const converterUrl = new URL(
  "../apps/web/src/features/base64/Converter.astro",
  import.meta.url,
);
const faqSectionUrl = new URL(
  "../apps/web/src/components/FaqSection.astro",
  import.meta.url,
);
const jsonFormatterUrl = new URL(
  "../apps/web/src/features/json/JsonFormatter.astro",
  import.meta.url,
);
const sourceFormatterUrls = [
  ["HTML", "../apps/web/src/features/html-formatter/HtmlFormatter.astro"],
  ["CSS", "../apps/web/src/features/css-formatter/CssFormatter.astro"],
  [
    "JavaScript",
    "../apps/web/src/features/javascript-formatter/JavaScriptFormatter.astro",
  ],
  ["SQL", "../apps/web/src/features/sql-formatter/SqlFormatter.astro"],
].map(([name, path]) => [name, new URL(path, import.meta.url)]);
const previewToolPageUrl = new URL(
  "../apps/web/src/components/PreviewToolPage.astro",
  import.meta.url,
);
const tooltipUrl = new URL(
  "../apps/web/src/components/Tooltip.astro",
  import.meta.url,
);
const iconUrl = new URL(
  "../apps/web/src/components/UiIcon.astro",
  import.meta.url,
);
const iconButtonUrl = new URL(
  "../apps/web/src/components/IconButton.astro",
  import.meta.url,
);
const statusUrl = new URL(
  "../apps/web/src/components/ConverterStatus.astro",
  import.meta.url,
);
const toolDomUrl = new URL(
  "../apps/web/src/scripts/shared/tool-dom.ts",
  import.meta.url,
);
const timeConverterUrl = new URL(
  "../apps/web/src/features/time/client.ts",
  import.meta.url,
);
const tooltipScriptUrl = new URL(
  "../apps/web/src/scripts/tooltip.ts",
  import.meta.url,
);
const directoryPageUrl = new URL(
  "../apps/web/src/pages/[locale]/index.astro",
  import.meta.url,
);
const directorySearchUrl = new URL(
  "../apps/web/src/components/ToolDirectorySearch.astro",
  import.meta.url,
);
const directoryCardUrl = new URL(
  "../apps/web/src/components/ToolDirectoryCard.astro",
  import.meta.url,
);
const directorySectionUrl = new URL(
  "../apps/web/src/components/ToolDirectorySection.astro",
  import.meta.url,
);
const [
  css,
  page,
  converter,
  faqSection,
  jsonFormatter,
  sourceFormatters,
  previewToolPage,
  tooltip,
  icon,
  iconButton,
  statusComponent,
  toolDom,
  timeConverter,
  tooltipScript,
  directoryPage,
  directorySearch,
  directoryCard,
  directorySection,
] = await Promise.all([
  Promise.all(cssUrls.map((url) => readFile(url, "utf8"))).then((parts) =>
    parts.join("\n"),
  ),
  readFile(pageUrl, "utf8"),
  readFile(converterUrl, "utf8"),
  readFile(faqSectionUrl, "utf8"),
  readFile(jsonFormatterUrl, "utf8"),
  Promise.all(
    sourceFormatterUrls.map(async ([name, url]) => [
      name,
      await readFile(url, "utf8"),
    ]),
  ),
  readFile(previewToolPageUrl, "utf8"),
  readFile(tooltipUrl, "utf8"),
  readFile(iconUrl, "utf8"),
  readFile(iconButtonUrl, "utf8"),
  readFile(statusUrl, "utf8"),
  readFile(toolDomUrl, "utf8"),
  readFile(timeConverterUrl, "utf8"),
  readFile(tooltipScriptUrl, "utf8"),
  readFile(directoryPageUrl, "utf8"),
  readFile(directorySearchUrl, "utf8"),
  readFile(directoryCardUrl, "utf8"),
  readFile(directorySectionUrl, "utf8"),
]);
const failures = [];

function getDeclarations(selector, source = css) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  if (!match) {
    failures.push(`Missing CSS rule: ${selector}`);
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const separator = entry.indexOf(":");
        return [
          entry.slice(0, separator).trim(),
          entry.slice(separator + 1).trim(),
        ];
      }),
  );
}

function expectDeclaration(selector, property, expected, source = css) {
  const actual = getDeclarations(selector, source)[property];
  if (actual !== expected) {
    failures.push(
      `${selector} must use ${property}: ${expected}; received ${actual ?? "missing"}`,
    );
  }
}

function expectSource(condition, message) {
  if (!condition) failures.push(message);
}

for (const selector of [".tool-intro", ".tool-shell", ".content-sections"]) {
  expectDeclaration(selector, "width", "var(--page)");
}

expectDeclaration(".tool-intro-copy", "padding", "var(--space-6) 0");
expectDeclaration(".tool-intro-copy", "gap", "var(--space-2)");
expectDeclaration(".hero-subheading", "max-width", "none");
expectDeclaration(".content-section", "padding", "32px 0");
expectDeclaration(".directory-header", "padding", "24px 0");
expectDeclaration(".converter-topbar", "justify-content", "flex-start");
expectDeclaration(".ad-slot--rail", "display", "none");
expectDeclaration(".tool-shell.has-rail", "width", "var(--page)");
expectDeclaration(
  ".tool-shell.has-rail > .ad-slot--rail",
  "inset-inline-start",
  "calc(100% + 24px)",
);
expectDeclaration(".editor-pane textarea", "min-height", "264px");
expectDeclaration(":root", "--focus-ring", "var(--focus)");
expectDeclaration(":root", "--canvas", "#fafafa");
expectDeclaration(":root", "--footer-bg", "#f7f7f8");
expectDeclaration(':root[data-theme="dark"]', "--footer-bg", "var(--base)");
expectDeclaration(".site-footer", "background", "var(--footer-bg)");
expectDeclaration(":focus-visible", "outline", "2px solid var(--focus-ring)");
expectDeclaration(".editor-pane:focus-within", "box-shadow", "none");
expectDeclaration(".editor-pane textarea:focus-visible", "outline", "0");
expectDeclaration(
  ".editor-pane textarea:focus-visible",
  "box-shadow",
  "inset 0 0 0 2px var(--focus-ring)",
);
expectDeclaration(
  ".options-grid select:focus",
  "box-shadow",
  "0 0 0 1.5px var(--focus-ring)",
);
expectDeclaration(
  ".date-picker-control:focus-within .date-picker-label",
  "outline",
  "2px solid var(--focus-ring)",
);
expectDeclaration(
  '.tooltip .tooltip-target > :where(button, a, [role="button"])',
  "padding-inline-end",
  "38px",
);
expectDeclaration(".tooltip-trigger", "position", "absolute");
expectDeclaration(".tooltip-trigger", "inset-inline-end", "0");
expectDeclaration(".tooltip-trigger", "width", "30px");
expectDeclaration(".privacy-note", "margin", "0");
expectDeclaration(".privacy-note", "border-top", "1px solid var(--line)");
expectDeclaration(".privacy-note", "color", "var(--muted)");
expectDeclaration(".privacy-note", "background", "var(--recessed)");
expectDeclaration(".converter-commandbar", "background", "var(--elevated)");
expectDeclaration(
  ".converter.is-success .converter-commandbar",
  "background",
  "color-mix(in oklch, var(--success-tint), var(--base) 58%)",
);
expectDeclaration(
  ".converter.has-error .converter-commandbar",
  "background",
  "color-mix(in oklch, var(--danger-tint), var(--base) 48%)",
);
expectDeclaration(
  ".converter.is-working .converter-commandbar",
  "background",
  "color-mix(in oklch, var(--brand), var(--base) 94%)",
);
expectDeclaration(".status-copy", "font-size", "13px");
expectDeclaration(".status-copy", "font-weight", "600");
expectDeclaration(".options", "margin", "0");
expectDeclaration(".options summary", "width", "100%");
expectDeclaration(".options summary", "gap", "var(--space-2)");

for (const [property, expected] of Object.entries({
  height: "30px",
  display: "inline-flex",
  "align-items": "center",
  "justify-content": "center",
  "line-height": "1",
})) {
  expectDeclaration(".text-button", property, expected);
}

expectDeclaration(".pane-heading", "align-items", "center");
expectDeclaration(".pane-actions", "align-items", "center");
expectDeclaration(".hash-generator", "overflow", "visible");
expectDeclaration(
  ".hash-generator > .hash-input-pane + .hash-output-pane",
  "margin-block-start",
  "var(--space-3)",
);

expectDeclaration(".directory-search", "width", "100%", directorySearch);
expectDeclaration(
  ".directory-search-control",
  "height",
  "36px",
  directorySearch,
);
expectDeclaration(
  ".directory-search-control",
  "border-radius",
  "var(--radius-control)",
  directorySearch,
);
expectDeclaration(".directory-search-clear", "height", "36px", directorySearch);

expectSource(
  !page.includes('class="breadcrumbs"') &&
    !previewToolPage.includes('class="breadcrumbs"'),
  "Tool pages must keep visual breadcrumb rows out of the content area.",
);
expectSource(
  !page.includes('class="eyebrow"'),
  "The tool page must not restore a separate metadata eyebrow row.",
);
expectSource(
  !converter.includes("workspace-assurance"),
  "Do not duplicate the local-processing message in the converter toolbar.",
);
expectSource(
  !converter.includes("LocalProcessingNote"),
  "Keep local-processing assurance in the top tool promise, not the converter.",
);
expectSource(
  (page.match(/<ToolPromise locale=\{locale\}/g) ?? []).length === 1 &&
    (previewToolPage.match(/<ToolPromise locale=\{locale\}/g) ?? []).length ===
      1,
  "Render one authoritative tool promise at the top of every tool page.",
);
expectSource(
  (page.match(/<FaqSection\b/g) ?? []).length === 1,
  "The Base64 page must render the shared FAQ section exactly once.",
);
expectSource(
  (previewToolPage.match(/<FaqSection\b/g) ?? []).length === 1,
  "Preview tool pages must render the shared FAQ section exactly once.",
);
expectSource(
  faqSection.includes('name="chevron-right"'),
  "The shared FAQ section must render the local chevron icon.",
);
expectSource(
  faqSection.includes('class="faq-chevron"'),
  "The shared FAQ chevron must keep the shared open-state styling hook.",
);
expectSource(
  faqSection.includes("<details open>"),
  "Shared FAQ items must render expanded by default.",
);
expectSource(
  css.includes("--space-16: 64px"),
  "Keep the documented 4px spacing scale in the shared token set.",
);
for (const token of [
  "--radius-xs",
  "--radius-sm",
  "--radius-control",
  "--radius-layer",
]) {
  expectSource(
    css.includes(`${token}: 0`),
    `${token} must remain square for the tool-first surface language.`,
  );
}
expectSource(
  !css.includes("padding: 18px 0 20px"),
  "Do not restore the unprincipled 18/20px intro padding pair.",
);
expectSource(
  !css.includes(".editor-pane:not(.output-pane):focus-within"),
  "Input and output editor panes must use the same focus-within treatment.",
);
expectSource(
  !css.includes(".output-pane textarea:focus-visible"),
  "The output textarea must not restore a separate focus outline.",
);
expectSource(
  (jsonFormatter.match(/<ToolModeSwitch\b/g) ?? []).length === 1,
  "JSON operations must use the shared formatter mode switch.",
);
expectSource(
  (jsonFormatter.match(/<FormatterOptions\b/g) ?? []).length === 1,
  "JSON indentation must use the shared formatter options panel.",
);
expectSource(
  !jsonFormatter.includes("primary-button") &&
    !jsonFormatter.includes("data-action="),
  "JSON operations must remain live modes instead of primary run actions.",
);
expectSource(
  jsonFormatter.indexOf('<div class="converter-grid">') <
    jsonFormatter.indexOf("<ConverterStatus") &&
    jsonFormatter.indexOf("<ConverterStatus") <
      jsonFormatter.indexOf("<FormatterOptions"),
  "JSON must share the editor, status, then options formatter structure.",
);
for (const [name, formatter] of sourceFormatters) {
  expectSource(
    (formatter.match(/<FormatterOptions\b/g) ?? []).length === 1,
    `${name} must use the shared formatter options panel exactly once.`,
  );
  expectSource(
    !formatter.includes("primary-button"),
    `${name} must remain live instead of exposing a primary run button.`,
  );
  expectSource(
    formatter.indexOf('<div class="converter-grid">') <
      formatter.indexOf("<ConverterStatus") &&
      formatter.indexOf("<ConverterStatus") <
        formatter.indexOf("<FormatterOptions"),
    `${name} must share the editor, status, then options formatter structure.`,
  );
  if (name === "JavaScript") {
    expectSource(
      (formatter.match(/<ToolModeSwitch\b/g) ?? []).length === 1,
      "JavaScript modes must use the shared formatter mode switch.",
    );
  }
}
expectSource(
  tooltip.includes('role="tooltip"'),
  "The shared Tooltip component must expose tooltip semantics.",
);
expectSource(
  tooltip.includes("aria-describedby={id}"),
  "The shared Tooltip trigger must reference its tooltip content.",
);
expectSource(
  tooltip.includes('name="help-circle"'),
  "The shared Tooltip component must use the shared help-circle icon.",
);
expectSource(
  css.includes("@media (hover: hover) and (pointer: fine)"),
  "Desktop target-hover tooltip behavior must be limited to precise hover pointers.",
);
expectSource(
  /\.tooltip:hover\s+\.tooltip-content,\s*\.tooltip:focus-within\s+\.tooltip-content/u.test(
    css,
  ),
  "Desktop hover and keyboard focus must reveal the shared tooltip from the whole target.",
);
expectSource(
  css.includes(".tooltip[data-tooltip-open] .tooltip-content"),
  "Touch help triggers must reveal the shared tooltip through explicit component state.",
);
expectSource(
  css.includes(".tooltip[data-tooltip-dismissed] .tooltip-content"),
  "Dismissed tooltips must stay hidden until hover or focus leaves.",
);
expectSource(
  tooltipScript.includes('event.key !== "Escape"'),
  "The shared Tooltip must support Escape dismissal.",
);
expectSource(
  tooltipScript.includes('document.addEventListener("pointerdown"'),
  "The shared Tooltip must close from outside pointer interaction.",
);
expectSource(
  tooltipScript.includes("closeAll(root)"),
  "Opening one shared Tooltip must close the others.",
);
expectSource(
  converter.includes('name="chevron-right"'),
  "Keep the chevron-right action icon on the converter surface.",
);
for (const name of ["folder-open", "x", "copy", "download"]) {
  expectSource(
    converter.includes(`icon="${name}"`),
    `Keep the ${name} action icon on the converter surface.`,
  );
}
expectSource(
  iconButton.includes(
    'class:list={[`${variant}-button`, "icon-button", className]}',
  ),
  "Shared icon buttons must retain the existing button variants.",
);
expectSource(
  iconButton.includes("display: inline-flex") &&
    iconButton.includes("align-items: center") &&
    iconButton.includes("icon-button-label"),
  "Shared icon buttons must keep the icon and label on one centered row.",
);
expectSource(
  icon.includes('aria-hidden="true"'),
  "Decorative action icons must stay out of the accessibility tree.",
);
expectSource(
  icon.includes('focusable="false"'),
  "Decorative SVG icons must not become keyboard focus targets.",
);
expectSource(
  icon.includes('name === "help-circle"'),
  "Keep the question-mark circle in the shared SVG icon family.",
);
expectSource(
  (statusComponent.match(/aria-live=/g) ?? []).length === 1,
  "Each tool status must render exactly one live region.",
);
expectSource(
  toolDom.includes('status.closest<HTMLElement>(".tool-status")'),
  "Dynamic status priority must update the shared live region instead of nesting another one.",
);
expectSource(
  toolDom.includes("createDeferredIndicator"),
  "Fast async tools must share the delayed working-state contract.",
);
expectSource(
  !timeConverter.includes("setStatus(copy.working"),
  "Synchronous time conversion must not emit a transient working state.",
);
const directoryHeaderIndex = directoryPage.indexOf(
  '<header class="directory-header">',
);
const directorySearchIndex = directoryPage.indexOf("<ToolDirectorySearch");
const directoryCategoriesIndex = directoryPage.indexOf(
  'class="directory-categories"',
);
expectSource(
  directoryHeaderIndex >= 0 &&
    directoryHeaderIndex < directorySearchIndex &&
    directorySearchIndex < directoryCategoriesIndex,
  "The directory search component must remain between the directory header and categories.",
);
const directorySources = [directoryPage, directorySection, directoryCard].join(
  "\n",
);
for (const hook of [
  "data-directory-search-category",
  "data-directory-search-category-count",
  "data-directory-search-card",
  "data-directory-search-corpus",
]) {
  expectSource(
    directorySources.includes(hook),
    `The directory components must preserve the ${hook} filtering hook.`,
  );
}
expectSource(
  directoryCard.includes("buildToolDirectorySearchCorpus"),
  "Directory cards must receive corpus text from the pure search helper.",
);
expectSource(
  directoryCard.includes('tool.status !== "available"'),
  "Directory cards must hide the redundant Available status label.",
);
expectSource(
  (directorySearch.match(/role="search"/g) ?? []).length === 1,
  "The directory search component must expose one search landmark.",
);
expectSource(
  (directorySearch.match(/aria-live="polite"/g) ?? []).length === 1,
  "The directory search component must expose one polite result status.",
);
expectSource(
  (directorySearch.match(/data-directory-search-empty/g) ?? []).length === 2,
  "The directory search component must keep one rendered and one scripted empty-state hook.",
);
expectSource(
  directorySearch.includes('name="search"') &&
    directorySearch.includes('name="x"'),
  "The directory search component must use the shared search and clear icons.",
);
expectSource(
  directorySearch.includes("matchesToolDirectorySearch") &&
    directorySearch.includes("normalizeToolDirectorySearch"),
  "Directory filtering must use the pure normalization and matching helpers.",
);
expectSource(
  directorySearch.includes('addEventListener("compositionstart"') &&
    directorySearch.includes('addEventListener("compositionend"'),
  "Directory filtering must defer updates while an IME composition is active.",
);
expectSource(
  directorySearch.includes('event.key !== "Escape"') &&
    directorySearch.includes("input.focus()") &&
    directorySearch.includes('addEventListener("pointerdown"'),
  "Directory search Clear and Escape behavior must restore input focus.",
);
expectSource(
  /@media \(max-width: 680px\)[\s\S]*?\.directory-search-control\s*\{[\s\S]*?height: 44px;/u.test(
    directorySearch,
  ) &&
    /@media \(max-width: 680px\)[\s\S]*?\.directory-search-clear\s*\{[\s\S]*?height: 44px;/u.test(
      directorySearch,
    ),
  "Directory search and Clear controls must use the 44px mobile family.",
);
expectSource(
  icon.includes('name === "search"'),
  "Keep the search symbol in the shared SVG icon family.",
);

if (failures.length) {
  console.error("UI detail gate failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    "UI detail gate passed: shared axis, status hierarchy, control centering, and message uniqueness are intact.",
  );
}
