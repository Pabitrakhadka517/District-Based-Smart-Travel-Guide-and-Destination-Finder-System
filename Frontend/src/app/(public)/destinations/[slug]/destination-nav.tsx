"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#overview",    label: "Overview"    },
  { href: "#gallery",     label: "Gallery"     },
  { href: "#attractions", label: "Attractions" },
  { href: "#budget",      label: "Budget"      },
  { href: "#reviews",     label: "Reviews"     },
  { href: "#map",         label: "Location"    },
] as const;

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

export function DestinationNav() {
  const [active, setActive] = useState<string>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the topmost visible section
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
          setActive(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[64px] z-30 border-b border-border bg-white/95 backdrop-blur-sm"
    >
      <div className="container">
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-hide">
          {LINKS.map(({ href, label }) => {
            const id = href.slice(1);
            return (
              <a
                key={label}
                href={href}
                onClick={() => setActive(id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active === id
                    ? "bg-brand-600 text-white"
                    : "text-muted-foreground hover:bg-brand-50 hover:text-brand-600",
                )}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
