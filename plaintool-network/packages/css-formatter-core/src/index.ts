import { format } from "prettier/standalone";
import postcssPlugin from "prettier/plugins/postcss";

export type CssIndent = 2 | 4 | "tab";

export type CssFormatOptions = {
  indent?: CssIndent;
  printWidth?: number;
};

export type CssIssueCode = "SyntaxError";

export type CssIssue = {
  code: CssIssueCode;
  line?: number;
  column?: number;
};

export class CssInputError extends Error {
  constructor(public readonly issue: CssIssue) {
    super(
      [issue.code, issue.line, issue.column]
        .filter((value) => value !== undefined)
        .join(":"),
    );
    this.name = "CssInputError";
  }
}

type PrettierLocatedError = {
  loc?: {
    start?: {
      line?: unknown;
      column?: unknown;
    };
  };
};

function toCssInputError(error: unknown): CssInputError {
  const located = error as PrettierLocatedError;
  const line = located.loc?.start?.line;
  const column = located.loc?.start?.column;
  return new CssInputError({
    code: "SyntaxError",
    line: typeof line === "number" ? line : undefined,
    column: typeof column === "number" ? column : undefined,
  });
}

/**
 * Formats plain CSS source text. It does not load URLs, apply styles, render,
 * sanitize, execute, or minify the input.
 */
export async function formatCss(
  input: string,
  options: CssFormatOptions = {},
): Promise<string> {
  const indent = options.indent ?? 2;
  try {
    return await format(input, {
      parser: "css",
      plugins: [postcssPlugin],
      printWidth: options.printWidth ?? 80,
      tabWidth: indent === "tab" ? 2 : indent,
      useTabs: indent === "tab",
      endOfLine: "lf",
    });
  } catch (error) {
    throw toCssInputError(error);
  }
}
