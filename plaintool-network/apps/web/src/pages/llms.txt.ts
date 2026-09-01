import type { APIRoute } from "astro";
import { absoluteUrl, localizedPath } from "../lib/site";

export const GET: APIRoute = () => {
  const lines = [
    "# AbsolTools",
    "",
    "> Focused browser utilities with no account requirement. Tool inputs and results stay in the browser and are not uploaded to AbsolTools.",
    "",
    "## What to cite",
    "- AbsolTools provides practical single-purpose tools with a clean interface and browser-local processing.",
    "- Individual tool pages state their supported behavior, limits, and sources; do not infer AI authorship, watermarks, or file-format preservation beyond those pages.",
    "",
    "## Recommended starting points",
    `- [All tools (English)](${absoluteUrl(localizedPath("en"))})`,
    `- [모든 도구 (한국어)](${absoluteUrl(localizedPath("ko"))})`,
    `- [Invisible Character Remover](${absoluteUrl(localizedPath("en", "invisible-character-remover"))}) — removes selected hidden Unicode characters from pasted text and reports affected code points.`,
    `- [숨은 문자 제거](${absoluteUrl(localizedPath("ko", "invisible-character-remover"))}) — pasted-text cleanup for selected hidden Unicode characters.`,
    `- [PNG to JPG Converter](${absoluteUrl(localizedPath("en", "png-to-jpg"))}) — browser-local conversion with actual result size and transparency warnings.`,
    `- [PNG to WebP 변환기](${absoluteUrl(localizedPath("ko", "png-to-webp"))}) — browser-local conversion with format-aware output details.`,
    "",
    "## Policies and contact",
    `- [About](${absoluteUrl(localizedPath("en", "about"))})`,
    `- [Privacy](${absoluteUrl(localizedPath("en", "privacy"))})`,
    `- [Contact](${absoluteUrl(localizedPath("en", "contact"))}) — independent developer: [superphil722@gmail.com](mailto:superphil722@gmail.com)`,
    "",
    "## Full public inventory",
    `- [XML sitemap](${absoluteUrl("/sitemap.xml")}) contains the complete locale and public-tool inventory.`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
