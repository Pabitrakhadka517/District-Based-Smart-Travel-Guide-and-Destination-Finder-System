import { destinations } from "@/data/destinations";
import { districts } from "@/data/districts";
import { ok } from "@/lib/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").toLowerCase().trim();
  const category = searchParams.get("category");
  const district = searchParams.get("district");
  const minRating = Number(searchParams.get("minRating") ?? 0);
  const maxBudget = Number(searchParams.get("maxBudget") ?? Infinity);
  const sort = searchParams.get("sort") ?? "rating";

  let result = destinations.filter((d) => {
    const matchesQ = !q || [d.name, d.tagline, d.description, ...d.tags].join(" ").toLowerCase().includes(q);
    const matchesCat = !category || d.category === category;
    const matchesDistrict = !district || d.districtId === district;
    const matchesRating = d.rating >= minRating;
    const matchesBudget = d.budget.budget <= maxBudget;
    return matchesQ && matchesCat && matchesDistrict && matchesRating && matchesBudget;
  });

  if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
  if (sort === "reviews") result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
  if (sort === "price-low") result = [...result].sort((a, b) => a.budget.budget - b.budget.budget);
  if (sort === "price-high") result = [...result].sort((a, b) => b.budget.budget - a.budget.budget);

  const matchedDistricts = q ? districts.filter((d) => d.name.toLowerCase().includes(q)) : [];

  return ok({ destinations: result, districts: matchedDistricts, cities: [], total: result.length });
}
