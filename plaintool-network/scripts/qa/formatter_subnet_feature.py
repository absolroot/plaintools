from .config import BASE_URL


def run_source_formatter_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ko/html-formatter/", wait_until="networkidle")
    source = '<main><h1>제목</h1><p data-x="1">내용</p></main>'
    page.locator("[data-html-formatter] [data-input]").fill(source)
    page.wait_for_function("document.querySelector('[data-html-formatter] [data-output]').value.includes('<h1>제목</h1>')")
    page.locator("[data-html-formatter] [data-input]").press("End")
    page.locator("[data-html-formatter] [data-input]").type(" ")
    stale = page.evaluate("""() => ({ stale: document.querySelector('[data-html-formatter]').classList.contains('has-stale-result'), copyDisabled: document.querySelector('[data-html-formatter] [data-copy]').disabled, outputTag: document.querySelector('[data-html-formatter] [data-output]').tagName })""")
    if not stale["stale"] or not stale["copyDisabled"] or stale["outputTag"] != "TEXTAREA":
        report["ui_detail_failures"].append(f"HTML formatter stale/source-only contract failed: {stale}")
    page.goto(f"{BASE_URL}/ko/javascript-formatter/", wait_until="networkidle")
    page.locator("[data-javascript-formatter] [data-input]").fill("const add = (a, b) => a + b;")
    page.locator("[data-mode-button='minify']").click()
    page.wait_for_function("document.querySelector('[data-javascript-formatter] [data-output]').value.includes('const add=')")


def run_source_formatter_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/css-formatter/", wait_until="networkidle")
    page.locator("[data-css-formatter] [data-input]").fill(".a{color:red}")
    page.wait_for_function("document.querySelector('[data-css-formatter] [data-output]').value.includes('color: red')")
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, inputDir: getComputedStyle(document.querySelector('[data-css-formatter] [data-input]')).direction, outputDir: getComputedStyle(document.querySelector('[data-css-formatter] [data-output]')).direction })""")
    if state["width"] > 390 or state["inputDir"] != "ltr" or state["outputDir"] != "ltr":
        report["ui_detail_failures"].append(f"Arabic CSS formatter layout/direction failed: {state}")


def run_ip_subnet_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ko/ip-subnet-calculator/", wait_until="networkidle")
    page.locator("[data-ip-subnet] [data-input]").fill("198.51.100.11/31")
    page.wait_for_function("document.querySelector('[data-ip-subnet] [data-result=\"cidr\"]')?.textContent === '198.51.100.10/31'")
    state = page.evaluate("""() => ({ first: document.querySelector('[data-result="firstUsableAddress"]').textContent, last: document.querySelector('[data-result="lastUsableAddress"]').textContent, usable: document.querySelector('[data-result="usableAddresses"]').textContent })""")
    if state != {"first": "198.51.100.10", "last": "198.51.100.11", "usable": "2"}:
        report["ui_detail_failures"].append(f"IPv4 /31 semantics failed: {state}")


def run_ip_subnet_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/ip-subnet-calculator/", wait_until="networkidle")
    page.locator("[data-ip-subnet] [data-input]").fill("192.168.1.10/24")
    page.wait_for_function("document.querySelector('[data-ip-subnet] [data-result=\"cidr\"]')?.textContent === '192.168.1.0/24'")
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, direction: getComputedStyle(document.querySelector('[data-ip-subnet] [data-input]')).direction })""")
    if state["width"] > 390 or state["direction"] != "ltr":
        report["ui_detail_failures"].append(f"Arabic subnet layout/direction failed: {state}")
