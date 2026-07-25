import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
  perfil: text("perfil").notNull(),
  mensaje: text("mensaje").notNull(),
  // nuevo | contactado | archivado
  estado: text("estado").notNull().default("nuevo"),
  notas: text("notas").notNull().default(""),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
});

export type Lead = typeof leads.$inferSelect;

// Fila única (id=1) con todo el contenido editable del sitio, como JSON.
export const siteContent = sqliteTable("site_content", {
  id: integer("id").primaryKey(),
  data: text("data").notNull(),
  updatedAt: integer("updated_at").notNull().default(sql`(unixepoch())`),
});

// Imágenes subidas desde el panel, servidas por /api/media/[id].
export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  dataBase64: text("data_base64").notNull(),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
});

export type MediaRow = typeof media.$inferSelect;
