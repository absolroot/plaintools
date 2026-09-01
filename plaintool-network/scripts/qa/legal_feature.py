from .config import BASE_URL, QA_DIR


def run_legal_desktop(desktop, report: dict) -> None:
    desktop.goto(f"{BASE_URL}/ko/about/", wait_until="networkidle")
    report["about_ko"] = {
        "sections": desktop.locator(".legal-section h2").all_text_contents(),
        "text": desktop.locator(".legal-page").inner_text()
    }
    if report["about_ko"]["sections"] != ["제공 기능", "문의"]:
        report["ui_detail_failures"].append(f"Korean About sections are stale: {report['about_ko']['sections']}")
    if "admin@absoltools.com" not in report["about_ko"]["text"] or "운영 원칙" in report["about_ko"]["text"] or "운영자" in report["about_ko"]["text"]:
        report["ui_detail_failures"].append(f"Korean About contact/operator copy is incorrect: {report['about_ko']['text']}")
    desktop.screenshot(path=str(QA_DIR / "plaintool-about-desktop-ko.png"), full_page=False)
