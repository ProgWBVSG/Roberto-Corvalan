"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Dato = { id: string; etiqueta: string; valor: string };
type Asociacion = { id: string; nombre: string; logoSrc: string };

export default function CertificadoCIC({
  badgeText,
  titulo,
  subtitulo,
  descripcion,
  imagenSrc,
  imagenAlt,
  datos,
  asociacionesTitulo,
  asociaciones,
}: {
  badgeText: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagenSrc: string;
  imagenAlt: string;
  datos: Dato[];
  asociacionesTitulo: string;
  asociaciones: Asociacion[];
}) {
  const [open, setOpen] = useState(false);
  const loop = asociaciones.length ? [...asociaciones, ...asociaciones] : [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-3xl border border-[color:var(--navy-line)] bg-navy text-ivory"
        style={{
          backgroundImage:
            "radial-gradient(120% 130% at 100% 0%, rgba(176,141,76,0.16) 0%, transparent 55%)",
        }}
      >
        <div className="grid gap-7 p-7 sm:p-9 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-9">
          {/* Certificado */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ampliar certificado"
            className="group relative mx-auto w-full max-w-[190px] md:max-w-[220px] cursor-zoom-in"
          >
            <div className="relative aspect-[853/1280] overflow-hidden rounded-xl border border-[color:var(--gold)]/35 shadow-[0_26px_60px_-24px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              <Image
                src={imagenSrc}
                alt={imagenAlt}
                fill
                quality={90}
                sizes="220px"
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>
            <span className="mt-3 flex items-center justify-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-gold-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
              Ampliar
            </span>
          </button>

          {/* Detalle */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/35 bg-[color:var(--gold-soft)] px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-gold-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {badgeText}
            </span>

            <h3 className="mt-4 font-display text-[1.55rem] sm:text-[1.85rem] leading-[1.15] tracking-[-0.02em]">
              {titulo}
              <span className="text-gold-2"> {subtitulo}</span>
            </h3>

            <p className="mt-3.5 text-[0.98rem] leading-relaxed text-white/60 max-w-md mx-auto md:mx-0">
              {descripcion}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-left max-w-md mx-auto md:mx-0">
              {datos.map((d) => (
                <div key={d.id} className="border-l border-[color:var(--gold)]/25 pl-3.5">
                  <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35">
                    {d.etiqueta}
                  </dt>
                  <dd className="mt-1 text-[0.92rem] font-medium leading-snug text-ivory">
                    {d.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Carrusel de asociaciones */}
        {asociaciones.length > 0 && (
          <div className="border-t border-[color:var(--navy-line)] px-7 py-6 sm:px-9">
            <p className="mb-4 text-center text-[0.68rem] uppercase tracking-[0.18em] text-white/35 md:text-left">
              {asociacionesTitulo}
            </p>
            <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-[marquee_20s_linear_infinite] items-center gap-5 group-hover:[animation-play-state:paused]">
                {loop.map((a, i) => (
                  <div
                    key={`${a.id}-${i}`}
                    className="flex h-14 w-32 shrink-0 items-center justify-center rounded-lg border border-[color:var(--navy-line)] bg-white p-2.5"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={a.logoSrc}
                        alt={a.nombre}
                        fill
                        sizes="128px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificado ampliado"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-[86vh] w-full max-w-[min(92vw,560px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenSrc}
              alt={imagenAlt}
              fill
              quality={95}
              sizes="(max-width: 768px) 92vw, 560px"
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
