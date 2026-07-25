import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, ensureSchema } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await ensureSchema();
  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1);
  const row = rows[0];
  if (!row) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const buffer = Buffer.from(row.dataBase64, "base64");
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": row.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
