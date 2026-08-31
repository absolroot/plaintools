import json
import re
import sys
from time import perf_counter

from playwright.sync_api import sync_playwright

from qa.common import (
    attach_external_request_collector,
    attach_page_error_collectors,
)
from qa.config import BASE_URL, QA_DIR


UUID_PATTERN = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$"
)
PUBLIC_LOCALES = (
    "en",
    "ko",
    "es",
    "de",
    "ja",
    "fr",
    "pt-BR",
    "it",
    "nl",
    "sv",
    "cs",
    "pl",
    "da",
    "no",
    "ar",
    "zh-TW",
    "tr",
)


def fail(report: dict, message: str) -> None:
    report["ui_detail_failures"].append(message)


def result_values(page) -> list[str]:
    return page.locator("[data-result-list] code").all_text_contents()


def run_desktop(page, report: dict) -> None:
    page.goto(f"{BASE_URL}/en/uuid-generator/", wait_until="networkidle")
    root = page.locator("[data-uuid-generator]")
    root.wait_for(state="visible")
    page.wait_for_function(
        "document.querySelectorAll('[data-result-list] code').length === 1"
    )

    initial = result_values(page)
    initial_match = UUID_PATTERN.fullmatch(initial[0]) if initial else None
    if not initial_match or initial_match.group(1) != "4":
        fail(report, f"Initial UUID is not RFC-shaped v4: {initial}")

    root.locator('[data-version-button="v7"]').click()
    root.locator('[data-quick-count="10"]').click()
    stale_state = root.evaluate(
        """
        (element) => ({
          stale: element.classList.contains('has-stale-result'),
          copyDisabled: element.querySelector('[data-copy-all]').disabled,
          downloadDisabled: element.querySelector('[data-download]').disabled,
        })
        """
    )
    if not all(stale_state.values()):
        fail(report, f"Changed inputs did not revoke stale actions: {stale_state}")

    root.locator("[data-generate]").click()
    v7_values = result_values(page)
    if (
        len(v7_values) != 10
        or len(set(v7_values)) != 10
        or any(
            not (match := UUID_PATTERN.fullmatch(value))
            or match.group(1) != "7"
            for value in v7_values
        )
    ):
        fail(report, f"Bulk v7 result contract failed: {v7_values}")

    root.locator('[data-format="urn"]').click()
    root.locator('[data-letter-case="upper"]').click()
    formatted = result_values(page)
    if not formatted or any(
        not value.startswith("urn:uuid:")
        or value.removeprefix("urn:uuid:") != value.removeprefix("urn:uuid:").upper()
        for value in formatted
    ):
        fail(report, f"URN/uppercase formatting failed: {formatted[:2]}")

    root.locator('[data-version-button="v5"]').click()
    if root.locator("[data-name-controls]").is_hidden():
        fail(report, "Name and namespace controls did not appear for UUID v5.")
    root.locator("[data-name]").fill("www.widgets.com")
    root.locator('[data-format="canonical"]').click()
    root.locator('[data-letter-case="lower"]').click()
    root.locator("[data-generate]").click()
    deterministic = result_values(page)
    if deterministic != ["21f7f8de-8051-5b89-8680-0195ef798b6a"]:
        fail(report, f"RFC v5 DNS vector failed: {deterministic}")

    root.locator("[data-namespace]").select_option("custom")
    root.locator("[data-custom-namespace]").fill("not-a-uuid")
    root.locator("[data-generate]").click()
    error_state = root.locator("[data-status]").evaluate(
        "element => ({ state: element.dataset.state, text: element.textContent.trim() })"
    )
    if error_state["state"] != "error" or not error_state["text"]:
        fail(report, f"Custom namespace validation was not visible: {error_state}")

    root.locator('[data-version-button="v4"]').click()
    root.locator('[data-quick-count="1000"]').click()
    started = perf_counter()
    root.locator("[data-generate]").click()
    page.wait_for_function(
        "document.querySelectorAll('[data-result-list] code').length === 1000"
    )
    elapsed_ms = round((perf_counter() - started) * 1000, 1)
    thousand = result_values(page)
    if len(thousand) != 1000 or len(set(thousand)) != 1000:
        fail(report, "The 1,000 UUID batch was incomplete or contained duplicates.")

    report["desktop"] = {
        "initialVersion": "v4",
        "bulkV7Count": len(v7_values),
        "rfcV5Vector": deterministic[0] if deterministic else None,
        "thousandRenderMs": elapsed_ms,
        "scrollWidth": page.evaluate("document.documentElement.scrollWidth"),
        "clientWidth": page.evaluate("document.documentElement.clientWidth"),
    }
    if report["desktop"]["scrollWidth"] != report["desktop"]["clientWidth"]:
        fail(report, f"Desktop UUID route overflowed: {report['desktop']}")

    page.screenshot(
        path=str(QA_DIR / "plaintool-uuid-generator-desktop-en.png"),
        full_page=False,
    )


def run_routes(page, report: dict) -> None:
    states = []
    for locale in PUBLIC_LOCALES:
        response = page.goto(
            f"{BASE_URL}/{locale}/uuid-generator/", wait_until="domcontentloaded"
        )
        state = page.evaluate(
            """
            () => ({
              lang: document.documentElement.lang,
              direction: document.documentElement.dir,
              h1: document.querySelector('main h1')?.textContent?.trim(),
              robots: document.querySelector('meta[name="robots"]')?.content,
              tool: Boolean(document.querySelector('[data-uuid-generator]')),
            })
            """
        )
        state["locale"] = locale
        state["status"] = response.status if response else None
        states.append(state)
        if (
            state["status"] != 200
            or state["lang"] != locale
            or not state["h1"]
            or not state["tool"]
            or "noindex" not in (state["robots"] or "")
            or (locale == "ar" and state["direction"] != "rtl")
        ):
            fail(report, f"Localized UUID route contract failed: {state}")
    report["localizedRoutes"] = states

    page.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    card = page.locator(
        '[data-directory-search-card][href="/ko/uuid-generator/"]'
    )
    report["koreanHomepageCard"] = {
        "count": card.count(),
        "text": card.first.text_content().strip() if card.count() else None,
    }
    if card.count() != 1:
        fail(report, f"Korean homepage UUID card is missing: {report['koreanHomepageCard']}")


def run_mobile(page, report: dict) -> None:
    page.emulate_media(reduced_motion="reduce")
    page.goto(f"{BASE_URL}/ar/uuid-generator/", wait_until="networkidle")
    root = page.locator("[data-uuid-generator]")
    root.locator('[data-quick-count="10"]').click()
    root.locator("[data-generate]").click()
    page.wait_for_function(
        "document.querySelectorAll('[data-result-list] code').length === 10"
    )
    state = root.evaluate(
        """
        (element) => ({
          direction: document.documentElement.dir,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          resultDirections: [...element.querySelectorAll('[data-result-list] code')]
            .map((node) => node.dir),
          visibleControlHeights: [...element.querySelectorAll('button, input, select')]
            .filter((node) => !node.disabled && node.getClientRects().length)
            .map((node) => node.getBoundingClientRect().height),
          resultTop: element.querySelector('[data-results]').getBoundingClientRect().top,
        })
        """
    )
    report["mobileArabic"] = state
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] != state["clientWidth"]
        or any(direction != "ltr" for direction in state["resultDirections"])
        or min(state["visibleControlHeights"]) < 44
        or state["resultTop"] > 180
    ):
        fail(report, f"Arabic mobile layout/scroll contract failed: {state}")

    page.screenshot(
        path=str(QA_DIR / "plaintool-uuid-generator-mobile-ar.png"),
        full_page=False,
    )


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    report: dict = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
        mobile = browser.new_page(
            viewport={"width": 390, "height": 844}, has_touch=True
        )
        for surface, page in (("desktop", desktop), ("mobile", mobile)):
            attach_page_error_collectors(page, report)
            attach_external_request_collector(page, report, surface)

        run_desktop(desktop, report)
        run_routes(desktop, report)
        run_mobile(mobile, report)
        browser.close()

    if (
        report["console_errors"]
        or report["page_errors"]
        or report["external_conversion_requests"]
    ):
        fail(report, "Console, page, or external request errors occurred.")

    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["ui_detail_failures"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
