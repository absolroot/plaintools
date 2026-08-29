import unittest
from unittest.mock import patch
from urllib.error import URLError

from qa.preflight import validate_feature_inventory, verify_server
from qa.registry import RouteInventory


class _Headers:
    def __init__(self, content_type: str) -> None:
        self.content_type = content_type

    def get_content_type(self) -> str:
        return self.content_type


class _Response:
    def __init__(self, status: int = 200, content_type: str = "text/html") -> None:
        self.status = status
        self.headers = _Headers(content_type)

    def __enter__(self):
        return self

    def __exit__(self, *_args) -> None:
        return None

    def read(self, _size: int) -> bytes:
        return b"<!doctype html>"


class PreflightTests(unittest.TestCase):
    @patch("qa.preflight.urlopen", return_value=_Response())
    def test_accepts_a_working_html_route(self, _urlopen) -> None:
        verify_server("http://localhost:4321", "/ko/base64-decode/")

    @patch("qa.preflight.urlopen", side_effect=URLError("offline"))
    def test_reports_an_unavailable_server(self, _urlopen) -> None:
        with self.assertRaisesRegex(RuntimeError, "Start the local Astro server first"):
            verify_server("http://localhost:4321", "/ko/base64-decode/")

    def test_rejects_missing_feature_routes(self) -> None:
        inventory = RouteInventory(
            locales=("en",),
            routes=("", "base64-decode/"),
            faq_routes=frozenset(),
            tool_slugs=("base64-decode",),
        )

        with self.assertRaisesRegex(RuntimeError, "json-formatter"):
            validate_feature_inventory(inventory)


if __name__ == "__main__":
    unittest.main()
