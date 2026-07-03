"use client";
import { useMemo } from "react";
import Link from "next/link";
import {
  Users, Mountain, MessageSquare, Route, Star, Clock,
  AlertCircle, ArrowRight, Plus, UserPlus, CheckCircle2, TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminAnalytics, useDestinations } from "@/hooks/use-content";

const EMPTY_GROWTH = Array.from({ length: 6 }, () => ({ label: "–", value: 0 }));

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function activityIcon(action: string) {
  if (/trip|plan/i.test(action)) return Route;
  if (/review/i.test(action)) return MessageSquare;
  if (/join|sign|register/i.test(action)) return UserPlus;
  return TrendingUp;
}

export default function AdminDashboard() {
  const { data, isLoading } = useAdminAnalytics();
  const { data: allDestinations = [] } = useDestinations();

  const popular = useMemo(
    () => [...allDestinations].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5),
    [allDestinations]
  );

  const stats = data ?? {
    totalUsers: 0, totalDestinations: 0, totalReviews: 0, totalTrips: 0,
    pendingReviews: 0, avgRating: 0, userGrowthPct: null,
    userGrowth: [], recentActivity: [],
  };

  const featuredCount = allDestinations.filter((d) => d.featured).length;

  const quickActions = [
    {
      label: "Moderate reviews",
      href:  "/admin/reviews",
      icon:  MessageSquare,
      badge: stats.pendingReviews || 0,
      highlight: stats.pendingReviews > 0,
    },
    { label: "Manage users",     href: "/admin/users",         icon: Users,         badge: 0, highlight: false },
    { label: "Add destination",  href: "/admin/destinations",  icon: Plus,          badge: 0, highlight: false },
    { label: "Browse districts", href: "/admin/districts",     icon: Mountain,      badge: 0, highlight: false },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="h2 text-brand-600">Dashboard</h1>
          <p className="lead mt-1">Platform overview and real-time analytics.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/destinations">
            <Button variant="outline" size="sm"><Plus size={14} /> Add destination</Button>
          </Link>
          <Link href="/admin/reviews">
            <Button variant="accent" size="sm">
              <MessageSquare size={14} />
              {stats.pendingReviews > 0 ? `${stats.pendingReviews} pending` : "Reviews"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Pending reviews action banner */}
      {stats.pendingReviews > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <AlertCircle size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {stats.pendingReviews} review{stats.pendingReviews !== 1 ? "s" : ""} awaiting moderation
              </p>
              <p className="text-xs text-muted-foreground">Review and approve or reject user submissions</p>
            </div>
          </div>
          <Link href="/admin/reviews">
            <Button variant="accent" size="sm">Review now <ArrowRight size={14} /></Button>
          </Link>
        </div>
      )}

      {/* 6 stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total users"
          value={isLoading ? "…" : stats.totalUsers.toLocaleString()}
          icon={Users}
          accent="secondary"
          trend={stats.userGrowthPct ?? undefined}
        />
        <StatCard
          label="Destinations"
          value={isLoading ? "…" : String(stats.totalDestinations)}
          icon={Mountain}
          accent="brand"
        />
        <StatCard
          label="Total reviews"
          value={isLoading ? "…" : stats.totalReviews.toLocaleString()}
          icon={MessageSquare}
          accent="success"
        />
        <StatCard
          label="Active trips"
          value={isLoading ? "…" : stats.totalTrips.toLocaleString()}
          icon={Route}
          accent="accent"
        />
        <StatCard
          label="Avg rating"
          value={isLoading ? "…" : stats.avgRating ? `${stats.avgRating.toFixed(1)} ★` : "–"}
          icon={Star}
          accent="brand"
        />
        <StatCard
          label="Pending reviews"
          value={isLoading ? "…" : String(stats.pendingReviews)}
          icon={Clock}
          accent={stats.pendingReviews > 0 ? "accent" : "success"}
        />
      </div>

      {/* Bar chart + quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart
            title="User signups (6 months)"
            data={stats.userGrowth.length ? stats.userGrowth : EMPTY_GROWTH}
          />
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="font-display font-semibold text-brand-600">Quick actions</h3>
          <nav className="mt-4 space-y-1" aria-label="Admin quick actions">
            {quickActions.map(({ label, href, icon: Icon, badge, highlight }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  highlight
                    ? "bg-accent/10 text-accent hover:bg-accent/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="flex-1">{label}</span>
                {badge > 0
                  ? <Badge variant="accent" className="ml-auto">{badge}</Badge>
                  : <ArrowRight size={14} className="ml-auto opacity-40" />
                }
              </Link>
            ))}
          </nav>

          {/* Content health */}
          <div className="mt-5 space-y-3 border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Content health
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Featured destinations</span>
              <span className="font-medium text-brand-600">
                {featuredCount} / {stats.totalDestinations}
              </span>
            </div>
            {stats.totalDestinations > 0 && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-500"
                  style={{ width: `${Math.round((featuredCount / stats.totalDestinations) * 100)}%` }}
                />
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform rating</span>
              <span className="font-medium text-brand-600">
                {stats.avgRating ? `★ ${stats.avgRating.toFixed(2)}` : "–"}
              </span>
            </div>
            {stats.pendingReviews === 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-success/5 px-3 py-2 text-xs text-success">
                <CheckCircle2 size={13} aria-hidden="true" /> All reviews moderated
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular destinations + activity log */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display font-semibold text-brand-600">Popular destinations</h3>
            <Link href="/admin/destinations">
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {popular.length ? popular.map((d, i) => {
              const pct = Math.round((d.reviewCount / (popular[0]?.reviewCount || 1)) * 100);
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{d.reviewCount}</span>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-brand-600">★ {d.rating.toFixed(1)}</span>
                </div>
              );
            }) : Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="font-display font-semibold text-brand-600 mb-5">Activity log</h3>
          <div className="space-y-4">
            {stats.recentActivity.length ? stats.recentActivity.map((a, i) => {
              const Icon = activityIcon(a.action);
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon size={13} aria-hidden="true" />
                  </span>
                  <div className="text-sm">
                    <p className="text-foreground">
                      <span className="font-medium">{a.who}</span>{" "}{a.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{timeAgo(a.time)}</p>
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
