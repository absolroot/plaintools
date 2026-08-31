import unittest

from qa.new_tools_contract import (
    NEW_TOOL_FEATURES,
    NEW_TOOL_PUBLICATIONS,
    NEW_TOOL_ROUTES,
    TECHNICAL_DIRECTION_SELECTORS,
    validate_new_tool_inventory,
)
from qa.registry import RouteInventory, ToolRoute, build_route_inventory


def _inventory(*, publication_overrides: dict[str, str] | None = None) -> RouteInventory:
    publication_overrides = publication_overrides or {}
    tools = tuple(
        ToolRoute(
            id=slug,
            feature_id=NEW_TOOL_FEATURES[slug],
            slug=slug,
            publication=publication_overrides.get(
                slug, NEW_TOOL_PUBLICATIONS[slug]
            ),
            structured_data=("SoftwareApplication", "BreadcrumbList", "FAQPage"),
        )
        for slug in NEW_TOOL_ROUTES
    )
    return build_route_inventory(("en", "ko", "ar"), tools, ("about",))


class NewToolsContractTests(unittest.TestCase):
    def test_defines_all_twenty_two_routes_and_twelve_feature_families(self) -> None:
        self.assertEqual(len(NEW_TOOL_ROUTES), 22)
        self.assertEqual(len(set(NEW_TOOL_FEATURES.values())), 12)
        self.assertTrue(set(TECHNICAL_DIRECTION_SELECTORS).issubset(NEW_TOOL_ROUTES))

    def test_accepts_complete_mixed_publication_inventory(self) -> None:
        validate_new_tool_inventory(_inventory())

    def test_rejects_missing_route(self) -> None:
        inventory = _inventory()
        incomplete = RouteInventory(
            locales=inventory.locales,
            routes=inventory.routes[:-1],
            faq_routes=inventory.faq_routes,
            tools=inventory.tools[:-1],
            legal_pages=inventory.legal_pages,
        )
        with self.assertRaisesRegex(RuntimeError, "image-upscaler"):
            validate_new_tool_inventory(incomplete)

    def test_rejects_wrong_publication(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "expected indexable"):
            validate_new_tool_inventory(
                _inventory(publication_overrides={"hash-generator": "preview"})
            )
        with self.assertRaisesRegex(RuntimeError, "expected indexable"):
            validate_new_tool_inventory(
                _inventory(publication_overrides={"background-remover": "preview"})
            )
        with self.assertRaisesRegex(RuntimeError, "expected indexable"):
            validate_new_tool_inventory(
                _inventory(publication_overrides={"image-upscaler": "preview"})
            )


if __name__ == "__main__":
    unittest.main()
