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
    page.add_init_script(
        "localStorage.removeItem('plaintool.background-remover.precision-notice.v1');"
    )
    page.goto(f"{BASE_URL}/en/background-remover/", wait_until="networkidle")
    upload_guidance = page.locator(
        "[data-background-remover] [data-upload-prompt] small"
    ).inner_text()
    if not all(value in upload_guidance for value in ("20 MB", "20 megapixels")):
        report["ui_detail_failures"].append(
            f"Background remover upload limits are not explicit: {upload_guidance}"
        )
    page.wait_for_function(
        """
        () => document.querySelector('[data-background-remover]').dataset.precisionSupport !== 'checking'
        """
    )
    options_default = page.evaluate(
        """
        () => {
          const options = document.querySelector('.background-options');
          const fast = options.querySelector('input[name="background-model"][value="fast"]');
          const portrait = options.querySelector('input[name="background-model"][value="portrait"]');
          const quality = options.querySelector('input[name="background-model"][value="quality"]');
          const precision = options.querySelector('input[name="background-model"][value="precision"]');
          const compare = options.querySelector('input[name="background-model"][value="compare"]');
          const root = document.querySelector('[data-background-remover]');
          return {
            open: options.open,
            fastVisible: fast.getBoundingClientRect().height > 0,
            portraitVisible: portrait.getBoundingClientRect().height > 0,
            qualityVisible: quality.getBoundingClientRect().height > 0,
            precisionVisible: precision.getBoundingClientRect().height > 0,
            compareVisible: compare.getBoundingClientRect().height > 0,
            modelOptionCount: options.querySelectorAll('input[name="background-model"]').length,
            precisionSupport: root.dataset.precisionSupport,
            precisionDisabled: precision.disabled,
            unavailableVisible: !root.querySelector('[data-precision-unavailable]').hidden,
            modelLegend: options.querySelector('.background-model-options legend').textContent.trim(),
            technicalNamesVisible: ['U2NetP', 'MODNet', 'Silueta', 'BiRefNet Lite']
              .some((name) => options.innerText.includes(name))
          };
        }
        """
    )
    options_visible = all(
        options_default[key]
        for key in ("open", "fastVisible", "portraitVisible", "qualityVisible", "precisionVisible", "compareVisible")
    )
    precision_support_consistent = (
        options_default["precisionSupport"] == "supported"
        and not options_default["precisionDisabled"]
        and not options_default["unavailableVisible"]
    ) or (
        options_default["precisionSupport"] == "unsupported"
        and options_default["precisionDisabled"]
        and options_default["unavailableVisible"]
    )
    if (
        not options_visible
        or options_default["modelOptionCount"] != 5
        or not precision_support_consistent
        or options_default["modelLegend"] != "AI model"
        or options_default["technicalNamesVisible"]
    ):
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
        or "no added watermark" not in state["status"]
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
    page.locator('input[name="background-model"][value="portrait"]').check()
    page.locator("[data-remove]").click()
    page.wait_for_function(
        """
        () => document.querySelector('[data-background-remover]').classList.contains('is-success')
          || document.querySelector('[data-background-remover]').classList.contains('has-error')
        """,
        timeout=180_000,
    )
    portrait_state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const canvas = root.querySelector('[data-result-canvas]');
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
    portrait_resources = [
        url for url in requested_resources if url.endswith("/modnet-quantized.onnx")
    ]
    precision_resources_before_consent = [
        url for url in requested_resources if "birefnet-lite-512" in url
    ]
    if (
        portrait_state["hasError"]
        or not portrait_state["success"]
        or not portrait_state["resultVisible"]
        or portrait_state["alphaMin"] >= portrait_state["alphaMax"]
        or len(portrait_resources) != 1
        or precision_resources_before_consent
    ):
        report["ui_detail_failures"].append(
            "Background remover did not complete a local Portrait-model round trip: "
            f"state={portrait_state}, resources={portrait_resources}"
        )

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

    resources_before_comparison = len(requested_resources)
    page.locator('input[name="background-model"][value="compare"]').check()
    compare_selection = page.evaluate(
        """
        () => ({
          selected: document.querySelector('input[name="background-model"]:checked').value,
          primaryLabel: document.querySelector('[data-remove-label]').textContent.trim(),
          optionLabel: document.querySelector('input[name="background-model"][value="compare"]')
            .closest('label').querySelector('strong').textContent.trim(),
          compareHint: [...document.querySelector('input[name="background-model"][value="compare"]')
            .closest('label').querySelectorAll('small span')].map((item) => item.textContent.trim()),
          separateCompareButton: Boolean(document.querySelector('[data-compare]'))
        })
        """
    )
    page.locator("[data-remove]").click()
    comparison_consent = None
    if options_default["precisionSupport"] == "supported":
        comparison_consent = page.evaluate(
            """
            () => ({
              open: document.querySelector('[data-precision-consent]').open,
              disclosesTotal: document.querySelector('[data-consent-body]').textContent.includes('180 MB'),
              confirmLabel: document.querySelector('[data-consent-confirm-label]').textContent.trim(),
              fallbackLabel: document.querySelector('[data-consent-cancel]').textContent.trim()
            })
            """
        )
        page.locator("[data-consent-cancel]").click()
    page.wait_for_function(
        """
        () => !document.querySelector('[data-background-remover]').classList.contains('is-comparing')
          && !document.querySelector('[data-comparison]').hidden
          && document.querySelectorAll('[data-comparison-card][data-state="success"]').length >= 1
        """,
        timeout=300_000,
    )
    comparison_state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const grid = root.querySelector('.background-comparison-grid');
          const cards = [...root.querySelectorAll('[data-comparison-card]')];
          return {
            visible: !root.querySelector('[data-comparison]').hidden,
            columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
            cardCount: cards.length,
            successModels: cards.filter((card) => card.dataset.state === 'success')
              .map((card) => card.dataset.comparisonCard),
            precisionState: root.querySelector('[data-comparison-card="precision"]').dataset.state,
            selected: root.querySelector('[data-comparison-card][aria-pressed="true"]')?.dataset.comparisonCard,
            status: root.querySelector('[data-status]').textContent.trim(),
            trimVisible: !root.querySelector('[data-trim]').hidden,
            downloadEnabled: !root.querySelector('[data-download]').disabled
          };
        }
        """
    )
    if (
        not comparison_state["visible"]
        or compare_selection["selected"] != "compare"
        or compare_selection["primaryLabel"] != "Remove background"
        or compare_selection["optionLabel"] != "Run together"
        or compare_selection["compareHint"]
        != [
            "3 · Fast + Portrait + Quality · ~55 MB",
            "4 · + Precision · ~180 MB",
        ]
        or compare_selection["separateCompareButton"]
        or comparison_state["columns"] != 2
        or comparison_state["cardCount"] != 4
        or comparison_state["successModels"] != ["fast", "portrait", "quality"]
        or comparison_state["precisionState"] != "unavailable"
        or comparison_state["selected"] != "fast"
        or "no added watermark" not in comparison_state["status"]
        or not comparison_state["trimVisible"]
        or not comparison_state["downloadEnabled"]
        or len(requested_resources) != resources_before_comparison
        or (
            comparison_consent is not None
            and (
                not comparison_consent["open"]
                or not comparison_consent["disclosesTotal"]
                or comparison_consent["confirmLabel"]
                != "4 · + Precision · ~180 MB"
                or comparison_consent["fallbackLabel"]
                != "3 · Fast + Portrait + Quality · ~55 MB"
            )
        )
    ):
        report["ui_detail_failures"].append(
            "Background remover comparison did not preserve the sequential three-model fallback: "
            f"selection={compare_selection}, state={comparison_state}, "
            f"consent={comparison_consent}"
        )

    before_trim = page.locator("[data-result-canvas]").evaluate(
        "canvas => ({ width: canvas.width, height: canvas.height })"
    )
    page.locator("[data-trim]").click()
    after_trim = page.locator("[data-result-canvas]").evaluate(
        "canvas => ({ width: canvas.width, height: canvas.height })"
    )
    page.locator('[data-comparison-card="portrait"]').click()
    page.locator('[data-comparison-card="fast"]').click()
    trim_state = page.evaluate(
        """
        () => ({
          label: document.querySelector('[data-trim-label]').textContent.trim(),
          selected: document.querySelector('[data-comparison-card][aria-pressed="true"]')?.dataset.comparisonCard,
          inResultHeading: Boolean(document.querySelector('.background-result-pane .background-pane-heading [data-trim]')),
          checkerboardPadding: getComputedStyle(document.querySelector('[data-result-stage]')).padding
        })
        """
    )
    with page.expect_download(timeout=10_000) as download_info:
        page.locator("[data-download]").click()
    comparison_filename = download_info.value.suggested_filename
    if (
        after_trim["width"] > before_trim["width"]
        or after_trim["height"] > before_trim["height"]
        or after_trim == before_trim
        or trim_state["label"] != "Restore original size"
        or trim_state["selected"] != "fast"
        or not trim_state["inResultHeading"]
        or trim_state["checkerboardPadding"] != "0px"
        or comparison_filename != "qa-subject-background-removed-fast-trimmed.png"
        or len(requested_resources) != resources_before_comparison
    ):
        report["ui_detail_failures"].append(
            "Background remover fit/restore state or comparison download is invalid: "
            f"before={before_trim}, after={after_trim}, state={trim_state}, "
            f"filename={comparison_filename}"
        )

    page.locator(
        ".background-result-pane .background-pane-heading"
    ).scroll_into_view_if_needed()
    page.screenshot(
        path=str(QA_DIR / "background-remover-trimmed-desktop-en.png"),
        full_page=False,
    )

    page.set_viewport_size({"width": 390, "height": 844})
    comparison_mobile_state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          return {
            scrollWidth: document.documentElement.scrollWidth,
            columns: getComputedStyle(root.querySelector('.background-comparison-grid'))
              .gridTemplateColumns.split(' ').length,
            cardHeights: [...root.querySelectorAll('[data-comparison-card]')]
              .map((card) => card.getBoundingClientRect().height),
            actionHeights: [...root.querySelectorAll('.background-actions button:not([hidden])')]
              .map((button) => button.getBoundingClientRect().height)
          };
        }
        """
    )
    if (
        comparison_mobile_state["scrollWidth"] > 390
        or comparison_mobile_state["columns"] != 2
        or any(height < 44 for height in comparison_mobile_state["cardHeights"])
        or any(height < 44 for height in comparison_mobile_state["actionHeights"])
    ):
        report["ui_detail_failures"].append(
            "Background remover comparison overflowed or lost mobile target sizes: "
            f"{comparison_mobile_state}"
        )
    page.screenshot(
        path=str(QA_DIR / "background-remover-comparison-mobile-en.png"),
        full_page=False,
    )
    page.set_viewport_size({"width": 1440, "height": 1100})

    precision_consent = {
        "support": options_default["precisionSupport"],
        "dialogOpened": False,
        "selectionDeferred": False,
        "cancelRestored": False,
        "remembered": False,
        "downloadBeforeRun": False,
        "disclosesFirstDownload": False,
    }
    precision_state = None
    precision_resources = []
    precision_input = page.locator(
        'input[name="background-model"][value="precision"]'
    )
    if options_default["precisionSupport"] == "supported":
        precision_input.click()
        precision_consent.update(
            page.evaluate(
                """
                () => ({
                  dialogOpened: document.querySelector('[data-precision-consent]').open,
                  selectionDeferred: !document.querySelector('input[name="background-model"][value="precision"]').checked
                    && document.querySelector('input[name="background-model"][value="quality"]').checked,
                  disclosesFirstDownload: document.querySelector('[data-precision-consent]').innerText.includes('125 MB')
                })
                """
            )
        )
        page.locator("[data-consent-cancel]").click()
        precision_consent["cancelRestored"] = page.evaluate(
            """
            () => !document.querySelector('[data-precision-consent]').open
              && document.querySelector('input[name="background-model"][value="quality"]').checked
            """
        )
        precision_input.click()
        precision_consent["remembered"] = page.evaluate(
            """
            () => !document.querySelector('[data-precision-consent]').open
              && document.querySelector('input[name="background-model"][value="precision"]').checked
              && localStorage.getItem('plaintool.background-remover.precision-notice.v1') === 'seen'
            """
        )
        precision_consent["downloadBeforeRun"] = any(
            "birefnet-lite-512" in url for url in requested_resources
        )
        if (
            not precision_consent["dialogOpened"]
            or not precision_consent["selectionDeferred"]
            or not precision_consent["cancelRestored"]
            or not precision_consent["remembered"]
            or precision_consent["downloadBeforeRun"]
            or not precision_consent["disclosesFirstDownload"]
        ):
            report["ui_detail_failures"].append(
                "Precision-model consent did not defer the large download correctly: "
                f"{precision_consent}"
            )
        page.locator("[data-remove]").click()
        page.wait_for_function(
            """
            () => document.querySelector('[data-background-remover]').classList.contains('is-success')
              || document.querySelector('[data-background-remover]').classList.contains('has-error')
            """,
            timeout=300_000,
        )
        precision_state = page.evaluate(
            """
            () => {
              const root = document.querySelector('[data-background-remover]');
              const canvas = root.querySelector('[data-result-canvas]');
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
                resultVisible: !canvas.hidden,
                alphaMin,
                alphaMax,
                partialAlpha
              };
            }
            """
        )
        precision_resources = [
            url for url in requested_resources if "birefnet-lite-512" in url
        ]
        if (
            precision_state["hasError"]
            or not precision_state["success"]
            or not precision_state["resultVisible"]
            or precision_state["alphaMin"] >= precision_state["alphaMax"]
            or precision_state["partialAlpha"] == 0
            or len(precision_resources) != 5
        ):
            report["ui_detail_failures"].append(
                "Background remover did not complete a local WebGPU Precision-model round trip: "
                f"state={precision_state}, resources={precision_resources}"
            )
    elif not precision_input.is_disabled():
        report["ui_detail_failures"].append(
            "Precision model remained selectable without a WebGPU adapter."
        )

    page.screenshot(
        path=str(QA_DIR / "background-remover-desktop-en.png"), full_page=False
    )
    model_requests_before_revisit = len(
        [url for url in requested_resources if "/models/background-remover/" in url]
    )
    page.reload(wait_until="networkidle")
    page.locator("[data-file-input]").set_input_files(
        {
            "name": "qa-cache-revisit.png",
            "mimeType": "image/png",
            "buffer": _fixture_png(page),
        }
    )
    page.locator("[data-remove]").click()
    page.wait_for_function(
        """
        () => document.querySelector('[data-background-remover]').classList.contains('is-success')
          || document.querySelector('[data-background-remover]').classList.contains('has-error')
        """,
        timeout=180_000,
    )
    cache_revisit = page.evaluate(
        """
        () => ({
          success: document.querySelector('[data-background-remover]').classList.contains('is-success'),
          resultVisible: !document.querySelector('[data-result-canvas]').hidden
        })
        """
    )
    model_requests_after_revisit = len(
        [url for url in requested_resources if "/models/background-remover/" in url]
    )
    cache_revisit["modelRequests"] = (
        model_requests_after_revisit - model_requests_before_revisit
    )
    if (
        not cache_revisit["success"]
        or not cache_revisit["resultVisible"]
        or cache_revisit["modelRequests"] != 0
    ):
        report["ui_detail_failures"].append(
            "Background remover did not reuse the verified model cache after revisiting: "
            f"{cache_revisit}"
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
        "portrait_model": portrait_state,
        "portrait_model_resources": portrait_resources,
        "quality_model": quality_state,
        "quality_model_resources": quality_resources,
        "comparison": comparison_state,
        "comparison_consent": comparison_consent,
        "comparison_trim_before": before_trim,
        "comparison_trim_after": after_trim,
        "comparison_download_filename": comparison_filename,
        "comparison_mobile": comparison_mobile_state,
        "precision_consent": precision_consent,
        "precision_model": precision_state,
        "precision_model_resources": precision_resources,
        "cache_revisit": cache_revisit,
    }


def run_background_remover_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/background-remover/", wait_until="networkidle")
    state = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-background-remover]');
          const workspace = root.querySelector('.background-workspace');
          const actionHeights = [...root.querySelectorAll('.background-actions button:not([hidden])')]
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
