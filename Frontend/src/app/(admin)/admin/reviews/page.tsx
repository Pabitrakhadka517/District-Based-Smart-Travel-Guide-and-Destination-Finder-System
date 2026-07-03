import { ReviewsModeration } from "./reviews-moderation";

// No SSR prefetch — reviews are fetched client-side with the admin's auth token
// so pending and rejected reviews are visible (unauthenticated SSR only returns approved ones)
export default function Page() {
  return <ReviewsModeration />;
}
