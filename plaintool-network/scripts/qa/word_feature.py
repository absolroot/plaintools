from .config import BASE_URL, QA_DIR


def run_word_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/word-counter/", wait_until="networkidle")
    report["word_counter_run_buttons"] = desktop.locator("[data-word-counter] [data-run]").count()
    report["word_counter_example"] = desktop.locator("[data-word-counter] [data-input]").get_attribute("placeholder")
    report["word_idle_status"] = desktop.locator("[data-word-counter] [data-status]").text_content()
    report["word_idle_status_dot"] = desktop.locator("[data-word-counter] .status-dot").evaluate("""
      (dot) => {
        const probe = document.createElement('span');
        probe.style.backgroundColor = 'var(--status-idle)';
        document.body.append(probe);
        const result = {
          actual: getComputedStyle(dot).backgroundColor,
          expected: getComputedStyle(probe).backgroundColor,
        };
        probe.remove();
        return result;
      }
    """)
    if report["word_counter_run_buttons"] != 0:
        report["ui_detail_failures"].append("Word counter must not show a redundant run button.")
    if report["word_idle_status_dot"]["actual"] != report["word_idle_status_dot"]["expected"]:
        report["ui_detail_failures"].append(f"Ready status dot does not use the idle status color: {report['word_idle_status_dot']}")
    if not report["word_counter_example"].startswith("예:"):
        report["ui_detail_failures"].append(f"Word counter input lacks a localized example: {report['word_counter_example']}")
    desktop.locator("[data-word-counter] [data-input]").fill("Hello 한국어\n\n두 번째 문단")
    desktop.wait_for_function("document.querySelector('[data-metric=\"0\"]').textContent === '5'")
    report["word_metrics"] = [desktop.locator(f'[data-metric="{index}"]').text_content() for index in range(5)]
    if report["word_metrics"] != ["5", "18", "13", "3", "2"]:
        report["ui_detail_failures"].append(f"Word metrics do not match the documented counting rules: {report['word_metrics']}")
    desktop.locator("[data-word-counter] [data-input]").fill("🇺 🇸\n \n두 번째 문단")
    desktop.wait_for_function("document.querySelector('[data-metric=\"4\"]').textContent === '2'")
    report["word_unicode_metrics"] = [desktop.locator(f'[data-metric="{index}"]').text_content() for index in range(5)]
    if report["word_unicode_metrics"] != ["3", "13", "7", "3", "2"]:
        report["ui_detail_failures"].append(
            f"Word Unicode or whitespace-only paragraph metrics regressed: {report['word_unicode_metrics']}"
        )
    report["word_complete_status"] = desktop.locator("[data-word-counter] [data-status]").text_content()
    if report["word_idle_status"] != "준비됨" or report["word_complete_status"] != "계산 완료" or "is-success" not in (desktop.locator("[data-word-counter]").get_attribute("class") or ""):
        report["ui_detail_failures"].append(f"Word counter state lifecycle is unclear: {report['word_idle_status']} -> {report['word_complete_status']}")
    word_input = desktop.locator("[data-word-counter] [data-input]")
    word_input.fill("a" * 29)
    desktop.wait_for_function("document.querySelector('[data-metric=\"1\"]').textContent === '29'")
    desktop.evaluate("""
      () => {
        const root = document.querySelector('[data-word-counter]');
        const metric = root.querySelector('[data-metric="1"]');
        window.__wordUxTransition = { metrics: [], states: [] };
        const record = () => {
          window.__wordUxTransition.metrics.push(metric.textContent);
          window.__wordUxTransition.states.push(root.className);
        };
        window.__wordMetricObserver = new MutationObserver(record);
        window.__wordStateObserver = new MutationObserver(record);
        window.__wordMetricObserver.observe(metric, { childList: true, characterData: true, subtree: true });
        window.__wordStateObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
      }
    """)
    word_input.press("End")
    word_input.type("a")
    desktop.wait_for_function("document.querySelector('[data-metric=\"1\"]').textContent === '30'")
    word_input.type("bbbbbbbbbb", delay=5)
    desktop.wait_for_function("document.querySelector('[data-metric=\"1\"]').textContent === '40'")
    desktop.wait_for_timeout(220)
    report["word_rapid_transition"] = desktop.evaluate("""
      () => {
        window.__wordMetricObserver.disconnect();
        window.__wordStateObserver.disconnect();
        return window.__wordUxTransition;
      }
    """)
    report["word_live_regions"] = desktop.locator("[data-word-counter] [aria-live]").count()
    if "0" in report["word_rapid_transition"]["metrics"] or any("is-working" in state for state in report["word_rapid_transition"]["states"]):
        report["ui_detail_failures"].append(f"Rapid word-count input exposed zero or a transient working state: {report['word_rapid_transition']}")
    if report["word_live_regions"] != 1:
        report["ui_detail_failures"].append(f"Word counter must expose one live region, received {report['word_live_regions']}.")
    desktop.locator("[data-word-counter] [data-clear]").click()
    desktop.wait_for_timeout(300)
    report["word_clear_state"] = desktop.evaluate("""
      () => ({
        input: document.querySelector('[data-word-counter] [data-input]').value,
        metrics: [...document.querySelectorAll('[data-word-counter] [data-metric]')].map(node => node.textContent),
        className: document.querySelector('[data-word-counter]').className
      })
    """)
    if report["word_clear_state"]["input"] or any(value != "0" for value in report["word_clear_state"]["metrics"]) or any(state in report["word_clear_state"]["className"] for state in ("is-working", "is-success", "has-error")):
        report["ui_detail_failures"].append(f"Word counter Clear did not remain settled: {report['word_clear_state']}")
    desktop.evaluate("""
      () => {
        const input = document.querySelector('[data-word-counter] [data-input]');
        input.value = 'a'.repeat(1_000_000);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    """)
    desktop.wait_for_function(
        "document.querySelector('[data-metric=\"1\"]').textContent === '1,000,000'",
        timeout=20000,
    )
    report["word_limit_boundary"] = desktop.locator('[data-metric="1"]').text_content()
    desktop.evaluate("""
      () => {
        const input = document.querySelector('[data-word-counter] [data-input]');
        input.value += 'a';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    """)
    desktop.wait_for_function("document.querySelector('[data-word-counter]').classList.contains('has-error')")
    report["word_over_limit"] = {
        "metrics": [desktop.locator(f'[data-metric="{index}"]').text_content() for index in range(5)],
        "status": desktop.locator("[data-word-counter] [data-status]").text_content(),
    }
    if any(value != "0" for value in report["word_over_limit"]["metrics"]) or "1 MB" not in report["word_over_limit"]["status"]:
        report["ui_detail_failures"].append(f"Word 1 MB limit did not fail clearly: {report['word_over_limit']}")
    word_input.fill("복구 완료")
    desktop.wait_for_function("document.querySelector('[data-metric=\"0\"]').textContent === '2'")
    if "is-success" not in (desktop.locator("[data-word-counter]").get_attribute("class") or ""):
        report["ui_detail_failures"].append("Word counter did not recover after an over-limit input was shortened.")


def run_word_mobile(mobile) -> None:
    mobile.goto(f"{BASE_URL}/ko/word-counter/", wait_until="networkidle")
    mobile.locator("[data-word-counter] [data-input]").fill("모바일 글자 수 확인")
    mobile.wait_for_function("Number(document.querySelector('[data-metric=\"1\"]').textContent) > 0")
    for width, height in ((390, 844), (768, 900)):
        mobile.set_viewport_size({"width": width, "height": height})
        mobile.goto(f"{BASE_URL}/ko/word-counter/", wait_until="networkidle")
        layout = mobile.evaluate("""
          () => {
            const metrics = [...document.querySelectorAll('[data-word-counter] .metric')].map((metric) => {
              const bounds = metric.getBoundingClientRect();
              return {
                top: Math.round(bounds.top),
                width: Math.round(bounds.width),
                fontSize: Number.parseFloat(getComputedStyle(metric.querySelector('strong')).fontSize)
              };
            });
            const textareaStyle = getComputedStyle(document.querySelector('[data-word-counter] textarea'));
            return {
              metrics,
              scrollWidth: document.documentElement.scrollWidth,
              textareaFont: textareaStyle.fontFamily,
              clearHeight: document.querySelector('[data-word-counter] [data-clear]').getBoundingClientRect().height,
              statusHeight: document.querySelector('[data-word-counter] .converter-commandbar').getBoundingClientRect().height
            };
          }
        """)
        primary = layout["metrics"][:2]
        secondary = layout["metrics"][2:]
        if len({metric["top"] for metric in primary}) != 1 or len({metric["top"] for metric in secondary}) != 1:
            raise AssertionError(f"Word {width}px metrics do not use the deliberate 2 + 3 grouping: {layout}")
        if min(metric["fontSize"] for metric in primary) <= max(metric["fontSize"] for metric in secondary):
            raise AssertionError(f"Word {width}px primary metrics lack visual priority: {layout}")
        if layout["scrollWidth"] > width or layout["clearHeight"] < 43.5:
            raise AssertionError(f"Word {width}px layout overflows or has an undersized Clear control: {layout}")
        if "PlainTool Mono" in layout["textareaFont"] or layout["statusHeight"] > 49:
            raise AssertionError(f"Word {width}px prose typography or compact status regressed: {layout}")
    mobile.set_viewport_size({"width": 390, "height": 844})
    mobile.goto(f"{BASE_URL}/ko/word-counter/", wait_until="networkidle")
    mobile.locator("[data-word-counter] [data-input]").fill("모바일 글자 수 확인")
    mobile.wait_for_function("Number(document.querySelector('[data-metric=\"1\"]').textContent) > 0")
    mobile.screenshot(path=str(QA_DIR / "plaintool-word-mobile-ko.png"), full_page=False)
