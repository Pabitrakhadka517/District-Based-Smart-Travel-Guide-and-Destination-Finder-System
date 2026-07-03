import type { Request, Response } from "express";
import { Destination } from "../models/Destination";
import { Review } from "../models/Review";
import { Attraction } from "../models/Attraction";
import { ok, fail } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { genId } from "../utils/ids";
import { pick, qs } from "../utils/sanitize";

const DESTINATION_FIELDS = [
  "slug", "cityId", "districtId", "name", "tagline", "description", "category",
  "tags", "heroImage", "gallery", "coordinates", "rating", "reviewCount",
  "bestTimeToVisit", "budget", "attractions", "activities", "restaurants",
  "localFoods", "travelTips", "pros", "cons", "nearby", "featured", "trending",
  "difficulty", "recommendedDuration"
];

// GET /api/destinations?featured=&trending=&city=<cityId>&category=<Category>&ids=<id1,id2>
export const listDestinations = asyncHandler(async (req: Request, res: Response) => {
  const featured  = req.query.featured;
  const trending  = req.query.trending;
  const city      = qs(req.query.city);
  const category  = qs(req.query.category);
  const idsParam  = qs(req.query.ids);

  const filter: Record<string, unknown> = {};
  if (featured)  filter.featured   = true;
  if (trending)  filter.trending   = true;
  if (city)      filter.cityId     = city;
  if (category)  filter.category   = category;
  if (idsParam)  filter.id         = { $in: idsParam.split(",").map((s) => s.trim()).filter(Boolean) };

  const result = await Destination.find(filter).sort({ rating: -1 }).limit(200);
  ok(res, result);
});

// GET /api/destinations/:slug -> { destination, reviews, nearby, ratingBreakdown, similar, nearbyAttractions }
export const getDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.findOne({ slug: req.params.slug });
  if (!destination) return fail(res, "Destination not found", 404);

  const [reviews, nearby, ratingAgg, similar, nearbyAttractions] = await Promise.all([
    Review.find({ destinationId: destination.id, status: "approved" }).sort({ date: -1 }).limit(50),
    Destination.find({ id: { $in: destination.nearby } }),
    Review.aggregate<{ _id: number; count: number }>([
      { $match: { destinationId: destination.id, status: "approved" } },
      { $group: { _id: "$rating", count: { $sum: 1 } } }
    ]),
    Destination.find({ category: destination.category, id: { $ne: destination.id } })
      .sort({ rating: -1 })
      .limit(4),
    Attraction.find({ districtId: destination.districtId }).sort({ rating: -1 }).limit(6)
  ]);

  const totalReviews = ratingAgg.reduce((sum, r) => sum + r.count, 0);
  const ratingBreakdown = ratingAgg.map((r) => ({
    star:  r._id,
    count: r.count,
    pct:   totalReviews > 0 ? Math.round((r.count / totalReviews) * 100) : 0
  }));

  ok(res, { destination, reviews, nearby, ratingBreakdown, similar, nearbyAttractions });
});

// ─── Weather Insight ──────────────────────────────────────────────────────────

type WmoCondition = "Sunny" | "Clear" | "Cloudy" | "Rain" | "Snow";
type VisitAdvice  = "Go now" | "Good time" | "Off-season" | "Avoid";

function wmoCondition(code: number): WmoCondition {
  if (code === 0)           return "Sunny";
  if (code <= 2)            return "Clear";
  if (code <= 48)           return "Cloudy";
  if (code <= 67)           return "Rain";
  if (code <= 77)           return "Snow";
  if (code <= 82)           return "Rain";
  if (code <= 86)           return "Snow";
  return "Rain";
}

const SEASON_MONTHS: Record<string, number[]> = {
  Spring: [2, 3, 4],
  Summer: [5, 6, 7],
  Autumn: [8, 9, 10],
  Winter: [11, 0, 1],
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function currentSeason(): string {
  const m = new Date().getMonth();
  for (const [season, months] of Object.entries(SEASON_MONTHS)) {
    if (months.includes(m)) return season;
  }
  return "Spring";
}

function bestMonthsFromSeasons(seasons: string[]): string[] {
  const indices = new Set<number>();
  for (const s of seasons) {
    for (const m of SEASON_MONTHS[s] ?? []) indices.add(m);
  }
  return [...indices].sort((a, b) => a - b).map((i) => MONTH_NAMES[i]);
}

// GET /api/destinations/:slug/weather-insight
export const getWeatherInsight = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.findOne({ slug: req.params.slug })
    .select("coordinates bestTimeToVisit name");
  if (!destination) return fail(res, "Destination not found", 404);

  const { lat, lng } = destination.coordinates as { lat: number; lng: number };
  const bestTimeToVisit = (destination.bestTimeToVisit ?? []) as string[];

  let condition: WmoCondition = "Clear";
  let currentTemp = 0;

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lng}` +
      `&current_weather=true&timezone=Asia%2FKathmandu`;
    const weatherRes = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (weatherRes.ok) {
      const weatherJson = await weatherRes.json() as {
        current_weather: { temperature: number; weathercode: number };
      };
      condition  = wmoCondition(weatherJson.current_weather.weathercode);
      currentTemp = Math.round(weatherJson.current_weather.temperature);
    }
  } catch {
    // Weather API unavailable — still return season-based advice
  }

  const season        = currentSeason();
  const isIdealSeason = bestTimeToVisit.includes(season);
  const isWet         = condition === "Rain" || condition === "Snow";

  let visitAdvice: VisitAdvice;
  let message: string;

  if (isWet && !isIdealSeason) {
    visitAdvice = "Avoid";
    message     = "Heavy rain or snow expected and this is off-peak season. Consider rescheduling.";
  } else if (isWet) {
    visitAdvice = "Good time";
    message     = "Peak season despite current rain — trails are open but pack waterproofs.";
  } else if (isIdealSeason) {
    visitAdvice = "Go now";
    message     = `${season} is one of the best times to visit. Clear skies and comfortable temperatures.`;
  } else if (condition === "Sunny" || condition === "Clear") {
    visitAdvice = "Good time";
    message     = "Conditions are currently clear. Not peak season, but pleasant for exploration.";
  } else {
    visitAdvice = "Off-season";
    message     = "Off-peak season with overcast skies. Expect fewer crowds and lower prices.";
  }

  const bestMonths = bestMonthsFromSeasons(bestTimeToVisit);

  ok(res, { condition, currentTemp, isIdealSeason, visitAdvice, message, bestMonths });
});

// --- Admin CRUD ---

export const createDestination = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, DESTINATION_FIELDS);
  const destination = await Destination.create({ ...body, id: (body.id as string) ?? genId("p") });
  ok(res, destination, 201);
});

export const updateDestination = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, DESTINATION_FIELDS);

  // Slug uniqueness: if slug is changing, ensure no other document uses it
  if (body.slug) {
    const conflict = await Destination.findOne({ slug: body.slug, id: { $ne: req.params.id } });
    if (conflict) return fail(res, `Slug "${body.slug}" is already used by another destination.`, 409);
  }

  const destination = await Destination.findOneAndUpdate(
    { id: req.params.id },
    { $set: body },
    { new: true, runValidators: true }
  );
  if (!destination) return fail(res, "Destination not found", 404);
  ok(res, destination);
});

export const deleteDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await Destination.findOneAndDelete({ id: req.params.id });
  if (!destination) return fail(res, "Destination not found", 404);
  ok(res, { id: req.params.id, deleted: true });
});
