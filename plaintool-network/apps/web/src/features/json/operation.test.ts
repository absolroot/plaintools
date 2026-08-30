import { describe, expect, it } from "vitest";
import { jsonDownloadFilename, jsonOperationUsesIndent } from "./operation";

describe("JSON operation presentation", () => {
  it("enables indentation only for format mode", () => {
    expect(jsonOperationUsesIndent("format")).toBe(true);
    expect(jsonOperationUsesIndent("validate")).toBe(false);
    expect(jsonOperationUsesIndent("minify")).toBe(false);
  });

  it("uses a format-specific download filename", () => {
    expect(jsonDownloadFilename("format")).toBe("formatted.json");
  });

  it("uses a minify-specific download filename", () => {
    expect(jsonDownloadFilename("minify")).toBe("minified.json");
  });
});
