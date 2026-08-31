import { describe, expect, it } from "vitest";
import { parseQaNetworkTarget } from "./qa-network-args.mjs";

describe("parseQaNetworkTarget", () => {
  it("keeps preview as the no-argument default", () => {
    expect(parseQaNetworkTarget([])).toBe("preview");
  });

  it.each(["preview", "production"])(
    "accepts npm 11's positional %s target",
    (target) => {
      expect(parseQaNetworkTarget([target])).toBe(target);
    },
  );

  it.each(["preview", "production"])(
    "accepts the explicit --target %s form",
    (target) => {
      expect(parseQaNetworkTarget(["--target", target])).toBe(target);
    },
  );

  it.each([
    ["staging"],
    ["--target"],
    ["--target", "staging"],
    ["production", "preview"],
    ["--target", "production", "extra"],
  ])("rejects unknown, incomplete, or ambiguous arguments: %j", (...args) => {
    expect(() => parseQaNetworkTarget(args)).toThrow(
      "qa-network requires --target preview|production.",
    );
  });
});
