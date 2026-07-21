import { NextResponse } from "next/server";
import { db, ensureSchema } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

// Rate-limit simple en memoria (por instancia): máx 5 envíos/min por IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Demasiados envíos" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  // Honeypot: si un bot completó el campo oculto, fingimos éxito y descartamos.
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await ensureSchema();
    await db.insert(leads).values({
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      perfil: parsed.data.perfil,
      mensaje: parsed.data.mensaje,
    });
  } catch (err) {
    console.error("Error guardando lead:", err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
