import { Schema, model, type InferSchemaType } from "mongoose";
import type { IFestival } from "./types";
import { baseSchemaOptions } from "./shared";

const festivalSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    month: { type: String, default: "" },
    season: { type: String, enum: ["Spring", "Summer", "Autumn", "Winter"], required: true },
    type: { type: String, enum: ["Religious", "Cultural", "Harvest", "National"], required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    where: { type: String, default: "" },
    duration: { type: String, default: "" }
  },
  baseSchemaOptions
);

festivalSchema.index({ name: "text", description: "text" });

export type FestivalDoc = InferSchemaType<typeof festivalSchema>;
export const Festival = model<IFestival>("Festival", festivalSchema);
