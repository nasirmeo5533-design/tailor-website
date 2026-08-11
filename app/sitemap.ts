import type { MetadataRoute } from "next";

import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

type SitemapEntry = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const staticRoutes: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/book", changeFrequency: "monthly", priority: 0.6 },
  { path: "/schedule-call", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.6 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.6 },
  { path: "/booking-policy", changeFrequency: "monthly", priority: 0.6 },
];

const serviceRoutes: SitemapEntry[] = services.map((service) => ({
  path: `/services/${service.slug}`,
  changeFrequency: "monthly",
  priority: 0.8,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
