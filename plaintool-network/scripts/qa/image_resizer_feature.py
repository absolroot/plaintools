from io import BytesIO
from pathlib import Path

from PIL import Image

from .config import BASE_URL, QA_DIR


def _png_fixture(width: int, height: int) -> bytes:
    image = Image.new("RGBA", (width, height), (36, 132, 198, 255))
    output = BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()


def _image_dimensions(payload: bytes) -> tuple[int, int]:
    with Image.open(BytesIO(payload)) as image:
        image.load()
        return image.size


def run_image_resizer_desktop(page, report: dict, _inventory) -> None:
    payload = _png_fixture(4000, 3000)
    page.goto(f"{BASE_URL}/en/image-resizer/", wait_until="networkidle")
    root = page.locator("[data-image-resizer]")
    root.locator("[data-file]").set_input_files(
        {"name": "landscape.png", "mimeType": "image/png", "buffer": payload}
    )
    root.locator("[data-settings]:not([disabled])").wait_for(timeout=60000)

    source = {
        "summary": root.locator("[data-source-summary]").inner_text(),
        "width": root.locator("[data-width]").input_value(),
        "height": root.locator("[data-height]").input_value(),
        "format": root.locator("[data-output-format]").input_value(),
    }
    if (
        "4000 × 3000" not in source["summary"]
        or source["width"] != "4000"
        or source["height"] != "3000"
        or source["format"] != "same"
    ):
        report["ui_detail_failures"].append(
            f"Image resizer did not expose trustworthy source defaults: {source}"
        )

    root.locator("[data-width]").fill("1920")
    linked_height = root.locator("[data-height]").input_value()
    target_summary = root.locator("[data-target-summary]").inner_text()
    if linked_height != "1440" or "1920 × 1440" not in target_summary:
        report["ui_detail_failures"].append(
            f"Linked resize dimensions were incorrect: {linked_height!r}, {target_summary!r}"
        )

    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=60000
    )
    with page.expect_download(timeout=10000) as download_info:
        root.locator("[data-download]").click()
    result = Path(download_info.value.path()).read_bytes()
    dimensions = _image_dimensions(result)
    filename = download_info.value.suggested_filename
    if dimensions != (1920, 1440) or filename != "landscape-1920x1440.png":
        report["ui_detail_failures"].append(
            f"Image resize download was incorrect: {dimensions}, {filename!r}"
        )

    root.locator('input[name="resize-mode"][value="percentage"]').check()
    root.locator("[data-percentage]").fill("50")
    stale = {
        "downloadHidden": root.locator("[data-download]").is_hidden(),
        "runEnabled": root.locator("[data-run]").is_enabled(),
        "target": root.locator("[data-target-summary]").inner_text(),
    }
    if stale != {
        "downloadHidden": True,
        "runEnabled": True,
        "target": "2000 × 1500 px",
    }:
        report["ui_detail_failures"].append(
            f"Image resizer retained a stale result or wrong percentage: {stale}"
        )

    root.locator('input[name="resize-mode"][value="pixels"]').check()
    root.locator("[data-width]").fill("8000")
    no_enlarge = root.locator("[data-target-summary]").inner_text()
    if no_enlarge != "4000 × 3000 px":
        report["ui_detail_failures"].append(
            f"No-enlarge protection did not cap the result: {no_enlarge!r}"
        )

    report["image_resizer"] = {
        "source": source,
        "linkedHeight": linked_height,
        "downloadDimensions": dimensions,
        "downloadFilename": filename,
        "staleResult": stale,
        "noEnlargeTarget": no_enlarge,
    }
    page.screenshot(
        path=str(QA_DIR / "image-resizer-desktop-en.png"), full_page=False
    )


def run_image_resizer_mobile(page, report: dict, _inventory) -> None:
    payload = _png_fixture(320, 240)
    page.goto(f"{BASE_URL}/ar/image-resizer/", wait_until="networkidle")
    root = page.locator("[data-image-resizer]")
    root.locator("[data-file]").set_input_files(
        {"name": "mobile.png", "mimeType": "image/png", "buffer": payload}
    )
    root.locator("[data-settings]:not([disabled])").wait_for(timeout=60000)
    root.locator('input[name="resize-mode"][value="percentage"]').check()
    root.locator("[data-percentage]").fill("50")

    state = page.evaluate(
        """() => ({
          direction: document.documentElement.dir,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          technicalDirections: [...document.querySelectorAll('[data-image-resizer] input[type="number"], [data-image-resizer] input[type="range"]')].map((element) => getComputedStyle(element).direction),
          touchHeights: [...document.querySelectorAll('[data-image-resizer] button:not([hidden]), [data-image-resizer] select, [data-image-resizer] .mode-switch span')].map((element) => element.getBoundingClientRect().height)
        })"""
    )
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] > state["clientWidth"]
        or any(direction != "ltr" for direction in state["technicalDirections"])
        or min(state["touchHeights"]) < 43.5
    ):
        report["ui_detail_failures"].append(
            f"Image resizer mobile/RTL controls are unsafe: {state}"
        )

    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=60000
    )
    with page.expect_download(timeout=10000) as download_info:
        root.locator("[data-download]").click()
    result = Path(download_info.value.path()).read_bytes()
    if _image_dimensions(result) != (160, 120):
        report["ui_detail_failures"].append(
            "Image resizer mobile percentage result was not 160 × 120."
        )

    download_box = root.locator("[data-download]").bounding_box()
    command_box = root.locator(".converter-commandbar").bounding_box()
    if (
        not download_box
        or not command_box
        or download_box["height"] < 44
        or download_box["width"] < command_box["width"] - 32
    ):
        report["ui_detail_failures"].append(
            "Image resizer mobile download is not a full-width primary action."
        )
    report["image_resizer_mobile"] = {
        **state,
        "downloadWidth": download_box["width"] if download_box else 0,
        "commandWidth": command_box["width"] if command_box else 0,
    }
    page.screenshot(
        path=str(QA_DIR / "image-resizer-mobile-ar.png"), full_page=False
    )
