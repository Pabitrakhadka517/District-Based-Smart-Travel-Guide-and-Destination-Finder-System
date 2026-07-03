"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-accent/10 text-accent"><AlertTriangle size={36} /></div>
        <h1 className="mt-6 font-display text-4xl font-bold text-brand-600">Something went wrong</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">An unexpected error occurred (500). Please try again.</p>
        <Button variant="accent" size="lg" className="mt-6" onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
