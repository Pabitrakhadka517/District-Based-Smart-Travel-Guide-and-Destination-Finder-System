import type { Request, Response } from "express";
import { Booking } from "../models/Booking";
import { Destination } from "../models/Destination";
import { ok, fail } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { genId, today } from "../utils/ids";

const VALID_ACCOMMODATION = ["Budget", "Standard", "Luxury"] as const;
const VALID_TRANSPORT = ["Local Bus", "Private Jeep", "Domestic Flight"] as const;
const VALID_STATUSES = ["pending", "confirmed", "cancelled"] as const;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Flat per-traveler estimate (NPR) — kept simple and transparent since the
 *  form only collects a single travel date, not a trip length. */
const ACCOMMODATION_RATE: Record<(typeof VALID_ACCOMMODATION)[number], number> = {
  Budget: 2000,
  Standard: 5000,
  Luxury: 12000
};

const TRANSPORT_RATE: Record<(typeof VALID_TRANSPORT)[number], number> = {
  "Local Bus": 1500,
  "Private Jeep": 5000,
  "Domestic Flight": 12000
};

function estimateCost(
  travelers: number,
  accommodationType: (typeof VALID_ACCOMMODATION)[number],
  transportPreference: (typeof VALID_TRANSPORT)[number]
): number {
  return travelers * (ACCOMMODATION_RATE[accommodationType] + TRANSPORT_RATE[transportPreference]);
}

// GET /api/bookings  (requireAuth) → the current user's bookings
export const listBookings = asyncHandler(async (req: Request, res: Response) => {
  const bookings = await Booking.find({ userId: req.auth!.sub }).sort({ travelDate: 1 });
  ok(res, bookings);
});

// POST /api/bookings  (requireAuth)
export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body ?? {};

  const destinationId = String(body.destinationId ?? "");
  if (!destinationId) return fail(res, "destinationId is required", 400);
  const destination = await Destination.findOne({ id: destinationId });
  if (!destination) return fail(res, "Destination not found", 404);

  const travelDate = String(body.travelDate ?? "");
  if (!DATE_RE.test(travelDate)) return fail(res, "travelDate must be YYYY-MM-DD", 400);
  if (travelDate < today()) return fail(res, "travelDate cannot be in the past", 400);

  const travelers = Number(body.travelers ?? 1);
  if (!Number.isFinite(travelers) || travelers < 1) return fail(res, "travelers must be a positive number", 400);

  const budget = Number(body.budget ?? 0);
  if (!Number.isFinite(budget) || budget < 0) return fail(res, "budget must be a non-negative number", 400);

  const accommodationType = String(body.accommodationType ?? "Standard");
  if (!VALID_ACCOMMODATION.includes(accommodationType as (typeof VALID_ACCOMMODATION)[number])) {
    return fail(res, `accommodationType must be one of: ${VALID_ACCOMMODATION.join(", ")}`, 400);
  }

  const transportPreference = String(body.transportPreference ?? "Local Bus");
  if (!VALID_TRANSPORT.includes(transportPreference as (typeof VALID_TRANSPORT)[number])) {
    return fail(res, `transportPreference must be one of: ${VALID_TRANSPORT.join(", ")}`, 400);
  }

  const estimatedCost = estimateCost(
    travelers,
    accommodationType as (typeof VALID_ACCOMMODATION)[number],
    transportPreference as (typeof VALID_TRANSPORT)[number]
  );

  const booking = await Booking.create({
    id: genId("bk"),
    userId: req.auth!.sub,
    destinationId,
    travelDate,
    travelers,
    budget,
    accommodationType,
    transportPreference,
    estimatedCost,
    status: "pending",
    notes: typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : ""
  });

  ok(res, booking, 201);
});

// PATCH /api/bookings/:id  (requireAuth, own booking only) — status changes (e.g. cancel)
export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = String(req.body?.status ?? "");
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return fail(res, `status must be one of: ${VALID_STATUSES.join(", ")}`, 400);
  }

  const booking = await Booking.findOneAndUpdate(
    { id: req.params.id, userId: req.auth!.sub },
    { $set: { status } },
    { new: true, runValidators: true }
  );
  if (!booking) return fail(res, "Booking not found", 404);
  ok(res, booking);
});

// DELETE /api/bookings/:id  (requireAuth, own booking only)
export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findOneAndDelete({ id: req.params.id, userId: req.auth!.sub });
  if (!booking) return fail(res, "Booking not found", 404);
  ok(res, { id: req.params.id, deleted: true });
});
