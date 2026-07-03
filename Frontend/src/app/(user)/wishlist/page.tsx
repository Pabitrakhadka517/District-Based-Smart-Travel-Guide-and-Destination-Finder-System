import { WishlistClient } from "./wishlist-client";
import { getDestinations } from "@/services/content";

export default async function WishlistPage() {
  return <WishlistClient all={await getDestinations()} />;
}
