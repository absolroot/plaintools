import { describe, expect, it } from "vitest";
import {
  convertBetweenTimeZones,
  convertInstantBetweenTimeZones,
  dateToTimestamp,
  detectTimestampUnit,
  TimeInputError,
  timestampToDate,
} from "./index";

describe("timestamp conversion", () => {
  it("supports epoch zero and negative values", () => {
    expect(timestampToDate("0", "auto").instant).toBe("1970-01-01T00:00:00Z");
    expect(timestampToDate("-1", "seconds").instant).toBe(
      "1969-12-31T23:59:59Z",
    );
  });

  it("preserves fractional seconds", () => {
    expect(timestampToDate("0.125", "seconds").unixMilliseconds).toBe("125");
    expect(timestampToDate("-0.125", "seconds").unixSeconds).toBe("-0.125");
  });

  it("detects seconds and milliseconds but rejects 11-12 digits", () => {
    expect(detectTimestampUnit("1710000000")).toBe("seconds");
    expect(detectTimestampUnit("1710000000000")).toBe("milliseconds");
    expect(() => detectTimestampUnit("17100000000")).toThrowError(
      TimeInputError,
    );
  });

  it("rejects DST gaps by default and allows explicit resolution", () => {
    expect(() =>
      dateToTimestamp("2024-03-10T02:30", "America/New_York"),
    ).toThrowError(expect.objectContaining({ code: "nonexistent-time" }));
    expect(
      dateToTimestamp("2024-03-10T02:30", "America/New_York", "later").instant,
    ).toBe("2024-03-10T07:30:00Z");
  });

  it("distinguishes repeated local times from DST gaps", () => {
    expect(() =>
      dateToTimestamp("2024-11-03T01:30", "America/New_York"),
    ).toThrowError(expect.objectContaining({ code: "repeated-time" }));
  });

  it("supports fixed UTC offsets without daylight-saving ambiguity", () => {
    expect(timestampToDate("0", "seconds", "+09:00").zoned).toBe(
      "1970-01-01T09:00:00+09:00[+09:00]",
    );
    expect(dateToTimestamp("1970-01-01T09:00", "+09:00").unixSeconds).toBe("0");
  });

  it("does not mislabel invalid dates or zones as DST ambiguity", () => {
    expect(() => dateToTimestamp("2024-02-31T10:00", "UTC")).toThrowError(
      expect.objectContaining({ code: "invalid" }),
    );
    expect(() =>
      dateToTimestamp("2024-02-01T10:00", "Not/A_Zone"),
    ).toThrowError(expect.objectContaining({ code: "invalid-zone" }));
    expect(() => timestampToDate("0", "seconds", "Not/A_Zone")).toThrowError(
      expect.objectContaining({ code: "invalid-zone" }),
    );
  });

  it("distinguishes malformed values from out-of-range timestamps", () => {
    expect(() => timestampToDate("1.5", "milliseconds")).toThrowError(
      expect.objectContaining({ code: "invalid" }),
    );
    expect(() =>
      timestampToDate("999999999999999999999", "milliseconds"),
    ).toThrowError(expect.objectContaining({ code: "out-of-range" }));
  });

  it("flags values outside signed 32-bit seconds", () => {
    expect(timestampToDate("2147483648", "seconds").y2038Warning).toBe(true);
  });
});

describe("time zone conversion", () => {
  it("converts one Seoul wall time across zones and reports date changes", () => {
    const result = convertBetweenTimeZones("2026-08-31T09:00", "Asia/Seoul", [
      "America/New_York",
      "Europe/London",
    ]);

    expect(result.instant).toBe("2026-08-31T00:00:00Z");
    expect(result.source).toMatchObject({
      localDateTime: "2026-08-31T09:00:00",
      offset: "+09:00",
      dayDifference: 0,
    });
    expect(result.targets[0]).toMatchObject({
      localDateTime: "2026-08-30T20:00:00",
      offset: "-04:00",
      dayDifference: -1,
    });
    expect(result.targets[1]).toMatchObject({
      localDateTime: "2026-08-31T01:00:00",
      offset: "+01:00",
      dayDifference: 0,
    });
  });

  it("keeps half-hour and quarter-hour offsets exact", () => {
    const result = convertInstantBetweenTimeZones(
      "2026-01-01T00:00:00Z",
      "UTC",
      ["Asia/Kolkata", "Asia/Kathmandu"],
    );
    expect(result.targets.map(({ offset }) => offset)).toEqual([
      "+05:30",
      "+05:45",
    ]);
  });

  it("uses the selected date's daylight-saving rules", () => {
    const winter = convertBetweenTimeZones(
      "2026-01-15T12:00",
      "America/New_York",
      ["Europe/London"],
    );
    const summer = convertBetweenTimeZones(
      "2026-07-15T12:00",
      "America/New_York",
      ["Europe/London"],
    );
    expect(winter.source.offset).toBe("-05:00");
    expect(summer.source.offset).toBe("-04:00");
    expect(winter.targets[0].offset).toBe("+00:00");
    expect(summer.targets[0].offset).toBe("+01:00");
  });

  it("rejects missing and repeated source wall times", () => {
    expect(() =>
      convertBetweenTimeZones("2026-03-08T02:30", "America/New_York", ["UTC"]),
    ).toThrowError(expect.objectContaining({ code: "nonexistent-time" }));
    expect(() =>
      convertBetweenTimeZones("2026-11-01T01:30", "America/New_York", ["UTC"]),
    ).toThrowError(expect.objectContaining({ code: "repeated-time" }));
  });

  it("rejects an invalid destination zone", () => {
    expect(() =>
      convertBetweenTimeZones("2026-08-31T09:00", "Asia/Seoul", ["Moon/Base"]),
    ).toThrowError(expect.objectContaining({ code: "invalid-zone" }));
  });
});
