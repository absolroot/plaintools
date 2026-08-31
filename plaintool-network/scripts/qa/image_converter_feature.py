from io import BytesIO
from pathlib import Path
import tempfile

from PIL import Image

from .config import BASE_URL, QA_DIR


FORMATS = ("bmp", "png", "jpg", "gif", "webp", "heic", "avif")
MIME_TYPES = {
    "bmp": "image/bmp",
    "png": "image/png",
    "jpg": "image/jpeg",
    "gif": "image/gif",
    "webp": "image/webp",
    "heic": "image/heic",
    "avif": "image/avif",
}


def _png_fixture(size: int = 24) -> bytes:
    image = Image.new("RGBA", (size, size))
    pixels = image.load()
    for y in range(size):
        for x in range(size):
            pixels[x, y] = (
                (x * 17) % 256,
                (y * 19) % 256,
                ((x + y) * 11) % 256,
                80 if x < size // 3 else 255,
            )
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def _detected_format(payload: bytes) -> str | None:
    if payload[:2] == b"BM":
        return "bmp"
    if payload[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if payload[:3] == b"\xff\xd8\xff":
        return "jpg"
    if payload[:6] in (b"GIF87a", b"GIF89a"):
        return "gif"
    if payload[:4] == b"RIFF" and payload[8:12] == b"WEBP":
        return "webp"
    if payload[4:8] == b"ftyp":
        brands = payload[8:32]
        if any(brand in brands for brand in (b"avif", b"avis")):
            return "avif"
        if any(brand in brands for brand in (b"heic", b"heix", b"hevc", b"hevx", b"mif1", b"msf1")):
            return "heic"
    return None


def _convert(page, source: str, target: str, payload: bytes) -> bytes:
    page.goto(f"{BASE_URL}/en/{source}-to-{target}/", wait_until="networkidle")
    root = page.locator("[data-image-converter]")
    root.locator("[data-file]").set_input_files(
        {
            "name": f"qa-source.{source}",
            "mimeType": MIME_TYPES[source],
            "buffer": payload,
        }
    )
    root.locator("[data-run]").click()
    try:
        root.locator("[data-download]:not([disabled])").wait_for(
            state="visible", timeout=60000
        )
    except Exception as error:
        status = root.locator("[data-status]").inner_text()
        raise AssertionError(
            f"{source}-to-{target} did not produce a download: {status!r}"
        ) from error
    with page.expect_download(timeout=10000) as download_info:
        root.locator("[data-download]").click()
    result = Path(download_info.value.path()).read_bytes()
    detected = _detected_format(result)
    if detected != target:
        raise AssertionError(
            f"{source}-to-{target} returned {detected or 'unknown'} bytes ({len(result)} bytes)"
        )
    return result


def run_image_converter_desktop(page, report: dict, _inventory) -> None:
    png = _png_fixture()
    fixtures = {"png": png}
    completed = []

    # Generate one trustworthy fixture for every source format while exercising
    # all six PNG output routes.
    for target in FORMATS:
        if target == "png":
            continue
        fixtures[target] = _convert(page, "png", target, png)
        completed.append(f"png-to-{target}")

    # Feed each generated format back through every other encoder. This proves
    # the complete 7 x 6 route matrix, including HEIC and AVIF decode paths.
    for source in FORMATS:
        if source == "png":
            continue
        for target in FORMATS:
            if target == source:
                continue
            _convert(page, source, target, fixtures[source])
            completed.append(f"{source}-to-{target}")

    if len(completed) != 42 or len(set(completed)) != 42:
        report["ui_detail_failures"].append(
            f"Image conversion matrix is incomplete: {len(set(completed))}/42"
        )

    page.goto(f"{BASE_URL}/en/png-to-jpg/", wait_until="networkidle")
    root = page.locator("[data-image-converter]")
    root.locator("[data-file]").set_input_files(
        {"name": "alpha.png", "mimeType": "image/png", "buffer": png}
    )
    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=60000
    )
    result_actions = root.locator(".converter-commandbar")
    download_box = root.locator("[data-download]").bounding_box()
    status_box = root.locator("[data-status]").bounding_box()
    stage_backgrounds = root.locator(
        ".image-drop-target, .image-result-stage"
    ).evaluate_all(
        "elements => elements.map(element => getComputedStyle(element).backgroundImage)"
    )
    if (
        root.locator(".pane-heading [data-download]").count() != 0
        or result_actions.locator("[data-download]").count() != 1
        or not root.locator("[data-run]").is_hidden()
        or not download_box
        or download_box["width"] < 140
        or download_box["height"] < 40
        or not status_box
        or download_box["x"] <= status_box["x"]
        or stage_backgrounds != ["none", "none"]
    ):
        report["ui_detail_failures"].append(
            "Image conversion success does not prioritize a calm result and primary download action."
        )
    report["image_converter_result_ux"] = {
        "stage_backgrounds": stage_backgrounds,
        "download_width": download_box["width"] if download_box else 0,
        "download_height": download_box["height"] if download_box else 0,
        "download_in_commandbar": result_actions.locator("[data-download]").count()
        == 1,
        "convert_hidden_after_success": root.locator("[data-run]").is_hidden(),
    }
    warning = root.locator("[data-warnings]").inner_text()
    if "white" not in warning.lower():
        report["ui_detail_failures"].append(
            f"PNG-to-JPG did not disclose transparency flattening: {warning!r}"
        )
    with page.expect_download() as download_info:
        root.locator("[data-download]").click()
    if not download_info.value.suggested_filename.endswith(".jpg"):
        report["ui_detail_failures"].append(
            "Image download did not use the target extension."
        )

    # Changing a quality-dependent setting must invalidate an older output.
    root.locator("[data-quality]").select_option("compact", force=True)
    if root.locator("[data-download]").is_enabled():
        report["ui_detail_failures"].append(
            "Image quality change retained a stale downloadable result."
        )

    # A supported image from another format must be detected and converted
    # without making the user find the matching source route first.
    root.locator("[data-file]").set_input_files(
        {"name": "detected.jpg", "mimeType": "image/jpeg", "buffer": fixtures["jpg"]}
    )
    root.locator("[data-input-facts]").wait_for(state="visible")
    auto_detect = {
        "source": root.locator("[data-source-format]").input_value(),
        "target": root.locator("[data-target-format]").input_value(),
        "datasetSource": root.get_attribute("data-source"),
        "datasetTarget": root.get_attribute("data-target"),
        "detected": root.locator("[data-detected-format]").inner_text().strip(),
        "runEnabled": root.locator("[data-run]").is_enabled(),
        "qualitySelectVisible": root.locator("[data-quality]").is_visible(),
        "fixedQualityVisible": root.locator("[data-quality-fixed]").is_visible(),
    }
    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=60000
    )
    with page.expect_download() as auto_download_info:
        root.locator("[data-download]").click()
    auto_payload = Path(auto_download_info.value.path()).read_bytes()
    auto_detect["downloadFormat"] = _detected_format(auto_payload)
    auto_detect["downloadName"] = auto_download_info.value.suggested_filename
    report["image_converter_auto_detect"] = auto_detect
    if auto_detect != {
        "source": "jpg",
        "target": "png",
        "datasetSource": "jpg",
        "datasetTarget": "png",
        "detected": "JPG",
        "runEnabled": True,
        "qualitySelectVisible": False,
        "fixedQualityVisible": True,
        "downloadFormat": "png",
        "downloadName": "detected.png",
    }:
        report["ui_detail_failures"].append(
            f"Image source auto-detection failed: {auto_detect}"
        )

    page.goto(f"{BASE_URL}/en/png-to-jpg/", wait_until="networkidle")
    root = page.locator("[data-image-converter]")

    # Reject deceptive, empty, and oversized inputs before a worker can decode them.
    adversarial = [
        ("script.png", "image/png", b"<script>alert(1)</script>", "valid"),
        ("empty.png", "image/png", b"", "valid"),
        ("oversized.png", "image/png", b"\x89PNG\r\n\x1a\n" + bytes(50 * 1024 * 1024), "50 MiB"),
    ]
    rejected = []
    for name, mime, payload, expected in adversarial:
        temporary_path = None
        if len(payload) > 50 * 1024 * 1024:
            with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temporary:
                temporary.write(payload)
                temporary_path = temporary.name
            root.locator("[data-file]").set_input_files(temporary_path)
        else:
            root.locator("[data-file]").set_input_files(
                {"name": name, "mimeType": mime, "buffer": payload}
            )
        status = root.locator("[data-status]").inner_text()
        if temporary_path:
            Path(temporary_path).unlink(missing_ok=True)
        if expected.lower() not in status.lower() or root.locator("[data-run]").is_enabled():
            report["ui_detail_failures"].append(
                f"Adversarial image was not safely rejected ({name}): {status!r}"
            )
        rejected.append(name)

    quality_options = root.locator(".image-options")
    format_order = root.locator(".image-format-bar > *").evaluate_all(
        """elements => elements.map((element) => {
          if (element.matches('[data-swap-formats]')) return 'swap';
          if (element.querySelector('[data-source-format]')) return 'source';
          if (element.querySelector('[data-target-format]')) return 'target';
          return 'unknown';
        })"""
    )
    format_boxes = [
        root.locator(selector).bounding_box()
        for selector in (
            "[data-source-format]",
            "[data-target-format]",
            "[data-swap-formats]",
        )
    ]
    affordances = {
        "swapText": root.locator("[data-swap-formats]").inner_text().strip(),
        "swapIcon": root.locator("[data-swap-formats] .ui-icon").count(),
        "formatOrder": format_order,
        "swapAfterTarget": all(format_boxes)
        and format_boxes[0]["x"] < format_boxes[1]["x"] < format_boxes[2]["x"],
        "qualityVisible": root.locator("[data-quality]").is_visible(),
        "qualityEnabled": root.locator("[data-quality]").is_enabled(),
        "qualityChevron": quality_options.locator(".image-options-chevron").count(),
        "qualityContainer": quality_options.evaluate("element => element.tagName"),
    }
    with page.expect_navigation():
        root.locator("[data-swap-formats]").click()
    affordances["swapUrl"] = page.url
    report["image_converter_affordances"] = affordances
    if (
        not affordances["swapText"]
        or affordances["swapIcon"] != 1
        or affordances["formatOrder"] != ["source", "target", "swap"]
        or not affordances["swapAfterTarget"]
        or not affordances["qualityVisible"]
        or not affordances["qualityEnabled"]
        or affordances["qualityChevron"] != 0
        or affordances["qualityContainer"] != "DIV"
        or not affordances["swapUrl"].endswith("/en/jpg-to-png/")
    ):
        report["ui_detail_failures"].append(
            f"Image converter controls do not expose their behavior: {affordances}"
        )

    report["image_converter"] = {
        "matrix_routes": len(completed),
        "fixture_formats": sorted(fixtures),
        "adversarial_rejections": rejected,
        "transparency_warning": warning,
    }
    page.goto(f"{BASE_URL}/ko/png-to-webp/", wait_until="networkidle")
    page.screenshot(
        path=str(QA_DIR / "image-converter-desktop-ko.png"), full_page=False
    )


def run_image_converter_mobile(page, report: dict, _inventory) -> None:
    png = _png_fixture(16)
    page.goto(f"{BASE_URL}/ar/png-to-webp/", wait_until="networkidle")
    root = page.locator("[data-image-converter]")
    state = page.evaluate(
        """() => ({
          direction: document.documentElement.dir,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          runBottom: document.querySelector('[data-image-converter] [data-run]').getBoundingClientRect().bottom,
          viewportHeight: window.innerHeight
        })"""
    )
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] > state["clientWidth"]
        or state["runBottom"] > state["viewportHeight"]
    ):
        report["ui_detail_failures"].append(
            f"Image converter mobile/RTL layout is unsafe: {state}"
        )
    root.locator("[data-file]").set_input_files(
        {"name": "mobile.png", "mimeType": "image/png", "buffer": png}
    )
    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=60000
    )
    mobile_download_box = root.locator("[data-download]").bounding_box()
    mobile_commandbar_box = root.locator(".converter-commandbar").bounding_box()
    if page.evaluate("document.documentElement.scrollWidth") > 390:
        report["ui_detail_failures"].append(
            "Converted mobile image introduced horizontal overflow."
        )
    if (
        not mobile_download_box
        or not mobile_commandbar_box
        or mobile_download_box["width"] < mobile_commandbar_box["width"] - 32
        or mobile_download_box["height"] < 44
    ):
        report["ui_detail_failures"].append(
            "Image download is not a full-width primary action on mobile."
        )
    state["downloadWidth"] = (
        mobile_download_box["width"] if mobile_download_box else 0
    )
    state["commandbarWidth"] = (
        mobile_commandbar_box["width"] if mobile_commandbar_box else 0
    )
    report["image_converter_mobile"] = state
    page.evaluate("window.scrollTo(0, 0)")
    page.screenshot(
        path=str(QA_DIR / "image-converter-mobile-ar.png"), full_page=False
    )
