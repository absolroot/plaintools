import unittest

from qa.config import select_browser_locales


class BrowserLocaleSelectionTests(unittest.TestCase):
    def test_selects_representative_locales_in_risk_order(self) -> None:
        locales = (
            "en",
            "ko",
            "es",
            "de",
            "ja",
            "ar",
            "zh-TW",
            "tr",
        )

        self.assertEqual(
            select_browser_locales(locales),
            ("en", "ko", "de", "ar", "zh-TW"),
        )

    def test_full_scope_preserves_the_registry_inventory(self) -> None:
        locales = ("en", "ko", "es")

        self.assertEqual(select_browser_locales(locales, full=True), locales)

    def test_rejects_a_registry_missing_a_representative_locale(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "de, ar, zh-TW"):
            select_browser_locales(("en", "ko", "es"))


if __name__ == "__main__":
    unittest.main()
