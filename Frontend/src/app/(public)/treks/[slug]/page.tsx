import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Clock, TrendingUp, Mountain, Route, Star, FileCheck, CalendarDays, Wallet, MapPin } from "lucide-react";
import { getTrek, getTreks } from "@/services/content";
import { GallerySlider } from "@/components/shared/gallery-slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/shared/cta-section";
import { TrekCard } from "@/components/cards/trek-card";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() { return (await getTreks()).map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const t = await getTrek(slug);
  return { title: t?.name ?? "Trek", description: t?.tagline };
}

export default async function TrekDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTrek(slug);
  if (!t) notFound();
  const others = await (await getTreks()).filter((x) => x.id !== t.id).slice(0, 3);

  const facts = [
    { icon: Clock, label: "Duration", value: `${t.durationDays} days` },
    { icon: TrendingUp, label: "Max altitude", value: `${t.maxAltitude.toLocaleString()} m` },
    { icon: Route, label: "Distance", value: `${t.distanceKm} km` },
    { icon: Mountain, label: "Difficulty", value: t.difficulty },
    { icon: CalendarDays, label: "Best seasons", value: t.bestSeasons.join(", ") },
    { icon: Wallet, label: "From", value: formatCurrency(t.priceFrom) }
  ];

  return (
    <article className="container py-8">
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/treks" className="hover:text-secondary">Treks</Link><ChevronRight size={14} /><span className="text-foreground">{t.name}</span>
      </nav>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{t.region}</p>
          <h1 className="h1 mt-1 text-brand-600">{t.name}</h1>
          <p className="lead mt-2">{t.tagline}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 font-semibold text-brand-600"><Star size={15} className="fill-accent text-accent" /> {t.rating.toFixed(1)}</span>
          </div>
        </div>
        <Link href="/planner"><Button variant="accent" size="lg">Plan this trek</Button></Link>
      </div>

      <GallerySlider images={t.gallery} alt={t.name} />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft">
            <f.icon className="text-secondary" size={18} />
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
            <p className="text-sm font-semibold text-brand-600">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="h3 text-brand-600">Overview</h2>
            <p className="mt-3 text-muted-foreground">{t.description}</p>
          </section>

          {/* itinerary timeline */}
          <section>
            <h2 className="h3 flex items-center gap-2 text-brand-600"><CalendarDays size={20} /> Itinerary</h2>
            <div className="mt-5 space-y-4 border-l-2 border-border pl-6">
              {t.itinerary.map((d) => (
                <div key={d.day} className="relative">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold ring-2 ring-secondary text-secondary">{d.day}</span>
                  <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-brand-600">{d.title}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><TrendingUp size={12} /> {d.altitude}m</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {d.hours}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-soft">
              <h3 className="font-display font-semibold text-brand-600">Highlights</h3>
              <ul className="mt-3 space-y-2">
                {t.highlights.map((h) => <li key={h} className="flex gap-2 text-sm text-muted-foreground"><MapPin size={15} className="mt-0.5 shrink-0 text-accent" /> {h}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-display font-semibold text-brand-600"><FileCheck size={18} /> Permits required</h3>
              <div className="mt-3 flex flex-wrap gap-2">{t.permits.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <h2 className="h3 mb-6 text-brand-600">Other popular treks</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{others.map((o) => <TrekCard key={o.id} trek={o} />)}</div>
      </div>

      <div className="mt-16"><CTASection title="Ready to hit the trail?" subtitle="Build a day-by-day plan and budget for your trek." primary={{ label: "Open trip planner", href: "/planner" }} secondary={{ label: "Check the weather", href: "/weather" }} /></div>
    </article>
  );
}
