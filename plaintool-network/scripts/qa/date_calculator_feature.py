from .config import BASE_URL, QA_DIR


def run_date_calculator_desktop(desktop, report: dict, _inventory) -> None:
    desktop.goto(f"{BASE_URL}/ko/dday-calculator/", wait_until="networkidle")

    desktop.locator('[data-field="start"]').fill("2026-08-01")
    desktop.locator('[data-field="end"]').fill("2026-08-31")
    desktop.locator("[data-calculate]").click()
    difference = {
        "total_days": desktop.locator('[data-result="totalDays"]').text_content(),
        "d_day": desktop.locator('[data-result="dDay"]').text_content(),
    }

    desktop.locator('[data-field="includeEnd"]').check()
    desktop.locator("[data-calculate]").click()
    difference["inclusive_days"] = desktop.locator(
        '[data-result="totalDays"]'
    ).text_content()

    desktop.locator('[data-mode-button="math"]').click()
    desktop.locator('[data-field="base"]').fill("2025-01-31")
    desktop.locator('[data-amount="months"]').fill("1")
    desktop.locator('[data-amount="days"]').fill("0")
    desktop.locator("[data-calculate]").click()
    month_end = desktop.locator('[data-result="resultingDate"]').text_content()

    desktop.locator('[data-mode-button="age"]').click()
    desktop.locator('[data-field="birth"]').fill("2000-02-29")
    desktop.locator('[data-field="reference"]').fill("2025-02-28")
    desktop.locator("[data-calculate]").click()
    age = {
        "full_age": desktop.locator('[data-result="fullAge"]').text_content(),
        "next_birthday": desktop.locator(
            '[data-result="nextBirthday"]'
        ).text_content(),
    }

    state = desktop.evaluate(
        """
        () => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          resultsVisible: !document.querySelector('[data-results]').hidden,
          activeMode: document.querySelector('[data-date-calculator]').dataset.mode,
          copyEnabled: !document.querySelector('[data-copy]').disabled,
        })
        """
    )
    report["date_calculator_desktop"] = {
        "difference": difference,
        "month_end": month_end,
        "age": age,
        "state": state,
    }
    if (
        difference["total_days"] != "30일"
        or difference["inclusive_days"] != "31일"
        or difference["d_day"] != "D−30"
        or "2025년 2월 28일" not in (month_end or "")
        or age["full_age"] != "만 25세"
        or "오늘" not in (age["next_birthday"] or "")
        or not state["resultsVisible"]
        or state["activeMode"] != "age"
        or not state["copyEnabled"]
        or state["scrollWidth"] != state["clientWidth"]
    ):
        report["ui_detail_failures"].append(
            "Date calculator desktop result contract failed: "
            f"{report['date_calculator_desktop']}"
        )

    desktop.screenshot(
        path=str(QA_DIR / "plaintool-date-calculator-desktop-ko.png"),
        full_page=False,
    )


def run_date_calculator_mobile(mobile, report: dict, _inventory) -> None:
    mobile.goto(f"{BASE_URL}/ar/age-calculator/", wait_until="networkidle")
    mobile.locator('[data-field="birth"]').fill("2000-02-29")
    mobile.locator('[data-field="reference"]').fill("2025-02-28")
    mobile.locator("[data-calculate]").click()

    state = mobile.evaluate(
        """
        () => ({
          direction: document.documentElement.dir,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          fullAge: document.querySelector('[data-result="fullAge"]').textContent,
          visibleControlHeights: [...document.querySelectorAll('[data-date-calculator] button:not([hidden]), [data-date-calculator] a[data-mode-button], [data-date-calculator] input:not([type="hidden"])')]
            .filter((element) => element.getClientRects().length)
            .map((element) => element.getBoundingClientRect().height),
        })
        """
    )
    report["date_calculator_mobile_ar"] = state
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] != state["clientWidth"]
        or "25" not in state["fullAge"]
        or min(state["visibleControlHeights"]) < 44
    ):
        report["ui_detail_failures"].append(
            f"Date calculator Arabic mobile layout failed: {state}"
        )

    mobile.screenshot(
        path=str(QA_DIR / "plaintool-date-calculator-mobile-ar.png"),
        full_page=False,
    )
