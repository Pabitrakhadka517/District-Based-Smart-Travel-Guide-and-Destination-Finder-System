"use client";
import { useState } from "react";
import Link from "next/link";
import {
  PenSquare, Star, CheckCircle2, Loader2, Lock, MapPinned, ChevronDown, ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { GalleryUploader } from "@/components/dashboard/image-uploader";
import { useCreateReview, usePlans } from "@/hooks/use-content";
import { useAuth } from "@/store/auth-store";
import type { CloudinaryImage } from "@/types";

const STAR_LABELS = ["", "Terrible", "Poor", "Average", "Good", "Excellent"];

export function WriteReview({ destinationId, destinationName }: {
  destinationId: string;
  destinationName: string;
}) {
  const { user, hasHydrated } = useAuth();
  const createReview = useCreateReview();
  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const hasTripForDestination = plans.some((p) => p.destinationIds.includes(destinationId));

  const [open,       setOpen]       = useState(false);
  const [rating,     setRating]     = useState(5);
  const [hover,      setHover]      = useState(0);
  const [title,      setTitle]      = useState("");
  const [body,       setBody]       = useState("");
  const [photos,     setPhotos]     = useState<CloudinaryImage[]>([]);
  const [error,      setError]      = useState<string | null>(null);
  const [submitted,  setSubmitted]  = useState(false);

  const reset = () => {
    setRating(5); setHover(0); setTitle(""); setBody("");
    setPhotos([]); setError(null);
  };

  const close = () => { setOpen(false); reset(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (body.trim().length < 20) {
      setError("Please write at least 20 characters.");
      return;
    }
    try {
      await createReview.mutateAsync({
        destinationId,
        rating,
        title: title.trim(),
        body: body.trim(),
        photos: photos.length ? photos : undefined,
      });
      setSubmitted(true);
      setOpen(false);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Try again.");
    }
  };

  /* ── submitted confirmation ── */
  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-sm text-success">
        <CheckCircle2 size={16} className="shrink-0" />
        <div>
          <p className="font-medium">Review submitted — thank you!</p>
          <p className="mt-0.5 text-xs opacity-80">It will appear here once an admin approves it.</p>
        </div>
      </div>
    );
  }

  /* ── auth store not yet hydrated from localStorage — avoid a "sign in" flash ── */
  if (!hasHydrated) {
    return <div className="h-[68px] animate-pulse rounded-2xl bg-muted/40" />;
  }

  /* ── not logged in ── */
  if (!user) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">Sign in to share your experience at {destinationName}.</p>
        <Link href="/login">
          <Button variant="outline" size="sm"><Lock size={13} /> Sign in</Button>
        </Link>
      </div>
    );
  }

  /* ── logged in but hasn't added this destination to a trip plan ── */
  if (!plansLoading && !hasTripForDestination) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">
          Add {destinationName} to a trip plan to write a review — only travelers with a plan for this destination can review it.
        </p>
        <Link href="/planner">
          <Button variant="outline" size="sm"><MapPinned size={13} /> Go to planner</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-dashed border-secondary/40 bg-secondary/5 px-5 py-4 text-sm font-medium text-secondary transition hover:bg-secondary/10"
        >
          <span className="flex items-center gap-2">
            <PenSquare size={15} />
            Write a review for {destinationName}
          </span>
          <ChevronDown size={15} />
        </button>
      )}

      {/* Inline form */}
      {open && (
        <div className="rounded-2xl border border-secondary/30 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display font-semibold text-brand-600">Your review</h3>
            <button
              onClick={close}
              aria-label="Close form"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ChevronUp size={16} />
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>
            {/* Star picker */}
            <div>
              <Label className="mb-2 block">Your rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${s} star${s !== 1 ? "s" : ""}`}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={
                        s <= (hover || rating)
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      }
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm font-medium text-muted-foreground">
                  {STAR_LABELS[hover || rating]}
                </span>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="rv-title">Title <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                id="rv-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Summarise your visit…"
                maxLength={200}
                className="mt-1"
              />
            </div>

            {/* Body */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <Label htmlFor="rv-body">Your experience <span className="text-destructive">*</span></Label>
                <span className={`text-[11px] ${body.length < 20 ? "text-muted-foreground" : "text-success"}`}>
                  {body.length} / 5000
                </span>
              </div>
              <Textarea
                id="rv-body"
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Tell other travellers about the highlights, practical tips, and what to expect…"
                rows={4}
                maxLength={5000}
                className="resize-none"
              />
              {body.length > 0 && body.length < 20 && (
                <p className="mt-1 text-xs text-muted-foreground">At least 20 characters required.</p>
              )}
            </div>

            {/* Photos */}
            <GalleryUploader
              type="review"
              value={photos}
              onChange={setPhotos}
              alt={`${destinationName} review photo`}
              label="Photos (optional)"
              max={5}
            />

            {/* Error */}
            {error && <Alert variant="error">{error}</Alert>}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                type="submit"
                variant="accent"
                disabled={createReview.isPending || body.trim().length < 20}
                className="flex-1"
              >
                {createReview.isPending
                  ? <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                  : "Submit review"}
              </Button>
              <Button type="button" variant="outline" onClick={close}>Cancel</Button>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              Reviews are reviewed by our team before appearing publicly.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
