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


def run_word_mobile(mobile) -> None:
    mobile.goto(f"{BASE_URL}/ko/word-counter/", wait_until="networkidle")
    mobile.locator("[data-word-counter] [data-input]").fill("모바일 글자 수 확인")
    mobile.wait_for_function("Number(document.querySelector('[data-metric=\"1\"]').textContent) > 0")
    mobile.screenshot(path=str(QA_DIR / "plaintool-word-mobile-ko.png"), full_page=False)
