import { describe, expect, it } from "vitest";
import { imageCropFor } from "../../lib/locale-data/new-tools/image-crop";
import { locales } from "../../lib/site";

describe("image crop locale packs", () => {
  it("defines independent localized copy for every public locale", () => {
    const english = imageCropFor("en");
    expect(locales).toHaveLength(17);
    for (const locale of locales) {
      const pack = imageCropFor(locale);
      expect(pack.copy.formats).not.toContain("GIF");
      expect(pack.copy.chooseImage.trim()).not.toBe("");
      expect(pack.page.description.trim()).not.toBe("");
      if (locale !== "en") {
        expect(pack).not.toBe(english);
        expect(pack.copy.chooseImage).not.toBe(english.copy.chooseImage);
        expect(pack.page.description).not.toBe(english.page.description);
      }
    }
  });
});
