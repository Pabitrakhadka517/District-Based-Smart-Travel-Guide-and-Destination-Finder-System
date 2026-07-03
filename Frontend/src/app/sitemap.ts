import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nepayatra.com";

const staticRoutes = [
  { url: `${BASE}/`, priority: 1.0, changeFrequency: "daily" as const },
  { url: `${BASE}/search`, priority: 0.9, changeFrequency: "daily" as const },
  { url: `${BASE}/destinations`, priority: 0.9, changeFrequency: "daily" as const },
  { url: `${BASE}/festivals`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/guides`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/about`, priority: 0.5, changeFrequency: "monthly" as const },
  { url: `${BASE}/contact`, priority: 0.5, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let destinationEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/destinations?limit=500`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json() as { destinations?: { slug: string; updatedAt?: string }[] };
      destinationEntries = (data.destinations ?? []).map((d) => ({
        url: `${BASE}/destinations/${d.slug}`,
        lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Build continues even if API is unavailable
  }

  return [...staticRoutes, ...destinationEntries];
}
