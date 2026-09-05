from .common import inspect_view
from .config import BASE_URL, QA_DIR


def run_base64_desktop(desktop, report: dict) -> None:
    report["desktop"] = inspect_view(desktop, "/ko/base64-decode/", "cloudflare-detail-desktop-ko.png")
    report["font_loading"] = desktop.evaluate("""
      async () => {
        await document.fonts.ready;
        const resources = performance.getEntriesByType('resource')
          .filter((entry) => entry.name.includes('/fonts/'))
          .map((entry) => ({
            url: entry.name,
            transfer_size: entry.transferSize,
            decoded_body_size: entry.decodedBodySize
          }));
        const input = document.querySelector('#codec-input');
        return {
          computed_family: getComputedStyle(input).fontFamily,
          plain_tool_mono_loaded: document.fonts.check('13px "PlainTool Mono"', 'PlainTool 한국어'),
          resources,
          decoded_body_size: resources.reduce((total, entry) => total + entry.decoded_body_size, 0)
        };
      }
    """)
    font_loading = report["font_loading"]
    if not font_loading["plain_tool_mono_loaded"]:
        report["ui_detail_failures"].append("PlainTool Mono was declared but did not load for Latin and Korean code text.")
    if any(not resource["url"].startswith(BASE_URL) for resource in font_loading["resources"]):
        report["ui_detail_failures"].append(f"A font loaded from outside the PlainTool origin: {font_loading}")
    if font_loading["decoded_body_size"] > 1_258_291:
        report["ui_detail_failures"].append(f"The initial Korean code-font payload exceeded 1.2 MiB: {font_loading}")
    report["computed_styles"] = desktop.evaluate("""
      () => Object.fromEntries([
        ["body", "body"],
        ["header", ".site-header"],
        ["title", ".tool-intro h1"],
        ["converter", ".converter"],
        ["mode_switch", ".mode-switch"],
        ["active_mode", ".mode-button.is-active"],
        ["file_action", ".file-button"]
      ].map(([name, selector]) => {
        const element = document.querySelector(selector);
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return [name, {
          font_size: style.fontSize,
          font_weight: style.fontWeight,
          border_radius: style.borderRadius,
          background: style.backgroundColor,
          width: Math.round(box.width),
          height: Math.round(box.height),
          top: Math.round(box.top)
        }];
      }))
    """)
    report["desktop_alignment"] = desktop.evaluate("""
      () => {
        const box = (selector) => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return {
            left: Math.round(rect.left * 100) / 100,
            right: Math.round(rect.right * 100) / 100,
            top: Math.round(rect.top * 100) / 100,
            bottom: Math.round(rect.bottom * 100) / 100,
            width: Math.round(rect.width * 100) / 100,
            height: Math.round(rect.height * 100) / 100,
            center_y: Math.round((rect.top + rect.height / 2) * 100) / 100
          };
        };
        const subheading = document.querySelector('.hero-subheading');
        const subheadingStyle = getComputedStyle(subheading);
        return {
          header: box('.header-inner'),
          intro_copy: box('.tool-intro-copy'),
          converter: box('.converter'),
          content_sections: box('.content-sections'),
          footer: box('.footer-inner'),
          file_button: box('.file-button'),
          clear_button: box('[data-clear]'),
          subheading: {
            ...box('.hero-subheading'),
            line_height: parseFloat(subheadingStyle.lineHeight),
            line_count: Math.round(subheading.getBoundingClientRect().height / parseFloat(subheadingStyle.lineHeight))
          },
          header_context_count: document.querySelectorAll('[data-header-context]').length,
          workspace_assurance_count: document.querySelectorAll('.workspace-assurance').length,
          privacy_note_count: document.querySelectorAll('.privacy-note').length,
          tool_promise_count: document.querySelectorAll('.tool-promise').length
        };
      }
    """)

    report["action_icon_count"] = desktop.evaluate("""
      () => {
        return document.querySelectorAll('.pane-actions .ui-icon').length;
      }
    """)

    alignment = report["desktop_alignment"]
    axis_names = ["header", "intro_copy", "converter", "content_sections", "footer"]
    axis_lefts = [alignment[name]["left"] for name in axis_names]
    axis_rights = [alignment[name]["right"] for name in axis_names]
    if max(axis_lefts) - min(axis_lefts) > 1 or max(axis_rights) - min(axis_rights) > 1:
        report["ui_detail_failures"].append(
            f"Shared desktop axis diverged: left={axis_lefts}, right={axis_rights}"
        )
    if abs(alignment["file_button"]["center_y"] - alignment["clear_button"]["center_y"]) > 1:
        report["ui_detail_failures"].append("File and clear controls are not vertically centered.")
    if alignment["subheading"]["line_count"] != 1:
        report["ui_detail_failures"].append(
            f"Korean desktop subheading wrapped to {alignment['subheading']['line_count']} lines."
        )
    if alignment["header_context_count"] != 1:
        report["ui_detail_failures"].append("Header location context must render exactly once.")
    if (
        alignment["workspace_assurance_count"] != 0
        or alignment["privacy_note_count"] != 0
        or alignment["tool_promise_count"] != 1
    ):
        report["ui_detail_failures"].append("Top tool promise is duplicated or missing.")
    if report["action_icon_count"] != 5:
        report["ui_detail_failures"].append(
            f"Expected five pane action icons: {report['action_icon_count']}"
        )

    desktop.locator(".options summary").click()
    desktop.wait_for_timeout(150)
    desktop.evaluate(
        """() => {
          const trigger = document.querySelector('[aria-describedby="base64-charset-help"]');
          const root = trigger.closest('[data-tooltip]');
          root.style.position = 'fixed';
          root.style.insetInlineStart = '16px';
          root.style.insetBlockEnd = '16px';
        }"""
    )
    desktop.locator('[aria-describedby="base64-charset-help"]').hover()
    desktop.wait_for_timeout(50)
    report["base64_tooltip_viewport"] = desktop.evaluate(
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
    tooltip_state = report["base64_tooltip_viewport"]
    if (
        tooltip_state["placement"] != "top"
        or tooltip_state["top"] < 0
        or tooltip_state["bottom"] > tooltip_state["viewport"]
    ):
        report["ui_detail_failures"].append(
            f"Base64 option tooltip is clipped at the viewport edge: {tooltip_state}"
        )
    desktop.evaluate(
        """() => document.querySelector('[aria-describedby="base64-charset-help"]')
          .closest('[data-tooltip]').removeAttribute('style')"""
    )
    report["options_open_state"] = {
        "open": desktop.locator(".options").get_attribute("open") is not None,
        "chevron_transform": desktop.locator(".options-chevron").evaluate("element => getComputedStyle(element).transform")
    }
    if not report["options_open_state"]["open"] or report["options_open_state"]["chevron_transform"] == "none":
        report["ui_detail_failures"].append(f"Options chevron did not expose its open state: {report['options_open_state']}")
    desktop.locator(".options summary").click()

    report["base64_decode_heading"] = desktop.locator("[data-mode-heading]").inner_text().strip()
    decode_header_label = desktop.locator("[data-header-context-label]").inner_text().strip()
    if report["base64_decode_heading"] != decode_header_label:
        report["ui_detail_failures"].append(
            f"Base64 decode H1 must use only the catalog tool name: {report['base64_decode_heading']}"
        )
    report["base64_decode_example"] = desktop.locator("#codec-input").get_attribute("placeholder")
    if "SGVsbG8sIFBsYWluVG9vbCE=" not in report["base64_decode_example"]:
        report["ui_detail_failures"].append(f"Base64 decode input lacks a usable example: {report['base64_decode_example']}")
    report["recursive_decode_default"] = desktop.locator('[data-option="recursive"]').is_checked()
    if report["recursive_decode_default"]:
        report["ui_detail_failures"].append("Recursive Base64 decoding must be explicit opt-in.")

    desktop.locator("#codec-input").fill("SGVsbG8g7ZWc6rWt7Ja0")
    desktop.locator("#codec-output").wait_for(state="visible")
    desktop.wait_for_function("document.querySelector('#codec-output').value === 'Hello 한국어'")
    report["decode_output"] = desktop.locator("#codec-output").input_value()
    decoded_url = "https://example.com/path?q=1"
    desktop.locator("#codec-input").fill("aHR0cHM6Ly9leGFtcGxlLmNvbS9wYXRoP3E9MQ==")
    desktop.wait_for_function(
        f"document.querySelector('#codec-output').value === '{decoded_url}'"
    )
    report["base64_url_action"] = {
        "badge": desktop.locator("[data-url-badge]").is_visible(),
        "action": desktop.locator("[data-open-url]").is_visible(),
        "disabled": desktop.locator("[data-open-url]").is_disabled(),
        "page_url": desktop.url,
        "stored": desktop.evaluate(
            """() => Object.values(localStorage).some(value => value.includes('example.com/path'))"""
        ),
    }
    if report["base64_url_action"] != {
        "badge": True,
        "action": True,
        "disabled": False,
        "page_url": f"{BASE_URL}/ko/base64-decode/",
        "stored": False,
    }:
        report["ui_detail_failures"].append(
            f"Decoded HTTP(S) URL action is unsafe or unavailable: {report['base64_url_action']}"
        )
    desktop.locator("[data-open-url]").click()
    report["base64_url_dialog"] = desktop.evaluate(
        """() => ({
          open: document.querySelector('[data-url-dialog]').open,
          destination: document.querySelector('[data-url-destination]').textContent,
          active: document.activeElement?.matches('[data-cancel-url]')
        })"""
    )
    if report["base64_url_dialog"] != {
        "open": True,
        "destination": decoded_url,
        "active": True,
    }:
        report["ui_detail_failures"].append(
            f"Decoded URL dialog did not present a safe confirmation state: {report['base64_url_dialog']}"
        )
    desktop.locator("[data-cancel-url]").click()
    desktop.evaluate("window.__base64OpenedUrl = null; window.open = (...args) => { window.__base64OpenedUrl = args; return null; }")
    desktop.locator("[data-open-url]").click()
    desktop.locator("[data-confirm-url]").click()
    report["base64_url_confirm"] = desktop.evaluate("() => window.__base64OpenedUrl")
    if report["base64_url_confirm"] != [
        decoded_url,
        "_blank",
        "noopener,noreferrer",
    ]:
        report["ui_detail_failures"].append(
            f"Decoded URL confirmation did not use the isolated new-tab contract: {report['base64_url_confirm']}"
        )
    desktop.locator("#codec-input").fill("amF2YXNjcmlwdDphbGVydCgxKQ==")
    desktop.wait_for_function(
        "document.querySelector('#codec-output').value === 'javascript:alert(1)'"
    )
    if desktop.locator("[data-open-url]").is_visible():
        report["ui_detail_failures"].append("Non-HTTP decoded URL exposed an open action.")
    report["base64_size_badges"] = desktop.locator(
        "[data-converter] [data-badges] > *"
    ).all_text_contents()
    if not any(text.strip().endswith(" B") for text in report["base64_size_badges"]):
        report["ui_detail_failures"].append(
            f"Base64 result does not expose decoded byte size: {report['base64_size_badges']}"
        )

    desktop.get_by_role("button", name="인코딩", exact=True).click()
    report["encode_mode_url"] = desktop.url
    report["base64_encode_heading"] = desktop.locator("[data-mode-heading]").inner_text().strip()
    encode_header_label = desktop.locator("[data-header-context-label]").inner_text().strip()
    if report["base64_encode_heading"] != encode_header_label:
        report["ui_detail_failures"].append(
            f"Base64 encode H1 must use only the catalog tool name: {report['base64_encode_heading']}"
        )
    report["base64_encode_example"] = desktop.locator("#codec-input").get_attribute("placeholder")
    if "AbsolTools" not in report["base64_encode_example"]:
        report["ui_detail_failures"].append(f"Base64 encode input lacks a usable example: {report['base64_encode_example']}")
    report["encode_seo_state"] = desktop.evaluate("""
      () => {
        const graph = JSON.parse(document.querySelector('[data-page-schema]').textContent)['@graph'];
        const page = graph.find(node => node['@type'] === 'WebPage');
        const application = graph.find(node => Array.isArray(node['@type']) && node['@type'].includes('SoftwareApplication'));
        const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
        return {
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          og_url: document.querySelector('meta[property="og:url"]')?.content,
          og_title: document.querySelector('meta[property="og:title"]')?.content,
          twitter_title: document.querySelector('meta[name="twitter:title"]')?.content,
          page_url: page?.url,
          application_url: application?.url,
          breadcrumb_url: breadcrumb?.itemListElement?.at(-1)?.item
        };
      }
    """)
    seo_urls = [value for key, value in report["encode_seo_state"].items() if key.endswith("url") or key == "canonical"]
    if len(set(seo_urls)) != 1 or not seo_urls[0].endswith("/ko/base64-encode/"):
        report["ui_detail_failures"].append(f"Encode mode URL metadata/schema diverged: {report['encode_seo_state']}")
    if len({report["encode_seo_state"][key] for key in ("title", "og_title", "twitter_title")}) != 1:
        report["ui_detail_failures"].append(f"Encode mode title metadata diverged: {report['encode_seo_state']}")
    desktop.locator("#codec-input").fill("Hello 한국어")
    desktop.wait_for_function("document.querySelector('#codec-output').value === 'SGVsbG8g7ZWc6rWt7Ja0'")
    report["encode_output"] = desktop.locator("#codec-output").input_value()
    desktop.evaluate("""
      () => {
        const root = document.querySelector('[data-converter]');
        const output = document.querySelector('#codec-output');
        window.__base64UxTransition = { outputs: [], states: [] };
        window.__base64UxTimer = setInterval(() => {
          window.__base64UxTransition.outputs.push(output.value);
          window.__base64UxTransition.states.push(root.className);
        }, 4);
      }
    """)
    desktop.locator("#codec-input").press("End")
    desktop.locator("#codec-input").type("!")
    desktop.wait_for_function("document.querySelector('#codec-output').value && document.querySelector('#codec-output').value !== 'SGVsbG8g7ZWc6rWt7Ja0'")
    desktop.wait_for_timeout(220)
    report["base64_fast_transition"] = desktop.evaluate("""
      () => {
        clearInterval(window.__base64UxTimer);
        return {
          outputs: [...new Set(window.__base64UxTransition.outputs)],
          states: [...new Set(window.__base64UxTransition.states)]
        };
      }
    """)
    if "" in report["base64_fast_transition"]["outputs"] or any("is-working" in state for state in report["base64_fast_transition"]["states"]):
        report["ui_detail_failures"].append(f"Fast Base64 input exposed an empty output or transient working state: {report['base64_fast_transition']}")
    report["base64_complete_status"] = desktop.locator("[data-converter] [data-status]").text_content()
    if report["base64_complete_status"] != "인코딩 완료" or "is-success" not in (desktop.locator("[data-converter]").get_attribute("class") or ""):
        report["ui_detail_failures"].append(f"Base64 completion state is unclear: {report['base64_complete_status']}")
    desktop.locator("[data-options] summary").click()
    desktop.locator('[data-option="includePadding"]').set_checked(False)
    desktop.wait_for_function("document.querySelector('#codec-output').value && !document.querySelector('#codec-output').value.endsWith('=')")
    report["base64_option_recomputed"] = desktop.locator("#codec-output").input_value()
    desktop.evaluate("""
      () => {
        const input = document.querySelector('#codec-input');
        input.value = 'A'.repeat(1024 * 1024 + 1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    """)
    desktop.wait_for_function(
        "document.querySelector('#codec-output').value.length > 1024 * 1024",
        timeout=10000,
    )
    report["base64_large_auto_state"] = desktop.evaluate("""
      () => ({
        output_length: document.querySelector('#codec-output').value.length,
        className: document.querySelector('[data-converter]').className
      })
    """)
    if report["base64_large_auto_state"]["output_length"] <= 1024 * 1024 or "is-success" not in report["base64_large_auto_state"]["className"]:
        report["ui_detail_failures"].append(f"Large Base64 input did not auto-convert: {report['base64_large_auto_state']}")
    desktop.locator("[data-converter] [data-clear]").click()
    desktop.locator("#codec-output").focus()
    report["output_focus"] = desktop.locator("#codec-output").evaluate(
        "element => ({ style: getComputedStyle(element).outlineStyle, width: getComputedStyle(element).outlineWidth, shadow: getComputedStyle(element).boxShadow, paneShadow: getComputedStyle(element.closest('.editor-pane')).boxShadow })"
    )
    if report["output_focus"]["shadow"] == "none" or report["output_focus"]["paneShadow"] != "none":
        report["ui_detail_failures"].append(f"Readonly output lacks a complete focus ring: {report['output_focus']}")
    report["ko_locale_mode_link"] = desktop.locator('[data-locale-link][lang="en"]').first.get_attribute("href")
