from .config import BASE_URL, QA_DIR


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
