from dataclasses import dataclass
import json
from pathlib import Path
import subprocess
from typing import Any

from .config import ROOT


EXPORT_SCHEMA_VERSION = 1


@dataclass(frozen=True)
class ToolRoute:
    id: str
    feature_id: str
    slug: str
    publication: str
    structured_data: tuple[str, ...]
    top_tool_promise: bool = True


@dataclass(frozen=True)
class RouteInventory:
    locales: tuple[str, ...]
    routes: tuple[str, ...]
    faq_routes: frozenset[str]
    tools: tuple[ToolRoute, ...]
    legal_pages: tuple[str, ...]

    @property
    def tool_slugs(self) -> tuple[str, ...]:
        return tuple(tool.slug for tool in self.tools)

    @property
    def feature_ids(self) -> tuple[str, ...]:
        return tuple(dict.fromkeys(tool.feature_id for tool in self.tools))

    def tool_for_route(self, route: str) -> ToolRoute | None:
        slug = route.removesuffix("/")
        return next((tool for tool in self.tools if tool.slug == slug), None)


def _string_tuple(value: Any, field: str) -> tuple[str, ...]:
    if not isinstance(value, list) or not value or any(
        not isinstance(item, str) or not item for item in value
    ):
        raise ValueError(f"Registry export field '{field}' must be a non-empty string array.")
    return tuple(value)


def parse_registry_export(source: str) -> RouteInventory:
    try:
        payload = json.loads(source)
    except json.JSONDecodeError as error:
        raise ValueError("The registry exporter returned invalid JSON.") from error

    if not isinstance(payload, dict) or payload.get("schemaVersion") != EXPORT_SCHEMA_VERSION:
        raise ValueError(
            f"Registry export must use schema version {EXPORT_SCHEMA_VERSION}."
        )

    locales = _string_tuple(payload.get("locales"), "locales")
    legal_pages = _string_tuple(payload.get("legalPages"), "legalPages")
    raw_tools = payload.get("tools")
    if not isinstance(raw_tools, list) or not raw_tools:
        raise ValueError("Registry export field 'tools' must contain at least one tool.")

    tools: list[ToolRoute] = []
    for index, raw_tool in enumerate(raw_tools):
        if not isinstance(raw_tool, dict):
            raise ValueError(f"Registry export tool {index} must be an object.")
        values = {
            field: raw_tool.get(field)
            for field in ("id", "featureId", "slug", "publication")
        }
        invalid = [
            field
            for field, value in values.items()
            if not isinstance(value, str) or not value
        ]
        if invalid:
            raise ValueError(
                f"Registry export tool {index} has invalid fields: {', '.join(invalid)}."
            )
        top_tool_promise = raw_tool.get("topToolPromise", True)
        if not isinstance(top_tool_promise, bool):
            raise ValueError(
                f"Registry export tool {index} has invalid topToolPromise."
            )
        tools.append(
            ToolRoute(
                id=values["id"],
                feature_id=values["featureId"],
                slug=values["slug"],
                publication=values["publication"],
                structured_data=_string_tuple(
                    raw_tool.get("structuredData"),
                    f"tools[{index}].structuredData",
                ),
                top_tool_promise=top_tool_promise,
            )
        )

    for label, values in (
        ("tool ids", tuple(tool.id for tool in tools)),
        ("tool slugs", tuple(tool.slug for tool in tools)),
        ("locales", locales),
        ("legal pages", legal_pages),
    ):
        if len(values) != len(set(values)):
            raise ValueError(f"Registry export contains duplicate {label}.")

    return build_route_inventory(locales, tuple(tools), legal_pages)


def build_route_inventory(
    locales: tuple[str, ...],
    tools: tuple[ToolRoute, ...],
    legal_pages: tuple[str, ...],
) -> RouteInventory:
    routes = ("",) + tuple(f"{tool.slug}/" for tool in tools) + tuple(
        f"{page}/" for page in legal_pages
    )
    faq_routes = frozenset(
        f"{tool.slug}/" for tool in tools if "FAQPage" in tool.structured_data
    )
    return RouteInventory(
        locales=locales,
        routes=routes,
        faq_routes=faq_routes,
        tools=tools,
        legal_pages=legal_pages,
    )


def load_route_inventory(root: Path = ROOT) -> RouteInventory:
    exporter = root / "scripts" / "qa" / "export_registry.mjs"
    result = subprocess.run(
        ["node", str(exporter)],
        cwd=root,
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=False,
    )
    if result.returncode != 0:
        detail = result.stderr.strip() or "no diagnostic output"
        raise RuntimeError(f"Registry exporter failed: {detail}")
    return parse_registry_export(result.stdout)
