"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/10 px-6 py-4 text-sm text-success">
        <CheckCircle2 size={18} />
        <span>Thanks! We'll notify you when the newsletter launches.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="h-12 flex-1 rounded-xl border border-border px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" variant="accent" size="lg">
        Subscribe
      </Button>
    </form>
  );
}