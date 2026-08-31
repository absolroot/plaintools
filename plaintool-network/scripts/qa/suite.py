import json
import sys
from dataclasses import replace
from pathlib import Path

from playwright.sync_api import sync_playwright

from .common import attach_external_request_collector, attach_page_error_collectors
from .config import BASE_URL, QA_DIR
from .directory_feature import run_directory_desktop, run_directory_mobile
from .feature_coverage import FEATURE_COVERAGE
from .legal_feature import run_legal_desktop
from .new_tools_contract import validate_new_tool_inventory
from .preflight import validate_feature_coverage, verify_server
from .registry import load_route_inventory
from .responsive_feature import run_route_matrix
from .scope import QaSelection, affected_selection, changed_files, explicit_selection


def _selection_report(selection: QaSelection, published_locale_count: int) -> dict:
    return {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "ui_detail_failures": [],
        "browser_qa_scope": selection.label,
        "browser_qa_locales": list(selection.locales),
        "browser_qa_features": list(selection.behavior_feature_ids),
        "browser_qa_routes": list(selection.routes),
        "browser_qa_surfaces": list(selection.surfaces),
        "browser_route_visit_count": len(selection.locales)
        * len(selection.routes)
        * len(selection.surfaces),
        "published_locale_count": published_locale_count,
        "changed_files": list(selection.changed_files),
    }


def main(
    *,
    full: bool = False,
    affected: bool = False,
    changed_from: str = "HEAD",
    features: tuple[str, ...] = (),
    locales: tuple[str, ...] = (),
    surfaces: tuple[str, ...] = ("desktop", "mobile"),
    route_scope: str | None = None,
) -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    QA_DIR.mkdir(parents=True, exist_ok=True)

    inventory = load_route_inventory()
    validate_new_tool_inventory(inventory)
    validate_feature_coverage(inventory, FEATURE_COVERAGE)
    if affected:
        selection = affected_selection(
            inventory,
            changed_files(Path(__file__).resolve().parents[2], changed_from),
            surfaces=surfaces,
        )
    else:
        selection = explicit_selection(
            inventory,
            features=features,
            locales=locales,
            surfaces=surfaces,
            route_scope=route_scope,
            full=full,
        )

    report = _selection_report(selection, len(inventory.locales))
    if not selection.browser_required:
        report["browser_qa_skipped"] = "No browser-relevant changed files."
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return

    browser_inventory = replace(
        inventory,
        locales=selection.locales,
        routes=selection.routes,
    )
    if selection.routes:
        preflight_route = selection.routes[0]
    elif selection.behavior_feature_ids:
        preflight_route = next(
            f"{tool.slug}/"
            for tool in inventory.tools
            if tool.feature_id in selection.behavior_feature_ids
        )
    elif selection.run_legal:
        preflight_route = f"{inventory.legal_pages[0]}/"
    else:
        preflight_route = ""
    verify_server(BASE_URL, f"/{selection.locales[0]}/{preflight_route}")

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            desktop = None
            if "desktop" in selection.surfaces:
                desktop = browser.new_page(
                    viewport={"width": 1440, "height": 1000}, device_scale_factor=1
                )
                attach_page_error_collectors(desktop, report)
                attach_external_request_collector(desktop, report, "desktop")
                for feature_id in selection.behavior_feature_ids:
                    FEATURE_COVERAGE[feature_id].desktop(
                        desktop, report, browser_inventory
                    )
                if selection.run_directory:
                    run_directory_desktop(desktop, report, browser_inventory)
                if selection.run_legal:
                    run_legal_desktop(desktop, report)

            mobile = None
            if "mobile" in selection.surfaces:
                mobile = browser.new_page(
                    viewport={"width": 390, "height": 844},
                    device_scale_factor=1,
                    has_touch=True,
                )
                attach_page_error_collectors(mobile, report)
                attach_external_request_collector(mobile, report, "mobile")
                for feature_id in selection.behavior_feature_ids:
                    FEATURE_COVERAGE[feature_id].mobile(
                        mobile, report, browser_inventory
                    )

            run_route_matrix(
                desktop,
                mobile,
                report,
                browser_inventory,
                FEATURE_COVERAGE,
                surfaces=selection.surfaces,
                run_surface_probe=selection.run_surface_probe,
            )
            if mobile is not None and selection.run_directory:
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
