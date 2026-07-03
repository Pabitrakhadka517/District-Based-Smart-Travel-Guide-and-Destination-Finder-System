import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init);
}
export function notFound(message = "Not found") {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}
