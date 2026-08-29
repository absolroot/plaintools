import { describe, expect, it } from "vitest";
import { detectPreferredLocale } from "./locale-detection";

describe("preferred locale detection", () => {
  it.each([
    [["ko-KR"], "ko"],
    [["de-CH"], "de"],
    [["pt-BR"], "pt-BR"],
    [["nb-NO"], "no"],
    [["ar-AE"], "ar"],
    [["zh-Hant-HK"], "zh-TW"],
    [["zh-TW"], "zh-TW"],
    [["xx", "fr-CA"], "fr"],
  ])("matches %j to %s", (languages, expected) => {
    expect(detectPreferredLocale(languages)).toBe(expected);
  });

  it.each([["pt-PT"], ["zh-CN"], ["zh-Hans"], ["xx-YY"]])(
    "does not redirect an unsupported language variant: %s",
    (language) => {
      expect(detectPreferredLocale([language])).toBe("en");
    },
  );
});
