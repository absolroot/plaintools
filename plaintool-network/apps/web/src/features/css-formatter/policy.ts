import { FORMATTER_INPUT_LIMITS } from "../../scripts/shared/formatter-resource-policy";

export const CSS_AUTO_BYTES = FORMATTER_INPUT_LIMITS.css.auto;
export const CSS_MAX_BYTES = FORMATTER_INPUT_LIMITS.css.max;

export type CssInputPolicy = "empty" | "auto" | "manual" | "too-large";

export function classifyCssInputBytes(bytes: number): CssInputPolicy {
  if (bytes <= 0) return "empty";
  if (bytes > CSS_MAX_BYTES) return "too-large";
  if (bytes > CSS_AUTO_BYTES) return "manual";
  return "auto";
}
