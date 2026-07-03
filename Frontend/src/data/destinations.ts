import type { Destination } from "@/types";
import { img, gallery, PHOTO } from "./images";

export const destinations: Destination[] = [
  {
    id: "p1", slug: "swayambhunath", cityId: "c1", districtId: "d1",
    name: "Swayambhunath", tagline: "The Monkey Temple watching over the valley",
    description: "Perched on a hilltop west of Kathmandu, the Swayambhunath stupa is one of the oldest religious sites in Nepal. Its all-seeing Buddha eyes, fluttering prayer flags and resident monkeys make it an unmissable introduction to the valley's spiritual life.",
    category: "Religious", tags: ["Stupa", "Viewpoint", "UNESCO", "Buddhist"],
    heroImage: img(PHOTO.stupa2, 1600),
    gallery: gallery(PHOTO.stupa2, PHOTO.stupa1, PHOTO.square1, PHOTO.himalaya3),
    coordinates: { lat: 27.7149, lng: 85.2904 }, rating: 4.8, reviewCount: 1284,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 15, midRange: 45, luxury: 120, currency: "USD" },
    attractions: [
      { name: "Main Stupa", description: "The iconic white dome crowned with golden Buddha eyes." },
      { name: "Harati Temple", description: "Shrine to the goddess of smallpox, blending Hindu and Buddhist worship." },
      { name: "Valley Viewpoint", description: "Panoramic outlook over the entire Kathmandu valley." }
    ],
    activities: ["Sunrise photography", "Spinning prayer wheels", "Guided heritage walk", "Meditation"],
    restaurants: [
      { name: "Cafe de Patan", cuisine: "Nepali / Continental", priceRange: "$$" },
      { name: "Stupa View Restaurant", cuisine: "Tibetan", priceRange: "$$" }
    ],
    localFoods: ["Momo", "Sel roti", "Yomari", "Butter tea"],
    travelTips: ["Visit at dawn to beat crowds and heat.", "Watch your belongings around the monkeys.", "Climb the 365 stone steps slowly to acclimatise."],
    pros: ["Spectacular city views", "Rich spiritual atmosphere", "Easy half-day trip"],
    cons: ["Steep climb", "Can get crowded midday", "Aggressive monkeys"],
    nearby: ["p2"], featured: true, trending: true
  },
  {
    id: "p2", slug: "kathmandu-durbar-square", cityId: "c1", districtId: "d1",
    name: "Kathmandu Durbar Square", tagline: "Royal palaces at the city's beating heart",
    description: "A UNESCO World Heritage complex of palaces, courtyards and temples that was the seat of the Malla and Shah kings. Home to the living goddess Kumari and some of the finest Newari woodcarving in the country.",
    category: "Heritage", tags: ["UNESCO", "Palace", "Architecture", "History"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa1, PHOTO.stupa2, PHOTO.himalaya6),
    coordinates: { lat: 27.7045, lng: 85.3076 }, rating: 4.7, reviewCount: 980,
    bestTimeToVisit: ["Autumn", "Winter"],
    budget: { budget: 20, midRange: 50, luxury: 130, currency: "USD" },
    attractions: [
      { name: "Kumari Ghar", description: "Residence of Kathmandu's living goddess." },
      { name: "Hanuman Dhoka", description: "The old royal palace complex." },
      { name: "Taleju Temple", description: "Towering three-tiered temple of the royal deity." }
    ],
    activities: ["Heritage walking tour", "Festival watching", "Photography", "Souvenir shopping"],
    restaurants: [{ name: "Honacha", cuisine: "Newari", priceRange: "$" }, { name: "Cafe Layku", cuisine: "Nepali", priceRange: "$$" }],
    localFoods: ["Bara", "Chatamari", "Juju dhau", "Samay baji"],
    travelTips: ["Buy the combined heritage ticket.", "Hire a licensed guide for context.", "Respect photography rules at the Kumari house."],
    pros: ["Dense with monuments", "Central location", "Great people-watching"],
    cons: ["Some 2015 quake damage remains", "Busy traffic nearby"],
    nearby: ["p1"], featured: true, trending: false
  },
  {
    id: "p3", slug: "bhaktapur-durbar-square", cityId: "c2", districtId: "d1",
    name: "Bhaktapur Durbar Square", tagline: "A medieval city frozen in time",
    description: "The best-preserved of the valley's three durbar squares, Bhaktapur is a car-free maze of pottery squares, pagodas and the famous 55-Window Palace.",
    category: "Heritage", tags: ["UNESCO", "Pottery", "Architecture", "Newari"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1, PHOTO.forest1),
    coordinates: { lat: 27.6722, lng: 85.4280 }, rating: 4.9, reviewCount: 1102,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 18, midRange: 48, luxury: 110, currency: "USD" },
    attractions: [
      { name: "55-Window Palace", description: "Masterpiece of Newari woodcarving." },
      { name: "Nyatapola Temple", description: "Nepal's tallest five-storey pagoda." },
      { name: "Pottery Square", description: "Watch potters spin clay the traditional way." }
    ],
    activities: ["Pottery workshop", "Photography", "Tasting juju dhau", "Heritage tour"],
    restaurants: [{ name: "Cafe Nyatapola", cuisine: "Continental", priceRange: "$$" }, { name: "Peacock Restaurant", cuisine: "Newari", priceRange: "$$" }],
    localFoods: ["Juju dhau (king curd)", "Bara", "Chatamari", "Yomari"],
    travelTips: ["Stay overnight to enjoy the empty morning squares.", "Try the famous king curd.", "Wear comfortable shoes for cobblestones."],
    pros: ["Wonderfully preserved", "Car-free core", "Authentic crafts"],
    cons: ["Higher entry fee for foreigners", "30–60 min from central Kathmandu"],
    nearby: ["p1", "p2"], featured: true, trending: true
  },
  {
    id: "p4", slug: "boudhanath-stupa", cityId: "c3", districtId: "d1",
    name: "Boudhanath Stupa", tagline: "The serene mandala of Tibetan Kathmandu",
    description: "One of the largest stupas in the world and the spiritual centre of Nepal's Tibetan community. Walk the kora clockwise at dusk amid butter lamps and murmured mantras.",
    category: "Religious", tags: ["UNESCO", "Stupa", "Buddhist", "Tibetan"],
    heroImage: img(PHOTO.stupa1, 1600),
    gallery: gallery(PHOTO.stupa1, PHOTO.stupa2, PHOTO.square1, PHOTO.himalaya3),
    coordinates: { lat: 27.7215, lng: 85.3620 }, rating: 4.8, reviewCount: 1456,
    bestTimeToVisit: ["Autumn", "Winter"],
    budget: { budget: 12, midRange: 40, luxury: 100, currency: "USD" },
    attractions: [
      { name: "Great Stupa", description: "Massive mandala-shaped stupa with watchful Buddha eyes." },
      { name: "Rooftop Cafes", description: "Sweeping views over the dome and prayer flags." },
      { name: "Monasteries", description: "Dozens of active gompas ring the stupa." }
    ],
    activities: ["Evening kora walk", "Butter-lamp offering", "Rooftop coffee", "Monastery visit"],
    restaurants: [{ name: "Garden Kitchen", cuisine: "Tibetan", priceRange: "$$" }, { name: "Flavors Cafe", cuisine: "Continental", priceRange: "$$" }],
    localFoods: ["Thukpa", "Tibetan bread", "Momo", "Butter tea"],
    travelTips: ["Walk clockwise around the stupa.", "Sunset is the most atmospheric time.", "Support local Tibetan handicraft shops."],
    pros: ["Peaceful atmosphere", "Great cafes", "Living spiritual culture"],
    cons: ["Entry fee for foreigners", "Busy on festival days"],
    nearby: ["p1"], featured: false, trending: true
  },
  {
    id: "p5", slug: "phewa-lake", cityId: "c4", districtId: "d2",
    name: "Phewa Lake", tagline: "Annapurna reflections and lakeside calm",
    description: "Pokhara's shimmering centrepiece, where wooden doongas glide past the Tal Barahi temple and the Annapurnas mirror in still morning water.",
    category: "Lake", tags: ["Boating", "Sunrise", "Nature", "Relax"],
    heroImage: img(PHOTO.lake1, 1600),
    gallery: gallery(PHOTO.lake1, PHOTO.lake2, PHOTO.himalaya7, PHOTO.himalaya3),
    coordinates: { lat: 28.2096, lng: 83.9485 }, rating: 4.9, reviewCount: 1678,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 25, midRange: 60, luxury: 160, currency: "USD" },
    attractions: [
      { name: "Tal Barahi Temple", description: "Island shrine in the middle of the lake." },
      { name: "World Peace Pagoda", description: "Hilltop stupa with lake and mountain views." },
      { name: "Lakeside", description: "Buzzing strip of cafes, bars and shops." }
    ],
    activities: ["Boating", "Paragliding", "Kayaking", "Lakeside dining"],
    restaurants: [{ name: "Caffe Concerto", cuisine: "Italian", priceRange: "$$$" }, { name: "Moondance", cuisine: "Continental", priceRange: "$$" }],
    localFoods: ["Fresh lake fish", "Dal bhat", "Momo", "Lassi"],
    travelTips: ["Rent a boat at sunrise for the best reflections.", "Combine with a paragliding flight from Sarangkot.", "Walk to the Peace Pagoda for sunset."],
    pros: ["Stunning mountain views", "Lots of activities", "Relaxed vibe"],
    cons: ["Can be touristy", "Monsoon clouds hide peaks"],
    nearby: ["p6"], featured: true, trending: true
  },
  {
    id: "p6", slug: "sarangkot-sunrise", cityId: "c5", districtId: "d2",
    name: "Sarangkot Sunrise", tagline: "First light on the Annapurnas",
    description: "A short drive above Pokhara, Sarangkot is the classic spot to watch dawn ignite Machhapuchhre and the Annapurna range — and the launch pad for tandem paragliding.",
    category: "Adventure", tags: ["Sunrise", "Paragliding", "Viewpoint", "Hiking"],
    heroImage: img(PHOTO.himalaya3, 1600),
    gallery: gallery(PHOTO.himalaya3, PHOTO.himalaya5, PHOTO.lake1, PHOTO.himalaya7),
    coordinates: { lat: 28.2440, lng: 83.9490 }, rating: 4.7, reviewCount: 642,
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    budget: { budget: 30, midRange: 70, luxury: 180, currency: "USD" },
    attractions: [
      { name: "Sunrise Viewpoint", description: "Tower platform facing the Himalayas." },
      { name: "Paragliding launch", description: "One of the world's best tandem flying sites." }
    ],
    activities: ["Sunrise viewing", "Paragliding", "Mountain biking", "Hiking"],
    restaurants: [{ name: "Sunrise Cafe", cuisine: "Nepali", priceRange: "$" }],
    localFoods: ["Tea & pakoda", "Dal bhat", "Roasted corn"],
    travelTips: ["Leave Pokhara by 4:30am for sunrise.", "Bring a warm layer — mornings are cold.", "Book paragliding a day ahead in peak season."],
    pros: ["Epic mountain panorama", "Adventure on tap", "Close to Pokhara"],
    cons: ["Very early start", "Clear weather not guaranteed"],
    nearby: ["p5"], featured: false, trending: true
  },
  {
    id: "p7", slug: "everest-base-camp-trek", cityId: "c6", districtId: "d3",
    name: "Everest Base Camp Trek", tagline: "The pilgrimage to the foot of the world's highest peak",
    description: "The legendary trek through Sherpa villages, swinging bridges and high glacial valleys to the base of Mount Everest at 5,364m.",
    category: "Trekking", tags: ["Everest", "High Altitude", "Bucket List", "Sherpa"],
    heroImage: img(PHOTO.himalaya1, 1600),
    gallery: gallery(PHOTO.himalaya1, PHOTO.himalaya4, PHOTO.himalaya8, PHOTO.himalaya9),
    coordinates: { lat: 27.9881, lng: 86.9250 }, rating: 5.0, reviewCount: 893,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 900, midRange: 1600, luxury: 4500, currency: "USD" },
    attractions: [
      { name: "Kala Patthar", description: "5,545m viewpoint for the classic Everest panorama." },
      { name: "Tengboche Monastery", description: "Famous monastery framed by Ama Dablam." },
      { name: "Khumbu Glacier", description: "The icy approach to base camp itself." }
    ],
    activities: ["Multi-day trekking", "Acclimatisation hikes", "Monastery visits", "Photography"],
    restaurants: [{ name: "Teahouse lodges", cuisine: "Nepali / Sherpa", priceRange: "$$" }],
    localFoods: ["Dal bhat", "Sherpa stew", "Tsampa", "Yak cheese"],
    travelTips: ["Allow rest days to acclimatise.", "Carry cash — no ATMs past Namche.", "Travel insurance with heli-evac is essential."],
    pros: ["Once-in-a-lifetime scenery", "Rich Sherpa culture", "Well-supported trail"],
    cons: ["Altitude sickness risk", "Physically demanding", "Weather-dependent flights"],
    nearby: [], featured: true, trending: true
  },
  {
    id: "p8", slug: "chitwan-national-park", cityId: "c8", districtId: "d4",
    name: "Chitwan National Park", tagline: "Rhinos, tigers and tropical jungle",
    description: "Nepal's first national park and a UNESCO site, Chitwan protects one-horned rhinos, Bengal tigers, gharials and a riot of birdlife across riverine grasslands and sal forest.",
    category: "Wildlife", tags: ["UNESCO", "Safari", "Rhino", "Jungle"],
    heroImage: img(PHOTO.jungle1, 1600),
    gallery: gallery(PHOTO.jungle1, PHOTO.forest1, PHOTO.forest2, PHOTO.himalaya6),
    coordinates: { lat: 27.5291, lng: 84.3542 }, rating: 4.7, reviewCount: 1205,
    bestTimeToVisit: ["Autumn", "Winter", "Spring"],
    budget: { budget: 120, midRange: 280, luxury: 700, currency: "USD" },
    attractions: [
      { name: "Jeep Safari", description: "Search for rhino and tiger in the core zone." },
      { name: "Canoe ride", description: "Drift past gharial crocodiles on the Rapti river." },
      { name: "Tharu Village", description: "Experience indigenous Tharu culture and dance." }
    ],
    activities: ["Jeep safari", "Canoeing", "Bird watching", "Jungle walk", "Elephant breeding centre"],
    restaurants: [{ name: "Jungle Lodge Dining", cuisine: "Nepali / Tharu", priceRange: "$$" }],
    localFoods: ["Tharu thali", "Fish curry", "Dhikri", "Ghonghi"],
    travelTips: ["Book a licensed guide for safaris.", "Dawn and dusk give the best wildlife sightings.", "Wear neutral colours."],
    pros: ["Excellent wildlife", "Unique Tharu culture", "Great value safaris"],
    cons: ["Hot and humid", "Sightings not guaranteed"],
    nearby: [], featured: true, trending: false
  },
  {
    id: "p9", slug: "patan-durbar-square", cityId: "c9", districtId: "d5",
    name: "Patan Durbar Square", tagline: "The artisan's masterpiece",
    description: "The most refined of the valley's durbar squares, Patan dazzles with stone and metal craftsmanship, the Krishna Mandir and an excellent museum.",
    category: "Heritage", tags: ["UNESCO", "Art", "Newari", "Museum"],
    heroImage: img(PHOTO.square1, 1600),
    gallery: gallery(PHOTO.square1, PHOTO.stupa2, PHOTO.stupa1, PHOTO.himalaya6),
    coordinates: { lat: 27.6727, lng: 85.3252 }, rating: 4.7, reviewCount: 712,
    bestTimeToVisit: ["Autumn", "Spring"],
    budget: { budget: 16, midRange: 45, luxury: 110, currency: "USD" },
    attractions: [
      { name: "Krishna Mandir", description: "Exquisite stone shikhara temple." },
      { name: "Patan Museum", description: "One of South Asia's finest museums." },
      { name: "Golden Temple", description: "Ornate Buddhist monastery nearby." }
    ],
    activities: ["Museum visit", "Heritage walk", "Metal-craft shopping", "Photography"],
    restaurants: [{ name: "Cafe du Temple", cuisine: "Continental", priceRange: "$$" }, { name: "The Old House", cuisine: "French", priceRange: "$$$" }],
    localFoods: ["Newari khaja set", "Bara", "Wo", "Aila"],
    travelTips: ["Don't miss the Patan Museum.", "Browse the metal workshops in the back lanes.", "Combine with central Kathmandu in one day."],
    pros: ["Finest craftsmanship", "Superb museum", "Less crowded"],
    cons: ["Entry fee", "Limited parking"],
    nearby: ["p1", "p2"], featured: false, trending: false
  },
  {
    id: "p10", slug: "upper-mustang-trek", cityId: "c10", districtId: "d6",
    name: "Upper Mustang Trek", tagline: "The forbidden kingdom beyond the Himalayas",
    description: "A restricted-area trek into a high desert of ochre cliffs, sky caves and the walled city of Lo Manthang — the closest thing to old Tibet you can still visit.",
    category: "Trekking", tags: ["Restricted Area", "Tibetan", "Desert", "Remote"],
    heroImage: img(PHOTO.himalaya2, 1600),
    gallery: gallery(PHOTO.himalaya2, PHOTO.himalaya5, PHOTO.himalaya9, PHOTO.himalaya3),
    coordinates: { lat: 29.1830, lng: 83.9580 }, rating: 4.9, reviewCount: 318,
    bestTimeToVisit: ["Summer", "Autumn", "Spring"],
    budget: { budget: 1200, midRange: 2200, luxury: 5000, currency: "USD" },
    attractions: [
      { name: "Lo Manthang", description: "The medieval walled capital of Mustang." },
      { name: "Sky Caves", description: "Thousands of cliff-cut caves of unknown origin." },
      { name: "Tiji Festival", description: "Vivid three-day monastic festival." }
    ],
    activities: ["Trekking", "Monastery visits", "Festival viewing", "Cultural immersion"],
    restaurants: [{ name: "Teahouse lodges", cuisine: "Tibetan / Nepali", priceRange: "$$" }],
    localFoods: ["Tsampa", "Thukpa", "Yak meat", "Seabuckthorn juice"],
    travelTips: ["A special restricted-area permit is required.", "Trek in monsoon — Mustang lies in a rain shadow.", "Go for the Tiji festival in spring."],
    pros: ["Unique Tibetan culture", "Trekkable in monsoon", "Otherworldly scenery"],
    cons: ["Expensive permit", "Remote and rugged", "Long approach"],
    nearby: [], featured: true, trending: false
  }
];
