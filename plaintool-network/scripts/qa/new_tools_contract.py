from .registry import RouteInventory


NEW_TOOL_ROUTES = (
    "ai-watermark-remover",
    "url-encode",
    "url-decode",
    "hash-generator",
    "jwt-decoder",
    "qr-code-generator",
    "qr-code-scanner",
    "csv-to-markdown",
    "markdown-to-csv",
    "json-to-csv",
    "csv-to-json",
    "html-to-markdown",
    "markdown-to-html",
)

NEW_TOOL_FEATURES = {
    "ai-watermark-remover": "ai-text-cleaner",
    "url-encode": "url-codec",
    "url-decode": "url-codec",
    "hash-generator": "hash-generator",
    "jwt-decoder": "jwt-decoder",
    "qr-code-generator": "qr-code",
    "qr-code-scanner": "qr-code",
    "csv-to-markdown": "data-converter",
    "markdown-to-csv": "data-converter",
    "json-to-csv": "data-converter",
    "csv-to-json": "data-converter",
    "html-to-markdown": "data-converter",
    "markdown-to-html": "data-converter",
}

TECHNICAL_DIRECTION_SELECTORS = {
    "url-encode": ("[data-url-codec] [data-input]", "[data-url-codec] [data-output]"),
    "url-decode": ("[data-url-codec] [data-input]", "[data-url-codec] [data-output]"),
    "hash-generator": ("[data-hash-generator] [data-input]", "[data-hash-output]"),
    "jwt-decoder": ("[data-jwt-decoder] [data-input]", "[data-jwt-decoder] [data-output]"),
    "csv-to-markdown": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
    "markdown-to-csv": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
    "json-to-csv": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
    "csv-to-json": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
    "html-to-markdown": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
    "markdown-to-html": ("[data-data-converter] [data-input]", "[data-data-converter] [data-output]"),
}


def validate_new_tool_inventory(inventory: RouteInventory) -> None:
    tools = {tool.slug: tool for tool in inventory.tools}
    missing = [slug for slug in NEW_TOOL_ROUTES if slug not in tools]
    if missing:
        raise RuntimeError("New browser QA routes are missing: " + ", ".join(missing))

    failures = []
    for slug, expected_feature in NEW_TOOL_FEATURES.items():
        tool = tools[slug]
        if tool.feature_id != expected_feature:
            failures.append(
                f"{slug} uses feature {tool.feature_id}, expected {expected_feature}"
            )
        if tool.publication != "preview":
            failures.append(
                f"{slug} publication is {tool.publication}, expected preview"
            )
    if failures:
        raise RuntimeError("New browser QA inventory is invalid: " + "; ".join(failures))
