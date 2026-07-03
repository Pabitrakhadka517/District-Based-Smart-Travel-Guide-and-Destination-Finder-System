import { Schema, model, type InferSchemaType } from "mongoose";
import type { IGuide } from "./types";
import { baseSchemaOptions } from "./shared";

const guideSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Tips", "Itineraries", "Culture", "Food", "Trekking"],
      required: true,
      index: true
    },
    cover: { type: String, default: "" },
    author: { type: String, default: "" },
    authorAvatar: { type: String, default: "" },
    date: { type: String, default: "" },
    readMinutes: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    body: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true }
  },
  baseSchemaOptions
);

guideSchema.index({ title: "text", excerpt: "text" });

export type GuideDoc = InferSchemaType<typeof guideSchema>;
export const Guide = model<IGuide>("Guide", guideSchema);
