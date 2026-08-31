from .config import BASE_URL, QA_DIR


def _layout_state(page) -> dict:
    return page.locator("[data-json-tool]").evaluate(
        """
        root => {
          const getRect = selector => root.querySelector(selector)?.getBoundingClientRect();
          const editor = getRect('.converter-grid');
          const status = getRect('.converter-commandbar');
          const options = getRect('.formatter-options');
          const modes = getRect('.mode-switch');
          return {
            structurePresent: Boolean(editor && status && options && modes),
            primaryButtons: root.querySelectorAll('.primary-button').length,
            modeButtons: root.querySelectorAll('.mode-switch [data-mode]').length,
            editorBeforeStatus: Boolean(editor && status && editor.bottom <= status.top + 1),
            statusBeforeOptions: Boolean(status && options && status.bottom <= options.top + 1),
            modesInside: Boolean(modes && modes.left >= -0.5 && modes.right <= document.documentElement.clientWidth + 0.5),
            scrollWidth: document.documentElement.scrollWidth,
            viewportWidth: document.documentElement.clientWidth,
          };
        }
        """
    )


def run_json_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/json-formatter/", wait_until="networkidle")
    root = desktop.locator("[data-json-tool]")
    input_box = root.locator("[data-input]")
    output = root.locator("[data-output]")

    report["json_layout"] = _layout_state(desktop)
    layout = report["json_layout"]
    if (
        not layout["structurePresent"]
        or layout["primaryButtons"] != 0
        or layout["modeButtons"] != 3
        or not layout["editorBeforeStatus"]
        or not layout["statusBeforeOptions"]
        or not layout["modesInside"]
        or layout["scrollWidth"] > layout["viewportWidth"]
    ):
        report["ui_detail_failures"].append(
            f"JSON must share the formatter mode/editor/status/options structure: {layout}"
        )

    report["json_example"] = input_box.get_attribute("placeholder")
    if '"name":"AbsolTools"' not in report["json_example"]:
        report["ui_detail_failures"].append(
            f"JSON input lacks a valid example object: {report['json_example']}"
        )

    report["json_click_focus"] = {}
    for surface, selector in (("input", "#json-input"), ("output", "#json-output")):
        desktop.locator(selector).click()
        report["json_click_focus"][surface] = desktop.locator(selector).evaluate(
            """
            element => {
              const pane = element.closest('.editor-pane');
              return {
                textarea_shadow: getComputedStyle(element).boxShadow,
                pane_shadow: getComputedStyle(pane).boxShadow
              };
            }
            """
        )
    if (
        report["json_click_focus"]["input"]
        != report["json_click_focus"]["output"]
        or report["json_click_focus"]["input"]["textarea_shadow"] == "none"
        or report["json_click_focus"]["input"]["pane_shadow"] != "none"
    ):
        report["ui_detail_failures"].append(
            f"JSON input and output click focus treatments must match: {report['json_click_focus']}"
        )

    input_box.fill('{"id":900719925474099312345,"nested":{"value":1},"a":1,"a":2}')
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool] [data-output]').value.includes('900719925474099312345')"
    )
    report["json_live_format"] = output.input_value()
    report["json_duplicate_warning"] = root.locator("[data-badges] .badge.is-warning").count()

    root.locator('[data-mode="minify"]').click()
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool] [data-output]').value.startsWith('{\"id\":')"
    )
    report["json_live_minify"] = output.input_value()
    if root.locator(".formatter-options").is_visible():
        report["ui_detail_failures"].append(
            "JSON indent options must be hidden when minify is selected"
        )

    root.locator('[data-mode="validate"]').click()
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool]').classList.contains('is-success')"
    )
    report["json_live_validate"] = {
        "output": output.input_value(),
        "downloadDisabled": root.locator("[data-download]").is_disabled(),
    }
    if report["json_live_validate"] != {"output": "", "downloadDisabled": True}:
        report["ui_detail_failures"].append(
            f"JSON validate must remain a live non-download mode: {report['json_live_validate']}"
        )

    input_box.fill('{"a":}')
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool]').classList.contains('has-error')"
    )
    report["json_error_status"] = root.locator(".converter-commandbar").evaluate(
        "el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el.querySelector('.status-copy')).color })"
    )
    desktop.screenshot(
        path=str(QA_DIR / "plaintool-json-error-desktop-ko.png"), full_page=False
    )

    root.locator('[data-mode="format"]').click()
    input_box.fill('{"nested":{"value":1}}')
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool] [data-output]').value.includes('  \"nested\"')"
    )
    if not root.locator(".formatter-options").is_visible():
        report["ui_detail_failures"].append(
            "JSON indent options must be visible in format mode"
        )
    root.locator(".formatter-options > summary").click()
    root.locator("[data-indent]").select_option("4")
    desktop.wait_for_function(
        "document.querySelector('[data-json-tool] [data-output]').value.includes('        \"value\"')"
    )
    report["json_indent_recomputed"] = output.input_value()
    desktop.screenshot(
        path=str(QA_DIR / "plaintool-json-desktop-ko.png"), full_page=False
    )

    large_json = '{"value":"' + ("x" * (1024 * 1024 + 1)) + '"}'
    input_box.fill(large_json)
    desktop.wait_for_function(
        "!document.querySelector('[data-json-tool] [data-manual-run]').hidden"
    )
    report["json_large_input"] = {
        "manualVisible": root.locator("[data-manual-run]").is_visible(),
        "primaryButtons": root.locator(".primary-button").count(),
    }
    root.locator("[data-clear]").click()
    desktop.wait_for_timeout(250)
    report["json_clear_state"] = root.evaluate(
        """
        root => ({
          input: root.querySelector('[data-input]').value,
          output: root.querySelector('[data-output]').value,
          manualHidden: root.querySelector('[data-manual-run]').hidden,
          className: root.className
        })
        """
    )
    if (
        report["json_clear_state"]["input"]
        or report["json_clear_state"]["output"]
        or not report["json_clear_state"]["manualHidden"]
        or any(
            state in report["json_clear_state"]["className"]
            for state in ("is-working", "is-success", "has-error")
        )
    ):
        report["ui_detail_failures"].append(
            f"JSON Clear allowed pending work to restore stale state: {report['json_clear_state']}"
        )


def run_json_mobile(mobile, report: dict, locales: tuple[str, ...]) -> None:
    report["json_mobile_layout"] = {}
    for locale in locales:
        mobile.goto(f"{BASE_URL}/{locale}/json-formatter/", wait_until="networkidle")
        state = _layout_state(mobile)
        report["json_mobile_layout"][locale] = state
        if (
            not state["structurePresent"]
            or state["primaryButtons"] != 0
            or state["modeButtons"] != 3
            or not state["editorBeforeStatus"]
            or not state["statusBeforeOptions"]
            or not state["modesInside"]
            or state["scrollWidth"] > 390
        ):
            report["ui_detail_failures"].append(
                f"JSON mobile {locale} formatter structure or overflow failed: {state}"
            )
        if locale == "ko":
            mobile.locator(
                "[data-json-tool] .formatter-options > summary"
            ).click()
            mobile.evaluate("window.scrollTo(0, 0)")
            mobile.screenshot(
                path=str(QA_DIR / "plaintool-json-mobile-ko.png"), full_page=False
            )

    mobile.goto(f"{BASE_URL}/ko/json-formatter/", wait_until="networkidle")
    root = mobile.locator("[data-json-tool]")
    root.locator('[data-mode="validate"]').click()
    root.locator("[data-input]").fill('{"a":}')
    mobile.wait_for_function(
        "document.querySelector('[data-json-tool]').classList.contains('has-error')"
    )
    report["json_mobile_error"] = root.locator(".converter-commandbar").evaluate(
        "el => ({ background: getComputedStyle(el).backgroundColor, scrollWidth: document.documentElement.scrollWidth })"
    )
    mobile.screenshot(
        path=str(QA_DIR / "plaintool-json-error-mobile-ko.png"), full_page=False
    )
    if (
        report["json_mobile_error"]["scrollWidth"] > 390
        or report["json_mobile_error"]["background"] == "rgba(0, 0, 0, 0)"
    ):
        report["ui_detail_failures"].append(
            f"JSON mobile error state must be visible without horizontal overflow: {report['json_mobile_error']}"
        )
