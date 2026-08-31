from .base64_feature import run_base64_desktop
from .background_remover_feature import (
    run_background_remover_desktop,
    run_background_remover_mobile,
)
from .ai_text_cleaner_feature import (
    run_ai_text_cleaner_desktop,
    run_ai_text_cleaner_mobile,
)
from .case_converter_feature import run_case_converter_desktop, run_case_converter_mobile
from .code_security_feature import (
    run_hash_desktop,
    run_hash_mobile,
    run_jwt_desktop,
    run_jwt_mobile,
)
from .data_converter_feature import (
    run_data_converter_desktop,
    run_data_converter_mobile,
)
from .json_feature import run_json_desktop, run_json_mobile
from .preflight import FeatureCoverage
from .registry import RouteInventory
from .responsive_feature import run_base64_mobile
from .qr_feature import run_qr_desktop, run_qr_mobile
from .time_feature import run_time_desktop, run_time_mobile
from .text_compare_feature import run_text_compare_desktop, run_text_compare_mobile
from .word_feature import run_word_desktop, run_word_mobile
from .url_codec_feature import run_url_codec_desktop, run_url_codec_mobile
from .formatter_subnet_feature import (
    run_source_formatter_desktop, run_source_formatter_mobile,
    run_ip_subnet_desktop, run_ip_subnet_mobile,
)


def _run_base64_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_base64_desktop(page, report)


def _run_base64_mobile(page, report: dict, inventory: RouteInventory) -> None:
    run_base64_mobile(page, report, inventory.locales)


def _run_case_converter_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_case_converter_desktop(page, report)


def _run_case_converter_mobile(page, report: dict, _inventory: RouteInventory) -> None:
    run_case_converter_mobile(page, report)


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


def _run_text_compare_desktop(page, report: dict, _inventory: RouteInventory) -> None:
    run_text_compare_desktop(page, report)


def _run_text_compare_mobile(page, report: dict, _inventory: RouteInventory) -> None:
    run_text_compare_mobile(page, report)


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
    "text-compare": FeatureCoverage(
        desktop=_run_text_compare_desktop,
        mobile=_run_text_compare_mobile,
        focus_targets=(("input", "[data-original]"), ("output", "[data-changed]")),
        focus_style="editor",
        exercise_faq=True,
    ),
    "case-converter": FeatureCoverage(
        desktop=_run_case_converter_desktop,
        mobile=_run_case_converter_mobile,
        focus_targets=(("input", "[data-input]"), ("output", "[data-output]")),
        focus_style="editor",
        exercise_faq=True,
    ),
    "ai-text-cleaner": FeatureCoverage(
        desktop=run_ai_text_cleaner_desktop,
        mobile=run_ai_text_cleaner_mobile,
        focus_targets=(("input", "[data-ai-text-cleaner] [data-input]"),),
        exercise_faq=True,
    ),
    "data-converter": FeatureCoverage(
        desktop=run_data_converter_desktop,
        mobile=run_data_converter_mobile,
        focus_targets=(
            ("input", "[data-data-converter] [data-input]"),
            ("output", "[data-data-converter] [data-output]"),
        ),
        focus_style="editor",
        exercise_faq=True,
    ),
    "hash-generator": FeatureCoverage(
        desktop=run_hash_desktop,
        mobile=run_hash_mobile,
        focus_targets=(("input", "[data-hash-generator] [data-input]"),),
        exercise_faq=True,
    ),
    "jwt-decoder": FeatureCoverage(
        desktop=run_jwt_desktop,
        mobile=run_jwt_mobile,
        focus_targets=(("input", "[data-jwt-decoder] [data-input]"),),
        exercise_faq=True,
    ),
    "qr-code": FeatureCoverage(
        desktop=run_qr_desktop,
        mobile=run_qr_mobile,
        focus_targets=(("input", ".converter textarea"),),
        exercise_faq=True,
    ),
    "url-codec": FeatureCoverage(
        desktop=run_url_codec_desktop,
        mobile=run_url_codec_mobile,
        focus_targets=(
            ("input", "[data-url-codec] [data-input]"),
            ("output", "[data-url-codec] [data-output]"),
        ),
        focus_style="editor",
        exercise_faq=True,
    ),
    "source-formatter": FeatureCoverage(
        desktop=run_source_formatter_desktop,
        mobile=run_source_formatter_mobile,
        focus_targets=(("input", ".converter [data-input]"), ("output", ".converter [data-output]")),
        focus_style="editor",
        exercise_faq=True,
    ),
    "ip-subnet": FeatureCoverage(
        desktop=run_ip_subnet_desktop,
        mobile=run_ip_subnet_mobile,
        focus_targets=(("input", "[data-ip-subnet] [data-input]"),),
        exercise_faq=True,
    ),
    "background-remover": FeatureCoverage(
        desktop=run_background_remover_desktop,
        mobile=run_background_remover_mobile,
        focus_targets=(("input", "[data-background-remover] [data-open-file]"),),
        exercise_faq=True,
    ),
}
