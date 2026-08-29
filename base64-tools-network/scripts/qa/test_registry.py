import unittest

from qa.registry import (
    ToolRoute,
    build_route_inventory,
    parse_public_locales,
    parse_legal_pages,
    parse_tool_registry,
)


class RegistryTests(unittest.TestCase):
    def test_builds_matrix_in_registry_order(self) -> None:
        inventory = build_route_inventory(
            ("en", "ko"),
            (
                ToolRoute("base64-decode", ("FAQPage",)),
                ToolRoute("word-counter", ("FAQPage",)),
                ToolRoute("plain-tool", ("BreadcrumbList",)),
            ),
            ("about", "privacy"),
        )

        self.assertEqual(inventory.locales, ("en", "ko"))
        self.assertEqual(
            inventory.routes,
            (
                "",
                "base64-decode/",
                "word-counter/",
                "plain-tool/",
                "about/",
                "privacy/",
            ),
        )
        self.assertEqual(
            inventory.faq_routes,
            frozenset({"base64-decode/", "word-counter/"}),
        )

    def test_parses_current_registry_shapes(self) -> None:
        locales = parse_public_locales(
            'export const locales = /** @type {const} */ (["en", "ko"]);'
        )
        tools = parse_tool_registry(
            """
export const toolRegistry = [
  {
    id: "base64-decode",
    slug: "base64-decode",
    structuredData: ["SoftwareApplication", "FAQPage"]
  }
];
"""
        )
        legal = parse_legal_pages(
            'export const legalPages = /** @type {const} */ (["about", "privacy"]);'
        )

        self.assertEqual(locales, ("en", "ko"))
        self.assertEqual(
            tools,
            (ToolRoute("base64-decode", ("SoftwareApplication", "FAQPage")),),
        )
        self.assertEqual(legal, ("about", "privacy"))


if __name__ == "__main__":
    unittest.main()
