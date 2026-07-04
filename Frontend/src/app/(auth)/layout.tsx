import Image from "next/image";
import { Star } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { img, PHOTO } from "@/data/images";
import { AuthOnlyGuard } from "./auth-only-guard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthOnlyGuard />

      {/* ── Left: brand / imagery side ────────────────────────────────── */}
      <div className="relative hidden lg:block">
        <Image src={img(PHOTO.lake1, 1200)} alt="Nepal" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/80 to-secondary/60" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo light />
          <div>
            <h2 className="font-display text-3xl font-bold">Your Himalayan journey starts here.</h2>
            <p className="mt-3 max-w-md text-white/80">
              Save destinations, plan trips and track your travels across Nepal — all in one place.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </span>
              <span className="text-sm text-white/80">Loved by 12,000+ travellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: form panel ──────────────────────────────────────────── */}
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>

    </div>
  );
}
