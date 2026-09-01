from io import BytesIO

from PIL import Image

from .config import BASE_URL


def _fixture(width: int = 33, height: int = 25) -> bytes:
    image = Image.new("RGBA", (width, height))
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            pixels[x, y] = (
                (x * 17) % 256,
                (y * 19) % 256,
                ((x + y) * 11) % 256,
                80 if x < 11 else 255,
            )
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def _user_size_fixture() -> bytes:
    image = Image.effect_noise((592, 574), 70).convert("L")
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def run_image_upscaler_desktop(page, report: dict, _inventory) -> None:
    model_requests = []
    page.on(
        "request",
        lambda request: model_requests.append(request.url)
        if "/models/image-upscaler/" in request.url
        else None,
    )
    page.goto(f"{BASE_URL}/en/image-upscaler/", wait_until="networkidle")
    root = page.locator("[data-image-upscaler]")
    root.locator("[data-file-input]").set_input_files(
        {
            "name": "odd-alpha.png",
            "mimeType": "image/png",
            "buffer": _fixture(),
        }
    )
    root.locator("[data-upscale]:not([disabled])").wait_for()
    state = root.evaluate(
        """root => ({
          input: root.querySelector('[data-input-details]').textContent.trim(),
          format: root.querySelector('input[name="upscaler-format"]:checked').value,
          resultHidden: root.querySelector('[data-comparison]').hidden,
          downloadDisabled: root.querySelector('[data-download]').disabled,
          qualityDisabled: root.querySelector('[data-quality-option] input').disabled,
          qualityNoticeHidden: root.querySelector('[data-quality-unavailable]').hidden,
          selectedStyles: [...root.querySelectorAll('.upscaler-segmented label:has(input:checked)')]
            .map(label => ({
              background: getComputedStyle(label).backgroundColor,
              color: getComputedStyle(label).color,
            })),
        })"""
    )
    report["image_upscaler_initial_state"] = state
    if (
        state["input"] != "33 × 25 px"
        or state["format"] != "png"
        or not state["resultHidden"]
        or not state["downloadDisabled"]
        or state["qualityDisabled"] == state["qualityNoticeHidden"]
        or any(
            style["background"] == "rgba(0, 0, 0, 0)"
            or style["color"] == "rgba(0, 0, 0, 0)"
            for style in state["selectedStyles"]
        )
        or model_requests
    ):
        report["ui_detail_failures"].append(
            f"Image upscaler pre-consent state is invalid: {state}, model requests: {model_requests}"
        )

    root.locator("[data-upscale]").click()
    root.locator("[data-consent]").wait_for(state="visible")
    consent = {
        "body": root.locator("[data-consent-body]").inner_text(),
        "eyebrow": root.locator("[data-consent-eyebrow]").inner_text(),
    }
    root.locator("[data-consent-cancel]").click()
    if (
        "7.1 MB (7,082,844 B)" not in consent["body"]
        or "7.1 MB (7,082,844 B)" not in consent["eyebrow"]
        or model_requests
    ):
        report["ui_detail_failures"].append(
            f"Image upscaler consent or lazy loading is invalid: {consent}, model requests: {model_requests}"
        )

    root.locator('input[name="upscaler-scale"][value="4"]').check(force=True)
    if not root.locator("[data-download]").is_disabled():
        report["ui_detail_failures"].append(
            "Image upscaler option change retained a stale downloadable result."
        )

    user_size_fixture = _user_size_fixture()
    root.locator("[data-file-input]").set_input_files(
        {
            "name": "user-size-592x574.png",
            "mimeType": "image/png",
            "buffer": user_size_fixture,
        }
    )
    root.locator("[data-upscale]").click()
    root.locator("[data-consent]").wait_for(state="visible")
    accepted_user_size = root.locator("[data-input-details]").inner_text().strip()
    root.locator("[data-consent-cancel]").click()
    report["image_upscaler_592x574_4x"] = {
        "input": accepted_user_size,
        "inputBytes": len(user_size_fixture),
        "consentOpened": True,
        "modelRequests": list(model_requests),
    }
    if (
        accepted_user_size != "592 × 574 px"
        or not 250_000 <= len(user_size_fixture) <= 500_000
        or model_requests
    ):
        report["ui_detail_failures"].append(
            "Image upscaler rejected a normal 592x574 image before consent: "
            f"{report['image_upscaler_592x574_4x']}"
        )


def run_image_upscaler_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/image-upscaler/", wait_until="networkidle")
    state = page.locator("[data-image-upscaler]").evaluate(
        """root => {
          const panes = [...root.querySelectorAll('.upscaler-pane')]
            .map((pane) => pane.getBoundingClientRect());
          return {
            dir: document.documentElement.dir,
            viewport: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            rootDirection: getComputedStyle(root).direction,
            stacked: panes.length === 2 && panes[1].top >= panes[0].bottom - 1,
            inViewport: panes.every((pane) => pane.left >= 0 && pane.right <= innerWidth),
          };
        }"""
    )
    report["image_upscaler_mobile_rtl"] = state
    if (
        state["dir"] != "rtl"
        or state["rootDirection"] != "rtl"
        or state["scrollWidth"] > state["viewport"]
        or not state["stacked"]
        or not state["inViewport"]
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile image upscaler layout is invalid: {state}"
        )
