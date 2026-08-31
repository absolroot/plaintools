from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

from PIL import Image, ImageDraw

from .config import BASE_URL, QA_DIR


PDF_ROUTES = (
    "compress-pdf",
    "merge-pdf",
    "split-pdf",
    "pdf-to-image",
    "image-to-pdf",
)
PDF_LOCALES = (
    "en",
    "ko",
    "es",
    "de",
    "ja",
    "fr",
    "pt-BR",
    "it",
    "nl",
    "sv",
    "cs",
    "pl",
    "da",
    "no",
    "ar",
    "zh-TW",
    "tr",
)


def _image_fixture(label: str, color: tuple[int, int, int], size=(640, 420)) -> bytes:
    image = Image.new("RGB", size, color)
    draw = ImageDraw.Draw(image)
    draw.rectangle((32, 32, size[0] - 32, size[1] - 32), outline="white", width=8)
    draw.text((60, 60), label, fill="white")
    output = BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()


def _pdf_fixture(page_count: int) -> bytes:
    pages = []
    for index in range(page_count):
        image = Image.new("RGB", (720, 960), (36 + index * 28, 72, 112 + index * 20))
        draw = ImageDraw.Draw(image)
        draw.rectangle((48, 48, 672, 912), outline="white", width=10)
        draw.text((90, 90), f"PlainTool PDF page {index + 1}", fill="white")
        pages.append(image)
    output = BytesIO()
    pages[0].save(
        output,
        format="PDF",
        save_all=True,
        append_images=pages[1:],
        resolution=96,
    )
    return output.getvalue()


def _upload(root, files) -> None:
    root.locator("[data-file-input]").set_input_files(files)
    root.locator("[data-editor]").wait_for(state="visible", timeout=30000)


def _run_and_download(page, root, timeout=120000) -> tuple[str, bytes]:
    root.locator("[data-run]").click()
    root.locator("[data-download]:not([disabled])").wait_for(
        state="visible", timeout=timeout
    )
    with page.expect_download(timeout=30000) as download_info:
        root.locator("[data-download]").click()
    download = download_info.value
    return download.suggested_filename, Path(download.path()).read_bytes()


def _pdf_upload(name: str, payload: bytes) -> dict:
    return {"name": name, "mimeType": "application/pdf", "buffer": payload}


def _image_upload(name: str, payload: bytes) -> dict:
    return {"name": name, "mimeType": "image/png", "buffer": payload}


def _assert_pdf(name: str, payload: bytes) -> None:
    if not payload.startswith(b"%PDF-") or len(payload) < 500:
        raise AssertionError(f"{name} did not return a readable PDF signature")


def run_pdf_toolkit_desktop(page, report: dict, _inventory) -> None:
    three_pages = _pdf_fixture(3)
    one_page = _pdf_fixture(1)
    image_a = _image_fixture("IMAGE A", (42, 91, 150))
    image_b = _image_fixture("IMAGE B", (138, 72, 106), (420, 640))
    completed = []

    page.goto(f"{BASE_URL}/en/compress-pdf/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(root, _pdf_upload("three-pages.pdf", three_pages))
    if "3 pages" not in root.locator(".pdf-file-copy small").inner_text():
        report["ui_detail_failures"].append("Compress PDF did not inspect all input pages.")
    name, compressed = _run_and_download(page, root)
    _assert_pdf(name, compressed)
    completed.append("compress-pdf")

    page.goto(f"{BASE_URL}/en/merge-pdf/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(
        root,
        [
            _pdf_upload("three-pages.pdf", three_pages),
            _pdf_upload("one-page.pdf", one_page),
        ],
    )
    root.locator("[data-move-up]").nth(1).click()
    name, merged = _run_and_download(page, root)
    _assert_pdf(name, merged)
    completed.append("merge-pdf")

    page.goto(f"{BASE_URL}/en/split-pdf/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(root, _pdf_upload("three-pages.pdf", three_pages))
    root.locator('input[name="split-mode"][value="split"]').check(force=True)
    root.locator('input[name="split-rule"][value="custom"]').check(force=True)
    root.locator("[data-custom-ranges]").fill("1, 2-3")
    name, split_zip = _run_and_download(page, root)
    with ZipFile(BytesIO(split_zip)) as archive:
        split_names = archive.namelist()
        if len(split_names) != 2 or not all(item.endswith(".pdf") for item in split_names):
            report["ui_detail_failures"].append(
                f"Split PDF ZIP did not contain two PDF parts: {split_names}"
            )
    completed.append("split-pdf")

    page.goto(f"{BASE_URL}/en/pdf-to-image/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(root, _pdf_upload("three-pages.pdf", three_pages))
    root.locator("[data-image-range]").fill("1-2")
    root.locator("[data-image-format]").select_option("png")
    name, image_zip = _run_and_download(page, root)
    with ZipFile(BytesIO(image_zip)) as archive:
        image_names = archive.namelist()
        signatures = [archive.read(item)[:8] for item in image_names]
        if len(image_names) != 2 or signatures != [b"\x89PNG\r\n\x1a\n"] * 2:
            report["ui_detail_failures"].append(
                f"PDF to Image ZIP was invalid: {image_names}"
            )
    completed.append("pdf-to-image")

    page.goto(f"{BASE_URL}/en/image-to-pdf/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(
        root,
        [
            _image_upload("a.png", image_a),
            _image_upload("b.png", image_b),
        ],
    )
    root.locator("[data-page-size]").select_option("a4")
    root.locator("[data-orientation]").select_option("landscape")
    root.locator("[data-margin]").select_option("small")
    name, image_pdf = _run_and_download(page, root)
    _assert_pdf(name, image_pdf)
    completed.append("image-to-pdf")
    page.screenshot(
        path=str(QA_DIR / "pdf-toolkit-desktop-result.png"), full_page=False
    )

    if completed != list(PDF_ROUTES):
        report["ui_detail_failures"].append(
            f"PDF toolkit functional matrix is incomplete: {completed}"
        )

    rendered_routes = 0
    rendered_home_cards = 0
    for locale in PDF_LOCALES:
        page.goto(f"{BASE_URL}/{locale}/", wait_until="domcontentloaded")
        pdf_cards = page.locator(
            '[data-directory-category="pdf"] [data-directory-search-card]'
        )
        card_hrefs = pdf_cards.evaluate_all(
            "cards => cards.map(card => card.getAttribute('href'))"
        )
        expected_hrefs = [f"/{locale}/{route}/" for route in PDF_ROUTES]
        if card_hrefs != expected_hrefs:
            report["ui_detail_failures"].append(
                f"{locale} PDF directory cards were incomplete or reordered: {card_hrefs}"
            )
        rendered_home_cards += len(card_hrefs)
        for route in PDF_ROUTES:
            response = page.goto(
                f"{BASE_URL}/{locale}/{route}/", wait_until="domcontentloaded"
            )
            root = page.locator("[data-pdf-toolkit]")
            root.wait_for(state="visible", timeout=30000)
            state = {
                "status": response.status if response else 0,
                "mode": root.get_attribute("data-mode"),
                "lang": page.locator("html").get_attribute("lang"),
                "robots": page.locator('meta[name="robots"]').get_attribute("content"),
            }
            if (
                state["status"] != 200
                or state["mode"] != route
                or state["lang"] != locale
                or "noindex" not in (state["robots"] or "")
            ):
                report["ui_detail_failures"].append(
                    f"PDF locale route failed ({locale}/{route}): {state}"
                )
            rendered_routes += 1

    report["pdf_toolkit"] = {
        "completed": completed,
        "rendered_locale_routes": rendered_routes,
        "rendered_home_cards": rendered_home_cards,
        "processing": "browser-local",
    }
    page.goto(f"{BASE_URL}/ko/", wait_until="domcontentloaded")
    page.screenshot(path=str(QA_DIR / "pdf-toolkit-home-desktop.png"), full_page=False)


def run_pdf_toolkit_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/split-pdf/", wait_until="networkidle")
    root = page.locator("[data-pdf-toolkit]")
    _upload(root, _pdf_upload("ثلاث-صفحات.pdf", _pdf_fixture(3)))
    page.screenshot(path=str(QA_DIR / "pdf-toolkit-ar-mobile.png"), full_page=False)
    metrics = page.evaluate(
        """
        () => {
          const root = document.querySelector('[data-pdf-toolkit]');
          const editor = root.querySelector('[data-editor]');
          const panels = [...editor.children].map((item) => item.getBoundingClientRect());
          const input = root.querySelector('[data-extract-range]');
          const buttons = [...root.querySelectorAll('.pdf-file-actions button')]
            .filter((button) => !button.hidden && getComputedStyle(button).display !== 'none');
          return {
            dir: document.documentElement.dir,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            singleColumn: panels.length === 2 && panels[1].top >= panels[0].bottom,
            inputDirection: getComputedStyle(input).direction,
            minButtonHeight: Math.min(...buttons.map((button) => button.getBoundingClientRect().height)),
          };
        }
        """
    )
    report["pdf_toolkit_mobile"] = metrics
    if (
        metrics["dir"] != "rtl"
        or metrics["overflow"] > 1
        or not metrics["singleColumn"]
        or metrics["inputDirection"] != "ltr"
        or metrics["minButtonHeight"] < 44
    ):
        report["ui_detail_failures"].append(
            f"PDF toolkit Arabic mobile layout failed: {metrics}"
        )
