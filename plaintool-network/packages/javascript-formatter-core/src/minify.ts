import { minify } from "terser";
import {
  assertJavaScriptInput,
  JavaScriptInputError,
  toJavaScriptInputError,
  type JavaScriptMinifyOptions,
} from "./shared";

type LocatedError = { line?: unknown };

const LEGAL_COMMENT_PATTERN = /^!|@preserve|@license|@cc_on/i;

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
      comments: preserveComments ? "all" : LEGAL_COMMENT_PATTERN,
      semicolons: true,
    },
  });
  if (typeof result.code !== "string" || !result.code) {
    throw new JavaScriptInputError({ code: "TransformError" });
  }
  return result.code;
}

export async function minifyJavaScript(
  input: string,
  options: JavaScriptMinifyOptions = {},
): Promise<string> {
  assertJavaScriptInput(input);
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
