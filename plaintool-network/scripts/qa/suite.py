import json
import sys
from dataclasses import replace

from playwright.sync_api import sync_playwright

from .common import attach_external_request_collector, attach_page_error_collectors
from .config import BASE_URL, QA_DIR, select_browser_locales
from .directory_feature import run_directory_desktop, run_directory_mobile
from .feature_coverage import FEATURE_COVERAGE
from .legal_feature import run_legal_desktop
from .new_tools_contract import validate_new_tool_inventory
from .preflight import validate_feature_coverage, verify_server
from .registry import load_route_inventory
from .responsive_feature import run_route_matrix


def main(*, full: bool = False) -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    QA_DIR.mkdir(parents=True, exist_ok=True)

    inventory = load_route_inventory()
    validate_new_tool_inventory(inventory)
    validate_feature_coverage(inventory, FEATURE_COVERAGE)
    browser_locales = select_browser_locales(inventory.locales, full=full)
    browser_inventory = replace(inventory, locales=browser_locales)
    preflight_locale = "ko" if "ko" in inventory.locales else inventory.locales[0]
    verify_server(BASE_URL, f"/{preflight_locale}/{inventory.tools[0].slug}/")

    report: dict = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
        "browser_qa_scope": "full" if full else "representative",
        "browser_qa_locales": list(browser_locales),
        "published_locale_count": len(inventory.locales),
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(
                viewport={"width": 1440, "height": 1000}, device_scale_factor=1
            )
            attach_page_error_collectors(desktop, report)
            attach_external_request_collector(desktop, report, "desktop")

            for feature_id in inventory.feature_ids:
                FEATURE_COVERAGE[feature_id].desktop(
                    desktop, report, browser_inventory
                )
            run_directory_desktop(desktop, report, browser_inventory)

            mobile = browser.new_page(
                viewport={"width": 390, "height": 844},
                device_scale_factor=1,
                has_touch=True,
            )
            attach_page_error_collectors(mobile, report)
            attach_external_request_collector(mobile, report, "mobile")

            for feature_id in inventory.feature_ids:
                FEATURE_COVERAGE[feature_id].mobile(mobile, report, browser_inventory)
            run_legal_desktop(desktop, report)
            run_route_matrix(
                desktop,
                mobile,
                report,
                browser_inventory,
                FEATURE_COVERAGE,
            )
            run_directory_mobile(mobile, report, browser_inventory)
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
