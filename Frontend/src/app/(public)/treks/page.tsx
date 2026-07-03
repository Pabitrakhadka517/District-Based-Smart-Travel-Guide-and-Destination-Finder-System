import type { Metadata } from "next";
import Image from "next/image";
import { getTreks } from "@/services/content";
import { TreksExplorer } from "./treks-explorer";
import { img, PHOTO } from "@/data/images";
import { PrayerFlags } from "@/components/shared/prayer-flags";

export const metadata: Metadata = { title: "Trekking Routes", description: "Explore Nepal's best trekking routes — Everest, Annapurna, Langtang and more." };

export default async function TreksPage() {
  return (
    <>
      <section className="relative h-[46vh] min-h-[340px]">
        <Image src={img(PHOTO.himalaya1, 1920)} alt="Trekking in Nepal" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-brand-900/20" />
        <div className="container relative flex h-full flex-col justify-end pb-12 text-white">
          <PrayerFlags className="mb-4 max-w-[200px] text-white/50" />
          <span className="kicker text-accent">Trekking in Nepal</span>
          <h1 className="h1 mt-3">Find your trail</h1>
          <p className="mt-3 max-w-2xl text-white/85">From the icon of Everest Base Camp to the quiet glaciers of Langtang — compare routes by difficulty, duration and altitude.</p>
        </div>
      </section>
      <TreksExplorer treks={await getTreks()} />
    </>
  );
}
