from pathlib import Path
import os


ROOT = Path(__file__).resolve().parents[2]
QA_DIR = ROOT / "research" / "qa"
BASE_URL = os.environ.get("PLAINTOOL_QA_BASE_URL", "http://localhost:4321").rstrip("/")

# These locales cover the main browser-layout risks without multiplying every
# route check by the full publication inventory. Complete locale symmetry,
# metadata, and route presence remain enforced by the source/build gates.
BROWSER_QA_LOCALE_CANDIDATES = ("en", "ko", "de", "ar", "zh-TW")


def select_browser_locales(
    locales: tuple[str, ...], *, full: bool = False
) -> tuple[str, ...]:
    if full:
        return locales

    missing = tuple(
        locale for locale in BROWSER_QA_LOCALE_CANDIDATES if locale not in locales
    )
    if missing:
        raise RuntimeError(
            "Representative browser QA locales are missing from the public registry: "
            f"{', '.join(missing)}. Update the risk matrix deliberately."
        )

    return BROWSER_QA_LOCALE_CANDIDATES
