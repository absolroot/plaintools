import { Temporal } from "temporal-polyfill";

export type DateDirection = "forward" | "same" | "backward";
export type DateMathOperation = "add" | "subtract";
export type DateInputErrorCode =
  | "invalid-date"
  | "invalid-amount"
  | "birth-after-reference"
  | "out-of-range";

export interface CalendarSpan {
  years: number;
  months: number;
  days: number;
}

export interface DateDifferenceResult extends CalendarSpan {
  direction: DateDirection;
  totalDays: number;
  weeks: number;
  remainingDays: number;
  dDayOffset: number;
  inclusive: boolean;
}

export interface DateMathAmounts {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

export interface DateMathResult {
  date: string;
  weekday: number;
}

export interface AgeResult extends CalendarSpan {
  fullYears: number;
  totalDays: number;
  nextBirthday: string;
  daysUntilNextBirthday: number;
  ageAtNextBirthday: number;
}

export class DateInputError extends Error {
  constructor(public readonly code: DateInputErrorCode) {
    super(code);
  }
}

function parseDate(value: string): Temporal.PlainDate {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value.trim()))
    throw new DateInputError("invalid-date");
  try {
    return Temporal.PlainDate.from(value.trim(), { overflow: "reject" });
  } catch {
    throw new DateInputError("invalid-date");
  }
}

function calendarSpan(
  start: Temporal.PlainDate,
  end: Temporal.PlainDate,
): CalendarSpan {
  const duration = start.until(end, { largestUnit: "year" });
  return {
    years: duration.years,
    months: duration.months,
    days: duration.days,
  };
}

function compareDates(
  first: Temporal.PlainDate,
  second: Temporal.PlainDate,
): DateDirection {
  const comparison = Temporal.PlainDate.compare(first, second);
  return comparison < 0 ? "forward" : comparison > 0 ? "backward" : "same";
}

export function differenceBetweenDates(
  startValue: string,
  endValue: string,
  includeEndDate = false,
): DateDifferenceResult {
  const start = parseDate(startValue);
  const end = parseDate(endValue);
  const direction = compareDates(start, end);
  const earlier = direction === "backward" ? end : start;
  const later = direction === "backward" ? start : end;
  const countedEnd = includeEndDate ? later.add({ days: 1 }) : later;
  const totalDays = earlier.until(countedEnd, { largestUnit: "day" }).days;
  const span = calendarSpan(earlier, countedEnd);
  const rawOffset = start.until(end, { largestUnit: "day" }).days;

  return {
    ...span,
    direction,
    totalDays,
    weeks: Math.floor(totalDays / 7),
    remainingDays: totalDays % 7,
    dDayOffset: rawOffset,
    inclusive: includeEndDate,
  };
}

function validateAmount(value: number): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > 100_000)
    throw new DateInputError("invalid-amount");
}

export function addToDate(
  dateValue: string,
  operation: DateMathOperation,
  amounts: DateMathAmounts,
): DateMathResult {
  const date = parseDate(dateValue);
  Object.values(amounts).forEach(validateAmount);
  const sign = operation === "subtract" ? -1 : 1;
  try {
    const result = date.add(
      {
        years: sign * amounts.years,
        months: sign * amounts.months,
        weeks: sign * amounts.weeks,
        days: sign * amounts.days,
      },
      { overflow: "constrain" },
    );
    return { date: result.toString(), weekday: result.dayOfWeek };
  } catch {
    throw new DateInputError("out-of-range");
  }
}

function birthdayInYear(
  birthDate: Temporal.PlainDate,
  year: number,
): Temporal.PlainDate {
  return Temporal.PlainDate.from(
    { year, month: birthDate.month, day: birthDate.day },
    { overflow: "constrain" },
  );
}

export function calculateAge(
  birthValue: string,
  referenceValue: string,
): AgeResult {
  const birthDate = parseDate(birthValue);
  const referenceDate = parseDate(referenceValue);
  if (Temporal.PlainDate.compare(birthDate, referenceDate) > 0)
    throw new DateInputError("birth-after-reference");

  let fullYears = referenceDate.year - birthDate.year;
  let completedBirthday = birthdayInYear(birthDate, birthDate.year + fullYears);
  if (Temporal.PlainDate.compare(completedBirthday, referenceDate) > 0) {
    fullYears -= 1;
    completedBirthday = birthdayInYear(birthDate, birthDate.year + fullYears);
  }
  const remainder = completedBirthday.until(referenceDate, {
    largestUnit: "month",
  });
  const span = {
    years: fullYears,
    months: remainder.months,
    days: remainder.days,
  };
  const totalDays = birthDate.until(referenceDate, {
    largestUnit: "day",
  }).days;
  let nextBirthday = birthdayInYear(birthDate, referenceDate.year);
  if (Temporal.PlainDate.compare(nextBirthday, referenceDate) < 0)
    nextBirthday = birthdayInYear(birthDate, referenceDate.year + 1);

  return {
    ...span,
    fullYears,
    totalDays,
    nextBirthday: nextBirthday.toString(),
    daysUntilNextBirthday: referenceDate.until(nextBirthday, {
      largestUnit: "day",
    }).days,
    ageAtNextBirthday: nextBirthday.year - birthDate.year,
  };
}
