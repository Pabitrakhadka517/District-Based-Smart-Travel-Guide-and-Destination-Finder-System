import { Suspense } from "react";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-600">Start your journey</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Create your free account and explore all of Nepal.
      </p>

      <div className="mt-8">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-500 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
