import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// En desarrollo usa un archivo SQLite local (file:./data/leads.db).
// En producción (Turso u otro libSQL) definí TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.
const url = process.env.TURSO_DATABASE_URL ?? "file:./data/leads.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });

let ready: Promise<unknown> | null = null;

/** Crea las tablas si no existen. Idempotente y cacheado por proceso. */
export function ensureSchema() {
  if (!ready) {
    ready = Promise.all([
      client.execute(`
        CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT NOT NULL,
          perfil TEXT NOT NULL,
          mensaje TEXT NOT NULL,
          estado TEXT NOT NULL DEFAULT 'nuevo',
          notas TEXT NOT NULL DEFAULT '',
          created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS site_content (
          id INTEGER PRIMARY KEY,
          data TEXT NOT NULL,
          updated_at INTEGER NOT NULL DEFAULT (unixepoch())
        )
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS media (
          id TEXT PRIMARY KEY,
          mime_type TEXT NOT NULL,
          data_base64 TEXT NOT NULL,
          created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )
      `),
    ]);
  }
  return ready;
}
