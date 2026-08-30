import { formatJavaScript } from "./format";
import { minifyJavaScript } from "./minify";
import type { JavaScriptProcessOptions } from "./shared";

export * from "./format";
export * from "./minify";
export * from "./shared";

export function processJavaScript(
  input: string,
  options: JavaScriptProcessOptions,
): Promise<string> {
  return options.mode === "format"
    ? formatJavaScript(input, options)
    : minifyJavaScript(input, options);
}
