from .config import BASE_URL


def run_hash_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/hash-generator/", wait_until="networkidle")
    layout = page.evaluate("""
      () => {
        const input = document.querySelector('.hash-input-pane').getBoundingClientRect();
        const output = document.querySelector('.hash-output-pane').getBoundingClientRect();
        return {
          gap: Math.round((output.top - input.bottom) * 100) / 100,
          input_left: Math.round(input.left * 100) / 100,
          input_right: Math.round(input.right * 100) / 100,
          output_left: Math.round(output.left * 100) / 100,
          output_right: Math.round(output.right * 100) / 100,
        };
      }
    """)
    report["hash_generator_layout"] = layout
    if (
        abs(layout["gap"] - 12) > 1
        or abs(layout["input_left"] - layout["output_left"]) > 1
        or abs(layout["input_right"] - layout["output_right"]) > 1
    ):
        report["ui_detail_failures"].append(
            f"Hash input and output panes are not separated on one desktop axis: {layout}"
        )
    page.locator("[data-hash-generator] [data-input]").fill("abc")
    expected = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    page.wait_for_function(
        "expected => document.querySelector('[data-hash-output=\"SHA-256\"]').value === expected",
        arg=expected,
    )
    comparison = page.locator("[data-expected-checksum]")
    comparison.fill(expected)
    page.wait_for_function(
        "document.querySelector('[data-checksum-status]').classList.contains('is-match')"
    )
    comparison.fill("0" + expected[1:])
    page.wait_for_function(
        "document.querySelector('[data-checksum-status]').classList.contains('is-mismatch')"
    )
    report["hash_generator"] = {
        "sha256": expected,
        "comparison": "match-and-mismatch-confirmed",
    }


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
    page.locator("[data-jwt-decoder] [data-sample]").click()
    page.wait_for_function(
        "document.querySelector('[data-jwt-decoder] [data-output=\"payload\"]')"
        ".textContent.includes('PlainTool Example')"
    )
    page.locator("[data-jwt-decoder] [data-clear]").click()
    token = (
        "eyJhbGciOiJub25lIn0."
        "eyJzdWIiOiIxMjMiLCJleHAiOjE4OTM0NTYwMDB9."
        "c2ln"
    )
    before = warning.inner_text().strip()
    page.locator("[data-jwt-decoder] [data-input]").fill(token)
    page.wait_for_function(
        "document.querySelector('[data-jwt-decoder] [data-output=\"payload\"]').textContent.includes('\"sub\": \"123\"')"
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
    surfaces = page.evaluate(
        """
        () => ({
          input: getComputedStyle(document.querySelector('.jwt-input-pane')).backgroundColor,
          output: getComputedStyle(document.querySelector('.jwt-result-pane')).backgroundColor,
          expected_output: getComputedStyle(document.querySelector('.jwt-decoder')).backgroundColor,
          output_tags: [...document.querySelectorAll('.jwt-result-pane [data-output]')]
            .map((element) => element.tagName),
          output_pointer_events: [...document.querySelectorAll('[data-jwt-decoder] [data-output]')]
            .map((element) => getComputedStyle(element).pointerEvents)
        })
        """
    )
    if (
        surfaces["input"] == surfaces["output"]
        or surfaces["output"] != surfaces["expected_output"]
        or surfaces["output_tags"] != ["OUTPUT", "OUTPUT"]
        or any(value != "none" for value in surfaces["output_pointer_events"])
    ):
        report["ui_detail_failures"].append(
            f"JWT input/output emphasis is reversed or inconsistent: {surfaces}"
        )
    report["jwt_decoder"] = {
        "warning": after,
        "result_warning": result_warning.inner_text().strip(),
        "surfaces": surfaces,
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
