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
    page.goto(f"{BASE_URL}/ja/csv-to-json/", wait_until="networkidle")
    localized_modes = page.locator(
        "[data-data-converter] .mode-switch [data-mode]"
    ).all_text_contents()
    if localized_modes != ["JSONからCSVへの変換", "CSVからJSONへの変換"]:
        report["ui_detail_failures"].append(
            f"Data converter mode labels are not localized catalog names: {localized_modes}"
        )
    report["data_converter_localized_modes"] = localized_modes

    page.goto(f"{BASE_URL}/en/markdown-to-csv/", wait_until="networkidle")
    page.locator("[data-data-converter] [data-delimiter]").select_option("tab")
    page.locator("[data-data-converter] [data-input]").fill(
        "| name | age |\n| --- | --- |\n| Ada | 37 |"
    )
    page.locator("[data-data-converter] [data-run]").click()
    page.wait_for_function(
        "document.querySelector('[data-data-converter] [data-output]').value.includes('\\t')"
    )
    tab_state = page.evaluate(
        """
        () => ({
          delimiter: document.querySelector('[data-data-converter] [data-delimiter]').value,
          output: document.querySelector('[data-data-converter] [data-output]').value,
          contains_tab: document.querySelector('[data-data-converter] [data-output]').value.includes('\t'),
          contains_literal_slash_t: document.querySelector('[data-data-converter] [data-output]').value.includes('\\\\t')
        })
        """
    )
    if (
        tab_state["delimiter"] != "tab"
        or not tab_state["contains_tab"]
        or tab_state["contains_literal_slash_t"]
    ):
        report["ui_detail_failures"].append(
            f"Markdown-to-CSV tab delimiter was not a real tab: {tab_state}"
        )
    report["data_converter_tab"] = tab_state


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
          scroll_width: document.documentElement.scrollWidth,
          run_bottom: document.querySelector('[data-data-converter] [data-run]').getBoundingClientRect().bottom,
          viewport_height: window.innerHeight
        })
        """
    )
    if (
        state["html_dir"] != "rtl"
        or state["input_dir"] != "ltr"
        or state["output_dir"] != "ltr"
        or state["scroll_width"] > 390
        or state["run_bottom"] > state["viewport_height"] + 1
    ):
        report["ui_detail_failures"].append(
            f"Arabic data converter direction or layout is wrong: {state}"
        )
