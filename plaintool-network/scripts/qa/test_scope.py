import unittest

from qa.registry import ToolRoute, build_route_inventory
from qa.scope import affected_selection, explicit_selection, select_routes


def _inventory():
    return build_route_inventory(
        ("en", "ko", "es", "de", "ar", "zh-TW"),
        (
            ToolRoute(
                "base64-decode",
                "base64-codec",
                "base64-decode",
                "indexable",
                ("FAQPage",),
            ),
            ToolRoute(
                "base64-encode",
                "base64-codec",
                "base64-encode",
                "indexable",
                ("FAQPage",),
            ),
            ToolRoute(
                "background-remover",
                "background-remover",
                "background-remover",
                "preview",
                ("FAQPage",),
            ),
        ),
        ("about", "privacy"),
    )


class QaScopeTests(unittest.TestCase):
    def test_selects_all_routes_for_one_feature_family(self) -> None:
        inventory = _inventory()

        self.assertEqual(
            select_routes(inventory, ("base64-codec",), "selected"),
            ("base64-decode/", "base64-encode/"),
        )
        self.assertEqual(
            select_routes(inventory, ("base64-codec",), "representative"),
            ("base64-decode/",),
        )

    def test_feature_change_uses_one_locale_and_only_its_routes(self) -> None:
        selection = affected_selection(
            _inventory(),
            ("apps/web/src/features/background-remover/client.ts",),
        )

        self.assertEqual(selection.label, "affected-feature")
        self.assertEqual(selection.locales, ("en",))
        self.assertEqual(selection.behavior_feature_ids, ("background-remover",))
        self.assertEqual(selection.routes, ("background-remover/",))
        self.assertFalse(selection.run_directory)
        self.assertFalse(selection.run_legal)

    def test_shared_ui_change_uses_risk_locales_and_feature_representatives(self) -> None:
        selection = affected_selection(
            _inventory(),
            ("apps/web/src/styles/global.css",),
        )

        self.assertEqual(selection.label, "affected-shared")
        self.assertEqual(selection.locales, ("en", "ko", "de", "ar", "zh-TW"))
        self.assertEqual(selection.behavior_feature_ids, ("base64-codec",))
        self.assertEqual(
            selection.routes,
            ("base64-decode/", "background-remover/"),
        )
        self.assertTrue(selection.run_directory)
        self.assertTrue(selection.run_legal)
        self.assertTrue(selection.run_surface_probe)

    def test_locale_change_uses_only_that_locale_with_representative_routes(self) -> None:
        selection = affected_selection(
            _inventory(),
            ("apps/web/src/lib/locale-data/ar.ts",),
        )

        self.assertEqual(selection.locales, ("ar",))
        self.assertEqual(
            selection.routes,
            ("base64-decode/", "background-remover/"),
        )

    def test_feature_copy_pack_uses_risk_locales_but_only_its_routes(self) -> None:
        selection = affected_selection(
            _inventory(),
            ("apps/web/src/lib/locale-data/new-tools/background-remover.ts",),
        )

        self.assertEqual(selection.locales, ("en", "ko", "de", "ar", "zh-TW"))
        self.assertEqual(selection.behavior_feature_ids, ("background-remover",))
        self.assertEqual(selection.routes, ("background-remover/",))

    def test_non_browser_changes_skip_playwright(self) -> None:
        selection = affected_selection(
            _inventory(),
            ("README.md", "scripts/qa/test_scope.py"),
        )

        self.assertFalse(selection.browser_required)
        self.assertEqual(selection.label, "affected-none")

    def test_explicit_feature_scope_defaults_to_english_and_selected_routes(self) -> None:
        selection = explicit_selection(
            _inventory(),
            features=("base64-codec",),
            surfaces=("mobile",),
        )

        self.assertEqual(selection.locales, ("en",))
        self.assertEqual(selection.surfaces, ("mobile",))
        self.assertEqual(
            selection.routes,
            ("base64-decode/", "base64-encode/"),
        )
        self.assertEqual(selection.behavior_feature_ids, ("base64-codec",))

    def test_locale_only_scope_skips_unrelated_feature_behaviors(self) -> None:
        selection = explicit_selection(_inventory(), locales=("ar",))

        self.assertEqual(selection.locales, ("ar",))
        self.assertEqual(selection.behavior_feature_ids, ())
        self.assertEqual(
            selection.routes,
            ("base64-decode/", "background-remover/"),
        )

    def test_rejects_unknown_manual_scope(self) -> None:
        with self.assertRaisesRegex(ValueError, "Unknown QA feature"):
            explicit_selection(_inventory(), features=("missing",))
        with self.assertRaisesRegex(ValueError, "Unknown QA locale"):
            explicit_selection(_inventory(), locales=("fr",))


if __name__ == "__main__":
    unittest.main()
