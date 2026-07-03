import type { Request, Response } from "express";
import { District } from "../models/District";
import { City } from "../models/City";
import { ok, fail } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { genId } from "../utils/ids";
import { pick } from "../utils/sanitize";

const DISTRICT_FIELDS = [
  "slug", "name", "province", "description", "heroImage", "coordinates",
  "cityCount", "destinationCount", "popularFor", "rating", "bestSeason", "attractionCount"
];

// GET /api/districts
export const listDistricts = asyncHandler(async (_req: Request, res: Response) => {
  // Sort by province then name for consistent, meaningful ordering
  const districts = await District.find().sort({ province: 1, name: 1 });
  ok(res, districts);
});

// GET /api/districts/:slug -> { district, cities }
export const getDistrict = asyncHandler(async (req: Request, res: Response) => {
  const district = await District.findOne({ slug: req.params.slug });
  if (!district) return fail(res, "District not found", 404);
  const cities = await City.find({ districtId: district.id }).sort({ name: 1 });
  ok(res, { district, cities });
});

// --- Admin CRUD ---

export const createDistrict = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, DISTRICT_FIELDS);
  const district = await District.create({ ...body, id: (body.id as string) ?? genId("d") });
  ok(res, district, 201);
});

export const updateDistrict = asyncHandler(async (req: Request, res: Response) => {
  const body = pick(req.body as Record<string, unknown>, DISTRICT_FIELDS);
  if (body.slug) {
    const conflict = await District.findOne({ slug: body.slug, id: { $ne: req.params.id } });
    if (conflict) return fail(res, `Slug "${body.slug}" is already used by another district.`, 409);
  }
  const district = await District.findOneAndUpdate(
    { id: req.params.id },
    { $set: body },
    { new: true, runValidators: true }
  );
  if (!district) return fail(res, "District not found", 404);
  ok(res, district);
});

export const deleteDistrict = asyncHandler(async (req: Request, res: Response) => {
  const district = await District.findOneAndDelete({ id: req.params.id });
  if (!district) return fail(res, "District not found", 404);
  ok(res, { id: req.params.id, deleted: true });
});
