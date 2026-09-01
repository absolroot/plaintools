from .config import BASE_URL, QA_DIR
from .registry import RouteInventory


def _search_state(page) -> dict:
    return page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-directory-search]');
          const input = root.querySelector('[data-directory-search-input]');
          const clear = root.querySelector('[data-directory-search-clear]');
          const empty = root.querySelector('[data-directory-search-empty]');
          const status = root.querySelector('[data-directory-search-status]');
          const cards = [...document.querySelectorAll('[data-directory-search-card]')];
          const categories = [...document.querySelectorAll('[data-directory-search-category]')];
          return {
            query: input.value,
            inputFocused: document.activeElement === input,
            clearHidden: clear.hidden,
            emptyHidden: empty.hidden,
            status: status.textContent.trim(),
            visibleCards: cards.filter((card) => !card.hidden).map((card) => ({
              href: card.getAttribute('href'),
              title: card.querySelector('h3').textContent.trim()
            })),
            visibleCategories: categories.filter((category) => !category.hidden).length,
            categoryCounts: categories.map((category) =>
              category.querySelector('[data-directory-search-category-count]').textContent.trim()
            )
          };
        }
        """
    )


def _search_geometry(page) -> dict:
    return page.evaluate(
        """
        () => {
          const box = (selector) => {
            const bounds = document.querySelector(selector).getBoundingClientRect();
            return {
              left: bounds.left,
              right: bounds.right,
              top: bounds.top,
              bottom: bounds.bottom,
              width: bounds.width,
              height: bounds.height
            };
          };
          const control = document.querySelector('.directory-search-control');
          const categoryGaps = [...document.querySelectorAll('.directory-category-heading')].map((heading) => {
            const label = heading.querySelector('h2').getBoundingClientRect();
            const count = heading.querySelector('[data-directory-search-category-count]').getBoundingClientRect();
            return count.left - label.right;
          });
          return {
            header: box('.directory-header'),
            search: box('.directory-search'),
            control: box('.directory-search-control'),
            categories: box('.directory-categories'),
            categoryGaps,
            radius: getComputedStyle(control).borderRadius,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth
          };
        }
        """
    )


def run_directory_desktop(
    desktop, report: dict, inventory: RouteInventory
) -> None:
    desktop.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    report["tool_directory_cards"] = desktop.locator(".tool-directory-card").count()
    report["live_tool_links"] = desktop.locator("a.tool-directory-card").count()
    report["directory_desktop_columns"] = desktop.locator(".tool-directory-grid").evaluate_all(
        "elements => elements.map(element => ({ columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length, cards: element.querySelectorAll('.tool-directory-card').length, background: getComputedStyle(element).backgroundColor }))"
    )
    report["directory_eyebrow_count"] = desktop.locator(".directory-header .eyebrow").count()
    report["footer_note_ko"] = desktop.locator(".footer-inner > div > p").text_content()
    expected_tool_count = len(inventory.tools)
    if (
        report["tool_directory_cards"] != expected_tool_count + 1
        or report["live_tool_links"] != expected_tool_count + 1
    ):
        report["ui_detail_failures"].append(f"Directory card/link inventory changed unexpectedly: {report['tool_directory_cards']}/{report['live_tool_links']}")
    if any(item["columns"] != 4 for item in report["directory_desktop_columns"]):
        report["ui_detail_failures"].append(f"Desktop directory groups must keep four fixed columns: {report['directory_desktop_columns']}")
    if any(item["background"] != "rgba(0, 0, 0, 0)" for item in report["directory_desktop_columns"]):
        report["ui_detail_failures"].append(f"Empty directory tracks must remain transparent: {report['directory_desktop_columns']}")
    if report["directory_eyebrow_count"] != 0:
        report["ui_detail_failures"].append(f"Directory eyebrow should be absent: {report['directory_eyebrow_count']}")
    if not report["footer_note_ko"]:
        report["ui_detail_failures"].append(f"Korean footer note is stale: {report['footer_note_ko']}")

    report["directory_search_desktop_geometry"] = _search_geometry(desktop)
    geometry = report["directory_search_desktop_geometry"]
    if (
        abs(geometry["header"]["left"] - geometry["search"]["left"]) > 1
        or abs(geometry["header"]["right"] - geometry["search"]["right"]) > 1
        or abs(geometry["categories"]["left"] - geometry["search"]["left"]) > 1
        or abs(geometry["categories"]["right"] - geometry["search"]["right"]) > 1
        or geometry["header"]["bottom"] > geometry["search"]["top"]
        or geometry["search"]["bottom"] > geometry["categories"]["top"]
        or abs(geometry["control"]["height"] - 36) > 0.5
        or any(abs(gap - 8) > 0.5 for gap in geometry["categoryGaps"])
        or geometry["radius"] != "0px"
        or geometry["scrollWidth"] != geometry["clientWidth"]
    ):
        report["ui_detail_failures"].append(
            f"Desktop directory search axis, order, or control geometry failed: {geometry}"
        )

    search_input = desktop.locator("[data-directory-search-input]")
    search_clear = desktop.locator("[data-directory-search-clear]")
    report["directory_category_order"] = desktop.locator(
        "[data-directory-search-category]"
    ).evaluate_all(
        "elements => elements.map(element => element.dataset.directoryCategory)"
    )
    expected_category_order = [
        "image",
        "pdf",
        "text",
        "generator",
        "calculator",
        "time",
        "converter",
        "encoding",
        "data",
    ]
    if report["directory_category_order"] != expected_category_order:
        report["ui_detail_failures"].append(
            f"Directory category order is wrong: {report['directory_category_order']}"
        )
    image_section = desktop.locator('[data-directory-category="image"]')
    image_hrefs = image_section.locator("a.tool-directory-card").evaluate_all(
        "elements => elements.map(element => element.getAttribute('href'))"
    )
    image_primary_cards = image_section.locator(
        ":scope > .tool-directory-grid > .tool-directory-card"
    )
    calculator_hrefs = desktop.locator(
        '[data-directory-category="calculator"] a.tool-directory-card'
    ).evaluate_all(
        "elements => elements.map(element => element.getAttribute('href'))"
    )
    report["home_directory_card_order"] = {
        "imageCount": len(image_hrefs),
        "uniqueImageRoutes": len(set(image_hrefs)),
        "imageFirst": image_hrefs[:8],
        "representativeTitle": image_primary_cards.nth(7).locator(
            "h3 > span"
        ).first.text_content().strip(),
        "calculatorFirst": calculator_hrefs[:4],
        "separateImageConverterCategory": desktop.locator(
            '[data-directory-category="image-converter"]'
        ).count(),
    }
    if report["home_directory_card_order"] != {
        "imageCount": 54,
        "uniqueImageRoutes": 53,
        "imageFirst": [
            "/ko/background-remover/",
            "/ko/image-resizer/",
            "/ko/image-upscaler/",
            "/ko/image-crop/",
            "/ko/png-to-jpg/",
            "/ko/jpg-to-png/",
            "/ko/webp-to-png/",
            "/ko/png-to-webp/",
        ],
        "representativeTitle": "이미지 포맷 변환",
        "calculatorFirst": [
            "/ko/date-calculator/",
            "/ko/dday-calculator/",
            "/ko/percentage-calculator/",
            "/ko/bmi-calculator/",
        ],
        "separateImageConverterCategory": 0,
    }:
        report["ui_detail_failures"].append(
            f"Home directory card order failed: {report['home_directory_card_order']}"
        )

    image_more = image_section.locator("[data-directory-search-more]")
    image_more_summary = image_more.locator("summary")
    report["image_converter_progressive_directory"] = {
        "groupCount": image_more.count(),
        "remainingCards": image_more.locator(
            "[data-directory-search-card]"
        ).count(),
        "initiallyOpen": image_more.get_attribute("open") is not None,
        "summaryHeight": image_more_summary.bounding_box()["height"],
        "summaryCount": image_more_summary.locator(
            ".image-converter-more-count"
        ).text_content().strip(),
    }
    image_more_summary.click()
    report["image_converter_progressive_directory"]["opensOnClick"] = (
        image_more.get_attribute("open") is not None
    )
    image_more_summary.click()
    if report["image_converter_progressive_directory"] != {
        "groupCount": 1,
        "remainingCards": 46,
        "initiallyOpen": False,
        "summaryHeight": 48,
        "summaryCount": "46",
        "opensOnClick": True,
    }:
        report["ui_detail_failures"].append(
            "Image converter progressive directory failed: "
            f"{report['image_converter_progressive_directory']}"
        )

    search_input.fill("HEIC에서 AVIF")
    image_search_state = _search_state(desktop)
    report["image_converter_directory_search"] = {
        "state": image_search_state,
        "moreOpen": image_more.get_attribute("open") is not None,
    }
    if (
        len(image_search_state["visibleCards"]) != 1
        or image_search_state["visibleCards"][0]["href"]
        != "/ko/heic-to-avif/"
        or not report["image_converter_directory_search"]["moreOpen"]
    ):
        report["ui_detail_failures"].append(
            f"Image converter directory search failed: {report['image_converter_directory_search']}"
        )
    search_clear.click()
    if image_more.get_attribute("open") is not None:
        report["ui_detail_failures"].append(
            "Image converter directory did not restore its collapsed state after search."
        )

    search_cases = {
        "name": ("JSON 정리", 1, "/ko/json-formatter/"),
        "summary": ("문단", 1, "/ko/word-counter/"),
        "keyword": ("diff", 1, None),
        "multi_token": ("Base64 파일", 2, None),
    }
    report["directory_search_cases"] = {}
    for name, (query, expected_count, expected_href) in search_cases.items():
        search_input.fill(query)
        state = _search_state(desktop)
        report["directory_search_cases"][name] = state
        actual_hrefs = [card["href"] for card in state["visibleCards"]]
        if len(state["visibleCards"]) != expected_count or (
            expected_href is not None and actual_hrefs != [expected_href]
        ):
            report["ui_detail_failures"].append(
                f"Directory {name} search failed for {query!r}: {state}"
            )
    keyword_titles = [
        card["title"]
        for card in report["directory_search_cases"]["keyword"]["visibleCards"]
    ]
    if keyword_titles != ["텍스트 비교"]:
        report["ui_detail_failures"].append(
            f"Directory keyword-only result was incorrect: {keyword_titles}"
        )

    search_input.fill("일치하지않는검색어")
    report["directory_search_no_results"] = _search_state(desktop)
    no_results = report["directory_search_no_results"]
    if (
        no_results["visibleCards"]
        or no_results["visibleCategories"] != 0
        or no_results["emptyHidden"]
        or no_results["clearHidden"]
        or any(count != "00" for count in no_results["categoryCounts"])
        or "0" not in no_results["status"]
    ):
        report["ui_detail_failures"].append(
            f"Directory zero-results state failed: {no_results}"
        )

    baseline_category_counts = [
        f"{category.locator('[data-directory-search-card]').count():02d}"
        for category in desktop.locator(
            "[data-directory-search-category]"
        ).all()
    ]
    expected_category_count = len(baseline_category_counts)

    search_clear.click()
    report["directory_search_clear"] = _search_state(desktop)
    cleared = report["directory_search_clear"]
    if (
        cleared["query"] != ""
        or len(cleared["visibleCards"]) != expected_tool_count
        or cleared["visibleCategories"] != expected_category_count
        or cleared["categoryCounts"] != baseline_category_counts
        or not cleared["inputFocused"]
        or not cleared["clearHidden"]
    ):
        report["ui_detail_failures"].append(
            f"Directory Clear did not restore the catalog and focus: {cleared}"
        )

    search_input.fill("JSON")
    search_input.press("Tab")
    clear_focused = desktop.evaluate(
        "document.activeElement === document.querySelector('[data-directory-search-clear]')"
    )
    search_clear.press("Enter")
    report["directory_search_keyboard_clear"] = {
        "clearFocused": clear_focused,
        "state": _search_state(desktop),
    }
    keyboard_cleared = report["directory_search_keyboard_clear"]["state"]
    if (
        not clear_focused
        or keyboard_cleared["query"] != ""
        or len(keyboard_cleared["visibleCards"]) != expected_tool_count
        or not keyboard_cleared["inputFocused"]
    ):
        report["ui_detail_failures"].append(
            f"Directory keyboard Clear did not restore the catalog and focus: {report['directory_search_keyboard_clear']}"
        )

    search_input.fill("JSON")
    search_input.press("Escape")
    report["directory_search_escape"] = _search_state(desktop)
    escaped = report["directory_search_escape"]
    if (
        escaped["query"] != ""
        or len(escaped["visibleCards"]) != expected_tool_count
        or not escaped["inputFocused"]
    ):
        report["ui_detail_failures"].append(
            f"Directory Escape did not restore the catalog and focus: {escaped}"
        )

    desktop.goto(f"{BASE_URL}/es/", wait_until="networkidle")
    spanish_search = desktop.locator("[data-directory-search-input]")
    spanish_search.fill("parrafos")
    report["directory_search_accentless"] = _search_state(desktop)
    accentless = report["directory_search_accentless"]
    if (
        len(accentless["visibleCards"]) != 1
        or accentless["visibleCards"][0]["href"] != "/es/word-counter/"
    ):
        report["ui_detail_failures"].append(
            f"Directory accent-insensitive search failed: {accentless}"
        )

    desktop.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    theme_toggle = desktop.locator("[data-theme-toggle]")
    before_theme = theme_toggle.get_attribute("data-current-theme")
    theme_toggle.click()
    after_theme = theme_toggle.get_attribute("data-current-theme")
    report["theme_toggle"] = {"before": before_theme, "after": after_theme, "stored": desktop.evaluate("localStorage.getItem('plaintool.theme')")}
    if before_theme == after_theme or report["theme_toggle"]["stored"] != after_theme:
        report["ui_detail_failures"].append(f"Theme toggle did not switch and persist: {report['theme_toggle']}")
    desktop.screenshot(path=str(QA_DIR / "plaintool-directory-desktop-ko.png"), full_page=False)
    desktop.locator('a.tool-directory-card[href="/ko/base64-decode/"]').click()
    desktop.wait_for_url(f"{BASE_URL}/ko/base64-decode/")
    report["directory_card_click_url"] = desktop.url


def run_directory_mobile(
    mobile, report: dict, inventory: RouteInventory
) -> None:
    mobile.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    report["directory_mobile_columns"] = mobile.locator(".tool-directory-grid").evaluate_all(
        "elements => elements.map(element => getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length)"
    )
    report["directory_mobile_scroll_width"] = mobile.evaluate("document.documentElement.scrollWidth")
    if any(columns != 1 for columns in report["directory_mobile_columns"]) or report["directory_mobile_scroll_width"] > 390:
        report["ui_detail_failures"].append(
            f"Mobile directory layout failed: columns={report['directory_mobile_columns']}, scroll={report['directory_mobile_scroll_width']}"
        )
    report["directory_search_mobile_geometry"] = _search_geometry(mobile)
    geometry = report["directory_search_mobile_geometry"]
    mobile.locator("[data-directory-search-input]").fill("JSON")
    clear_height = mobile.locator(
        "[data-directory-search-clear]"
    ).bounding_box()["height"]
    report["directory_search_mobile_clear_height"] = clear_height
    if (
        abs(geometry["header"]["left"] - geometry["search"]["left"]) > 1
        or abs(geometry["header"]["right"] - geometry["search"]["right"]) > 1
        or abs(geometry["categories"]["left"] - geometry["search"]["left"]) > 1
        or abs(geometry["categories"]["right"] - geometry["search"]["right"]) > 1
        or geometry["header"]["bottom"] > geometry["search"]["top"]
        or geometry["search"]["bottom"] > geometry["categories"]["top"]
        or abs(geometry["control"]["height"] - 44) > 0.5
        or abs(clear_height - 44) > 0.5
        or any(abs(gap - 8) > 0.5 for gap in geometry["categoryGaps"])
        or geometry["radius"] != "0px"
        or geometry["scrollWidth"] != geometry["clientWidth"]
    ):
        report["ui_detail_failures"].append(
            f"Mobile directory search axis, order, or control geometry failed: {geometry}, clear={clear_height}"
        )
    mobile.locator("[data-directory-search-input]").press("Escape")
    mobile_restored = _search_state(mobile)
    if (
        len(mobile_restored["visibleCards"]) != len(inventory.tools)
        or mobile_restored["query"] != ""
    ):
        report["ui_detail_failures"].append(
            f"Mobile directory search did not restore after Escape: {mobile_restored}"
        )
    mobile.screenshot(path=str(QA_DIR / "plaintool-directory-mobile-ko.png"), full_page=False)
