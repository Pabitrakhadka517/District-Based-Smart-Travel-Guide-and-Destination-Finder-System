import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight, Clock, Wallet, Utensils, Activity, Lightbulb,
  ThumbsUp, ThumbsDown, Landmark, Soup, Star, MapPin, Gauge,
  Timer, Leaf, Sun, Flame, Snowflake, TrendingUp, CheckCircle,
  ArrowRight, BookOpen, Zap,
} from "lucide-react";
import { getDestinationFull, getDestinations } from "@/services/content";
import { GallerySlider } from "@/components/shared/gallery-slider";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { GuideActions } from "./guide-actions";
import { DestinationNav } from "./destination-nav";
import { MiniMap } from "@/components/maps/mini-map";
import { DestinationCard } from "@/components/cards/destination-card";
import { AttractionCard } from "@/components/cards/attraction-card";
import { ReviewCard } from "@/components/cards/review-card";
import { SectionHeader } from "@/components/shared/section-header";
import { WeatherSidebar } from "./weather-sidebar";
import { RatingBreakdownChart } from "./rating-breakdown";
import { TravelChecklist } from "./travel-checklist";
import { RecentlyViewedTracker } from "./recently-viewed-tracker";
import { SimilarRecommendations } from "./similar-recommendations";
import { WriteReview } from "./write-review";
import { WeatherInsightCard } from "./weather-insight";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { DIFFICULTY_STYLE, categorySolidBadge } from "@/lib/category-colors";
import type { Season } from "@/types";

/* ─── constants ───────────────────────────────────────────────────── */

const SEASON_META: Record<Season, { icon: typeof Sun; months: string; mood: string }> = {
  Spring: { icon: Leaf,      months: "Mar – May", mood: "Rhododendron blooms, clear skies, mild warmth."             },
  Summer: { icon: Sun,       months: "Jun – Aug", mood: "Monsoon lush greenery. Some high trails may close."          },
  Autumn: { icon: Flame,     months: "Sep – Nov", mood: "Crystal skies, peak trekking, Nepal's festival season."      },
  Winter: { icon: Snowflake, months: "Dec – Feb", mood: "Snow-dusted peaks, fewer crowds, budget-friendly prices."    },
};

/* ─── static generation ────────────────────────────────────────────── */

export async function generateStaticParams() {
  return (await getDestinations()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const full = await getDestinationFull(slug);
  return {
    title: full ? `${full.destination.name} – Nepal Travel Guide` : "Destination",
    description: full?.destination.tagline,
  };
}

/* ─── page ──────────────────────────────────────────────────────────── */

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const full = await getDestinationFull(slug);
  if (!full) notFound();

  const { destination: d, reviews: allReviews, nearby, ratingBreakdown, similar, nearbyAttractions } = full;
  const reviews  = allReviews.filter((r) => r.status === "approved").slice(0, 3);
  const budgetMax = Math.max(d.budget.budget, d.budget.midRange, d.budget.luxury);
  const seasons   = (["Spring", "Summer", "Autumn", "Winter"] as Season[]);

  return (
    <>
      <RecentlyViewedTracker destinationId={d.id} />

      {/* ═══════════════════════════════════════════════════════
          HERO — full-bleed cinematic header
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[78vh]" aria-label="Hero">
        <CloudinaryImage
          image={d.heroImage}
          alt={d.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* rich gradient — legible text over any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/96 via-brand-900/50 to-brand-900/10" />

        <div className="container relative flex min-h-[78vh] flex-col justify-end pb-14 text-white">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-white/55">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link href="/search" className="hover:text-white">Destinations</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{d.name}</span>
          </nav>

          {/* badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={categorySolidBadge(d.category)}>{d.category}</Badge>
            {d.difficulty && (
              <span className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
                DIFFICULTY_STYLE[d.difficulty] ?? "bg-muted text-muted-foreground",
              )}>
                <Gauge size={11} />{d.difficulty}
              </span>
            )}
            {d.trending && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                <TrendingUp size={11} />Trending
              </span>
            )}
            {d.tags.slice(0, 2).map((t) => (
              <Badge key={t} className="bg-white/15 text-white backdrop-blur-sm">{t}</Badge>
            ))}
          </div>

          {/* title + tagline */}
          <h1 className="h1 mt-4 max-w-3xl">{d.name}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">{d.tagline}</p>

          {/* rating row */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <Rating value={d.rating} />
            <span className="font-semibold">{d.rating.toFixed(1)}</span>
            <span className="text-white/60">·</span>
            <span className="text-white/70">{d.reviewCount.toLocaleString()} reviews</span>
          </div>

          {/* quick-stat pills */}
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Wallet size={14} className="text-accent" />
              From {formatCurrency(d.budget.budget)} / day
            </span>
            {d.recommendedDuration && (
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <Timer size={14} className="text-accent" />
                {d.recommendedDuration}
              </span>
            )}
            {d.bestTimeToVisit.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <Clock size={14} className="text-accent" />
                Best in {d.bestTimeToVisit.join(", ")}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6">
            <GuideActions id={d.id} dark />
          </div>
        </div>
      </section>

      {/* ── sticky section navigator ── */}
      <DestinationNav />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT (2/3) + SIDEBAR (1/3)
      ═══════════════════════════════════════════════════════ */}
      <div className="container py-10">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* ════════ MAIN COLUMN ════════ */}
          <div className="space-y-14 lg:col-span-2">

            {/* ── OVERVIEW ── */}
            <section id="overview" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="h3 text-brand-600">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{d.description}</p>

              {/* Quick Facts — 6 tiles */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FactTile icon={Clock}   label="Best time"    value={d.bestTimeToVisit.join(", ") || "Year-round"} accent="text-secondary" />
                <FactTile icon={Wallet}  label="Budget from"  value={`${formatCurrency(d.budget.budget)} / day`}  accent="text-accent"    />
                <FactTile icon={Timer}   label="Stay"         value={d.recommendedDuration || "–"}                 accent="text-success"   />
                <FactTile icon={Star}    label="Rating"       value={d.rating > 0 ? `${d.rating.toFixed(1)} / 5` : "–"} accent="text-accent" iconFill />
                <FactTile icon={Gauge}   label="Difficulty"   value={d.difficulty || "Not rated"}                  accent="text-brand-600" />
                <FactTile icon={Zap}     label="Category"     value={d.category}                                   accent="text-secondary" />
              </div>

              {/* Best Season visual */}
              <div className="mt-8">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Best seasons to visit
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {seasons.map((s) => {
                    const meta      = SEASON_META[s];
                    const Icon      = meta.icon;
                    const isRecom   = d.bestTimeToVisit.includes(s);
                    return (
                      <div
                        key={s}
                        className={cn(
                          "relative rounded-2xl border p-4 text-center transition-colors",
                          isRecom
                            ? "border-accent/40 bg-accent/5"
                            : "border-border bg-white",
                        )}
                      >
                        {isRecom && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-foreground whitespace-nowrap">
                            Best
                          </span>
                        )}
                        <span
                          className={cn(
                            "mx-auto mb-2 grid h-9 w-9 place-items-center rounded-xl",
                            isRecom ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon size={16} />
                        </span>
                        <p className={cn("font-display font-semibold", isRecom ? "text-accent" : "text-brand-600")}>
                          {s}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{meta.months}</p>
                        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">{meta.mood}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── PHOTO GALLERY ── */}
            <section id="gallery" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="h3 mb-4 text-brand-600">Photo Gallery</h2>
              <GallerySlider images={d.gallery} alt={d.name} />
            </section>

            {/* ── ESTIMATED BUDGET ── */}
            <section id="budget" aria-labelledby="budget-heading">
              <h2 id="budget-heading" className="h3 flex items-center gap-2 text-brand-600">
                <Wallet size={22} className="text-accent" /> Estimated Budget
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Average daily costs per person in {d.budget.currency}.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["Budget",    d.budget.budget,   "Basic stays, street food, shared transport."],
                    ["Mid-range", d.budget.midRange, "Comfortable hotel, restaurant meals, activities."],
                    ["Luxury",    d.budget.luxury,   "Premium resorts, private guides, fine dining."],
                  ] as [string, number, string][]
                ).map(([label, val, desc]) => (
                  <div key={label} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="mt-2 font-display text-3xl font-bold text-brand-600">
                      {formatCurrency(val)}
                    </p>
                    <p className="text-xs text-muted-foreground">per day</p>
                    <div className="my-3 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-700"
                        style={{ width: budgetMax > 0 ? `${Math.round((val / budgetMax) * 100)}%` : "0%" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── TOP ATTRACTIONS ── */}
            <section id="attractions" aria-labelledby="attractions-heading">
              <h2 id="attractions-heading" className="h3 flex items-center gap-2 text-brand-600">
                <Landmark size={22} className="text-secondary" /> Top Attractions
              </h2>
              <div className="mt-5 space-y-3">
                {d.attractions.map((a, i) => (
                  <div
                    key={a.name}
                    className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-sm font-bold text-brand-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-brand-600">{a.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── NEARBY ATTRACTIONS (from DB) ── */}
            {nearbyAttractions.length > 0 && (
              <section aria-labelledby="nearby-attractions-heading">
                <h2 id="nearby-attractions-heading" className="h3 flex items-center gap-2 text-brand-600">
                  <MapPin size={22} className="text-secondary" /> Nearby Attractions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explored {d.name}? Don't miss these nearby sites.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {nearbyAttractions.slice(0, 4).map((a) => (
                    <AttractionCard key={a.id} attraction={a} />
                  ))}
                </div>
                {nearbyAttractions.length > 4 && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    +{nearbyAttractions.length - 4} more attractions in this area.
                  </p>
                )}
              </section>
            )}

            {/* ── ACTIVITIES + LOCAL FOODS ── */}
            <div className="grid gap-8 sm:grid-cols-2">
              <section aria-labelledby="activities-heading">
                <h2 id="activities-heading" className="h3 flex items-center gap-2 text-brand-600">
                  <Activity size={20} className="text-secondary" /> Activities
                </h2>
                <ul className="mt-4 space-y-2">
                  {d.activities.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="local-foods-heading">
                <h2 id="local-foods-heading" className="h3 flex items-center gap-2 text-brand-600">
                  <Soup size={20} className="text-secondary" /> Local Foods
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.localFoods.map((f) => (
                    <Badge key={f} variant="success">{f}</Badge>
                  ))}
                </div>
              </section>
            </div>

            {/* ── WHERE TO EAT ── */}
            <section aria-labelledby="restaurants-heading">
              <h2 id="restaurants-heading" className="h3 flex items-center gap-2 text-brand-600">
                <Utensils size={20} className="text-secondary" /> Where to Eat
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.restaurants.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 shadow-soft"
                  >
                    <div>
                      <p className="font-medium text-brand-600">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.cuisine}</p>
                    </div>
                    <Badge variant="outline">{r.priceRange}</Badge>
                  </div>
                ))}
              </div>
            </section>

            {/* ── TRAVEL TIPS ── */}
            <section aria-labelledby="tips-heading" className="rounded-2xl bg-secondary/10 p-6">
              <h2 id="tips-heading" className="h3 flex items-center gap-2 text-brand-600">
                <Lightbulb size={20} className="text-accent" /> Travel Tips
              </h2>
              <ul className="mt-4 space-y-3">
                {d.travelTips.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            {/* ── TRAVEL CHECKLIST ── */}
            <TravelChecklist category={d.category} />

            {/* ── PROS & CONS ── */}
            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-2xl border border-success/30 bg-success/5 p-6">
                <h3 className="flex items-center gap-2 font-display font-semibold text-success">
                  <ThumbsUp size={18} /> What you'll love
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {d.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                <h3 className="flex items-center gap-2 font-display font-semibold text-accent">
                  <ThumbsDown size={18} /> Things to consider
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {d.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ── REVIEWS SUMMARY ── */}
            <section id="reviews" aria-labelledby="reviews-heading">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 id="reviews-heading" className="h3 text-brand-600">
                  Traveller Reviews
                </h2>
                <Link href="/reviews">
                  <Button variant="outline" size="sm">
                    All {d.reviewCount} reviews <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>

              {/* Rating overview widget */}
              {d.reviewCount > 0 && (
                <div className="mb-7 grid gap-6 sm:grid-cols-[auto_1fr] items-start">
                  {/* large score */}
                  <div className="flex flex-col items-center gap-2 rounded-3xl bg-brand-50 px-10 py-8 text-center">
                    <p className="font-display text-6xl font-bold leading-none text-brand-600">
                      {d.rating.toFixed(1)}
                    </p>
                    <Rating value={d.rating} size={18} />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Based on {d.reviewCount.toLocaleString()} reviews
                    </p>
                    <span
                      className={cn(
                        "mt-2 rounded-full px-3 py-1 text-xs font-semibold",
                        d.rating >= 4.5 ? "bg-success/10 text-success"
                        : d.rating >= 4   ? "bg-secondary/10 text-secondary"
                        : "bg-muted text-muted-foreground",
                      )}
                    >
                      {d.rating >= 4.5 ? "Exceptional" : d.rating >= 4 ? "Very Good" : "Good"}
                    </span>
                  </div>

                  {/* breakdown chart */}
                  {ratingBreakdown.length > 0 && (
                    <RatingBreakdownChart
                      breakdown={ratingBreakdown}
                      totalReviews={d.reviewCount}
                    />
                  )}
                </div>
              )}

              {/* write review CTA */}
              <div className="mb-6">
                <WriteReview destinationId={d.id} destinationName={d.name} />
              </div>

              {/* reviews list */}
              {reviews.length > 0 ? (
                <div className="grid gap-4">
                  {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}

              {allReviews.length > 3 && (
                <div className="mt-6 text-center">
                  <Link href="/reviews">
                    <Button variant="outline">
                      Read all {d.reviewCount.toLocaleString()} reviews <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* ════════ SIDEBAR ════════ */}
          <aside aria-label="Trip planning and weather">
            <div className="sticky top-[112px] space-y-5">

              {/* CTA card */}
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <h3 className="mb-1 font-display font-semibold text-brand-600">Plan Your Visit</h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Save to wishlist, share with friends, or start building your itinerary.
                </p>
                <GuideActions id={d.id} />
              </div>

              {/* Quick stats recap */}
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <h3 className="mb-4 font-display font-semibold text-brand-600">At a glance</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: "Category",    value: d.category                            },
                    { label: "Budget from", value: `${formatCurrency(d.budget.budget)} / day` },
                    { label: "Best time",   value: d.bestTimeToVisit.join(", ") || "–"   },
                    { label: "Duration",    value: d.recommendedDuration || "–"          },
                    { label: "Difficulty",  value: d.difficulty || "–"                  },
                    { label: "Rating",      value: `${d.rating.toFixed(1)} / 5 (${d.reviewCount} reviews)` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-3">
                      <dt className="shrink-0 text-muted-foreground">{label}</dt>
                      <dd className="text-right font-medium text-brand-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 7-day weather */}
              <WeatherSidebar lat={d.coordinates.lat} lng={d.coordinates.lng} />

              {/* Visit advice */}
              <WeatherInsightCard slug={slug} />

              {/* Interactive map */}
              <div
                id="map"
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
              >
                <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                  <MapPin size={16} className="text-secondary" />
                  <h3 className="font-display font-semibold text-brand-600">Location</h3>
                </div>
                <div className="p-4">
                  <MiniMap name={d.name} coordinates={d.coordinates} />
                </div>
              </div>

              {/* Tags */}
              {d.tags.length > 0 && (
                <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                  <h3 className="mb-3 font-display font-semibold text-brand-600">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          NEARBY DESTINATIONS
      ═══════════════════════════════════════════════════════ */}
      {nearby.length > 0 && (
        <section className="bg-white py-20">
          <div className="container">
            <SectionHeader
              eyebrow="Continue your journey"
              title="Nearby Destinations"
              subtitle={`More places to explore close to ${d.name}.`}
              action={
                <Link href="/search" className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline">
                  Browse all <ArrowRight size={14} />
                </Link>
              }
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((n) => <DestinationCard key={n.id} destination={n} />)}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          SIMILAR DESTINATIONS (same category)
      ═══════════════════════════════════════════════════════ */}
      {similar.length > 0 && (
        <section className="section">
          <SectionHeader
            eyebrow="You might also like"
            title={`More ${d.category} Destinations`}
            subtitle="Handpicked destinations matching the same vibe."
            action={
              <Link href={`/search?category=${d.category}`} className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline">
                See all {d.category} <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.slice(0, 4).map((s) => <DestinationCard key={s.id} destination={s} />)}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          ENGINE-SCORED RECOMMENDATIONS
      ═══════════════════════════════════════════════════════ */}
      <section className="section pt-0">
        <SimilarRecommendations slug={slug} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="mesh-brand py-14">
        <div className="container">
          <div className="flex flex-col items-center gap-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-2xl font-bold">
                Ready to visit {d.name}?
              </p>
              <p className="mt-1 max-w-md text-white/70">
                Save it to your wishlist and start building your perfect Nepal itinerary.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <GuideActions id={d.id} dark />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── FactTile — tiny helper (server component, no client needed) ──── */
function FactTile({
  icon: Icon, label, value, accent, iconFill = false,
}: {
  icon: typeof Star; label: string; value: string;
  accent?: string; iconFill?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
      <span className={cn("mt-0.5 shrink-0", accent)}>
        <Icon size={22} className={cn(iconFill && "fill-current")} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 font-semibold text-brand-600 truncate">{value}</p>
      </div>
    </div>
  );
}
