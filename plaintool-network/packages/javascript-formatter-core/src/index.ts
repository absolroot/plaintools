import { format } from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { minify } from "terser";

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
  loc?: {
    start?: {
      line?: unknown;
      column?: unknown;
    };
  };
};

function numericLocation(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function toJavaScriptInputError(error: unknown): JavaScriptInputError {
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

function assertInput(input: string): void {
  if (!input.trim()) {
    throw new JavaScriptInputError({ code: "EmptyInput" });
  }
}

/**
 * Parses and prints JavaScript source with Prettier. The source is never
 * executed, evaluated, rendered, or inserted into a document.
 */
export async function formatJavaScript(
  input: string,
  options: JavaScriptFormatOptions = {},
): Promise<string> {
  assertInput(input);
  const indent = options.indent ?? 2;
  try {
    return await format(input, {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin],
      printWidth: Math.min(240, Math.max(40, options.printWidth ?? 80)),
      tabWidth: indent === "tab" ? 2 : indent,
      useTabs: indent === "tab",
      semi: options.semi ?? true,
      singleQuote: options.singleQuote ?? false,
      endOfLine: "lf",
    });
  } catch (error) {
    throw toJavaScriptInputError(error);
  }
}

async function runTerser(
  input: string,
  module: boolean,
  preserveComments: boolean,
): Promise<string> {
  const result = await minify(input, {
    module,
    compress: false,
    mangle: false,
    sourceMap: false,
    ecma: 2020,
    format: {
      comments: preserveComments ? "all" : false,
      semicolons: true,
    },
  });
  if (typeof result.code !== "string" || !result.code) {
    throw new JavaScriptInputError({ code: "TransformError" });
  }
  return result.code;
}

/**
 * Minifies JavaScript source without compression or identifier mangling.
 * This is a source transform, not a semantic-equivalence guarantee.
 */
export async function minifyJavaScript(
  input: string,
  options: JavaScriptMinifyOptions = {},
): Promise<string> {
  assertInput(input);
  const preserveComments = options.preserveComments ?? false;
  try {
    return await runTerser(input, false, preserveComments);
  } catch (scriptError) {
    try {
      return await runTerser(input, true, preserveComments);
    } catch (moduleError) {
      if (moduleError instanceof JavaScriptInputError) throw moduleError;
      throw toJavaScriptInputError(
        (moduleError as LocatedError).line === undefined
          ? scriptError
          : moduleError,
      );
    }
  }
}

export function processJavaScript(
  input: string,
  options: JavaScriptProcessOptions,
): Promise<string> {
  return options.mode === "format"
    ? formatJavaScript(input, options)
    : minifyJavaScript(input, options);
}
