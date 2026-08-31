import json
import re

from playwright.sync_api import expect, sync_playwright

from qa.config import BASE_URL


def main() -> None:
    report: dict[str, object] = {}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        desktop = browser.new_page(viewport={"width": 1280, "height": 900})
        browser_errors: list[str] = []
        desktop.on("pageerror", lambda error: browser_errors.append(str(error)))
        desktop.on(
            "console",
            lambda message: browser_errors.append(message.text)
            if message.type == "error"
            else None,
        )
        desktop.on(
            "requestfailed",
            lambda request: browser_errors.append(
                f"request failed: {request.url} {request.failure}"
            ),
        )
        desktop.on(
            "response",
            lambda response: browser_errors.append(
                f"response {response.status}: {response.url}"
            )
            if response.status >= 400
            else None,
        )
        desktop.goto(
            f"{BASE_URL}/ko/json-formatter/",
            wait_until="domcontentloaded",
            timeout=30_000,
        )
        desktop.wait_for_selector('[data-json-tool][data-initialized="true"]')
        json_root = desktop.locator("[data-json-tool]")

        expect(json_root.locator("[data-sample]")).to_have_count(1)
        json_root.locator("[data-sample]").click()
        expect(json_root.locator("[data-input]")).to_have_value(
            re.compile(r'"name":"AbsolTools"')
        )
        desktop.wait_for_timeout(500)
        if not json_root.locator("[data-output]").input_value():
            raise AssertionError(
                "JSON sample did not produce output: "
                f"status={json_root.locator('[data-status]').text_content()!r}; "
                f"classes={json_root.get_attribute('class')!r}; "
                f"browserErrors={browser_errors!r}"
            )
        expect(json_root.locator("[data-output]")).to_have_value(
            re.compile(r'"name": "AbsolTools"')
        )
        format_action = json_root.locator('[data-action="format"]')
        expect(format_action).to_have_attribute("aria-pressed", "true")
        expect(format_action).to_have_class("mode-button is-active")

        expect(json_root.locator(".formatter-options")).to_have_count(1)
        json_root.locator(".formatter-options summary").click()
        expect(json_root.locator("[data-indent]")).to_be_visible()

        json_root.locator("[data-input]").press("End")
        json_root.locator("[data-input]").type(" ")
        stale_state = desktop.evaluate(
            """() => ({
              stale: document.querySelector('[data-json-tool]').classList.contains('has-stale-result'),
              notice: !document.querySelector('[data-json-tool] [data-stale-notice]').hidden,
              copyDisabled: document.querySelector('[data-json-tool] [data-copy]').disabled,
            })"""
        )
        expected_stale = {"stale": True, "notice": True, "copyDisabled": True}
        if stale_state != expected_stale:
            raise AssertionError(f"JSON stale-result presentation drifted: {stale_state}")
        report["json"] = {
            "defaultOperation": "format",
            "sampleLoaded": True,
            "staleState": stale_state,
        }

        source_statuses: dict[str, str] = {}
        for page in (
            "html-formatter",
            "css-formatter",
            "javascript-formatter",
            "sql-formatter",
        ):
            desktop.goto(
                f"{BASE_URL}/ko/{page}/",
                wait_until="domcontentloaded",
                timeout=30_000,
            )
            desktop.wait_for_selector(".formatter-workspace")
            root = desktop.locator(".converter")
            expect(root.locator("[data-sample]")).to_have_count(1)
            root.locator("[data-sample]").click()
            desktop.wait_for_function(
                "document.querySelector('.converter [data-output]').value.length > 0"
            )
            status = root.locator("[data-status]").text_content() or ""
            if "포맷" in status:
                raise AssertionError(f"Korean completion copy is ambiguous: {status}")
            source_statuses[page] = status
        report["sourceFormatters"] = source_statuses

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(
            f"{BASE_URL}/ko/json-formatter/",
            wait_until="domcontentloaded",
            timeout=30_000,
        )
        mobile.wait_for_selector('[data-json-tool][data-initialized="true"]')
        mobile_state = mobile.evaluate(
            """() => ({
              scrollWidth: document.documentElement.scrollWidth,
              actions: [...document.querySelectorAll('[data-json-tool] [data-action]')]
                .map((element) => ({
                  height: element.getBoundingClientRect().height,
                  pressed: element.getAttribute('aria-pressed'),
                })),
            })"""
        )
        if mobile_state["scrollWidth"] > 390:
            raise AssertionError(f"JSON mobile layout overflowed: {mobile_state}")
        if any(action["height"] < 44 for action in mobile_state["actions"]):
            raise AssertionError(f"JSON mobile action is under 44px: {mobile_state}")
        report["mobile"] = mobile_state
        browser.close()

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
