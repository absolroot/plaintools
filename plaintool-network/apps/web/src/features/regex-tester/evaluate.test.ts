import { describe, expect, it } from "vitest";
import { evaluateRegex } from "./evaluate";

describe("evaluateRegex", () => {
  it("returns every JavaScript match and capture group", () => {
    expect(evaluateRegex("(ab)(c)?", "g", "abc ab")).toEqual({
      valid: true,
      truncated: false,
      matches: [
        { index: 0, value: "abc", groups: ["ab", "c"] },
        { index: 4, value: "ab", groups: ["ab", undefined] },
      ],
    });
  });

  it("reports invalid expressions without throwing", () => {
    expect(evaluateRegex("[", "", "text").valid).toBe(false);
  });

  it("does not mutate a caller-selected global flag", () => {
    expect(evaluateRegex("a", "i", "Aa")).toMatchObject({
      valid: true,
      matches: [{ index: 0 }, { index: 1 }],
    });
  });
});
