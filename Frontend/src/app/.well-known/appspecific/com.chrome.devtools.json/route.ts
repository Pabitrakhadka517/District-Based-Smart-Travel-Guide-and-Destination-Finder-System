import { NextResponse } from "next/server";

// Chrome DevTools probes this path automatically when open; without a
// handler it 404s and spams the dev server log on every page load.
export function GET() {
  return NextResponse.json({});
}
