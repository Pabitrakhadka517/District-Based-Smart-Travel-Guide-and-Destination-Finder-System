"use client";
import { useState } from "react";
import { CheckSquare, Square, Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { nanoid } from "./planner-utils";
import { CHECKLIST_CATEGORY_STYLE } from "@/lib/category-colors";
import type { ChecklistItem, TravelType } from "@/types";

/* ---- Default checklists by travel type ---------------------------------- */

type DefaultItem = { text: string; category: string };

export const DEFAULT_CHECKLIST: Record<TravelType, DefaultItem[]> = {
  Adventure: [
    { text: "Passport / National ID",                 category: "Documents" },
    { text: "Travel insurance policy",                category: "Documents" },
    { text: "Emergency contacts written down",         category: "Documents" },
    { text: "Accommodation confirmed",                 category: "Booking"   },
    { text: "Transportation booked",                  category: "Booking"   },
    { text: "Adventure activities pre-booked",         category: "Booking"   },
    { text: "First aid kit",                          category: "Packing"   },
    { text: "Camera & charger",                       category: "Packing"   },
    { text: "Comfortable walking shoes",              category: "Packing"   },
    { text: "Weather-appropriate clothing",           category: "Packing"   },
    { text: "Download offline maps",                  category: "Safety"    },
    { text: "Share itinerary with family",            category: "Safety"    },
    { text: "Emergency cash (USD)",                   category: "Safety"    },
  ],
  Trekking: [
    { text: "TIMS card obtained",                          category: "Documents" },
    { text: "National park permit",                        category: "Documents" },
    { text: "Travel insurance (medical evacuation)",       category: "Documents" },
    { text: "Guide / porter arranged",                     category: "Booking"   },
    { text: "Tea house / lodge route planned",             category: "Booking"   },
    { text: "Trekking boots (broken in)",                  category: "Packing"   },
    { text: "Trekking poles",                              category: "Packing"   },
    { text: "Warm base layers",                            category: "Packing"   },
    { text: "Rain jacket & waterproofs",                   category: "Packing"   },
    { text: "Headlamp & spare batteries",                  category: "Packing"   },
    { text: "Water purification tablets / filter",         category: "Packing"   },
    { text: "Altitude sickness medication (Diamox)",       category: "Safety"    },
    { text: "Check weather forecast before departure",     category: "Safety"    },
    { text: "Inform guesthouse of expected return date",   category: "Safety"    },
  ],
  Cultural: [
    { text: "Passport / National ID",                     category: "Documents" },
    { text: "Travel insurance",                           category: "Documents" },
    { text: "Museum & heritage site passes",              category: "Booking"   },
    { text: "Guided tours booked",                        category: "Booking"   },
    { text: "Local festival calendar checked",            category: "Booking"   },
    { text: "Modest clothing for temples & sites",        category: "Packing"   },
    { text: "Camera (check no-photography zones)",        category: "Packing"   },
    { text: "Comfortable walking shoes",                  category: "Packing"   },
    { text: "Respect local customs & dress codes",        category: "Safety"    },
    { text: "Download translation app",                   category: "Safety"    },
  ],
  Religious: [
    { text: "Passport / National ID",                     category: "Documents" },
    { text: "Pilgrimage site entry permits",              category: "Documents" },
    { text: "Travel insurance",                           category: "Documents" },
    { text: "Puja dates & times confirmed",               category: "Booking"   },
    { text: "Accommodation near sacred sites",            category: "Booking"   },
    { text: "Clean modest clothing",                      category: "Packing"   },
    { text: "Head covering",                              category: "Packing"   },
    { text: "Comfortable sandals / slip-on shoes",        category: "Packing"   },
    { text: "Research dress codes at each temple",        category: "Safety"    },
    { text: "No leather items in certain Hindu temples",  category: "Safety"    },
  ],
  Family: [
    { text: "All passports / IDs (incl. children)",       category: "Documents" },
    { text: "Travel insurance for all members",           category: "Documents" },
    { text: "Children's prescriptions & medical records", category: "Documents" },
    { text: "Family-friendly accommodation booked",       category: "Booking"   },
    { text: "Age-appropriate activities arranged",        category: "Booking"   },
    { text: "Snacks & reusable water bottles",            category: "Packing"   },
    { text: "Sunscreen & insect repellent",               category: "Packing"   },
    { text: "Entertainment for travel days",              category: "Packing"   },
    { text: "First aid kit (child dosages)",              category: "Packing"   },
    { text: "Family meeting point agreed",                category: "Safety"    },
    { text: "Children know emergency contact number",     category: "Safety"    },
  ],
  Wildlife: [
    { text: "Passport / National ID",                     category: "Documents" },
    { text: "National park entry permits",                category: "Documents" },
    { text: "Travel insurance (incl. evacuation)",        category: "Documents" },
    { text: "Jungle lodge / camp booked",                 category: "Booking"   },
    { text: "Safari vehicle & expert guide arranged",     category: "Booking"   },
    { text: "Neutral / dark-coloured clothing",           category: "Packing"   },
    { text: "Binoculars",                                 category: "Packing"   },
    { text: "Insect repellent (DEET-based)",              category: "Packing"   },
    { text: "Waterproof boots",                           category: "Packing"   },
    { text: "Malaria prevention medication",              category: "Safety"    },
    { text: "No flash photography near animals",          category: "Safety"    },
    { text: "Follow guide instructions at all times",     category: "Safety"    },
  ],
  Luxury: [
    { text: "Passport / National ID",                     category: "Documents" },
    { text: "Premium travel insurance",                   category: "Documents" },
    { text: "Reservation confirmations saved / printed",  category: "Documents" },
    { text: "Luxury hotel confirmed",                     category: "Booking"   },
    { text: "Private transfers booked",                   category: "Booking"   },
    { text: "Fine dining reservations",                   category: "Booking"   },
    { text: "Spa & excursion appointments",               category: "Booking"   },
    { text: "Formal attire for restaurants",              category: "Packing"   },
    { text: "Premium camera / accessories",               category: "Packing"   },
    { text: "Emergency medical contacts (concierge)",     category: "Safety"    },
    { text: "Secure valuables in hotel safe",             category: "Safety"    },
  ],
  Budget: [
    { text: "Passport / National ID",                              category: "Documents" },
    { text: "Basic travel insurance",                              category: "Documents" },
    { text: "Hostel / guesthouse booked",                          category: "Booking"   },
    { text: "Bus / shared jeep tickets",                           category: "Booking"   },
    { text: "Free viewpoints & activities mapped",                 category: "Booking"   },
    { text: "Reusable water bottle",                               category: "Packing"   },
    { text: "Power bank",                                          category: "Packing"   },
    { text: "Basic first aid supplies",                            category: "Packing"   },
    { text: "Copies of docs (digital + physical)",                 category: "Safety"    },
    { text: "Emergency cash reserve",                              category: "Safety"    },
    { text: "Free Wi-Fi spots identified",                         category: "Safety"    },
  ],
};

/* ---- Category colour chips ---------------------------------------------- */

const CATEGORY_COLORS: Record<string, string> = CHECKLIST_CATEGORY_STYLE;

/* ---- Component ----------------------------------------------------------- */

interface Props {
  items: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

const CATEGORIES = ["Documents", "Booking", "Packing", "Safety", "General"];

export function TripChecklist({ items, onChange }: Props) {
  const [newText, setNewText]     = useState("");
  const [newCat, setNewCat]       = useState("General");
  const [activeFilter, setFilter] = useState<string | null>(null);

  const toggle = (id: string) =>
    onChange(items.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  const add = () => {
    const text = newText.trim();
    if (!text) return;
    onChange([...items, { id: nanoid(), text, completed: false, category: newCat }]);
    setNewText("");
  };

  const doneCount  = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progress   = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const visible = activeFilter ? items.filter((i) => i.category === activeFilter) : items;

  const grouped = CATEGORIES.reduce<Record<string, ChecklistItem[]>>((acc, cat) => {
    const group = visible.filter((i) => i.category === cat);
    if (group.length > 0) acc[cat] = group;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-semibold text-brand-600">
            <CheckSquare size={18} />
            <span>Checklist progress</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{doneCount}/{totalCount} done</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              progress === 100 ? "bg-success" : "bg-accent"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && totalCount > 0 && (
          <p className="mt-2 text-xs font-medium text-success">All packed and ready to go! 🎉</p>
        )}
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition",
            !activeFilter ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:bg-brand-50"
          )}
        >
          All
        </button>
        {CATEGORIES.filter((c) => items.some((i) => i.category === c)).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(activeFilter === cat ? null : cat)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              activeFilter === cat
                ? "bg-brand-600 text-white"
                : `${CATEGORY_COLORS[cat] ?? ""} hover:opacity-80`
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grouped items */}
      {Object.entries(grouped).map(([cat, catItems]) => (
        <div key={cat} className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
          <div className={cn("px-5 py-2.5 flex items-center gap-2", CATEGORY_COLORS[cat] ?? "bg-muted")}>
            <Tag size={13} />
            <span className="text-xs font-semibold tracking-wide uppercase">{cat}</span>
            <span className="ml-auto text-xs opacity-70">
              {catItems.filter((i) => i.completed).length}/{catItems.length}
            </span>
          </div>
          <ul className="divide-y divide-border">
            {catItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-5 py-3 group">
                <button
                  onClick={() => toggle(item.id)}
                  className="shrink-0 transition hover:scale-110"
                  aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {item.completed ? (
                    <CheckSquare size={18} className="text-success" />
                  ) : (
                    <Square size={18} className="text-muted-foreground" />
                  )}
                </button>
                <span
                  className={cn(
                    "flex-1 text-sm transition",
                    item.completed ? "text-muted-foreground line-through" : "text-foreground"
                  )}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => remove(item.id)}
                  aria-label="Remove item"
                  className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No checklist items{activeFilter ? ` in "${activeFilter}"` : ""}. Add some below.
        </p>
      )}

      {/* Add custom item */}
      <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Add item</p>
        <div className="flex gap-2">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. Book helicopter backup…"
            className="h-9 flex-1"
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="h-9 rounded-xl border border-border bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Button size="sm" variant="accent" onClick={add}>
            <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
