"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Star, PenSquare, Loader2, CheckCircle2, Lock,
  ShieldCheck, Camera, SlidersHorizontal, ArrowUpDown,
  X, ChevronDown, ImagePlus, ThumbsUp,
} from "lucide-react";
import type { Review } from "@/types";
import { ReviewCard } from "@/components/cards/review-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useCreateReview, useDestinations } from "@/hooks/use-content";
import { useAuth } from "@/store/auth-store";

/* ── types ───────────────────────────────────────────────────────────────── */

type SortKey  = "helpful" | "recent" | "highest" | "lowest";
type StarFilter = 1 | 2 | 3 | 4 | 5 | null;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "helpful",  label: "Most helpful"  },
  { value: "recent",   label: "Most recent"   },
  { value: "highest",  label: "Highest rated" },
  { value: "lowest",   label: "Lowest rated"  },
];

/* ── helpers ─────────────────────────────────────────────────────────────── */

function computeStats(reviews: Review[]) {
  const total    = reviews.length;
  const avg      = total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, pct: total > 0 ? (count / total) * 100 : 0 };
  });
  const positivePct     = total > 0 ? Math.round((reviews.filter((r) => r.rating >= 4).length / total) * 100) : 0;
  const verifiedCount   = reviews.filter((r) => r.verifiedTraveler).length;
  const withPhotosCount = reviews.filter((r) => (r.photos?.length ?? 0) > 0).length;
  const mostHelpful     = reviews.reduce((best, r) => (r.helpful > (best?.helpful ?? -1) ? r : best), reviews[0]);
  return { total, avg, breakdown, positivePct, verifiedCount, withPhotosCount, mostHelpful };
}

/* ── StarBar ─────────────────────────────────────────────────────────────── */

function StarBar({
  star, count, pct, active, onClick,
}: {
  star: number; count: number; pct: number; active: boolean; onClick: () => void;
}) {
  const barColor =
    star === 5 ? "bg-success"
    : star === 4 ? "bg-forest"
    : star === 3 ? "bg-warning"
    : star === 2 ? "bg-accent"
    : "bg-destructive";

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all",
        active ? "bg-brand-50 ring-1 ring-brand-200" : "hover:bg-muted/60"
      )}
    >
      <span className="flex w-14 items-center gap-0.5 text-xs font-medium text-muted-foreground">
        {star}<Star size={10} className="fill-accent text-accent" />
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs text-muted-foreground">{count}</span>
      <span className="w-8 text-right text-xs text-muted-foreground">{Math.round(pct)}%</span>
    </button>
  );
}

/* ── ReviewsClient ───────────────────────────────────────────────────────── */

export function ReviewsClient({ reviews }: { reviews: Review[] }) {
  const { user }     = useAuth();
  const loggedIn     = !!user;
  const createReview = useCreateReview();
  const { data: allDestinations = [] } = useDestinations();

  /* ── list state ── */
  const [list, setList] = useState<Review[]>(reviews);

  /* ── filter / sort state ── */
  const [sort, setSort]           = useState<SortKey>("helpful");
  const [starFilter, setStarFilter] = useState<StarFilter>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [photosOnly, setPhotosOnly]     = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  /* ── form state ── */
  const [formOpen, setFormOpen]     = useState(false);
  const [rating, setRating]         = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle]           = useState("");
  const [body, setBody]             = useState("");
  const [destinationId, setDestId]  = useState("");
  const [photoUrls, setPhotoUrls]   = useState(["", "", ""]);
  const [error, setError]           = useState<string | null>(null);
  const [success, setSuccess]       = useState(false);

  /* ── computed stats from full list ── */
  const stats = useMemo(() => computeStats(list), [list]);

  /* ── filtered + sorted list ── */
  const visible = useMemo(() => {
    let r = [...list];
    if (starFilter !== null) r = r.filter((rv) => rv.rating === starFilter);
    if (verifiedOnly)        r = r.filter((rv) => rv.verifiedTraveler);
    if (photosOnly)          r = r.filter((rv) => (rv.photos?.length ?? 0) > 0);
    switch (sort) {
      case "helpful":  r.sort((a, b) => b.helpful - a.helpful);                                   break;
      case "recent":   r.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break;
      case "highest":  r.sort((a, b) => b.rating - a.rating);                                     break;
      case "lowest":   r.sort((a, b) => a.rating - b.rating);                                     break;
    }
    return r;
  }, [list, sort, starFilter, verifiedOnly, photosOnly]);

  const activeFilterCount =
    (starFilter !== null ? 1 : 0) + (verifiedOnly ? 1 : 0) + (photosOnly ? 1 : 0);

  const clearFilters = () => { setStarFilter(null); setVerifiedOnly(false); setPhotosOnly(false); };

  /* ── form helpers ── */
  const resetForm = () => {
    setTitle(""); setBody(""); setRating(5); setHoverRating(0);
    setDestId(""); setPhotoUrls(["", "", ""]); setError(null);
  };

  const updatePhotoUrl = (i: number, val: string) =>
    setPhotoUrls((prev) => prev.map((u, idx) => (idx === i ? val : u)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!destinationId) { setError("Please select a destination."); return; }
    if (body.trim().length < 20) { setError("Review must be at least 20 characters."); return; }

    const filteredPhotos = photoUrls.filter((u) => u.trim());

    try {
      const created = await createReview.mutateAsync({
        destinationId,
        rating,
        title: title.trim(),
        body: body.trim(),
        photos: filteredPhotos.length > 0 ? filteredPhotos : undefined,
      });
      setList([created, ...list]);
      setSuccess(true);
      setFormOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  };

  /* ── destination name lookup ── */
  const destName = (id: string) =>
    allDestinations.find((d) => d.id === id)?.name ?? id;

  /* ── active sort label ── */
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <section className="container py-10 space-y-8">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="kicker text-muted-foreground">Community</span>
          <h1 className="mt-1 h2 text-brand-600">Traveller Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real experiences from {stats.total} verified Nepal travellers
          </p>
        </div>
        {loggedIn ? (
          <Button
            variant="accent"
            onClick={() => { setFormOpen((v) => !v); setSuccess(false); resetForm(); }}
          >
            <PenSquare size={16} /> Write a review
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="outline"><Lock size={15} /> Sign in to review</Button>
          </Link>
        )}
      </div>

      {/* ── Success banner ── */}
      {success && (
        <div className="flex items-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-5 py-3.5 text-sm text-success">
          <CheckCircle2 size={16} className="shrink-0" />
          Your review has been submitted and is pending approval — thank you!
        </div>
      )}

      {/* ── Review Statistics ── */}
      <div className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
        {/* Top: score + breakdown */}
        <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr]">
          {/* Score */}
          <div className="flex flex-col items-center justify-center gap-2 md:border-r md:border-border">
            <p className="font-display text-6xl font-bold text-brand-600">{stats.avg.toFixed(1)}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className={i <= Math.round(stats.avg) ? "fill-accent text-accent" : "fill-muted text-muted"}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {stats.total} review{stats.total !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Breakdown bars (clickable filters) */}
          <div className="flex flex-col justify-center gap-0.5">
            {stats.breakdown.map((b) => (
              <StarBar
                key={b.star}
                star={b.star}
                count={b.count}
                pct={b.pct}
                active={starFilter === b.star}
                onClick={() => setStarFilter(starFilter === b.star ? null : (b.star as StarFilter))}
              />
            ))}
          </div>
        </div>

        {/* Trust metrics strip */}
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
          <div className="flex flex-col items-center gap-1 px-4 py-3 text-center">
            <p className="font-display text-xl font-bold text-success">{stats.positivePct}%</p>
            <p className="text-xs text-muted-foreground">Positive (4★+)</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-3 text-center">
            <div className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-success" />
              <p className="font-display text-xl font-bold text-success">{stats.verifiedCount}</p>
            </div>
            <p className="text-xs text-muted-foreground">Verified travelers</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-3 text-center">
            <div className="flex items-center gap-1">
              <Camera size={14} className="text-brand-600" />
              <p className="font-display text-xl font-bold text-brand-600">{stats.withPhotosCount}</p>
            </div>
            <p className="text-xs text-muted-foreground">With photos</p>
          </div>
        </div>
      </div>

      {/* ── Most helpful highlight ── */}
      {stats.mostHelpful && stats.total > 3 && (
        <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
            <ThumbsUp size={12} /> Most helpful review
          </p>
          <ReviewCard
            review={stats.mostHelpful}
            destinationName={destName(stats.mostHelpful.destinationId)}
            compact
          />
        </div>
      )}

      {/* ── Write review form ── */}
      {formOpen && loggedIn && (
        <form
          onSubmit={submit}
          className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-soft"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-brand-600">Share your experience</h3>
            <button type="button" onClick={() => { setFormOpen(false); resetForm(); }}
              className="text-muted-foreground hover:text-foreground transition">
              <X size={18} />
            </button>
          </div>

          {/* Star picker */}
          <div>
            <Label className="mb-2 block">Your rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${i} star${i > 1 ? "s" : ""}`}
                >
                  <Star
                    size={30}
                    className={cn(
                      "transition hover:scale-110",
                      i <= (hoverRating || rating) ? "fill-accent text-accent" : "fill-muted text-muted"
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {hoverRating ? ["","Terrible","Poor","Average","Good","Excellent"][hoverRating]
                             : ["","Terrible","Poor","Average","Good","Excellent"][rating]}
              </span>
            </div>
          </div>

          {/* Destination + title */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="dest-pick" className="mb-1 block">Destination</Label>
              <select
                id="dest-pick"
                required
                value={destinationId}
                onChange={(e) => setDestId(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a destination…</option>
                {allDestinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="rev-title" className="mb-1 block">Title</Label>
              <Input
                id="rev-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A wonderful experience…"
                required
              />
            </div>
          </div>

          {/* Review body */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <Label htmlFor="rev-body">Review</Label>
              <span className={cn(
                "text-xs",
                body.length < 20 ? "text-muted-foreground" : "text-success"
              )}>
                {body.length} chars {body.length < 20 && `(${20 - body.length} more to go)`}
              </span>
            </div>
            <Textarea
              id="rev-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell other travellers about your visit — what did you love, what surprised you, what should others know?"
              rows={4}
              required
            />
          </div>

          {/* Photo URLs */}
          <div>
            <Label className="mb-1 flex items-center gap-1.5">
              <Camera size={13} /> Photos <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <p className="mb-2 text-xs text-muted-foreground">Paste up to 3 photo URLs from your trip</p>
            <div className="space-y-2">
              {photoUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <ImagePlus size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updatePhotoUrl(i, e.target.value)}
                      placeholder={`Photo URL ${i + 1}…`}
                      className="h-9 w-full rounded-xl border border-border bg-white py-2 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  {url && (
                    <button
                      type="button"
                      onClick={() => updatePhotoUrl(i, "")}
                      className="shrink-0 text-muted-foreground hover:text-destructive transition"
                      aria-label="Clear URL"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && <Alert variant="error">{error}</Alert>}

          <div className="flex items-center gap-3">
            <Button type="submit" variant="accent" disabled={createReview.isPending}>
              {createReview.isPending
                ? <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                : "Submit review"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => { setFormOpen(false); resetForm(); }}>
              Cancel
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Reviews are moderated before appearing publicly. Thank you for contributing!
          </p>
        </form>
      )}

      {/* ── Filter + Sort toolbar ── */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter label */}
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <SlidersHorizontal size={14} /> Filter
          </span>

          {/* Star filter chips */}
          {[5, 4, 3, 2, 1].map((s) => {
            const count = stats.breakdown.find((b) => b.star === s)?.count ?? 0;
            if (count === 0) return null;
            return (
              <button
                key={s}
                onClick={() => setStarFilter(starFilter === s ? null : (s as StarFilter))}
                className={cn(
                  "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition",
                  starFilter === s
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-muted-foreground hover:border-accent/40"
                )}
              >
                {s}<Star size={10} className={starFilter === s ? "fill-accent text-accent" : "fill-muted text-muted"} />
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}

          {/* Verified only */}
          <button
            onClick={() => setVerifiedOnly((v) => !v)}
            className={cn(
              "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition",
              verifiedOnly
                ? "border-success/30 bg-success/10 text-success"
                : "border-border bg-white text-muted-foreground hover:border-success/20"
            )}
          >
            <ShieldCheck size={11} />
            Verified ({stats.verifiedCount})
          </button>

          {/* With photos */}
          <button
            onClick={() => setPhotosOnly((v) => !v)}
            className={cn(
              "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition",
              photosOnly
                ? "border-brand-300 bg-brand-50 text-brand-600"
                : "border-border bg-white text-muted-foreground hover:border-brand-200"
            )}
          >
            <Camera size={11} />
            With photos ({stats.withPhotosCount})
          </button>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-destructive transition hover:bg-destructive/5"
            >
              <X size={11} /> Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}

          {/* Sort dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
            >
              <ArrowUpDown size={12} />
              {activeSortLabel}
              <ChevronDown size={11} className={cn("transition", showSortMenu && "rotate-180")} />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-border bg-white shadow-card">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSortMenu(false); }}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-muted",
                      sort === opt.value ? "font-semibold text-accent" : "text-foreground"
                    )}
                  >
                    {sort === opt.value && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground">
          {visible.length === list.length
            ? `Showing all ${list.length} reviews`
            : `Showing ${visible.length} of ${list.length} reviews`}
          {activeFilterCount > 0 && " with active filters"}
        </p>
      </div>

      {/* ── Review list ── */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white py-16 text-center">
          <p className="font-display font-semibold text-foreground">No reviews match your filters</p>
          <p className="text-sm text-muted-foreground">Try adjusting or clearing the active filters.</p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X size={13} /> Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              destinationName={destName(r.destinationId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
