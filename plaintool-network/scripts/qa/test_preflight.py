import unittest
from unittest.mock import patch
from urllib.error import URLError

from qa.preflight import FeatureCoverage, validate_feature_coverage, verify_server
from qa.registry import RouteInventory, ToolRoute


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


def _runner(_page, _report: dict, _inventory: RouteInventory) -> None:
    return None


def _inventory(*feature_ids: str) -> RouteInventory:
    tools = tuple(
        ToolRoute(
            id=feature_id,
            feature_id=feature_id,
            slug=feature_id,
            publication="preview",
            structured_data=("BreadcrumbList",),
        )
        for feature_id in feature_ids
    )
    return RouteInventory(
        locales=("en",),
        routes=("",) + tuple(f"{tool.slug}/" for tool in tools),
        faq_routes=frozenset(),
        tools=tools,
        legal_pages=("about",),
    )


def _coverage(*feature_ids: str) -> dict[str, FeatureCoverage]:
    return {
        feature_id: FeatureCoverage(
            desktop=_runner,
            mobile=_runner,
            focus_targets=(("input", "textarea"),),
            surface_probe=index == 0,
        )
        for index, feature_id in enumerate(feature_ids)
    }


class PreflightTests(unittest.TestCase):
    @patch("qa.preflight.urlopen", return_value=_Response())
    def test_accepts_a_working_html_route(self, _urlopen) -> None:
        verify_server("http://localhost:4321", "/ko/base64-decode/")

    @patch("qa.preflight.urlopen", side_effect=URLError("offline"))
    def test_reports_an_unavailable_server(self, _urlopen) -> None:
        with self.assertRaisesRegex(RuntimeError, "Start the local Astro server first"):
            verify_server("http://localhost:4321", "/ko/base64-decode/")

    def test_accepts_exact_registered_feature_coverage(self) -> None:
        inventory = _inventory("base64-codec", "json-formatter")

        validate_feature_coverage(
            inventory,
            _coverage("base64-codec", "json-formatter"),
        )

    def test_rejects_registered_feature_without_handler(self) -> None:
        inventory = _inventory("base64-codec", "json-formatter")

        with self.assertRaisesRegex(RuntimeError, "json-formatter"):
            validate_feature_coverage(inventory, _coverage("base64-codec"))

    def test_rejects_stale_feature_handler(self) -> None:
        inventory = _inventory("base64-codec")

        with self.assertRaisesRegex(RuntimeError, "retired-tool"):
            validate_feature_coverage(
                inventory,
                _coverage("base64-codec", "retired-tool"),
            )


if __name__ == "__main__":
    unittest.main()
