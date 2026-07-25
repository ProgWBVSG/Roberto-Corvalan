import { cache } from "react";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, ensureSchema } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { contentSchema, defaultContent, imgSrc, type SiteContent } from "@/lib/content-schema";

const ROW_ID = 1;

/**
 * Lee el contenido del sitio desde la base. Si falta la fila, o si el JSON
 * guardado quedó incompleto/corrupto respecto al esquema actual, cada
 * sección faltante o inválida cae de vuelta al default de esa sección
 * (nunca rompe la página pública por un problema de datos).
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  try {
    await ensureSchema();
    const rows = await db.select().from(siteContent).where(eq(siteContent.id, ROW_ID)).limit(1);
    const raw = rows[0]?.data;
    if (!raw) return defaultContent;

    const parsedJson = JSON.parse(raw) as Record<string, unknown>;
    // Merge por sección: lo guardado pisa el default, sección por sección.
    const merged: Record<string, unknown> = { ...defaultContent };
    for (const key of Object.keys(defaultContent) as (keyof SiteContent)[]) {
      if (parsedJson[key] !== undefined) merged[key] = parsedJson[key];
    }

    const result = contentSchema.safeParse(merged);
    if (result.success) return result.data;

    console.error("Contenido guardado inválido, usando defaults:", result.error.flatten());
    return defaultContent;
  } catch (err) {
    console.error("Error leyendo contenido, usando defaults:", err);
    return defaultContent;
  }
});

/** Valida y persiste el contenido completo, y revalida la home en vivo. */
export async function saveContent(input: unknown): Promise<SiteContent> {
  const validated = contentSchema.parse(input);
  await ensureSchema();

  const json = JSON.stringify(validated);
  await db
    .insert(siteContent)
    .values({ id: ROW_ID, data: json })
    .onConflictDoUpdate({
      target: siteContent.id,
      set: { data: json, updatedAt: Math.floor(Date.now() / 1000) },
    });

  revalidatePath("/");
  revalidatePath("/privacidad");
  revalidatePath("/terminos");
  return validated;
}

/** Props listas para <Footer />, reutilizadas en la home y las páginas legales. */
export async function getFooterProps() {
  const content = await getContent();
  const { global, footer, servicios } = content;
  return {
    bio: footer.bio,
    serviciosNombres: servicios.items.map((s) => s.titulo),
    whatsappUrl: `https://wa.me/${global.whatsappNumber}?text=${encodeURIComponent(global.whatsappDefaultMessage)}`,
    email: global.email,
    cicBadgeLinea1: footer.cicBadgeLinea1,
    cicBadgeLinea2: footer.cicBadgeLinea2,
    cicImagenSrc: imgSrc(footer.cicImagen),
    cicImagenAlt: footer.cicImagen.alt,
    ubicacion: footer.ubicacion,
  };
}
