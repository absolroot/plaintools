from .common import inspect_view
from .config import BASE_URL, QA_DIR
from .registry import RouteInventory


def run_base64_mobile(mobile, report: dict, locales: tuple[str, ...]) -> None:
    report["mobile"] = inspect_view(mobile, "/ko/base64-decode/", "cloudflare-detail-mobile-ko.png")
    report["mobile_output_top"] = mobile.locator(".output-pane").bounding_box()["y"]
    report["mobile_header_height"] = mobile.locator(".site-header").bounding_box()["height"]
    report["mobile_options_alignment"] = mobile.evaluate("""
      () => {
        const left = (selector) => document.querySelector(selector).getBoundingClientRect().left;
        return {
          options_icon: left('.options-chevron'),
          options_text: left('.options summary span'),
          privacy_icon: left('.privacy-icon'),
          privacy_text: left('.privacy-note > div:last-child')
        };
      }
    """)
    mobile_option_alignment = report["mobile_options_alignment"]
    if abs(mobile_option_alignment["options_icon"] - mobile_option_alignment["privacy_icon"]) > 1:
        report["ui_detail_failures"].append(f"Mobile options and privacy icons do not share an axis: {mobile_option_alignment}")
    if abs(mobile_option_alignment["options_text"] - mobile_option_alignment["privacy_text"]) > 1:
        report["ui_detail_failures"].append(f"Mobile options and privacy copy do not share an axis: {mobile_option_alignment}")
    mobile_primary_box = mobile.locator(".primary-button").bounding_box()
    report["mobile_primary_action"] = {
        "top": mobile_primary_box["y"],
        "bottom": mobile_primary_box["y"] + mobile_primary_box["height"],
        "viewport_height": 844
    }
    if report["mobile_primary_action"]["bottom"] > 828:
        report["ui_detail_failures"].append(
            f"Primary action lacks the 16px mobile viewport safety margin: {report['mobile_primary_action']}"
        )

    report["mobile_locale_actions"] = {}
    for locale in locales:
        report["mobile_locale_actions"][locale] = {}
        for mode in ("decode", "encode"):
            mobile.goto(f"{BASE_URL}/{locale}/base64-{mode}/", wait_until="networkidle")
            sample_input = "SGVsbG8=" if mode == "decode" else "Hello"
            expected_output = "Hello" if mode == "decode" else "SGVsbG8="
            mobile.locator("#codec-input").fill(sample_input)
            mobile.wait_for_function(
                "expected => document.querySelector('#codec-output').value === expected",
                arg=expected_output,
            )
            action_box = mobile.locator(".primary-button").bounding_box()
            command_box = mobile.locator(".converter-commandbar").bounding_box()
            action = {
                "bottom": action_box["y"] + action_box["height"],
                "safety_margin": 844 - (action_box["y"] + action_box["height"]),
                "command_height": command_box["height"],
                "scroll_width": mobile.evaluate("document.documentElement.scrollWidth"),
                "sample_output": mobile.locator("#codec-output").input_value(),
            }
            report["mobile_locale_actions"][locale][mode] = action
            if action["safety_margin"] < 16:
                report["ui_detail_failures"].append(
                    f"{locale}/{mode} primary action lacks the 16px mobile viewport safety margin: {action}"
                )
            if action["scroll_width"] > 390:
                report["ui_detail_failures"].append(
                    f"{locale}/{mode} has horizontal overflow: {action['scroll_width']}px"
                )



def run_route_matrix(
    desktop,
    mobile,
    report: dict,
    inventory: RouteInventory,
    feature_coverage,
) -> None:
    routes = inventory.routes
    faq_routes = inventory.faq_routes
    report["route_matrix"] = {"desktop": {}, "mobile": {}}
    for surface, page, width in (("desktop", desktop, 1440), ("mobile", mobile, 390)):
        for locale in inventory.locales:
            for route in routes:
                path = f"/{locale}/{route}"
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                page.wait_for_selector("main h1", timeout=3000)
                tool = inventory.tool_for_route(route)
                coverage = feature_coverage[tool.feature_id] if tool else None
                key = f"{locale}:{route or 'home'}"
                entry = {
                    "h1_count": page.locator("main h1").count(),
                    "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
                    "header_height": round(page.locator(".site-header").bounding_box()["height"], 2),
                    "title": page.title()
                }
                report["route_matrix"][surface][key] = entry
                if entry["h1_count"] != 1:
                    report["ui_detail_failures"].append(f"{surface} {path} has {entry['h1_count']} h1 elements.")
                if entry["scroll_width"] > width:
                    report["ui_detail_failures"].append(f"{surface} {path} overflows at {entry['scroll_width']}px.")
                if tool:
                    promise = page.locator(".tool-promise")
                    promise_count = promise.count()
                    entry["tool_promise_count"] = promise_count
                    if promise_count != 1:
                        report["ui_detail_failures"].append(
                            f"{surface} {path} has {promise_count} tool promise messages."
                        )
                    else:
                        entry["tool_promise"] = promise.inner_text().strip()
                        entry["tool_promise_geometry"] = promise.evaluate("""
                          element => {
                            const bounds = element.getBoundingClientRect();
                            const intro = element.closest('.tool-intro').getBoundingClientRect();
                            const shell = document.querySelector('.tool-shell').getBoundingClientRect();
                            const style = getComputedStyle(element);
                            return {
                              left: bounds.left,
                              right: bounds.right,
                              intro_left: intro.left,
                              shell_left: shell.left,
                              font_size: style.fontSize,
                              line_height: style.lineHeight,
                              border_widths: [
                                style.borderTopWidth,
                                style.borderRightWidth,
                                style.borderBottomWidth,
                                style.borderLeftWidth
                              ],
                              border_radius: style.borderRadius,
                              background_color: style.backgroundColor
                            };
                          }
                        """)
                        promise_geometry = entry["tool_promise_geometry"]
                        if not entry["tool_promise"]:
                            report["ui_detail_failures"].append(
                                f"{surface} {path} has an empty tool promise."
                            )
                        if (
                            abs(promise_geometry["left"] - promise_geometry["intro_left"]) > 1
                            or abs(promise_geometry["left"] - promise_geometry["shell_left"]) > 1
                        ):
                            report["ui_detail_failures"].append(
                                f"{surface} {path} tool promise left the shared axis: {promise_geometry}."
                            )
                        if (
                            promise_geometry["font_size"] != "12px"
                            or promise_geometry["border_widths"] != ["1px"] * 4
                            or promise_geometry["border_radius"] != "0px"
                            or promise_geometry["background_color"] == "rgba(0, 0, 0, 0)"
                        ):
                            report["ui_detail_failures"].append(
                                f"{surface} {path} tool promise lost its boxed secondary hierarchy: {promise_geometry}."
                            )
                if coverage and coverage.focus_style == "editor":
                    entry["focus_matrix"] = {}
                    original_theme = page.evaluate("document.documentElement.dataset.theme || null")
                    for theme in ("light", "dark"):
                        page.evaluate("theme => { document.documentElement.dataset.theme = theme; }", theme)
                        focus_states = {}
                        for focus_surface, selector in coverage.focus_targets:
                            page.locator(selector).click()
                            focus_states[focus_surface] = page.locator(selector).evaluate("""
                              element => {
                                const style = getComputedStyle(element);
                                const pane = element.closest('.editor-pane');
                                const bounds = element.getBoundingClientRect();
                                return {
                                  outline: style.outline,
                                  textarea_shadow: style.boxShadow,
                                  pane_shadow: getComputedStyle(pane).boxShadow,
                                  width: Math.round(bounds.width * 100) / 100,
                                  height: Math.round(bounds.height * 100) / 100,
                                  focus_visible: element.matches(':focus-visible'),
                                  focus_within: pane.matches(':focus-within'),
                                  uses_shared_ring: style.boxShadow.includes((() => {
                                    const probe = document.createElement('span');
                                    probe.style.color = 'var(--focus-ring)';
                                    document.body.append(probe);
                                    const color = getComputedStyle(probe).color;
                                    probe.remove();
                                    return color;
                                  })())
                                };
                              }
                            """)
                        entry["focus_matrix"][theme] = focus_states
                        if (
                            focus_states["input"] != focus_states["output"]
                            or focus_states["input"]["textarea_shadow"] == "none"
                            or focus_states["input"]["pane_shadow"] != "none"
                            or not focus_states["input"]["focus_visible"]
                            or not focus_states["input"]["focus_within"]
                            or not focus_states["input"]["uses_shared_ring"]
                        ):
                            report["ui_detail_failures"].append(
                                f"{surface} {path} {theme} JSON input/output click focus diverged: {focus_states}."
                            )
                    page.evaluate(
                        "theme => { if (theme) document.documentElement.dataset.theme = theme; else delete document.documentElement.dataset.theme; }",
                        original_theme,
                    )
                elif coverage:
                    entry["focus_matrix"] = {}
                    original_theme = page.evaluate("document.documentElement.dataset.theme || null")
                    for theme in ("light", "dark"):
                        page.evaluate("theme => { document.documentElement.dataset.theme = theme; }", theme)
                        focus_states = {}
                        for focus_surface, selector in coverage.focus_targets:
                            page.locator(selector).click()
                            focus_states[focus_surface] = page.locator(selector).evaluate("""
                              element => {
                                const style = getComputedStyle(element);
                                const pane = element.closest('.editor-pane');
                                const probe = document.createElement('span');
                                probe.style.color = 'var(--focus-ring)';
                                document.body.append(probe);
                                const expected = getComputedStyle(probe).color;
                                probe.remove();
                                return {
                                  outline_color: style.outlineColor,
                                  outline_style: style.outlineStyle,
                                  shadow: style.boxShadow,
                                  pane_shadow: pane ? getComputedStyle(pane).boxShadow : null,
                                  focus_visible: element.matches(':focus-visible'),
                                  uses_shared_ring: style.outlineColor === expected || style.boxShadow.includes(expected)
                                };
                              }
                            """)
                        entry["focus_matrix"][theme] = focus_states
                        if any(
                            not state["focus_visible"]
                            or not state["uses_shared_ring"]
                            or (state["pane_shadow"] is not None and state["pane_shadow"] != "none")
                            for state in focus_states.values()
                        ):
                            report["ui_detail_failures"].append(
                                f"{surface} {path} {theme} focus does not use the shared quiet ring: {focus_states}."
                            )
                        if coverage.compare_focus_surfaces and "input" in focus_states and "output" in focus_states:
                            input_style = {key: value for key, value in focus_states["input"].items() if key != "focus_visible"}
                            output_style = {key: value for key, value in focus_states["output"].items() if key != "focus_visible"}
                            if input_style != output_style:
                                report["ui_detail_failures"].append(
                                    f"{surface} {path} {theme} input/output focus styles diverged: {focus_states}."
                                )
                    page.evaluate(
                        "theme => { if (theme) document.documentElement.dataset.theme = theme; else delete document.documentElement.dataset.theme; }",
                        original_theme,
                    )
                if route in faq_routes:
                    faq_summaries = page.locator(".faq-list summary")
                    faq_summary_count = faq_summaries.count()
                    faq_chevron_count = page.locator(".faq-list .faq-chevron").count()
                    entry["faq_summary_count"] = faq_summary_count
                    entry["faq_chevron_count"] = faq_chevron_count
                    if faq_summary_count == 0 or faq_chevron_count != faq_summary_count:
                        report["ui_detail_failures"].append(
                            f"{surface} {path} FAQ rows and shared chevrons diverged: "
                            f"summaries={faq_summary_count}, chevrons={faq_chevron_count}."
                        )
                    elif locale == "ko" and coverage and coverage.exercise_faq:
                        first_faq = faq_summaries.nth(0)
                        first_faq.click()
                        page.wait_for_timeout(150)
                        faq_open_state = first_faq.evaluate(
                            "summary => ({ open: summary.parentElement.open, transform: getComputedStyle(summary.querySelector('.faq-chevron')).transform })"
                        )
                        entry["faq_open_state"] = faq_open_state
                        if not faq_open_state["open"] or faq_open_state["transform"] == "none":
                            report["ui_detail_failures"].append(
                                f"{surface} {path} FAQ chevron did not expose its open state: {faq_open_state}."
                            )
                if surface == "mobile":
                    controls = page.locator(".converter button:visible, .converter summary:visible, .converter select:visible, a.tool-directory-card:visible")
                    small = []
                    for index in range(controls.count()):
                        control = controls.nth(index)
                        box = control.bounding_box()
                        if box and box["height"] < 43.5:
                            small.append({"text": (control.inner_text() or control.get_attribute("aria-label") or "").strip(), "height": round(box["height"], 2)})
                    if small:
                        report["ui_detail_failures"].append(f"mobile {path} has undersized tool controls: {small}")

    probe_feature = next(
        feature_id
        for feature_id, coverage in feature_coverage.items()
        if coverage.surface_probe
    )
    probe_tool = next(tool for tool in inventory.tools if tool.feature_id == probe_feature)
    probe_locale = "ko" if "ko" in inventory.locales else inventory.locales[0]
    desktop.goto(
        f"{BASE_URL}/{probe_locale}/{probe_tool.slug}/",
        wait_until="networkidle",
    )
    report["square_surface_radii"] = desktop.evaluate("""
      () => Object.fromEntries([
        ['converter', '.converter'], ['mode', '.mode-switch'], ['primary', '.primary-button'],
        ['language', '.language-menu summary'], ['directory', '.tool-directory-grid']
      ].map(([name, selector]) => [name, document.querySelector(selector) ? getComputedStyle(document.querySelector(selector)).borderRadius : null]))
    """)
    if any(value not in (None, "0px") for value in report["square_surface_radii"].values()):
        report["ui_detail_failures"].append(f"Tool surfaces regained rounded corners: {report['square_surface_radii']}")
