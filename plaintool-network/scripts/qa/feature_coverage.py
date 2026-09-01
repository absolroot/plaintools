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
from .date_calculator_feature import (
    run_date_calculator_desktop,
    run_date_calculator_mobile,
)
from .json_feature import run_json_desktop, run_json_mobile
from .preflight import FeatureCoverage
from .registry import RouteInventory
from .responsive_feature import run_base64_mobile
from .qr_feature import run_qr_desktop, run_qr_mobile
from .time_feature import run_time_desktop, run_time_mobile
from .time_zone_converter_feature import (
    run_time_zone_converter_desktop,
    run_time_zone_converter_mobile,
)
from .text_compare_feature import run_text_compare_desktop, run_text_compare_mobile
from .word_feature import run_word_desktop, run_word_mobile
from .url_codec_feature import run_url_codec_desktop, run_url_codec_mobile
from .formatter_subnet_feature import (
    run_source_formatter_desktop, run_source_formatter_mobile,
    run_ip_subnet_desktop, run_ip_subnet_mobile,
)
from .image_converter_feature import (
    run_image_converter_desktop,
    run_image_converter_mobile,
)
from .calculator_feature import (
    run_math_calculator_desktop,
    run_math_calculator_mobile,
    run_percentage_calculator_desktop,
    run_percentage_calculator_mobile,
    run_bmi_calculator_desktop,
    run_bmi_calculator_mobile,
)
from .generator_feature import (
    run_barcode_generator_desktop,
    run_barcode_generator_mobile,
    run_password_generator_desktop,
    run_password_generator_mobile,
)
from .pdf_toolkit_feature import run_pdf_toolkit_desktop, run_pdf_toolkit_mobile
from .image_upscaler_feature import (
    run_image_upscaler_desktop,
    run_image_upscaler_mobile,
)
from .image_resizer_feature import (
    run_image_resizer_desktop,
    run_image_resizer_mobile,
)
from .image_crop_feature import run_image_crop_desktop, run_image_crop_mobile
from .regex_feature import run_regex_tester_desktop, run_regex_tester_mobile
from .unit_converter_feature import (
    run_unit_converter_desktop,
    run_unit_converter_mobile,
)
from .uuid_generator_feature import (
    run_uuid_generator_desktop,
    run_uuid_generator_mobile,
)
from .travel_link_feature import (
    run_travel_link_desktop,
    run_travel_link_mobile,
    run_travel_link_support_content,
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


def _run_travel_link_desktop(
    page, report: dict, inventory: RouteInventory
) -> None:
    run_travel_link_desktop(page, report, inventory)
    run_travel_link_support_content(page, report, inventory)


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
    "time-zone-converter": FeatureCoverage(
        desktop=run_time_zone_converter_desktop,
        mobile=run_time_zone_converter_mobile,
        focus_targets=(("input", "[data-source-time]"),),
        exercise_faq=True,
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
    "date-calculator": FeatureCoverage(
        desktop=run_date_calculator_desktop,
        mobile=run_date_calculator_mobile,
        focus_targets=(
            ("action", "[data-date-calculator] [data-calculate]"),
        ),
        exercise_faq=True,
    ),
    "image-converter": FeatureCoverage(
        desktop=run_image_converter_desktop,
        mobile=run_image_converter_mobile,
        focus_targets=(("input", "[data-image-converter] [data-source-format]"),),
        exercise_faq=True,
    ),
    "math-calculator": FeatureCoverage(
        desktop=run_math_calculator_desktop,
        mobile=run_math_calculator_mobile,
        focus_targets=(("input", "[data-math-calculator] [data-calculate]"),),
        exercise_faq=True,
    ),
    "percentage-calculator": FeatureCoverage(
        desktop=run_percentage_calculator_desktop,
        mobile=run_percentage_calculator_mobile,
        focus_targets=(
            (
                "input",
                '[data-percentage-calculator] [data-mode-panel]:not([hidden]) [data-field="percent"]',
            ),
        ),
        exercise_faq=True,
    ),
    "bmi-calculator": FeatureCoverage(
        desktop=run_bmi_calculator_desktop,
        mobile=run_bmi_calculator_mobile,
        focus_targets=(("input", '[data-bmi-calculator] [data-field="weightKilograms"]'),),
        exercise_faq=True,
    ),
    "barcode-generator": FeatureCoverage(
        desktop=run_barcode_generator_desktop,
        mobile=run_barcode_generator_mobile,
        focus_targets=(("input", "[data-barcode-generator] [data-value]"),),
        exercise_faq=True,
    ),
    "password-generator": FeatureCoverage(
        desktop=run_password_generator_desktop,
        mobile=run_password_generator_mobile,
        focus_targets=(("output", "[data-password-generator] [data-result]"),),
        exercise_faq=True,
    ),
    "pdf-toolkit": FeatureCoverage(
        desktop=run_pdf_toolkit_desktop,
        mobile=run_pdf_toolkit_mobile,
        focus_targets=(("input", "[data-pdf-toolkit] [data-open-files]"),),
        exercise_faq=True,
    ),
    "image-upscaler": FeatureCoverage(
        desktop=run_image_upscaler_desktop,
        mobile=run_image_upscaler_mobile,
        focus_targets=(("input", "[data-image-upscaler] [data-open-file]"),),
        exercise_faq=True,
    ),
    "image-resizer": FeatureCoverage(
        desktop=run_image_resizer_desktop,
        mobile=run_image_resizer_mobile,
        focus_targets=(("input", "[data-image-resizer] [data-open-file]"),),
        exercise_faq=True,
    ),
    "image-crop": FeatureCoverage(
        desktop=run_image_crop_desktop,
        mobile=run_image_crop_mobile,
        focus_targets=(("input", "[data-image-crop] [data-open-file]"),),
        exercise_faq=True,
    ),
    "regex-tester": FeatureCoverage(
        desktop=run_regex_tester_desktop,
        mobile=run_regex_tester_mobile,
        focus_targets=(("input", "[data-regex-tester] [data-expression]"),),
        exercise_faq=True,
    ),
    "unit-converter": FeatureCoverage(
        desktop=run_unit_converter_desktop,
        mobile=run_unit_converter_mobile,
        focus_targets=(("input", "[data-unit-converter] [data-value]"),),
        exercise_faq=True,
    ),
    "uuid-generator": FeatureCoverage(
        desktop=run_uuid_generator_desktop,
        mobile=run_uuid_generator_mobile,
        focus_targets=(("input", "[data-uuid-generator] [data-generate]"),),
        exercise_faq=True,
    ),
    "travel-link-lab": FeatureCoverage(
        desktop=_run_travel_link_desktop,
        mobile=run_travel_link_mobile,
        focus_targets=(("action", "[data-generate]"),),
    ),
}
