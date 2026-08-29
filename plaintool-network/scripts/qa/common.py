from urllib.parse import urlsplit

from .config import BASE_URL, QA_DIR


_BASE_ORIGIN = urlsplit(BASE_URL)


def _is_external_request(url: str) -> bool:
    parsed = urlsplit(url)
    if parsed.scheme in {"blob", "data", "about"}:
        return False
    return (parsed.scheme, parsed.netloc) != (_BASE_ORIGIN.scheme, _BASE_ORIGIN.netloc)


def inspect_view(page, path: str, screenshot: str) -> dict:
    page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
    page.screenshot(path=str(QA_DIR / screenshot), full_page=False)
    return {
        "path": path,
        "title": page.title(),
        "viewport": page.viewport_size,
        "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
        "client_width": page.evaluate("document.documentElement.clientWidth"),
    }


def attach_page_error_collectors(page, report: dict) -> None:
    page.on(
        "console",
        lambda message: report["console_errors"].append(message.text)
        if message.type == "error"
        else None,
    )
    page.on("pageerror", lambda error: report["page_errors"].append(str(error)))


def attach_external_request_collector(page, report: dict, surface: str) -> None:
    def collect(request) -> None:
        if not _is_external_request(request.url):
            return
        report["external_conversion_requests"].append(
            {
                "surface": surface,
                "page": page.url,
                "method": request.method,
                "resource_type": request.resource_type,
                "url": request.url,
            }
        )

    page.on("request", collect)
