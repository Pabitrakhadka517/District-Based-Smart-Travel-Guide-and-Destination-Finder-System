import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TopoLines } from "./topo-lines";

export function CTASection({
  title = "Ready to explore Nepal?",
  subtitle = "Start planning your next Himalayan adventure today.",
  primary = { label: "Start exploring", href: "/districts" },
  secondary = { label: "Plan a trip", href: "/planner" }
}: { title?: string; subtitle?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string }; }) {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-[2rem] mesh-brand p-10 text-center text-white md:p-16">
        <TopoLines className="text-white/15" opacity={1} />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative">
          <h2 className="h2">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={primary.href}><Button variant="accent" size="lg">{primary.label}</Button></Link>
            <Link href={secondary.href}><Button size="lg" className="bg-white/15 hover:bg-white/25">{secondary.label}</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
