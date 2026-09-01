from playwright.sync_api import expect

from .config import BASE_URL


def run_regex_tester_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/regex-tester/", wait_until="networkidle")
    root = page.locator("[data-regex-tester]")
    expression = root.locator("[data-expression]")
    text = root.locator("[data-text]")
    replacement = root.locator("[data-replacement]")
    output = root.locator("[data-replacement-output]")

    expression.fill("[Aa]")
    text.fill("Aa")
    match_buttons = root.locator("[data-match-nav] button")
    expect(match_buttons).to_have_count(2)
    expect(root.locator("[data-results]")).to_be_visible()

    root.locator('[data-flags] input[value="g"]').uncheck()
    expect(match_buttons).to_have_count(1)
    root.locator('[data-flags] input[value="g"]').check()
    expect(match_buttons).to_have_count(2)

    root.locator("[data-show-replacement]").click()
    expect(root.locator(".regex-replacement-panel")).to_be_visible()
    replacement.fill("[$&]")
    expect(output).to_have_value("[A][a]")
    expect(replacement).to_have_value("[$&]")

    expression.fill("[")
    expect(root.locator("[data-status]")).to_contain_text(
        "regular expression is invalid"
    )
    if root.locator("[data-copy-result]").is_enabled():
        report["ui_detail_failures"].append(
            "Regex invalid input retained a stale copy action."
        )

    root.locator("[data-clear]").click()
    expect(expression).to_have_value("")
    expect(text).to_have_value("")
    expect(output).to_have_value("")
    report["regex_tester"] = {
        "global_flag_honored": True,
        "replacement_revealed_on_demand": True,
        "replacement_auto_updated": True,
        "replacement_input_preserved": True,
        "invalid_state_clears_actions": True,
    }


def run_regex_tester_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/regex-tester/", wait_until="networkidle")
    state = page.evaluate(
        """() => {
          const root = document.querySelector('[data-regex-tester]');
          const expression = root.querySelector('[data-expression]');
          const labels = [...root.querySelectorAll('label')].map((item) => item.textContent.trim());
          return {
            direction: document.documentElement.dir,
            expressionDirection: getComputedStyle(expression).direction,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            englishLabels: labels.filter((label) => ['Regular expression', 'Test text', 'Replacement template'].includes(label)),
            minButtonHeight: Math.min(...[...root.querySelectorAll('button')].filter((button) => button.getClientRects().length).map((button) => button.getBoundingClientRect().height)),
          };
        }"""
    )
    report["regex_tester_mobile"] = state
    if (
        state["direction"] != "rtl"
        or state["expressionDirection"] != "ltr"
        or state["scrollWidth"] > state["clientWidth"]
        or state["englishLabels"]
        or state["minButtonHeight"] < 44
    ):
        report["ui_detail_failures"].append(
            f"Arabic regex tester layout or localization failed: {state}"
        )
