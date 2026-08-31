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
