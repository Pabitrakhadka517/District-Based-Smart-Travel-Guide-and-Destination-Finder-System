"use client";
import { useState } from "react";
import Image from "next/image";
import { Hotel, Bus, Star, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { img, PHOTO } from "@/data/images";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const hotels = [
  { id: "h1", name: "Himalaya Heritage Hotel", location: "Thamel, Kathmandu", price: 78, rating: 4.6, img: img(PHOTO.hotel1, 700), perks: ["Free breakfast", "Rooftop view", "Airport pickup"] },
  { id: "h2", name: "Lakeside Resort Pokhara", location: "Lakeside, Pokhara", price: 95, rating: 4.8, img: img(PHOTO.hotel2, 700), perks: ["Lake view", "Pool", "Spa"] },
  { id: "h3", name: "Everest View Lodge", location: "Namche Bazaar", price: 120, rating: 4.7, img: img(PHOTO.lodge1, 700), perks: ["Mountain view", "Heated rooms", "Trek support"] }
];

const transport = [
  { id: "t1", name: "Tourist Coach — KTM to Pokhara", type: "Bus", price: 25, duration: "6h", time: "07:00" },
  { id: "t2", name: "Domestic Flight — KTM to Lukla", type: "Flight", price: 185, duration: "35m", time: "06:30" },
  { id: "t3", name: "Private Jeep — KTM to Chitwan", type: "Jeep", price: 90, duration: "5h", time: "08:00" }
];

export function BookingClient() {
  const [tab, setTab] = useState<"hotels" | "transport">("hotels");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="container py-10">
      <h1 className="h2 text-brand-600">Booking preview</h1>
      <p className="lead mt-2">A demo interface for hotels and transport. <span className="text-accent">No real payment is processed.</span></p>

      <div className="mt-6 inline-flex rounded-xl border border-border bg-white p-1 shadow-soft">
        <button onClick={() => setTab("hotels")} className={cn("flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium", tab === "hotels" ? "bg-brand-600 text-white" : "text-muted-foreground")}><Hotel size={16} /> Hotels</button>
        <button onClick={() => setTab("transport")} className={cn("flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium", tab === "transport" ? "bg-brand-600 text-white" : "text-muted-foreground")}><Bus size={16} /> Transport</button>
      </div>

      {tab === "hotels" ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h) => (
            <div key={h.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft card-hover">
              <div className="relative h-44"><Image src={h.img} alt={h.name} fill sizes="33vw" className="object-cover" />
                <Badge className="absolute left-3 top-3 bg-white/90 text-brand-600"><Star size={12} className="mr-1 fill-accent text-accent" /> {h.rating}</Badge>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-brand-600">{h.name}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} /> {h.location}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{h.perks.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}</div>
                <div className="mt-4 flex items-center justify-between">
                  <span><span className="font-display text-xl font-bold text-brand-600">{formatCurrency(h.price)}</span><span className="text-xs text-muted-foreground"> / night</span></span>
                  <Button size="sm" variant={selected === h.id ? "accent" : "outline"} onClick={() => setSelected(h.id)}>
                    {selected === h.id ? <><Check size={14} /> Selected</> : "Check availability"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {transport.map((t) => (
            <div key={t.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-secondary"><Bus size={20} /></span>
                <div><p className="font-medium text-brand-600">{t.name}</p><p className="text-xs text-muted-foreground">{t.type} · {t.duration} · departs {t.time}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-bold text-brand-600">{formatCurrency(t.price)}</span>
                <Button size="sm" variant={selected === t.id ? "accent" : "outline"} onClick={() => setSelected(t.id)}>{selected === t.id ? "Selected" : "Select"}</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
