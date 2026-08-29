from .config import BASE_URL


def run_data_converter_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/markdown-to-html/", wait_until="networkidle")
    payload = (
        '<img src="https://qa-xss.invalid/probe" '
        'onerror="window.__plainToolXss=1">'
        "<script>window.__plainToolXss=2</script>"
    )
    page.locator("[data-data-converter] [data-input]").fill(payload)
    page.locator("[data-data-converter] [data-run]").click()
    page.wait_for_function(
        "document.querySelector('[data-data-converter] [data-output]').value.includes('__plainToolXss')"
    )
    state = page.evaluate(
        """
        () => ({
          output_tag: document.querySelector('[data-data-converter] [data-output]').tagName,
          output: document.querySelector('[data-data-converter] [data-output]').value,
          injected_images: document.querySelectorAll('img[src*="qa-xss.invalid"]').length,
          executed: window.__plainToolXss
        })
        """
    )
    if (
        state["output_tag"] != "TEXTAREA"
        or "__plainToolXss" not in state["output"]
        or state["injected_images"]
        or state["executed"] is not None
    ):
        report["ui_detail_failures"].append(
            f"Markdown-to-HTML output escaped its textarea or executed: {state}"
        )
    report["data_converter_xss"] = state


def run_data_converter_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/csv-to-json/", wait_until="networkidle")
    page.locator("[data-data-converter] [data-input]").fill("name,note\nAda,مرحبا")
    page.locator("[data-data-converter] [data-run]").click()
    page.wait_for_function(
        "document.querySelector('[data-data-converter] [data-output]').value.includes('مرحبا')"
    )
    state = page.evaluate(
        """
        () => ({
          html_dir: document.documentElement.dir,
          input_dir: getComputedStyle(document.querySelector('[data-data-converter] [data-input]')).direction,
          output_dir: getComputedStyle(document.querySelector('[data-data-converter] [data-output]')).direction,
          scroll_width: document.documentElement.scrollWidth
        })
        """
    )
    if (
        state["html_dir"] != "rtl"
        or state["input_dir"] != "ltr"
        or state["output_dir"] != "ltr"
        or state["scroll_width"] > 390
    ):
        report["ui_detail_failures"].append(
            f"Arabic data converter direction or layout is wrong: {state}"
        )
