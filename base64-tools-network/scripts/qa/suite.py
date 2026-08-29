import json
import sys

from playwright.sync_api import sync_playwright

from .base64_feature import run_base64_desktop
from .common import attach_page_error_collectors
from .config import BASE_URL, QA_DIR
from .directory_feature import run_directory_desktop, run_directory_mobile
from .json_feature import run_json_desktop, run_json_mobile
from .legal_feature import run_legal_desktop
from .preflight import validate_feature_inventory, verify_server
from .registry import load_route_inventory
from .responsive_feature import run_base64_mobile, run_route_matrix
from .time_feature import run_time_desktop, run_time_mobile
from .word_feature import run_word_desktop, run_word_mobile


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    QA_DIR.mkdir(parents=True, exist_ok=True)

    inventory = load_route_inventory()
    validate_feature_inventory(inventory)
    preflight_locale = "ko" if "ko" in inventory.locales else inventory.locales[0]
    verify_server(BASE_URL, f"/{preflight_locale}/base64-decode/")

    report: dict = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = browser.new_page(
                viewport={"width": 1440, "height": 1000}, device_scale_factor=1
            )
            attach_page_error_collectors(desktop, report)

            run_base64_desktop(desktop, report)
            run_directory_desktop(desktop, report)
            run_word_desktop(desktop, report)
            run_json_desktop(desktop, report)
            run_time_desktop(desktop, report, inventory.locales)

            mobile = browser.new_page(
                viewport={"width": 390, "height": 844},
                device_scale_factor=1,
                has_touch=True,
            )
            attach_page_error_collectors(mobile, report)

            run_base64_mobile(mobile, report, inventory.locales)
            run_json_mobile(mobile, report, inventory.locales)
            run_legal_desktop(desktop, report)
            run_route_matrix(desktop, mobile, report, inventory)
            run_word_mobile(mobile)
            run_time_mobile(mobile, report, inventory.locales)
            run_directory_mobile(mobile, report)
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
