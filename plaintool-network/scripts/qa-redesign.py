import argparse

from qa.suite import main


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run rendered PlainTool UI QA.")
    parser.add_argument(
        "--full",
        action="store_true",
        help="Traverse every published locale instead of the representative matrix.",
    )
    args = parser.parse_args()
    main(full=args.full)
