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
    sentinel = "https://example.com/a path?q=qa-url-sentinel"
    page.locator("[data-url-codec] [data-input]").fill(sentinel)
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-output]').value.includes('%20')"
    )
    page.locator('.url-route-switch a[href="/en/url-decode/"]').click()
    page.wait_for_url("**/en/url-decode/")
    decode_state = page.evaluate(
        """
        () => ({
          mode: document.querySelector('[data-url-codec]').dataset.mode,
          current: document.querySelector('.url-route-switch [aria-current="page"]')?.getAttribute('href'),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          internal_mode_visible: [...document.querySelectorAll('[data-url-codec] .mode-switch')]
            .some((element) => getComputedStyle(element).display !== 'none')
        })
        """
    )
    if (
        decode_state["mode"] != "decode"
        or decode_state["current"] != "/en/url-decode/"
        or urlsplit(decode_state["canonical"]).path != "/en/url-decode/"
        or decode_state["internal_mode_visible"]
        or "qa-url-sentinel" in page.url
    ):
        report["ui_detail_failures"].append(
            f"URL encode/decode path and mode diverged: {decode_state}, url={page.url}"
        )

    page.locator("[data-url-codec] [data-input]").fill("hello%20world")
    page.wait_for_function(
        "document.querySelector('[data-url-codec] [data-output]').value === 'hello world'"
    )
    report["url_codec"] = {"locale_states": states, "decode": decode_state}


def run_url_codec_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/url-decode/", wait_until="networkidle")
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
