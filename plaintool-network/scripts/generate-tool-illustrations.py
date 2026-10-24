"""Build compact directory illustrations with flat purple subject and action tones.

The shapes are deliberately hand specified. Shared primitives keep dimensions
and negative space consistent without making unrelated tools look alike.
"""

from pathlib import Path


OUT = Path(__file__).resolve().parents[1] / "apps/web/public/illustrations/tools"
SUBJECT = "#B692F5"
ACTION = "#725BE8"


def r(x, y, w, h, radius=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}"/>'


def c(x, y, radius):
    return f'<circle cx="{x}" cy="{y}" r="{radius}"/>'


def p(d, rule=""):
    extra = f' fill-rule="{rule}"' if rule else ""
    return f'<path d="{d}"{extra}/>'


def label(value, x=64, y=76, size=32):
    return (
        f'<text x="{x}" y="{y}" text-anchor="middle" '
        f'font-family="Arial, Helvetica, sans-serif" font-size="{size}" '
        f'font-weight="800">{value}</text>'
    )


def right_arrow(x=54, y=56):
    return p(f"M{x} {y}h14v-10l18 18-18 18V{y+16}H{x}V{y}Z")


def document(x=20, y=12, w=88, h=104):
    return r(x, y, w, h, 8)


def photo(x=12, y=20, w=104, h=88):
    return r(x, y, w, h, 8)


def photo_holes(x=12, y=20):
    return c(x + 28, y + 26, 9) + p(
        f"M{x+8} {y+73}l28-30 20 20 12-12 28 28v9H{x+8}Z"
    )


def calendar():
    return r(12, 20, 104, 96, 8) + r(36, 8, 12, 24) + r(80, 8, 12, 24)


def calendar_header():
    return r(20, 44, 88, 8)


def two_sheets():
    return (
        p("M12 16h72v80H12V16Zm12 12v56h48V28H24Z", "evenodd")
        + r(40, 40, 76, 76, 8)
    )


PAIR_LEFT = (8, 8)
PAIR_RIGHT = (56, 56)
PAIR_SIZE = 64


def pair_body():
    return (
        r(*PAIR_LEFT, PAIR_SIZE, PAIR_SIZE, 6)
        + r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6)
    )


def file_pair(source, target):
    body = pair_body()
    holes = data_holes(source, *PAIR_LEFT) + data_holes(target, *PAIR_RIGHT)
    return body, holes


def data_holes(kind, x, y):
    if kind == "csv":
        return (
            r(x + 12, y + 12, 12, 12)
            + r(x + 36, y + 12, 12, 12)
            + r(x + 12, y + 36, 12, 12)
            + r(x + 36, y + 36, 12, 12)
        )
    if kind == "md":
        return label("M", x + 32, y + 49, 40)
    if kind == "json":
        return label("{}", x + 32, y + 49, 40)
    if kind == "html":
        return label("&lt;&gt;", x + 32, y + 48, 36)
    raise ValueError(kind)


SPECS = {}


def add(name, body, holes=""):
    if name in SPECS:
        raise ValueError(f"Duplicate icon: {name}")
    SPECS[name] = (body, holes)


# Encoding and text operations use the same source-to-result grammar.
add(
    "base64-encode",
    pair_body(),
    label("A", PAIR_LEFT[0] + 32, PAIR_LEFT[1] + 49, 44)
    + label("64", PAIR_RIGHT[0] + 32, PAIR_RIGHT[1] + 49, 36),
)
add(
    "base64-decode",
    pair_body(),
    label("64", PAIR_LEFT[0] + 32, PAIR_LEFT[1] + 49, 36)
    + label("A", PAIR_RIGHT[0] + 32, PAIR_RIGHT[1] + 49, 44),
)
add(
    "unix-timestamp-converter",
    c(64, 64, 52),
    p("M60 30h8v34l26 18-8 10-26-22V30Z"),
)
add(
    "text-compare",
    r(8, 16, 48, 96, 6) + r(72, 16, 48, 96, 6),
    r(20, 36, 24, 8)
    + r(20, 56, 24, 8)
    + r(20, 76, 16, 8)
    + r(84, 36, 24, 8)
    + r(84, 56, 16, 8)
    + r(84, 76, 24, 8),
)
add(
    "case-converter",
    p("M12 108 42 16h16l30 92H72l-7-24H35l-7 24H12Zm27-38h22L50 34 39 70Z", "evenodd")
    + c(98, 80, 18)
    + r(108, 62, 12, 46),
    c(98, 80, 8),
)
add(
    "ai-watermark-remover",
    document(),
    r(36, 36, 56, 8)
    + r(36, 52, 44, 8)
    + label("AI", 64, 96, 30),
)
add(
    "url-encode",
    pair_body(),
    label("URL", PAIR_LEFT[0] + 32, PAIR_LEFT[1] + 47, 28)
    + label("%", PAIR_RIGHT[0] + 32, PAIR_RIGHT[1] + 49, 44),
)
add(
    "url-decode",
    pair_body(),
    label("%", PAIR_LEFT[0] + 32, PAIR_LEFT[1] + 49, 44)
    + label("URL", PAIR_RIGHT[0] + 32, PAIR_RIGHT[1] + 47, 28),
)
add(
    "hash-generator",
    r(36, 12, 12, 104)
    + r(80, 12, 12, 104)
    + r(12, 40, 104, 12)
    + r(12, 76, 104, 12),
)
add(
    "uuid-generator",
    r(12, 24, 104, 80, 8),
    r(24, 40, 16, 16)
    + r(48, 40, 16, 16)
    + r(72, 40, 16, 16)
    + r(96, 40, 8, 16)
    + r(24, 72, 32, 8)
    + r(64, 72, 16, 8)
    + r(88, 72, 16, 8),
)
add(
    "regex-tester",
    c(34, 64, 11)
    + p("M77 16h12v30l24-14 6 11-26 15 26 15-6 11-24-14v30H77V70L53 84l-6-11 26-15-26-15 6-11 24 14V16Z"),
)
add(
    "jwt-decoder",
    pair_body(),
    c(PAIR_LEFT[0] + 16, PAIR_LEFT[1] + 32, 6)
    + c(PAIR_LEFT[0] + 32, PAIR_LEFT[1] + 32, 6)
    + c(PAIR_LEFT[0] + 48, PAIR_LEFT[1] + 32, 6)
    + label("{}", PAIR_RIGHT[0] + 32, PAIR_RIGHT[1] + 49, 40),
)

# The scanner frame is large enough to read at 32 px; the central finder
# and surrounding cells are all built from the same 8-unit module.
add(
    "qr-code-scanner",
    p("M8 8h36v12H20v24H8V8Zm112 0v36h-12V20H84V8h36ZM8 120V84h12v24h24v12H8Zm112 0H84v-12h24V84h12v36Z")
    + p("M44 44h40v40H44zM52 52v24h24V52z", "evenodd")
    + r(60, 60, 8, 8)
    + r(28, 60, 8, 8)
    + r(92, 60, 8, 8)
    + r(60, 28, 8, 8)
    + r(60, 92, 8, 8),
)

# Data conversion keeps the same two-sheet grammar while varying source/target.
for name, source, target in [
    ("csv-to-markdown", "csv", "md"),
    ("markdown-to-csv", "md", "csv"),
    ("json-to-csv", "json", "csv"),
    ("csv-to-json", "csv", "json"),
    ("html-to-markdown", "html", "md"),
    ("markdown-to-html", "md", "html"),
]:
    body, holes = file_pair(source, target)
    add(name, body, holes)

# Code and data formatters use aligned, spacious code structures.
add(
    "html-formatter",
    r(12, 16, 104, 96, 8),
    p("M52 40 28 64l24 24h12L40 64l24-24H52Zm24 0 24 24-24 24H64l24-24-24-24h12Z"),
)
add(
    "css-formatter",
    p("M44 12H32c-8 0-12 4-12 12v24c0 7-4 11-12 12v8c8 1 12 5 12 12v24c0 8 4 12 12 12h12v-12H32V80c0-8-3-13-10-16 7-3 10-8 10-16V24h12V12Zm40 0h12c8 0 12 4 12 12v24c0 7 4 11 12 12v8c-8 1-12 5-12 12v24c0 8-4 12-12 12H84v-12h12V80c0-8 3-13 10-16-7-3-10-8-10-16V24H84V12Z")
    + r(44, 40, 40, 8)
    + r(44, 60, 28, 8)
    + r(44, 80, 40, 8),
)
add(
    "javascript-formatter",
    r(12, 16, 104, 96, 8),
    r(28, 36, 72, 8)
    + r(28, 56, 48, 8)
    + r(28, 76, 72, 8)
    + r(80, 52, 12, 16),
)
add(
    "sql-formatter",
    p("M16 34c0-12 22-20 48-20s48 8 48 20v60c0 12-22 20-48 20S16 106 16 94V34Z"),
    p("M16 42c18 14 78 14 96 0v10c-18 14-78 14-96 0V42ZM16 72c18 14 78 14 96 0v10c-18 14-78 14-96 0V72Z"),
)
add(
    "ip-subnet-calculator",
    r(58, 28, 12, 52)
    + r(24, 74, 80, 12)
    + c(64, 24, 16)
    + c(24, 100, 16)
    + c(104, 100, 16),
    c(64, 24, 6) + c(24, 100, 6) + c(104, 100, 6),
)

# Image operations keep a picture silhouette and change only the operation.
add(
    "image-upscaler",
    photo(16, 36, 80, 80)
    + p("M68 8h52v52h-14V32L80 58 70 48l26-26H68V8Z"),
    photo_holes(16, 36),
)
add(
    "image-resizer",
    r(52, 12, 64, 64, 8)
    + photo(12, 60, 56, 56),
    p("M104 24l8 8-20 20h12v8H80V36h8v12l16-24Z")
    + c(28, 76, 5)
    + p("M20 100 36 84l12 12 8-8 4 12v8H20v-8Z"),
)
add(
    "image-crop",
    r(44, 44, 40, 40, 3),
)

# Arithmetic signs use thick, measured geometry rather than tiny numbers.
add(
    "fraction-calculator",
    r(12, 58, 104, 12)
    + r(40, 20, 48, 12)
    + r(40, 92, 48, 12),
)
add(
    "factor-calculator",
    c(64, 24, 16)
    + c(28, 100, 16)
    + c(100, 100, 16)
    + p("M58 36h12v20L36 88l-9-9 31-28V36Zm12 15 31 28-9 9-28-32 6-5Z"),
    c(64, 24, 5) + c(28, 100, 5) + c(100, 100, 5),
)
add(
    "lcm-calculator",
    p("M12 20h24v12H24v64h12v12H12V20Zm104 0H92v12h12v64H92v12h24V20Z")
    + r(40, 40, 48, 12)
    + r(40, 64, 48, 12)
    + r(56, 88, 16, 12),
)
add(
    "percentage-calculator",
    c(34, 34, 22) + c(94, 94, 22) + p("M20 110 100 16l10 10-80 94-10-10Z"),
    c(34, 34, 9) + c(94, 94, 9),
)
add(
    "bmi-calculator",
    c(64, 28, 17)
    + p("M42 52h44l14 56H28l14-56Z")
    + r(16, 108, 96, 8),
    p("M56 72h16v28H56z"),
)

# Date and time signs share calendar/clock geometry but not an identical cue.
add(
    "date-calculator",
    calendar(),
    calendar_header()
    + r(28, 64, 24, 8)
    + r(76, 64, 24, 8)
    + r(28, 88, 72, 8),
)
add(
    "dday-calculator",
    calendar(),
    calendar_header() + p("M58 60h12v24h14L64 104 44 84h14V60Z"),
)
add(
    "age-calculator",
    calendar(),
    calendar_header()
    + c(64, 70, 12)
    + p("M36 108c2-16 14-24 28-24s26 8 28 24H36Z"),
)
add(
    "time-zone-converter",
    c(36, 64, 25)
    + c(92, 64, 25)
    + p("M50 12h24V4l18 16-18 16v-8H50V12ZM78 100H54v-8l-18 16 18 16v-8h24v-16Z"),
    p("M32 48h8v16l12 8-6 8-14-11V48Zm56 0h8v16l12 8-6 8-14-11V48Z"),
)

# The PDF family inherits the larger featured documents, with separate split
# and conversion marks for the remaining routes.
add(
    "split-pdf",
    document()
    + p("M8 64 28 44v12h20v16H28v12L8 64Zm112 0-20-20v12H80v16h20v12l20-20Z"),
    r(60, 12, 8, 104) + label("P", 44, 72, 28) + label("F", 88, 72, 28),
)
add(
    "pdf-to-image",
    r(8, 40, 44, 44, 4)
    + right_arrow(52, 56)
    + r(76, 40, 44, 44, 4),
    label("P", 30, 72, 28)
    + c(90, 52, 5)
    + p("M84 72 98 58l14 14v4H84v-4Z"),
)
add(
    "image-to-pdf",
    r(8, 40, 44, 44, 4)
    + right_arrow(52, 56)
    + r(76, 40, 44, 44, 4),
    c(22, 52, 5)
    + p("M16 72 28 58l16 14v4H16v-4Z")
    + label("P", 98, 72, 28),
)

# Generator and converter marks.
add(
    "barcode-generator",
    r(12, 24, 8, 80)
    + r(28, 24, 16, 80)
    + r(52, 24, 8, 80)
    + r(68, 24, 8, 80)
    + r(84, 24, 16, 80)
    + r(108, 24, 8, 80),
)
add(
    "password-generator",
    c(40, 56, 28)
    + r(64, 50, 52, 12)
    + r(88, 62, 12, 18)
    + r(104, 62, 12, 28),
    c(40, 56, 12),
)
add(
    "unit-converter",
    p("M8 28h72V16l24 24-24 24V52H8V28Zm112 72H48v12L24 88l24-24v12h72v24Z")
    + r(20, 20, 8, 20)
    + r(100, 88, 8, 20),
)
add(
    "image-format-converter",
    p("M12 12h68v36H48v32H12V12Z")
    + r(48, 48, 68, 68, 8),
    r(24, 28, 36, 8)
    + right_arrow(64, 72),
)

# The deeper tone marks the result or the operation, never an arbitrary
# decoration. A one-piece symbol may remain a single flat tone.
ACCENTS = {
    "base64-encode": r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6),
    "base64-decode": r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6),
    "text-compare": r(72, 16, 48, 96, 6),
    "case-converter": c(98, 80, 18) + r(108, 62, 12, 46),
    "ai-watermark-remover": p("M22 104 100 18l8 8-78 86-8-8Z"),
    "url-encode": r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6),
    "url-decode": r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6),
    "jwt-decoder": r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6),
    "hash-generator": r(12, 40, 104, 12) + r(12, 76, 104, 12),
    "regex-tester": p("M77 16h12v30l24-14 6 11-26 15 26 15-6 11-24-14v30H77V70L53 84l-6-11 26-15-26-15 6-11 24 14V16Z"),
    "qr-code-scanner": p("M8 8h36v12H20v24H8V8Zm112 0v36h-12V20H84V8h36ZM8 120V84h12v24h24v12H8Zm112 0H84v-12h24V84h12v36Z"),
    "html-formatter": r(12, 16, 104, 16, 8),
    "css-formatter": r(44, 40, 40, 8) + r(44, 60, 28, 8) + r(44, 80, 40, 8),
    "javascript-formatter": r(28, 76, 72, 8),
    "ip-subnet-calculator": c(64, 24, 16) + c(24, 100, 16) + c(104, 100, 16),
    "image-upscaler": p("M68 8h52v52h-14V32L80 58 70 48l26-26H68V8Z"),
    "image-resizer": photo(12, 60, 56, 56),
    "image-crop": r(28, 8, 12, 104)
    + r(8, 28, 104, 12)
    + r(88, 28, 12, 92)
    + r(28, 88, 92, 12),
    "fraction-calculator": r(12, 58, 104, 12),
    "lcm-calculator": r(56, 88, 16, 12),
    "percentage-calculator": p("M20 110 100 16l10 10-80 94-10-10Z"),
    "bmi-calculator": r(16, 108, 96, 8),
    "date-calculator": r(36, 8, 12, 24) + r(80, 8, 12, 24),
    "dday-calculator": r(36, 8, 12, 24) + r(80, 8, 12, 24),
    "age-calculator": r(36, 8, 12, 24) + r(80, 8, 12, 24),
    "time-zone-converter": c(92, 64, 25),
    "split-pdf": r(68, 12, 40, 104, 8),
    "pdf-to-image": r(76, 40, 44, 44, 4) + right_arrow(52, 56),
    "image-to-pdf": r(76, 40, 44, 44, 4) + right_arrow(52, 56),
    "barcode-generator": r(28, 24, 16, 80) + r(68, 24, 8, 80) + r(108, 24, 8, 80),
    "password-generator": r(64, 50, 52, 12) + r(88, 62, 12, 18) + r(104, 62, 12, 28),
    "unit-converter": p("M120 100H48v12L24 88l24-24v12h72v24Z"),
    "image-format-converter": r(48, 48, 68, 68, 8),
}
for conversion in (
    "csv-to-markdown",
    "markdown-to-csv",
    "json-to-csv",
    "csv-to-json",
    "html-to-markdown",
    "markdown-to-html",
):
    ACCENTS[conversion] = r(*PAIR_RIGHT, PAIR_SIZE, PAIR_SIZE, 6)


def write_icon(name, body, holes):
    if holes:
        mask = (
            '<mask id="cut" maskUnits="userSpaceOnUse" '
            'x="0" y="0" width="128" height="128">'
            '<rect width="128" height="128" fill="#fff"/>'
            f'<g fill="#000">{holes}</g></mask>'
        )
        mask_attribute = ' mask="url(#cut)"'
    else:
        mask = ""
        mask_attribute = ""
    foreground = (
        f'<g fill="{SUBJECT}">{body}</g>'
        + (f'<g fill="{ACTION}">{ACCENTS[name]}</g>' if name in ACCENTS else "")
    )
    source = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" '
        'width="128" height="128">\n'
        f'  <defs>{mask}</defs>\n'
        f'  <g{mask_attribute}>{foreground}</g>\n'
        '</svg>\n'
    )
    (OUT / f"{name}.svg").write_text(source, encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (body, holes) in SPECS.items():
        write_icon(name, body, holes)
    print(f"Generated {len(SPECS)} compact illustrations in {OUT}")


if __name__ == "__main__":
    main()
