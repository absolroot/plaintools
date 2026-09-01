import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  RegexEvaluation,
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
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const expression = root.querySelector<HTMLInputElement>("[data-expression]")!;
  const text = root.querySelector<HTMLTextAreaElement>("[data-text]")!;
  const replacement =
    root.querySelector<HTMLInputElement>("[data-replacement]")!;
  const replacementOutput = root.querySelector<HTMLTextAreaElement>(
    "[data-replacement-output]",
  )!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const list = root.querySelector<HTMLOListElement>("[data-match-list]")!;
  const empty = root.querySelector<HTMLElement>("[data-empty]")!;
  const resultCount = root.querySelector<HTMLElement>("[data-result-count]")!;
  const textCount = root.querySelector<HTMLElement>("[data-text-count]")!;
  const replace = root.querySelector<HTMLButtonElement>("[data-replace]")!;
  const copy = root.querySelector<HTMLButtonElement>("[data-copy-result]")!;
  const t = readClientCopy<RegexTesterCopy>(root);

  let revision = 0;
  let debounceTimer: number | undefined;
  let workingTimer: number | undefined;
  let activeOperation: RegexRunContext["operation"] | undefined;

  const flags = () =>
    Array.from(
      root.querySelectorAll<HTMLInputElement>("[data-flags] input:checked"),
      (input) => input.value,
    ).join("");

  const clearTimers = () => {
    if (debounceTimer !== undefined) window.clearTimeout(debounceTimer);
    if (workingTimer !== undefined) window.clearTimeout(workingTimer);
    debounceTimer = undefined;
    workingTimer = undefined;
  };

  const clearResults = (message: string) => {
    list.replaceChildren();
    empty.hidden = false;
    empty.textContent = message;
    resultCount.textContent = message;
  };

  const invalidateReplacement = () => {
    replacementOutput.value = "";
    copy.disabled = true;
  };

  const renderEvaluation = (result: RegexEvaluation) => {
    if (!result.valid) {
      clearResults(t.invalid);
      resultCount.textContent = t.invalid;
      replace.disabled = true;
      setToolStatus(root, status, t.invalid, "error");
      return;
    }

    empty.hidden = result.matches.length > 0;
    empty.textContent = t.noMatches;
    list.replaceChildren(
      ...result.matches.map((match) => {
        const item = document.createElement("li");
        const label = document.createElement("strong");
        label.textContent = fill(t.matchAt, { index: match.index });
        const value = document.createElement("code");
        value.textContent = match.value || "∅";
        item.append(label, value);
        match.groups.forEach((group, groupIndex) => {
          const part = document.createElement("span");
          part.textContent = fill(t.group, {
            index: groupIndex + 1,
            value: group ?? "∅",
          });
          item.append(part);
        });
        return item;
      }),
    );

    const count = fill(t.matchSummary, { count: result.matches.length });
    resultCount.textContent = result.truncated
      ? `${count} · ${t.tooManyMatches}`
      : count;
    replace.disabled = result.matches.length === 0;
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
      resultCount.textContent = t.processingFailed;
      replace.disabled = true;
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
      resultCount.textContent = t.enterExpression;
      replace.disabled = true;
      setToolStatus(root, status, t.enterExpression);
      return false;
    }
    if (
      expression.value.length > MAX_REGEX_EXPRESSION_LENGTH ||
      text.value.length > MAX_REGEX_TEXT_LENGTH
    ) {
      clearResults(t.inputTooLarge);
      resultCount.textContent = t.inputTooLarge;
      replace.disabled = true;
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

  root
    .querySelectorAll<HTMLInputElement>("[data-expression], [data-flags] input")
    .forEach((input) => input.addEventListener("input", queueEvaluation));
  text.addEventListener("input", queueEvaluation);
  replacement.addEventListener("input", () => {
    invalidateReplacement();
    if (activeOperation === "replace") {
      revision += 1;
      activeOperation = undefined;
      clearTimers();
      runner.cancel();
    }
    if (replacement.value.length > MAX_REGEX_REPLACEMENT_LENGTH)
      setToolStatus(root, status, t.replacementTooLarge, "error");
  });

  root
    .querySelector<HTMLButtonElement>("[data-sample]")!
    .addEventListener("click", () => {
      expression.value = "\\b(hello|world)\\b";
      text.value = "Hello, world! hello again.";
      replacement.value = "[$1]";
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
      textCount.textContent = "0";
      resultCount.textContent = t.ready;
      replace.disabled = true;
      setToolStatus(root, status, t.ready);
      expression.focus();
    });

  replace.addEventListener("click", () => {
    revision += 1;
    activeOperation = undefined;
    clearTimers();
    runner.cancel();
    invalidateReplacement();
    if (!validateInputs(true)) return;
    activeOperation = "replace";
    runner.submit(currentContext("replace"));
    setToolStatus(root, status, t.evaluating, "working");
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
