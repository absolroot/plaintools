import { readFile } from "node:fs/promises";

const cssUrls = [
  "../apps/web/src/styles/global.css",
  "../apps/web/src/features/base64/styles.css",
  "../apps/web/src/features/json/styles.css",
  "../apps/web/src/features/time/styles.css",
  "../apps/web/src/features/word/styles.css",
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
const previewToolPageUrl = new URL(
  "../apps/web/src/components/PreviewToolPage.astro",
  import.meta.url,
);
const processingNoteUrl = new URL(
  "../apps/web/src/components/LocalProcessingNote.astro",
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
const [
  css,
  page,
  converter,
  faqSection,
  jsonFormatter,
  previewToolPage,
  processingNote,
  tooltip,
  icon,
  statusComponent,
  toolDom,
  timeConverter,
  tooltipScript,
  directoryPage,
  directorySearch,
] = await Promise.all([
  Promise.all(cssUrls.map((url) => readFile(url, "utf8"))).then((parts) =>
    parts.join("\n"),
  ),
  readFile(pageUrl, "utf8"),
  readFile(converterUrl, "utf8"),
  readFile(faqSectionUrl, "utf8"),
  readFile(jsonFormatterUrl, "utf8"),
  readFile(previewToolPageUrl, "utf8"),
  readFile(processingNoteUrl, "utf8"),
  readFile(tooltipUrl, "utf8"),
  readFile(iconUrl, "utf8"),
  readFile(statusUrl, "utf8"),
  readFile(toolDomUrl, "utf8"),
  readFile(timeConverterUrl, "utf8"),
  readFile(tooltipScriptUrl, "utf8"),
  readFile(directoryPageUrl, "utf8"),
  readFile(directorySearchUrl, "utf8"),
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

expectDeclaration(".breadcrumbs", "min-height", "40px");
expectDeclaration(".tool-intro-copy", "padding", "var(--space-6) 0");
expectDeclaration(".tool-intro-copy", "gap", "var(--space-2)");
expectDeclaration(".hero-subheading", "max-width", "none");
expectDeclaration(".content-section", "padding", "32px 0");
expectDeclaration(".directory-header", "padding", "24px 0");
expectDeclaration(".converter-topbar", "justify-content", "flex-start");
expectDeclaration(".editor-pane textarea", "min-height", "264px");
expectDeclaration(
  ":root",
  "--focus-ring",
  "color-mix(in oklch, var(--focus), var(--base) 75%)",
);
expectDeclaration(":focus-visible", "outline", "2px solid var(--focus-ring)");
expectDeclaration(".editor-pane:focus-within", "box-shadow", "none");
expectDeclaration(".editor-pane textarea:focus-visible", "outline", "0");
expectDeclaration(
  ".editor-pane textarea:focus-visible",
  "box-shadow",
  "inset 0 0 0 1px var(--focus-ring)",
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
  "padding-right",
  "38px",
);
expectDeclaration(".tooltip-trigger", "position", "absolute");
expectDeclaration(".tooltip-trigger", "right", "0");
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
  page.includes('class="breadcrumb-meta"'),
  "Base64/RFC metadata must stay in the breadcrumb row.",
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
  (converter.match(/<LocalProcessingNote locale=\{locale\}/g) ?? []).length ===
    1,
  "Render the shared local-processing note exactly once.",
);
expectSource(
  (processingNote.match(/class="privacy-note"/g) ?? []).length === 1,
  "The shared component must render one authoritative privacy note.",
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
  (jsonFormatter.match(/<Tooltip\b/g) ?? []).length === 2,
  "JSON Validate and Minify must each use the shared Tooltip component.",
);
expectSource(
  (
    jsonFormatter.match(/aria-describedby="json-(?:validate|minify)-help"/g) ??
    []
  ).length === 2,
  "JSON action buttons must reference their tooltip descriptions.",
);
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
for (const name of ["chevron-right", "folder-open", "x", "copy", "download"]) {
  expectSource(
    converter.includes(`name="${name}"`),
    `Keep the ${name} action icon on the converter surface.`,
  );
}
expectSource(
  processingNote.includes('name="shield"'),
  "Keep the shield icon in the shared local-processing note.",
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
  '<div\n      class="directory-categories"',
);
expectSource(
  directoryHeaderIndex >= 0 &&
    directoryHeaderIndex < directorySearchIndex &&
    directorySearchIndex < directoryCategoriesIndex,
  "The directory search component must remain between the directory header and categories.",
);
for (const hook of [
  "data-directory-search-category",
  "data-directory-search-category-count",
  "data-directory-search-card",
  "data-directory-search-corpus",
]) {
  expectSource(
    directoryPage.includes(hook),
    `The directory page must preserve the ${hook} filtering hook.`,
  );
}
expectSource(
  directoryPage.includes("buildToolDirectorySearchCorpus"),
  "Directory cards must receive corpus text from the pure search helper.",
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
