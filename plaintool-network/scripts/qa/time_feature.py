from .config import BASE_URL, QA_DIR


def run_time_desktop(desktop, report: dict, locales: tuple[str, ...]) -> None:
    report["time_desktop_locales"] = {}
    for locale in locales:
        desktop.goto(f"{BASE_URL}/{locale}/unix-timestamp-converter/", wait_until="networkidle")
        desktop.wait_for_function("document.querySelector('[data-result=\"instant\"]').value.length > 0")
        geometry = desktop.evaluate("""
            () => {
              const selectors = ['[data-timestamp]', '[data-unit]', '[data-zone-mode]'];
              const controls = Object.fromEntries(selectors.map((selector) => {
                const rect = document.querySelector(selector).getBoundingClientRect();
                return [selector, { top: rect.top, height: rect.height, centerY: rect.top + rect.height / 2 }];
              }));
              const centers = Object.values(controls).map((control) => control.centerY);
              return {
                clientWidth: document.documentElement.clientWidth,
                scrollWidth: document.documentElement.scrollWidth,
                controls,
                centerDelta: Math.max(...centers) - Math.min(...centers),
              };
            }
        """)
        report["time_desktop_locales"][locale] = geometry
        if geometry["scrollWidth"] != geometry["clientWidth"] or geometry["centerDelta"] > 1:
            report["ui_detail_failures"].append(f"Time converter desktop geometry failed for {locale}: {geometry}")
        desktop.screenshot(path=str(QA_DIR / f"plaintool-time-desktop-{locale}.png"), full_page=False)

    desktop.goto(f"{BASE_URL}/ko/unix-timestamp-converter/", wait_until="networkidle")
    desktop.wait_for_function("document.querySelector('[data-result=\"instant\"]').value === '2024-01-01T00:00:00Z'")
    report["time_default_zone"] = {
        "mode": desktop.locator("[data-zone-mode]").input_value(),
        "label": desktop.locator('[data-zone-mode] option[value="local"]').text_content(),
        "offset": desktop.locator("[data-zone-offset]").input_value(),
        "expected_offset": desktop.evaluate("""
            () => {
              const minutes = -new Date().getTimezoneOffset();
              const sign = minutes < 0 ? '-' : '+';
              const absolute = Math.abs(minutes);
              return `${sign}${String(Math.floor(absolute / 60)).padStart(2, '0')}:${String(absolute % 60).padStart(2, '0')}`;
            }
        """),
    }
    if report["time_default_zone"]["mode"] != "local" or report["time_default_zone"]["offset"] != report["time_default_zone"]["expected_offset"]:
        report["ui_detail_failures"].append(f"The browser time zone and its current offset must be the defaults: {report['time_default_zone']}")
    report["timestamp_example"] = {
        "value": desktop.locator("[data-timestamp]").input_value(),
        "hint": desktop.locator("#time-timestamp-hint").text_content(),
        "initial_result": desktop.locator('[data-result="instant"]').input_value(),
    }
    report["time_ko_dst_faq"] = desktop.locator("details summary", has_text="서머타임(DST)").count()
    if report["time_ko_dst_faq"] != 1:
        report["ui_detail_failures"].append("Korean daylight-saving guidance must use the familiar term 서머타임(DST).")
    if report["timestamp_example"]["value"] != "1704067200" or "1704067200000" not in report["timestamp_example"]["hint"]:
        report["ui_detail_failures"].append(f"Timestamp input example or unit hint is incomplete: {report['timestamp_example']}")
    report["time_field_alignment"] = desktop.evaluate("""
        () => {
          const selectors = ['[data-timestamp]', '[data-unit]', '[data-zone-mode]'];
          const controls = Object.fromEntries(selectors.map((selector) => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return [selector, { top: rect.top, height: rect.height, centerY: rect.top + rect.height / 2 }];
          }));
          const centers = Object.values(controls).map((control) => control.centerY);
          return { controls, centerDelta: Math.max(...centers) - Math.min(...centers) };
        }
    """)
    if report["time_field_alignment"]["centerDelta"] > 1:
        report["ui_detail_failures"].append(f"Timestamp, unit, and time-zone controls are not aligned: {report['time_field_alignment']}")
    report["time_iana_option_count"] = desktop.locator("#iana-zones option").count()
    if report["time_iana_option_count"] != 12:
        report["ui_detail_failures"].append(f"The timestamp time-zone suggestions must stay on the concise 12-city set: {report['time_iana_option_count']}")
    report["time_offset_options"] = desktop.evaluate("""
        () => [...document.querySelectorAll('[data-zone-offset] option')].map((option) => option.value)
    """)
    if len(report["time_offset_options"]) != 39 or "+00:15" in report["time_offset_options"] or "-11:45" in report["time_offset_options"]:
        report["ui_detail_failures"].append(f"UTC offsets must use the compact set of real-world offsets instead of generated 15-minute steps: {report['time_offset_options']}")
    desktop.screenshot(path=str(QA_DIR / "plaintool-time-example-desktop-ko.png"), full_page=False)
    desktop.locator("[data-timestamp]").fill("0")
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function("document.querySelector('[data-result=\"instant\"]').value === '1970-01-01T00:00:00Z'")
    report["timestamp_epoch"] = desktop.locator('[data-result="instant"]').input_value()
    report["time_complete_status"] = desktop.locator("[data-time-tool] [data-status]").text_content()
    if report["time_complete_status"] != "변환 완료" or "is-success" not in (desktop.locator("[data-time-tool]").get_attribute("class") or ""):
        report["ui_detail_failures"].append(f"Time conversion completion state is unclear: {report['time_complete_status']}")
    desktop.locator("[data-zone-mode]").select_option("selected")
    report["time_iana_initial_value"] = desktop.locator("[data-zone]").input_value()
    report["time_iana_search"] = {
        "label": desktop.locator(".zone-selected > span").text_content(),
        "placeholder": desktop.locator("[data-zone]").get_attribute("placeholder"),
        "seoul_label": desktop.locator('#iana-zones option[value="Asia/Seoul"]').get_attribute("label"),
        "new_york_label": desktop.locator('#iana-zones option[value="America/New_York"]').get_attribute("label"),
    }
    desktop.screenshot(path=str(QA_DIR / "plaintool-time-iana-desktop-ko.png"), full_page=False)
    desktop.locator("[data-zone]").fill("America/New_York")
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function("document.querySelector('[data-result=\"zoned\"]').value.includes('[America/New_York]')")
    report["time_iana_result"] = desktop.locator('[data-result="zoned"]').input_value()
    if report["time_iana_initial_value"]:
        report["ui_detail_failures"].append(f"The IANA field must open unfiltered instead of being prefilled: {report['time_iana_initial_value']}")
    if "도시" not in report["time_iana_search"]["label"] or "서울" not in report["time_iana_search"]["seoul_label"] or "UTC+09:00" not in report["time_iana_search"]["seoul_label"] or "New_York" not in report["time_iana_search"]["new_york_label"] or "UTC" not in report["time_iana_search"]["new_york_label"]:
        report["ui_detail_failures"].append(f"IANA search must expose localized city/region labels, canonical identifiers, and current offsets: {report['time_iana_search']}")
    desktop.locator("[data-zone-mode]").select_option("offset")
    desktop.locator("[data-zone-offset]").select_option("+09:00")
    desktop.screenshot(path=str(QA_DIR / "plaintool-time-offset-desktop-ko.png"), full_page=False)
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function("document.querySelector('[data-result=\"zoned\"]').value === '1970-01-01T09:00:00+09:00[+09:00]'")
    report["time_fixed_offset_result"] = desktop.locator('[data-result="zoned"]').input_value()
    desktop.locator('[data-mode-button="date"]').click()
    report["time_date_input_type"] = desktop.locator("[data-date]").get_attribute("type")
    report["time_date_example"] = {
        "value": desktop.locator("[data-date]").input_value(),
        "hint": desktop.locator("#time-date-hint").text_content(),
    }
    report["time_native_picker_count"] = desktop.locator("[data-native-date]").count()
    report["time_dst_hidden_in_fixed_offset"] = desktop.locator(".dst-field").is_hidden()
    desktop.locator("[data-zone-offset]").select_option("+00:00")
    desktop.locator("[data-date]").fill("1970-01-01T00:00:00")
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function("document.querySelector('[data-result=\"unixSeconds\"]').value === '0'")
    report["typed_date_unix_seconds"] = desktop.locator('[data-result="unixSeconds"]').input_value()
    desktop.locator("[data-zone-mode]").select_option("local")
    report["time_dst_visible_in_local"] = desktop.locator(".dst-field").is_visible()
    if report["time_date_input_type"] != "text" or report["time_native_picker_count"] != 1 or not report["time_dst_hidden_in_fixed_offset"]:
        report["ui_detail_failures"].append("Date input must support direct typing, retain a picker, and hide irrelevant DST handling for UTC offsets.")
    if not report["time_dst_visible_in_local"]:
        report["ui_detail_failures"].append("Browser-local date conversion must expose skipped/repeated local-time handling.")
    if report["time_date_example"]["value"] != "2024-01-01T00:00" or "2024-01-01T00:00" not in report["time_date_example"]["hint"]:
        report["ui_detail_failures"].append(f"Date input example or format hint is incomplete: {report['time_date_example']}")
    desktop.locator('[data-mode-button="timestamp"]').click()
    desktop.locator("[data-timestamp]").fill("invalid")
    desktop.locator("[data-convert]").click()
    desktop.locator('[data-mode-button="date"]').click()
    report["time_hidden_invalid_cleared"] = desktop.locator("[data-timestamp]").get_attribute("aria-invalid")
    desktop.locator("[data-date]").fill("invalid")
    desktop.locator("[data-convert]").click()
    desktop.locator("[data-native-date]").fill("2024-01-01T00:00")
    report["time_picker_invalid_cleared"] = desktop.locator("[data-date]").get_attribute("aria-invalid")
    if report["time_hidden_invalid_cleared"] is not None or report["time_picker_invalid_cleared"] is not None:
        report["ui_detail_failures"].append(f"Mode and picker changes must clear stale invalid fields: {report['time_hidden_invalid_cleared']}/{report['time_picker_invalid_cleared']}")
    desktop.locator("[data-zone-mode]").select_option("selected")
    report["time_dst_visible_in_iana"] = desktop.locator(".dst-field").is_visible()
    if not report["time_dst_visible_in_iana"]:
        report["ui_detail_failures"].append("IANA date conversion must expose skipped/repeated local-time handling.")
    desktop.locator("[data-zone]").fill("Not/A_Zone")
    desktop.locator("[data-now]").click()
    report["time_invalid_zone_recovery"] = {
        "zone_invalid": desktop.locator("[data-zone]").get_attribute("aria-invalid"),
        "date_invalid": desktop.locator("[data-date]").get_attribute("aria-invalid"),
    }
    if report["time_invalid_zone_recovery"]["zone_invalid"] != "true" or report["time_invalid_zone_recovery"]["date_invalid"] is not None:
        report["ui_detail_failures"].append(f"Invalid time zones must focus the zone control without marking the date: {report['time_invalid_zone_recovery']}")


def run_time_mobile(mobile, report: dict, locales: tuple[str, ...]) -> None:
    report["time_mobile_locales"] = {}
    for locale in locales:
        mobile.goto(f"{BASE_URL}/{locale}/unix-timestamp-converter/", wait_until="networkidle")
        mobile.wait_for_function("document.querySelector('[data-result=\"instant\"]').value.length > 0")
        mobile.locator("[data-timestamp]").fill("0")
        mobile.locator("[data-convert]").click()
        mobile.wait_for_function(
            "document.querySelector('[data-result=\"instant\"]').value === '1970-01-01T00:00:00Z'"
        )
        state = mobile.evaluate("""
            () => ({
              clientWidth: document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              epochResult: document.querySelector('[data-result="instant"]').value,
              controlHeights: [...document.querySelectorAll('[data-time-tool] button:not([hidden]), [data-time-tool] select:not([hidden]), [data-time-tool] input:not([type="hidden"])')]
                .filter((element) => element.getClientRects().length)
                .map((element) => ({ name: element.getAttribute('name') || element.getAttribute('data-mode-button') || element.getAttribute('data-convert') || element.getAttribute('data-now') || element.getAttribute('data-clear'), height: element.getBoundingClientRect().height }))
            })
        """)
        report["time_mobile_locales"][locale] = state
        if state["scrollWidth"] != state["clientWidth"] or any(control["height"] < 44 for control in state["controlHeights"]):
            report["ui_detail_failures"].append(f"Time converter mobile geometry failed for {locale}: {state}")
        mobile.screenshot(path=str(QA_DIR / f"plaintool-time-mobile-{locale}.png"), full_page=False)
