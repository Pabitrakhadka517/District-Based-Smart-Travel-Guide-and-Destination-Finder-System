import { Schema, model, type InferSchemaType } from "mongoose";
import type { IDistrict } from "./types";
import { baseSchemaOptions, coordinatesSchema } from "./shared";

const districtSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    province: { type: String, required: true },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    coordinates: { type: coordinatesSchema, required: true },
    cityCount: { type: Number, default: 0 },
    destinationCount: { type: Number, default: 0 },
    popularFor: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    bestSeason: { type: String, default: "" },
    attractionCount: { type: Number, default: 0 }
  },
  baseSchemaOptions
);

export type DistrictDoc = InferSchemaType<typeof districtSchema>;
export const District = model<IDistrict>("District", districtSchema);
