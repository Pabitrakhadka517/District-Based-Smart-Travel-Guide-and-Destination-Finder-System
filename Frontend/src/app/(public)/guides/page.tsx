import type { Metadata } from "next";
import { getGuides } from "@/services/content";
import { GuidesExplorer } from "./guides-explorer";

export const metadata: Metadata = { title: "Travel Guides", description: "Expert Nepal travel guides." };

export default async function GuidesPage() {
  return <GuidesExplorer guides={await getGuides()} />;
}
