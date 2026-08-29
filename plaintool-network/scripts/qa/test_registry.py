import json
import unittest

from qa.config import ROOT
from qa.registry import ToolRoute, build_route_inventory, load_route_inventory, parse_registry_export


class RegistryTests(unittest.TestCase):
    def test_builds_matrix_in_registry_order(self) -> None:
        inventory = build_route_inventory(
            ("en", "ko"),
            (
                ToolRoute("base64-decode", "base64-codec", "base64-decode", "indexable", ("FAQPage",)),
                ToolRoute("word-counter", "word-counter", "word-counter", "preview", ("FAQPage",)),
                ToolRoute("plain-tool", "plain-tool", "plain-tool", "preview", ("BreadcrumbList",)),
            ),
            ("about", "privacy"),
        )

        self.assertEqual(inventory.locales, ("en", "ko"))
        self.assertEqual(
            inventory.routes,
            ("", "base64-decode/", "word-counter/", "plain-tool/", "about/", "privacy/"),
        )
        self.assertEqual(inventory.faq_routes, frozenset({"base64-decode/", "word-counter/"}))
        self.assertEqual(inventory.feature_ids, ("base64-codec", "word-counter", "plain-tool"))

    def test_parses_versioned_machine_readable_export(self) -> None:
        inventory = parse_registry_export(
            json.dumps(
                {
                    "schemaVersion": 1,
                    "locales": ["en", "ko"],
                    "legalPages": ["about", "privacy"],
                    "tools": [
                        {
                            "id": "base64-decode",
                            "featureId": "base64-codec",
                            "slug": "base64-decode",
                            "publication": "indexable",
                            "structuredData": ["SoftwareApplication", "FAQPage"],
                        }
                    ],
                }
            )
        )

        self.assertEqual(inventory.tool_slugs, ("base64-decode",))
        self.assertEqual(inventory.tools[0].feature_id, "base64-codec")
        self.assertEqual(inventory.legal_pages, ("about", "privacy"))

    def test_rejects_duplicate_registry_identity(self) -> None:
        source = json.dumps(
            {
                "schemaVersion": 1,
                "locales": ["en"],
                "legalPages": ["about"],
                "tools": [
                    {
                        "id": "duplicate",
                        "featureId": "one",
                        "slug": "first",
                        "publication": "preview",
                        "structuredData": ["BreadcrumbList"],
                    },
                    {
                        "id": "duplicate",
                        "featureId": "two",
                        "slug": "second",
                        "publication": "preview",
                        "structuredData": ["BreadcrumbList"],
                    },
                ],
            }
        )

        with self.assertRaisesRegex(ValueError, "duplicate tool ids"):
            parse_registry_export(source)

    def test_real_export_matches_current_registry(self) -> None:
        inventory = load_route_inventory(ROOT)

        self.assertTrue(inventory.locales)
        self.assertTrue(inventory.tools)
        self.assertEqual(len(inventory.tool_slugs), len(set(inventory.tool_slugs)))


if __name__ == "__main__":
    unittest.main()
