import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight, Clock, Ticket, MapPin, Star, Utensils,
  Lightbulb, Activity, BookOpen, CalendarDays, Hotel
} from "lucide-react";
import { getAttraction, getAttractions } from "@/services/content";
import { AttractionActions } from "./attraction-actions";
import { AttractionCard } from "@/components/cards/attraction-card";
import { GallerySlider } from "@/components/shared/gallery-slider";
import { MiniMap } from "@/components/maps/mini-map";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { categorySolidBadge } from "@/lib/category-colors";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const attractions = await getAttractions();
  return attractions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getAttraction(slug);
  return {
    title: result?.attraction?.name ?? "Attraction",
    description: result?.attraction?.tagline,
  };
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getAttraction(slug);
  if (!result) notFound();
  const { attraction: a, nearby } = result;

  return (
    <article className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/districts" className="hover:text-secondary">Districts</Link>
        <ChevronRight size={14} />
        <Link href={`/districts/${a.districtId}`} className="hover:text-secondary">Attractions</Link>
        <ChevronRight size={14} />
        <span className="text-foreground">{a.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn(categorySolidBadge(a.category))}>{a.category}</Badge>
            {a.bestTimeToVisit.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>
          <h1 className="h1 mt-3 text-brand-600">{a.name}</h1>
          <p className="lead mt-1">{a.tagline}</p>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <Rating value={a.rating} showValue />
            {a.reviewCount > 0 && (
              <span className="text-muted-foreground">· {a.reviewCount.toLocaleString()} reviews</span>
            )}
          </div>
        </div>
        <AttractionActions id={a.id} />
      </div>

      {/* Hero image */}
      <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
        <Image src={a.heroImage} alt={a.name} fill priority className="object-cover" />
      </div>

      {/* Gallery */}
      {a.gallery.length > 0 && (
        <div className="mt-4">
          <GallerySlider images={a.gallery} alt={a.name} />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* MAIN CONTENT */}
        <div className="space-y-10 lg:col-span-2">

          {/* Overview */}
          <section>
            <h2 className="h3 text-brand-600">Overview</h2>
            <p className="mt-3 text-muted-foreground">{a.description}</p>
          </section>

          {/* Quick facts */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <Clock className="text-secondary" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Opening hours</p>
              <p className="mt-1 font-medium text-brand-600">{a.openingHours || "Open daily"}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <Ticket className="text-accent" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Entry (foreigner)</p>
              <p className="mt-1 font-medium text-brand-600">
                {a.entryFee?.foreigner ? `NPR ${a.entryFee.foreigner}` : "Free"}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <Star className="fill-accent text-accent" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Rating</p>
              <p className="mt-1 font-medium text-brand-600">{a.rating} / 5</p>
            </div>
          </div>

          {/* History */}
          {a.history && (
            <section>
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <BookOpen size={20} /> History &amp; Significance
              </h2>
              <p className="mt-3 text-muted-foreground">{a.history}</p>
            </section>
          )}

          {/* Entry fees table */}
          <section className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <h2 className="mb-4 flex items-center gap-2 font-display font-semibold text-brand-600">
              <Ticket size={20} /> Visitor Information
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Opening Hours</p>
                <p className="flex items-center gap-2 font-medium text-brand-600">
                  <Clock size={16} className="text-secondary" />
                  {a.openingHours || "Open daily"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Entry Fees</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nepali</span>
                    <span className="font-medium">{a.entryFee?.nepali ? `NPR ${a.entryFee.nepali}` : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SAARC nationals</span>
                    <span className="font-medium">{a.entryFee?.saarc ? `NPR ${a.entryFee.saarc}` : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Foreign visitors</span>
                    <span className="font-medium">{a.entryFee?.foreigner ? `NPR ${a.entryFee.foreigner}` : "Free"}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities */}
          {a.activities.length > 0 && (
            <section>
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <Activity size={20} /> Things to do
              </h2>
              <ul className="mt-4 space-y-2">
                {a.activities.map((act) => (
                  <li key={act} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {act}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Local foods */}
          {a.localFoods.length > 0 && (
            <section>
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <Utensils size={20} /> Local foods to try
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {a.localFoods.map((f) => (
                  <Badge key={f} variant="success">{f}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Travel tips */}
          {a.travelTips.length > 0 && (
            <section className="rounded-2xl bg-secondary/10 p-6">
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <Lightbulb size={20} /> Travel tips
              </h2>
              <ul className="mt-4 space-y-2">
                {a.travelTips.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-foreground">
                    <Lightbulb size={15} className="mt-0.5 shrink-0 text-accent" /> {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Nearby hotels */}
          {a.nearbyHotels.length > 0 && (
            <section>
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <Hotel size={20} /> Hotels nearby
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {a.nearbyHotels.map((h) => (
                  <div
                    key={h.name}
                    className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 shadow-soft"
                  >
                    <div>
                      <p className="font-medium text-brand-600">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{"★".repeat(h.stars)} {h.stars}-star</p>
                    </div>
                    <Badge variant="outline">{h.priceRange}</Badge>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nearby restaurants */}
          {a.nearbyRestaurants.length > 0 && (
            <section>
              <h2 className="h3 flex items-center gap-2 text-brand-600">
                <Utensils size={20} /> Where to eat
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {a.nearbyRestaurants.map((r) => (
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
          )}
        </div>

        {/* SIDEBAR */}
        <aside>
          <div className="sticky top-20 space-y-6">
            {/* Best time */}
            {a.bestTimeToVisit.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <h3 className="mb-3 flex items-center gap-2 font-display font-semibold text-brand-600">
                  <CalendarDays size={18} /> Best time to visit
                </h3>
                <div className="flex flex-wrap gap-2">
                  {a.bestTimeToVisit.map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <h3 className="mb-3 flex items-center gap-2 font-display font-semibold text-brand-600">
                <MapPin size={18} /> Location
              </h3>
              <MiniMap name={a.name} coordinates={a.coordinates} />
            </div>

            {/* Quick entry info */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <h3 className="mb-3 font-display font-semibold text-brand-600">At a glance</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Hours</dt>
                  <dd className="font-medium text-right max-w-[60%]">{a.openingHours || "Open daily"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Entry (foreigner)</dt>
                  <dd className="font-medium">{a.entryFee?.foreigner ? `NPR ${a.entryFee.foreigner}` : "Free"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rating</dt>
                  <dd className="font-medium">{a.rating} / 5</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium text-right max-w-[55%]">{a.category}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {/* Nearby attractions */}
      {nearby.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="Nearby attractions" subtitle="Continue your exploration." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((n) => (
              <AttractionCard key={n.id} attraction={n} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
