from .config import BASE_URL, QA_DIR


def run_text_compare_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/text-compare/", wait_until="networkidle")
    original = desktop.locator("[data-original]")
    changed = desktop.locator("[data-changed]")
    original.fill("첫째 줄\n둘째 줄\n공통 줄")
    changed.fill("첫째 줄\n바뀐 줄\n공통 줄\n추가 줄")
    desktop.locator("[data-compare]").click()
    desktop.wait_for_function(
        "document.querySelector('[data-text-compare]').classList.contains('is-success')"
    )

    state = desktop.evaluate(
        """
        () => ({
          rows: document.querySelectorAll('[data-change-row]').length,
          insertions: document.querySelectorAll('[data-diff-table] ins').length,
          deletions: document.querySelectorAll('[data-diff-table] del').length,
          liveRegions: document.querySelectorAll('[data-text-compare] [aria-live]').length,
          previousDisabled: document.querySelector('[data-previous-change]').disabled,
          nextDisabled: document.querySelector('[data-next-change]').disabled,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        })
        """
    )
    report["text_compare_desktop"] = state
    if (
        state["rows"] < 2
        or state["insertions"] < 1
        or state["deletions"] < 1
        or state["liveRegions"] != 1
        or not state["previousDisabled"]
        or state["nextDisabled"]
        or state["scrollWidth"] > state["clientWidth"]
    ):
        report["ui_detail_failures"].append(
            f"Text compare result or navigation contract failed: {state}"
        )

    desktop.locator("[data-next-change]").click()
    first_active = desktop.locator("[data-change-row].is-active-change").count()
    original.fill("편집 후 이전 결과")
    stale = desktop.evaluate(
        """
        () => ({
          notice: !document.querySelector('[data-stale-notice]').hidden,
          className: document.querySelector('[data-results]').className,
          resultVisible: !document.querySelector('[data-results]').hidden,
        })
        """
    )
    report["text_compare_stale"] = stale
    if first_active != 1 or not stale["notice"] or "is-stale" not in stale["className"] or not stale["resultVisible"]:
        report["ui_detail_failures"].append(
            f"Text compare change navigation or stale-result state failed: {stale}"
        )

    desktop.locator("[data-clear]").click()
    desktop.locator("[data-compare]").click()
    empty_state = {
        "focused": desktop.evaluate("document.activeElement === document.querySelector('[data-original]')"),
        "has_error": "has-error" in (desktop.locator("[data-text-compare]").get_attribute("class") or ""),
    }
    report["text_compare_empty"] = empty_state
    if not all(empty_state.values()):
        report["ui_detail_failures"].append(
            f"Text compare empty-input recovery failed: {empty_state}"
        )

    desktop.screenshot(
        path=str(QA_DIR / "plaintool-text-compare-desktop-ko.png"),
        full_page=False,
    )


def run_text_compare_mobile(mobile, report: dict) -> None:
    mobile.goto(f"{BASE_URL}/es/text-compare/", wait_until="networkidle")
    mobile.locator("[data-original]").fill("uno\ndos")
    mobile.locator("[data-changed]").fill("uno\ntres")
    mobile.locator("[data-compare]").click()
    mobile.wait_for_function(
        "document.querySelector('[data-text-compare]').classList.contains('is-success')"
    )
    layout = mobile.evaluate(
        """
        () => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          compareHeight: document.querySelector('[data-compare]').getBoundingClientRect().height,
          swapHeight: document.querySelector('[data-swap]').getBoundingClientRect().height,
          clearHeight: document.querySelector('[data-clear]').getBoundingClientRect().height,
          stackedCells: [...document.querySelectorAll('.diff-row.is-changed .diff-cell')]
            .map((node) => Math.round(node.getBoundingClientRect().top)),
        })
        """
    )
    report["text_compare_mobile"] = layout
    if (
        layout["scrollWidth"] > layout["clientWidth"]
        or min(layout["compareHeight"], layout["swapHeight"], layout["clearHeight"]) < 43.5
        or len(set(layout["stackedCells"])) < 2
    ):
        report["ui_detail_failures"].append(
            f"Text compare mobile layout failed: {layout}"
        )
    mobile.screenshot(
        path=str(QA_DIR / "plaintool-text-compare-mobile-es.png"),
        full_page=False,
    )
