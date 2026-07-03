import { Schema, model, type InferSchemaType } from "mongoose";
import type { ITrek } from "./types";
import { baseSchemaOptions } from "./shared";

const trekDaySchema = new Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    detail: { type: String, default: "" },
    altitude: { type: Number, default: 0 },
    hours: { type: String, default: "" }
  },
  { _id: false }
);

const trekSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    region: { type: String, default: "" },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging", "Strenuous"],
      required: true,
      index: true
    },
    durationDays: { type: Number, default: 0 },
    maxAltitude: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    bestSeasons: { type: [String], default: [] },
    permits: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    itinerary: { type: [trekDaySchema], default: [] },
    rating: { type: Number, default: 0 },
    priceFrom: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true }
  },
  baseSchemaOptions
);

trekSchema.index({ name: "text", tagline: "text", description: "text" });

export type TrekDoc = InferSchemaType<typeof trekSchema>;
export const Trek = model<ITrek>("Trek", trekSchema);
