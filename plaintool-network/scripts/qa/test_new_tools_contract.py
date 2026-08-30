import unittest

from qa.new_tools_contract import (
    NEW_TOOL_FEATURES,
    NEW_TOOL_ROUTES,
    TECHNICAL_DIRECTION_SELECTORS,
    validate_new_tool_inventory,
)
from qa.registry import RouteInventory, ToolRoute, build_route_inventory


def _inventory(*, publication: str = "preview") -> RouteInventory:
    tools = tuple(
        ToolRoute(
            id=slug,
            feature_id=NEW_TOOL_FEATURES[slug],
            slug=slug,
            publication=publication,
            structured_data=("SoftwareApplication", "BreadcrumbList", "FAQPage"),
        )
        for slug in NEW_TOOL_ROUTES
    )
    return build_route_inventory(("en", "ko", "ar"), tools, ("about",))


class NewToolsContractTests(unittest.TestCase):
    def test_defines_all_eighteen_routes_and_eight_feature_families(self) -> None:
        self.assertEqual(len(NEW_TOOL_ROUTES), 18)
        self.assertEqual(len(set(NEW_TOOL_FEATURES.values())), 8)
        self.assertTrue(set(TECHNICAL_DIRECTION_SELECTORS).issubset(NEW_TOOL_ROUTES))

    def test_accepts_complete_preview_inventory(self) -> None:
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
        with self.assertRaisesRegex(RuntimeError, "ip-subnet-calculator"):
            validate_new_tool_inventory(incomplete)

    def test_rejects_non_preview_publication(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "expected preview"):
            validate_new_tool_inventory(_inventory(publication="indexable"))


if __name__ == "__main__":
    unittest.main()
