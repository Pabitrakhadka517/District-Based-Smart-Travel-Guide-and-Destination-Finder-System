import { guides } from "@/data/guides";
import { ok } from "@/lib/api";
export async function GET() { return ok(guides); }
