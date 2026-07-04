import { TravelAlertsAdmin } from "./travel-alerts-admin";

// No SSR prefetch — inactive alerts are only visible with the admin's auth token
// (unauthenticated SSR only returns active ones), so this fetches client-side.
export default function Page() {
  return <TravelAlertsAdmin />;
}
