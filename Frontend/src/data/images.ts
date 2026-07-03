/**
 * Curated, production-grade imagery.
 * Centralised so photos can be swapped for Cloudinary assets in one place.
 * IDs are stable Unsplash photo IDs; `img()` builds a sized, optimised URL.
 */
const U = "https://images.unsplash.com/photo-";

export const img = (id: string, w = 1200, q = 80) => `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;

// Themed, vetted photo IDs
export const PHOTO = {
  // Mountains / Himalaya / trekking
  himalaya1: "1544735716-392fe2489ffa",
  himalaya2: "1486911278844-a81c5267e227",
  himalaya3: "1469854523086-cc02fe5d8800",
  himalaya4: "1551632811-561732d1e306",
  himalaya5: "1454496522488-7a8e488e8606",
  himalaya6: "1464822759023-fed622ff2c3b",
  himalaya7: "1506905925346-21bda4d32df4",
  himalaya8: "1519681393784-d120267933ba",
  himalaya9: "1458668383970-8ddd3927deed",
  forest1: "1470071459604-3b5ec3a7fe05",
  // Temples / heritage / culture
  stupa1: "1605640840605-14ac1855827b",
  stupa2: "1592285896110-8d88b5b3a5d8",
  square1: "1571536802807-30451e3955d8",
  // Lakes / water
  lake1: "1526772662000-3f88f10405ff",
  lake2: "1506905925346-21bda4d32df4",
  // Wildlife / jungle
  jungle1: "1581852017103-68ac65514cf7",
  forest2: "1470071459604-3b5ec3a7fe05",
  // Hospitality
  hotel1: "1566073771259-6a8506099945",
  hotel2: "1551882547-ff40c63fe5fa",
  lodge1: "1455587734955-081b22074882",
  // District hero images — verified CDN IDs
  ebc:           "1522774607452-dac2ecc66330",  // Everest Base Camp trail, Solukhumbu
  kanchenjunga:  "1627119703136-3964f14b7325",  // Kanchenjunga peak, Taplejung
  swayambhu:     "1665435246383-4103fc803522",  // Swayambhunath stupa, Kathmandu
  patanDurbar:   "1676299950521-638fa4f0f475",  // Patan Durbar walkway, Lalitpur
  bhaktapurSq:   "1706188047078-0ba67733fa45",  // Bhaktapur Durbar stone lion
  chitwan:       "1498712067384-01239c6b377c",  // Elephant safari, Chitwan
  phewa:         "1659808909524-5fcad5cd48bf",  // Phewa Lake boats, Pokhara
  mustangDesert: "1642402734863-15ead077a324",  // Lo Manthang rocky landscape
  manaslu:       "1610912335893-b996d1743610",  // Manaslu mountain, Gorkha
  annapurna:     "1653043506251-05cecdfe9cfd",  // Annapurna snow summit
  teaHills:      "1742106856193-5cc3424ac450",  // Rolling tea plantation, Ilam
  teaPickers:    "1758390286435-e559ab6d4596",  // Tea pickers harvesting
  tiger:         "1714318808656-1aa1639eae15",  // Tiger in jungle, Bardiya
  himalayaLake:  "1715935257216-fdba0eadd42a",  // Mountain lake, Langtang area
  sacredLake:    "1715935564077-bc4e06915d8c",  // Sacred lake, Panchpokhari
  brickTemple:   "1760366621342-5c4703099c2c",  // Brick temple in green trees
  janakpur:      "1760973179127-414475da8dcc",  // Lit temple night, Janakpur style
  nuwakotPalace: "1669557582081-274a568aff4d",  // Heritage building with tower
  namobuddha:    "1540961286473-8ad1368dc1bd",  // Low-angle temple, Kavrepalanchok
  nepalHills:    "1599751229070-854ae5c90869",  // Green mountain Nepal
  tanahun:       "1731339987698-a9ddbd4be744",  // City with mountains, Tanahun
  tansen:        "1529733905113-027ed85d7e33",  // Colorful temple miniatures, Palpa
} as const;

/** Build a 4-image gallery from a list of photo IDs. */
export const gallery = (...ids: string[]) => ids.map((id) => img(id, 1400));
