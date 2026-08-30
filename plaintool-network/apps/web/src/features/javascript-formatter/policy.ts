import type { JavaScriptFormatterMode } from "@plaintool/javascript-formatter-core";

export const JAVASCRIPT_MAX_BYTES = 10 * 1024 * 1024;
export const JAVASCRIPT_AUTO_BYTES = 1024 * 1024;

export type JavaScriptRunPolicy = "automatic" | "manual" | "too-large";

export function javascriptRunPolicy(byteLength: number): JavaScriptRunPolicy {
  if (byteLength > JAVASCRIPT_MAX_BYTES) return "too-large";
  if (byteLength > JAVASCRIPT_AUTO_BYTES) return "manual";
  return "automatic";
}

export function javascriptModeUsesFormatOptions(
  mode: JavaScriptFormatterMode,
): boolean {
  return mode === "format";
}

export function javascriptDownloadFilename(
  mode: JavaScriptFormatterMode,
  filenames: { format: string; minify: string },
): string {
  return mode === "format" ? filenames.format : filenames.minify;
}
