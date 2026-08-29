from .base64_feature import run_base64_desktop
from .json_feature import run_json_desktop, run_json_mobile
from .preflight import FeatureCoverage
from .registry import RouteInventory
from .responsive_feature import run_base64_mobile
from .time_feature import run_time_desktop, run_time_mobile
from .word_feature import run_word_desktop, run_word_mobile


def _run_base64_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_base64_desktop(page, report)


def _run_base64_mobile(page, report: dict, inventory: RouteInventory) -> None:
    run_base64_mobile(page, report, inventory.locales)


def _run_word_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_word_desktop(page, report)


def _run_word_mobile(page, _report: dict, _inventory: RouteInventory) -> None:
    run_word_mobile(page)


def _run_json_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_json_desktop(page, report)


def _run_json_mobile(page, report: dict, inventory: RouteInventory) -> None:
    run_json_mobile(page, report, inventory.locales)


def _run_time_desktop(page, report: dict, inventory: RouteInventory) -> None:
    run_time_desktop(page, report, inventory.locales)


def _run_time_mobile(page, report: dict, inventory: RouteInventory) -> None:
    run_time_mobile(page, report, inventory.locales)


FEATURE_COVERAGE = {
    "base64-codec": FeatureCoverage(
        desktop=_run_base64_desktop,
        mobile=_run_base64_mobile,
        focus_targets=(("input", "#codec-input"), ("output", "#codec-output")),
        compare_focus_surfaces=True,
        exercise_faq=True,
        surface_probe=True,
    ),
    "word-counter": FeatureCoverage(
        desktop=_run_word_desktop,
        mobile=_run_word_mobile,
        focus_targets=(("input", "#word-input"),),
        exercise_faq=True,
    ),
    "json-formatter": FeatureCoverage(
        desktop=_run_json_desktop,
        mobile=_run_json_mobile,
        focus_targets=(("input", "#json-input"), ("output", "#json-output")),
        focus_style="editor",
    ),
    "unix-timestamp-converter": FeatureCoverage(
        desktop=_run_time_desktop,
        mobile=_run_time_mobile,
        focus_targets=(
            ("input", "[data-timestamp]"),
            ("output", "#time-result-instant"),
        ),
    ),
}
