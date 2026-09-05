from urllib.parse import urlsplit

from .common import inspect_view
from .config import BASE_URL, QA_DIR
from .new_tools_contract import NEW_TOOL_ROUTES, TECHNICAL_DIRECTION_SELECTORS
from .registry import RouteInventory


def _focus_with_keyboard(page, locator) -> None:
    locator.focus()
    page.keyboard.press("Shift+Tab")
    page.keyboard.press("Tab")
    if not locator.evaluate("element => document.activeElement === element"):
        raise AssertionError("Keyboard focus did not return to the expected target.")


def run_base64_mobile(mobile, report: dict, locales: tuple[str, ...]) -> None:
    report["mobile"] = inspect_view(mobile, "/ko/base64-decode/", "cloudflare-detail-mobile-ko.png")
    report["mobile_output_top"] = mobile.locator(".output-pane").bounding_box()["y"]
    report["mobile_header_height"] = mobile.locator(".site-header").bounding_box()["height"]
    report["mobile_workspace_spacing"] = mobile.evaluate("""
      () => {
        const box = (selector) => document.querySelector(selector).getBoundingClientRect();
        const topbar = box('.converter-topbar');
        const input = box('.input-pane');
        const output = box('.output-pane');
        const status = box('.converter-commandbar');
        const options = box('.options');
        return {
          topbar_to_input: input.top - topbar.bottom,
          input_to_output: output.top - input.bottom,
          output_to_status: status.top - output.bottom,
          status_to_options: options.top - status.bottom,
        };
      }
    """)
    if any(abs(gap - 12) > 1 for gap in report["mobile_workspace_spacing"].values()):
        report["ui_detail_failures"].append(
            f"Base64 mobile workspace rhythm is inconsistent: {report['mobile_workspace_spacing']}"
        )
    mobile.locator("[data-options] summary").click()
    mobile.evaluate(
        """() => {
          const trigger = document.querySelector('[aria-describedby="base64-charset-help"]');
          const root = trigger.closest('[data-tooltip]');
          root.style.position = 'fixed';
          root.style.insetInlineStart = '16px';
          root.style.insetBlockEnd = '16px';
        }"""
    )
    mobile.evaluate(
        """() => document.querySelector('[aria-describedby="base64-charset-help"]').click()"""
    )
    mobile.wait_for_timeout(50)
    report["mobile_base64_tooltip_viewport"] = mobile.evaluate(
        """() => {
          const tooltip = document.querySelector('#base64-charset-help');
          const root = tooltip.closest('[data-tooltip]');
          const box = tooltip.getBoundingClientRect();
          return {
            placement: root.dataset.tooltipPlacement,
            top: box.top,
            bottom: box.bottom,
            viewport: window.innerHeight
          };
        }"""
    )
    tooltip_state = report["mobile_base64_tooltip_viewport"]
    if (
        tooltip_state["placement"] != "top"
        or tooltip_state["top"] < 0
        or tooltip_state["bottom"] > tooltip_state["viewport"]
    ):
        report["ui_detail_failures"].append(
            f"Mobile Base64 option tooltip is clipped at the viewport edge: {tooltip_state}"
        )
    mobile.evaluate(
        """() => document.querySelector('[aria-describedby="base64-charset-help"]')
          .closest('[data-tooltip]').removeAttribute('style')"""
    )
    report["mobile_base64_run_buttons"] = mobile.locator("[data-converter] [data-run]").count()
    if report["mobile_base64_run_buttons"] != 0:
        report["ui_detail_failures"].append("Base64 should not expose a redundant run button.")
    mobile.evaluate("window.scrollTo(0, 700)")
    mobile.wait_for_timeout(250)
    header_hidden = mobile.locator(".site-header").evaluate(
        "header => ({ hidden: header.classList.contains('is-scroll-hidden'), top: header.getBoundingClientRect().top })"
    )
    mobile.evaluate("window.scrollTo(0, 450)")
    mobile.wait_for_timeout(250)
    header_shown = mobile.locator(".site-header").evaluate(
        "header => ({ hidden: header.classList.contains('is-scroll-hidden'), top: header.getBoundingClientRect().top })"
    )
    report["mobile_directional_header"] = {
        "after_down": header_hidden,
        "after_up": header_shown,
    }
    if not header_hidden["hidden"] or header_hidden["top"] >= 0 or header_shown["hidden"] or abs(header_shown["top"]) > 1:
        report["ui_detail_failures"].append(
            f"Mobile directional header did not hide and return correctly: {report['mobile_directional_header']}"
        )

    mobile.goto(f"{BASE_URL}/ar/base64-decode/", wait_until="networkidle")
    mobile.locator(".language-menu summary").click()
    report["mobile_rtl_language_menu"] = mobile.evaluate("""
      () => {
        const box = (selector) => {
          const bounds = document.querySelector(selector).getBoundingClientRect();
          return { left: bounds.left, right: bounds.right, width: bounds.width };
        };
        return {
          html_dir: document.documentElement.dir,
          branding: box('.header-branding'),
          actions: box('.header-actions'),
          trigger: box('.language-menu summary'),
          panel: box('.language-menu-panel'),
          viewport_width: document.documentElement.clientWidth,
          scroll_width: document.documentElement.scrollWidth,
        };
      }
    """)
    rtl_menu = report["mobile_rtl_language_menu"]
    if (
        rtl_menu["html_dir"] != "rtl"
        or rtl_menu["branding"]["left"] <= rtl_menu["actions"]["right"]
        or abs(rtl_menu["panel"]["left"] - rtl_menu["trigger"]["left"]) > 1
        or rtl_menu["panel"]["right"] > rtl_menu["viewport_width"]
        or rtl_menu["scroll_width"] > rtl_menu["viewport_width"]
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile header or language menu is not mirrored safely: {rtl_menu}"
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
            command_box = mobile.locator(".converter-commandbar").bounding_box()
            action = {
                "command_height": command_box["height"],
                "scroll_width": mobile.evaluate("document.documentElement.scrollWidth"),
                "sample_output": mobile.locator("#codec-output").input_value(),
            }
            report["mobile_locale_actions"][locale][mode] = action
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
    *,
    surfaces: tuple[str, ...] = ("desktop", "mobile"),
    run_surface_probe: bool = True,
) -> None:
    routes = inventory.routes
    faq_routes = inventory.faq_routes
    pages = {
        "desktop": (desktop, 1440),
        "mobile": (mobile, 390),
    }
    report["route_matrix"] = {surface: {} for surface in surfaces}
    for surface in surfaces:
        page, width = pages[surface]
        if page is None:
            raise RuntimeError(f"Browser QA surface {surface} has no Playwright page.")
        for locale in inventory.locales:
            for route in routes:
                path = f"/{locale}/{route}"
                response = page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
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
                slug = route.removesuffix("/")
                if slug in NEW_TOOL_ROUTES:
                    metadata = page.evaluate("""
                      () => ({
                        html_dir: document.documentElement.dir,
                        robots: document.querySelector('meta[name="robots"]')?.content,
                        canonical: document.querySelector('link[rel="canonical"]')?.href,
                        alternates: Object.fromEntries(
                          [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
                            .map((link) => [link.hreflang, link.href])
                        )
                      })
                    """)
                    entry["new_tool_metadata"] = metadata
                    entry["response_status"] = response.status if response else None
                    expected_path = f"/{locale}/{slug}/"
                    if response is None or not response.ok:
                        report["ui_detail_failures"].append(
                            f"{surface} {expected_path} did not return a successful route response."
                        )
                    if "noindex" not in (metadata["robots"] or ""):
                        report["ui_detail_failures"].append(
                            f"{surface} {expected_path} lost its preview noindex directive: {metadata['robots']}."
                        )
                    if not metadata["canonical"] or urlsplit(metadata["canonical"]).path != expected_path:
                        report["ui_detail_failures"].append(
                            f"{surface} {expected_path} has the wrong canonical: {metadata['canonical']}."
                        )
                    expected_html_dir = "rtl" if locale == "ar" else "ltr"
                    if metadata["html_dir"] != expected_html_dir:
                        report["ui_detail_failures"].append(
                            f"{surface} {expected_path} has html dir={metadata['html_dir']}, expected {expected_html_dir}."
                        )
                    for target_locale in inventory.locales:
                        alternate = metadata["alternates"].get(target_locale)
                        expected_alternate = f"/{target_locale}/{slug}/"
                        if not alternate or urlsplit(alternate).path != expected_alternate:
                            report["ui_detail_failures"].append(
                                f"{surface} {expected_path} has the wrong {target_locale} hreflang: {alternate}."
                            )
                    x_default = metadata["alternates"].get("x-default")
                    if not x_default or urlsplit(x_default).path != f"/en/{slug}/":
                        report["ui_detail_failures"].append(
                            f"{surface} {expected_path} has the wrong x-default hreflang: {x_default}."
                        )
                    for selector in TECHNICAL_DIRECTION_SELECTORS.get(slug, ()):
                        locator = page.locator(selector)
                        if locator.count() == 0:
                            report["ui_detail_failures"].append(
                                f"{surface} {expected_path} is missing technical field {selector}."
                            )
                            continue
                        directions = locator.evaluate_all(
                            "elements => elements.map((element) => getComputedStyle(element).direction)"
                        )
                        if any(direction != "ltr" for direction in directions):
                            report["ui_detail_failures"].append(
                                f"{surface} {expected_path} technical field {selector} is not LTR: {directions}."
                            )
                if entry["h1_count"] != 1:
                    report["ui_detail_failures"].append(f"{surface} {path} has {entry['h1_count']} h1 elements.")
                if entry["scroll_width"] > width:
                    report["ui_detail_failures"].append(f"{surface} {path} overflows at {entry['scroll_width']}px.")
                if tool and tool.top_tool_promise:
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
                        input_focus_style = {
                            key: value
                            for key, value in focus_states["input"].items()
                            if key not in ("width", "height")
                        }
                        output_focus_style = {
                            key: value
                            for key, value in focus_states["output"].items()
                            if key not in ("width", "height")
                        }
                        if (
                            input_focus_style != output_focus_style
                            or focus_states["input"]["textarea_shadow"] == "none"
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
                            focus_target = page.locator(selector)
                            _focus_with_keyboard(page, focus_target)
                            focus_states[focus_surface] = focus_target.evaluate("""
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
                        initial_state = first_faq.evaluate(
                            "summary => ({ open: summary.parentElement.open, transform: getComputedStyle(summary.querySelector('.faq-chevron')).transform })"
                        )
                        initial_open = initial_state["open"]
                        entry["faq_initial_state"] = initial_state
                        first_faq.click()
                        page.wait_for_timeout(150)
                        faq_open_state = first_faq.evaluate(
                            "summary => ({ open: summary.parentElement.open, transform: getComputedStyle(summary.querySelector('.faq-chevron')).transform })"
                        )
                        entry["faq_open_state"] = faq_open_state
                        expected_after_click = not initial_open
                        if faq_open_state["open"] != expected_after_click or faq_open_state["transform"] == initial_state["transform"]:
                            report["ui_detail_failures"].append(
                                f"{surface} {path} FAQ chevron did not expose its open state: {faq_open_state}."
                            )
                if surface == "mobile":
                    surface_boundaries = page.evaluate("""
                      () => {
                        const converter = document.querySelector('.converter');
                        if (!converter) return { count: 0, missing: [] };
                        const visible = (element) => {
                          const bounds = element.getBoundingClientRect();
                          const style = getComputedStyle(element);
                          return bounds.width > 1 && bounds.height > 1 &&
                            style.display !== 'none' && style.visibility !== 'hidden';
                        };
                        const hasSideBoundary = (element) => {
                          const style = getComputedStyle(element);
                          return parseFloat(style.borderInlineStartWidth) > 0 ||
                            parseFloat(style.borderInlineEndWidth) > 0 ||
                            style.boxShadow !== 'none';
                        };
                        const surfaces = [...converter.children]
                          .filter((element) => element.tagName !== 'SCRIPT' && visible(element));
                        const missing = surfaces.filter((element) => {
                          if (hasSideBoundary(element)) return false;
                          const children = [...element.children].filter(visible);
                          return children.length === 0 || !children.every(hasSideBoundary);
                        }).map((element) => element.className || element.tagName.toLowerCase());
                        return { count: surfaces.length, missing };
                      }
                    """)
                    entry["mobile_surface_boundaries"] = surface_boundaries
                    if surface_boundaries["missing"]:
                        report["ui_detail_failures"].append(
                            f"mobile {path} has open-sided primary surfaces: "
                            f"{surface_boundaries['missing']}"
                        )
                    controls = page.locator(".converter button:visible, .converter summary:visible, .converter select:visible, a.tool-directory-card:visible")
                    small = []
                    for index in range(controls.count()):
                        control = controls.nth(index)
                        box = control.bounding_box()
                        if box and box["height"] < 43.5:
                            small.append({"text": (control.inner_text() or control.get_attribute("aria-label") or "").strip(), "height": round(box["height"], 2)})
                    if small:
                        report["ui_detail_failures"].append(f"mobile {path} has undersized tool controls: {small}")

    if run_surface_probe:
        probe_feature = next(
            feature_id
            for feature_id, coverage in feature_coverage.items()
            if coverage.surface_probe
        )
        probe_tool = next(
            tool for tool in inventory.tools if tool.feature_id == probe_feature
        )
        probe_locale = "ko" if "ko" in inventory.locales else inventory.locales[0]
        probe_page = desktop or mobile
        probe_page.goto(
            f"{BASE_URL}/{probe_locale}/{probe_tool.slug}/",
            wait_until="networkidle",
        )
        report["square_surface_radii"] = probe_page.evaluate("""
          () => Object.fromEntries([
            ['converter', '.converter'], ['mode', '.mode-switch'], ['primary', '.primary-button'],
            ['language', '.language-menu summary'], ['directory', '.tool-directory-grid']
          ].map(([name, selector]) => [name, document.querySelector(selector) ? getComputedStyle(document.querySelector(selector)).borderRadius : null]))
        """)
        if any(value not in (None, "0px") for value in report["square_surface_radii"].values()):
            report["ui_detail_failures"].append(f"Tool surfaces regained rounded corners: {report['square_surface_radii']}")
