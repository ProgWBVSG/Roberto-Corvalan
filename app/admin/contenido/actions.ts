"use server";

import { isAuthed } from "@/lib/auth";
import { saveContent } from "@/lib/content";

export async function saveContentAction(
  data: unknown
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAuthed())) {
    return { ok: false, error: "No autorizado" };
  }
  try {
    await saveContent(data);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}
