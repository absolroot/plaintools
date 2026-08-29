import type { APIRoute } from "astro";
import {
  absoluteUrl,
  legalPages,
  locales,
  localizedPath,
  publicToolPages,
} from "../lib/site";

export const GET: APIRoute = () => {
  const lines = [
    "# PlainTool",
    "",
    "> PlainTool provides focused browser utilities. Tool inputs and outputs are processed locally in the user's browser and are not uploaded to PlainTool.",
    "",
    "## Public tool directory",
    ...locales.map(
      (locale) => `- ${locale}: ${absoluteUrl(localizedPath(locale))}`,
    ),
    "",
    "## Public tools",
    ...publicToolPages.flatMap((page) =>
      locales.map(
        (locale) =>
          `- ${locale} ${page}: ${absoluteUrl(localizedPath(locale, page))}`,
      ),
    ),
    "",
    "## Policies and contact",
    ...locales.flatMap((locale) =>
      legalPages.map(
        (page) =>
          `- ${locale} ${page}: ${absoluteUrl(localizedPath(locale, page))}`,
      ),
    ),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
