import json
import sys

from playwright.sync_api import sync_playwright

from qa.common import attach_external_request_collector, attach_page_error_collectors
from qa.pdf_toolkit_feature import (
    run_pdf_toolkit_desktop,
    run_pdf_toolkit_mobile,
)


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    report = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
    }
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
            mobile = browser.new_page(
                viewport={"width": 390, "height": 844}, has_touch=True
            )
            attach_page_error_collectors(desktop, report)
            attach_external_request_collector(desktop, report, "pdf-desktop")
            attach_page_error_collectors(mobile, report)
            attach_external_request_collector(mobile, report, "pdf-mobile")
            run_pdf_toolkit_desktop(desktop, report, None)
            run_pdf_toolkit_mobile(mobile, report, None)
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
            "PDF input triggered external requests: "
            f"{report['external_conversion_requests']}"
        )
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["ui_detail_failures"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
