import { format } from "prettier/standalone";
import htmlPlugin from "prettier/plugins/html";

export type HtmlIndent = 2 | 4 | "tab";

export type HtmlFormatOptions = {
  indent?: HtmlIndent;
  printWidth?: number;
};

export type HtmlIssueCode = "SyntaxError";

export type HtmlIssue = {
  code: HtmlIssueCode;
  line?: number;
  column?: number;
};

export class HtmlInputError extends Error {
  constructor(public readonly issue: HtmlIssue) {
    super(
      [issue.code, issue.line, issue.column]
        .filter((value) => value !== undefined)
        .join(":"),
    );
    this.name = "HtmlInputError";
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

function toHtmlInputError(error: unknown): HtmlInputError {
  const located = error as PrettierLocatedError;
  const line = located.loc?.start?.line;
  const column = located.loc?.start?.column;
  return new HtmlInputError({
    code: "SyntaxError",
    line: typeof line === "number" ? line : undefined,
    column: typeof column === "number" ? column : undefined,
  });
}

/**
 * Formats HTML source text with Prettier's HTML parser. This function does not
 * render, execute, sanitize, or minify the input.
 */
export async function formatHtml(
  input: string,
  options: HtmlFormatOptions = {},
): Promise<string> {
  const indent = options.indent ?? 2;
  try {
    return await format(input, {
      parser: "html",
      plugins: [htmlPlugin],
      printWidth: options.printWidth ?? 80,
      tabWidth: indent === "tab" ? 2 : indent,
      useTabs: indent === "tab",
      endOfLine: "lf",
    });
  } catch (error) {
    throw toHtmlInputError(error);
  }
}
