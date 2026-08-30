import { describe, expect, it } from "vitest";
import { breadcrumbSchema } from "./seo";

describe("breadcrumb schema", () => {
  it("links every breadcrumb before the current page", () => {
    const schema = breadcrumbSchema({
      locale: "en",
      page: "word-counter",
      homeLabel: "All tools",
      itemLabel: "Word counter",
    });

    expect(schema).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "All tools",
          item: expect.stringMatching(/\/en\/$/u),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Word counter",
          item: expect.stringMatching(/\/en\/word-counter\/$/u),
        },
      ],
    });
  });
});
