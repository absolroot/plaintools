from .config import BASE_URL, QA_DIR


def run_time_zone_converter_desktop(desktop, report: dict, _inventory) -> None:
    desktop.goto(f"{BASE_URL}/en/time-zone-converter/", wait_until="networkidle")
    desktop.wait_for_function(
        "document.querySelectorAll('[data-world-clock-list] [data-zone]').length > 300"
    )

    desktop.locator('[data-hour-format="24"]').click()
    desktop.locator("[data-source-zone]").select_option("Asia/Seoul")
    desktop.locator("[data-source-time]").fill("2026-08-31T09:00")
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function(
        "document.querySelector('[data-zone=\"Asia/Kathmandu\"]')"
    )

    state = desktop.evaluate(
        """
        () => {
          const row = (zone) => document.querySelector(`[data-world-clock-list] [data-zone="${zone}"]`);
          const visibleControls = [...document.querySelectorAll('[data-time-zone-converter] button:not([hidden]), [data-time-zone-converter] input, [data-time-zone-converter] select')]
            .filter((element) => element.getClientRects().length);
          return {
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            rowCount: document.querySelectorAll('[data-world-clock-list] [data-zone]').length,
            seoulTime: row('Asia/Seoul')?.querySelector('[data-zone-time]')?.textContent,
            newYorkTime: row('America/New_York')?.querySelector('[data-zone-time]')?.textContent,
            newYorkDifference: row('America/New_York')?.querySelector('[data-zone-difference]')?.textContent,
            kathmanduOffset: row('Asia/Kathmandu')?.querySelector('[data-zone-offset]')?.textContent,
            sourceBadge: row('Asia/Seoul')?.querySelector('[data-source-badge]')?.hidden,
            liveHidden: document.querySelector('[data-live-indicator]')?.hidden,
            controlHeights: visibleControls.map((element) => element.getBoundingClientRect().height),
          };
        }
        """
    )

    desktop.locator("[data-zone-filter]").fill("Kathmandu")
    visible_filtered_rows = desktop.locator(
        "[data-world-clock-list] [data-zone]:visible"
    ).count()

    report["time_zone_converter_desktop"] = {
        **state,
        "visibleFilteredRows": visible_filtered_rows,
    }
    if (
        state["scrollWidth"] != state["clientWidth"]
        or state["rowCount"] < 300
        or "09:00" not in (state["seoulTime"] or "")
        or "20:00" not in (state["newYorkTime"] or "")
        or "yesterday" not in (state["newYorkDifference"] or "").lower()
        or state["kathmanduOffset"] != "UTC+05:45"
        or state["sourceBadge"] is not False
        or state["liveHidden"] is not True
        or visible_filtered_rows < 1
    ):
        report["ui_detail_failures"].append(
            "Time zone converter desktop behavior failed: "
            f"{report['time_zone_converter_desktop']}"
        )

    desktop.screenshot(
        path=str(QA_DIR / "plaintool-time-zone-converter-desktop-en.png"),
        full_page=False,
    )


def run_time_zone_converter_mobile(mobile, report: dict, _inventory) -> None:
    mobile.goto(f"{BASE_URL}/ar/time-zone-converter/", wait_until="networkidle")
    mobile.wait_for_function(
        "document.querySelectorAll('[data-world-clock-list] [data-zone]').length > 300"
    )
    state = mobile.evaluate(
        """
        () => ({
          direction: document.documentElement.dir,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          rowCount: document.querySelectorAll('[data-world-clock-list] [data-zone]').length,
          sourceDirection: getComputedStyle(document.querySelector('[data-source-zone]')).direction,
          controlHeights: [...document.querySelectorAll('[data-time-zone-converter] button:not([hidden]), [data-time-zone-converter] input, [data-time-zone-converter] select')]
            .filter((element) => element.getClientRects().length)
            .map((element) => element.getBoundingClientRect().height),
          rowsWithinViewport: [...document.querySelectorAll('[data-world-clock-list] [data-zone]')]
            .every((element) => {
              const rect = element.getBoundingClientRect();
              return rect.left >= -0.5 && rect.right <= document.documentElement.clientWidth + 0.5;
            }),
        })
        """
    )
    report["time_zone_converter_mobile_ar"] = state
    if (
        state["direction"] != "rtl"
        or state["sourceDirection"] != "ltr"
        or state["scrollWidth"] != state["clientWidth"]
        or state["rowCount"] < 300
        or not state["rowsWithinViewport"]
        or min(state["controlHeights"]) < 44
    ):
        report["ui_detail_failures"].append(
            f"Time zone converter Arabic mobile layout failed: {state}"
        )

    mobile.screenshot(
        path=str(QA_DIR / "plaintool-time-zone-converter-mobile-ar.png"),
        full_page=False,
    )
