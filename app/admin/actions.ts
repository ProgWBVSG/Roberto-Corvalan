"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, ensureSchema } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { isAuthed } from "@/lib/auth";

const ESTADOS = ["nuevo", "contactado", "archivado"] as const;

async function guard() {
  if (!(await isAuthed())) throw new Error("No autorizado");
  await ensureSchema();
}

export async function setEstado(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  const estado = String(formData.get("estado"));
  if (!Number.isInteger(id) || !ESTADOS.includes(estado as (typeof ESTADOS)[number])) {
    return;
  }
  await db.update(leads).set({ estado }).where(eq(leads.id, id));
  revalidatePath("/admin");
}

export async function saveNotas(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  const notas = String(formData.get("notas") ?? "").slice(0, 2000);
  if (!Number.isInteger(id)) return;
  await db.update(leads).set({ notas }).where(eq(leads.id, id));
  revalidatePath("/admin");
}

export async function removeLead(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin");
}
