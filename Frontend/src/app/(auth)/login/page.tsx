import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-600">
        Welcome back, Explorer
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Continue planning your next adventure across Nepal.
      </p>

      <div className="mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-500 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}
