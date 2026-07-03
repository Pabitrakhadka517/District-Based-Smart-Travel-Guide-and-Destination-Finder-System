import Image from "next/image";
import type { Metadata } from "next";
import { Mountain, Landmark, TreePine, PartyPopper, Footprints, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { CTASection } from "@/components/shared/cta-section";
import { img, PHOTO } from "@/data/images";

export const metadata: Metadata = { title: "About Nepal", description: "An editorial overview of Nepal's tourism, heritage, parks, festivals and trekking." };

const sections = [
  { icon: Landmark, title: "Heritage sites", text: "Nepal holds 10 UNESCO World Heritage sites, including seven monument zones within the Kathmandu Valley — a dense concentration of pagodas, stupas and royal squares found nowhere else on earth." },
  { icon: TreePine, title: "National parks", text: "From the rhino-rich grasslands of Chitwan to the high-altitude wilds of Sagarmatha, Nepal's parks protect some of the planet's most dramatic biodiversity across a 6,000m elevation range." },
  { icon: PartyPopper, title: "Festivals", text: "The calendar overflows with colour — Dashain, Tihar, Holi, Indra Jatra and Tiji. Festivals are the beating heart of Nepali culture and an unforgettable time to visit." },
  { icon: Footprints, title: "Trekking routes", text: "Everest Base Camp, the Annapurna Circuit, Langtang and Upper Mustang draw trekkers from around the world to trails that range from teahouse-comfortable to genuinely remote." },
  { icon: ShieldCheck, title: "Travel safety", text: "Nepal is a welcoming destination. Use registered guides for treks, carry travel insurance with helicopter evacuation, acclimatise carefully at altitude, and respect local customs at religious sites." }
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[360px]">
        <Image src={img(PHOTO.himalaya5, 1920)} alt="Nepal Himalayas" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-600/90 to-brand-600/30" />
        <div className="container relative flex h-full flex-col justify-end pb-12 text-white">
          <Mountain size={40} className="text-accent" />
          <h1 className="h1 mt-3">About Nepal</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">A land where eight of the world's ten highest peaks meet ancient cities, jungle lowlands and a culture of extraordinary depth.</p>
        </div>
      </section>

      <section className="section">
        <div className="prose-lg mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Tourism overview</span>
          <h2 className="h2 mt-2 text-brand-600">A whole world in one country</h2>
          <p className="lead mt-4">Squeezed between India and Tibet, Nepal compresses subtropical jungle, terraced hills, medieval cities and the planet's highest mountains into an area smaller than many single provinces elsewhere. It is a place of pilgrimage for trekkers, spiritual seekers, wildlife lovers and culture enthusiasts alike.</p>
        </div>
      </section>

      <section className="container pb-10">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-secondary"><s.icon size={22} /></span>
                <div><h3 className="font-display text-lg font-semibold text-brand-600">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="py-10"><CTASection title="Start your Nepal journey" subtitle="Browse districts and build your perfect itinerary." /></div>
    </>
  );
}
