import type { Metadata } from "next";
import { BookingClient } from "./booking-client";

export const metadata: Metadata = { title: "Booking", description: "Preview hotels and transport options (mock interface)." };

export default function BookingPage() {
  return <BookingClient />;
}
