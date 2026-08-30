import { describe, expect, it } from "vitest";
import {
  JAVASCRIPT_AUTO_BYTES,
  JAVASCRIPT_MAX_BYTES,
  javascriptDownloadFilename,
  javascriptModeUsesFormatOptions,
  javascriptRunPolicy,
} from "./policy";

describe("JavaScript formatter browser policy", () => {
  it.each([
    [JAVASCRIPT_AUTO_BYTES, "automatic"],
    [JAVASCRIPT_AUTO_BYTES + 1, "manual"],
    [JAVASCRIPT_MAX_BYTES, "manual"],
    [JAVASCRIPT_MAX_BYTES + 1, "too-large"],
  ] as const)("maps %s bytes to %s", (bytes, expected) => {
    expect(javascriptRunPolicy(bytes)).toBe(expected);
  });

  it("enables indentation and other print settings only in Format mode", () => {
    expect(javascriptModeUsesFormatOptions("format")).toBe(true);
    expect(javascriptModeUsesFormatOptions("minify")).toBe(false);
  });

  it("selects the injected filename for the committed mode", () => {
    const filenames = {
      format: "formatted-localized.js",
      minify: "minified-localized.js",
    };
    expect(javascriptDownloadFilename("format", filenames)).toBe(
      "formatted-localized.js",
    );
    expect(javascriptDownloadFilename("minify", filenames)).toBe(
      "minified-localized.js",
    );
  });
});
