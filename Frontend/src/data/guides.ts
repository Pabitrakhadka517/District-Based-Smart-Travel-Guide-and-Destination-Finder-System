import type { GuideArticle } from "@/types";
import { img, PHOTO } from "./images";

const AV = (i: number) => `https://i.pravatar.cc/150?img=${i}`;

export const guides: GuideArticle[] = [
  {
    id: "g1", slug: "first-time-nepal-itinerary", title: "The Perfect 10-Day First-Timer's Itinerary for Nepal",
    excerpt: "Kathmandu heritage, Pokhara lakes and a taste of the mountains — the ideal loop for a first visit, with no rushing.",
    category: "Itineraries", cover: img(PHOTO.lake1, 1200), author: "Sita Thapa", authorAvatar: AV(9),
    date: "2026-05-02", readMinutes: 8, tags: ["Itinerary", "Beginner", "Kathmandu", "Pokhara"], featured: true,
    body: [
      "Nepal packs an extraordinary amount into a small country, and ten days is enough to sample its three great experiences — heritage cities, the lakeside calm of Pokhara, and a first encounter with the Himalaya.",
      "Days 1–3: Base yourself in Kathmandu and work through the valley's UNESCO sites — Swayambhunath at dawn, Durbar Square, Patan's museum and Boudhanath at dusk. Build in a free afternoon for jet lag.",
      "Days 4–7: Fly or drive to Pokhara. Boat on Phewa Lake, catch sunrise from Sarangkot, and consider a short two-day Poon Hill add-on if you want a mountain taste without committing to a long trek.",
      "Days 8–10: Return via Chitwan for a jungle safari, or add a scenic mountain flight from Kathmandu. Leave the final day as a buffer — domestic flights are weather-dependent."
    ]
  },
  {
    id: "g2", slug: "altitude-sickness-guide", title: "Altitude Sickness: How to Trek High and Stay Safe",
    excerpt: "What AMS actually is, the golden rules of acclimatisation, and when to turn around. Essential reading before any high trek.",
    category: "Trekking", cover: img(PHOTO.himalaya8, 1200), author: "Dr. Marco Rossi", authorAvatar: AV(15),
    date: "2026-04-18", readMinutes: 6, tags: ["Safety", "Trekking", "Health"], featured: true,
    body: [
      "Acute Mountain Sickness (AMS) can affect anyone above roughly 2,500m, regardless of fitness. The cause is simple — less oxygen — but the consequences of ignoring it can be serious.",
      "The golden rule is to climb high, sleep low, and not increase your sleeping altitude by more than 300–500m per day above 3,000m. Build in rest days, as the Everest and Annapurna itineraries do at Namche and Manang.",
      "Mild symptoms — headache, fatigue, poor sleep — are common and manageable with rest and hydration. But worsening symptoms, breathlessness at rest or loss of coordination mean you must descend immediately.",
      "Carry travel insurance that explicitly covers helicopter evacuation, and never trek solo at altitude. When in doubt, go down — the mountain will still be there next year."
    ]
  },
  {
    id: "g3", slug: "nepali-food-to-try", title: "12 Nepali Dishes You Have to Try (Beyond Momos)",
    excerpt: "From Newari samay baji to Thakali dal bhat, a hungry traveller's guide to eating your way across Nepal.",
    category: "Food", cover: img(PHOTO.square1, 1200), author: "Priya Sharma", authorAvatar: AV(5),
    date: "2026-03-22", readMinutes: 7, tags: ["Food", "Culture", "Newari"], featured: false,
    body: [
      "Everyone knows momos, but Nepal's food culture runs far deeper. Start with dal bhat — the lentil-and-rice staple that powers every trekker — and seek out the Thakali version for the best balance of flavours.",
      "In the Kathmandu Valley, dive into Newari cuisine: samay baji (a ceremonial platter), bara (lentil pancakes), chatamari (the 'Newari pizza') and the legendary juju dhau, Bhaktapur's king curd.",
      "Don't miss sel roti (a sweet rice ring), gundruk (fermented greens), and in the mountains, hearty Sherpa stew and yak cheese. Wash it all down with masala tea or, if you're brave, local raksi."
    ]
  },
  {
    id: "g4", slug: "best-time-to-visit-nepal", title: "When to Visit Nepal: A Season-by-Season Breakdown",
    excerpt: "Autumn clarity, spring blooms, monsoon rain shadows and winter wildlife — how to time your trip for what you want to do.",
    category: "Tips", cover: img(PHOTO.himalaya3, 1200), author: "Aarav Shrestha", authorAvatar: AV(68),
    date: "2026-02-14", readMinutes: 5, tags: ["Planning", "Weather", "Seasons"], featured: false,
    body: [
      "Autumn (September–November) is peak season for good reason: stable weather, crystal-clear mountain views and a calendar full of festivals. Trails are busier, but the conditions are unbeatable.",
      "Spring (March–May) is the second-best window, with warm days, blooming rhododendrons and great visibility — ideal for both trekking and culture.",
      "Monsoon (June–August) brings rain to most of the country, but the rain-shadow regions of Upper Mustang and Dolpo stay dry and become the perfect time to visit.",
      "Winter (December–February) is cold at altitude but rewarding lower down — superb for Chitwan wildlife, valley culture and quieter short treks like Poon Hill."
    ]
  },
  {
    id: "g5", slug: "responsible-trekking", title: "How to Trek Responsibly in Nepal",
    excerpt: "Support local communities, minimise your footprint and travel in a way that keeps the mountains beautiful.",
    category: "Culture", cover: img(PHOTO.himalaya6, 1200), author: "Hannah Schmidt", authorAvatar: AV(31),
    date: "2026-01-30", readMinutes: 6, tags: ["Sustainability", "Culture", "Trekking"], featured: false,
    body: [
      "Tourism is a lifeline for mountain communities, and how you travel makes a real difference. Hire local guides and porters, pay fair wages, and ensure porters carry safe loads and have proper gear.",
      "Cut waste at the source: carry a reusable water bottle with purification, refuse single-use plastics, and pack out what you pack in. Many trails now have refill stations.",
      "Respect local customs — walk clockwise around stupas and mani walls, ask before photographing people, and dress modestly at religious sites. A little cultural awareness goes a long way."
    ]
  }
];
