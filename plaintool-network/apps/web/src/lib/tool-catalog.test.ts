import { describe, expect, it } from "vitest";
import { locales } from "./site";
import { toolCatalog } from "./tool-catalog";

describe("tool catalog card subtitles", () => {
  it("localizes the background remover AI model subtitle in every locale", () => {
    const backgroundRemover = toolCatalog.find(
      (tool) => tool.id === "background-remover",
    );

    expect(backgroundRemover?.subtitle?.ko).toBe("AI 모델");
    for (const locale of locales) {
      expect(backgroundRemover?.subtitle?.[locale]).toBeTruthy();
    }
  });

  it("does not add a subtitle to image format converter cards", () => {
    const imageConverter = toolCatalog.find(
      (tool) => tool.id === "png-to-webp",
    );

    expect(imageConverter?.subtitle).toBeUndefined();
  });
});
