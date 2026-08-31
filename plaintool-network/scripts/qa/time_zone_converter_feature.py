from .config import BASE_URL, QA_DIR


def run_time_zone_converter_desktop(desktop, report: dict, _inventory) -> None:
    desktop.goto(f"{BASE_URL}/en/time-zone-converter/", wait_until="networkidle")
    desktop.wait_for_function(
        "document.querySelectorAll('[data-world-clock-list] [data-zone]').length === 6"
    )

    desktop.locator('[data-hour-format="24"]').click()
    desktop.locator("[data-source-zone]").select_option("UTC")
    desktop.locator("[data-target-zone]").select_option("Asia/Kathmandu")
    desktop.locator("[data-source-time]").fill("2026-08-31T00:00")
    desktop.locator("[data-convert]").click()
    desktop.wait_for_function(
        "document.querySelector('[data-conversion-zone]').textContent === 'Asia/Kathmandu'"
    )

    state = desktop.evaluate(
        """
        () => {
          const visibleControls = [...document.querySelectorAll('[data-time-zone-converter] button:not([hidden]), [data-time-zone-converter] input, [data-time-zone-converter] select')]
            .filter((element) => element.getClientRects().length);
          const worldRows = [...document.querySelectorAll('[data-world-clock-list] [data-zone]')];
          return {
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            sourceOptions: document.querySelector('[data-source-zone]').options.length,
            targetOptions: document.querySelector('[data-target-zone]').options.length,
            rowCount: worldRows.length,
            worldZones: worldRows.map((row) => row.dataset.zone),
            worldTimes: worldRows.map((row) => row.querySelector('[data-zone-time]')?.textContent),
            worldMode: document.querySelector('[data-live-indicator]')?.dataset.mode,
            localizedLabels: worldRows.map((row) => row.querySelector('[data-zone-label]')?.textContent),
            resultVisible: !document.querySelector('[data-conversion-result]').hidden,
            resultZone: document.querySelector('[data-conversion-zone]').textContent,
            resultTime: document.querySelector('[data-conversion-time]').textContent,
            resultOffset: document.querySelector('[data-conversion-offset]').textContent,
            filterPresent: Boolean(document.querySelector('[data-zone-filter]')),
            controlHeights: visibleControls.map((element) => element.getBoundingClientRect().height),
          };
        }
        """
    )

    desktop.screenshot(
        path=str(QA_DIR / "plaintool-time-zone-converter-desktop-en.png"),
        full_page=False,
    )

    desktop.locator("[data-swap-zones]").click()
    swapped = desktop.evaluate(
        """
        () => ({
          source: document.querySelector('[data-source-zone]').value,
          target: document.querySelector('[data-target-zone]').value,
          resultHidden: document.querySelector('[data-conversion-result]').hidden,
        })
        """
    )

    report["time_zone_converter_desktop"] = {**state, "swapped": swapped}
    if (
        state["scrollWidth"] != state["clientWidth"]
        or state["sourceOptions"] < 300
        or state["targetOptions"] < 300
        or state["rowCount"] != 6
        or state["worldZones"]
        != [
            "Asia/Seoul",
            "Asia/Tokyo",
            "Asia/Singapore",
            "Europe/London",
            "America/New_York",
            "Australia/Sydney",
        ]
        or not all(state["localizedLabels"])
        or state["worldMode"] != "converted"
        or not state["worldTimes"]
        or state["worldTimes"][0] != "09:00"
        or not state["resultVisible"]
        or state["resultZone"] != "Asia/Kathmandu"
        or "05:45" not in (state["resultTime"] or "")
        or state["resultOffset"] != "UTC+05:45"
        or state["filterPresent"]
        or swapped["source"] != "Asia/Kathmandu"
        or swapped["target"] != "UTC"
        or not swapped["resultHidden"]
    ):
        report["ui_detail_failures"].append(
            "Time zone converter desktop behavior failed: "
            f"{report['time_zone_converter_desktop']}"
        )


def run_time_zone_converter_mobile(mobile, report: dict, _inventory) -> None:
    mobile.goto(f"{BASE_URL}/ar/time-zone-converter/", wait_until="networkidle")
    mobile.wait_for_function(
        "document.querySelectorAll('[data-world-clock-list] [data-zone]').length === 6"
    )
    state = mobile.evaluate(
        """
        () => ({
          direction: document.documentElement.dir,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          rowCount: document.querySelectorAll('[data-world-clock-list] [data-zone]').length,
          sourceDirection: getComputedStyle(document.querySelector('[data-source-zone]')).direction,
          targetDirection: getComputedStyle(document.querySelector('[data-target-zone]')).direction,
          labels: [...document.querySelectorAll('[data-world-clock-list] [data-zone-label]')].map((element) => element.textContent),
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
        or state["targetDirection"] != "ltr"
        or state["scrollWidth"] != state["clientWidth"]
        or state["rowCount"] != 6
        or not all(state["labels"])
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
