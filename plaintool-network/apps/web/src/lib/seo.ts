import {
  absoluteUrl,
  localizedPath,
  type ContentPage,
  type Locale,
} from "./site";

export type StructuredData = Record<string, unknown>;

export function faqSchema(
  faqs: Array<{ q: string; a: string }>,
): StructuredData {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(options: {
  locale: Locale;
  page: ContentPage;
  homeLabel: string;
  itemLabel: string;
}): StructuredData {
  const items: StructuredData[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: options.homeLabel,
      item: absoluteUrl(localizedPath(options.locale)),
    },
  ];
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: options.itemLabel,
    item: absoluteUrl(localizedPath(options.locale, options.page)),
  });
  return { "@type": "BreadcrumbList", itemListElement: items };
}

export function webApplicationSchema(options: {
  locale: Locale;
  page: ContentPage;
  name: string;
  description: string;
  features?: string[];
}): StructuredData {
  const url = absoluteUrl(localizedPath(options.locale, options.page));
  return {
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${url}#application`,
    name: options.name,
    description: options.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: options.locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(options.features?.length ? { featureList: options.features } : {}),
  };
}

export function itemListSchema(
  items: Array<{ name: string; url: string }>,
): StructuredData {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
