import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://robertocorvalan.com",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://robertocorvalan.com/privacidad",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://robertocorvalan.com/terminos",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
