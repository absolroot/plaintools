import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { RegexTesterCopy } from "./contract";
import { evaluateRegex } from "./evaluate";

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const expression = root.querySelector<HTMLInputElement>("[data-expression]")!;
  const text = root.querySelector<HTMLTextAreaElement>("[data-text]")!;
  const replacement =
    root.querySelector<HTMLTextAreaElement>("[data-replacement]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const summary = root.querySelector<HTMLElement>("[data-match-summary]")!;
  const list = root.querySelector<HTMLOListElement>("[data-match-list]")!;
  const empty = root.querySelector<HTMLElement>("[data-empty]")!;
  const replace = root.querySelector<HTMLButtonElement>("[data-replace]")!;
  const copy = root.querySelector<HTMLButtonElement>("[data-copy-result]")!;
  const t = readClientCopy<RegexTesterCopy>(root);
  const flags = () =>
    Array.from(
      root.querySelectorAll<HTMLInputElement>("[data-flags] input:checked"),
      (input) => input.value,
    ).join("");
  const clearResults = (message: string) => {
    list.replaceChildren();
    empty.hidden = false;
    empty.textContent = message;
  };
  const render = () => {
    if (!expression.value && !text.value) {
      clearResults(t.ready);
      summary.textContent = t.localNote;
      replace.disabled = copy.disabled = true;
      return setToolStatus(root, status, t.ready);
    }
    const result = evaluateRegex(expression.value, flags(), text.value);
    if (!result.valid) {
      clearResults(`${t.invalid}: ${result.message}`);
      summary.textContent = t.invalid;
      replace.disabled = copy.disabled = true;
      return setToolStatus(root, status, t.invalid, "error");
    }
    empty.hidden = result.matches.length > 0;
    empty.textContent = t.noMatches;
    list.replaceChildren(
      ...result.matches.map((match) => {
        const item = document.createElement("li");
        const label = document.createElement("strong");
        label.textContent = `${t.matchAt} ${match.index}`;
        const value = document.createElement("code");
        value.textContent = match.value || "∅";
        item.append(label, value);
        match.groups.forEach((group, groupIndex) => {
          const part = document.createElement("span");
          part.textContent = `${t.group} ${groupIndex + 1}: ${group ?? "∅"}`;
          item.append(part);
        });
        return item;
      }),
    );
    const suffix = result.truncated ? ` · ${t.tooManyMatches}` : "";
    summary.textContent = `${result.matches.length} ${t.matchCount}${suffix}`;
    replace.disabled = copy.disabled = result.matches.length === 0;
    setToolStatus(
      root,
      status,
      result.matches.length ? summary.textContent : t.noMatches,
      result.matches.length ? "success" : "idle",
    );
  };
  root
    .querySelectorAll<HTMLInputElement>("[data-expression], [data-flags] input")
    .forEach((input) => input.addEventListener("input", render));
  text.addEventListener("input", render);
  replacement.addEventListener("input", () => {
    copy.disabled = true;
  });
  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      expression.value = "\\b(hello|world)\\b";
      text.value = "Hello, world! hello again.";
      replacement.value = "[$1]";
      render();
      expression.focus();
    });
  root
    .querySelector<HTMLButtonElement>("[data-clear]")!
    .addEventListener("click", () => {
      expression.value = text.value = replacement.value = "";
      clearResults(t.ready);
      summary.textContent = t.localNote;
      replace.disabled = copy.disabled = true;
      setToolStatus(root, status, t.ready);
      expression.focus();
    });
  replace.addEventListener("click", () => {
    try {
      const next = text.value.replace(
        new RegExp(
          expression.value,
          flags().includes("g") ? flags() : `${flags()}g`,
        ),
        replacement.value,
      );
      replacement.value = next;
      copy.disabled = !next;
      setToolStatus(root, status, t.replacementResult, "success");
    } catch {
      setToolStatus(root, status, t.invalid, "error");
    }
  });
  copy.addEventListener("click", async () => {
    setToolStatus(
      root,
      status,
      (await copyText(replacement.value)) ? t.copied : t.invalid,
      "success",
    );
  });
}
document.querySelectorAll<HTMLElement>("[data-regex-tester]").forEach(init);
