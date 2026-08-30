import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("PLAINTOOL_QA_BASE_URL", "http://localhost:4321").rstrip("/")
QA_DIR = Path(__file__).resolve().parents[1] / "research" / "qa"


def tooltip_state(page, tooltip_id: str) -> dict:
    return page.locator(f"#{tooltip_id}").evaluate(
        """
        element => {
          const box = element.getBoundingClientRect();
          const trigger = element.parentElement.querySelector('[data-tooltip-trigger]');
          return {
            display: getComputedStyle(element).display,
            text: element.textContent.trim(),
            left: box.left,
            right: box.right,
            top: box.top,
            bottom: box.bottom,
            viewportWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            pressed: trigger.getAttribute('aria-pressed'),
            focused: document.activeElement === trigger,
          };
        }
        """
    )


def assert_open_and_bounded(state: dict, label: str) -> None:
    if state["display"] == "none" or not state["text"]:
        raise AssertionError(f"{label} did not expose localized help: {state}")
    if state["left"] < -0.5 or state["right"] > state["viewportWidth"] + 0.5:
        raise AssertionError(f"{label} escaped the viewport: {state}")
    if state["scrollWidth"] > state["viewportWidth"]:
        raise AssertionError(f"{label} caused horizontal overflow: {state}")
    if state["pressed"] != "true":
        raise AssertionError(f"{label} did not expose its pressed state: {state}")


def run() -> None:
    QA_DIR.mkdir(parents=True, exist_ok=True)
    report = {"surfaces": {}, "interactions": {}}
    expected = {
        "/ko/base64-decode/": 11,
        "/ko/case-converter/": 1,
        "/ko/unix-timestamp-converter/": 3,
        "/ko/json-formatter/": 2,
        "/ko/url-decode/": 3,
        "/ko/qr-code-generator/": 2,
        "/ko/csv-to-markdown/": 2,
        "/ko/html-formatter/": 1,
        "/ko/css-formatter/": 1,
        "/ko/javascript-formatter/": 4,
        "/ko/sql-formatter/": 2,
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
            for path, expected_count in expected.items():
                desktop.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                triggers = desktop.locator("[data-tooltip-trigger]")
                contents = desktop.locator("[role=tooltip]")
                state = {
                    "triggers": triggers.count(),
                    "contents": contents.count(),
                    "emptyContents": contents.evaluate_all(
                        "elements => elements.filter(element => !element.textContent.trim()).length"
                    ),
                }
                report["surfaces"][path] = state
                if state != {
                    "triggers": expected_count,
                    "contents": expected_count,
                    "emptyContents": 0,
                }:
                    raise AssertionError(f"Unexpected tooltip contract on {path}: {state}")

            desktop.goto(f"{BASE_URL}/ko/base64-decode/", wait_until="networkidle")
            desktop.locator("details[data-options] > summary").click()
            variant_trigger = desktop.locator(
                '[data-tooltip-trigger][aria-describedby="base64-variant-help"]'
            )
            variant_trigger.click()
            opened = tooltip_state(desktop, "base64-variant-help")
            assert_open_and_bounded(opened, "Korean Base64 format help")
            desktop.screenshot(
                path=str(QA_DIR / "plaintool-option-help-desktop-ko.png"),
                full_page=False,
            )
            desktop.keyboard.press("Escape")
            escaped = tooltip_state(desktop, "base64-variant-help")
            if escaped["display"] != "none" or not escaped["focused"]:
                raise AssertionError(
                    f"Escape did not close help and restore focus: {escaped}"
                )
            report["interactions"]["desktopKo"] = {
                "opened": opened,
                "escaped": escaped,
            }

            mobile = browser.new_page(
                viewport={"width": 390, "height": 844}, has_touch=True
            )
            mobile.goto(f"{BASE_URL}/ar/url-decode/", wait_until="networkidle")
            recursive_trigger = mobile.locator(
                '[data-tooltip-trigger][aria-describedby="url-recursive-help"]'
            )
            recursive_trigger.click()
            arabic_opened = tooltip_state(mobile, "url-recursive-help")
            assert_open_and_bounded(arabic_opened, "Arabic recursive URL help")
            if mobile.locator("html").get_attribute("dir") != "rtl":
                raise AssertionError("Arabic help surface did not render in RTL mode")
            mobile.screenshot(
                path=str(QA_DIR / "plaintool-option-help-mobile-ar.png"),
                full_page=False,
            )
            mobile.locator("main h1").click()
            outside = tooltip_state(mobile, "url-recursive-help")
            if outside["display"] != "none":
                raise AssertionError(f"Outside tap did not close help: {outside}")
            report["interactions"]["mobileAr"] = {
                "opened": arabic_opened,
                "outsideTap": outside,
            }
        finally:
            browser.close()

    print(json.dumps(report, ensure_ascii=True, indent=2))


if __name__ == "__main__":
    run()
