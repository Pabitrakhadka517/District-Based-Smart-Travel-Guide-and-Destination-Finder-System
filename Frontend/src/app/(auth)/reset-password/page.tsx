import { Suspense } from "react";
import { ResetForm } from "./reset-form";

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-600">Set a new password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose a strong password for your account.</p>
      <div className="mt-8"><Suspense><ResetForm /></Suspense></div>
    </div>
  );
}
