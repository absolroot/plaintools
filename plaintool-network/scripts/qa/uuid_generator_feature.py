import re

from .config import BASE_URL


UUID_PATTERN = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$"
)


def _fail(report: dict, message: str) -> None:
    report["ui_detail_failures"].append(message)


def _values(root) -> list[str]:
    return root.locator("[data-result-list] code").all_text_contents()


def run_uuid_generator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/uuid-generator/", wait_until="networkidle")
    root = page.locator("[data-uuid-generator]")
    root.wait_for(state="visible")
    page.wait_for_function(
        "document.querySelectorAll('[data-result-list] code').length === 1"
    )

    initial = _values(root)
    initial_match = UUID_PATTERN.fullmatch(initial[0]) if initial else None
    if not initial_match or initial_match.group(1) != "4":
        _fail(report, f"Initial UUID is not RFC-shaped v4: {initial}")

    root.locator('[data-version-button="v7"]').click()
    root.locator('[data-quick-count="10"]').click()
    stale = root.evaluate(
        """element => ({
          stale: element.classList.contains('has-stale-result'),
          copyDisabled: element.querySelector('[data-copy-all]').disabled,
          downloadDisabled: element.querySelector('[data-download]').disabled,
        })"""
    )
    if not all(stale.values()):
        _fail(report, f"UUID input changes retained stale actions: {stale}")

    root.locator("[data-generate]").click()
    values = _values(root)
    if (
        len(values) != 10
        or len(set(values)) != 10
        or any(
            not (match := UUID_PATTERN.fullmatch(value))
            or match.group(1) != "7"
            for value in values
        )
    ):
        _fail(report, f"UUID v7 batch contract failed: {values}")

    root.locator('[data-version-button="v5"]').click()
    root.locator("[data-name]").fill("www.widgets.com")
    root.locator("[data-generate]").click()
    deterministic = _values(root)
    if deterministic != ["21f7f8de-8051-5b89-8680-0195ef798b6a"]:
        _fail(report, f"UUID RFC v5 DNS vector failed: {deterministic}")

    report["uuid_generator"] = {
        "initialVersion": "v4",
        "bulkV7Count": len(values),
        "rfcV5Vector": deterministic[0] if deterministic else None,
    }


def run_uuid_generator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/uuid-generator/", wait_until="networkidle")
    root = page.locator("[data-uuid-generator]")
    root.locator('[data-quick-count="10"]').click()
    root.locator("[data-generate]").click()
    page.wait_for_function(
        "document.querySelectorAll('[data-result-list] code').length === 10"
    )
    state = root.evaluate(
        """element => ({
          direction: document.documentElement.dir,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          resultDirections: [...element.querySelectorAll('[data-result-list] code')]
            .map((node) => node.dir),
          visibleControlHeights: [...element.querySelectorAll('button, input, select')]
            .filter((node) => !node.disabled && node.getClientRects().length)
            .map((node) => node.getBoundingClientRect().height),
        })"""
    )
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] != state["clientWidth"]
        or any(direction != "ltr" for direction in state["resultDirections"])
        or min(state["visibleControlHeights"]) < 44
    ):
        _fail(report, f"UUID Arabic mobile layout contract failed: {state}")
    report["uuid_generator_mobile"] = state
