"use client";
import { useState } from "react";
import { CheckSquare, Square, RotateCcw, ClipboardList } from "lucide-react";
import { usePackingChecklists } from "@/hooks/use-content";

export function TravelChecklist({ category }: { category: string }) {
  const { data: checklists = [] } = usePackingChecklists();
  const items = checklists.find((c) => c.category === category)?.items ?? [];
  const [checked, setChecked] = useState<Set<number>>(new Set());

  if (items.length === 0) return null;

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const doneCount = checked.size;

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-display font-semibold text-foreground">
          <ClipboardList size={18} className="text-primary" />
          Travel Checklist
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {doneCount}/{items.length} packed
          </span>
          {doneCount > 0 && (
            <button
              onClick={() => setChecked(new Set())}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
            >
              <RotateCcw size={11} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${items.length > 0 ? (doneCount / items.length) * 100 : 0}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex items-center gap-3 w-full text-left text-sm transition hover:text-foreground"
            >
              {checked.has(i) ? (
                <CheckSquare size={16} className="shrink-0 text-primary" />
              ) : (
                <Square size={16} className="shrink-0 text-muted-foreground" />
              )}
              <span className={checked.has(i) ? "line-through text-muted-foreground" : "text-foreground"}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
