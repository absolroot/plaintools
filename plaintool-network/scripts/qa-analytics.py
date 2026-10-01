"""Check a local production build without sending requests to Google services."""
import base64
import json
import os
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright, expect
from qa.config import BASE_URL, QA_DIR
from qa.registry import load_route_inventory


MOCK = """({consent, applicable}) => {
  window.__qaEvents = [];
  window.__qaConsent = consent;
  window.__qaRevocations = 0;
  window.gtag = (...args) => {
    if (args[0] === 'event') window.__qaEvents.push(args);
  };
  window.googlefc = {
    ConsentModePurposeStatusEnum: {
      CONSENT_MODE_PURPOSE_STATUS_GRANTED: 1,
      CONSENT_MODE_PURPOSE_STATUS_NOT_APPLICABLE: 3
    },
    getGoogleConsentModeValues: () => ({analyticsStoragePurposeConsentStatus: window.__qaConsent}),
    showRevocationMessage: () => { window.__qaRevocations++; window.__qaConsent = 2; },
    callbackQueue: {push: (...entries) => entries.forEach(entry => Object.values(entry).forEach(fn => fn()))}
  };
  window.__tcfapi = (command, version, callback) => callback({gdprApplies: applicable}, true);
}"""


def main():
    assert urlsplit(BASE_URL).hostname in {"localhost", "127.0.0.1"}, "Use a local production build"
    inventory = load_route_inventory()
    QA_DIR.mkdir(parents=True, exist_ok=True)
    report = {"external_requests_blocked": 0, "page_errors": [], "surfaces": [], "localized_policy_visits": 0}
    launch = {"headless": True}
    if os.environ.get("PLAINTOOL_QA_BROWSER_PATH"):
        launch["executable_path"] = os.environ["PLAINTOOL_QA_BROWSER_PATH"]
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(**launch)

        def context_for(width, consent=1, applicable=True):
            context = browser.new_context(viewport={"width": width, "height": 1000 if width > 500 else 844}, permissions=["clipboard-read", "clipboard-write"], has_touch=width < 500)
            context.add_init_script(f"({MOCK})({json.dumps({'consent': consent, 'applicable': applicable})})")
            def intercept(route):
                url = route.request.url
                if url.startswith((BASE_URL + "/", "blob:", "data:")):
                    route.continue_()
                else:
                    report["external_requests_blocked"] += 1
                    route.abort()
            context.route("**/*", intercept)
            context.on("page", lambda page: page.on("pageerror", lambda error: report["page_errors"].append(str(error))))
            return context

        def events(page):
            return page.evaluate("window.__qaEvents")

        def names(page):
            return [entry[1] for entry in events(page)]

        for width in (1440, 390):
            context = context_for(width)
            page = context.new_page()
            page.goto(f"{BASE_URL}/en/base64-decode/?secret=private-canary#private-result", wait_until="networkidle")
            assert page.locator('script[src="/google-consent-init.js"]').count() == 1, "Production integration is required"
            assert page.locator("[data-ad-slot]").count() == 0
            assert not events(page)
            secret = "private-canary"
            page.locator("#codec-input").fill(base64.b64encode(secret.encode()).decode())
            expect(page.locator("#codec-output")).to_have_value(secret)
            page.locator("[data-copy]").click()
            page.wait_for_function("window.__qaEvents.some(x => x[1] === 'tool_copy')")
            with page.expect_download():
                page.locator("[data-download]").click()
            page.locator("#codec-input").fill("%")
            page.wait_for_function("window.__qaEvents.some(x => x[1] === 'tool_error')")
            assert sorted(names(page)) == sorted(["tool_complete", "tool_copy", "tool_download", "tool_error"])
            assert "private" not in json.dumps(events(page))
            for entry in events(page):
                assert set(entry[2]) == {"tool_id", "tool_locale", "page_location", "page_title", "page_referrer"}
            page.screenshot(path=str(QA_DIR / f"analytics-base64-{width}.png"), full_page=True)

            # Initial timestamp examples must not be counted as a completed task.
            page.goto(f"{BASE_URL}/en/unix-timestamp-converter/", wait_until="networkidle")
            assert not events(page)
            page.locator("[data-convert]").click()
            page.wait_for_function("window.__qaEvents.some(x => x[1] === 'tool_complete')")
            assert names(page) == ["tool_complete"]

            for locale in inventory.locales:
                for route in ("privacy", "cookies"):
                    page.goto(f"{BASE_URL}/{locale}/{route}/", wait_until="networkidle")
                    assert "{{" not in page.locator("main").inner_text()
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
                    button = page.locator("[data-privacy-choices]")
                    expect(button).to_be_visible()
                    assert button.inner_text().strip()
                    assert button.bounding_box()["height"] >= (44 if width < 500 else 36)
                    if locale in ("en", "ko", "ar") and route == "cookies":
                        page.screenshot(path=str(QA_DIR / f"privacy-{locale}-{width}.png"), full_page=True)
                    report["localized_policy_visits"] += 1
            report["surfaces"].append(width)
            context.close()

        context = context_for(1440, consent=2)
        page = context.new_page()
        page.goto(f"{BASE_URL}/en/json-formatter/", wait_until="networkidle")
        page.locator("[data-input]").fill('{"private":"canary"}')
        expect(page.locator("[data-output]")).not_to_have_value("")
        page.locator("[data-copy]").click()
        page.wait_for_timeout(150)
        assert not events(page), "Denied events must be dropped"
        page.evaluate("window.__qaConsent = 1")
        assert not events(page), "No replay after consent changes"
        page.locator("[data-input]").fill('{"private":"second-canary"}')
        page.wait_for_function("window.__qaEvents.length === 1")
        assert names(page) == ["tool_complete"]
        page.locator("[data-privacy-choices]").click()
        assert page.evaluate("window.__qaRevocations") == 1
        page.locator("[data-copy]").click()
        page.wait_for_timeout(150)
        assert names(page) == ["tool_complete"], "Revoked consent must suppress a new copy event"
        context.close()

        context = context_for(390, consent=0, applicable=False)
        page = context.new_page()
        page.goto(f"{BASE_URL}/en/word-counter/", wait_until="networkidle")
        expect(page.locator("[data-privacy-choices]")).to_be_hidden()
        page.locator("[data-input]").fill("private canary text")
        page.wait_for_timeout(300)
        assert not events(page), "Unknown consent must fail closed"
        page.evaluate("window.__qaConsent = 3")
        page.locator("[data-input]").fill("private canary text changed")
        page.wait_for_function("window.__qaEvents.length === 1")
        assert names(page) == ["tool_complete"]
        context.close()
        browser.close()
    assert not report["page_errors"], report["page_errors"]
    report["result"] = "passed"
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
