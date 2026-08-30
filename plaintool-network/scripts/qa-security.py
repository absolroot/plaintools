import json
import re
import sys

from playwright.sync_api import sync_playwright

from qa.common import attach_external_request_collector, attach_page_error_collectors
from qa.config import BASE_URL
from qa.formatter_subnet_feature import (
    run_ip_subnet_desktop,
    run_ip_subnet_mobile,
    run_source_formatter_desktop,
    run_source_formatter_mobile,
)
from qa.preflight import verify_server


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    verify_server(BASE_URL, "/en/html-formatter/")
    report = {
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
            attach_external_request_collector(desktop, report, "security-desktop")
            worker_requests = []
            desktop.on(
                "request",
                lambda request: worker_requests.append(request.url)
                if re.search(r"/worker-[A-Za-z0-9_-]+\.js$", request.url)
                else None,
            )
            for route in (
                "html-formatter",
                "css-formatter",
                "javascript-formatter",
                "sql-formatter",
            ):
                before = len(worker_requests)
                desktop.goto(f"{BASE_URL}/en/{route}/", wait_until="networkidle")
                initial_requests = worker_requests[before:]
                if initial_requests:
                    report["ui_detail_failures"].append(
                        f"{route} loaded a worker before input: {initial_requests}"
                    )
            report["formatter_initial_worker_requests"] = worker_requests.copy()
            run_source_formatter_desktop(desktop, report, None)
            run_ip_subnet_desktop(desktop, report, None)

            mobile = browser.new_page(
                viewport={"width": 390, "height": 844},
                device_scale_factor=1,
                has_touch=True,
            )
            attach_page_error_collectors(mobile, report)
            attach_external_request_collector(mobile, report, "security-mobile")
            run_source_formatter_mobile(mobile, report, None)
            run_ip_subnet_mobile(mobile, report, None)
        finally:
            browser.close()

    for key in (
        "console_errors",
        "page_errors",
        "external_conversion_requests",
    ):
        if report[key]:
            report["ui_detail_failures"].append(f"{key}: {report[key]}")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["ui_detail_failures"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
