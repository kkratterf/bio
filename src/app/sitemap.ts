import type { MetadataRoute } from "next";
import { lastUpdated, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/images/avatar.jpg`],
    },
  ];
}
