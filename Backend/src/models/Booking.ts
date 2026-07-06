import { Schema, model, type InferSchemaType } from "mongoose";
import type { IBooking } from "./types";
import { baseSchemaOptions } from "./shared";

const bookingSchema = new Schema(
  {
    id:            { type: String, required: true, unique: true, index: true },
    userId:        { type: String, required: true, index: true },
    destinationId: { type: String, required: true, index: true },
    travelDate:    { type: String, required: true },
    travelers:     { type: Number, default: 1, min: 1 },
    budget:        { type: Number, default: 0, min: 0 },
    accommodationType: {
      type: String,
      enum: ["Budget", "Standard", "Luxury"],
      default: "Standard"
    },
    transportPreference: {
      type: String,
      enum: ["Local Bus", "Private Jeep", "Domestic Flight"],
      default: "Local Bus"
    },
    estimatedCost: { type: Number, default: 0 },
    status:        { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    notes:         { type: String, default: "" }
    // createdAt / updatedAt come from baseSchemaOptions' `timestamps: true`.
  },
  baseSchemaOptions
);

bookingSchema.index({ userId: 1, travelDate: 1 });

// Prevent a double form-submit (or resubmit) from creating two identical active
// bookings. Scoped to non-cancelled bookings so a user can freely rebook the
// same destination/date after cancelling.
bookingSchema.index(
  { userId: 1, destinationId: 1, travelDate: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } }
);

export type BookingDoc = InferSchemaType<typeof bookingSchema>;
export const Booking = model<IBooking>("Booking", bookingSchema);
