import { Schema, type SchemaOptions } from "mongoose";

/**
 * Base options applied to every top-level schema so that JSON output matches
 * the frontend's TypeScript interfaces exactly: a string `id` field, and no
 * `_id` / `__v` leakage.
 */
export const baseSchemaOptions: SchemaOptions = {
  versionKey: false,
  id: false, // disable Mongoose's default ObjectId-backed `id` virtual; we use our own string `id`
  toJSON: {
    virtuals: false,
    transform(_doc, ret: Record<string, unknown>) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: false,
    transform(_doc, ret: Record<string, unknown>) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
};

/** Reusable { lat, lng } sub-schema. */
export const coordinatesSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  { _id: false }
);
