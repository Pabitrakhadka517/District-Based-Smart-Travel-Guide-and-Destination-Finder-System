"use client";
import { LayoutDashboard, Heart, Map, Route, User, Settings } from "lucide-react";
import { Sidebar } from "@/components/shared/sidebar";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/planner", label: "Trip Planner", icon: Map },
  { href: "/tracking", label: "Travel Tracking", icon: Route },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={items} title="My Travels" />
      <div className="flex-1 overflow-x-hidden">
        <main id="main-content" className="container max-w-none px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
