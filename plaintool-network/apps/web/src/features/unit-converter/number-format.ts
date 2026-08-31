const plainNumberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/iu;

function normalizeDigits(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/gu, (digit) =>
      String(digit.codePointAt(0)! - 0x0660),
    )
    .replace(/[\u06f0-\u06f9]/gu, (digit) =>
      String(digit.codePointAt(0)! - 0x06f0),
    )
    .replace(/\u2212/gu, "-");
}

function numberLocale(locale: string): string {
  return locale === "ar" ? "ar-EG" : locale;
}

function decimalSeparator(locale: string): string {
  return (
    new Intl.NumberFormat(numberLocale(locale))
      .formatToParts(1.1)
      .find((part) => part.type === "decimal")?.value ?? "."
  );
}

/**
 * Parse an ungrouped number using the route locale's decimal separator.
 * A period remains available as a keyboard-friendly decimal fallback, while
 * mixed separators are rejected rather than guessed as decimal/grouping.
 */
export function parseLocalizedNumber(
  raw: string,
  locale: string,
): number | null {
  let normalized = normalizeDigits(raw.trim());
  if (!normalized) return null;

  const decimal = decimalSeparator(locale);
  const allowedDecimals = new Set([".", decimal]);
  const usedDecimals = [".", ",", "٫"].filter((candidate) =>
    normalized.includes(candidate),
  );
  if (
    usedDecimals.length > 1 ||
    (usedDecimals[0] && !allowedDecimals.has(usedDecimals[0]))
  )
    return null;
  if (usedDecimals[0] && usedDecimals[0] !== ".")
    normalized = normalized.replace(usedDecimals[0], ".");

  if (!plainNumberPattern.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatLocalizedNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(numberLocale(locale), {
    maximumSignificantDigits: 12,
    useGrouping: false,
  }).format(value);
}
