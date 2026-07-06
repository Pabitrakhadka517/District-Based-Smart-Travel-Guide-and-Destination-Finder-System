import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-secondary"><Compass size={36} /></div>
        <h1 className="mt-6 font-display text-7xl font-bold text-brand-600">404</h1>
        <p className="mt-2 text-lg font-medium text-foreground">Off the trail</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">The page you&apos;re looking for has wandered off the map. Let&apos;s get you back on route.</p>
        <Link href="/" className="mt-6 inline-block"><Button variant="accent" size="lg">Back to base camp</Button></Link>
      </div>
    </div>
  );
}
