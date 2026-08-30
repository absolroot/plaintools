from .config import BASE_URL


def run_ai_text_cleaner_desktop(page, report: dict, _inventory) -> None:
    states = {}
    sample = "A\u200bB\u202eC\u2060D👩\u200d💻"
    for locale in ("en", "ko", "ar"):
        page.goto(
            f"{BASE_URL}/{locale}/ai-watermark-remover/", wait_until="networkidle"
        )
        page.locator("[data-ai-text-cleaner] [data-input]").fill(sample)
        page.wait_for_function(
            "document.querySelector('[data-ai-text-cleaner] [data-output]').value === 'AB\\u202eCD👩‍💻'"
        )
        states[locale] = page.evaluate(
            """
            () => ({
              html_dir: document.documentElement.dir,
              output: document.querySelector('[data-ai-text-cleaner] [data-output]').value,
              report_hidden: document.querySelector('[data-ai-text-cleaner] [data-report]').hidden,
              report_text: document.querySelector('[data-ai-text-cleaner] [data-report]').innerText,
              removed_rows: document.querySelectorAll('[data-ai-text-cleaner] [data-removed-list] li').length,
              advanced_warning: document.querySelector('[data-ai-text-cleaner] .tool-warning')?.textContent.trim(),
              normalize_spaces_default: document.querySelector('[data-option="normalizeNoBreakSpaces"]')?.checked
            })
            """
        )
        state = states[locale]
        expected_dir = "rtl" if locale == "ar" else "ltr"
        if (
            state["html_dir"] != expected_dir
            or state["output"] != "AB\u202eCD👩‍💻"
            or state["report_hidden"]
            or state["removed_rows"] != 2
            or "U+200B" not in state["report_text"]
            or "U+2060" not in state["report_text"]
            or not state["advanced_warning"]
            or state["normalize_spaces_default"]
        ):
            report["ui_detail_failures"].append(
                f"AI cleaner {locale} result/report is incomplete: {state}"
            )
    report["ai_text_cleaner"] = states


def run_ai_text_cleaner_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/ai-watermark-remover/", wait_until="networkidle")
    page.locator("[data-ai-text-cleaner] [data-input]").fill("مرح\u200bبا")
    page.wait_for_function(
        "document.querySelector('[data-ai-text-cleaner] [data-output]').value === 'مرحبا'"
    )
    if page.evaluate("document.documentElement.scrollWidth") > 390:
        report["ui_detail_failures"].append("Arabic AI cleaner overflows mobile width.")
