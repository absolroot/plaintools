import unittest

from qa.common import _is_external_request
from qa.config import BASE_URL


class ExternalRequestTests(unittest.TestCase):
    def test_accepts_only_the_exact_qa_origin(self) -> None:
        self.assertFalse(_is_external_request(f"{BASE_URL}/ko/base64-decode/"))
        self.assertTrue(_is_external_request(f"{BASE_URL}.example/collect"))
        self.assertTrue(_is_external_request("https://example.com/collect"))

    def test_ignores_browser_local_resource_schemes(self) -> None:
        self.assertFalse(_is_external_request("blob:http://localhost/value"))
        self.assertFalse(_is_external_request("data:text/plain,PlainTool"))
        self.assertFalse(_is_external_request("about:blank"))


if __name__ == "__main__":
    unittest.main()
