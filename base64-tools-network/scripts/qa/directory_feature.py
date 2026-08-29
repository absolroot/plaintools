from .config import BASE_URL, QA_DIR


def run_directory_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    report["tool_directory_cards"] = desktop.locator(".tool-directory-card").count()
    report["live_tool_links"] = desktop.locator("a.tool-directory-card").count()
    report["directory_desktop_columns"] = desktop.locator(".tool-directory-grid").evaluate_all(
        "elements => elements.map(element => ({ columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length, cards: element.querySelectorAll('.tool-directory-card').length, background: getComputedStyle(element).backgroundColor }))"
    )
    report["directory_eyebrow_count"] = desktop.locator(".directory-header .eyebrow").count()
    report["footer_note_ko"] = desktop.locator(".footer-inner > div > p").text_content()
    if report["tool_directory_cards"] != 7 or report["live_tool_links"] != 5:
        report["ui_detail_failures"].append(f"Directory card/link inventory changed unexpectedly: {report['tool_directory_cards']}/{report['live_tool_links']}")
    if any(item["columns"] != 4 for item in report["directory_desktop_columns"]):
        report["ui_detail_failures"].append(f"Desktop directory groups must keep four fixed columns: {report['directory_desktop_columns']}")
    if any(item["background"] != "rgba(0, 0, 0, 0)" for item in report["directory_desktop_columns"]):
        report["ui_detail_failures"].append(f"Empty directory tracks must remain transparent: {report['directory_desktop_columns']}")
    if report["directory_eyebrow_count"] != 0:
        report["ui_detail_failures"].append(f"Directory eyebrow should be absent: {report['directory_eyebrow_count']}")
    if report["footer_note_ko"] != "가입이나 서버 업로드 없이 브라우저에서 바로 사용할 수 있습니다.":
        report["ui_detail_failures"].append(f"Korean footer note is stale: {report['footer_note_ko']}")
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


def run_directory_mobile(mobile, report: dict) -> None:
    mobile.goto(f"{BASE_URL}/ko/", wait_until="networkidle")
    report["directory_mobile_columns"] = mobile.locator(".tool-directory-grid").evaluate_all(
        "elements => elements.map(element => getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length)"
    )
    report["directory_mobile_scroll_width"] = mobile.evaluate("document.documentElement.scrollWidth")
    if any(columns != 1 for columns in report["directory_mobile_columns"]) or report["directory_mobile_scroll_width"] > 390:
        report["ui_detail_failures"].append(
            f"Mobile directory layout failed: columns={report['directory_mobile_columns']}, scroll={report['directory_mobile_scroll_width']}"
        )
    mobile.screenshot(path=str(QA_DIR / "plaintool-directory-mobile-ko.png"), full_page=False)
