export const CSS_AUTO_BYTES = 1024 * 1024;
export const CSS_MAX_BYTES = 10 * 1024 * 1024;

export type CssInputPolicy = "empty" | "auto" | "manual" | "too-large";

export function classifyCssInputBytes(bytes: number): CssInputPolicy {
  if (bytes <= 0) return "empty";
  if (bytes > CSS_MAX_BYTES) return "too-large";
  if (bytes > CSS_AUTO_BYTES) return "manual";
  return "auto";
}
