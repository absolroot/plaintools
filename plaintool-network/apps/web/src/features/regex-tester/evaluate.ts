import type { RegexEvaluation, RegexMatch, RegexReplacement } from "./contract";

export const MAX_REGEX_EXPRESSION_LENGTH = 4_096;
export const MAX_REGEX_TEXT_LENGTH = 250_000;
export const MAX_REGEX_REPLACEMENT_LENGTH = 2_000;
export const MAX_REGEX_MATCHES = 500;

const MAX_MATCH_VALUE_LENGTH = 2_000;
const MAX_CAPTURE_GROUPS = 50;

function clipped(value: string | undefined): string | undefined {
  if (value === undefined || value.length <= MAX_MATCH_VALUE_LENGTH)
    return value;
  return `${value.slice(0, MAX_MATCH_VALUE_LENGTH)}…`;
}

function advanceAfterEmptyMatch(regex: RegExp, text: string): void {
  const index = regex.lastIndex;
  if (!regex.unicode || index >= text.length) {
    regex.lastIndex = index + 1;
    return;
  }
  const first = text.charCodeAt(index);
  const second = text.charCodeAt(index + 1);
  const surrogatePair =
    first >= 0xd800 && first <= 0xdbff && second >= 0xdc00 && second <= 0xdfff;
  regex.lastIndex = index + (surrogatePair ? 2 : 1);
}

function toMatch(match: RegExpExecArray): RegexMatch {
  return {
    index: match.index,
    value: clipped(match[0]) ?? "",
    groups: match.slice(1, MAX_CAPTURE_GROUPS + 1).map(clipped),
  };
}

export function evaluateRegex(
  expression: string,
  flags: string,
  text: string,
): RegexEvaluation {
  try {
    const regex = new RegExp(expression, flags);
    const first = regex.exec(text);
    if (!first) return { valid: true, matches: [], truncated: false };
    if (!regex.global) {
      return { valid: true, matches: [toMatch(first)], truncated: false };
    }

    const matches = [toMatch(first)];
    if (first[0] === "") advanceAfterEmptyMatch(regex, text);
    while (matches.length <= MAX_REGEX_MATCHES) {
      const match = regex.exec(text);
      if (!match) break;
      if (matches.length === MAX_REGEX_MATCHES) {
        return { valid: true, matches, truncated: true };
      }
      matches.push(toMatch(match));
      if (match[0] === "") advanceAfterEmptyMatch(regex, text);
    }
    return { valid: true, matches, truncated: false };
  } catch {
    return { valid: false, reason: "invalid-pattern" };
  }
}

export function replaceAllRegex(
  expression: string,
  flags: string,
  text: string,
  replacement: string,
): RegexReplacement {
  const globalFlags = flags.includes("g") ? flags : `${flags}g`;
  const evaluation = evaluateRegex(expression, globalFlags, text);
  if (!evaluation.valid) {
    return { ok: false, reason: "invalid-pattern" };
  }
  if (evaluation.truncated) return { ok: false, reason: "too-many-matches" };
  try {
    return {
      ok: true,
      output: text.replace(new RegExp(expression, globalFlags), replacement),
    };
  } catch {
    return { ok: false, reason: "invalid-pattern" };
  }
}
