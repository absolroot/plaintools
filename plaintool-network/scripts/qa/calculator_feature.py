from .config import BASE_URL, QA_DIR


def run_math_calculator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/fraction-calculator/", wait_until="networkidle")
    page.locator('[data-field="firstNumerator"]').fill("1")
    page.locator('[data-field="firstDenominator"]').fill("2")
    page.locator('[data-field="secondNumerator"]').fill("1")
    page.locator('[data-field="secondDenominator"]').fill("3")
    page.locator("[data-calculate]").click()
    fraction = page.locator('[data-result="fraction"]').text_content()
    fraction_geometry = page.evaluate("""() => {
      const expression = document.querySelector('.fraction-expression').getBoundingClientRect();
      const first = document.querySelectorAll('.fraction-input-group')[0].getBoundingClientRect();
      const operation = document.querySelector('.fraction-operation select').getBoundingClientRect();
      const second = document.querySelectorAll('.fraction-input-group')[1].getBoundingClientRect();
      return {
        order: [first.left, operation.left, second.left],
        centerDelta: Math.abs((operation.top + operation.height / 2) - (expression.top + expression.height / 2)),
        workspaceBackground: getComputedStyle(document.querySelector('.math-workspace')).backgroundColor,
        resultBackground: getComputedStyle(document.querySelector('.math-results')).backgroundColor,
        baseBackground: getComputedStyle(document.querySelector('.math-calculator')).backgroundColor,
      };
    }""")
    page.locator('a[href="/en/lcm-calculator/"]').click()
    page.locator('[data-field="lcm"]').fill("6, 8, 9")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({
      fraction: window.__fractionResult || document.querySelector('[data-result="lcm"]').textContent,
      lcm: document.querySelector('[data-result="lcm"]').textContent,
      gcf: document.querySelector('[data-result="gcf"]').textContent,
      resultsVisible: !document.querySelector('[data-results]').hidden,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    })""")
    state["fraction"] = fraction
    state["fractionGeometry"] = fraction_geometry
    report["math_calculator_desktop"] = state
    if (
        state["fraction"] != "5/6"
        or state["lcm"] != "72"
        or state["gcf"] != "1"
        or not state["resultsVisible"]
        or state["scrollWidth"] != state["clientWidth"]
        or fraction_geometry["order"] != sorted(fraction_geometry["order"])
        or fraction_geometry["centerDelta"] > 1
        or fraction_geometry["workspaceBackground"] != fraction_geometry["baseBackground"]
        or fraction_geometry["resultBackground"] != fraction_geometry["baseBackground"]
    ):
        report["ui_detail_failures"].append(f"Math calculator desktop contract failed: {state}")
    page.screenshot(path=str(QA_DIR / "plaintool-math-calculator-desktop-en.png"), full_page=False)


def run_math_calculator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/fraction-calculator/", wait_until="networkidle")
    fraction_state = page.evaluate("""() => {
      const groups = document.querySelectorAll('.fraction-input-group');
      const first = groups[0].getBoundingClientRect();
      const operation = document.querySelector('.fraction-operation select').getBoundingClientRect();
      const second = groups[1].getBoundingClientRect();
      return {
        centers: [first, operation, second].map((rect) => rect.left + rect.width / 2),
        heights: [...document.querySelectorAll('[data-math-calculator] input, [data-math-calculator] select, [data-math-calculator] button, [data-math-calculator] a')]
          .filter((element) => element.getClientRects().length)
          .map((element) => element.getBoundingClientRect().height),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    }""")
    page.goto(f"{BASE_URL}/ar/factor-calculator/", wait_until="networkidle")
    page.locator('[data-field="factor"]').fill("84")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({
      dir: document.documentElement.dir,
      width: document.documentElement.scrollWidth,
      factors: document.querySelector('[data-result="factors"]').textContent,
      inputDirection: getComputedStyle(document.querySelector('[data-field="factor"]')).direction,
      controls: [...document.querySelectorAll('[data-math-calculator] button, [data-math-calculator] a, [data-math-calculator] input')].filter(e => e.getClientRects().length).map(e => e.getBoundingClientRect().height),
    })""")
    state["fraction"] = fraction_state
    report["math_calculator_mobile_ar"] = state
    if (
        state["dir"] != "rtl"
        or state["width"] > 390
        or "84" not in state["factors"]
        or state["inputDirection"] != "ltr"
        or min(state["controls"]) < 44
        or fraction_state["overflow"] != 0
        or min(fraction_state["heights"]) < 44
        or not (
            fraction_state["centers"][0]
            > fraction_state["centers"][1]
            > fraction_state["centers"][2]
        )
    ):
        report["ui_detail_failures"].append(f"Math calculator Arabic mobile contract failed: {state}")


def run_percentage_calculator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/percentage-calculator/", wait_until="networkidle")
    page.locator('[data-field="percent"]').fill("15")
    page.locator('[data-field="base"]').fill("240")
    page.locator("[data-calculate]").click()
    page.locator('[data-mode-button="percentage-change"]').click()
    page.locator('[data-field="oldValue"]').fill("80")
    page.locator('[data-field="newValue"]').fill("100")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({
      value: document.querySelector('[data-result-value]').textContent,
      direction: document.querySelector('[data-direction]').textContent,
      visible: !document.querySelector('[data-results]').hidden,
      width: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    })""")
    report["percentage_calculator_desktop"] = state
    if "25" not in state["value"] or not state["direction"] or not state["visible"] or state["width"] != state["clientWidth"]:
        report["ui_detail_failures"].append(f"Percentage calculator desktop contract failed: {state}")


def run_percentage_calculator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/percentage-calculator/", wait_until="networkidle")
    page.locator('[data-field="percent"]').fill("25")
    page.locator('[data-field="base"]').fill("80")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, result: document.querySelector('[data-result-value]').textContent, inputs: [...document.querySelectorAll('[data-percentage-calculator] input')].map(e => getComputedStyle(e).direction) })""")
    if state["width"] > 390 or "20" not in state["result"] or any(direction != "ltr" for direction in state["inputs"]):
        report["ui_detail_failures"].append(f"Percentage calculator Arabic mobile contract failed: {state}")


def run_bmi_calculator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/bmi-calculator/", wait_until="networkidle")
    page.locator('[data-field="weightKilograms"]').fill("70")
    page.locator('[data-field="heightCentimeters"]').fill("175")
    page.locator("[data-calculate]").click()
    page.locator('[data-unit-button="us"]').click()
    page.locator('[data-field="weightPounds"]').fill("154.3")
    page.locator('[data-field="heightFeet"]').fill("5")
    page.locator('[data-field="heightInches"]').fill("9")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({ bmi: document.querySelector('[data-result="bmi"]').textContent, category: document.querySelector('[data-result="category"]').textContent, visible: !document.querySelector('[data-results]').hidden, width: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })""")
    report["bmi_calculator_desktop"] = state
    if "22" not in state["bmi"] or not state["category"] or not state["visible"] or state["width"] != state["clientWidth"]:
        report["ui_detail_failures"].append(f"BMI calculator desktop contract failed: {state}")


def run_bmi_calculator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/bmi-calculator/", wait_until="networkidle")
    page.locator("[data-calculate]").click()
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, bmi: document.querySelector('[data-result="bmi"]').textContent, inputDirection: getComputedStyle(document.querySelector('[data-field="weightKilograms"]')).direction, controls: [...document.querySelectorAll('[data-bmi-calculator] button, [data-bmi-calculator] input')].filter(e => e.getClientRects().length).map(e => e.getBoundingClientRect().height) })""")
    if state["width"] > 390 or not state["bmi"] or state["inputDirection"] != "ltr" or min(state["controls"]) < 44:
        report["ui_detail_failures"].append(f"BMI calculator Arabic mobile contract failed: {state}")
