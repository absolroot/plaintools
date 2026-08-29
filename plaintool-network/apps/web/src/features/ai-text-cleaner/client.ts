import { cleanHiddenUnicode } from "@plaintool/text-cleaner-core";
import {
  copyText,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  AiTextCleanerCopy,
  AiTextCleanerOptions,
  AiTextCleanerResult,
} from "./contract";

const MAX_BYTES = 1_000_000;
const AUTO_RUN_DELAY = 80;

function formatCount(template: string, count: number): string {
  return template.replace("{count}", count.toLocaleString());
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<AiTextCleanerCopy>(root);
  const input = root.querySelector<HTMLTextAreaElement>("[data-input]")!;
  const output = root.querySelector<HTMLTextAreaElement>("[data-output]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const report = root.querySelector<HTMLElement>("[data-report]")!;
  const noChanges = root.querySelector<HTMLElement>("[data-no-changes]")!;
  const removedGroup = root.querySelector<HTMLElement>("[data-removed-group]")!;
  const normalizedGroup = root.querySelector<HTMLElement>(
    "[data-normalized-group]",
  )!;
  const removedList = root.querySelector<HTMLUListElement>(
    "[data-removed-list]",
  )!;
  const normalizedList = root.querySelector<HTMLUListElement>(
    "[data-normalized-list]",
  )!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  let timer = 0;
  let revision = 0;
  let result: AiTextCleanerResult | null = null;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  function getOptions(): AiTextCleanerOptions {
    const options: AiTextCleanerOptions = {};
    root
      .querySelectorAll<HTMLInputElement>("[data-option]")
      .forEach((control) => {
        const key = control.dataset.option as keyof AiTextCleanerOptions;
        options[key] = control.checked;
      });
    return options;
  }

  function renderChangeList(
    list: HTMLUListElement,
    changes: AiTextCleanerResult["removed"],
  ): void {
    list.replaceChildren(
      ...changes.map((change) => {
        const item = document.createElement("li");
        const label = document.createElement("span");
        const codePoint = document.createElement("code");
        const count = document.createElement("strong");
        label.textContent = copy.kindLabels[change.kind];
        codePoint.textContent = change.codePointLabel;
        count.textContent = formatCount(copy.changeCountTemplate, change.count);
        item.append(label, codePoint, count);
        return item;
      }),
    );
  }

  function renderResult(nextResult: AiTextCleanerResult): void {
    result = nextResult;
    output.value = nextResult.cleanedText;
    copyButton.disabled = !nextResult.cleanedText;
    report.hidden = false;
    noChanges.hidden = nextResult.changed;
    removedGroup.hidden = nextResult.removed.length === 0;
    normalizedGroup.hidden = nextResult.normalized.length === 0;
    renderChangeList(removedList, nextResult.removed);
    renderChangeList(normalizedList, nextResult.normalized);
    setStatus(nextResult.changed ? copy.completed : copy.unchanged, "success");
  }

  function invalidateResult(): void {
    result = null;
    output.value = "";
    report.hidden = true;
    removedList.replaceChildren();
    normalizedList.replaceChildren();
    copyButton.disabled = true;
  }

  function run(): void {
    window.clearTimeout(timer);
    revision += 1;
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    if (exceedsUtf8ByteLimit(input.value, MAX_BYTES)) {
      invalidateResult();
      setStatus(copy.tooLarge, "error");
      return;
    }
    try {
      renderResult(cleanHiddenUnicode(input.value, getOptions()));
    } catch {
      invalidateResult();
      setStatus(copy.processingFailed, "error");
    }
  }

  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    revision += 1;
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    copyButton.disabled = true;
    timer = window.setTimeout(run, AUTO_RUN_DELAY);
  });

  root.querySelector("[data-run]")?.addEventListener("click", run);
  root.querySelectorAll<HTMLInputElement>("[data-option]").forEach((control) =>
    control.addEventListener("change", () => {
      if (input.value) run();
    }),
  );

  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    window.clearTimeout(timer);
    revision += 1;
    input.value = "";
    invalidateResult();
    setStatus(copy.ready);
    input.focus();
  });

  copyButton.addEventListener("click", async () => {
    if (!result) return;
    const copyRevision = revision;
    const copied = await copyText(result.cleanedText);
    if (copyRevision !== revision) return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
  });
}

document.querySelectorAll<HTMLElement>("[data-ai-text-cleaner]").forEach(init);
