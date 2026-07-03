"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { apiPost } from "@/services/api-client";

interface ForgotResponse {
  message: string;
  devResetToken?: string;
}

export function ForgotForm() {
  const [step, setStep]         = useState<"email" | "done">("email");
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devToken, setDevToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);
    try {
      const res = await apiPost<ForgotResponse>("/auth/forgot-password", { email });
      setDevToken(res.devResetToken ?? null);
      setStep("done");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    const resetUrl = devToken ? `/reset-password?token=${devToken}` : null;

    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center text-center">
        <CheckCircle2 className="text-success" size={56} aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-brand-600">
          {resetUrl ? "Reset link ready" : "Check your email"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {resetUrl
            ? "A reset link has been generated. Click the button below to set your new password."
            : `If an account exists for ${email}, a password reset link has been sent. Check your inbox.`}
        </p>

        {resetUrl ? (
          <Link href={resetUrl} className="mt-6 w-full">
            <Button variant="accent" className="w-full">
              <ExternalLink size={15} aria-hidden="true" />
              Set new password
            </Button>
          </Link>
        ) : null}

        <Link href="/login" className="mt-3 w-full">
          <Button variant="outline" className="w-full">Back to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {apiError && <Alert variant="error">{apiError}</Alert>}
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          required
          placeholder="you@email.com"
          className="mt-1"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" variant="accent" className="w-full" disabled={loading || !email.trim()} aria-busy={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
