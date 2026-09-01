import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  RegexEvaluation,
  RegexMatch,
  RegexTesterCopy,
  RegexWorkerReply,
  RegexWorkerRequest,
} from "./contract";
import {
  MAX_REGEX_EXPRESSION_LENGTH,
  MAX_REGEX_REPLACEMENT_LENGTH,
  MAX_REGEX_TEXT_LENGTH,
} from "./evaluate";

const EVALUATION_DEBOUNCE_MS = 180;
const WORKING_DELAY_MS = 180;
const WORKER_TIMEOUT_MS = 1_500;

type RegexRunContext = {
  revision: number;
  operation: "evaluate" | "replace";
  expression: string;
  flags: string;
  text: string;
  replacement: string;
};

function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll("{" + key + "}", String(value)),
    template,
  );
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const expression = root.querySelector<HTMLInputElement>("[data-expression]")!;
  const text = root.querySelector<HTMLTextAreaElement>("[data-text]")!;
  const highlight = root.querySelector<HTMLElement>("[data-highlight]")!;
  const matchNav = root.querySelector<HTMLElement>("[data-match-nav]")!;
  const inspector = root.querySelector<HTMLElement>("[data-match-inspector]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const showReplacement = root.querySelector<HTMLButtonElement>(
    "[data-show-replacement]",
  )!;
  const replacementPanel = root.querySelector<HTMLDetailsElement>(
    ".regex-replacement-panel",
  )!;
  const replacement =
    root.querySelector<HTMLInputElement>("[data-replacement]")!;
  const replacementOutput = root.querySelector<HTMLTextAreaElement>(
    "[data-replacement-output]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const resultCount = root.querySelector<HTMLElement>("[data-result-count]")!;
  const textCount = root.querySelector<HTMLElement>("[data-text-count]")!;
  const copy = root.querySelector<HTMLButtonElement>("[data-copy-result]")!;
  const t = readClientCopy<RegexTesterCopy>(root);

  let revision = 0;
  let debounceTimer: number | undefined;
  let workingTimer: number | undefined;
  let replacementTimer: number | undefined;
  let activeOperation: RegexRunContext["operation"] | undefined;
  let visibleMatches: RegexMatch[] = [];

  const flags = () =>
    Array.from(
      root.querySelectorAll<HTMLInputElement>("[data-flags] input:checked"),
      (input) => input.value,
    ).join("");

  const clearTimers = () => {
    if (debounceTimer !== undefined) window.clearTimeout(debounceTimer);
    if (workingTimer !== undefined) window.clearTimeout(workingTimer);
    if (replacementTimer !== undefined) window.clearTimeout(replacementTimer);
    debounceTimer = undefined;
    workingTimer = undefined;
    replacementTimer = undefined;
  };

  const clearResults = (message: string) => {
    visibleMatches = [];
    highlight.replaceChildren();
    matchNav.replaceChildren();
    inspector.textContent = message;
    resultCount.textContent = message;
  };

  const hideRunPanels = () => {
    results.hidden = true;
    showReplacement.hidden = true;
    replacementPanel.hidden = true;
    replacementPanel.open = false;
  };

  const invalidateReplacement = () => {
    replacementOutput.value = "";
    copy.disabled = true;
  };

  const renderHighlight = (matches: RegexMatch[], activeIndex = -1) => {
    highlight.replaceChildren();
    let cursor = 0;
    matches.forEach((match, index) => {
      highlight.append(
        document.createTextNode(text.value.slice(cursor, match.index)),
      );
      const mark = document.createElement("mark");
      mark.classList.toggle("is-active", index === activeIndex);
      mark.textContent = match.value || "∅";
      highlight.append(mark);
      cursor = match.index + match.value.length;
    });
    highlight.append(document.createTextNode(text.value.slice(cursor)));
  };

  const renderInspector = (index: number) => {
    const match = visibleMatches[index];
    if (!match) {
      inspector.textContent = t.noMatches;
      return;
    }
    inspector.replaceChildren();
    matchNav.replaceChildren(
      ...visibleMatches.map((candidate, candidateIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "regex-match-button";
        button.classList.toggle("is-active", candidateIndex === index);
        button.textContent = candidate.index + ": " + (candidate.value || "∅");
        button.ariaLabel = fill(t.matchAt, { index: candidate.index });
        button.addEventListener("click", () => {
          text.focus();
          text.setSelectionRange(
            candidate.index,
            candidate.index + candidate.value.length,
          );
          renderInspector(candidateIndex);
        });
        return button;
      }),
    );
    const label = document.createElement("strong");
    label.textContent = fill(t.matchAt, { index: match.index });
    const value = document.createElement("code");
    value.textContent = match.value || "∅";
    inspector.append(label, value);
    match.groups.forEach((group, groupIndex) => {
      const part = document.createElement("span");
      part.textContent = fill(t.group, {
        index: groupIndex + 1,
        value: group ?? "∅",
      });
      inspector.append(part);
    });
    renderHighlight(visibleMatches, index);
  };

  const renderEvaluation = (result: RegexEvaluation) => {
    results.hidden = false;
    if (!result.valid) {
      clearResults(t.invalid);
      showReplacement.hidden = true;
      replacementPanel.hidden = true;
      replacementPanel.open = false;
      setToolStatus(root, status, t.invalid, "error");
      return;
    }

    visibleMatches = result.matches;
    renderHighlight(visibleMatches);
    if (visibleMatches.length) renderInspector(0);
    else inspector.textContent = t.noMatches;

    const count = fill(t.matchSummary, { count: result.matches.length });
    resultCount.textContent = result.truncated
      ? count + " · " + t.tooManyMatches
      : count;
    showReplacement.hidden = result.matches.length === 0;
    setToolStatus(
      root,
      status,
      result.matches.length ? resultCount.textContent : t.noMatches,
      result.matches.length ? "success" : "idle",
    );
  };

  const runner = createLatestWorkerRunner<
    RegexWorkerRequest,
    RegexWorkerReply,
    RegexRunContext
  >({
    lazy: true,
    timeoutMs: WORKER_TIMEOUT_MS,
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({
      payload: {
        id,
        operation: context.operation,
        expression: context.expression,
        flags: context.flags,
        text: context.text,
        replacement: context.replacement,
      },
    }),
    replyId: (reply) => reply.id,
    onReply: (reply, context) => {
      if (context.revision !== revision) return;
      activeOperation = undefined;
      clearTimers();
      renderEvaluation(reply.evaluation);
      if (context.operation !== "replace" || !reply.replacement) return;
      if (!reply.replacement.ok) {
        const message =
          reply.replacement.reason === "too-many-matches"
            ? t.replacementTooLarge
            : t.invalid;
        setToolStatus(root, status, message, "error");
        return;
      }
      replacementOutput.value = reply.replacement.output;
      copy.disabled = false;
      setToolStatus(root, status, t.replacementResult, "success");
    },
    onFailure: (context) => {
      if (!context || context.revision !== revision) return;
      activeOperation = undefined;
      clearTimers();
      clearResults(t.processingFailed);
      results.hidden = false;
      setToolStatus(root, status, t.processingFailed, "error");
    },
  });

  const currentContext = (
    operation: RegexRunContext["operation"],
  ): RegexRunContext => ({
    revision,
    operation,
    expression: expression.value,
    flags: flags(),
    text: text.value,
    replacement: replacement.value,
  });

  const validateInputs = (includeReplacement: boolean): boolean => {
    if (!expression.value) {
      clearResults(t.enterExpression);
      setToolStatus(root, status, t.enterExpression);
      return false;
    }
    if (
      expression.value.length > MAX_REGEX_EXPRESSION_LENGTH ||
      text.value.length > MAX_REGEX_TEXT_LENGTH
    ) {
      clearResults(t.inputTooLarge);
      setToolStatus(root, status, t.inputTooLarge, "error");
      return false;
    }
    if (
      includeReplacement &&
      replacement.value.length > MAX_REGEX_REPLACEMENT_LENGTH
    ) {
      setToolStatus(root, status, t.replacementTooLarge, "error");
      return false;
    }
    return true;
  };

  const queueEvaluation = () => {
    revision += 1;
    activeOperation = undefined;
    clearTimers();
    runner.cancel();
    invalidateReplacement();
    hideRunPanels();
    visibleMatches = [];
    highlight.replaceChildren();
    inspector.textContent = t.evaluating;
    textCount.textContent = String(text.value.length);
    if (!validateInputs(false)) return;
    const queuedRevision = revision;
    debounceTimer = window.setTimeout(() => {
      debounceTimer = undefined;
      if (queuedRevision !== revision) return;
      activeOperation = "evaluate";
      runner.submit(currentContext("evaluate"));
      workingTimer = window.setTimeout(() => {
        if (queuedRevision === revision)
          setToolStatus(root, status, t.evaluating, "working");
      }, WORKING_DELAY_MS);
    }, EVALUATION_DEBOUNCE_MS);
  };

  const showSelection = () => {
    const selectedMatch = visibleMatches.findIndex(
      (match) =>
        text.selectionStart >= match.index &&
        text.selectionStart <= match.index + match.value.length,
    );
    if (selectedMatch >= 0) renderInspector(selectedMatch);
  };

  root
    .querySelectorAll<HTMLInputElement>("[data-expression], [data-flags] input")
    .forEach((input) => input.addEventListener("input", queueEvaluation));
  text.addEventListener("input", queueEvaluation);
  text.addEventListener("select", showSelection);
  text.addEventListener("click", showSelection);
  text.addEventListener("scroll", () => {
    highlight.scrollTop = text.scrollTop;
    highlight.scrollLeft = text.scrollLeft;
  });
  replacement.addEventListener("input", () => {
    invalidateReplacement();
    if (activeOperation === "replace") {
      revision += 1;
      activeOperation = undefined;
      clearTimers();
      runner.cancel();
    }
    if (replacement.value.length > MAX_REGEX_REPLACEMENT_LENGTH) {
      setToolStatus(root, status, t.replacementTooLarge, "error");
      return;
    }
    if (replacementTimer !== undefined) window.clearTimeout(replacementTimer);
    if (!replacementPanel.hidden && visibleMatches.length) {
      replacementTimer = window.setTimeout(() => {
        replacementTimer = undefined;
        if (!replacementPanel.hidden && visibleMatches.length) runReplacement();
      }, EVALUATION_DEBOUNCE_MS);
    }
  });

  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      expression.value = "\\b(hello|world)\\b";
      text.value = "Hello, world! hello again.";
      replacement.value = t.replacementSample;
      queueEvaluation();
      expression.focus();
    });

  root
    .querySelector<HTMLButtonElement>("[data-clear]")!
    .addEventListener("click", () => {
      revision += 1;
      activeOperation = undefined;
      clearTimers();
      runner.cancel();
      expression.value = text.value = replacement.value = "";
      invalidateReplacement();
      clearResults(t.ready);
      hideRunPanels();
      textCount.textContent = "0";
      setToolStatus(root, status, t.ready);
      expression.focus();
    });

  const runReplacement = () => {
    revision += 1;
    activeOperation = undefined;
    clearTimers();
    runner.cancel();
    invalidateReplacement();
    if (!validateInputs(true)) return;
    activeOperation = "replace";
    runner.submit(currentContext("replace"));
    setToolStatus(root, status, t.evaluating, "working");
  };

  showReplacement.addEventListener("click", () => {
    replacementPanel.hidden = false;
    replacementPanel.open = true;
    if (replacement.value) runReplacement();
    else replacement.focus();
  });

  copy.addEventListener("click", async () => {
    const copied = await copyText(replacementOutput.value);
    setToolStatus(
      root,
      status,
      copied ? t.copied : t.copyFailed,
      copied ? "success" : "error",
    );
  });

  window.addEventListener(
    "pagehide",
    () => {
      activeOperation = undefined;
      clearTimers();
      runner.dispose();
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>("[data-regex-tester]").forEach(init);
