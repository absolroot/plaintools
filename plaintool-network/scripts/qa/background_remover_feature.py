import base64

from .config import BASE_URL, QA_DIR


def _fixture_png(page) -> bytes:
    data_url = page.evaluate(
        """
        () => {
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const context = canvas.getContext('2d');
          const sky = context.createLinearGradient(0, 0, 0, 512);
          sky.addColorStop(0, '#dcecff');
          sky.addColorStop(1, '#f8fbff');
          context.fillStyle = sky;
          context.fillRect(0, 0, 512, 512);
          context.fillStyle = '#d4e7bd';
          context.fillRect(0, 370, 512, 142);
          context.fillStyle = '#28384a';
          context.beginPath();
          context.arc(256, 150, 72, 0, Math.PI * 2);
          context.fill();
          context.fillStyle = '#f26d4f';
          context.beginPath();
          context.moveTo(160, 420);
          context.quadraticCurveTo(170, 220, 256, 215);
          context.quadraticCurveTo(342, 220, 352, 420);
          context.closePath();
          context.fill();
          context.fillStyle = '#ffd2b4';
          context.fillRect(205, 175, 102, 62);
          return canvas.toDataURL('image/png');
        }
        """
    )
    return base64.b64decode(data_url.split(",", 1)[1])


def _background_resources(page) -> list[str]:
    return page.evaluate(
        """
        () => performance.getEntriesByType('resource')
          .map((entry) => entry.name)
          .filter((url) => url.includes('/models/background-remover/') || url.includes('ort-wasm'))
        """
    )


def run_background_remover_desktop(page, report: dict, _inventory) -> None:
    requested_resources: list[str] = []

    def collect_background_resource(request) -> None:
        if "/models/background-remover/" in request.url or "ort-wasm" in request.url:
            requested_resources.append(request.url)

    page.on("request", collect_background_resource)
    page.goto(f"{BASE_URL}/en/background-remover/", wait_until="networkidle")
    options_default = page.evaluate(
        """
        () => {
          const options = document.querySelector('.background-options');
          const fast = options.querySelector('input[name="background-model"][value="fast"]');
          const quality = options.querySelector('input[name="background-model"][value="quality"]');
          return {
            open: options.open,
            fastVisible: fast.getBoundingClientRect().height > 0,
            qualityVisible: quality.getBoundingClientRect().height > 0
          };
        }
        """
    )
    if not all(options_default.values()):
        report["ui_detail_failures"].append(
            "Background remover model choices were not visible by default: "
            f"{options_default}"
        )
    page.screenshot(
        path=str(QA_DIR / "background-remover-default-options-en.png"),
        full_page=False,
    )
    button_alignment = page.locator("[data-open-file]").evaluate(
        """
        (button) => {
          const icon = button.querySelector('.ui-icon').getBoundingClientRect();
          const label = button.querySelector('.icon-button-label').getBoundingClientRect();
          const style = getComputedStyle(button);
          return {
            display: style.display,
            iconCenter: icon.top + icon.height / 2,
            labelCenter: label.top + label.height / 2
          };
        }
        """
    )
    if (
        button_alignment["display"] != "inline-flex"
        or abs(button_alignment["iconCenter"] - button_alignment["labelCenter"]) > 1
    ):
        report["ui_detail_failures"].append(
            f"Background remover icon button lost its single-row alignment: {button_alignment}"
        )
    action_state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const commandbar = root.querySelector('.converter-commandbar');
          const remove = root.querySelector('[data-remove]');
          const download = root.querySelector('[data-download]');
          return {
            actionsInCommandbar: commandbar.contains(remove) && commandbar.contains(download),
            removeDisabled: remove.disabled,
            downloadDisabled: download.disabled,
            disabledCursor: getComputedStyle(remove).cursor
          };
        }
        """
    )
    if (
        not action_state["actionsInCommandbar"]
        or not action_state["removeDisabled"]
        or not action_state["downloadDisabled"]
        or action_state["disabledCursor"] != "not-allowed"
    ):
        report["ui_detail_failures"].append(
            f"Background remover actions diverged from the shared command bar: {action_state}"
        )
    initial_resources = list(requested_resources)
    if initial_resources:
        report["ui_detail_failures"].append(
            "Background remover loaded its model before the user started processing: "
            f"{initial_resources}"
        )

    page.locator("[data-file-input]").set_input_files(
        {
            "name": "qa-subject.png",
            "mimeType": "image/png",
            "buffer": _fixture_png(page),
        }
    )
    page.wait_for_function(
        """
        () => !document.querySelector('[data-remove]').disabled
          && !document.querySelector('[data-original-canvas]').hidden
        """
    )
    if requested_resources:
        report["ui_detail_failures"].append(
            "Background remover loaded its model while only decoding the local image."
        )

    page.locator("[data-remove]").click()
    processing_state = page.evaluate(
        """
        () => ({
          originalVisible: !document.querySelector('[data-original-canvas]').hidden,
          uploadPromptHidden: document.querySelector('[data-upload-prompt]').hidden,
          originalWidth: document.querySelector('[data-original-canvas]').width,
          originalHeight: document.querySelector('[data-original-canvas]').height,
          removeBusy: document.querySelector('[data-remove]').hasAttribute('aria-busy'),
          removeDisabled: document.querySelector('[data-remove]').disabled,
          removeLabel: document.querySelector('[data-remove-label]').textContent.trim()
        })
        """
    )
    if (
        not processing_state["originalVisible"]
        or not processing_state["uploadPromptHidden"]
        or processing_state["originalWidth"] != 512
        or processing_state["originalHeight"] != 512
        or not processing_state["removeBusy"]
        or not processing_state["removeDisabled"]
        or processing_state["removeLabel"] == "Remove background"
    ):
        report["ui_detail_failures"].append(
            "Starting background removal replaced the selected source image: "
            f"{processing_state}"
        )
    page.wait_for_function(
        """
        () => !document.querySelector('[data-result-canvas]').hidden
          || document.querySelector('[data-background-remover]').classList.contains('has-error')
        """,
        timeout=180_000,
    )
    state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const canvas = document.querySelector('[data-result-canvas]');
          const pixels = canvas.width && canvas.height
            ? canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
            : new Uint8ClampedArray();
          let alphaMin = 255;
          let alphaMax = 0;
          let partialAlpha = 0;
          for (let index = 3; index < pixels.length; index += 4) {
            const alpha = pixels[index];
            alphaMin = Math.min(alphaMin, alpha);
            alphaMax = Math.max(alphaMax, alpha);
            if (alpha > 0 && alpha < 255) partialAlpha += 1;
          }
          return {
            hasError: root.classList.contains('has-error'),
            success: root.classList.contains('is-success'),
            status: root.querySelector('[data-status]').textContent.trim(),
            resultVisible: !canvas.hidden,
            width: canvas.width,
            height: canvas.height,
            alphaMin,
            alphaMax,
            partialAlpha,
            downloadEnabled: !root.querySelector('[data-download]').disabled,
            removeBusy: root.querySelector('[data-remove]').hasAttribute('aria-busy'),
            removeLabel: root.querySelector('[data-remove-label]').textContent.trim(),
            originalVisible: !root.querySelector('[data-original-canvas]').hidden,
            uploadPromptHidden: root.querySelector('[data-upload-prompt]').hidden
          };
        }
        """
    )
    resources_after_inference = list(requested_resources)
    fast_model_resources = [
        url for url in resources_after_inference if url.endswith("/u2netp.onnx")
    ]
    quality_model_resources = [
        url for url in resources_after_inference if "silueta.onnx.part" in url
    ]
    wasm_resources = [url for url in resources_after_inference if "ort-wasm" in url]
    if (
        state["hasError"]
        or not state["success"]
        or not state["resultVisible"]
        or state["width"] != 512
        or state["height"] != 512
        or state["alphaMin"] >= state["alphaMax"]
        or state["partialAlpha"] == 0
        or not state["downloadEnabled"]
        or state["removeBusy"]
        or state["removeLabel"] != "Remove background"
        or not state["originalVisible"]
        or not state["uploadPromptHidden"]
        or len(fast_model_resources) != 1
        or quality_model_resources
        or not wasm_resources
    ):
        report["ui_detail_failures"].append(
            "Background remover did not complete a local Fast-model alpha-mask round trip: "
            f"state={state}, resources={resources_after_inference}"
        )

    model_resource_count = len(resources_after_inference)
    page.locator('input[name="background-mode"][value="white"]').check()
    white_state = page.evaluate(
        """
        () => {
          const canvas = document.querySelector('[data-result-canvas]');
          const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
          let alphaMin = 255;
          for (let index = 3; index < pixels.length; index += 4) {
            alphaMin = Math.min(alphaMin, pixels[index]);
          }
          return { alphaMin };
        }
        """
    )
    if white_state["alphaMin"] != 255 or len(requested_resources) != model_resource_count:
        report["ui_detail_failures"].append(
            "Changing the output background reran the model or did not produce opaque PNG pixels: "
            f"{white_state}"
        )

    download_filename = None
    if page.locator("[data-download]").is_disabled():
        report["ui_detail_failures"].append(
            "Background remover left PNG download disabled after rendering a result."
        )
    else:
        with page.expect_download(timeout=10_000) as download_info:
            page.locator("[data-download]").click()
        download_filename = download_info.value.suggested_filename
        if download_filename != "qa-subject-background-removed.png":
            report["ui_detail_failures"].append(
                f"Background remover used an unexpected download name: {download_filename}"
            )

    page.locator('input[name="background-mode"][value="transparent"]').check()
    page.locator('input[name="background-model"][value="quality"]').check()
    page.locator("[data-remove]").click()
    page.wait_for_function(
        """
        () => document.querySelector('[data-background-remover]').classList.contains('is-success')
          || document.querySelector('[data-background-remover]').classList.contains('has-error')
        """,
        timeout=180_000,
    )
    quality_state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const canvas = document.querySelector('[data-result-canvas]');
          const pixels = canvas.width && canvas.height
            ? canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
            : new Uint8ClampedArray();
          let alphaMin = 255;
          let alphaMax = 0;
          for (let index = 3; index < pixels.length; index += 4) {
            alphaMin = Math.min(alphaMin, pixels[index]);
            alphaMax = Math.max(alphaMax, pixels[index]);
          }
          return {
            hasError: root.classList.contains('has-error'),
            success: root.classList.contains('is-success'),
            resultVisible: !canvas.hidden,
            alphaMin,
            alphaMax
          };
        }
        """
    )
    quality_resources = [
        url for url in requested_resources if "silueta.onnx.part" in url
    ]
    if (
        quality_state["hasError"]
        or not quality_state["success"]
        or not quality_state["resultVisible"]
        or quality_state["alphaMin"] >= quality_state["alphaMax"]
        or len(quality_resources) != 2
    ):
        report["ui_detail_failures"].append(
            "Background remover did not reconstruct and run both Quality-model chunks: "
            f"state={quality_state}, resources={quality_resources}"
        )

    page.screenshot(
        path=str(QA_DIR / "background-remover-desktop-en.png"), full_page=False
    )
    report["background_remover"] = {
        "fast_model": state,
        "options_default": options_default,
        "icon_button_alignment": button_alignment,
        "action_state": action_state,
        "processing_source": processing_state,
        "same_origin_resources": resources_after_inference,
        "white_background": white_state,
        "download_filename": download_filename,
        "quality_model": quality_state,
        "quality_model_resources": quality_resources,
    }


def run_background_remover_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/background-remover/", wait_until="networkidle")
    state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const workspace = root.querySelector('.background-workspace');
          const actionHeights = [...root.querySelectorAll('.background-actions button')]
            .map((button) => button.getBoundingClientRect().height);
          return {
            htmlDir: document.documentElement.dir,
            scrollWidth: document.documentElement.scrollWidth,
            workspaceColumns: getComputedStyle(workspace).gridTemplateColumns.split(' ').length,
            actionHeights,
            colorDisabled: root.querySelector('[data-background-color]').disabled,
            modelsLoaded: performance.getEntriesByType('resource')
              .some((entry) => entry.name.includes('/models/background-remover/') || entry.name.includes('ort-wasm'))
          };
        }
        """
    )
    if (
        state["htmlDir"] != "rtl"
        or state["scrollWidth"] > 390
        or state["workspaceColumns"] != 1
        or any(height < 44 for height in state["actionHeights"])
        or not state["colorDisabled"]
        or state["modelsLoaded"]
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile background-remover layout or lazy loading is invalid: {state}"
        )
    page.screenshot(
        path=str(QA_DIR / "background-remover-mobile-ar.png"), full_page=False
    )
    report["background_remover_mobile"] = state
