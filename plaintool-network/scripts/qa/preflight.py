from dataclasses import dataclass
from typing import Any, Callable, Mapping
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .registry import RouteInventory


BehaviorRunner = Callable[[Any, dict, RouteInventory], None]


@dataclass(frozen=True)
class FeatureCoverage:
    desktop: BehaviorRunner
    mobile: BehaviorRunner
    focus_targets: tuple[tuple[str, str], ...]
    focus_style: str = "standard"
    compare_focus_surfaces: bool = False
    exercise_faq: bool = False
    surface_probe: bool = False


def validate_feature_coverage(
    inventory: RouteInventory,
    coverage: Mapping[str, FeatureCoverage],
) -> None:
    registered = set(inventory.feature_ids)
    missing = sorted(registered.difference(coverage))
    if missing:
        raise RuntimeError(
            "Registered features have no browser behavior coverage: "
            + ", ".join(missing)
        )
    stale = sorted(set(coverage).difference(registered))
    if stale:
        raise RuntimeError(
            "Browser behavior coverage has no registered feature: " + ", ".join(stale)
        )

    invalid = sorted(
        feature_id
        for feature_id, handler in coverage.items()
        if not callable(handler.desktop)
        or not callable(handler.mobile)
        or not handler.focus_targets
        or handler.focus_style not in {"standard", "editor"}
    )
    if invalid:
        raise RuntimeError(
            "Browser behavior coverage is incomplete for: " + ", ".join(invalid)
        )

    surface_probes = [
        feature_id for feature_id, handler in coverage.items() if handler.surface_probe
    ]
    if len(surface_probes) != 1:
        raise RuntimeError(
            "Browser behavior coverage must select exactly one shared-surface probe."
        )


def verify_server(base_url: str, path: str, timeout: float = 5.0) -> None:
    url = f"{base_url}{path}"
    request = Request(url, headers={"User-Agent": "PlainTool local UI QA"})
    try:
        with urlopen(request, timeout=timeout) as response:
            status = getattr(response, "status", 200)
            content_type = response.headers.get_content_type()
            response.read(256)
    except (HTTPError, URLError, TimeoutError, OSError) as error:
        raise RuntimeError(
            f"UI QA server preflight failed for {url}. Start the local Astro server first."
        ) from error
    if status >= 400 or content_type != "text/html":
        raise RuntimeError(
            f"UI QA server preflight expected HTML from {url}, "
            f"received status {status} and {content_type}."
        )
