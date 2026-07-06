import { Schema, model } from "mongoose";
import type { IAuditLog } from "./types";

const auditLogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    action: { type: String, required: true },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
    // Indexed below via `.index()` (with the TTL option) instead of `index: true`
    // here — declaring both throws a duplicate-index warning at startup.
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: false,
      transform(_doc, ret: Record<string, unknown>) {
        delete ret._id;
        return ret;
      }
    }
  }
);

// Auto-expire logs after 90 days
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });

export const AuditLog = model<IAuditLog>("AuditLog", auditLogSchema);
