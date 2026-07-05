import type { Request, Response } from "express";
import { Festival } from "../models/Festival";
import { ok, fail } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { genId } from "../utils/ids";
import { pick, sanitizeImage } from "../utils/sanitize";
import { cleanupReplacedImages } from "../services/cloudinary.service";

const FESTIVAL_FIELDS = [
  "slug", "name", "month", "season", "type", "description", "image", "where",
  "districtId", "isNationwide", "duration", "coordinates"
];

// GET /api/festivals
export const listFestivals = asyncHandler(async (_req: Request, res: Response) => {
  const festivals = await Festival.find().sort({ name: 1 });
  ok(res, festivals);
});

// GET /api/festivals/:slug
export const getFestival = asyncHandler(async (req: Request, res: Response) => {
  const festival = await Festival.findOne({ slug: req.params.slug });
  if (!festival) return fail(res, "Festival not found", 404);
  ok(res, festival);
});

// --- Admin CRUD ---

export const createFestival = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, FESTIVAL_FIELDS);
  if (body.image !== undefined) body.image = sanitizeImage(body.image);
  const festival = await Festival.create({ ...body, id: (body.id as string) ?? genId("f") });
  ok(res, festival, 201);
});

export const updateFestival = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, FESTIVAL_FIELDS);
  if (body.image !== undefined) body.image = sanitizeImage(body.image);

  const existing = await Festival.findOne({ id: req.params.id }).select("image");
  const festival = await Festival.findOneAndUpdate(
    { id: req.params.id },
    { $set: body },
    { new: true, runValidators: true }
  );
  if (!festival) return fail(res, "Festival not found", 404);
  cleanupReplacedImages([existing?.image], [festival.image]);
  ok(res, festival);
});

export const deleteFestival = asyncHandler(async (req: Request, res: Response) => {
  const festival = await Festival.findOneAndDelete({ id: req.params.id });
  if (!festival) return fail(res, "Festival not found", 404);
  cleanupReplacedImages([festival.image], []);
  ok(res, { id: req.params.id, deleted: true });
});
