from .config import BASE_URL, QA_DIR


def run_case_converter_desktop(desktop, report: dict) -> None:
    desktop.add_init_script(
        """
        (() => {
          const NativeWorker = window.Worker;
          window.Worker = class QaWorker {
            constructor(url, options) {
              this.listeners = new Map();
              this.failureMode = location.hash === '#qa-worker-failure';
              this.delayMode = location.hash === '#qa-delayed-worker';
              if (!this.failureMode) this.inner = new NativeWorker(url, options);
            }

            addEventListener(type, listener, options) {
              if (this.failureMode) {
                const listeners = this.listeners.get(type) || [];
                listeners.push(listener);
                this.listeners.set(type, listeners);
                return;
              }
              if (this.delayMode && type === 'message') {
                const wrapped = (event) => setTimeout(() => listener(event), 250);
                this.listeners.set(listener, wrapped);
                this.inner.addEventListener(type, wrapped, options);
                return;
              }
              this.inner.addEventListener(type, listener, options);
            }

            postMessage(payload, transfer) {
              if (this.failureMode) {
                setTimeout(() => {
                  const event = new ErrorEvent('error', { message: 'QA worker failure' });
                  for (const listener of this.listeners.get('error') || []) listener(event);
                }, 0);
                return;
              }
              this.inner.postMessage(payload, transfer);
            }

            terminate() {
              this.inner?.terminate();
            }
          };
        })();
        """
    )
    desktop.goto(f"{BASE_URL}/ko/case-converter/", wait_until="networkidle")
    source = desktop.locator("[data-input]")
    output = desktop.locator("[data-output]")
    source.fill("hello Straße. SECOND line\nTHIRD")
    desktop.wait_for_function(
        "document.querySelector('[data-output]').value === 'HELLO STRASSE. SECOND LINE\\nTHIRD'"
    )

    outputs = {"upper": output.input_value()}
    expected = {
        "lower": "hello straße. second line\nthird",
        "sentence": "Hello straße. Second line\nThird",
        "capitalize-words": "Hello Straße. Second Line\nThird",
    }
    for mode, value in expected.items():
        desktop.locator(f'[data-mode][value="{mode}"]').check()
        desktop.wait_for_function(
            "expected => document.querySelector('[data-output]').value === expected",
            arg=value,
        )
        outputs[mode] = output.input_value()
    report["case_converter_outputs"] = outputs
    if outputs != {"upper": "HELLO STRASSE. SECOND LINE\nTHIRD", **expected}:
        report["ui_detail_failures"].append(
            f"Case conversion modes produced unexpected output: {outputs}"
        )

    with desktop.expect_download() as download_info:
        desktop.locator("[data-download]").click()
    download = download_info.value
    downloaded_bytes = download.path().read_bytes()
    report["case_converter_download"] = {
        "filename": download.suggested_filename,
        "utf8": downloaded_bytes.decode("utf-8"),
        "bytes": len(downloaded_bytes),
    }
    expected_download = outputs["capitalize-words"]
    if (
        report["case_converter_download"]["filename"] != "converted-text.txt"
        or downloaded_bytes != expected_download.encode("utf-8")
    ):
        report["ui_detail_failures"].append(
            "Case converter download filename or exact UTF-8 bytes changed: "
            f"{report['case_converter_download']}"
        )

    desktop.evaluate(
        """
        () => {
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: { writeText: () => Promise.reject(new Error('QA clipboard failure')) },
          });
        }
        """
    )
    desktop.locator("[data-copy]").click()
    desktop.wait_for_function(
        "document.querySelector('[data-case-converter]').classList.contains('has-error')"
    )
    copy_failure = desktop.locator("[data-status]").text_content()
    report["case_converter_copy_failure"] = copy_failure
    if not copy_failure or "복사" not in copy_failure:
        report["ui_detail_failures"].append(
            f"Case converter clipboard failure was unclear: {copy_failure}"
        )

    desktop.evaluate(
        """
        () => {
          window.__resolveCaseCopy = undefined;
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
              writeText: () => new Promise((resolve) => {
                window.__resolveCaseCopy = resolve;
              }),
            },
          });
        }
        """
    )
    desktop.locator("[data-copy]").click()
    source.fill("copy race replacement")
    desktop.evaluate("window.__resolveCaseCopy()")
    desktop.wait_for_timeout(0)
    copy_race = desktop.evaluate(
        """
        () => ({
          stale: document.querySelector('[data-case-converter]').classList.contains('has-stale-result'),
          copyDisabled: document.querySelector('[data-copy]').disabled,
          status: document.querySelector('[data-status]').textContent,
          copiedText: JSON.parse(document.querySelector('[data-client-copy]').textContent).copied,
        })
        """
    )
    report["case_converter_copy_race"] = copy_race
    if (
        not copy_race["stale"]
        or not copy_race["copyDisabled"]
        or copy_race["status"] == copy_race["copiedText"]
    ):
        report["ui_detail_failures"].append(
            f"Case converter stale clipboard completion won the race: {copy_race}"
        )

    source.fill("pending replacement")
    stale = desktop.evaluate(
        """
        () => ({
          output: document.querySelector('[data-output]').value,
          stale: document.querySelector('[data-case-converter]').classList.contains('has-stale-result'),
          copyDisabled: document.querySelector('[data-copy]').disabled,
          downloadDisabled: document.querySelector('[data-download]').disabled,
        })
        """
    )
    report["case_converter_stale"] = stale
    if not stale["output"] or not stale["stale"] or not stale["copyDisabled"] or not stale["downloadDisabled"]:
        report["ui_detail_failures"].append(
            f"Case converter stale-result state failed: {stale}"
        )

    desktop.evaluate(
        """
        () => {
          const input = document.querySelector('[data-input]');
          input.value = 'a'.repeat(1_000_001);
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        """
    )
    desktop.wait_for_function(
        "document.querySelector('[data-case-converter]').classList.contains('has-error')"
    )
    over_limit = desktop.locator("[data-status]").text_content()
    report["case_converter_over_limit"] = over_limit
    if "1 MB" not in over_limit:
        report["ui_detail_failures"].append(
            f"Case converter 1 MB limit was not clear: {over_limit}"
        )

    source.fill("복구 Complete")
    desktop.wait_for_function(
        "document.querySelector('[data-output]').value === '복구 Complete'"
    )
    desktop.locator("[data-clear]").click()
    clear_state = desktop.evaluate(
        """
        () => ({
          input: document.querySelector('[data-input]').value,
          output: document.querySelector('[data-output]').value,
          focused: document.activeElement === document.querySelector('[data-input]'),
          copyDisabled: document.querySelector('[data-copy]').disabled,
          downloadDisabled: document.querySelector('[data-download]').disabled,
        })
        """
    )
    report["case_converter_clear"] = clear_state
    if clear_state["input"] or clear_state["output"] or not clear_state["focused"] or not clear_state["copyDisabled"] or not clear_state["downloadDisabled"]:
        report["ui_detail_failures"].append(
            f"Case converter Clear did not reset the surface: {clear_state}"
        )

    desktop.goto(
        f"{BASE_URL}/ko/case-converter/?qa=delayed#qa-delayed-worker",
        wait_until="networkidle",
    )
    source = desktop.locator("[data-input]")
    source.fill("first result")
    desktop.wait_for_timeout(120)
    source.fill("second result")
    desktop.wait_for_function(
        "document.querySelector('[data-output]').value === 'SECOND RESULT'"
    )
    rapid_state = desktop.evaluate(
        """
        () => ({
          input: document.querySelector('[data-input]').value,
          output: document.querySelector('[data-output]').value,
          stale: document.querySelector('[data-case-converter]').classList.contains('has-stale-result'),
          success: document.querySelector('[data-case-converter]').classList.contains('is-success'),
        })
        """
    )
    report["case_converter_rapid_latest_only"] = rapid_state
    if rapid_state != {
        "input": "second result",
        "output": "SECOND RESULT",
        "stale": False,
        "success": True,
    }:
        report["ui_detail_failures"].append(
            f"Case converter did not keep only the latest rapid result: {rapid_state}"
        )

    source.fill("must not return after clear")
    desktop.wait_for_timeout(120)
    desktop.locator("[data-clear]").click()
    desktop.wait_for_timeout(300)
    clear_during_work = desktop.evaluate(
        """
        () => ({
          input: document.querySelector('[data-input]').value,
          output: document.querySelector('[data-output]').value,
          busy: document.querySelector('[data-case-converter]').getAttribute('aria-busy'),
          className: document.querySelector('[data-case-converter]').className,
          copyDisabled: document.querySelector('[data-copy]').disabled,
          downloadDisabled: document.querySelector('[data-download]').disabled,
        })
        """
    )
    report["case_converter_clear_during_work"] = clear_during_work
    if (
        clear_during_work["input"]
        or clear_during_work["output"]
        or clear_during_work["busy"] != "false"
        or any(
            state in clear_during_work["className"]
            for state in ("is-working", "is-success", "has-error", "has-stale-result")
        )
        or not clear_during_work["copyDisabled"]
        or not clear_during_work["downloadDisabled"]
    ):
        report["ui_detail_failures"].append(
            "Case converter Clear allowed delayed work to restore state: "
            f"{clear_during_work}"
        )

    desktop.goto(
        f"{BASE_URL}/ko/case-converter/?qa=failure#qa-worker-failure",
        wait_until="networkidle",
    )
    desktop.locator("[data-input]").fill("worker failure")
    desktop.wait_for_function(
        "document.querySelector('[data-case-converter]').classList.contains('has-error')"
    )
    worker_failure = desktop.evaluate(
        """
        () => ({
          status: document.querySelector('[data-status]').textContent,
          copyDisabled: document.querySelector('[data-copy]').disabled,
          downloadDisabled: document.querySelector('[data-download]').disabled,
          busy: document.querySelector('[data-case-converter]').getAttribute('aria-busy'),
        })
        """
    )
    report["case_converter_worker_failure"] = worker_failure
    if (
        not worker_failure["status"]
        or "처리" not in worker_failure["status"]
        or not worker_failure["copyDisabled"]
        or not worker_failure["downloadDisabled"]
        or worker_failure["busy"] != "false"
    ):
        report["ui_detail_failures"].append(
            f"Case converter Worker failure state was unclear: {worker_failure}"
        )
    desktop.screenshot(
        path=str(QA_DIR / "plaintool-case-converter-desktop-ko.png"),
        full_page=False,
    )


def run_case_converter_mobile(mobile, report: dict) -> None:
    mobile.goto(f"{BASE_URL}/es/case-converter/", wait_until="networkidle")
    mobile.locator("[data-input]").fill("árbol ÑANDÚ. SEGUNDA frase")
    mobile.locator('[data-mode][value="sentence"]').check()
    mobile.wait_for_function(
        "document.querySelector('[data-output]').value === 'Árbol ñandú. Segunda frase'"
    )
    layout = mobile.evaluate(
        """
        () => {
          const modes = [...document.querySelectorAll('.case-mode-option')].map((node) => {
            const rect = node.getBoundingClientRect();
            return { top: Math.round(rect.top), height: rect.height };
          });
          return {
            modes,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            actionHeights: [...document.querySelectorAll('.case-converter .text-button')]
              .map((node) => node.getBoundingClientRect().height),
            output: document.querySelector('[data-output]').value,
          };
        }
        """
    )
    report["case_converter_mobile"] = layout
    if (
        len(set(item["top"] for item in layout["modes"])) != 2
        or min(item["height"] for item in layout["modes"]) < 43.5
        or min(layout["actionHeights"]) < 43.5
        or layout["scrollWidth"] > layout["clientWidth"]
        or layout["output"] != "Árbol ñandú. Segunda frase"
    ):
        report["ui_detail_failures"].append(
            f"Case converter mobile layout or Spanish output failed: {layout}"
        )
    mobile.screenshot(
        path=str(QA_DIR / "plaintool-case-converter-mobile-es.png"),
        full_page=False,
    )
