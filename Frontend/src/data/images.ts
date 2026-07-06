import { cld, cloudinaryUrl } from "@/lib/cloudinary";

/**
 * Curated marketing/hero imagery for public pages (homepage, about, treks,
 * auth layout). Every id below is this project's own Cloudinary public_id —
 * migrated from Unsplash via `Backend/src/seed/cloudinary-migrate.ts` so the
 * app has no runtime dependency on external image hosts. `img()` applies
 * Cloudinary's own f_auto/q_auto/responsive-crop transformation on top.
 */
export const img = (publicId: string, w = 1200): string =>
  cld(cloudinaryUrl(publicId), { width: w, quality: "auto" });

// Themed, vetted photos — Cloudinary public_ids (see folder for context).
export const PHOTO = {
  // Mountains / Himalaya / trekking
  himalaya1: "nepalyatra/gallery/unsplash_1544735716-392fe2489ffa",
  himalaya2: "nepalyatra/gallery/unsplash_1486911278844-a81c5267e227",
  himalaya3: "nepalyatra/gallery/unsplash_1469854523086-cc02fe5d8800",
  himalaya4: "nepalyatra/gallery/unsplash_1551632811-561732d1e306",
  himalaya5: "nepalyatra/gallery/unsplash_1454496522488-7a8e488e8606",
  himalaya6: "nepalyatra/gallery/unsplash_1464822759023-fed622ff2c3b",
  himalaya7: "nepalyatra/gallery/unsplash_1506905925346-21bda4d32df4",
  himalaya8: "nepalyatra/gallery/unsplash_1519681393784-d120267933ba",
  himalaya9: "nepalyatra/gallery/unsplash_1458668383970-8ddd3927deed",
  forest1: "nepalyatra/gallery/unsplash_1470071459604-3b5ec3a7fe05",
  // Temples / heritage / culture
  stupa1: "nepalyatra/gallery/unsplash_1605640840605-14ac1855827b",
  stupa2: "nepalyatra/gallery/unsplash_1592285896110-8d88b5b3a5d8",
  square1: "nepalyatra/gallery/unsplash_1571536802807-30451e3955d8",
  // Lakes / water
  lake1: "nepalyatra/gallery/unsplash_1526772662000-3f88f10405ff",
  lake2: "nepalyatra/gallery/unsplash_1506905925346-21bda4d32df4",
  // Wildlife / jungle
  jungle1: "nepalyatra/gallery/unsplash_1581852017103-68ac65514cf7",
  forest2: "nepalyatra/gallery/unsplash_1470071459604-3b5ec3a7fe05",
  // Hospitality
  hotel1: "nepalyatra/gallery/unsplash_1566073771259-6a8506099945",
  hotel2: "nepalyatra/gallery/unsplash_1551882547-ff40c63fe5fa",
  lodge1: "nepalyatra/gallery/unsplash_1455587734955-081b22074882",
  // District hero images
  ebc:           "nepalyatra/districts/unsplash_1522774607452-dac2ecc66330",
  kanchenjunga:  "nepalyatra/districts/unsplash_1627119703136-3964f14b7325",
  swayambhu:     "nepalyatra/districts/unsplash_1665435246383-4103fc803522",
  patanDurbar:   "nepalyatra/districts/unsplash_1676299950521-638fa4f0f475",
  bhaktapurSq:   "nepalyatra/districts/unsplash_1706188047078-0ba67733fa45",
  chitwan:       "nepalyatra/districts/unsplash_1498712067384-01239c6b377c",
  phewa:         "nepalyatra/districts/unsplash_1659808909524-5fcad5cd48bf",
  mustangDesert: "nepalyatra/districts/unsplash_1642402734863-15ead077a324",
  manaslu:       "nepalyatra/districts/unsplash_1610912335893-b996d1743610",
  annapurna:     "nepalyatra/districts/unsplash_1653043506251-05cecdfe9cfd",
  teaHills:      "nepalyatra/districts/unsplash_1742106856193-5cc3424ac450",
  teaPickers:    "nepalyatra/districts/unsplash_1758390286435-e559ab6d4596",
  tiger:         "nepalyatra/districts/unsplash_1714318808656-1aa1639eae15",
  himalayaLake:  "nepalyatra/districts/unsplash_1715935257216-fdba0eadd42a",
  sacredLake:    "nepalyatra/districts/unsplash_1715935564077-bc4e06915d8c",
  brickTemple:   "nepalyatra/districts/unsplash_1760366621342-5c4703099c2c",
  janakpur:      "nepalyatra/districts/unsplash_1540996654611-699b763e8a1f",
  nuwakotPalace: "nepalyatra/districts/unsplash_1669557582081-274a568aff4d",
  namobuddha:    "nepalyatra/districts/unsplash_1540961286473-8ad1368dc1bd",
  nepalHills:    "nepalyatra/districts/unsplash_1599751229070-854ae5c90869",
  tanahun:       "nepalyatra/districts/unsplash_1731339987698-a9ddbd4be744",
  tansen:        "nepalyatra/districts/unsplash_1529733905113-027ed85d7e33",
} as const;

/** Build a 4-image gallery from a list of PHOTO public_ids. */
export const gallery = (...ids: string[]) => ids.map((id) => img(id, 1400));
