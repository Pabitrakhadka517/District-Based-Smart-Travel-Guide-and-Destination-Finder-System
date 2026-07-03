"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { apiPost } from "@/services/api-client";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm:  z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
type FormValues = z.infer<typeof schema>;

export function ResetForm() {
  const searchParams = useSearchParams();
  const resetToken   = searchParams.get("token") ?? "";
  const [done, setDone]         = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  /* No token in URL — show a helpful prompt instead of a form */
  if (!resetToken) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-warning/15 text-warning-foreground">
          <LinkIcon size={28} aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-brand-600">No reset link found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please use the password reset link sent to your email. Links expire after 30 minutes.
        </p>
        <Link href="/forgot-password" className="mt-6 w-full">
          <Button variant="accent" className="w-full">Request a new reset link</Button>
        </Link>
        <Link href="/login" className="mt-3 w-full">
          <Button variant="outline" className="w-full">Back to login</Button>
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center text-center">
        <CheckCircle2 className="text-success" size={56} aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-semibold text-brand-600">Password updated</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your password has been changed successfully.</p>
        <Link href="/login" className="mt-6 w-full">
          <Button variant="accent" className="w-full">Back to login</Button>
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      await apiPost("/auth/reset-password", { token: resetToken, password: data.password });
      setDone(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Reset failed. The link may have expired.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {apiError && (
        <Alert variant="error">
          {apiError}{" "}
          <Link href="/forgot-password" className="font-medium underline">
            Request a new link
          </Link>
        </Alert>
      )}

      <div>
        <Label htmlFor="pw">New password</Label>
        <Input
          id="pw"
          type="password"
          className="mt-1"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "pw-error" : undefined}
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p id="pw-error" role="alert" className="mt-1 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirm">Confirm password</Label>
        <Input
          id="confirm"
          type="password"
          className="mt-1"
          aria-invalid={!!errors.confirm}
          aria-describedby={errors.confirm ? "confirm-error" : undefined}
          autoComplete="new-password"
          {...register("confirm")}
        />
        {errors.confirm && (
          <p id="confirm-error" role="alert" className="mt-1 text-xs text-destructive">
            {errors.confirm.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
