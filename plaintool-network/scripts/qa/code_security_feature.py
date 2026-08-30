from .config import BASE_URL


def run_hash_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/hash-generator/", wait_until="networkidle")
    page.locator("[data-hash-generator] [data-input]").fill("abc")
    expected = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    page.wait_for_function(
        "expected => document.querySelector('[data-hash-output=\"SHA-256\"]').value === expected",
        arg=expected,
    )
    report["hash_generator"] = {"sha256": expected}


def run_hash_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/hash-generator/", wait_until="networkidle")
    page.locator("[data-hash-generator] [data-input]").fill("مرحبا")
    page.wait_for_function(
        "document.querySelector('[data-hash-output=\"SHA-256\"]').value.length === 64"
    )
    if page.evaluate("document.documentElement.scrollWidth") > 390:
        report["ui_detail_failures"].append("Arabic hash generator overflows mobile width.")


def run_jwt_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/jwt-decoder/", wait_until="networkidle")
    warning = page.locator("[data-jwt-decoder] .jwt-verification-warning")
    token = (
        "eyJhbGciOiJub25lIn0."
        "eyJzdWIiOiIxMjMiLCJleHAiOjE4OTM0NTYwMDB9."
        "c2ln"
    )
    before = warning.inner_text().strip()
    page.locator("[data-jwt-decoder] [data-input]").fill(token)
    page.wait_for_function(
        "document.querySelector('[data-jwt-decoder] [data-output=\"payload\"]').value.includes('\"sub\": \"123\"')"
    )
    after = warning.inner_text().strip()
    result_warning = page.locator("[data-result-verification]")
    if not before or before != after or not warning.is_visible():
        report["ui_detail_failures"].append(
            f"JWT no-verification warning disappeared or changed: {before!r} -> {after!r}"
        )
    if not result_warning.is_visible() or before.splitlines()[0] not in result_warning.inner_text():
        report["ui_detail_failures"].append(
            "JWT decoded results do not retain their no-verification context."
        )
    if token in page.url:
        report["ui_detail_failures"].append("JWT token leaked into the route URL.")
    report["jwt_decoder"] = {
        "warning": after,
        "result_warning": result_warning.inner_text().strip(),
    }


def run_jwt_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/jwt-decoder/", wait_until="networkidle")
    state = page.evaluate(
        """
        () => ({
          html_dir: document.documentElement.dir,
          input_dir: getComputedStyle(document.querySelector('[data-jwt-decoder] [data-input]')).direction,
          warning_visible: !!document.querySelector('.jwt-verification-warning')?.getClientRects().length
        })
        """
    )
    if state != {"html_dir": "rtl", "input_dir": "ltr", "warning_visible": True}:
        report["ui_detail_failures"].append(
            f"Arabic JWT direction or warning is wrong: {state}"
        )
