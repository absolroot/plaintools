export const FORMATTER_WORKER_TIMEOUT_MS = 5_000;
export const FORMATTER_MAX_OUTPUT_BYTES = 20 * 1024 * 1024;
export const FORMATTER_INPUT_LIMITS = {
  html: { auto: 64 * 1024, max: 1024 * 1024 },
  css: { auto: 256 * 1024, max: 2 * 1024 * 1024 },
  javascript: { auto: 256 * 1024, max: 2 * 1024 * 1024 },
  sql: { auto: 8 * 1024, max: 32 * 1024 },
} as const;

export function formatterOutputWithinLimit(output: string): boolean {
  if (output.length > FORMATTER_MAX_OUTPUT_BYTES) return false;
  if (output.length <= Math.floor(FORMATTER_MAX_OUTPUT_BYTES / 3)) return true;
  return (
    new TextEncoder().encode(output).byteLength <= FORMATTER_MAX_OUTPUT_BYTES
  );
}
