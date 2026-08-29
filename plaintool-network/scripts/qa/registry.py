from dataclasses import dataclass
from pathlib import Path
import re

from .config import ROOT


_TOOL_BLOCK = re.compile(r"(?ms)^  \{\s*(.*?)^  \}")
_QUOTED_VALUE = re.compile(r'"([^"]+)"')


@dataclass(frozen=True)
class ToolRoute:
    slug: str
    structured_data: tuple[str, ...]


@dataclass(frozen=True)
class RouteInventory:
    locales: tuple[str, ...]
    routes: tuple[str, ...]
    faq_routes: frozenset[str]
    tool_slugs: tuple[str, ...]


def parse_public_locales(source: str) -> tuple[str, ...]:
    match = re.search(
        r"export const locales\s*=.*?\[([^\]]+)\]",
        source,
        flags=re.DOTALL,
    )
    locales = tuple(_QUOTED_VALUE.findall(match.group(1))) if match else ()
    if not locales:
        raise ValueError("The content registry contains no public locales.")
    return locales


def parse_tool_registry(source: str) -> tuple[ToolRoute, ...]:
    tools = []
    for block in _TOOL_BLOCK.findall(source):
        slug_match = re.search(r'\bslug:\s*"([^"]+)"', block)
        structured_match = re.search(r"\bstructuredData:\s*\[([^\]]*)\]", block)
        if not slug_match or not structured_match:
            continue
        tools.append(
            ToolRoute(
                slug=slug_match.group(1),
                structured_data=tuple(_QUOTED_VALUE.findall(structured_match.group(1))),
            )
        )
    if not tools:
        raise ValueError("The tool registry contains no tool routes.")
    return tuple(tools)


def parse_legal_pages(source: str) -> tuple[str, ...]:
    match = re.search(
        r"export const legalPages\s*=.*?\[([^\]]+)\]",
        source,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError("Could not read legalPages from the content registry.")
    pages = tuple(_QUOTED_VALUE.findall(match.group(1)))
    if not pages:
        raise ValueError("The content registry contains no legal pages.")
    return pages


def build_route_inventory(
    locales: tuple[str, ...],
    tools: tuple[ToolRoute, ...],
    legal_pages: tuple[str, ...],
) -> RouteInventory:
    tool_slugs = tuple(tool.slug for tool in tools)
    routes = ("",) + tuple(f"{slug}/" for slug in tool_slugs) + tuple(
        f"{page}/" for page in legal_pages
    )
    faq_routes = frozenset(
        f"{tool.slug}/"
        for tool in tools
        if "FAQPage" in tool.structured_data
    )
    return RouteInventory(
        locales=locales,
        routes=routes,
        faq_routes=faq_routes,
        tool_slugs=tool_slugs,
    )


def load_route_inventory(root: Path = ROOT) -> RouteInventory:
    tool_source = (
        root / "apps" / "web" / "src" / "lib" / "tool-registry.js"
    ).read_text(encoding="utf-8")
    content_source = (
        root / "apps" / "web" / "src" / "lib" / "content-registry.js"
    ).read_text(encoding="utf-8")
    return build_route_inventory(
        parse_public_locales(content_source),
        parse_tool_registry(tool_source),
        parse_legal_pages(content_source),
    )
