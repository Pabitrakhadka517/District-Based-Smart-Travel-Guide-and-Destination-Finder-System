import cloudinaryMap from "./cloudinary-map.json";

interface MappedAsset {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

const UNSPLASH_MAP = cloudinaryMap.unsplash as Record<string, MappedAsset>;
const PRAVATAR_MAP = cloudinaryMap.pravatar as Record<string, MappedAsset>;
const PLACEHOLDERS = cloudinaryMap.placeholders as Record<string, MappedAsset>;

/**
 * All seed imagery is migrated onto this project's own Cloudinary account
 * (see `cloudinary-migrate.ts` + `cloudinary-map.json`) — there is no longer
 * any runtime dependency on Unsplash/pravatar.cc. `id`/`i` here are just the
 * lookup keys into that migrated map; `w`/`q` are intentionally unused now
 * since Cloudinary delivers responsive sizing/format via URL transformations
 * applied at render time (see `Frontend/src/lib/cloudinary.ts`'s `cld()`),
 * not by baking one fixed size into the stored URL.
 */
export const img = (id: string, _w = 1200, _q = 80): string => {
  const asset = UNSPLASH_MAP[id];
  if (!asset) {
    // Should never happen once the map is complete — fail loudly in seeding
    // rather than silently reintroducing an external dependency.
    throw new Error(`No migrated Cloudinary asset for Unsplash photo id "${id}". Run cloudinary-migrate.ts.`);
  }
  return asset.url;
};

/** Same idea as `img()`, but for the pravatar-sourced avatar photos. */
export const avatar = (i: number): string => {
  const asset = PRAVATAR_MAP[String(i)];
  if (!asset) {
    throw new Error(`No migrated Cloudinary asset for pravatar avatar #${i}. Run cloudinary-migrate.ts.`);
  }
  return asset.url;
};

export const PHOTO = {
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
  stupa1: "1605640840605-14ac1855827b",
  stupa2: "1592285896110-8d88b5b3a5d8",
  square1: "1571536802807-30451e3955d8",
  durbarSquareKTM: "1736457093305-5c54384fc49e",
  patanCourtyard: "1699204121879-f7d805d3bc41",
  thamelStreet: "1580321827154-812450ccf214",
  lake1: "1526772662000-3f88f10405ff",
  lake2: "1506905925346-21bda4d32df4",
  jungle1: "1581852017103-68ac65514cf7",
  forest2: "1470071459604-3b5ec3a7fe05",
  hotel1: "1566073771259-6a8506099945",
  hotel2: "1551882547-ff40c63fe5fa",
  lodge1: "1455587734955-081b22074882",
  // District hero images — verified CDN IDs
  ebc:           "1522774607452-dac2ecc66330",
  kanchenjunga:  "1627119703136-3964f14b7325",
  swayambhu:     "1665435246383-4103fc803522",
  patanDurbar:   "1676299950521-638fa4f0f475",
  bhaktapurSq:   "1706188047078-0ba67733fa45",
  chitwan:       "1498712067384-01239c6b377c",
  phewa:         "1659808909524-5fcad5cd48bf",
  mustangDesert: "1642402734863-15ead077a324",
  manaslu:       "1610912335893-b996d1743610",
  annapurna:     "1653043506251-05cecdfe9cfd",
  teaHills:      "1742106856193-5cc3424ac450",
  teaPickers:    "1758390286435-e559ab6d4596",
  tiger:         "1714318808656-1aa1639eae15",
  himalayaLake:  "1715935257216-fdba0eadd42a",
  sacredLake:    "1715935564077-bc4e06915d8c",
  brickTemple:   "1760366621342-5c4703099c2c",
  janakpur:      "1540996654611-699b763e8a1f",
  nuwakotPalace: "1669557582081-274a568aff4d",
  namobuddha:    "1540961286473-8ad1368dc1bd",
  nepalHills:    "1599751229070-854ae5c90869",
  tanahun:       "1731339987698-a9ddbd4be744",
  tansen:        "1529733905113-027ed85d7e33",
  // Festival-specific photos — verified CDN IDs
  holiColors:    "1774160481361-ddc7c7c5f0eb",
  tiharDiya:     "1605292356183-a77d0a9c9d1d",
  dashainKite:   "1572140857887-c4324122ff1e",
} as const;

export const gallery = (...ids: string[]): string[] => ids.map((id) => img(id, 1400));

export interface SeedImage {
  url: string;
  publicId: string | null;
  alt: string;
}

/** Cloudinary embeds the asset's public_id in its own delivery URL, so it can
 *  always be recovered from a migrated URL without a separate lookup table. */
function extractPublicId(url: string): string | null {
  const match = /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+(?:\?.*)?$/.exec(url);
  return match ? match[1] : null;
}

/**
 * Wraps a seed URL string into the structured image shape the models expect.
 * Every URL produced by `img()`/`avatar()` is now a real Cloudinary asset, so
 * `publicId` is recovered from the URL itself (real assets are safe to send
 * to Cloudinary's destroy API — unlike the old Unsplash/pravatar URLs, which
 * is why `publicId` stayed `null` before this migration).
 */
export const toImage = (url: string, alt: string): SeedImage => ({
  url: url ?? "",
  publicId: url ? extractPublicId(url) : null,
  alt
});

export const toGallery = (urls: string[], alt: string): SeedImage[] =>
  (urls ?? []).map((url, i) => toImage(url, `${alt} — photo ${i + 1}`));

/** Dedicated default assets — used by User/Review model defaults, the
 *  anonymous-reviewer fallback, and the frontend's missing-image fallback. */
export const DEFAULT_AVATAR: SeedImage = toImage(PLACEHOLDERS.defaultAvatar.url, "");
export const DEFAULT_IMAGE: SeedImage = toImage(PLACEHOLDERS.defaultImage.url, "");
