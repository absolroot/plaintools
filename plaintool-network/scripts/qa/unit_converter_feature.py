"""Focused rendered QA for the browser-local Unit Converter."""

from playwright.sync_api import sync_playwright

from .config import BASE_URL, QA_DIR


def run_unit_converter_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/unit-converter/", wait_until="networkidle")
    root = page.locator("[data-unit-converter]")
    value = root.locator("[data-value]")
    result = root.locator("[data-result]")

    default_result = result.inner_text()
    if abs(float(default_result) - 3.280839895013123) > 1e-10:
        report["ui_detail_failures"].append(
            f"Unit converter default 1 m to ft was {default_result!r}."
        )

    root.locator("[data-swap]").click()
    swapped_result = result.inner_text()
    if swapped_result != "0.3048":
        report["ui_detail_failures"].append(
            f"Unit converter swap did not reverse the conversion: {swapped_result!r}."
        )

    root.locator("[data-category]").select_option("temperature")
    value.fill("100")
    temperature_result = result.inner_text()
    if temperature_result != "212":
        report["ui_detail_failures"].append(
            f"Unit converter 100 C to F was {temperature_result!r}."
        )

    root.locator("[data-category]").select_option("volume")
    root.locator("[data-from]").select_option("uk-gallon")
    root.locator("[data-to]").select_option("liter")
    value.fill("1")
    volume_result = result.inner_text()
    if volume_result != "4.54609":
        report["ui_detail_failures"].append(
            f"Unit converter UK gallon to litre was {volume_result!r}."
        )

    value.fill("not-a-number")
    invalid_state = {
        "result": result.inner_text(),
        "class": root.get_attribute("class") or "",
    }
    if invalid_state["result"] or "has-error" not in invalid_state["class"]:
        report["ui_detail_failures"].append(
            f"Unit converter invalid input state failed: {invalid_state}."
        )

    page.goto(f"{BASE_URL}/de/unit-converter/", wait_until="networkidle")
    root = page.locator("[data-unit-converter]")
    root.locator("[data-value]").fill("1,5")
    localized_result = root.locator("[data-result]").inner_text()
    root.locator("[data-category]").select_option("area")
    localized_units = root.locator("[data-from] option").all_text_contents()
    if "," not in localized_result or not any(
        "Quadratmeter" in label for label in localized_units
    ):
        report["ui_detail_failures"].append(
            "Unit converter German decimal or localized unit labels failed: "
            f"{localized_result!r}, {localized_units}."
        )

    report["unit_converter_desktop"] = {
        "default": default_result,
        "swapped": swapped_result,
        "temperature": temperature_result,
        "volume": volume_result,
        "germanDecimal": localized_result,
        "germanUnits": localized_units,
    }
    page.screenshot(
        path=str(QA_DIR / "plaintool-unit-converter-desktop-de.png"),
        full_page=False,
    )


def run_unit_converter_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/unit-converter/", wait_until="networkidle")
    root = page.locator("[data-unit-converter]")
    root.locator("[data-value]").fill("١٫٥")
    state = page.evaluate(
        """() => {
          const root = document.querySelector('[data-unit-converter]');
          const controls = [...root.querySelectorAll('input, select, button')];
          return {
            direction: document.documentElement.dir,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            inputDirection: getComputedStyle(root.querySelector('[data-value]')).direction,
            minControlHeight: Math.min(...controls.map((node) => node.getBoundingClientRect().height)),
            visible: root.getBoundingClientRect().width > 0,
            result: root.querySelector('[data-result]').textContent,
            unitLabels: [...root.querySelectorAll('[data-from] option')].map((node) => node.textContent),
          };
        }"""
    )
    report["unit_converter_mobile_ar"] = state
    if (
        state["direction"] != "rtl"
        or state["overflow"] > 1
        or state["inputDirection"] != "ltr"
        or state["minControlHeight"] < 44
        or not state["visible"]
        or "٫" not in state["result"]
        or not any("كيلومتر" in label for label in state["unitLabels"])
    ):
        report["ui_detail_failures"].append(
            f"Unit converter Arabic mobile/localization failed: {state}."
        )
    page.screenshot(
        path=str(QA_DIR / "plaintool-unit-converter-mobile-ar.png"),
        full_page=False,
    )


def main() -> None:
    report = {"ui_detail_failures": []}
    external_requests: list[str] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
            mobile = browser.new_page(
                viewport={"width": 390, "height": 844}, has_touch=True
            )
            for page in (desktop, mobile):
                page.on(
                    "request",
                    lambda request: external_requests.append(request.url)
                    if request.url.startswith(("http://", "https://"))
                    and not request.url.startswith(BASE_URL)
                    else None,
                )
            run_unit_converter_desktop(desktop, report, None)
            run_unit_converter_mobile(mobile, report, None)
        finally:
            browser.close()

    if external_requests:
        report["ui_detail_failures"].append(
            f"Unit converter external requests occurred: {external_requests}."
        )
    if report["ui_detail_failures"]:
        raise SystemExit(
            "Unit converter QA failed:\n- "
            + "\n- ".join(report["ui_detail_failures"])
        )
    print(
        "Unit converter focused QA passed: conversions, localized numbers and "
        "units, mobile RTL, and local-only network."
    )


if __name__ == "__main__":
    main()
