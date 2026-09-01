from dataclasses import dataclass
from pathlib import Path
import re
import subprocess

from .config import select_browser_locales
from .registry import RouteInventory


FEATURE_PATH_ALIASES = {
    "ai-text-cleaner": "ai-text-cleaner",
    "background-remover": "background-remover",
    "barcode-core": "barcode-generator",
    "barcode-generator": "barcode-generator",
    "base64": "base64-codec",
    "bmi-calculator": "bmi-calculator",
    "bmi-calculator-core": "bmi-calculator",
    "case-converter": "case-converter",
    "codec-core": "base64-codec",
    "css-formatter": "source-formatter",
    "css-formatter-core": "source-formatter",
    "data-converter": "data-converter",
    "data-conversion-core": "data-converter",
    "date-calculator": "date-calculator",
    "date-core": "date-calculator",
    "hash-core": "hash-generator",
    "hash-generator": "hash-generator",
    "html-formatter": "source-formatter",
    "html-formatter-core": "source-formatter",
    "image-converter": "image-converter",
    "image-crop": "image-crop",
    "image-resizer": "image-resizer",
    "image-upscaler": "image-upscaler",
    "ip-subnet": "ip-subnet",
    "ip-subnet-core": "ip-subnet",
    "javascript-formatter": "source-formatter",
    "javascript-formatter-core": "source-formatter",
    "json": "json-formatter",
    "json-core": "json-formatter",
    "jwt-core": "jwt-decoder",
    "jwt-decoder": "jwt-decoder",
    "math-calculator": "math-calculator",
    "math-calculator-core": "math-calculator",
    "password-core": "password-generator",
    "password-generator": "password-generator",
    "pdf-core": "pdf-toolkit",
    "pdf-toolkit": "pdf-toolkit",
    "percentage-calculator": "percentage-calculator",
    "percentage-calculator-core": "percentage-calculator",
    "qr": "qr-code",
    "qr-core": "qr-code",
    "regex-tester": "regex-tester",
    "sql-formatter": "source-formatter",
    "sql-formatter-core": "source-formatter",
    "text-case-core": "case-converter",
    "text-cleaner-core": "ai-text-cleaner",
    "text-compare": "text-compare",
    "text-diff-core": "text-compare",
    "text-metrics-core": "word-counter",
    "time": "unix-timestamp-converter",
    "time-core": "unix-timestamp-converter",
    "time-zone-converter": "time-zone-converter",
    "unit-converter": "unit-converter",
    "unit-converter-core": "unit-converter",
    "url-codec": "url-codec",
    "url-core": "url-codec",
    "uuid-core": "uuid-generator",
    "uuid-generator": "uuid-generator",
    "word": "word-counter",
}

NON_BROWSER_PREFIXES = (
    ".codex/",
    "research/",
    "scripts/",
)
NON_BROWSER_FILES = {
    ".gitignore",
    ".prettierignore",
    ".prettierrc.json",
    "ARCHITECTURE.md",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
    "eslint.config.js",
    "package-lock.json",
    "package.json",
    "tsconfig.base.json",
    "tsconfig.json",
}
SHARED_SURFACE_PROBE_FEATURE = "base64-codec"


@dataclass(frozen=True)
class QaSelection:
    label: str
    locales: tuple[str, ...]
    behavior_feature_ids: tuple[str, ...]
    routes: tuple[str, ...]
    surfaces: tuple[str, ...]
    run_directory: bool
    run_legal: bool
    run_surface_probe: bool
    changed_files: tuple[str, ...] = ()

    @property
    def browser_required(self) -> bool:
        return bool(
            self.surfaces
            and (
                self.behavior_feature_ids
                or self.routes
                or self.run_directory
                or self.run_legal
            )
        )


def _ordered(values: set[str], reference: tuple[str, ...]) -> tuple[str, ...]:
    return tuple(value for value in reference if value in values)


def _routes_for_features(
    inventory: RouteInventory,
    feature_ids: tuple[str, ...],
    *,
    representative: bool,
) -> tuple[str, ...]:
    routes: list[str] = []
    seen_features: set[str] = set()
    selected = set(feature_ids)
    for tool in inventory.tools:
        if tool.feature_id not in selected:
            continue
        if representative and tool.feature_id in seen_features:
            continue
        routes.append(f"{tool.slug}/")
        seen_features.add(tool.feature_id)
    return tuple(routes)


def select_routes(
    inventory: RouteInventory,
    feature_ids: tuple[str, ...],
    route_scope: str,
) -> tuple[str, ...]:
    if route_scope == "all":
        return inventory.routes
    if route_scope == "selected":
        return _routes_for_features(inventory, feature_ids, representative=False)
    if route_scope == "representative":
        return _routes_for_features(inventory, feature_ids, representative=True)
    if route_scope == "none":
        return ()
    raise ValueError(f"Unknown browser route scope: {route_scope}")


def changed_files(root: Path, base: str = "HEAD") -> tuple[str, ...]:
    commands = (
        [
            "git",
            "diff",
            "--name-only",
            "--relative",
            "--diff-filter=ACMRD",
            base,
            "--",
        ],
        ["git", "ls-files", "--others", "--exclude-standard"],
    )
    paths: set[str] = set()
    for command in commands:
        result = subprocess.run(
            command,
            cwd=root,
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=False,
        )
        if result.returncode != 0:
            detail = result.stderr.strip() or "no diagnostic output"
            raise RuntimeError(
                f"Could not determine affected QA files with {' '.join(command)}: {detail}"
            )
        paths.update(
            line.strip().replace("\\", "/")
            for line in result.stdout.splitlines()
            if line.strip()
        )
    return tuple(sorted(paths))


def _path_feature(path: str, inventory: RouteInventory) -> str | None:
    feature_match = re.match(r"apps/web/src/features/([^/]+)/", path)
    if feature_match:
        return FEATURE_PATH_ALIASES.get(feature_match.group(1))

    package_match = re.match(r"packages/([^/]+)/", path)
    if package_match:
        return FEATURE_PATH_ALIASES.get(package_match.group(1))

    route_match = re.match(r"apps/web/src/pages/\[locale\]/([^/]+)/", path)
    if route_match:
        slug = route_match.group(1)
        tool = next((item for item in inventory.tools if item.slug == slug), None)
        return tool.feature_id if tool else None

    manifest_match = re.match(
        r"research/i18n/local-reviews/locale-review-manifests/([^/]+)\.json$", path
    )
    if manifest_match and manifest_match.group(1) in inventory.feature_ids:
        return manifest_match.group(1)

    locale_feature_match = re.match(
        r"apps/web/src/lib/locale-data/new-tools/([^/]+)\.ts$", path
    )
    if locale_feature_match and locale_feature_match.group(1) in inventory.feature_ids:
        return locale_feature_match.group(1)

    if "models/background-remover/" in path:
        return "background-remover"
    if "models/image-upscaler/" in path:
        return "image-upscaler"
    return None


def _path_locale(path: str, inventory: RouteInventory) -> str | None:
    match = re.match(
        r"apps/web/src/lib/locale-data/(?:new-tools/)?([^/]+)\.ts$", path
    )
    if match and match.group(1) in inventory.locales:
        return match.group(1)
    return None


def affected_selection(
    inventory: RouteInventory,
    paths: tuple[str, ...],
    *,
    surfaces: tuple[str, ...] = ("desktop", "mobile"),
) -> QaSelection:
    feature_ids: set[str] = set()
    changed_locales: set[str] = set()
    shared = False
    risk_locales = False
    directory = False
    legal = False
    browser_relevant = False

    legal_names = set(inventory.legal_pages)
    for path in paths:
        feature_id = _path_feature(path, inventory)
        if feature_id:
            feature_ids.add(feature_id)
            if path == "apps/web/src/lib/locale-data/new-tools/background-remover.ts":
                risk_locales = True
            browser_relevant = True
            continue

        locale = _path_locale(path, inventory)
        if locale:
            changed_locales.add(locale)
            shared = True
            browser_relevant = True
            continue

        route_match = re.match(r"apps/web/src/pages/\[locale\]/([^/]+)/", path)
        if route_match and route_match.group(1) in legal_names:
            legal = True
            browser_relevant = True
            continue

        if path == "apps/web/src/pages/[locale]/index.astro" or any(
            token in path
            for token in ("ToolDirectory", "directory-search", "tool-directory")
        ):
            directory = True
            browser_relevant = True
            continue

        if path.startswith("apps/web/src/") or path.startswith("apps/web/public/"):
            if path.endswith(".test.ts"):
                continue
            shared = True
            browser_relevant = True
            continue

        if path in NON_BROWSER_FILES or path.startswith(NON_BROWSER_PREFIXES):
            continue

    if not browser_relevant:
        return QaSelection(
            label="affected-none",
            locales=(),
            behavior_feature_ids=(),
            routes=(),
            surfaces=(),
            run_directory=False,
            run_legal=False,
            run_surface_probe=False,
            changed_files=paths,
        )

    ordered_features = _ordered(feature_ids, inventory.feature_ids)
    if changed_locales:
        locales = _ordered(changed_locales, inventory.locales)
    elif shared or risk_locales:
        locales = select_browser_locales(inventory.locales)
    else:
        locales = ("en" if "en" in inventory.locales else inventory.locales[0],)

    if shared:
        route_features = inventory.feature_ids
        routes = select_routes(inventory, route_features, "representative")
        behavior_features = ordered_features or (SHARED_SURFACE_PROBE_FEATURE,)
    else:
        routes = select_routes(inventory, ordered_features, "selected")
        behavior_features = ordered_features

    return QaSelection(
        label="affected-shared" if shared else "affected-feature",
        locales=locales,
        behavior_feature_ids=behavior_features,
        routes=routes,
        surfaces=surfaces,
        run_directory=directory or shared,
        run_legal=legal or shared,
        run_surface_probe=shared,
        changed_files=paths,
    )


def explicit_selection(
    inventory: RouteInventory,
    *,
    features: tuple[str, ...] = (),
    locales: tuple[str, ...] = (),
    surfaces: tuple[str, ...] = ("desktop", "mobile"),
    route_scope: str | None = None,
    full: bool = False,
) -> QaSelection:
    unknown_features = sorted(set(features).difference(inventory.feature_ids))
    if unknown_features:
        raise ValueError(f"Unknown QA feature: {', '.join(unknown_features)}")
    unknown_locales = sorted(set(locales).difference(inventory.locales))
    if unknown_locales:
        raise ValueError(f"Unknown QA locale: {', '.join(unknown_locales)}")

    if full:
        selected_features = inventory.feature_ids
        behavior_features = selected_features
        selected_locales = inventory.locales
        selected_route_scope = "all"
        label = "full"
    elif features or locales or route_scope:
        selected_features = features or inventory.feature_ids
        behavior_features = features
        selected_locales = locales or (
            "en" if "en" in inventory.locales else inventory.locales[0],
        )
        selected_route_scope = route_scope or (
            "selected" if features else "representative"
        )
        label = "scoped"
    else:
        selected_features = inventory.feature_ids
        behavior_features = selected_features
        selected_locales = select_browser_locales(inventory.locales)
        selected_route_scope = "all"
        label = "representative"

    return QaSelection(
        label=label,
        locales=selected_locales,
        behavior_feature_ids=behavior_features,
        routes=select_routes(inventory, selected_features, selected_route_scope),
        surfaces=surfaces,
        run_directory=label in {"full", "representative"},
        run_legal=label in {"full", "representative"},
        run_surface_probe=label in {"full", "representative"},
    )
