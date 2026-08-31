from urllib.parse import urlsplit

from .config import BASE_URL


def run_url_codec_desktop(page, report: dict, _inventory) -> None:
    states = {}
    for locale in ("en", "ko", "ar"):
        page.goto(f"{BASE_URL}/{locale}/url-encode/", wait_until="networkidle")
        states[locale] = page.evaluate(
            """
            () => ({
              html_dir: document.documentElement.dir,
              mode: document.querySelector('[data-url-codec]').dataset.mode,
              input_dir: getComputedStyle(document.querySelector('[data-url-codec] [data-input]')).direction,
              output_dir: getComputedStyle(document.querySelector('[data-url-codec] [data-output]')).direction
            })
            """
        )
        expected_dir = "rtl" if locale == "ar" else "ltr"
        state = states[locale]
        if state != {
            "html_dir": expected_dir,
            "mode": "encode",
            "input_dir": "ltr",
            "output_dir": "ltr",
        }:
            report["ui_detail_failures"].append(
                f"URL codec {locale} direction or initial mode is wrong: {state}"
            )

    page.goto(f"{BASE_URL}/en/url-encode/", wait_until="networkidle")
    options_state = page.evaluate(
        """
        () => ({
          topbar_option_count: document.querySelectorAll(
            '.url-codec-topbar [data-scope], .url-codec-topbar [data-form-space], .url-codec-topbar [data-recursive]'
          ).length,
          options_open: document.querySelector('[data-url-codec] .formatter-options').open,
          scope_visible: document.querySelector('[data-scope]').checkVisibility()
        })
        """
    )
    if options_state != {
        "topbar_option_count": 0,
        "options_open": False,
        "scope_visible": False,
    }:
        report["ui_detail_failures"].append(
            f"URL options are not isolated in the collapsed options section: {options_state}"
        )

    page.locator("[data-url-codec] .formatter-options > summary").click()
    page.locator(
        "[data-url-codec] [aria-describedby='url-form-space-help']"
    ).hover()
    layout_state = page.evaluate(
        """
        () => {
          const rect = (selector) => {
            const bounds = document.querySelector(selector).getBoundingClientRect();
            return {
              top: bounds.top,
              bottom: bounds.bottom,
              center: bounds.top + bounds.height / 2
            };
          };
          return {
            converter: rect('[data-url-codec]'),
            scopeLabel: rect('.url-scope-field .tooltip--label'),
            scopeSelect: rect('[data-url-codec] [data-scope]'),
            formCheckbox: rect('[data-url-codec] [data-form-space]'),
            formLabel: rect('.formatter-check-row .tooltip--label'),
            formHelp: rect('#url-form-space-help')
          };
        }
        """
    )
    aligned_centers = (
        layout_state["scopeLabel"]["center"],
        layout_state["scopeSelect"]["center"],
        layout_state["formCheckbox"]["center"],
        layout_state["formLabel"]["center"],
    )
    if max(aligned_centers) - min(aligned_centers) > 1:
        report["ui_detail_failures"].append(
            f"URL option controls do not share one vertical axis: {layout_state}"
        )
    if (
        layout_state["formHelp"]["top"] < layout_state["converter"]["top"]
        or layout_state["formHelp"]["bottom"]
        > layout_state["converter"]["bottom"]
    ):
        report["ui_detail_failures"].append(
            f"URL form-space tooltip is clipped by the converter: {layout_state}"
        )

    page.locator("[data-url-codec] [data-sample]").click()
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-input]').value === "
        "'https://example.com/search?q=hello world&lang=en'"
    )
    page.locator("[data-url-codec] [data-clear]").click()
    sentinel = "https://example.com/a path?q=qa-url-sentinel"
    page.locator("[data-url-codec] [data-input]").fill(sentinel)
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-output]').value.includes('%20')"
    )
    page.locator('[data-url-codec] .mode-switch a[href="/en/url-decode/"]').click()
    page.wait_for_url("**/en/url-decode/")
    decode_state = page.evaluate(
        """
        () => ({
          mode: document.querySelector('[data-url-codec]').dataset.mode,
          current: document.querySelector('[data-url-codec] .mode-switch [aria-current="page"]')?.dataset.mode,
          current_tag: document.querySelector('[data-url-codec] .mode-switch [aria-current="page"]')?.tagName,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          shared_mode_visible: [...document.querySelectorAll('[data-url-codec] .mode-switch')]
            .some((element) => getComputedStyle(element).display !== 'none')
        })
        """
    )
    if (
        decode_state["mode"] != "decode"
        or decode_state["current"] != "decode"
        or decode_state["current_tag"] != "BUTTON"
        or urlsplit(decode_state["canonical"]).path != "/en/url-decode/"
        or not decode_state["shared_mode_visible"]
        or "qa-url-sentinel" in page.url
    ):
        report["ui_detail_failures"].append(
            f"URL encode/decode path and mode diverged: {decode_state}, url={page.url}"
        )

    page.locator("[data-url-codec] [data-input]").fill("hello%20world")
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-output]').value === 'hello world'"
    )
    pass_limit = page.locator("[data-url-codec] [data-pass-limit-control]")
    page.locator("[data-url-codec] .formatter-options > summary").click()
    if pass_limit.is_visible():
        report["ui_detail_failures"].append(
            "URL decoder pass limit is visible before repeat decode is enabled."
        )
    page.locator("[data-url-codec] [data-recursive]").check()
    if not pass_limit.is_visible():
        report["ui_detail_failures"].append(
            "URL decoder pass limit did not appear after repeat decode was enabled."
        )
    report["url_codec"] = {"locale_states": states, "decode": decode_state}


def run_url_codec_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/url-decode/", wait_until="networkidle")
    page.locator("[data-url-codec] .formatter-options > summary").click()
    page.locator("[data-url-codec] [data-recursive]").check()
    page.locator("[data-url-codec] [data-input]").fill(
        "%D9%85%D8%B1%D8%AD%D8%A8%D8%A7"
    )
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-output]').value === 'مرحبا'"
    )
    width = page.evaluate("document.documentElement.scrollWidth")
    if width > 390:
        report["ui_detail_failures"].append(
            f"Arabic URL decoder overflows mobile width: {width}px"
        )
