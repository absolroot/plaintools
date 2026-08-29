import type {
  TextDiffLine,
  TextDiffResult,
  TextDiffRow,
  TextDiffSegment,
} from "@plaintool/text-diff-core";
import { fill } from "../../lib/template";
import {
  appendBadge,
  createDeferredIndicator,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import type {
  TextCompareClientCopy,
  TextCompareWorkerReply,
  TextCompareWorkerRequest,
} from "./contract";

const MAX_BYTES = 1_048_576;
const MAX_LINES = 20_000;

function logicalLineCount(value: string): number {
  if (!value) return 0;
  let lines = 1;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code === 13) {
      lines += 1;
      if (value.charCodeAt(index + 1) === 10) index += 1;
    } else if (code === 10) {
      lines += 1;
    }
  }
  return lines;
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const original = root.querySelector<HTMLTextAreaElement>("[data-original]")!;
  const changed = root.querySelector<HTMLTextAreaElement>("[data-changed]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const badges = root.querySelector<HTMLElement>("[data-badges]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const staleNotice = root.querySelector<HTMLElement>("[data-stale-notice]")!;
  const identicalResult = root.querySelector<HTMLElement>("[data-identical]")!;
  const diffTable = root.querySelector<HTMLElement>("[data-diff-table]")!;
  const navigation = root.querySelector<HTMLElement>(
    "[data-change-navigation]",
  )!;
  const previousButton = root.querySelector<HTMLButtonElement>(
    "[data-previous-change]",
  )!;
  const nextButton =
    root.querySelector<HTMLButtonElement>("[data-next-change]")!;
  const copy = readClientCopy<TextCompareClientCopy>(root);
  const locale = root.dataset.locale || "en";
  const originalHeading =
    root.querySelector<HTMLLabelElement>(`label[for="${original.id}"]`)
      ?.textContent ?? copy.originalLine;
  const changedHeading =
    root.querySelector<HTMLLabelElement>(`label[for="${changed.id}"]`)
      ?.textContent ?? copy.changedLine;

  let hasCommittedResult = false;
  let changeRows: HTMLElement[] = [];
  let activeChange = -1;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const setStale = (stale: boolean) => {
    results.classList.toggle("is-stale", stale);
    staleNotice.hidden = !stale;
  };

  const clearNavigation = () => {
    changeRows = [];
    activeChange = -1;
    navigation.hidden = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
  };

  const updateNavigation = () => {
    navigation.hidden = changeRows.length === 0;
    previousButton.disabled = activeChange <= 0;
    nextButton.disabled =
      changeRows.length === 0 || activeChange >= changeRows.length - 1;
  };

  const clearResult = () => {
    hasCommittedResult = false;
    results.hidden = true;
    setStale(false);
    identicalResult.hidden = true;
    diffTable.hidden = false;
    diffTable.replaceChildren();
    badges.replaceChildren();
    clearNavigation();
  };

  const markCommittedResultStale = () => {
    if (!hasCommittedResult) {
      setStatus(copy.ready);
      return;
    }
    setStale(true);
    setStatus(copy.stale);
  };

  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );

  const rowLabel = (row: TextDiffRow): string => {
    switch (row.kind) {
      case "added":
        return copy.addedRow;
      case "removed":
        return copy.removedRow;
      case "changed":
        return copy.changedRow;
      default:
        return copy.unchangedRow;
    }
  };

  const marker = (row: TextDiffRow, side: "original" | "changed") => {
    if (row.kind === "changed") return "~";
    if (side === "original" && row.kind === "removed") return "−";
    if (side === "changed" && row.kind === "added") return "+";
    return "";
  };

  const appendSegments = (
    container: HTMLElement,
    line: TextDiffLine,
    side: "original" | "changed",
  ) => {
    const segments = line.segments.length
      ? line.segments
      : ([{ kind: "unchanged", text: line.text }] as TextDiffSegment[]);
    for (const segment of segments) {
      if (!segment.text) continue;
      const isRemoved = side === "original" && segment.kind === "removed";
      const isAdded = side === "changed" && segment.kind === "added";
      const node = document.createElement(
        isRemoved ? "del" : isAdded ? "ins" : "span",
      );
      node.className = `diff-segment is-${segment.kind}`;
      node.textContent = segment.text;
      container.append(node);
    }
    if (!line.text) {
      const empty = document.createElement("span");
      empty.className = "empty-line-marker";
      empty.setAttribute("aria-hidden", "true");
      empty.textContent = "↵";
      container.append(empty);
    }
  };

  const createCell = (
    row: TextDiffRow,
    side: "original" | "changed",
  ): HTMLElement => {
    const line = row[side];
    const cell = document.createElement("div");
    cell.className = `diff-cell diff-cell-${side}`;
    cell.setAttribute("role", "cell");
    cell.dataset.sideLabel =
      side === "original" ? originalHeading : changedHeading;
    const lineLabel =
      side === "original" ? copy.originalLine : copy.changedLine;
    cell.setAttribute(
      "aria-label",
      `${fill(lineLabel, { line: line?.lineNumber ?? "–" })}. ${rowLabel(row)}`,
    );

    const gutter = document.createElement("span");
    gutter.className = "diff-gutter";
    gutter.setAttribute("aria-hidden", "true");
    const sign = document.createElement("span");
    sign.className = "diff-marker";
    sign.textContent = marker(row, side);
    const lineNumber = document.createElement("span");
    lineNumber.className = "diff-line-number";
    lineNumber.textContent = line ? String(line.lineNumber) : "";
    gutter.append(sign, lineNumber);

    const content = document.createElement("pre");
    content.className = "diff-line-content";
    if (line) appendSegments(content, line, side);
    cell.append(gutter, content);
    return cell;
  };

  const createRow = (row: TextDiffRow): HTMLElement => {
    const node = document.createElement("div");
    node.className = `diff-row is-${row.kind}`;
    node.setAttribute("role", "row");
    if (row.kind !== "unchanged") {
      node.dataset.changeRow = "";
      node.tabIndex = -1;
    }

    if (row.whitespaceOnlyChange || row.lineEndingChange) {
      const flags = document.createElement("div");
      flags.className = "diff-row-flags";
      if (row.whitespaceOnlyChange) {
        const whitespace = document.createElement("span");
        whitespace.textContent = copy.whitespaceChange;
        flags.append(whitespace);
      }
      if (row.lineEndingChange) {
        const lineEnding = document.createElement("span");
        lineEnding.textContent = copy.lineEndingChange;
        flags.append(lineEnding);
      }
      node.append(flags);
    }

    node.append(createCell(row, "original"), createCell(row, "changed"));
    return node;
  };

  const createHeader = (): HTMLElement => {
    const header = document.createElement("div");
    header.className = "diff-header";
    header.setAttribute("role", "row");
    for (const heading of [originalHeading, changedHeading]) {
      const cell = document.createElement("div");
      cell.setAttribute("role", "columnheader");
      cell.textContent = heading;
      header.append(cell);
    }
    return header;
  };

  const appendRows = (parent: Node, rows: TextDiffRow[]) => {
    const fragment = document.createDocumentFragment();
    rows.forEach((row) => fragment.append(createRow(row)));
    parent.appendChild(fragment);
  };

  const renderGroup = (
    group: Extract<TextDiffResult, { kind: "success" }>["groups"][number],
  ): HTMLElement => {
    const groupNode = document.createElement("div");
    groupNode.className = `diff-group is-${group.kind}`;
    groupNode.setAttribute("role", "rowgroup");
    if (!group.collapse.collapsible) {
      appendRows(groupNode, group.rows);
      return groupNode;
    }

    const contextRows = Math.max(1, group.collapse.contextRows);
    const firstRows = group.rows.slice(0, contextRows);
    const lastRows = group.rows.slice(-contextRows);
    const hiddenRows = group.rows.slice(contextRows, -contextRows);
    appendRows(groupNode, firstRows);

    const expandRow = document.createElement("div");
    expandRow.className = "diff-expand-row";
    expandRow.setAttribute("role", "row");
    const expandCell = document.createElement("div");
    expandCell.setAttribute("role", "cell");
    const expandButton = document.createElement("button");
    expandButton.className = "diff-expand-button";
    expandButton.type = "button";
    expandButton.textContent = fill(copy.expandUnchanged, {
      count: group.collapse.hiddenRows,
    });
    expandButton.addEventListener("click", () => {
      const fragment = document.createDocumentFragment();
      hiddenRows.forEach((row) => fragment.append(createRow(row)));
      expandRow.replaceWith(fragment);
    });
    expandCell.append(expandButton);
    expandRow.append(expandCell);
    groupNode.append(expandRow);
    appendRows(groupNode, lastRows);
    return groupNode;
  };

  const renderResult = (
    result: Extract<TextDiffResult, { kind: "success" }>,
  ) => {
    diffTable.replaceChildren();
    badges.replaceChildren();
    clearNavigation();
    results.hidden = false;
    setStale(false);
    hasCommittedResult = true;

    appendBadge(
      badges,
      fill(copy.additions, {
        count: result.stats.addedLines.toLocaleString(locale),
      }),
    );
    appendBadge(
      badges,
      fill(copy.deletions, {
        count: result.stats.deletedLines.toLocaleString(locale),
      }),
    );
    appendBadge(
      badges,
      fill(copy.changes, {
        count: result.stats.changedRows.toLocaleString(locale),
      }),
    );
    if (result.approximate) appendBadge(badges, copy.approximate, true);
    if (result.warnings.includes("inline-diff-omitted"))
      appendBadge(badges, copy.inlineLimited, true);

    identicalResult.hidden = !result.identical;
    diffTable.hidden = result.identical;
    if (!result.identical) {
      diffTable.append(createHeader());
      result.groups.forEach((group) => diffTable.append(renderGroup(group)));
      changeRows = Array.from(
        diffTable.querySelectorAll<HTMLElement>("[data-change-row]"),
      );
      changeRows.forEach((row, index) => {
        row.id = `text-compare-change-${index + 1}`;
      });
      updateNavigation();
    }
    setStatus(result.identical ? copy.identical : copy.complete, "success");
  };

  const runner = createLatestWorkerRunner<
    TextCompareWorkerRequest,
    TextCompareWorkerReply,
    { original: string; changed: string }
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: (id, context) => ({ payload: { id, ...context } }),
    replyId: (reply) => reply.id,
    onReply: (reply) => {
      workingIndicator.end();
      if (reply.result.kind === "too-complex") {
        if (hasCommittedResult) setStale(true);
        setStatus(copy.tooComplex, "error");
        return;
      }
      renderResult(reply.result);
    },
    onFailure: () => {
      workingIndicator.end();
      if (hasCommittedResult) setStale(true);
      setStatus(copy.processingFailed, "error");
    },
  });

  const cancelPendingWork = () => {
    workingIndicator.cancel();
    runner.cancel();
  };

  const compare = () => {
    cancelPendingWork();
    if (!original.value && !changed.value) {
      if (hasCommittedResult) setStale(true);
      setStatus(copy.empty, "error");
      original.focus();
      return;
    }
    if (
      exceedsUtf8ByteLimit(original.value, MAX_BYTES) ||
      exceedsUtf8ByteLimit(changed.value, MAX_BYTES)
    ) {
      if (hasCommittedResult) setStale(true);
      setStatus(copy.tooLarge, "error");
      return;
    }
    if (
      logicalLineCount(original.value) + logicalLineCount(changed.value) >
      MAX_LINES
    ) {
      if (hasCommittedResult) setStale(true);
      setStatus(copy.tooManyLines, "error");
      return;
    }
    if (hasCommittedResult) setStale(true);
    workingIndicator.begin();
    runner.submit({ original: original.value, changed: changed.value });
  };

  const moveToChange = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= changeRows.length) return;
    changeRows[activeChange]?.classList.remove("is-active-change");
    activeChange = nextIndex;
    const target = changeRows[activeChange]!;
    target.classList.add("is-active-change");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
    updateNavigation();
  };

  root.querySelector("[data-compare]")?.addEventListener("click", compare);
  root.querySelector("[data-swap]")?.addEventListener("click", () => {
    cancelPendingWork();
    const previousOriginal = original.value;
    original.value = changed.value;
    changed.value = previousOriginal;
    markCommittedResultStale();
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    cancelPendingWork();
    original.value = "";
    changed.value = "";
    clearResult();
    setStatus(copy.ready);
    original.focus();
  });
  previousButton.addEventListener("click", () =>
    moveToChange(activeChange - 1),
  );
  nextButton.addEventListener("click", () => moveToChange(activeChange + 1));

  const onInput = () => {
    cancelPendingWork();
    markCommittedResultStale();
  };
  const onKeydown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      compare();
    }
  };
  for (const input of [original, changed]) {
    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKeydown);
  }

  window.addEventListener("pagehide", () => runner.dispose(), { once: true });
}

document.querySelectorAll<HTMLElement>("[data-text-compare]").forEach(init);
