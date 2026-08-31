import json
import sys

from playwright.sync_api import sync_playwright

from qa.common import (
    attach_external_request_collector,
    attach_page_error_collectors,
)
from qa.config import BASE_URL
from qa.date_calculator_feature import (
    run_date_calculator_desktop,
    run_date_calculator_mobile,
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
        desktop = browser.new_page(
            viewport={"width": 1440, "height": 1000}, device_scale_factor=1
        )
        mobile = browser.new_page(
            viewport={"width": 390, "height": 844},
            device_scale_factor=1,
            has_touch=True,
        )
        attach_page_error_collectors(desktop, report)
        attach_external_request_collector(desktop, report, "desktop")
        attach_page_error_collectors(mobile, report)
        attach_external_request_collector(mobile, report, "mobile")

        run_date_calculator_desktop(desktop, report, None)
        run_date_calculator_mobile(mobile, report, None)

        desktop.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
        report["korean_directory"] = desktop.evaluate(
            """
            () => [...document.querySelectorAll('[data-directory-search-card]')]
              .map((card) => ({
                name: card.querySelector('h3')?.textContent?.trim(),
                href: card.getAttribute('href'),
              }))
              .filter((item) => [
                '날짜 계산기',
                '디데이 계산기',
                '만 나이 계산기',
              ].includes(item.name))
            """
        )

        expected_modes = {
            "date-calculator": "math",
            "dday-calculator": "difference",
            "age-calculator": "age",
        }
        route_states = {}
        for route, expected_mode in expected_modes.items():
            desktop.goto(f"{BASE_URL}/ko/{route}/", wait_until="networkidle")
            state = desktop.evaluate(
                """
                () => {
                  const intro = document.querySelector('.tool-intro')
                    .getBoundingClientRect();
                  const shell = document.querySelector('.tool-shell')
                    .getBoundingClientRect();
                  const support = document.querySelector('.content-sections')
                    .getBoundingClientRect();
                  const active = document.querySelector(
                    '[data-mode-button][aria-current="page"]',
                  );
                  return {
                    title: document.title,
                    h1: document.querySelector('h1')?.textContent?.trim(),
                    mode: document.querySelector('[data-date-calculator]')
                      ?.dataset.mode,
                    activeHref: active?.getAttribute('href'),
                    currentCount: document.querySelectorAll(
                      '[data-mode-button][aria-current="page"]',
                    ).length,
                    clientWidth: document.documentElement.clientWidth,
                    scrollWidth: document.documentElement.scrollWidth,
                    axes: [
                      intro.left,
                      shell.left,
                      support.left,
                      intro.right,
                      shell.right,
                      support.right,
                    ],
                  };
                }
                """
            )
            route_states[route] = state
            left_axes = state["axes"][:3]
            right_axes = state["axes"][3:]
            if (
                state["mode"] != expected_mode
                or state["currentCount"] != 1
                or state["scrollWidth"] != state["clientWidth"]
                or max(left_axes) - min(left_axes) > 1
                or max(right_axes) - min(right_axes) > 1
            ):
                report["ui_detail_failures"].append(
                    f"Route state failed for {route}: {state}"
                )
        report["route_states"] = route_states

        expected_directory = [
            {"name": "날짜 계산기", "href": "/ko/date-calculator/"},
            {"name": "디데이 계산기", "href": "/ko/dday-calculator/"},
            {"name": "만 나이 계산기", "href": "/ko/age-calculator/"},
        ]
        if report["korean_directory"] != expected_directory:
            report["ui_detail_failures"].append(
                f"Korean directory split failed: {report['korean_directory']}"
            )
        browser.close()

    if (
        report["console_errors"]
        or report["page_errors"]
        or report["external_conversion_requests"]
    ):
        report["ui_detail_failures"].append(
            "Browser console, page, or external request errors occurred"
        )

    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["ui_detail_failures"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
