import unittest
from pathlib import Path
from xml.etree import ElementTree


ASSETS = (
    Path(__file__).resolve().parents[1]
    / "apps/web/public/illustrations/tools"
)


def rectangles(icon_name: str) -> set[tuple[int, int, int, int]]:
    root = ElementTree.parse(ASSETS / f"{icon_name}.svg").getroot()
    return {
        tuple(int(element.attrib[key]) for key in ("x", "y", "width", "height"))
        for element in root.iter()
        if element.tag.endswith("rect")
        and all(key in element.attrib for key in ("x", "y", "width", "height"))
    }


class ToolIllustrationGeometryTest(unittest.TestCase):
    def test_resize_and_upscale_images_have_square_boundaries(self):
        self.assertIn((52, 12, 64, 64), rectangles("image-resizer"))
        self.assertIn((12, 60, 56, 56), rectangles("image-resizer"))
        self.assertIn((16, 36, 80, 80), rectangles("image-upscaler"))

    def test_conversion_source_and_result_are_equal_squares(self):
        paired_tools = (
            "pdf-to-image",
            "image-to-pdf",
            "csv-to-markdown",
            "markdown-to-csv",
            "json-to-csv",
            "csv-to-json",
            "html-to-markdown",
            "markdown-to-html",
            "base64-encode",
            "base64-decode",
            "url-encode",
            "url-decode",
            "jwt-decoder",
        )
        for tool in paired_tools:
            with self.subTest(tool=tool):
                shapes = rectangles(tool)
                tile_size = 44 if tool in {"pdf-to-image", "image-to-pdf"} else 64
                left = (8, 40, 44, 44) if tile_size == 44 else (8, 8, 64, 64)
                right = (76, 40, 44, 44) if tile_size == 44 else (56, 56, 64, 64)
                self.assertIn(left, shapes)
                self.assertIn(right, shapes)

    def test_shared_image_conversion_result_is_square(self):
        self.assertIn(
            (48, 48, 68, 68), rectangles("image-format-converter")
        )


if __name__ == "__main__":
    unittest.main()
