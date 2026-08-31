import argparse

from qa.suite import main


def _split(values: list[str] | None) -> tuple[str, ...]:
    if not values:
        return ()
    return tuple(
        item.strip()
        for value in values
        for item in value.split(",")
        if item.strip()
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run rendered PlainTool UI QA.")
    scope = parser.add_mutually_exclusive_group()
    scope.add_argument(
        "--full",
        action="store_true",
        help="Traverse every published locale instead of the representative matrix.",
    )
    scope.add_argument(
        "--affected",
        action="store_true",
        help="Use changed files to select only browser-relevant features and routes.",
    )
    parser.add_argument(
        "--changed-from",
        default="HEAD",
        metavar="GIT_REF",
        help="Compare affected files with this Git ref (default: HEAD).",
    )
    parser.add_argument(
        "--feature",
        action="append",
        metavar="ID[,ID...]",
        help="Run behavior and route QA only for these feature ids.",
    )
    parser.add_argument(
        "--locale",
        action="append",
        metavar="LOCALE[,LOCALE...]",
        help="Limit rendered QA to these published locales.",
    )
    parser.add_argument(
        "--surface",
        choices=("desktop", "mobile", "both"),
        default="both",
        help="Limit Playwright QA to one viewport class (default: both).",
    )
    parser.add_argument(
        "--routes",
        choices=("selected", "representative", "all", "none"),
        help="Override the rendered route matrix scope.",
    )
    args = parser.parse_args()
    if args.affected and (args.feature or args.locale or args.routes):
        parser.error("--affected cannot be combined with manual feature, locale, or route scope.")
    if args.full and (args.feature or args.locale or args.routes):
        parser.error("--full cannot be combined with manual feature, locale, or route scope.")
    surfaces = (
        ("desktop", "mobile") if args.surface == "both" else (args.surface,)
    )
    try:
        main(
            full=args.full,
            affected=args.affected,
            changed_from=args.changed_from,
            features=_split(args.feature),
            locales=_split(args.locale),
            surfaces=surfaces,
            route_scope=args.routes,
        )
    except (RuntimeError, ValueError) as error:
        parser.error(str(error))
