import { diffArrays } from "diff";

export type TextDiffLineEnding = "lf" | "crlf" | "cr" | "none";
export type TextDiffSegmentKind = "unchanged" | "added" | "removed";
export type TextDiffRowKind = "unchanged" | "added" | "removed" | "changed";
export type TextDiffWarning =
  | "grapheme-segmentation-approximate"
  | "inline-diff-omitted";

export interface TextDiffLimits {
  timeoutMs: number;
  maxEditLength: number;
  inlineGraphemeLimit: number;
  inlineMaxEditLength: number;
  maxRenderedRows: number;
}

export const DEFAULT_TEXT_DIFF_LIMITS: Readonly<TextDiffLimits> = {
  timeoutMs: 1_200,
  maxEditLength: 4_000,
  inlineGraphemeLimit: 20_000,
  inlineMaxEditLength: 256,
  maxRenderedRows: 8_000,
};

export interface TextDiffSegment {
  kind: TextDiffSegmentKind;
  text: string;
}

export interface TextDiffLine {
  lineNumber: number;
  text: string;
  raw: string;
  ending: TextDiffLineEnding;
  whitespaceOnly: boolean;
  segments: TextDiffSegment[];
}

export interface TextDiffRow {
  kind: TextDiffRowKind;
  original: TextDiffLine | null;
  changed: TextDiffLine | null;
  whitespaceOnlyChange: boolean;
  lineEndingChange: boolean;
}

export interface TextDiffGroupCollapse {
  collapsible: boolean;
  contextRows: number;
  hiddenRows: number;
  renderedRows: number;
}

export interface TextDiffGroup {
  kind: "unchanged" | "changed";
  /** All rows remain available so the UI can expand a collapsed group. */
  rows: TextDiffRow[];
  collapse: TextDiffGroupCollapse;
}

export interface TextDiffStats {
  originalLines: number;
  changedLines: number;
  /** Raw line tokens marked as additions by the line diff. */
  addedLines: number;
  /** Raw line tokens marked as removals by the line diff. */
  deletedLines: number;
  unchangedLines: number;
  changedRows: number;
}

export interface TextDiffSuccess {
  kind: "success";
  identical: boolean;
  approximate: boolean;
  warnings: TextDiffWarning[];
  stats: TextDiffStats;
  groups: TextDiffGroup[];
}

export interface TextDiffTooComplex {
  kind: "too-complex";
  reason: "line-diff" | "render-limit";
  approximate: false;
}

export type TextDiffResult = TextDiffSuccess | TextDiffTooComplex;

interface LineToken {
  text: string;
  raw: string;
  ending: TextDiffLineEnding;
}

interface MutableRow {
  kind: TextDiffRowKind;
  original: LineToken | null;
  changed: LineToken | null;
  originalLineNumber: number | null;
  changedLineNumber: number | null;
}

const lineBreakPattern = /\r\n|\r|\n/gu;
const whitespacePattern = /^\s*$/u;
const collapseContextRows = 3;

function normalizeLimit(
  value: number | undefined,
  fallback: number,
  minimum: number,
): number {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.max(minimum, Math.floor(value));
}

function normalizeLimits(limits: Partial<TextDiffLimits>): TextDiffLimits {
  return {
    timeoutMs: normalizeLimit(
      limits.timeoutMs,
      DEFAULT_TEXT_DIFF_LIMITS.timeoutMs,
      1,
    ),
    maxEditLength: normalizeLimit(
      limits.maxEditLength,
      DEFAULT_TEXT_DIFF_LIMITS.maxEditLength,
      0,
    ),
    inlineGraphemeLimit: normalizeLimit(
      limits.inlineGraphemeLimit,
      DEFAULT_TEXT_DIFF_LIMITS.inlineGraphemeLimit,
      0,
    ),
    inlineMaxEditLength: normalizeLimit(
      limits.inlineMaxEditLength,
      DEFAULT_TEXT_DIFF_LIMITS.inlineMaxEditLength,
      0,
    ),
    maxRenderedRows: normalizeLimit(
      limits.maxRenderedRows,
      DEFAULT_TEXT_DIFF_LIMITS.maxRenderedRows,
      1,
    ),
  };
}

function endingKind(ending: string): TextDiffLineEnding {
  if (ending === "\r\n") return "crlf";
  if (ending === "\r") return "cr";
  if (ending === "\n") return "lf";
  return "none";
}

function tokenizeLines(text: string): LineToken[] {
  if (!text) return [];

  const lines: LineToken[] = [];
  let start = 0;
  lineBreakPattern.lastIndex = 0;

  for (
    let match = lineBreakPattern.exec(text);
    match;
    match = lineBreakPattern.exec(text)
  ) {
    const ending = match[0];
    const content = text.slice(start, match.index);
    lines.push({
      text: content,
      raw: content + ending,
      ending: endingKind(ending),
    });
    start = match.index + ending.length;
  }

  lines.push({
    text: text.slice(start),
    raw: text.slice(start),
    ending: "none",
  });
  return lines;
}

function graphemes(text: string): {
  tokens: string[];
  approximate: boolean;
} {
  if (typeof Intl.Segmenter !== "function") {
    return { tokens: Array.from(text), approximate: true };
  }

  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return {
    tokens: Array.from(segmenter.segment(text), (part) => part.segment),
    approximate: false,
  };
}

function singleSegment(
  text: string,
  kind: TextDiffSegmentKind,
): TextDiffSegment[] {
  return text ? [{ kind, text }] : [];
}

function whitespaceEquivalent(original: string, changed: string): boolean {
  return (
    original !== changed &&
    original.replace(/\s/gu, "") === changed.replace(/\s/gu, "")
  );
}

function createGroups(rows: TextDiffRow[]): TextDiffGroup[] {
  const groups: TextDiffGroup[] = [];

  for (const row of rows) {
    const groupKind = row.kind === "unchanged" ? "unchanged" : "changed";
    const current = groups.at(-1);
    if (current?.kind === groupKind) {
      current.rows.push(row);
    } else {
      groups.push({
        kind: groupKind,
        rows: [row],
        collapse: {
          collapsible: false,
          contextRows: collapseContextRows,
          hiddenRows: 0,
          renderedRows: 1,
        },
      });
    }
  }

  for (const group of groups) {
    const collapsible =
      group.kind === "unchanged" && group.rows.length > collapseContextRows * 2;
    const hiddenRows = collapsible
      ? group.rows.length - collapseContextRows * 2
      : 0;
    group.collapse = {
      collapsible,
      contextRows: collapseContextRows,
      hiddenRows,
      renderedRows: collapsible
        ? collapseContextRows * 2 + 1
        : group.rows.length,
    };
  }

  return groups;
}

function addUnchangedRows(
  rows: MutableRow[],
  original: LineToken[],
  changed: LineToken[],
  originalStart: number,
  changedStart: number,
  count: number,
): void {
  for (let offset = 0; offset < count; offset += 1) {
    const originalLine = original[originalStart + offset];
    const changedLine = changed[changedStart + offset];
    if (!originalLine || !changedLine) continue;
    rows.push({
      kind: originalLine.raw === changedLine.raw ? "unchanged" : "changed",
      original: originalLine,
      changed: changedLine,
      originalLineNumber: originalStart + offset + 1,
      changedLineNumber: changedStart + offset + 1,
    });
  }
}

function addChangedRows(
  rows: MutableRow[],
  removed: Array<{ token: LineToken; lineNumber: number }>,
  added: Array<{ token: LineToken; lineNumber: number }>,
): void {
  const count = Math.max(removed.length, added.length);
  for (let offset = 0; offset < count; offset += 1) {
    const original = removed[offset] ?? null;
    const changed = added[offset] ?? null;
    rows.push({
      kind: original && changed ? "changed" : original ? "removed" : "added",
      original: original?.token ?? null,
      changed: changed?.token ?? null,
      originalLineNumber: original?.lineNumber ?? null,
      changedLineNumber: changed?.lineNumber ?? null,
    });
  }
}

function inlineSegments(
  original: string,
  changed: string,
  limits: TextDiffLimits,
  state: {
    graphemesUsed: number;
    approximate: boolean;
    omitted: boolean;
  },
): { original: TextDiffSegment[]; changed: TextDiffSegment[] } {
  if (original === changed) {
    return {
      original: singleSegment(original, "unchanged"),
      changed: singleSegment(changed, "unchanged"),
    };
  }

  const originalGraphemes = graphemes(original);
  const changedGraphemes = graphemes(changed);
  state.approximate ||=
    originalGraphemes.approximate || changedGraphemes.approximate;
  const pairSize =
    originalGraphemes.tokens.length + changedGraphemes.tokens.length;

  if (state.graphemesUsed + pairSize > limits.inlineGraphemeLimit) {
    state.omitted = true;
    return {
      original: singleSegment(original, "removed"),
      changed: singleSegment(changed, "added"),
    };
  }
  state.graphemesUsed += pairSize;

  const changes = diffArrays(
    originalGraphemes.tokens,
    changedGraphemes.tokens,
    {
      maxEditLength: limits.inlineMaxEditLength,
    },
  );
  if (!changes) {
    state.omitted = true;
    return {
      original: singleSegment(original, "removed"),
      changed: singleSegment(changed, "added"),
    };
  }

  const originalSegments: TextDiffSegment[] = [];
  const changedSegments: TextDiffSegment[] = [];
  for (const change of changes) {
    const text = change.value.join("");
    if (!text) continue;
    if (change.removed) {
      originalSegments.push({ kind: "removed", text });
    } else if (change.added) {
      changedSegments.push({ kind: "added", text });
    } else {
      originalSegments.push({ kind: "unchanged", text });
      changedSegments.push({ kind: "unchanged", text });
    }
  }

  return { original: originalSegments, changed: changedSegments };
}

function materializeRows(
  rows: MutableRow[],
  limits: TextDiffLimits,
): {
  rows: TextDiffRow[];
  approximate: boolean;
  inlineOmitted: boolean;
} {
  const state = {
    graphemesUsed: 0,
    approximate: false,
    omitted: false,
  };
  const result: TextDiffRow[] = [];

  for (const row of rows) {
    let originalSegments: TextDiffSegment[] = [];
    let changedSegments: TextDiffSegment[] = [];

    if (row.original && row.changed) {
      const segments = inlineSegments(
        row.original.text,
        row.changed.text,
        limits,
        state,
      );
      originalSegments = segments.original;
      changedSegments = segments.changed;
    } else if (row.original) {
      originalSegments = singleSegment(row.original.text, "removed");
    } else if (row.changed) {
      changedSegments = singleSegment(row.changed.text, "added");
    }

    const originalLine =
      row.original && row.originalLineNumber !== null
        ? {
            ...row.original,
            lineNumber: row.originalLineNumber,
            whitespaceOnly: whitespacePattern.test(row.original.text),
            segments: originalSegments,
          }
        : null;
    const changedLine =
      row.changed && row.changedLineNumber !== null
        ? {
            ...row.changed,
            lineNumber: row.changedLineNumber,
            whitespaceOnly: whitespacePattern.test(row.changed.text),
            segments: changedSegments,
          }
        : null;

    result.push({
      kind: row.kind,
      original: originalLine,
      changed: changedLine,
      whitespaceOnlyChange:
        originalLine !== null &&
        changedLine !== null &&
        whitespaceEquivalent(originalLine.text, changedLine.text),
      lineEndingChange:
        originalLine !== null &&
        changedLine !== null &&
        originalLine.ending !== changedLine.ending,
    });
  }

  return {
    rows: result,
    approximate: state.approximate,
    inlineOmitted: state.omitted,
  };
}

export function compareText(
  originalText: string,
  changedText: string,
  requestedLimits: Partial<TextDiffLimits> = {},
): TextDiffResult {
  const limits = normalizeLimits(requestedLimits);
  const original = tokenizeLines(originalText);
  const changed = tokenizeLines(changedText);
  const changes = diffArrays(original, changed, {
    comparator: (left, right) => left.text === right.text,
    timeout: limits.timeoutMs,
    maxEditLength: limits.maxEditLength,
  });

  if (!changes) {
    return { kind: "too-complex", reason: "line-diff", approximate: false };
  }

  const rows: MutableRow[] = [];
  let originalIndex = 0;
  let changedIndex = 0;
  let addedLines = 0;
  let deletedLines = 0;

  for (let changeIndex = 0; changeIndex < changes.length; ) {
    const change = changes[changeIndex];
    if (!change.added && !change.removed) {
      addUnchangedRows(
        rows,
        original,
        changed,
        originalIndex,
        changedIndex,
        change.count,
      );
      originalIndex += change.count;
      changedIndex += change.count;
      changeIndex += 1;
      continue;
    }

    const removed: Array<{ token: LineToken; lineNumber: number }> = [];
    const added: Array<{ token: LineToken; lineNumber: number }> = [];
    while (changeIndex < changes.length) {
      const changedRun = changes[changeIndex];
      if (!changedRun.added && !changedRun.removed) break;

      if (changedRun.removed) {
        for (let offset = 0; offset < changedRun.count; offset += 1) {
          const token = original[originalIndex + offset];
          if (token)
            removed.push({ token, lineNumber: originalIndex + offset + 1 });
        }
        originalIndex += changedRun.count;
        deletedLines += changedRun.count;
      } else {
        for (let offset = 0; offset < changedRun.count; offset += 1) {
          const token = changed[changedIndex + offset];
          if (token)
            added.push({ token, lineNumber: changedIndex + offset + 1 });
        }
        changedIndex += changedRun.count;
        addedLines += changedRun.count;
      }
      changeIndex += 1;
    }
    addChangedRows(rows, removed, added);
  }

  const rowSkeleton = rows.map<TextDiffRow>((row) => ({
    kind: row.kind,
    original: null,
    changed: null,
    whitespaceOnlyChange: false,
    lineEndingChange: false,
  }));
  const initialGroups = createGroups(rowSkeleton);
  const renderedRows = initialGroups.reduce(
    (total, group) => total + group.collapse.renderedRows,
    0,
  );
  if (renderedRows > limits.maxRenderedRows) {
    return { kind: "too-complex", reason: "render-limit", approximate: false };
  }

  const materialized = materializeRows(rows, limits);
  const groups = createGroups(materialized.rows);
  const warnings: TextDiffWarning[] = [];
  if (materialized.approximate)
    warnings.push("grapheme-segmentation-approximate");
  if (materialized.inlineOmitted) warnings.push("inline-diff-omitted");

  return {
    kind: "success",
    identical: originalText === changedText,
    approximate: materialized.approximate,
    warnings,
    stats: {
      originalLines: original.length,
      changedLines: changed.length,
      addedLines,
      deletedLines,
      unchangedLines: materialized.rows.filter(
        (row) => row.kind === "unchanged",
      ).length,
      changedRows: materialized.rows.filter((row) => row.kind !== "unchanged")
        .length,
    },
    groups,
  };
}
