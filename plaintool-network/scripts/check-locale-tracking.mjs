import fs from "node:fs";

const css = fs.readFileSync(
  new URL("../apps/web/src/styles/global.css", import.meta.url),
  "utf8",
);

const failures = [];

function declaration(selector, property) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  return block.match(new RegExp(`${property}\\s*:\\s*([^;]+);`))?.[1].trim();
}

function expect(selector, property, value) {
  const actual = declaration(selector, property);
  if (actual !== value) {
    failures.push(
      `${selector} must use ${property}: ${value}; received ${actual ?? "missing"}`,
    );
  }
}

expect(":root", "--tracking-display", "-0.01em");
expect(
  'html:where([lang="ko"], [lang="ja"], [lang="zh-TW"])',
  "--tracking-display",
  "normal",
);
expect(".directory-header h1", "letter-spacing", "var(--tracking-display)");
expect(".legal-page h1", "letter-spacing", "var(--tracking-display)");

for (const selector of [
  "body",
  ".tool-intro h1",
  ".content-section h2",
  ".directory-category-heading h2",
  ".tool-directory-copy h3",
  ".legal-section h2",
]) {
  if (declaration(selector, "letter-spacing") !== undefined) {
    failures.push(`${selector} must retain natural letter spacing.`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Locale display tracking contract passed.");
