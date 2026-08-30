import { format } from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import {
  assertJavaScriptInput,
  toJavaScriptInputError,
  type JavaScriptFormatOptions,
} from "./shared";

export async function formatJavaScript(
  input: string,
  options: JavaScriptFormatOptions = {},
): Promise<string> {
  assertJavaScriptInput(input);
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
