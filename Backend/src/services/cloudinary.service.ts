import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";
import type { IImage } from "../models/types";

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure: true
});

/**
 * Fixed allowlist mapping a client-supplied `type` to a Cloudinary folder.
 * Never build the folder path from client input directly — that would let a
 * caller write into an arbitrary folder.
 */
export const UPLOAD_TYPES = [
  "district",
  "city",
  "destination-cover",
  "destination-gallery",
  "attraction-cover",
  "attraction-gallery",
  "trek-cover",
  "trek-gallery",
  "festival",
  "guide-cover",
  "guide-avatar",
  "avatar",
  "review",
  "planner"
] as const;

export type UploadType = (typeof UPLOAD_TYPES)[number];

const FOLDER_MAP: Record<UploadType, string> = {
  district: "nepalyatra/districts",
  city: "nepalyatra/districts",
  "destination-cover": "nepalyatra/destinations",
  "destination-gallery": "nepalyatra/gallery",
  "attraction-cover": "nepalyatra/attractions",
  "attraction-gallery": "nepalyatra/gallery",
  "trek-cover": "nepalyatra/treks",
  "trek-gallery": "nepalyatra/gallery",
  festival: "nepalyatra/banners",
  "guide-cover": "nepalyatra/guides",
  "guide-avatar": "nepalyatra/users",
  avatar: "nepalyatra/users",
  review: "nepalyatra/reviews",
  planner: "nepalyatra/planner"
};

/** Content types that only an admin may upload/replace. */
export const ADMIN_ONLY_TYPES: ReadonlySet<UploadType> = new Set([
  "district",
  "city",
  "destination-cover",
  "destination-gallery",
  "attraction-cover",
  "attraction-gallery",
  "trek-cover",
  "trek-gallery",
  "festival",
  "guide-cover",
  "guide-avatar"
]);

export function isUploadType(value: unknown): value is UploadType {
  return typeof value === "string" && (UPLOAD_TYPES as readonly string[]).includes(value);
}

/**
 * Dedicated default/fallback assets, migrated once into `nepalyatra/placeholders/`
 * (see `seed/cloudinary-migrate.ts`) so model defaults and anonymous-user
 * fallbacks are real, deletable-safe Cloudinary assets instead of a
 * hardcoded pravatar.cc/Unsplash URL with `publicId: null`.
 */
export const PLACEHOLDER = {
  avatar: {
    publicId: "nepalyatra/placeholders/default-avatar",
    get url() { return cloudinary.url(PLACEHOLDER.avatar.publicId, { secure: true }); }
  },
  image: {
    publicId: "nepalyatra/placeholders/default-image",
    get url() { return cloudinary.url(PLACEHOLDER.image.publicId, { secure: true }); }
  }
} as const;

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
}

function uploadBuffer(buffer: Buffer, folder: string): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result as CloudinaryUploadResult);
      }
    );
    stream.end(buffer);
  });
}

/** Best-effort tiny base64 blur placeholder — never throws, returns "" on failure. */
async function fetchBlurDataUrl(publicId: string): Promise<string> {
  try {
    const blurUrl = cloudinary.url(publicId, {
      transformation: [{ width: 20, effect: "blur:1000", quality: 1, fetch_format: "auto" }],
      secure: true
    });
    const res = await fetch(blurUrl);
    if (!res.ok) return "";
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}

export async function uploadImage(buffer: Buffer, type: UploadType, alt: string): Promise<IImage> {
  const folder = FOLDER_MAP[type];
  const result = await uploadBuffer(buffer, folder);
  const blurDataUrl = await fetchBlurDataUrl(result.public_id);
  return {
    url: result.secure_url,
    publicId: result.public_id,
    alt,
    width: result.width,
    height: result.height,
    blurDataUrl
  };
}

/** No-ops safely when publicId is null/empty — legacy Unsplash entries are never sent to Cloudinary. */
export async function deleteImage(publicId: string | null | undefined): Promise<void> {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (err) {
    console.error("[cloudinary] Failed to delete asset", publicId, err);
  }
}

/**
 * Deliberately untyped input: callers pass Mongoose (sub)document image fields
 * whose inferred TS shape varies by model (some models type their nested
 * `imageSchema` fields precisely, others don't — see `Attraction`/`User`
 * for the difference). Only `.publicId` is ever read, so narrow at runtime.
 */
type ImageOrGallery = unknown;

function collectPublicIds(groups: ImageOrGallery[]): Set<string> {
  const ids = new Set<string>();
  for (const group of groups) {
    if (!group) continue;
    for (const img of Array.isArray(group) ? group : [group]) {
      const publicId = (img as { publicId?: unknown } | null | undefined)?.publicId;
      if (typeof publicId === "string" && publicId) ids.add(publicId);
    }
  }
  return ids;
}

/**
 * Best-effort cleanup for admin content updates/deletes: deletes any Cloudinary
 * asset present in `before` (the document's image fields prior to the write)
 * that is no longer present in `after` (the fields after the write, or `[]`
 * when the whole document was deleted). Never throws — fire-and-forget.
 */
export function cleanupReplacedImages(before: ImageOrGallery[], after: ImageOrGallery[]): void {
  const beforeIds = collectPublicIds(before);
  const afterIds = collectPublicIds(after);
  for (const id of beforeIds) {
    if (!afterIds.has(id)) void deleteImage(id);
  }
}
