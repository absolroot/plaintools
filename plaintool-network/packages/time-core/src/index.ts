import { Temporal } from "temporal-polyfill";

export type TimestampUnit = "auto" | "seconds" | "milliseconds";
export type Disambiguation = "reject" | "earlier" | "later";
export type TimeInputErrorCode =
  | "invalid"
  | "invalid-zone"
  | "ambiguous-unit"
  | "nonexistent-time"
  | "repeated-time"
  | "out-of-range";

export interface TimeConversion {
  instant: string;
  zoned: string;
  unixSeconds: string;
  unixMilliseconds: string;
  y2038Warning: boolean;
}

export interface ZonedTimeValue {
  timeZone: string;
  localDateTime: string;
  offset: string;
  offsetMinutes: number;
  dayDifference: number;
}

export interface TimeZoneConversion {
  instant: string;
  source: ZonedTimeValue;
  targets: ZonedTimeValue[];
}

export class TimeInputError extends Error {
  constructor(public readonly code: TimeInputErrorCode) {
    super(code);
  }
}

function makeResult(
  instant: Temporal.Instant,
  timeZone: string,
): TimeConversion {
  const nanoseconds = instant.epochNanoseconds;
  const sign = nanoseconds < 0n ? "-" : "";
  const absolute = nanoseconds < 0n ? -nanoseconds : nanoseconds;
  const secondsWhole = absolute / 1_000_000_000n;
  const remainder = absolute % 1_000_000_000n;
  const fraction =
    remainder === 0n
      ? ""
      : `.${remainder.toString().replace("-", "").padStart(9, "0").replace(/0+$/u, "")}`;
  const seconds = `${sign}${secondsWhole}${fraction}`;
  let zoned: string;
  try {
    zoned = instant.toZonedDateTimeISO(timeZone).toString();
  } catch {
    throw new TimeInputError("invalid-zone");
  }
  return {
    instant: instant.toString(),
    zoned,
    unixSeconds: seconds,
    unixMilliseconds: String(instant.epochMilliseconds),
    y2038Warning:
      nanoseconds > 2_147_483_647_999_999_999n ||
      nanoseconds < -2_147_483_648_000_000_000n,
  };
}

function secondsToNanoseconds(value: string): bigint {
  const match = /^([+-]?)(\d+)(?:\.(\d{1,9}))?$/u.exec(value);
  if (!match) throw new TimeInputError("invalid");
  const sign = match[1] === "-" ? -1n : 1n;
  const whole = BigInt(match[2]);
  const fractional = BigInt((match[3] ?? "").padEnd(9, "0") || "0");
  return sign * (whole * 1_000_000_000n + fractional);
}

export function detectTimestampUnit(
  value: string,
): Exclude<TimestampUnit, "auto"> {
  if (/^[+-]?\d+\.\d{1,9}$/u.test(value)) return "seconds";
  const match = /^[+-]?(\d+)$/u.exec(value);
  if (!match) throw new TimeInputError("invalid");
  const digits = match[1].length;
  if (digits <= 10) return "seconds";
  if (digits === 13) return "milliseconds";
  if (digits === 11 || digits === 12)
    throw new TimeInputError("ambiguous-unit");
  throw new TimeInputError("invalid");
}

export function timestampToDate(
  value: string,
  unit: TimestampUnit,
  timeZone = "UTC",
): TimeConversion {
  const normalized = value.trim();
  const resolvedUnit = unit === "auto" ? detectTimestampUnit(normalized) : unit;
  let instant: Temporal.Instant;
  try {
    if (resolvedUnit === "milliseconds" && !/^[+-]?\d+$/u.test(normalized))
      throw new TimeInputError("invalid");
    instant =
      resolvedUnit === "seconds"
        ? Temporal.Instant.fromEpochNanoseconds(
            secondsToNanoseconds(normalized),
          )
        : Temporal.Instant.fromEpochMilliseconds(Number(BigInt(normalized)));
  } catch (error) {
    if (error instanceof TimeInputError) throw error;
    throw new TimeInputError("out-of-range");
  }
  return makeResult(instant, timeZone);
}

export function dateToTimestamp(
  value: string,
  timeZone: string,
  disambiguation: Disambiguation = "reject",
): TimeConversion {
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?$/u.test(
      value.trim(),
    )
  )
    throw new TimeInputError("invalid");
  let plain: Temporal.PlainDateTime;
  try {
    plain = Temporal.PlainDateTime.from(value.trim());
  } catch {
    throw new TimeInputError("invalid");
  }
  try {
    Temporal.Instant.fromEpochMilliseconds(0).toZonedDateTimeISO(timeZone);
  } catch {
    throw new TimeInputError("invalid-zone");
  }
  try {
    const zoned = plain.toZonedDateTime(timeZone, { disambiguation });
    return makeResult(zoned.toInstant(), timeZone);
  } catch (error) {
    if (error instanceof RangeError && disambiguation === "reject") {
      try {
        const earlier = plain.toZonedDateTime(timeZone, {
          disambiguation: "earlier",
        });
        const later = plain.toZonedDateTime(timeZone, {
          disambiguation: "later",
        });
        if (!earlier.equals(later)) {
          const repeats =
            earlier.toPlainDateTime().equals(plain) &&
            later.toPlainDateTime().equals(plain);
          throw new TimeInputError(
            repeats ? "repeated-time" : "nonexistent-time",
          );
        }
      } catch (resolutionError) {
        if (resolutionError instanceof TimeInputError) throw resolutionError;
      }
    }
    throw new TimeInputError("invalid");
  }
}

function zonedValue(
  instant: Temporal.Instant,
  timeZone: string,
  sourceDate?: Temporal.PlainDate,
): ZonedTimeValue {
  let zoned: Temporal.ZonedDateTime;
  try {
    zoned = instant.toZonedDateTimeISO(timeZone);
  } catch {
    throw new TimeInputError("invalid-zone");
  }
  const date = zoned.toPlainDate();
  return {
    timeZone,
    localDateTime: zoned.toPlainDateTime().toString(),
    offset: zoned.offset,
    offsetMinutes: zoned.offsetNanoseconds / 60_000_000_000,
    dayDifference: sourceDate ? sourceDate.until(date).days : 0,
  };
}

export function convertInstantBetweenTimeZones(
  instantValue: string,
  sourceTimeZone: string,
  targetTimeZones: readonly string[],
): TimeZoneConversion {
  let instant: Temporal.Instant;
  try {
    instant = Temporal.Instant.from(instantValue);
  } catch {
    throw new TimeInputError("invalid");
  }
  const source = zonedValue(instant, sourceTimeZone);
  const sourceDate = Temporal.PlainDate.from(source.localDateTime.slice(0, 10));
  return {
    instant: instant.toString(),
    source,
    targets: targetTimeZones.map((timeZone) =>
      zonedValue(instant, timeZone, sourceDate),
    ),
  };
}

export function convertBetweenTimeZones(
  localDateTime: string,
  sourceTimeZone: string,
  targetTimeZones: readonly string[],
  disambiguation: Disambiguation = "reject",
): TimeZoneConversion {
  const source = dateToTimestamp(localDateTime, sourceTimeZone, disambiguation);
  return convertInstantBetweenTimeZones(
    source.instant,
    sourceTimeZone,
    targetTimeZones,
  );
}
