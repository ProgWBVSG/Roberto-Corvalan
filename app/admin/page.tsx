import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db, ensureSchema } from "@/lib/db";
import { leads, type Lead } from "@/lib/db/schema";
import { isAuthed } from "@/lib/auth";
import { removeLead, saveNotas, setEstado } from "./actions";

export const metadata: Metadata = {
  title: "Consultas — Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ESTADOS = ["nuevo", "contactado", "archivado"] as const;
type Estado = (typeof ESTADOS)[number];

const estadoStyle: Record<Estado, string> = {
  nuevo: "bg-gold/15 text-gold-2 border-gold/30",
  contactado: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  archivado: "bg-white/5 text-white/40 border-white/10",
};

function fecha(unix: number) {
  return new Date(unix * 1000).toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  await ensureSchema();
  const all = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const { estado: filtro } = await searchParams;
  const activeFilter =
    filtro && ESTADOS.includes(filtro as Estado) ? (filtro as Estado) : null;
  const visibles = activeFilter
    ? all.filter((l) => l.estado === activeFilter)
    : all;

  const counts = {
    total: all.length,
    nuevo: all.filter((l) => l.estado === "nuevo").length,
    contactado: all.filter((l) => l.estado === "contactado").length,
    archivado: all.filter((l) => l.estado === "archivado").length,
  };

  return (
    <main className="min-h-screen bg-navy text-ivory">
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-2 mb-1.5">
              Panel de consultas
            </p>
            <h1 className="font-display text-2xl md:text-3xl">Roberto C. Corvalán</h1>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button className="rounded-full border border-[color:var(--navy-line)] px-4 py-2 text-sm text-white/60 transition-colors hover:text-white hover:border-white/30">
              Salir
            </button>
          </form>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterTab label={`Todas · ${counts.total}`} href="/admin" active={!activeFilter} />
          <FilterTab label={`Nuevas · ${counts.nuevo}`} href="/admin?estado=nuevo" active={activeFilter === "nuevo"} />
          <FilterTab label={`Contactadas · ${counts.contactado}`} href="/admin?estado=contactado" active={activeFilter === "contactado"} />
          <FilterTab label={`Archivadas · ${counts.archivado}`} href="/admin?estado=archivado" active={activeFilter === "archivado"} />
        </div>

        {/* Lista */}
        {visibles.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[color:var(--navy-line)] py-16 text-center text-white/40">
            No hay consultas {activeFilter ? `en «${activeFilter}»` : "todavía"}.
          </p>
        ) : (
          <div className="space-y-4">
            {visibles.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function FilterTab({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-gold text-[#1a1206] font-medium"
          : "border border-[color:var(--navy-line)] text-white/60 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const estado = lead.estado as Estado;
  return (
    <div className="rounded-2xl border border-[color:var(--navy-line)] bg-white/[0.02] p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl">{lead.nombre}</h2>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[0.7rem] uppercase tracking-wide ${estadoStyle[estado] ?? estadoStyle.archivado}`}
            >
              {estado}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/45">
            {lead.perfil} · {fecha(lead.createdAt)}
          </p>
        </div>
        <a
          href={`mailto:${lead.email}`}
          className="text-sm text-gold-2 hover:underline break-all"
        >
          {lead.email}
        </a>
      </div>

      <p className="mt-4 rounded-xl bg-white/[0.03] p-4 text-[0.95rem] leading-relaxed text-white/80 whitespace-pre-wrap">
        {lead.mensaje}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Cambiar estado */}
        {ESTADOS.filter((e) => e !== estado).map((e) => (
          <form key={e} action={setEstado}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="estado" value={e} />
            <button className="rounded-full border border-[color:var(--navy-line)] px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:text-white hover:border-white/30">
              Marcar {e}
            </button>
          </form>
        ))}

        {/* Borrar */}
        <form action={removeLead} className="ml-auto">
          <input type="hidden" name="id" value={lead.id} />
          <button className="rounded-full px-3.5 py-1.5 text-xs text-white/35 transition-colors hover:text-[#e0a4a4]">
            Eliminar
          </button>
        </form>
      </div>

      {/* Notas */}
      <form action={saveNotas} className="mt-3 flex items-end gap-2">
        <input type="hidden" name="id" value={lead.id} />
        <div className="flex-1">
          <label className="block text-xs text-white/40 mb-1.5">Notas privadas</label>
          <textarea
            name="notas"
            defaultValue={lead.notas}
            rows={1}
            placeholder="Anotá seguimiento, próximos pasos…"
            className="w-full resize-y rounded-lg bg-white/[0.03] border border-[color:var(--navy-line)] px-3 py-2 text-sm text-white/80 placeholder:text-white/25 outline-none focus:border-[color:var(--gold)]"
          />
        </div>
        <button className="rounded-lg border border-[color:var(--navy-line)] px-3.5 py-2 text-xs text-white/60 transition-colors hover:text-white hover:border-white/30">
          Guardar
        </button>
      </form>
    </div>
  );
}
