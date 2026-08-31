"""Focused rendered QA for the browser-local Unit Converter."""

import os

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("PLAINTOOL_QA_BASE_URL", "http://localhost:4330").rstrip("/")


def main() -> None:
    failures: list[str] = []
    external_requests: list[str] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 1000})
            page.on(
                "request",
                lambda request: external_requests.append(request.url)
                if request.url.startswith(("http://", "https://"))
                and not request.url.startswith(BASE_URL)
                else None,
            )
            page.goto(f"{BASE_URL}/en/unit-converter/", wait_until="networkidle")
            root = page.locator("[data-unit-converter]")
            value = root.locator("[data-value]")
            result = root.locator("[data-result]")
            if abs(float(result.inner_text()) - 3.280839895013123) > 1e-10:
                failures.append(f"1 m to ft default was {result.inner_text()!r}")
            root.locator("[data-swap]").click()
            if result.inner_text() != "0.3048":
                failures.append(f"swap did not reverse the conversion: {result.inner_text()!r}")
            root.locator("[data-category]").select_option("temperature")
            value.fill("100")
            if result.inner_text() != "212":
                failures.append(f"100 C to F was {result.inner_text()!r}")
            root.locator("[data-category]").select_option("volume")
            root.locator("[data-from]").select_option("uk-gallon")
            root.locator("[data-to]").select_option("liter")
            value.fill("1")
            if result.inner_text() != "4.54609":
                failures.append(f"UK gallon to litre was {result.inner_text()!r}")
            value.fill("not-a-number")
            if result.inner_text() or "has-error" not in (root.get_attribute("class") or ""):
                failures.append("invalid input did not clear the result and expose an error state")

            mobile = browser.new_page(viewport={"width": 390, "height": 844}, has_touch=True)
            mobile.goto(f"{BASE_URL}/ar/unit-converter/", wait_until="networkidle")
            mobile_root = mobile.locator("[data-unit-converter]")
            layout = mobile.evaluate(
                """() => {
                  const root = document.querySelector('[data-unit-converter]');
                  const controls = [...root.querySelectorAll('input, select, button')];
                  return {
                    direction: document.documentElement.dir,
                    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                    inputDirection: getComputedStyle(root.querySelector('[data-value]')).direction,
                    minControlHeight: Math.min(...controls.map((node) => node.getBoundingClientRect().height)),
                    visible: root.getBoundingClientRect().width > 0,
                  };
                }"""
            )
            if (
                layout["direction"] != "rtl"
                or layout["overflow"] > 1
                or layout["inputDirection"] != "ltr"
                or layout["minControlHeight"] < 44
                or not layout["visible"]
            ):
                failures.append(f"Arabic mobile layout failed: {layout}")
            if mobile_root.locator("[data-result]").inner_text() == "":
                failures.append("Arabic mobile route did not render its initial result")
        finally:
            browser.close()
    if external_requests:
        failures.append(f"external requests occurred: {external_requests}")
    if failures:
        raise SystemExit("Unit converter QA failed:\n- " + "\n- ".join(failures))
    print("Unit converter focused QA passed: conversions, swap, validation, mobile RTL, and local-only network.")


if __name__ == "__main__":
    main()
