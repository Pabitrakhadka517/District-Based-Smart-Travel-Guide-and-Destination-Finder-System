import type { Request, Response } from "express";
import { User } from "../models/User";
import { ok, fail } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

const VALID_ROLES = ["user", "admin"] as const;

// GET /api/users (admin)
export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().sort({ joinedAt: -1 }).limit(500);
  ok(res, users);
});

// GET /api/users/:id (admin)
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req.params.id });
  if (!user) return fail(res, "User not found", 404);
  ok(res, user);
});

// PATCH /api/users/:id/role { role } (admin)
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.body ?? {};
  if (!VALID_ROLES.includes(role)) return fail(res, "role must be 'user' or 'admin'", 400);

  // Prevent an admin from accidentally demoting their own account
  if (req.params.id === req.auth!.sub) {
    return fail(res, "You cannot change your own role", 400);
  }

  const user = await User.findOneAndUpdate({ id: req.params.id }, { role }, { new: true });
  if (!user) return fail(res, "User not found", 404);
  ok(res, user);
});

// DELETE /api/users/:id (admin)
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  // Prevent an admin from deleting their own account via this endpoint
  if (req.params.id === req.auth!.sub) {
    return fail(res, "You cannot delete your own account", 400);
  }

  const user = await User.findOneAndDelete({ id: req.params.id });
  if (!user) return fail(res, "User not found", 404);
  ok(res, { id: req.params.id, deleted: true });
});
