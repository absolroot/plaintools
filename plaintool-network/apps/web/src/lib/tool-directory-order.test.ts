import { describe, expect, it } from "vitest";
import directoryOrder from "./tool-directory-order.json";
import {
  homeDirectoryCategoryOrder,
  homeDirectoryInitiallyVisibleToolCount,
  homeDirectoryToolsForCategory,
  homeDirectoryToolsInDisplayOrder,
  toolCatalog,
} from "./tool-catalog";
import { toolRegistry } from "./tool-registry.js";

describe("home tool directory order", () => {
  it("places the requested categories relative to one another", () => {
    const { categoryOrder } = directoryOrder;

    expect(categoryOrder.indexOf("generator")).toBe(
      categoryOrder.indexOf("text") + 1,
    );
    expect(categoryOrder.indexOf("encoding")).toBe(
      categoryOrder.indexOf("data") - 1,
    );
    expect(new Set(categoryOrder).size).toBe(categoryOrder.length);
  });

  it("merges image format conversion into the image category", () => {
    expect(directoryOrder.featureCategoryOverrides).toEqual({
      "image-converter": "image",
    });
    expect(directoryOrder.categoryOrder).not.toContain("image-converter");
  });

  it("pins the requested image, generator, and calculator cards", () => {
    expect(directoryOrder.pinnedToolOrder.image.slice(0, 4)).toEqual([
      "background-remover",
      "image-resizer",
      "image-upscaler",
      "image-crop",
    ]);
    expect(directoryOrder.pinnedToolOrder.image[1]).toBe("image-resizer");
    expect(directoryOrder.pinnedToolOrder.generator.slice(0, 4)).toEqual([
      "qr-code-generator",
      "qr-code-scanner",
      "barcode-generator",
      "password-generator",
    ]);
    expect(directoryOrder.pinnedToolOrder.calculator.slice(0, 5)).toEqual([
      "date-calculator",
      "dday-calculator",
      "percentage-calculator",
      "bmi-calculator",
      "age-calculator",
    ]);
    expect(directoryOrder.pinnedToolOrder.text).toContain("regex-tester");
    expect(directoryOrder.pinnedToolOrder.converter[0]).toBe("unit-converter");
  });

  it("keeps the generator top four and age calculator in exact display positions", () => {
    expect(
      homeDirectoryToolsForCategory("generator")
        .slice(0, 4)
        .map((tool) => tool.id),
    ).toEqual([
      "qr-code-generator",
      "qr-code-scanner",
      "barcode-generator",
      "password-generator",
    ]);

    const calculatorIds = homeDirectoryToolsForCategory("calculator").map(
      (tool) => tool.id,
    );
    expect(calculatorIds[4]).toBe("age-calculator");
    expect(calculatorIds.indexOf("fraction-calculator")).toBeGreaterThan(4);
  });

  it("references only registered features, tools, and categories", () => {
    const featureIds = new Set(toolRegistry.map((tool) => tool.featureId));
    const toolById = new Map(toolRegistry.map((tool) => [tool.id, tool]));
    const categories = new Set(directoryOrder.categoryOrder);

    for (const [featureId, category] of Object.entries(
      directoryOrder.featureCategoryOverrides,
    )) {
      expect(featureIds.has(featureId), featureId).toBe(true);
      expect(categories.has(category), category).toBe(true);
    }

    for (const [category, toolIds] of Object.entries(
      directoryOrder.pinnedToolOrder,
    )) {
      expect(categories.has(category), category).toBe(true);
      expect(new Set(toolIds).size, category).toBe(toolIds.length);
      for (const toolId of toolIds) {
        const tool = toolById.get(toolId);
        expect(tool, toolId).toBeDefined();
        const homeCategory =
          directoryOrder.featureCategoryOverrides[
            tool!
              .featureId as keyof typeof directoryOrder.featureCategoryOverrides
          ] ?? tool!.category;
        expect(homeCategory, toolId).toBe(category);
      }
    }
  });

  it("renders every catalog tool once through the configured categories", () => {
    expect(homeDirectoryCategoryOrder).toEqual(directoryOrder.categoryOrder);
    expect(homeDirectoryToolsInDisplayOrder).toHaveLength(toolCatalog.length);
    expect(
      new Set(homeDirectoryToolsInDisplayOrder.map((tool) => tool.id)).size,
    ).toBe(toolCatalog.length);
  });

  it("puts image converters after the primary image tools", () => {
    const imageTools = homeDirectoryToolsForCategory("image");

    expect(imageTools.slice(0, 3).map((tool) => tool.id)).toEqual([
      "background-remover",
      "image-resizer",
      "image-upscaler",
    ]);
    expect(
      imageTools
        .filter((tool) => tool.featureId === "image-converter")
        .every((tool) => imageTools.indexOf(tool) > 2),
    ).toBe(true);
    expect(homeDirectoryInitiallyVisibleToolCount("image")).toBe(3);
    expect(
      homeDirectoryInitiallyVisibleToolCount("calculator"),
    ).toBeUndefined();
  });
});
