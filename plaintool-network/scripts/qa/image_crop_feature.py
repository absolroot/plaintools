from io import BytesIO
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image, ImageDraw

from .config import BASE_URL, QA_DIR


def _fixture(width: int = 120, height: int = 80) -> bytes:
    image = Image.new("RGB", (width, height), (238, 76, 84))
    draw = ImageDraw.Draw(image)
    draw.rectangle((width // 2, 0, width, height), fill=(34, 122, 214))
    draw.rectangle((width // 3, height // 3, width * 2 // 3, height * 2 // 3), fill=(248, 205, 70))
    output = BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()


def _dimensions(payload: bytes) -> tuple[int, int]:
    with Image.open(BytesIO(payload)) as image:
        image.load()
        return image.size


def run_image_crop_desktop(page, report: dict, _inventory) -> None:
    payload = _fixture()
    requests: list[str] = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(f"{BASE_URL}/en/image-crop/", wait_until="networkidle")
    root = page.locator("[data-image-crop]")
    root.locator("[data-file]").set_input_files(
        {"name": "asymmetric.png", "mimeType": "image/png", "buffer": payload}
    )
    root.locator("[data-settings]:not([disabled])").wait_for(timeout=30000)

    root.locator("[data-ratio]").select_option("1")
    initial_crop = {
        "x": root.locator("[data-x]").input_value(),
        "y": root.locator("[data-y]").input_value(),
        "width": root.locator("[data-width]").input_value(),
        "height": root.locator("[data-height]").input_value(),
    }
    root.locator('[data-rotate="90"]').click()
    rotated_crop = {
        "x": root.locator("[data-x]").input_value(),
        "y": root.locator("[data-y]").input_value(),
        "width": root.locator("[data-width]").input_value(),
        "height": root.locator("[data-height]").input_value(),
        "canvas": root.locator("[data-canvas]").evaluate(
            "canvas => [canvas.width, canvas.height]"
        ),
    }
    if initial_crop != {"x": "20", "y": "0", "width": "80", "height": "80"}:
        report["ui_detail_failures"].append(
            f"Image crop square defaults are incorrect: {initial_crop}"
        )
    if rotated_crop != {
        "x": "0",
        "y": "20",
        "width": "80",
        "height": "80",
        "canvas": [80, 120],
    }:
        report["ui_detail_failures"].append(
            f"Image crop rotation did not update preview coordinates: {rotated_crop}"
        )

    rotated_preview = root.locator("[data-canvas]").evaluate(
        "canvas => canvas.toDataURL()"
    )
    root.locator('[data-flip="x"]').click()
    flipped_preview = root.locator("[data-canvas]").evaluate(
        "canvas => canvas.toDataURL()"
    )
    root.locator('[data-flip="x"]').click()
    root.locator("[data-straighten]").evaluate(
        "input => { input.value = '10'; input.dispatchEvent(new Event('input', { bubbles: true })); }"
    )
    straightened_canvas = root.locator("[data-canvas]").evaluate(
        "canvas => [canvas.width, canvas.height]"
    )
    root.locator("[data-straighten]").evaluate(
        "input => { input.value = '0'; input.dispatchEvent(new Event('input', { bubbles: true })); }"
    )
    if rotated_preview == flipped_preview or straightened_canvas == [80, 120]:
        report["ui_detail_failures"].append(
            "Image crop flip or straighten control did not update the preview."
        )

    root.locator("[data-save]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=30000
    )
    with page.expect_download(timeout=10000) as download_info:
        root.locator("[data-download]").click()
    png_payload = Path(download_info.value.path()).read_bytes()
    with Image.open(BytesIO(png_payload)).convert("RGB") as png_image:
        top_pixel = png_image.getpixel((40, 10))
        bottom_pixel = png_image.getpixel((40, 70))
    png_result = {
        "dimensions": _dimensions(png_payload),
        "filename": download_info.value.suggested_filename,
        "topPixel": top_pixel,
        "bottomPixel": bottom_pixel,
    }
    if (
        png_result["dimensions"] != (80, 80)
        or png_result["filename"] != "asymmetric-cropped.png"
        or top_pixel[0] <= top_pixel[2]
        or bottom_pixel[2] <= bottom_pixel[0]
    ):
        report["ui_detail_failures"].append(
            f"Image crop PNG download is incorrect: {png_result}"
        )

    root.locator("[data-output]").select_option("jpg")
    invalidated = {
        "downloadHidden": root.locator("[data-download]").is_hidden(),
        "saveVisible": root.locator("[data-save]").is_visible(),
        "qualityVisible": root.locator("[data-quality-control]").is_visible(),
    }
    if invalidated != {
        "downloadHidden": True,
        "saveVisible": True,
        "qualityVisible": True,
    }:
        report["ui_detail_failures"].append(
            f"Image crop format change retained stale output: {invalidated}"
        )
    root.locator("[data-save]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=30000
    )
    with page.expect_download(timeout=10000) as download_info:
        root.locator("[data-download]").click()
    jpg_payload = Path(download_info.value.path()).read_bytes()
    with Image.open(BytesIO(jpg_payload)) as image:
        jpg_format = image.format
        jpg_dimensions = image.size
    if (
        jpg_format != "JPEG"
        or jpg_dimensions != (80, 80)
        or download_info.value.suggested_filename != "asymmetric-cropped.jpg"
    ):
        report["ui_detail_failures"].append(
            "Image crop output format and filename diverged after invalidation."
        )
    page.screenshot(path=str(QA_DIR / "image-crop-desktop-en.png"), full_page=False)

    root.locator("[data-file]").set_input_files(
        {
            "name": "replacement.png",
            "mimeType": "image/png",
            "buffer": _fixture(1600, 1200),
        }
    )
    root.locator("[data-clear]").click()
    page.wait_for_timeout(300)
    clear_state = root.evaluate(
        """root => ({
          settingsDisabled: root.querySelector('[data-settings]').disabled,
          canvasHidden: root.querySelector('[data-canvas]').hidden,
          clearDisabled: root.querySelector('[data-clear]').disabled,
          openLabel: root.querySelector('[data-open-label]').textContent.trim(),
          downloadHidden: root.querySelector('[data-download]').hidden,
          output: root.querySelector('[data-output]').value,
          qualityHidden: root.querySelector('[data-quality-control]').hidden,
          numbersEmpty: [...root.querySelectorAll('[data-x], [data-y], [data-width], [data-height]')].every((input) => input.value === ''),
        })"""
    )
    if clear_state != {
        "settingsDisabled": True,
        "canvasHidden": True,
        "clearDisabled": True,
        "openLabel": "Choose image",
        "downloadHidden": True,
        "output": "png",
        "qualityHidden": True,
        "numbersEmpty": True,
    }:
        report["ui_detail_failures"].append(
            f"Image crop stale decode survived Clear: {clear_state}"
        )
    root.locator("[data-file]").set_input_files(
        {"name": "animated.gif", "mimeType": "image/gif", "buffer": payload}
    )
    gif_state = {
        "status": root.locator("[data-status]").inner_text().strip(),
        "settingsDisabled": root.locator("[data-settings]").evaluate(
            "fieldset => fieldset.disabled"
        ),
    }
    if gif_state != {
        "status": "Choose a PNG, JPG, WebP, or AVIF image.",
        "settingsDisabled": True,
    }:
        report["ui_detail_failures"].append(
            f"Image crop advertised or accepted unsupported GIF input: {gif_state}"
        )

    external = [
        url
        for url in requests
        if urlparse(url).scheme not in {"blob", "data"}
        and urlparse(url).hostname not in {"127.0.0.1", "localhost"}
    ]
    if external:
        report["ui_detail_failures"].append(
            f"Image crop made external requests: {external}"
        )
    report["image_crop"] = {
        "initialCrop": initial_crop,
        "rotatedCrop": rotated_crop,
        "flipPreviewChanged": rotated_preview != flipped_preview,
        "straightenedCanvas": straightened_canvas,
        "png": png_result,
        "jpgFormat": jpg_format,
        "invalidated": invalidated,
        "clear": clear_state,
        "gifRejected": gif_state,
        "externalRequests": external,
    }


def run_image_crop_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/image-crop/", wait_until="networkidle")
    root = page.locator("[data-image-crop]")
    root.locator("[data-file]").set_input_files(
        {"name": "mobile.png", "mimeType": "image/png", "buffer": _fixture()}
    )
    root.locator("[data-settings]:not([disabled])").wait_for(timeout=30000)
    state = root.evaluate(
        """root => ({
          direction: document.documentElement.dir,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          title: document.querySelector('h1')?.textContent.trim(),
          technicalDirections: [...root.querySelectorAll('input[type="number"], input[type="range"]')].map((element) => getComputedStyle(element).direction),
          touchHeights: [...root.querySelectorAll('button:not([hidden]), select')].filter((element) => getComputedStyle(element).display !== 'none').map((element) => element.getBoundingClientRect().height),
        })"""
    )
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] > state["clientWidth"]
        or state["title"] != "محرر الصور"
        or any(direction != "ltr" for direction in state["technicalDirections"])
        or min(state["touchHeights"]) < 43.5
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile image crop layout or localization is unsafe: {state}"
        )
    report["image_crop_mobile"] = state
    page.screenshot(path=str(QA_DIR / "image-crop-mobile-ar.png"), full_page=False)
