import base64

from .config import BASE_URL


def run_qr_desktop(page, report: dict, _inventory) -> None:
    sentinel = "https://example.com/qa-qr-sentinel"
    page.goto(f"{BASE_URL}/en/qr-code-generator/", wait_until="networkidle")
    page.locator("[data-qr-generator] [data-input]").fill(sentinel)
    page.locator("[data-qr-generator] [data-generate]").click()
    page.wait_for_function(
        "!document.querySelector('[data-qr-generator] [data-canvas]').hidden"
    )
    data_url = page.locator("[data-qr-generator] [data-canvas]").evaluate(
        "canvas => canvas.toDataURL('image/png')"
    )
    png = base64.b64decode(data_url.split(",", 1)[1])

    page.goto(f"{BASE_URL}/en/qr-code-scanner/", wait_until="networkidle")
    scanner_url = page.url
    page.locator("[data-qr-scanner] [data-file-input]").set_input_files(
        {"name": "qa-round-trip.png", "mimeType": "image/png", "buffer": png}
    )
    page.wait_for_function(
        "expected => document.querySelector('[data-qr-scanner] [data-result]').value === expected",
        arg=sentinel,
    )
    state = page.evaluate(
        """
        sentinel => ({
          result: document.querySelector('[data-qr-scanner] [data-result]').value,
          url_badge_visible: !document.querySelector('[data-qr-scanner] [data-url-badge]').hidden,
          navigable_result_count: [...document.querySelectorAll('[data-qr-scanner] a')]
            .filter((anchor) => anchor.href === sentinel).length
        })
        """,
        sentinel,
    )
    if (
        page.url != scanner_url
        or state["result"] != sentinel
        or not state["url_badge_visible"]
        or state["navigable_result_count"]
    ):
        report["ui_detail_failures"].append(
            f"QR scan navigated automatically or lost its local result: {state}"
        )

    page.evaluate(
        "Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: undefined })"
    )
    page.locator("[data-qr-scanner] [data-start-camera]").click()
    page.wait_for_function(
        "document.querySelector('[data-qr-scanner]').classList.contains('has-error')"
    )
    stale_state = page.evaluate(
        """
        () => ({
          result: document.querySelector('[data-qr-scanner] [data-result]').value,
          copy_disabled: document.querySelector('[data-qr-scanner] [data-copy]').disabled,
          url_badge_hidden: document.querySelector('[data-qr-scanner] [data-url-badge]').hidden
        })
        """
    )
    if (
        stale_state["result"]
        or not stale_state["copy_disabled"]
        or not stale_state["url_badge_hidden"]
    ):
        report["ui_detail_failures"].append(
            f"QR camera start retained an older scan result: {stale_state}"
        )
    report["qr_code"] = state


def run_qr_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/qr-code-generator/", wait_until="networkidle")
    generator_state = page.evaluate(
        """
        () => ({
          generate_bottom: document.querySelector('[data-qr-generator] [data-generate]').getBoundingClientRect().bottom,
          viewport_height: window.innerHeight,
          scroll_width: document.documentElement.scrollWidth
        })
        """
    )
    if (
        generator_state["generate_bottom"] > generator_state["viewport_height"]
        or generator_state["scroll_width"] > 390
    ):
        report["ui_detail_failures"].append(
            f"QR generator primary action is outside the first mobile viewport: {generator_state}"
        )
    report["qr_generator_mobile"] = generator_state

    page.goto(f"{BASE_URL}/ar/qr-code-scanner/", wait_until="networkidle")
    page.evaluate(
        """
        Object.defineProperty(navigator, 'mediaDevices', {
          configurable: true,
          value: {
            getUserMedia: async () => {
              throw new DOMException('denied by QA', 'NotAllowedError');
            }
          }
        })
        """
    )
    page.locator("[data-qr-scanner] [data-start-camera]").click()
    page.wait_for_function(
        "document.querySelector('[data-qr-scanner]').classList.contains('has-error')"
    )
    state = page.evaluate(
        """
        () => ({
          html_dir: document.documentElement.dir,
          start_disabled: document.querySelector('[data-start-camera]').disabled,
          video_hidden: document.querySelector('[data-video]').hidden,
          scroll_width: document.documentElement.scrollWidth
        })
        """
    )
    if (
        state["html_dir"] != "rtl"
        or state["start_disabled"]
        or not state["video_hidden"]
        or state["scroll_width"] > 390
    ):
        report["ui_detail_failures"].append(
            f"QR camera permission failure is not safely recoverable: {state}"
        )
