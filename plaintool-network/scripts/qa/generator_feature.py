from .config import BASE_URL


def run_barcode_generator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/barcode-generator/", wait_until="networkidle")
    root = page.locator("[data-barcode-generator]")
    root.locator("[data-format]").select_option("ean13")
    root.locator("[data-value]").fill("400638133393")
    page.wait_for_function(
        """
        () => {
          const root = document.querySelector('[data-barcode-generator]');
          return !root.querySelector('[data-svg]').hidden
            && !root.querySelector('[data-download-png]').disabled
            && !root.querySelector('[data-download-svg]').disabled;
        }
        """
    )
    valid_state = root.evaluate(
        """
        root => ({
          aria_label: root.querySelector('[data-svg]').getAttribute('aria-label'),
          png_disabled: root.querySelector('[data-download-png]').disabled,
          svg_disabled: root.querySelector('[data-download-svg]').disabled,
          input_value: root.querySelector('[data-value]').value
        })
        """
    )
    if (
        "4006381333931" not in (valid_state["aria_label"] or "")
        or valid_state["png_disabled"]
        or valid_state["svg_disabled"]
        or valid_state["input_value"] != "400638133393"
    ):
        report["ui_detail_failures"].append(
            f"Barcode check-digit preview is incomplete: {valid_state}"
        )

    root.locator("[data-value]").fill("4006381333932")
    page.wait_for_function(
        """
        () => {
          const root = document.querySelector('[data-barcode-generator]');
          return root.classList.contains('has-error')
            && root.querySelector('[data-download-png]').disabled
            && root.querySelector('[data-download-svg]').disabled;
        }
        """
    )
    if "400638133393" in page.url:
        report["ui_detail_failures"].append(
            "Barcode input leaked into the route URL."
        )
    report["barcode_generator"] = valid_state


def run_barcode_generator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/barcode-generator/", wait_until="networkidle")
    root = page.locator("[data-barcode-generator]")
    root.locator("[data-value]").fill("QA 12345")
    page.wait_for_function(
        "!document.querySelector('[data-barcode-generator] [data-svg]').hidden"
    )
    state = root.evaluate(
        """
        root => ({
          html_dir: document.documentElement.dir,
          input_dir: getComputedStyle(root.querySelector('[data-value]')).direction,
          format_dir: getComputedStyle(root.querySelector('[data-format]')).direction,
          scroll_width: document.documentElement.scrollWidth,
          viewport_width: window.innerWidth,
          action_heights: [
            root.querySelector('[data-clear]'),
            root.querySelector('[data-download-png]'),
            root.querySelector('[data-download-svg]')
          ].map(element => Math.round(element.getBoundingClientRect().height))
        })
        """
    )
    if (
        state["html_dir"] != "rtl"
        or state["input_dir"] != "ltr"
        or state["format_dir"] != "ltr"
        or state["scroll_width"] > state["viewport_width"]
        or any(height < 44 for height in state["action_heights"])
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile barcode controls are not usable: {state}"
        )
    report["barcode_generator_mobile"] = state


def run_password_generator_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/password-generator/", wait_until="networkidle")
    root = page.locator("[data-password-generator]")
    result = root.locator("[data-result]")
    page.wait_for_function(
        "document.querySelector('[data-password-generator] [data-result]').value.length === 20"
    )
    first = result.input_value()
    root.locator("[data-regenerate]").click()
    page.wait_for_function(
        """
        previous => {
          const value = document.querySelector('[data-password-generator] [data-result]').value;
          return value.length === 20 && value !== previous;
        }
        """,
        arg=first,
    )
    second = result.input_value()
    selected_classes = root.evaluate(
        """
        root => ({
          lower: /[a-z]/.test(root.querySelector('[data-result]').value),
          upper: /[A-Z]/.test(root.querySelector('[data-result]').value),
          digit: /[0-9]/.test(root.querySelector('[data-result]').value),
          symbol: /[^A-Za-z0-9]/.test(root.querySelector('[data-result]').value),
          copy_disabled: root.querySelector('[data-copy]').disabled,
          entropy: root.querySelector('[data-entropy]').textContent.trim()
        })
        """
    )
    if (
        not all(selected_classes[key] for key in ("lower", "upper", "digit", "symbol"))
        or selected_classes["copy_disabled"]
        or not selected_classes["entropy"]
        or second in page.url
    ):
        report["ui_detail_failures"].append(
            f"Password generation contract is incomplete: {selected_classes}"
        )

    for checkbox in root.locator("[data-character-set]").all():
        checkbox.uncheck()
    page.wait_for_function(
        """
        () => {
          const root = document.querySelector('[data-password-generator]');
          return root.classList.contains('has-error')
            && root.querySelector('[data-result]').value === ''
            && root.querySelector('[data-copy]').disabled;
        }
        """
    )
    report["password_generator"] = {
        "default_length": len(first),
        "regenerated": first != second,
        "classes": selected_classes,
    }


def run_password_generator_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/password-generator/", wait_until="networkidle")
    page.wait_for_function(
        "document.querySelector('[data-password-generator] [data-result]').value.length === 20"
    )
    root = page.locator("[data-password-generator]")
    state = root.evaluate(
        """
        root => ({
          html_dir: document.documentElement.dir,
          result_dir: getComputedStyle(root.querySelector('[data-result]')).direction,
          length_dir: getComputedStyle(root.querySelector('[data-length-number]')).direction,
          scroll_width: document.documentElement.scrollWidth,
          viewport_width: window.innerWidth,
          action_heights: [
            root.querySelector('[data-copy]'),
            root.querySelector('[data-regenerate]'),
            root.querySelector('[data-length-number]')
          ].map(element => Math.round(element.getBoundingClientRect().height))
        })
        """
    )
    if (
        state["html_dir"] != "rtl"
        or state["result_dir"] != "ltr"
        or state["length_dir"] != "ltr"
        or state["scroll_width"] > state["viewport_width"]
        or any(height < 44 for height in state["action_heights"])
    ):
        report["ui_detail_failures"].append(
            f"Arabic mobile password controls are not usable: {state}"
        )
    report["password_generator_mobile"] = state
