import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createDeferredIndicator,
  exceedsUtf8ByteLimit,
  utf8ByteLength,
} from "./tool-dom";

describe("deferred tool indicators", () => {
  afterEach(() => vi.useRealTimers());

  it("does not expose a working state for fast operations", () => {
    vi.useFakeTimers();
    const onShow = vi.fn();
    const indicator = createDeferredIndicator(onShow, 180);

    indicator.begin();
    vi.advanceTimersByTime(179);

    expect(indicator.end()).toBe(false);
    expect(onShow).not.toHaveBeenCalled();
  });

  it("shows a working state once when an operation remains slow", () => {
    vi.useFakeTimers();
    const onShow = vi.fn();
    const indicator = createDeferredIndicator(onShow, 180);

    indicator.begin();
    vi.advanceTimersByTime(180);

    expect(onShow).toHaveBeenCalledTimes(1);
    expect(indicator.end()).toBe(true);
  });

  it("cancels a pending state when newer input supersedes the operation", () => {
    vi.useFakeTimers();
    const onShow = vi.fn();
    const indicator = createDeferredIndicator(onShow, 180);

    indicator.begin();
    indicator.cancel();
    vi.runAllTimers();

    expect(onShow).not.toHaveBeenCalled();
  });
});

describe("UTF-8 input limits", () => {
  it("measures encoded bytes instead of UTF-16 code units", () => {
    expect(utf8ByteLength("가")).toBe(3);
    expect(exceedsUtf8ByteLimit("가", 2)).toBe(true);
    expect(exceedsUtf8ByteLimit("가", 3)).toBe(false);
  });
});
