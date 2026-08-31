import { describe, expect, it } from "vitest";
import {
  addToDate,
  calculateAge,
  DateInputError,
  differenceBetweenDates,
} from "./index";

describe("date difference", () => {
  it("counts total days without depending on time zones or daylight saving", () => {
    expect(differenceBetweenDates("2026-03-07", "2026-03-09")).toMatchObject({
      direction: "forward",
      totalDays: 2,
      weeks: 0,
      remainingDays: 2,
      dDayOffset: 2,
    });
  });

  it("supports inclusive counting and reversed dates", () => {
    expect(
      differenceBetweenDates("2026-01-03", "2026-01-01", true),
    ).toMatchObject({
      direction: "backward",
      totalDays: 3,
      dDayOffset: -2,
    });
    expect(
      differenceBetweenDates("2026-01-01", "2026-01-01", true),
    ).toMatchObject({ direction: "same", totalDays: 1, days: 1 });
  });

  it("uses the Gregorian leap-year rules", () => {
    expect(differenceBetweenDates("2024-02-28", "2024-03-01").totalDays).toBe(
      2,
    );
    expect(differenceBetweenDates("1900-02-28", "1900-03-01").totalDays).toBe(
      1,
    );
    expect(differenceBetweenDates("2000-02-28", "2000-03-01").totalDays).toBe(
      2,
    );
  });
});

describe("date math", () => {
  it("adds and subtracts calendar units", () => {
    expect(
      addToDate("2026-01-15", "add", {
        years: 1,
        months: 2,
        weeks: 1,
        days: 3,
      }).date,
    ).toBe("2027-03-25");
    expect(
      addToDate("2026-03-01", "subtract", {
        years: 0,
        months: 0,
        weeks: 0,
        days: 1,
      }).date,
    ).toBe("2026-02-28");
  });

  it("constrains month-end results and rejects invalid amounts", () => {
    expect(
      addToDate("2025-01-31", "add", {
        years: 0,
        months: 1,
        weeks: 0,
        days: 0,
      }).date,
    ).toBe("2025-02-28");
    expect(() =>
      addToDate("2025-01-31", "add", {
        years: 0,
        months: -1,
        weeks: 0,
        days: 0,
      }),
    ).toThrowError(DateInputError);
  });
});

describe("age calculation", () => {
  it("returns completed years and the exact calendar span", () => {
    expect(calculateAge("2000-09-01", "2026-08-31")).toMatchObject({
      fullYears: 25,
      years: 25,
      months: 11,
      days: 30,
      nextBirthday: "2026-09-01",
      daysUntilNextBirthday: 1,
      ageAtNextBirthday: 26,
    });
  });

  it("treats February 28 as the observed birthday for Feb 29 in common years", () => {
    expect(calculateAge("2000-02-29", "2025-02-28")).toMatchObject({
      fullYears: 25,
      nextBirthday: "2025-02-28",
      daysUntilNextBirthday: 0,
    });
  });

  it("rejects impossible dates and births after the reference date", () => {
    expect(() => calculateAge("2026-02-30", "2026-08-31")).toThrowError(
      expect.objectContaining({ code: "invalid-date" }),
    );
    expect(() => calculateAge("2027-01-01", "2026-08-31")).toThrowError(
      expect.objectContaining({ code: "birth-after-reference" }),
    );
  });
});
