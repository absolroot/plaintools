from __future__ import annotations

import base64
import json
import statistics
import sys
import time

from playwright.sync_api import Page, sync_playwright


BASE_URL = "http://127.0.0.1:4321"
SIZES = (16, 4 * 1024, 256 * 1024, 1024 * 1024)
SAMPLES = 5


def wait_for_output(page: Page, expected_length: int) -> None:
    page.wait_for_function(
        "expected => document.querySelector('[data-output]').value.length === expected",
        arg=expected_length,
        timeout=15_000,
    )


def measure(page: Page, mode: str, size: int, sample: int) -> float:
    if mode == "decode":
        decoded_size = (size // 4) * 3
        source = ("A" * (decoded_size - 1)) + chr(66 + sample)
        input_value = base64.b64encode(source.encode("ascii")).decode("ascii")
        expected_length = decoded_size
    else:
        source = ("A" * (size - 1)) + chr(66 + sample)
        input_value = source
        expected_length = ((size + 2) // 3) * 4

    page.locator("[data-input]").fill("")
    started = time.perf_counter()
    page.locator("[data-input]").fill(input_value)
    wait_for_output(page, expected_length)
    elapsed_ms = round((time.perf_counter() - started) * 1000, 2)
    expected_output = source if mode == "decode" else base64.b64encode(source.encode("ascii")).decode("ascii")
    actual_output = page.locator("[data-output]").input_value()
    if actual_output != expected_output:
        raise AssertionError(f"{mode} output mismatch for {size} input characters")
    return elapsed_ms


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    report: dict[str, object] = {
        "console_errors": [],
        "page_errors": [],
        "external_conversion_requests": [],
        "samples": {},
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.on(
            "console",
            lambda message: report["console_errors"].append(message.text)
            if message.type == "error"
            else None,
        )
        page.on("pageerror", lambda error: report["page_errors"].append(str(error)))
        requests: list[str] = []
        page.on("request", lambda request: requests.append(request.url))
        page.goto(f"{BASE_URL}/ko/", wait_until="networkidle")

        report["browser"] = page.evaluate(
            """() => ({
              userAgent: navigator.userAgent,
              fromBase64: typeof Uint8Array.fromBase64,
              toBase64: typeof Uint8Array.prototype.toBase64
            })"""
        )

        for mode in ("decode", "encode"):
            page.locator(f'button[data-mode="{mode}"]').click()
            mode_results: dict[str, object] = {}
            for size in SIZES:
                timings = [measure(page, mode, size, sample) for sample in range(SAMPLES)]
                mode_results[str(size)] = {
                    "samples_ms": timings,
                    "median_ms": round(statistics.median(timings), 2),
                }
            report["samples"][mode] = mode_results

        file_text = "Hello file 한국어"
        encoded_file_text = base64.b64encode(file_text.encode("utf-8")).decode("ascii")
        page.locator('button[data-mode="encode"]').click()
        page.locator("[data-file-input]").set_input_files(
            {"name": "sample.txt", "mimeType": "text/plain", "buffer": file_text.encode("utf-8")}
        )
        page.wait_for_function(
            "expected => document.querySelector('[data-output]').value === expected",
            arg=encoded_file_text,
        )

        page.locator('button[data-mode="decode"]').click()
        page.locator("[data-file-input]").set_input_files(
            {"name": "sample.b64", "mimeType": "text/plain", "buffer": encoded_file_text.encode("ascii")}
        )
        page.wait_for_function(
            "expected => document.querySelector('[data-output]').value === expected",
            arg=file_text,
        )

        png_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        page.locator("[data-input]").fill(png_base64)
        page.locator("[data-preview-image]").wait_for(state="visible")
        report["file_checks"] = {
            "text_encode": encoded_file_text,
            "text_decode": file_text,
            "binary_preview_src": page.locator("[data-preview-image]").get_attribute("src"),
        }

        report["external_conversion_requests"] = [
            url
            for url in requests
            if not url.startswith(BASE_URL) and not url.startswith("blob:")
        ]
        browser.close()

    print(json.dumps(report, ensure_ascii=False, indent=2))
    if report["console_errors"] or report["page_errors"] or report["external_conversion_requests"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
