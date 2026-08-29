from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .registry import RouteInventory


_REQUIRED_FEATURE_ROUTES = {
    "base64-decode",
    "base64-encode",
    "word-counter",
    "json-formatter",
    "unix-timestamp-converter",
}


def validate_feature_inventory(inventory: RouteInventory) -> None:
    missing = sorted(_REQUIRED_FEATURE_ROUTES.difference(inventory.tool_slugs))
    if missing:
        raise RuntimeError(
            "UI QA requires registered feature routes that are missing: "
            + ", ".join(missing)
        )


def verify_server(base_url: str, path: str, timeout: float = 5.0) -> None:
    url = f"{base_url}{path}"
    request = Request(url, headers={"User-Agent": "PlainTool local UI QA"})
    try:
        with urlopen(request, timeout=timeout) as response:
            status = getattr(response, "status", 200)
            content_type = response.headers.get_content_type()
            response.read(256)
    except (HTTPError, URLError, TimeoutError, OSError) as error:
        raise RuntimeError(
            f"UI QA server preflight failed for {url}. Start the local Astro server first."
        ) from error
    if status >= 400 or content_type != "text/html":
        raise RuntimeError(
            f"UI QA server preflight expected HTML from {url}, "
            f"received status {status} and {content_type}."
        )
