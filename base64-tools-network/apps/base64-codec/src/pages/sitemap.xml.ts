import type { APIRoute } from "astro";
import {
  legalPages,
  locales,
  localizedPath,
  publicToolPages,
  siteConfig,
  type ContentPage,
} from "../lib/site";

export const GET: APIRoute = () => {
  const pages: Array<ContentPage | undefined> = [
    undefined,
    ...legalPages,
    ...publicToolPages,
  ];
  const urls = pages
    .flatMap((page) =>
      locales.map((locale) => {
        const loc = new URL(localizedPath(locale, page), siteConfig.origin);
        const alternates = locales
          .map(
            (targetLocale) =>
              `<xhtml:link rel="alternate" hreflang="${targetLocale}" href="${new URL(localizedPath(targetLocale, page), siteConfig.origin)}"/>`,
          )
          .join("");
        const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${new URL(localizedPath("en", page), siteConfig.origin)}"/>`;
        return `<url><loc>${loc}</loc>${alternates}${xDefault}</url>`;
      }),
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
