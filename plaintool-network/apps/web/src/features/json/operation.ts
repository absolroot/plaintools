import type { JsonOperation } from "./contract";

export function jsonOperationUsesIndent(operation: JsonOperation): boolean {
  return operation === "format";
}

export function jsonDownloadFilename(
  operation: "format" | "minify",
): "formatted.json" | "minified.json" {
  return operation === "minify" ? "minified.json" : "formatted.json";
}
