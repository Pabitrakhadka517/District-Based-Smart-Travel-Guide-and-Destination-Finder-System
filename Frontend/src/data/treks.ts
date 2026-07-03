import type { Trek } from "@/types";
import { img, gallery, PHOTO } from "./images";

export const treks: Trek[] = [
  {
    id: "tk1", slug: "everest-base-camp", name: "Everest Base Camp Trek", region: "Solukhumbu (Khumbu)",
    tagline: "Walk to the foot of the world's highest mountain",
    description: "The most iconic trek on earth. Fly into Lukla and follow the Dudh Koshi through Sherpa villages, swinging bridges and rhododendron forest to the glacial amphitheatre of Everest Base Camp, with a dawn climb of Kala Patthar for the classic panorama.",
    heroImage: img(PHOTO.himalaya1, 1600), gallery: gallery(PHOTO.himalaya1, PHOTO.himalaya4, PHOTO.himalaya8, PHOTO.himalaya9),
    difficulty: "Challenging", durationDays: 14, maxAltitude: 5545, distanceKm: 130,
    bestSeasons: ["Autumn", "Spring"], permits: ["Sagarmatha National Park Permit", "Khumbu Pasang Lhamu Rural Municipality Permit"],
    highlights: ["Kala Patthar sunrise (5,545m)", "Tengboche Monastery", "Namche Bazaar", "Khumbu Glacier"],
    itinerary: [
      { day: 1, title: "Fly Lukla, trek to Phakding", detail: "Thrilling mountain flight, gentle walk along the river.", altitude: 2610, hours: "3–4h" },
      { day: 2, title: "Trek to Namche Bazaar", detail: "Cross suspension bridges and climb to the Sherpa capital.", altitude: 3440, hours: "6h" },
      { day: 3, title: "Acclimatisation day", detail: "Hike to Everest View Hotel; rest to adjust to altitude.", altitude: 3440, hours: "3h" },
      { day: 4, title: "Trek to Tengboche", detail: "Visit the famous monastery beneath Ama Dablam.", altitude: 3860, hours: "5h" },
      { day: 5, title: "Trek to Dingboche", detail: "Enter the high alpine zone above the treeline.", altitude: 4410, hours: "5h" },
      { day: 6, title: "Gorak Shep & Base Camp", detail: "Reach Everest Base Camp, then return to Gorak Shep.", altitude: 5364, hours: "7h" },
      { day: 7, title: "Kala Patthar & descend", detail: "Dawn climb for the Everest panorama, begin the return.", altitude: 5545, hours: "7h" }
    ],
    rating: 5.0, priceFrom: 1400, featured: true
  },
  {
    id: "tk2", slug: "annapurna-circuit", name: "Annapurna Circuit", region: "Manang & Mustang",
    tagline: "Cross the legendary Thorong La between two valleys",
    description: "A classic circuit that traverses dramatic climate zones — from subtropical valleys to the high desert of Manang — crossing the 5,416m Thorong La pass before descending to the pilgrimage town of Muktinath.",
    heroImage: img(PHOTO.himalaya2, 1600), gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya3, PHOTO.himalaya7),
    difficulty: "Challenging", durationDays: 12, maxAltitude: 5416, distanceKm: 160,
    bestSeasons: ["Autumn", "Spring"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Thorong La Pass (5,416m)", "Muktinath Temple", "Manang Valley", "Diverse landscapes"],
    itinerary: [
      { day: 1, title: "Drive to Chame", detail: "Scenic road into the Marsyangdi valley.", altitude: 2710, hours: "Drive" },
      { day: 2, title: "Trek to Pisang", detail: "Pine forest with first Annapurna II views.", altitude: 3300, hours: "5h" },
      { day: 3, title: "Trek to Manang", detail: "Enter the dry, Tibetan-influenced upper valley.", altitude: 3540, hours: "6h" },
      { day: 4, title: "Acclimatisation in Manang", detail: "Day hike to Ice Lake or Gangapurna.", altitude: 3540, hours: "4h" },
      { day: 5, title: "Trek to Thorong Phedi", detail: "Approach the base of the pass.", altitude: 4525, hours: "5h" },
      { day: 6, title: "Cross Thorong La to Muktinath", detail: "Pre-dawn ascent over the high pass.", altitude: 5416, hours: "8h" }
    ],
    rating: 4.9, priceFrom: 1100, featured: true
  },
  {
    id: "tk3", slug: "annapurna-base-camp", name: "Annapurna Base Camp", region: "Kaski (Gandaki)",
    tagline: "Into the heart of the Annapurna Sanctuary",
    description: "A shorter, immensely rewarding trek through Gurung villages and bamboo forest into a glacial sanctuary ringed by 7,000m peaks — perfect for a first Himalayan trek.",
    heroImage: img(PHOTO.himalaya3, 1600), gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya7, PHOTO.forest1, PHOTO.himalaya5),
    difficulty: "Moderate", durationDays: 7, maxAltitude: 4130, distanceKm: 70,
    bestSeasons: ["Autumn", "Spring", "Winter"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Annapurna Sanctuary", "Machhapuchhre views", "Gurung culture", "Jhinu hot springs"],
    itinerary: [
      { day: 1, title: "Drive & trek to Chhomrong", detail: "Start from Pokhara into Gurung country.", altitude: 2170, hours: "5h" },
      { day: 2, title: "Trek to Bamboo", detail: "Descend and climb through lush forest.", altitude: 2310, hours: "5h" },
      { day: 3, title: "Trek to Deurali", detail: "Follow the Modi Khola gorge upward.", altitude: 3200, hours: "5h" },
      { day: 4, title: "Reach Annapurna Base Camp", detail: "Enter the sanctuary surrounded by giants.", altitude: 4130, hours: "5h" },
      { day: 5, title: "Descend to Bamboo", detail: "Sunrise at ABC, then long descent.", altitude: 2310, hours: "6h" }
    ],
    rating: 4.8, priceFrom: 750, featured: true
  },
  {
    id: "tk4", slug: "langtang-valley", name: "Langtang Valley Trek", region: "Rasuwa (Bagmati)",
    tagline: "The valley of glaciers, close to Kathmandu",
    description: "A quieter, accessible trek into a beautiful glacial valley rebuilt with resilience after 2015. Tamang culture, yak pastures and the climb to Kyanjin Ri make it a gem.",
    heroImage: img(PHOTO.himalaya6, 1600), gallery: gallery(PHOTO.himalaya6, PHOTO.forest1, PHOTO.himalaya3, PHOTO.himalaya9),
    difficulty: "Moderate", durationDays: 7, maxAltitude: 4773, distanceKm: 65,
    bestSeasons: ["Autumn", "Spring"], permits: ["Langtang National Park Permit", "TIMS Card"],
    highlights: ["Kyanjin Gompa", "Kyanjin Ri viewpoint", "Tamang heritage", "Yak cheese factory"],
    itinerary: [
      { day: 1, title: "Drive to Syabrubesi", detail: "Mountain road north from Kathmandu.", altitude: 1550, hours: "Drive" },
      { day: 2, title: "Trek to Lama Hotel", detail: "Riverside forest trail.", altitude: 2470, hours: "6h" },
      { day: 3, title: "Trek to Langtang Village", detail: "Open valley with mountain views.", altitude: 3430, hours: "6h" },
      { day: 4, title: "Trek to Kyanjin Gompa", detail: "Reach the monastery settlement.", altitude: 3870, hours: "3h" },
      { day: 5, title: "Climb Kyanjin Ri", detail: "Panoramic high point above the valley.", altitude: 4773, hours: "4h" }
    ],
    rating: 4.7, priceFrom: 650, featured: false
  },
  {
    id: "tk5", slug: "poon-hill", name: "Ghorepani Poon Hill", region: "Kaski (Gandaki)",
    tagline: "The classic short trek for sunrise over the Annapurnas",
    description: "A gentle, scenic loop through rhododendron forest and terraced villages to the famous Poon Hill viewpoint — ideal for families and first-timers seeking big views on a short timeline.",
    heroImage: img(PHOTO.himalaya7, 1600), gallery: gallery(PHOTO.himalaya7, PHOTO.forest1, PHOTO.himalaya3, PHOTO.lake1),
    difficulty: "Easy", durationDays: 4, maxAltitude: 3210, distanceKm: 45,
    bestSeasons: ["Autumn", "Spring", "Winter"], permits: ["ACAP Permit", "TIMS Card"],
    highlights: ["Poon Hill sunrise", "Rhododendron forests", "Ghandruk village", "Easy & family-friendly"],
    itinerary: [
      { day: 1, title: "Drive & trek to Ulleri", detail: "Stone-stair climb through villages.", altitude: 1960, hours: "4h" },
      { day: 2, title: "Trek to Ghorepani", detail: "Forest trail to the ridge village.", altitude: 2870, hours: "5h" },
      { day: 3, title: "Poon Hill & Tadapani", detail: "Sunrise viewpoint, then onward.", altitude: 3210, hours: "6h" },
      { day: 4, title: "Descend to Ghandruk", detail: "Beautiful Gurung village finish.", altitude: 1940, hours: "4h" }
    ],
    rating: 4.7, priceFrom: 420, featured: false
  },
  {
    id: "tk6", slug: "upper-mustang", name: "Upper Mustang Trek", region: "Mustang (Gandaki)",
    tagline: "The forbidden kingdom in the Himalayan rain shadow",
    description: "A restricted-area trek into a high desert of ochre cliffs and sky caves to the walled city of Lo Manthang — trekkable even in monsoon, and culturally the closest thing to old Tibet.",
    heroImage: img(PHOTO.himalaya2, 1600), gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya9, PHOTO.himalaya3),
    difficulty: "Moderate", durationDays: 10, maxAltitude: 3840, distanceKm: 110,
    bestSeasons: ["Summer", "Autumn", "Spring"], permits: ["Upper Mustang Restricted Area Permit", "ACAP Permit"],
    highlights: ["Lo Manthang walled city", "Ancient sky caves", "Tiji Festival", "Monsoon-friendly"],
    itinerary: [
      { day: 1, title: "Fly to Jomsom, trek to Kagbeni", detail: "Enter the restricted zone gateway.", altitude: 2810, hours: "4h" },
      { day: 2, title: "Trek to Chele", detail: "Dramatic canyon country begins.", altitude: 3050, hours: "6h" },
      { day: 3, title: "Trek to Syangboche", detail: "High passes and red cliffs.", altitude: 3475, hours: "6h" },
      { day: 4, title: "Trek to Lo Manthang", detail: "Reach the medieval walled capital.", altitude: 3840, hours: "5h" },
      { day: 5, title: "Explore Lo Manthang", detail: "Palaces, monasteries and cave gompas.", altitude: 3840, hours: "Full day" }
    ],
    rating: 4.9, priceFrom: 1800, featured: false
  }
];
