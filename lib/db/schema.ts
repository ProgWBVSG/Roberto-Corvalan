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
