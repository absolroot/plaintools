import json
import sys

from playwright.sync_api import sync_playwright

from qa.common import attach_external_request_collector, attach_page_error_collectors
from qa.config import BASE_URL
from qa.generator_feature import (
    run_barcode_generator_desktop,
    run_barcode_generator_mobile,
    run_password_generator_desktop,
    run_password_generator_mobile,
)
from qa.preflight import verify_server
from qa.registry import load_route_inventory


def verify_generator_routes_and_cards(page, report: dict) -> None:
    inventory = load_route_inventory()
    slugs = ("barcode-generator", "password-generator")
    route_checks = 0
    card_checks = 0

    for locale in inventory.locales:
        expected_dir = "rtl" if locale == "ar" else "ltr"
        for slug in slugs:
            response = page.goto(
                f"{BASE_URL}/{locale}/{slug}/", wait_until="domcontentloaded"
            )
            state = page.evaluate(
                """
                () => ({
                  h1_count: document.querySelectorAll('main h1').length,
                  html_dir: document.documentElement.dir,
                  robots: document.querySelector('meta[name="robots"]')?.content || '',
                  canonical_path: new URL(document.querySelector('link[rel="canonical"]').href).pathname
                })
                """
            )
            expected_path = f"/{locale}/{slug}/"
            if (
                response is None
                or not response.ok
                or state["h1_count"] != 1
                or state["html_dir"] != expected_dir
                or state["canonical_path"] != expected_path
            ):
                report["ui_detail_failures"].append(
                    f"Generator locale route is incomplete at {expected_path}: {state}"
                )
            route_checks += 1

        page.goto(f"{BASE_URL}/{locale}/", wait_until="domcontentloaded")
        for slug in slugs:
            cards = page.locator(f'a[href="/{locale}/{slug}/"]')
            if cards.count() != 1 or not cards.first.is_visible():
                report["ui_detail_failures"].append(
                    f"Homepage card is missing for /{locale}/{slug}/."
                )
            card_checks += 1

    report["generator_route_matrix"] = {
        "locales": len(inventory.locales),
        "routes_checked": route_checks,
        "homepage_cards_checked": card_checks,
    }


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    verify_server(BASE_URL, "/en/barcode-generator/")
    report = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
        "browser_surface": "Playwright Chromium",
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(
                viewport={"width": 1440, "height": 1000}, device_scale_factor=1
            )
            attach_page_error_collectors(desktop, report)
            attach_external_request_collector(desktop, report, "desktop")
            run_barcode_generator_desktop(desktop, report, None)
            run_password_generator_desktop(desktop, report, None)
            verify_generator_routes_and_cards(desktop, report)

            mobile = browser.new_page(
                viewport={"width": 390, "height": 844},
                device_scale_factor=1,
                has_touch=True,
            )
            attach_page_error_collectors(mobile, report)
            attach_external_request_collector(mobile, report, "mobile")
            run_barcode_generator_mobile(mobile, report, None)
            run_password_generator_mobile(mobile, report, None)
        finally:
            browser.close()

    if report["console_errors"]:
        report["ui_detail_failures"].append(
            f"Console errors occurred: {report['console_errors']}"
        )
    if report["page_errors"]:
        report["ui_detail_failures"].append(
            f"Page errors occurred: {report['page_errors']}"
        )
    if report["external_conversion_requests"]:
        report["ui_detail_failures"].append(
            "Tool input triggered external requests: "
            f"{report['external_conversion_requests']}"
        )

    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["ui_detail_failures"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
