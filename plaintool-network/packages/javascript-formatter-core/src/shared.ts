export type JavaScriptFormatterMode = "format" | "minify";
export type JavaScriptIndent = 2 | 4 | "tab";
export type JavaScriptIssueCode =
  | "EmptyInput"
  | "SyntaxError"
  | "TransformError";

export interface JavaScriptIssue {
  code: JavaScriptIssueCode;
  line?: number;
  column?: number;
}

export class JavaScriptInputError extends Error {
  constructor(public readonly issue: JavaScriptIssue) {
    super(
      [issue.code, issue.line, issue.column]
        .filter((value) => value !== undefined)
        .join(":"),
    );
    this.name = "JavaScriptInputError";
  }
}

export interface JavaScriptFormatOptions {
  indent?: JavaScriptIndent;
  printWidth?: number;
  semi?: boolean;
  singleQuote?: boolean;
}

export interface JavaScriptMinifyOptions {
  preserveComments?: boolean;
}

export type JavaScriptProcessOptions =
  | ({ mode: "format" } & JavaScriptFormatOptions)
  | ({ mode: "minify" } & JavaScriptMinifyOptions);

type LocatedError = {
  name?: unknown;
  line?: unknown;
  col?: unknown;
  loc?: { start?: { line?: unknown; column?: unknown } };
};

function numericLocation(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

export function toJavaScriptInputError(error: unknown): JavaScriptInputError {
  const located = error as LocatedError;
  const prettierLine = numericLocation(located.loc?.start?.line);
  const prettierColumn = numericLocation(located.loc?.start?.column);
  const terserLine = numericLocation(located.line);
  const terserColumn = numericLocation(located.col);
  const name = typeof located.name === "string" ? located.name : "";
  return new JavaScriptInputError({
    code:
      name === "SyntaxError" ||
      name === "JS_Parse_Error" ||
      prettierLine !== undefined ||
      terserLine !== undefined
        ? "SyntaxError"
        : "TransformError",
    line: prettierLine ?? terserLine,
    column:
      prettierColumn ??
      (terserColumn === undefined ? undefined : terserColumn + 1),
  });
}

export function assertJavaScriptInput(input: string): void {
  if (!input.trim()) {
    throw new JavaScriptInputError({ code: "EmptyInput" });
  }
}
