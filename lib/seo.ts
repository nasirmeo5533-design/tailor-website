import type { Metadata } from "next";

import type { Service } from "@/lib/services";
import { business, siteUrl } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  if (!path.startsWith("/")) {
    throw new Error(`buildMetadata path must start with "/": received "${path}"`);
  }

  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: "en_PK",
      type: "website",
      images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og.png`],
    },
    robots: { index: true, follow: true },
  };
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    "@id": `${siteUrl}/#business`,
    name: business.legalName,
    description: business.description,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}/og.png`,
    priceRange: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.split(",")[0] ?? business.address,
      addressLocality: business.city,
      addressCountry: "PK",
    },
    openingHours: ["Mo-Sa 10:00-21:00", "Su 12:00-18:00"],
    areaServed: business.city,
    sameAs: [business.socials.facebook, business.socials.instagram, business.socials.tiktok].filter(
      Boolean,
    ),
  };
}

export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.summary,
    provider: {
      "@type": ["LocalBusiness", "ClothingStore"],
      name: business.legalName,
      url: siteUrl,
    },
    areaServed: business.city,
    url: `${siteUrl}/services/${service.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
