import type { RegexEvaluation } from "./contract";

const MAX_MATCHES = 500;

export function evaluateRegex(
  expression: string,
  flags: string,
  text: string,
): RegexEvaluation {
  try {
    const normalizedFlags = flags.includes("g") ? flags : `${flags}g`;
    const regex = new RegExp(expression, normalizedFlags);
    const matches = Array.from(text.matchAll(regex), (match) => ({
      index: match.index ?? 0,
      value: match[0],
      groups: match.slice(1),
    }));
    return {
      valid: true,
      matches: matches.slice(0, MAX_MATCHES),
      truncated: matches.length > MAX_MATCHES,
    };
  } catch (error) {
    return {
      valid: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
