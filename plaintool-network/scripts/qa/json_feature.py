from .config import BASE_URL, QA_DIR


def run_json_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/json-formatter/", wait_until="networkidle")
    report["json_example"] = desktop.locator("[data-json-tool] [data-input]").get_attribute("placeholder")
    if '"name":"PlainTool"' not in report["json_example"]:
        report["ui_detail_failures"].append(f"JSON input lacks a valid example object: {report['json_example']}")
    report["json_click_focus"] = {}
    for surface, selector in (("input", "#json-input"), ("output", "#json-output")):
        desktop.locator(selector).click()
        report["json_click_focus"][surface] = desktop.locator(selector).evaluate("""
          element => {
            const pane = element.closest('.editor-pane');
            return {
              textarea_outline: getComputedStyle(element).outline,
              textarea_shadow: getComputedStyle(element).boxShadow,
              pane_shadow: getComputedStyle(pane).boxShadow
            };
          }
        """)
    if (
        report["json_click_focus"]["input"] != report["json_click_focus"]["output"]
        or report["json_click_focus"]["input"]["textarea_shadow"] == "none"
        or report["json_click_focus"]["input"]["pane_shadow"] != "none"
    ):
        report["ui_detail_failures"].append(f"JSON input and output click focus treatments must match: {report['json_click_focus']}")
    report["json_help_desktop"] = {}
    for mode in ("validate", "minify"):
        action = desktop.locator(f'[data-action="{mode}"]')
        trigger = desktop.locator(f'.tooltip-trigger[aria-describedby="json-{mode}-help"]')
        trigger.hover()
        state = desktop.locator(f"#json-{mode}-help").evaluate("""
          element => {
            const tooltip = element.getBoundingClientRect();
            const converter = element.closest('[data-json-tool]').getBoundingClientRect();
            const action = element.parentElement.querySelector('[data-action]').getBoundingClientRect();
            const trigger = element.previousElementSibling.getBoundingClientRect();
            return {
              display: getComputedStyle(element).display,
              inside_converter: tooltip.left >= converter.left && tooltip.right <= converter.right,
              trigger_inside_action: trigger.left >= action.left - .1 && trigger.right <= action.right + .1 && trigger.top >= action.top - .1 && trigger.bottom <= action.bottom + .1,
              main_center_clear: trigger.left > action.left + action.width / 2,
              tooltip_bounds: { left: tooltip.left, right: tooltip.right, top: tooltip.top, bottom: tooltip.bottom },
              converter_bounds: { left: converter.left, right: converter.right, top: converter.top, bottom: converter.bottom },
              action_bounds: { left: action.left, right: action.right, top: action.top, bottom: action.bottom }
            };
          }
        """)
        action.focus()
        state["focus_display"] = desktop.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
        if mode == "validate":
            desktop.screenshot(path=str(QA_DIR / "plaintool-json-tooltip-desktop-ko.png"), full_page=False)
        desktop.keyboard.press("Escape")
        state["escape_display"] = desktop.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
        state["focus_retained_after_escape"] = action.evaluate("element => document.activeElement === element")
        report["json_help_desktop"][mode] = state
        if state["display"] == "none" or state["focus_display"] == "none" or state["escape_display"] != "none" or not state["focus_retained_after_escape"] or not state["inside_converter"] or not state["trigger_inside_action"] or not state["main_center_clear"]:
            report["ui_detail_failures"].append(f"JSON desktop {mode} help is clipped or outside its action: {state}")
    desktop.locator("[data-json-tool] [data-input]").fill('{"id":900719925474099312345,"a":1,"a":2}')
    desktop.locator('[data-action="format"]').click()
    desktop.wait_for_function("document.querySelector('[data-json-tool] [data-output]').value.includes('900719925474099312345')")
    report["json_large_number_preserved"] = "900719925474099312345" in desktop.locator("[data-json-tool] [data-output]").input_value()
    report["json_duplicate_warning"] = desktop.locator("[data-badges] .badge.is-warning").count()
    report["json_complete_label"] = desktop.locator("[data-json-tool] [data-status]").text_content()
    report["json_success_status"] = desktop.locator("[data-json-tool] .converter-commandbar").evaluate("el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el.querySelector('.status-copy')).color, fontSize: getComputedStyle(el.querySelector('.status-copy')).fontSize, fontWeight: getComputedStyle(el.querySelector('.status-copy')).fontWeight })")
    if report["json_complete_label"] != "올바른 JSON입니다." or "is-success" not in (desktop.locator("[data-json-tool]").get_attribute("class") or ""):
        report["ui_detail_failures"].append(f"JSON completion state is unclear: {report['json_complete_label']}")
    report["json_privacy_note"] = desktop.locator("[data-json-tool] .privacy-note").evaluate("el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color })")
    desktop.evaluate("""
      () => {
        const root = document.querySelector('[data-json-tool]');
        const output = root.querySelector('[data-output]');
        window.__jsonUxTransition = { outputs: [], states: [] };
        window.__jsonUxTimer = setInterval(() => {
          window.__jsonUxTransition.outputs.push(output.value);
          window.__jsonUxTransition.states.push(root.className);
        }, 4);
      }
    """)
    desktop.locator("[data-json-tool] [data-input]").press("End")
    desktop.locator("[data-json-tool] [data-input]").type(" ")
    desktop.wait_for_timeout(350)
    report["json_fast_transition"] = desktop.evaluate("""
      () => {
        clearInterval(window.__jsonUxTimer);
        return {
          outputs: [...new Set(window.__jsonUxTransition.outputs)],
          states: [...new Set(window.__jsonUxTransition.states)]
        };
      }
    """)
    if "" in report["json_fast_transition"]["outputs"] or any("is-working" in state for state in report["json_fast_transition"]["states"]):
        report["ui_detail_failures"].append(f"Fast JSON input exposed an empty output or transient working state: {report['json_fast_transition']}")
    desktop.screenshot(path=str(QA_DIR / "plaintool-json-desktop-ko.png"), full_page=False)
    desktop.locator("[data-json-tool] [data-input]").fill('{"a":}')
    desktop.locator('[data-action="validate"]').click()
    desktop.wait_for_function("document.querySelector('[data-json-tool]').classList.contains('has-error')")
    report["json_error_status"] = desktop.locator("[data-json-tool] .converter-commandbar").evaluate("el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el.querySelector('.status-copy')).color })")
    desktop.screenshot(path=str(QA_DIR / "plaintool-json-error-desktop-ko.png"), full_page=False)
    if report["json_success_status"]["background"] == report["json_error_status"]["background"] or report["json_success_status"]["background"] == report["json_privacy_note"]["background"]:
        report["ui_detail_failures"].append(f"JSON success, error, and privacy surfaces must remain visually distinct: {report['json_success_status']}/{report['json_error_status']}/{report['json_privacy_note']}")
    if report["json_success_status"]["fontSize"] != "13px" or int(report["json_success_status"]["fontWeight"]) < 600:
        report["ui_detail_failures"].append(f"JSON status text must remain prominent: {report['json_success_status']}")
    desktop.locator("[data-json-tool] [data-input]").fill('{"nested":{"value":1}}')
    desktop.locator('[data-action="format"]').click()
    desktop.wait_for_function("document.querySelector('[data-json-tool] [data-output]').value.includes('  \"nested\"')")
    desktop.locator("[data-json-tool] [data-indent]").select_option("4")
    desktop.wait_for_function("document.querySelector('[data-json-tool] [data-output]').value.includes('    \"value\"')")
    report["json_indent_recomputed"] = desktop.locator("[data-json-tool] [data-output]").input_value()
    large_json = '{"value":"' + ("x" * 200000) + '"}'
    desktop.locator("[data-json-tool] [data-input]").fill(large_json)
    desktop.locator('[data-action="format"]').click()
    desktop.locator("[data-json-tool] [data-clear]").click()
    desktop.wait_for_timeout(450)
    report["json_clear_state"] = desktop.evaluate("""
      () => ({
        input: document.querySelector('[data-json-tool] [data-input]').value,
        output: document.querySelector('[data-json-tool] [data-output]').value,
        className: document.querySelector('[data-json-tool]').className
      })
    """)
    if report["json_clear_state"]["input"] or report["json_clear_state"]["output"] or any(state in report["json_clear_state"]["className"] for state in ("is-working", "is-success", "has-error")):
        report["ui_detail_failures"].append(f"JSON Clear allowed pending work to restore stale state: {report['json_clear_state']}")



def run_json_mobile(mobile, report: dict, locales: tuple[str, ...]) -> None:
    report["json_help_mobile"] = {}
    for locale in locales:
        mobile.goto(f"{BASE_URL}/{locale}/json-formatter/", wait_until="networkidle")
        report["json_help_mobile"][locale] = {}
        for mode in ("validate", "minify"):
            action = mobile.locator(f'[data-action="{mode}"]')
            action.click()
            action_display = mobile.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
            trigger = mobile.locator(f'.tooltip-trigger[aria-describedby="json-{mode}-help"]')
            trigger.click()
            state = mobile.locator(f"#json-{mode}-help").evaluate("""
              element => {
                const tooltip = element.getBoundingClientRect();
                const converter = element.closest('[data-json-tool]').getBoundingClientRect();
                const action = element.parentElement.querySelector('[data-action]').getBoundingClientRect();
                const trigger = element.previousElementSibling.getBoundingClientRect();
                return {
                  display: getComputedStyle(element).display,
                  inside_converter: tooltip.left >= converter.left && tooltip.right <= converter.right,
                  trigger_inside_action: trigger.left >= action.left - 1 && trigger.right <= action.right + 1 && trigger.top >= action.top - 1 && trigger.bottom <= action.bottom + 1,
                  scroll_width: document.documentElement.scrollWidth,
                  trigger_bounds: { left: trigger.left, right: trigger.right, top: trigger.top, bottom: trigger.bottom },
                  action_bounds: { left: action.left, right: action.right, top: action.top, bottom: action.bottom }
                };
              }
            """)
            state["action_display"] = action_display
            if locale == "ko" and mode == "validate":
                mobile.screenshot(path=str(QA_DIR / "plaintool-json-tooltip-mobile-ko.png"), full_page=False)
            trigger.click()
            state["second_tap_display"] = mobile.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
            trigger.click()
            mobile.locator("main h1").click()
            state["outside_tap_display"] = mobile.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
            trigger.click()
            mobile.keyboard.press("Escape")
            state["escape_display"] = mobile.locator(f"#json-{mode}-help").evaluate("element => getComputedStyle(element).display")
            state["focus_retained_after_escape"] = trigger.evaluate("element => document.activeElement === element")
            report["json_help_mobile"][locale][mode] = state
            if state["action_display"] != "none" or state["display"] == "none" or state["second_tap_display"] != "none" or state["outside_tap_display"] != "none" or state["escape_display"] != "none" or not state["focus_retained_after_escape"] or not state["inside_converter"] or not state["trigger_inside_action"] or state["scroll_width"] > 390:
                report["ui_detail_failures"].append(f"JSON mobile {locale}/{mode} help trigger behavior, bounds, or overflow failed: {state}")
        validate_trigger = mobile.locator('.tooltip-trigger[aria-describedby="json-validate-help"]')
        minify_trigger = mobile.locator('.tooltip-trigger[aria-describedby="json-minify-help"]')
        validate_trigger.click()
        minify_trigger.click()
        simultaneous_state = mobile.evaluate("""
          () => ({
            validate: getComputedStyle(document.querySelector('#json-validate-help')).display,
            minify: getComputedStyle(document.querySelector('#json-minify-help')).display
          })
        """)
        report["json_help_mobile"][locale]["one_open_at_a_time"] = simultaneous_state
        if simultaneous_state != {"validate": "none", "minify": "block"}:
            report["ui_detail_failures"].append(f"JSON mobile {locale} tooltips must allow only one open item: {simultaneous_state}")

    mobile.goto(f"{BASE_URL}/ko/json-formatter/", wait_until="networkidle")
    mobile.locator("[data-json-tool] [data-input]").fill('{"a":}')
    mobile.locator('[data-action="validate"]').click()
    mobile.wait_for_function("document.querySelector('[data-json-tool]').classList.contains('has-error')")
    report["json_mobile_error"] = mobile.locator("[data-json-tool] .converter-commandbar").evaluate("el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el.querySelector('.status-copy')).color, height: el.getBoundingClientRect().height, scrollWidth: document.documentElement.scrollWidth })")
    mobile.screenshot(path=str(QA_DIR / "plaintool-json-error-mobile-ko.png"), full_page=False)
    if report["json_mobile_error"]["scrollWidth"] > 390 or report["json_mobile_error"]["background"] == "rgba(0, 0, 0, 0)":
        report["ui_detail_failures"].append(f"JSON mobile error state must be visible without horizontal overflow: {report['json_mobile_error']}")
