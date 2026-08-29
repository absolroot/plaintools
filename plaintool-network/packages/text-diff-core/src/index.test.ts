import { afterEach, describe, expect, it, vi } from "vitest";
import {
  compareText,
  DEFAULT_TEXT_DIFF_LIMITS,
  type TextDiffRow,
  type TextDiffSuccess,
} from "./index";

function requireSuccess(
  result: ReturnType<typeof compareText>,
): TextDiffSuccess {
  expect(result.kind).toBe("success");
  if (result.kind !== "success") throw new Error(result.reason);
  return result;
}

function allRows(result: TextDiffSuccess): TextDiffRow[] {
  return result.groups.flatMap((group) => group.rows);
}

function reconstruct(
  result: TextDiffSuccess,
  side: "original" | "changed",
): string {
  return allRows(result)
    .map((row) => row[side]?.raw ?? "")
    .join("");
}

function inlineText(row: TextDiffRow, side: "original" | "changed"): string {
  return row[side]?.segments.map((segment) => segment.text).join("") ?? "";
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("compareText", () => {
  it("returns an explicit identical result for empty input", () => {
    expect(compareText("", "")).toEqual({
      kind: "success",
      identical: true,
      approximate: false,
      warnings: [],
      stats: {
        originalLines: 0,
        changedLines: 0,
        addedLines: 0,
        deletedLines: 0,
        unchangedLines: 0,
        changedRows: 0,
      },
      groups: [],
    });
  });

  it("represents a one-sided input without manufacturing an empty line", () => {
    const added = requireSuccess(compareText("", "one\ntwo"));
    expect(added.stats).toMatchObject({
      originalLines: 0,
      changedLines: 2,
      addedLines: 2,
      deletedLines: 0,
    });
    expect(allRows(added).map((row) => row.kind)).toEqual(["added", "added"]);
    expect(reconstruct(added, "changed")).toBe("one\ntwo");

    const removed = requireSuccess(compareText("one\ntwo", ""));
    expect(allRows(removed).map((row) => row.kind)).toEqual([
      "removed",
      "removed",
    ]);
    expect(reconstruct(removed, "original")).toBe("one\ntwo");
  });

  it("preserves mixed CR, LF, CRLF, and final line endings", () => {
    const original = "alpha\r\nbeta\rgamma\n";
    const changed = "alpha\nbeta\r\ngamma";
    const result = requireSuccess(compareText(original, changed));
    const rows = allRows(result);

    expect(reconstruct(result, "original")).toBe(original);
    expect(reconstruct(result, "changed")).toBe(changed);
    expect(rows.slice(0, 3).map((row) => row.lineEndingChange)).toEqual([
      true,
      true,
      true,
    ]);
    expect(rows[0]?.original?.ending).toBe("crlf");
    expect(rows[0]?.changed?.ending).toBe("lf");
    expect(rows[3]?.kind).toBe("removed");
  });

  it("keeps exact line and inline reconstruction for replacements", () => {
    const original = "First line\nemoji: 👨‍👩‍👧‍👦\nlast";
    const changed = "First line\nemoji: 👨‍👩‍👧‍👦!\nnew last";
    const result = requireSuccess(compareText(original, changed));

    expect(reconstruct(result, "original")).toBe(original);
    expect(reconstruct(result, "changed")).toBe(changed);
    for (const row of allRows(result)) {
      expect(inlineText(row, "original")).toBe(row.original?.text ?? "");
      expect(inlineText(row, "changed")).toBe(row.changed?.text ?? "");
    }

    const emojiRow = allRows(result).find(
      (row) => row.original?.text.startsWith("emoji:") ?? false,
    );
    expect(emojiRow?.changed?.segments).toContainEqual({
      kind: "added",
      text: "!",
    });
    expect(emojiRow?.changed?.segments).toContainEqual({
      kind: "unchanged",
      text: "emoji: 👨‍👩‍👧‍👦",
    });
  });

  it("does not normalize canonically equivalent Unicode", () => {
    const original = "cafe\u0301";
    const changed = "caf\u00e9";
    const result = requireSuccess(compareText(original, changed));
    const row = allRows(result)[0];

    expect(result.identical).toBe(false);
    expect(row?.kind).toBe("changed");
    expect(reconstruct(result, "original")).toBe(original);
    expect(reconstruct(result, "changed")).toBe(changed);
  });

  it("marks whitespace-only content changes separately from line endings", () => {
    const result = requireSuccess(compareText("a b\n ", "ab\n\t"));
    const rows = allRows(result);

    expect(rows).toHaveLength(2);
    expect(rows.every((row) => row.whitespaceOnlyChange)).toBe(true);
    expect(rows.every((row) => !row.lineEndingChange)).toBe(true);
    expect(rows[1]?.original?.whitespaceOnly).toBe(true);
    expect(rows[1]?.changed?.whitespaceOnly).toBe(true);
  });

  it("reports raw additions and deletions independently from paired rows", () => {
    const result = requireSuccess(
      compareText("one\ntwo\nthree", "one\n2\n3\nfour"),
    );

    expect(result.stats).toMatchObject({
      addedLines: 3,
      deletedLines: 2,
      changedRows: 3,
      unchangedLines: 1,
    });
    expect(allRows(result).map((row) => row.kind)).toEqual([
      "unchanged",
      "changed",
      "changed",
      "added",
    ]);
  });

  it("preserves every row while supplying deterministic collapse metadata", () => {
    const input = Array.from(
      { length: 10 },
      (_, index) => `line ${index}`,
    ).join("\n");
    const result = requireSuccess(compareText(input, input));

    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]?.rows).toHaveLength(10);
    expect(result.groups[0]?.collapse).toEqual({
      collapsible: true,
      contextRows: 3,
      hiddenRows: 4,
      renderedRows: 7,
    });
    expect(reconstruct(result, "original")).toBe(input);
  });

  it("returns a typed line-diff limit result", () => {
    expect(
      compareText("alpha", "omega", {
        maxEditLength: 0,
      }),
    ).toEqual({
      kind: "too-complex",
      reason: "line-diff",
      approximate: false,
    });
  });

  it("returns a typed render limit after unchanged context is collapsed", () => {
    const original = Array.from({ length: 8 }, (_, index) => `a${index}`).join(
      "\n",
    );
    const changed = Array.from({ length: 8 }, (_, index) => `b${index}`).join(
      "\n",
    );

    expect(
      compareText(original, changed, {
        maxEditLength: 32,
        maxRenderedRows: 7,
      }),
    ).toEqual({
      kind: "too-complex",
      reason: "render-limit",
      approximate: false,
    });

    const identical = requireSuccess(
      compareText(original, original, { maxRenderedRows: 7 }),
    );
    expect(identical.groups[0]?.collapse.renderedRows).toBe(7);
  });

  it("falls back to whole-line segments when inline work exceeds its limits", () => {
    const result = requireSuccess(
      compareText("abcdefgh", "12345678", {
        inlineGraphemeLimit: 4,
      }),
    );
    const row = allRows(result)[0];

    expect(result.warnings).toContain("inline-diff-omitted");
    expect(row?.original?.segments).toEqual([
      { kind: "removed", text: "abcdefgh" },
    ]);
    expect(row?.changed?.segments).toEqual([
      { kind: "added", text: "12345678" },
    ]);
  });

  it("uses code-point fallback with an explicit approximation warning", () => {
    vi.stubGlobal("Intl", { Segmenter: undefined });
    const result = requireSuccess(compareText("👨‍👩‍👧‍👦", "👨‍👩‍👧‍👦!"));

    expect(result.approximate).toBe(true);
    expect(result.warnings).toContain("grapheme-segmentation-approximate");
    expect(reconstruct(result, "original")).toBe("👨‍👩‍👧‍👦");
    expect(reconstruct(result, "changed")).toBe("👨‍👩‍👧‍👦!");
  });

  it("normalizes invalid limit overrides without changing the public defaults", () => {
    const result = requireSuccess(
      compareText("same", "same", {
        timeoutMs: Number.NaN,
        maxEditLength: -10,
        inlineGraphemeLimit: -10,
        inlineMaxEditLength: -10,
        maxRenderedRows: -10,
      }),
    );

    expect(result.identical).toBe(true);
    expect(DEFAULT_TEXT_DIFF_LIMITS).toEqual({
      timeoutMs: 1_200,
      maxEditLength: 4_000,
      inlineGraphemeLimit: 20_000,
      inlineMaxEditLength: 256,
      maxRenderedRows: 8_000,
    });
  });
});

describe("seeded reconstruction invariants", () => {
  it("preserves both sides across deterministic mixed Unicode edits", () => {
    let seed = 0x5eed1234;
    const next = () => {
      seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
      return seed;
    };
    const atoms = ["a", "ß", "한", "e\u0301", "👩‍💻", " ", "\t"];
    const endings = ["\n", "\r\n", "\r", ""];

    for (let caseIndex = 0; caseIndex < 80; caseIndex += 1) {
      const makeText = () => {
        const lineCount = next() % 12;
        let text = "";
        for (let line = 0; line < lineCount; line += 1) {
          const atomCount = next() % 6;
          for (let atom = 0; atom < atomCount; atom += 1) {
            text += atoms[next() % atoms.length];
          }
          if (line < lineCount - 1 || next() % 3 === 0) {
            text += endings[next() % (endings.length - 1)];
          }
        }
        return text;
      };
      const original = makeText();
      const changed = makeText();
      const result = requireSuccess(
        compareText(original, changed, {
          maxEditLength: 64,
          maxRenderedRows: 128,
        }),
      );

      expect(reconstruct(result, "original")).toBe(original);
      expect(reconstruct(result, "changed")).toBe(changed);
      for (const row of allRows(result)) {
        expect(inlineText(row, "original")).toBe(row.original?.text ?? "");
        expect(inlineText(row, "changed")).toBe(row.changed?.text ?? "");
      }
    }
  });
});
